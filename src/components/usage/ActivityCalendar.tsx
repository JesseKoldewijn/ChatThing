import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
	getDaysInMonth,
	getFriendlyDate,
	getMonths,
	getWeekdays,
} from "@/lib/utils/date";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ActivityCalendarProps {
	events: Array<{ timestamp: number }>;
	startDate: number;
	endDate: number;
	onRangeChange: (start: number, end: number) => void;
	timezone: string;
	firstActivityTimestamp: number | null;
}

export const ActivityCalendar = ({
	events,
	startDate,
	endDate,
	onRangeChange,
	timezone,
	firstActivityTimestamp,
}: ActivityCalendarProps) => {
	// Local state for month navigation in the picker
	// Initialize with a fixed date for SSR consistency
	const [viewDate, setViewDate] = useState(() => {
		const d = new Date("2026-01-01T00:00:00Z");
		return d;
	});

	// Use state to store "today" timestamp to avoid hydration mismatch
	const [todayTs, setTodayTs] = useState<number | null>(null);

	useEffect(() => {
		// Set view date to current month on mount
		const d = new Date();
		d.setUTCHours(0, 0, 0, 0);
		setViewDate(d);

		// Set today's timestamp for the indicator
		const today = new Date();
		today.setUTCHours(0, 0, 0, 0);
		setTodayTs(today.getTime());
	}, []);

	const weekdays = useMemo(() => getWeekdays(), []);
	const months = useMemo(() => getMonths(), []);

	// Activity per day map (simple boolean check for activity)
	const activityMap = useMemo(() => {
		const map = new Set<string>();
		events.forEach((e) => {
			const d = new Date(e.timestamp);
			const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
			map.add(key);
		});
		return map;
	}, [events]);

	const calendarDays = useMemo(() => {
		const year = viewDate.getUTCFullYear();
		const month = viewDate.getUTCMonth();
		const daysInMonth = getDaysInMonth(year, month);
		const firstDayOfMonth = new Date(Date.UTC(year, month, 1)).getUTCDay();

		const days = [];
		// Padding
		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(null);
		}
		// Actual days
		for (let i = 1; i <= daysInMonth; i++) {
			const ts = Date.UTC(year, month, i);
			const key = `${year}-${month}-${i}`;
			const hasActivity = activityMap.has(key);
			const isFirst = firstActivityTimestamp
				? new Date(firstActivityTimestamp).getUTCFullYear() === year &&
					new Date(firstActivityTimestamp).getUTCMonth() === month &&
					new Date(firstActivityTimestamp).getUTCDate() === i
				: false;

			days.push({ ts, hasActivity, isFirst, day: i });
		}
		return days;
	}, [viewDate, activityMap, firstActivityTimestamp]);

	const handlePrevMonth = () => {
		setViewDate(
			new Date(
				Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth() - 1, 1),
			),
		);
	};

	const handleNextMonth = () => {
		setViewDate(
			new Date(
				Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth() + 1, 1),
			),
		);
	};

	const handleDayClick = (ts: number) => {
		if (ts === startDate && ts === endDate) return;

		if (ts < startDate) {
			onRangeChange(ts, endDate);
		} else {
			const endOfDay = new Date(ts);
			endOfDay.setUTCHours(23, 59, 59, 999);
			onRangeChange(startDate, endOfDay.getTime());
		}
	};

	return (
		<div data-testid="activity-calendar" className="space-y-4">
			<div className="flex items-center justify-between px-1">
				<h4
					data-testid="calendar-view-date"
					className="text-muted-foreground text-sm font-bold tracking-wider uppercase"
				>
					{months[viewDate.getUTCMonth()]} {viewDate.getUTCFullYear()}
				</h4>
				<div className="flex gap-1">
					<Button
						data-testid="prev-month-btn"
						variant="ghost"
						size="icon"
						className="h-8 w-8"
						onClick={handlePrevMonth}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						data-testid="next-month-btn"
						variant="ghost"
						size="icon"
						className="h-8 w-8"
						onClick={handleNextMonth}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-7 gap-1 text-center">
				{weekdays.map((d, i) => (
					<div
						key={`${d}-${i}`}
						className="text-muted-foreground/50 py-1 text-[10px] font-bold"
					>
						{d}
					</div>
				))}
				<TooltipProvider delayDuration={0}>
					{calendarDays.map((day, idx) => {
						if (!day) return <div key={`empty-${idx}`} className="h-9 w-9" />;

						const isSelected = day.ts >= startDate && day.ts <= endDate;
						const isToday = todayTs === day.ts;

						return (
							<Tooltip key={day.ts}>
								<TooltipTrigger asChild>
									<button
										data-testid={`calendar-day-${day.day}`}
										onClick={() => handleDayClick(day.ts)}
										className={cn(
											"relative flex h-9 w-9 items-center justify-center rounded-lg text-xs transition-all",
											isSelected
												? "bg-primary text-primary-foreground font-bold shadow-sm"
												: "text-foreground hover:bg-muted/80",
											isToday && !isSelected && "border-primary/30 border",
											day.isFirst && !isSelected && "ring-1 ring-amber-500/50",
										)}
									>
										{day.day}
										{day.hasActivity && !isSelected && (
											<span
												data-testid={`activity-indicator-${day.day}`}
												className="bg-primary/40 absolute bottom-1.5 h-1 w-1 rounded-full"
											/>
										)}
										{day.isFirst && (
											<Sparkles
												data-testid="first-activity-indicator"
												className={cn(
													"absolute -top-0.5 -right-0.5 h-3 w-3",
													isSelected
														? "text-primary-foreground fill-primary-foreground"
														: "fill-amber-500 text-amber-500",
												)}
											/>
										)}
									</button>
								</TooltipTrigger>
								<TooltipContent className="text-[10px]">
									<div className="font-bold">
										{getFriendlyDate(day.ts, timezone)}
									</div>
									{day.hasActivity && <div>Has activity</div>}
									{day.isFirst && (
										<div className="font-bold text-amber-500">
											✨ First ever activity
										</div>
									)}
								</TooltipContent>
							</Tooltip>
						);
					})}
				</TooltipProvider>
			</div>

			<div className="text-muted-foreground flex items-center justify-center gap-4 border-t pt-4 text-[10px] font-bold tracking-tight uppercase">
				<div className="flex items-center gap-1.5">
					<span className="bg-primary/40 h-1.5 w-1.5 rounded-full" />
					<span>Activity</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div className="h-2.5 w-2.5 rounded-sm border border-amber-500" />
					<span>First Activity</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div className="border-primary/30 h-2.5 w-2.5 rounded-sm border" />
					<span>Today</span>
				</div>
			</div>
		</div>
	);
};
