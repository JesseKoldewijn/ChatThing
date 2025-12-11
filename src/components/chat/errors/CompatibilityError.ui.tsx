import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Monitor, Download, Loader2, Settings, ExternalLink } from "lucide-react";
import type { PromptApiAvailability, BrowserInfo } from "@/lib/ai/compat";
import { Fragment } from "react";

export interface CompatibilityErrorUIProps {
	availability: PromptApiAvailability;
	browserInfo: BrowserInfo;
	errorMessage: string;
	instructions: string | null;
	isChecking?: boolean;
	isDownloading?: boolean;
	onRetry?: () => void;
	onRequestDownload?: () => void;
}

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
			
			// Check if it's a browser internal URL (not clickable from web pages)
			const isInternalUrl = part.startsWith("chrome://") || 
								  part.startsWith("edge://") || 
								  part.startsWith("about:");
			
			if (isInternalUrl) {
				// Show as copyable code-styled text for internal URLs
				return (
					<code
						key={index}
						className="cursor-pointer rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary hover:bg-primary/20 transition-colors"
						onClick={() => {
							navigator.clipboard.writeText(part);
						}}
						title="Click to copy"
					>
						{part}
					</code>
				);
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
				const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
				
				return (
					<p
						key={index}
						className={`text-muted-foreground ${
							isNumberedStep ? "pl-0" : isBullet ? "pl-4" : ""
						}`}
					>
						{renderTextWithLinks(line)}
					</p>
				);
			})}
		</div>
	);
};

export const CompatibilityErrorUI = ({
	availability,
	browserInfo,
	errorMessage,
	instructions,
	isChecking = false,
	isDownloading = false,
	onRetry,
	onRequestDownload,
}: CompatibilityErrorUIProps) => {
	const getIcon = () => {
		switch (availability) {
			case "downloading":
				return <Loader2 className="h-12 w-12 animate-spin text-primary" />;
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

	const showDownloadButton = availability === "downloadable" && onRequestDownload;
	const showDownloadingState = availability === "downloading" || isDownloading;

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-lg">
				<CardHeader className="text-center">
					<div className="mb-4 flex justify-center">{getIcon()}</div>
					<CardTitle className="text-xl">{getTitle()}</CardTitle>
					<CardDescription className="text-balance">{errorMessage}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Browser info */}
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<Monitor className="h-4 w-4" />
						<span>
							{browserInfo.vendor.charAt(0).toUpperCase() + browserInfo.vendor.slice(1)} v{browserInfo.version}
						</span>
					</div>

					{/* Instructions with clickable URLs */}
					{instructions && (
						<div className="rounded-lg bg-muted p-4">
							{renderInstructions(instructions)}
						</div>
					)}

					{/* Tip for copying URLs */}
					{instructions && (instructions.includes("chrome://") || instructions.includes("edge://")) && (
						<p className="text-center text-xs text-muted-foreground">
							<span className="font-medium">Tip:</span> Click the highlighted URLs above to copy them, then paste in a new browser tab.
						</p>
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

						{/* Downloading state */}
						{showDownloadingState && (
							<Button disabled className="w-full">
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Downloading Model...
							</Button>
						)}

						{/* Check again button */}
						{onRetry && (
							<Button
								variant={showDownloadButton || showDownloadingState ? "outline" : "default"}
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
							<p className="mb-2 text-xs font-medium text-foreground">Hardware Requirements:</p>
							<ul className="space-y-1 text-xs text-muted-foreground">
								<li>• At least 16 GB of RAM</li>
								<li>• At least 22 GB of free storage</li>
								<li>• GPU with 4+ GB VRAM (recommended)</li>
								<li>• Windows 10+, macOS 13+, Linux, or ChromeOS</li>
							</ul>
						</div>
					)}

					{/* Browser support note for unsupported browsers */}
					{availability === "unsupported" && (browserInfo.vendor === "firefox" || browserInfo.vendor === "safari" || browserInfo.vendor === "unknown") && (
						<div className="rounded-lg border border-border bg-card p-3 text-center">
							<p className="text-xs text-muted-foreground">
								The Prompt API is currently only available in{" "}
								<span className="font-medium text-foreground">Chrome 138+</span> and{" "}
								<span className="font-medium text-foreground">Edge 138+</span>.
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};
