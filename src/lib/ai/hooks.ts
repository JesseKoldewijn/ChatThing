import { useStore } from "@nanostores/react";
import { useCallback, useEffect } from "react";
import { atom } from "nanostores";
import {
	loadingAtom,
	errorAtom,
	streamDataAtom,
	dataAtom,
	conversationAtom,
} from "./store";
import { getAIManager } from "./index";
import { promptStreamReader } from "./manager";
import type { BuiltInAIChatSettings } from "@built-in-ai/core";
import {
	compatibilityCheck,
	quickCompatibilityCheck,
	type CompatibilityResult,
	type PromptApiAvailability,
} from "./prompt-api/compat";
import { providerTypeAtom } from "@/lib/stores/settings";

// Compatibility state atoms
export const compatibilityAtom = atom<CompatibilityResult | null>(null);
export const compatibilityCheckingAtom = atom<boolean>(false);

/**
 * useCompatibility hook for checking and monitoring Prompt API compatibility
 * ONLY runs when Prompt API is selected
 * @returns Compatibility status and recheck function
 */
export const useCompatibility = () => {
	const compatibility = useStore(compatibilityAtom);
	const isChecking = useStore(compatibilityCheckingAtom);
	const providerType = useStore(providerTypeAtom);

	const checkCompatibility = useCallback(async () => {
		// Only check if Prompt API is active
		if (providerType !== "prompt-api") {
			compatibilityCheckingAtom.set(false);
			return;
		}

		compatibilityCheckingAtom.set(true);
		try {
			const result = await compatibilityCheck();
			compatibilityAtom.set(result);
		} catch (error) {
			compatibilityAtom.set({
				isCompatible: false,
				availability: "unknown" as PromptApiAvailability,
				error: error as Error,
				browserInfo: quickCompatibilityCheck().browserInfo,
				instructions: "An error occurred while checking compatibility.",
			});
		} finally {
			compatibilityCheckingAtom.set(false);
		}
	}, [providerType]);

	// Run compatibility check on mount or provider change
	useEffect(() => {
		if (providerType === "prompt-api") {
			checkCompatibility();
		} else {
			// Reset compatibility state when switching away from Prompt API
			compatibilityAtom.set(null);
			compatibilityCheckingAtom.set(false);
		}
	}, [checkCompatibility, providerType]);

	return {
		compatibility,
		isChecking,
		recheck: () => {
			if (providerType === "prompt-api") {
				compatibilityCheckingAtom.set(true);
				setTimeout(() => {
					checkCompatibility();
				}, 1000);
			}
		},
	};
};

/**
 * usePrompt is a hook that will return a loading state, error state, stream data, and data state.
 * It will also return a function that will allow you to prompt the AI.
 * @returns {Object} - An object containing the loading state, error state, stream data, and data state.
 */
export const usePrompt = () => {
	const loading = useStore(loadingAtom);
	const error = useStore(errorAtom);
	const streamData = useStore(streamDataAtom);
	const data = useStore(dataAtom);
	const compatibility = useStore(compatibilityAtom);
	const providerType = useStore(providerTypeAtom);

	const streamAsyncCallback = useCallback(
		async (prompt: string, options?: BuiltInAIChatSettings) => {
			try {
				// Only check compatibility for Prompt API
				if (providerType === "prompt-api") {
					// Check cached compatibility first
					if (compatibility && !compatibility.isCompatible) {
						throw (
							compatibility.error ??
							new Error("Prompt API is not available")
						);
					}

					// If no cached result, run async check
					if (!compatibility) {
						const result = await compatibilityCheck();
						compatibilityAtom.set(result);
						if (!result.isCompatible) {
							throw (
								result.error ??
								new Error("Prompt API is not available")
							);
						}
					}
				}

				loadingAtom.set(true);
				errorAtom.set(null);
				streamDataAtom.set(null);
				conversationAtom.set([...conversationAtom.get(), prompt]);
				
				const manager = getAIManager();
				const stream = await manager.prompt(prompt, options);
				const data = await promptStreamReader(stream);
				dataAtom.set(data);
				streamDataAtom.set(stream);
			} catch (error) {
				errorAtom.set(error as Error);
			} finally {
				loadingAtom.set(false);
			}
		},
		[compatibility, providerType]
	);

	return { loading, error, streamData, data, prompt: streamAsyncCallback };
};
