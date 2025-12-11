/**
 * Browser compatibility and Prompt API availability detection
 * Extensible system for supporting multiple browser vendors
 */

// Browser detection
export type BrowserVendor = "chrome" | "edge" | "firefox" | "safari" | "opera" | "unknown";

export interface BrowserInfo {
	vendor: BrowserVendor;
	version: string;
	supportsPromptApi: boolean;
	minRequiredVersion: number;
}

// Prompt API availability states
export type PromptApiAvailability = 
	| "available"      // Ready to use
	| "downloadable"   // Model needs to be downloaded
	| "downloading"    // Model is currently downloading
	| "unavailable"    // Not available on this device
	| "unsupported"    // Browser doesn't support Prompt API
	| "unknown";       // Could not determine

export interface CompatibilityResult {
	isCompatible: boolean;
	availability: PromptApiAvailability;
	error: Error | null;
	browserInfo: BrowserInfo;
	instructions: string | null;
}

// Browser-specific configuration
interface BrowserConfig {
	vendor: BrowserVendor;
	minVersion: number;
	flagsUrl: string;
	internalUrl: string;
	requiredFlags: string[];
	modelName: string;
}

const BROWSER_CONFIGS: Record<string, BrowserConfig> = {
	chrome: {
		vendor: "chrome",
		minVersion: 138,
		flagsUrl: "chrome://flags/",
		internalUrl: "chrome://on-device-internals/",
		requiredFlags: [
			"Prompt API for Gemini Nano",
			"Optimization Guide On Device Model",
		],
		modelName: "Gemini Nano",
	},
	edge: {
		vendor: "edge",
		minVersion: 138,
		flagsUrl: "edge://flags/",
		internalUrl: "edge://on-device-internals/",
		requiredFlags: ["Prompt API for Phi mini"],
		modelName: "Phi mini",
	},
	// Future browser support can be added here
	opera: {
		vendor: "opera",
		minVersion: 999, // Not yet supported
		flagsUrl: "opera://flags/",
		internalUrl: "",
		requiredFlags: [],
		modelName: "",
	},
	firefox: {
		vendor: "firefox",
		minVersion: 999, // Not yet supported
		flagsUrl: "about:config",
		internalUrl: "",
		requiredFlags: [],
		modelName: "",
	},
	safari: {
		vendor: "safari",
		minVersion: 999, // Not yet supported
		flagsUrl: "",
		internalUrl: "",
		requiredFlags: [],
		modelName: "",
	},
};

/**
 * Detect the current browser vendor and version
 */
export const detectBrowser = (): BrowserInfo => {
	if (typeof navigator === "undefined") {
		return {
			vendor: "unknown",
			version: "0",
			supportsPromptApi: false,
			minRequiredVersion: 0,
		};
	}

	const ua = navigator.userAgent;
	let vendor: BrowserVendor = "unknown";
	let version = "0";

	// Order matters - Edge includes "Chrome" in UA, so check Edge first
	if (ua.includes("Edg/")) {
		vendor = "edge";
		const match = ua.match(/Edg\/(\d+)/);
		version = match?.[1] ?? "0";
	} else if (ua.includes("OPR/") || ua.includes("Opera/")) {
		vendor = "opera";
		const match = ua.match(/(?:OPR|Opera)\/(\d+)/);
		version = match?.[1] ?? "0";
	} else if (ua.includes("Chrome/")) {
		vendor = "chrome";
		const match = ua.match(/Chrome\/(\d+)/);
		version = match?.[1] ?? "0";
	} else if (ua.includes("Firefox/")) {
		vendor = "firefox";
		const match = ua.match(/Firefox\/(\d+)/);
		version = match?.[1] ?? "0";
	} else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
		vendor = "safari";
		const match = ua.match(/Version\/(\d+)/);
		version = match?.[1] ?? "0";
	}

	const config = BROWSER_CONFIGS[vendor];
	const versionNum = parseInt(version, 10);

	return {
		vendor,
		version,
		supportsPromptApi: config ? versionNum >= config.minVersion : false,
		minRequiredVersion: config?.minVersion ?? 0,
	};
};

