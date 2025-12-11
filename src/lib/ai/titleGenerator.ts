import type { BuiltInAIChatSettings } from "@built-in-ai/core";

// Lazy-loaded AI modules cache (shared with prompt.ts pattern)
let titleGenCache: {
	generateText: typeof import("ai").generateText;
	builtInAI: typeof import("@built-in-ai/core").builtInAI;
} | null = null;

// Lazy load AI dependencies
const loadTitleGenModules = async () => {
	if (!titleGenCache) {
		const [aiModule, builtInAIModule] = await Promise.all([
			import("ai"),
			import("@built-in-ai/core"),
		]);
		titleGenCache = {
			generateText: aiModule.generateText,
			builtInAI: builtInAIModule.builtInAI,
		};
	}
	return titleGenCache;
};

/**
 * Generate a short, descriptive title for a conversation based on the first message
 * @param firstMessage - The first user message in the conversation
 * @returns A short title (max ~30 chars) summarizing the conversation topic
 */
export const generateConversationTitle = async (
	firstMessage: string
): Promise<string> => {
	const MAX_TITLE_LENGTH = 30;

	try {
		// Lazy load AI modules on first use
		const { generateText, builtInAI } = await loadTitleGenModules();

		// Create a prompt asking for a short title
		const prompt = `Generate a very short title (maximum 4-5 words, under 30 characters) for a conversation that starts with this message. Return ONLY the title, no quotes, no explanation, no punctuation at the end.

Message: "${firstMessage.slice(0, 200)}"

Title:`;

		const result = await generateText({
			model: builtInAI(undefined, {
				expectedOutputLanguages: ["en"],
			} as BuiltInAIChatSettings),
			prompt,
		});

		// Clean up the result
		let title = result.text
			.trim()
			.replace(/^["']|["']$/g, "") // Remove quotes
			.replace(/[.!?]+$/, "") // Remove trailing punctuation
			.trim();

		// Ensure it's not too long
		if (title.length > MAX_TITLE_LENGTH) {
			// Try to cut at a word boundary
			const truncated = title.slice(0, MAX_TITLE_LENGTH);
			const lastSpace = truncated.lastIndexOf(" ");
			if (lastSpace > MAX_TITLE_LENGTH * 0.6) {
				title = truncated.slice(0, lastSpace);
			} else {
				title = truncated.trim() + "...";
			}
		}

		// Fallback if empty
		if (!title || title.length < 2) {
			return fallbackTitle(firstMessage);
		}

		return title;
	} catch (error) {
		// If AI fails, use fallback
		console.warn("Failed to generate title with AI:", error);
		return fallbackTitle(firstMessage);
	}
};

/**
 * Fallback title generation using simple truncation
 */
const fallbackTitle = (message: string): string => {
	const MAX_LENGTH = 30;
	const cleaned = message.trim();
	if (cleaned.length <= MAX_LENGTH) {
		return cleaned;
	}
	// Try to cut at a word boundary
	const truncated = cleaned.slice(0, MAX_LENGTH);
	const lastSpace = truncated.lastIndexOf(" ");
	if (lastSpace > MAX_LENGTH * 0.5) {
		return truncated.slice(0, lastSpace) + "...";
	}
	return truncated.trim() + "...";
};

/**
 * Check if a conversation needs a title generated
 */
export const needsTitleGeneration = (currentTitle: string): boolean => {
	return currentTitle === "New Chat" || currentTitle === "";
};
