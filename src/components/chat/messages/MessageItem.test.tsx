import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock stores
vi.mock("@nanostores/react", () => ({
	useStore: vi.fn((atom) => {
		if (atom.name === "messagesAtom") return mockMessages;
		if (atom.name === "lastUserMessageAtom") return mockLastUserMessage;
		return atom._value ?? null;
	}),
}));

vi.mock("@/lib/stores/chat", () => ({
	messagesAtom: { name: "messagesAtom", get: () => mockMessages },
	lastUserMessageAtom: {
		name: "lastUserMessageAtom",
		get: () => mockLastUserMessage,
	},
	removeMessagesFromTransaction: vi.fn(),
}));

vi.mock("@/lib/stores/imageStorage", () => ({
	getImages: vi.fn().mockResolvedValue(new Map()),
}));

// Mock the UI component
vi.mock("./MessageItem.ui", () => ({
	MessageItemUI: ({
		content,
		role,
		isStreaming,
		isCopied,
		onCopy,
		onRegenerate,
		images,
	}: {
		content: string;
		role: string;
		isStreaming?: boolean;
		isCopied?: boolean;
		onCopy?: () => void;
		onRegenerate?: () => void;
		images?: Array<{ id: string; data: string }>;
	}) => (
		<div data-testid="message-item-ui">
			<span data-testid="content">{content}</span>
			<span data-testid="role">{role}</span>
			<span data-testid="is-streaming">{String(isStreaming)}</span>
			<span data-testid="is-copied">{String(isCopied)}</span>
			<span data-testid="has-images">
				{images ? String(images.length) : "0"}
			</span>
			{onCopy && (
				<button data-testid="copy-btn" onClick={onCopy}>
					Copy
				</button>
			)}
			{onRegenerate && (
				<button data-testid="regenerate-btn" onClick={onRegenerate}>
					Regenerate
				</button>
			)}
		</div>
	),
}));

import { removeMessagesFromTransaction } from "@/lib/stores/chat";
import { getImages } from "@/lib/stores/imageStorage";
import { useStore } from "@nanostores/react";
import type { ReadableAtom } from "nanostores";
import { MessageItem } from "./MessageItem";

let mockMessages: Array<{
	id: string;
	role: string;
	content: string;
	transactionId: string;
}> = [];
let mockLastUserMessage: { content: string; transactionId: string } | null =
	null;

// Store clipboard mock
const mockWriteText = vi.fn().mockResolvedValue(undefined);

