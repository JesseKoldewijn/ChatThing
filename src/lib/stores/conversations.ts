import { atom, onMount } from "nanostores";
import {
	messagesAtom,
	clearMessages,
	type Message,
	saveImagesToIndexedDB,
} from "./chat";
import { getAIManager } from "@/lib/ai";
import { archiveThresholdAtom, thresholdToHours } from "./settings";
import { isHydratedAtom } from "./hydration";
import { deleteConversationImages, clearAllImages } from "./imageStorage";

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

// Active conversation ID atom
export const activeChatIdAtom = atom<string | null>(null);

// Flag to indicate a sync from URL is in progress to avoid circular updates
export const isSyncingFromUrlAtom = atom<boolean>(false);

/**
 * Set the active chat ID
 * @param id - The chat ID to set as active, or null to clear
 * @param syncToUrl - Whether to trigger a sync to URL (internal use)
 */
export const setActiveChat = (id: string | null, syncToUrl = true) => {
	isSyncingFromUrlAtom.set(!syncToUrl);
	activeChatIdAtom.set(id);
	queueMicrotask(() => {
		isSyncingFromUrlAtom.set(false);
	});
};

export type ConversationStatus = "active" | "archived" | "deleted";

export interface Conversation {
	id: string;
	title: string;
	createdAt: number;
	updatedAt: number;
	messages: Message[];
	isGeneratingTitle?: boolean;
	status: ConversationStatus;
	deletedAt?: number; // Timestamp when soft-deleted
}

// All conversations
export const conversationsAtom = atom<Conversation[]>([]);

// Alias for backward compatibility
export { activeChatIdAtom as activeConversationIdAtom };

// Track which conversations are generating titles to avoid duplicates
const titleGenerationInProgress = new Set<string>();

// Track the previous chat ID to detect changes and save before switching
let previousChatId: string | null = null;

// Flag to indicate a programmatic switch is in progress (skips subscriber save)
let programmaticSwitchInProgress = false;

// Storage key
const STORAGE_KEY = "ai-chat-conversations";

/**
 * Load messages for a given chat ID, or clear for new chat
 */
const loadMessagesForChat = (chatId: string | null) => {
	if (!chatId) {
		// No chat ID means new chat - clear messages
		clearMessages();
		return;
	}

	const conversations = conversationsAtom.get();
	const conversation = conversations.find((c) => c.id === chatId);

	if (conversation) {
		// Always load the conversation's messages
		messagesAtom.set(conversation.messages);
	} else {
		// Invalid chat ID - clear it from URL and show new chat
		setActiveChat(null);
		clearMessages();
	}
};

/**
 * Initialize conversations from localStorage and set up URL syncing
 * Called after hydration to avoid hydration mismatches
 */
const initializeConversations = () => {
	if (!isBrowser) return;

	const stored = localStorage.getItem(STORAGE_KEY);

	if (stored) {
		try {
			const parsed = JSON.parse(stored) as Conversation[];
			// Migrate old conversations without status field
			const conversations = parsed.map((conv) => ({
				...conv,
				status: conv.status ?? "active",
			}));
			conversationsAtom.set(conversations);
		} catch {
			// Invalid JSON, start fresh
		}
	}

	// Run auto-archive check on mount
	runAutoArchive();

	// After loading conversations, check if URL has a chat ID and validate it
	const urlChatId = activeChatIdAtom.get();
	previousChatId = urlChatId;
	loadMessagesForChat(urlChatId);
};

