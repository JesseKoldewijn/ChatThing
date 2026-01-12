import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PROVIDER_OLLAMA } from "@/lib/ai/constants";
import userEvent from "@testing-library/user-event";

// Create mock functions at module level
const mockPromptAsync = vi.fn();
const mockAddMessage = vi.fn(
	(_role: string, _content: string, _options?: Record<string, unknown>) => ({
		id: "msg-1",
		transactionId: "tx-1",
	})
);
const mockAppendToStream = vi.fn();
const mockClearStream = vi.fn();
const mockSaveCurrentConversation = vi.fn();
const mockCreateConversation = vi.fn(() => ({ id: "conv-new" }));
const mockRecordMessage = vi.fn();
const mockRecordResponse = vi.fn();
const mockRecordToolCall = vi.fn();
const mockRecordTokenUsage = vi.fn();
const mockClearError = vi.fn();
const mockSetError = vi.fn();
const mockTriggerTitleGeneration = vi.fn();

// Mock dependencies
vi.mock("@nanostores/react", () => ({
	useStore: vi.fn((atom) => {
		if (atom === isStreamingAtom) return mockIsStreaming;
		if (atom === activeConversationIdAtom) return mockActiveConversationId;
		if (atom === aiSettingsAtom) return {};
		if (atom === temperatureUnitAtom) return "auto";
		if (atom === providerTypeAtom) return mockProviderType;
		return atom._mockValue ?? null;
	}),
}));

vi.mock("@/lib/hooks/useNavigation", () => ({
	useChatSearchParams: vi.fn(() => ({
		sidebarOpen: false,
		toggleSidebar: vi.fn(),
		setSidebar: vi.fn(),
		forceCompat: false,
	})),
}));

vi.mock("@/lib/ai/hooks", () => ({
	useCompatibility: vi.fn(() => ({
		compatibility: { isCompatible: true },
	})),
}));

vi.mock("@/lib/ai", () => ({
	getAIManager: vi.fn(() => ({
		prompt: (...args: unknown[]) => mockPromptAsync(...args),
	})),
}));

vi.mock("ai", () => ({
	tool: vi.fn((config) => config),
}));

// Mock chat store
vi.mock("@/lib/stores/chat", () => ({
	addMessage: (
		role: string,
		content: string,
		options?: Record<string, unknown>
	) => mockAddMessage(role, content, options),
	isStreamingAtom: { get: () => mockIsStreaming, set: vi.fn() },
	currentStreamAtom: { get: () => mockCurrentStream, set: vi.fn() },
	clearStream: () => mockClearStream(),
	appendToStream: (text: string) => mockAppendToStream(text),
	messagesAtom: { get: () => mockMessages },
	pendingImagesAtom: { get: () => [] },
}));

vi.mock("@/lib/stores/conversations", () => ({
	saveCurrentConversation: () => mockSaveCurrentConversation(),
	activeConversationIdAtom: { get: () => mockActiveConversationId, subscribe: vi.fn(() => () => {}) },
	isSyncingFromUrlAtom: { get: () => false },
	isConversationsHydratedAtom: { get: () => true },
	createConversation: () => mockCreateConversation(),
	setActiveChat: vi.fn(),
	switchConversation: vi.fn(),
	triggerTitleGeneration: (conversationId: string, force?: boolean, initialPrompt?: string) =>
		mockTriggerTitleGeneration(conversationId, force, initialPrompt),
}));

vi.mock("@/lib/stores/settings", () => ({
	aiSettingsAtom: { get: () => ({}) },
	temperatureUnitAtom: { get: () => "auto" },
	providerTypeAtom: { get: () => mockProviderType },
	isLockedAtom: { get: () => false },
	openRouterModelAtom: { get: () => "model-or" },
	googleModelAtom: { get: () => "model-g" },
	ollamaModelAtom: { get: () => "model-ol" },
	getResolvedTimezone: () => "America/New_York",
	PROVIDER_OPEN_ROUTER: "open-router",
	PROVIDER_GOOGLE: "google",
	PROVIDER_OLLAMA: "ollama",
}));

vi.mock("@/lib/stores/errors", () => ({
	setError: (error: Error, retryFn?: () => void) =>
		mockSetError(error, retryFn),
	clearError: () => mockClearError(),
}));

vi.mock("@/lib/stores/usage", () => ({
	recordMessage: (conversationId: string, length: number, provider: string, model: string) =>
		mockRecordMessage(conversationId, length, provider, model),
	recordResponse: (conversationId: string, length: number, provider: string, model: string) =>
		mockRecordResponse(conversationId, length, provider, model),
	recordToolCall: (conversationId: string, toolName: string, provider: string, model: string) =>
		mockRecordToolCall(conversationId, toolName, provider, model),
	recordTokenUsage: (input: number, output: number) =>
		mockRecordTokenUsage(input, output),
	estimateTokens: vi.fn(() => 100),
}));

vi.mock("@/lib/ai/store", () => ({
	loadingAtom: { get: () => false, set: vi.fn() },
}));

// Mock child components
vi.mock("../messages/MessageList", () => ({
	MessageList: ({
		onRegenerate,
	}: {
		onRegenerate?: (p: string, t: string) => void;
	}) => (
		<div data-testid="message-list">
			<button
				data-testid="regenerate-btn"
				onClick={() => onRegenerate?.("test", "tx-1")}
			>
				Regenerate
			</button>
		</div>
	),
}));

