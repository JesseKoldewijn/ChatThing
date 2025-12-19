import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Message } from "@/lib/stores/chat";

// Mock the AI modules before importing provider
vi.mock("ai", () => ({
	streamText: vi.fn().mockImplementation(() => ({
		fullStream: (async function* () {
			yield { type: "text-delta", text: "Hello" };
			yield { type: "text-delta", text: " World" };
			yield { type: "finish", finishReason: "stop" };
		})(),
	})),
	generateText: vi.fn(),
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

// Mock settings
vi.mock("@/lib/stores/settings", async () => {
	const { atom } = await import("nanostores");
	return {
		outputLanguageAtom: atom("en"),
	};
});

// Import after mocking
import { PromptAPIProvider } from "./provider";
import { streamText } from "ai";
import { builtInAI } from "@built-in-ai/core";

describe("PromptAPIProvider", () => {
	let provider: PromptAPIProvider;

	beforeEach(() => {
		vi.clearAllMocks();
		provider = new PromptAPIProvider();
	});

	describe("prompt", () => {
		it("should call streamText with the prompt", async () => {
			await provider.prompt("Hello, AI!");

			expect(streamText).toHaveBeenCalled();
			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			expect(callArgs).toBeDefined();
		});

		it("should include user message in messages array", async () => {
			await provider.prompt("Test message");

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: string | unknown[] }>;
			const lastMessage = messages[messages.length - 1];
			expect(lastMessage.role).toBe("user");
			expect(lastMessage.content).toBe("Test message");
		});

		it("should use text model for text-only prompts", async () => {
			await provider.prompt("Text only prompt");

			expect(builtInAI).toHaveBeenCalledWith("text", expect.any(Object));
		});

		it("should not use text model for prompts with images", async () => {
			const images = [
				{ id: "img1", data: "data:image/png;base64,abc", mimeType: "image/png" },
			];

			await provider.prompt("Describe this image", { images });

			expect(builtInAI).toHaveBeenCalledWith(undefined, expect.any(Object));
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

			await provider.prompt("New question", { history });

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: string }>;
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

			await provider.prompt("Thanks!", { history });

			const callArgs = vi.mocked(streamText).mock.calls[0][0];
			const messages = callArgs.messages as Array<{ role: string; content: string }>;
			const hasToolAnnouncement = messages.some(
				(m) => typeof m.content === "string" && m.content.includes("🔧 Using tool:")
			);
			expect(hasToolAnnouncement).toBe(false);
		});

		it("should return a stream", async () => {
			const result = await provider.prompt("Test");

			expect(result).toBeDefined();
			expect(Symbol.asyncIterator in Object(result)).toBe(true);
		});
	});

	describe("generateTitle", () => {
		it("should use builtInAI to generate title", async () => {
			const { generateText } = await import("ai");
			vi.mocked(generateText).mockResolvedValueOnce({ text: "Test Title" } as never);

			const title = await provider.generateTitle("Hello world");

			expect(title).toBe("Test Title");
			expect(builtInAI).toHaveBeenCalled();
		});

		it("should fallback when generation fails", async () => {
			const { generateText } = await import("ai");
			vi.mocked(generateText).mockRejectedValueOnce(new Error("Fail"));

			const title = await provider.generateTitle("This is a very long message that should be truncated");

			expect(title).toBe("This is a very long message...");
		});
	});
});
