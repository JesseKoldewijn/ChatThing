import type { AsyncIterableStream, TextStreamPart, ToolSet } from "ai";
import type { ImageAttachment, Message } from "@/lib/stores/chat";
import type { BuiltInAIChatSettings } from "@built-in-ai/core";

export type ProviderType = "prompt-api" | "open-router" | "ollama";

export interface PromptOptions extends BuiltInAIChatSettings {
	images?: ImageAttachment[];
	history?: Message[];
}

export interface AIProvider {
	readonly type: ProviderType;
	prompt(
		prompt: string,
		options?: PromptOptions
	): Promise<AsyncIterableStream<TextStreamPart<ToolSet>>>;
	generateTitle(firstMessage: string): Promise<string>;
}
