import { atom, onMount } from "nanostores";
import type { BuiltInAIChatSettings } from "@built-in-ai/core";
import { isHydratedAtom } from "./hydration";

export type Theme = "light" | "dark" | "system";

// Temperature unit preference
export type TemperatureUnit = "auto" | "fahrenheit" | "celsius";

// Languages supported by the Prompt API (optimal quality and safety attestation)
export const PROMPT_API_SUPPORTED_LANGUAGES = ["en", "es", "ja"] as const;
export type PromptApiLanguage = (typeof PROMPT_API_SUPPORTED_LANGUAGES)[number];

/**
 * Detect the best output language from the browser's language settings
 * Returns a supported language code for optimal API performance
 */
const detectBrowserLanguage = (): PromptApiLanguage => {
	if (typeof navigator === "undefined") {
		return "en";
	}

	// Get browser languages in order of preference
	const browserLanguages = navigator.languages ?? [navigator.language];

	for (const lang of browserLanguages) {
		// Normalize to lowercase and get the primary language code
		const primaryCode = lang.toLowerCase().split("-")[0];

		// Check if it matches a supported language
		if (
			PROMPT_API_SUPPORTED_LANGUAGES.includes(
				primaryCode as PromptApiLanguage
			)
		) {
			return primaryCode as PromptApiLanguage;
		}
	}

	// Default to English if no supported language found
	return "en";
};

// Theme state
export const themeAtom = atom<Theme>("system");

// Output language state - auto-detected from browser, always a supported language
export const outputLanguageAtom = atom<PromptApiLanguage>("en");

// Temperature unit preference - "auto" uses browser locale detection
export const temperatureUnitAtom = atom<TemperatureUnit>("auto");

// Timezone preference - "auto" uses system timezone
export type TimezonePreference = "auto" | string;
export const timezoneAtom = atom<TimezonePreference>("auto");

/**
 * Get the system's default timezone
 */
export const getSystemTimezone = (): string => {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	} catch {
		return "UTC";
	}
};

/**
 * Get the resolved timezone (handles "auto" setting)
 */
export const getResolvedTimezone = (): string => {
	const setting = timezoneAtom.get();
	if (setting === "auto") {
		return getSystemTimezone();
	}
	return setting;
};

// AI model settings
export const aiSettingsAtom = atom<BuiltInAIChatSettings>({});

// Archive threshold units
export type ArchiveThresholdUnit = "hours" | "days" | "weeks" | "months";

export interface ArchiveThreshold {
	value: number;
	unit: ArchiveThresholdUnit;
}

// Convert threshold to hours for consistent storage and comparison
export const thresholdToHours = (threshold: ArchiveThreshold): number => {
	if (threshold.value === 0) return 0;
	switch (threshold.unit) {
		case "hours":
			return threshold.value;
		case "days":
			return threshold.value * 24;
		case "weeks":
			return threshold.value * 24 * 7;
		case "months":
			return threshold.value * 24 * 30; // Approximate
		default:
			return threshold.value * 24;
	}
};

// Format threshold for display
export const formatThreshold = (threshold: ArchiveThreshold): string => {
	if (threshold.value === 0) return "Never";
	const unit = threshold.unit;
	const value = threshold.value;
	const unitLabel = value === 1 ? unit.slice(0, -1) : unit; // Remove 's' for singular
	return `${value} ${unitLabel}`;
};

// Archive threshold - stores value and unit separately
// Default: 2 days, value=0 = disabled (never auto-archive)
export const archiveThresholdAtom = atom<ArchiveThreshold>({
	value: 2,
	unit: "days",
});

// Legacy compatibility: get threshold in days (deprecated, use archiveThresholdAtom)
export const archiveThresholdDaysAtom = atom<number>(2);

// Storage key for archive threshold
const ARCHIVE_THRESHOLD_KEY = "archive-threshold";

// Storage key for temperature unit
const TEMPERATURE_UNIT_KEY = "temperature-unit";

// Storage key for timezone
const TIMEZONE_KEY = "timezone";

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

/**
 * Load theme from localStorage (called after hydration)
 */
const loadThemeFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem("theme") as Theme | null;
	if (stored) {
		themeAtom.set(stored);
	}
};

/**
 * Load temperature unit from localStorage (called after hydration)
 */
const loadTemperatureUnitFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(TEMPERATURE_UNIT_KEY) as TemperatureUnit | null;
	if (stored && ["auto", "fahrenheit", "celsius"].includes(stored)) {
		temperatureUnitAtom.set(stored);
	}
};

/**
 * Load timezone from localStorage (called after hydration)
 */
const loadTimezoneFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(TIMEZONE_KEY);
	if (stored) {
		timezoneAtom.set(stored);
	}
};

/**
 * Load archive threshold from localStorage (called after hydration)
 */
const loadArchiveThresholdFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(ARCHIVE_THRESHOLD_KEY);
	if (stored) {
		try {
			const parsed = JSON.parse(stored) as ArchiveThreshold;
			if (
				typeof parsed.value === "number" &&
				parsed.value >= 0 &&
				parsed.unit
			) {
				archiveThresholdAtom.set(parsed);
				const hours = thresholdToHours(parsed);
				archiveThresholdDaysAtom.set(Math.ceil(hours / 24));
			}
		} catch {
			// Legacy format: just a number (days)
			const parsed = parseInt(stored, 10);
			if (!isNaN(parsed) && parsed >= 0) {
				archiveThresholdAtom.set({ value: parsed, unit: "days" });
				archiveThresholdDaysAtom.set(parsed);
			}
		}
	}
};

// Initialize theme - defer localStorage read until after hydration
onMount(themeAtom, () => {
	if (!isBrowser) return;
	
	// If already hydrated, load immediately
	if (isHydratedAtom.get()) {
		loadThemeFromStorage();
		return;
	}
	
	// Otherwise, wait for hydration to complete
	const unsubscribe = isHydratedAtom.subscribe((hydrated) => {
		if (hydrated) {
			loadThemeFromStorage();
			unsubscribe();
		}
	});
	
	return unsubscribe;
});

// Initialize output language from browser detection on mount
onMount(outputLanguageAtom, () => {
	// Language detection doesn't cause hydration issues since it's the same on server/client
	const detected = detectBrowserLanguage();
	outputLanguageAtom.set(detected);
});

// Initialize temperature unit - defer localStorage read until after hydration
onMount(temperatureUnitAtom, () => {
	if (!isBrowser) return;
	
	// If already hydrated, load immediately
	if (isHydratedAtom.get()) {
		loadTemperatureUnitFromStorage();
		return;
	}
	
	// Otherwise, wait for hydration to complete
	const unsubscribe = isHydratedAtom.subscribe((hydrated) => {
		if (hydrated) {
			loadTemperatureUnitFromStorage();
			unsubscribe();
		}
	});
	
	return unsubscribe;
});

// Initialize timezone - defer localStorage read until after hydration
onMount(timezoneAtom, () => {
	if (!isBrowser) return;
	
	// If already hydrated, load immediately
	if (isHydratedAtom.get()) {
		loadTimezoneFromStorage();
		return;
	}
	
	// Otherwise, wait for hydration to complete
	const unsubscribe = isHydratedAtom.subscribe((hydrated) => {
		if (hydrated) {
			loadTimezoneFromStorage();
			unsubscribe();
		}
	});
	
	return unsubscribe;
});

// Initialize archive threshold - defer localStorage read until after hydration
onMount(archiveThresholdAtom, () => {
	if (!isBrowser) return;
	
	// If already hydrated, load immediately
	if (isHydratedAtom.get()) {
		loadArchiveThresholdFromStorage();
		return;
	}
	
	// Otherwise, wait for hydration to complete
	const unsubscribe = isHydratedAtom.subscribe((hydrated) => {
		if (hydrated) {
			loadArchiveThresholdFromStorage();
			unsubscribe();
		}
	});
	
	return unsubscribe;
});

// Actions
export const setTheme = (theme: Theme) => {
	themeAtom.set(theme);
	if (isBrowser) {
		localStorage.setItem("theme", theme);
	}
	// Theme application is handled by ThemeProvider component
};

export const updateAiSettings = (settings: Partial<BuiltInAIChatSettings>) => {
	aiSettingsAtom.set({ ...aiSettingsAtom.get(), ...settings });
};

export const setTemperatureUnit = (unit: TemperatureUnit) => {
	temperatureUnitAtom.set(unit);
	if (isBrowser) {
		localStorage.setItem(TEMPERATURE_UNIT_KEY, unit);
	}
};

export const setTimezone = (timezone: TimezonePreference) => {
	timezoneAtom.set(timezone);
	if (isBrowser) {
		localStorage.setItem(TIMEZONE_KEY, timezone);
	}
};

export const setArchiveThreshold = (threshold: ArchiveThreshold) => {
	const validValue = Math.max(0, Math.floor(threshold.value));
	const validThreshold = { value: validValue, unit: threshold.unit };
	archiveThresholdAtom.set(validThreshold);
	if (isBrowser) {
		localStorage.setItem(ARCHIVE_THRESHOLD_KEY, JSON.stringify(validThreshold));
	}

	// Also update legacy atom for compatibility
	const hours = thresholdToHours(validThreshold);
	archiveThresholdDaysAtom.set(Math.ceil(hours / 24));
};

// Legacy function for compatibility
export const setArchiveThresholdDays = (days: number) => {
	setArchiveThreshold({ value: days, unit: "days" });
};
