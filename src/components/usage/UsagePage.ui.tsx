import { useMemo, useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UsageSummary, DailyUsage } from "@/lib/stores/usage";

export interface ChartDataPoint extends DailyUsage {
	displayDate: string;
}

export interface TableDataRow {
	date: string;
	displayDate: string;
	messages: number;
	responses: number;
	toolCalls: number;
	inputTokens: number;
	outputTokens: number;
	totalTokens: number;
}

export interface UsagePageUIProps {
	summary: UsageSummary;
	chartData: ChartDataPoint[];
	tableData: TableDataRow[];
	onBack: () => void;
	onClearData: () => void;
}

// Large stat card for hero metrics
const HeroStat = ({
	icon: Icon,
	label,
	value,
	subLabel,
	gradient,
}: {
	icon: React.ElementType;
	label: string;
	value: string | number;
	subLabel?: string;
	gradient: string;
}) => (
	<div
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
			<p className="text-4xl font-bold tracking-tight text-white">
				{value}
			</p>
			{subLabel && (
				<p className="mt-1 text-xs text-white/60">{subLabel}</p>
			)}
		</div>
		<div className="absolute -bottom-4 -right-4 opacity-10">
			<Icon className="h-24 w-24 text-white" />
		</div>
	</div>
);

// Compact stat for secondary metrics
const CompactStat = ({
	label,
	value,
	icon: Icon,
	color,
}: {
	label: string;
	value: string | number;
	icon: React.ElementType;
	color: string;
}) => (
	<div className="flex items-center gap-3 rounded-xl border bg-card/50 px-4 py-3">
		<div className={cn("rounded-lg p-2", color)}>
			<Icon className="h-4 w-4" />
		</div>
		<div className="min-w-0 flex-1">
			<p className="text-lg font-semibold tabular-nums text-foreground">
				{value}
			</p>
			<p className="text-[11px] text-muted-foreground">{label}</p>
		</div>
	</div>
);

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
	summary,
	chartData,
	tableData,
	onBack,
	onClearData,
}: UsagePageUIProps) => {
	const [sorting, setSorting] = useState<SortingState>([
		{ id: "date", desc: true },
	]);

	const totalTokens = summary.totalInputTokens + summary.totalOutputTokens;

	// Table columns definition
	const columns = useMemo<ColumnDef<TableDataRow>[]>(
		() => [
			{
				accessorKey: "date",
				header: ({ column }) => (
					<SortableHeader column={column}>Date</SortableHeader>
				),
				cell: ({ row }) => (
					<span className="font-medium text-foreground">
						{row.original.displayDate}
					</span>
				),
			},
			{
				accessorKey: "messages",
				header: ({ column }) => (
					<SortableHeader column={column}>
						<MessageSquare className="h-3.5 w-3.5 text-blue-500" />
						Msgs
					</SortableHeader>
				),
				cell: ({ row }) => (
					<span className="tabular-nums text-blue-500 font-medium">
						{row.original.messages}
					</span>
				),
			},
			{
				accessorKey: "responses",
				header: ({ column }) => (
					<SortableHeader column={column}>
						<Bot className="h-3.5 w-3.5 text-emerald-500" />
						Resp
					</SortableHeader>
				),
				cell: ({ row }) => (
					<span className="tabular-nums text-emerald-500 font-medium">
						{row.original.responses}
					</span>
				),
			},
			{
				accessorKey: "toolCalls",
				header: ({ column }) => (
					<SortableHeader column={column}>
						<Wrench className="h-3.5 w-3.5 text-amber-500" />
						Tools
					</SortableHeader>
				),
				cell: ({ row }) => (
					<span className="tabular-nums text-amber-500 font-medium">
						{row.original.toolCalls}
					</span>
				),
			},
			{
				accessorKey: "inputTokens",
				header: ({ column }) => (
					<SortableHeader column={column}>
						<span className="text-cyan-500">↓</span>
						Input
					</SortableHeader>
				),
				cell: ({ row }) => (
					<span className="tabular-nums text-cyan-500">
						{row.original.inputTokens.toLocaleString()}
					</span>
				),
			},
			{
				accessorKey: "outputTokens",
				header: ({ column }) => (
					<SortableHeader column={column}>
						<span className="text-rose-500">↑</span>
						Output
					</SortableHeader>
				),
				cell: ({ row }) => (
					<span className="tabular-nums text-rose-500">
						{row.original.outputTokens.toLocaleString()}
					</span>
				),
			},
			{
				accessorKey: "totalTokens",
				header: ({ column }) => (
					<SortableHeader column={column}>
						<Zap className="h-3.5 w-3.5 text-purple-500" />
						Total
					</SortableHeader>
				),
				cell: ({ row }) => (
					<span className="tabular-nums text-purple-500 font-semibold">
						{row.original.totalTokens.toLocaleString()}
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

	const hasData =
		summary.totalMessages > 0 ||
		summary.totalResponses > 0 ||
		summary.totalToolCalls > 0;

	return (
		<div className="flex h-screen flex-col bg-background">
			{/* Header */}
			<header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
				<Button
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
						<h1 className="text-base font-semibold leading-none">
							Usage Analytics
						</h1>
						<p className="text-[11px] text-muted-foreground">
							Track your AI interactions
						</p>
					</div>
				</div>
			</header>

			{/* Content */}
			<ScrollArea className="flex-1">
				<div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
					{/* Hero Stats */}
					<section>
						<div className="mb-4 flex items-center gap-2">
							<h2 className="text-sm font-semibold text-foreground">
								Overview
							</h2>
							<span className="text-xs text-muted-foreground">
								(estimated tokens)
							</span>
						</div>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<HeroStat
								icon={Zap}
								label="Total Tokens"
								value={totalTokens.toLocaleString()}
								subLabel={`${summary.totalInputTokens.toLocaleString()} in · ${summary.totalOutputTokens.toLocaleString()} out`}
								gradient="from-violet-600 to-purple-700"
							/>
							<HeroStat
								icon={MessageSquare}
								label="Conversations"
								value={summary.totalMessages}
								subLabel={`${summary.totalResponses} AI responses`}
								gradient="from-blue-600 to-cyan-600"
							/>
							<HeroStat
								icon={Wrench}
								label="Tool Calls"
								value={summary.totalToolCalls}
								subLabel={
									Object.keys(summary.toolBreakdown).length >
									0
										? Object.entries(summary.toolBreakdown)
												.map(([t, c]) => `${t}: ${c}`)
												.join(" · ")
										: "No tools used yet"
								}
								gradient="from-amber-500 to-orange-600"
							/>
						</div>
					</section>

					{/* Secondary Stats */}
					<section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
						<CompactStat
							icon={MessageSquare}
							label="Messages Sent"
							value={summary.totalMessages}
							color="bg-blue-500/10 text-blue-500"
						/>
						<CompactStat
							icon={Bot}
							label="AI Responses"
							value={summary.totalResponses}
							color="bg-emerald-500/10 text-emerald-500"
						/>
						<CompactStat
							icon={BarChart3}
							label="Input Tokens"
							value={summary.totalInputTokens.toLocaleString()}
							color="bg-cyan-500/10 text-cyan-500"
						/>
						<CompactStat
							icon={BarChart3}
							label="Output Tokens"
							value={summary.totalOutputTokens.toLocaleString()}
							color="bg-rose-500/10 text-rose-500"
						/>
					</section>

					{/* Chart Section */}
					<section className="rounded-2xl border bg-card">
						<div className="flex items-center justify-between border-b px-5 py-4">
							<div>
								<h2 className="text-sm font-semibold text-foreground">
									Activity Over Time
								</h2>
								<p className="text-xs text-muted-foreground">
									Last 30 days of usage
								</p>
							</div>
							<div className="flex items-center gap-4 text-xs">
								<div className="flex items-center gap-1.5">
									<div className="h-2 w-2 rounded-full bg-blue-500" />
									<span className="text-muted-foreground">
										Messages
									</span>
								</div>
								<div className="flex items-center gap-1.5">
									<div className="h-2 w-2 rounded-full bg-emerald-500" />
									<span className="text-muted-foreground">
										Responses
									</span>
								</div>
								<div className="flex items-center gap-1.5">
									<div className="h-2 w-2 rounded-full bg-amber-500" />
									<span className="text-muted-foreground">
										Tools
									</span>
								</div>
							</div>
						</div>
						<div className="p-4">
							{hasData ? (
								<div className="h-[260px] w-full">
									<ResponsiveContainer
										width="100%"
										height="100%"
									>
										<AreaChart
											data={chartData}
											margin={{
												top: 5,
												right: 5,
												left: -20,
												bottom: 0,
											}}
										>
											<defs>
												<linearGradient
													id="gradMessages"
													x1="0"
													y1="0"
													x2="0"
													y2="1"
												>
													<stop
														offset="0%"
														stopColor="#3b82f6"
														stopOpacity={0.25}
													/>
													<stop
														offset="100%"
														stopColor="#3b82f6"
														stopOpacity={0}
													/>
												</linearGradient>
												<linearGradient
													id="gradResponses"
													x1="0"
													y1="0"
													x2="0"
													y2="1"
												>
													<stop
														offset="0%"
														stopColor="#10b981"
														stopOpacity={0.25}
													/>
													<stop
														offset="100%"
														stopColor="#10b981"
														stopOpacity={0}
													/>
												</linearGradient>
												<linearGradient
													id="gradTools"
													x1="0"
													y1="0"
													x2="0"
													y2="1"
												>
													<stop
														offset="0%"
														stopColor="#f59e0b"
														stopOpacity={0.25}
													/>
													<stop
														offset="100%"
														stopColor="#f59e0b"
														stopOpacity={0}
													/>
												</linearGradient>
											</defs>
											<CartesianGrid
												strokeDasharray="3 3"
												vertical={false}
												className="stroke-border/30"
											/>
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
											<Tooltip
												content={<CustomTooltip />}
											/>
											<Area
												type="monotone"
												dataKey="messageCount"
												name="Messages"
												stroke="#3b82f6"
												strokeWidth={2}
												fill="url(#gradMessages)"
											/>
											<Area
												type="monotone"
												dataKey="responseCount"
												name="Responses"
												stroke="#10b981"
												strokeWidth={2}
												fill="url(#gradResponses)"
											/>
											<Area
												type="monotone"
												dataKey="toolCallCount"
												name="Tool Calls"
												stroke="#f59e0b"
												strokeWidth={2}
												fill="url(#gradTools)"
											/>
										</AreaChart>
									</ResponsiveContainer>
								</div>
							) : (
								<div className="flex h-[260px] flex-col items-center justify-center gap-2 text-muted-foreground">
									<BarChart3 className="h-10 w-10 opacity-20" />
									<p className="text-sm">No usage data yet</p>
									<p className="text-xs opacity-70">
										Start chatting to see your metrics
									</p>
								</div>
							)}
						</div>
					</section>

					{/* Data Table Section */}
					<section className="rounded-2xl border bg-card">
						<div className="border-b px-5 py-4">
							<h2 className="text-sm font-semibold text-foreground">
								Daily Breakdown
							</h2>
							<p className="text-xs text-muted-foreground">
								Detailed usage by day
							</p>
						</div>
						{tableData.length > 0 ? (
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										{table
											.getHeaderGroups()
											.map((headerGroup) => (
												<tr
													key={headerGroup.id}
													className="border-b bg-muted/30"
												>
													{headerGroup.headers.map(
														(header) => (
															<th
																key={header.id}
																className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-muted-foreground"
															>
																{header.isPlaceholder
																	? null
																	: flexRender(
																			header
																				.column
																				.columnDef
																				.header,
																			header.getContext()
																	  )}
															</th>
														)
													)}
												</tr>
											))}
									</thead>
									<tbody>
										{table
											.getRowModel()
											.rows.map((row, idx) => (
												<tr
													key={row.id}
													className={cn(
														"border-b last:border-0 transition-colors hover:bg-muted/20",
														idx % 2 === 0
															? "bg-transparent"
															: "bg-muted/10"
													)}
												>
													{row
														.getVisibleCells()
														.map((cell) => (
															<td
																key={cell.id}
																className="whitespace-nowrap px-4 py-3"
															>
																{flexRender(
																	cell.column
																		.columnDef
																		.cell,
																	cell.getContext()
																)}
															</td>
														))}
												</tr>
											))}
									</tbody>
								</table>
							</div>
						) : (
							<div className="flex h-40 flex-col items-center justify-center gap-2 text-muted-foreground">
								<p className="text-sm">No data to display</p>
								<p className="text-xs opacity-70">
									Usage will appear here as you chat
								</p>
							</div>
						)}
					</section>

					{/* Danger Zone */}
					{hasData && (
						<section className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex items-start gap-3">
									<div className="rounded-lg bg-destructive/10 p-2">
										<Trash2 className="h-4 w-4 text-destructive" />
									</div>
									<div>
										<h3 className="text-sm font-semibold text-destructive">
											Clear All Usage Data
										</h3>
										<p className="text-xs text-muted-foreground">
											This will permanently delete all
											tracked metrics
										</p>
									</div>
								</div>
								<Button
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
