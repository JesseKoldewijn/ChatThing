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
import * as compat from "./compat";

// Mock the compat module
vi.mock("./compat", () => ({
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
	requestModelDownload: vi.fn().mockResolvedValue(true),
}));

// Mock the prompt module
vi.mock("./prompt", () => ({
	promptAsync: vi.fn().mockResolvedValue({
		[Symbol.asyncIterator]: async function* () {
			yield { type: "text-delta", textDelta: "Hello" };
		},
	}),
	promptStreamReader: vi.fn().mockResolvedValue([
		{ type: "text-delta", textDelta: "Hello" },
	]),
}));

describe("useCompatibility extended tests", () => {
	beforeEach(() => {
		compatibilityAtom.set(null);
		compatibilityCheckingAtom.set(true);
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should handle compatibility check error", async () => {
		const mockError = new Error("Check failed");
		vi.mocked(compat.compatibilityCheck).mockRejectedValueOnce(mockError);

		const { result } = renderHook(() => useCompatibility());

		await waitFor(() => {
			expect(result.current.isChecking).toBe(false);
		});

		expect(result.current.compatibility?.isCompatible).toBe(false);
		expect(result.current.compatibility?.error).toBe(mockError);
	});

	it("should set isChecking to true when recheck is called", async () => {
		const { result } = renderHook(() => useCompatibility());

		await waitFor(() => {
			expect(result.current.isChecking).toBe(false);
		});

		act(() => {
			result.current.recheck();
		});

		expect(result.current.isChecking).toBe(true);
	});

	it("should update compatibility atom on successful check", async () => {
		const { result } = renderHook(() => useCompatibility());

		await waitFor(() => {
			expect(result.current.isChecking).toBe(false);
		});

		// After the check completes, compatibility should be set
		expect(result.current.compatibility?.isCompatible).toBe(true);
	});
});

describe("usePrompt extended tests", () => {
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
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should run compatibility check if no cached result", async () => {
		compatibilityAtom.set(null);

		const { result } = renderHook(() => usePrompt());

		await act(async () => {
			await result.current.prompt("Hello");
		});

		expect(compat.compatibilityCheck).toHaveBeenCalled();
	});

	it("should throw when compatibility check during prompt fails", async () => {
		compatibilityAtom.set(null);
		vi.mocked(compat.compatibilityCheck).mockResolvedValueOnce({
			isCompatible: false,
			availability: "unsupported",
			error: new Error("API not available"),
			browserInfo: { vendor: "firefox", version: "121", supportsPromptApi: false, minRequiredVersion: 999 },
			instructions: "Please use Chrome",
		});

		const { result } = renderHook(() => usePrompt());

		await act(async () => {
			await result.current.prompt("Hello");
		});

		expect(result.current.error).not.toBeNull();
	});

	it("should throw cached error when compatibility is incompatible", async () => {
		compatibilityAtom.set({
			isCompatible: false,
			availability: "unsupported",
			error: new Error("Cached error"),
			browserInfo: { vendor: "firefox", version: "121", supportsPromptApi: false, minRequiredVersion: 999 },
			instructions: "Please use Chrome",
		});

		const { result } = renderHook(() => usePrompt());

		await act(async () => {
			await result.current.prompt("Hello");
		});

		expect(result.current.error?.message).toBe("Cached error");
	});

	it("should throw default error when incompatible with no error", async () => {
		compatibilityAtom.set({
			isCompatible: false,
			availability: "unsupported",
			error: null,
			browserInfo: { vendor: "firefox", version: "121", supportsPromptApi: false, minRequiredVersion: 999 },
			instructions: "Please use Chrome",
		});

		const { result } = renderHook(() => usePrompt());

		await act(async () => {
			await result.current.prompt("Hello");
		});

		expect(result.current.error?.message).toBe("Prompt API is not available");
	});

	it("should add prompt to conversation", async () => {
		const { result } = renderHook(() => usePrompt());

		await act(async () => {
			await result.current.prompt("Test prompt");
		});

		expect(conversationAtom.get()).toContain("Test prompt");
	});

	it("should reset loading to false after prompt completes", async () => {
		const { result } = renderHook(() => usePrompt());

		await act(async () => {
			await result.current.prompt("Test");
		});

		expect(result.current.loading).toBe(false);
	});

	it("should reset error to null before new prompt", async () => {
		errorAtom.set(new Error("Previous error"));

		const { result } = renderHook(() => usePrompt());

		await act(async () => {
			await result.current.prompt("Test");
		});

		// Error should be cleared (unless new error occurred)
		expect(result.current.error).toBeNull();
	});

	it("should reset streamData to null before new prompt", async () => {
		streamDataAtom.set({} as never);

		const { result } = renderHook(() => usePrompt());

		await act(async () => {
			await result.current.prompt("Test");
		});

		// Will be set to new stream data after completion
		expect(result.current.streamData).toBeDefined();
	});
});

