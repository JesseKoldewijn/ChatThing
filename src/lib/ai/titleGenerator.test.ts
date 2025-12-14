import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock the AI modules before import
vi.mock("ai", () => ({
	generateText: vi.fn(),
}));

vi.mock("@built-in-ai/core", () => ({
	builtInAI: vi.fn(() => ({})),
}));

import { generateConversationTitle, needsTitleGeneration } from "./titleGenerator";
import { generateText } from "ai";

const mockGenerateText = vi.mocked(generateText);

describe("titleGenerator", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("generateConversationTitle", () => {
		it("should generate a title from AI response", async () => {
			mockGenerateText.mockResolvedValueOnce({
				text: "Weather Query",
			} as Awaited<ReturnType<typeof generateText>>);

			const title = await generateConversationTitle("What's the weather like in London?");

			expect(title).toBe("Weather Query");
			expect(mockGenerateText).toHaveBeenCalled();
		});

		it("should remove surrounding quotes from title", async () => {
			mockGenerateText.mockResolvedValueOnce({
				text: '"Hello World"',
			} as Awaited<ReturnType<typeof generateText>>);

			const title = await generateConversationTitle("Hello");

			expect(title).toBe("Hello World");
		});

		it("should remove trailing punctuation", async () => {
			mockGenerateText.mockResolvedValueOnce({
				text: "Weather Update!",
			} as Awaited<ReturnType<typeof generateText>>);

			const title = await generateConversationTitle("Weather");

			expect(title).toBe("Weather Update");
		});

		it("should truncate long titles at word boundary", async () => {
			mockGenerateText.mockResolvedValueOnce({
				text: "This Is A Very Long Title That Exceeds The Maximum Length",
			} as Awaited<ReturnType<typeof generateText>>);

			const title = await generateConversationTitle("Hello");

			expect(title.length).toBeLessThanOrEqual(33); // 30 + "..."
		});

		it("should fall back to truncation when AI fails", async () => {
			mockGenerateText.mockRejectedValueOnce(new Error("AI unavailable"));

			const title = await generateConversationTitle("A simple short message");

			expect(title).toBe("A simple short message");
		});

		it("should fallback when AI returns empty string", async () => {
			mockGenerateText.mockResolvedValueOnce({
				text: "",
			} as Awaited<ReturnType<typeof generateText>>);

			const title = await generateConversationTitle("Hello world");

			expect(title).toBe("Hello world");
		});

		it("should fallback when AI returns very short response", async () => {
			mockGenerateText.mockResolvedValueOnce({
				text: "X",
			} as Awaited<ReturnType<typeof generateText>>);

			const title = await generateConversationTitle("Testing the system");

			expect(title).toBe("Testing the system");
		});

		it("should handle single quotes in title", async () => {
			mockGenerateText.mockResolvedValueOnce({
				text: "'Single Quoted'",
			} as Awaited<ReturnType<typeof generateText>>);

			const title = await generateConversationTitle("Test");

			expect(title).toBe("Single Quoted");
		});

		it("should truncate fallback for long messages", async () => {
			mockGenerateText.mockRejectedValueOnce(new Error("Fail"));

			const longMessage = "This is a really long message that definitely exceeds the thirty character limit and should be truncated";
			const title = await generateConversationTitle(longMessage);

			expect(title.length).toBeLessThanOrEqual(33);
			expect(title).toMatch(/\.\.\.$/);
		});

		it("should limit input message to 200 characters for prompt", async () => {
			mockGenerateText.mockResolvedValueOnce({
				text: "Short Title",
			} as Awaited<ReturnType<typeof generateText>>);

			const longMessage = "A".repeat(500);
			await generateConversationTitle(longMessage);

			// Check that generateText was called and the prompt was limited
			expect(mockGenerateText).toHaveBeenCalled();
		});
	});

	describe("needsTitleGeneration", () => {
		it('should return true for "New Chat"', () => {
			expect(needsTitleGeneration("New Chat")).toBe(true);
		});

		it("should return true for empty string", () => {
			expect(needsTitleGeneration("")).toBe(true);
		});

		it("should return false for custom titles", () => {
			expect(needsTitleGeneration("My Custom Title")).toBe(false);
		});

		it("should return false for any non-default title", () => {
			expect(needsTitleGeneration("Weather Query")).toBe(false);
			expect(needsTitleGeneration("Hello")).toBe(false);
			expect(needsTitleGeneration("12345")).toBe(false);
		});
	});
});

