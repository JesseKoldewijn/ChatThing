import { atom } from "nanostores";

/**
 * Tracks whether React hydration is complete.
 * localStorage should only be read after hydration to avoid mismatches.
 */
export const isHydratedAtom = atom<boolean>(false);

/**
 * Mark hydration as complete. Call this from a useEffect in the root component.
 */
export const markHydrated = () => {
	isHydratedAtom.set(true);
};

/**
 * Check if we're in a browser and hydration is complete
 */
export const canUseLocalStorage = (): boolean => {
	return typeof window !== "undefined" && isHydratedAtom.get();
};

