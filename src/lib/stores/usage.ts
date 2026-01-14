import type { ProviderType } from "@/lib/ai/constants";
import { atom } from "nanostores";

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
	/** The AI provider used for this event */
	provider: ProviderType;
	/** The model used for this event */
	model: string;
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
	/** Breakdown by provider */
	providerBreakdown: Record<string, number>;
	/** Breakdown by model */
	modelBreakdown: Record<string, number>;
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
	providerBreakdown: Record<string, number>;
	modelBreakdown: Record<string, number>;
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

/**
 * Hydrate usage from localStorage.
 * This should be called only on the client inside a useEffect.
 */
export const hydrateUsage = () => {
	initializeUsage();
};

// Track pending persist to debounce
let pendingPersistTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Persist usage data to localStorage
 */
const persist = (immediate = false) => {
	const performPersist = () => {
		const data = {
			events: usageEventsAtom.get(),
			daily: dailyUsageAtom.get(),
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		pendingPersistTimeout = null;
	};

	if (immediate) {
		if (pendingPersistTimeout) {
			clearTimeout(pendingPersistTimeout);
			pendingPersistTimeout = null;
		}
		performPersist();
	} else if (!pendingPersistTimeout) {
		pendingPersistTimeout = setTimeout(performPersist, 1000);
	}
};

/**
 * Set up cleanup for usage store.
 * This should be called inside a useEffect.
 */
export const setupUsagePersistence = () => {
	return () => {
		if (pendingPersistTimeout) {
			clearTimeout(pendingPersistTimeout);
		}
	};
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
			messageCount: existing.messageCount + (event.type === "message" ? 1 : 0),
			responseCount:
				existing.responseCount + (event.type === "response" ? 1 : 0),
			toolCallCount:
				existing.toolCallCount + (event.type === "tool_call" ? 1 : 0),
			totalCharacters: existing.totalCharacters + event.characterCount,
			toolBreakdown:
				event.type === "tool_call" && event.toolName
					? {
							...(existing.toolBreakdown || {}),
							[event.toolName]:
								((existing.toolBreakdown || {})[event.toolName] || 0) + 1,
						}
					: existing.toolBreakdown || {},
			providerBreakdown: {
				...(existing.providerBreakdown || {}),
				[event.provider]:
					((existing.providerBreakdown || {})[event.provider] || 0) + 1,
			},
			modelBreakdown: {
				...(existing.modelBreakdown || {}),
				[event.model]: ((existing.modelBreakdown || {})[event.model] || 0) + 1,
			},
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
			providerBreakdown: { [event.provider]: 1 },
			modelBreakdown: { [event.model]: 1 },
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
	characterCount: number,
	provider: ProviderType,
	model: string,
) => {
	const event: UsageEvent = {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "message",
		characterCount,
		conversationId,
		provider,
		model,
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
	characterCount: number,
	provider: ProviderType,
	model: string,
) => {
	const event: UsageEvent = {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "response",
		characterCount,
		conversationId,
		provider,
		model,
	};

	const events = usageEventsAtom.get();
	usageEventsAtom.set([event, ...events].slice(0, 1000));

	updateDailyAggregation(event);
	persist();
};

/**
 * Record a tool call
 */
export const recordToolCall = (
	conversationId: string,
	toolName: string,
	provider: ProviderType,
	model: string,
) => {
	const event: UsageEvent = {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "tool_call",
		toolName,
		characterCount: 0,
		conversationId,
		provider,
		model,
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
export const recordTokenUsage = (inputTokens: number, outputTokens: number) => {
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
			providerBreakdown: {},
			modelBreakdown: {},
		});
	}

	// Sort by date descending and keep last 90 days
	daily.sort((a, b) => b.date.localeCompare(a.date));
	dailyUsageAtom.set(daily.slice(0, 90));
	persist();
};

/**
 * Get the absolute earliest event timestamp
 */
export const getEarliestEventTimestamp = (): number | null => {
	const events = usageEventsAtom.get();
	if (events.length === 0) return null;
	// Events are stored with newest first, so last one is earliest
	return events[events.length - 1].timestamp;
};

/**
 * Get raw events within a specific time range (inclusive)
 */
export const getEventsInRange = (start: number, end: number): UsageEvent[] => {
	const events = usageEventsAtom.get();
	return events.filter((e) => e.timestamp >= start && e.timestamp <= end);
};

/**
 * Supported granularities for aggregation
 */
export type UsageGranularity =
	| "interaction"
	| "minute"
	| "hour"
	| "day"
	| "month"
	| "year";

/**
 * Get aggregated usage for a range with specific granularity
 */
export const getAggregatedUsageForRange = (
	start: number,
	end: number,
	granularity: UsageGranularity = "day",
): DailyUsage[] => {
	const events = getEventsInRange(start, end);

	if (granularity === "interaction") {
		// Return one entry per event
		return events
			.map((event) => ({
				date: new Date(event.timestamp).toISOString(),
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
				providerBreakdown: { [event.provider]: 1 },
				modelBreakdown: { [event.model]: 1 },
			}))
			.sort((a, b) => a.date.localeCompare(b.date));
	}

	const aggregated: Record<string, DailyUsage> = {};

	for (const event of events) {
		const date = new Date(event.timestamp);
		let key: string;

		const iso = date.toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ

		switch (granularity) {
			case "minute":
				key = iso.slice(0, 16).replace("T", " "); // YYYY-MM-DD HH:mm
				break;
			case "hour":
				key = iso.slice(0, 13).replace("T", " ") + ":00"; // YYYY-MM-DD HH:00
				break;
			case "day":
				key = iso.slice(0, 10); // YYYY-MM-DD
				break;
			case "month":
				key = iso.slice(0, 7); // YYYY-MM
				break;
			case "year":
				key = iso.slice(0, 4); // YYYY
				break;
			default:
				key = iso.slice(0, 10);
		}

		if (!aggregated[key]) {
			aggregated[key] = {
				date: key,
				messageCount: 0,
				responseCount: 0,
				toolCallCount: 0,
				totalCharacters: 0,
				inputTokens: 0,
				outputTokens: 0,
				toolBreakdown: {},
				providerBreakdown: {},
				modelBreakdown: {},
			};
		}

		const entry = aggregated[key];
		if (event.type === "message") entry.messageCount++;
		else if (event.type === "response") entry.responseCount++;
		else if (event.type === "tool_call") {
			entry.toolCallCount++;
			if (event.toolName) {
				entry.toolBreakdown[event.toolName] =
					(entry.toolBreakdown[event.toolName] || 0) + 1;
			}
		}

		entry.totalCharacters += event.characterCount;
		entry.providerBreakdown[event.provider] =
			(entry.providerBreakdown[event.provider] || 0) + 1;
		entry.modelBreakdown[event.model] =
			(entry.modelBreakdown[event.model] || 0) + 1;
	}

	// For daily granularity, merge in tokens from dailyUsageAtom
	if (granularity === "day") {
		const dailyStats = dailyUsageAtom.get();
		for (const stat of dailyStats) {
			if (aggregated[stat.date]) {
				aggregated[stat.date].inputTokens = stat.inputTokens;
				aggregated[stat.date].outputTokens = stat.outputTokens;
			}
		}
	}

	return Object.values(aggregated).sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * Get usage summary for a specific range
 */
export const getUsageSummaryForRange = (
	start: number,
	end: number,
): UsageSummary => {
	const events = getEventsInRange(start, end);
	const daily = getAggregatedUsageForRange(start, end, "day");

	const summary: UsageSummary = {
		totalMessages: 0,
		totalResponses: 0,
		totalToolCalls: 0,
		totalCharacters: 0,
		totalInputTokens: 0,
		totalOutputTokens: 0,
		averageResponseLength: 0,
		toolBreakdown: {},
		providerBreakdown: {},
		modelBreakdown: {},
		dailyUsage: daily,
	};

	for (const event of events) {
		if (event.type === "message") summary.totalMessages++;
		else if (event.type === "response") summary.totalResponses++;
		else if (event.type === "tool_call") {
			summary.totalToolCalls++;
			if (event.toolName) {
				summary.toolBreakdown[event.toolName] =
					(summary.toolBreakdown[event.toolName] || 0) + 1;
			}
		}

		summary.totalCharacters += event.characterCount;
		summary.providerBreakdown[event.provider] =
			(summary.providerBreakdown[event.provider] || 0) + 1;
		summary.modelBreakdown[event.model] =
			(summary.modelBreakdown[event.model] || 0) + 1;
	}

	// Sum up tokens from the daily aggregation for the range
	for (const day of daily) {
		summary.totalInputTokens += day.inputTokens || 0;
		summary.totalOutputTokens += day.outputTokens || 0;
	}

	if (summary.totalResponses > 0) {
		summary.averageResponseLength = Math.round(
			summary.totalCharacters / summary.totalResponses,
		);
	}

	return summary;
};

/**
 * Get usage summary for all time
 */
export const getUsageSummary = (): UsageSummary => {
	const events = usageEventsAtom.get();
	if (events.length === 0) {
		return {
			totalMessages: 0,
			totalResponses: 0,
			totalToolCalls: 0,
			totalCharacters: 0,
			totalInputTokens: 0,
			totalOutputTokens: 0,
			averageResponseLength: 0,
			toolBreakdown: {},
			providerBreakdown: {},
			modelBreakdown: {},
			dailyUsage: [],
		};
	}
	const start = events[events.length - 1].timestamp;
	const end = events[0].timestamp;
	return getUsageSummaryForRange(start, end);
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
					providerBreakdown: {},
					modelBreakdown: {},
				},
			);
		}
	}

	return result;
};
