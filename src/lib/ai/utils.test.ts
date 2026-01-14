import type { Message } from "@/lib/stores/chat";
import { describe, expect, it } from "vitest";
import { convertHistoryToMessages, stripDataUrlPrefix } from "./utils";

describe("AI Utils", () => {
	describe("stripDataUrlPrefix", () => {
		it("should strip data URL prefix from JPEG", () => {
			const input = "data:image/jpeg;base64,base64data";
			expect(stripDataUrlPrefix(input)).toBe("base64data");
		});

		it("should strip data URL prefix from PNG", () => {
			const input = "data:image/png;base64,base64data";
			expect(stripDataUrlPrefix(input)).toBe("base64data");
		});

		it("should return original string if no prefix found", () => {
			const input = "base64data";
			expect(stripDataUrlPrefix(input)).toBe("base64data");
		});
	});

	describe("convertHistoryToMessages", () => {
		it("should convert simple history", () => {
			const history: Message[] = [
				{
					id: "1",
					role: "user",
					content: "Hello",
					timestamp: Date.now(),
					transactionId: "t1",
				},
				{
					id: "2",
					role: "assistant",
					content: "Hi there!",
					timestamp: Date.now(),
					transactionId: "t1",
				},
			];

			const coreMessages = convertHistoryToMessages(history);
			expect(coreMessages).toHaveLength(2);
			expect(coreMessages[0]).toEqual({ role: "user", content: "Hello" });
			expect(coreMessages[1]).toEqual({
				role: "assistant",
				content: "Hi there!",
			});
		});

		it("should merge consecutive user messages", () => {
			const history: Message[] = [
				{
					id: "1",
					role: "user",
					content: "Message 1",
					timestamp: Date.now(),
					transactionId: "t1",
				},
				{
					id: "2",
					role: "user",
					content: "Message 2",
					timestamp: Date.now(),
					transactionId: "t1",
				},
			];

			const coreMessages = convertHistoryToMessages(history);
			expect(coreMessages).toHaveLength(1);
			expect(coreMessages[0].role).toBe("user");

			const content = coreMessages[0].content;
			expect(Array.isArray(content)).toBe(true);
			const contentArray = content as { type: string; text?: string }[];
			expect(contentArray).toHaveLength(2);
			expect(contentArray[0]).toEqual({
				type: "text",
				text: "Message 1",
			});
			expect(contentArray[1]).toEqual({
				type: "text",
				text: "Message 2",
			});
		});

		it("should merge consecutive assistant messages", () => {
			const history: Message[] = [
				{
					id: "1",
					role: "assistant",
					content: "Response 1",
					timestamp: Date.now(),
					transactionId: "t1",
				},
				{
					id: "2",
					role: "assistant",
					content: "Response 2",
					timestamp: Date.now(),
					transactionId: "t1",
				},
			];

			const coreMessages = convertHistoryToMessages(history);
			expect(coreMessages).toHaveLength(1);
			expect(coreMessages[0]).toEqual({
				role: "assistant",
				content: "Response 1\n\nResponse 2",
			});
		});

		it("should handle images in history", () => {
			const history: Message[] = [
				{
					id: "1",
					role: "user",
					content: "What is this?",
					images: [
						{
							id: "img1",
							data: "data:image/jpeg;base64,data1",
							mimeType: "image/jpeg",
						},
					],
					timestamp: Date.now(),
					transactionId: "t1",
				},
			];

			const coreMessages = convertHistoryToMessages(history);
			expect(coreMessages).toHaveLength(1);
			expect(coreMessages[0].role).toBe("user");
			expect(Array.isArray(coreMessages[0].content)).toBe(true);
			const content = coreMessages[0].content as {
				type: string;
				text?: string;
				image?: string;
			}[];
			expect(content[0]).toEqual({ type: "text", text: "What is this?" });
			expect(content[1]).toEqual({ type: "image", image: "data1" });
		});

		it("should handle multiple images in merged messages", () => {
			const history: Message[] = [
				{
					id: "1",
					role: "user",
					content: "Image 1",
					images: [
						{
							id: "img1",
							data: "data:image/jpeg;base64,data1",
							mimeType: "image/jpeg",
						},
					],
					timestamp: Date.now(),
					transactionId: "t1",
				},
				{
					id: "2",
					role: "user",
					content: "Image 2",
					images: [
						{
							id: "img2",
							data: "data:image/jpeg;base64,data2",
							mimeType: "image/jpeg",
						},
					],
					timestamp: Date.now(),
					transactionId: "t1",
				},
			];

			const coreMessages = convertHistoryToMessages(history);
			expect(coreMessages).toHaveLength(1);
			const content = coreMessages[0].content as {
				type: string;
				text?: string;
				image?: string;
			}[];
			expect(content).toHaveLength(4);
			expect(content[0]).toEqual({ type: "text", text: "Image 1" });
			expect(content[1]).toEqual({ type: "image", image: "data1" });
			expect(content[2]).toEqual({ type: "text", text: "Image 2" });
			expect(content[3]).toEqual({ type: "image", image: "data2" });
		});

		it("should filter out system messages", () => {
			const history: Message[] = [
				{
					id: "1",
					role: "system",
					content: "System prompt",
					timestamp: Date.now(),
					transactionId: "t1",
				},
				{
					id: "2",
					role: "user",
					content: "Hello",
					timestamp: Date.now(),
					transactionId: "t1",
				},
			];

			const coreMessages = convertHistoryToMessages(history);
			expect(coreMessages).toHaveLength(1);
			expect(coreMessages[0].role).toBe("user");
		});
	});
});
