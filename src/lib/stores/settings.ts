import { atom, computed } from "nanostores";
import { encrypt, decrypt } from "@/lib/utils/crypto";
import { 
	type ProviderType, 
	PROVIDER_OPEN_ROUTER,
	PROVIDER_GOOGLE,
	PROVIDER_OLLAMA,
	PROVIDER_PROMPT_API,
} from "@/lib/ai/constants";
import { clearAIManagerCache } from "@/lib/ai";

export {
	PROVIDER_OPEN_ROUTER,
	PROVIDER_GOOGLE,
	PROVIDER_OLLAMA,
	PROVIDER_PROMPT_API,
};

export type Appearance = "light" | "dark" | "system";
export type Theme = "default" | "vibrant";

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

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

// Appearance state (light/dark/system)
export const appearanceAtom = atom<Appearance>("system");

// Theme state (default/vibrant)
export const themeAtom = atom<Theme>("default");

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

// AI Provider settings
export const providerTypeAtom = atom<ProviderType>(PROVIDER_OLLAMA);

// Master password for unlocking API keys (session only)
export const masterPasswordAtom = atom<string | null>(null);

// Encrypted keys (stored in localStorage)
export const encryptedOpenRouterApiKeyAtom = atom<string | null>(null);
export const encryptedGoogleApiKeyAtom = atom<string | null>(null);
export const encryptedOllamaApiKeyAtom = atom<string | null>(null);

// Convenience atom to check if any keys are set
export const hasKeysAtom = computed(
	[encryptedOpenRouterApiKeyAtom, encryptedGoogleApiKeyAtom, encryptedOllamaApiKeyAtom],
	(orKey, gKey, olKey) => !!(orKey || gKey || olKey)
);

// Global locked status
export const isLockedAtom = computed(
	[masterPasswordAtom, hasKeysAtom],
	(password, hasKeys) => {
		// Only "locked" if we have keys to unlock but no password
		return hasKeys && !password;
	}
);

export const openRouterModelAtom = atom<string>("mistralai/devstral-2512:free");
export const googleModelAtom = atom<string>("gemini-2.0-flash-exp");
export const ollamaModelAtom = atom<string>("deepseek-r1:1.5b");
export const ollamaBaseUrlAtom = atom<string>("http://localhost:11434");

// AI settings for built-in models and general overrides
export interface AiSettings {
	expectedInputs?: Array<{ type: string; [key: string]: unknown }>;
	[key: string]: unknown;
}

export const aiSettingsAtom = atom<AiSettings>({});

// Actions
export const updateAiSettings = (settings: Record<string, unknown>) => {
	aiSettingsAtom.set({ ...aiSettingsAtom.get(), ...settings });
};

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

// Storage key for output language
const OUTPUT_LANGUAGE_KEY = "output-language";

// Storage keys for AI providers
const PROVIDER_TYPE_KEY = "ai-provider-type";
const ENCRYPTED_OPENROUTER_API_KEY_KEY = "encrypted-openrouter-api-key";
const ENCRYPTED_GOOGLE_API_KEY_KEY = "encrypted-google-api-key";
const ENCRYPTED_OLLAMA_API_KEY_KEY = "encrypted-ollama-api-key";
const OPENROUTER_MODEL_KEY = "openrouter-model";
const GOOGLE_MODEL_KEY = "google-model";
const OLLAMA_MODEL_KEY = "ollama-model";
const OLLAMA_BASE_URL_KEY = "ollama-base-url";

/**
 * Load appearance and theme from localStorage
 */
const loadThemeFromStorage = () => {
	if (!isBrowser) return;
	const storedAppearance = localStorage.getItem("appearance") as Appearance | null;
	if (storedAppearance && ["light", "dark", "system"].includes(storedAppearance)) {
		appearanceAtom.set(storedAppearance);
	}
	
	const storedTheme = localStorage.getItem("theme") as Theme | null;
	if (storedTheme && ["default", "vibrant"].includes(storedTheme)) {
		themeAtom.set(storedTheme);
	} else if ((storedAppearance as string) === "vibrant") {
		// Migration from old combined theme
		appearanceAtom.set("dark");
		themeAtom.set("vibrant");
		localStorage.setItem("appearance", "dark");
		localStorage.setItem("theme", "vibrant");
	}
};

