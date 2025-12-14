import type { BuiltInAIChatSettings } from "@built-in-ai/core";
import {
	type AsyncIterableStream,
	type TextStreamPart,
	type ToolSet,
	type ImagePart,
	type TextPart,
	type ModelMessage,
} from "ai";
import { outputLanguageAtom } from "@/lib/stores/settings";
import { type ImageAttachment, type Message } from "@/lib/stores/chat";
import { tools } from "./tools";

export interface PromptOptions extends BuiltInAIChatSettings {
	images?: ImageAttachment[];
	history?: Message[];
}

// Lazy-loaded AI modules cache
let aiModulesCache: {
	streamText: typeof import("ai").streamText;
	wrapLanguageModel: typeof import("ai").wrapLanguageModel;
	builtInAI: typeof import("@built-in-ai/core").builtInAI;
	createToolMiddleware: typeof import("@ai-sdk-tool/parser").createToolMiddleware;
	jsonMixProtocol: typeof import("@ai-sdk-tool/parser").jsonMixProtocol;
} | null = null;

// Lazy load AI dependencies (300KB+ chunk)
const loadAIModules = async () => {
	if (!aiModulesCache) {
		const [aiModule, builtInAIModule, toolParserModule] = await Promise.all(
			[
				import("ai"),
				import("@built-in-ai/core"),
				import("@ai-sdk-tool/parser"),
			]
		);
		aiModulesCache = {
			streamText: aiModule.streamText,
			wrapLanguageModel: aiModule.wrapLanguageModel,
			builtInAI: builtInAIModule.builtInAI,
			createToolMiddleware: toolParserModule.createToolMiddleware,
			jsonMixProtocol: toolParserModule.jsonMixProtocol,
		};
	}
	return aiModulesCache;
};

/**
 * Convert ImageAttachment to AI SDK ImagePart
 */
const imageAttachmentToImagePart = (image: ImageAttachment): ImagePart => {
	// Use the full data URL - the AI SDK can handle it
	return {
		type: "image",
		image: image.data,
	};
};

/**
 * Build content array for multimodal messages
 */
const buildMessageContent = (
	text: string,
	images?: ImageAttachment[]
): (TextPart | ImagePart)[] => {
	const content: (TextPart | ImagePart)[] = [];

	// Add images first (if any)
	if (images && images.length > 0) {
		for (const image of images) {
			content.push(imageAttachmentToImagePart(image));
		}
	}

	// Add text
	content.push({ type: "text", text });

	return content;
};

/**
 * Check if a message is a tool call announcement
 */
const isToolCallMessage = (content: string): boolean => {
	return content.startsWith("🔧 Using tool:");
};

/**
 * Check if a message is a tool UI message (announcement or error) that should be filtered
 */
const isToolUIMessage = (content: string): boolean => {
	// Filter out tool announcements (UI-only, not actual responses)
	if (isToolCallMessage(content)) {
		return true;
	}
	// Filter out error messages
	if (content.startsWith("❌ Error:")) {
		return true;
	}
	return false;
};

/**
 * Find all transactionIds that contain tool call messages
 */
const findToolCallTransactionIds = (messages: Message[]): Set<string> => {
	const toolTransactionIds = new Set<string>();
	for (const msg of messages) {
		if (msg.role === "assistant" && isToolCallMessage(msg.content)) {
			toolTransactionIds.add(msg.transactionId);
		}
	}
	return toolTransactionIds;
};

/**
 * Find the most recent transactionId that has a tool call
 * Returns undefined if no tool calls exist
 */
const findMostRecentToolTransactionId = (
	messages: Message[],
	toolTransactionIds: Set<string>
): string | undefined => {
	if (toolTransactionIds.size === 0) return undefined;

	// Iterate from the end to find the most recent tool transaction
	for (let i = messages.length - 1; i >= 0; i--) {
		const msg = messages[i];
		if (toolTransactionIds.has(msg.transactionId)) {
			return msg.transactionId;
		}
	}
	return undefined;
};

/**
 * Convert app Message[] to AI SDK ModelMessage[] format
 * Filters out tool-related UI messages to avoid confusing the model.
 * Only keeps the most recent tool call transaction to prevent hallucinations
 * based on previous tool call patterns.
 */
