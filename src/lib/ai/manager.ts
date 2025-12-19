import type { AIProvider, PromptOptions } from "./types";
import type { AsyncIterableStream, TextStreamPart, ToolSet } from "ai";

export class AIManager {
	private provider: AIProvider;

	constructor(provider: AIProvider) {
		this.provider = provider;
	}

	async prompt(
		prompt: string,
		options?: PromptOptions
	): Promise<AsyncIterableStream<TextStreamPart<ToolSet>>> {
		return this.provider.prompt(prompt, options);
	}

	async generateTitle(firstMessage: string): Promise<string> {
		return this.provider.generateTitle(firstMessage);
	}

	get providerType() {
		return this.provider.type;
	}
}

export const promptStreamReader = async (
	stream: AsyncIterableStream<TextStreamPart<ToolSet>>
) => {
	const data = new Array<TextStreamPart<ToolSet>>();
	for await (const chunk of stream) {
		data.push(chunk);
	}
	return data;
};
