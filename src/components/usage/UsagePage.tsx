import { useCallback, useMemo } from "react";
import { useStore } from "@nanostores/react";
import { UsagePageUI } from "./UsagePage.ui";
import {
	dailyUsageAtom,
	getUsageSummary,
	getRecentDailyUsage,
	clearUsageData,
} from "@/lib/stores/usage";
import { goBack } from "@/lib/stores/navigation";

export const UsagePage = () => {
	// Subscribe to daily usage changes - this triggers re-render when data changes
	const dailyUsage = useStore(dailyUsageAtom);

	// Compute summary and chart data based on current usage
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const summary = useMemo(() => getUsageSummary(), [dailyUsage]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const chartData = useMemo(() => getRecentDailyUsage(30), [dailyUsage]);

	// Transform chart data for display
	const formattedChartData = useMemo(() => {
		return chartData.map((day) => ({
			...day,
			// Format date for display (e.g., "Dec 14")
			displayDate: new Date(day.date).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
		}));
	}, [chartData]);

	// Create table data from daily usage
	const tableData = useMemo(() => {
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
	}, [chartData]);

	const handleBack = useCallback(() => {
		goBack();
	}, []);

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
			summary={summary}
			chartData={formattedChartData}
			tableData={tableData}
			onBack={handleBack}
			onClearData={handleClearData}
		/>
	);
};

