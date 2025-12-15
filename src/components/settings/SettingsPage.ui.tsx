import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NumberStepper } from "@/components/ui/number-stepper";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
	Theme,
	ArchiveThreshold,
	ArchiveThresholdUnit,
	TemperatureUnit,
	TimezonePreference,
} from "@/lib/stores/settings";

export interface SettingsPageUIProps {
	currentTheme: Theme;
	temperatureUnit: TemperatureUnit;
	timezone: TimezonePreference;
	systemTimezone: string | null;
	conversationCount: number;
	activeCount: number;
	archivedCount: number;
	deletedCount: number;
	archiveThreshold: ArchiveThreshold;
	isImporting: boolean;
	onThemeChange: (theme: Theme) => void;
	onTemperatureUnitChange: (unit: TemperatureUnit) => void;
	onTimezoneChange: (timezone: TimezonePreference) => void;
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
}: {
	icon: React.ElementType;
	title: string;
	description?: string;
	children: React.ReactNode;
	variant?: "default" | "danger";
}) => (
	<div
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
	currentTheme,
	temperatureUnit,
	timezone,
	systemTimezone,
	activeCount,
	archivedCount,
	deletedCount,
	archiveThreshold,
	isImporting,
	onThemeChange,
	onTemperatureUnitChange,
	onTimezoneChange,
	onArchiveThresholdChange,
	onExport,
	onImport,
	onClearAll,
	onCleanupDeleted,
	onBack,
}: SettingsPageUIProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onImport(file, "merge");
			e.target.value = "";
		}
	};

	const totalConversations = activeCount + archivedCount + deletedCount;

	return (
		<div className="flex h-screen flex-col bg-background">
			{/* Header */}
			<header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
				<Button
					variant="ghost"
					size="icon"
					onClick={onBack}
					className="h-10 w-10"
				>
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<h1 className="text-lg font-semibold">Settings</h1>
			</header>

			{/* Content */}
			<ScrollArea className="flex-1">
				<div className="mx-auto w-full max-w-lg space-y-4 p-4 sm:p-6">
					{/* Appearance */}
					<SettingsSection
						icon={Sun}
						title="Appearance"
						description="Choose your preferred color theme"
					>
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
							].map(({ value, icon: ThemeIcon, label }) => (
								<button
									key={value}
									onClick={() => onThemeChange(value)}
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
							))}
						</div>
					</SettingsSection>

					{/* Temperature Units */}
					<SettingsSection
						icon={Thermometer}
						title="Temperature Units"
						description="Choose how temperatures are displayed"
					>
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
									onClick={() => onTemperatureUnitChange(value)}
									className={cn(
										"flex flex-1 min-w-[90px] flex-col items-center justify-center gap-0.5 rounded-lg border px-4 py-2.5 transition-all",
										temperatureUnit === value
											? "border-primary bg-primary text-primary-foreground"
											: "border-border bg-background hover:bg-muted"
									)}
								>
									<span className="text-sm font-medium">{label}</span>
									<span className={cn(
										"text-[10px]",
										temperatureUnit === value
											? "text-primary-foreground/70"
											: "text-muted-foreground"
									)}>
										{description}
									</span>
								</button>
							))}
						</div>
					</SettingsSection>

					{/* Timezone */}
					<SettingsSection
						icon={Globe}
						title="Timezone"
						description="Set your preferred timezone for date/time display"
					>
						<div className="space-y-3">
							{/* Auto option */}
							<button
								onClick={() => onTimezoneChange("auto")}
								className={cn(
									"flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-all",
									timezone === "auto"
										? "border-primary bg-primary text-primary-foreground"
										: "border-border bg-background hover:bg-muted"
								)}
							>
								<div className="flex flex-col items-start">
									<span className="text-sm font-medium">Auto (System)</span>
									<span
										className={cn(
											"text-xs",
											timezone === "auto"
												? "text-primary-foreground/70"
												: "text-muted-foreground"
										)}
									>
										{systemTimezone ?? (
											<span className="inline-block h-4 w-24 animate-pulse rounded bg-muted" />
										)}
									</span>
								</div>
								{timezone === "auto" && (
									<span className="text-xs font-medium">Selected</span>
								)}
							</button>

							{/* Custom timezone dropdown */}
							<div className="space-y-2">
								<p className="text-xs text-muted-foreground">Or choose a specific timezone:</p>
								<Select
									value={timezone === "auto" ? "" : timezone}
									onValueChange={(value) => onTimezoneChange(value)}
								>
									<SelectTrigger className="w-full bg-background text-foreground">
										<SelectValue placeholder="Select timezone..." />
									</SelectTrigger>
									<SelectContent>
										{COMMON_TIMEZONES.map((tz) => (
											<SelectItem key={tz.value} value={tz.value}>
												{tz.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					</SettingsSection>

					{/* Auto-Archive */}
					<SettingsSection
						icon={Clock}
						title="Auto-Archive"
						description="Archive inactive chats automatically"
					>
						<div className="space-y-4">
							{/* Toggle row */}
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-foreground">
									Auto-archive inactive chats
								</span>
								<button
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
											: "border-muted-foreground/30 bg-muted"
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
							{archiveThreshold.value > 0 && (
								<div className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 p-3">
									<span className="text-sm text-muted-foreground">
										Archive after
									</span>
									<div className="flex items-center gap-2">
										<NumberStepper
											value={archiveThreshold.value}
											onChange={(value) =>
												onArchiveThresholdChange({
													value: Math.max(1, value),
													unit: archiveThreshold.unit,
												})
											}
											min={1}
											max={999}
											allowManualInput
										/>
										<Select
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
											<SelectTrigger className="h-9 w-[100px] bg-background text-foreground">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{UNIT_OPTIONS.map((option) => (
													<SelectItem
														key={option.value}
														value={option.value}
													>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
							)}

							{archiveThreshold.value > 0 && (
								<p className="text-xs text-muted-foreground">
									Chats inactive for {archiveThreshold.value}{" "}
									{archiveThreshold.value === 1
										? archiveThreshold.unit.slice(0, -1)
										: archiveThreshold.unit}{" "}
									will be archived automatically.
								</p>
							)}
						</div>
					</SettingsSection>

					{/* Chat History */}
					<SettingsSection
						icon={MessageSquare}
						title="Chat History"
						description="Manage your conversation data"
					>
						{/* Stats */}
						<div className="mb-4 grid grid-cols-3 gap-2">
							<div className="rounded-lg bg-muted/50 p-3 text-center">
								<div className="text-lg font-semibold text-foreground">
									{activeCount}
								</div>
								<div className="text-[10px] text-muted-foreground">
									Active
								</div>
							</div>
							<div className="rounded-lg bg-amber-500/10 p-3 text-center">
								<div className="text-lg font-semibold text-amber-600 dark:text-amber-400">
									{archivedCount}
								</div>
								<div className="text-[10px] text-muted-foreground">
									Archived
								</div>
							</div>
							<div className="rounded-lg bg-destructive/10 p-3 text-center">
								<div className="text-lg font-semibold text-destructive">
									{deletedCount}
								</div>
								<div className="text-[10px] text-muted-foreground">
									In Trash
								</div>
							</div>
						</div>

						{/* Hidden file input */}
						<input
							ref={fileInputRef}
							type="file"
							accept=".json"
							className="hidden"
							onChange={handleFileSelect}
						/>

						{/* Actions */}
						<div className="flex flex-wrap gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={onExport}
								disabled={activeCount + archivedCount === 0}
								className="gap-2"
							>
								<Download className="h-4 w-4" />
								Export
							</Button>

							<Button
								variant="outline"
								size="sm"
								onClick={() => fileInputRef.current?.click()}
								disabled={isImporting}
								className="gap-2"
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
					>
						<div className="flex items-center justify-between">
							<div className="text-sm text-muted-foreground">
								{deletedCount === 0 ? (
									"Trash is empty"
								) : (
									<>
										{deletedCount} item
										{deletedCount !== 1 ? "s" : ""} in trash
									</>
								)}
							</div>
							<Button
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
					>
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div className="text-sm text-muted-foreground">
								Delete all {totalConversations} conversation
								{totalConversations !== 1 ? "s" : ""}
							</div>
							<Button
								variant="destructive"
								size="sm"
								onClick={onClearAll}
								disabled={totalConversations === 0}
								className="gap-2"
							>
								<Trash2 className="h-4 w-4" />
								Delete All
							</Button>
						</div>
					</SettingsSection>

					{/* Spacer for mobile */}
					<div className="h-4" />
				</div>
			</ScrollArea>
		</div>
	);
};
