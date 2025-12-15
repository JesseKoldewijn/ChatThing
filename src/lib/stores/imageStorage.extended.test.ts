import { describe, it, expect, beforeEach } from "vitest";
import {
	initImageStorage,
	saveImage,
	getImage,
	getImages,
	deleteImage,
	deleteConversationImages,
	clearAllImages,
	getStorageEstimate,
} from "./imageStorage";

// fake-indexeddb is auto-loaded via setup.ts

describe("imageStorage - IndexedDB operations", () => {
	beforeEach(async () => {
		// Clear the database before each test
		const db = await initImageStorage();
		const transaction = db.transaction("images", "readwrite");
		const store = transaction.objectStore("images");
		store.clear();
		await new Promise<void>((resolve) => {
			transaction.oncomplete = () => resolve();
		});
	});

	describe("initImageStorage", () => {
		it("should initialize the database successfully", async () => {
			const db = await initImageStorage();
			expect(db).toBeDefined();
			expect(db.name).toBe("ai-chat-images");
		});

		it("should return the same database instance on subsequent calls", async () => {
			const db1 = await initImageStorage();
			const db2 = await initImageStorage();
			expect(db1).toBe(db2);
		});

		it("should have an images object store", async () => {
			const db = await initImageStorage();
			expect(db.objectStoreNames.contains("images")).toBe(true);
		});
	});

	describe("saveImage", () => {
		it("should save an image successfully", async () => {
			await saveImage(
				"img-1",
				"conv-1",
				"data:image/png;base64,testdata",
				"image/png",
				"test.png"
			);

			const result = await getImage("img-1");
			expect(result).not.toBeNull();
			expect(result?.id).toBe("img-1");
			expect(result?.conversationId).toBe("conv-1");
			expect(result?.data).toBe("data:image/png;base64,testdata");
			expect(result?.mimeType).toBe("image/png");
			expect(result?.name).toBe("test.png");
		});

		it("should save an image without a name", async () => {
			await saveImage(
				"img-2",
				"conv-1",
				"data:image/jpeg;base64,data",
				"image/jpeg"
			);

			const result = await getImage("img-2");
			expect(result).not.toBeNull();
			expect(result?.name).toBeUndefined();
		});

		it("should overwrite existing image with same ID", async () => {
			await saveImage(
				"img-1",
				"conv-1",
				"data:image/png;base64,original",
				"image/png"
			);
			await saveImage(
				"img-1",
				"conv-1",
				"data:image/png;base64,updated",
				"image/png"
			);

			const result = await getImage("img-1");
			expect(result?.data).toBe("data:image/png;base64,updated");
		});

		it("should store createdAt timestamp", async () => {
			const before = Date.now();
			await saveImage(
				"img-1",
				"conv-1",
				"data:image/png;base64,data",
				"image/png"
			);
			const after = Date.now();

			const result = await getImage("img-1");
			expect(result?.createdAt).toBeGreaterThanOrEqual(before);
			expect(result?.createdAt).toBeLessThanOrEqual(after);
		});
	});

	describe("getImage", () => {
		it("should return null for non-existent image", async () => {
			const result = await getImage("non-existent");
			expect(result).toBeNull();
		});

		it("should return the correct image by ID", async () => {
			await saveImage("img-1", "conv-1", "data1", "image/png");
			await saveImage("img-2", "conv-1", "data2", "image/jpeg");

			const result = await getImage("img-2");
			expect(result?.id).toBe("img-2");
			expect(result?.data).toBe("data2");
		});
	});

	describe("getImages", () => {
		it("should return empty map for empty IDs array", async () => {
			const result = await getImages([]);
			expect(result.size).toBe(0);
		});

		it("should return empty map when no images exist", async () => {
			const result = await getImages(["img-1", "img-2"]);
			expect(result.size).toBe(0);
		});

		it("should return map with existing images", async () => {
			await saveImage("img-1", "conv-1", "data1", "image/png");
			await saveImage("img-2", "conv-1", "data2", "image/jpeg");

			const result = await getImages(["img-1", "img-2"]);
			expect(result.size).toBe(2);
			expect(result.get("img-1")?.data).toBe("data1");
			expect(result.get("img-2")?.data).toBe("data2");
		});

		it("should only return images that exist", async () => {
			await saveImage("img-1", "conv-1", "data1", "image/png");

			const result = await getImages(["img-1", "img-2", "img-3"]);
			expect(result.size).toBe(1);
			expect(result.has("img-1")).toBe(true);
			expect(result.has("img-2")).toBe(false);
		});

		it("should handle duplicate IDs", async () => {
			await saveImage("img-1", "conv-1", "data1", "image/png");

			const result = await getImages(["img-1", "img-1"]);
			// Map will only have one entry for each unique key
			expect(result.size).toBe(1);
		});
	});

	describe("deleteImage", () => {
		it("should delete an existing image", async () => {
			await saveImage("img-1", "conv-1", "data", "image/png");
			await deleteImage("img-1");

			const result = await getImage("img-1");
			expect(result).toBeNull();
		});

		it("should not throw when deleting non-existent image", async () => {
			await expect(deleteImage("non-existent")).resolves.not.toThrow();
		});

		it("should only delete the specified image", async () => {
			await saveImage("img-1", "conv-1", "data1", "image/png");
			await saveImage("img-2", "conv-1", "data2", "image/jpeg");

			await deleteImage("img-1");

			expect(await getImage("img-1")).toBeNull();
			expect(await getImage("img-2")).not.toBeNull();
		});
	});

	describe("deleteConversationImages", () => {
		it("should delete all images for a conversation", async () => {
			await saveImage("img-1", "conv-1", "data1", "image/png");
			await saveImage("img-2", "conv-1", "data2", "image/jpeg");
			await saveImage("img-3", "conv-2", "data3", "image/gif");

			const deletedCount = await deleteConversationImages("conv-1");

			expect(deletedCount).toBe(2);
			expect(await getImage("img-1")).toBeNull();
			expect(await getImage("img-2")).toBeNull();
			expect(await getImage("img-3")).not.toBeNull();
		});

		it("should return 0 when no images exist for conversation", async () => {
			await saveImage("img-1", "conv-1", "data", "image/png");

			const deletedCount = await deleteConversationImages("conv-2");
			expect(deletedCount).toBe(0);
		});

		it("should return 0 when no images exist at all", async () => {
			const deletedCount = await deleteConversationImages("conv-1");
			expect(deletedCount).toBe(0);
		});
	});

	describe("clearAllImages", () => {
		it("should clear all images", async () => {
			await saveImage("img-1", "conv-1", "data1", "image/png");
			await saveImage("img-2", "conv-2", "data2", "image/jpeg");
			await saveImage("img-3", "conv-3", "data3", "image/gif");

			await clearAllImages();

			expect(await getImage("img-1")).toBeNull();
			expect(await getImage("img-2")).toBeNull();
			expect(await getImage("img-3")).toBeNull();
		});

		it("should not throw when database is already empty", async () => {
			await expect(clearAllImages()).resolves.not.toThrow();
		});
	});

	describe("getStorageEstimate", () => {
		it("should return storage estimate if available", async () => {
			const result = await getStorageEstimate();

			// Result depends on browser API availability
			if (result !== null) {
				expect(typeof result.used).toBe("number");
				expect(typeof result.quota).toBe("number");
				expect(result.used).toBeGreaterThanOrEqual(0);
				expect(result.quota).toBeGreaterThanOrEqual(0);
			}
		});
	});
});

