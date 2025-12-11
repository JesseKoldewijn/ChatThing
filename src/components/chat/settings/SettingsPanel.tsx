import { useCallback } from "react";
import { SettingsPanelUI } from "./SettingsPanel.ui";
import { goToSettings } from "@/lib/stores/navigation";

export const SettingsPanel = () => {
	const handleOpenSettings = useCallback(() => {
		goToSettings();
	}, []);

	return (
		<SettingsPanelUI
			onOpenSettings={handleOpenSettings}
		/>
	);
};

