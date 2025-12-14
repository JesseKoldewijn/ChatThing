import { useCallback, useState, useMemo } from "react";
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
	type Theme,
	type ArchiveThreshold,
	type TemperatureUnit,
	type TimezonePreference,
} from "@/lib/stores/settings";
import {
	conversationsAtom,
	exportConversations,
	importConversations,
	clearAllConversations,
	cleanupDeletedConversations,
	runAutoArchive,
} from "@/lib/stores/conversations";
import { goBack } from "@/lib/stores/navigation";

export const SettingsPage = () => {
	const currentTheme = useStore(themeAtom);
	const conversations = useStore(conversationsAtom);
	const archiveThreshold = useStore(archiveThresholdAtom);
	const temperatureUnit = useStore(temperatureUnitAtom);
	const timezone = useStore(timezoneAtom);
	const systemTimezone = getSystemTimezone();
	const [isImporting, setIsImporting] = useState(false);

	// Calculate counts by status
	const { activeCount, archivedCount, deletedCount } = useMemo(() => ({
		activeCount: conversations.filter((c) => c.status === "active").length,
		archivedCount: conversations.filter((c) => c.status === "archived").length,
		deletedCount: conversations.filter((c) => c.status === "deleted").length,
	}), [conversations]);

	const handleThemeChange = useCallback((theme: Theme) => {
		setTheme(theme);
	}, []);

	const handleTemperatureUnitChange = useCallback((unit: TemperatureUnit) => {
		setTemperatureUnit(unit);
	}, []);

	const handleTimezoneChange = useCallback((tz: TimezonePreference) => {
		setTimezone(tz);
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
	}, []);

	return (
		<SettingsPageUI
			currentTheme={currentTheme}
			temperatureUnit={temperatureUnit}
			timezone={timezone}
			systemTimezone={systemTimezone}
			conversationCount={conversations.length}
			activeCount={activeCount}
			archivedCount={archivedCount}
			deletedCount={deletedCount}
			archiveThreshold={archiveThreshold}
			isImporting={isImporting}
			onThemeChange={handleThemeChange}
			onTemperatureUnitChange={handleTemperatureUnitChange}
			onTimezoneChange={handleTimezoneChange}
			onArchiveThresholdChange={handleArchiveThresholdChange}
			onExport={handleExport}
			onImport={handleImport}
			onClearAll={handleClearAll}
			onCleanupDeleted={handleCleanupDeleted}
			onBack={handleBack}
		/>
	);
};