// Load conversations from localStorage on mount - defer until after hydration
onMount(conversationsAtom, () => {
	if (!isBrowser) return;

	// If already hydrated, initialize immediately
	if (isHydratedAtom.get()) {
		initializeConversations();
	} else {
		// Wait for hydration to complete
		const unsubHydration = isHydratedAtom.subscribe((hydrated) => {
			if (hydrated) {
				initializeConversations();
				unsubHydration();
			}
		});
	}

	// Subscribe to activeChatIdAtom changes (e.g., browser back/forward)
	const unsubscribe = activeChatIdAtom.subscribe((newChatId) => {
		// Skip if chat ID hasn't actually changed
		if (newChatId === previousChatId) return;

		// Skip if this is a programmatic switch (already handled by switchConversation)
		if (programmaticSwitchInProgress) return;

		// Defer state updates to avoid updating during React render
		queueMicrotask(() => {
			// Double-check the value hasn't changed again
			if (activeChatIdAtom.get() !== newChatId) return;
			// Skip if programmatic switch started while we were waiting
			if (programmaticSwitchInProgress) return;

			// Save the previous conversation before switching
			// Only do this for browser navigation (back/forward), not programmatic switches
			if (previousChatId) {
				saveCurrentConversationById(previousChatId);
			}

			// Load messages for the new chat
			loadMessagesForChat(newChatId);
			previousChatId = newChatId;
		});
	});

	return () => {
		unsubscribe();
	};
});

/**
 * Prepare messages for localStorage by saving images to IndexedDB
 * Returns messages with image data stripped (storedInDb=true)
 */
const prepareMessagesForStorage = async (
	messages: Message[],
	conversationId: string
): Promise<Message[]> => {
	const preparedMessages: Message[] = [];

	for (const msg of messages) {
		if (msg.images && msg.images.length > 0) {
			// Check if images need to be saved to IndexedDB
			const imagesNeedingSave = msg.images.filter(
				(img) => img.data && !img.storedInDb
			);

			if (imagesNeedingSave.length > 0) {
				// Save images to IndexedDB
				const savedImages = await saveImagesToIndexedDB(
					imagesNeedingSave,
					conversationId
				);

				// Merge saved images with already-stored images
				const alreadyStored = msg.images.filter(
					(img) => img.storedInDb
				);
				const allImages = [...alreadyStored, ...savedImages];

				preparedMessages.push({
					...msg,
					images: allImages,
				});
			} else {
				// All images already stored
				preparedMessages.push(msg);
			}
		} else {
			preparedMessages.push(msg);
		}
	}

	return preparedMessages;
};

/**
 * Save a specific conversation by ID (used when navigating away)
 */
const saveCurrentConversationById = async (chatId: string) => {
	const messages = messagesAtom.get();
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === chatId);

	if (index !== -1 && messages.length > 0) {
		// Prepare messages (save images to IndexedDB)
		const preparedMessages = await prepareMessagesForStorage(
			messages,
			chatId
		);

		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			messages: preparedMessages,
			updatedAt: Date.now(),
		};
		conversationsAtom.set(updated);
		persist();
	}
};

// Save to localStorage with error handling
// Images are stored in IndexedDB, so localStorage only contains metadata
const persist = () => {
	if (!isBrowser) return;

	const conversations = conversationsAtom.get();

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
	} catch (error) {
		// Check if it's a quota exceeded error
		if (
			error instanceof DOMException &&
			(error.name === "QuotaExceededError" ||
				error.name === "NS_ERROR_DOM_QUOTA_REACHED")
		) {
			console.error(
				"Storage quota exceeded. This shouldn't happen with hybrid storage. " +
					"Consider clearing old conversations."
			);
		} else {
			console.error("Failed to persist conversations:", error);
		}
	}
};

/**
 * Check if a conversation should be auto-archived based on inactivity
 */
const shouldAutoArchive = (
	conversation: Conversation,
	thresholdHours: number
): boolean => {
	if (thresholdHours <= 0) return false; // Disabled
	if (conversation.status !== "active") return false;

	const thresholdMs = thresholdHours * 60 * 60 * 1000;
	const timeSinceUpdate = Date.now() - conversation.updatedAt;
	return timeSinceUpdate > thresholdMs;
};

/**
 * Run auto-archive check on all conversations
 */
export const runAutoArchive = (): number => {
	const threshold = archiveThresholdAtom.get();
	const thresholdHours = thresholdToHours(threshold);
	if (thresholdHours <= 0) return 0;

	const conversations = conversationsAtom.get();
	let archivedCount = 0;

	const updated = conversations.map((conv) => {
		if (shouldAutoArchive(conv, thresholdHours)) {
			archivedCount++;
			return { ...conv, status: "archived" as ConversationStatus };
		}
		return conv;
	});

	if (archivedCount > 0) {
		conversationsAtom.set(updated);
		persist();
	}

	return archivedCount;
};

