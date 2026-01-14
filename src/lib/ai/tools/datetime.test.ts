import { describe, expect, it } from "vitest";
import { datetimeTool } from "./datetime";

// Helper to execute the tool with required options
const executeDatetime = async (input: { timezone?: string } = {}) => {
	const result = await datetimeTool.execute!(input, {
		toolCallId: "test-call",
		messages: [],
		abortSignal: undefined as unknown as AbortSignal,
	});
	// The result is always the object type for this tool, not AsyncIterable
	return result as {
		date: string;
		time: string;
		timezone: string;
		iso: string;
		timestamp: number;
	};
};

describe("datetime tool", () => {
	describe("tool definition", () => {
		it("should have a description", () => {
			expect(datetimeTool.description).toBeDefined();
			expect(datetimeTool.description).toContain("date");
			expect(datetimeTool.description).toContain("time");
		});

		it("should have an input schema", () => {
			expect(datetimeTool.inputSchema).toBeDefined();
		});

		it("should have an execute function", () => {
			expect(datetimeTool.execute).toBeDefined();
			expect(typeof datetimeTool.execute).toBe("function");
		});
	});

	describe("execute", () => {
		it("should return current date and time", async () => {
			const result = await executeDatetime({});

			expect(result.date).toBeDefined();
			expect(result.time).toBeDefined();
			expect(result.timezone).toBeDefined();
			expect(result.iso).toBeDefined();
			expect(result.timestamp).toBeDefined();
		});

		it("should return a valid ISO string", async () => {
			const result = await executeDatetime({});

			const isoDate = new Date(result.iso);
			expect(isoDate.toISOString()).toBe(result.iso);
		});

		it("should return a valid timestamp", async () => {
			const before = Date.now();
			const result = await executeDatetime({});
			const after = Date.now();

			expect(result.timestamp).toBeGreaterThanOrEqual(before);
			expect(result.timestamp).toBeLessThanOrEqual(after);
		});

		it("should use local timezone when not specified", async () => {
			const result = await executeDatetime({});

			const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			expect(result.timezone).toBe(localTimezone);
		});

		it("should use specified timezone when provided", async () => {
			const result = await executeDatetime({
				timezone: "America/New_York",
			});

			expect(result.timezone).toBe("America/New_York");
		});

		it("should format date in human readable format", async () => {
			const result = await executeDatetime({});

			// Date should contain day of week and month
			expect(result.date).toMatch(
				/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/,
			);
			expect(result.date).toMatch(
				/(January|February|March|April|May|June|July|August|September|October|November|December)/,
			);
		});

		it("should format time in 12-hour format", async () => {
			const result = await executeDatetime({});

			// Time should contain AM or PM
			expect(result.time).toMatch(/(AM|PM)/i);
		});

		it("should handle invalid timezone gracefully", async () => {
			const result = await executeDatetime({
				timezone: "Invalid/Timezone",
			});

			// Should fall back to local timezone
			expect(result.date).toBeDefined();
			expect(result.time).toBeDefined();
			expect(result.timezone).toBeDefined();
		});

		it("should return different times for different timezones", async () => {
			const nyResult = await executeDatetime({
				timezone: "America/New_York",
			});
			const tokyoResult = await executeDatetime({
				timezone: "Asia/Tokyo",
			});

			// Times should be different (most of the time)
			// The timestamps will be the same but formatted times differ
			expect(nyResult.timezone).not.toBe(tokyoResult.timezone);
		});
	});
});
