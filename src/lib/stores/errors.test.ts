import { describe, it, expect, beforeEach, vi } from "vitest";
import {
	currentErrorAtom,
	errorHistoryAtom,
	setError,
	clearError,
	clearErrorHistory,
} from "./errors";

describe("errors store", () => {
	beforeEach(() => {
		currentErrorAtom.set(null);
		errorHistoryAtom.set([]);
	});

	describe("setError", () => {
		it("should set current error with proper categorization", () => {
			const error = new Error("Something went wrong");
			const promptError = setError(error);

			expect(promptError.id).toBeDefined();
			expect(promptError.category).toBe("unknown");
			expect(promptError.title).toBe("Something Went Wrong");
			expect(promptError.message).toContain("Something went wrong");
			expect(promptError.originalError).toBe(error);
			expect(promptError.timestamp).toBeDefined();
			expect(promptError.isRetryable).toBe(true);
		});

		it("should categorize network errors", () => {
			const error = new Error("Network connection failed");
			const promptError = setError(error);

			expect(promptError.category).toBe("network");
			expect(promptError.title).toBe("Connection Error");
			expect(promptError.isRetryable).toBe(true);
		});

		it("should categorize fetch errors", () => {
			const error = new Error("Failed to fetch");
			const promptError = setError(error);

			expect(promptError.category).toBe("network");
		});

		it("should categorize offline errors", () => {
			const error = new Error("You are offline");
			const promptError = setError(error);

			expect(promptError.category).toBe("network");
		});

		it("should categorize rate limit errors", () => {
			const error = new Error("Rate limit exceeded");
			const promptError = setError(error);

			expect(promptError.category).toBe("rate_limit");
			expect(promptError.title).toBe("Rate Limited");
			expect(promptError.isRetryable).toBe(true);
		});

		it("should categorize 429 errors", () => {
			const error = new Error("Error 429: Too many requests");
			const promptError = setError(error);

			expect(promptError.category).toBe("rate_limit");
		});

		it("should categorize context/token errors", () => {
			const error = new Error("Context length exceeded");
			const promptError = setError(error);

			expect(promptError.category).toBe("context");
			expect(promptError.title).toBe("Message Too Long");
			expect(promptError.isRetryable).toBe(false);
		});

		it("should categorize token limit errors", () => {
			const error = new Error("Token limit reached");
			const promptError = setError(error);

			expect(promptError.category).toBe("context");
		});

		it("should categorize model errors", () => {
			const error = new Error("Model not available");
			const promptError = setError(error);

			expect(promptError.category).toBe("model");
			expect(promptError.title).toBe("AI Model Error");
			expect(promptError.isRetryable).toBe(true);
		});

		it("should categorize model download errors", () => {
			const error = new Error("Failed to download model");
			const promptError = setError(error);

			expect(promptError.category).toBe("model");
		});

		it("should categorize permission errors", () => {
			const error = new Error("Permission denied");
			const promptError = setError(error);

			expect(promptError.category).toBe("permission");
			expect(promptError.title).toBe("Permission Denied");
			expect(promptError.isRetryable).toBe(false);
		});

		it("should categorize unauthorized errors", () => {
			const error = new Error("Unauthorized access");
			const promptError = setError(error);

			expect(promptError.category).toBe("permission");
		});

		it("should categorize API errors", () => {
			const error = new Error("API returned an error");
			const promptError = setError(error);

			expect(promptError.category).toBe("api");
			expect(promptError.title).toBe("AI Error");
			expect(promptError.isRetryable).toBe(true);
		});

		it("should store retry action", () => {
			const retryFn = vi.fn();
			const error = new Error("Test error");
			const promptError = setError(error, retryFn);

			expect(promptError.retryAction).toBe(retryFn);
		});

		it("should add error to history", () => {
			setError(new Error("Error 1"));
			setError(new Error("Error 2"));

			const history = errorHistoryAtom.get();
			expect(history).toHaveLength(2);
			expect(history[0].message).toContain("Error 2");
			expect(history[1].message).toContain("Error 1");
		});

		it("should limit history to 50 entries", () => {
			for (let i = 0; i < 55; i++) {
				setError(new Error(`Error ${i}`));
			}

			const history = errorHistoryAtom.get();
			expect(history).toHaveLength(50);
		});

		it("should set current error atom", () => {
			const error = new Error("Current error");
			setError(error);

			const current = currentErrorAtom.get();
			expect(current).not.toBeNull();
			expect(current?.message).toContain("Current error");
		});
	});

	describe("clearError", () => {
		it("should clear the current error", () => {
			setError(new Error("Test error"));
			expect(currentErrorAtom.get()).not.toBeNull();

			clearError();
			expect(currentErrorAtom.get()).toBeNull();
		});
	});

	describe("clearErrorHistory", () => {
		it("should clear all error history", () => {
			setError(new Error("Error 1"));
			setError(new Error("Error 2"));
			expect(errorHistoryAtom.get()).toHaveLength(2);

			clearErrorHistory();
			expect(errorHistoryAtom.get()).toHaveLength(0);
		});
	});

	describe("user-friendly messages", () => {
		it("should provide helpful message for network errors", () => {
			const error = new Error("Network error");
			const promptError = setError(error);

			expect(promptError.message).toContain("internet connection");
		});

		it("should provide helpful message for rate limit errors", () => {
			const error = new Error("Rate limit");
			const promptError = setError(error);

			expect(promptError.message).toContain("wait");
		});

		it("should provide helpful message for context errors", () => {
			const error = new Error("Context too long");
			const promptError = setError(error);

			expect(promptError.message).toContain("too long");
		});

		it("should provide helpful message for model errors", () => {
			const error = new Error("Model not available");
			const promptError = setError(error);

			expect(promptError.message).toContain("model");
		});

		it("should provide helpful message for permission errors", () => {
			const error = new Error("Permission denied");
			const promptError = setError(error);

			expect(promptError.message).toContain("permission");
		});
	});
});