// Actions
export const createConversation = (title?: string): Conversation => {
	const conversation: Conversation = {
		id: crypto.randomUUID(),
		title: title ?? "New Chat",
		createdAt: Date.now(),
		updatedAt: Date.now(),
		messages: [],
		status: "active",
	};
	conversationsAtom.set([conversation, ...conversationsAtom.get()]);

	// Set flag to prevent the subscriber from interfering
	programmaticSwitchInProgress = true;
	previousChatId = conversation.id;
	setActiveChat(conversation.id);
	clearMessages();
	queueMicrotask(() => {
		programmaticSwitchInProgress = false;
	});

	persist();
	return conversation;
};

export const switchConversation = (id: string) => {
	// Mark that we are syncing to avoid circular updates if this was triggered by URL change
	// But actually switchConversation is usually UI-triggered
	
	// Save current conversation first
	saveCurrentConversation();

	const conversation = conversationsAtom.get().find((c) => c.id === id);
	if (conversation) {
		// Set flag to prevent the subscriber from trying to save again
		programmaticSwitchInProgress = true;
		// Update previousChatId before changing messages to prevent race condition
		previousChatId = id;
		setActiveChat(id);
		messagesAtom.set(conversation.messages);
		// Reset flag after a microtask to allow future subscriber handling
		queueMicrotask(() => {
			programmaticSwitchInProgress = false;
		});
	}
};

export const saveCurrentConversation = async () => {
	const activeId = activeChatIdAtom.get();
	if (!activeId) return;

	const messages = messagesAtom.get();
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === activeId);

	if (index !== -1) {
		// Prepare messages (save images to IndexedDB)
		const preparedMessages = await prepareMessagesForStorage(
			messages,
			activeId
		);

		const updated = [...conversations];
		const currentConversation = updated[index];

		updated[index] = {
			...currentConversation,
			messages: preparedMessages,
			updatedAt: Date.now(),
			// Keep isGeneratingTitle state - title generation is triggered separately via triggerTitleGeneration
		};
		conversationsAtom.set(updated);
		persist();
	}
};

/**
 * Asynchronously generate a title for a conversation using AI
 * This is an internal function - use triggerTitleGeneration for external calls
 */
const generateTitleAsync = async (
	conversationId: string,
	firstMessage: string
) => {
	// Prevent duplicate generation
	if (titleGenerationInProgress.has(conversationId)) return;
	titleGenerationInProgress.add(conversationId);

	// Mark as generating
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === conversationId);
	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = { ...updated[index], isGeneratingTitle: true };
		conversationsAtom.set(updated);
	}

	try {
		const manager = getAIManager();
		const title = await manager.generateTitle(firstMessage);

		// Update the conversation with the generated title
		const currentConversations = conversationsAtom.get();
		const currentIndex = currentConversations.findIndex(
			(c) => c.id === conversationId
		);

		if (currentIndex !== -1) {
			const updated = [...currentConversations];
			updated[currentIndex] = {
				...updated[currentIndex],
				title,
				isGeneratingTitle: false,
			};
			conversationsAtom.set(updated);
			persist();
		}
	} catch (error) {
		console.error("Failed to generate conversation title:", error);

		// On error, use fallback title from first message
		const currentConversations = conversationsAtom.get();
		const currentIndex = currentConversations.findIndex(
			(c) => c.id === conversationId
		);

		if (currentIndex !== -1) {
			const updated = [...currentConversations];
			const fallbackTitle =
				firstMessage.slice(0, 30).trim() +
				(firstMessage.length > 30 ? "..." : "");
			updated[currentIndex] = {
				...updated[currentIndex],
				title: fallbackTitle,
				isGeneratingTitle: false,
			};
			conversationsAtom.set(updated);
			persist();
		}
	} finally {
		titleGenerationInProgress.delete(conversationId);
	}
};

