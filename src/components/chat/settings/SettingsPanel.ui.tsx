import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export interface SettingsPanelUIProps {
	onOpenSettings: () => void;
}

export const SettingsPanelUI = ({
	onOpenSettings,
}: SettingsPanelUIProps) => {
	return (
		<Button
			variant="ghost"
			className="w-full justify-start gap-2"
			onClick={onOpenSettings}
		>
			<Settings className="h-4 w-4" />
			Settings
		</Button>
	);
};

