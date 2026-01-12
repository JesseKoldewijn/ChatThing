import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
	usageEventsAtom,
	dailyUsageAtom,
	recordMessage,
	recordResponse,
	recordToolCall,
	recordTokenUsage,
	estimateTokens,
	getUsageSummary,
	getRecentDailyUsage,
	clearUsageData,
	getEventsInRange,
	getAggregatedUsageForRange,
	getUsageSummaryForRange,
} from "./usage";
import { PROVIDER_OLLAMA } from "@/lib/ai/constants";

describe("usage store", () => {
	beforeEach(() => {
		// Reset atoms
		usageEventsAtom.set([]);
		dailyUsageAtom.set([]);
		// Clear localStorage mock
		localStorage.clear();
	});

	describe("recordMessage", () => {
		it("should record a user message event", () => {
			recordMessage("conv-123", 50, PROVIDER_OLLAMA, "test-model");

			const events = usageEventsAtom.get();
			expect(events).toHaveLength(1);
			expect(events[0].type).toBe("message");
			expect(events[0].conversationId).toBe("conv-123");
			expect(events[0].characterCount).toBe(50);
			expect(events[0].provider).toBe(PROVIDER_OLLAMA);
			expect(events[0].model).toBe("test-model");
		});

		it("should update daily aggregation", () => {
			recordMessage("conv-123", 50, PROVIDER_OLLAMA, "test-model");

			const daily = dailyUsageAtom.get();
			expect(daily).toHaveLength(1);
			expect(daily[0].messageCount).toBe(1);
			expect(daily[0].providerBreakdown[PROVIDER_OLLAMA]).toBe(1);
			expect(daily[0].modelBreakdown["test-model"]).toBe(1);
		});

		it("should accumulate multiple messages on same day", () => {
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-2", 100, PROVIDER_OLLAMA, "m1");

			const daily = dailyUsageAtom.get();
			expect(daily).toHaveLength(1);
			expect(daily[0].messageCount).toBe(2);
			expect(daily[0].totalCharacters).toBe(150);
			expect(daily[0].modelBreakdown["m1"]).toBe(2);
		});
	});

	describe("recordResponse", () => {
		it("should record an AI response event", () => {
			recordResponse("conv-123", 200, PROVIDER_OLLAMA, "test-model");

			const events = usageEventsAtom.get();
			expect(events).toHaveLength(1);
			expect(events[0].type).toBe("response");
			expect(events[0].characterCount).toBe(200);
		});

		it("should update daily response count", () => {
			recordResponse("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-2", 150, PROVIDER_OLLAMA, "m1");

			const daily = dailyUsageAtom.get();
			expect(daily[0].responseCount).toBe(2);
		});
	});

	describe("recordToolCall", () => {
		it("should record a tool call event", () => {
			recordToolCall("conv-123", "weather", PROVIDER_OLLAMA, "test-model");

			const events = usageEventsAtom.get();
			expect(events).toHaveLength(1);
			expect(events[0].type).toBe("tool_call");
			expect(events[0].toolName).toBe("weather");
		});

		it("should update tool breakdown", () => {
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-2", "datetime", PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-3", "weather", PROVIDER_OLLAMA, "m1");

			const daily = dailyUsageAtom.get();
			expect(daily[0].toolCallCount).toBe(3);
			expect(daily[0].toolBreakdown).toEqual({
				weather: 2,
				datetime: 1,
			});
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
			recordTokenUsage(50, 100);
			recordTokenUsage(30, 80);

			const daily = dailyUsageAtom.get();
			expect(daily[0].inputTokens).toBe(80);
			expect(daily[0].outputTokens).toBe(180);
		});
	});

	describe("estimateTokens", () => {
		it("should estimate tokens as ~4 characters per token", () => {
			expect(estimateTokens("")).toBe(0);
			expect(estimateTokens("test")).toBe(1); // 4 chars = 1 token
			expect(estimateTokens("hello world")).toBe(3); // 11 chars ≈ 3 tokens
			expect(estimateTokens("a")).toBe(1); // 1 char rounds up to 1 token
		});
	});

	describe("getUsageSummary", () => {
		it("should return empty summary when no data", () => {
			const summary = getUsageSummary();

			expect(summary.totalMessages).toBe(0);
			expect(summary.totalResponses).toBe(0);
			expect(summary.totalToolCalls).toBe(0);
			expect(summary.totalInputTokens).toBe(0);
			expect(summary.totalOutputTokens).toBe(0);
		});

		it("should aggregate all daily data", () => {
			recordMessage("c1", 100, PROVIDER_OLLAMA, "m1");
			recordMessage("c2", 50, PROVIDER_OLLAMA, "m1");
			recordResponse("c1", 200, PROVIDER_OLLAMA, "m1");
			recordToolCall("c1", "weather", PROVIDER_OLLAMA, "m1");
			// Record tokens explicitly
			recordTokenUsage(25, 50);

			const summary = getUsageSummary();

			expect(summary.totalMessages).toBe(2);
			expect(summary.totalResponses).toBe(1);
			expect(summary.totalToolCalls).toBe(1);
			expect(summary.totalCharacters).toBe(350); // 100 + 50 + 200
			expect(summary.totalInputTokens).toBe(25);
			expect(summary.totalOutputTokens).toBe(50);
			expect(summary.toolBreakdown).toEqual({ weather: 1 });
			expect(summary.providerBreakdown[PROVIDER_OLLAMA]).toBe(4);
		});
	});

	describe("Range Filtering", () => {
		const now = Date.now();
		const oneHour = 60 * 60 * 1000;
		const oneDay = 24 * oneHour;

		beforeEach(() => {
			// Add events at different times
			vi.setSystemTime(now - 2 * oneDay);
			recordMessage("old", 10, PROVIDER_OLLAMA, "m1");
			
			vi.setSystemTime(now - oneDay);
			recordMessage("yesterday", 20, PROVIDER_OLLAMA, "m1");
			
			vi.setSystemTime(now);
			recordMessage("today", 30, PROVIDER_OLLAMA, "m1");
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("should get events in range", () => {
			const events = getEventsInRange(now - oneDay - 100, now + 100);
			expect(events).toHaveLength(2);
			expect(events.map(e => e.conversationId)).toContain("today");
			expect(events.map(e => e.conversationId)).toContain("yesterday");
		});

		it("should aggregate usage by day", () => {
			const daily = getAggregatedUsageForRange(now - 2 * oneDay - 100, now + 100, "day");
			expect(daily).toHaveLength(3);
			expect(daily[0].messageCount).toBe(1); // earliest
			expect(daily[2].messageCount).toBe(1); // latest
		});

		it("should aggregate usage by hour", () => {
			vi.setSystemTime(now);
			recordMessage("h1", 10, PROVIDER_OLLAMA, "m1");
			recordMessage("h2", 10, PROVIDER_OLLAMA, "m1");
			
			const aggregated = getAggregatedUsageForRange(now - 100, now + 100, "hour");
			expect(aggregated).toHaveLength(1);
			expect(aggregated[0].messageCount).toBe(3); // 1 from beforeEach + 2 from test
		});

		it("should get summary for range", () => {
			const summary = getUsageSummaryForRange(now - oneDay - 100, now + 100);
			expect(summary.totalMessages).toBe(2);
			expect(summary.totalCharacters).toBe(50); // 20 + 30
		});
	});

	describe("getRecentDailyUsage", () => {
		it("should return last N days of usage", () => {
			recordMessage("c1", 100, PROVIDER_OLLAMA, "m1");

			const recent = getRecentDailyUsage(30);

			// Should return up to 30 days worth of data
			expect(recent.length).toBeLessThanOrEqual(30);
			expect(recent.length).toBeGreaterThan(0);
		});

		it("should include today in the result", () => {
			recordMessage("c1", 100, PROVIDER_OLLAMA, "m1");

			const recent = getRecentDailyUsage(7);

			// Should have at least today's data
			expect(recent.length).toBeGreaterThan(0);

			// The most recent entry should be today
			const today = new Date().toISOString().split("T")[0];
			const hasToday = recent.some((r) => r.date === today);
			expect(hasToday).toBe(true);
		});
	});

	describe("clearUsageData", () => {
		it("should clear all usage data", () => {
			recordMessage("c1", 100, PROVIDER_OLLAMA, "m1");
			recordResponse("c1", 200, PROVIDER_OLLAMA, "m1");
			recordToolCall("c1", "datetime", PROVIDER_OLLAMA, "m1");

			clearUsageData();

			expect(usageEventsAtom.get()).toHaveLength(0);
			expect(dailyUsageAtom.get()).toHaveLength(0);
		});
	});

	describe("event limits", () => {
		it("should keep only last 1000 events", () => {
			// Record 1005 messages
			for (let i = 0; i < 1005; i++) {
				recordMessage(`conv-${i}`, 10, PROVIDER_OLLAMA, "m1");
			}

			const events = usageEventsAtom.get();
			expect(events.length).toBe(1000);
		});
	});
});

