import { atom, onMount } from "nanostores";
import { isHydratedAtom } from "./hydration";

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

// Storage key
const STORAGE_KEY = "ai-chat-usage";

/**
 * A single usage event record
 */
export interface UsageEvent {
	id: string;
	timestamp: number;
	type: "message" | "tool_call" | "response";
	/** Tool name if type is tool_call */
	toolName?: string;
	/** Estimated character count (used as proxy for tokens) */
	characterCount: number;
	/** The conversation ID this event belongs to */
	conversationId: string;
}

/**
 * Aggregated daily usage stats
 */
export interface DailyUsage {
	date: string; // YYYY-MM-DD format
	messageCount: number;
	responseCount: number;
	toolCallCount: number;
	totalCharacters: number;
	/** Input tokens (prompt tokens) */
	inputTokens: number;
	/** Output tokens (completion tokens) */
	outputTokens: number;
	/** Breakdown by tool */
	toolBreakdown: Record<string, number>;
}

/**
 * Usage summary for display
 */
export interface UsageSummary {
	totalMessages: number;
	totalResponses: number;
	totalToolCalls: number;
	totalCharacters: number;
	/** Total input tokens (prompt/read tokens) */
	totalInputTokens: number;
	/** Total output tokens (completion/write tokens) */
	totalOutputTokens: number;
	averageResponseLength: number;
	toolBreakdown: Record<string, number>;
	dailyUsage: DailyUsage[];
}

// Raw usage events (recent, for detailed tracking)
export const usageEventsAtom = atom<UsageEvent[]>([]);

// Aggregated daily stats (for chart display)
export const dailyUsageAtom = atom<DailyUsage[]>([]);

/**
 * Get today's date as YYYY-MM-DD
 */
const getDateKey = (timestamp: number = Date.now()): string => {
	const date = new Date(timestamp);
	return date.toISOString().split("T")[0];
};

/**
 * Initialize usage data from localStorage
 */
const initializeUsage = () => {
	if (!isBrowser) return;

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) {
		try {
			const parsed = JSON.parse(stored);
			if (parsed.events) {
				usageEventsAtom.set(parsed.events);
			}
			if (parsed.daily) {
				dailyUsageAtom.set(parsed.daily);
			}
		} catch {
			// Invalid JSON, start fresh
		}
	}
};

// Load from localStorage on mount - defer until after hydration
// Track if we've already initialized to avoid double-loading
let isInitialized = false;

const mountHandler = () => {
	if (!isBrowser || isInitialized) return;

	if (isHydratedAtom.get()) {
		initializeUsage();
		isInitialized = true;
	} else {
		const unsubHydration = isHydratedAtom.subscribe((hydrated) => {
			if (hydrated && !isInitialized) {
				initializeUsage();
				isInitialized = true;
				unsubHydration();
			}
		});
	}
};

// Mount on either atom being subscribed to
onMount(usageEventsAtom, mountHandler);
onMount(dailyUsageAtom, mountHandler);

/**
 * Persist usage data to localStorage
 */
