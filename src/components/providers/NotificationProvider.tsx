import { useStore } from "@nanostores/react";
import { notificationsAtom, removeNotification } from "@/lib/stores/notifications";
import { cn } from "@/lib/utils";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const icons = {
	success: CheckCircle2,
	error: AlertCircle,
	info: Info,
	warning: AlertTriangle,
};

const variants = {
	success: "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400",
	error: "bg-destructive/10 border-destructive/20 text-destructive",
	info: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
	warning: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
};

export const NotificationProvider = () => {
	const notifications = useStore(notificationsAtom);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
			{notifications.map((notification) => {
				const Icon = icons[notification.type];
				return (
					<div
						key={notification.id}
						className={cn(
							"flex items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-right-full fade-in duration-300 pointer-events-auto",
							variants[notification.type]
						)}
					>
						<Icon className="h-5 w-5 shrink-0" />
						<div className="flex-1 text-sm font-medium">
							{notification.message}
						</div>
						<button
							onClick={() => removeNotification(notification.id)}
							className="shrink-0 hover:opacity-70 transition-opacity"
						>
							<X className="h-4 w-4" />
						</button>
					</div>
				);
			})}
		</div>
	);
};
