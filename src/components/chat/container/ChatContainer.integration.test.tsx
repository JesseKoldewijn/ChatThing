import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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
	activeConversationIdAtom: { get: () => mockActiveConversationId },
	createConversation: () => mockCreateConversation(),
	triggerTitleGeneration: (conversationId: string, firstMessage: string) =>
		mockTriggerTitleGeneration(conversationId, firstMessage),
}));

vi.mock("@/lib/stores/settings", () => ({
	aiSettingsAtom: { get: () => ({}) },
	temperatureUnitAtom: { get: () => "auto" },
	providerTypeAtom: { get: () => "prompt-api" },
	getResolvedTimezone: () => "America/New_York",
}));

vi.mock("@/lib/stores/errors", () => ({
	setError: (error: Error, retryFn?: () => void) =>
		mockSetError(error, retryFn),
	clearError: () => mockClearError(),
}));

vi.mock("@/lib/stores/usage", () => ({
	recordMessage: (conversationId: string, length: number) =>
		mockRecordMessage(conversationId, length),
	recordResponse: (conversationId: string, length: number) =>
		mockRecordResponse(conversationId, length),
	recordToolCall: (conversationId: string, toolName: string) =>
		mockRecordToolCall(conversationId, toolName),
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

let mockIsStreaming = false;
let mockCurrentStream = "";
let mockActiveConversationId: string | null = "conv-1";
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
		mockMessages = [];

		// Default successful stream
		mockPromptAsync.mockResolvedValue({
			[Symbol.asyncIterator]: async function* () {
				yield { type: "text-delta", text: "Hello" };
				yield { type: "text-delta", text: " there!" };
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
				// Verify the prompt was called with the message
				expect(mockPromptAsync).toHaveBeenCalledWith(
					"Hello AI!",
					expect.objectContaining({
						history: expect.any(Array),
					})
				);
			});
		});

		it("should create conversation if none exists", async () => {
			mockActiveConversationId = null;

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockCreateConversation).toHaveBeenCalled();
			});
		});

		it("should call promptAsync with correct arguments", async () => {
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
		it("should append text deltas to stream", async () => {
			mockPromptAsync.mockResolvedValue({
				[Symbol.asyncIterator]: async function* () {
					yield { type: "text-delta", text: "Hello" };
					yield { type: "text-delta", text: " World" };
				},
			});

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockAppendToStream).toHaveBeenCalledWith("Hello");
				expect(mockAppendToStream).toHaveBeenCalledWith(" World");
			});
		});

		it("should save conversation after streaming completes", async () => {
			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockSaveCurrentConversation).toHaveBeenCalled();
			});
		});

		it("should trigger title generation after first message", async () => {
			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			// Title generation is triggered asynchronously via queueMicrotask
			await waitFor(
				() => {
					expect(mockTriggerTitleGeneration).toHaveBeenCalled();
				},
				{ timeout: 2000 }
			);
		});
	});

	describe("tool calls", () => {
		it("should handle weather tool call", async () => {
			mockPromptAsync.mockResolvedValue({
				[Symbol.asyncIterator]: async function* () {
					yield {
						type: "tool-call",
						toolName: "weather",
						toolCallId: "call-1",
						args: {},
					};
					yield {
						type: "tool-result",
						toolName: "weather",
						toolCallId: "call-1",
						output: {
							temperature: 72,
							feelsLike: 70,
							condition: "Sunny",
							humidity: 45,
							windSpeed: 5,
							location: "New York",
						},
					};
				},
			});

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(
				() => {
					// Should announce tool usage
					expect(mockAddMessage).toHaveBeenCalledWith(
						"assistant",
						"🔧 Using tool: weather",
						expect.any(Object)
					);
				},
				{ timeout: 2000 }
			);
		});

		it("should handle datetime tool call", async () => {
			mockPromptAsync.mockResolvedValue({
				[Symbol.asyncIterator]: async function* () {
					yield {
						type: "tool-call",
						toolName: "datetime",
						toolCallId: "call-1",
						args: {},
					};
					yield {
						type: "tool-result",
						toolName: "datetime",
						toolCallId: "call-1",
						output: {
							timestamp: Date.now(),
						},
					};
				},
			});

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(
				() => {
					expect(mockAddMessage).toHaveBeenCalledWith(
						"assistant",
						"🔧 Using tool: datetime",
						expect.any(Object)
					);
				},
				{ timeout: 2000 }
			);
		});

		it("should handle tool errors", async () => {
			mockPromptAsync.mockResolvedValue({
				[Symbol.asyncIterator]: async function* () {
					yield { type: "tool-error", error: "API unavailable" };
				},
			});

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(
				() => {
					expect(mockAddMessage).toHaveBeenCalledWith(
						"assistant",
						"❌ Error: API unavailable",
						expect.any(Object)
					);
				},
				{ timeout: 2000 }
			);
		});

		it("should handle weather tool error response", async () => {
			mockPromptAsync.mockResolvedValue({
				[Symbol.asyncIterator]: async function* () {
					yield {
						type: "tool-call",
						toolName: "weather",
						toolCallId: "call-1",
						args: {},
					};
					yield {
						type: "tool-result",
						toolName: "weather",
						toolCallId: "call-1",
						output: {
							error: "Location not found",
						},
					};
				},
			});

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(
				() => {
					expect(mockAppendToStream).toHaveBeenCalledWith(
						expect.stringContaining("couldn't get the weather")
					);
				},
				{ timeout: 2000 }
			);
		});
	});

	describe("error handling", () => {
		it("should set error when streaming fails", async () => {
			const error = new Error("Network error");
			mockPromptAsync.mockRejectedValue(error);

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockSetError).toHaveBeenCalledWith(
					error,
					expect.any(Function)
				);
			});
		});

		it("should not set error for abort errors", async () => {
			const error = new Error("Aborted");
			error.name = "AbortError";
			mockPromptAsync.mockRejectedValue(error);

			render(<ChatContainer />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("send-btn"));

			await waitFor(() => {
				expect(mockSetError).not.toHaveBeenCalled();
			});
		});
	});

	describe("regeneration", () => {
		it("should not add user message on regenerate", async () => {
			render(<ChatContainer />);
			const user = userEvent.setup();

			// Simulate regeneration via the MessageList mock
			await user.click(screen.getByTestId("regenerate-btn"));

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalled();
			});

			// Should not add a new user message
			const userMessageCalls = mockAddMessage.mock.calls.filter(
				(call) => call[0] === "user"
			);
			expect(userMessageCalls).toHaveLength(0);
		});
	});
});
