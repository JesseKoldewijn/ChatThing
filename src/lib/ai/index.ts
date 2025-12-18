import { aiSettingsAtom, providerTypeAtom, openRouterApiKeyAtom, openRouterModelAtom } from "@/lib/stores/settings";
import { AIManager } from "./manager";
import { PromptAPIProvider } from "./prompt-api/provider";
import { OpenRouterProvider } from "./open-router/provider";

/**
 * Get the current AI manager based on settings
 */
export const getAIManager = () => {
	const type = providerTypeAtom.get();
	
	if (type === "prompt-api") {
		const settings = aiSettingsAtom.get();
		return new AIManager(new PromptAPIProvider(settings));
	}
	
	// Default to OpenRouter
	const apiKey = openRouterApiKeyAtom.get();
	const model = openRouterModelAtom.get();
	return new AIManager(new OpenRouterProvider({ apiKey, model }));
};

export * from "./types";
export * from "./manager";

