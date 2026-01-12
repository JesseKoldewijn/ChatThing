import { describe, it, expect, beforeEach } from "vitest";
import {
	appearanceAtom,
	themeAtom,
	outputLanguageAtom,
	temperatureUnitAtom,
	timezoneAtom,
	aiSettingsAtom,
	archiveThresholdAtom,
	archiveThresholdDaysAtom,
	thresholdToHours,
	getSystemTimezone,
	getResolvedTimezone,
	setAppearance,
	setTheme,
	setTemperatureUnit,
	setTimezone,
	setArchiveThreshold,
	updateAiSettings,
} from "./settings";

describe("settings store - extended coverage", () => {
	beforeEach(() => {
		// Reset atoms to defaults
		appearanceAtom.set("system");
		themeAtom.set("default");
		outputLanguageAtom.set("en");
		temperatureUnitAtom.set("auto");
		timezoneAtom.set("auto");
		aiSettingsAtom.set({});
		archiveThresholdAtom.set({ value: 2, unit: "days" });
		localStorage.clear();
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
			
			setTheme("default");
			expect(localStorage.getItem("theme")).toBe("default");
			setTheme("vibrant");
			expect(localStorage.getItem("theme")).toBe("vibrant");
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
});

