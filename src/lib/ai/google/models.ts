import { getDecryptedGoogleApiKey } from "@/lib/stores/settings";
import { atom } from "nanostores";

export interface GoogleModel {
	id: string;
	name: string;
	description?: string;
	supportedGenerationMethods: string[];
}

export const googleModelsAtom = atom<GoogleModel[]>([]);
export const isLoadingGoogleModelsAtom = atom<boolean>(false);

/**
 * Fetch available models from Google Generative AI API
 * Requires an unlocked API key
 */
export const fetchGoogleModels = async () => {
	// Don't fetch if already loading
	if (isLoadingGoogleModelsAtom.get()) return;

	const apiKey = await getDecryptedGoogleApiKey();
	if (!apiKey) return;

	// Don't refetch if we already have models
	if (googleModelsAtom.get().length > 0) return;

	isLoadingGoogleModelsAtom.set(true);
	try {
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
		);
		if (!response.ok) throw new Error("Failed to fetch Google models");

		const data = (await response.json()) as {
			models: Array<{
				name: string;
				displayName?: string;
				description?: string;
				supportedGenerationMethods: string[];
			}>;
		};
		if (data.models && Array.isArray(data.models)) {
			const models = data.models
				.filter((m) => m.supportedGenerationMethods.includes("generateContent"))
				.map((m) => ({
					id: m.name.replace("models/", ""),
					name: m.displayName || m.name.replace("models/", ""),
					description: m.description,
					supportedGenerationMethods: m.supportedGenerationMethods,
				}));
			googleModelsAtom.set(models);
		}
	} catch (error) {
		console.error("Error fetching Google models:", error);
	} finally {
		isLoadingGoogleModelsAtom.set(false);
	}
};
