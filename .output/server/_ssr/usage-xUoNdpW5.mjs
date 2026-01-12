import { n as atom } from "../_libs/nanostores.mjs";
import { E as createLucideIcon } from "./button-Dt876Ufa.mjs";
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
var isBrowser = typeof window !== "undefined";
var STORAGE_KEY = "ai-chat-usage";
var usageEventsAtom = /* @__PURE__ */ atom([]);
var dailyUsageAtom = /* @__PURE__ */ atom([]);
var getDateKey = (timestamp = Date.now()) => {
	return new Date(timestamp).toISOString().split("T")[0];
};
var initializeUsage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) try {
		const parsed = JSON.parse(stored);
		if (parsed.events) usageEventsAtom.set(parsed.events);
		if (parsed.daily) dailyUsageAtom.set(parsed.daily);
	} catch {}
};
var hydrateUsage = () => {
	if (!isBrowser) return;
	initializeUsage();
};
var pendingPersistTimeout = null;
var persist = (immediate = false) => {
	if (!isBrowser) return;
	const performPersist = () => {
		const data = {
			events: usageEventsAtom.get(),
			daily: dailyUsageAtom.get()
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
	} else if (!pendingPersistTimeout) pendingPersistTimeout = setTimeout(performPersist, 1e3);
};
var updateDailyAggregation = (event) => {
	const dateKey = getDateKey(event.timestamp);
	const daily = [...dailyUsageAtom.get()];
	const existingIndex = daily.findIndex((d) => d.date === dateKey);
	if (existingIndex >= 0) {
		const existing = daily[existingIndex];
		daily[existingIndex] = {
			...existing,
			messageCount: existing.messageCount + (event.type === "message" ? 1 : 0),
			responseCount: existing.responseCount + (event.type === "response" ? 1 : 0),
			toolCallCount: existing.toolCallCount + (event.type === "tool_call" ? 1 : 0),
			totalCharacters: existing.totalCharacters + event.characterCount,
			toolBreakdown: event.type === "tool_call" && event.toolName ? {
				...existing.toolBreakdown || {},
				[event.toolName]: ((existing.toolBreakdown || {})[event.toolName] || 0) + 1
			} : existing.toolBreakdown || {},
			providerBreakdown: {
				...existing.providerBreakdown || {},
				[event.provider]: ((existing.providerBreakdown || {})[event.provider] || 0) + 1
			},
			modelBreakdown: {
				...existing.modelBreakdown || {},
				[event.model]: ((existing.modelBreakdown || {})[event.model] || 0) + 1
			}
		};
	} else daily.push({
		date: dateKey,
		messageCount: event.type === "message" ? 1 : 0,
		responseCount: event.type === "response" ? 1 : 0,
		toolCallCount: event.type === "tool_call" ? 1 : 0,
		totalCharacters: event.characterCount,
		inputTokens: 0,
		outputTokens: 0,
		toolBreakdown: event.type === "tool_call" && event.toolName ? { [event.toolName]: 1 } : {},
		providerBreakdown: { [event.provider]: 1 },
		modelBreakdown: { [event.model]: 1 }
	});
	daily.sort((a, b) => b.date.localeCompare(a.date));
	dailyUsageAtom.set(daily.slice(0, 90));
};
var recordMessage = (conversationId, characterCount, provider, model) => {
	const event = {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "message",
		characterCount,
		conversationId,
		provider,
		model
	};
	const events = usageEventsAtom.get();
	usageEventsAtom.set([event, ...events].slice(0, 1e3));
	updateDailyAggregation(event);
	persist();
};
var recordResponse = (conversationId, characterCount, provider, model) => {
	const event = {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "response",
		characterCount,
		conversationId,
		provider,
		model
	};
	const events = usageEventsAtom.get();
	usageEventsAtom.set([event, ...events].slice(0, 1e3));
	updateDailyAggregation(event);
	persist();
};
var recordToolCall = (conversationId, toolName, provider, model) => {
	const event = {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		type: "tool_call",
		toolName,
		characterCount: 0,
		conversationId,
		provider,
		model
	};
	const events = usageEventsAtom.get();
	usageEventsAtom.set([event, ...events].slice(0, 1e3));
	updateDailyAggregation(event);
	persist();
};
var estimateTokens = (text) => {
	return Math.ceil(text.length / 4);
};
var recordTokenUsage = (inputTokens, outputTokens) => {
	const dateKey = getDateKey();
	const daily = [...dailyUsageAtom.get()];
	const existingIndex = daily.findIndex((d) => d.date === dateKey);
	if (existingIndex >= 0) {
		const existing = daily[existingIndex];
		daily[existingIndex] = {
			...existing,
			inputTokens: (existing.inputTokens || 0) + inputTokens,
			outputTokens: (existing.outputTokens || 0) + outputTokens
		};
	} else daily.push({
		date: dateKey,
		messageCount: 0,
		responseCount: 0,
		toolCallCount: 0,
		totalCharacters: 0,
		inputTokens,
		outputTokens,
		toolBreakdown: {},
		providerBreakdown: {},
		modelBreakdown: {}
	});
	daily.sort((a, b) => b.date.localeCompare(a.date));
	dailyUsageAtom.set(daily.slice(0, 90));
	persist();
};
var getEarliestEventTimestamp = () => {
	const events = usageEventsAtom.get();
	if (events.length === 0) return null;
	return events[events.length - 1].timestamp;
};
var getEventsInRange = (start, end) => {
	return usageEventsAtom.get().filter((e) => e.timestamp >= start && e.timestamp <= end);
};
var getAggregatedUsageForRange = (start, end, granularity = "day") => {
	const events = getEventsInRange(start, end);
	if (granularity === "interaction") return events.map((event) => ({
		date: new Date(event.timestamp).toISOString(),
		messageCount: event.type === "message" ? 1 : 0,
		responseCount: event.type === "response" ? 1 : 0,
		toolCallCount: event.type === "tool_call" ? 1 : 0,
		totalCharacters: event.characterCount,
		inputTokens: 0,
		outputTokens: 0,
		toolBreakdown: event.type === "tool_call" && event.toolName ? { [event.toolName]: 1 } : {},
		providerBreakdown: { [event.provider]: 1 },
		modelBreakdown: { [event.model]: 1 }
	})).sort((a, b) => a.date.localeCompare(b.date));
	const aggregated = {};
	for (const event of events) {
		const date = new Date(event.timestamp);
		let key;
		const iso = date.toISOString();
		switch (granularity) {
			case "minute":
				key = iso.slice(0, 16).replace("T", " ");
				break;
			case "hour":
				key = iso.slice(0, 13).replace("T", " ") + ":00";
				break;
			case "day":
				key = iso.slice(0, 10);
				break;
			case "month":
				key = iso.slice(0, 7);
				break;
			case "year":
				key = iso.slice(0, 4);
				break;
			default: key = iso.slice(0, 10);
		}
		if (!aggregated[key]) aggregated[key] = {
			date: key,
			messageCount: 0,
			responseCount: 0,
			toolCallCount: 0,
			totalCharacters: 0,
			inputTokens: 0,
			outputTokens: 0,
			toolBreakdown: {},
			providerBreakdown: {},
			modelBreakdown: {}
		};
		const entry = aggregated[key];
		if (event.type === "message") entry.messageCount++;
		else if (event.type === "response") entry.responseCount++;
		else if (event.type === "tool_call") {
			entry.toolCallCount++;
			if (event.toolName) entry.toolBreakdown[event.toolName] = (entry.toolBreakdown[event.toolName] || 0) + 1;
		}
		entry.totalCharacters += event.characterCount;
		entry.providerBreakdown[event.provider] = (entry.providerBreakdown[event.provider] || 0) + 1;
		entry.modelBreakdown[event.model] = (entry.modelBreakdown[event.model] || 0) + 1;
	}
	if (granularity === "day") {
		const dailyStats = dailyUsageAtom.get();
		for (const stat of dailyStats) if (aggregated[stat.date]) {
			aggregated[stat.date].inputTokens = stat.inputTokens;
			aggregated[stat.date].outputTokens = stat.outputTokens;
		}
	}
	return Object.values(aggregated).sort((a, b) => a.date.localeCompare(b.date));
};
var getUsageSummaryForRange = (start, end) => {
	const events = getEventsInRange(start, end);
	const daily = getAggregatedUsageForRange(start, end, "day");
	const summary = {
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
		dailyUsage: daily
	};
	for (const event of events) {
		if (event.type === "message") summary.totalMessages++;
		else if (event.type === "response") summary.totalResponses++;
		else if (event.type === "tool_call") {
			summary.totalToolCalls++;
			if (event.toolName) summary.toolBreakdown[event.toolName] = (summary.toolBreakdown[event.toolName] || 0) + 1;
		}
		summary.totalCharacters += event.characterCount;
		summary.providerBreakdown[event.provider] = (summary.providerBreakdown[event.provider] || 0) + 1;
		summary.modelBreakdown[event.model] = (summary.modelBreakdown[event.model] || 0) + 1;
	}
	for (const day of daily) {
		summary.totalInputTokens += day.inputTokens || 0;
		summary.totalOutputTokens += day.outputTokens || 0;
	}
	if (summary.totalResponses > 0) summary.averageResponseLength = Math.round(summary.totalCharacters / summary.totalResponses);
	return summary;
};
var clearUsageData = () => {
	usageEventsAtom.set([]);
	dailyUsageAtom.set([]);
	persist();
};
export { getEarliestEventTimestamp as a, hydrateUsage as c, recordTokenUsage as d, recordToolCall as f, getAggregatedUsageForRange as i, recordMessage as l, clearUsageData as n, getEventsInRange as o, usageEventsAtom as p, estimateTokens as r, getUsageSummaryForRange as s, X as t, recordResponse as u };
