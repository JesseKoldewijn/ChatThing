import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	aiSettingsAtom,
	appearanceAtom,
	archiveThresholdAtom,
	encryptedGoogleApiKeyAtom,
	encryptedOllamaApiKeyAtom,
	encryptedOpenRouterApiKeyAtom,
	experimentsAtom,
	formatThreshold,
	getResolvedTimezone,
	getSystemTimezone,
	isProviderLockedAtom,
	masterPasswordAtom,
	outputLanguageAtom,
	PROMPT_API_SUPPORTED_LANGUAGES,
	PROVIDER_GOOGLE,
	PROVIDER_OLLAMA,
	PROVIDER_OPEN_ROUTER,
	PROVIDER_PROMPT_API,
	providerTypeAtom,
	setAppearance,
	setArchiveThreshold,
	setArchiveThresholdDays,
	setTemperatureUnit,
	setTheme,
	setTimezone,
	setupSettingsPersistence,
	temperatureUnitAtom,
	themeAtom,
	thresholdToHours,
	timezoneAtom,
	toggleExperiment,
	updateAiSettings,
} from "./settings";

describe("settings store", () => {
	let cleanup: () => void;

	beforeEach(() => {
		// Reset atoms to defaults
		appearanceAtom.set("system");
		themeAtom.set("default");
		outputLanguageAtom.set("en");
		temperatureUnitAtom.set("auto");
		timezoneAtom.set("auto");
		aiSettingsAtom.set({});
		archiveThresholdAtom.set({ value: 1, unit: "weeks" });
		experimentsAtom.set({});
		masterPasswordAtom.set(null);
		localStorage.clear();
		cleanup = setupSettingsPersistence();
	});

	afterEach(() => {
		if (cleanup) cleanup();
	});

	describe("appearanceAtom", () => {
		it("should default to system", () => {
			expect(appearanceAtom.get()).toBe("system");
		});

		it("should accept light appearance", () => {
			appearanceAtom.set("light");
			expect(appearanceAtom.get()).toBe("light");
		});

		it("should accept dark appearance", () => {
			appearanceAtom.set("dark");
			expect(appearanceAtom.get()).toBe("dark");
		});
	});

	describe("themeAtom", () => {
		it("should default to default", () => {
			expect(themeAtom.get()).toBe("default");
		});

		it("should accept vibrant theme", () => {
			themeAtom.set("vibrant");
			expect(themeAtom.get()).toBe("vibrant");
		});
	});

	describe("outputLanguageAtom", () => {
		it("should default to en", () => {
			expect(outputLanguageAtom.get()).toBe("en");
		});

		it("should accept supported languages", () => {
			for (const lang of PROMPT_API_SUPPORTED_LANGUAGES) {
				outputLanguageAtom.set(lang);
				expect(outputLanguageAtom.get()).toBe(lang);
			}
		});
	});

	describe("temperatureUnitAtom", () => {
		it("should default to auto", () => {
			expect(temperatureUnitAtom.get()).toBe("auto");
		});

		it("should accept fahrenheit", () => {
			temperatureUnitAtom.set("fahrenheit");
			expect(temperatureUnitAtom.get()).toBe("fahrenheit");
		});

		it("should accept celsius", () => {
			temperatureUnitAtom.set("celsius");
			expect(temperatureUnitAtom.get()).toBe("celsius");
		});
	});

	describe("timezoneAtom", () => {
		it("should default to auto", () => {
			expect(timezoneAtom.get()).toBe("auto");
		});

		it("should accept specific timezone", () => {
			timezoneAtom.set("America/New_York");
			expect(timezoneAtom.get()).toBe("America/New_York");
		});
	});

	describe("getSystemTimezone", () => {
		it("should return a valid timezone string", () => {
			const tz = getSystemTimezone();
			expect(typeof tz).toBe("string");
			expect(tz.length).toBeGreaterThan(0);
		});
	});

	describe("getResolvedTimezone", () => {
		it("should return system timezone when set to auto", () => {
			timezoneAtom.set("auto");
			const resolved = getResolvedTimezone();
			expect(resolved).toBe(getSystemTimezone());
		});

		it("should return specific timezone when set", () => {
			timezoneAtom.set("Europe/London");
			const resolved = getResolvedTimezone();
			expect(resolved).toBe("Europe/London");
		});
	});

	describe("archiveThresholdAtom", () => {
		it("should default to 1 week", () => {
			const threshold = archiveThresholdAtom.get();
			expect(threshold.value).toBe(1);
			expect(threshold.unit).toBe("weeks");
		});
	});

	describe("thresholdToHours", () => {
		it("should return 0 when value is 0", () => {
			expect(thresholdToHours({ value: 0, unit: "hours" })).toBe(0);
			expect(thresholdToHours({ value: 0, unit: "days" })).toBe(0);
			expect(thresholdToHours({ value: 0, unit: "weeks" })).toBe(0);
			expect(thresholdToHours({ value: 0, unit: "months" })).toBe(0);
		});

		it("should convert hours correctly", () => {
			expect(thresholdToHours({ value: 5, unit: "hours" })).toBe(5);
			expect(thresholdToHours({ value: 24, unit: "hours" })).toBe(24);
		});

		it("should convert days correctly", () => {
			expect(thresholdToHours({ value: 1, unit: "days" })).toBe(24);
			expect(thresholdToHours({ value: 7, unit: "days" })).toBe(168);
		});

		it("should convert weeks correctly", () => {
			expect(thresholdToHours({ value: 1, unit: "weeks" })).toBe(168);
			expect(thresholdToHours({ value: 2, unit: "weeks" })).toBe(336);
		});

		it("should convert months correctly (approximately 30 days)", () => {
			expect(thresholdToHours({ value: 1, unit: "months" })).toBe(720);
			expect(thresholdToHours({ value: 2, unit: "months" })).toBe(1440);
		});
	});

	describe("aiSettingsAtom", () => {
		it("should default to empty object", () => {
			expect(aiSettingsAtom.get()).toEqual({});
		});

		it("should accept settings", () => {
			const settings = { expectedInputs: [{ type: "text" as const }] };
			aiSettingsAtom.set(settings);
			expect(aiSettingsAtom.get()).toEqual(settings);
		});
	});

	describe("PROMPT_API_SUPPORTED_LANGUAGES", () => {
		it("should include English", () => {
			expect(PROMPT_API_SUPPORTED_LANGUAGES).toContain("en");
		});

		it("should include Spanish", () => {
			expect(PROMPT_API_SUPPORTED_LANGUAGES).toContain("es");
		});

		it("should include Japanese", () => {
			expect(PROMPT_API_SUPPORTED_LANGUAGES).toContain("ja");
		});
	});

	describe("formatThreshold", () => {
		it('should return "Never" when value is 0', () => {
			expect(formatThreshold({ value: 0, unit: "hours" })).toBe("Never");
			expect(formatThreshold({ value: 0, unit: "days" })).toBe("Never");
		});

		it("should format singular unit correctly", () => {
			expect(formatThreshold({ value: 1, unit: "hours" })).toBe("1 hour");
			expect(formatThreshold({ value: 1, unit: "days" })).toBe("1 day");
			expect(formatThreshold({ value: 1, unit: "weeks" })).toBe("1 week");
			expect(formatThreshold({ value: 1, unit: "months" })).toBe("1 month");
		});

		it("should format plural units correctly", () => {
			expect(formatThreshold({ value: 2, unit: "hours" })).toBe("2 hours");
			expect(formatThreshold({ value: 3, unit: "days" })).toBe("3 days");
			expect(formatThreshold({ value: 4, unit: "weeks" })).toBe("4 weeks");
			expect(formatThreshold({ value: 6, unit: "months" })).toBe("6 months");
		});
	});

	describe("setAppearance", () => {
		it("should set appearance and persist to localStorage", () => {
			setAppearance("dark");
			expect(appearanceAtom.get()).toBe("dark");
			expect(localStorage.getItem("appearance")).toBe("dark");
		});
	});

	describe("setTheme", () => {
		it("should set theme and persist to localStorage", () => {
			setTheme("vibrant");
			expect(themeAtom.get()).toBe("vibrant");
			expect(localStorage.getItem("theme")).toBe("vibrant");
		});
	});

	describe("setTemperatureUnit", () => {
		it("should set temperature unit and persist to localStorage", () => {
			setTemperatureUnit("celsius");
			expect(temperatureUnitAtom.get()).toBe("celsius");
			expect(localStorage.getItem("temperature-unit")).toBe("celsius");
		});
	});

	describe("setTimezone", () => {
		it("should set timezone and persist to localStorage", () => {
			setTimezone("America/New_York");
			expect(timezoneAtom.get()).toBe("America/New_York");
			expect(localStorage.getItem("timezone")).toBe("America/New_York");
		});
	});

	describe("setArchiveThreshold", () => {
		it("should set archive threshold and persist to localStorage", () => {
			setArchiveThreshold({ value: 5, unit: "days" });
			expect(archiveThresholdAtom.get().value).toBe(5);
			expect(archiveThresholdAtom.get().unit).toBe("days");
		});

		it("should clamp negative values to 0", () => {
			setArchiveThreshold({ value: -5, unit: "days" });
			expect(archiveThresholdAtom.get().value).toBe(0);
		});

		it("should floor decimal values", () => {
			setArchiveThreshold({ value: 3.7, unit: "hours" });
			expect(archiveThresholdAtom.get().value).toBe(3);
		});
	});

	describe("setArchiveThresholdDays (legacy)", () => {
		it("should set threshold in days", () => {
			setArchiveThresholdDays(7);
			expect(archiveThresholdAtom.get().value).toBe(7);
			expect(archiveThresholdAtom.get().unit).toBe("days");
		});
	});

	describe("updateAiSettings", () => {
		it("should merge settings with existing", () => {
			aiSettingsAtom.set({ expectedInputs: [{ type: "text" }] });
			updateAiSettings({
				expectedInputs: [{ type: "text" }, { type: "image" }],
			});

			const settings = aiSettingsAtom.get();
			expect(settings.expectedInputs).toHaveLength(2);
			expect(settings.expectedInputs?.[0].type).toBe("text");
			expect(settings.expectedInputs?.[1].type).toBe("image");
		});
	});

	describe("experimentsAtom", () => {
		it("should default to empty object", () => {
			expect(experimentsAtom.get()).toEqual({});
		});

		it("should toggle an experiment to true", () => {
			toggleExperiment("tools");
			expect(experimentsAtom.get()).toEqual({ tools: true });
			expect(localStorage.getItem("experiments")).toBe(
				JSON.stringify({ tools: true }),
			);
		});

		it("should toggle an experiment back to false", () => {
			toggleExperiment("tools"); // Set to true
			toggleExperiment("tools"); // Set to false
			expect(experimentsAtom.get()).toEqual({ tools: false });
			expect(localStorage.getItem("experiments")).toBe(
				JSON.stringify({ tools: false }),
			);
		});

		it("should handle multiple experiments", () => {
			toggleExperiment("tools");
			toggleExperiment("test-exp");
			expect(experimentsAtom.get()).toEqual({
				tools: true,
				"test-exp": true,
			});
		});
	});

	describe("isProviderLockedAtom", () => {
		it("should return false for Prompt API", () => {
			providerTypeAtom.set(PROVIDER_PROMPT_API);
			expect(isProviderLockedAtom.get()).toBe(false);
		});

		it("should return false for Ollama without key", () => {
			providerTypeAtom.set(PROVIDER_OLLAMA);
			encryptedOllamaApiKeyAtom.set(null);
			expect(isProviderLockedAtom.get()).toBe(false);
		});

		it("should return true for Google with key but no password", () => {
			providerTypeAtom.set(PROVIDER_GOOGLE);
			encryptedGoogleApiKeyAtom.set("some-encrypted-key");
			masterPasswordAtom.set(null);
			expect(isProviderLockedAtom.get()).toBe(true);
		});

		it("should return false for Google with key and password", () => {
			providerTypeAtom.set(PROVIDER_GOOGLE);
			encryptedGoogleApiKeyAtom.set("some-encrypted-key");
			masterPasswordAtom.set("some-password");
			expect(isProviderLockedAtom.get()).toBe(false);
		});

		it("should return true for OpenRouter with key but no password", () => {
			providerTypeAtom.set(PROVIDER_OPEN_ROUTER);
			encryptedOpenRouterApiKeyAtom.set("some-encrypted-key");
			masterPasswordAtom.set(null);
			expect(isProviderLockedAtom.get()).toBe(true);
		});
	});
});
