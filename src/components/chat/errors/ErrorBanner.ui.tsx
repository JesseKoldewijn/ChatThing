import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	AlertTriangle,
	Wifi,
	Clock,
	FileWarning,
	ShieldAlert,
	Bot,
	HelpCircle,
	X,
	RefreshCw,
} from "lucide-react";
import type { ErrorCategory } from "@/lib/stores/errors";

export interface ErrorBannerUIProps {
	title: string;
	message: string;
	category: ErrorCategory;
	isRetryable: boolean;
	onRetry?: () => void;
	onDismiss?: () => void;
}

const categoryIcons: Record<ErrorCategory, React.ComponentType<{ className?: string }>> = {
	network: Wifi,
	rate_limit: Clock,
	context: FileWarning,
	model: Bot,
	permission: ShieldAlert,
	api: AlertTriangle,
	unknown: HelpCircle,
};

const categoryColors: Record<ErrorCategory, string> = {
	network: "border-orange-500/50 bg-orange-500/10",
	rate_limit: "border-yellow-500/50 bg-yellow-500/10",
	context: "border-blue-500/50 bg-blue-500/10",
	model: "border-purple-500/50 bg-purple-500/10",
	permission: "border-red-500/50 bg-red-500/10",
	api: "border-red-500/50 bg-red-500/10",
	unknown: "border-muted-foreground/50 bg-muted",
};

const categoryIconColors: Record<ErrorCategory, string> = {
	network: "text-orange-500",
	rate_limit: "text-yellow-500",
	context: "text-blue-500",
	model: "text-purple-500",
	permission: "text-red-500",
	api: "text-red-500",
	unknown: "text-muted-foreground",
};

export const ErrorBannerUI = ({
	title,
	message,
	category,
	isRetryable,
	onRetry,
	onDismiss,
}: ErrorBannerUIProps) => {
	const Icon = categoryIcons[category];

	return (
		<div
			className={cn(
				"mx-4 mb-4 rounded-lg border-2 p-4",
				categoryColors[category]
			)}
			role="alert"
		>
			<div className="flex items-start gap-3">
				{/* Icon */}
				<div className={cn("mt-0.5 shrink-0", categoryIconColors[category])}>
					<Icon className="h-5 w-5" />
				</div>

				{/* Content */}
				<div className="min-w-0 flex-1">
					<h3 className="font-semibold text-foreground">{title}</h3>
					<p className="mt-1 text-sm text-muted-foreground">{message}</p>

					{/* Actions */}
					<div className="mt-3 flex flex-wrap items-center gap-2">
						{isRetryable && onRetry && (
							<Button
								size="sm"
								variant="outline"
								onClick={onRetry}
								className="h-8"
							>
								<RefreshCw className="mr-1.5 h-3.5 w-3.5" />
								Try Again
							</Button>
						)}

						{category === "context" && (
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									// This would trigger a new conversation
									window.location.reload();
								}}
								className="h-8"
							>
								Start New Chat
							</Button>
						)}

						{category === "rate_limit" && (
							<span className="text-xs text-muted-foreground">
								Please wait a few seconds before retrying
							</span>
						)}
					</div>
				</div>

				{/* Dismiss button */}
				{onDismiss && (
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 shrink-0"
						onClick={onDismiss}
					>
						<X className="h-4 w-4" />
						<span className="sr-only">Dismiss</span>
					</Button>
				)}
			</div>
		</div>
	);
};

