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
	Sparkles,
	Archive,
	AlertTriangle,
	Thermometer,
	Globe,
	Zap,
	Key,
	Cpu,
	Eye,
	EyeOff,
	Server,
	Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
	type ProviderType, 
	SUPPORTED_PROVIDERS,
	PROVIDER_OPEN_ROUTER,
	PROVIDER_GOOGLE,
	PROVIDER_OLLAMA,
	PROVIDER_PROMPT_API,
} from "@/lib/ai/constants";
import type { GoogleModel } from "@/lib/ai/google/models";
import type {
	Appearance,
	Theme,
	ArchiveThreshold,
	ArchiveThresholdUnit,
	TemperatureUnit,
	TimezonePreference,
} from "@/lib/stores/settings";
import type { OpenRouterModel } from "@/lib/ai/open-router/models";
import type { PullProgress, OllamaModel } from "@/lib/ai/ollama/api";
import type { OllamaStatus } from "./SettingsPage";

export interface SettingsPageUIProps {
	isHydrated?: boolean;
	currentAppearance: Appearance;
	currentTheme: Theme;
	temperatureUnit: TemperatureUnit;
	timezone: TimezonePreference;
	systemTimezone: string | null;
	providerType: ProviderType;
	encryptedOpenRouterApiKey: string | null;
	unlockedOpenRouterApiKey: string | null;
	encryptedGoogleApiKey: string | null;
	unlockedGoogleApiKey: string | null;
	encryptedOllamaApiKey: string | null;
	unlockedOllamaApiKey: string | null;
	openRouterModel: string;
	openRouterModels: OpenRouterModel[];
	googleModel: string;
	googleModels: GoogleModel[];
	isLoadingGoogleModels: boolean;
	isLocked: boolean;
	masterPassword: string | null;
	ollamaModel: string;
	ollamaBaseUrl: string;
	ollamaModels: OllamaModel[];
	ollamaStatus: OllamaStatus;
	isLoadingOllamaModels: boolean;
	isPulling: boolean;
	pullProgress: PullProgress | null;
	isLoadingModels: boolean;
	activeCount: number;
	archivedCount: number;
	deletedCount: number;
	archiveThreshold: ArchiveThreshold;
	isImporting: boolean;
	onAppearanceChange: (appearance: Appearance) => void;
	onThemeChange: (theme: Theme) => void;
	onTemperatureUnitChange: (unit: TemperatureUnit) => void;
	onTimezoneChange: (timezone: TimezonePreference) => void;
	onProviderTypeChange: (type: ProviderType) => void;
	onMasterPasswordChange: (password: string | null) => void;
	onResetSecurity: () => void;
	onOpenRouterApiKeyChange: (key: string) => void;
	onOpenRouterModelChange: (model: string) => void;
	onGoogleApiKeyChange: (key: string) => void;
	onOllamaApiKeyChange: (key: string) => void;
	onGoogleModelChange: (model: string) => void;
	onOllamaModelChange: (model: string) => void;
	onOllamaBaseUrlChange: (url: string) => void;
	onCheckOllama: () => void;
	onPullModel: () => void;
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

// Local Progress component to avoid module resolution issues
const Progress = ({ value, className }: { value?: number; className?: string }) => (
	<div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}>
		<div
			className="h-full bg-primary transition-all duration-300"
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</div>
);

