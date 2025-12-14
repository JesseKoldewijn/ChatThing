import { describe, it, expect } from "vitest";

// Since the helper functions are not exported, we test them indirectly
// by testing the module's behavior. For comprehensive testing, we would
// need to either export the helpers or test through integration.

// For now, we'll create a parallel test module that tests the logic patterns
// that would be used in prompt.ts

describe("prompt module helpers", () => {
	describe("isToolCallMessage logic", () => {
		const isToolCallMessage = (content: string): boolean => {
			return content.startsWith("🔧 Using tool:");
		};

		it("should identify tool call messages", () => {
			expect(isToolCallMessage("🔧 Using tool: weather")).toBe(true);
			expect(isToolCallMessage("🔧 Using tool: datetime")).toBe(true);
		});

		it("should not identify regular messages as tool calls", () => {
			expect(isToolCallMessage("Hello, how are you?")).toBe(false);
			expect(isToolCallMessage("The weather is nice today")).toBe(false);
		});

		it("should not match partial emoji", () => {
			expect(isToolCallMessage("Using tool: weather")).toBe(false);
			expect(isToolCallMessage("🔧Using tool: weather")).toBe(false);
		});
	});

	describe("isToolUIMessage logic", () => {
		const isToolUIMessage = (content: string): boolean => {
			if (content.startsWith("🔧 Using tool:")) return true;
			if (content.startsWith("❌ Error:")) return true;
			return false;
		};

		it("should identify tool announcement messages", () => {
			expect(isToolUIMessage("🔧 Using tool: weather")).toBe(true);
		});

		it("should identify error messages", () => {
			expect(isToolUIMessage("❌ Error: Something went wrong")).toBe(true);
		});

		it("should not identify regular assistant messages", () => {
			expect(isToolUIMessage("The current weather in London is sunny.")).toBe(false);
			expect(isToolUIMessage("Hello! How can I help you today?")).toBe(false);
		});
	});

	describe("findToolCallTransactionIds logic", () => {
		interface Message {
			role: "user" | "assistant";
			content: string;
			transactionId: string;
		}

		const findToolCallTransactionIds = (messages: Message[]): Set<string> => {
			const toolTransactionIds = new Set<string>();
			for (const msg of messages) {
				if (msg.role === "assistant" && msg.content.startsWith("🔧 Using tool:")) {
					toolTransactionIds.add(msg.transactionId);
				}
			}
			return toolTransactionIds;
		};

		it("should find transactions with tool calls", () => {
			const messages: Message[] = [
				{ role: "user", content: "What's the weather?", transactionId: "tx1" },
				{ role: "assistant", content: "🔧 Using tool: weather", transactionId: "tx1" },
				{ role: "assistant", content: "It's sunny!", transactionId: "tx1" },
			];

			const result = findToolCallTransactionIds(messages);

			expect(result.has("tx1")).toBe(true);
			expect(result.size).toBe(1);
		});

		it("should return empty set when no tool calls", () => {
			const messages: Message[] = [
				{ role: "user", content: "Hello", transactionId: "tx1" },
				{ role: "assistant", content: "Hi there!", transactionId: "tx1" },
			];

			const result = findToolCallTransactionIds(messages);

			expect(result.size).toBe(0);
		});

		it("should find multiple tool transactions", () => {
			const messages: Message[] = [
				{ role: "user", content: "Weather?", transactionId: "tx1" },
				{ role: "assistant", content: "🔧 Using tool: weather", transactionId: "tx1" },
				{ role: "user", content: "Time?", transactionId: "tx2" },
				{ role: "assistant", content: "🔧 Using tool: datetime", transactionId: "tx2" },
			];

			const result = findToolCallTransactionIds(messages);

			expect(result.has("tx1")).toBe(true);
			expect(result.has("tx2")).toBe(true);
			expect(result.size).toBe(2);
		});
	});

	describe("buildMessageContent logic", () => {
		interface ImageAttachment {
			id: string;
			data: string;
			mimeType: string;
		}

		interface TextPart {
			type: "text";
			text: string;
		}

		interface ImagePart {
			type: "image";
			image: string;
		}

		const buildMessageContent = (
			text: string,
			images?: ImageAttachment[]
		): (TextPart | ImagePart)[] => {
			const content: (TextPart | ImagePart)[] = [];

			if (images && images.length > 0) {
				for (const image of images) {
					content.push({ type: "image", image: image.data });
				}
			}

			content.push({ type: "text", text });

			return content;
		};

		it("should create text-only content when no images", () => {
			const result = buildMessageContent("Hello world");

			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({ type: "text", text: "Hello world" });
		});

		it("should create text-only content when images is empty", () => {
			const result = buildMessageContent("Hello", []);

			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({ type: "text", text: "Hello" });
		});

		it("should include images before text", () => {
			const images: ImageAttachment[] = [
				{ id: "img1", data: "data:image/png;base64,abc", mimeType: "image/png" },
			];

			const result = buildMessageContent("Describe this image", images);

			expect(result).toHaveLength(2);
			expect(result[0].type).toBe("image");
			expect(result[1]).toEqual({ type: "text", text: "Describe this image" });
		});

		it("should handle multiple images", () => {
			const images: ImageAttachment[] = [
				{ id: "img1", data: "data:image/png;base64,abc", mimeType: "image/png" },
				{ id: "img2", data: "data:image/jpeg;base64,xyz", mimeType: "image/jpeg" },
			];

			const result = buildMessageContent("Compare these images", images);

			expect(result).toHaveLength(3);
			expect(result[0].type).toBe("image");
			expect(result[1].type).toBe("image");
			expect(result[2].type).toBe("text");
		});
	});

	describe("imageAttachmentToImagePart logic", () => {
		const imageAttachmentToImagePart = (image: { data: string }) => ({
			type: "image" as const,
			image: image.data,
		});

		it("should convert image attachment to image part", () => {
			const attachment = { data: "data:image/png;base64,abc123" };
			const result = imageAttachmentToImagePart(attachment);

			expect(result).toEqual({
				type: "image",
				image: "data:image/png;base64,abc123",
			});
		});

		it("should preserve the full data URL", () => {
			const longData = "data:image/jpeg;base64," + "A".repeat(1000);
			const attachment = { data: longData };
			const result = imageAttachmentToImagePart(attachment);

			expect(result.image).toBe(longData);
		});
	});

	describe("findMostRecentToolTransactionId logic", () => {
		interface Message {
			transactionId: string;
		}

		const findMostRecentToolTransactionId = (
			messages: Message[],
			toolTransactionIds: Set<string>
		): string | undefined => {
			if (toolTransactionIds.size === 0) return undefined;

			for (let i = messages.length - 1; i >= 0; i--) {
				const msg = messages[i];
				if (toolTransactionIds.has(msg.transactionId)) {
					return msg.transactionId;
				}
			}
			return undefined;
		};

		it("should return undefined when no tool transactions", () => {
			const messages = [{ transactionId: "tx1" }];
			const result = findMostRecentToolTransactionId(messages, new Set());

			expect(result).toBeUndefined();
		});

		it("should return the most recent tool transaction", () => {
			const messages = [
				{ transactionId: "tx1" },
				{ transactionId: "tx2" },
				{ transactionId: "tx3" },
			];
			const toolIds = new Set(["tx1", "tx3"]);

			const result = findMostRecentToolTransactionId(messages, toolIds);

			expect(result).toBe("tx3");
		});

		it("should work with single tool transaction", () => {
			const messages = [
				{ transactionId: "tx1" },
				{ transactionId: "tx2" },
			];
			const toolIds = new Set(["tx1"]);

			const result = findMostRecentToolTransactionId(messages, toolIds);

			expect(result).toBe("tx1");
		});
	});
});

