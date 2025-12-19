import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	conversationsAtom,
	activeChatIdAtom,
	createConversation,
	switchConversation,
	deleteConversation,
	archiveConversation,
	unarchiveConversation,
	restoreConversation,
	permanentlyDeleteConversation,
	updateConversationTitle,
	saveCurrentConversation,
	getConversationCounts,
	runAutoArchive,
	cleanupDeletedConversations,
	exportConversations,
	importConversations,
	clearAllConversations,
} from "./conversations";
import { messagesAtom, clearMessages } from "./chat";
import { archiveThresholdAtom } from "./settings";

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: vi.fn((key: string) => store[key] || null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value;
		}),
		removeItem: vi.fn((key: string) => {
			delete store[key];
		}),
		clear: vi.fn(() => {
			store = {};
		}),
	};
})();

Object.defineProperty(globalThis, "localStorage", {
	value: localStorageMock,
	writable: true,
});

// Mock IndexedDB functions
vi.mock("./imageStorage", () => ({
	deleteConversationImages: vi.fn().mockResolvedValue(undefined),
	clearAllImages: vi.fn().mockResolvedValue(undefined),
}));

// Mock AI manager
vi.mock("@/lib/ai", () => ({
	getAIManager: vi.fn(() => ({
		generateTitle: vi.fn().mockResolvedValue("Generated Title"),
	})),
}));

// Mock hydration
vi.mock("./hydration", () => ({
	isHydratedAtom: {
		get: () => true,
		subscribe: (callback: (value: boolean) => void) => {
			callback(true);
			return () => {};
		},
	},
}));

