import {
	getDecryptedGoogleApiKey,
	getDecryptedOllamaApiKey,
	getDecryptedOpenRouterApiKey,
	googleModelAtom,
	ollamaBaseUrlAtom,
	ollamaModelAtom,
	openRouterModelAtom,
	PROVIDER_GOOGLE,
	PROVIDER_OLLAMA,
	PROVIDER_OPEN_ROUTER,
	PROVIDER_PROMPT_API,
	providerTypeAtom,
} from "@/lib/stores/settings";
import { GoogleProvider } from "./google/provider";
import { AIManager } from "./manager";
import { OllamaProvider } from "./ollama/provider";
import { OpenRouterProvider } from "./open-router/provider";
import { PromptApiProvider } from "./prompt-api/provider";

let cachedManager: AIManager | null = null;
let cachedManagerConfig: string | null = null;

/**
 * Get the current AI manager based on settings
 */
export const getAIManager = async () => {
	const type = providerTypeAtom.get();
	const model =
		type === PROVIDER_OPEN_ROUTER
			? openRouterModelAtom.get()
			: type === PROVIDER_GOOGLE
				? googleModelAtom.get()
				: type === PROVIDER_OLLAMA
					? ollamaModelAtom.get()
					: "prompt-api";
	const baseUrl = type === PROVIDER_OLLAMA ? ollamaBaseUrlAtom.get() : "";

	// Create a unique config string to detect changes
	const currentConfig = JSON.stringify({ type, model, baseUrl });

	if (cachedManager && cachedManagerConfig === currentConfig) {
		return cachedManager;
	}

	let manager: AIManager;

	if (type === PROVIDER_PROMPT_API) {
		manager = new AIManager(new PromptApiProvider());
	} else if (type === PROVIDER_OLLAMA) {
		const apiKey = await getDecryptedOllamaApiKey();
		manager = new AIManager(
			new OllamaProvider({ model, baseUrl, apiKey: apiKey || undefined }),
		);
	} else if (type === PROVIDER_GOOGLE) {
		const apiKey = await getDecryptedGoogleApiKey();
		if (!apiKey)
			throw new Error(
				"Google API key is locked or not set. Please unlock it in settings.",
			);
		manager = new AIManager(new GoogleProvider({ apiKey, model }));
	} else {
		// Default to OpenRouter
		const apiKey = await getDecryptedOpenRouterApiKey();
		if (!apiKey)
			throw new Error(
				"OpenRouter API key is locked or not set. Please unlock it in settings.",
			);
		manager = new AIManager(new OpenRouterProvider({ apiKey, model }));
	}

	cachedManager = manager;
	cachedManagerConfig = currentConfig;
	return manager;
};

/**
 * Clear the AI manager cache (e.g. when unlocking or resetting settings)
 */
export const clearAIManagerCache = () => {
	cachedManager = null;
	cachedManagerConfig = null;
};

export * from "./manager";
export * from "./types";
