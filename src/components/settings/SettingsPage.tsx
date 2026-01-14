import type { ProviderType } from "@/lib/ai/constants";
import {
	fetchGoogleModels,
	googleModelsAtom,
	isLoadingGoogleModelsAtom,
} from "@/lib/ai/google/models";
import { type PullProgress, pullOllamaModel } from "@/lib/ai/ollama/api";
import {
	fetchOllamaModelsAction,
	isLoadingOllamaModelsAtom,
	ollamaModelsAtom,
	ollamaStatusAtom,
} from "@/lib/ai/ollama/models";
import {
	fetchOpenRouterModels,
	isLoadingModelsAtom,
	openRouterModelsAtom,
} from "@/lib/ai/open-router/models";
import { useNavigation } from "@/lib/hooks/useNavigation";
import { confirmAction } from "@/lib/stores/confirmation";
import {
	type Conversation,
	cleanupDeletedConversations,
	clearAllConversations,
	conversationsAtom,
	exportConversations,
	importConversations,
	runAutoArchive,
} from "@/lib/stores/conversations";
import { showError, showInfo, showSuccess } from "@/lib/stores/notifications";
import type {
	Appearance,
	ArchiveThreshold,
	TemperatureUnit,
	Theme,
	TimezonePreference,
} from "@/lib/stores/settings";
import {
	appearanceAtom,
	archiveThresholdAtom,
	encryptedGoogleApiKeyAtom,
	encryptedOllamaApiKeyAtom,
	encryptedOpenRouterApiKeyAtom,
	experimentsAtom,
	getDecryptedGoogleApiKey,
	getDecryptedOllamaApiKey,
	getDecryptedOpenRouterApiKey,
	getSystemTimezone,
	googleModelAtom,
	isLockedAtom,
	masterPasswordAtom,
	ollamaBaseUrlAtom,
	ollamaModelAtom,
	openRouterModelAtom,
	PROVIDER_OLLAMA,
	providerTypeAtom,
	resetSecuritySettings,
	setAppearance,
	setArchiveThreshold,
	setGoogleApiKey,
	setGoogleModel,
	setMasterPassword,
	setOllamaApiKey,
	setOllamaBaseUrl,
	setOllamaModel,
	setOpenRouterApiKey,
	setOpenRouterModel,
	setProviderType,
	setTemperatureUnit,
	setTheme,
	setTimezone,
	temperatureUnitAtom,
	themeAtom,
	timezoneAtom,
	toggleExperiment,
} from "@/lib/stores/settings";
import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SettingsPageUI } from "./SettingsPage.ui";

const EMPTY_ARRAY: Conversation[] = [];
const DEFAULT_THRESHOLD: ArchiveThreshold = { value: 2, unit: "days" };

export type OllamaStatus = "idle" | "checking" | "available" | "unavailable";

