import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock stores
vi.mock("@nanostores/react", () => ({
	useStore: vi.fn((atom) => {
		if (atom.name === "messagesAtom") return mockMessages;
		if (atom.name === "currentStreamAtom") return mockCurrentStream;
		if (atom.name === "isStreamingAtom") return mockIsStreaming;
		if (atom.name === "isConversationsHydratedAtom") return true;
		return null;
	}),
}));

vi.mock("@/lib/stores/chat", () => ({
	messagesAtom: { name: "messagesAtom", get: () => [] },
	currentStreamAtom: { name: "currentStreamAtom", get: () => "" },
	isStreamingAtom: { name: "isStreamingAtom", get: () => false },
}));

vi.mock("@/lib/stores/conversations", () => ({
	isConversationsHydratedAtom: {
		name: "isConversationsHydratedAtom",
		get: () => true,
	},
}));

// Mock MessageItem component
vi.mock("./MessageItem", () => ({
	MessageItem: ({
		message,
		isStreaming,
	}: {
		message: { id: string; content: string };
		isStreaming: boolean;
	}) => (
		<div data-testid={`message-${message.id}`}>
			<span data-testid={`message-content-${message.id}`}>
				{message.content}
			</span>
			{isStreaming && <span data-testid="streaming-indicator">Streaming</span>}
		</div>
	),
}));

// Mock the UI component
vi.mock("./MessageList.ui", () => ({
	MessageListUI: ({
		isEmpty,
		isLoading,
		children,
	}: {
		isEmpty: boolean;
		isLoading: boolean;
		children: React.ReactNode;
		scrollRef: React.RefObject<HTMLDivElement>;
	}) => (
		<div data-testid="message-list-ui">
			<span data-testid="is-empty">{String(isEmpty)}</span>
			<span data-testid="is-loading">{String(isLoading)}</span>
			<div data-testid="messages-container">{children}</div>
		</div>
	),
}));

import { useStore } from "@nanostores/react";
import type { ReadableAtom } from "nanostores";
import { MessageList } from "./MessageList";

let mockMessages: Array<{
	id: string;
	role: string;
	content: string;
	transactionId: string;
	timestamp: number;
}> = [];
let mockCurrentStream = "";
let mockIsStreaming = false;

describe("MessageList", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockMessages = [];
		mockCurrentStream = "";
		mockIsStreaming = false;
	});

	describe("rendering", () => {
		it("should render empty state when no messages", () => {
			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { name?: string };
				if (a.name === "messagesAtom") return [];
				if (a.name === "currentStreamAtom") return "";
				if (a.name === "isStreamingAtom") return false;
				if (a.name === "isConversationsHydratedAtom") return true;
				return null;
			});

			render(<MessageList />);
			expect(screen.getByTestId("is-empty")).toHaveTextContent("true");
		});

		it("should render messages", () => {
			mockMessages = [
				{
					id: "msg-1",
					role: "user",
					content: "Hello",
					transactionId: "tx-1",
					timestamp: 1000,
				},
				{
					id: "msg-2",
					role: "assistant",
					content: "Hi there",
					transactionId: "tx-1",
					timestamp: 1001,
				},
			];

			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { name?: string };
				if (a.name === "messagesAtom") return mockMessages;
				if (a.name === "currentStreamAtom") return "";
				if (a.name === "isStreamingAtom") return false;
				if (a.name === "isConversationsHydratedAtom") return true;
				return null;
			});

			render(<MessageList />);
			expect(screen.getByTestId("message-msg-1")).toBeInTheDocument();
			expect(screen.getByTestId("message-msg-2")).toBeInTheDocument();
		});

		it("should show loading state when streaming without content", () => {
			mockIsStreaming = true;
			mockCurrentStream = "";

			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { name?: string };
				if (a.name === "messagesAtom") return [];
				if (a.name === "currentStreamAtom") return "";
				if (a.name === "isStreamingAtom") return true;
				if (a.name === "isConversationsHydratedAtom") return true;
				return null;
			});

			render(<MessageList />);
			expect(screen.getByTestId("is-loading")).toHaveTextContent("true");
		});

		it("should not be empty when streaming", () => {
			mockIsStreaming = true;

			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { name?: string };
				if (a.name === "messagesAtom") return [];
				if (a.name === "currentStreamAtom") return "";
				if (a.name === "isStreamingAtom") return true;
				if (a.name === "isConversationsHydratedAtom") return true;
				return null;
			});

			render(<MessageList />);
			expect(screen.getByTestId("is-empty")).toHaveTextContent("false");
		});
	});

	describe("streaming messages", () => {
		it("should add streaming message when streaming with content", () => {
			mockCurrentStream = "Streaming response...";
			mockIsStreaming = true;

			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { name?: string };
				if (a.name === "messagesAtom") return [];
				if (a.name === "currentStreamAtom") return "Streaming response...";
				if (a.name === "isStreamingAtom") return true;
				if (a.name === "isConversationsHydratedAtom") return true;
				return null;
			});

			render(<MessageList />);
			expect(screen.getByTestId("message-streaming")).toBeInTheDocument();
			expect(screen.getByTestId("streaming-indicator")).toBeInTheDocument();
		});

		it("should show streaming content", () => {
			mockCurrentStream = "This is being streamed";
			mockIsStreaming = true;

			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { name?: string };
				if (a.name === "messagesAtom") return [];
				if (a.name === "currentStreamAtom") return "This is being streamed";
				if (a.name === "isStreamingAtom") return true;
				if (a.name === "isConversationsHydratedAtom") return true;
				return null;
			});

			render(<MessageList />);
			expect(screen.getByTestId("message-content-streaming")).toHaveTextContent(
				"This is being streamed",
			);
		});
	});

	describe("combined messages", () => {
		it("should combine real messages with streaming message", () => {
			mockMessages = [
				{
					id: "msg-1",
					role: "user",
					content: "Question",
					transactionId: "tx-1",
					timestamp: 1000,
				},
			];
			mockCurrentStream = "Answer in progress";
			mockIsStreaming = true;

			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { name?: string };
				if (a.name === "messagesAtom") return mockMessages;
				if (a.name === "currentStreamAtom") return "Answer in progress";
				if (a.name === "isStreamingAtom") return true;
				if (a.name === "isConversationsHydratedAtom") return true;
				return null;
			});

			render(<MessageList />);
			expect(screen.getByTestId("message-msg-1")).toBeInTheDocument();
			expect(screen.getByTestId("message-streaming")).toBeInTheDocument();
		});
	});
});
