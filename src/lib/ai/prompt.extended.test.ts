import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Message } from "@/lib/stores/chat";

// Mock the AI modules before importing promptAsync
vi.mock("ai", () => ({
	streamText: vi.fn().mockImplementation(() => ({
		fullStream: (async function* () {
			yield { type: "text-delta", textDelta: "Hello" };
			yield { type: "text-delta", textDelta: " World" };
			yield { type: "finish", finishReason: "stop" };
		})(),
	})),
	wrapLanguageModel: vi.fn().mockImplementation(({ model }) => model),
	tool: vi.fn().mockImplementation((config) => ({
		...config,
		type: "tool",
	})),
}));

vi.mock("@built-in-ai/core", () => ({
	builtInAI: vi.fn().mockImplementation(() => ({})),
}));

vi.mock("@ai-sdk-tool/parser", () => ({
	createToolMiddleware: vi.fn().mockImplementation(() => ({})),
	jsonMixProtocol: vi.fn().mockImplementation(() => ({})),
}));

// Import after mocking
import { promptAsync, promptStreamReader } from "./prompt";
import { streamText } from "ai";
import { builtInAI } from "@built-in-ai/core";

describe("prompt module", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("promptAsync", () => {
		it("should call streamText with the prompt", async () => {
			await promptAsync("Hello, AI!");

			expect(streamText).toHaveBeenCalled();
			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			expect(callArgs).toBeDefined();
		});

		it("should include user message in messages array", async () => {
			await promptAsync("Test message");

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: string | unknown[] }>;
			const lastMessage = messages[messages.length - 1];
			expect(lastMessage.role).toBe("user");
			expect(lastMessage.content).toBe("Test message");
		});

		it("should use text model for text-only prompts", async () => {
			await promptAsync("Text only prompt");

			expect(builtInAI).toHaveBeenCalledWith("text", expect.any(Object));
		});

		it("should not use text model for prompts with images", async () => {
			const images = [
				{ id: "img1", data: "data:image/png;base64,abc", mimeType: "image/png" },
			];

			await promptAsync("Describe this image", { images });

			expect(builtInAI).toHaveBeenCalledWith(undefined, expect.any(Object));
		});

		it("should include images in message content", async () => {
			const images = [
				{ id: "img1", data: "data:image/png;base64,abc", mimeType: "image/png" },
			];

			await promptAsync("Describe this", { images });

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: unknown }>;
			const lastMessage = messages[messages.length - 1];
			expect(Array.isArray(lastMessage.content)).toBe(true);
		});

		it("should include history in messages", async () => {
			const history: Message[] = [
				{
					id: "1",
					transactionId: "tx1",
					role: "user",
					content: "Previous question",
					timestamp: Date.now() - 1000,
				},
				{
					id: "2",
					transactionId: "tx1",
					role: "assistant",
					content: "Previous answer",
					timestamp: Date.now() - 500,
				},
			];

			await promptAsync("New question", { history });

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: string }>;
			// Should include few-shot examples + history + new message
			expect(messages.length).toBeGreaterThan(2);
		});

		it("should filter out tool UI messages from history", async () => {
			const history: Message[] = [
				{
					id: "1",
					transactionId: "tx1",
					role: "user",
					content: "What's the weather?",
					timestamp: Date.now() - 1000,
				},
				{
					id: "2",
					transactionId: "tx1",
					role: "assistant",
					content: "🔧 Using tool: weather",
					timestamp: Date.now() - 900,
				},
				{
					id: "3",
					transactionId: "tx1",
					role: "assistant",
					content: "The weather is sunny!",
					timestamp: Date.now() - 800,
				},
			];

			await promptAsync("Thanks!", { history });

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: string }>;
			// Tool announcement should be filtered out
			const hasToolAnnouncement = messages.some(
				(m) => typeof m.content === "string" && m.content.includes("🔧 Using tool:")
			);
			expect(hasToolAnnouncement).toBe(false);
		});

		it("should filter out error messages from history", async () => {
			const history: Message[] = [
				{
					id: "1",
					transactionId: "tx1",
					role: "user",
					content: "Do something",
					timestamp: Date.now() - 1000,
				},
				{
					id: "2",
					transactionId: "tx1",
					role: "assistant",
					content: "❌ Error: Something went wrong",
					timestamp: Date.now() - 900,
				},
			];

			await promptAsync("Try again", { history });

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: string }>;
			const hasError = messages.some(
				(m) => typeof m.content === "string" && m.content.includes("❌ Error:")
			);
			expect(hasError).toBe(false);
		});

		it("should return a stream", async () => {
			const result = await promptAsync("Test");

			expect(result).toBeDefined();
			// Result should be an async iterable
			expect(Symbol.asyncIterator in Object(result)).toBe(true);
		});

		it("should include expected output language setting", async () => {
			await promptAsync("Test");

			expect(builtInAI).toHaveBeenCalledWith(
				"text",
				expect.objectContaining({
					expectedOutputLanguages: expect.arrayContaining([expect.any(String)]),
				})
			);
		});

		it("should specify image input when images are provided", async () => {
			const images = [
				{ id: "img1", data: "data:image/png;base64,abc", mimeType: "image/png" },
			];

			await promptAsync("Describe", { images });

			expect(builtInAI).toHaveBeenCalledWith(
				undefined,
				expect.objectContaining({
					expectedInputs: expect.arrayContaining([
						{ type: "text" },
						{ type: "image" },
					]),
				})
			);
		});
	});

	describe("promptStreamReader", () => {
		it("should collect all chunks from stream", async () => {
			const mockStream = (async function* () {
				yield { type: "text-delta", textDelta: "Hello" };
				yield { type: "text-delta", textDelta: " World" };
				yield { type: "finish", finishReason: "stop" };
			})() as AsyncIterableIterator<unknown> & { [Symbol.asyncIterator](): AsyncIterableIterator<unknown> };

			const result = await promptStreamReader(mockStream as Parameters<typeof promptStreamReader>[0]);

			expect(result).toHaveLength(3);
			expect(result[0]).toEqual({ type: "text-delta", textDelta: "Hello" });
			expect(result[1]).toEqual({ type: "text-delta", textDelta: " World" });
		});

		it("should handle empty stream", async () => {
			const mockStream = (async function* () {
				// Empty stream
			})() as AsyncIterableIterator<unknown> & { [Symbol.asyncIterator](): AsyncIterableIterator<unknown> };

			const result = await promptStreamReader(mockStream as Parameters<typeof promptStreamReader>[0]);

			expect(result).toHaveLength(0);
		});

		it("should handle stream with tool calls", async () => {
			const mockStream = (async function* () {
				yield { type: "tool-call", toolCallId: "call1", toolName: "weather", args: {} };
				yield { type: "tool-result", toolCallId: "call1", result: { temp: 72 } };
				yield { type: "text-delta", textDelta: "The weather is nice!" };
			})() as AsyncIterableIterator<unknown> & { [Symbol.asyncIterator](): AsyncIterableIterator<unknown> };

			const result = await promptStreamReader(mockStream as Parameters<typeof promptStreamReader>[0]);

			expect(result).toHaveLength(3);
			expect(result[0].type).toBe("tool-call");
			expect(result[1].type).toBe("tool-result");
			expect(result[2].type).toBe("text-delta");
		});
	});

	describe("history conversion edge cases", () => {
		it("should handle empty history", async () => {
			await promptAsync("Hello", { history: [] });

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string }>;
			// Should only have few-shot examples + current message
			// Few-shot has 4 messages (2 pairs), plus 1 current
			expect(messages.length).toBeGreaterThanOrEqual(1);
		});

		it("should handle history with user images", async () => {
			const history: Message[] = [
				{
					id: "1",
					transactionId: "tx1",
					role: "user",
					content: "What's in this image?",
					images: [
						{ id: "img1", data: "data:image/png;base64,abc", mimeType: "image/png" },
					],
					timestamp: Date.now() - 1000,
				},
				{
					id: "2",
					transactionId: "tx1",
					role: "assistant",
					content: "I see a cat",
					timestamp: Date.now() - 500,
				},
			];

			await promptAsync("Thanks", { history });

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: unknown }>;
			// Should have converted user message with images
			const userWithImages = messages.find(
				(m) => m.role === "user" && Array.isArray(m.content)
			);
			expect(userWithImages).toBeDefined();
		});

		it("should only keep most recent tool transaction", async () => {
			const history: Message[] = [
				// First tool transaction
				{
					id: "1",
					transactionId: "tx1",
					role: "user",
					content: "Weather?",
					timestamp: 1000,
				},
				{
					id: "2",
					transactionId: "tx1",
					role: "assistant",
					content: "🔧 Using tool: weather",
					timestamp: 1001,
				},
				{
					id: "3",
					transactionId: "tx1",
					role: "assistant",
					content: "Sunny!",
					timestamp: 1002,
				},
				// Second tool transaction (more recent)
				{
					id: "4",
					transactionId: "tx2",
					role: "user",
					content: "Time?",
					timestamp: 2000,
				},
				{
					id: "5",
					transactionId: "tx2",
					role: "assistant",
					content: "🔧 Using tool: datetime",
					timestamp: 2001,
				},
				{
					id: "6",
					transactionId: "tx2",
					role: "assistant",
					content: "3pm",
					timestamp: 2002,
				},
			];

			await promptAsync("Thanks", { history });

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: string }>;
			
			// Old tool transaction responses should be filtered
			const hasSunny = messages.some(
				(m) => typeof m.content === "string" && m.content === "Sunny!"
			);
			expect(hasSunny).toBe(false);
		});
	});
});