vi.mock("../input/ChatInput", () => ({
	ChatInput: ({
		onSend,
		onStop,
	}: {
		onSend: (msg: string) => void;
		onStop?: () => void;
	}) => (
		<div data-testid="chat-input">
			<button data-testid="send-btn" onClick={() => onSend("Hello AI!")}>
				Send
			</button>
			<button data-testid="stop-btn" onClick={() => onStop?.()}>
				Stop
			</button>
		</div>
	),
}));

vi.mock("../sidebar/ConversationSidebar", () => ({
	ConversationSidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock("../sidebar/ChatHeader", () => ({
	ChatHeader: () => <div data-testid="header">Header</div>,
}));

vi.mock("../errors/CompatibilityError", () => ({
	CompatibilityError: () => (
		<div data-testid="compat-error">CompatibilityError</div>
	),
}));

vi.mock("../errors/ErrorBanner", () => ({
	ErrorBanner: () => <div data-testid="error-banner">ErrorBanner</div>,
}));

vi.mock("@/lib/utils/markdown", () => ({
	createMarkdownRenderer: vi.fn(() => (content: string) => (
		<span>{content}</span>
	)),
}));

import { ChatContainer } from "./ChatContainer";

// Mock atoms for type reference in useStore mock - these will be compared by reference
const isStreamingAtom = { _mockValue: false };
const activeConversationIdAtom = { _mockValue: null };
const aiSettingsAtom = { _mockValue: {} };
const temperatureUnitAtom = { _mockValue: "auto" };
const providerTypeAtom = { _mockValue: PROVIDER_OLLAMA };

let mockIsStreaming = false;
let mockCurrentStream = "";
let mockActiveConversationId: string | null = "conv-1";
let mockProviderType = PROVIDER_OLLAMA;
let mockMessages: Array<{
	id: string;
	role: string;
	content: string;
	transactionId: string;
}> = [];

describe("ChatContainer Integration - Streaming Logic", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockIsStreaming = false;
		mockCurrentStream = "";
		mockActiveConversationId = "conv-1";
		mockProviderType = PROVIDER_OLLAMA;
		mockMessages = [];

		// Default successful stream with new StreamPart format
		mockPromptAsync.mockResolvedValue({
			[Symbol.asyncIterator]: async function* () {
				yield { type: "text", content: "Hello" };
				yield { type: "text", content: " there!" };
			},
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("sending messages", () => {
		it("should clear error before sending", async () => {
			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockClearError).toHaveBeenCalled();
			});
		});

		it("should add user message when sending", async () => {
			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockAddMessage).toHaveBeenCalledWith(
					"user",
					"Hello AI!",
					expect.objectContaining({
						transactionId: expect.any(String),
					})
				);
			});
		});

		it("should call promptAsync with message", async () => {
			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalledWith(
					"Hello AI!",
					expect.objectContaining({
						history: expect.any(Array),
					})
				);
			});
		});
	});

	describe("streaming responses", () => {
		it("should append text chunks to stream", async () => {
			mockPromptAsync.mockResolvedValue({
				[Symbol.asyncIterator]: async function* () {
					yield { type: "text", content: "Hello" };
					yield { type: "text", content: " World" };
				},
			});

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockAppendToStream).toHaveBeenCalled();
				// The text might be buffered depending on animation frames
				const calls = mockAppendToStream.mock.calls;
				const fullText = calls.map(c => c[0]).join("");
				expect(fullText).toContain("Hello");
				expect(fullText).toContain(" World");
			});
		});

		it("should handle image chunks in stream", async () => {
			mockPromptAsync.mockResolvedValue({
				[Symbol.asyncIterator]: async function* () {
					yield { type: "image", data: "base64data", mimeType: "image/png" };
					yield { type: "text", content: "Check this image" };
				},
			});

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				// Final addMessage should include the collected images
				expect(mockAddMessage).toHaveBeenLastCalledWith(
					"assistant",
					expect.any(String),
					expect.objectContaining({
						images: expect.arrayContaining([
							expect.objectContaining({ data: "base64data" })
						])
					})
				);
			});
		});

		it("should handle error chunks in stream", async () => {
			mockPromptAsync.mockResolvedValue({
				[Symbol.asyncIterator]: async function* () {
					yield { type: "text", content: "Partial result" };
					yield { type: "error", error: new Error("Stream interrupted") };
				},
			});

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockAddMessage).toHaveBeenCalledWith(
					"system",
					expect.stringContaining("Stream interrupted"),
					expect.any(Object)
				);
			});
		});
	});

	describe("tool calls", () => {
		it("should handle tool-call chunks", async () => {
			mockPromptAsync.mockResolvedValue({
				[Symbol.asyncIterator]: async function* () {
					yield {
						type: "tool-call",
						toolName: "weather",
						toolCallId: "call-1",
						args: { location: "London" },
					};
				},
			});

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockAddMessage).toHaveBeenCalledWith(
					"system",
					expect.stringContaining("Using tool: weather"),
					expect.any(Object)
				);
			});
		});
	});
});

