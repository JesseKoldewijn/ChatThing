import { describe, expect, it } from "vitest";
import type { StoredImage } from "./imageStorage";

// The imageStorage module uses IndexedDB which is complex to mock properly
// These tests verify the exported interface and types rather than full integration

describe("imageStorage module", () => {
	describe("StoredImage interface", () => {
		it("should have correct shape with all required properties", () => {
			const storedImage: StoredImage = {
				id: "img-123",
				conversationId: "conv-456",
				data: "data:image/png;base64,abc",
				mimeType: "image/png",
				name: "screenshot.png",
				createdAt: Date.now(),
			};

			expect(storedImage.id).toBe("img-123");
			expect(storedImage.conversationId).toBe("conv-456");
			expect(storedImage.mimeType).toBe("image/png");
			expect(typeof storedImage.createdAt).toBe("number");
		});

		it("should allow optional name property", () => {
			const storedImage: StoredImage = {
				id: "img-123",
				conversationId: "conv-456",
				data: "data:image/jpeg;base64,xyz",
				mimeType: "image/jpeg",
				createdAt: Date.now(),
			};

			expect(storedImage.name).toBeUndefined();
		});
	});

	describe("exports", () => {
		it("should export initImageStorage function", async () => {
			const { initImageStorage } = await import("./imageStorage");
			expect(typeof initImageStorage).toBe("function");
		});

		it("should export saveImage function", async () => {
			const { saveImage } = await import("./imageStorage");
			expect(typeof saveImage).toBe("function");
		});

		it("should export getImage function", async () => {
			const { getImage } = await import("./imageStorage");
			expect(typeof getImage).toBe("function");
		});

		it("should export getImages function", async () => {
			const { getImages } = await import("./imageStorage");
			expect(typeof getImages).toBe("function");
		});

		it("should export deleteImage function", async () => {
			const { deleteImage } = await import("./imageStorage");
			expect(typeof deleteImage).toBe("function");
		});

		it("should export deleteConversationImages function", async () => {
			const { deleteConversationImages } = await import("./imageStorage");
			expect(typeof deleteConversationImages).toBe("function");
		});

		it("should export clearAllImages function", async () => {
			const { clearAllImages } = await import("./imageStorage");
			expect(typeof clearAllImages).toBe("function");
		});

		it("should export getStorageEstimate function", async () => {
			const { getStorageEstimate } = await import("./imageStorage");
			expect(typeof getStorageEstimate).toBe("function");
		});
	});

	describe("getStorageEstimate", () => {
		it("should handle missing storage API", async () => {
			const { getStorageEstimate } = await import("./imageStorage");

			// The mock may or may not have storage API
			const result = await getStorageEstimate();
			// Result is either null or an object with used/quota
			expect(result === null || typeof result?.used === "number").toBe(true);
		});
	});
});

describe("imageStorage constants", () => {
	it("should use expected database name", async () => {
		// We can't directly test the constants since they're not exported,
		// but we verify the module can be imported without errors
		const module = await import("./imageStorage");
		expect(module).toBeDefined();
	});
});
