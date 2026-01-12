import {
	type ModelMessage as CoreMessage,
	streamText,
	generateText,
	type LanguageModel,
} from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { type Message } from "@/lib/stores/chat";
import { weatherTool } from "../tools/weather";
import { datetimeTool } from "../tools/datetime";
import { type AIProvider, type PromptOptions, type ProviderType, PROVIDER_OPEN_ROUTER, type StreamPart } from "../types";

export interface OpenRouterSettings {
	apiKey: string;
	model?: string;
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

export class OpenRouterProvider implements AIProvider {
	readonly type: ProviderType = PROVIDER_OPEN_ROUTER;
	private client;
	private settings: OpenRouterSettings;

	constructor(settings: OpenRouterSettings) {
		this.settings = settings;
		this.client = createOpenRouter({
			apiKey: settings.apiKey,
		});
	}

	private get model(): LanguageModel {
		return this.client.chat(this.settings.model || "mistralai/devstral-2512:free");
	}

	async prompt(
		prompt: string,
		options?: PromptOptions
	): Promise<AsyncIterable<StreamPart>> {
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
									image: stripDataUrlPrefix(img.data),
								})),
							]
						: prompt,
			},
		];

		const result = streamText({
			model: this.model,
			messages,
			tools: {
				weather: weatherTool,
				datetime: datetimeTool,
			},
			// @ts-expect-error - maxSteps is available when tools are used
			maxSteps: 5,
			system: `You are a helpful AI assistant. 
Current Date and Time: ${new Date().toLocaleString()}

CRITICAL TOOL RULES:
1. Use tools ONLY when specifically requested or absolutely necessary to answer a factual question.
2. datetime tool: ONLY use if the user explicitly asks for the current time or date. DO NOT use it for greetings, general conversation, or to "timestamp" your own responses.
3. weather tool: ONLY use if the user explicitly asks about weather or temperature.
4. If you need to know about the conversation history, refer to the messages provided in the context; do NOT attempt to use tools to fetch previous messages. 
5. Do NOT hallucinate tools that are not provided in the toolset.
6. If no tool is strictly required to answer the user, respond naturally without using any tools.`,
		});

		return (async function* () {
			try {
				for await (const part of result.fullStream) {
					switch (part.type) {
						case "text-delta":
							yield { type: "text", content: part.text };
							break;
						case "tool-call":
							yield { 
								type: "tool-call", 
								toolName: part.toolName, 
								toolCallId: part.toolCallId,
								args: "args" in part ? part.args : ("input" in part ? part.input : {})
							};
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
