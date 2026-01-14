import { beforeEach, describe, expect, it } from "vitest";
import {
	conversationAtom,
	dataAtom,
	errorAtom,
	loadingAtom,
	streamDataAtom,
} from "./store";

describe("AI store atoms", () => {
	beforeEach(() => {
		// Reset all atoms before each test
		conversationAtom.set([]);
		loadingAtom.set(false);
		errorAtom.set(null);
		streamDataAtom.set(null);
		dataAtom.set(null);
	});

	describe("conversationAtom", () => {
		it("should initialize as empty array", () => {
			expect(conversationAtom.get()).toEqual([]);
		});

		it("should store conversation messages", () => {
			conversationAtom.set(["Hello", "World"]);
			expect(conversationAtom.get()).toEqual(["Hello", "World"]);
		});

		it("should allow appending to conversation", () => {
			conversationAtom.set(["First"]);
			conversationAtom.set([...conversationAtom.get(), "Second"]);
			expect(conversationAtom.get()).toEqual(["First", "Second"]);
		});

		it("should allow clearing conversation", () => {
			conversationAtom.set(["Message 1", "Message 2"]);
			conversationAtom.set([]);
			expect(conversationAtom.get()).toEqual([]);
		});
	});

	describe("loadingAtom", () => {
		it("should initialize as false", () => {
			expect(loadingAtom.get()).toBe(false);
		});

		it("should allow setting to true", () => {
			loadingAtom.set(true);
			expect(loadingAtom.get()).toBe(true);
		});

		it("should allow toggling between states", () => {
			loadingAtom.set(true);
			expect(loadingAtom.get()).toBe(true);
			loadingAtom.set(false);
			expect(loadingAtom.get()).toBe(false);
		});
	});

	describe("errorAtom", () => {
		it("should initialize as null", () => {
			expect(errorAtom.get()).toBeNull();
		});

		it("should store error objects", () => {
			const error = new Error("Test error");
			errorAtom.set(error);
			expect(errorAtom.get()).toBe(error);
			expect(errorAtom.get()?.message).toBe("Test error");
		});

		it("should allow clearing errors", () => {
			errorAtom.set(new Error("Error"));
			errorAtom.set(null);
			expect(errorAtom.get()).toBeNull();
		});

		it("should handle different error types", () => {
			const typeError = new TypeError("Type mismatch");
			errorAtom.set(typeError);
			expect(errorAtom.get()).toBeInstanceOf(TypeError);
			expect(errorAtom.get()?.message).toBe("Type mismatch");
		});
	});

	describe("streamDataAtom", () => {
		it("should initialize as null", () => {
			expect(streamDataAtom.get()).toBeNull();
		});

		it("should store stream data", () => {
			// Mock a simple async iterable
			const mockStream = {
				[Symbol.asyncIterator]: async function* () {
					yield { type: "text-delta", textDelta: "Hello" };
				},
			};
			// The type is complex, so we just verify it can be set
			streamDataAtom.set(
				mockStream as unknown as Parameters<typeof streamDataAtom.set>[0],
			);
			expect(streamDataAtom.get()).toBe(mockStream);
		});
	});

	describe("dataAtom", () => {
		it("should initialize as null", () => {
			expect(dataAtom.get()).toBeNull();
		});

		it("should store parsed data array", () => {
			const mockData = [
				{
					type: "text-delta" as const,
					id: "1",
					text: "Hello ",
					textDelta: "Hello ",
				},
				{
					type: "text-delta" as const,
					id: "2",
					text: "world",
					textDelta: "world",
				},
			];
			dataAtom.set(mockData as unknown as Parameters<typeof dataAtom.set>[0]);
			expect(dataAtom.get()).toHaveLength(2);
		});

		it("should allow clearing data", () => {
			const mockData = [
				{
					type: "text-delta" as const,
					id: "1",
					text: "Test",
					textDelta: "Test",
				},
			];
			dataAtom.set(mockData as unknown as Parameters<typeof dataAtom.set>[0]);
			dataAtom.set(null);
			expect(dataAtom.get()).toBeNull();
		});
	});

	describe("atom interactions", () => {
		it("should allow simulating a prompt flow", () => {
			// Start loading
			loadingAtom.set(true);
			errorAtom.set(null);

			// Add to conversation
			conversationAtom.set([...conversationAtom.get(), "User prompt"]);

			expect(loadingAtom.get()).toBe(true);
			expect(conversationAtom.get()).toContain("User prompt");

			// Complete loading
			loadingAtom.set(false);
			expect(loadingAtom.get()).toBe(false);
		});

		it("should allow simulating an error flow", () => {
			loadingAtom.set(true);
			conversationAtom.set(["User prompt"]);

			// Simulate error
			const error = new Error("API Error");
			errorAtom.set(error);
			loadingAtom.set(false);

			expect(errorAtom.get()).toBe(error);
			expect(loadingAtom.get()).toBe(false);
		});
	});
});
