import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	compressImage,
	fileToImageAttachment,
	type ImageAttachment,
	saveImagesToIndexedDB,
} from "./chat";
import * as imageStorage from "./imageStorage";

// Mock the imageStorage module
vi.mock("./imageStorage", () => ({
	saveImage: vi.fn().mockResolvedValue(undefined),
}));

describe("chat store - image handling", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("saveImagesToIndexedDB", () => {
		it("should return empty array for empty input", async () => {
			const result = await saveImagesToIndexedDB([], "conv-123");
			expect(result).toEqual([]);
		});

		it("should save images to IndexedDB and return references", async () => {
			const images: ImageAttachment[] = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc123",
					mimeType: "image/png",
					name: "test.png",
				},
			];

			const result = await saveImagesToIndexedDB(images, "conv-123");

			expect(imageStorage.saveImage).toHaveBeenCalledWith(
				"img-1",
				"conv-123",
				"data:image/png;base64,abc123",
				"image/png",
				"test.png",
			);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				id: "img-1",
				data: "",
				mimeType: "image/png",
				name: "test.png",
				storedInDb: true,
			});
		});

		it("should handle multiple images", async () => {
			const images: ImageAttachment[] = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc",
					mimeType: "image/png",
				},
				{
					id: "img-2",
					data: "data:image/jpeg;base64,xyz",
					mimeType: "image/jpeg",
				},
			];

			const result = await saveImagesToIndexedDB(images, "conv-456");

			expect(imageStorage.saveImage).toHaveBeenCalledTimes(2);
			expect(result).toHaveLength(2);
			expect(result[0].storedInDb).toBe(true);
			expect(result[1].storedInDb).toBe(true);
		});

		it("should keep original data if IndexedDB save fails", async () => {
			vi.mocked(imageStorage.saveImage).mockRejectedValueOnce(
				new Error("IndexedDB error"),
			);

			const images: ImageAttachment[] = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc123",
					mimeType: "image/png",
					name: "test.png",
				},
			];

			const result = await saveImagesToIndexedDB(images, "conv-123");

			expect(result).toHaveLength(1);
			expect(result[0].data).toBe("data:image/png;base64,abc123");
			expect(result[0].storedInDb).toBeUndefined();
		});

		it("should handle partial failures gracefully", async () => {
			vi.mocked(imageStorage.saveImage)
				.mockResolvedValueOnce(undefined)
				.mockRejectedValueOnce(new Error("Failed"));

			const images: ImageAttachment[] = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc",
					mimeType: "image/png",
				},
				{
					id: "img-2",
					data: "data:image/jpeg;base64,xyz",
					mimeType: "image/jpeg",
				},
			];

			const result = await saveImagesToIndexedDB(images, "conv-123");

			expect(result).toHaveLength(2);
			expect(result[0].storedInDb).toBe(true);
			expect(result[0].data).toBe("");
			expect(result[1].storedInDb).toBeUndefined();
			expect(result[1].data).toBe("data:image/jpeg;base64,xyz");
		});
	});

	describe("compressImage", () => {
		let mockCanvas: {
			width: number;
			height: number;
			getContext: ReturnType<typeof vi.fn>;
			toDataURL: ReturnType<typeof vi.fn>;
		};
		let mockCtx: { drawImage: ReturnType<typeof vi.fn> };
		let originalImage: typeof globalThis.Image;
		let originalCreateElement: typeof document.createElement;

		beforeEach(() => {
			mockCtx = { drawImage: vi.fn() };
			mockCanvas = {
				width: 0,
				height: 0,
				getContext: vi.fn().mockReturnValue(mockCtx),
				toDataURL: vi.fn().mockReturnValue("data:image/jpeg;base64,compressed"),
			};

			originalCreateElement = document.createElement.bind(document);
			document.createElement = vi.fn().mockImplementation((tag: string) => {
				if (tag === "canvas") {
					return mockCanvas;
				}
				return originalCreateElement(tag);
			});

			// Mock Image constructor
			originalImage = globalThis.Image;
			class MockImage {
				width = 1600;
				height = 1200;
				onload: (() => void) | null = null;
				onerror: (() => void) | null = null;
				private _src = "";

				get src() {
					return this._src;
				}

				set src(value: string) {
					this._src = value;
					// Use queueMicrotask for faster async callback
					queueMicrotask(() => this.onload?.());
				}
			}
			globalThis.Image = MockImage as unknown as typeof Image;
		});

		afterEach(() => {
			document.createElement = originalCreateElement;
			globalThis.Image = originalImage;
		});

		it("should compress large images", async () => {
			const result = await compressImage("data:image/png;base64,original");

			expect(result).toBe("data:image/jpeg;base64,compressed");
			expect(mockCanvas.getContext).toHaveBeenCalledWith("2d", {
				alpha: false,
			});
			expect(mockCanvas.toDataURL).toHaveBeenCalledWith("image/jpeg", 0.8);
		});

		it("should resize images that are too large", async () => {
			await compressImage("data:image/png;base64,original", 800);

			// Canvas should be resized to max 800px on longest side
			expect(mockCanvas.width).toBeLessThanOrEqual(800);
		});

		it("should use custom quality parameter", async () => {
			await compressImage("data:image/png;base64,original", 800, 0.5);

			expect(mockCanvas.toDataURL).toHaveBeenCalledWith("image/jpeg", 0.5);
		});

		it("should reject if canvas context is unavailable", async () => {
			mockCanvas.getContext = vi.fn().mockReturnValue(null);

			await expect(
				compressImage("data:image/png;base64,original"),
			).rejects.toThrow("Failed to get canvas context");
		});

		it("should reject if image fails to load", async () => {
			class FailingImage {
				onload: (() => void) | null = null;
				onerror: (() => void) | null = null;
				private _src = "";

				get src() {
					return this._src;
				}

				set src(value: string) {
					this._src = value;
					queueMicrotask(() => this.onerror?.());
				}
			}
			globalThis.Image = FailingImage as unknown as typeof Image;

			await expect(
				compressImage("data:image/png;base64,invalid"),
			).rejects.toThrow("Failed to load image for compression");
		});
	});

	describe("fileToImageAttachment", () => {
		let originalFileReader: typeof FileReader;
		let originalImage: typeof globalThis.Image;
		let originalCreateElement: typeof document.createElement;
		let mockCanvas: {
			width: number;
			height: number;
			getContext: ReturnType<typeof vi.fn>;
			toDataURL: ReturnType<typeof vi.fn>;
		};

		beforeEach(() => {
			originalFileReader = globalThis.FileReader;
			originalImage = globalThis.Image;
			originalCreateElement = document.createElement.bind(document);

			// Mock FileReader
			class MockFileReader {
				result: string | null = null;
				onload: ((event: ProgressEvent<FileReader>) => void) | null = null;
				onerror: ((event: ProgressEvent<FileReader>) => void) | null = null;

				readAsDataURL(_file: Blob) {
					queueMicrotask(() => {
						this.result = "data:image/png;base64,testdata";
						this.onload?.({} as ProgressEvent<FileReader>);
					});
				}
			}
			globalThis.FileReader = MockFileReader as unknown as typeof FileReader;

			// Mock canvas for compression
			mockCanvas = {
				width: 0,
				height: 0,
				getContext: vi.fn().mockReturnValue({ drawImage: vi.fn() }),
				toDataURL: vi.fn().mockReturnValue("data:image/jpeg;base64,compressed"),
			};

			document.createElement = vi.fn().mockImplementation((tag: string) => {
				if (tag === "canvas") {
					return mockCanvas;
				}
				return originalCreateElement(tag);
			});

			// Mock Image for compression
			class MockImage {
				width = 400;
				height = 300;
				onload: (() => void) | null = null;
				onerror: (() => void) | null = null;
				private _src = "";

				get src() {
					return this._src;
				}

				set src(value: string) {
					this._src = value;
					queueMicrotask(() => this.onload?.());
				}
			}
			globalThis.Image = MockImage as unknown as typeof Image;
		});

		afterEach(() => {
			globalThis.FileReader = originalFileReader;
			globalThis.Image = originalImage;
			document.createElement = originalCreateElement;
		});

		it("should convert file to ImageAttachment", async () => {
			const mockFile = new File(["test"], "test.png", { type: "image/png" });

			const result = await fileToImageAttachment(mockFile);

			expect(result).toHaveProperty("id");
			expect(result).toHaveProperty("data");
			expect(result).toHaveProperty("mimeType");
			expect(result.name).toBe("test.png");
		});

		it("should compress non-GIF images to JPEG", async () => {
			const mockFile = new File(["test"], "test.png", { type: "image/png" });

			const result = await fileToImageAttachment(mockFile);

			expect(result.mimeType).toBe("image/jpeg");
		});

		it("should keep GIF files uncompressed", async () => {
			const mockFile = new File(["test"], "animation.gif", {
				type: "image/gif",
			});

			const result = await fileToImageAttachment(mockFile);

			expect(result.mimeType).toBe("image/gif");
			expect(result.name).toBe("animation.gif");
			expect(result.data).toBe("data:image/png;base64,testdata"); // Original data preserved
		});

		it("should generate unique ID for each attachment", async () => {
			const mockFile = new File(["test"], "test.png", { type: "image/png" });

			const result1 = await fileToImageAttachment(mockFile);
			const result2 = await fileToImageAttachment(mockFile);

			expect(result1.id).not.toBe(result2.id);
		});

		it("should handle FileReader errors", async () => {
			class FailingFileReader {
				result: string | null = null;
				onload: ((event: ProgressEvent<FileReader>) => void) | null = null;
				onerror: ((event: ProgressEvent<FileReader>) => void) | null = null;

				readAsDataURL(_file: Blob) {
					queueMicrotask(() => {
						this.onerror?.(
							new Error("Read failed") as unknown as ProgressEvent<FileReader>,
						);
					});
				}
			}
			globalThis.FileReader = FailingFileReader as unknown as typeof FileReader;

			const mockFile = new File(["test"], "test.png", { type: "image/png" });

			await expect(fileToImageAttachment(mockFile)).rejects.toBeDefined();
		});

		it("should fallback to original if compression fails", async () => {
			// Make canvas context return null to fail compression
			mockCanvas.getContext = vi.fn().mockReturnValue(null);

			const mockFile = new File(["test"], "test.png", { type: "image/png" });

			const result = await fileToImageAttachment(mockFile);

			// Should fallback to original data
			expect(result.data).toBeDefined();
			expect(result.data.length).toBeGreaterThan(0);
			expect(result.mimeType).toBe("image/png"); // Original type preserved on fallback
		});
	});
});
