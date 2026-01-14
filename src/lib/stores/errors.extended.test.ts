import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	clearError,
	clearErrorHistory,
	errorHistoryAtom,
	setError,
} from "./errors";
import {
	PROVIDER_GOOGLE,
	PROVIDER_OLLAMA,
	PROVIDER_OPEN_ROUTER,
	providerTypeAtom,
} from "./settings";

describe("errors store - extended coverage", () => {
	beforeEach(() => {
		clearError();
		clearErrorHistory();
		providerTypeAtom.set(PROVIDER_OLLAMA);
		vi.clearAllMocks();
	});

	describe("categorizeError and userFriendlyMessage", () => {
		it("should handle AI_APICallError with 429 status (Rate Limit)", () => {
			const error = new Error("Rate limit exceeded");
			error.name = "AI_APICallError";
			(error as unknown as { statusCode: number }).statusCode = 429;

			const promptError = setError(error);
			expect(promptError.category).toBe("rate_limit");
			expect(promptError.title).toBe("Rate Limited");
			expect(promptError.isRetryable).toBe(true);
			expect(promptError.message).toContain("rate limit");
		});

		it("should handle AI_APICallError with 401 status (Authentication)", () => {
			const error = new Error("Unauthorized");
			error.name = "APICallError";
			(error as unknown as { statusCode: number }).statusCode = 401;
			providerTypeAtom.set(PROVIDER_GOOGLE);

			const promptError = setError(error);
			expect(promptError.category).toBe("permission");
			expect(promptError.title).toBe("Authentication Error");
			expect(promptError.message).toContain("Google Gemini");
			expect(promptError.message).toContain("invalid");
		});

		it("should handle AI_APICallError with 404 status (Model Not Found)", () => {
			const error = new Error("Not Found");
			error.name = "OllamaError";
			(error as unknown as { statusCode: number }).statusCode = 404;

			const promptError = setError(error);
			expect(promptError.category).toBe("model");
			expect(promptError.title).toBe("Model Not Found");
			expect(promptError.message).toContain("not found");
		});

		it("should handle AI_APICallError with 500 status (Provider Error)", () => {
			const error = new Error("Internal Server Error");
			error.name = "apicallerror";
			(error as unknown as { statusCode: number }).statusCode = 500;
			providerTypeAtom.set(PROVIDER_OPEN_ROUTER);

			const promptError = setError(error);
			expect(promptError.category).toBe("api");
			expect(promptError.title).toBe("AI Provider Error");
			expect(promptError.message).toContain("internal errors");
		});

		it("should handle AI_APICallError with 503 status (Overloaded)", () => {
			const error = new Error("Service Unavailable");
			error.name = "aicallerror";
			(error as unknown as { statusCode: number }).statusCode = 503;

			const promptError = setError(error);
			expect(promptError.message).toContain("overloaded");
		});

		it("should handle generic 4xx errors from AI provider", () => {
			const error = new Error("Bad Request");
			error.name = "apierror";
			(error as unknown as { statusCode: number }).statusCode = 400;

			const promptError = setError(error);
			expect(promptError.message).toContain("HTTP 400");
		});

		it("should handle context length errors", () => {
			const error = new Error("The context length has been exceeded");
			const promptError = setError(error);
			expect(promptError.category).toBe("context");
			expect(promptError.title).toBe("Message Too Long");
			expect(promptError.isRetryable).toBe(false);
		});

		it("should handle model loading/download issues", () => {
			const error = new Error("Model download in progress");
			const promptError = setError(error);
			expect(promptError.category).toBe("model");
			expect(promptError.isRetryable).toBe(true);
		});

		it("should handle permission denied errors", () => {
			const error = new Error("Permission denied by user");
			const promptError = setError(error);
			expect(promptError.category).toBe("permission");
			expect(promptError.isRetryable).toBe(false);
		});

		it("should handle multimodal/image errors for OpenRouter", () => {
			providerTypeAtom.set(PROVIDER_OPEN_ROUTER);
			const error = new Error("No endpoints found that support image input");
			const promptError = setError(error);
			expect(promptError.category).toBe("model");
			expect(promptError.message).toContain("multimodal model");
			expect(promptError.message).toContain("Claude 3.5 Sonnet");
		});

		it("should handle multimodal/image errors for Google", () => {
			providerTypeAtom.set(PROVIDER_GOOGLE);
			const error = new Error("multimodal input not supported");
			const promptError = setError(error);
			expect(promptError.message).toContain("Gemini 1.5 Flash");
		});

		it("should handle generic network errors for Ollama", () => {
			providerTypeAtom.set(PROVIDER_OLLAMA);
			const error = new TypeError("Failed to fetch");
			const promptError = setError(error);
			expect(promptError.category).toBe("network");
			expect(promptError.message).toContain(
				"ensure the Ollama server is running",
			);
		});

		it("should handle unknown errors", () => {
			const error = new Error("Something very strange happened");
			const promptError = setError(error);
			expect(promptError.category).toBe("unknown");
			expect(promptError.title).toBe("Something Went Wrong");
		});
	});

	describe("error history", () => {
		it("should limit error history to 50 items", () => {
			for (let i = 0; i < 60; i++) {
				setError(new Error(`Error ${i}`));
			}
			expect(errorHistoryAtom.get()).toHaveLength(50);
			expect(errorHistoryAtom.get()[0].originalError.message).toBe("Error 59");
		});

		it("should clear error history", () => {
			setError(new Error("Test"));
			expect(errorHistoryAtom.get()).toHaveLength(1);
			clearErrorHistory();
			expect(errorHistoryAtom.get()).toHaveLength(0);
		});
	});
});
