import { describe, expect, it, vi } from "vitest";
import { GoogleProvider } from "./google/provider";
import { OpenRouterProvider } from "./open-router/provider";

// Mock the AI SDK functions
vi.mock("ai", () => ({
	streamText: vi.fn().mockReturnValue({
		fullStream: (async function* () {})(),
	}),
	generateText: vi.fn(),
	tool: vi.fn(),
}));

vi.mock("@ai-sdk/google", () => ({
	createGoogleGenerativeAI: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock("@ai-sdk/openai", () => ({
	createOpenAI: vi.fn().mockReturnValue({
		chat: vi.fn(),
	}),
}));

describe("AI Providers Tool Usage", () => {
	const prompt = "What is the weather?";
	const googleSettings = { apiKey: "test-google", model: "gemini-pro" };
	const openRouterSettings = { apiKey: "test-or", model: "mistral" };

	describe("GoogleProvider", () => {
		it("should include tools when toolsEnabled is true", async () => {
			const { streamText } = await import("ai");
			const provider = new GoogleProvider(googleSettings);

			await provider.prompt(prompt, { toolsEnabled: true });

			expect(streamText).toHaveBeenCalledWith(
				expect.objectContaining({
					tools: expect.any(Object),
				}),
			);
		});

		it("should NOT include tools when toolsEnabled is false", async () => {
			const { streamText } = await import("ai");
			const provider = new GoogleProvider(googleSettings);

			await provider.prompt(prompt, { toolsEnabled: false });

			expect(streamText).toHaveBeenCalledWith(
				expect.not.objectContaining({
					tools: expect.anything(),
				}),
			);
		});

		it("should handle streaming chunks", async () => {
			const { streamText } = await import("ai");
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield { type: "text-delta", text: "Hello" };
					yield {
						type: "tool-call",
						toolName: "datetime",
						toolCallId: "1",
						args: {},
					};
					yield { type: "error", error: new Error("test error") };
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const provider = new GoogleProvider(googleSettings);
			const stream = await provider.prompt(prompt);
			const parts = [];
			for await (const part of stream) {
				parts.push(part);
			}

			expect(parts).toContainEqual({ type: "text", content: "Hello" });
			expect(parts).toContainEqual({
				type: "tool-call",
				toolName: "datetime",
				toolCallId: "1",
				args: {},
			});
			expect(parts).toContainEqual({ type: "error", error: expect.any(Error) });
		});

		it("should handle generic tool args", async () => {
			const { streamText } = await import("ai");
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield {
						type: "tool-call",
						toolName: "weather",
						toolCallId: "2",
						input: { city: "London" },
					};
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const provider = new GoogleProvider(googleSettings);
			const stream = await provider.prompt(prompt);
			const parts = [];
			for await (const part of stream) {
				parts.push(part);
			}

			expect(parts).toContainEqual({
				type: "tool-call",
				toolName: "weather",
				toolCallId: "2",
				args: { city: "London" },
			});
		});

		it("should generate title", async () => {
			const { generateText } = await import("ai");
			vi.mocked(generateText).mockResolvedValue({
				text: "Test Title",
			} as unknown as Awaited<ReturnType<typeof generateText>>);

			const provider = new GoogleProvider(googleSettings);
			const title = await provider.generateTitle("First message");
			expect(title).toBe("Test Title");
		});

		it("should fallback to original message if title generation fails", async () => {
			const { generateText } = await import("ai");
			vi.mocked(generateText).mockRejectedValue(new Error("fail"));

			const provider = new GoogleProvider(googleSettings);
			const title = await provider.generateTitle(
				"A very long message that should be truncated",
			);
			expect(title).toBe("A very long message that...");
		});

		it("should clean generated title", async () => {
			const { generateText } = await import("ai");
			vi.mocked(generateText).mockResolvedValue({
				text: '"Title with quotes."',
			} as unknown as Awaited<ReturnType<typeof generateText>>);

			const provider = new GoogleProvider(googleSettings);
			const title = await provider.generateTitle("First message");
			expect(title).toBe("Title with quotes");
		});
	});

	describe("OpenRouterProvider", () => {
		it("should include tools when toolsEnabled is true", async () => {
			const { streamText } = await import("ai");
			const provider = new OpenRouterProvider(openRouterSettings);

			await provider.prompt(prompt, { toolsEnabled: true });

			expect(streamText).toHaveBeenCalledWith(
				expect.objectContaining({
					tools: expect.any(Object),
				}),
			);
		});

		it("should NOT include tools when toolsEnabled is false", async () => {
			const { streamText } = await import("ai");
			const provider = new OpenRouterProvider(openRouterSettings);

			await provider.prompt(prompt, { toolsEnabled: false });

			expect(streamText).toHaveBeenCalledWith(
				expect.not.objectContaining({
					tools: expect.anything(),
				}),
			);
		});

		it("should handle streaming chunks", async () => {
			const { streamText } = await import("ai");
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield { type: "text-delta", text: "Hi" };
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const provider = new OpenRouterProvider(openRouterSettings);
			const stream = await provider.prompt(prompt);
			const parts = [];
			for await (const part of stream) {
				parts.push(part);
			}

			expect(parts).toContainEqual({ type: "text", content: "Hi" });
		});

		it("should generate title", async () => {
			const { generateText } = await import("ai");
			vi.mocked(generateText).mockResolvedValue({
				text: "OpenRouter Title",
			} as unknown as Awaited<ReturnType<typeof generateText>>);

			const provider = new OpenRouterProvider(openRouterSettings);
			const title = await provider.generateTitle("First message");
			expect(title).toBe("OpenRouter Title");
		});

		it("should use fallback if title generation fails", async () => {
			const { generateText } = await import("ai");
			vi.mocked(generateText).mockRejectedValue(new Error("fail"));

			const provider = new OpenRouterProvider(openRouterSettings);
			const title = await provider.generateTitle("Short message");
			expect(title).toBe("Short message");
		});
	});
});
