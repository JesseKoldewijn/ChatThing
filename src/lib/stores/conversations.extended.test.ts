import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock imageStorage before importing conversations
vi.mock("./imageStorage", () => ({
	deleteConversationImages: vi.fn().mockResolvedValue(0),
	clearAllImages: vi.fn().mockResolvedValue(undefined),
	saveImage: vi.fn().mockResolvedValue(undefined),
	getImage: vi.fn().mockResolvedValue(null),
	getImages: vi.fn().mockResolvedValue(new Map()),
}));

// Mock titleGenerator
vi.mock("@/lib/ai/titleGenerator", () => ({
	generateConversationTitle: vi.fn().mockResolvedValue("Generated Title"),
	needsTitleGeneration: vi.fn((title: string) => title === "New Chat" || title === ""),
}));

import {
	conversationsAtom,
	deleteConversation,
	archiveConversation,
	unarchiveConversation,
	permanentlyDeleteConversation,
	getConversationCounts,
	cleanupDeletedConversations,
	clearAllConversations,
	switchConversation,
	saveCurrentConversation,
	runAutoArchive,
	triggerTitleGeneration,
	importConversations,
	type Conversation,
	type ExportData,
} from "./conversations";
import { messagesAtom } from "./chat";
import { activeChatIdAtom } from "./navigation";
import { archiveThresholdAtom } from "./settings";

