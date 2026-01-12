import { s as __toESM } from "../_rolldown.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router.mjs";
import { t as useStore } from "../_libs/@nanostores/react.mjs";
import { E as createLucideIcon, S as confirmAction, Tt as timezoneAtom, c as SUPPORTED_PROVIDERS, t as Button, xt as showSuccess, y as cn } from "./button-Dt876Ufa.mjs";
import { a as getEarliestEventTimestamp, i as getAggregatedUsageForRange, n as clearUsageData, o as getEventsInRange, p as usageEventsAtom, s as getUsageSummaryForRange } from "./usage-xUoNdpW5.mjs";
import "../_libs/react-remove-scroll.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-DVq_I_k4.mjs";
import { _ as Sparkles, a as ChevronUp, c as MessageSquare, d as ScrollArea, f as Select, g as SelectValue, h as SelectTrigger, i as ChevronDown, m as SelectItem, p as SelectContent, s as Cpu, v as Trash2, w as useNavigation, y as Zap } from "./select-Bf4A7Fuq.mjs";
import { a as TooltipContent, i as Tooltip, n as ChartColumn, o as TooltipProvider, r as ChevronRight, s as TooltipTrigger, t as Bot } from "./tooltip-DsN8bmnd.mjs";
import { n as Server, r as Skeleton, t as ArrowLeft } from "./skeleton-CuMRR4Jm.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as Tooltip$1, r as XAxis, s as ResponsiveContainer, t as AreaChart } from "../_libs/recharts.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/d3-format.mjs";
import { i as getSortedRowModel, n as useReactTable, r as getCoreRowModel, t as flexRender } from "../_libs/@tanstack/react-table.mjs";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_react = /* @__PURE__ */ __toESM(require_react());
var Calendar = createLucideIcon("calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]);
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
var ChevronsUpDown = createLucideIcon("chevrons-up-down", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]);
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
var Wrench = createLucideIcon("wrench", [["path", {
	d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
	key: "1ngwbx"
}]]);
var formatInTimezone = (timestamp, timezone, options = {
	includeTime: true,
	compact: true
}) => {
	const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
	try {
		return new Intl.DateTimeFormat("en-GB", {
			timeZone: timezone === "auto" ? void 0 : timezone,
			day: "2-digit",
			month: "2-digit",
			year: options.compact ? "2-digit" : "numeric",
			hour: options.includeTime ? "2-digit" : void 0,
			minute: options.includeTime ? "2-digit" : void 0,
			hour12: false
		}).format(date).replace(",", "");
	} catch (error) {
		console.error("Error formatting date in timezone:", error, {
			timestamp,
			timezone
		});
		return date.toLocaleString();
	}
};
var getDaysInMonth = (year, month) => {
	return new Date(year, month + 1, 0).getDate();
};
var getWeekdays = (locale = "en-US") => {
	const baseDate = new Date(Date.UTC(2017, 0, 1));
	const weekdays = [];
	for (let i = 0; i < 7; i++) {
		const dayName = new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(baseDate);
		weekdays.push(dayName);
		baseDate.setUTCDate(baseDate.getUTCDate() + 1);
	}
	return weekdays;
};
var getMonths = (locale = "en-US") => {
	const baseDate = new Date(Date.UTC(2017, 0, 1));
	const months = [];
	for (let i = 0; i < 12; i++) {
		months.push(new Intl.DateTimeFormat(locale, { month: "long" }).format(baseDate));
		baseDate.setUTCMonth(baseDate.getUTCMonth() + 1);
	}
	return months;
};
var formatDateByGranularity = (timestamp, timezone, granularity) => {
	const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
	try {
		const options = { timeZone: timezone === "auto" ? void 0 : timezone };
		switch (granularity) {
			case "minute":
				options.month = "short";
				options.day = "numeric";
				options.hour = "2-digit";
				options.minute = "2-digit";
				options.hour12 = false;
				break;
			case "hour":
				options.month = "short";
				options.day = "numeric";
				options.hour = "2-digit";
				options.hour12 = false;
				break;
			case "day":
				options.month = "short";
				options.day = "numeric";
				break;
			case "month":
				options.month = "long";
				options.year = "numeric";
				break;
			case "year":
				options.year = "numeric";
				break;
			default:
				options.month = "short";
				options.day = "numeric";
		}
		return new Intl.DateTimeFormat("en-US", options).format(date);
	} catch {
		return date.toLocaleDateString();
	}
};
var getFriendlyDate = (timestamp, timezone) => {
	const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
	try {
		return new Intl.DateTimeFormat("en-US", {
			timeZone: timezone === "auto" ? void 0 : timezone,
			month: "short",
			day: "numeric"
		}).format(date);
	} catch {
		return date.toLocaleDateString();
	}
};
var ActivityCalendar = ({ events, startDate, endDate, onRangeChange, timezone, firstActivityTimestamp }) => {
	const [viewDate, setViewDate] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const weekdays = (0, import_react.useMemo)(() => getWeekdays(), []);
	const months = (0, import_react.useMemo)(() => getMonths(), []);
	const activityMap = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Set();
		events.forEach((e) => {
			const d = new Date(e.timestamp);
			const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
			map.add(key);
		});
		return map;
	}, [events]);
	const calendarDays = (0, import_react.useMemo)(() => {
		const year = viewDate.getUTCFullYear();
		const month = viewDate.getUTCMonth();
		const daysInMonth = getDaysInMonth(year, month);
		const firstDayOfMonth = new Date(Date.UTC(year, month, 1)).getUTCDay();
		const days = [];
		for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
		for (let i = 1; i <= daysInMonth; i++) {
			const ts = Date.UTC(year, month, i);
			const key = `${year}-${month}-${i}`;
			const hasActivity = activityMap.has(key);
			const isFirst = firstActivityTimestamp ? new Date(firstActivityTimestamp).getUTCFullYear() === year && new Date(firstActivityTimestamp).getUTCMonth() === month && new Date(firstActivityTimestamp).getUTCDate() === i : false;
			days.push({
				ts,
				hasActivity,
				isFirst,
				day: i
			});
		}
		return days;
	}, [
		viewDate,
		activityMap,
		firstActivityTimestamp
	]);
	const handlePrevMonth = () => {
		setViewDate(new Date(Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth() - 1, 1)));
	};
	const handleNextMonth = () => {
		setViewDate(new Date(Date.UTC(viewDate.getUTCFullYear(), viewDate.getUTCMonth() + 1, 1)));
	};
	const handleDayClick = (ts) => {
		if (ts === startDate && ts === endDate) return;
		if (ts < startDate) onRangeChange(ts, endDate);
		else {
			const endOfDay = new Date(ts);
			endOfDay.setUTCHours(23, 59, 59, 999);
			onRangeChange(startDate, endOfDay.getTime());
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "activity-calendar",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					"data-testid": "calendar-view-date",
					className: "text-sm font-bold uppercase tracking-wider text-muted-foreground",
					children: [
						months[viewDate.getUTCMonth()],
						" ",
						viewDate.getUTCFullYear()
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-testid": "prev-month-btn",
						variant: "ghost",
						size: "icon",
						className: "h-8 w-8",
						onClick: handlePrevMonth,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-testid": "next-month-btn",
						variant: "ghost",
						size: "icon",
						className: "h-8 w-8",
						onClick: handleNextMonth,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-7 gap-1 text-center",
				children: [weekdays.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-bold text-muted-foreground/50 py-1",
					children: d
				}, `${d}-${i}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
					delayDuration: 0,
					children: calendarDays.map((day, idx) => {
						if (!day) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-9" }, `empty-${idx}`);
						const isSelected = day.ts >= startDate && day.ts <= endDate;
						const isToday = (/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0) === day.ts;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"data-testid": `calendar-day-${day.day}`,
								onClick: () => handleDayClick(day.ts),
								className: cn("relative flex h-9 w-9 items-center justify-center rounded-lg text-xs transition-all", isSelected ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-foreground hover:bg-muted/80", isToday && !isSelected && "border border-primary/30", day.isFirst && !isSelected && "ring-1 ring-amber-500/50"),
								children: [
									day.day,
									day.hasActivity && !isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-testid": `activity-indicator-${day.day}`,
										className: "absolute bottom-1.5 h-1 w-1 rounded-full bg-primary/40"
									}),
									day.isFirst && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										"data-testid": "first-activity-indicator",
										className: cn("absolute -right-0.5 -top-0.5 h-3 w-3", isSelected ? "text-primary-foreground fill-primary-foreground" : "text-amber-500 fill-amber-500")
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
							className: "text-[10px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold",
									children: getFriendlyDate(day.ts, timezone)
								}),
								day.hasActivity && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Has activity" }),
								day.isFirst && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-amber-500 font-bold",
									children: "✨ First ever activity"
								})
							]
						})] }, day.ts);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-4 border-t pt-4 text-[10px] font-bold uppercase tracking-tight text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Activity" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-2.5 rounded-sm border border-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "First Activity" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-2.5 rounded-sm border border-primary/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Today" })]
					})
				]
			})
		]
	});
};
var HeroStat = ({ icon: Icon, label, value, subLabel, gradient, testId, isLoading = false }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-testid": testId,
	className: cn("relative overflow-hidden rounded-2xl p-5", "bg-linear-to-br", gradient),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-white/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-white/80",
					children: label
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-24 bg-white/20" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-testid": testId ? `${testId}-value` : void 0,
				className: "text-4xl font-bold tracking-tight text-white",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 h-4",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-32 bg-white/10" }) : subLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-white/60",
					children: subLabel
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute -bottom-4 -right-4 opacity-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-24 w-24 text-white" })
	})]
});
var BreakdownList = ({ title, icon: Icon, data, color, isLoading = false, labelMap }) => {
	const sortedData = (0, import_react.useMemo)(() => {
		return Object.entries(data).sort((a, b) => b[1] - a[1]);
	}, [data]);
	const total = (0, import_react.useMemo)(() => {
		return Object.values(data).reduce((acc, curr) => acc + curr, 0);
	}, [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card/50 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("rounded-lg p-1.5", color),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: title
			})]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: [
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-full rounded-md" }, i))
		}) : sortedData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: sortedData.map(([name, count]) => {
				const percentage = total > 0 ? count / total * 100 : 0;
				const displayName = labelMap ? labelMap[name] || name : name;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-medium text-foreground",
							title: displayName,
							children: displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-muted-foreground",
							children: count.toLocaleString()
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full transition-all duration-500", color.replace("/10", "")),
							style: { width: `${percentage}%` }
						})
					})]
				}, name);
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-24 flex-col items-center justify-center text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs",
				children: "No data yet"
			})
		})]
	});
};
var CustomTooltip = ({ active, payload, label }) => {
	if (!active || !payload || payload.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-popover/95 px-4 py-3 shadow-xl backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-sm font-semibold text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-1",
			children: payload.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2.5 w-2.5 rounded-full",
						style: { backgroundColor: entry.color }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: entry.name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium tabular-nums",
					style: { color: entry.color },
					children: entry.value.toLocaleString()
				})]
			}, index))
		})]
	});
};
var SortableHeader = ({ column, children }) => {
	const sorted = column.getIsSorted();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "flex items-center gap-1.5 text-left font-medium hover:text-foreground transition-colors",
		onClick: () => column.toggleSorting(sorted === "asc"),
		children: [children, sorted === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3.5 w-3.5" }) : sorted === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "h-3.5 w-3.5 opacity-50" })]
	});
};
var UsagePageUI = ({ isHydrated = false, summary, chartData, chartKeys, tableData, onBack, onClearData, timezone, startDate, endDate, onRangeChange, firstActivityTimestamp, chartView, onChartViewChange, granularity, onGranularityChange, allEvents }) => {
	const [sorting, setSorting] = (0, import_react.useState)([{
		id: "timestamp",
		desc: true
	}]);
	const totalTokens = summary.totalInputTokens + summary.totalOutputTokens;
	const table = useReactTable({
		data: tableData,
		columns: (0, import_react.useMemo)(() => [
			{
				accessorKey: "timestamp",
				header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableHeader, {
					column,
					children: "Time"
				}),
				cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: row.original.displayTime
				})
			},
			{
				accessorKey: "type",
				header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableHeader, {
					column,
					children: "Event"
				}),
				cell: ({ row }) => {
					const type = row.original.type;
					if (row.original.isAggregated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-foreground",
						children: type
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							type === "message" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3 w-3 text-blue-500" }),
							type === "response" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-3 w-3 text-emerald-500" }),
							type === "tool_call" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-3 w-3 text-amber-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize text-xs font-medium",
								children: type.replace("_", " ")
							})
						]
					});
				}
			},
			{
				accessorKey: "provider",
				header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableHeader, {
					column,
					children: "Provider"
				}),
				cell: ({ row }) => {
					if (row.original.isAggregated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground truncate block max-w-[150px]",
						title: row.original.provider,
						children: row.original.provider
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex items-center rounded-md bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-medium text-indigo-500 ring-1 ring-inset ring-indigo-500/20",
						children: SUPPORTED_PROVIDERS.find((p) => p.id === row.original.provider)?.label || row.original.provider
					});
				}
			},
			{
				accessorKey: "model",
				header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableHeader, {
					column,
					children: "Model"
				}),
				cell: ({ row }) => {
					if (row.original.isAggregated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground truncate block max-w-[150px]",
						title: row.original.model,
						children: row.original.model
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex items-center rounded-md bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-medium text-purple-500 ring-1 ring-inset ring-purple-500/20 max-w-[120px] truncate",
						children: row.original.model
					});
				}
			},
			{
				accessorKey: "tool",
				header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableHeader, {
					column,
					children: "Tool"
				}),
				cell: ({ row }) => row.original.tool ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-500 ring-1 ring-inset ring-amber-500/20",
					children: row.original.tool
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground/30",
					children: "—"
				})
			},
			{
				accessorKey: "value",
				header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableHeader, {
					column,
					children: "Usage"
				}),
				cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums font-semibold",
					children: [
						row.original.value.toLocaleString(),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground font-normal",
							children: row.original.unit
						})
					]
				})
			}
		], []),
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});
	const hasData = allEvents.length > 0;
	const colors = [
		"#3b82f6",
		"#10b981",
		"#f59e0b",
		"#8b5cf6",
		"#ec4899",
		"#f43f5e",
		"#06b6d4",
		"#84cc16",
		"#eab308",
		"#6366f1"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "usage-page",
		className: "flex h-screen flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			"data-testid": "usage-header",
			className: "flex h-14 shrink-0 items-center gap-3 border-b px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-testid": "usage-back-button",
				variant: "ghost",
				size: "icon",
				onClick: onBack,
				className: "h-9 w-9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-purple-600",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-white" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-testid": "usage-title",
					className: "text-base font-semibold leading-none",
					children: "Usage Analytics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-testid": "usage-subtitle",
					className: "text-[11px] text-muted-foreground",
					children: "Track your AI interactions"
				})] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border bg-card p-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold",
								children: "Activity Period"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-medium text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-muted/50 px-1.5 py-0.5",
										children: new Intl.DateTimeFormat("en-GB", {
											day: "2-digit",
											month: "short",
											year: "numeric"
										}).format(new Date(startDate))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-50",
										children: "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-muted/50 px-1.5 py-0.5",
										children: new Intl.DateTimeFormat("en-GB", {
											day: "2-digit",
											month: "short",
											year: "numeric"
										}).format(new Date(endDate))
									})
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "h-9 gap-2 px-4 shadow-sm hover:bg-muted/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Change Range" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
								className: "sm:max-w-[400px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Select Activity Range" }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityCalendar, {
											events: allEvents,
											startDate,
											endDate,
											onRangeChange,
											timezone,
											firstActivityTimestamp
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2 border-t pt-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => {
													const end = Date.now();
													onRangeChange(end - 10080 * 60 * 1e3, end);
												},
												className: "h-8 text-xs px-3",
												children: "Last 7d"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => {
													const end = Date.now();
													onRangeChange(end - 720 * 60 * 60 * 1e3, end);
												},
												className: "h-8 text-xs px-3",
												children: "Last 30d"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => {
													const end = Date.now();
													onRangeChange(end - 2160 * 60 * 60 * 1e3, end);
												},
												className: "h-8 text-xs px-3",
												children: "Last 90d"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => {
													if (firstActivityTimestamp) onRangeChange(firstActivityTimestamp, Date.now());
												},
												className: "h-8 text-xs px-3",
												children: "All Time"
											})
										]
									})
								]
							})] })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-testid": "usage-section-overview",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-testid": "usage-overview-title",
								className: "text-sm font-semibold text-foreground",
								children: "Overview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-testid": "usage-estimated-tokens-note",
								className: "text-xs text-muted-foreground",
								children: "(for selected range)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
									testId: "hero-stat-total-tokens",
									icon: Zap,
									label: "Total Tokens",
									value: totalTokens.toLocaleString(),
									subLabel: `${summary.totalInputTokens.toLocaleString()} in · ${summary.totalOutputTokens.toLocaleString()} out`,
									gradient: "from-violet-600 to-purple-700",
									isLoading: !isHydrated
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
									testId: "hero-stat-conversations",
									icon: MessageSquare,
									label: "Conversations",
									value: summary.totalMessages,
									subLabel: `${summary.totalResponses} AI responses`,
									gradient: "from-blue-600 to-cyan-600",
									isLoading: !isHydrated
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
									testId: "hero-stat-tool-calls",
									icon: Wrench,
									label: "Tool Calls",
									value: summary.totalToolCalls,
									subLabel: Object.keys(summary.toolBreakdown).length > 0 ? Object.entries(summary.toolBreakdown).slice(0, 3).map(([t, c]) => `${t}: ${c}`).join(" · ") : "No tools used",
									gradient: "from-amber-500 to-orange-600",
									isLoading: !isHydrated
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-testid": "usage-section-breakdowns",
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownList, {
								title: "AI Providers",
								icon: Server,
								data: summary.providerBreakdown,
								color: "bg-indigo-500/10 text-indigo-500",
								isLoading: !isHydrated,
								labelMap: Object.fromEntries(SUPPORTED_PROVIDERS.map((p) => [p.id, p.label]))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownList, {
								title: "AI Models",
								icon: Cpu,
								data: summary.modelBreakdown,
								color: "bg-purple-500/10 text-purple-500",
								isLoading: !isHydrated
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownList, {
								title: "Tools Used",
								icon: Wrench,
								data: summary.toolBreakdown,
								color: "bg-amber-500/10 text-amber-500",
								isLoading: !isHydrated
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-testid": "usage-section-chart",
						className: "rounded-2xl border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-testid": "chart-title",
								className: "text-sm font-semibold text-foreground",
								children: "Activity Visualization"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-testid": "chart-subtitle",
								className: "text-xs text-muted-foreground",
								children: "Trend for selected range"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: granularity,
									onValueChange: (v) => onGranularityChange(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-8 w-[130px] text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Granularity" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "auto",
											children: "Auto"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "interaction",
											children: "Interaction"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "minute",
											children: "Per Minute"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "hour",
											children: "Per Hour"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "day",
											children: "Per Day"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "month",
											children: "Per Month"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "year",
											children: "Per Year"
										})
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: chartView,
									onValueChange: (v) => onChartViewChange(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-8 w-[150px] text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select view" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "volume",
											children: "Interaction Volume"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "providers",
											children: "By Provider"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "models",
											children: "By Model"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "tools",
											children: "By Tool"
										})
									] })]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4",
							children: !isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[300px] w-full" }) : hasData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[300px] w-full animate-in fade-in duration-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
										data: chartData,
										margin: {
											top: 10,
											right: 10,
											left: -20,
											bottom: 0
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												vertical: false,
												className: "stroke-border/30"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "displayDate",
												tick: { fontSize: 10 },
												tickLine: false,
												axisLine: false,
												className: "fill-muted-foreground",
												interval: "preserveStartEnd",
												dy: 8
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												tick: { fontSize: 10 },
												tickLine: false,
												axisLine: false,
												className: "fill-muted-foreground",
												allowDecimals: false,
												width: 35
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip$1, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTooltip, {}) }),
											chartKeys.map((key, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: key,
												stackId: "1",
												stroke: colors[index % colors.length],
												fill: colors[index % colors.length],
												fillOpacity: .4,
												strokeWidth: 2
											}, key))
										]
									})
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-testid": "chart-empty-state",
								className: "flex h-[300px] flex-col items-center justify-center gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-10 w-10 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: "No data for this range"
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-testid": "usage-section-table",
						className: "rounded-2xl border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-testid": "table-title",
								className: "text-sm font-semibold text-foreground",
								children: "Interaction History"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-testid": "table-subtitle",
								className: "text-xs text-muted-foreground",
								children: "Individual events for the selected period"
							})]
						}), tableData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								"data-testid": "usage-table",
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									className: "border-b bg-muted/30",
									children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-muted-foreground",
										children: flexRender(header.column.columnDef.header, header.getContext())
									}, header.id))
								}, headerGroup.id)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: table.getRowModel().rows.map((row, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									className: cn("border-b last:border-0 transition-colors hover:bg-muted/20", idx % 2 === 0 ? "bg-transparent" : "bg-muted/10"),
									children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "whitespace-nowrap px-4 py-3",
										children: flexRender(cell.column.columnDef.cell, cell.getContext())
									}, cell.id))
								}, row.id)) })]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-testid": "table-empty-state",
							className: "flex h-40 flex-col items-center justify-center gap-2 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: "No events found in this range"
							})
						})]
					}),
					hasData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						"data-testid": "usage-section-danger-zone",
						className: "rounded-2xl border border-destructive/20 bg-destructive/5 p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-destructive/10 p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-testid": "clear-data-title",
									className: "text-sm font-semibold text-destructive",
									children: "Clear All Usage Data"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-testid": "clear-data-description",
									className: "text-xs text-muted-foreground",
									children: "This will permanently delete all tracked metrics"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-testid": "clear-data-button",
								variant: "destructive",
								size: "sm",
								onClick: onClearData,
								className: "gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Clear Data"]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6" })
				]
			})
		})]
	});
};
var UsagePage = () => {
	const { goBack } = useNavigation();
	const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
	const [range, setRange] = (0, import_react.useState)(() => {
		const end = Date.now();
		return [end - 720 * 60 * 60 * 1e3, end];
	});
	const [chartView, setChartView] = (0, import_react.useState)("volume");
	const [granularity, setGranularity] = (0, import_react.useState)("auto");
	const activeGranularity = (0, import_react.useMemo)(() => {
		if (granularity !== "auto") return granularity;
		const duration = range[1] - range[0];
		if (duration < 3600 * 1e3) return "minute";
		if (duration < 2880 * 60 * 1e3) return "hour";
		if (duration > 365 * 24 * 60 * 60 * 1e3) return "month";
		return "day";
	}, [range, granularity]);
	(0, import_react.useEffect)(() => {
		setHasMounted(true);
		const earliest = getEarliestEventTimestamp();
		if (earliest) {
			const thirtyDaysAgo = Date.now() - 720 * 60 * 60 * 1e3;
			setRange([Math.max(earliest, thirtyDaysAgo), Date.now()]);
		}
	}, []);
	const events = useStore(usageEventsAtom);
	const timezone = useStore(timezoneAtom);
	const summary = (0, import_react.useMemo)(() => {
		if (!hasMounted) return {
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
			dailyUsage: []
		};
		return getUsageSummaryForRange(range[0], range[1]);
	}, [range, hasMounted]);
	const chartDataFull = (0, import_react.useMemo)(() => {
		if (!hasMounted) return [];
		return getAggregatedUsageForRange(range[0], range[1], activeGranularity).map((day) => {
			const dateStr = day.date.includes(" ") ? day.date.replace(" ", "T") : day.date.length === 4 ? `${day.date}-01-01` : day.date.length === 7 ? `${day.date}-01` : day.date;
			const timestamp = new Date(dateStr).getTime();
			const data = {
				date: day.date,
				displayDate: activeGranularity === "interaction" ? formatInTimezone(timestamp, timezone, {
					includeTime: true,
					compact: true
				}) : formatDateByGranularity(timestamp, timezone, activeGranularity)
			};
			if (chartView === "volume") {
				data.Messages = day.messageCount;
				data.Responses = day.responseCount;
				data.Tools = day.toolCallCount;
			} else if (chartView === "providers") Object.assign(data, day.providerBreakdown);
			else if (chartView === "models") Object.assign(data, day.modelBreakdown);
			else if (chartView === "tools") Object.assign(data, day.toolBreakdown);
			return data;
		});
	}, [
		range,
		chartView,
		timezone,
		hasMounted,
		activeGranularity
	]);
	const chartKeys = (0, import_react.useMemo)(() => {
		if (chartDataFull.length === 0) return [];
		const keys = /* @__PURE__ */ new Set();
		chartDataFull.forEach((point) => {
			Object.keys(point).forEach((key) => {
				if (key !== "date" && key !== "displayDate") keys.add(key);
			});
		});
		return Array.from(keys);
	}, [chartDataFull]);
	const tableData = (0, import_react.useMemo)(() => {
		if (!hasMounted) return [];
		if (activeGranularity === "interaction") return getEventsInRange(range[0], range[1]).map((event) => ({
			id: event.id,
			timestamp: event.timestamp,
			displayTime: formatInTimezone(event.timestamp, timezone),
			type: event.type,
			provider: event.provider,
			model: event.model,
			tool: event.toolName,
			value: event.characterCount || 1,
			unit: event.type === "tool_call" ? "call" : "chars",
			isAggregated: false
		}));
		else return getAggregatedUsageForRange(range[0], range[1], activeGranularity).map((day) => {
			const dateStr = day.date.includes(" ") ? day.date.replace(" ", "T") : day.date.length === 4 ? `${day.date}-01-01` : day.date.length === 7 ? `${day.date}-01` : day.date;
			const timestamp = new Date(dateStr).getTime();
			return {
				id: day.date,
				timestamp,
				displayTime: formatDateByGranularity(timestamp, timezone, activeGranularity),
				type: `${day.messageCount} msg / ${day.responseCount} res`,
				provider: Object.keys(day.providerBreakdown).join(", "),
				model: Object.keys(day.modelBreakdown).join(", "),
				tool: day.toolCallCount > 0 ? `${day.toolCallCount} calls` : void 0,
				value: day.totalCharacters,
				unit: "chars",
				isAggregated: true
			};
		});
	}, [
		range,
		hasMounted,
		timezone,
		activeGranularity
	]);
	const handleBack = (0, import_react.useCallback)(() => {
		goBack();
	}, [goBack]);
	const handleClearData = (0, import_react.useCallback)(() => {
		confirmAction({
			title: "Clear Usage Data",
			message: "Are you sure you want to clear all usage data? This cannot be undone.",
			confirmText: "Clear Data",
			variant: "destructive",
			onConfirm: () => {
				clearUsageData();
				showSuccess("Usage data cleared.");
			}
		});
	}, []);
	const handleRangeChange = (0, import_react.useCallback)((start, end) => {
		setRange([start, end]);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsagePageUI, {
		isHydrated: hasMounted,
		summary,
		chartData: chartDataFull,
		chartKeys,
		tableData,
		onBack: handleBack,
		onClearData: handleClearData,
		timezone,
		startDate: range[0],
		endDate: range[1],
		onRangeChange: handleRangeChange,
		firstActivityTimestamp: getEarliestEventTimestamp(),
		chartView,
		onChartViewChange: setChartView,
		granularity,
		onGranularityChange: setGranularity,
		allEvents: events
	});
};
var SplitComponent = UsagePage;
export { SplitComponent as component };