/**
 * Load temperature unit from localStorage
 */
const loadTemperatureUnitFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(TEMPERATURE_UNIT_KEY) as TemperatureUnit | null;
	if (stored && ["auto", "fahrenheit", "celsius"].includes(stored)) {
		temperatureUnitAtom.set(stored);
	}
};

/**
 * Load timezone from localStorage
 */
const loadTimezoneFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(TIMEZONE_KEY);
	if (stored) {
		timezoneAtom.set(stored);
	}
};

/**
 * Load archive threshold from localStorage
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

/**
 * Load output language from localStorage
 */
const loadOutputLanguageFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(OUTPUT_LANGUAGE_KEY) as PromptApiLanguage | null;
	if (stored && PROMPT_API_SUPPORTED_LANGUAGES.includes(stored)) {
		outputLanguageAtom.set(stored);
	} else {
		// Fall back to browser detection if no stored preference
		const detected = detectBrowserLanguage();
		outputLanguageAtom.set(detected);
	}
};

/**
 * Load AI provider settings from localStorage
 */
const loadAiProviderSettingsFromStorage = () => {
	if (!isBrowser) return;
	
	const type = localStorage.getItem(PROVIDER_TYPE_KEY) as ProviderType | null;
	if (type && [PROVIDER_OPEN_ROUTER, PROVIDER_GOOGLE, PROVIDER_OLLAMA, PROVIDER_PROMPT_API].includes(type)) {
		providerTypeAtom.set(type);
	}
	
	const encryptedOpenRouterKey = localStorage.getItem(ENCRYPTED_OPENROUTER_API_KEY_KEY);
	if (encryptedOpenRouterKey) {
		encryptedOpenRouterApiKeyAtom.set(encryptedOpenRouterKey);
	}

	const encryptedGoogleKey = localStorage.getItem(ENCRYPTED_GOOGLE_API_KEY_KEY);
	if (encryptedGoogleKey) {
		encryptedGoogleApiKeyAtom.set(encryptedGoogleKey);
	}

	const encryptedOllamaKey = localStorage.getItem(ENCRYPTED_OLLAMA_API_KEY_KEY);
	if (encryptedOllamaKey) {
		encryptedOllamaApiKeyAtom.set(encryptedOllamaKey);
	}
	
	const openRouterModel = localStorage.getItem(OPENROUTER_MODEL_KEY);
	if (openRouterModel) {
		openRouterModelAtom.set(openRouterModel);
	}

	const googleModel = localStorage.getItem(GOOGLE_MODEL_KEY);
	if (googleModel) {
		googleModelAtom.set(googleModel);
	}

	const ollamaModel = localStorage.getItem(OLLAMA_MODEL_KEY);
	if (ollamaModel) {
		ollamaModelAtom.set(ollamaModel);
	}

	const ollamaBaseUrl = localStorage.getItem(OLLAMA_BASE_URL_KEY);
	if (ollamaBaseUrl) {
		ollamaBaseUrlAtom.set(ollamaBaseUrl);
	}
};

// Actions
export const setAppearance = (appearance: Appearance) => {
	appearanceAtom.set(appearance);
	if (isBrowser) {
		localStorage.setItem("appearance", appearance);
	}
};

export const setTheme = (theme: Theme) => {
	themeAtom.set(theme);
	if (isBrowser) {
		localStorage.setItem("theme", theme);
	}
};

export const setProviderType = (type: ProviderType) => {
	providerTypeAtom.set(type);
	clearAIManagerCache();
	if (isBrowser) {
		localStorage.setItem(PROVIDER_TYPE_KEY, type);
	}
};

export const setMasterPassword = (password: string | null) => {
	masterPasswordAtom.set(password);
	clearAIManagerCache();
};

export const setOpenRouterApiKey = async (key: string, password?: string) => {
	const currentPassword = password || masterPasswordAtom.get();
	if (!currentPassword) throw new Error("Master password required to set API key");
	
	const encrypted = await encrypt(key, currentPassword);
	encryptedOpenRouterApiKeyAtom.set(encrypted);
	if (isBrowser) {
		localStorage.setItem(ENCRYPTED_OPENROUTER_API_KEY_KEY, encrypted);
	}
};

