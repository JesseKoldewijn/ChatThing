import { useNavigation } from "@/lib/hooks/useNavigation";
import { useCallback } from "react";
import { SettingsPanelUI } from "./SettingsPanel.ui";

export const SettingsPanel = () => {
	const { goToSettings, goToUsage } = useNavigation();

	const handleOpenSettings = useCallback(() => {
		goToSettings();
	}, [goToSettings]);

	const handleOpenUsage = useCallback(() => {
		goToUsage();
	}, [goToUsage]);

	return (
		<SettingsPanelUI
			onOpenSettings={handleOpenSettings}
			onOpenUsage={handleOpenUsage}
		/>
	);
};