describe("MessageItem", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockMessages = [];
		mockLastUserMessage = null;

		// Reset clipboard mock
		mockWriteText.mockClear();
		Object.defineProperty(navigator, "clipboard", {
			value: {
				writeText: mockWriteText,
			},
			writable: true,
			configurable: true,
		});
	});

	describe("rendering", () => {
		it("should render message content", () => {
			const message = {
				id: "msg-1",
				transactionId: "tx-1",
				role: "user" as const,
				content: "Hello world",
				timestamp: Date.now(),
			};

			render(<MessageItem message={message} />);
			expect(screen.getByTestId("content")).toHaveTextContent("Hello world");
		});

		it("should render message role", () => {
			const message = {
				id: "msg-1",
				transactionId: "tx-1",
				role: "assistant" as const,
				content: "Hi there",
				timestamp: Date.now(),
			};

			render(<MessageItem message={message} />);
			expect(screen.getByTestId("role")).toHaveTextContent("assistant");
		});

		it("should indicate streaming state", () => {
			const message = {
				id: "msg-1",
				transactionId: "tx-1",
				role: "assistant" as const,
				content: "Streaming...",
				timestamp: Date.now(),
			};

			render(<MessageItem message={message} isStreaming={true} />);
			expect(screen.getByTestId("is-streaming")).toHaveTextContent("true");
		});
	});

	describe("copy functionality", () => {
		it("should provide copy handler to UI", () => {
			const message = {
				id: "msg-1",
				transactionId: "tx-1",
				role: "assistant" as const,
				content: "Copy this text",
				timestamp: Date.now(),
			};

			render(<MessageItem message={message} />);

			// Verify the copy button is rendered (handler was passed)
			expect(screen.getByTestId("copy-btn")).toBeInTheDocument();
		});

		it("should initialize with copied state as false", () => {
			const message = {
				id: "msg-1",
				transactionId: "tx-1",
				role: "assistant" as const,
				content: "Copy me",
				timestamp: Date.now(),
			};

			render(<MessageItem message={message} />);
			expect(screen.getByTestId("is-copied")).toHaveTextContent("false");
		});
	});

	describe("regenerate functionality", () => {
		it("should show regenerate button for last assistant message", () => {
			mockMessages = [
				{
					id: "msg-1",
					role: "user",
					content: "Question",
					transactionId: "tx-1",
				},
				{
					id: "msg-2",
					role: "assistant",
					content: "Answer",
					transactionId: "tx-1",
				},
			];
			mockLastUserMessage = { content: "Question", transactionId: "tx-1" };

			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { name?: string };
				if (a.name === "messagesAtom") return mockMessages;
				if (a.name === "lastUserMessageAtom") return mockLastUserMessage;
				return null;
			});

			const onRegenerate = vi.fn();
			const message = {
				id: "msg-2",
				transactionId: "tx-1",
				role: "assistant" as const,
				content: "Answer",
				timestamp: Date.now(),
			};

			render(<MessageItem message={message} onRegenerate={onRegenerate} />);
			expect(screen.getByTestId("regenerate-btn")).toBeInTheDocument();
		});

		it("should call onRegenerate with correct args when clicked", async () => {
			mockMessages = [
				{
					id: "msg-1",
					role: "user",
					content: "Question",
					transactionId: "tx-1",
				},
				{
					id: "msg-2",
					role: "assistant",
					content: "Answer",
					transactionId: "tx-1",
				},
			];
			mockLastUserMessage = { content: "Question", transactionId: "tx-1" };

			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { name?: string };
				if (a.name === "messagesAtom") return mockMessages;
				if (a.name === "lastUserMessageAtom") return mockLastUserMessage;
				return null;
			});

			const onRegenerate = vi.fn();
			const message = {
				id: "msg-2",
				transactionId: "tx-1",
				role: "assistant" as const,
				content: "Answer",
				timestamp: Date.now(),
			};

			render(<MessageItem message={message} onRegenerate={onRegenerate} />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("regenerate-btn"));

			expect(removeMessagesFromTransaction).toHaveBeenCalledWith("tx-1");
			expect(onRegenerate).toHaveBeenCalledWith("Question", "tx-1");
		});
	});

	describe("image loading", () => {
		it("should load images from IndexedDB when storedInDb is true", async () => {
			const mockImageData = new Map([
				[
					"img-1",
					{
						id: "img-1",
						data: "data:image/png;base64,loaded",
						mimeType: "image/png",
						conversationId: "conv-1",
						createdAt: Date.now(),
					},
				],
			]);
			vi.mocked(getImages).mockResolvedValueOnce(mockImageData);

			const message = {
				id: "msg-1",
				transactionId: "tx-1",
				role: "user" as const,
				content: "Check this image",
				images: [
					{ id: "img-1", data: "", mimeType: "image/png", storedInDb: true },
				],
				timestamp: Date.now(),
			};

			render(<MessageItem message={message} />);

			await waitFor(() => {
				expect(getImages).toHaveBeenCalledWith(["img-1"]);
			});
		});

		it("should use inline images when already have data", async () => {
			const message = {
				id: "msg-1",
				transactionId: "tx-1",
				role: "user" as const,
				content: "Check this image",
				images: [
					{
						id: "img-1",
						data: "data:image/png;base64,inline",
						mimeType: "image/png",
					},
				],
				timestamp: Date.now(),
			};

			render(<MessageItem message={message} />);

			// Should not try to load from IndexedDB
			expect(getImages).not.toHaveBeenCalled();
		});
	});
});
