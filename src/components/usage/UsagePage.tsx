import { useCallback, useMemo, useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { UsagePageUI } from "./UsagePage.ui";
import {
	dailyUsageAtom,
	getUsageSummary,
	getRecentDailyUsage,
	clearUsageData,
} from "@/lib/stores/usage";
import { useNavigation } from "@/lib/hooks/useNavigation";

export const UsagePage = () => {
	const { goBack } = useNavigation();
	const [hasMounted, setHasMounted] = useState(false);
	
	useEffect(() => {
		setHasMounted(true);
	}, []);

	// Subscribe to daily usage changes - this triggers re-render when data changes
	const dailyUsage = useStore(dailyUsageAtom);

	// Compute summary and chart data based on current usage
	// We must ensure these are deterministic (empty) during the first render
	// to match the server-side render, even if the store is already hydrated on the client.
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
				dailyUsage: [],
			};
		}
		return getUsageSummary();
	}, [dailyUsage, hasMounted]);

	const chartData = useMemo(() => {
		if (!hasMounted) return [];
		return getRecentDailyUsage(30);
	}, [dailyUsage, hasMounted]);

	// Transform chart data for display
	const formattedChartData = useMemo(() => {
		if (!hasMounted) return [];
		return chartData.map((day) => ({
			...day,
			// Format date for display (e.g., "Dec 14")
			displayDate: new Date(day.date).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
		}));
	}, [chartData, hasMounted]);

	// Create table data from daily usage
	const tableData = useMemo(() => {
		if (!hasMounted) return [];
		return chartData
			.filter(
				(day) =>
					day.messageCount > 0 ||
					day.responseCount > 0 ||
					day.toolCallCount > 0 ||
					(day.inputTokens || 0) > 0 ||
					(day.outputTokens || 0) > 0
			)
			.map((day) => ({
				date: day.date,
				displayDate: new Date(day.date).toLocaleDateString("en-US", {
					weekday: "short",
					month: "short",
					day: "numeric",
				}),
				messages: day.messageCount,
				responses: day.responseCount,
				toolCalls: day.toolCallCount,
				inputTokens: day.inputTokens || 0,
				outputTokens: day.outputTokens || 0,
				totalTokens: (day.inputTokens || 0) + (day.outputTokens || 0),
			}));
	}, [chartData, hasMounted]);

	const handleBack = useCallback(() => {
		goBack();
	}, [goBack]);

	const handleClearData = useCallback(() => {
		if (
			confirm(
				"Are you sure you want to clear all usage data? This cannot be undone."
			)
		) {
			clearUsageData();
		}
	}, []);

	return (
		<UsagePageUI
			isHydrated={hasMounted}
			summary={summary}
			chartData={formattedChartData}
			tableData={tableData}
			onBack={handleBack}
			onClearData={handleClearData}
		/>
	);
};

