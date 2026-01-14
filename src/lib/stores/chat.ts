import { atom, computed } from "nanostores";
import { getImages, saveImage } from "./imageStorage";

// Image attachment type
export interface ImageAttachment {
	id: string;
	data: string; // base64 data URL (in memory) or empty (stored in IndexedDB)
	mimeType: string;
	name?: string;
	/** @deprecated Use storedInDb instead */
	stripped?: boolean;
	storedInDb?: boolean; // True if image data is stored in IndexedDB
}

export interface Message {
	id: string;
	transactionId: string; // Links prompts with their responses
	role: "user" | "assistant" | "system";
	content: string; // Keep as string for backwards compatibility and simple display
	images?: ImageAttachment[]; // Optional images attached to the message
	timestamp: number;
}

/**
 * Hydrate message images from IndexedDB
 * Restores data strings for messages where storedInDb is true
 */
export const hydrateMessages = async (
	messages: Message[],
): Promise<Message[]> => {
	const hydratedMessages: Message[] = [];

	for (const msg of messages) {
		if (!msg.images || msg.images.length === 0) {
			hydratedMessages.push(msg);
			continue;
		}

		// Check if any images need to be loaded from IndexedDB
		const imagesNeedingLoad = msg.images.filter(
			(img) => img.storedInDb && !img.data,
		);

		if (imagesNeedingLoad.length === 0) {
			hydratedMessages.push(msg);
			continue;
		}

		// Load images from IndexedDB
		try {
			const loadedFromDb = await getImages(
				imagesNeedingLoad.map((img) => img.id),
			);

			// Merge loaded images with existing ones
			const hydratedImages = msg.images.map((img) => {
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

			hydratedMessages.push({
				...msg,
				images: hydratedImages,
			});
		} catch (error) {
			if (import.meta.env.DEV) {
				console.error("Failed to hydrate message images:", msg.id, error);
			}
			hydratedMessages.push(msg);
		}
	}

	return hydratedMessages;
};

// All messages in the current conversation
export const messagesAtom = atom<Message[]>([]);

// Current streaming content (live updates as AI responds)
export const currentStreamAtom = atom<string>("");

// Whether we're currently streaming a response
export const isStreamingAtom = atom<boolean>(false);

// Pending image attachments for the next message
export const pendingImagesAtom = atom<ImageAttachment[]>([]);

// Computed: last user message (for regenerate functionality)
export const lastUserMessageAtom = computed(messagesAtom, (messages) => {
	const userMessages = messages.filter((m) => m.role === "user");
	return userMessages[userMessages.length - 1] ?? null;
});

// Options for addMessage
export interface AddMessageOptions {
	images?: ImageAttachment[];
	transactionId?: string;
}

// Actions
export const addMessage = (
	role: Message["role"],
	content: string,
	options?: AddMessageOptions,
) => {
	const currentMessages = messagesAtom.get();
	const transactionId = options?.transactionId ?? crypto.randomUUID();

	// If this is an assistant message with a transactionId, check if one already exists
	// for this transaction to avoid duplicates during retries/regeneration
	// and to support streaming updates.
	if (role === "assistant" && options?.transactionId) {
		const index = currentMessages.findIndex(
			(m) => m.transactionId === options.transactionId && m.role === role,
		);
		if (index !== -1) {
			const updatedMessages = [...currentMessages];
			updatedMessages[index] = {
				...updatedMessages[index],
				content,
				images: options.images,
			};
			messagesAtom.set(updatedMessages);
			return updatedMessages[index];
		}
	}

	// For system messages, we only deduplicate if the content is EXACTLY the same
	// to avoid spamming the same tool announcement or error multiple times.
	if (role === "system" && options?.transactionId) {
		const index = currentMessages.findIndex(
			(m) =>
				m.transactionId === options.transactionId &&
				m.role === role &&
				m.content === content,
		);
		if (index !== -1) {
			return currentMessages[index];
		}
	}

	const message: Message = {
		id: crypto.randomUUID(),
		transactionId,
		role,
		content,
		images:
			options?.images && options.images.length > 0 ? options.images : undefined,
		timestamp: Date.now(),
	};
	messagesAtom.set([...currentMessages, message]);
	return message;
};

export const updateLastAssistantMessage = (content: string) => {
	const messages = messagesAtom.get();
	const lastIndex = messages.length - 1;
	if (lastIndex >= 0 && messages[lastIndex].role === "assistant") {
		const updated = [...messages];
		updated[lastIndex] = { ...updated[lastIndex], content };
		messagesAtom.set(updated);
	}
};

export const removeLastMessage = () => {
	const messages = messagesAtom.get();
	if (messages.length > 0) {
		messagesAtom.set(messages.slice(0, -1));
	}
};

/**
 * Remove all assistant and system messages from a specific transaction
 * Used when regenerating a response to remove tool announcements, errors and previous responses
 */
export const removeMessagesFromTransaction = (transactionId: string) => {
	const messages = messagesAtom.get();
	messagesAtom.set(
		messages.filter(
			(m) =>
				!(
					m.transactionId === transactionId &&
					(m.role === "assistant" || m.role === "system")
				),
		),
	);
};

export const clearMessages = () => {
	messagesAtom.set([]);
	currentStreamAtom.set("");
	isStreamingAtom.set(false);
	pendingImagesAtom.set([]);
};

export const appendToStream = (chunk: string) => {
	currentStreamAtom.set(currentStreamAtom.get() + chunk);
};

export const clearStream = () => {
	currentStreamAtom.set("");
};

// Image attachment actions
export const addPendingImage = (image: ImageAttachment) => {
	pendingImagesAtom.set([...pendingImagesAtom.get(), image]);
};

export const removePendingImage = (id: string) => {
	pendingImagesAtom.set(pendingImagesAtom.get().filter((img) => img.id !== id));
};

export const clearPendingImages = () => {
	pendingImagesAtom.set([]);
};

/**
 * Save images to IndexedDB and return references for localStorage
 * The returned images have data cleared and storedInDb=true
 */
export const saveImagesToIndexedDB = async (
	images: ImageAttachment[],
	conversationId: string,
): Promise<ImageAttachment[]> => {
	const savedImages: ImageAttachment[] = [];

	for (const image of images) {
		try {
			// Save to IndexedDB
			await saveImage(
				image.id,
				conversationId,
				image.data,
				image.mimeType,
				image.name,
			);

			// Return reference without data (data is in IndexedDB)
			savedImages.push({
				id: image.id,
				data: "", // Don't store in localStorage
				mimeType: image.mimeType,
				name: image.name,
				storedInDb: true,
			});
		} catch (error) {
			if (import.meta.env.DEV) {
				console.error("Failed to save image to IndexedDB:", image.id, error);
			}
			// If IndexedDB fails, keep the data inline (fallback)
			savedImages.push(image);
		}
	}

	return savedImages;
};

/**
 * Compress an image to reduce storage size
 * Target: max 1200px on longest side, JPEG quality 0.8
 */
export const compressImage = (
	dataUrl: string,
	maxSize = 1200,
	quality = 0.8,
): Promise<string> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			// Calculate new dimensions
			let { width, height } = img;
			if (width > height && width > maxSize) {
				height = (height * maxSize) / width;
				width = maxSize;
			} else if (height > maxSize) {
				width = (width * maxSize) / height;
				height = maxSize;
			}

			// Create canvas and draw resized image
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;

			// Use alpha: false to improve JPEG encoding performance and quality
			const ctx = canvas.getContext("2d", { alpha: false });
			if (!ctx) {
				reject(new Error("Failed to get canvas context"));
				return;
			}

			// Set high-quality image smoothing
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = "high";

			// Draw the image onto the canvas with high quality scaling
			ctx.drawImage(img, 0, 0, width, height);

			// Convert to JPEG with compression
			const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
			resolve(compressedDataUrl);
		};
		img.onerror = () =>
			reject(new Error("Failed to load image for compression"));
		img.src = dataUrl;
	});
};

/**
 * Convert a File to an ImageAttachment with compression for storage
 */
export const fileToImageAttachment = async (
	file: File,
): Promise<ImageAttachment> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = async () => {
			const originalDataUrl = reader.result as string;

			try {
				// Compress the image to reduce storage size
				// GIFs are kept as-is since they might be animated
				const isGif = file.type === "image/gif";
				const dataUrl = isGif
					? originalDataUrl
					: await compressImage(originalDataUrl);

				resolve({
					id: crypto.randomUUID(),
					data: dataUrl,
					mimeType: isGif ? file.type : "image/jpeg",
					name: file.name,
				});
			} catch (compressError) {
				if (import.meta.env.DEV) {
					console.error("Failed to compress image:", compressError);
				}
				// If compression fails, use original
				resolve({
					id: crypto.randomUUID(),
					data: originalDataUrl,
					mimeType: file.type,
					name: file.name,
				});
			}
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};