const convertHistoryToMessages = (history?: Message[]): ModelMessage[] => {
	if (!history || history.length === 0) {
		return [];
	}

	// Find all transactions that have tool calls
	const toolTransactionIds = findToolCallTransactionIds(history);

	// Find the most recent tool transaction (if any)
	const mostRecentToolTransactionId = findMostRecentToolTransactionId(
		history,
		toolTransactionIds
	);

	// Filter messages:
	// 1. Remove all messages from older tool transactions (not the most recent)
	// 2. Remove tool UI messages (announcements and errors)
	// 3. Keep the most recent tool transaction and all non-tool transactions
	const filtered = history
		.filter((msg) => {
			const isFromToolTransaction = toolTransactionIds.has(
				msg.transactionId
			);

			// If this message is from a tool transaction...
			if (isFromToolTransaction) {
				// Only keep it if it's from the most recent tool transaction
				if (msg.transactionId !== mostRecentToolTransactionId) {
					return false;
				}
			}

			// Filter out tool UI messages (announcements and errors)
			if (msg.role === "assistant" && isToolUIMessage(msg.content)) {
				return false;
			}

			return true;
		})
		.map((msg): ModelMessage => {
			// User messages may have images attached
			if (msg.role === "user" && msg.images && msg.images.length > 0) {
				return {
					role: "user",
					content: buildMessageContent(msg.content, msg.images),
				};
			}

			// Plain text messages (user without images, or assistant)
			return {
				role: msg.role,
				content: msg.content,
			};
		});

	return filtered;
};

export const promptAsync = async (prompt: string, options?: PromptOptions) => {
	try {
		// Lazy load AI modules on first use
		const {
			streamText,
			wrapLanguageModel,
			builtInAI,
			createToolMiddleware,
			jsonMixProtocol,
		} = await loadAIModules();

		// Get auto-detected output language (always a supported language)
		const expectedOutputLanguage = outputLanguageAtom.get();

		// Determine if we have images (multimodal)
		const hasImages = options?.images && options.images.length > 0;

		// Create settings with the expected output languages array
		// The Chrome LanguageModel API expects 'expectedOutputLanguages' as an array
		const modelSettings: BuiltInAIChatSettings & {
			expectedOutputLanguages?: string[];
			expectedInputs?: Array<{
				type: "text" | "image" | "audio";
				languages?: string[];
			}>;
		} = {
			...options,
			// Pass the language as an array for the LanguageModel.create() options
			expectedOutputLanguages: [expectedOutputLanguage],
		};

		// If we have images, specify we expect image input
		if (hasImages) {
			modelSettings.expectedInputs = [
				{ type: "text" },
				{ type: "image" },
			];
		}

		// Remove images and history from options before passing to model
		const { images, history, ...cleanOptions } = options || {};

		// Convert history to CoreMessage format
		const historyMessages = convertHistoryToMessages(history);

		// Build the user content
		const userContent = hasImages
			? buildMessageContent(prompt, images)
			: prompt;

		// Few-shot example to teach the model the exact tool call format
		// Shows complete flow: user asks → assistant calls tool → result → natural response
		// Using an uncommon city to avoid conflicts with user's actual requests
		const fewShotMessages: ModelMessage[] = [
			{
				role: "user",
				content: "Weather in Reykjavik",
			},
			{
				role: "assistant",
				content:
					'<tool>{"name":"weather","arguments":{"location":"Reykjavik"}}</tool>',
			},
		];

		// Build the messages array with few-shot example, history and current user message
		const messages: ModelMessage[] = [
			...fewShotMessages,
			...historyMessages,
			{
				role: "user",
				content: userContent,
			},
		];

		const modelId = hasImages ? undefined : ("text" as const);

		// Create the base model
		const baseModel = builtInAI(modelId, {
			...modelSettings,
			...cleanOptions,
		});

		// Create tool middleware with XML-like markers as requested
		const toolMiddleware = createToolMiddleware({
			protocol: jsonMixProtocol({
				toolCallStart: "<tool>",
				toolCallEnd: "</tool>",
				toolResponseStart: "<result>",
				toolResponseEnd: "</result>",
			}),
			toolSystemPromptTemplate: (toolsDefinition) =>
				[
					"You have these tools:",
					toolsDefinition,
					"",
					'For weather, use: <tool>{"name":"weather","arguments":{"location":"CityName"}}</tool>',
					'For date/time, use: <tool>{"name":"datetime","arguments":{}}</tool>',
					'For date/time in a specific timezone: <tool>{"name":"datetime","arguments":{"timezone":"America/New_York"}}</tool>',
					"",
					"IMPORTANT: When using a tool, output ONLY the tool call. Do NOT write any response text before or after it.",
				].join("\n"),
		});

		// Wrap with tool parser middleware to enable tool calling
		const model = wrapLanguageModel({
			model: baseModel,
			middleware: toolMiddleware,
		});

		return streamText({
			model,
			messages,
			tools,
		}).fullStream;
	} catch (error) {
		throw error as Error;
	}
};

export const promptStreamReader = async (
	stream: AsyncIterableStream<TextStreamPart<ToolSet>>
) => {
	const data = new Array<TextStreamPart<ToolSet>>();
	for await (const chunk of stream) {
		data.push(chunk);
	}
	return data;
};