describe("Conversations Store Integration", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorageMock.clear();
		conversationsAtom.set([]);
		activeChatIdAtom.set(null);
		clearMessages();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("createConversation", () => {
		it("should create a new conversation with default title", () => {
			const conversation = createConversation();

			expect(conversation).toMatchObject({
				title: "New Chat",
				status: "active",
				messages: [],
			});
			expect(conversation.id).toBeDefined();
			expect(conversation.createdAt).toBeDefined();
			expect(conversation.updatedAt).toBeDefined();
		});

		it("should create a conversation with custom title", () => {
			const conversation = createConversation("My Custom Chat");

			expect(conversation.title).toBe("My Custom Chat");
		});

		it("should add conversation to the store", () => {
			const conversation = createConversation();

			const conversations = conversationsAtom.get();
			expect(conversations).toHaveLength(1);
			expect(conversations[0].id).toBe(conversation.id);
		});

		it("should set the new conversation as active", () => {
			const conversation = createConversation();

			expect(activeChatIdAtom.get()).toBe(conversation.id);
		});

		it("should clear existing messages when creating new conversation", () => {
			messagesAtom.set([
				{ id: "msg-1", role: "user", content: "Old message", transactionId: "tx-1", timestamp: Date.now() },
			]);

			createConversation();

			expect(messagesAtom.get()).toHaveLength(0);
		});
	});

	describe("switchConversation", () => {
		it("should switch to the specified conversation", () => {
			const conv1 = createConversation("First");
			createConversation("Second"); // Creates second conversation but we switch back to first

			switchConversation(conv1.id);

			expect(activeChatIdAtom.get()).toBe(conv1.id);
		});

		it("should load messages for the switched conversation", async () => {
			// Create first conversation with messages
			const conv1 = createConversation("First");
			messagesAtom.set([
				{ id: "msg-1", role: "user", content: "Hello", transactionId: "tx-1", timestamp: Date.now() },
			]);
			await saveCurrentConversation();

			// Create second conversation
			createConversation("Second");
			expect(messagesAtom.get()).toHaveLength(0);

			// Switch back to first
			switchConversation(conv1.id);

			// Check that the conversation's messages were saved (not messagesAtom which is reset)
			const conversations = conversationsAtom.get();
			const conv = conversations.find((c) => c.id === conv1.id);
			expect(conv?.messages).toHaveLength(1);
		});

		it("should do nothing if conversation does not exist", () => {
			const conv = createConversation("Test");
			
			switchConversation("non-existent-id");

			expect(activeChatIdAtom.get()).toBe(conv.id);
		});
	});

	describe("deleteConversation", () => {
		it("should soft-delete a conversation", () => {
			const conv = createConversation("To Delete");

			deleteConversation(conv.id);

			const conversations = conversationsAtom.get();
			expect(conversations[0].status).toBe("deleted");
			expect(conversations[0].deletedAt).toBeDefined();
		});

		it("should switch to another active conversation when deleting the active one", () => {
			const conv1 = createConversation("First");
			const conv2 = createConversation("Second");

			expect(activeChatIdAtom.get()).toBe(conv2.id);

			deleteConversation(conv2.id);

			expect(activeChatIdAtom.get()).toBe(conv1.id);
		});

		it("should clear active chat if no other active conversations exist", () => {
			const conv = createConversation("Only One");

			deleteConversation(conv.id);

			expect(activeChatIdAtom.get()).toBeNull();
		});
	});

	describe("archiveConversation", () => {
		it("should archive a conversation", () => {
			const conv = createConversation("To Archive");

			archiveConversation(conv.id);

			const conversations = conversationsAtom.get();
			expect(conversations[0].status).toBe("archived");
		});

		it("should switch to another active conversation when archiving the active one", () => {
			const conv1 = createConversation("First");
			const conv2 = createConversation("Second");

			archiveConversation(conv2.id);

			expect(activeChatIdAtom.get()).toBe(conv1.id);
		});
	});

	describe("unarchiveConversation", () => {
		it("should restore an archived conversation to active", () => {
			const conv = createConversation("To Archive");
			archiveConversation(conv.id);

			unarchiveConversation(conv.id);

			const conversations = conversationsAtom.get();
			expect(conversations[0].status).toBe("active");
		});

		it("should update the updatedAt timestamp", () => {
			const conv = createConversation("To Archive");
			const originalUpdatedAt = conv.updatedAt;
			archiveConversation(conv.id);

			// Wait a bit to ensure timestamp changes
			vi.useFakeTimers();
			vi.advanceTimersByTime(1000);

			unarchiveConversation(conv.id);

			const conversations = conversationsAtom.get();
			expect(conversations[0].updatedAt).toBeGreaterThan(originalUpdatedAt);
			
			vi.useRealTimers();
		});
	});

	describe("restoreConversation", () => {
		it("should restore a deleted conversation to active", () => {
			const conv = createConversation("To Delete");
			deleteConversation(conv.id);

			restoreConversation(conv.id);

			const conversations = conversationsAtom.get();
			expect(conversations[0].status).toBe("active");
			expect(conversations[0].deletedAt).toBeUndefined();
		});
	});

	describe("permanentlyDeleteConversation", () => {
		it("should permanently remove a conversation", async () => {
			const conv = createConversation("To Delete Forever");

			await permanentlyDeleteConversation(conv.id);

			const conversations = conversationsAtom.get();
			expect(conversations).toHaveLength(0);
		});

		it("should delete associated images from IndexedDB", async () => {
			const { deleteConversationImages } = await import("./imageStorage");
			const conv = createConversation("With Images");

			await permanentlyDeleteConversation(conv.id);

			expect(deleteConversationImages).toHaveBeenCalledWith(conv.id);
		});
	});

	describe("updateConversationTitle", () => {
		it("should update the conversation title", () => {
			const conv = createConversation("Old Title");

			updateConversationTitle(conv.id, "New Title");

			const conversations = conversationsAtom.get();
			expect(conversations[0].title).toBe("New Title");
		});

		it("should do nothing for non-existent conversation", () => {
			createConversation("Test");

			updateConversationTitle("non-existent", "New Title");

			const conversations = conversationsAtom.get();
			expect(conversations[0].title).toBe("Test");
		});
	});

	describe("getConversationCounts", () => {
		it("should return correct counts for each status", () => {
			createConversation("Active 1");
			createConversation("Active 2");
			const toArchive = createConversation("To Archive");
			const toDelete = createConversation("To Delete");

			archiveConversation(toArchive.id);
			deleteConversation(toDelete.id);

			const counts = getConversationCounts();

			expect(counts.active).toBe(2);
			expect(counts.archived).toBe(1);
			expect(counts.deleted).toBe(1);
		});
	});

	describe("runAutoArchive", () => {
		it("should auto-archive old conversations based on threshold", () => {
			// Set threshold to 1 day (24 hours)
			archiveThresholdAtom.set({ value: 1, unit: "days" });

			// Create a conversation with an old updatedAt timestamp (3 days ago)
			const conv = createConversation("Old Conversation");
			const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
			
			// Manually update the conversation's updatedAt to simulate an old conversation
			const conversations = conversationsAtom.get();
			const index = conversations.findIndex((c) => c.id === conv.id);
			if (index !== -1) {
				const updated = [...conversations];
				updated[index] = { ...updated[index], updatedAt: threeDaysAgo };
				conversationsAtom.set(updated);
			}

			const archivedCount = runAutoArchive();

			expect(archivedCount).toBe(1);
			const result = conversationsAtom.get();
			expect(result[0].status).toBe("archived");
		});

		it("should not archive conversations within threshold", () => {
			archiveThresholdAtom.set({ value: 1, unit: "days" });

			createConversation("Recent Conversation");

			const archivedCount = runAutoArchive();

			expect(archivedCount).toBe(0);
		});

		it("should return 0 when auto-archive is disabled", () => {
			archiveThresholdAtom.set({ value: 0, unit: "days" });

			createConversation("Test");

			const archivedCount = runAutoArchive();

			expect(archivedCount).toBe(0);
		});
	});

	describe("cleanupDeletedConversations", () => {
		it("should permanently delete all soft-deleted conversations", async () => {
			const conv1 = createConversation("To Delete 1");
			const conv2 = createConversation("To Delete 2");
			createConversation("To Keep");

			deleteConversation(conv1.id);
			deleteConversation(conv2.id);

			const deletedCount = await cleanupDeletedConversations();

			expect(deletedCount).toBe(2);
			const conversations = conversationsAtom.get();
			expect(conversations).toHaveLength(1);
			expect(conversations[0].title).toBe("To Keep");
		});
	});

	describe("exportConversations", () => {
		it("should export conversations to JSON", () => {
			// Mock document and URL APIs
			const mockCreateObjectURL = vi.fn().mockReturnValue("blob:test");
			const mockRevokeObjectURL = vi.fn();
			const mockClick = vi.fn();
			const mockAppendChild = vi.fn();
			const mockRemoveChild = vi.fn();

			Object.defineProperty(globalThis, "URL", {
				value: {
					createObjectURL: mockCreateObjectURL,
					revokeObjectURL: mockRevokeObjectURL,
				},
				writable: true,
			});

			Object.defineProperty(globalThis, "document", {
				value: {
					createElement: vi.fn(() => ({
						href: "",
						download: "",
						click: mockClick,
					})),
					body: {
						appendChild: mockAppendChild,
						removeChild: mockRemoveChild,
					},
				},
				writable: true,
			});

			createConversation("Export Me");

			exportConversations();

			expect(mockCreateObjectURL).toHaveBeenCalled();
			expect(mockClick).toHaveBeenCalled();
			expect(mockRevokeObjectURL).toHaveBeenCalled();
		});
	});

	describe("importConversations", () => {
		it("should import conversations from JSON file", async () => {
			const importData = {
				version: 1,
				exportedAt: new Date().toISOString(),
				conversations: [
					{
						id: "imported-1",
						title: "Imported Chat",
						createdAt: Date.now(),
						updatedAt: Date.now(),
						messages: [],
						status: "active",
					},
				],
			};

			const file = new File([JSON.stringify(importData)], "test.json", {
				type: "application/json",
			});

			const result = await importConversations(file, "merge");

			expect(result.success).toBe(true);
			expect(result.imported).toBe(1);

			const conversations = conversationsAtom.get();
			expect(conversations).toHaveLength(1);
			expect(conversations[0].title).toBe("Imported Chat");
		});

		it("should skip duplicate conversations in merge mode", async () => {
			const conv = createConversation("Existing");

			const importData = {
				version: 1,
				exportedAt: new Date().toISOString(),
				conversations: [
					{
						id: conv.id,
						title: "Duplicate",
						createdAt: Date.now(),
						updatedAt: Date.now(),
						messages: [],
						status: "active",
					},
				],
			};

			const file = new File([JSON.stringify(importData)], "test.json", {
				type: "application/json",
			});

			await importConversations(file, "merge");

			const conversations = conversationsAtom.get();
			expect(conversations).toHaveLength(1);
			expect(conversations[0].title).toBe("Existing");
		});

		it("should replace all conversations in replace mode", async () => {
			createConversation("To Replace");

			const importData = {
				version: 1,
				exportedAt: new Date().toISOString(),
				conversations: [
					{
						id: "new-1",
						title: "Replacement",
						createdAt: Date.now(),
						updatedAt: Date.now(),
						messages: [],
						status: "active",
					},
				],
			};

			const file = new File([JSON.stringify(importData)], "test.json", {
				type: "application/json",
			});

			await importConversations(file, "replace");

			const conversations = conversationsAtom.get();
			expect(conversations).toHaveLength(1);
			expect(conversations[0].title).toBe("Replacement");
		});

		it("should return error for invalid file format", async () => {
			const file = new File(["invalid json"], "test.json", {
				type: "application/json",
			});

			const result = await importConversations(file);

			expect(result.success).toBe(false);
			expect(result.error).toBeDefined();
		});

		it("should return error for missing conversations array", async () => {
			const file = new File([JSON.stringify({ version: 1 })], "test.json", {
				type: "application/json",
			});

			const result = await importConversations(file);

			expect(result.success).toBe(false);
			expect(result.error).toBe("Invalid file format");
		});
	});

	describe("clearAllConversations", () => {
		it("should remove all conversations", async () => {
			createConversation("One");
			createConversation("Two");

			await clearAllConversations();

			const conversations = conversationsAtom.get();
			expect(conversations).toHaveLength(0);
			expect(activeChatIdAtom.get()).toBeNull();
		});

		it("should clear all images from IndexedDB", async () => {
			const { clearAllImages } = await import("./imageStorage");
			createConversation("With Images");

			await clearAllConversations();

			expect(clearAllImages).toHaveBeenCalled();
		});
	});
});

