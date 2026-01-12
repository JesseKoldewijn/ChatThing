import { describe, it, expect, beforeEach } from "vitest";
import {
	appearanceAtom,
	themeAtom,
	temperatureUnitAtom,
	timezoneAtom,
	outputLanguageAtom,
	archiveThresholdAtom,
	setAppearance,
	setTheme,
	setTemperatureUnit,
	setTimezone,
	setOutputLanguage,
	setArchiveThreshold,
	getSystemTimezone,
	getResolvedTimezone,
	thresholdToHours,
	formatThreshold,
} from "./settings";

describe("Settings Store Integration", () => {
	beforeEach(() => {
		appearanceAtom.set("system");
		themeAtom.set("default");
		temperatureUnitAtom.set("auto");
		timezoneAtom.set("auto");
		outputLanguageAtom.set("en");
		archiveThresholdAtom.set({ value: 2, unit: "days" });
		localStorage.clear();
	});

	describe("appearance and theme persistence", () => {
		it("should persist appearance changes to localStorage", () => {
			setAppearance("dark");
			expect(appearanceAtom.get()).toBe("dark");
			expect(localStorage.getItem("appearance")).toBe("dark");

			setAppearance("light");
			expect(appearanceAtom.get()).toBe("light");
			expect(localStorage.getItem("appearance")).toBe("light");
		});

		it("should handle all appearance options", () => {
			const appearances = ["light", "dark", "system"] as const;
			appearances.forEach((appearance) => {
				setAppearance(appearance);
				expect(appearanceAtom.get()).toBe(appearance);
			});
		});

		it("should persist theme changes to localStorage", () => {
			setTheme("vibrant");
			expect(themeAtom.get()).toBe("vibrant");
			expect(localStorage.getItem("theme")).toBe("vibrant");

			setTheme("default");
			expect(themeAtom.get()).toBe("default");
			expect(localStorage.getItem("theme")).toBe("default");
		});
	});

	describe("temperature unit persistence", () => {
		it("should persist temperature unit changes", () => {
			setTemperatureUnit("celsius");
			expect(temperatureUnitAtom.get()).toBe("celsius");
			expect(localStorage.getItem("temperature-unit")).toBe("celsius");

			setTemperatureUnit("fahrenheit");
			expect(temperatureUnitAtom.get()).toBe("fahrenheit");
			expect(localStorage.getItem("temperature-unit")).toBe("fahrenheit");
		});
	});

	describe("timezone integration", () => {
		it("should resolve timezone correctly", () => {
			timezoneAtom.set("auto");
			const resolved = getResolvedTimezone();
			expect(resolved).toBe(getSystemTimezone());

			setTimezone("America/New_York");
			expect(getResolvedTimezone()).toBe("America/New_York");
		});

		it("should persist timezone changes", () => {
			setTimezone("Europe/London");
			expect(timezoneAtom.get()).toBe("Europe/London");
			expect(localStorage.getItem("timezone")).toBe("Europe/London");
		});
	});

	describe("archive threshold integration", () => {
		it("should convert threshold to hours correctly", () => {
			setArchiveThreshold({ value: 1, unit: "days" });
			expect(thresholdToHours(archiveThresholdAtom.get())).toBe(24);

			setArchiveThreshold({ value: 2, unit: "weeks" });
			expect(thresholdToHours(archiveThresholdAtom.get())).toBe(336); // 2 * 7 * 24

			setArchiveThreshold({ value: 1, unit: "months" });
			expect(thresholdToHours(archiveThresholdAtom.get())).toBe(720); // 30 * 24
		});

		it("should format threshold for display", () => {
			setArchiveThreshold({ value: 7, unit: "days" });
			const formatted = formatThreshold(archiveThresholdAtom.get());
			expect(formatted).toContain("7");
			expect(formatted).toContain("day");
		});

		it("should persist archive threshold", () => {
			setArchiveThreshold({ value: 30, unit: "days" });
			expect(archiveThresholdAtom.get().value).toBe(30);
			expect(archiveThresholdAtom.get().unit).toBe("days");
		});
	});

	describe("output language", () => {
		it("should persist output language changes", () => {
			setOutputLanguage("es");
			expect(outputLanguageAtom.get()).toBe("es");
			expect(localStorage.getItem("output-language")).toBe("es");

			setOutputLanguage("ja");
			expect(outputLanguageAtom.get()).toBe("ja");
			expect(localStorage.getItem("output-language")).toBe("ja");

			setOutputLanguage("en");
			expect(outputLanguageAtom.get()).toBe("en");
			expect(localStorage.getItem("output-language")).toBe("en");
		});
	});
});
