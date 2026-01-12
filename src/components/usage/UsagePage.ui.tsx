import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	type ColumnDef,
	type SortingState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	ArrowLeft,
	MessageSquare,
	Bot,
	Wrench,
	BarChart3,
	Trash2,
	ChevronUp,
	ChevronDown,
	ChevronsUpDown,
	Zap,
	TrendingUp,
	Cpu,
	Server,
	Calendar as CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SUPPORTED_PROVIDERS } from "@/lib/ai/constants";
import { ActivityCalendar } from "./ActivityCalendar";
import { 
	Select, 
	SelectContent, 
	SelectItem, 
	SelectTrigger, 
	SelectValue 
} from "@/components/ui/select";
import type { UsageSummary, DailyUsage, UsageGranularity } from "@/lib/stores/usage";

export interface ChartDataPoint extends DailyUsage {
	displayDate: string;
}

export interface TableDataRow {
	id: string;
	timestamp: number;
	displayTime: string;
	type: string;
	provider: string;
	model: string;
	tool?: string;
	value: number;
	unit: string;
	isAggregated?: boolean;
}

export type ChartSeriesView = "volume" | "providers" | "models" | "tools";

export interface UsagePageUIProps {
	isHydrated?: boolean;
	summary: UsageSummary;
	chartData: Array<Record<string, string | number>>;
	chartKeys: string[];
	tableData: TableDataRow[];
	onBack: () => void;
	onClearData: () => void;
	timezone: string;
	startDate: number;
	endDate: number;
	onRangeChange: (start: number, end: number) => void;
	firstActivityTimestamp: number | null;
	chartView: ChartSeriesView;
	onChartViewChange: (view: ChartSeriesView) => void;
	granularity: UsageGranularity | "auto";
	onGranularityChange: (granularity: UsageGranularity | "auto") => void;
	allEvents: Array<{ timestamp: number }>;
}

// Large stat card for hero metrics
const HeroStat = ({
	icon: Icon,
	label,
	value,
	subLabel,
	gradient,
	testId,
	isLoading = false,
}: {
	icon: React.ElementType;
	label: string;
	value: string | number;
	subLabel?: string;
	gradient: string;
	testId?: string;
	isLoading?: boolean;
}) => (
	<div
		data-testid={testId}
		className={cn(
			"relative overflow-hidden rounded-2xl p-5",
			"bg-linear-to-br",
			gradient
		)}
	>
		<div className="relative z-10">
			<div className="mb-3 flex items-center gap-2">
				<Icon className="h-5 w-5 text-white/80" />
				<span className="text-sm font-medium text-white/80">
					{label}
				</span>
			</div>
			{isLoading ? (
				<Skeleton className="h-10 w-24 bg-white/20" />
			) : (
				<p data-testid={testId ? `${testId}-value` : undefined} className="text-4xl font-bold tracking-tight text-white">
					{value}
				</p>
			)}
			<div className="mt-1 h-4">
				{isLoading ? (
					<Skeleton className="h-3 w-32 bg-white/10" />
				) : (
					subLabel && <p className="text-xs text-white/60">{subLabel}</p>
				)}
			</div>
		</div>
		<div className="absolute -bottom-4 -right-4 opacity-10">
			<Icon className="h-24 w-24 text-white" />
		</div>
	</div>
);

