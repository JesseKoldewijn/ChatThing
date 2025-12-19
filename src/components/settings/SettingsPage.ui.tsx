import { useRef, useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NumberStepper } from "@/components/ui/number-stepper";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ArrowLeft,
	Sun,
	Moon,
	Monitor,
	Download,
	Upload,
	Trash2,
	Loader2,
	Clock,
	MessageSquare,
	Archive,
	AlertTriangle,
	Thermometer,
	Globe,
	Zap,
	Key,
	Cpu,
	Eye,
	EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
	Theme,
	ArchiveThreshold,
	ArchiveThresholdUnit,
	TemperatureUnit,
	TimezonePreference,
	ProviderType,
} from "@/lib/stores/settings";
import type { OpenRouterModel } from "@/lib/ai/open-router/models";

export interface SettingsPageUIProps {
	isHydrated?: boolean;
	currentTheme: Theme;
	temperatureUnit: TemperatureUnit;
	timezone: TimezonePreference;
	systemTimezone: string | null;
	providerType: ProviderType;
	openRouterApiKey: string;
	openRouterModel: string;
	openRouterModels: OpenRouterModel[];
	isLoadingModels: boolean;
	activeCount: number;
	archivedCount: number;
	deletedCount: number;
	archiveThreshold: ArchiveThreshold;
	isImporting: boolean;
	onThemeChange: (theme: Theme) => void;
	onTemperatureUnitChange: (unit: TemperatureUnit) => void;
	onTimezoneChange: (timezone: TimezonePreference) => void;
	onProviderTypeChange: (type: ProviderType) => void;
	onOpenRouterApiKeyChange: (key: string) => void;
	onOpenRouterModelChange: (model: string) => void;
	onArchiveThresholdChange: (threshold: ArchiveThreshold) => void;
	onExport: () => void;
	onImport: (file: File, mode: "merge" | "replace") => void;
	onClearAll: () => void;
	onCleanupDeleted: () => void;
	onBack: () => void;
}

const UNIT_OPTIONS: { value: ArchiveThresholdUnit; label: string }[] = [
	{ value: "hours", label: "Hours" },
	{ value: "days", label: "Days" },
	{ value: "weeks", label: "Weeks" },
	{ value: "months", label: "Months" },
];

