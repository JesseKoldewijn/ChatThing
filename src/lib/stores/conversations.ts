import { atom, onMount } from "nanostores";
import { messagesAtom, clearMessages, type Message } from "./chat";
import { generateConversationTitle, needsTitleGeneration } from "@/lib/ai/titleGenerator";
import { activeChatIdAtom, setActiveChat } from "./navigation";
import { archiveThresholdAtom, thresholdToHours } from "./settings";
import { isHydratedAtom } from "./hydration";

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

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

// Re-export for backward compatibility
export { activeChatIdAtom as activeConversationIdAtom };

// Track which conversations are generating titles to avoid duplicates
const titleGenerationInProgress = new Set<string>();

// Track the previous chat ID to detect changes and save before switching
let previousChatId: string | null = null;

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
		// Valid chat ID - load its messages
		messagesAtom.set(conversation.messages);
	} else {
		// Invalid chat ID - clear it from URL and show new chat
		setActiveChat(null, true);
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

		// Defer state updates to avoid updating during React render
		queueMicrotask(() => {
			// Double-check the value hasn't changed again
			if (activeChatIdAtom.get() !== newChatId) return;
			
			// Save the previous conversation before switching
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
 * Save a specific conversation by ID (used when navigating away)
 */
const saveCurrentConversationById = (chatId: string) => {
	const messages = messagesAtom.get();
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === chatId);

	if (index !== -1 && messages.length > 0) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			messages,
			updatedAt: Date.now(),
		};
		conversationsAtom.set(updated);
		persist();
	}
};

// Save to localStorage
const persist = () => {
	if (!isBrowser) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationsAtom.get()));
};

/**
 * Check if a conversation should be auto-archived based on inactivity
 */
const shouldAutoArchive = (conversation: Conversation, thresholdHours: number): boolean => {
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
	setActiveChat(conversation.id);
	clearMessages();
	persist();
	return conversation;
};

export const switchConversation = (id: string) => {
	// Save current conversation first
	saveCurrentConversation();

	const conversation = conversationsAtom.get().find((c) => c.id === id);
	if (conversation) {
		setActiveChat(id);
		messagesAtom.set(conversation.messages);
	}
};

export const saveCurrentConversation = () => {
	const activeId = activeChatIdAtom.get();
	if (!activeId) return;

	const messages = messagesAtom.get();
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === activeId);

	if (index !== -1) {
		const updated = [...conversations];
		const currentConversation = updated[index];

		updated[index] = {
			...currentConversation,
			messages,
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
const generateTitleAsync = async (conversationId: string, firstMessage: string) => {
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
		const title = await generateConversationTitle(firstMessage);
		
		// Update the conversation with the generated title
		const currentConversations = conversationsAtom.get();
		const currentIndex = currentConversations.findIndex((c) => c.id === conversationId);
		
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
		const currentIndex = currentConversations.findIndex((c) => c.id === conversationId);
		
		if (currentIndex !== -1) {
			const updated = [...currentConversations];
			const fallbackTitle = firstMessage.slice(0, 30).trim() + 
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
 * Called when the first message is sent to generate title in parallel with AI response
 */
export const triggerTitleGeneration = (conversationId: string, firstMessage: string): void => {
	const conversations = conversationsAtom.get();
	const conversation = conversations.find((c) => c.id === conversationId);
	
	// Only generate if conversation exists and needs a title
	if (conversation && needsTitleGeneration(conversation.title) && !titleGenerationInProgress.has(conversationId)) {
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
			setActiveChat(null, true);
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
			setActiveChat(null, true);
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
export const permanentlyDeleteConversation = (id: string) => {
	const conversations = conversationsAtom.get().filter((c) => c.id !== id);
	conversationsAtom.set(conversations);

	// If we deleted the active conversation, switch to another or clear
	if (activeChatIdAtom.get() === id) {
		const activeConversations = conversations.filter((c) => c.status === "active");
		if (activeConversations.length > 0) {
			switchConversation(activeConversations[0].id);
		} else {
			setActiveChat(null, true);
			clearMessages();
		}
	}

	persist();
};

/**
 * Permanently delete all soft-deleted conversations
 */
export const cleanupDeletedConversations = (): number => {
	const conversations = conversationsAtom.get();
	const deletedCount = conversations.filter((c) => c.status === "deleted").length;
	
	if (deletedCount > 0) {
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
			return { success: false, imported: 0, error: "Invalid file format" };
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
					conv.status === "active" || conv.status === "archived" || conv.status === "deleted"
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
			return { success: false, imported: 0, error: "No valid conversations found" };
		}

		if (mode === "replace") {
			// Replace all conversations
			conversationsAtom.set(validConversations);
			setActiveChat(null, true);
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
			error: error instanceof Error ? error.message : "Failed to parse file",
		};
	}
};

/**
 * Clear all conversations
 */
export const clearAllConversations = (): void => {
	conversationsAtom.set([]);
	setActiveChat(null, true);
	clearMessages();
	persist();
};
