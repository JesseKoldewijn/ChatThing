import { generateText, streamText } from "ai";
import { createOllama } from "ai-sdk-ollama";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PROVIDER_OLLAMA } from "../constants";
import { OllamaProvider } from "./provider";

// Mock the ai package
vi.mock("ai", () => ({
	streamText: vi.fn(),
	generateText: vi.fn(),
}));

// Mock the ai-sdk-ollama package
const mockModel = vi.fn((modelName: string) => ({
	specificationVersion: "v1",
	modelId: modelName,
}));
vi.mock("ai-sdk-ollama", () => ({
	createOllama: vi.fn(() => mockModel),
}));

describe("OllamaProvider", () => {
	const settings = {
		baseUrl: "http://localhost:11434/api",
		model: "deepseek-r1:1.5b",
		apiKey: "test-api-key",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should initialize correctly and strip /api from baseURL", () => {
		new OllamaProvider(settings);

		expect(createOllama).toHaveBeenCalledWith({
			baseURL: "http://localhost:11434",
			apiKey: "test-api-key",
		});
	});

	it("should have correct provider type", () => {
		const provider = new OllamaProvider(settings);
		expect(provider.type).toBe(PROVIDER_OLLAMA);
	});

	it("should force specificationVersion to v3 in the model getter", async () => {
		const provider = new OllamaProvider(settings);

		// Trigger the private model getter via prompt
		vi.mocked(streamText).mockReturnValue({
			textStream: (async function* () {
				yield "initial";
			})(),
		} as unknown as ReturnType<typeof streamText>);

		await provider.prompt("Hello");

		expect(streamText).toHaveBeenCalledWith(
			expect.objectContaining({
				model: expect.objectContaining({
					specificationVersion: "v3",
				}),
			}),
		);
	});

	describe("prompt", () => {
		it("should handle history and images", async () => {
			const provider = new OllamaProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				textStream: (async function* () {
					yield "Response";
				})(),
			} as unknown as ReturnType<typeof streamText>);

			const result = await provider.prompt("Next", {
				history: [
					{
						id: "1",
						role: "user",
						content: "Hi",
						timestamp: Date.now(),
						transactionId: "tx-1",
					},
					{
						id: "2",
						role: "assistant",
						content: "Hello",
						timestamp: Date.now(),
						transactionId: "tx-2",
					},
				],
				images: [
					{
						id: "i1",
						data: "data:image/png;base64,imgdata",
						mimeType: "image/png",
					},
				],
			});

			const parts = [];
			for await (const part of result) {
				parts.push(part);
			}

			expect(parts[0]).toEqual({ type: "text", content: "Response" });
			expect(streamText).toHaveBeenCalledWith(
				expect.objectContaining({
					messages: expect.arrayContaining([
						expect.objectContaining({ role: "system" }),
						expect.objectContaining({ role: "user", content: "Hi" }),
						expect.objectContaining({ role: "assistant", content: "Hello" }),
						expect.objectContaining({
							role: "user",
							content: expect.arrayContaining([
								expect.objectContaining({ type: "text", text: "Next" }),
								expect.objectContaining({ type: "image", image: "imgdata" }),
							]),
						}),
					]),
				}),
			);
		});

		it("should catch errors in stream", async () => {
			const provider = new OllamaProvider(settings);
			vi.mocked(streamText).mockReturnValue({
				textStream: (async function* () {
					yield "err"; // Add yield to satisfy linter
					throw new Error("Stream fail");
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
			const provider = new OllamaProvider(settings);
			vi.mocked(generateText).mockResolvedValue({
				text: '"Cool Title!"',
			} as unknown as Awaited<ReturnType<typeof generateText>>);

			const title = await provider.generateTitle("Hello assistant");

			expect(title).toBe("Cool Title");
		});

		it("should truncate long titles", async () => {
			const provider = new OllamaProvider(settings);
			vi.mocked(generateText).mockResolvedValue({
				text: "This is a very long title that exceeds thirty characters",
			} as unknown as Awaited<ReturnType<typeof generateText>>);

			const title = await provider.generateTitle("msg");
			expect(title.length).toBeLessThanOrEqual(33); // 30 + "..."
			expect(title).toContain("...");
		});

		it("should fallback to message if AI fails", async () => {
			const provider = new OllamaProvider(settings);
			vi.mocked(generateText).mockRejectedValue(new Error("AI Error"));

			const title = await provider.generateTitle(
				"This is a very long first message that should be truncated properly.",
			);

			expect(title).toBe("This is a very long first...");
		});
	});
});
