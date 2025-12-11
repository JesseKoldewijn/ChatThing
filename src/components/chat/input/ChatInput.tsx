import { useCallback } from "react";
import { useStore } from "@nanostores/react";
import { ChatInputUI } from "./ChatInput.ui";
import { 
	isStreamingAtom, 
	pendingImagesAtom,
	addPendingImage,
	removePendingImage,
	clearPendingImages,
	fileToImageAttachment,
	type ImageAttachment,
} from "@/lib/stores/chat";
import { atom } from "nanostores";

// Local input state as nanostore
const inputAtom = atom<string>("");

interface ChatInputProps {
	onSend: (message: string, images?: ImageAttachment[]) => void;
	onStop?: () => void;
	isDisabled?: boolean;
}

export const ChatInput = ({ onSend, onStop, isDisabled = false }: ChatInputProps) => {
	const input = useStore(inputAtom);
	const isStreaming = useStore(isStreamingAtom);
	const pendingImages = useStore(pendingImagesAtom);

	const handleChange = useCallback((value: string) => {
		inputAtom.set(value);
	}, []);

	const handleSubmit = useCallback(() => {
		const trimmedInput = input.trim();
		const images = pendingImages.length > 0 ? [...pendingImages] : undefined;
		
		// Allow submit with just images (no text required)
		if (trimmedInput || images) {
			onSend(trimmedInput || "What's in this image?", images);
			inputAtom.set("");
			clearPendingImages();
		}
	}, [input, pendingImages, onSend]);

	const handleImageSelect = useCallback(async (files: FileList) => {
		// Convert files to ImageAttachments
		const imagePromises = Array.from(files).map((file) => {
			// Validate file type
			if (!file.type.startsWith("image/")) {
				console.warn(`Skipping non-image file: ${file.name}`);
				return null;
			}
			// Limit file size to 10MB
			if (file.size > 10 * 1024 * 1024) {
				console.warn(`Skipping large file: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`);
				return null;
			}
			return fileToImageAttachment(file);
		});

		const images = (await Promise.all(imagePromises)).filter(Boolean) as ImageAttachment[];
		
		for (const image of images) {
			addPendingImage(image);
		}
	}, []);

	const handleRemoveImage = useCallback((id: string) => {
		removePendingImage(id);
	}, []);

	return (
		<ChatInputUI
			value={input}
			onChange={handleChange}
			onSubmit={handleSubmit}
			onStop={onStop}
			onImageSelect={handleImageSelect}
			onRemoveImage={handleRemoveImage}
			pendingImages={pendingImages}
			isLoading={isStreaming}
			isDisabled={isDisabled}
		/>
	);
};
