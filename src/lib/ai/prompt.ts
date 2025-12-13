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
 * Check if a message is a tool UI announcement that should be filtered from history
 * We keep weather responses so the model knows those questions were already answered
 */
const isToolUIMessage = (content: string): boolean => {
	// Filter out tool announcements (UI-only, not actual responses)
	if (content.startsWith("🔧 Using tool:")) {
		return true;
	}
	// Filter out error messages
	if (content.startsWith("❌ Error:")) {
		return true;
	}
	return false;
};

/**
 * Convert app Message[] to AI SDK ModelMessage[] format
 * Filters out tool-related UI messages to avoid confusing the model
 */
const convertHistoryToMessages = (history?: Message[]): ModelMessage[] => {
	if (!history || history.length === 0) {
		return [];
	}

	const filtered = history
		.filter((msg) => {
			// Keep all user messages
			if (msg.role === "user") return true;
			// Filter out tool UI announcements (but keep actual responses)
			if (msg.role === "assistant" && isToolUIMessage(msg.content))
				return false;
			// Keep other assistant messages (including weather responses)
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

		// Few-shot example to teach the model the exact format
		const fewShotMessages: ModelMessage[] = [
			{
				role: "user",
				content: "Weather in Seattle",
			},
			{
				role: "assistant",
				content:
					'<tool>{"name":"weather","arguments":{"location":"Seattle"}}</tool>',
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
				`You have these tools:
${toolsDefinition}

For weather, use exactly: <tool>{"name":"weather","arguments":{"location":"CityName"}}</tool>
Replace CityName with the actual city.

After receiving results, respond naturally. Do not repeat the tool call.`,
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
