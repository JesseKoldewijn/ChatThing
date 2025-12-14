import { describe, it, expect, beforeEach } from "vitest";
import {
	messagesAtom,
	currentStreamAtom,
	isStreamingAtom,
	pendingImagesAtom,
	lastUserMessageAtom,
	addMessage,
	updateLastAssistantMessage,
	removeLastMessage,
	removeAssistantMessagesFromTransaction,
	clearMessages,
	appendToStream,
	clearStream,
	addPendingImage,
	removePendingImage,
	clearPendingImages,
	type ImageAttachment,
} from "./chat";

describe("chat store", () => {
	beforeEach(() => {
		// Reset all atoms before each test
		messagesAtom.set([]);
		currentStreamAtom.set("");
		isStreamingAtom.set(false);
		pendingImagesAtom.set([]);
	});

	describe("addMessage", () => {
		it("should add a user message", () => {
			const message = addMessage("user", "Hello world");

			expect(message.role).toBe("user");
			expect(message.content).toBe("Hello world");
			expect(message.id).toBeDefined();
			expect(message.transactionId).toBeDefined();
			expect(message.timestamp).toBeDefined();

			const messages = messagesAtom.get();
			expect(messages).toHaveLength(1);
			expect(messages[0]).toEqual(message);
		});

		it("should add an assistant message", () => {
			const message = addMessage("assistant", "Hi there!");

			expect(message.role).toBe("assistant");
			expect(message.content).toBe("Hi there!");
		});

		it("should use provided transactionId", () => {
			const transactionId = "test-transaction-123";
			const message = addMessage("user", "Test", { transactionId });

			expect(message.transactionId).toBe(transactionId);
		});

		it("should add images to message when provided", () => {
			const images: ImageAttachment[] = [
				{ id: "img1", data: "data:image/png;base64,abc", mimeType: "image/png" },
			];
			const message = addMessage("user", "Check this image", { images });

			expect(message.images).toEqual(images);
		});

		it("should not add images property when empty array provided", () => {
			const message = addMessage("user", "No images", { images: [] });

			expect(message.images).toBeUndefined();
		});

		it("should add multiple messages in order", () => {
			addMessage("user", "First");
			addMessage("assistant", "Second");
			addMessage("user", "Third");

			const messages = messagesAtom.get();
			expect(messages).toHaveLength(3);
			expect(messages[0].content).toBe("First");
			expect(messages[1].content).toBe("Second");
			expect(messages[2].content).toBe("Third");
		});
	});

	describe("updateLastAssistantMessage", () => {
		it("should update the last assistant message content", () => {
			addMessage("user", "Hello");
			addMessage("assistant", "Initial response");

			updateLastAssistantMessage("Updated response");

			const messages = messagesAtom.get();
			expect(messages[1].content).toBe("Updated response");
		});

		it("should not update if last message is not assistant", () => {
			addMessage("assistant", "First");
			addMessage("user", "Hello");

			updateLastAssistantMessage("Should not change");

			const messages = messagesAtom.get();
			expect(messages[0].content).toBe("First");
			expect(messages[1].content).toBe("Hello");
		});

		it("should not throw if no messages exist", () => {
			expect(() => updateLastAssistantMessage("Test")).not.toThrow();
		});
	});

	describe("removeLastMessage", () => {
		it("should remove the last message", () => {
			addMessage("user", "First");
			addMessage("assistant", "Second");

			removeLastMessage();

			const messages = messagesAtom.get();
			expect(messages).toHaveLength(1);
			expect(messages[0].content).toBe("First");
		});

		it("should not throw if no messages exist", () => {
			expect(() => removeLastMessage()).not.toThrow();
			expect(messagesAtom.get()).toHaveLength(0);
		});
	});

	describe("removeAssistantMessagesFromTransaction", () => {
		it("should remove all assistant messages with given transactionId", () => {
			const txId = "test-tx";
			addMessage("user", "Question", { transactionId: txId });
			addMessage("assistant", "Tool announcement", { transactionId: txId });
			addMessage("assistant", "Response", { transactionId: txId });

			removeAssistantMessagesFromTransaction(txId);

			const messages = messagesAtom.get();
			expect(messages).toHaveLength(1);
			expect(messages[0].role).toBe("user");
		});

		it("should not remove user messages", () => {
			const txId = "test-tx";
			addMessage("user", "Question", { transactionId: txId });
			addMessage("assistant", "Response", { transactionId: txId });

			removeAssistantMessagesFromTransaction(txId);

			const messages = messagesAtom.get();
			expect(messages).toHaveLength(1);
			expect(messages[0].content).toBe("Question");
		});

		it("should not remove messages from other transactions", () => {
			addMessage("user", "Q1", { transactionId: "tx1" });
			addMessage("assistant", "A1", { transactionId: "tx1" });
			addMessage("user", "Q2", { transactionId: "tx2" });
			addMessage("assistant", "A2", { transactionId: "tx2" });

			removeAssistantMessagesFromTransaction("tx1");

			const messages = messagesAtom.get();
			expect(messages).toHaveLength(3);
			expect(messages.find((m) => m.content === "A1")).toBeUndefined();
			expect(messages.find((m) => m.content === "A2")).toBeDefined();
		});
	});

	describe("clearMessages", () => {
		it("should clear all messages and related state", () => {
			addMessage("user", "Test");
			appendToStream("streaming...");
			isStreamingAtom.set(true);
			addPendingImage({
				id: "img1",
				data: "data:image/png;base64,abc",
				mimeType: "image/png",
			});

			clearMessages();

			expect(messagesAtom.get()).toHaveLength(0);
			expect(currentStreamAtom.get()).toBe("");
			expect(isStreamingAtom.get()).toBe(false);
			expect(pendingImagesAtom.get()).toHaveLength(0);
		});
	});

	describe("stream actions", () => {
		it("should append to stream", () => {
			appendToStream("Hello");
			appendToStream(" World");

			expect(currentStreamAtom.get()).toBe("Hello World");
		});

		it("should clear stream", () => {
			appendToStream("Some content");
			clearStream();

			expect(currentStreamAtom.get()).toBe("");
		});
	});

	describe("pending images", () => {
		const testImage: ImageAttachment = {
			id: "test-img",
			data: "data:image/png;base64,abc123",
			mimeType: "image/png",
			name: "test.png",
		};

		it("should add pending image", () => {
			addPendingImage(testImage);

			const pending = pendingImagesAtom.get();
			expect(pending).toHaveLength(1);
			expect(pending[0]).toEqual(testImage);
		});

		it("should remove pending image by id", () => {
			addPendingImage(testImage);
			addPendingImage({ ...testImage, id: "other-img" });

			removePendingImage("test-img");

			const pending = pendingImagesAtom.get();
			expect(pending).toHaveLength(1);
			expect(pending[0].id).toBe("other-img");
		});

		it("should clear all pending images", () => {
			addPendingImage(testImage);
			addPendingImage({ ...testImage, id: "img2" });

			clearPendingImages();

			expect(pendingImagesAtom.get()).toHaveLength(0);
		});
	});

	describe("lastUserMessageAtom", () => {
		it("should return null when no messages", () => {
			expect(lastUserMessageAtom.get()).toBeNull();
		});

		it("should return the last user message", () => {
			addMessage("user", "First question");
			addMessage("assistant", "Answer");
			addMessage("user", "Second question");

			const lastUserMsg = lastUserMessageAtom.get();
			expect(lastUserMsg?.content).toBe("Second question");
		});

		it("should return null when only assistant messages", () => {
			addMessage("assistant", "Hello");

			expect(lastUserMessageAtom.get()).toBeNull();
		});
	});
});