/**
 * Trigger title generation for a conversation immediately
 * @param conversationId - The ID of the conversation
 * @param force - If true, regenerates even if a title already exists
 */
export const triggerTitleGeneration = (
	conversationId: string,
	force = false
): void => {
	const conversations = conversationsAtom.get();
	const conversation = conversations.find((c) => c.id === conversationId);

	if (!conversation) return;

	// For re-generation, we need the first message
	const firstMessage =
		conversation.messages.find((m) => m.role === "user")?.content || "";

	if (!firstMessage) return;

	// Only generate if conversation needs a title or if forced
	const needsTitle =
		force || !conversation.title || conversation.title === "New Chat";

	if (needsTitle && !titleGenerationInProgress.has(conversationId)) {
		generateTitleAsync(conversationId, firstMessage);
	}
};

/**
 * Soft-delete a conversation (marks as deleted, doesn't remove)
 */
export const deleteConversation = (id: string) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);

	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			status: "deleted",
			deletedAt: Date.now(),
		};
		conversationsAtom.set(updated);
		persist();
	}

	// If we deleted the active conversation, switch to an active one or clear
	if (activeChatIdAtom.get() === id) {
		const activeConversations = conversationsAtom
			.get()
			.filter((c) => c.status === "active");
		if (activeConversations.length > 0) {
			switchConversation(activeConversations[0].id);
		} else {
			setActiveChat(null);
			clearMessages();
		}
	}
};

/**
 * Archive a conversation
 */
export const archiveConversation = (id: string) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);

	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = { ...updated[index], status: "archived" };
		conversationsAtom.set(updated);
		persist();
	}

	// If we archived the active conversation, switch to another active one
	if (activeChatIdAtom.get() === id) {
		const activeConversations = conversationsAtom
			.get()
			.filter((c) => c.status === "active");
		if (activeConversations.length > 0) {
			switchConversation(activeConversations[0].id);
		} else {
			setActiveChat(null);
			clearMessages();
		}
	}
};

/**
 * Unarchive a conversation (restore to active)
 */
export const unarchiveConversation = (id: string) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);

	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			status: "active",
			updatedAt: Date.now(), // Reset update time to prevent immediate re-archive
		};
		conversationsAtom.set(updated);
		persist();
	}
};

/**
 * Restore a deleted conversation (back to active)
 */
export const restoreConversation = (id: string) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);

	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			status: "active",
			deletedAt: undefined,
			updatedAt: Date.now(),
		};
		conversationsAtom.set(updated);
		persist();
	}
};

/**
 * Permanently delete a conversation (cannot be undone)
 */
export const permanentlyDeleteConversation = async (id: string) => {
	const conversations = conversationsAtom.get().filter((c) => c.id !== id);
	conversationsAtom.set(conversations);

	// Delete images from IndexedDB
	try {
		await deleteConversationImages(id);
	} catch (error) {
		console.error("Failed to delete conversation images:", error);
	}

	// If we deleted the active conversation, switch to another or clear
	if (activeChatIdAtom.get() === id) {
		const activeConversations = conversations.filter(
			(c) => c.status === "active"
		);
		if (activeConversations.length > 0) {
			switchConversation(activeConversations[0].id);
		} else {
			setActiveChat(null);
			clearMessages();
		}
	}

	persist();
};

/**
 * Permanently delete all soft-deleted conversations
 */
export const cleanupDeletedConversations = async (): Promise<number> => {
	const conversations = conversationsAtom.get();
	const deletedConversations = conversations.filter(
		(c) => c.status === "deleted"
	);
	const deletedCount = deletedConversations.length;

	if (deletedCount > 0) {
		// Delete images from IndexedDB for each deleted conversation
		for (const conv of deletedConversations) {
			try {
				await deleteConversationImages(conv.id);
			} catch (error) {
				console.error(
					"Failed to delete conversation images:",
					conv.id,
					error
				);
			}
		}

		const remaining = conversations.filter((c) => c.status !== "deleted");
		conversationsAtom.set(remaining);
		persist();
	}

	return deletedCount;
};

