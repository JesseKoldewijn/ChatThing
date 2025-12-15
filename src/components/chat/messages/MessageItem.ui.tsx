import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw, User, Bot, X } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/components/ui/tooltip";
import { type ImageAttachment } from "@/lib/stores/chat";

export interface MessageItemUIProps {
	content: string;
	role: "user" | "assistant";
	images?: ImageAttachment[];
	isStreaming?: boolean;
	isCopied?: boolean;
	onCopy?: () => void;
	onRegenerate?: () => void;
	renderContent?: (content: string) => React.ReactNode;
}

export const MessageItemUI = ({
	content,
	role,
	images,
	isStreaming = false,
	isCopied = false,
	onCopy,
	onRegenerate,
	renderContent,
}: MessageItemUIProps) => {
	const isUser = role === "user";
	const hasImages = images && images.length > 0;
	const [lightboxImage, setLightboxImage] = useState<ImageAttachment | null>(
		null
	);

	return (
		<>
			{/* Lightbox Overlay */}
			{lightboxImage && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
					onClick={() => setLightboxImage(null)}
				>
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
						onClick={(e) => {
							e.stopPropagation();
							setLightboxImage(null);
						}}
					>
						<X className="h-6 w-6" />
					</Button>
					<img
						src={lightboxImage.data}
						alt={lightboxImage.name || "Full size image"}
						className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			)}
			<div
				data-testid={`message-${role}`}
				className={cn(
					"group flex w-full min-w-0 gap-3 px-4 py-4 overflow-hidden",
					isUser ? "flex-row-reverse" : "flex-row"
				)}
			>
				{/* Avatar */}
				<div
					data-testid={`message-avatar-${role}`}
					className={cn(
						"flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
						isUser
							? "bg-primary text-primary-foreground"
							: "bg-muted text-muted-foreground"
					)}
				>
					{isUser ? (
						<User className="h-4 w-4" />
					) : (
						<Bot className="h-4 w-4" />
					)}
				</div>

				{/* Message bubble */}
				<div
					className={cn(
						"flex min-w-0 max-w-[80%] flex-col gap-1",
						isUser ? "items-end" : "items-start"
					)}
				>
					{/* Sender label */}
					<span data-testid={`message-sender-${role}`} className="px-1 text-xs font-medium text-muted-foreground">
						{isUser ? "You" : "AI"}
					</span>

					{/* Images (if any) */}
					{hasImages && (
						<div
							className={cn(
								"flex flex-wrap gap-2 mb-2",
								isUser ? "justify-end" : "justify-start"
							)}
						>
							{images.map((image) => (
								<div
									key={image.id}
									className="overflow-hidden rounded-xl border border-border shadow-sm"
								>
									{image.storedInDb && !image.data ? (
										// Show loading placeholder while fetching from IndexedDB
										<div className="flex h-32 w-32 flex-col items-center justify-center gap-2 bg-muted p-4 text-center text-muted-foreground animate-pulse">
											<span className="text-2xl">🖼️</span>
											<span className="text-xs">
												Loading...
											</span>
										</div>
									) : image.stripped || !image.data ? (
										// Show placeholder for stripped images (legacy)
										<div className="flex h-32 w-32 flex-col items-center justify-center gap-2 bg-muted p-4 text-center text-muted-foreground">
											<span className="text-2xl">🖼️</span>
											<span className="text-xs">
												{image.name || "Image"}
												<br />
												<span className="text-[10px] opacity-70">
													(not saved)
												</span>
											</span>
										</div>
									) : (
										<img
											src={image.data}
											alt={image.name || "Attached image"}
											className="max-h-64 max-w-xs object-contain cursor-pointer hover:opacity-90 transition-opacity"
											onClick={() =>
												setLightboxImage(image)
											}
										/>
									)}
								</div>
							))}
						</div>
					)}

					{/* Message content */}
					<div
						data-testid={`message-bubble-${role}`}
						className={cn(
							"min-w-0 max-w-full overflow-hidden rounded-2xl px-4 py-3",
							isUser
								? "bg-primary text-primary-foreground rounded-tr-sm"
								: "bg-muted text-foreground rounded-tl-sm"
						)}
					>
						<div
							data-testid={`message-content-${role}`}
							className={cn(
								"prose prose-sm max-w-full *:max-w-full",
								isUser ? "prose-invert" : "dark:prose-invert"
							)}
						>
							{renderContent ? (
								renderContent(content)
							) : (
								<p className="m-0 whitespace-pre-wrap">
									{content}
								</p>
							)}
							{isStreaming && (
								<span data-testid="streaming-cursor" className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-current align-middle" />
							)}
						</div>
					</div>

					{/* Action buttons - visible on hover for assistant messages */}
					{!isUser && !isStreaming && content && (
						<div data-testid="message-actions" className="flex items-center gap-0.5 px-1 opacity-0 transition-opacity group-hover:opacity-100">
							<TooltipProvider delayDuration={0}>
								{onCopy && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												data-testid="copy-message-button"
												variant="ghost"
												size="icon"
												className="h-7 w-7 text-muted-foreground hover:text-foreground"
												onClick={onCopy}
											>
												{isCopied ? (
													<Check className="h-3.5 w-3.5 text-green-500" />
												) : (
													<Copy className="h-3.5 w-3.5" />
												)}
											</Button>
										</TooltipTrigger>
										<TooltipContent side="bottom">
											{isCopied
												? "Copied!"
												: "Copy message"}
										</TooltipContent>
									</Tooltip>
								)}

								{onRegenerate && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												data-testid="regenerate-button"
												variant="ghost"
												size="icon"
												className="h-7 w-7 text-muted-foreground hover:text-foreground"
												onClick={onRegenerate}
											>
												<RefreshCw className="h-3.5 w-3.5" />
											</Button>
										</TooltipTrigger>
										<TooltipContent side="bottom">
											Regenerate response
										</TooltipContent>
									</Tooltip>
								)}
							</TooltipProvider>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
