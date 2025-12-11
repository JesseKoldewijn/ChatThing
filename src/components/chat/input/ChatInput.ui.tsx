import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Square, ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ImageAttachment } from "@/lib/stores/chat";

export interface ChatInputUIProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	onStop?: () => void;
	onImageSelect?: (files: FileList) => void;
	onRemoveImage?: (id: string) => void;
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
		<div className="shrink-0 border-t bg-background p-4">
			<div className="mx-auto max-w-3xl">
				{/* Pending images preview */}
				{pendingImages.length > 0 && (
					<div className="mb-3 flex flex-wrap gap-2">
						{pendingImages.map((image) => (
							<div
								key={image.id}
								className="group relative h-20 w-20 overflow-hidden rounded-lg border-2 border-border bg-muted"
							>
								<img
									src={image.data}
									alt={image.name || "Attached image"}
									className="h-full w-full object-cover"
								/>
								<button
									type="button"
									onClick={() => onRemoveImage?.(image.id)}
									className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-md"
									aria-label="Remove image"
								>
									<X className="h-4 w-4" />
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
						type="file"
						accept="image/jpeg,image/png,image/gif,image/webp"
						multiple
						className="hidden"
						onChange={handleFileChange}
					/>

					{/* Image upload button */}
					<Button
						type="button"
						size="icon"
						variant="outline"
						onClick={handleImageButtonClick}
						disabled={isDisabled || isLoading}
						className="h-[52px] w-[52px] shrink-0 rounded-xl"
						title="Attach image"
					>
						<ImagePlus className="h-5 w-5" />
					</Button>

					{/* Text input */}
					<div className="relative flex-1">
						<Textarea
							value={value}
							onChange={(e) => onChange(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder={
								pendingImages.length > 0
									? "Add a message about the image(s)..."
									: placeholder
							}
							disabled={isDisabled}
							className={cn(
								"min-h-[52px] max-h-[200px] resize-none py-3.5 px-4",
								"rounded-xl border-2 border-input bg-background",
								"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
								"transition-all duration-200"
							)}
							rows={1}
						/>
					</div>

					{/* Send/Stop button */}
					{isLoading ? (
						<Button
							type="button"
							size="icon"
							variant="destructive"
							onClick={onStop}
							className="h-[52px] w-[52px] shrink-0 rounded-xl"
						>
							<Square className="h-5 w-5" />
						</Button>
					) : (
						<Button
							type="button"
							size="icon"
							onClick={onSubmit}
							disabled={isDisabled || !canSubmit}
							className="h-[52px] w-[52px] shrink-0 rounded-xl"
						>
							{isLoading ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<Send className="h-5 w-5" />
							)}
						</Button>
					)}
				</div>

				<p className="mt-2 text-center text-xs text-muted-foreground">
					Press{" "}
					<kbd className="rounded bg-muted px-1 py-0.5">Enter</kbd> to
					send,{" "}
					<kbd className="rounded bg-muted px-1 py-0.5">
						Shift + Enter
					</kbd>{" "}
					for new line
				</p>
			</div>
		</div>
	);
};
