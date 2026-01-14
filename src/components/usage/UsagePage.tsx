import { useNavigation } from "@/lib/hooks/useNavigation";
import { confirmAction } from "@/lib/stores/confirmation";
import { showSuccess } from "@/lib/stores/notifications";
import { experimentsAtom, timezoneAtom } from "@/lib/stores/settings";
import {
	clearUsageData,
	dailyUsageAtom,
	getAggregatedUsageForRange,
	getEarliestEventTimestamp,
	getEventsInRange,
	getUsageSummaryForRange,
	usageEventsAtom,
	type UsageGranularity,
} from "@/lib/stores/usage";
import { formatDateByGranularity, formatInTimezone } from "@/lib/utils/date";
import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type ChartSeriesView, UsagePageUI } from "./UsagePage.ui";

export const UsagePage = () => {
	const { goBack } = useNavigation();
	const [hasMounted, setHasMounted] = useState(false);

	// Range state
	const [range, setRange] = useState<[number, number]>([0, 0]);

	const [chartView, setChartView] = useState<ChartSeriesView>("volume");
	const [granularity, setGranularity] = useState<UsageGranularity | "auto">(
		"auto",
	);

	const activeGranularity = useMemo(() => {
		if (granularity !== "auto") return granularity;
		if (range[0] === 0) return "day"; // Default for SSR

		const duration = range[1] - range[0];
		if (duration < 60 * 60 * 1000) return "minute"; // < 1 hour
		if (duration < 2 * 24 * 60 * 60 * 1000) return "hour"; // < 2 days
		if (duration > 365 * 24 * 60 * 60 * 1000) return "month"; // > 1 year
		return "day";
	}, [range, granularity]);

	useEffect(() => {
		setHasMounted(true);

		// Initialize range on client to avoid hydration mismatch from Date.now()
		const end = Date.now();
		const earliest = getEarliestEventTimestamp();
		const thirtyDaysAgo = end - 30 * 24 * 60 * 60 * 1000;
		const start = earliest ? Math.max(earliest, thirtyDaysAgo) : thirtyDaysAgo;
		setRange([start, end]);
	}, []);

	// Subscribe to atoms
	const events = useStore(usageEventsAtom);
	const dailyUsage = useStore(dailyUsageAtom);
	const timezone = useStore(timezoneAtom);
	const experiments = useStore(experimentsAtom);
	const toolsEnabled = !!experiments.tools;

	const summary = useMemo(() => {
		if (!hasMounted) {
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
		const s = getUsageSummaryForRange(range[0], range[1]);

		// Force re-calculation when events or dailyUsage changes
		// These are read internally by getUsageSummaryForRange
		void events;
		void dailyUsage;

		if (!toolsEnabled) {
			return {
				...s,
				totalToolCalls: 0,
				toolBreakdown: {},
			};
		}
		return s;
	}, [range, hasMounted, toolsEnabled, events, dailyUsage]); // eslint-disable-line react-hooks/exhaustive-deps

	const chartDataFull = useMemo(() => {
		if (!hasMounted) return [];

		const aggregated = getAggregatedUsageForRange(
			range[0],
			range[1],
			activeGranularity,
		);

		// Force re-calculation when events or dailyUsage changes
		void events;
		void dailyUsage;

		return aggregated.map((day) => {
			// Handle ISO formats (T) and space formats (YYYY-MM-DD HH:mm)
			const dateStr = day.date.includes(" ")
				? day.date.replace(" ", "T")
				: day.date.length === 4
					? `${day.date}-01-01`
					: // Year only
						day.date.length === 7
						? `${day.date}-01`
						: // Month only
							day.date;

			const dateObj = new Date(dateStr);
			const timestamp = dateObj.getTime();

			const data: Record<string, string | number> = {
				date: day.date,
				displayDate:
					activeGranularity === "interaction"
						? formatInTimezone(timestamp, timezone, {
								includeTime: true,
								compact: true,
							})
						: formatDateByGranularity(timestamp, timezone, activeGranularity),
			};

			if (chartView === "volume") {
				data.Messages = day.messageCount;
				data.Responses = day.responseCount;
				if (toolsEnabled) {
					data.Tools = day.toolCallCount;
				}
			} else if (chartView === "providers") {
				Object.assign(data, day.providerBreakdown);
			} else if (chartView === "models") {
				Object.assign(data, day.modelBreakdown);
			} else if (chartView === "tools") {
				if (toolsEnabled) {
					Object.assign(data, day.toolBreakdown);
				}
			}
			return data;
		});
	}, [
		range,
		chartView,
		timezone,
		hasMounted,
		activeGranularity,
		toolsEnabled,
		events,
		dailyUsage,
	]); // eslint-disable-line react-hooks/exhaustive-deps

	const chartKeys = useMemo(() => {
		if (chartDataFull.length === 0) return [];
		const keys = new Set<string>();
		chartDataFull.forEach((point) => {
			Object.keys(point).forEach((key) => {
				if (key !== "date" && key !== "displayDate") {
					keys.add(key);
				}
			});
		});
		return Array.from(keys);
	}, [chartDataFull]);

	const tableData = useMemo(() => {
		if (!hasMounted) return [];

		if (activeGranularity === "interaction") {
			let filteredEvents = getEventsInRange(range[0], range[1]);

			// Force re-calculation when events or dailyUsage changes
			void events;
			void dailyUsage;

			if (!toolsEnabled) {
				filteredEvents = filteredEvents.filter((e) => e.type !== "tool_call");
			}
			return filteredEvents.map((event) => ({
				id: event.id,
				timestamp: event.timestamp,
				displayTime: formatInTimezone(event.timestamp, timezone),
				type: event.type,
				provider: event.provider,
				model: event.model,
				tool: event.toolName,
				value: event.characterCount || 1,
				unit: event.type === "tool_call" ? "call" : "chars",
				isAggregated: false,
			}));
		} else {
			const aggregated = getAggregatedUsageForRange(
				range[0],
				range[1],
				activeGranularity,
			);

			// Force re-calculation when events or dailyUsage changes
			void events;
			void dailyUsage;

			return aggregated.map((day) => {
				const dateStr = day.date.includes(" ")
					? day.date.replace(" ", "T")
					: day.date.length === 4
						? `${day.date}-01-01`
						: day.date.length === 7
							? `${day.date}-01`
							: day.date;
				const timestamp = new Date(dateStr).getTime();

				return {
					id: day.date,
					timestamp,
					displayTime: formatDateByGranularity(
						timestamp,
						timezone,
						activeGranularity,
					),
					type: `${day.messageCount} msg / ${day.responseCount} res`,
					provider: Object.keys(day.providerBreakdown).join(", "),
					model: Object.keys(day.modelBreakdown).join(", "),
					tool:
						toolsEnabled && day.toolCallCount > 0
							? `${day.toolCallCount} calls`
							: undefined,
					value: day.totalCharacters,
					unit: "chars",
					isAggregated: true,
				};
			});
		}
	}, [
		range,
		hasMounted,
		timezone,
		activeGranularity,
		toolsEnabled,
		events,
		dailyUsage,
	]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleBack = useCallback(() => {
		goBack();
	}, [goBack]);

	const handleClearData = useCallback(() => {
		confirmAction({
			title: "Clear Usage Data",
			message:
				"Are you sure you want to clear all usage data? This cannot be undone.",
			confirmText: "Clear Data",
			variant: "destructive",
			onConfirm: () => {
				clearUsageData();
				showSuccess("Usage data cleared.");
			},
		});
	}, []);

	const handleRangeChange = useCallback((start: number, end: number) => {
		setRange([start, end]);
	}, []);

	useEffect(() => {
		if (!toolsEnabled && chartView === "tools") {
			setChartView("volume");
		}
	}, [toolsEnabled, chartView]);

	return (
		<UsagePageUI
			isHydrated={hasMounted}
			summary={summary}
			chartData={chartDataFull}
			chartKeys={chartKeys}
			tableData={tableData}
			onBack={handleBack}
			onClearData={handleClearData}
			timezone={timezone}
			startDate={range[0]}
			endDate={range[1]}
			onRangeChange={handleRangeChange}
			firstActivityTimestamp={getEarliestEventTimestamp()}
			chartView={chartView}
			onChartViewChange={setChartView}
			granularity={granularity}
			onGranularityChange={setGranularity}
			allEvents={events}
			toolsEnabled={toolsEnabled}
		/>
	);
};