// Breakdown list component
const BreakdownList = ({
	title,
	icon: Icon,
	data,
	color,
	isLoading = false,
	labelMap,
}: {
	title: string;
	icon: React.ElementType;
	data: Record<string, number>;
	color: string;
	isLoading?: boolean;
	labelMap?: Record<string, string>;
}) => {
	const sortedData = useMemo(() => {
		return Object.entries(data).sort((a, b) => b[1] - a[1]);
	}, [data]);

	const total = useMemo(() => {
		return Object.values(data).reduce((acc, curr) => acc + curr, 0);
	}, [data]);

	return (
		<div className="rounded-xl border bg-card/50 p-4">
			<div className="mb-4 flex items-center gap-2">
				<div className={cn("rounded-lg p-1.5", color)}>
					<Icon className="h-3.5 w-3.5" />
				</div>
				<h3 className="text-sm font-semibold">{title}</h3>
			</div>
			{isLoading ? (
				<div className="space-y-3">
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} className="h-8 w-full rounded-md" />
					))}
				</div>
			) : sortedData.length > 0 ? (
				<div className="space-y-3">
					{sortedData.map(([name, count]) => {
						const percentage = total > 0 ? (count / total) * 100 : 0;
						const displayName = labelMap ? labelMap[name] || name : name;
						return (
							<div key={name} className="space-y-1">
								<div className="flex items-center justify-between text-xs">
									<span className="truncate font-medium text-foreground" title={displayName}>
										{displayName}
									</span>
									<span className="tabular-nums text-muted-foreground">
										{count.toLocaleString()}
									</span>
								</div>
								<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
									<div
										className={cn("h-full transition-all duration-500", color.replace('/10', ''))}
										style={{ width: `${percentage}%` }}
									/>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<div className="flex h-24 flex-col items-center justify-center text-muted-foreground">
					<p className="text-xs">No data yet</p>
				</div>
			)}
		</div>
	);
};

// Custom tooltip for the chart
const CustomTooltip = ({
	active,
	payload,
	label,
}: {
	active?: boolean;
	payload?: Array<{
		value: number;
		name: string;
		color: string;
		dataKey: string;
	}>;
	label?: string;
}) => {
	if (!active || !payload || payload.length === 0) return null;

	return (
		<div className="rounded-xl border bg-popover/95 px-4 py-3 shadow-xl backdrop-blur-sm">
			<p className="mb-2 text-sm font-semibold text-foreground">
				{label}
			</p>
			<div className="space-y-1">
				{payload.map((entry, index) => (
					<div
						key={index}
						className="flex items-center justify-between gap-4"
					>
						<div className="flex items-center gap-2">
							<div
								className="h-2.5 w-2.5 rounded-full"
								style={{ backgroundColor: entry.color }}
							/>
							<span className="text-xs text-muted-foreground">
								{entry.name}
							</span>
						</div>
						<span
							className="text-xs font-medium tabular-nums"
							style={{ color: entry.color }}
						>
							{entry.value.toLocaleString()}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

// Sortable column header component
const SortableHeader = ({
	column,
	children,
}: {
	column: {
		toggleSorting: (desc?: boolean) => void;
		getIsSorted: () => false | "asc" | "desc";
	};
	children: React.ReactNode;
}) => {
	const sorted = column.getIsSorted();
	return (
		<button
			className="flex items-center gap-1.5 text-left font-medium hover:text-foreground transition-colors"
			onClick={() => column.toggleSorting(sorted === "asc")}
		>
			{children}
			{sorted === "asc" ? (
				<ChevronUp className="h-3.5 w-3.5" />
			) : sorted === "desc" ? (
				<ChevronDown className="h-3.5 w-3.5" />
			) : (
				<ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
			)}
		</button>
	);
};

export const UsagePageUI = ({
	isHydrated = false,
	summary,
	chartData,
	chartKeys,
	tableData,
	onBack,
	onClearData,
	timezone,
	startDate,
	endDate,
	onRangeChange,
	firstActivityTimestamp,
	chartView,
	onChartViewChange,
	granularity,
	onGranularityChange,
	allEvents,
}: UsagePageUIProps) => {
	const [sorting, setSorting] = useState<SortingState>([
		{ id: "timestamp", desc: true },
	]);

	const totalTokens = summary.totalInputTokens + summary.totalOutputTokens;

	// Table columns definition
	const columns = useMemo<ColumnDef<TableDataRow>[]>(
		() => [
			{
				accessorKey: "timestamp",
				header: ({ column }) => (
					<SortableHeader column={column}>Time</SortableHeader>
				),
				cell: ({ row }) => (
					<span className="font-medium text-foreground">
						{row.original.displayTime}
					</span>
				),
			},
			{
				accessorKey: "type",
				header: ({ column }) => (
					<SortableHeader column={column}>Event</SortableHeader>
				),
				cell: ({ row }) => {
					const type = row.original.type;
					const isAggregated = row.original.isAggregated;

					if (isAggregated) {
						return <span className="text-xs font-medium text-foreground">{type}</span>;
					}

					return (
						<div className="flex items-center gap-1.5">
							{type === "message" && <MessageSquare className="h-3 w-3 text-blue-500" />}
							{type === "response" && <Bot className="h-3 w-3 text-emerald-500" />}
							{type === "tool_call" && <Wrench className="h-3 w-3 text-amber-500" />}
							<span className="capitalize text-xs font-medium">{type.replace("_", " ")}</span>
						</div>
					);
				},
			},
			{
				accessorKey: "provider",
				header: ({ column }) => (
					<SortableHeader column={column}>Provider</SortableHeader>
				),
				cell: ({ row }) => {
					const isAggregated = row.original.isAggregated;
					if (isAggregated) {
						return <span className="text-[10px] text-muted-foreground truncate block max-w-[150px]" title={row.original.provider}>{row.original.provider}</span>;
					}
					return (
						<span className="inline-flex items-center rounded-md bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-medium text-indigo-500 ring-1 ring-inset ring-indigo-500/20">
							{SUPPORTED_PROVIDERS.find(p => p.id === row.original.provider)?.label || row.original.provider}
						</span>
					);
				},
			},
			{
				accessorKey: "model",
				header: ({ column }) => (
					<SortableHeader column={column}>Model</SortableHeader>
				),
				cell: ({ row }) => {
					const isAggregated = row.original.isAggregated;
					if (isAggregated) {
						return <span className="text-[10px] text-muted-foreground truncate block max-w-[150px]" title={row.original.model}>{row.original.model}</span>;
					}
					return (
						<span className="inline-flex items-center rounded-md bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-medium text-purple-500 ring-1 ring-inset ring-purple-500/20 max-w-[120px] truncate">
							{row.original.model}
						</span>
					);
				},
			},
			{
				accessorKey: "tool",
				header: ({ column }) => (
					<SortableHeader column={column}>Tool</SortableHeader>
				),
				cell: ({ row }) => row.original.tool ? (
					<span className="inline-flex items-center rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-500 ring-1 ring-inset ring-amber-500/20">
						{row.original.tool}
					</span>
				) : <span className="text-muted-foreground/30">—</span>,
			},
			{
				accessorKey: "value",
				header: ({ column }) => (
					<SortableHeader column={column}>Usage</SortableHeader>
				),
				cell: ({ row }) => (
					<span className="tabular-nums font-semibold">
						{row.original.value.toLocaleString()} <span className="text-[10px] text-muted-foreground font-normal">{row.original.unit}</span>
					</span>
				),
			},
		],
		[]
	);

	const table = useReactTable({
		data: tableData,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	const hasData = allEvents.length > 0;

	// Define distinct colors for the series
	const colors = [
		"#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", 
		"#f43f5e", "#06b6d4", "#84cc16", "#eab308", "#6366f1"
	];

	return (
		<div data-testid="usage-page" className="flex h-screen flex-col bg-background">
			{/* Header */}
			<header data-testid="usage-header" className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
				<Button
					data-testid="usage-back-button"
					variant="ghost"
					size="icon"
					onClick={onBack}
					className="h-9 w-9"
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-purple-600">
						<TrendingUp className="h-4 w-4 text-white" />
					</div>
					<div>
						<h1 data-testid="usage-title" className="text-base font-semibold leading-none">
							Usage Analytics
						</h1>
						<p data-testid="usage-subtitle" className="text-[11px] text-muted-foreground">
							Track your AI interactions
						</p>
					</div>
				</div>
			</header>

			{/* Content */}
			<ScrollArea className="flex-1">
				<div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
					
					{/* Activity Period & Range Selection */}
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border bg-card p-4 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
								<CalendarIcon className="h-5 w-5 text-primary" />
							</div>
							<div>
								<h3 className="text-sm font-semibold">Activity Period</h3>
								<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
									<span className="rounded bg-muted/50 px-1.5 py-0.5">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(startDate))}</span>
									<span className="opacity-50">—</span>
									<span className="rounded bg-muted/50 px-1.5 py-0.5">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(endDate))}</span>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline" size="sm" className="h-9 gap-2 px-4 shadow-sm hover:bg-muted/80">
										<CalendarIcon className="h-4 w-4 text-muted-foreground" />
										<span>Change Range</span>
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[400px]">
									<DialogHeader>
										<DialogTitle>Select Activity Range</DialogTitle>
									</DialogHeader>
									<div className="py-4">
										<ActivityCalendar 
											events={allEvents}
											startDate={startDate}
											endDate={endDate}
											onRangeChange={onRangeChange}
											timezone={timezone}
											firstActivityTimestamp={firstActivityTimestamp}
										/>
									</div>
									<div className="flex flex-wrap gap-2 border-t pt-4">
										<Button 
											variant="ghost" 
											size="sm" 
											onClick={() => {
												const end = Date.now();
												const start = end - 7 * 24 * 60 * 60 * 1000;
												onRangeChange(start, end);
											}}
											className="h-8 text-xs px-3"
										>
											Last 7d
										</Button>
										<Button 
											variant="ghost" 
											size="sm" 
											onClick={() => {
												const end = Date.now();
												const start = end - 30 * 24 * 60 * 60 * 1000;
												onRangeChange(start, end);
											}}
											className="h-8 text-xs px-3"
										>
											Last 30d
										</Button>
										<Button 
											variant="ghost" 
											size="sm" 
											onClick={() => {
												const end = Date.now();
												const start = end - 90 * 24 * 60 * 60 * 1000;
												onRangeChange(start, end);
											}}
											className="h-8 text-xs px-3"
										>
											Last 90d
										</Button>
										<Button 
											variant="ghost" 
											size="sm" 
											onClick={() => {
												if (firstActivityTimestamp) {
													onRangeChange(firstActivityTimestamp, Date.now());
												}
											}}
											className="h-8 text-xs px-3"
										>
											All Time
										</Button>
									</div>
								</DialogContent>
							</Dialog>
						</div>
					</div>

					{/* Hero Stats */}
					<section data-testid="usage-section-overview">
						<div className="mb-4 flex items-center gap-2">
							<h2 data-testid="usage-overview-title" className="text-sm font-semibold text-foreground">
								Overview
							</h2>
							<span data-testid="usage-estimated-tokens-note" className="text-xs text-muted-foreground">
								(for selected range)
							</span>
						</div>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<HeroStat
								testId="hero-stat-total-tokens"
								icon={Zap}
								label="Total Tokens"
								value={totalTokens.toLocaleString()}
								subLabel={`${summary.totalInputTokens.toLocaleString()} in · ${summary.totalOutputTokens.toLocaleString()} out`}
								gradient="from-violet-600 to-purple-700"
								isLoading={!isHydrated}
							/>
							<HeroStat
								testId="hero-stat-conversations"
								icon={MessageSquare}
								label="Conversations"
								value={summary.totalMessages}
								subLabel={`${summary.totalResponses} AI responses`}
								gradient="from-blue-600 to-cyan-600"
								isLoading={!isHydrated}
							/>
							<HeroStat
								testId="hero-stat-tool-calls"
								icon={Wrench}
								label="Tool Calls"
								value={summary.totalToolCalls}
								subLabel={
									Object.keys(summary.toolBreakdown).length >
									0
										? Object.entries(summary.toolBreakdown)
												.slice(0, 3)
												.map(([t, c]) => `${t}: ${c}`)
												.join(" · ")
										: "No tools used"
								}
								gradient="from-amber-500 to-orange-600"
								isLoading={!isHydrated}
							/>
						</div>
					</section>

					{/* Breakdowns */}
					<section data-testid="usage-section-breakdowns" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<BreakdownList
							title="AI Providers"
							icon={Server}
							data={summary.providerBreakdown}
							color="bg-indigo-500/10 text-indigo-500"
							isLoading={!isHydrated}
							labelMap={Object.fromEntries(SUPPORTED_PROVIDERS.map(p => [p.id, p.label]))}
						/>
						<BreakdownList
							title="AI Models"
							icon={Cpu}
							data={summary.modelBreakdown}
							color="bg-purple-500/10 text-purple-500"
							isLoading={!isHydrated}
						/>
						<BreakdownList
							title="Tools Used"
							icon={Wrench}
							data={summary.toolBreakdown}
							color="bg-amber-500/10 text-amber-500"
							isLoading={!isHydrated}
						/>
					</section>

					{/* Chart Section */}
					<section data-testid="usage-section-chart" className="rounded-2xl border bg-card">
						<div className="flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<h2 data-testid="chart-title" className="text-sm font-semibold text-foreground">
									Activity Visualization
								</h2>
								<p data-testid="chart-subtitle" className="text-xs text-muted-foreground">
									Trend for selected range
								</p>
							</div>
							
							<div className="flex flex-wrap items-center gap-2">
								<Select value={granularity} onValueChange={(v) => onGranularityChange(v as UsageGranularity | "auto")}>
									<SelectTrigger className="h-8 w-[130px] text-xs">
										<SelectValue placeholder="Granularity" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="auto">Auto</SelectItem>
										<SelectItem value="interaction">Interaction</SelectItem>
										<SelectItem value="minute">Per Minute</SelectItem>
										<SelectItem value="hour">Per Hour</SelectItem>
										<SelectItem value="day">Per Day</SelectItem>
										<SelectItem value="month">Per Month</SelectItem>
										<SelectItem value="year">Per Year</SelectItem>
									</SelectContent>
								</Select>

								<Select value={chartView} onValueChange={(v) => onChartViewChange(v as ChartSeriesView)}>
									<SelectTrigger className="h-8 w-[150px] text-xs">
										<SelectValue placeholder="Select view" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="volume">Interaction Volume</SelectItem>
										<SelectItem value="providers">By Provider</SelectItem>
										<SelectItem value="models">By Model</SelectItem>
										<SelectItem value="tools">By Tool</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						
						<div className="p-4">
							{!isHydrated ? (
								<Skeleton className="h-[300px] w-full" />
							) : hasData ? (
								<div className="h-[300px] w-full animate-in fade-in duration-500">
									<ResponsiveContainer width="100%" height="100%">
										<AreaChart
											data={chartData}
											margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
										>
											<CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/30" />
											<XAxis
												dataKey="displayDate"
												tick={{ fontSize: 10 }}
												tickLine={false}
												axisLine={false}
												className="fill-muted-foreground"
												interval="preserveStartEnd"
												dy={8}
											/>
											<YAxis
												tick={{ fontSize: 10 }}
												tickLine={false}
												axisLine={false}
												className="fill-muted-foreground"
												allowDecimals={false}
												width={35}
											/>
											<Tooltip content={<CustomTooltip />} />
											{chartKeys.map((key, index) => (
												<Area
													key={key}
													type="monotone"
													dataKey={key}
													stackId="1"
													stroke={colors[index % colors.length]}
													fill={colors[index % colors.length]}
													fillOpacity={0.4}
													strokeWidth={2}
												/>
											))}
										</AreaChart>
									</ResponsiveContainer>
								</div>
							) : (
								<div data-testid="chart-empty-state" className="flex h-[300px] flex-col items-center justify-center gap-2 text-muted-foreground">
									<BarChart3 className="h-10 w-10 opacity-20" />
									<p className="text-sm">No data for this range</p>
								</div>
							)}
						</div>
					</section>

					{/* Data Table Section */}
					<section data-testid="usage-section-table" className="rounded-2xl border bg-card">
						<div className="border-b px-5 py-4">
							<h2 data-testid="table-title" className="text-sm font-semibold text-foreground">
								Interaction History
							</h2>
							<p data-testid="table-subtitle" className="text-xs text-muted-foreground">
								Individual events for the selected period
							</p>
						</div>
						{tableData.length > 0 ? (
							<div className="overflow-x-auto">
								<table data-testid="usage-table" className="w-full text-sm">
									<thead>
										{table.getHeaderGroups().map((headerGroup) => (
											<tr key={headerGroup.id} className="border-b bg-muted/30">
												{headerGroup.headers.map((header) => (
													<th
														key={header.id}
														className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-muted-foreground"
													>
														{flexRender(header.column.columnDef.header, header.getContext())}
													</th>
												))}
											</tr>
										))}
									</thead>
									<tbody>
										{table.getRowModel().rows.map((row, idx) => (
											<tr
												key={row.id}
												className={cn(
													"border-b last:border-0 transition-colors hover:bg-muted/20",
													idx % 2 === 0 ? "bg-transparent" : "bg-muted/10"
												)}
											>
												{row.getVisibleCells().map((cell) => (
													<td key={cell.id} className="whitespace-nowrap px-4 py-3">
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div data-testid="table-empty-state" className="flex h-40 flex-col items-center justify-center gap-2 text-muted-foreground">
								<p className="text-sm">No events found in this range</p>
							</div>
						)}
					</section>

					{/* Danger Zone */}
					{hasData && (
						<section data-testid="usage-section-danger-zone" className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex items-start gap-3">
									<div className="rounded-lg bg-destructive/10 p-2">
										<Trash2 className="h-4 w-4 text-destructive" />
									</div>
									<div>
										<h3 data-testid="clear-data-title" className="text-sm font-semibold text-destructive">
											Clear All Usage Data
										</h3>
										<p data-testid="clear-data-description" className="text-xs text-muted-foreground">
											This will permanently delete all tracked metrics
										</p>
									</div>
								</div>
								<Button
									data-testid="clear-data-button"
									variant="destructive"
									size="sm"
									onClick={onClearData}
									className="gap-2"
								>
									<Trash2 className="h-3.5 w-3.5" />
									Clear Data
								</Button>
							</div>
						</section>
					)}

					<div className="h-6" />
				</div>
			</ScrollArea>
		</div>
	);
};
