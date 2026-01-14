import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	aiSettingsAtom,
	appearanceAtom,
	archiveThresholdAtom,
	archiveThresholdDaysAtom,
	encryptedGoogleApiKeyAtom,
	encryptedOllamaApiKeyAtom,
	encryptedOpenRouterApiKeyAtom,
	experimentsAtom,
	getDecryptedGoogleApiKey,
	getDecryptedOllamaApiKey,
	getDecryptedOpenRouterApiKey,
	getResolvedTimezone,
	getSystemTimezone,
	hydrateSettings,
	masterPasswordAtom,
	ollamaBaseUrlAtom,
	outputLanguageAtom,
	resetSecuritySettings,
	setAppearance,
	setArchiveThreshold,
	setArchiveThresholdDays,
	setGoogleApiKey,
	setGoogleModel,
	setMasterPassword,
	setOllamaApiKey,
	setOllamaBaseUrl,
	setOllamaModel,
	setOpenRouterApiKey,
	setOpenRouterModel,
	setOutputLanguage,
	setProviderType,
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

describe("settings store - extended coverage", () => {
	let cleanup: () => void;

	beforeEach(() => {
		// Reset atoms to defaults
		appearanceAtom.set("system");
		themeAtom.set("default");
		outputLanguageAtom.set("en");
		temperatureUnitAtom.set("auto");
		timezoneAtom.set("auto");
		aiSettingsAtom.set({});
		archiveThresholdAtom.set({ value: 2, unit: "days" });
		ollamaBaseUrlAtom.set("http://localhost:11434");
		masterPasswordAtom.set(null);
		experimentsAtom.set({});
		encryptedOpenRouterApiKeyAtom.set(null);
		encryptedGoogleApiKeyAtom.set(null);
		encryptedOllamaApiKeyAtom.set(null);

		// Clear and setup spies for localStorage
		vi.spyOn(Storage.prototype, "setItem");
		vi.spyOn(Storage.prototype, "getItem");
		vi.spyOn(Storage.prototype, "removeItem");
		localStorage.clear();

		cleanup = setupSettingsPersistence();
	});

	afterEach(() => {
		if (cleanup) cleanup();
		vi.restoreAllMocks();
	});

	describe("getSystemTimezone edge cases", () => {
		it("should return a timezone in IANA format", () => {
			const tz = getSystemTimezone();
			// IANA timezone format contains a slash (e.g., "America/New_York")
			// or is "UTC"
			expect(tz === "UTC" || tz.includes("/")).toBe(true);
		});

		it("should handle Intl.DateTimeFormat errors gracefully", () => {
			// The function has a try-catch that returns "UTC" on error
			// We can test this indirectly by verifying the function doesn't throw
			expect(() => getSystemTimezone()).not.toThrow();
		});
	});

	describe("getResolvedTimezone edge cases", () => {
		it("should return specific timezone for various common timezones", () => {
			const timezones = [
				"America/Los_Angeles",
				"Europe/Paris",
				"Asia/Tokyo",
				"Australia/Sydney",
			];

			for (const tz of timezones) {
				timezoneAtom.set(tz);
				expect(getResolvedTimezone()).toBe(tz);
			}
		});
	});

	describe("thresholdToHours edge cases", () => {
		it("should handle large values", () => {
			expect(thresholdToHours({ value: 100, unit: "months" })).toBe(72000);
		});

		it("should handle unknown unit as days (default case)", () => {
			// TypeScript prevents this, but we can test the runtime behavior
			const unknownUnit = { value: 2, unit: "unknown" as "days" };
			expect(thresholdToHours(unknownUnit)).toBe(48);
		});
	});

	describe("archiveThresholdDaysAtom synchronization", () => {
		it("should update legacy atom when threshold is set in hours", () => {
			setArchiveThreshold({ value: 48, unit: "hours" });
			expect(archiveThresholdDaysAtom.get()).toBe(2);
		});

		it("should update legacy atom when threshold is set in weeks", () => {
			setArchiveThreshold({ value: 2, unit: "weeks" });
			expect(archiveThresholdDaysAtom.get()).toBe(14);
		});

		it("should update legacy atom when threshold is set in months", () => {
			setArchiveThreshold({ value: 1, unit: "months" });
			// 1 month = 30 days
			expect(archiveThresholdDaysAtom.get()).toBe(30);
		});

		it("should handle zero value correctly", () => {
			setArchiveThreshold({ value: 0, unit: "days" });
			expect(archiveThresholdDaysAtom.get()).toBe(0);
		});
	});

	describe("localStorage persistence", () => {
		it("should persist archive threshold as JSON", () => {
			setArchiveThreshold({ value: 3, unit: "weeks" });
			const stored = localStorage.getItem("archive-threshold");
			expect(stored).toBe(JSON.stringify({ value: 3, unit: "weeks" }));
		});

		it("should handle multiple appearance and theme changes", () => {
			setAppearance("light");
			expect(localStorage.getItem("appearance")).toBe("light");
			setAppearance("dark");
			expect(localStorage.getItem("appearance")).toBe("dark");

			setTheme("vibrant");
			expect(localStorage.getItem("theme")).toBe("vibrant");
			setTheme("default");
			expect(localStorage.getItem("theme")).toBe("default");
		});

		it("should handle multiple temperature unit changes", () => {
			setTemperatureUnit("fahrenheit");
			expect(localStorage.getItem("temperature-unit")).toBe("fahrenheit");
			setTemperatureUnit("auto");
			expect(localStorage.getItem("temperature-unit")).toBe("auto");
		});

		it("should handle multiple timezone changes", () => {
			setTimezone("America/New_York");
			expect(localStorage.getItem("timezone")).toBe("America/New_York");
			setTimezone("auto");
			expect(localStorage.getItem("timezone")).toBe("auto");
		});
	});

	describe("updateAiSettings merging", () => {
		it("should preserve existing settings when adding new ones", () => {
			aiSettingsAtom.set({ expectedInputs: [{ type: "text" }] });
			updateAiSettings({});

			const settings = aiSettingsAtom.get();
			expect(settings.expectedInputs).toHaveLength(1);
		});

		it("should override specific settings", () => {
			aiSettingsAtom.set({
				expectedInputs: [{ type: "text" }],
			});
			updateAiSettings({
				expectedInputs: [{ type: "image" }],
			});

			const settings = aiSettingsAtom.get();
			expect(settings.expectedInputs).toHaveLength(1);
			expect(settings.expectedInputs?.[0].type).toBe("image");
		});
	});

	describe("archiveThreshold validation", () => {
		it("should handle very large negative values", () => {
			setArchiveThreshold({ value: -1000, unit: "days" });
			expect(archiveThresholdAtom.get().value).toBe(0);
		});

		it("should floor very small decimals", () => {
			setArchiveThreshold({ value: 0.1, unit: "days" });
			expect(archiveThresholdAtom.get().value).toBe(0);
		});

		it("should floor values close to integers", () => {
			setArchiveThreshold({ value: 4.999, unit: "hours" });
			expect(archiveThresholdAtom.get().value).toBe(4);
		});

		it("should preserve unit when value is adjusted", () => {
			setArchiveThreshold({ value: -5, unit: "months" });
			expect(archiveThresholdAtom.get().unit).toBe("months");
		});
	});

	describe("all appearance options", () => {
		it("should set light appearance correctly", () => {
			setAppearance("light");
			expect(appearanceAtom.get()).toBe("light");
		});

		it("should set dark appearance correctly", () => {
			setAppearance("dark");
			expect(appearanceAtom.get()).toBe("dark");
		});

		it("should set system appearance correctly", () => {
			setAppearance("system");
			expect(appearanceAtom.get()).toBe("system");
		});
	});

	describe("all temperature unit options", () => {
		it("should set auto correctly", () => {
			setTemperatureUnit("auto");
			expect(temperatureUnitAtom.get()).toBe("auto");
		});

		it("should set fahrenheit correctly", () => {
			setTemperatureUnit("fahrenheit");
			expect(temperatureUnitAtom.get()).toBe("fahrenheit");
		});

		it("should set celsius correctly", () => {
			setTemperatureUnit("celsius");
			expect(temperatureUnitAtom.get()).toBe("celsius");
		});
	});

	describe("ollama base url", () => {
		it("should set and persist ollama base url", () => {
			setOllamaBaseUrl("http://localhost:11435");
			expect(ollamaBaseUrlAtom.get()).toBe("http://localhost:11435");
			expect(localStorage.getItem("ollama-base-url")).toBe(
				"http://localhost:11435",
			);
		});
	});

	describe("security settings", () => {
		beforeEach(() => {
			resetSecuritySettings();
		});

		it("should set and get master password", () => {
			setMasterPassword("test-password");
			expect(masterPasswordAtom.get()).toBe("test-password");
		});

		it("should set and decrypt google api key", async () => {
			setMasterPassword("test-password");
			await setGoogleApiKey("google-key");

			const encrypted = encryptedGoogleApiKeyAtom.get();
			expect(encrypted).not.toBeNull();
			expect(encrypted).not.toBe("google-key");

			const decrypted = await getDecryptedGoogleApiKey();
			expect(decrypted).toBe("google-key");
		});

		it("should set and decrypt ollama api key", async () => {
			setMasterPassword("test-password");
			await setOllamaApiKey("ollama-key");

			const encrypted = encryptedOllamaApiKeyAtom.get();
			expect(encrypted).not.toBeNull();
			expect(encrypted).not.toBe("ollama-key");

			const decrypted = await getDecryptedOllamaApiKey();
			expect(decrypted).toBe("ollama-key");
		});

		it("should throw error if setting key without master password", async () => {
			await expect(setGoogleApiKey("key")).rejects.toThrow(
				"Master password required to set API key",
			);
			await expect(setOllamaApiKey("key")).rejects.toThrow(
				"Master password required to set API key",
			);
		});

		it("should reset security settings", () => {
			setMasterPassword("p");
			encryptedOpenRouterApiKeyAtom.set("e1");
			encryptedGoogleApiKeyAtom.set("e2");
			encryptedOllamaApiKeyAtom.set("e3");

			resetSecuritySettings();

			expect(masterPasswordAtom.get()).toBeNull();
			expect(encryptedOpenRouterApiKeyAtom.get()).toBeNull();
			expect(encryptedGoogleApiKeyAtom.get()).toBeNull();
			expect(encryptedOllamaApiKeyAtom.get()).toBeNull();
		});
	});

	describe("legacy compatibility", () => {
		it("should set archive threshold days", () => {
			setArchiveThresholdDays(5);
			expect(archiveThresholdAtom.get()).toEqual({ value: 5, unit: "days" });
			expect(archiveThresholdDaysAtom.get()).toBe(5);
		});

		it("should load archive threshold from legacy number format", () => {
			localStorage.setItem("archive-threshold", "10");
			hydrateSettings();
			expect(archiveThresholdAtom.get()).toEqual({ value: 10, unit: "days" });
			expect(archiveThresholdDaysAtom.get()).toBe(10);
		});

		it("should migrate from old vibrant theme", () => {
			localStorage.setItem("appearance", "vibrant");

			hydrateSettings();

			expect(appearanceAtom.get()).toBe("dark");
			expect(themeAtom.get()).toBe("vibrant");
			expect(localStorage.getItem("appearance")).toBe("dark");
			expect(localStorage.getItem("theme")).toBe("vibrant");
		});
	});

	describe("persistence listeners", () => {
		it("should persist appearance changes", () => {
			setAppearance("dark");
			expect(localStorage.getItem("appearance")).toBe("dark");
		});

		it("should persist theme changes", () => {
			setTheme("vibrant");
			expect(localStorage.getItem("theme")).toBe("vibrant");
		});

		it("should persist provider type changes", () => {
			setProviderType("google");
			expect(localStorage.getItem("ai-provider-type")).toBe("google");
		});

		it("should persist model changes for all providers", () => {
			setOpenRouterModel("model-or");
			expect(localStorage.getItem("openrouter-model")).toBe("model-or");

			setGoogleModel("model-g");
			expect(localStorage.getItem("google-model")).toBe("model-g");

			setOllamaModel("model-ol");
			expect(localStorage.getItem("ollama-model")).toBe("model-ol");
		});

		it("should persist output language changes", () => {
			setOutputLanguage("ja");
			expect(localStorage.getItem("output-language")).toBe("ja");
		});

		it("should not set invalid output language", () => {
			const current = outputLanguageAtom.get();
			// @ts-expect-error - testing invalid input
			setOutputLanguage("invalid");
			expect(outputLanguageAtom.get()).toBe(current);
		});

		it("should persist encrypted keys", async () => {
			masterPasswordAtom.set("password");
			await setOpenRouterApiKey("key123");
			expect(
				localStorage.getItem("encrypted-openrouter-api-key"),
			).toBeDefined();
			expect(
				localStorage.getItem("encrypted-openrouter-api-key"),
			).not.toBeNull();

			encryptedOpenRouterApiKeyAtom.set(null);
			expect(localStorage.getItem("encrypted-openrouter-api-key")).toBeNull();
		});

		it("should decrypt keys correctly", async () => {
			const password = "password123";
			const rawKey = "test-api-key";
			masterPasswordAtom.set(password);

			await setOpenRouterApiKey(rawKey);
			await setGoogleApiKey(rawKey);
			await setOllamaApiKey(rawKey);

			expect(await getDecryptedOpenRouterApiKey()).toBe(rawKey);
			expect(await getDecryptedGoogleApiKey()).toBe(rawKey);
			expect(await getDecryptedOllamaApiKey()).toBe(rawKey);
		});

		it("should return null if decryption fails or no key", async () => {
			expect(await getDecryptedOpenRouterApiKey()).toBeNull();

			masterPasswordAtom.set("password");
			expect(await getDecryptedOpenRouterApiKey()).toBeNull();
		});
	});

	describe("security settings", () => {
		it("should reset security settings", () => {
			masterPasswordAtom.set("password");
			encryptedOpenRouterApiKeyAtom.set("key1");
			encryptedGoogleApiKeyAtom.set("key2");
			encryptedOllamaApiKeyAtom.set("key3");

			resetSecuritySettings();

			expect(masterPasswordAtom.get()).toBe(null);
			expect(encryptedOpenRouterApiKeyAtom.get()).toBe(null);
			expect(encryptedGoogleApiKeyAtom.get()).toBe(null);
			expect(encryptedOllamaApiKeyAtom.get()).toBe(null);
		});
	});

	describe("experiments", () => {
		it("should toggle experiments and persist", () => {
			toggleExperiment("tools");
			expect(experimentsAtom.get().tools).toBe(true);
			expect(localStorage.getItem("experiments")).toBe(
				JSON.stringify({ tools: true }),
			);

			toggleExperiment("tools");
			expect(experimentsAtom.get().tools).toBe(false);
			expect(localStorage.getItem("experiments")).toBe(
				JSON.stringify({ tools: false }),
			);
		});
	});

	describe("hydration", () => {
		it("should hydrate all settings from localStorage", () => {
			localStorage.setItem("theme", "vibrant");
			localStorage.setItem("output-language", "es");
			localStorage.setItem("temperature-unit", "celsius");
			localStorage.setItem("timezone", "Europe/Madrid");
			localStorage.setItem(
				"archive-threshold",
				JSON.stringify({ value: 5, unit: "weeks" }),
			);
			localStorage.setItem("experiments", JSON.stringify({ tools: true }));

			hydrateSettings();

			expect(themeAtom.get()).toBe("vibrant");
			expect(outputLanguageAtom.get()).toBe("es");
			expect(temperatureUnitAtom.get()).toBe("celsius");
			expect(timezoneAtom.get()).toBe("Europe/Madrid");
			expect(archiveThresholdAtom.get()).toEqual({ value: 5, unit: "weeks" });
			expect(experimentsAtom.get().tools).toBe(true);
		});
	});
});
