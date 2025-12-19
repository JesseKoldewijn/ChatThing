import { aiSettingsAtom, providerTypeAtom, openRouterApiKeyAtom, openRouterModelAtom, ollamaModelAtom, ollamaBaseUrlAtom } from "@/lib/stores/settings";
import { AIManager } from "./manager";
import { PromptAPIProvider } from "./prompt-api/provider";
import { OpenRouterProvider } from "./open-router/provider";
import { OllamaProvider } from "./ollama/provider";

/**
 * Get the current AI manager based on settings
 */
export const getAIManager = () => {
	const type = providerTypeAtom.get();
	
	if (type === "prompt-api") {
		const settings = aiSettingsAtom.get();
		return new AIManager(new PromptAPIProvider(settings));
	}
	
	if (type === "ollama") {
		const model = ollamaModelAtom.get();
		const baseUrl = ollamaBaseUrlAtom.get();
		return new AIManager(new OllamaProvider({ model, baseUrl }));
	}
	
	// Default to OpenRouter
	const apiKey = openRouterApiKeyAtom.get();
	const model = openRouterModelAtom.get();
	return new AIManager(new OpenRouterProvider({ apiKey, model }));
};

export * from "./types";
export * from "./manager";

