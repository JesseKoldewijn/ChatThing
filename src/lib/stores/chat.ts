import { atom, computed } from "nanostores";

// Image attachment type
export interface ImageAttachment {
	id: string;
	data: string; // base64 data URL
	mimeType: string;
	name?: string;
}

// Message content can be text or multimodal (text + images)
export interface MessageContent {
	text: string;
	images?: ImageAttachment[];
}

export interface Message {
	id: string;
	transactionId: string; // Links prompts with their responses
	role: "user" | "assistant";
	content: string; // Keep as string for backwards compatibility and simple display
	images?: ImageAttachment[]; // Optional images attached to the message
	timestamp: number;
}

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
	options?: AddMessageOptions
) => {
	const message: Message = {
		id: crypto.randomUUID(),
		transactionId: options?.transactionId ?? crypto.randomUUID(),
		role,
		content,
		images:
			options?.images && options.images.length > 0
				? options.images
				: undefined,
		timestamp: Date.now(),
	};
	messagesAtom.set([...messagesAtom.get(), message]);
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
 * Remove all assistant messages from a specific transaction
 * Used when regenerating a response to remove tool announcements and previous responses
 */
export const removeAssistantMessagesFromTransaction = (transactionId: string) => {
	const messages = messagesAtom.get();
	messagesAtom.set(
		messages.filter(
			(m) => !(m.transactionId === transactionId && m.role === "assistant")
		)
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
	pendingImagesAtom.set(
		pendingImagesAtom.get().filter((img) => img.id !== id)
	);
};

export const clearPendingImages = () => {
	pendingImagesAtom.set([]);
};

/**
 * Convert a File to an ImageAttachment
 */
export const fileToImageAttachment = async (
	file: File
): Promise<ImageAttachment> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve({
				id: crypto.randomUUID(),
				data: reader.result as string,
				mimeType: file.type,
				name: file.name,
			});
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};
