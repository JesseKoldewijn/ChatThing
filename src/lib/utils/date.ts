/**
 * Timezone-aware date formatting and utility functions
 */

/**
 * Format a timestamp into a compact string in a specific timezone.
 * Format: DD/MM/YY HH:mm
 */
export const formatInTimezone = (
	timestamp: number | Date,
	timezone: string,
	options: {
		includeTime?: boolean;
		compact?: boolean;
	} = { includeTime: true, compact: true },
): string => {
	const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;

	try {
		const formatter = new Intl.DateTimeFormat("en-GB", {
			timeZone: timezone === "auto" ? undefined : timezone,
			day: "2-digit",
			month: "2-digit",
			year: options.compact ? "2-digit" : "numeric",
			hour: options.includeTime ? "2-digit" : undefined,
			minute: options.includeTime ? "2-digit" : undefined,
			hour12: false,
		});

		// Format gives "DD/MM/YY, HH:mm" or similar based on locale
		// We want to ensure it looks like DD/MM/YY HH:mm
		return formatter.format(date).replace(",", "");
	} catch (error) {
		console.error("Error formatting date in timezone:", error, {
			timestamp,
			timezone,
		});
		// Fallback to local time if timezone is invalid
		return date.toLocaleString();
	}
};

/**
 * Get the start of the day for a given timestamp in a specific timezone.
 * Returns a UTC timestamp representing the start of that local day.
 */
export const getStartOfDayInTimezone = (
	timestamp: number,
	timezone: string,
): number => {
	const date = new Date(timestamp);

	// Use Intl to get parts of the date in the target timezone
	const formatter = new Intl.DateTimeFormat("en-US", {
		timeZone: timezone === "auto" ? undefined : timezone,
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: false,
	});

	const parts = formatter.formatToParts(date);
	const findPart = (type: string) => parts.find((p) => p.type === type)?.value;

	const year = parseInt(findPart("year") || "0");
	const month = parseInt(findPart("month") || "1");
	const day = parseInt(findPart("day") || "1");

	// To get the UTC timestamp of midnight in the target timezone:
	// 1. Create a string in ISO format for that date's midnight
	// 2. We can't easily parse this back into UTC without a library
	// But we can approximate by getting the offset.

	// Simplified but better: just return the date parts as a UTC date at midnight
	// This is what most calendars expect (the "logical" day)
	return Date.UTC(year, month - 1, day, 0, 0, 0, 0);
};

/**
 * Get number of days in a month
 */
export const getDaysInMonth = (year: number, month: number): number => {
	return new Date(year, month + 1, 0).getDate();
};

/**
 * Get localized weekday names (starting Sunday)
 */
export const getWeekdays = (locale = "en-US"): string[] => {
	const baseDate = new Date(Date.UTC(2017, 0, 1)); // Sunday
	const weekdays = [];
	for (let i = 0; i < 7; i++) {
		const dayName = new Intl.DateTimeFormat(locale, {
			weekday: "narrow",
		}).format(baseDate);
		weekdays.push(dayName);
		baseDate.setUTCDate(baseDate.getUTCDate() + 1);
	}
	return weekdays;
};

/**
 * Get localized month names
 */
export const getMonths = (locale = "en-US"): string[] => {
	const baseDate = new Date(Date.UTC(2017, 0, 1));
	const months = [];
	for (let i = 0; i < 12; i++) {
		months.push(
			new Intl.DateTimeFormat(locale, { month: "long" }).format(baseDate),
		);
		baseDate.setUTCMonth(baseDate.getUTCMonth() + 1);
	}
	return months;
};

/**
 * Get a friendly date string based on granularity
 */
export const formatDateByGranularity = (
	timestamp: number | Date,
	timezone: string,
	granularity: string,
): string => {
	const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
	try {
		const options: Intl.DateTimeFormatOptions = {
			timeZone: timezone === "auto" ? undefined : timezone,
		};

		switch (granularity) {
			case "minute":
				options.month = "short";
				options.day = "numeric";
				options.hour = "2-digit";
				options.minute = "2-digit";
				options.hour12 = false;
				break;
			case "hour":
				options.month = "short";
				options.day = "numeric";
				options.hour = "2-digit";
				options.hour12 = false;
				break;
			case "day":
				options.month = "short";
				options.day = "numeric";
				break;
			case "month":
				options.month = "long";
				options.year = "numeric";
				break;
			case "year":
				options.year = "numeric";
				break;
			default:
				options.month = "short";
				options.day = "numeric";
		}

		return new Intl.DateTimeFormat("en-US", options).format(date);
	} catch {
		return date.toLocaleDateString();
	}
};

/**
 * Get a friendly date string (e.g., "Jan 11")
 */
export const getFriendlyDate = (
	timestamp: number | Date,
	timezone: string,
): string => {
	const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
	try {
		return new Intl.DateTimeFormat("en-US", {
			timeZone: timezone === "auto" ? undefined : timezone,
			month: "short",
			day: "numeric",
		}).format(date);
	} catch {
		return date.toLocaleDateString();
	}
};
