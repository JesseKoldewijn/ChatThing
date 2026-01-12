import { s as __toESM } from "../_rolldown.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router.mjs";
import { t as useStore } from "../_libs/@nanostores/react.mjs";
import { $ as providerTypeAtom, A as encryptedGoogleApiKeyAtom, B as googleModelAtom, Ct as themeAtom, E as createLucideIcon, F as getDecryptedGoogleApiKey, I as getDecryptedOllamaApiKey, K as masterPasswordAtom, L as getDecryptedOpenRouterApiKey, M as encryptedOpenRouterApiKeyAtom, S as confirmAction, St as temperatureUnitAtom, Tt as timezoneAtom, U as isLockedAtom, X as ollamaModelAtom, Y as ollamaBaseUrlAtom, Z as openRouterModelAtom, _t as setTheme, at as setAppearance, bt as showInfo, c as SUPPORTED_PROVIDERS, ct as setGoogleModel, d as appearanceAtom, dt as setOllamaBaseUrl, ft as setOllamaModel, gt as setTemperatureUnit, ht as setProviderType, i as PROVIDER_OLLAMA, j as encryptedOllamaApiKeyAtom, lt as setMasterPassword, mt as setOpenRouterModel, ot as setArchiveThreshold, p as archiveThresholdAtom, pt as setOpenRouterApiKey, rt as resetSecuritySettings, st as setGoogleApiKey, t as Button, ut as setOllamaApiKey, vt as setTimezone, xt as showSuccess, y as cn, yt as showError, z as getSystemTimezone } from "./button-Dt876Ufa.mjs";
import { a as clearAllConversations, d as importConversations, g as runAutoArchive, i as cleanupDeletedConversations, l as exportConversations, o as conversationsAtom, t as TriangleAlert } from "./conversations-DrNMxTDL.mjs";
import "../_libs/react-remove-scroll.mjs";
import { a as Plus, c as fetchOpenRouterModels, d as isLoadingModelsAtom, f as isLoadingOllamaModelsAtom, g as pullOllamaModel, h as openRouterModelsAtom, i as Lock, l as googleModelsAtom, m as ollamaStatusAtom, n as Clock, o as fetchGoogleModels, p as ollamaModelsAtom, r as LoaderCircle, s as fetchOllamaModelsAction, t as Archive, u as isLoadingGoogleModelsAtom } from "./models-0RdEeAZv.mjs";
import { _ as Sparkles, c as MessageSquare, d as ScrollArea, f as Select, g as SelectValue, h as SelectTrigger, m as SelectItem, p as SelectContent, s as Cpu, v as Trash2, w as useNavigation, y as Zap } from "./select-Bf4A7Fuq.mjs";
import { n as Server, r as Skeleton, t as ArrowLeft } from "./skeleton-CuMRR4Jm.mjs";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_react = /* @__PURE__ */ __toESM(require_react());
var Download = createLucideIcon("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]);
var EyeOff = createLucideIcon("eye-off", [
	["path", {
		d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
		key: "ct8e1f"
	}],
	["path", {
		d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
		key: "151rxh"
	}],
	["path", {
		d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
		key: "13bj9a"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]);
var Eye = createLucideIcon("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
var Globe = createLucideIcon("globe", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
		key: "13o1zl"
	}],
	["path", {
		d: "M2 12h20",
		key: "9i4pu4"
	}]
]);
var Key = createLucideIcon("key", [
	["path", {
		d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
		key: "g0fldk"
	}],
	["path", {
		d: "m21 2-9.6 9.6",
		key: "1j0ho8"
	}],
	["circle", {
		cx: "7.5",
		cy: "15.5",
		r: "5.5",
		key: "yqb3hr"
	}]
]);
var Minus = createLucideIcon("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
var Monitor = createLucideIcon("monitor", [
	["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2",
		key: "48i651"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "21",
		y2: "21",
		key: "1svkeh"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "17",
		y2: "21",
		key: "vw1qmm"
	}]
]);
var Moon = createLucideIcon("moon", [["path", {
	d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
	key: "kfwtm"
}]]);
var Sun = createLucideIcon("sun", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "m4.93 4.93 1.41 1.41",
		key: "149t6j"
	}],
	["path", {
		d: "m17.66 17.66 1.41 1.41",
		key: "ptbguv"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "m6.34 17.66-1.41 1.41",
		key: "1m8zz5"
	}],
	["path", {
		d: "m19.07 4.93-1.41 1.41",
		key: "1shlcs"
	}]
]);
var Thermometer = createLucideIcon("thermometer", [["path", {
	d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",
	key: "17jzev"
}]]);
var Upload = createLucideIcon("upload", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m17 8-5-5-5 5",
		key: "7q97r8"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}]
]);
var NumberStepper = ({ id, value, onChange, min = 0, max = 999, step = 1, disabled = false, className, allowManualInput = true, "aria-label": ariaLabel }) => {
	const [inputValue, setInputValue] = (0, import_react.useState)(String(value));
	(0, import_react.useEffect)(() => {
		setInputValue(String(value));
	}, [value]);
	const clamp = (0, import_react.useCallback)((val) => Math.min(max, Math.max(min, val)), [min, max]);
	const handleIncrement = () => {
		onChange(clamp(value + step));
	};
	const handleDecrement = () => {
		onChange(clamp(value - step));
	};
	const handleInputChange = (e) => {
		const newValue = e.target.value;
		if (newValue === "" || /^\d*$/.test(newValue)) setInputValue(newValue);
	};
	const handleInputBlur = () => {
		const parsed = parseInt(inputValue, 10);
		if (isNaN(parsed)) setInputValue(String(value));
		else {
			const clamped = clamp(parsed);
			onChange(clamped);
			setInputValue(String(clamped));
		}
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleInputBlur();
		else if (e.key === "ArrowUp") {
			e.preventDefault();
			handleIncrement();
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			handleDecrement();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex items-center rounded-lg border border-input bg-background", "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				id: `${id}-decrement`,
				type: "button",
				onClick: handleDecrement,
				disabled: disabled || value <= min,
				"aria-label": "Decrease value",
				className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-l-md transition-colors text-foreground", "hover:bg-muted disabled:pointer-events-none disabled:opacity-50", "focus:outline-none"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-border" }),
			allowManualInput ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: `${id}-input`,
				type: "text",
				inputMode: "numeric",
				value: inputValue,
				onChange: handleInputChange,
				onBlur: handleInputBlur,
				onKeyDown: handleKeyDown,
				disabled,
				"aria-label": ariaLabel || "Value",
				className: cn("h-9 w-12 bg-transparent text-center text-sm font-medium text-foreground", "focus:outline-none disabled:pointer-events-none disabled:opacity-50", "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-9 w-12 items-center justify-center text-sm font-medium text-foreground",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				id: `${id}-increment`,
				type: "button",
				onClick: handleIncrement,
				disabled: disabled || value >= max,
				"aria-label": "Increase value",
				className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-r-md transition-colors text-foreground", "hover:bg-muted disabled:pointer-events-none disabled:opacity-50", "focus:outline-none"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
			})
		]
	});
};
var UNIT_OPTIONS = [
	{
		value: "hours",
		label: "Hours"
	},
	{
		value: "days",
		label: "Days"
	},
	{
		value: "weeks",
		label: "Weeks"
	},
	{
		value: "months",
		label: "Months"
	}
];
var COMMON_TIMEZONES = [
	{
		value: "America/New_York",
		label: "New York (EST/EDT)"
	},
	{
		value: "America/Chicago",
		label: "Chicago (CST/CDT)"
	},
	{
		value: "America/Denver",
		label: "Denver (MST/MDT)"
	},
	{
		value: "America/Los_Angeles",
		label: "Los Angeles (PST/PDT)"
	},
	{
		value: "America/Toronto",
		label: "Toronto (EST/EDT)"
	},
	{
		value: "America/Vancouver",
		label: "Vancouver (PST/PDT)"
	},
	{
		value: "America/Mexico_City",
		label: "Mexico City (CST)"
	},
	{
		value: "America/Sao_Paulo",
		label: "São Paulo (BRT)"
	},
	{
		value: "Europe/London",
		label: "London (GMT/BST)"
	},
	{
		value: "Europe/Paris",
		label: "Paris (CET/CEST)"
	},
	{
		value: "Europe/Berlin",
		label: "Berlin (CET/CEST)"
	},
	{
		value: "Europe/Amsterdam",
		label: "Amsterdam (CET/CEST)"
	},
	{
		value: "Europe/Madrid",
		label: "Madrid (CET/CEST)"
	},
	{
		value: "Europe/Rome",
		label: "Rome (CET/CEST)"
	},
	{
		value: "Europe/Moscow",
		label: "Moscow (MSK)"
	},
	{
		value: "Asia/Dubai",
		label: "Dubai (GST)"
	},
	{
		value: "Asia/Kolkata",
		label: "Mumbai (IST)"
	},
	{
		value: "Asia/Singapore",
		label: "Singapore (SGT)"
	},
	{
		value: "Asia/Hong_Kong",
		label: "Hong Kong (HKT)"
	},
	{
		value: "Asia/Shanghai",
		label: "Shanghai (CST)"
	},
	{
		value: "Asia/Tokyo",
		label: "Tokyo (JST)"
	},
	{
		value: "Asia/Seoul",
		label: "Seoul (KST)"
	},
	{
		value: "Australia/Sydney",
		label: "Sydney (AEST/AEDT)"
	},
	{
		value: "Australia/Melbourne",
		label: "Melbourne (AEST/AEDT)"
	},
	{
		value: "Pacific/Auckland",
		label: "Auckland (NZST/NZDT)"
	},
	{
		value: "UTC",
		label: "UTC"
	}
];
var SettingsSection = ({ icon: Icon, title, description, children, variant = "default", testId }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-testid": testId,
	className: cn("rounded-xl border p-4 sm:p-5", variant === "danger" ? "border-destructive/30 bg-destructive/5" : "bg-card"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", variant === "danger" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: cn("text-sm font-semibold", variant === "danger" && "text-destructive"),
				children: title
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: description
			})]
		})]
	}), children]
});
var Progress = ({ value, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full bg-primary transition-all duration-300",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
});
var SettingsPageUI = ({ isHydrated = false, currentAppearance, currentTheme, temperatureUnit, timezone, systemTimezone, providerType, encryptedOpenRouterApiKey, unlockedOpenRouterApiKey, encryptedGoogleApiKey, unlockedGoogleApiKey, encryptedOllamaApiKey, unlockedOllamaApiKey, openRouterModel, openRouterModels, googleModel, googleModels, isLoadingGoogleModels, isLocked, masterPassword, ollamaModel, ollamaBaseUrl, ollamaModels, ollamaStatus, isLoadingOllamaModels, isPulling, pullProgress, isLoadingModels, activeCount, archivedCount, deletedCount, archiveThreshold, isImporting, onAppearanceChange, onThemeChange, onTemperatureUnitChange, onTimezoneChange, onProviderTypeChange, onMasterPasswordChange, onResetSecurity, onOpenRouterApiKeyChange, onOpenRouterModelChange, onGoogleApiKeyChange, onOllamaApiKeyChange, onGoogleModelChange, onOllamaModelChange, onOllamaBaseUrlChange, onCheckOllama, onPullModel, onArchiveThresholdChange, onExport, onImport, onClearAll, onCleanupDeleted, onBack }) => {
	const fileInputRef = (0, import_react.useRef)(null);
	const suggestionsRef = (0, import_react.useRef)(null);
	const ollamaSuggestionsRef = (0, import_react.useRef)(null);
	const [showSuggestions, setShowSuggestions] = (0, import_react.useState)(false);
	const [showOllamaSuggestions, setShowOllamaSuggestions] = (0, import_react.useState)(false);
	const [showApiKey, setShowApiKey] = (0, import_react.useState)(false);
	const [passwordInput, setPasswordInput] = (0, import_react.useState)("");
	const isUnlocked = !!masterPassword;
	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		if (passwordInput) {
			onMasterPasswordChange(passwordInput);
			setPasswordInput("");
		}
	};
	const handleLock = () => {
		onMasterPasswordChange(null);
	};
	const filteredModels = (0, import_react.useMemo)(() => {
		const models = (openRouterModels || []).filter((m) => m && (m.id || m.name));
		if (!openRouterModel) return models.slice(0, 20);
		const search = openRouterModel.toLowerCase();
		return models.filter((m) => m.id && m.id.toLowerCase().includes(search) || m.name && m.name.toLowerCase().includes(search)).slice(0, 20);
	}, [openRouterModels, openRouterModel]);
	const filteredOllamaModels = (0, import_react.useMemo)(() => {
		const models = (ollamaModels || []).filter((m) => m && (m.name || m.model));
		if (!ollamaModel) return models.slice(0, 20);
		const search = ollamaModel.toLowerCase();
		return models.filter((m) => m.name && m.name.toLowerCase().includes(search) || m.model && m.model.toLowerCase().includes(search)).slice(0, 20);
	}, [ollamaModels, ollamaModel]);
	const isOllamaModelInstalled = (0, import_react.useMemo)(() => {
		return (ollamaModels || []).some((m) => m && (m.name === ollamaModel || m.model === ollamaModel));
	}, [ollamaModels, ollamaModel]);
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (event) => {
			if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) setShowSuggestions(false);
			if (ollamaSuggestionsRef.current && !ollamaSuggestionsRef.current.contains(event.target)) setShowOllamaSuggestions(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const handleFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			onImport(file, "merge");
			e.target.value = "";
		}
	};
	const totalConversations = activeCount + archivedCount + deletedCount;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "settings-page",
		className: "flex h-screen flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			"data-testid": "settings-header",
			className: "flex h-14 shrink-0 items-center gap-2 border-b px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-testid": "settings-back-button",
				variant: "ghost",
				size: "icon",
				onClick: onBack,
				className: "h-10 w-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-testid": "settings-title",
				className: "text-lg font-semibold",
				children: "Settings"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-lg space-y-4 p-4 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => e.preventDefault(),
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
							icon: Sun,
							title: "Appearance",
							description: "Choose your preferred color mode",
							testId: "settings-section-appearance",
							children: !isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									1,
									2,
									3
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[42px] flex-1 min-w-[90px] rounded-lg" }, i))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									{
										value: "light",
										icon: Sun,
										label: "Light"
									},
									{
										value: "dark",
										icon: Moon,
										label: "Dark"
									},
									{
										value: "system",
										icon: Monitor,
										label: "System"
									}
								].map(({ value, icon: ThemeIcon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: `appearance-button-${value}`,
									type: "button",
									"data-testid": `appearance-button-${value}`,
									onClick: () => onAppearanceChange(value),
									className: cn("flex flex-1 min-w-[90px] items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all", currentAppearance === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, { className: "h-4 w-4" }), label]
								}, value))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
							icon: Sparkles,
							title: "Theme",
							description: "Select a color palette for the interface",
							testId: "settings-section-theme",
							children: !isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[42px] flex-1 min-w-[120px] rounded-lg" }, i))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [{
									value: "default",
									icon: Zap,
									label: "Default"
								}, {
									value: "vibrant",
									icon: Sparkles,
									label: "Vibrant"
								}].map(({ value, icon: ThemeIcon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: `theme-button-${value}`,
									type: "button",
									"data-testid": `theme-button-${value}`,
									onClick: () => onThemeChange(value),
									className: cn("flex flex-1 min-w-[120px] items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all", currentTheme === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, { className: "h-4 w-4" }), label]
								}, value))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
							icon: Thermometer,
							title: "Temperature Units",
							description: "Choose how temperatures are displayed",
							testId: "settings-section-temperature",
							children: !isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									1,
									2,
									3
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[58px] flex-1 min-w-[90px] rounded-lg" }, i))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									{
										value: "auto",
										label: "Auto",
										description: "Based on your locale"
									},
									{
										value: "fahrenheit",
										label: "°F",
										description: "Fahrenheit"
									},
									{
										value: "celsius",
										label: "°C",
										description: "Celsius"
									}
								].map(({ value, label, description }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: `temp-unit-button-${value}`,
									type: "button",
									"data-testid": `temp-unit-button-${value}`,
									onClick: () => onTemperatureUnitChange(value),
									className: cn("flex flex-1 min-w-[90px] flex-col items-center justify-center gap-0.5 rounded-lg border px-4 py-2.5 transition-all", temperatureUnit === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-[10px]", temperatureUnit === value ? "text-primary-foreground/70" : "text-muted-foreground"),
										children: description
									})]
								}, value))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
							icon: Globe,
							title: "Timezone",
							description: "Set your preferred timezone for date/time display",
							testId: "settings-section-timezone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [!isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[66px] w-full rounded-lg" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"data-testid": "timezone-auto-button",
									onClick: () => onTimezoneChange("auto"),
									className: cn("flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-all", timezone === "auto" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: "Auto (System)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-xs flex items-center h-4", timezone === "auto" ? "text-primary-foreground/70" : "text-muted-foreground"),
											children: systemTimezone ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-3 w-24 animate-pulse rounded bg-current/20" })
										})]
									}), timezone === "auto" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium",
										children: "Selected"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "timezone-select",
										className: "text-xs text-muted-foreground",
										children: "Or choose a specific timezone:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										name: "timezone",
										disabled: !isHydrated,
										value: timezone === "auto" ? "" : timezone,
										onValueChange: (value) => onTimezoneChange(value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "timezone-select",
											"data-testid": "timezone-select-trigger",
											className: "w-full bg-background text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select timezone..." })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: COMMON_TIMEZONES.map((tz) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: tz.value,
											children: tz.label
										}, tz.value)) })]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
							icon: Lock,
							title: "Security",
							description: "Manage your master password to lock/unlock API keys",
							testId: "settings-section-security",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Enter your master password to unlock and manage your API keys."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													name: "username",
													value: "ai-chat-user",
													readOnly: true,
													autoComplete: "username",
													className: "sr-only",
													"aria-hidden": "true",
													tabIndex: -1
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													value: passwordInput,
													onChange: (e) => setPasswordInput(e.target.value),
													placeholder: "Master Password",
													autoComplete: "current-password",
													className: "flex-1 rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none",
													onKeyDown: (e) => e.key === "Enter" && handlePasswordSubmit(e)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													onClick: handlePasswordSubmit,
													disabled: !passwordInput,
													children: "Unlock"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: onResetSecurity,
											className: "text-[10px] text-destructive hover:underline self-start",
											children: "Forgot password? Reset security settings"
										})
									]
								}) : isUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4 rounded-lg bg-green-500/10 p-3 border border-green-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-green-600 dark:text-green-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-current animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium",
												children: "Session Unlocked"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: handleLock,
												className: "h-8",
												children: "Lock"
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2 pt-2 border-t",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: "Forgotten your password? You can reset it, but this will erase all stored API keys."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: onResetSecurity,
											className: "h-8 text-destructive hover:text-destructive hover:bg-destructive/10 self-start",
											children: "Reset Master Password"
										})]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Set a master password to encrypt your API keys. This password is only stored in memory for the current session."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												name: "username",
												value: "ai-chat-user",
												readOnly: true,
												autoComplete: "username",
												className: "sr-only",
												"aria-hidden": "true",
												tabIndex: -1
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												value: passwordInput,
												onChange: (e) => setPasswordInput(e.target.value),
												placeholder: "New Master Password",
												autoComplete: "new-password",
												className: "flex-1 rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none",
												onKeyDown: (e) => e.key === "Enter" && handlePasswordSubmit(e)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												onClick: handlePasswordSubmit,
												disabled: !passwordInput,
												children: "Set Password"
											})
										]
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
							icon: Zap,
							title: "AI Provider",
							description: "Choose which AI backend to use",
							testId: "settings-section-ai-provider",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [!isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[58px] flex-1 min-w-[120px] rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[58px] flex-1 min-w-[120px] rounded-lg" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: SUPPORTED_PROVIDERS.map(({ id, label, description }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										id: `provider-button-${id}`,
										type: "button",
										"data-testid": `provider-button-${id}`,
										onClick: () => onProviderTypeChange(id),
										className: cn("flex flex-1 min-w-[120px] flex-col items-center justify-center gap-0.5 rounded-lg border px-4 py-2.5 transition-all", providerType === id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-[10px]", providerType === id ? "text-primary-foreground/70" : "text-muted-foreground"),
											children: description
										})]
									}, id))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-h-[220px]",
									children: !isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 rounded-lg bg-muted/50 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-3.5 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-16" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-12" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 flex-1 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-16 rounded-md" })]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-3.5 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-12" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full rounded-md" })]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full",
										children: providerType === "open-router" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4 rounded-lg bg-muted/50 p-4 animate-in fade-in duration-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
															children: "API Key"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: showApiKey ? "text" : "password",
															value: unlockedOpenRouterApiKey || "",
															onChange: (e) => onOpenRouterApiKeyChange(e.target.value),
															disabled: isLocked,
															autoComplete: "off",
															placeholder: encryptedOpenRouterApiKey ? "•••••••• (Saved)" : "sk-or-...",
															className: "w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
														}), !isLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setShowApiKey(!showApiKey),
															className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
															children: showApiKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
														})]
													}),
													isLocked && encryptedOpenRouterApiKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-muted-foreground",
														children: "Unlock session to manage this key"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
															children: "Model"
														})]
													}), isLoadingModels && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-muted-foreground" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													ref: suggestionsRef,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: openRouterModel,
														onChange: (e) => {
															onOpenRouterModelChange(e.target.value);
															setShowSuggestions(true);
														},
														onFocus: () => setShowSuggestions(true),
														autoComplete: "openRouter-llm-model",
														placeholder: "google/gemini-2.0-flash-exp:free",
														className: "w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
													}), showSuggestions && filteredModels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95",
														children: filteredModels.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => {
																onOpenRouterModelChange(m.id);
																setShowSuggestions(false);
															},
															className: "w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "font-medium",
																children: m.name || m.id
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[10px] text-muted-foreground",
																children: m.id
															})]
														}, m.id))
													})]
												})]
											})]
										}) : providerType === "google" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4 rounded-lg bg-muted/50 p-4 animate-in fade-in duration-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
															children: "API Key"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: showApiKey ? "text" : "password",
															value: unlockedGoogleApiKey || "",
															onChange: (e) => onGoogleApiKeyChange(e.target.value),
															disabled: isLocked,
															autoComplete: "off",
															placeholder: encryptedGoogleApiKey ? "•••••••• (Saved)" : "Enter Gemini API Key",
															className: "w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
														}), !isLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setShowApiKey(!showApiKey),
															className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
															children: showApiKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
														})]
													}),
													isLocked && encryptedGoogleApiKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-muted-foreground",
														children: "Unlock session to manage this key"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
															children: "Model"
														})]
													}), isLoadingGoogleModels && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-muted-foreground" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													value: googleModel,
													onValueChange: (value) => onGoogleModelChange(value),
													disabled: googleModels.length === 0 && !isLoadingGoogleModels,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														className: "w-full bg-background",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: isLoadingGoogleModels ? "Loading models..." : googleModels.length > 0 ? "Select model..." : "Enter API key to load models" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: googleModels.length > 0 ? googleModels.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: m.id,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex flex-col",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] text-muted-foreground line-clamp-1",
																children: m.description
															})]
														})
													}, m.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "gemini-2.0-flash-exp",
														children: "Gemini 2.0 Flash Exp (Default)"
													}) })]
												})]
											})]
										}) : providerType === "ollama" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4 rounded-lg bg-muted/50 p-4 animate-in fade-in duration-300",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
																children: "API Key (Optional)"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "relative",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: showApiKey ? "text" : "password",
																value: unlockedOllamaApiKey || "",
																onChange: (e) => onOllamaApiKeyChange(e.target.value),
																disabled: isLocked,
																autoComplete: "off",
																placeholder: encryptedOllamaApiKey ? "•••••••• (Saved)" : "Optional key for proxies",
																className: "w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
															}), !isLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => setShowApiKey(!showApiKey),
																className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
																children: showApiKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
															})]
														}),
														isLocked && encryptedOllamaApiKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[10px] text-muted-foreground",
															children: "Unlock session to manage this key"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
																children: "Base URL"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [
																ollamaStatus === "checking" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-muted-foreground" }),
																ollamaStatus === "available" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), "Online"]
																}),
																ollamaStatus === "unavailable" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-destructive",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), "Offline"]
																})
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															value: ollamaBaseUrl,
															onChange: (e) => onOllamaBaseUrlChange(e.target.value),
															autoComplete: "ollama-base-url",
															placeholder: "http://localhost:11434",
															className: "flex-1 rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															type: "button",
															variant: "outline",
															size: "sm",
															className: "h-9 px-3",
															onClick: onCheckOllama,
															disabled: ollamaStatus === "checking" || !ollamaBaseUrl,
															children: "Check"
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
																children: "Model"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [isLoadingOllamaModels && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-muted-foreground" }), isOllamaModelInstalled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider",
																children: "Installed"
															})]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "relative",
														ref: ollamaSuggestionsRef,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "relative flex-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	value: ollamaModel,
																	onChange: (e) => {
																		onOllamaModelChange(e.target.value);
																		setShowOllamaSuggestions(true);
																	},
																	onFocus: () => setShowOllamaSuggestions(true),
																	autoComplete: "ollama-llm-model",
																	placeholder: "deepseek-r1:1.5b",
																	className: "w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
																}), showOllamaSuggestions && filteredOllamaModels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95",
																	children: filteredOllamaModels.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																		type: "button",
																		onClick: () => {
																			onOllamaModelChange(m.name || m.model);
																			setShowOllamaSuggestions(false);
																		},
																		className: "w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "font-medium",
																			children: m.name || m.model
																		}), m.details?.parameter_size && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "text-[10px] text-muted-foreground",
																			children: [m.details.parameter_size, " parameters"]
																		})]
																	}, m.name || m.model))
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																type: "button",
																size: "sm",
																variant: isOllamaModelInstalled ? "outline" : "default",
																className: "h-9 gap-2 px-3",
																onClick: onPullModel,
																disabled: isPulling || !ollamaModel,
																children: [isPulling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "hidden sm:inline",
																	children: isOllamaModelInstalled ? "Update" : "Pull"
																})]
															})]
														})
													})]
												}),
												isPulling && pullProgress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2 bg-background/50 p-3 rounded-lg border border-primary/20 animate-in slide-in-from-top-2 duration-300",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between text-[10px] font-bold uppercase tracking-wider",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-primary truncate mr-2",
															children: pullProgress.status
														}), pullProgress.total && pullProgress.total > 0 && pullProgress.completed !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-muted-foreground",
															children: [Math.round(pullProgress.completed / pullProgress.total * 100), "%"]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pullProgress.total && pullProgress.total > 0 && pullProgress.completed !== void 0 ? pullProgress.completed / pullProgress.total * 100 : 0 })]
												})
											]
										}) : providerType === "prompt-api" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4 rounded-lg bg-muted/50 p-4 animate-in fade-in duration-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "rounded-full bg-primary/10 p-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-sm font-semibold",
													children: "Browser Built-in AI"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Using Gemini Nano running directly in your browser."
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-md border border-primary/20 bg-primary/5 p-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] leading-relaxed text-primary/80",
													children: "This provider uses your device's hardware and doesn't require an internet connection or API keys."
												})
											})]
										}) : null
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
							icon: Clock,
							title: "Auto-Archive",
							description: "Archive inactive chats automatically",
							testId: "settings-section-auto-archive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "auto-archive-switch",
											className: "text-sm font-medium text-foreground cursor-pointer",
											children: "Auto-archive inactive chats"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											id: "auto-archive-switch",
											type: "button",
											"data-testid": "auto-archive-toggle",
											disabled: !isHydrated,
											onClick: () => onArchiveThresholdChange({
												value: archiveThreshold.value === 0 ? 2 : 0,
												unit: archiveThreshold.unit
											}),
											className: cn("relative h-6 w-11 shrink-0 rounded-full border-2 transition-colors", archiveThreshold.value > 0 ? "border-primary bg-primary" : "border-muted-foreground/30 bg-muted", !isHydrated && "opacity-70"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute left-0.5 top-0.5 h-4 w-4 rounded-full shadow-md transition-transform", archiveThreshold.value > 0 ? "translate-x-5 bg-primary-foreground" : "bg-foreground dark:bg-muted-foreground") })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("overflow-hidden transition-all duration-300 ease-in-out", archiveThreshold.value > 0 ? "h-[60px] opacity-100 mt-4" : "h-0 opacity-0"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("flex items-center justify-between gap-3 rounded-lg bg-muted/50 p-3", !isHydrated && "opacity-70"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "archive-threshold-value",
												className: "text-sm text-muted-foreground",
												children: "Archive after"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberStepper, {
													id: "archive-threshold-value",
													value: archiveThreshold.value,
													disabled: !isHydrated,
													onChange: (value) => onArchiveThresholdChange({
														value: Math.max(1, value),
														unit: archiveThreshold.unit
													}),
													min: 1,
													max: 999,
													allowManualInput: true
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													name: "archive-threshold-unit",
													disabled: !isHydrated,
													value: archiveThreshold.unit,
													onValueChange: (unit) => onArchiveThresholdChange({
														value: archiveThreshold.value,
														unit
													}),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														id: "archive-threshold-unit",
														className: "h-9 w-[100px] bg-background text-foreground",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: UNIT_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: option.value,
														children: option.label
													}, option.value)) })]
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "min-h-[16px]",
										children: archiveThreshold.value > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground mt-2 animate-in fade-in duration-300",
											children: [
												"Chats inactive for",
												" ",
												archiveThreshold.value,
												" ",
												archiveThreshold.value === 1 ? archiveThreshold.unit.slice(0, -1) : archiveThreshold.unit,
												" ",
												"will be archived automatically."
											]
										})
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsSection, {
							icon: MessageSquare,
							title: "Chat History",
							description: "Manage your conversation data",
							testId: "settings-section-chat-history",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 grid grid-cols-3 gap-2",
									children: [
										{
											id: "active",
											label: "Active",
											count: activeCount,
											bg: "bg-muted/50",
											text: "text-foreground"
										},
										{
											id: "archived",
											label: "Archived",
											count: archivedCount,
											bg: "bg-amber-500/10",
											text: "text-amber-600 dark:text-amber-400"
										},
										{
											id: "deleted",
											label: "In Trash",
											count: deletedCount,
											bg: "bg-destructive/10",
											text: "text-destructive"
										}
									].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-testid": `stat-${stat.id}`,
										className: cn("rounded-lg p-3 text-center min-h-[68px] flex flex-col justify-center", stat.bg),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-testid": `stat-${stat.id}-count`,
											className: cn("text-lg font-semibold h-7 flex items-center justify-center", stat.text),
											children: !isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-8" }) : stat.count
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground",
											children: stat.label
										})]
									}, stat.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileInputRef,
									type: "file",
									accept: ".json",
									className: "hidden",
									onChange: handleFileSelect,
									"data-testid": "import-file-input"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-testid": "export-button",
										variant: "outline",
										size: "sm",
										onClick: onExport,
										disabled: activeCount + archivedCount === 0,
										className: "gap-2",
										type: "button",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Export"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-testid": "import-button",
										variant: "outline",
										size: "sm",
										onClick: () => fileInputRef.current?.click(),
										disabled: isImporting,
										className: "gap-2",
										type: "button",
										children: [isImporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), "Import"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-muted-foreground",
									children: "Export creates a backup file. Deleted chats are excluded."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
							icon: Archive,
							title: "Trash",
							description: "Manage deleted conversations",
							testId: "settings-section-trash",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-testid": "trash-status",
									className: "text-sm text-muted-foreground flex items-center h-9",
									children: !isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-32" }) : deletedCount === 0 ? "Trash is empty" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										deletedCount,
										" item",
										deletedCount !== 1 ? "s" : "",
										" in trash"
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-testid": "empty-trash-button",
									variant: "outline",
									size: "sm",
									onClick: onCleanupDeleted,
									disabled: deletedCount === 0,
									className: "gap-2 text-destructive hover:text-destructive hover:bg-destructive/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), "Empty Trash"]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
							icon: TriangleAlert,
							title: "Danger Zone",
							description: "Irreversible actions",
							variant: "danger",
							testId: "settings-section-danger-zone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-testid": "delete-all-description",
									className: "text-sm text-muted-foreground flex items-center h-9",
									children: !isHydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-48" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										"Delete all ",
										totalConversations,
										" ",
										"conversation",
										totalConversations !== 1 ? "s" : ""
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-testid": "delete-all-button",
									variant: "destructive",
									size: "sm",
									onClick: onClearAll,
									disabled: !isHydrated || totalConversations === 0,
									className: "gap-2",
									type: "button",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), "Delete All"]
								})]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4" })]
			})
		})]
	});
};
var EMPTY_ARRAY = [];
var DEFAULT_THRESHOLD = {
	value: 2,
	unit: "days"
};
var SettingsPage = () => {
	const { goBack } = useNavigation();
	const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
	const rawAppearance = useStore(appearanceAtom);
	const rawTheme = useStore(themeAtom);
	const rawConversations = useStore(conversationsAtom);
	const rawArchiveThreshold = useStore(archiveThresholdAtom);
	const rawTemperatureUnit = useStore(temperatureUnitAtom);
	const rawTimezone = useStore(timezoneAtom);
	const rawProviderType = useStore(providerTypeAtom);
	const rawMasterPassword = useStore(masterPasswordAtom);
	const rawEncryptedOpenRouterApiKey = useStore(encryptedOpenRouterApiKeyAtom);
	const rawEncryptedGoogleApiKey = useStore(encryptedGoogleApiKeyAtom);
	const rawEncryptedOllamaApiKey = useStore(encryptedOllamaApiKeyAtom);
	const rawOpenRouterModel = useStore(openRouterModelAtom);
	const rawGoogleModel = useStore(googleModelAtom);
	const rawOllamaModel = useStore(ollamaModelAtom);
	const rawOllamaBaseUrl = useStore(ollamaBaseUrlAtom);
	const openRouterModels = useStore(openRouterModelsAtom);
	const isLoadingModels = useStore(isLoadingModelsAtom);
	const googleModels = useStore(googleModelsAtom);
	const isLoadingGoogleModels = useStore(isLoadingGoogleModelsAtom);
	const isLocked = useStore(isLockedAtom);
	const ollamaModels = useStore(ollamaModelsAtom);
	const isLoadingOllamaModels = useStore(isLoadingOllamaModelsAtom);
	const ollamaStatus = useStore(ollamaStatusAtom);
	const [isImporting, setIsImporting] = (0, import_react.useState)(false);
	const [pullProgress, setPullProgress] = (0, import_react.useState)(null);
	const [isPulling, setIsPulling] = (0, import_react.useState)(false);
	const [unlockedOpenRouterApiKey, setUnlockedOpenRouterApiKey] = (0, import_react.useState)(null);
	const [unlockedGoogleApiKey, setUnlockedGoogleApiKey] = (0, import_react.useState)(null);
	const [unlockedOllamaApiKey, setUnlockedOllamaApiKey] = (0, import_react.useState)(null);
	const currentAppearance = hasMounted ? rawAppearance : "system";
	const currentTheme = hasMounted ? rawTheme : "default";
	const conversations = hasMounted ? rawConversations : EMPTY_ARRAY;
	const archiveThreshold = hasMounted ? rawArchiveThreshold : DEFAULT_THRESHOLD;
	const temperatureUnit = hasMounted ? rawTemperatureUnit : "auto";
	const timezone = hasMounted ? rawTimezone : "auto";
	const providerType = hasMounted ? rawProviderType : PROVIDER_OLLAMA;
	const masterPassword = hasMounted ? rawMasterPassword : null;
	const encryptedOpenRouterApiKey = hasMounted ? rawEncryptedOpenRouterApiKey : null;
	const encryptedGoogleApiKey = hasMounted ? rawEncryptedGoogleApiKey : null;
	const encryptedOllamaApiKey = hasMounted ? rawEncryptedOllamaApiKey : null;
	const openRouterModel = hasMounted ? rawOpenRouterModel : "mistralai/devstral-2512:free";
	const googleModel = hasMounted ? rawGoogleModel : "gemini-2.0-flash-exp";
	const ollamaModel = hasMounted ? rawOllamaModel : "deepseek-r1:1.5b";
	const ollamaBaseUrl = hasMounted ? rawOllamaBaseUrl : "http://localhost:11434";
	(0, import_react.useEffect)(() => {
		const unlock = async () => {
			if (masterPassword) try {
				const orKey = await getDecryptedOpenRouterApiKey(masterPassword);
				const gKey = await getDecryptedGoogleApiKey(masterPassword);
				const olKey = await getDecryptedOllamaApiKey(masterPassword);
				setUnlockedOpenRouterApiKey(orKey);
				setUnlockedGoogleApiKey(gKey);
				setUnlockedOllamaApiKey(olKey);
				if (orKey) fetchOpenRouterModels();
				if (gKey) fetchGoogleModels();
			} catch (error) {
				console.error("Failed to unlock keys:", error);
				setMasterPassword(null);
				showError("Failed to unlock. Incorrect password?");
			}
			else {
				setUnlockedOpenRouterApiKey(null);
				setUnlockedGoogleApiKey(null);
				setUnlockedOllamaApiKey(null);
			}
		};
		unlock();
	}, [masterPassword]);
	const [systemTimezone, setSystemTimezone] = (0, import_react.useState)(null);
	const handleCheckOllama = (0, import_react.useCallback)(async () => {
		await fetchOllamaModelsAction();
	}, []);
	const refreshOllamaModels = (0, import_react.useCallback)(async () => {
		await fetchOllamaModelsAction();
	}, []);
	(0, import_react.useEffect)(() => {
		const init = async () => {
			try {
				setSystemTimezone(getSystemTimezone());
				await fetchOpenRouterModels();
			} catch (error) {
				console.error("Failed to initialize settings page:", error);
			} finally {
				setHasMounted(true);
			}
		};
		init();
	}, []);
	(0, import_react.useEffect)(() => {
		if (hasMounted && providerType === "ollama") refreshOllamaModels();
	}, [
		ollamaBaseUrl,
		providerType,
		hasMounted,
		refreshOllamaModels
	]);
	const { activeCount, archivedCount, deletedCount } = (0, import_react.useMemo)(() => {
		if (!hasMounted) return {
			activeCount: 0,
			archivedCount: 0,
			deletedCount: 0
		};
		return {
			activeCount: conversations.filter((c) => c.status === "active").length,
			archivedCount: conversations.filter((c) => c.status === "archived").length,
			deletedCount: conversations.filter((c) => c.status === "deleted").length
		};
	}, [conversations, hasMounted]);
	const handleAppearanceChange = (0, import_react.useCallback)((appearance) => {
		setAppearance(appearance);
	}, []);
	const handleThemeChange = (0, import_react.useCallback)((theme) => {
		setTheme(theme);
	}, []);
	const handleTemperatureUnitChange = (0, import_react.useCallback)((unit) => {
		setTemperatureUnit(unit);
	}, []);
	const handleTimezoneChange = (0, import_react.useCallback)((tz) => {
		setTimezone(tz);
	}, []);
	const handleProviderTypeChange = (0, import_react.useCallback)((type) => {
		setProviderType(type);
	}, []);
	const handleMasterPasswordChange = (0, import_react.useCallback)((password) => {
		setMasterPassword(password);
	}, []);
	const handleResetSecurity = (0, import_react.useCallback)(() => {
		confirmAction({
			title: "Reset Security Settings",
			message: "Are you sure you want to reset your master password? All stored API keys will be deleted and you will need to re-enter them with a new password.",
			confirmText: "Reset Everything",
			variant: "destructive",
			onConfirm: () => {
				resetSecuritySettings();
				showSuccess("Security settings reset successfully.");
			}
		});
	}, []);
	const handleOpenRouterApiKeyChange = (0, import_react.useCallback)(async (key) => {
		await setOpenRouterApiKey(key);
		setUnlockedOpenRouterApiKey(key);
		if (key) fetchOpenRouterModels();
	}, []);
	const handleGoogleApiKeyChange = (0, import_react.useCallback)(async (key) => {
		await setGoogleApiKey(key);
		setUnlockedGoogleApiKey(key);
		if (key) fetchGoogleModels();
	}, []);
	const handleOllamaApiKeyChange = (0, import_react.useCallback)(async (key) => {
		await setOllamaApiKey(key);
		setUnlockedOllamaApiKey(key);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPageUI, {
		isHydrated: hasMounted,
		currentAppearance,
		currentTheme,
		temperatureUnit,
		timezone,
		systemTimezone,
		providerType,
		encryptedOpenRouterApiKey,
		unlockedOpenRouterApiKey,
		encryptedGoogleApiKey,
		unlockedGoogleApiKey,
		encryptedOllamaApiKey,
		unlockedOllamaApiKey,
		openRouterModel,
		openRouterModels,
		googleModel,
		googleModels,
		isLoadingGoogleModels,
		isLocked,
		masterPassword,
		ollamaModel,
		ollamaBaseUrl,
		ollamaModels,
		ollamaStatus,
		isLoadingOllamaModels,
		isPulling,
		pullProgress,
		isLoadingModels,
		activeCount,
		archivedCount,
		deletedCount,
		archiveThreshold,
		isImporting,
		onAppearanceChange: handleAppearanceChange,
		onThemeChange: handleThemeChange,
		onTemperatureUnitChange: handleTemperatureUnitChange,
		onTimezoneChange: handleTimezoneChange,
		onProviderTypeChange: handleProviderTypeChange,
		onMasterPasswordChange: handleMasterPasswordChange,
		onResetSecurity: handleResetSecurity,
		onOpenRouterApiKeyChange: handleOpenRouterApiKeyChange,
		onOpenRouterModelChange: (0, import_react.useCallback)((model) => {
			setOpenRouterModel(model);
		}, []),
		onGoogleApiKeyChange: handleGoogleApiKeyChange,
		onOllamaApiKeyChange: handleOllamaApiKeyChange,
		onGoogleModelChange: (0, import_react.useCallback)((model) => {
			setGoogleModel(model);
		}, []),
		onOllamaModelChange: (0, import_react.useCallback)((model) => {
			setOllamaModel(model);
		}, []),
		onOllamaBaseUrlChange: (0, import_react.useCallback)((url) => {
			setOllamaBaseUrl(url);
		}, []),
		onCheckOllama: handleCheckOllama,
		onPullModel: (0, import_react.useCallback)(async () => {
			if (isPulling) return;
			setIsPulling(true);
			setPullProgress(null);
			try {
				await pullOllamaModel(ollamaBaseUrl, ollamaModel, (progress) => {
					setPullProgress(progress);
				});
				showSuccess("Model pulled successfully!");
				refreshOllamaModels();
			} catch (error) {
				console.error("Failed to pull model:", error);
				showError(`Failed to pull model: ${error instanceof Error ? error.message : String(error)}`);
			} finally {
				setIsPulling(false);
				setPullProgress(null);
			}
		}, [
			ollamaBaseUrl,
			ollamaModel,
			isPulling,
			refreshOllamaModels
		]),
		onArchiveThresholdChange: (0, import_react.useCallback)((threshold) => {
			setArchiveThreshold(threshold);
			if (threshold.value > 0) {
				const archivedCount$1 = runAutoArchive();
				if (archivedCount$1 > 0) showInfo(`${archivedCount$1} conversation${archivedCount$1 !== 1 ? "s" : ""} were archived based on the new threshold.`);
			}
		}, []),
		onExport: (0, import_react.useCallback)(() => {
			exportConversations();
		}, []),
		onImport: (0, import_react.useCallback)(async (file, mode) => {
			setIsImporting(true);
			try {
				const result = await importConversations(file, mode);
				if (result.success) showSuccess(`Successfully imported ${result.imported} conversation${result.imported !== 1 ? "s" : ""}.`);
				else showError(`Import failed: ${result.error}`);
			} finally {
				setIsImporting(false);
			}
		}, []),
		onClearAll: (0, import_react.useCallback)(() => {
			confirmAction({
				title: "Delete All Conversations",
				message: "Are you sure you want to delete ALL conversations? This includes active, archived, and deleted chats. This cannot be undone.",
				confirmText: "Delete Everything",
				variant: "destructive",
				onConfirm: () => {
					clearAllConversations();
					showSuccess("All conversations deleted.");
				}
			});
		}, []),
		onCleanupDeleted: (0, import_react.useCallback)(async () => {
			confirmAction({
				title: "Empty Trash",
				message: `Permanently delete ${deletedCount} conversation${deletedCount !== 1 ? "s" : ""} from trash? This cannot be undone.`,
				confirmText: "Empty Trash",
				variant: "destructive",
				onConfirm: async () => {
					const cleaned = await cleanupDeletedConversations();
					showSuccess(`${cleaned} conversation${cleaned !== 1 ? "s" : ""} permanently deleted.`);
				}
			});
		}, [deletedCount]),
		onBack: (0, import_react.useCallback)(() => {
			goBack();
		}, [goBack])
	});
};
var SplitComponent = SettingsPage;
export { SplitComponent as component };
