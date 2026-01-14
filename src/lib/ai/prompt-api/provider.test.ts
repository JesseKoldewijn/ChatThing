import { describe, expect, it, vi } from "vitest";
import { PromptApiProvider } from "./provider";

// Mock AI SDK
vi.mock("ai", () => ({
	streamText: vi.fn().mockReturnValue({
		fullStream: (async function* () {
			yield { type: "text-delta", text: "Hello" };
		})(),
	}),
	generateText: vi.fn().mockResolvedValue({ text: "Title" }),
}));

// Mock @built-in-ai/core
vi.mock("@built-in-ai/core", () => ({
	builtInAI: vi.fn().mockReturnValue({}),
}));

describe("PromptApiProvider", () => {
	it("should stream text", async () => {
		const provider = new PromptApiProvider();
		const stream = await provider.prompt("test");
		const parts = [];
		for await (const part of stream) {
			parts.push(part);
		}
		expect(parts).toContainEqual({ type: "text", content: "Hello" });
	});

	it("should generate title", async () => {
		const provider = new PromptApiProvider();
		const title = await provider.generateTitle("Hello world");
		expect(title).toBe("Title");
	});

	it("should fallback title on error", async () => {
		const { generateText } = await import("ai");
		vi.mocked(generateText).mockRejectedValue(new Error("fail"));
		const provider = new PromptApiProvider();
		const title = await provider.generateTitle(
			"This is a very long message indeed",
		);
		expect(title).toBe("This is a very long message...");
	});
});
