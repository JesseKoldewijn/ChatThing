import {
	type AsyncIterableStream,
	type TextStreamPart,
	type ToolSet,
	type CoreMessage,
	streamText,
	generateText,
} from "ai";
import { createOllama } from "ollama-ai-provider-v2";
import { type Message } from "@/lib/stores/chat";
import { tools } from "../tools";
import type { AIProvider, PromptOptions, ProviderType } from "../types";

export interface OllamaSettings {
	baseUrl: string;
	model: string;
}

const isToolUIMessage = (content: string): boolean => {
	if (content.startsWith("🔧 Using tool:")) return true;
	if (content.startsWith("❌ Error:")) return true;
	return false;
};

const convertHistoryToMessages = (history?: Message[]): CoreMessage[] => {
	if (!history || history.length === 0) return [];

	return history
		.filter((msg) => {
			if (msg.role === "assistant" && isToolUIMessage(msg.content)) return false;
			return true;
		})
		.map((msg): CoreMessage => {
			if (msg.role === "user") {
				if (msg.images && msg.images.length > 0) {
					return {
						role: "user",
						content: [
							{ type: "text", text: msg.content },
							...msg.images.map((img) => ({
								type: "image" as const,
								image: img.data,
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
	readonly type: ProviderType = "ollama";
	private client;
	private settings: OllamaSettings;

	constructor(settings: OllamaSettings) {
		this.settings = settings;
		this.client = createOllama({
			baseURL: settings.baseUrl.endsWith("/api") ? settings.baseUrl : `${settings.baseUrl}/api`,
		});
	}

	private get model() {
		return this.client(this.settings.model);
	}

	async prompt(
		prompt: string,
		options?: PromptOptions
	): Promise<AsyncIterableStream<TextStreamPart<ToolSet>>> {
		const messages: CoreMessage[] = [
			...convertHistoryToMessages(options?.history),
			{
				role: "user",
				content:
					options?.images && options.images.length > 0
						? [
								{ type: "text", text: prompt },
								...options.images.map((img) => ({
									type: "image" as const,
									image: img.data,
								})),
						  ]
						: prompt,
			},
		];

		const result = streamText({
			model: this.model,
			messages,
			tools: tools as unknown as ToolSet,
			system: "You are a helpful AI assistant. Use the provided tools when necessary to answer user questions accurately.",
		});

		return result.fullStream;
	}

	async generateTitle(firstMessage: string): Promise<string> {
		const MAX_TITLE_LENGTH = 30;

		try {
			const { text } = await generateText({
				model: this.model,
				prompt: `Generate a very short title (maximum 4-5 words, under 30 characters) for a conversation that starts with this message. Return ONLY the title, no quotes, no explanation, no punctuation at the end.

Message: "${firstMessage.slice(0, 200)}"

Title:`,
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
		} catch (error) {
			console.warn("Failed to generate title with Ollama:", error);
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

