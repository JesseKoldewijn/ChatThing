export const PROVIDER_OPEN_ROUTER = "open-router" as const;
export const PROVIDER_GOOGLE = "google" as const;
export const PROVIDER_OLLAMA = "ollama" as const;
export const PROVIDER_PROMPT_API = "prompt-api" as const;

export type ProviderType =
	| typeof PROVIDER_OPEN_ROUTER
	| typeof PROVIDER_GOOGLE
	| typeof PROVIDER_OLLAMA
	| typeof PROVIDER_PROMPT_API;

interface ProviderInfo {
	id: ProviderType;
	label: string;
	description: string;
}

export const SUPPORTED_PROVIDERS: ProviderInfo[] = [
	{
		id: PROVIDER_OPEN_ROUTER,
		label: "OpenRouter",
		description: "Cloud-based models",
	},
	{
		id: PROVIDER_GOOGLE,
		label: "Google",
		description: "Gemini models",
	},
	{
		id: PROVIDER_OLLAMA,
		label: "Ollama",
		description: "Local LLM (Ollama)",
	},
	{
		id: PROVIDER_PROMPT_API,
		label: "Prompt API",
		description: "Built-in browser AI",
	},
];
