import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import {
	compatibilityAtom,
	compatibilityCheckingAtom,
	useCompatibility,
	usePrompt,
} from "./hooks";
import {
	loadingAtom,
	errorAtom,
	streamDataAtom,
	dataAtom,
	conversationAtom,
} from "./store";

// Mock the compat module
vi.mock("./prompt-api/compat", () => ({
	compatibilityCheck: vi.fn().mockResolvedValue({
		isCompatible: true,
		availability: "available",
		error: null,
		browserInfo: { vendor: "chrome", version: "138", supportsPromptApi: true, minRequiredVersion: 138 },
		instructions: null,
	}),
	quickCompatibilityCheck: vi.fn().mockReturnValue({
		isSupported: true,
		browserInfo: { vendor: "chrome", version: "138", supportsPromptApi: true, minRequiredVersion: 138 },
	}),
}));

// Mock index
vi.mock("./index", () => ({
	getAIManager: vi.fn(() => ({
		prompt: vi.fn().mockResolvedValue({
			[Symbol.asyncIterator]: async function* () {
				yield { type: "text-delta", text: "Hello" };
			},
		}),
	})),
}));

// Mock settings
vi.mock("@/lib/stores/settings", async () => {
	const { atom } = await import("nanostores");
	return {
		providerTypeAtom: atom("prompt-api"),
	};
});

// Mock the manager module for promptStreamReader
vi.mock("./manager", () => ({
	promptStreamReader: vi.fn().mockResolvedValue([
		{ type: "text-delta", text: "Hello" },
	]),
}));

describe("hooks atoms", () => {
	beforeEach(() => {
		// Reset atoms
		compatibilityAtom.set(null);
		compatibilityCheckingAtom.set(true);
		loadingAtom.set(false);
		errorAtom.set(null);
		streamDataAtom.set(null);
		dataAtom.set(null);
		conversationAtom.set([]);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("compatibilityAtom", () => {
		it("should initialize as null", () => {
			expect(compatibilityAtom.get()).toBeNull();
		});

		it("should accept compatibility result", () => {
			const result = {
				isCompatible: true,
				availability: "available" as const,
				error: null,
				browserInfo: {
					vendor: "chrome" as const,
					version: "138",
					supportsPromptApi: true,
					minRequiredVersion: 138,
				},
				instructions: null,
			};
			compatibilityAtom.set(result);
			expect(compatibilityAtom.get()).toEqual(result);
		});

		it("should store incompatible result", () => {
			const result = {
				isCompatible: false,
				availability: "unsupported" as const,
				error: new Error("Not supported"),
				browserInfo: {
					vendor: "firefox" as const,
					version: "121",
					supportsPromptApi: false,
					minRequiredVersion: 999,
				},
				instructions: "Please use Chrome",
			};
			compatibilityAtom.set(result);
			expect(compatibilityAtom.get()?.isCompatible).toBe(false);
		});
	});

	describe("compatibilityCheckingAtom", () => {
		it("should initialize as true", () => {
			expect(compatibilityCheckingAtom.get()).toBe(true);
		});

		it("should toggle between states", () => {
			compatibilityCheckingAtom.set(false);
			expect(compatibilityCheckingAtom.get()).toBe(false);
			compatibilityCheckingAtom.set(true);
			expect(compatibilityCheckingAtom.get()).toBe(true);
		});
	});
});

describe("useCompatibility hook", () => {
	beforeEach(() => {
		compatibilityAtom.set(null);
		compatibilityCheckingAtom.set(true);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should return compatibility state", async () => {
		const { result } = renderHook(() => useCompatibility());

		await waitFor(() => {
			expect(result.current.isChecking).toBe(false);
		});

		expect(result.current.compatibility).toBeDefined();
	});

	it("should return isChecking state", () => {
		const { result } = renderHook(() => useCompatibility());
		expect(typeof result.current.isChecking).toBe("boolean");
	});

	it("should return recheck function", () => {
		const { result } = renderHook(() => useCompatibility());
		expect(typeof result.current.recheck).toBe("function");
	});

	it("should run compatibility check on mount", async () => {
		const { compatibilityCheck } = await import("./prompt-api/compat");

		renderHook(() => useCompatibility());

		await waitFor(() => {
			expect(compatibilityCheck).toHaveBeenCalled();
		});
	});
});

describe("usePrompt hook", () => {
	beforeEach(() => {
		loadingAtom.set(false);
		errorAtom.set(null);
		streamDataAtom.set(null);
		dataAtom.set(null);
		conversationAtom.set([]);
		compatibilityAtom.set({
			isCompatible: true,
			availability: "available",
			error: null,
			browserInfo: {
				vendor: "chrome",
				version: "138",
				supportsPromptApi: true,
				minRequiredVersion: 138,
			},
			instructions: null,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should return loading state", () => {
		const { result } = renderHook(() => usePrompt());
		expect(typeof result.current.loading).toBe("boolean");
	});

	it("should return error state", () => {
		const { result } = renderHook(() => usePrompt());
		expect(result.current.error).toBeNull();
	});

	it("should return prompt function", () => {
		const { result } = renderHook(() => usePrompt());
		expect(typeof result.current.prompt).toBe("function");
	});

	it("should return streamData state", () => {
		const { result } = renderHook(() => usePrompt());
		expect(result.current.streamData).toBeNull();
	});

	it("should return data state", () => {
		const { result } = renderHook(() => usePrompt());
		expect(result.current.data).toBeNull();
	});

	it("should set error when compatibility check fails", async () => {
		compatibilityAtom.set({
			isCompatible: false,
			availability: "unsupported",
			error: new Error("Not compatible"),
			browserInfo: {
				vendor: "firefox",
				version: "121",
				supportsPromptApi: false,
				minRequiredVersion: 999,
			},
			instructions: "Use Chrome",
		});

		const { result } = renderHook(() => usePrompt());

		await act(async () => {
			await result.current.prompt("Hello");
		});

		expect(result.current.error).not.toBeNull();
	});

	it("should reflect loading state from atom", () => {
		loadingAtom.set(true);
		const { result } = renderHook(() => usePrompt());
		expect(result.current.loading).toBe(true);
	});

	it("should reflect error state from atom", () => {
		const error = new Error("Test error");
		errorAtom.set(error);
		const { result } = renderHook(() => usePrompt());
		expect(result.current.error).toBe(error);
	});
});

describe("hook state management", () => {
	beforeEach(() => {
		loadingAtom.set(false);
		errorAtom.set(null);
		conversationAtom.set([]);
	});

	it("should track conversation history", () => {
		conversationAtom.set(["Hello", "Hi there"]);
		expect(conversationAtom.get()).toHaveLength(2);
	});

	it("should append to conversation", () => {
		conversationAtom.set([...conversationAtom.get(), "First"]);
		conversationAtom.set([...conversationAtom.get(), "Second"]);
		expect(conversationAtom.get()).toEqual(["First", "Second"]);
	});
});

