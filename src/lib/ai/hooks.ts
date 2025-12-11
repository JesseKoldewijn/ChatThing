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
import { promptAsync, promptStreamReader } from "./prompt";
import type { BuiltInAIChatSettings } from "@built-in-ai/core";
import {
	compatibilityCheck,
	quickCompatibilityCheck,
	type CompatibilityResult,
	type PromptApiAvailability,
} from "./compat";

// Compatibility state atoms
export const compatibilityAtom = atom<CompatibilityResult | null>(null);
export const compatibilityCheckingAtom = atom<boolean>(true);

/**
 * useCompatibility hook for checking and monitoring Prompt API compatibility
 * @returns Compatibility status and recheck function
 */
export const useCompatibility = () => {
	const compatibility = useStore(compatibilityAtom);
	const isChecking = useStore(compatibilityCheckingAtom);

	const checkCompatibility = useCallback(async () => {
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
	}, []);

	// Run compatibility check on mount
	useEffect(() => {
		checkCompatibility();
	}, [checkCompatibility]);

	return {
		compatibility,
		isChecking,
		recheck: checkCompatibility,
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

	const streamAsyncCallback = useCallback(
		async (prompt: string, options?: BuiltInAIChatSettings) => {
			try {
				// Check cached compatibility first
				if (compatibility && !compatibility.isCompatible) {
					throw compatibility.error ?? new Error("Prompt API is not available");
				}

				// If no cached result, run async check
				if (!compatibility) {
					const result = await compatibilityCheck();
					compatibilityAtom.set(result);
					if (!result.isCompatible) {
						throw result.error ?? new Error("Prompt API is not available");
					}
				}

				loadingAtom.set(true);
				errorAtom.set(null);
				streamDataAtom.set(null);
				conversationAtom.set([...conversationAtom.get(), prompt]);
				const stream = await promptAsync(prompt, options);
				const data = await promptStreamReader(stream);
				dataAtom.set(data);
				streamDataAtom.set(stream);
			} catch (error) {
				errorAtom.set(error as Error);
			} finally {
				loadingAtom.set(false);
			}
		},
		[compatibility]
	);

	return { loading, error, streamData, data, prompt: streamAsyncCallback };
};
