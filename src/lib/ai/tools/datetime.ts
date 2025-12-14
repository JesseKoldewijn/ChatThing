import { tool, type Tool } from "ai";
import { z } from "zod";

export const datetimeTool = tool({
	description: "Get the current date and time. Use ONLY when user explicitly asks about the current date, current time, what day it is, or what time it is. Do NOT use for greetings or general conversation.",
	inputSchema: z.object({
		timezone: z
			.string()
			.optional()
			.describe("Optional timezone (e.g., 'America/New_York', 'Europe/London'). Defaults to user's local timezone."),
	}),
	execute: async ({ timezone }) => {
		const now = new Date();

		// Format options
		const dateOptions: Intl.DateTimeFormatOptions = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: timezone,
		};

		const timeOptions: Intl.DateTimeFormatOptions = {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: true,
			timeZone: timezone,
		};

		try {
			const date = now.toLocaleDateString("en-US", dateOptions);
			const time = now.toLocaleTimeString("en-US", timeOptions);
			const resolvedTimezone = timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

			return {
				date,
				time,
				timezone: resolvedTimezone,
				iso: now.toISOString(),
				timestamp: now.getTime(),
			};
		} catch {
			// Invalid timezone - fall back to local
			const date = now.toLocaleDateString("en-US", { ...dateOptions, timeZone: undefined });
			const time = now.toLocaleTimeString("en-US", { ...timeOptions, timeZone: undefined });
			const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

			return {
				date,
				time,
				timezone: localTimezone,
				iso: now.toISOString(),
				timestamp: now.getTime(),
			};
		}
	},
} satisfies Tool);