export const SettingsPage = () => {
	const { goBack } = useNavigation();
	const [hasMounted, setHasMounted] = useState(false);

	// Subscribe to stores
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
	const experiments = useStore(experimentsAtom);
	const [isImporting, setIsImporting] = useState(false);
	const [pullProgress, setPullProgress] = useState<PullProgress | null>(null);
	const [isPulling, setIsPulling] = useState(false);

	const [unlockedOpenRouterApiKey, setUnlockedOpenRouterApiKey] = useState<
		string | null
	>(null);
	const [unlockedGoogleApiKey, setUnlockedGoogleApiKey] = useState<
		string | null
	>(null);
	const [unlockedOllamaApiKey, setUnlockedOllamaApiKey] = useState<
		string | null
	>(null);

	// Ensure deterministic values during hydration by using defaults if not mounted
	const currentAppearance = hasMounted ? rawAppearance : "system";
	const currentTheme = hasMounted ? rawTheme : "default";
	const conversations = hasMounted ? rawConversations : EMPTY_ARRAY;
	const archiveThreshold = hasMounted ? rawArchiveThreshold : DEFAULT_THRESHOLD;
	const temperatureUnit = hasMounted ? rawTemperatureUnit : "auto";
	const timezone = hasMounted ? rawTimezone : "auto";
	const providerType = hasMounted ? rawProviderType : PROVIDER_OLLAMA;
	const currentExperiments = hasMounted ? experiments : {};
	const masterPassword = hasMounted ? rawMasterPassword : null;
	const encryptedOpenRouterApiKey = hasMounted
		? rawEncryptedOpenRouterApiKey
		: null;
	const encryptedGoogleApiKey = hasMounted ? rawEncryptedGoogleApiKey : null;
	const encryptedOllamaApiKey = hasMounted ? rawEncryptedOllamaApiKey : null;
	const openRouterModel = hasMounted
		? rawOpenRouterModel
		: "mistralai/devstral-2512:free";
	const googleModel = hasMounted ? rawGoogleModel : "gemini-2.0-flash-exp";
	const ollamaModel = hasMounted ? rawOllamaModel : "deepseek-r1:1.5b";
	const ollamaBaseUrl = hasMounted
		? rawOllamaBaseUrl
		: "http://localhost:11434";

	// Handle unlocking keys when master password changes
	useEffect(() => {
		const unlock = async () => {
			if (masterPassword) {
				try {
					const orKey = await getDecryptedOpenRouterApiKey(masterPassword);
					const gKey = await getDecryptedGoogleApiKey(masterPassword);
					const olKey = await getDecryptedOllamaApiKey(masterPassword);
					setUnlockedOpenRouterApiKey(orKey);
					setUnlockedGoogleApiKey(gKey);
					setUnlockedOllamaApiKey(olKey);

					// Fetch models once keys are unlocked
					if (orKey) fetchOpenRouterModels();
					if (gKey) fetchGoogleModels();
				} catch (error) {
					console.error("Failed to unlock keys:", error);
					// If unlock fails, clear password
					setMasterPassword(null);
					showError("Failed to unlock. Incorrect password?");
				}
			} else {
				setUnlockedOpenRouterApiKey(null);
				setUnlockedGoogleApiKey(null);
				setUnlockedOllamaApiKey(null);
			}
		};
		unlock();
	}, [masterPassword]);

	// Defer system timezone detection to avoid SSR hydration mismatch
	const [systemTimezone, setSystemTimezone] = useState<string | null>(null);

	const handleCheckOllama = useCallback(async () => {
		await fetchOllamaModelsAction();
	}, []);

	const refreshOllamaModels = useCallback(async () => {
		await fetchOllamaModelsAction();
	}, []);

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
		if (hasMounted && providerType === PROVIDER_OLLAMA) {
			refreshOllamaModels();
		}
	}, [ollamaBaseUrl, providerType, hasMounted, refreshOllamaModels]);

	// Calculate counts by status
	const { activeCount, archivedCount, deletedCount } = useMemo(() => {
		if (!hasMounted) {
			return { activeCount: 0, archivedCount: 0, deletedCount: 0 };
		}
		return {
			activeCount: conversations.filter((c) => c.status === "active").length,
			archivedCount: conversations.filter((c) => c.status === "archived")
				.length,
			deletedCount: conversations.filter((c) => c.status === "deleted").length,
		};
	}, [conversations, hasMounted]);

	const handleAppearanceChange = useCallback((appearance: Appearance) => {
		setAppearance(appearance);
	}, []);

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

	const handleToggleExperiment = useCallback((id: string) => {
		toggleExperiment(id);
	}, []);

	const handleMasterPasswordChange = useCallback((password: string | null) => {
		setMasterPassword(password);
	}, []);

	const handleResetSecurity = useCallback(() => {
		confirmAction({
			title: "Reset Security Settings",
			message:
				"Are you sure you want to reset your master password? All stored API keys will be deleted and you will need to re-enter them with a new password.",
			confirmText: "Reset Everything",
			variant: "destructive",
			onConfirm: () => {
				resetSecuritySettings();
				showSuccess("Security settings reset successfully.");
			},
		});
	}, []);

	const handleOpenRouterApiKeyChange = useCallback(async (key: string) => {
		await setOpenRouterApiKey(key);
		setUnlockedOpenRouterApiKey(key);
		if (key) fetchOpenRouterModels();
	}, []);

	const handleGoogleApiKeyChange = useCallback(async (key: string) => {
		await setGoogleApiKey(key);
		setUnlockedGoogleApiKey(key);
		if (key) fetchGoogleModels();
	}, []);

	const handleOllamaApiKeyChange = useCallback(async (key: string) => {
		await setOllamaApiKey(key);
		setUnlockedOllamaApiKey(key);
	}, []);

	const handleOpenRouterModelChange = useCallback((model: string) => {
		setOpenRouterModel(model);
	}, []);

	const handleGoogleModelChange = useCallback((model: string) => {
		setGoogleModel(model);
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
			showSuccess("Model pulled successfully!");
			refreshOllamaModels();
		} catch (error) {
			console.error("Failed to pull model:", error);
			showError(
				`Failed to pull model: ${error instanceof Error ? error.message : String(error)}`,
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
					showInfo(
						`${archivedCount} conversation${archivedCount !== 1 ? "s" : ""} were archived based on the new threshold.`,
					);
				}
			}
		},
		[],
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
					showSuccess(
						`Successfully imported ${result.imported} conversation${result.imported !== 1 ? "s" : ""}.`,
					);
				} else {
					showError(`Import failed: ${result.error}`);
				}
			} finally {
				setIsImporting(false);
			}
		},
		[],
	);

	const handleClearAll = useCallback(() => {
		confirmAction({
			title: "Delete All Conversations",
			message:
				"Are you sure you want to delete ALL conversations? This includes active, archived, and deleted chats. This cannot be undone.",
			confirmText: "Delete Everything",
			variant: "destructive",
			onConfirm: () => {
				clearAllConversations();
				showSuccess("All conversations deleted.");
			},
		});
	}, []);

	const handleCleanupDeleted = useCallback(async () => {
		confirmAction({
			title: "Empty Trash",
			message: `Permanently delete ${deletedCount} conversation${deletedCount !== 1 ? "s" : ""} from trash? This cannot be undone.`,
			confirmText: "Empty Trash",
			variant: "destructive",
			onConfirm: async () => {
				const cleaned = await cleanupDeletedConversations();
				showSuccess(
					`${cleaned} conversation${cleaned !== 1 ? "s" : ""} permanently deleted.`,
				);
			},
		});
	}, [deletedCount]);

	const handleBack = useCallback(() => {
		goBack();
	}, [goBack]);

	return (
		<SettingsPageUI
			isHydrated={hasMounted}
			currentAppearance={currentAppearance}
			currentTheme={currentTheme}
			temperatureUnit={temperatureUnit}
			timezone={timezone}
			systemTimezone={systemTimezone}
			providerType={providerType}
			encryptedOpenRouterApiKey={encryptedOpenRouterApiKey}
			unlockedOpenRouterApiKey={unlockedOpenRouterApiKey}
			encryptedGoogleApiKey={encryptedGoogleApiKey}
			unlockedGoogleApiKey={unlockedGoogleApiKey}
			encryptedOllamaApiKey={encryptedOllamaApiKey}
			unlockedOllamaApiKey={unlockedOllamaApiKey}
			openRouterModel={openRouterModel}
			openRouterModels={openRouterModels}
			googleModel={googleModel}
			googleModels={googleModels}
			isLoadingGoogleModels={isLoadingGoogleModels}
			isLocked={isLocked}
			masterPassword={masterPassword}
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
			experiments={currentExperiments}
			isImporting={isImporting}
			onAppearanceChange={handleAppearanceChange}
			onThemeChange={handleThemeChange}
			onTemperatureUnitChange={handleTemperatureUnitChange}
			onTimezoneChange={handleTimezoneChange}
			onProviderTypeChange={handleProviderTypeChange}
			onToggleExperiment={handleToggleExperiment}
			onMasterPasswordChange={handleMasterPasswordChange}
			onResetSecurity={handleResetSecurity}
			onOpenRouterApiKeyChange={handleOpenRouterApiKeyChange}
			onOpenRouterModelChange={handleOpenRouterModelChange}
			onGoogleApiKeyChange={handleGoogleApiKeyChange}
			onOllamaApiKeyChange={handleOllamaApiKeyChange}
			onGoogleModelChange={handleGoogleModelChange}
			onOllamaModelChange={handleOllamaModelChange}
			onOllamaBaseUrlChange={handleOllamaBaseUrlChange}
			onCheckOllama={handleCheckOllama}
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
