import type { Message } from "@/lib/stores/chat";
import { builtInAI } from "@built-in-ai/core";
import { type ModelMessage as CoreMessage, generateText, streamText } from "ai";
import {
	type AIProvider,
	PROVIDER_PROMPT_API,
	type PromptOptions,
	type ProviderType,
	type StreamPart,
} from "../types";

const convertHistoryToMessages = (history?: Message[]): CoreMessage[] => {
	if (!history || history.length === 0) return [];

	return history
		.filter((msg) => msg.role !== "system")
		.map((msg): CoreMessage => {
			if (msg.role === "user") {
				return { role: "user", content: msg.content };
			}
			return { role: "assistant", content: msg.content };
		});
};

export class PromptApiProvider implements AIProvider {
	readonly type: ProviderType = PROVIDER_PROMPT_API;
	private model = builtInAI("text");

	async prompt(
		prompt: string,
		options?: PromptOptions,
	): Promise<AsyncIterable<StreamPart>> {
		const messages: CoreMessage[] = [
			{
				role: "system",
				content: `You are a helpful AI assistant running locally in the browser. 
Current Date and Time: ${new Date().toLocaleString()}

CRITICAL RULES:
1. Respond naturally to the user.
2. If you need to know about the conversation history, refer to the messages provided in the context.`,
			},
			...convertHistoryToMessages(options?.history),
			{
				role: "user",
				content: prompt,
			},
		];

		const result = streamText({
			model: this.model,
			messages,
		});

		return (async function* () {
			try {
				for await (const part of result.fullStream) {
					switch (part.type) {
						case "text-delta":
							yield { type: "text", content: part.text };
							break;
						case "error":
							yield { type: "error", error: part.error };
							break;
					}
				}
			} catch (error) {
				yield { type: "error", error };
			}
		})();
	}

	async generateTitle(firstMessage: string): Promise<string> {
		const MAX_TITLE_LENGTH = 30;

		try {
			const { text } = await generateText({
				model: this.model,
				messages: [
					{
						role: "user",
						content: `Generate a very short title (maximum 4-5 words, under 30 characters) for a conversation that starts with this message. Return ONLY the title, no quotes, no explanation, no punctuation at the end.

Message: "${firstMessage.slice(0, 200)}"

Title:`,
					},
				],
			});

			let title = text
				.trim()
				.replace(/^["']|["']$/g, "")
				.replace(/[.!?]+$/, "")
				.trim();

			if (title.length > MAX_TITLE_LENGTH) {
				const truncated = title.slice(0, MAX_TITLE_LENGTH);
				const lastSpace = truncated.lastIndexOf(" ");
				title =
					lastSpace > MAX_TITLE_LENGTH * 0.6
						? truncated.slice(0, lastSpace)
						: truncated.trim() + "...";
			}

			return title || this.fallbackTitle(firstMessage);
		} catch {
			// Fail silently or fallback
			return this.fallbackTitle(firstMessage);
		}
	}

	private fallbackTitle(message: string): string {
		const MAX_LENGTH = 30;
		const cleaned = message.trim();
		if (cleaned.length <= MAX_LENGTH) return cleaned;
		const truncated = cleaned.slice(0, MAX_LENGTH);
		const lastSpace = truncated.lastIndexOf(" ");
		return lastSpace > MAX_LENGTH * 0.5
			? truncated.slice(0, lastSpace) + "..."
			: truncated.trim() + "...";
	}
}
