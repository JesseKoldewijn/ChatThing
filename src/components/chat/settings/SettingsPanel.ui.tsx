import { Button } from "@/components/ui/button";
import { Settings, BarChart3 } from "lucide-react";

export interface SettingsPanelUIProps {
	onOpenSettings: () => void;
	onOpenUsage: () => void;
}

export const SettingsPanelUI = ({
	onOpenSettings,
	onOpenUsage,
}: SettingsPanelUIProps) => {
	return (
		<div className="flex flex-col gap-1">
			<Button
				variant="ghost"
				className="w-full justify-start gap-2"
				onClick={onOpenUsage}
			>
				<BarChart3 className="h-4 w-4" />
				Usage
			</Button>
			<Button
				variant="ghost"
				className="w-full justify-start gap-2"
				onClick={onOpenSettings}
			>
				<Settings className="h-4 w-4" />
				Settings
			</Button>
		</div>
	);
};
