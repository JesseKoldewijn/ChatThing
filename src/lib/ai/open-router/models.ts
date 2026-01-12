import { atom } from "nanostores";

export interface OpenRouterModel {
	id: string;
	name: string;
	description?: string;
	pricing?: {
		prompt: string;
		completion: string;
	};
}

export const openRouterModelsAtom = atom<OpenRouterModel[]>([]);
export const isLoadingModelsAtom = atom<boolean>(false);

/**
 * Fetch available models from OpenRouter API
 */
export const fetchOpenRouterModels = async () => {
	// Don't fetch if already loading
	if (isLoadingModelsAtom.get()) return;

	// Don't refetch if we already have models
	if (openRouterModelsAtom.get().length > 0) return;

	isLoadingModelsAtom.set(true);
	try {
		const response = await fetch("https://openrouter.ai/api/v1/models");
		if (!response.ok) throw new Error("Failed to fetch models");
		
		const data = await response.json() as { data: unknown[] };
		if (data.data && Array.isArray(data.data)) {
			const models = data.data.map((m: unknown) => {
				const model = m as { 
					id: string; 
					name: string; 
					description?: string; 
					pricing?: { prompt: string; completion: string } 
				};
				return {
					id: model.id,
					name: model.name,
					description: model.description,
					pricing: model.pricing,
				};
			});
			openRouterModelsAtom.set(models);
		}
	} catch (error) {
		console.error("Error fetching OpenRouter models:", error);
	} finally {
		isLoadingModelsAtom.set(false);
	}
};

