import type { BuiltInAIChatSettings } from "@built-in-ai/core";
import type {
	AsyncIterableStream,
	TextStreamPart,
	ToolSet,
	CoreMessage,
	ImagePart,
	TextPart,
} from "ai";
import { outputLanguageAtom } from "@/lib/stores/settings";
import { type ImageAttachment, type Message } from "@/lib/stores/chat";

export interface PromptOptions extends BuiltInAIChatSettings {
	images?: ImageAttachment[];
	history?: Message[];
}

// Lazy-loaded AI modules cache
let aiModulesCache: {
	streamText: typeof import("ai").streamText;
	builtInAI: typeof import("@built-in-ai/core").builtInAI;
} | null = null;

// Lazy load AI dependencies (300KB+ chunk)
const loadAIModules = async () => {
	if (!aiModulesCache) {
		const [aiModule, builtInAIModule] = await Promise.all([
			import("ai"),
			import("@built-in-ai/core"),
		]);
		aiModulesCache = {
			streamText: aiModule.streamText,
			builtInAI: builtInAIModule.builtInAI,
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
 * Convert app Message[] to AI SDK CoreMessage[] format
 */
const convertHistoryToMessages = (history?: Message[]): CoreMessage[] => {
	if (!history || history.length === 0) {
		return [];
	}

	return history.map((msg): CoreMessage => {
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
};

export const promptAsync = async (prompt: string, options?: PromptOptions) => {
	try {
		// Lazy load AI modules on first use
		const { streamText, builtInAI } = await loadAIModules();

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

		// Build the message content with history prepended
		const messages: CoreMessage[] = [
			...historyMessages,
			{
				role: "user",
				content: hasImages
					? buildMessageContent(prompt, images)
					: prompt,
			},
		];

		return streamText({
			model: builtInAI(undefined, {
				...modelSettings,
				...cleanOptions,
			} as BuiltInAIChatSettings),
			messages,
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
