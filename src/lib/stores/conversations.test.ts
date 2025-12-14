import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock imageStorage before importing conversations
vi.mock("./imageStorage", () => ({
	deleteConversationImages: vi.fn().mockResolvedValue(0),
	clearAllImages: vi.fn().mockResolvedValue(undefined),
	saveImage: vi.fn().mockResolvedValue(undefined),
	getImage: vi.fn().mockResolvedValue(null),
	getImages: vi.fn().mockResolvedValue(new Map()),
}));

import {
	conversationsAtom,
	createConversation,
	deleteConversation,
	archiveConversation,
	unarchiveConversation,
	restoreConversation,
	permanentlyDeleteConversation,
	updateConversationTitle,
	getConversationCounts,
	cleanupDeletedConversations,
	clearAllConversations,
	type Conversation,
} from "./conversations";
import { messagesAtom } from "./chat";
import { activeChatIdAtom } from "./navigation";

describe("conversations store", () => {
	beforeEach(() => {
		// Reset atoms
		conversationsAtom.set([]);
		messagesAtom.set([]);
		activeChatIdAtom.set(null);
		localStorage.clear();
	});

	describe("conversationsAtom", () => {
		it("should default to empty array", () => {
			expect(conversationsAtom.get()).toEqual([]);
		});

		it("should store conversations", () => {
			const conversation: Conversation = {
				id: "test-1",
				title: "Test Conversation",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};

			conversationsAtom.set([conversation]);

			expect(conversationsAtom.get()).toHaveLength(1);
			expect(conversationsAtom.get()[0].id).toBe("test-1");
		});
	});

	describe("createConversation", () => {
		it("should create a new conversation with default title", () => {
			const conv = createConversation();

			expect(conv.id).toBeDefined();
			expect(conv.title).toBe("New Chat");
			expect(conv.messages).toEqual([]);
			expect(conv.status).toBe("active");
		});

		it("should create a conversation with custom title", () => {
			const conv = createConversation("Custom Title");

			expect(conv.title).toBe("Custom Title");
		});

		it("should set createdAt and updatedAt", () => {
			const before = Date.now();
			const conv = createConversation();
			const after = Date.now();

			expect(conv.createdAt).toBeGreaterThanOrEqual(before);
			expect(conv.createdAt).toBeLessThanOrEqual(after);
			expect(conv.updatedAt).toEqual(conv.createdAt);
		});
	});

	describe("deleteConversation", () => {
		it("should soft delete a conversation", () => {
			const conv: Conversation = {
				id: "del-1",
				title: "To Delete",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([conv]);

			deleteConversation("del-1");

			const deleted = conversationsAtom.get().find((c) => c.id === "del-1");
			expect(deleted?.status).toBe("deleted");
			expect(deleted?.deletedAt).toBeDefined();
		});

		it("should not throw for non-existent conversation", () => {
			expect(() => deleteConversation("non-existent")).not.toThrow();
		});
	});

	describe("archiveConversation", () => {
		it("should archive an active conversation", () => {
			const conv: Conversation = {
				id: "arch-1",
				title: "To Archive",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([conv]);

			archiveConversation("arch-1");

			const archived = conversationsAtom.get().find((c) => c.id === "arch-1");
			expect(archived?.status).toBe("archived");
		});
	});

	describe("unarchiveConversation", () => {
		it("should unarchive an archived conversation", () => {
			const conv: Conversation = {
				id: "unarch-1",
				title: "To Unarchive",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "archived",
			};
			conversationsAtom.set([conv]);

			unarchiveConversation("unarch-1");

			const unarchived = conversationsAtom.get().find((c) => c.id === "unarch-1");
			expect(unarchived?.status).toBe("active");
		});
	});

	describe("restoreConversation", () => {
		it("should restore a deleted conversation", () => {
			const conv: Conversation = {
				id: "restore-1",
				title: "To Restore",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "deleted",
				deletedAt: Date.now(),
			};
			conversationsAtom.set([conv]);

			restoreConversation("restore-1");

			const restored = conversationsAtom.get().find((c) => c.id === "restore-1");
			expect(restored?.status).toBe("active");
			expect(restored?.deletedAt).toBeUndefined();
		});
	});

	describe("permanentlyDeleteConversation", () => {
		it("should permanently remove a conversation", async () => {
			const conv: Conversation = {
				id: "perm-del-1",
				title: "To Permanently Delete",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "deleted",
			};
			conversationsAtom.set([conv]);

			await permanentlyDeleteConversation("perm-del-1");

			expect(conversationsAtom.get()).toHaveLength(0);
		});
	});

	describe("updateConversationTitle", () => {
		it("should update conversation title", () => {
			const conv: Conversation = {
				id: "title-1",
				title: "Old Title",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([conv]);

			updateConversationTitle("title-1", "New Title");

			const updated = conversationsAtom.get().find((c) => c.id === "title-1");
			expect(updated?.title).toBe("New Title");
		});
	});

	describe("getConversationCounts", () => {
		it("should return correct counts for each status", () => {
			const convs: Conversation[] = [
				{
					id: "a1",
					title: "Active 1",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
				{
					id: "a2",
					title: "Active 2",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
				{
					id: "arch1",
					title: "Archived",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "archived",
				},
				{
					id: "del1",
					title: "Deleted",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "deleted",
				},
			];
			conversationsAtom.set(convs);

			const counts = getConversationCounts();

			expect(counts.active).toBe(2);
			expect(counts.archived).toBe(1);
			expect(counts.deleted).toBe(1);
		});

		it("should return zeros for empty conversations", () => {
			const counts = getConversationCounts();

			expect(counts.active).toBe(0);
			expect(counts.archived).toBe(0);
			expect(counts.deleted).toBe(0);
		});
	});

	describe("cleanupDeletedConversations", () => {
		it("should remove all deleted conversations", async () => {
			const convs: Conversation[] = [
				{
					id: "del-1",
					title: "Deleted 1",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "deleted",
					deletedAt: Date.now(),
				},
				{
					id: "del-2",
					title: "Deleted 2",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "deleted",
					deletedAt: Date.now(),
				},
				{
					id: "active-1",
					title: "Active",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
			];
			conversationsAtom.set(convs);

			const removed = await cleanupDeletedConversations();

			expect(removed).toBe(2);
			expect(conversationsAtom.get()).toHaveLength(1);
			expect(conversationsAtom.get()[0].id).toBe("active-1");
		});

		it("should return 0 when no deleted conversations", async () => {
			const convs: Conversation[] = [
				{
					id: "active-1",
					title: "Active",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
			];
			conversationsAtom.set(convs);

			const removed = await cleanupDeletedConversations();

			expect(removed).toBe(0);
		});
	});

	describe("clearAllConversations", () => {
		it("should clear all conversations", async () => {
			const convs: Conversation[] = [
				{
					id: "c1",
					title: "Conv 1",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
				{
					id: "c2",
					title: "Conv 2",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "archived",
				},
			];
			conversationsAtom.set(convs);

			await clearAllConversations();

			expect(conversationsAtom.get()).toHaveLength(0);
		});

		it("should clear messages too", async () => {
			messagesAtom.set([
				{
					id: "m1",
					transactionId: "t1",
					role: "user",
					content: "Hello",
					timestamp: Date.now(),
				},
			]);

			await clearAllConversations();

			expect(messagesAtom.get()).toHaveLength(0);
		});
	});

	describe("conversation filtering", () => {
		const createTestConversations = (): Conversation[] => [
			{
				id: "active-1",
				title: "Active 1",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			},
			{
				id: "active-2",
				title: "Active 2",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			},
			{
				id: "archived-1",
				title: "Archived 1",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "archived",
			},
			{
				id: "deleted-1",
				title: "Deleted 1",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "deleted",
				deletedAt: Date.now(),
			},
		];

		it("should filter active conversations", () => {
			conversationsAtom.set(createTestConversations());

			const active = conversationsAtom
				.get()
				.filter((c) => c.status === "active");

			expect(active).toHaveLength(2);
		});

		it("should filter archived conversations", () => {
			conversationsAtom.set(createTestConversations());

			const archived = conversationsAtom
				.get()
				.filter((c) => c.status === "archived");

			expect(archived).toHaveLength(1);
		});

		it("should filter deleted conversations", () => {
			conversationsAtom.set(createTestConversations());

			const deleted = conversationsAtom
				.get()
				.filter((c) => c.status === "deleted");

			expect(deleted).toHaveLength(1);
		});
	});
});

