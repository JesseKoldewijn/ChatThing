import { describe, expect, it } from "vitest";
import {
	formatDateByGranularity,
	formatInTimezone,
	getDaysInMonth,
	getFriendlyDate,
	getMonths,
	getStartOfDayInTimezone,
	getWeekdays,
} from "./date";

describe("date utilities", () => {
	const testTimestamp = 1736600000000; // 2025-01-11T12:53:20Z
	const timezone = "Europe/London";

	describe("formatInTimezone", () => {
		it("should format a date string in specified timezone", () => {
			const formatted = formatInTimezone(testTimestamp, timezone);
			// Example format: 11/01/25 12:53 (might vary by environment locale, but we fixed to en-GB)
			expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}/);
		});

		it("should handle 'auto' timezone", () => {
			const formatted = formatInTimezone(testTimestamp, "auto");
			expect(formatted).toBeDefined();
		});

		it("should respect options.includeTime", () => {
			const formatted = formatInTimezone(testTimestamp, timezone, {
				includeTime: false,
				compact: true,
			});
			expect(formatted).not.toContain(":");
		});
	});

	describe("getStartOfDayInTimezone", () => {
		it("should return start of day UTC timestamp", () => {
			const startOfDay = getStartOfDayInTimezone(testTimestamp, timezone);
			const date = new Date(startOfDay);
			expect(date.getUTCHours()).toBe(0);
			expect(date.getUTCMinutes()).toBe(0);
		});
	});

	describe("getDaysInMonth", () => {
		it("should return correct number of days for February", () => {
			expect(getDaysInMonth(2024, 1)).toBe(29); // Leap year
			expect(getDaysInMonth(2025, 1)).toBe(28);
		});

		it("should return 31 for January", () => {
			expect(getDaysInMonth(2025, 0)).toBe(31);
		});
	});

	describe("getWeekdays", () => {
		it("should return 7 localized weekday narrow names", () => {
			const weekdays = getWeekdays("en-US");
			expect(weekdays).toHaveLength(7);
			expect(weekdays[0]).toBe("S"); // Sunday
		});
	});

	describe("getMonths", () => {
		it("should return 12 localized month long names", () => {
			const months = getMonths("en-US");
			expect(months).toHaveLength(12);
			expect(months[0]).toBe("January");
		});
	});

	describe("formatDateByGranularity", () => {
		it("should format for 'day' granularity", () => {
			const formatted = formatDateByGranularity(testTimestamp, timezone, "day");
			expect(formatted).toBe("Jan 11");
		});

		it("should format for 'month' granularity", () => {
			const formatted = formatDateByGranularity(
				testTimestamp,
				timezone,
				"month",
			);
			expect(formatted).toBe("January 2025");
		});
	});

	describe("getFriendlyDate", () => {
		it("should return 'Jan 11' format", () => {
			const formatted = getFriendlyDate(testTimestamp, timezone);
			expect(formatted).toBe("Jan 11");
		});
	});
});
