import type { AIProvider, PromptOptions, StreamPart } from "./types";

export class AIManager {
	private provider: AIProvider;

	constructor(provider: AIProvider) {
		this.provider = provider;
	}

	async prompt(
		prompt: string,
		options?: PromptOptions
	): Promise<AsyncIterable<StreamPart>> {
		return this.provider.prompt(prompt, options);
	}

	async generateTitle(firstMessage: string): Promise<string> {
		return this.provider.generateTitle(firstMessage);
	}

	get providerType() {
		return this.provider.type;
	}
}
