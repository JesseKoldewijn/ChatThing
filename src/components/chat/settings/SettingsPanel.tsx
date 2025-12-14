import { useCallback } from "react";
import { SettingsPanelUI } from "./SettingsPanel.ui";
import { goToSettings, goToUsage } from "@/lib/stores/navigation";

export const SettingsPanel = () => {
	const handleOpenSettings = useCallback(() => {
		goToSettings();
	}, []);

	const handleOpenUsage = useCallback(() => {
		goToUsage();
	}, []);

	return (
		<SettingsPanelUI
			onOpenSettings={handleOpenSettings}
			onOpenUsage={handleOpenUsage}
		/>
	);
};

