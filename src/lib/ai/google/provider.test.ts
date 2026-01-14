import { generateText, streamText } from "ai";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PROVIDER_GOOGLE } from "../types";
import { GoogleProvider } from "./provider";

// Mock the ai package
vi.mock("ai", () => ({
	streamText: vi.fn(),
	generateText: vi.fn(),
	tool: vi.fn(),
}));

// Mock @ai-sdk/google
vi.mock("@ai-sdk/google", () => ({
	createGoogleGenerativeAI: vi.fn(() => vi.fn(() => ({}))),
}));

describe("GoogleProvider", () => {
	const settings = {
		apiKey: "test-api-key",
		model: "gemini-pro",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should have correct provider type", () => {
		const provider = new GoogleProvider(settings);
		expect(provider.type).toBe(PROVIDER_GOOGLE);
	});

	describe("prompt", () => {
		it("should call streamText with correct parameters", async () => {
			const provider = new GoogleProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield { type: "text-delta", text: "Hello" };
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const result = await provider.prompt("Hi");
			const parts = [];
			for await (const part of result) {
				parts.push(part);
			}

			expect(streamText).toHaveBeenCalledWith(
				expect.objectContaining({
					model: expect.anything(),
					messages: [{ role: "user", content: "Hi" }],
				}),
			);
			expect(parts).toEqual([{ type: "text", content: "Hello" }]);
		});

		it("should handle images in prompt options", async () => {
			const provider = new GoogleProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield { type: "text-delta", text: "" };
				})(),
			} as unknown as ReturnType<typeof streamText>);

			await provider.prompt("Look at this", {
				images: [
					{ id: "1", data: "data:image/png;base64,abc", mimeType: "image/png" },
				],
			});

			expect(streamText).toHaveBeenCalledWith(
				expect.objectContaining({
					messages: [
						{
							role: "user",
							content: [
								{ type: "text", text: "Look at this" },
								{ type: "image", image: "abc" },
							],
						},
					],
				}),
			);
		});

		it("should handle tools when enabled", async () => {
			const provider = new GoogleProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield {
						type: "tool-call",
						toolName: "weather",
						toolCallId: "1",
						args: { location: "London" },
					};
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const result = await provider.prompt("What is the weather?", {
				toolsEnabled: true,
			});
			const parts = [];
			for await (const part of result) {
				parts.push(part);
			}

			expect(streamText).toHaveBeenCalledWith(
				expect.objectContaining({
					tools: expect.any(Object),
				}),
			);
			expect(parts[0]).toMatchObject({
				type: "tool-call",
				toolName: "weather",
			});
		});

		it("should handle history in prompt options", async () => {
			const provider = new GoogleProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield { type: "text-delta", text: "" };
				})(),
			} as unknown as ReturnType<typeof streamText>);

			await provider.prompt("Next", {
				history: [
					{
						id: "1",
						role: "user",
						content: "First",
						timestamp: Date.now(),
						transactionId: "tx-1",
					},
					{
						id: "2",
						role: "assistant",
						content: "Response",
						timestamp: Date.now(),
						transactionId: "tx-2",
					},
				],
			});

			expect(streamText).toHaveBeenCalledWith(
				expect.objectContaining({
					messages: [
						{ role: "user", content: "First" },
						{ role: "assistant", content: "Response" },
						{ role: "user", content: "Next" },
					],
				}),
			);
		});

		it("should handle errors in the stream", async () => {
			const provider = new GoogleProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield { type: "error", error: new Error("AI Error") };
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const result = await provider.prompt("Hi");
			const parts = [];
			for await (const part of result) {
				parts.push(part);
			}

			expect(parts[0]).toMatchObject({ type: "error" });
		});

		it("should catch exceptions during streaming", async () => {
			const provider = new GoogleProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield { type: "text-delta", text: "" }; // satisfy linter
					throw new Error("Fatal Error");
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const result = await provider.prompt("Hi");
			const parts = [];
			for await (const part of result) {
				parts.push(part);
			}

			expect(parts.some((p) => p.type === "error")).toBe(true);
		});
	});

	describe("generateTitle", () => {
		it("should generate a clean title", async () => {
			const provider = new GoogleProvider(settings);
			vi.mocked(generateText).mockResolvedValue({
				text: '"Cool Title!"',
			} as unknown as Awaited<ReturnType<typeof generateText>>);

			const title = await provider.generateTitle("Hello assistant");

			expect(title).toBe("Cool Title");
		});

		it("should truncate long titles", async () => {
			const provider = new GoogleProvider(settings);
			vi.mocked(generateText).mockResolvedValue({
				text: "This is a very long title that exceeds the maximum allowed length of thirty characters",
			} as unknown as Awaited<ReturnType<typeof generateText>>);

			const title = await provider.generateTitle("msg");

			expect(title.length).toBeLessThanOrEqual(33);
			expect(title).toContain("...");
		});

		it("should fallback to message truncation if AI fails", async () => {
			const provider = new GoogleProvider(settings);
			vi.mocked(generateText).mockRejectedValue(new Error("AI Fail"));

			const title = await provider.generateTitle(
				"A very long first message that needs truncation",
			);

			expect(title).toBe("A very long first message...");
		});
	});
});
