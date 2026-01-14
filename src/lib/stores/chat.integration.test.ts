import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	addMessage,
	addPendingImage,
	appendToStream,
	clearPendingImages,
	clearStream,
	currentStreamAtom,
	isStreamingAtom,
	messagesAtom,
	pendingImagesAtom,
	removePendingImage,
} from "./chat";
import { activeConversationIdAtom } from "./conversations";

describe("Chat Store Integration", () => {
	beforeEach(() => {
		messagesAtom.set([]);
		currentStreamAtom.set("");
		isStreamingAtom.set(false);
		pendingImagesAtom.set([]);
		activeConversationIdAtom.set(null);
		vi.clearAllMocks();
	});

	describe("message and streaming integration", () => {
		it("should add message and update streaming state", () => {
			isStreamingAtom.set(true);
			expect(isStreamingAtom.get()).toBe(true);

			addMessage("user", "Hello", { transactionId: "tx-1" });
			expect(messagesAtom.get().length).toBe(1);
			expect(messagesAtom.get()[0].content).toBe("Hello");

			isStreamingAtom.set(false);
			expect(isStreamingAtom.get()).toBe(false);
		});

		it("should append to stream and then add final message", () => {
			isStreamingAtom.set(true);
			appendToStream("Hello");
			expect(currentStreamAtom.get()).toBe("Hello");

			appendToStream(" world");
			expect(currentStreamAtom.get()).toBe("Hello world");

			addMessage("assistant", "Hello world", { transactionId: "tx-1" });
			clearStream();
			expect(currentStreamAtom.get()).toBe("");
			isStreamingAtom.set(false);
			expect(isStreamingAtom.get()).toBe(false);
		});

		it("should handle multiple messages in sequence", () => {
			addMessage("user", "First", { transactionId: "tx-1" });
			addMessage("assistant", "Response 1", { transactionId: "tx-2" });
			addMessage("user", "Second", { transactionId: "tx-3" });
			addMessage("assistant", "Response 2", { transactionId: "tx-4" });

			const messages = messagesAtom.get();
			expect(messages.length).toBe(4);
			expect(messages[0].content).toBe("First");
			expect(messages[1].content).toBe("Response 1");
			expect(messages[2].content).toBe("Second");
			expect(messages[3].content).toBe("Response 2");
		});
	});

	describe("pending images integration", () => {
		it("should add and remove pending images", () => {
			const image1 = {
				id: "img-1",
				data: "data:image/png;base64,abc",
				mimeType: "image/png",
			};
			const image2 = {
				id: "img-2",
				data: "data:image/jpeg;base64,def",
				mimeType: "image/jpeg",
			};

			addPendingImage(image1);
			expect(pendingImagesAtom.get()).toHaveLength(1);
			expect(pendingImagesAtom.get()[0].id).toBe("img-1");

			addPendingImage(image2);
			expect(pendingImagesAtom.get()).toHaveLength(2);

			removePendingImage("img-1");
			expect(pendingImagesAtom.get()).toHaveLength(1);
			expect(pendingImagesAtom.get()[0].id).toBe("img-2");

			clearPendingImages();
			expect(pendingImagesAtom.get()).toHaveLength(0);
		});

		it("should handle images with messages", () => {
			const image = {
				id: "img-1",
				data: "data:image/png;base64,abc",
				mimeType: "image/png",
			};

			addPendingImage(image);
			addMessage("user", "Look at this", {
				transactionId: "tx-1",
				images: [image],
			});

			const messages = messagesAtom.get();
			expect(messages[0].images).toContainEqual(image);
		});
	});

	describe("streaming workflow", () => {
		it("should handle complete streaming workflow", () => {
			// Start streaming
			isStreamingAtom.set(true);
			expect(isStreamingAtom.get()).toBe(true);

			// Stream chunks
			appendToStream("Hello");
			appendToStream(" there");
			appendToStream("!");
			expect(currentStreamAtom.get()).toBe("Hello there!");

			// Complete stream
			addMessage("assistant", "Hello there!", { transactionId: "tx-1" });
			clearStream();
			isStreamingAtom.set(false);

			expect(isStreamingAtom.get()).toBe(false);
			expect(currentStreamAtom.get()).toBe("");
			expect(messagesAtom.get().length).toBe(1);
		});

		it("should handle interrupted stream", () => {
			isStreamingAtom.set(true);
			appendToStream("Partial");
			expect(currentStreamAtom.get()).toBe("Partial");

			// Interrupt
			clearStream();
			isStreamingAtom.set(false);

			expect(isStreamingAtom.get()).toBe(false);
			expect(currentStreamAtom.get()).toBe("");
		});
	});
});
