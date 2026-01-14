import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ImageAttachment } from "@/lib/stores/chat";
import { cn } from "@/lib/utils";
import { ImagePlus, Loader2, Send, Square, X } from "lucide-react";
import { useRef } from "react";

export interface ChatInputUIProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	onStop?: () => void;
	onImageSelect?: (files: FileList) => void;
	onRemoveImage?: (id: string) => void;
	onPaste?: (e: React.ClipboardEvent) => void;
	pendingImages?: ImageAttachment[];
	isLoading?: boolean;
	isDisabled?: boolean;
	placeholder?: string;
}

export const ChatInputUI = ({
	value,
	onChange,
	onSubmit,
	onStop,
	onImageSelect,
	onRemoveImage,
	onPaste,
	pendingImages = [],
	isLoading = false,
	isDisabled = false,
	placeholder = "Type your message...",
}: ChatInputUIProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (
				!isLoading &&
				!isDisabled &&
				(value.trim() || pendingImages.length > 0)
			) {
				onSubmit();
			}
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			onImageSelect?.(e.target.files);
			// Reset the input so the same file can be selected again
			e.target.value = "";
		}
	};

	const handleImageButtonClick = () => {
		fileInputRef.current?.click();
	};

	const canSubmit = value.trim() || pendingImages.length > 0;

	return (
		<div
			data-testid="chat-input"
			className="bg-background shrink-0 border-t p-4"
		>
			<div className="mx-auto max-w-3xl">
				{/* Pending images preview */}
				{pendingImages.length > 0 && (
					<div
						data-testid="pending-images"
						className="mb-3 flex flex-wrap gap-2"
					>
						{pendingImages.map((image) => (
							<div
								key={image.id}
								data-testid={`pending-image-${image.id}`}
								className="group border-border bg-muted relative h-20 w-20 overflow-hidden rounded-lg border-2"
							>
								<img
									src={image.data}
									alt={image.name || "Attached image"}
									className="h-full w-full object-cover [image-rendering:high-quality]"
								/>
								<button
									type="button"
									data-testid={`remove-image-${image.id}`}
									onClick={() => onRemoveImage?.(image.id)}
									className="hover:bg-destructive absolute top-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white shadow-sm backdrop-blur-sm transition-all hover:scale-110"
									aria-label="Remove image"
								>
									<X className="h-3.5 w-3.5" />
								</button>
								{image.name && (
									<div className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-1 py-0.5 text-[10px] text-white">
										{image.name}
									</div>
								)}
							</div>
						))}
					</div>
				)}

				<div className="flex items-end gap-2">
					{/* Hidden file input */}
					<input
						ref={fileInputRef}
						data-testid="image-file-input"
						type="file"
						accept="image/jpeg,image/png,image/gif,image/webp"
						multiple
						className="hidden"
						onChange={handleFileChange}
					/>

					{/* Image upload button */}
					<Button
						type="button"
						data-testid="attach-image-button"
						size="icon"
						variant="outline"
						onClick={handleImageButtonClick}
						disabled={isDisabled || isLoading}
						className="h-[52px] w-[52px] shrink-0 rounded-xl transition-none"
						title="Attach image"
						aria-label="Attach image"
					>
						<ImagePlus className="h-5 w-5" />
					</Button>

					{/* Text input */}
					<div className="relative flex-1">
						<Textarea
							data-testid="chat-textarea"
							value={value}
							onChange={(e) => onChange(e.target.value)}
							onKeyDown={handleKeyDown}
							onPaste={onPaste}
							placeholder={
								pendingImages.length > 0 ? "Add a description..." : placeholder
							}
							disabled={isDisabled}
							className={cn(
								"max-h-[200px] min-h-[52px] resize-none px-4 py-3.5",
								"border-input bg-background dark:bg-input/30 rounded-xl border-2",
								"focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-0",
								"transition-none",
							)}
							rows={1}
						/>
					</div>

					{/* Send/Stop button */}
					{isLoading ? (
						<Button
							type="button"
							data-testid="stop-button"
							size="icon"
							variant="destructive"
							onClick={onStop}
							className="h-[52px] w-[52px] shrink-0 rounded-xl transition-none"
							aria-label="Stop generating"
						>
							<Square className="h-5 w-5" />
						</Button>
					) : (
						<Button
							type="button"
							data-testid="send-button"
							size="icon"
							onClick={onSubmit}
							disabled={isDisabled || !canSubmit}
							className="h-[52px] w-[52px] shrink-0 rounded-xl transition-none"
							aria-label="Send message"
						>
							{isLoading ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<Send className="h-5 w-5" />
							)}
						</Button>
					)}
				</div>

				<p
					data-testid="chat-input-hint"
					className="text-muted-foreground mt-2 text-center text-xs"
				>
					Press <kbd className="bg-muted rounded px-1 py-0.5">Enter</kbd> to
					send,{" "}
					<kbd className="bg-muted rounded px-1 py-0.5">Shift + Enter</kbd> for
					new line
				</p>
			</div>
		</div>
	);
};