// Common timezones for the dropdown
const COMMON_TIMEZONES = [
	{ value: "America/New_York", label: "New York (EST/EDT)" },
	{ value: "America/Chicago", label: "Chicago (CST/CDT)" },
	{ value: "America/Denver", label: "Denver (MST/MDT)" },
	{ value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
	{ value: "America/Toronto", label: "Toronto (EST/EDT)" },
	{ value: "America/Vancouver", label: "Vancouver (PST/PDT)" },
	{ value: "America/Mexico_City", label: "Mexico City (CST)" },
	{ value: "America/Sao_Paulo", label: "São Paulo (BRT)" },
	{ value: "Europe/London", label: "London (GMT/BST)" },
	{ value: "Europe/Paris", label: "Paris (CET/CEST)" },
	{ value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
	{ value: "Europe/Amsterdam", label: "Amsterdam (CET/CEST)" },
	{ value: "Europe/Madrid", label: "Madrid (CET/CEST)" },
	{ value: "Europe/Rome", label: "Rome (CET/CEST)" },
	{ value: "Europe/Moscow", label: "Moscow (MSK)" },
	{ value: "Asia/Dubai", label: "Dubai (GST)" },
	{ value: "Asia/Kolkata", label: "Mumbai (IST)" },
	{ value: "Asia/Singapore", label: "Singapore (SGT)" },
	{ value: "Asia/Hong_Kong", label: "Hong Kong (HKT)" },
	{ value: "Asia/Shanghai", label: "Shanghai (CST)" },
	{ value: "Asia/Tokyo", label: "Tokyo (JST)" },
	{ value: "Asia/Seoul", label: "Seoul (KST)" },
	{ value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
	{ value: "Australia/Melbourne", label: "Melbourne (AEST/AEDT)" },
	{ value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" },
	{ value: "UTC", label: "UTC" },
];

// Reusable section card component
const SettingsSection = ({
	icon: Icon,
	title,
	description,
	children,
	variant = "default",
	testId,
}: {
	icon: React.ElementType;
	title: string;
	description?: string;
	children: React.ReactNode;
	variant?: "default" | "danger";
	testId?: string;
}) => (
	<div
		data-testid={testId}
		className={cn(
			"rounded-xl border p-4 sm:p-5",
			variant === "danger"
				? "border-destructive/30 bg-destructive/5"
				: "bg-card"
		)}
	>
		<div className="mb-4 flex items-start gap-3">
			<div
				className={cn(
					"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
					variant === "danger"
						? "bg-destructive/10 text-destructive"
						: "bg-muted text-muted-foreground"
				)}
			>
				<Icon className="h-4 w-4" />
			</div>
			<div className="min-w-0 flex-1">
				<h3
					className={cn(
						"text-sm font-semibold",
						variant === "danger" && "text-destructive"
					)}
				>
					{title}
				</h3>
				{description && (
					<p className="mt-0.5 text-xs text-muted-foreground">
						{description}
					</p>
				)}
			</div>
		</div>
		{children}
	</div>
);

export const SettingsPageUI = ({
	isHydrated = false,
	currentTheme,
	temperatureUnit,
	timezone,
	systemTimezone,
	providerType,
	openRouterApiKey,
	openRouterModel,
	openRouterModels,
	isLoadingModels,
	activeCount,
	archivedCount,
	deletedCount,
	archiveThreshold,
	isImporting,
	onThemeChange,
	onTemperatureUnitChange,
	onTimezoneChange,
	onProviderTypeChange,
	onOpenRouterApiKeyChange,
	onOpenRouterModelChange,
	onArchiveThresholdChange,
	onExport,
	onImport,
	onClearAll,
	onCleanupDeleted,
	onBack,
}: SettingsPageUIProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLDivElement>(null);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [showApiKey, setShowApiKey] = useState(false);

	const filteredModels = useMemo(() => {
		if (!openRouterModel) return openRouterModels.slice(0, 20);
		const search = openRouterModel.toLowerCase();
		return openRouterModels
			.filter(
				(m) =>
					m.id.toLowerCase().includes(search) ||
					m.name.toLowerCase().includes(search)
			)
			.slice(0, 20);
	}, [openRouterModels, openRouterModel]);

	// Close suggestions when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onImport(file, "merge");
			e.target.value = "";
		}
	};

	const totalConversations = activeCount + archivedCount + deletedCount;

	return (
		<div
			data-testid="settings-page"
			className="flex h-screen flex-col bg-background"
		>
			{/* Header */}
			<header
				data-testid="settings-header"
				className="flex h-14 shrink-0 items-center gap-2 border-b px-3"
			>
				<Button
					data-testid="settings-back-button"
					variant="ghost"
					size="icon"
					onClick={onBack}
					className="h-10 w-10"
				>
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<h1
					data-testid="settings-title"
					className="text-lg font-semibold"
				>
					Settings
				</h1>
			</header>

			{/* Content */}
			<ScrollArea className="flex-1">
				<div className="mx-auto w-full max-w-lg space-y-4 p-4 sm:p-6">
					<form
						onSubmit={(e) => e.preventDefault()}
						className="space-y-4"
					>
						{/* Appearance */}
						<SettingsSection
							icon={Sun}
							title="Appearance"
							description="Choose your preferred color theme"
							testId="settings-section-appearance"
						>
							{!isHydrated ? (
								<div className="flex flex-wrap gap-2">
									{[1, 2, 3].map((i) => (
										<Skeleton
											key={i}
											className="h-[42px] flex-1 min-w-[90px] rounded-lg"
										/>
									))}
								</div>
							) : (
								<div className="flex flex-wrap gap-2">
									{[
										{
											value: "light" as Theme,
											icon: Sun,
											label: "Light",
										},
										{
											value: "dark" as Theme,
											icon: Moon,
											label: "Dark",
										},
										{
											value: "system" as Theme,
											icon: Monitor,
											label: "System",
										},
									].map(
										({ value, icon: ThemeIcon, label }) => (
											<button
												key={value}
												id={`theme-button-${value}`}
												type="button"
												data-testid={`theme-button-${value}`}
												onClick={() =>
													onThemeChange(value)
												}
												className={cn(
													"flex flex-1 min-w-[90px] items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
													currentTheme === value
														? "border-primary bg-primary text-primary-foreground"
														: "border-border bg-background hover:bg-muted"
												)}
											>
												<ThemeIcon className="h-4 w-4" />
												{label}
											</button>
										)
									)}
								</div>
							)}
						</SettingsSection>

						{/* Temperature Units */}
						<SettingsSection
							icon={Thermometer}
							title="Temperature Units"
							description="Choose how temperatures are displayed"
							testId="settings-section-temperature"
						>
							{!isHydrated ? (
								<div className="flex flex-wrap gap-2">
									{[1, 2, 3].map((i) => (
										<Skeleton
											key={i}
											className="h-[58px] flex-1 min-w-[90px] rounded-lg"
										/>
									))}
								</div>
							) : (
								<div className="flex flex-wrap gap-2">
									{[
										{
											value: "auto" as TemperatureUnit,
											label: "Auto",
											description: "Based on your locale",
										},
										{
											value: "fahrenheit" as TemperatureUnit,
											label: "°F",
											description: "Fahrenheit",
										},
										{
											value: "celsius" as TemperatureUnit,
											label: "°C",
											description: "Celsius",
										},
									].map(({ value, label, description }) => (
										<button
											key={value}
											id={`temp-unit-button-${value}`}
											type="button"
											data-testid={`temp-unit-button-${value}`}
											onClick={() =>
												onTemperatureUnitChange(value)
											}
											className={cn(
												"flex flex-1 min-w-[90px] flex-col items-center justify-center gap-0.5 rounded-lg border px-4 py-2.5 transition-all",
												temperatureUnit === value
													? "border-primary bg-primary text-primary-foreground"
													: "border-border bg-background hover:bg-muted"
											)}
										>
											<span className="text-sm font-medium">
												{label}
											</span>
											<span
												className={cn(
													"text-[10px]",
													temperatureUnit === value
														? "text-primary-foreground/70"
														: "text-muted-foreground"
												)}
											>
												{description}
											</span>
										</button>
									))}
								</div>
							)}
						</SettingsSection>

						{/* Timezone */}
						<SettingsSection
							icon={Globe}
							title="Timezone"
							description="Set your preferred timezone for date/time display"
							testId="settings-section-timezone"
						>
							<div className="space-y-3">
								{/* Auto option */}
								{!isHydrated ? (
									<Skeleton className="h-[66px] w-full rounded-lg" />
								) : (
									<button
										type="button"
										data-testid="timezone-auto-button"
										onClick={() => onTimezoneChange("auto")}
										className={cn(
											"flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-all",
											timezone === "auto"
												? "border-primary bg-primary text-primary-foreground"
												: "border-border bg-background hover:bg-muted"
										)}
									>
										<div className="flex flex-col items-start">
											<span className="text-sm font-medium">
												Auto (System)
											</span>
											<span
												className={cn(
													"text-xs flex items-center h-4",
													timezone === "auto"
														? "text-primary-foreground/70"
														: "text-muted-foreground"
												)}
											>
												{systemTimezone ?? (
													<span className="inline-block h-3 w-24 animate-pulse rounded bg-current/20" />
												)}
											</span>
										</div>
										{timezone === "auto" && (
											<span className="text-xs font-medium">
												Selected
											</span>
										)}
									</button>
								)}

								{/* Custom timezone dropdown */}
								<div className="space-y-2">
									<label
										htmlFor="timezone-select"
										className="text-xs text-muted-foreground"
									>
										Or choose a specific timezone:
									</label>
									<Select
										name="timezone"
										disabled={!isHydrated}
										value={
											timezone === "auto" ? "" : timezone
										}
										onValueChange={(value) =>
											onTimezoneChange(value)
										}
									>
										<SelectTrigger
											id="timezone-select"
											data-testid="timezone-select-trigger"
											className="w-full bg-background text-foreground"
										>
											<SelectValue placeholder="Select timezone..." />
										</SelectTrigger>
										<SelectContent>
											{COMMON_TIMEZONES.map((tz) => (
												<SelectItem
													key={tz.value}
													value={tz.value}
												>
													{tz.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						</SettingsSection>

						{/* AI Provider */}
						<SettingsSection
							icon={Zap}
							title="AI Provider"
							description="Choose which AI backend to use"
							testId="settings-section-ai-provider"
						>
							<div className="space-y-4">
								{!isHydrated ? (
									<div className="flex flex-wrap gap-2">
										<Skeleton className="h-[58px] flex-1 min-w-[120px] rounded-lg" />
										<Skeleton className="h-[58px] flex-1 min-w-[120px] rounded-lg" />
									</div>
								) : (
									<div className="flex flex-wrap gap-2">
										{[
											{
												value: "prompt-api" as ProviderType,
												label: "Prompt API",
												description:
													"Built-in browser AI",
											},
											{
												value: "open-router" as ProviderType,
												label: "OpenRouter",
												description:
													"Cloud-based models",
											},
										].map(
											({ value, label, description }) => (
												<button
													key={value}
													id={`provider-button-${value}`}
													type="button"
													data-testid={`provider-button-${value}`}
													onClick={() =>
														onProviderTypeChange(
															value
														)
													}
													className={cn(
														"flex flex-1 min-w-[120px] flex-col items-center justify-center gap-0.5 rounded-lg border px-4 py-2.5 transition-all",
														providerType === value
															? "border-primary bg-primary text-primary-foreground"
															: "border-border bg-background hover:bg-muted"
													)}
												>
													<span className="text-sm font-medium">
														{label}
													</span>
													<span
														className={cn(
															"text-[10px]",
															providerType ===
																value
																? "text-primary-foreground/70"
																: "text-muted-foreground"
														)}
													>
														{description}
													</span>
												</button>
											)
										)}
									</div>
								)}

								<div className="min-h-[220px]">
									<div className="h-full">
										{providerType === "open-router" ? (
											<div className="space-y-4 rounded-lg bg-muted/50 p-4">
												<div className="space-y-1.5">
													<label
														htmlFor="openrouter-api-key"
														className="flex items-center gap-2 text-xs font-medium text-foreground"
													>
														<Key className="h-3 w-3" />
														OpenRouter API Key
													</label>
													<div className="relative">
														<input
															id="openrouter-api-key"
															name="openrouter-api-key"
															type={
																showApiKey
																	? "text"
																	: "password"
															}
															value={
																showApiKey
																	? openRouterApiKey
																	: openRouterApiKey
																		? "••••••••••••••••"
																		: ""
															}
															onChange={(e) => {
																if (
																	showApiKey
																) {
																	onOpenRouterApiKeyChange(
																		e.target
																			.value
																	);
																}
															}}
															readOnly={
																!isHydrated ||
																!showApiKey
															}
															placeholder="••••••••••••••••"
															className={cn(
																"w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pr-9",
																!showApiKey &&
																	openRouterApiKey &&
																	"cursor-pointer",
																!isHydrated &&
																	"opacity-70"
															)}
															onClick={() =>
																isHydrated &&
																!showApiKey &&
																setShowApiKey(
																	true
																)
															}
															autoComplete="off"
														/>
														<button
															type="button"
															onClick={() =>
																isHydrated &&
																setShowApiKey(
																	!showApiKey
																)
															}
															disabled={
																!isHydrated
															}
															className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
															title={
																showApiKey
																	? "Hide API Key"
																	: "Show API Key"
															}
														>
															{showApiKey ? (
																<EyeOff className="h-4 w-4" />
															) : (
																<Eye className="h-4 w-4" />
															)}
														</button>
													</div>
													<p className="text-[10px] text-muted-foreground">
														Your API key is stored
														locally in your browser.
													</p>
												</div>

												<div className="space-y-1.5">
													<label
														htmlFor="openrouter-model"
														className="flex items-center gap-2 text-xs font-medium text-foreground"
													>
														<Cpu className="h-3 w-3" />
														Model
														{isLoadingModels && (
															<Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
														)}
													</label>
													<div
														className="relative"
														ref={suggestionsRef}
													>
														<input
															id="openrouter-model"
															name="openrouter-model"
															type="text"
															value={
																openRouterModel
															}
															onFocus={() =>
																isHydrated &&
																setShowSuggestions(
																	true
																)
															}
															onChange={(e) => {
																if (
																	isHydrated
																) {
																	onOpenRouterModelChange(
																		e.target
																			.value
																	);
																	setShowSuggestions(
																		true
																	);
																}
															}}
															readOnly={
																!isHydrated
															}
															placeholder="mistralai/devstral-2512:free"
															className={cn(
																"w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
																!isHydrated &&
																	"opacity-70"
															)}
															autoComplete="off"
														/>
														{isHydrated &&
															showSuggestions &&
															filteredModels.length >
																0 && (
																<div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in zoom-in-95">
																	<ScrollArea className="max-h-[250px]">
																		<div className="p-1">
																			{filteredModels.map(
																				(
																					model
																				) => (
																					<button
																						key={
																							model.id
																						}
																						type="button"
																						onClick={() => {
																							onOpenRouterModelChange(
																								model.id
																							);
																							setShowSuggestions(
																								false
																							);
																						}}
																						className="flex w-full flex-col items-start rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
																					>
																						<span className="font-medium">
																							{
																								model.name
																							}
																						</span>
																						<span className="text-[10px] text-muted-foreground">
																							{
																								model.id
																							}
																						</span>
																					</button>
																				)
																			)}
																		</div>
																	</ScrollArea>
																</div>
															)}
													</div>
													<p className="text-[10px] text-muted-foreground">
														Specify the OpenRouter
														model identifier.
													</p>
												</div>
											</div>
										) : (
											<div className="rounded-lg bg-muted/50 p-4 animate-in fade-in duration-300">
												<p className="text-xs text-muted-foreground">
													Prompt API uses the built-in
													AI model in your browser
													(Chrome/Edge v138+).
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</SettingsSection>

						{/* Auto-Archive */}
						<SettingsSection
							icon={Clock}
							title="Auto-Archive"
							description="Archive inactive chats automatically"
							testId="settings-section-auto-archive"
						>
							<div className="space-y-4">
								{/* Toggle row */}
								<div className="flex items-center justify-between">
									<label
										htmlFor="auto-archive-switch"
										className="text-sm font-medium text-foreground cursor-pointer"
									>
										Auto-archive inactive chats
									</label>
									<button
										id="auto-archive-switch"
										type="button"
										data-testid="auto-archive-toggle"
										disabled={!isHydrated}
										onClick={() =>
											onArchiveThresholdChange({
												value:
													archiveThreshold.value === 0
														? 2
														: 0,
												unit: archiveThreshold.unit,
											})
										}
										className={cn(
											"relative h-6 w-11 shrink-0 rounded-full border-2 transition-colors",
											archiveThreshold.value > 0
												? "border-primary bg-primary"
												: "border-muted-foreground/30 bg-muted",
											!isHydrated && "opacity-70"
										)}
									>
										<span
											className={cn(
												"absolute left-0.5 top-0.5 h-4 w-4 rounded-full shadow-md transition-transform",
												archiveThreshold.value > 0
													? "translate-x-5 bg-primary-foreground"
													: "bg-foreground dark:bg-muted-foreground"
											)}
										/>
									</button>
								</div>

								{/* Value and unit controls */}
								<div
									className={cn(
										"overflow-hidden transition-all duration-300 ease-in-out",
										archiveThreshold.value > 0
											? "h-[60px] opacity-100 mt-4"
											: "h-0 opacity-0"
									)}
								>
									<div
										className={cn(
											"flex items-center justify-between gap-3 rounded-lg bg-muted/50 p-3",
											!isHydrated && "opacity-70"
										)}
									>
										<label
											htmlFor="archive-threshold-value"
											className="text-sm text-muted-foreground"
										>
											Archive after
										</label>
										<div className="flex items-center gap-2">
											<NumberStepper
												id="archive-threshold-value"
												value={archiveThreshold.value}
												disabled={!isHydrated}
												onChange={(value) =>
													onArchiveThresholdChange({
														value: Math.max(
															1,
															value
														),
														unit: archiveThreshold.unit,
													})
												}
												min={1}
												max={999}
												allowManualInput
											/>
											<Select
												name="archive-threshold-unit"
												disabled={!isHydrated}
												value={archiveThreshold.unit}
												onValueChange={(
													unit: ArchiveThresholdUnit
												) =>
													onArchiveThresholdChange({
														value: archiveThreshold.value,
														unit,
													})
												}
											>
												<SelectTrigger
													id="archive-threshold-unit"
													className="h-9 w-[100px] bg-background text-foreground"
												>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{UNIT_OPTIONS.map(
														(option) => (
															<SelectItem
																key={
																	option.value
																}
																value={
																	option.value
																}
															>
																{option.label}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</div>
									</div>
								</div>

								{/* Auto-archive explanation text */}
								<div className="min-h-[16px]">
									{archiveThreshold.value > 0 && (
										<p className="text-xs text-muted-foreground mt-2 animate-in fade-in duration-300">
											Chats inactive for{" "}
											{archiveThreshold.value}{" "}
											{archiveThreshold.value === 1
												? archiveThreshold.unit.slice(
														0,
														-1
													)
												: archiveThreshold.unit}{" "}
											will be archived automatically.
										</p>
									)}
								</div>
							</div>
						</SettingsSection>

						{/* Chat History */}
						<SettingsSection
							icon={MessageSquare}
							title="Chat History"
							description="Manage your conversation data"
							testId="settings-section-chat-history"
						>
							{/* Stats */}
							<div className="mb-4 grid grid-cols-3 gap-2">
								{[
									{
										id: "active",
										label: "Active",
										count: activeCount,
										bg: "bg-muted/50",
										text: "text-foreground",
									},
									{
										id: "archived",
										label: "Archived",
										count: archivedCount,
										bg: "bg-amber-500/10",
										text: "text-amber-600 dark:text-amber-400",
									},
									{
										id: "deleted",
										label: "In Trash",
										count: deletedCount,
										bg: "bg-destructive/10",
										text: "text-destructive",
									},
								].map((stat) => (
									<div
										key={stat.id}
										data-testid={`stat-${stat.id}`}
										className={cn(
											"rounded-lg p-3 text-center min-h-[68px] flex flex-col justify-center",
											stat.bg
										)}
									>
										<div
											data-testid={`stat-${stat.id}-count`}
											className={cn(
												"text-lg font-semibold h-7 flex items-center justify-center",
												stat.text
											)}
										>
											{!isHydrated ? (
												<Skeleton className="h-5 w-8" />
											) : (
												stat.count
											)}
										</div>
										<div className="text-[10px] text-muted-foreground">
											{stat.label}
										</div>
									</div>
								))}
							</div>

							{/* Hidden file input */}
							<input
								ref={fileInputRef}
								type="file"
								accept=".json"
								className="hidden"
								onChange={handleFileSelect}
								data-testid="import-file-input"
							/>

							{/* Actions */}
							<div className="flex flex-wrap gap-2">
								<Button
									data-testid="export-button"
									variant="outline"
									size="sm"
									onClick={onExport}
									disabled={activeCount + archivedCount === 0}
									className="gap-2"
									type="button"
								>
									<Download className="h-4 w-4" />
									Export
								</Button>

								<Button
									data-testid="import-button"
									variant="outline"
									size="sm"
									onClick={() =>
										fileInputRef.current?.click()
									}
									disabled={isImporting}
									className="gap-2"
									type="button"
								>
									{isImporting ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<Upload className="h-4 w-4" />
									)}
									Import
								</Button>
							</div>

							<p className="mt-3 text-xs text-muted-foreground">
								Export creates a backup file. Deleted chats are
								excluded.
							</p>
						</SettingsSection>

						{/* Trash */}
						<SettingsSection
							icon={Archive}
							title="Trash"
							description="Manage deleted conversations"
							testId="settings-section-trash"
						>
							<div className="flex items-center justify-between">
								<div
									data-testid="trash-status"
									className="text-sm text-muted-foreground flex items-center h-9"
								>
									{!isHydrated ? (
										<Skeleton className="h-4 w-32" />
									) : deletedCount === 0 ? (
										"Trash is empty"
									) : (
										<>
											{deletedCount} item
											{deletedCount !== 1 ? "s" : ""} in
											trash
										</>
									)}
								</div>
								<Button
									data-testid="empty-trash-button"
									variant="outline"
									size="sm"
									onClick={onCleanupDeleted}
									disabled={deletedCount === 0}
									className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
								>
									<Trash2 className="h-4 w-4" />
									Empty Trash
								</Button>
							</div>
						</SettingsSection>

						{/* Danger Zone */}
						<SettingsSection
							icon={AlertTriangle}
							title="Danger Zone"
							description="Irreversible actions"
							variant="danger"
							testId="settings-section-danger-zone"
						>
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div
									data-testid="delete-all-description"
									className="text-sm text-muted-foreground flex items-center h-9"
								>
									{!isHydrated ? (
										<Skeleton className="h-4 w-48" />
									) : (
										<>
											Delete all {totalConversations}{" "}
											conversation
											{totalConversations !== 1
												? "s"
												: ""}
										</>
									)}
								</div>
								<Button
									data-testid="delete-all-button"
									variant="destructive"
									size="sm"
									onClick={onClearAll}
									disabled={
										!isHydrated || totalConversations === 0
									}
									className="gap-2"
									type="button"
								>
									<Trash2 className="h-4 w-4" />
									Delete All
								</Button>
							</div>
						</SettingsSection>
					</form>

					{/* Spacer for mobile */}
					<div className="h-4" />
				</div>
			</ScrollArea>
		</div>
	);
};