/**
 * Check if the Prompt API is available in the current environment
 */
const checkPromptApiPresence = (): boolean => {
	if (typeof window === "undefined") return false;

	// Check for the LanguageModel API (newer implementation)
	if ("LanguageModel" in window) return true;

	// Check for the ai namespace (older/alternative implementation)
	if ("ai" in window) {
		const ai = (window as unknown as { ai: unknown }).ai;
		if (ai && typeof ai === "object") {
			// Check for languageModel or assistant property
			if ("languageModel" in ai || "assistant" in ai) return true;
		}
	}

	return false;
};

/**
 * Get the LanguageModel API reference
 */
const getLanguageModelApi = (): {
	availability: () => Promise<string>;
	create: (options?: unknown) => Promise<unknown>;
} | null => {
	if (typeof window === "undefined") return null;

	// Try LanguageModel global first
	if ("LanguageModel" in window) {
		return window.LanguageModel as {
			availability: () => Promise<string>;
			create: (options?: unknown) => Promise<unknown>;
		};
	}

	// Try window.ai.languageModel
	if ("ai" in window) {
		const ai = (window as unknown as { ai: { languageModel?: unknown; assistant?: unknown } }).ai;
		if (ai?.languageModel) {
			return ai.languageModel as {
				availability: () => Promise<string>;
				create: (options?: unknown) => Promise<unknown>;
			};
		}
		// Fallback to assistant (older API)
		if (ai?.assistant) {
			return ai.assistant as {
				availability: () => Promise<string>;
				create: (options?: unknown) => Promise<unknown>;
			};
		}
	}

	return null;
};

/**
 * Generate user-friendly instructions based on browser and availability
 */
const generateInstructions = (
	browserInfo: BrowserInfo,
	availability: PromptApiAvailability
): string | null => {
	const config = BROWSER_CONFIGS[browserInfo.vendor];

	if (browserInfo.vendor === "unknown") {
		return "Please use Google Chrome (v138+) or Microsoft Edge (v138+) to access the built-in AI features.";
	}

	if (!config) {
		return `${browserInfo.vendor} browser is not yet supported. Please use Chrome or Edge.`;
	}

	const versionNum = parseInt(browserInfo.version, 10);
	if (versionNum < config.minVersion) {
		return `Please update your browser to version ${config.minVersion} or later. Current version: ${browserInfo.version}`;
	}

	switch (availability) {
		case "available":
			return null;

		case "downloadable":
			return [
				`The ${config.modelName} model needs to be downloaded.`,
				`1. Open ${config.internalUrl} in a new tab`,
				`2. Check the Model Status section`,
				`3. The download should start automatically`,
				`4. Refresh this page once complete`,
			].join("\n");

		case "downloading":
			return [
				`The ${config.modelName} model is currently downloading.`,
				`Please wait for the download to complete and refresh this page.`,
				`You can check progress at ${config.internalUrl}`,
			].join("\n");

		case "unavailable":
			return [
				"The Prompt API is not available on your device. Please check:",
				"• At least 22 GB of free storage space",
				"• At least 16 GB of RAM",
				"• GPU with 4+ GB VRAM (recommended)",
				"",
				"Enable the required flags:",
				`1. Open ${config.flagsUrl} in a new tab`,
				...config.requiredFlags.map((flag) => `2. Enable "${flag}"`),
				"3. Restart your browser",
			].join("\n");

		case "unsupported":
			if (browserInfo.vendor === "firefox" || browserInfo.vendor === "safari") {
				return `${browserInfo.vendor.charAt(0).toUpperCase() + browserInfo.vendor.slice(1)} does not yet support the Prompt API. Please use Chrome or Edge.`;
			}
			return [
				"The Prompt API is not enabled. Please follow these steps:",
				`1. Open ${config.flagsUrl} in a new tab`,
				...config.requiredFlags.map((flag, i) => `${i + 2}. Search for and enable "${flag}"`),
				`${config.requiredFlags.length + 2}. Restart your browser`,
				"",
				`After enabling, visit ${config.internalUrl} to download the model.`,
			].join("\n");

		default:
			return "Unable to determine Prompt API availability. Please ensure you're using a supported browser.";
	}
};

