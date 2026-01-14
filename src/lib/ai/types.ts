import type { ImageAttachment, Message } from "@/lib/stores/chat";
import type { BuiltInAIChatSettings } from "@built-in-ai/core";

import type { ProviderType } from "./constants";

export {
	PROVIDER_GOOGLE,
	PROVIDER_OLLAMA,
	PROVIDER_OPEN_ROUTER,
	PROVIDER_PROMPT_API,
} from "./constants";
export type { ProviderType };

export interface PromptOptions extends BuiltInAIChatSettings {
	images?: ImageAttachment[];
	history?: Message[];
	toolsEnabled?: boolean;
}

export type StreamPart =
	| { type: "text"; content: string }
	| { type: "image"; data: string; mimeType: string; name?: string }
	| { type: "tool-call"; toolName: string; toolCallId: string; args: unknown }
	| { type: "error"; error: unknown };

export interface AIProvider {
	readonly type: ProviderType;
	prompt(
		prompt: string,
		options?: PromptOptions,
	): Promise<AsyncIterable<StreamPart>>;
	generateTitle(firstMessage: string): Promise<string>;
}
