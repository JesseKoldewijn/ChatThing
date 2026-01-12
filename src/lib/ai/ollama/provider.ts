import {
	streamText,
	generateText,
	type ModelMessage as CoreMessage,
} from "ai";
import { createOllama } from "ai-sdk-ollama";
import { type Message } from "@/lib/stores/chat";
import { type AIProvider, type PromptOptions, type ProviderType, PROVIDER_OLLAMA, type StreamPart } from "../types";

export interface OllamaSettings {
	baseUrl: string;
	model: string;
	apiKey?: string;
}

/**
 * Strip data URL prefix if present
 * e.g. "data:image/jpeg;base64,..." -> "..."
 */
const stripDataUrlPrefix = (data: string): string => {
	if (data.startsWith("data:")) {
		const base64Index = data.indexOf(";base64,");
		if (base64Index !== -1) {
			return data.slice(base64Index + 8);
		}
	}
	return data;
};

const convertHistoryToMessages = (history?: Message[]): CoreMessage[] => {
	if (!history || history.length === 0) return [];

	return history
		.filter((msg) => msg.role !== "system")
		.map((msg): CoreMessage => {
			if (msg.role === "user") {
				if (msg.images && msg.images.length > 0) {
					return {
						role: "user",
						content: [
							{ type: "text", text: msg.content },
							...msg.images.map((img) => ({
								type: "image" as const,
								image: stripDataUrlPrefix(img.data),
							})),
						],
					};
				}
				return { role: "user", content: msg.content };
			}
			return { role: "assistant", content: msg.content };
		});
};

export class OllamaProvider implements AIProvider {
	readonly type: ProviderType = PROVIDER_OLLAMA;
	private client;
	private settings: OllamaSettings;

	constructor(settings: OllamaSettings) {
		this.settings = settings;
		// ai-sdk-ollama (and the underlying ollama-js) typically expects the base URL 
		// without the /api suffix, e.g., http://localhost:11434
		const baseURL = settings.baseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

		this.client = createOllama({
			baseURL,
			apiKey: settings.apiKey,
		});
	}

	private get model() {
		const model = this.client(this.settings.model);
		// Force specification version to v3 if missing or v1 to satisfy AI SDK v6
		// @ts-expect-error - forcing specification version for compatibility
		if (!model.specificationVersion || model.specificationVersion === "v1") {
			// @ts-expect-error - forcing specification version for compatibility
			model.specificationVersion = "v3";
		}
		return model;
	}

	async prompt(
		prompt: string,
		options?: PromptOptions
	): Promise<AsyncIterable<StreamPart>> {
		const systemPrompt = `You are a helpful AI assistant. 
Current Date and Time: ${new Date().toLocaleString()}

CRITICAL RULES:
1. Respond naturally to the user.
2. If you need to know about the conversation history, refer to the messages provided in the context.`;

		const messages: CoreMessage[] = [
			{ role: "system", content: systemPrompt },
			...convertHistoryToMessages(options?.history),
			{
				role: "user",
				content:
					options?.images && options.images.length > 0
						? [
								{ type: "text", text: prompt },
								...options.images.map((img) => ({
									type: "image" as const,
									image: stripDataUrlPrefix(img.data),
								})),
							]
						: prompt,
			},
		];

		const result = streamText({
			model: this.model,
			messages,
		});

		const textStream = result.textStream;

		return (async function* () {
			try {
				for await (const chunk of textStream) {
					yield { type: "text", content: chunk };
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
