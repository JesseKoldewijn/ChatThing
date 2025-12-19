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
} from "@/lib/stores/conversations";
import { useNavigation } from "@/lib/hooks/useNavigation";
import { fetchOpenRouterModels, openRouterModelsAtom, isLoadingModelsAtom } from "@/lib/ai/open-router/models";

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
	const openRouterModels = useStore(openRouterModelsAtom);
	const isLoadingModels = useStore(isLoadingModelsAtom);
	const [isImporting, setIsImporting] = useState(false);

	// Ensure deterministic values during hydration by using defaults if not mounted
	const currentTheme = hasMounted ? rawTheme : "system";
	const conversations = hasMounted ? rawConversations : [];
	const archiveThreshold = hasMounted ? rawArchiveThreshold : { value: 2, unit: "days" };
	const temperatureUnit = hasMounted ? rawTemperatureUnit : "auto";
	const timezone = hasMounted ? rawTimezone : "auto";
	const providerType = hasMounted ? rawProviderType : "open-router";
	const openRouterApiKey = hasMounted ? rawOpenRouterApiKey : "";
	const openRouterModel = hasMounted ? rawOpenRouterModel : "mistralai/devstral-2512:free";

	// Defer system timezone detection to avoid SSR hydration mismatch
	const [systemTimezone, setSystemTimezone] = useState<string | null>(null);
	
	useEffect(() => {
		setHasMounted(true);
		setSystemTimezone(getSystemTimezone());
		fetchOpenRouterModels();
	}, []);

	// Calculate counts by status
	const { activeCount, archivedCount, deletedCount } = useMemo(() => {
		if (!hasMounted) {
			return { activeCount: 0, archivedCount: 0, deletedCount: 0 };
		}
		return {
			activeCount: conversations.filter((c) => c.status === "active").length,
			archivedCount: conversations.filter((c) => c.status === "archived").length,
			deletedCount: conversations.filter((c) => c.status === "deleted").length,
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

	const handleArchiveThresholdChange = useCallback((threshold: ArchiveThreshold) => {
		setArchiveThreshold(threshold);
		// Run auto-archive immediately when threshold changes
		if (threshold.value > 0) {
			const archivedCount = runAutoArchive();
			if (archivedCount > 0) {
				alert(`${archivedCount} conversation${archivedCount !== 1 ? "s" : ""} were archived based on the new threshold.`);
			}
		}
	}, []);

	const handleExport = useCallback(() => {
		exportConversations();
	}, []);

	const handleImport = useCallback(async (file: File, mode: "merge" | "replace") => {
		setIsImporting(true);
		try {
			const result = await importConversations(file, mode);
			if (result.success) {
				alert(`Successfully imported ${result.imported} conversation${result.imported !== 1 ? "s" : ""}.`);
			} else {
				alert(`Import failed: ${result.error}`);
			}
		} finally {
			setIsImporting(false);
		}
	}, []);

	const handleClearAll = useCallback(() => {
		if (confirm("Are you sure you want to delete ALL conversations? This includes active, archived, and deleted chats. This cannot be undone.")) {
			clearAllConversations();
		}
	}, []);

	const handleCleanupDeleted = useCallback(async () => {
		if (confirm(`Permanently delete ${deletedCount} conversation${deletedCount !== 1 ? "s" : ""} from trash? This cannot be undone.`)) {
			const cleaned = await cleanupDeletedConversations();
			alert(`${cleaned} conversation${cleaned !== 1 ? "s" : ""} permanently deleted.`);
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
			onArchiveThresholdChange={handleArchiveThresholdChange}
			onExport={handleExport}
			onImport={handleImport}
			onClearAll={handleClearAll}
			onCleanupDeleted={handleCleanupDeleted}
			onBack={handleBack}
		/>
	);
};