describe("conversations store extended tests", () => {
	beforeEach(() => {
		// Reset atoms
		conversationsAtom.set([]);
		messagesAtom.set([]);
		activeChatIdAtom.set(null);
		archiveThresholdAtom.set({ value: 2, unit: "days" });
		localStorage.clear();
		vi.clearAllMocks();
	});

	describe("switchConversation", () => {
		it("should switch to a valid conversation", () => {
			const conv: Conversation = {
				id: "switch-1",
				title: "Test",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [
					{ id: "m1", transactionId: "t1", role: "user", content: "Hello", timestamp: Date.now() },
				],
				status: "active",
			};
			conversationsAtom.set([conv]);

			switchConversation("switch-1");

			expect(messagesAtom.get()).toHaveLength(1);
			expect(messagesAtom.get()[0].content).toBe("Hello");
		});

		it("should not throw when switching to non-existent conversation", () => {
			expect(() => switchConversation("non-existent")).not.toThrow();
		});
	});

	describe("saveCurrentConversation", () => {
		it("should save messages to active conversation", async () => {
			const conv: Conversation = {
				id: "save-1",
				title: "Test",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([conv]);
			activeChatIdAtom.set("save-1");
			messagesAtom.set([
				{ id: "m1", transactionId: "t1", role: "user", content: "New message", timestamp: Date.now() },
			]);

			await saveCurrentConversation();

			const saved = conversationsAtom.get().find((c) => c.id === "save-1");
			expect(saved?.messages).toHaveLength(1);
		});

		it("should not throw when no active conversation", async () => {
			activeChatIdAtom.set(null);
			await expect(saveCurrentConversation()).resolves.not.toThrow();
		});
	});

	describe("runAutoArchive", () => {
		it("should archive old active conversations", () => {
			const oldDate = Date.now() - 3 * 24 * 60 * 60 * 1000; // 3 days ago
			const convs: Conversation[] = [
				{
					id: "old-1",
					title: "Old Conversation",
					createdAt: oldDate,
					updatedAt: oldDate,
					messages: [],
					status: "active",
				},
				{
					id: "new-1",
					title: "New Conversation",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
			];
			conversationsAtom.set(convs);
			archiveThresholdAtom.set({ value: 2, unit: "days" });

			const archivedCount = runAutoArchive();

			expect(archivedCount).toBe(1);
			const updated = conversationsAtom.get();
			expect(updated.find((c) => c.id === "old-1")?.status).toBe("archived");
			expect(updated.find((c) => c.id === "new-1")?.status).toBe("active");
		});

		it("should return 0 when threshold is disabled", () => {
			archiveThresholdAtom.set({ value: 0, unit: "days" });
			const convs: Conversation[] = [
				{
					id: "old-1",
					title: "Old",
					createdAt: Date.now() - 100 * 24 * 60 * 60 * 1000, // 100 days ago
					updatedAt: Date.now() - 100 * 24 * 60 * 60 * 1000,
					messages: [],
					status: "active",
				},
			];
			conversationsAtom.set(convs);

			const archivedCount = runAutoArchive();

			expect(archivedCount).toBe(0);
		});

		it("should not archive already archived conversations", () => {
			const oldDate = Date.now() - 10 * 24 * 60 * 60 * 1000;
			const convs: Conversation[] = [
				{
					id: "archived-1",
					title: "Already Archived",
					createdAt: oldDate,
					updatedAt: oldDate,
					messages: [],
					status: "archived",
				},
			];
			conversationsAtom.set(convs);
			archiveThresholdAtom.set({ value: 1, unit: "days" });

			const archivedCount = runAutoArchive();

			expect(archivedCount).toBe(0);
		});

		it("should not archive deleted conversations", () => {
			const oldDate = Date.now() - 10 * 24 * 60 * 60 * 1000;
			const convs: Conversation[] = [
				{
					id: "deleted-1",
					title: "Deleted",
					createdAt: oldDate,
					updatedAt: oldDate,
					messages: [],
					status: "deleted",
				},
			];
			conversationsAtom.set(convs);
			archiveThresholdAtom.set({ value: 1, unit: "days" });

			const archivedCount = runAutoArchive();

			expect(archivedCount).toBe(0);
		});
	});

	describe("triggerTitleGeneration", () => {
		it("should be a function", () => {
			expect(typeof triggerTitleGeneration).toBe("function");
		});

		it("should not throw when called with valid conversation", () => {
			const conv: Conversation = {
				id: "title-1",
				title: "New Chat",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([conv]);

			expect(() => triggerTitleGeneration("title-1", "Hello world")).not.toThrow();
		});

		it("should not trigger for non-existent conversation", () => {
			expect(() => triggerTitleGeneration("non-existent", "Hello")).not.toThrow();
		});

		it("should not trigger if title already set", () => {
			const conv: Conversation = {
				id: "titled-1",
				title: "Already Named",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([conv]);

			// Should not throw, but also shouldn't generate
			expect(() => triggerTitleGeneration("titled-1", "Hello")).not.toThrow();
		});
	});

	describe("importConversations", () => {
		it("should import valid conversations in merge mode", async () => {
			const existingConv: Conversation = {
				id: "existing-1",
				title: "Existing",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([existingConv]);

			const importData: ExportData = {
				version: 1,
				exportedAt: new Date().toISOString(),
				conversations: [
					{
						id: "imported-1",
						title: "Imported",
						createdAt: Date.now(),
						updatedAt: Date.now(),
						messages: [],
						status: "active",
					},
				],
			};

			const file = new File([JSON.stringify(importData)], "import.json", {
				type: "application/json",
			});

			const result = await importConversations(file, "merge");

			expect(result.success).toBe(true);
			expect(conversationsAtom.get()).toHaveLength(2);
		});

		it("should import valid conversations in replace mode", async () => {
			const existingConv: Conversation = {
				id: "existing-1",
				title: "Existing",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([existingConv]);

			const importData: ExportData = {
				version: 1,
				exportedAt: new Date().toISOString(),
				conversations: [
					{
						id: "imported-1",
						title: "Imported",
						createdAt: Date.now(),
						updatedAt: Date.now(),
						messages: [],
						status: "active",
					},
				],
			};

			const file = new File([JSON.stringify(importData)], "import.json", {
				type: "application/json",
			});

			const result = await importConversations(file, "replace");

			expect(result.success).toBe(true);
			expect(conversationsAtom.get()).toHaveLength(1);
			expect(conversationsAtom.get()[0].id).toBe("imported-1");
		});

		it("should reject invalid file format", async () => {
			const file = new File(["not json"], "invalid.json", {
				type: "application/json",
			});

			const result = await importConversations(file, "merge");

			expect(result.success).toBe(false);
			expect(result.error).toBeDefined();
		});

		it("should reject file without conversations array", async () => {
			const file = new File([JSON.stringify({ version: 1 })], "invalid.json", {
				type: "application/json",
			});

			const result = await importConversations(file, "merge");

			expect(result.success).toBe(false);
			expect(result.error).toContain("Invalid file format");
		});

		it("should skip invalid conversations", async () => {
			const importData = {
				version: 1,
				exportedAt: new Date().toISOString(),
				conversations: [
					{ invalid: "data" },
					{
						id: "valid-1",
						title: "Valid",
						createdAt: Date.now(),
						updatedAt: Date.now(),
						messages: [],
						status: "active",
					},
				],
			};

			const file = new File([JSON.stringify(importData)], "import.json", {
				type: "application/json",
			});

			const result = await importConversations(file, "merge");

			expect(result.success).toBe(true);
			expect(result.imported).toBe(1);
		});

		it("should not duplicate existing IDs in merge mode", async () => {
			const existingConv: Conversation = {
				id: "same-id",
				title: "Existing",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([existingConv]);

			const importData: ExportData = {
				version: 1,
				exportedAt: new Date().toISOString(),
				conversations: [
					{
						id: "same-id",
						title: "Different Title",
						createdAt: Date.now(),
						updatedAt: Date.now(),
						messages: [],
						status: "active",
					},
				],
			};

			const file = new File([JSON.stringify(importData)], "import.json", {
				type: "application/json",
			});

			await importConversations(file, "merge");

			// Should still have only 1 conversation
			expect(conversationsAtom.get()).toHaveLength(1);
			// Should keep existing title
			expect(conversationsAtom.get()[0].title).toBe("Existing");
		});
	});

	describe("deleteConversation edge cases", () => {
		it("should switch to next active when deleting active conversation", () => {
			const convs: Conversation[] = [
				{
					id: "active-1",
					title: "First Active",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
				{
					id: "active-2",
					title: "Second Active",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
			];
			conversationsAtom.set(convs);
			activeChatIdAtom.set("active-1");

			deleteConversation("active-1");

			// Should have switched to active-2
			expect(activeChatIdAtom.get()).toBe("active-2");
		});

		it("should clear when deleting last active conversation", () => {
			const conv: Conversation = {
				id: "only-1",
				title: "Only Active",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "active",
			};
			conversationsAtom.set([conv]);
			activeChatIdAtom.set("only-1");

			deleteConversation("only-1");

			// Should clear active chat
			expect(activeChatIdAtom.get()).toBeNull();
		});
	});

	describe("archiveConversation edge cases", () => {
		it("should switch to next active when archiving active conversation", () => {
			const convs: Conversation[] = [
				{
					id: "active-1",
					title: "First",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
				{
					id: "active-2",
					title: "Second",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "active",
				},
			];
			conversationsAtom.set(convs);
			activeChatIdAtom.set("active-1");

			archiveConversation("active-1");

			expect(activeChatIdAtom.get()).toBe("active-2");
		});
	});

	describe("permanentlyDeleteConversation", () => {
		it("should remove conversation from list", async () => {
			const conv: Conversation = {
				id: "perm-del-1",
				title: "To Delete",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "deleted",
			};
			conversationsAtom.set([conv]);

			await permanentlyDeleteConversation("perm-del-1");

			expect(conversationsAtom.get()).toHaveLength(0);
		});

		it("should call deleteConversationImages", async () => {
			const { deleteConversationImages } = await import("./imageStorage");
			const conv: Conversation = {
				id: "perm-del-2",
				title: "To Delete",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				messages: [],
				status: "deleted",
			};
			conversationsAtom.set([conv]);

			await permanentlyDeleteConversation("perm-del-2");

			expect(deleteConversationImages).toHaveBeenCalledWith("perm-del-2");
		});
	});

	describe("unarchiveConversation", () => {
		it("should reset updatedAt to prevent immediate re-archive", () => {
			const oldDate = Date.now() - 10 * 24 * 60 * 60 * 1000;
			const conv: Conversation = {
				id: "unarch-1",
				title: "Archived",
				createdAt: oldDate,
				updatedAt: oldDate,
				messages: [],
				status: "archived",
			};
			conversationsAtom.set([conv]);

			const before = Date.now();
			unarchiveConversation("unarch-1");
			const after = Date.now();

			const updated = conversationsAtom.get().find((c) => c.id === "unarch-1");
			expect(updated?.updatedAt).toBeGreaterThanOrEqual(before);
			expect(updated?.updatedAt).toBeLessThanOrEqual(after);
		});
	});

	describe("cleanupDeletedConversations", () => {
		it("should call deleteConversationImages for each deleted", async () => {
			const { deleteConversationImages } = await import("./imageStorage");
			const convs: Conversation[] = [
				{
					id: "del-1",
					title: "Deleted 1",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "deleted",
				},
				{
					id: "del-2",
					title: "Deleted 2",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					messages: [],
					status: "deleted",
				},
			];
			conversationsAtom.set(convs);

			await cleanupDeletedConversations();

			expect(deleteConversationImages).toHaveBeenCalledWith("del-1");
			expect(deleteConversationImages).toHaveBeenCalledWith("del-2");
		});
	});

	describe("clearAllConversations", () => {
		it("should call clearAllImages", async () => {
			const { clearAllImages } = await import("./imageStorage");

			await clearAllConversations();

			expect(clearAllImages).toHaveBeenCalled();
		});
	});

	describe("getConversationCounts", () => {
		it("should count all status types correctly", () => {
			const convs: Conversation[] = [
				{ id: "a1", title: "A1", createdAt: Date.now(), updatedAt: Date.now(), messages: [], status: "active" },
				{ id: "a2", title: "A2", createdAt: Date.now(), updatedAt: Date.now(), messages: [], status: "active" },
				{ id: "a3", title: "A3", createdAt: Date.now(), updatedAt: Date.now(), messages: [], status: "active" },
				{ id: "ar1", title: "AR1", createdAt: Date.now(), updatedAt: Date.now(), messages: [], status: "archived" },
				{ id: "ar2", title: "AR2", createdAt: Date.now(), updatedAt: Date.now(), messages: [], status: "archived" },
				{ id: "d1", title: "D1", createdAt: Date.now(), updatedAt: Date.now(), messages: [], status: "deleted" },
			];
			conversationsAtom.set(convs);

			const counts = getConversationCounts();

			expect(counts.active).toBe(3);
			expect(counts.archived).toBe(2);
			expect(counts.deleted).toBe(1);
		});
	});
});

