import { atom } from "nanostores";
import { ollamaBaseUrlAtom } from "@/lib/stores/settings";
import { fetchOllamaModels, type OllamaModel, checkOllamaAvailability } from "./api";

export const ollamaModelsAtom = atom<OllamaModel[]>([]);
export const isLoadingOllamaModelsAtom = atom<boolean>(false);
export const ollamaStatusAtom = atom<"idle" | "checking" | "available" | "unavailable">("idle");

export const fetchOllamaModelsAction = async () => {
	const baseUrl = ollamaBaseUrlAtom.get();
	if (!baseUrl) return;

	isLoadingOllamaModelsAtom.set(true);
	ollamaStatusAtom.set("checking");

	try {
		const isAvailable = await checkOllamaAvailability(baseUrl);
		if (isAvailable) {
			ollamaStatusAtom.set("available");
			const models = await fetchOllamaModels(baseUrl);
			ollamaModelsAtom.set(models);
		} else {
			ollamaStatusAtom.set("unavailable");
			ollamaModelsAtom.set([]);
		}
	} catch (error) {
		console.warn("Failed to fetch Ollama models:", error);
		ollamaStatusAtom.set("unavailable");
		ollamaModelsAtom.set([]);
	} finally {
		isLoadingOllamaModelsAtom.set(false);
	}
};
