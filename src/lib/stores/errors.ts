import { atom } from "nanostores";
import { providerTypeAtom } from "./settings";

export type ErrorCategory = 
	| "network"      // Network/connection issues
	| "api"          // API-level errors from the AI
	| "model"        // Model loading/availability issues
	| "rate_limit"   // Rate limiting
	| "context"      // Context length exceeded
	| "permission"   // Permission denied
	| "unknown";     // Unknown errors

export interface PromptError {
	id: string;
	category: ErrorCategory;
	title: string;
	message: string;
	originalError: Error;
	timestamp: number;
	isRetryable: boolean;
	retryAction?: () => void;
}

// Current error to display
export const currentErrorAtom = atom<PromptError | null>(null);

// Error history for debugging
export const errorHistoryAtom = atom<PromptError[]>([]);

/**
 * Categorize an error based on its message and type
 */
const categorizeError = (error: Error): { category: ErrorCategory; title: string; isRetryable: boolean } => {
	const message = error.message.toLowerCase();
	const name = error.name.toLowerCase();

	// Network errors
	if (
		message.includes("network") ||
		message.includes("fetch") ||
		message.includes("connection") ||
		message.includes("offline") ||
		name.includes("networkerror") ||
		name.includes("typeerror") && message.includes("failed to fetch")
	) {
		return {
			category: "network",
			title: "Connection Error",
			isRetryable: true,
		};
	}

	// Rate limiting
	if (
		message.includes("rate limit") ||
		message.includes("too many requests") ||
		message.includes("429")
	) {
		return {
			category: "rate_limit",
			title: "Rate Limited",
			isRetryable: true,
		};
	}

	// Context/token limit
	if (
		message.includes("context") ||
		message.includes("token") ||
		message.includes("too long") ||
		message.includes("maximum length")
	) {
		return {
			category: "context",
			title: "Message Too Long",
			isRetryable: false,
		};
	}

	// Model issues
	if (
		message.includes("model") ||
		message.includes("not available") ||
		message.includes("not found") ||
		message.includes("download") ||
		message.includes("load")
	) {
		return {
			category: "model",
			title: "AI Model Error",
			isRetryable: true,
		};
	}

	// Permission errors
	if (
		message.includes("permission") ||
		message.includes("denied") ||
		message.includes("unauthorized") ||
		message.includes("forbidden")
	) {
		return {
			category: "permission",
			title: "Permission Denied",
			isRetryable: false,
		};
	}

	// Image support errors
	if (message.includes("no endpoints found that support image input") || message.includes("multimodal")) {
		return {
			category: "model",
			title: "Image Input Not Supported",
			isRetryable: false,
		};
	}

	// API errors (generic)
	if (
		message.includes("api") ||
		message.includes("error") ||
		name.includes("apierror")
	) {
		return {
			category: "api",
			title: "AI Error",
			isRetryable: true,
		};
	}

	return {
		category: "unknown",
		title: "Something Went Wrong",
		isRetryable: true,
	};
};

/**
 * Get a user-friendly message for an error
 */
const getUserFriendlyMessage = (error: Error, category: ErrorCategory): string => {
	switch (category) {
		case "network":
			return "Unable to connect to the AI. Please check your internet connection and try again.";
		
		case "rate_limit":
			return "You're sending messages too quickly. Please wait a moment before trying again.";
		
		case "context":
			return "Your message or conversation is too long. Try starting a new conversation or sending a shorter message.";
		
		case "model": {
			const providerType = providerTypeAtom.get();
			const msg = error.message.toLowerCase();
			if (msg.includes("image input") || msg.includes("multimodal")) {
				if (providerType === "open-router") {
					return "The selected model does not support image input. Please choose a multimodal model (like Gemini 1.5 Flash or Claude 3.5 Sonnet) to use this feature.";
				}
				if (providerType === "prompt-api") {
					return "The built-in AI (Gemini Nano) requires the 'Prompt API Multimodal' flag to be enabled in Chrome (chrome://flags/#optimization-guide-on-device-multimodal) to support image input.";
				}
			}
			return "The AI model is temporarily unavailable. This might be due to the model still downloading or a temporary issue. Please try again in a moment.";
		}
		
		case "permission":
			return "You don't have permission to use this feature. Please check your browser settings and ensure the Prompt API is enabled.";
		
		case "api":
			return `The AI encountered an error while processing your request. ${error.message}`;
		
		default:
			return `An unexpected error occurred: ${error.message}`;
	}
};

/**
 * Set the current error with proper categorization
 */
export const setError = (error: Error, retryAction?: () => void): PromptError => {
	const { category, title, isRetryable } = categorizeError(error);
	
	const promptError: PromptError = {
		id: crypto.randomUUID(),
		category,
		title,
		message: getUserFriendlyMessage(error, category),
		originalError: error,
		timestamp: Date.now(),
		isRetryable,
		retryAction,
	};

	currentErrorAtom.set(promptError);
	errorHistoryAtom.set([promptError, ...errorHistoryAtom.get()].slice(0, 50));

	return promptError;
};

/**
 * Clear the current error
 */
export const clearError = () => {
	currentErrorAtom.set(null);
};

/**
 * Clear all error history
 */
export const clearErrorHistory = () => {
	errorHistoryAtom.set([]);
};

