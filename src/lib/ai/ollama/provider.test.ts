import { describe, it, expect, vi, beforeEach } from "vitest";
import { OllamaProvider } from "./provider";
import { PROVIDER_OLLAMA } from "../constants";

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

import { createOllama } from "ai-sdk-ollama";
import { streamText, generateText } from "ai";

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
		// @ts-expect-error - mocking streamText return value
		vi.mocked(streamText).mockReturnValue({ textStream: { [Symbol.asyncIterator]: async function*() {} } });
		
		await provider.prompt("Hello");

		expect(streamText).toHaveBeenCalledWith(expect.objectContaining({
			model: expect.objectContaining({
				specificationVersion: "v3"
			})
		}));
	});

	describe("generateTitle", () => {
		it("should generate a clean title", async () => {
			const provider = new OllamaProvider(settings);
			// @ts-expect-error - mocking generateText return value
			vi.mocked(generateText).mockResolvedValue({ text: '"Cool Title!"' });

			const title = await provider.generateTitle("Hello assistant");

			expect(title).toBe("Cool Title");
		});

		it("should fallback to message if AI fails", async () => {
			const provider = new OllamaProvider(settings);
			vi.mocked(generateText).mockRejectedValue(new Error("AI Error"));

			const title = await provider.generateTitle("This is a very long first message that should be truncated properly.");

			expect(title).toBe("This is a very long first...");
		});
	});
});