export const setGoogleApiKey = async (key: string, password?: string) => {
	const currentPassword = password || masterPasswordAtom.get();
	if (!currentPassword) throw new Error("Master password required to set API key");
	
	const encrypted = await encrypt(key, currentPassword);
	encryptedGoogleApiKeyAtom.set(encrypted);
	if (isBrowser) {
		localStorage.setItem(ENCRYPTED_GOOGLE_API_KEY_KEY, encrypted);
	}
};

export const setOllamaApiKey = async (key: string, password?: string) => {
	const currentPassword = password || masterPasswordAtom.get();
	if (!currentPassword) throw new Error("Master password required to set API key");
	
	const encrypted = await encrypt(key, currentPassword);
	encryptedOllamaApiKeyAtom.set(encrypted);
	if (isBrowser) {
		localStorage.setItem(ENCRYPTED_OLLAMA_API_KEY_KEY, encrypted);
	}
};

export const getDecryptedOpenRouterApiKey = async (password?: string): Promise<string | null> => {
	const currentPassword = password || masterPasswordAtom.get();
	const encrypted = encryptedOpenRouterApiKeyAtom.get();
	if (!encrypted || !currentPassword) return null;
	return decrypt(encrypted, currentPassword);
};

export const getDecryptedGoogleApiKey = async (password?: string): Promise<string | null> => {
	const currentPassword = password || masterPasswordAtom.get();
	const encrypted = encryptedGoogleApiKeyAtom.get();
	if (!encrypted || !currentPassword) return null;
	return decrypt(encrypted, currentPassword);
};

export const getDecryptedOllamaApiKey = async (password?: string): Promise<string | null> => {
	const currentPassword = password || masterPasswordAtom.get();
	const encrypted = encryptedOllamaApiKeyAtom.get();
	if (!encrypted || !currentPassword) return null;
	return decrypt(encrypted, currentPassword);
};

export const setOpenRouterModel = (model: string) => {
	openRouterModelAtom.set(model);
	clearAIManagerCache();
	if (isBrowser) {
		localStorage.setItem(OPENROUTER_MODEL_KEY, model);
	}
};

export const setGoogleModel = (model: string) => {
	googleModelAtom.set(model);
	clearAIManagerCache();
	if (isBrowser) {
		localStorage.setItem(GOOGLE_MODEL_KEY, model);
	}
};

export const setOllamaModel = (model: string) => {
	ollamaModelAtom.set(model);
	clearAIManagerCache();
	if (isBrowser) {
		localStorage.setItem(OLLAMA_MODEL_KEY, model);
	}
};

export const setOllamaBaseUrl = (url: string) => {
	ollamaBaseUrlAtom.set(url);
	clearAIManagerCache();
	if (isBrowser) {
		localStorage.setItem(OLLAMA_BASE_URL_KEY, url);
	}
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

export const setOutputLanguage = (language: PromptApiLanguage) => {
	if (!PROMPT_API_SUPPORTED_LANGUAGES.includes(language)) {
		return;
	}
	outputLanguageAtom.set(language);
	if (isBrowser) {
		localStorage.setItem(OUTPUT_LANGUAGE_KEY, language);
	}
};

/**
 * Reset all security settings, including master password and encrypted API keys
 */
export const resetSecuritySettings = () => {
	masterPasswordAtom.set(null);
	encryptedOpenRouterApiKeyAtom.set(null);
	encryptedGoogleApiKeyAtom.set(null);
	encryptedOllamaApiKeyAtom.set(null);
	
	if (isBrowser) {
		localStorage.removeItem(ENCRYPTED_OPENROUTER_API_KEY_KEY);
		localStorage.removeItem(ENCRYPTED_GOOGLE_API_KEY_KEY);
		localStorage.removeItem(ENCRYPTED_OLLAMA_API_KEY_KEY);
	}
};

// Legacy function for compatibility
export const setArchiveThresholdDays = (days: number) => {
	setArchiveThreshold({ value: days, unit: "days" });
};

/**
 * Hydrate settings from localStorage.
 * This should be called only on the client inside a useEffect.
 */
export const hydrateSettings = () => {
	if (!isBrowser) return;
	
	loadThemeFromStorage();
	loadOutputLanguageFromStorage();
	loadTemperatureUnitFromStorage();
	loadTimezoneFromStorage();
	loadArchiveThresholdFromStorage();
	loadAiProviderSettingsFromStorage();
};
