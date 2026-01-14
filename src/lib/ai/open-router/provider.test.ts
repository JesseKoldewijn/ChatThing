import { generateText, streamText } from "ai";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PROVIDER_OPEN_ROUTER } from "../types";
import { OpenRouterProvider } from "./provider";

// Mock the ai package
vi.mock("ai", () => ({
	streamText: vi.fn(),
	generateText: vi.fn(),
	tool: vi.fn(),
}));

// Mock @openrouter/ai-sdk-provider
vi.mock("@openrouter/ai-sdk-provider", () => ({
	createOpenRouter: vi.fn(() => ({
		chat: vi.fn(() => ({})),
	})),
}));

describe("OpenRouterProvider", () => {
	const settings = {
		apiKey: "test-api-key",
		model: "mistral-tiny",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should have correct provider type", () => {
		const provider = new OpenRouterProvider(settings);
		expect(provider.type).toBe(PROVIDER_OPEN_ROUTER);
	});

	describe("prompt", () => {
		it("should call streamText with correct parameters", async () => {
			const provider = new OpenRouterProvider(settings);
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
			const provider = new OpenRouterProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield { type: "text-delta", text: "" };
				})(),
			} as unknown as ReturnType<typeof streamText>);

			await provider.prompt("Vision", {
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
								{ type: "text", text: "Vision" },
								{ type: "image", image: "abc" },
							],
						},
					],
				}),
			);
		});

		it("should handle history with images", async () => {
			const provider = new OpenRouterProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield { type: "text-delta", text: "" };
				})(),
			} as unknown as ReturnType<typeof streamText>);

			await provider.prompt("Current", {
				history: [
					{
						id: "1",
						role: "user",
						content: "Past",
						timestamp: Date.now(),
						transactionId: "tx-1",
						images: [
							{
								id: "p1",
								data: "data:image/jpeg;base64,pastimg",
								mimeType: "image/jpeg",
							},
						],
					},
				],
			});

			expect(streamText).toHaveBeenCalledWith(
				expect.objectContaining({
					messages: [
						{
							role: "user",
							content: [
								{ type: "text", text: "Past" },
								{ type: "image", image: "pastimg" },
							],
						},
						{ role: "user", content: "Current" },
					],
				}),
			);
		});

		it("should handle tool-call parts correctly", async () => {
			const provider = new OpenRouterProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield {
						type: "tool-call",
						toolName: "weather",
						toolCallId: "tc1",
						args: { loc: "SF" },
					};
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const result = await provider.prompt("Weather?");
			const parts = [];
			for await (const part of result) {
				parts.push(part);
			}

			expect(parts[0]).toEqual({
				type: "tool-call",
				toolName: "weather",
				toolCallId: "tc1",
				args: { loc: "SF" },
			});
		});

		it("should handle tool-call parts with 'input' instead of 'args'", async () => {
			const provider = new OpenRouterProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				fullStream: (async function* () {
					yield {
						type: "tool-call",
						toolName: "time",
						toolCallId: "tc2",
						input: { zone: "UTC" },
					};
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const result = await provider.prompt("Time?");
			const parts = [];
			for await (const part of result) {
				parts.push(part);
			}

			expect(parts[0]).toEqual({
				type: "tool-call",
				toolName: "time",
				toolCallId: "tc2",
				args: { zone: "UTC" },
			});
		});
	});

	describe("generateTitle", () => {
		it("should use fallback if AI fails", async () => {
			const provider = new OpenRouterProvider(settings);
			vi.mocked(generateText).mockRejectedValue(new Error("Fail"));

			const title = await provider.generateTitle("Simple message");
			expect(title).toBe("Simple message");
		});

		it("should handle long messages in fallback", async () => {
			const provider = new OpenRouterProvider(settings);
			vi.mocked(generateText).mockRejectedValue(new Error("Fail"));

			const longMsg =
				"This is a very long message that definitely exceeds the thirty character limit we set for titles";
			const title = await provider.generateTitle(longMsg);

			expect(title.length).toBeLessThanOrEqual(33); // 30 + "..."
			expect(title).toContain("...");
		});
	});
});
