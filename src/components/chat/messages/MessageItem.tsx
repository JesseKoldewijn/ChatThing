import { useState, useCallback, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { MessageItemUI } from "./MessageItem.ui";
import { messagesAtom, removeMessagesFromTransaction, lastUserMessageAtom, type ImageAttachment } from "@/lib/stores/chat";
import type { Message } from "@/lib/stores/chat";
import { getImages } from "@/lib/stores/imageStorage";

interface MessageItemProps {
	message: Message;
	isStreaming?: boolean;
	onRegenerate?: (prompt: string, transactionId: string) => void;
	renderContent?: (content: string, isStreaming?: boolean) => React.ReactNode;
}

export const MessageItem = ({
	message,
	isStreaming = false,
	onRegenerate,
	renderContent,
}: MessageItemProps) => {
	const [isCopied, setIsCopied] = useState(false);
	const [loadedImages, setLoadedImages] = useState<ImageAttachment[] | undefined>(message.images);
	const messages = useStore(messagesAtom);
	const lastUserMessage = useStore(lastUserMessageAtom);

	// Load images from IndexedDB if they are stored there
	useEffect(() => {
		const loadImagesFromDb = async () => {
			if (!message.images || message.images.length === 0) {
				setLoadedImages(undefined);
				return;
			}

			// Check if any images need to be loaded from IndexedDB
			const imagesNeedingLoad = message.images.filter(
				(img) => img.storedInDb && !img.data
			);

			if (imagesNeedingLoad.length === 0) {
				// All images already have data
				setLoadedImages(message.images);
				return;
			}

			// Load images from IndexedDB
			try {
				const loadedFromDb = await getImages(imagesNeedingLoad.map((img) => img.id));
				
				// Merge loaded images with existing ones
				const mergedImages = message.images.map((img) => {
					if (img.storedInDb && !img.data) {
						const loaded = loadedFromDb.get(img.id);
						if (loaded) {
							return {
								...img,
								data: loaded.data,
							};
						}
					}
					return img;
				});

				setLoadedImages(mergedImages);
			} catch (error) {
				console.error("Failed to load images from IndexedDB:", error);
				setLoadedImages(message.images);
			}
		};

		loadImagesFromDb();
	}, [message.images]);

	const isLastAssistantMessage =
		message.role === "assistant" &&
		messages[messages.length - 1]?.id === message.id;

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(message.content);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch {
			// Clipboard access denied
		}
	}, [message.content]);

	const handleRegenerate = useCallback(() => {
		if (onRegenerate && lastUserMessage) {
			// Remove all assistant and system messages from this transaction (includes tool announcements and errors)
			removeMessagesFromTransaction(lastUserMessage.transactionId);
			// Regenerate with the last user message, preserving the transaction ID
			onRegenerate(lastUserMessage.content, lastUserMessage.transactionId);
		}
	}, [onRegenerate, lastUserMessage]);

	return (
		<MessageItemUI
			content={message.content}
			role={message.role}
			images={loadedImages}
			isStreaming={isStreaming}
			isCopied={isCopied}
			onCopy={handleCopy}
			onRegenerate={isLastAssistantMessage ? handleRegenerate : undefined}
			renderContent={renderContent}
		/>
	);
};

