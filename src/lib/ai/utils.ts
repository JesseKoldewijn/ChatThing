import type { Message } from "@/lib/stores/chat";
import {
	type AssistantModelMessage as CoreAssistantMessage,
	type ModelMessage as CoreMessage,
	type UserModelMessage as CoreUserMessage,
} from "ai";

/**
 * Strip data URL prefix if present
 * e.g. "data:image/jpeg;base64,..." -> "..."
 */
export const stripDataUrlPrefix = (data: string): string => {
	if (data.startsWith("data:")) {
		const base64Index = data.indexOf(";base64,");
		if (base64Index !== -1) {
			return data.slice(base64Index + 8);
		}
	}
	return data;
};

/**
 * Convert chat history to AI SDK CoreMessage format.
 * Merges consecutive messages of the same role and handles multimodal content.
 */
export const convertHistoryToMessages = (
	history?: Message[],
): CoreMessage[] => {
	if (!history || history.length === 0) return [];

	const coreMessages: CoreMessage[] = [];

	// Filter out system messages as they are usually handled via the 'system' property in streamText
	const filteredHistory = history.filter((msg) => msg.role !== "system");

	for (const msg of filteredHistory) {
		const lastMessage = coreMessages[coreMessages.length - 1];

		if (lastMessage && lastMessage.role === msg.role) {
			// Merge with last message if role is the same
			if (msg.role === "user") {
				const userMessage = lastMessage as CoreUserMessage;
				// Ensure content is an array for merging multimodal parts
				const existingContent = Array.isArray(userMessage.content)
					? userMessage.content
					: [{ type: "text" as const, text: userMessage.content }];

				const newParts: (
					| { type: "text"; text: string }
					| { type: "image"; image: string; mimeType?: string }
				)[] = [{ type: "text" as const, text: msg.content }];

				if (msg.images && msg.images.length > 0) {
					newParts.push(
						...msg.images.map((img) => ({
							type: "image" as const,
							image: stripDataUrlPrefix(img.data),
						})),
					);
				}

				userMessage.content = [
					...existingContent,
					...newParts,
				] as CoreUserMessage["content"];
			} else if (msg.role === "assistant") {
				const assistantMessage = lastMessage as CoreAssistantMessage;
				// For assistant, just append text
				if (typeof assistantMessage.content === "string") {
					assistantMessage.content =
						assistantMessage.content + "\n\n" + msg.content;
				} else if (Array.isArray(assistantMessage.content)) {
					assistantMessage.content.push({
						type: "text",
						text: "\n\n" + msg.content,
					});
				}
			}
		} else {
			// Add new message
			if (msg.role === "user") {
				if (msg.images && msg.images.length > 0) {
					coreMessages.push({
						role: "user",
						content: [
							{ type: "text", text: msg.content },
							...msg.images.map((img) => ({
								type: "image" as const,
								image: stripDataUrlPrefix(img.data),
							})),
						],
					});
				} else {
					coreMessages.push({ role: "user", content: msg.content });
				}
			} else {
				coreMessages.push({ role: "assistant", content: msg.content });
			}
		}
	}

	return coreMessages;
};
