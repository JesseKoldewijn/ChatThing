import { useCallback, useState, useMemo, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { SettingsPageUI } from "./SettingsPage.ui";
import {
	themeAtom,
	setTheme,
	archiveThresholdAtom,
	setArchiveThreshold,
	temperatureUnitAtom,
	setTemperatureUnit,
	timezoneAtom,
	setTimezone,
	getSystemTimezone,
	providerTypeAtom,
	setProviderType,
	openRouterApiKeyAtom,
	setOpenRouterApiKey,
	openRouterModelAtom,
	setOpenRouterModel,
	ollamaModelAtom,
	setOllamaModel,
	ollamaBaseUrlAtom,
	setOllamaBaseUrl,
	type Theme,
	type ArchiveThreshold,
	type TemperatureUnit,
	type TimezonePreference,
	type ProviderType,
} from "@/lib/stores/settings";
import {
	conversationsAtom,
	exportConversations,
	importConversations,
	clearAllConversations,
	cleanupDeletedConversations,
	runAutoArchive,
	type Conversation,
} from "@/lib/stores/conversations";
import { useNavigation } from "@/lib/hooks/useNavigation";
import {
	fetchOpenRouterModels,
	openRouterModelsAtom,
	isLoadingModelsAtom,
} from "@/lib/ai/open-router/models";
import {
	pullOllamaModel,
	fetchOllamaModels,
	checkOllamaAvailability,
	type PullProgress,
	type OllamaModel,
} from "@/lib/ai/ollama/api";

const EMPTY_ARRAY: Conversation[] = [];
const DEFAULT_THRESHOLD: ArchiveThreshold = { value: 2, unit: "days" };

export type OllamaStatus = "idle" | "checking" | "available" | "unavailable";

export const SettingsPage = () => {
	const { goBack } = useNavigation();
	const [hasMounted, setHasMounted] = useState(false);

	// Subscribe to stores
	const rawTheme = useStore(themeAtom);
	const rawConversations = useStore(conversationsAtom);
	const rawArchiveThreshold = useStore(archiveThresholdAtom);
	const rawTemperatureUnit = useStore(temperatureUnitAtom);
	const rawTimezone = useStore(timezoneAtom);
	const rawProviderType = useStore(providerTypeAtom);
	const rawOpenRouterApiKey = useStore(openRouterApiKeyAtom);
	const rawOpenRouterModel = useStore(openRouterModelAtom);
	const rawOllamaModel = useStore(ollamaModelAtom);
	const rawOllamaBaseUrl = useStore(ollamaBaseUrlAtom);
	const openRouterModels = useStore(openRouterModelsAtom);
	const isLoadingModels = useStore(isLoadingModelsAtom);
	const [isImporting, setIsImporting] = useState(false);
	const [pullProgress, setPullProgress] = useState<PullProgress | null>(null);
	const [isPulling, setIsPulling] = useState(false);
	const [ollamaModels, setOllamaModels] = useState<OllamaModel[]>([]);
	const [isLoadingOllamaModels, setIsLoadingOllamaModels] = useState(false);
	const [ollamaStatus, setOllamaStatus] = useState<OllamaStatus>("idle");

	// Ensure deterministic values during hydration by using defaults if not mounted
	const currentTheme = hasMounted ? rawTheme : "system";
	const conversations = hasMounted ? rawConversations : EMPTY_ARRAY;
	const archiveThreshold = hasMounted
		? rawArchiveThreshold
		: DEFAULT_THRESHOLD;
	const temperatureUnit = hasMounted ? rawTemperatureUnit : "auto";
	const timezone = hasMounted ? rawTimezone : "auto";
	const providerType = hasMounted ? rawProviderType : "open-router";
	const openRouterApiKey = hasMounted ? rawOpenRouterApiKey : "";
	const openRouterModel = hasMounted
		? rawOpenRouterModel
		: "mistralai/devstral-2512:free";
	const ollamaModel = hasMounted ? rawOllamaModel : "deepseek-r1:1.5b";
	const ollamaBaseUrl = hasMounted
		? rawOllamaBaseUrl
		: "http://localhost:11434";

	// Defer system timezone detection to avoid SSR hydration mismatch
	const [systemTimezone, setSystemTimezone] = useState<string | null>(null);

	const handleCheckOllama = useCallback(async (url: string) => {
		if (!url) return;
		setOllamaStatus("checking");
		try {
			const isAvailable = await checkOllamaAvailability(url);
			setOllamaStatus(isAvailable ? "available" : "unavailable");
			return isAvailable;
		} catch {
			setOllamaStatus("unavailable");
			return false;
		}
	}, []);

	const refreshOllamaModels = useCallback(async () => {
		if (!ollamaBaseUrl) return;
		setIsLoadingOllamaModels(true);

		// Also check availability when refreshing models
		const isAvailable = await handleCheckOllama(ollamaBaseUrl);

		if (isAvailable) {
			try {
				const models = await fetchOllamaModels(ollamaBaseUrl);
				setOllamaModels(models);
			} catch (error) {
				console.warn("Failed to fetch Ollama models:", error);
				setOllamaModels([]);
			}
		} else {
			setOllamaModels([]);
		}

		setIsLoadingOllamaModels(false);
	}, [ollamaBaseUrl, handleCheckOllama]);

	useEffect(() => {
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

	useEffect(() => {
		if (hasMounted && providerType === "ollama") {
			refreshOllamaModels();
		}
	}, [ollamaBaseUrl, providerType, hasMounted, refreshOllamaModels]);

	// Calculate counts by status
	const { activeCount, archivedCount, deletedCount } = useMemo(() => {
		if (!hasMounted) {
			return { activeCount: 0, archivedCount: 0, deletedCount: 0 };
		}
		return {
			activeCount: conversations.filter((c) => c.status === "active")
				.length,
			archivedCount: conversations.filter((c) => c.status === "archived")
				.length,
			deletedCount: conversations.filter((c) => c.status === "deleted")
				.length,
		};
	}, [conversations, hasMounted]);

	const handleThemeChange = useCallback((theme: Theme) => {
		setTheme(theme);
	}, []);

	const handleTemperatureUnitChange = useCallback((unit: TemperatureUnit) => {
		setTemperatureUnit(unit);
	}, []);

	const handleTimezoneChange = useCallback((tz: TimezonePreference) => {
		setTimezone(tz);
	}, []);

	const handleProviderTypeChange = useCallback((type: ProviderType) => {
		setProviderType(type);
	}, []);

	const handleOpenRouterApiKeyChange = useCallback((key: string) => {
		setOpenRouterApiKey(key);
	}, []);

	const handleOpenRouterModelChange = useCallback((model: string) => {
		setOpenRouterModel(model);
	}, []);

	const handleOllamaModelChange = useCallback((model: string) => {
		setOllamaModel(model);
	}, []);

	const handleOllamaBaseUrlChange = useCallback((url: string) => {
		setOllamaBaseUrl(url);
	}, []);

	const handlePullModel = useCallback(async () => {
		if (isPulling) return;
		setIsPulling(true);
		setPullProgress(null);

		try {
			await pullOllamaModel(ollamaBaseUrl, ollamaModel, (progress) => {
				setPullProgress(progress);
			});
			alert("Model pulled successfully!");
			refreshOllamaModels();
		} catch (error) {
			console.error("Failed to pull model:", error);
			alert(
				`Failed to pull model: ${error instanceof Error ? error.message : String(error)}`
			);
		} finally {
			setIsPulling(false);
			setPullProgress(null);
		}
	}, [ollamaBaseUrl, ollamaModel, isPulling, refreshOllamaModels]);

	const handleArchiveThresholdChange = useCallback(
		(threshold: ArchiveThreshold) => {
			setArchiveThreshold(threshold);
			// Run auto-archive immediately when threshold changes
			if (threshold.value > 0) {
				const archivedCount = runAutoArchive();
				if (archivedCount > 0) {
					alert(
						`${archivedCount} conversation${archivedCount !== 1 ? "s" : ""} were archived based on the new threshold.`
					);
				}
			}
		},
		[]
	);

	const handleExport = useCallback(() => {
		exportConversations();
	}, []);

	const handleImport = useCallback(
		async (file: File, mode: "merge" | "replace") => {
			setIsImporting(true);
			try {
				const result = await importConversations(file, mode);
				if (result.success) {
					alert(
						`Successfully imported ${result.imported} conversation${result.imported !== 1 ? "s" : ""}.`
					);
				} else {
					alert(`Import failed: ${result.error}`);
				}
			} finally {
				setIsImporting(false);
			}
		},
		[]
	);

	const handleClearAll = useCallback(() => {
		if (
			confirm(
				"Are you sure you want to delete ALL conversations? This includes active, archived, and deleted chats. This cannot be undone."
			)
		) {
			clearAllConversations();
		}
	}, []);

	const handleCleanupDeleted = useCallback(async () => {
		if (
			confirm(
				`Permanently delete ${deletedCount} conversation${deletedCount !== 1 ? "s" : ""} from trash? This cannot be undone.`
			)
		) {
			const cleaned = await cleanupDeletedConversations();
			alert(
				`${cleaned} conversation${cleaned !== 1 ? "s" : ""} permanently deleted.`
			);
		}
	}, [deletedCount]);

	const handleBack = useCallback(() => {
		goBack();
	}, [goBack]);

	return (
		<SettingsPageUI
			isHydrated={hasMounted}
			currentTheme={currentTheme}
			temperatureUnit={temperatureUnit}
			timezone={timezone}
			systemTimezone={systemTimezone}
			providerType={providerType}
			openRouterApiKey={openRouterApiKey}
			openRouterModel={openRouterModel}
			openRouterModels={openRouterModels}
			ollamaModel={ollamaModel}
			ollamaBaseUrl={ollamaBaseUrl}
			ollamaModels={ollamaModels}
			ollamaStatus={ollamaStatus}
			isLoadingOllamaModels={isLoadingOllamaModels}
			isPulling={isPulling}
			pullProgress={pullProgress}
			isLoadingModels={isLoadingModels}
			activeCount={activeCount}
			archivedCount={archivedCount}
			deletedCount={deletedCount}
			archiveThreshold={archiveThreshold}
			isImporting={isImporting}
			onThemeChange={handleThemeChange}
			onTemperatureUnitChange={handleTemperatureUnitChange}
			onTimezoneChange={handleTimezoneChange}
			onProviderTypeChange={handleProviderTypeChange}
			onOpenRouterApiKeyChange={handleOpenRouterApiKeyChange}
			onOpenRouterModelChange={handleOpenRouterModelChange}
			onOllamaModelChange={handleOllamaModelChange}
			onOllamaBaseUrlChange={handleOllamaBaseUrlChange}
			onCheckOllama={() => handleCheckOllama(ollamaBaseUrl)}
			onPullModel={handlePullModel}
			onArchiveThresholdChange={handleArchiveThresholdChange}
			onExport={handleExport}
			onImport={handleImport}
			onClearAll={handleClearAll}
			onCleanupDeleted={handleCleanupDeleted}
			onBack={handleBack}
		/>
	);
};