/**
 * Get counts for each conversation status
 */
export const getConversationCounts = (): {
	active: number;
	archived: number;
	deleted: number;
} => {
	const conversations = conversationsAtom.get();
	return {
		active: conversations.filter((c) => c.status === "active").length,
		archived: conversations.filter((c) => c.status === "archived").length,
		deleted: conversations.filter((c) => c.status === "deleted").length,
	};
};

export const updateConversationTitle = (id: string, title: string) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);

	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = { ...updated[index], title };
		conversationsAtom.set(updated);
		persist();
	}
};

// ==================== IMPORT / EXPORT ====================

export interface ExportData {
	version: number;
	exportedAt: string;
	conversations: Conversation[];
}

/**
 * Export all conversations to a JSON file
 * Only exports active and archived conversations, not deleted ones
 */
export const exportConversations = (): void => {
	const conversations = conversationsAtom.get();

	// Clean up conversations before export (remove transient state, exclude deleted)
	const cleanedConversations = conversations
		.filter((c) => c.status !== "deleted")
		.map((c) => ({
			id: c.id,
			title: c.title,
			createdAt: c.createdAt,
			updatedAt: c.updatedAt,
			messages: c.messages,
			status: c.status,
		}));

	const exportData: ExportData = {
		version: 1,
		exportedAt: new Date().toISOString(),
		conversations: cleanedConversations,
	};

	const blob = new Blob([JSON.stringify(exportData, null, 2)], {
		type: "application/json",
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `chat-history-${new Date().toISOString().split("T")[0]}.json`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};

/**
 * Import conversations from a JSON file
 * @param file - The file to import
 * @param mode - "merge" to add to existing, "replace" to replace all
 * @returns Promise with import result
 */
export const importConversations = async (
	file: File,
	mode: "merge" | "replace" = "merge"
): Promise<{ success: boolean; imported: number; error?: string }> => {
	try {
		const text = await file.text();
		const data = JSON.parse(text) as ExportData;

		// Validate the data structure
		if (!data.conversations || !Array.isArray(data.conversations)) {
			return {
				success: false,
				imported: 0,
				error: "Invalid file format",
			};
		}

		// Validate each conversation
		const validConversations: Conversation[] = [];
		for (const conv of data.conversations) {
			if (
				typeof conv.id === "string" &&
				typeof conv.title === "string" &&
				typeof conv.createdAt === "number" &&
				typeof conv.updatedAt === "number" &&
				Array.isArray(conv.messages)
			) {
				// Validate status or default to active
				const status: ConversationStatus =
					conv.status === "active" ||
					conv.status === "archived" ||
					conv.status === "deleted"
						? conv.status
						: "active";

				validConversations.push({
					id: conv.id,
					title: conv.title,
					createdAt: conv.createdAt,
					updatedAt: conv.updatedAt,
					messages: conv.messages,
					status,
				});
			}
		}

		if (validConversations.length === 0) {
			return {
				success: false,
				imported: 0,
				error: "No valid conversations found",
			};
		}

		if (mode === "replace") {
			// Replace all conversations
			conversationsAtom.set(validConversations);
			setActiveChat(null);
			clearMessages();
		} else {
			// Merge: add new conversations, skip duplicates by ID
			const existing = conversationsAtom.get();
			const existingIds = new Set(existing.map((c) => c.id));
			const newConversations = validConversations.filter(
				(c) => !existingIds.has(c.id)
			);
			conversationsAtom.set([...newConversations, ...existing]);
		}

		persist();
		return { success: true, imported: validConversations.length };
	} catch (error) {
		return {
			success: false,
			imported: 0,
			error:
				error instanceof Error ? error.message : "Failed to parse file",
		};
	}
};

/**
 * Clear all conversations
 */
export const clearAllConversations = async (): Promise<void> => {
	conversationsAtom.set([]);
	setActiveChat(null);
	clearMessages();
	persist();

	// Clear all images from IndexedDB
	try {
		await clearAllImages();
	} catch (error) {
		console.error("Failed to clear all images:", error);
	}
};
