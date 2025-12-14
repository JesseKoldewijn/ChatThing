import { describe, it, expect, beforeEach } from "vitest";
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
} from "./usage";

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
			recordMessage("conv-123", 50);

			const events = usageEventsAtom.get();
			expect(events).toHaveLength(1);
			expect(events[0].type).toBe("message");
			expect(events[0].conversationId).toBe("conv-123");
			expect(events[0].characterCount).toBe(50);
		});

		it("should update daily aggregation", () => {
			recordMessage("conv-123", 50);

			const daily = dailyUsageAtom.get();
			expect(daily).toHaveLength(1);
			expect(daily[0].messageCount).toBe(1);
		});

		it("should accumulate multiple messages on same day", () => {
			recordMessage("conv-1", 50);
			recordMessage("conv-2", 100);

			const daily = dailyUsageAtom.get();
			expect(daily).toHaveLength(1);
			expect(daily[0].messageCount).toBe(2);
			expect(daily[0].totalCharacters).toBe(150);
		});
	});

	describe("recordResponse", () => {
		it("should record an AI response event", () => {
			recordResponse("conv-123", 200);

			const events = usageEventsAtom.get();
			expect(events).toHaveLength(1);
			expect(events[0].type).toBe("response");
			expect(events[0].characterCount).toBe(200);
		});

		it("should update daily response count", () => {
			recordResponse("conv-1", 100);
			recordResponse("conv-2", 150);

			const daily = dailyUsageAtom.get();
			expect(daily[0].responseCount).toBe(2);
		});
	});

	describe("recordToolCall", () => {
		it("should record a tool call event", () => {
			recordToolCall("conv-123", "weather");

			const events = usageEventsAtom.get();
			expect(events).toHaveLength(1);
			expect(events[0].type).toBe("tool_call");
			expect(events[0].toolName).toBe("weather");
		});

		it("should update tool breakdown", () => {
			recordToolCall("conv-1", "weather");
			recordToolCall("conv-2", "datetime");
			recordToolCall("conv-3", "weather");

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
			recordMessage("c1", 100);
			recordMessage("c2", 50);
			recordResponse("c1", 200);
			recordToolCall("c1", "weather");
			recordTokenUsage(25, 50);

			const summary = getUsageSummary();

			expect(summary.totalMessages).toBe(2);
			expect(summary.totalResponses).toBe(1);
			expect(summary.totalToolCalls).toBe(1);
			expect(summary.totalCharacters).toBe(350); // 100 + 50 + 200
			expect(summary.totalInputTokens).toBe(25);
			expect(summary.totalOutputTokens).toBe(50);
			expect(summary.toolBreakdown).toEqual({ weather: 1 });
		});
	});

	describe("getRecentDailyUsage", () => {
		it("should return last N days of usage", () => {
			recordMessage("c1", 100);

			const recent = getRecentDailyUsage(30);

			// Should return up to 30 days worth of data
			expect(recent.length).toBeLessThanOrEqual(30);
			expect(recent.length).toBeGreaterThan(0);
		});

		it("should include today in the result", () => {
			recordMessage("c1", 100);

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
			recordMessage("c1", 100);
			recordResponse("c1", 200);
			recordToolCall("c1", "datetime");

			clearUsageData();

			expect(usageEventsAtom.get()).toHaveLength(0);
			expect(dailyUsageAtom.get()).toHaveLength(0);
		});
	});

	describe("event limits", () => {
		it("should keep only last 1000 events", () => {
			// Record 1005 messages
			for (let i = 0; i < 1005; i++) {
				recordMessage(`conv-${i}`, 10);
			}

			const events = usageEventsAtom.get();
			expect(events.length).toBe(1000);
		});
	});
});

