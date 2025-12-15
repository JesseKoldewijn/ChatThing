import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	AlertTriangle,
	RefreshCw,
	Monitor,
	Download,
	Loader2,
	Settings,
	ExternalLink,
	Check,
	Copy,
} from "lucide-react";
import type {
	PromptApiAvailability,
	BrowserInfo,
	DownloadProgress,
} from "@/lib/ai/compat";
import { Fragment, useState, useCallback } from "react";

export interface CompatibilityErrorUIProps {
	availability: PromptApiAvailability;
	browserInfo: BrowserInfo;
	errorMessage: string;
	instructions: string | null;
	isChecking?: boolean;
	isDownloading?: boolean;
	downloadProgress?: DownloadProgress | null;
	downloadError?: string | null;
	onRetry?: () => void;
	onRequestDownload?: () => void;
}

/**
 * Component for browser internal URLs (chrome://, edge://) that copies on click
 * Shows visual feedback when copied
 */
const InternalUrlLink = ({ url }: { url: string }) => {
	const [copied, setCopied] = useState(false);

	const handleClick = useCallback(() => {
		navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2500);
	}, [url]);

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`flex items-center gap-1.5 cursor-pointer rounded px-2 py-1 font-mono text-xs transition-all my-1 w-fit ${
				copied
					? "bg-green-500/20 text-green-600 dark:text-green-400 ring-1 ring-green-500/30"
					: "bg-primary/10 text-primary hover:bg-primary/20"
			}`}
			title={
				copied
					? "Copied to clipboard!"
					: "Click to copy, then paste in address bar"
			}
		>
			{copied ? (
				<>
					<Check className="h-3.5 w-3.5 shrink-0" />
					<span className="font-sans font-medium">
						Copied to clipboard!
					</span>
				</>
			) : (
				<>
					<span className="break-all">{url}</span>
					<Copy className="h-3.5 w-3.5 shrink-0" />
				</>
			)}
		</button>
	);
};

/**
 * Parse text and convert URLs to clickable links
 * Handles chrome://, edge://, and https:// URLs
 */
const renderTextWithLinks = (text: string): React.ReactNode => {
	// Match chrome://, edge://, about:, and https:// URLs
	const urlPattern = /((?:chrome|edge|about|https?):\/\/[^\s)]+)/g;
	const parts = text.split(urlPattern);

	return parts.map((part, index) => {
		if (urlPattern.test(part)) {
			// Reset lastIndex since we're reusing the regex
			urlPattern.lastIndex = 0;

			// Check if it's a browser internal URL
			const isInternalUrl =
				part.startsWith("chrome://") ||
				part.startsWith("edge://") ||
				part.startsWith("about:");

			if (isInternalUrl) {
				// Browser internal URLs - copy on click (can't open directly due to security)
				return <InternalUrlLink key={index} url={part} />;
			} else {
				// Regular external URL - make it a link
				return (
					<a
						key={index}
						href={part}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-0.5 text-primary underline hover:no-underline"
					>
						{part}
						<ExternalLink className="h-3 w-3" />
					</a>
				);
			}
		}
		return <Fragment key={index}>{part}</Fragment>;
	});
};

/**
 * Render instructions with proper formatting and clickable URLs
 */
const renderInstructions = (instructions: string): React.ReactNode => {
	const lines = instructions.split("\n");

	return (
		<div className="space-y-2 text-sm">
			{lines.map((line, index) => {
				// Skip empty lines but preserve spacing
				if (!line.trim()) {
					return <div key={index} className="h-2" />;
				}

				// Check if it's a numbered step
				const isNumberedStep = /^\d+\./.test(line.trim());
				// Check if it's a bullet point
				const isBullet =
					line.trim().startsWith("•") || line.trim().startsWith("-");

				return (
					<div
						key={index}
						className={`text-muted-foreground ${
							isNumberedStep ? "pl-0" : isBullet ? "pl-4" : ""
						}`}
					>
						{renderTextWithLinks(line)}
					</div>
				);
			})}
		</div>
	);
};

/**
 * Format bytes to human readable string
 */
