import { describe, it, expect, vi, beforeEach } from "vitest";
import { PromptAPIProvider } from "./provider";

vi.mock("ai", () => ({ 
	generateText: vi.fn(),
	streamText: vi.fn(),
	wrapLanguageModel: vi.fn(),
	tool: vi.fn((config) => config),
}));
vi.mock("@built-in-ai/core", () => ({ builtInAI: vi.fn(() => ({})) }));
vi.mock("@ai-sdk-tool/parser", () => ({ 
	createToolMiddleware: vi.fn(),
	jsonMixProtocol: vi.fn()
}));

// Mock settings
vi.mock("@/lib/stores/settings", async () => {
	const { atom } = await import("nanostores");
	return {
		outputLanguageAtom: atom("en"),
	};
});

describe("PromptAPIProvider title generation", () => {
	let provider: PromptAPIProvider;

	beforeEach(() => {
		vi.clearAllMocks();
		provider = new PromptAPIProvider();
	});

	it("should generate a title correctly", async () => {
		const { generateText } = await import("ai");
		vi.mocked(generateText).mockResolvedValueOnce({ text: "Generated Title" } as never);

		const title = await provider.generateTitle("Test message");
		expect(title).toBe("Generated Title");
	});

	it("should clean up the generated title", async () => {
		const { generateText } = await import("ai");
		vi.mocked(generateText).mockResolvedValueOnce({ text: '"Title with quotes."' } as never);

		const title = await provider.generateTitle("Test message");
		expect(title).toBe("Title with quotes");
	});

	it("should truncate long titles", async () => {
		const { generateText } = await import("ai");
		vi.mocked(generateText).mockResolvedValueOnce({ 
			text: "ThisIsAVeryLongTitleWithoutSpacesThatExceedsTheMaximumLength" 
		} as never);

		const title = await provider.generateTitle("Test message");
		expect(title.length).toBeLessThanOrEqual(33); // 30 + "..."
		expect(title).toMatch(/\.\.\.$/);
	});

	it("should use fallback for empty results", async () => {
		const { generateText } = await import("ai");
		vi.mocked(generateText).mockResolvedValueOnce({ text: "" } as never);

		const title = await provider.generateTitle("Original Message Content");
		expect(title).toBe("Original Message Content");
	});
});
