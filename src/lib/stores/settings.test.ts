import { describe, it, expect, beforeEach } from "vitest";
import {
	themeAtom,
	outputLanguageAtom,
	temperatureUnitAtom,
	timezoneAtom,
	aiSettingsAtom,
	archiveThresholdAtom,
	thresholdToHours,
	getSystemTimezone,
	getResolvedTimezone,
	PROMPT_API_SUPPORTED_LANGUAGES,
} from "./settings";

describe("settings store", () => {
	beforeEach(() => {
		// Reset atoms to defaults
		themeAtom.set("system");
		outputLanguageAtom.set("en");
		temperatureUnitAtom.set("auto");
		timezoneAtom.set("auto");
		aiSettingsAtom.set({});
		archiveThresholdAtom.set({ value: 1, unit: "weeks" });
	});

	describe("themeAtom", () => {
		it("should default to system", () => {
			expect(themeAtom.get()).toBe("system");
		});

		it("should accept light theme", () => {
			themeAtom.set("light");
			expect(themeAtom.get()).toBe("light");
		});

		it("should accept dark theme", () => {
			themeAtom.set("dark");
			expect(themeAtom.get()).toBe("dark");
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
});

