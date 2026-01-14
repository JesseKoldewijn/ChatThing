import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ImageAttachment } from "@/lib/stores/chat";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
	AlertCircle,
	Bot,
	Check,
	Copy,
	Info,
	RefreshCw,
	User,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";

export interface MessageItemUIProps {
	content: string;
	role: "user" | "assistant" | "system";
	images?: ImageAttachment[];
	isStreaming?: boolean;
	isCopied?: boolean;
	onCopy?: () => void;
	onRegenerate?: () => void;
	renderContent?: (content: string, isStreaming?: boolean) => React.ReactNode;
}

// Message Item UI component
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
	const isSystem = role === "system";
	const isError = isSystem && content.includes("❌");
	const hasImages = images && images.length > 0;
	const [lightboxImage, setLightboxImage] = useState<ImageAttachment | null>(
		null,
	);
	// Maintain a persistent image for the closing animation
	const [activeLightboxImage, setActiveLightboxImage] =
		useState<ImageAttachment | null>(null);

	// Update active image when opening
	if (lightboxImage && lightboxImage !== activeLightboxImage) {
		setActiveLightboxImage(lightboxImage);
	}

	// Clear active image when dialog is fully closed (after animation)
	useEffect(() => {
		if (!lightboxImage) {
			const timer = setTimeout(() => {
				setActiveLightboxImage(null);
			}, 500); // Match duration-500
			return () => clearTimeout(timer);
		}
	}, [lightboxImage]);

	if (isSystem) {
		return (
			<div
				data-testid={`message-${role}`}
				className="flex w-full justify-center px-4 py-2"
			>
				<div
					className={cn(
						"flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium shadow-sm",
						isError
							? "bg-destructive/10 text-destructive border-destructive/20"
							: "bg-muted text-muted-foreground border-border",
					)}
				>
					{isError ? (
						<AlertCircle className="h-3.5 w-3.5 shrink-0" />
					) : (
						<Info className="h-3.5 w-3.5 shrink-0" />
					)}
					<div className="flex-1 overflow-hidden text-ellipsis">{content}</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Lightbox Overlay */}
			<DialogPrimitive.Root
				open={!!lightboxImage}
				onOpenChange={(open) => !open && setLightboxImage(null)}
			>
				<DialogPrimitive.Portal>
					<DialogPrimitive.Overlay
						className={cn(
							"fixed inset-0 z-50 bg-black/60 backdrop-blur-md",
							"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:ease-expo-out",
							"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:ease-expo-in",
							"duration-500",
						)}
					/>
					<DialogPrimitive.Content
						className={cn(
							"fixed inset-0 z-50 flex items-center justify-center",
							"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:ease-expo-out",
							"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:ease-expo-in",
							"duration-500",
						)}
						onPointerDownOutside={() => setLightboxImage(null)}
					>
						<DialogPrimitive.Title className="sr-only">
							Image Preview
						</DialogPrimitive.Title>
						<DialogPrimitive.Description className="sr-only">
							{activeLightboxImage?.name ||
								"Full size view of the attached image"}
						</DialogPrimitive.Description>
						<div
							className="relative flex h-full w-full items-center justify-center p-4"
							onClick={() => setLightboxImage(null)}
						>
							<DialogPrimitive.Close asChild>
								<Button
									variant="ghost"
									size="icon"
									className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-white"
									onClick={(e) => e.stopPropagation()}
								>
									<X className="h-6 w-6" />
								</Button>
							</DialogPrimitive.Close>
							<img
								src={activeLightboxImage?.data}
								alt={activeLightboxImage?.name || "Full size image"}
								className="max-h-[85vh] max-w-[90vw] cursor-default rounded-lg object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] [image-rendering:high-quality]"
								onClick={(e) => e.stopPropagation()}
							/>
						</div>
					</DialogPrimitive.Content>
				</DialogPrimitive.Portal>
			</DialogPrimitive.Root>

			<div
				data-testid={`message-${role}`}
				className={cn(
					"group flex w-full min-w-0 gap-3 overflow-hidden px-4 py-4",
					isUser ? "flex-row-reverse" : "flex-row",
				)}
			>
				{/* Avatar */}
				<div
					data-testid={`message-avatar-${role}`}
					className={cn(
						"flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
						isUser
							? "bg-primary text-primary-foreground"
							: "bg-muted text-muted-foreground",
					)}
				>
					{isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
				</div>

				{/* Message bubble */}
				<div
					className={cn(
						"flex max-w-[80%] min-w-0 flex-col gap-1",
						isUser ? "items-end" : "items-start",
					)}
				>
					{/* Sender label */}
					<span
						data-testid={`message-sender-${role}`}
						className="text-muted-foreground px-1 text-xs font-medium"
					>
						{isUser ? "You" : "AI"}
					</span>

					{/* Images (if any) */}
					{hasImages && (
						<div
							className={cn(
								"mb-2 flex flex-wrap gap-2",
								isUser ? "justify-end" : "justify-start",
							)}
						>
							{images.map((image) => (
								<div
									key={image.id}
									className="border-border overflow-hidden rounded-xl border shadow-sm"
								>
									{image.storedInDb && !image.data ? (
										// Show loading placeholder while fetching from IndexedDB
										<div className="bg-muted text-muted-foreground flex h-48 w-48 animate-pulse flex-col items-center justify-center gap-2 p-4 text-center">
											<span className="text-2xl">🖼️</span>
											<span className="text-xs">Loading...</span>
										</div>
									) : image.stripped || !image.data ? (
										// Show placeholder for stripped images (legacy)
										<div className="bg-muted text-muted-foreground flex h-48 w-48 flex-col items-center justify-center gap-2 p-4 text-center">
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
											className="h-48 w-auto max-w-full cursor-pointer object-contain transition-opacity [image-rendering:high-quality] hover:opacity-90"
											onClick={() => setLightboxImage(image)}
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
							"max-w-full min-w-0 overflow-hidden rounded-2xl px-4 py-3",
							isUser
								? "bg-primary text-primary-foreground rounded-tr-sm"
								: "bg-muted text-foreground rounded-tl-sm",
						)}
					>
						<div
							data-testid={`message-content-${role}`}
							className={cn(
								"prose prose-sm max-w-full *:max-w-full",
								isUser ? "prose-invert" : "dark:prose-invert",
							)}
						>
							{renderContent ? (
								renderContent(content, isStreaming)
							) : (
								<p className="m-0 whitespace-pre-wrap">{content}</p>
							)}
							{isStreaming && (
								<span
									data-testid="streaming-cursor"
									className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-current align-middle"
								/>
							)}
						</div>
					</div>

					{/* Action buttons - visible on hover for assistant messages */}
					{!isUser && !isStreaming && content && (
						<div
							data-testid="message-actions"
							className="flex items-center gap-0.5 px-1 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<TooltipProvider delayDuration={0}>
								{onCopy && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												data-testid="copy-message-button"
												variant="ghost"
												size="icon"
												className="text-muted-foreground hover:text-foreground h-7 w-7"
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
											{isCopied ? "Copied!" : "Copy message"}
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
												className="text-muted-foreground hover:text-foreground h-7 w-7"
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
