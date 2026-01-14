import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, type LanguageModel, streamText } from "ai";
import { datetimeTool } from "../tools/datetime";
import { weatherTool } from "../tools/weather";
import {
	type AIProvider,
	type PromptOptions,
	PROVIDER_GOOGLE,
	type ProviderType,
	type StreamPart,
} from "../types";
import { convertHistoryToMessages, stripDataUrlPrefix } from "../utils";

export interface GoogleSettings {
	apiKey: string;
	model?: string;
}

export class GoogleProvider implements AIProvider {
	readonly type: ProviderType = PROVIDER_GOOGLE;
	private client;
	private settings: GoogleSettings;

	constructor(settings: GoogleSettings) {
		this.settings = settings;
		this.client = createGoogleGenerativeAI({
			apiKey: settings.apiKey,
		});
	}

	private get model(): LanguageModel {
		return this.client(this.settings.model || "gemini-2.0-flash-exp");
	}

	async prompt(
		prompt: string,
		options?: PromptOptions,
	): Promise<AsyncIterable<StreamPart>> {
		const messages = [
			...convertHistoryToMessages(options?.history),
			{
				role: "user" as const,
				content:
					options?.images && options.images.length > 0
						? [
								{ type: "text" as const, text: prompt },
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
			...(options?.toolsEnabled && {
				tools: {
					weather: weatherTool,
					datetime: datetimeTool,
				},
				maxSteps: 5,
			}),
			system: `You are a helpful AI assistant. 
Current Date and Time: ${new Date().toLocaleString()}

${
	options?.toolsEnabled
		? `CRITICAL TOOL RULES:
1. Use tools ONLY when specifically requested or absolutely necessary to answer a factual question.
2. datetime tool: ONLY use if the user explicitly asks for the current time or date. DO NOT use it for greetings, general conversation, or to "timestamp" your own responses.
3. weather tool: ONLY use if the user explicitly asks about weather or temperature.
4. If you need to know about the conversation history, refer to the messages provided in the context; do NOT attempt to use tools to fetch previous messages. 
5. Do NOT hallucinate tools that are not provided in the toolset.
6. If no tool is strictly required to answer the user, respond naturally without any tools.`
		: "Respond naturally to the user."
}`,
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
								args:
									"args" in part
										? part.args
										: "input" in part
											? part.input
											: {},
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
						? truncated.slice(0, lastSpace) + "..."
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
