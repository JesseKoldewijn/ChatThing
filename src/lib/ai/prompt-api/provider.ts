import type {
	AsyncIterableStream,
	TextStreamPart,
	ToolSet,
	ImagePart,
	TextPart,
	ModelMessage,
} from "ai";
import { type ImageAttachment, type Message } from "@/lib/stores/chat";
import { outputLanguageAtom } from "@/lib/stores/settings";
import { tools } from "../tools";
import type { AIProvider, PromptOptions, ProviderType } from "../types";
import type { BuiltInAIChatSettings } from "@built-in-ai/core";

// Lazy-loaded AI modules cache
let aiModulesCache: {
	streamText: typeof import("ai").streamText;
	generateText: typeof import("ai").generateText;
	wrapLanguageModel: typeof import("ai").wrapLanguageModel;
	builtInAI: typeof import("@built-in-ai/core").builtInAI;
	createToolMiddleware: typeof import("@ai-sdk-tool/parser").createToolMiddleware;
	jsonMixProtocol: typeof import("@ai-sdk-tool/parser").jsonMixProtocol;
} | null = null;

const loadAIModules = async () => {
	if (!aiModulesCache) {
		const [aiModule, builtInAIModule, toolParserModule] = await Promise.all([
			import("ai"),
			import("@built-in-ai/core"),
			import("@ai-sdk-tool/parser"),
		]);
		aiModulesCache = {
			streamText: aiModule.streamText,
			generateText: aiModule.generateText,
			wrapLanguageModel: aiModule.wrapLanguageModel,
			builtInAI: builtInAIModule.builtInAI,
			createToolMiddleware: toolParserModule.createToolMiddleware,
			jsonMixProtocol: toolParserModule.jsonMixProtocol,
		};
	}
	return aiModulesCache;
};

const imageAttachmentToImagePart = (image: ImageAttachment): ImagePart => {
	return {
		type: "image",
		image: image.data,
	};
};

const buildMessageContent = (
	text: string,
	images?: ImageAttachment[]
): (TextPart | ImagePart)[] => {
	const content: (TextPart | ImagePart)[] = [];
	if (images && images.length > 0) {
		for (const image of images) {
			content.push(imageAttachmentToImagePart(image));
		}
	}
	content.push({ type: "text", text });
	return content;
};

const isToolCallMessage = (content: string): boolean => {
	return content.startsWith("🔧 Using tool:");
};

const isToolUIMessage = (content: string): boolean => {
	if (isToolCallMessage(content)) return true;
	if (content.startsWith("❌ Error:")) return true;
	return false;
};

const findToolCallTransactionIds = (messages: Message[]): Set<string> => {
	const toolTransactionIds = new Set<string>();
	for (const msg of messages) {
		if (msg.role === "assistant" && isToolCallMessage(msg.content)) {
			toolTransactionIds.add(msg.transactionId);
		}
	}
	return toolTransactionIds;
};

const findMostRecentToolTransactionId = (
	messages: Message[],
	toolTransactionIds: Set<string>
): string | undefined => {
	if (toolTransactionIds.size === 0) return undefined;
	for (let i = messages.length - 1; i >= 0; i--) {
		const msg = messages[i];
		if (toolTransactionIds.has(msg.transactionId)) {
			return msg.transactionId;
		}
	}
	return undefined;
};

const convertHistoryToMessages = (history?: Message[]): ModelMessage[] => {
	if (!history || history.length === 0) return [];
	const toolTransactionIds = findToolCallTransactionIds(history);
	const mostRecentToolTransactionId = findMostRecentToolTransactionId(
		history,
		toolTransactionIds
	);

	return history
		.filter((msg) => {
			const isFromToolTransaction = toolTransactionIds.has(
				msg.transactionId
			);
			if (isFromToolTransaction) {
				// For the Prompt API (limited context), we only keep the most recent tool result
				// to avoid confusing the model or hitting token limits.
				// HOWEVER, we must NEVER filter out user messages as they are critical context.
				if (
					msg.role === "assistant" &&
					msg.transactionId !== mostRecentToolTransactionId
				) {
					return false;
				}
			}
			if (msg.role === "assistant" && isToolUIMessage(msg.content))
				return false;
			return true;
		})
		.map((msg): ModelMessage => {
			if (msg.role === "user" && msg.images && msg.images.length > 0) {
				return {
					role: "user",
					content: buildMessageContent(msg.content, msg.images),
				};
			}
			return {
				role: msg.role,
				content: msg.content,
			};
		});
};