const formatBytes = (bytes: number): string => {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const CompatibilityErrorUI = ({
	availability,
	browserInfo,
	errorMessage,
	instructions,
	isChecking = false,
	isDownloading = false,
	downloadProgress = null,
	downloadError = null,
	onRetry,
	onRequestDownload,
}: CompatibilityErrorUIProps) => {
	const getIcon = () => {
		switch (availability) {
			case "downloading":
				return (
					<Loader2 className="h-12 w-12 animate-spin text-primary" />
				);
			case "downloadable":
				return <Download className="h-12 w-12 text-primary" />;
			case "unsupported":
				return <Settings className="h-12 w-12 text-muted-foreground" />;
			default:
				return <AlertTriangle className="h-12 w-12 text-destructive" />;
		}
	};

	const getTitle = () => {
		switch (availability) {
			case "downloading":
				return "Downloading AI Model";
			case "downloadable":
				return "AI Model Required";
			case "unsupported":
				return "Setup Required";
			case "unavailable":
				return "AI Not Available";
			default:
				return "Compatibility Issue";
		}
	};

	const showDownloadButton =
		availability === "downloadable" && onRequestDownload;
	const showDownloadingState =
		availability === "downloading" || isDownloading;

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-lg">
				<CardHeader className="text-center">
					<div className="mb-4 flex justify-center">{getIcon()}</div>
					<CardTitle className="text-xl">{getTitle()}</CardTitle>
					<CardDescription className="text-balance">
						{errorMessage}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Browser info */}
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<Monitor className="h-4 w-4" />
						<span>
							{browserInfo.vendor.charAt(0).toUpperCase() +
								browserInfo.vendor.slice(1)}{" "}
							v{browserInfo.version}
						</span>
					</div>

					{/* Instructions with clickable URLs */}
					{instructions && (
						<div className="rounded-lg bg-muted p-4">
							{renderInstructions(instructions)}
						</div>
					)}

					{/* Tip for copying URLs */}
					{instructions &&
						(instructions.includes("chrome://") ||
							instructions.includes("edge://")) && (
							<p className="text-center text-xs text-muted-foreground">
								<span className="font-medium">Tip:</span> Click
								the URLs above to copy them, then paste in your
								browser's address bar.
							</p>
						)}

					{/* Download error */}
					{downloadError && (
						<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
							<p className="text-sm text-destructive">
								{downloadError}
							</p>
						</div>
					)}

					{/* Download progress */}
					{showDownloadingState && downloadProgress && (
						<div className="space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span className="text-muted-foreground">
									Downloading AI Model...
								</span>
								<span className="font-medium text-foreground">
									{downloadProgress.percentage}%
								</span>
							</div>
							<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
								<div
									className="h-full bg-primary transition-all duration-300 ease-out"
									style={{
										width: `${downloadProgress.percentage}%`,
									}}
								/>
							</div>
							<p className="text-center text-xs text-muted-foreground">
								{formatBytes(downloadProgress.loaded)} of{" "}
								{formatBytes(downloadProgress.total)}
							</p>
						</div>
					)}

					{/* Actions */}
					<div className="flex flex-col gap-2">
						{/* Download model button - only for downloadable state */}
						{showDownloadButton && !showDownloadingState && (
							<Button
								onClick={onRequestDownload}
								className="w-full"
								disabled={isDownloading}
							>
								<Download className="mr-2 h-4 w-4" />
								Download AI Model
							</Button>
						)}

						{/* Downloading state without progress (initial state) */}
						{showDownloadingState && !downloadProgress && (
							<Button disabled className="w-full">
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Starting Download...
							</Button>
						)}

						{/* Check again button */}
						{onRetry && (
							<Button
								variant={
									showDownloadButton || showDownloadingState
										? "outline"
										: "default"
								}
								onClick={onRetry}
								disabled={isChecking}
								className="w-full"
							>
								{isChecking ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									<RefreshCw className="mr-2 h-4 w-4" />
								)}
								{isChecking ? "Checking..." : "Check Again"}
							</Button>
						)}
					</div>

					{/* Hardware requirements note */}
					{availability === "unavailable" && (
						<div className="rounded-lg border border-border bg-card p-3">
							<p className="mb-2 text-xs font-medium text-foreground">
								Hardware Requirements:
							</p>
							<ul className="space-y-1 text-xs text-muted-foreground">
								<li>• At least 16 GB of RAM</li>
								<li>• At least 22 GB of free storage</li>
								<li>• GPU with 4+ GB VRAM (recommended)</li>
								<li>
									• Windows 10+, macOS 13+, Linux, or ChromeOS
								</li>
							</ul>
						</div>
					)}

					{/* Browser support note for unsupported browsers */}
					{availability === "unsupported" &&
						(browserInfo.vendor === "firefox" ||
							browserInfo.vendor === "safari" ||
							browserInfo.vendor === "unknown") && (
							<div className="rounded-lg border border-border bg-card p-3 text-center">
								<p className="text-xs text-muted-foreground">
									The Prompt API is currently only available
									in{" "}
									<span className="font-medium text-foreground">
										Chrome 138+
									</span>{" "}
									and{" "}
									<span className="font-medium text-foreground">
										Edge 138+
									</span>
									.
								</p>
							</div>
						)}
				</CardContent>
			</Card>
		</div>
	);
};
