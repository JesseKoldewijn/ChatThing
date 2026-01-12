import { describe, it, expect, beforeEach } from "vitest";
import {
	usageEventsAtom,
	dailyUsageAtom,
	recordMessage,
	recordResponse,
	recordToolCall,
	recordTokenUsage,
	getUsageSummary,
	clearUsageData,
	getRecentDailyUsage,
	estimateTokens,
	type DailyUsage,
} from "./usage";
import { PROVIDER_OLLAMA } from "@/lib/ai/constants";

describe("usage store extended tests", () => {
	beforeEach(() => {
		// Clear all usage data
		usageEventsAtom.set([]);
		dailyUsageAtom.set([]);
		localStorage.clear();
	});

	describe("recordMessage", () => {
		it("should record a message event", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			const events = usageEventsAtom.get();
			expect(events).toHaveLength(1);
			expect(events[0].type).toBe("message");
			expect(events[0].characterCount).toBe(100);
			expect(events[0].conversationId).toBe("conv-1");
		});

		it("should prepend new events", () => {
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-2", 100, PROVIDER_OLLAMA, "m1");

			const events = usageEventsAtom.get();
			expect(events[0].conversationId).toBe("conv-2");
			expect(events[1].conversationId).toBe("conv-1");
		});

		it("should update daily aggregation", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			const daily = dailyUsageAtom.get();
			expect(daily).toHaveLength(1);
			expect(daily[0].messageCount).toBe(1);
		});

		it("should accumulate message counts on same day", () => {
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-2", 75, PROVIDER_OLLAMA, "m1");

			const daily = dailyUsageAtom.get();
			expect(daily).toHaveLength(1);
			expect(daily[0].messageCount).toBe(3);
			expect(daily[0].totalCharacters).toBe(225);
		});
	});

	describe("recordResponse", () => {
		it("should record a response event", () => {
			recordResponse("conv-1", 500, PROVIDER_OLLAMA, "m1");

			const events = usageEventsAtom.get();
			expect(events).toHaveLength(1);
			expect(events[0].type).toBe("response");
			expect(events[0].characterCount).toBe(500);
		});

		it("should update daily response count", () => {
			recordResponse("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 200, PROVIDER_OLLAMA, "m1");

			const daily = dailyUsageAtom.get();
			expect(daily[0].responseCount).toBe(2);
		});
	});

	describe("recordToolCall", () => {
		it("should record a tool call event", () => {
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");

			const events = usageEventsAtom.get();
			expect(events).toHaveLength(1);
			expect(events[0].type).toBe("tool_call");
			expect(events[0].toolName).toBe("weather");
			expect(events[0].characterCount).toBe(0);
		});

		it("should update tool breakdown", () => {
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "datetime", PROVIDER_OLLAMA, "m1");

			const daily = dailyUsageAtom.get();
			expect(daily[0].toolCallCount).toBe(3);
			expect(daily[0].toolBreakdown.weather).toBe(2);
			expect(daily[0].toolBreakdown.datetime).toBe(1);
		});
	});

	describe("recordTokenUsage", () => {
		it("should record input and output tokens", () => {
			recordTokenUsage(100, 200);

			const daily = dailyUsageAtom.get();
			expect(daily).toHaveLength(1);
			expect(daily[0].inputTokens).toBe(100);
			expect(daily[0].outputTokens).toBe(200);
		});

		it("should accumulate token counts", () => {
			recordTokenUsage(100, 200);
			recordTokenUsage(50, 150);

			const daily = dailyUsageAtom.get();
			expect(daily[0].inputTokens).toBe(150);
			expect(daily[0].outputTokens).toBe(350);
		});

		it("should create new daily entry if none exists", () => {
			expect(dailyUsageAtom.get()).toHaveLength(0);

			recordTokenUsage(10, 20);

			expect(dailyUsageAtom.get()).toHaveLength(1);
		});
	});

	describe("estimateTokens", () => {
		it("should estimate tokens from text length", () => {
			const text = "Hello, world!"; // 13 characters
			const tokens = estimateTokens(text);
			expect(tokens).toBe(4); // ceil(13/4)
		});

		it("should handle empty string", () => {
			expect(estimateTokens("")).toBe(0);
		});

		it("should handle long text", () => {
			const longText = "a".repeat(1000);
			expect(estimateTokens(longText)).toBe(250);
		});
	});

	describe("getUsageSummary", () => {
		it("should return empty summary when no data", () => {
			const summary = getUsageSummary();

			expect(summary.totalMessages).toBe(0);
			expect(summary.totalResponses).toBe(0);
			expect(summary.totalToolCalls).toBe(0);
			expect(summary.totalCharacters).toBe(0);
			expect(summary.averageResponseLength).toBe(0);
		});

		it("should aggregate data correctly", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 300, PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			// Record tokens explicitly
			recordTokenUsage(25, 75);

			const summary = getUsageSummary();

			expect(summary.totalMessages).toBe(2);
			expect(summary.totalResponses).toBe(1);
			expect(summary.totalToolCalls).toBe(1);
			expect(summary.totalCharacters).toBe(450);
			expect(summary.totalInputTokens).toBe(25);
			expect(summary.totalOutputTokens).toBe(75);
		});

		it("should calculate average response length", () => {
			recordResponse("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 200, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 300, PROVIDER_OLLAMA, "m1");

			const summary = getUsageSummary();

			expect(summary.averageResponseLength).toBe(200);
		});

		it("should include tool breakdown", () => {
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "datetime", PROVIDER_OLLAMA, "m1");

			const summary = getUsageSummary();

			expect(summary.toolBreakdown.weather).toBe(2);
			expect(summary.toolBreakdown.datetime).toBe(1);
		});

		it("should include daily usage", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			const summary = getUsageSummary();

			expect(summary.dailyUsage).toHaveLength(1);
		});
	});

	describe("clearUsageData", () => {
		it("should clear all usage data", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 200, PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");

			expect(usageEventsAtom.get().length).toBeGreaterThan(0);
			expect(dailyUsageAtom.get().length).toBeGreaterThan(0);

			clearUsageData();

			expect(usageEventsAtom.get()).toHaveLength(0);
			expect(dailyUsageAtom.get()).toHaveLength(0);
		});
	});

	describe("getRecentDailyUsage", () => {
		it("should return empty array for specified days when no data", () => {
			const recent = getRecentDailyUsage(7);

			// Should fill in days with zeros
			expect(recent).toHaveLength(7);
			expect(recent.every((d) => d.messageCount === 0)).toBe(true);
		});

		it("should include existing data", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			const recent = getRecentDailyUsage(30);

			// Should have 30 days
			expect(recent).toHaveLength(30);
			// Today should have the message
			const today = recent[recent.length - 1];
			expect(today.messageCount).toBe(1);
		});

		it("should respect days parameter", () => {
			const recent7 = getRecentDailyUsage(7);
			const recent14 = getRecentDailyUsage(14);

			expect(recent7).toHaveLength(7);
			expect(recent14).toHaveLength(14);
		});
	});

	describe("event limits", () => {
		it("should limit events to 1000", () => {
			// Record more than 1000 events
			for (let i = 0; i < 1010; i++) {
				recordMessage(`conv-${i}`, 10, PROVIDER_OLLAMA, "m1");
			}

			const events = usageEventsAtom.get();
			expect(events.length).toBeLessThanOrEqual(1000);
		});
	});

	describe("daily aggregation limits", () => {
		it("should limit daily data to 90 days", () => {
			// Create daily entries by manipulating the atom directly
			const manyDays: DailyUsage[] = [];
			for (let i = 0; i < 100; i++) {
				const date = new Date();
				date.setDate(date.getDate() - i);
				const dateKey = date.toISOString().split("T")[0];
				manyDays.push({
					date: dateKey,
					messageCount: 1,
					responseCount: 0,
					toolCallCount: 0,
					totalCharacters: 10,
					inputTokens: 0,
					outputTokens: 0,
					toolBreakdown: {},
					providerBreakdown: {},
					modelBreakdown: {},
				});
			}
			dailyUsageAtom.set(manyDays);

			// Record a new event to trigger cleanup
			recordMessage("conv-1", 10, PROVIDER_OLLAMA, "m1");

			const daily = dailyUsageAtom.get();
			expect(daily.length).toBeLessThanOrEqual(90);
		});
	});

	describe("event ID uniqueness", () => {
		it("should generate unique IDs for events", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			const events = usageEventsAtom.get();
			const ids = events.map((e) => e.id);
			const uniqueIds = new Set(ids);

			expect(uniqueIds.size).toBe(ids.length);
		});
	});

	describe("timestamp accuracy", () => {
		it("should record accurate timestamps", () => {
			const before = Date.now();
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			const after = Date.now();

			const events = usageEventsAtom.get();
			expect(events[0].timestamp).toBeGreaterThanOrEqual(before);
			expect(events[0].timestamp).toBeLessThanOrEqual(after);
		});
	});
});