/**
 * Main compatibility check function
 * Checks browser support and Prompt API availability
 */
export const compatibilityCheck = async (): Promise<CompatibilityResult> => {
	const browserInfo = detectBrowser();

	// Check if we're in a browser environment
	if (typeof window === "undefined") {
		return {
			isCompatible: false,
			availability: "unsupported",
			error: new Error("Prompt API is only available in browser environments"),
			browserInfo,
			instructions: null,
		};
	}

	// Check browser support
	if (!browserInfo.supportsPromptApi) {
		const availability: PromptApiAvailability = 
			browserInfo.vendor === "unknown" ? "unsupported" : "unsupported";
		return {
			isCompatible: false,
			availability,
			error: new Error(
				`Your browser (${browserInfo.vendor} v${browserInfo.version}) does not support the Prompt API. ` +
				`Minimum required: Chrome/Edge v138+`
			),
			browserInfo,
			instructions: generateInstructions(browserInfo, availability),
		};
	}

	// Check if Prompt API is present
	if (!checkPromptApiPresence()) {
		return {
			isCompatible: false,
			availability: "unsupported",
			error: new Error(
				"Prompt API is not enabled. Please enable the required browser flags."
			),
			browserInfo,
			instructions: generateInstructions(browserInfo, "unsupported"),
		};
	}

	// Check availability status
	const api = getLanguageModelApi();
	if (!api) {
		return {
			isCompatible: false,
			availability: "unsupported",
			error: new Error("Could not access the Language Model API"),
			browserInfo,
			instructions: generateInstructions(browserInfo, "unsupported"),
		};
	}

	try {
		const availabilityStatus = await api.availability();
		const availability = availabilityStatus as PromptApiAvailability;

		if (availability === "available") {
			return {
				isCompatible: true,
				availability: "available",
				error: null,
				browserInfo,
				instructions: null,
			};
		}

		// Handle non-ready states
		const errorMessages: Record<string, string> = {
			downloadable: "The AI model needs to be downloaded before use",
			downloading: "The AI model is currently downloading",
			unavailable: "The Prompt API is not available on this device",
		};

		return {
			isCompatible: false,
			availability,
			error: new Error(errorMessages[availability] ?? "Prompt API is not ready"),
			browserInfo,
			instructions: generateInstructions(browserInfo, availability),
		};
	} catch (err) {
		return {
			isCompatible: false,
			availability: "unknown",
			error: err as Error,
			browserInfo,
			instructions: generateInstructions(browserInfo, "unknown"),
		};
	}
};

/**
 * Synchronous quick check for basic compatibility (no availability check)
 * Use this for initial UI rendering decisions
 */
export const quickCompatibilityCheck = (): {
	isSupported: boolean;
	browserInfo: BrowserInfo;
} => {
	const browserInfo = detectBrowser();
	const hasApi = checkPromptApiPresence();

	return {
		isSupported: browserInfo.supportsPromptApi && hasApi,
		browserInfo,
	};
};

/**
 * Request the model download if in downloadable state
 * This initiates the download by attempting to create a session
 */
export const requestModelDownload = async (): Promise<{
	success: boolean;
	error: Error | null;
}> => {
	const api = getLanguageModelApi();
	if (!api) {
		return {
			success: false,
			error: new Error("Language Model API not available"),
		};
	}

	try {
		// Attempting to create a session can trigger the download
		await api.create();
		return { success: true, error: null };
	} catch (err) {
		return { success: false, error: err as Error };
	}
};

// Type augmentation for window
declare global {
	interface Window {
		LanguageModel?: {
			availability: () => Promise<string>;
			create: (options?: unknown) => Promise<unknown>;
		};
		ai?: {
			languageModel?: {
				availability: () => Promise<string>;
				create: (options?: unknown) => Promise<unknown>;
			};
			assistant?: {
				availability: () => Promise<string>;
				create: (options?: unknown) => Promise<unknown>;
			};
		};
	}
}