const persist = () => {
	if (!isBrowser) return;
	const data = {
		events: usageEventsAtom.get(),
		daily: dailyUsageAtom.get(),
	};
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Update daily aggregation with a new event
 */
const updateDailyAggregation = (event: UsageEvent) => {
	const dateKey = getDateKey(event.timestamp);
	const daily = [...dailyUsageAtom.get()];
	const existingIndex = daily.findIndex((d) => d.date === dateKey);

	if (existingIndex >= 0) {
		const existing = daily[existingIndex];
		daily[existingIndex] = {
			...existing,
			messageCount:
				existing.messageCount + (event.type === "message" ? 1 : 0),
			responseCount:
				existing.responseCount + (event.type === "response" ? 1 : 0),
			toolCallCount:
				existing.toolCallCount + (event.type === "tool_call" ? 1 : 0),
			totalCharacters: existing.totalCharacters + event.characterCount,
			toolBreakdown:
				event.type === "tool_call" && event.toolName
					? {
							...existing.toolBreakdown,
							[event.toolName]:
								(existing.toolBreakdown[event.toolName] || 0) + 1,
						}
					: existing.toolBreakdown,
		};
	} else {
		daily.push({
			date: dateKey,
			messageCount: event.type === "message" ? 1 : 0,
			responseCount: event.type === "response" ? 1 : 0,
			toolCallCount: event.type === "tool_call" ? 1 : 0,
			totalCharacters: event.characterCount,
			inputTokens: 0,
			outputTokens: 0,
			toolBreakdown:
				event.type === "tool_call" && event.toolName
					? { [event.toolName]: 1 }
					: {},
		});
	}

	// Sort by date descending and keep last 90 days
	daily.sort((a, b) => b.date.localeCompare(a.date));
	dailyUsageAtom.set(daily.slice(0, 90));
};

/**
 * Record a user message
 */
export const recordMessage = (
	conversationId: string,
	characterCount: number
) => {
	const event: UsageEvent = {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "message",
		characterCount,
		conversationId,
	};

	const events = usageEventsAtom.get();
	// Keep last 1000 events for detailed view
	usageEventsAtom.set([event, ...events].slice(0, 1000));

	updateDailyAggregation(event);
	persist();
};

/**
 * Record an AI response
 */
export const recordResponse = (
	conversationId: string,
	characterCount: number
) => {
	const event: UsageEvent = {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "response",
		characterCount,
		conversationId,
	};

	const events = usageEventsAtom.get();
	usageEventsAtom.set([event, ...events].slice(0, 1000));

	updateDailyAggregation(event);
	persist();
};

/**
 * Record a tool call
 */
export const recordToolCall = (conversationId: string, toolName: string) => {
	const event: UsageEvent = {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "tool_call",
		toolName,
		characterCount: 0,
		conversationId,
	};

	const events = usageEventsAtom.get();
	usageEventsAtom.set([event, ...events].slice(0, 1000));

	updateDailyAggregation(event);
	persist();
};

/**
 * Estimate token count from text
 * Uses ~4 characters per token as a rough approximation for English text
 * This is used when actual token counts are not available from the model
 */
export const estimateTokens = (text: string): number => {
	return Math.ceil(text.length / 4);
};

/**
 * Record token usage for a request/response
 * @param inputTokens - Number of input (prompt) tokens, or estimate from input text
 * @param outputTokens - Number of output (completion) tokens, or estimate from output text
 */
export const recordTokenUsage = (
	inputTokens: number,
	outputTokens: number
) => {
	const dateKey = getDateKey();
	const daily = [...dailyUsageAtom.get()];
	const existingIndex = daily.findIndex((d) => d.date === dateKey);

	if (existingIndex >= 0) {
		const existing = daily[existingIndex];
		daily[existingIndex] = {
			...existing,
			inputTokens: (existing.inputTokens || 0) + inputTokens,
			outputTokens: (existing.outputTokens || 0) + outputTokens,
		};
	} else {
		daily.push({
			date: dateKey,
			messageCount: 0,
			responseCount: 0,
			toolCallCount: 0,
			totalCharacters: 0,
			inputTokens,
			outputTokens,
			toolBreakdown: {},
		});
	}

	// Sort by date descending and keep last 90 days
	daily.sort((a, b) => b.date.localeCompare(a.date));
	dailyUsageAtom.set(daily.slice(0, 90));
	persist();
};

/**
 * Get usage summary for display
 */
export const getUsageSummary = (): UsageSummary => {
	const daily = dailyUsageAtom.get();

	const summary: UsageSummary = {
		totalMessages: 0,
		totalResponses: 0,
		totalToolCalls: 0,
		totalCharacters: 0,
		totalInputTokens: 0,
		totalOutputTokens: 0,
		averageResponseLength: 0,
		toolBreakdown: {},
		dailyUsage: daily,
	};

	for (const day of daily) {
		summary.totalMessages += day.messageCount;
		summary.totalResponses += day.responseCount;
		summary.totalToolCalls += day.toolCallCount;
		summary.totalCharacters += day.totalCharacters;
		summary.totalInputTokens += day.inputTokens || 0;
		summary.totalOutputTokens += day.outputTokens || 0;

		for (const [tool, count] of Object.entries(day.toolBreakdown)) {
			summary.toolBreakdown[tool] =
				(summary.toolBreakdown[tool] || 0) + count;
		}
	}

	if (summary.totalResponses > 0) {
		summary.averageResponseLength = Math.round(
			summary.totalCharacters / summary.totalResponses
		);
	}

	return summary;
};

/**
 * Clear all usage data
 */
export const clearUsageData = () => {
	usageEventsAtom.set([]);
	dailyUsageAtom.set([]);
	persist();
};

/**
 * Get the last N days of daily usage for charts
 */
export const getRecentDailyUsage = (days: number = 30): DailyUsage[] => {
	const daily = dailyUsageAtom.get();
	const cutoffDate = new Date();
	cutoffDate.setDate(cutoffDate.getDate() - days);
	const cutoffKey = getDateKey(cutoffDate.getTime());

	// Filter and fill in missing days with zeros
	const result: DailyUsage[] = [];
	const existingMap = new Map(daily.map((d) => [d.date, d]));

	for (let i = days - 1; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		const dateKey = getDateKey(date.getTime());

		if (dateKey >= cutoffKey) {
			const existing = existingMap.get(dateKey);
			result.push(
				existing || {
					date: dateKey,
					messageCount: 0,
					responseCount: 0,
					toolCallCount: 0,
					totalCharacters: 0,
					inputTokens: 0,
					outputTokens: 0,
					toolBreakdown: {},
				}
			);
		}
	}

	return result;
};