export const SettingsPageUI = ({
	isHydrated = false,
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
	onAppearanceChange,
	onThemeChange,
	onTemperatureUnitChange,
	onTimezoneChange,
	onProviderTypeChange,
	onMasterPasswordChange,
	onResetSecurity,
	onOpenRouterApiKeyChange,
	onOpenRouterModelChange,
	onGoogleApiKeyChange,
	onOllamaApiKeyChange,
	onGoogleModelChange,
	onOllamaModelChange,
	onOllamaBaseUrlChange,
	onCheckOllama,
	onPullModel,
	onArchiveThresholdChange,
	onExport,
	onImport,
	onClearAll,
	onCleanupDeleted,
	onBack,
}: SettingsPageUIProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLDivElement>(null);
	const ollamaSuggestionsRef = useRef<HTMLDivElement>(null);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [showOllamaSuggestions, setShowOllamaSuggestions] = useState(false);
	const [showApiKey, setShowApiKey] = useState(false);
	const [passwordInput, setPasswordInput] = useState("");

	const isUnlocked = !!masterPassword;

	const handlePasswordSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (passwordInput) {
			onMasterPasswordChange(passwordInput);
			setPasswordInput("");
		}
	};

	const handleLock = () => {
		onMasterPasswordChange(null);
	};

	const filteredModels = useMemo(() => {
		const models = (openRouterModels || []).filter(m => m && (m.id || m.name));
		if (!openRouterModel) return models.slice(0, 20);
		const search = openRouterModel.toLowerCase();
		return models
			.filter(
				(m) =>
					(m.id && m.id.toLowerCase().includes(search)) ||
					(m.name && m.name.toLowerCase().includes(search))
			)
			.slice(0, 20);
	}, [openRouterModels, openRouterModel]);

	const filteredOllamaModels = useMemo(() => {
		const models = (ollamaModels || []).filter(m => m && (m.name || m.model));
		if (!ollamaModel) return models.slice(0, 20);
		const search = ollamaModel.toLowerCase();
		return models
			.filter(
				(m) =>
					(m.name && m.name.toLowerCase().includes(search)) ||
					(m.model && m.model.toLowerCase().includes(search))
			)
			.slice(0, 20);
	}, [ollamaModels, ollamaModel]);

	const isOllamaModelInstalled = useMemo(() => {
		return (ollamaModels || []).some(
			(m) => m && (m.name === ollamaModel || m.model === ollamaModel)
		);
	}, [ollamaModels, ollamaModel]);

	// Close suggestions when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
			if (
				ollamaSuggestionsRef.current &&
				!ollamaSuggestionsRef.current.contains(event.target as Node)
			) {
				setShowOllamaSuggestions(false);
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
							description="Choose your preferred color mode"
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
											value: "light" as Appearance,
											icon: Sun,
											label: "Light",
										},
										{
											value: "dark" as Appearance,
											icon: Moon,
											label: "Dark",
										},
										{
											value: "system" as Appearance,
											icon: Monitor,
											label: "System",
										},
									].map(
										({ value, icon: ThemeIcon, label }) => (
											<button
												key={value}
												id={`appearance-button-${value}`}
												type="button"
												data-testid={`appearance-button-${value}`}
												onClick={() =>
													onAppearanceChange(value)
												}
												className={cn(
													"flex flex-1 min-w-[90px] items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
													currentAppearance === value
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

						{/* Theme */}
						<SettingsSection
							icon={Sparkles}
							title="Theme"
							description="Select a color palette for the interface"
							testId="settings-section-theme"
						>
							{!isHydrated ? (
								<div className="flex flex-wrap gap-2">
									{[1, 2].map((i) => (
										<Skeleton
											key={i}
											className="h-[42px] flex-1 min-w-[120px] rounded-lg"
										/>
									))}
								</div>
							) : (
								<div className="flex flex-wrap gap-2">
									{[
										{
											value: "default" as Theme,
											icon: Zap,
											label: "Default",
										},
										{
											value: "vibrant" as Theme,
											icon: Sparkles,
											label: "Vibrant",
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
													"flex flex-1 min-w-[120px] items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
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

						{/* Security */}
						<SettingsSection
							icon={Lock}
							title="Security"
							description="Manage your master password to lock/unlock API keys"
							testId="settings-section-security"
						>
							<div className="space-y-4">
								{isLocked ? (
									<div className="space-y-2">
										<p className="text-xs text-muted-foreground">
											Enter your master password to unlock and manage your API keys.
										</p>
										<div className="flex gap-2">
											{/* Hidden username field for password managers accessibility */}
											<input
												type="text"
												name="username"
												value="ai-chat-user"
												readOnly
												autoComplete="username"
												className="sr-only"
												aria-hidden="true"
												tabIndex={-1}
											/>
											<input
												type="password"
												value={passwordInput}
												onChange={(e) => setPasswordInput(e.target.value)}
												placeholder="Master Password"
												autoComplete="current-password"
												className="flex-1 rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
												onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit(e)}
											/>
											<Button
												type="button"
												onClick={handlePasswordSubmit}
												disabled={!passwordInput}
											>
												Unlock
											</Button>
										</div>
										<button
											type="button"
											onClick={onResetSecurity}
											className="text-[10px] text-destructive hover:underline self-start"
										>
											Forgot password? Reset security settings
										</button>
									</div>
								) : isUnlocked ? (
									<div className="space-y-4">
										<div className="flex items-center justify-between gap-4 rounded-lg bg-green-500/10 p-3 border border-green-500/20">
											<div className="flex items-center gap-2 text-green-600 dark:text-green-400">
												<div className="h-2 w-2 rounded-full bg-current animate-pulse" />
												<span className="text-sm font-medium">Session Unlocked</span>
											</div>
											<div className="flex gap-2">
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={handleLock}
													className="h-8"
												>
													Lock
												</Button>
											</div>
										</div>
										
										<div className="flex flex-col gap-2 pt-2 border-t">
											<p className="text-[10px] text-muted-foreground">
												Forgotten your password? You can reset it, but this will erase all stored API keys.
											</p>
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={onResetSecurity}
												className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10 self-start"
											>
												Reset Master Password
											</Button>
										</div>
									</div>
								) : (
									<div className="space-y-2">
										<p className="text-xs text-muted-foreground">
											Set a master password to encrypt your API keys. This password is only stored in memory for the current session.
										</p>
										<div className="flex gap-2">
											{/* Hidden username field for password managers accessibility */}
											<input
												type="text"
												name="username"
												value="ai-chat-user"
												readOnly
												autoComplete="username"
												className="sr-only"
												aria-hidden="true"
												tabIndex={-1}
											/>
											<input
												type="password"
												value={passwordInput}
												onChange={(e) => setPasswordInput(e.target.value)}
												placeholder="New Master Password"
												autoComplete="new-password"
												className="flex-1 rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
												onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit(e)}
											/>
											<Button
												type="button"
												onClick={handlePasswordSubmit}
												disabled={!passwordInput}
											>
												Set Password
											</Button>
										</div>
									</div>
								)}
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
										{SUPPORTED_PROVIDERS.map(
											({ id, label, description }) => (
												<button
													key={id}
													id={`provider-button-${id}`}
													type="button"
													data-testid={`provider-button-${id}`}
													onClick={() =>
														onProviderTypeChange(
															id
														)
													}
													className={cn(
														"flex flex-1 min-w-[120px] flex-col items-center justify-center gap-0.5 rounded-lg border px-4 py-2.5 transition-all",
														providerType === id
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
																id
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
									{!isHydrated ? (
										<div className="space-y-4 rounded-lg bg-muted/50 p-4">
											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<Skeleton className="h-3.5 w-3.5 rounded-full" />
														<Skeleton className="h-3 w-16" />
													</div>
													<Skeleton className="h-3 w-12" />
												</div>
												<div className="flex gap-2">
													<Skeleton className="h-9 flex-1 rounded-md" />
													<Skeleton className="h-9 w-16 rounded-md" />
												</div>
											</div>
											<div className="space-y-2">
												<div className="flex items-center gap-2">
													<Skeleton className="h-3.5 w-3.5 rounded-full" />
													<Skeleton className="h-3 w-12" />
												</div>
												<Skeleton className="h-9 w-full rounded-md" />
											</div>
										</div>
									) : (
										<div className="h-full">
											{providerType === PROVIDER_OPEN_ROUTER ? (
												<div className="space-y-4 rounded-lg bg-muted/50 p-4 animate-in fade-in duration-300">
													<div className="space-y-2">
														<div className="flex items-center gap-2">
															<Key className="h-3.5 w-3.5 text-muted-foreground" />
															<label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
																API Key
															</label>
														</div>
														<div className="relative">
															<input
																type={showApiKey ? "text" : "password"}
																value={unlockedOpenRouterApiKey || ""}
																onChange={(e) => onOpenRouterApiKeyChange(e.target.value)}
																disabled={isLocked}
																autoComplete="off"
																placeholder={encryptedOpenRouterApiKey ? "•••••••• (Saved)" : "sk-or-..."}
																className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
															/>
															{!isLocked && (
																<button
																	type="button"
																	onClick={() => setShowApiKey(!showApiKey)}
																	className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
																>
																	{showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
																</button>
															)}
														</div>
														{isLocked && encryptedOpenRouterApiKey && (
															<p className="text-[10px] text-muted-foreground">
																Unlock session to manage this key
															</p>
														)}
													</div>
													<div className="space-y-2">
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<Cpu className="h-3.5 w-3.5 text-muted-foreground" />
																<label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
																	Model
																</label>
															</div>
															{isLoadingModels && (
																<Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
															)}
														</div>
														<div className="relative" ref={suggestionsRef}>
															<input
																value={openRouterModel}
																onChange={(e) => {
																	onOpenRouterModelChange(e.target.value);
																	setShowSuggestions(true);
																}}
																onFocus={() => setShowSuggestions(true)}
																autoComplete="openRouter-llm-model"
																placeholder="google/gemini-2.0-flash-exp:free"
																className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
															/>
															{showSuggestions && filteredModels.length > 0 && (
																<div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95">
																	{filteredModels.map((m) => (
																		<button
																			key={m.id}
																			type="button"
																			onClick={() => {
																				onOpenRouterModelChange(m.id);
																				setShowSuggestions(false);
																			}}
																			className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
																		>
																			<div className="font-medium">{m.name || m.id}</div>
																			<div className="text-[10px] text-muted-foreground">{m.id}</div>
																		</button>
																	))}
																</div>
															)}
														</div>
													</div>
												</div>
											) : providerType === PROVIDER_GOOGLE ? (
												<div className="space-y-4 rounded-lg bg-muted/50 p-4 animate-in fade-in duration-300">
													<div className="space-y-2">
														<div className="flex items-center gap-2">
															<Key className="h-3.5 w-3.5 text-muted-foreground" />
															<label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
																API Key
															</label>
														</div>
														<div className="relative">
															<input
																type={showApiKey ? "text" : "password"}
																value={unlockedGoogleApiKey || ""}
																onChange={(e) => onGoogleApiKeyChange(e.target.value)}
																disabled={isLocked}
																autoComplete="off"
																placeholder={encryptedGoogleApiKey ? "•••••••• (Saved)" : "Enter Gemini API Key"}
																className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
															/>
															{!isLocked && (
																<button
																	type="button"
																	onClick={() => setShowApiKey(!showApiKey)}
																	className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
																>
																	{showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
																</button>
															)}
														</div>
														{isLocked && encryptedGoogleApiKey && (
															<p className="text-[10px] text-muted-foreground">
																Unlock session to manage this key
															</p>
														)}
													</div>
													<div className="space-y-2">
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<Cpu className="h-3.5 w-3.5 text-muted-foreground" />
																<label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
																	Model
																</label>
															</div>
															{isLoadingGoogleModels && (
																<Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
															)}
														</div>
														<Select
															value={googleModel}
															onValueChange={(value) => onGoogleModelChange(value)}
															disabled={googleModels.length === 0 && !isLoadingGoogleModels}
														>
															<SelectTrigger className="w-full bg-background">
																<SelectValue placeholder={isLoadingGoogleModels ? "Loading models..." : (googleModels.length > 0 ? "Select model..." : "Enter API key to load models")} />
															</SelectTrigger>
															<SelectContent>
																{googleModels.length > 0 ? (
																	googleModels.map((m) => (
																		<SelectItem key={m.id} value={m.id}>
																			<div className="flex flex-col">
																				<span>{m.name}</span>
																				<span className="text-[10px] text-muted-foreground line-clamp-1">{m.description}</span>
																			</div>
																		</SelectItem>
																	))
																) : (
																	<SelectItem value="gemini-2.0-flash-exp">Gemini 2.0 Flash Exp (Default)</SelectItem>
																)}
															</SelectContent>
														</Select>
													</div>
												</div>
											) : providerType === PROVIDER_OLLAMA ? (
												<div className="space-y-4 rounded-lg bg-muted/50 p-4 animate-in fade-in duration-300">
													<div className="space-y-2">
														<div className="flex items-center gap-2">
															<Key className="h-3.5 w-3.5 text-muted-foreground" />
															<label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
																API Key (Optional)
															</label>
														</div>
														<div className="relative">
															<input
																type={showApiKey ? "text" : "password"}
																value={unlockedOllamaApiKey || ""}
																onChange={(e) => onOllamaApiKeyChange(e.target.value)}
																disabled={isLocked}
																autoComplete="off"
																placeholder={encryptedOllamaApiKey ? "•••••••• (Saved)" : "Optional key for proxies"}
																className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
															/>
															{!isLocked && (
																<button
																	type="button"
																	onClick={() => setShowApiKey(!showApiKey)}
																	className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
																>
																	{showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
																</button>
															)}
														</div>
														{isLocked && encryptedOllamaApiKey && (
															<p className="text-[10px] text-muted-foreground">
																Unlock session to manage this key
															</p>
														)}
													</div>
													<div className="space-y-2">
														<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<Server className="h-3.5 w-3.5 text-muted-foreground" />
															<label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
																Base URL
															</label>
														</div>
														<div className="flex items-center gap-2">
															{ollamaStatus === "checking" && (
																<Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
															)}
															{ollamaStatus === "available" && (
																<span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
																	<span className="h-1.5 w-1.5 rounded-full bg-current" />
																	Online
																</span>
															)}
															{ollamaStatus === "unavailable" && (
																<span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-destructive">
																	<span className="h-1.5 w-1.5 rounded-full bg-current" />
																	Offline
																</span>
															)}
														</div>
													</div>
													<div className="flex gap-2">
														<input
															value={ollamaBaseUrl}
															onChange={(e) => onOllamaBaseUrlChange(e.target.value)}
															autoComplete="ollama-base-url"
															placeholder="http://localhost:11434"
															className="flex-1 rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
														/>
														<Button
															type="button"
															variant="outline"
															size="sm"
															className="h-9 px-3"
															onClick={onCheckOllama}
															disabled={ollamaStatus === "checking" || !ollamaBaseUrl}
														>
															Check
														</Button>
													</div>
												</div>
													<div className="space-y-2">
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<Cpu className="h-3.5 w-3.5 text-muted-foreground" />
																<label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
																	Model
																</label>
															</div>
															<div className="flex items-center gap-2">
																{isLoadingOllamaModels && (
																	<Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
																)}
																{isOllamaModelInstalled && (
																	<span className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
																		Installed
																	</span>
																)}
															</div>
														</div>
														<div className="relative" ref={ollamaSuggestionsRef}>
															<div className="flex gap-2">
																<div className="relative flex-1">
																	<input
																		value={ollamaModel}
																		onChange={(e) => {
																			onOllamaModelChange(e.target.value);
																			setShowOllamaSuggestions(true);
																		}}
																		onFocus={() => setShowOllamaSuggestions(true)}
																		autoComplete="ollama-llm-model"
																		placeholder="deepseek-r1:1.5b"
																		className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
																	/>
																	{showOllamaSuggestions && filteredOllamaModels.length > 0 && (
																		<div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95">
																			{filteredOllamaModels.map((m) => (
																				<button
																					key={m.name || m.model}
																					type="button"
																					onClick={() => {
																						onOllamaModelChange(m.name || m.model);
																						setShowOllamaSuggestions(false);
																					}}
																					className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
																				>
																					<div className="font-medium">{m.name || m.model}</div>
																					{m.details?.parameter_size && (
																						<div className="text-[10px] text-muted-foreground">
																							{m.details.parameter_size} parameters
																						</div>
																					)}
																				</button>
																			))}
																		</div>
																	)}
																</div>
																<Button
																	type="button"
																	size="sm"
																	variant={isOllamaModelInstalled ? "outline" : "default"}
																	className="h-9 gap-2 px-3"
																	onClick={onPullModel}
																	disabled={isPulling || !ollamaModel}
																>
																	{isPulling ? (
																		<Loader2 className="h-4 w-4 animate-spin" />
																	) : (
																		<Download className="h-4 w-4" />
																	)}
																	<span className="hidden sm:inline">
																		{isOllamaModelInstalled ? "Update" : "Pull"}
																	</span>
																</Button>
															</div>
														</div>
													</div>

													{isPulling && pullProgress && (
														<div className="space-y-2 bg-background/50 p-3 rounded-lg border border-primary/20 animate-in slide-in-from-top-2 duration-300">
															<div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
																<span className="text-primary truncate mr-2">{pullProgress.status}</span>
																{pullProgress.total && pullProgress.total > 0 && pullProgress.completed !== undefined && (
																	<span className="text-muted-foreground">
																		{Math.round((pullProgress.completed / pullProgress.total) * 100)}%
																	</span>
																)}
															</div>
													<Progress
														value={
															pullProgress.total && pullProgress.total > 0 && pullProgress.completed !== undefined
																? (pullProgress.completed / pullProgress.total) * 100
																: 0
														}
													/>
												</div>
											)}
										</div>
									) : providerType === PROVIDER_PROMPT_API ? (
										<div className="space-y-4 rounded-lg bg-muted/50 p-4 animate-in fade-in duration-300">
											<div className="flex items-center gap-3">
												<div className="rounded-full bg-primary/10 p-2">
													<Sparkles className="h-5 w-5 text-primary" />
												</div>
												<div>
													<h4 className="text-sm font-semibold">Browser Built-in AI</h4>
													<p className="text-xs text-muted-foreground">
														Using Gemini Nano running directly in your browser.
													</p>
												</div>
											</div>
											<div className="rounded-md border border-primary/20 bg-primary/5 p-3">
												<p className="text-[11px] leading-relaxed text-primary/80">
													This provider uses your device's hardware and doesn't require an internet connection or API keys.
												</p>
											</div>
										</div>
									) : null}
										</div>
									)}
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