export class PromptAPIProvider implements AIProvider {
	readonly type: ProviderType = "prompt-api";
	private settings?: BuiltInAIChatSettings;

	constructor(settings?: BuiltInAIChatSettings) {
		this.settings = settings;
	}

	async prompt(
		prompt: string,
		options?: PromptOptions
	): Promise<AsyncIterableStream<TextStreamPart<ToolSet>>> {
		const {
			streamText,
			wrapLanguageModel,
			builtInAI,
			createToolMiddleware,
			jsonMixProtocol,
		} = await loadAIModules();

		const expectedOutputLanguage = outputLanguageAtom.get();
		const hasImages = options?.images && options.images.length > 0;

		const modelSettings: BuiltInAIChatSettings & {
			expectedOutputLanguages?: string[];
			expectedInputs?: Array<{
				type: "text" | "image" | "audio";
				languages?: string[];
			}>;
		} = {
			...this.settings,
			expectedOutputLanguages: [expectedOutputLanguage],
		};

		if (hasImages) {
			modelSettings.expectedInputs = [{ type: "text" }, { type: "image" }];
		}

		const historyMessages = convertHistoryToMessages(options?.history);
		const userContent = hasImages
			? buildMessageContent(prompt, options?.images)
			: prompt;

		const fewShotMessages: ModelMessage[] = [
			{ role: "user", content: "Hi there!" },
			{ role: "assistant", content: "Hello! How can I help you today?" },
			{ role: "user", content: "What's the weather?" },
			{
				role: "assistant",
				content: '<tool>{"name":"weather","arguments":{}}</tool>',
			},
		];

		const messages: ModelMessage[] = [
			...fewShotMessages,
			...historyMessages,
			{ role: "user", content: userContent },
		];

		const modelId = hasImages ? undefined : ("text" as const);
		const baseModel = builtInAI(modelId, modelSettings);

		const toolMiddleware = createToolMiddleware({
			protocol: jsonMixProtocol({
				toolCallStart: "<tool>",
				toolCallEnd: "</tool>",
				toolResponseStart: "<result>",
				toolResponseEnd: "</result>",
			}),
			toolSystemPromptTemplate: (toolsDefinition) =>
				[
					"You are a helpful AI assistant. For most questions and conversations, respond naturally without tools.",
					"",
					"You have these tools available (use ONLY when specifically needed):",
					toolsDefinition,
					"",
					"WHEN TO USE TOOLS:",
					"- weather: ONLY when user explicitly asks about weather, forecast, or temperature for a specific location",
					"- datetime: ONLY when user explicitly asks about the current date, time, or what day it is",
					"",
					"WHEN NOT TO USE TOOLS:",
					"- Greetings (hi, hello, hey, etc.) - just respond friendly",
					"- General questions, opinions, explanations - respond conversationally",
					"- Jokes, stories, creative requests - respond directly",
					"- If unsure whether to use a tool, DON'T - respond conversationally instead",
					"",
					"TOOL CALL FORMAT (only when a tool is needed):",
					'- Weather (specific city): <tool>{"name":"weather","arguments":{"location":"CityName"}}</tool>',
					'- Weather (user\'s location): <tool>{"name":"weather","arguments":{}}</tool>',
					'- Date/time: <tool>{"name":"datetime","arguments":{}}</tool>',
					"",
					"When using a tool, output ONLY the tool call with no other text.",
				].join("\n"),
		});

		const model = wrapLanguageModel({
			model: baseModel,
			middleware: toolMiddleware,
		});

		return streamText({
			model,
			messages,
			tools,
		}).fullStream;
	}

	async generateTitle(firstMessage: string): Promise<string> {
		const MAX_TITLE_LENGTH = 30;
		const { generateText, builtInAI } = await loadAIModules();

		const prompt = `Generate a very short title (maximum 4-5 words, under 30 characters) for a conversation that starts with this message. Return ONLY the title, no quotes, no explanation, no punctuation at the end.

Message: "${firstMessage.slice(0, 200)}"

Title:`;

		try {
			const result = await generateText({
				model: builtInAI("text" as any, {
					expectedOutputLanguages: ["en"],
				} as BuiltInAIChatSettings),
				prompt,
			});

			let title = result.text
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
			console.warn("Failed to generate title with Prompt API:", error);
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
