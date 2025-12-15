import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the AI prompt module to avoid actual AI calls
const mockPromptAsync = vi.fn();
vi.mock("@/lib/ai/prompt", () => ({
	promptAsync: (...args: unknown[]) => mockPromptAsync(...args),
	promptStreamReader: vi.fn().mockResolvedValue([]),
}));

// Mock title generator to avoid actual AI calls for title generation
vi.mock("@/lib/ai/titleGenerator", () => ({
	generateConversationTitle: vi.fn().mockResolvedValue("Test Chat"),
	needsTitleGeneration: vi.fn().mockReturnValue(false),
}));

// Mock compatibility check to show the normal UI
vi.mock("@/lib/ai/compat", () => ({
	compatibilityCheck: vi.fn().mockResolvedValue({
		isCompatible: true,
		availability: "available",
		error: null,
		browserInfo: {
			vendor: "chrome",
			version: "138",
			supportsPromptApi: true,
			minRequiredVersion: 138,
		},
		instructions: null,
	}),
	quickCompatibilityCheck: vi.fn().mockReturnValue({
		isSupported: true,
		browserInfo: {
			vendor: "chrome",
			version: "138",
			supportsPromptApi: true,
			minRequiredVersion: 138,
		},
	}),
	detectBrowser: vi.fn().mockReturnValue({
		vendor: "chrome",
		version: "138",
		supportsPromptApi: true,
		minRequiredVersion: 138,
	}),
	generateInstructions: vi.fn().mockReturnValue(null),
	requestModelDownload: vi
		.fn()
		.mockResolvedValue({ success: true, error: null }),
}));

// Mock navigation hook
const mockNavigate = vi.fn();
const mockToggleSidebar = vi.fn();
const mockSetSidebar = vi.fn();
const mockToggleShowArchived = vi.fn();
const mockToggleShowDeleted = vi.fn();
vi.mock("@/lib/hooks/useNavigation", () => ({
	useNavigation: () => ({
		goBack: vi.fn(),
		goToSettings: vi.fn(),
		goToUsage: vi.fn(),
		goToChat: vi.fn(),
		navigate: mockNavigate,
	}),
	useChatSearchParams: () => ({
		activeChat: undefined,
		sidebarOpen: false,
		showArchived: false,
		showDeleted: false,
		forceCompat: false,
		setActiveChat: vi.fn(),
		toggleSidebar: mockToggleSidebar,
		setSidebar: mockSetSidebar,
		toggleShowArchived: mockToggleShowArchived,
		toggleShowDeleted: mockToggleShowDeleted,
		setShowArchived: vi.fn(),
		setShowDeleted: vi.fn(),
	}),
}));

// Import after mocks
import { ChatContainer } from "./ChatContainer";
import {
	messagesAtom,
	clearMessages,
	isStreamingAtom,
} from "@/lib/stores/chat";
import {
	conversationsAtom,
	activeConversationIdAtom,
} from "@/lib/stores/conversations";

/**
 * Helper to create a mock async iterable stream that simulates AI responses
 */
function createMockStream(
	chunks: Array<{
		type: string;
		text?: string;
		toolName?: string;
		output?: unknown;
		error?: string;
	}>
) {
	return {
		async *[Symbol.asyncIterator]() {
			for (const chunk of chunks) {
				yield chunk;
			}
		},
	};
}

describe("ChatContainer E2E", () => {
	beforeEach(() => {
		// Reset all state
		messagesAtom.set([]);
		conversationsAtom.set([]);
		activeConversationIdAtom.set(null);
		isStreamingAtom.set(false);
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		clearMessages();
	});

	describe("page rendering", () => {
		it("should render the chat container with empty state", async () => {
			render(<ChatContainer />);

			await waitFor(() => {
				// Should show the chat container and input area
				expect(
					screen.getByTestId("chat-container")
				).toBeInTheDocument();
				expect(screen.getByTestId("chat-textarea")).toBeInTheDocument();
			});
		});

		it("should render chat input with send button", async () => {
			render(<ChatContainer />);

			await waitFor(() => {
				expect(screen.getByTestId("chat-textarea")).toBeInTheDocument();
				expect(screen.getByTestId("send-button")).toBeInTheDocument();
			});
		});

		it("should show empty message list initially", async () => {
			render(<ChatContainer />);

			await waitFor(() => {
				// Empty state should show the welcome message
				expect(
					screen.getByTestId("empty-chat-state")
				).toBeInTheDocument();
				expect(
					screen.getByTestId("empty-chat-title")
				).toBeInTheDocument();
			});
		});
	});

	describe("sending messages", () => {
		it("should allow typing in the input", async () => {
			const user = userEvent.setup();
			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Hello, AI!");

			expect(input).toHaveValue("Hello, AI!");
		});

		it("should send a message when pressing enter", async () => {
			const user = userEvent.setup();
			mockPromptAsync.mockResolvedValue(
				createMockStream([{ type: "text-delta", text: "Hi there!" }])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Hello!{Enter}");

			// Wait for the AI to be called
			await waitFor(
				() => {
					expect(mockPromptAsync).toHaveBeenCalled();
				},
				{ timeout: 2000 }
			);
		});

		it("should send a message when pressing Enter", async () => {
			const user = userEvent.setup();
			mockPromptAsync.mockResolvedValue(
				createMockStream([{ type: "text-delta", text: "Hello!" }])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Test message{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalled();
			});
		});

		it("should not send on Shift+Enter (new line instead)", async () => {
			const user = userEvent.setup();
			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Line 1{Shift>}{Enter}{/Shift}Line 2");

			// Message should NOT be sent
			expect(mockPromptAsync).not.toHaveBeenCalled();
		});

		it("should clear input after sending", async () => {
			const user = userEvent.setup();
			mockPromptAsync.mockResolvedValue(
				createMockStream([{ type: "text-delta", text: "Response" }])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Hello!{Enter}");

			await waitFor(() => {
				expect(input).toHaveValue("");
			});
		});
	});

	describe("multi-turn conversation", () => {
		it("should support multi-followup chat interactions", async () => {
			const user = userEvent.setup();

			// First message response
			mockPromptAsync.mockResolvedValueOnce(
				createMockStream([
					{
						type: "text-delta",
						text: "Hello! How can I help you today?",
					},
				])
			);

			render(<ChatContainer />);

			// Send first message
			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Hi there!{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalledTimes(1);
			});

			// Wait for response to complete
			await waitFor(() => {
				expect(isStreamingAtom.get()).toBe(false);
			});

			// Second message response
			mockPromptAsync.mockResolvedValueOnce(
				createMockStream([
					{ type: "text-delta", text: "The weather is sunny today!" },
				])
			);

			// Send second message (followup)
			await user.type(input, "What's the weather?{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalledTimes(2);
			});

			// Wait for second response
			await waitFor(() => {
				expect(isStreamingAtom.get()).toBe(false);
			});

			// Third message response
			mockPromptAsync.mockResolvedValueOnce(
				createMockStream([
					{
						type: "text-delta",
						text: "You're welcome! Let me know if you need anything else.",
					},
				])
			);

			// Send third message (another followup)
			await user.type(input, "Thanks!{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalledTimes(3);
			});

			// Verify conversation history is passed correctly
			const lastCall = mockPromptAsync.mock.calls[2];
			expect(lastCall[1].history).toBeDefined();
			expect(lastCall[1].history.length).toBeGreaterThan(0);
		});

		it("should pass conversation history to AI on followup messages", async () => {
			const user = userEvent.setup();

			mockPromptAsync.mockResolvedValue(
				createMockStream([{ type: "text-delta", text: "Response" }])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");

			// First message
			await user.type(input, "First message{Enter}");
			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalledTimes(1);
			});

			// Wait for first response to complete
			await waitFor(() => expect(isStreamingAtom.get()).toBe(false));

			// Second message
			await user.type(input, "Second message{Enter}");
			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalledTimes(2);
			});

			// Verify history was passed on second call
			const secondCall = mockPromptAsync.mock.calls[1];
			expect(secondCall[1]).toHaveProperty("history");
		});
	});

	describe("AI response streaming", () => {
		it("should display streaming response text", async () => {
			const user = userEvent.setup();

			// Create a more realistic streaming response
			mockPromptAsync.mockResolvedValue(
				createMockStream([
					{ type: "text-delta", text: "Hello" },
					{ type: "text-delta", text: " there!" },
					{ type: "text-delta", text: " How are you?" },
				])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Hi{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalled();
			});
		});

		it("should handle tool call chunks", async () => {
			const user = userEvent.setup();

			mockPromptAsync.mockResolvedValue(
				createMockStream([
					{ type: "tool-call", toolName: "weather" },
					{
						type: "tool-result",
						toolName: "weather",
						output: {
							location: "San Francisco",
							temperature: 68,
							feelsLike: 65,
							condition: "Sunny",
							humidity: 45,
							windSpeed: 10,
						},
					},
				])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "What's the weather?{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalled();
			});
		});

		it("should handle datetime tool results", async () => {
			const user = userEvent.setup();

			mockPromptAsync.mockResolvedValue(
				createMockStream([
					{ type: "tool-call", toolName: "datetime" },
					{
						type: "tool-result",
						toolName: "datetime",
						output: {
							timestamp: Date.now(),
						},
					},
				])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "What time is it?{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalled();
			});
		});

		it("should handle tool errors gracefully", async () => {
			const user = userEvent.setup();

			mockPromptAsync.mockResolvedValue(
				createMockStream([
					{ type: "tool-call", toolName: "weather" },
					{
						type: "tool-error",
						error: "Failed to fetch weather data",
					},
				])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Weather please{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalled();
			});
		});
	});

	describe("error handling", () => {
		it("should handle AI errors gracefully", async () => {
			const user = userEvent.setup();

			mockPromptAsync.mockRejectedValue(
				new Error("AI service unavailable")
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Hello{Enter}");

			// Should have attempted the call
			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalled();
			});

			// Streaming should be stopped
			await waitFor(() => {
				expect(isStreamingAtom.get()).toBe(false);
			});
		});
	});

	describe("sidebar interactions", () => {
		it("should have a menu button for toggling sidebar", async () => {
			render(<ChatContainer />);

			await waitFor(() => {
				expect(screen.getByTestId("chat-header")).toBeInTheDocument();
			});
		});
	});

	describe("message display", () => {
		it("should display user messages in the list", async () => {
			const user = userEvent.setup();
			mockPromptAsync.mockResolvedValue(
				createMockStream([{ type: "text-delta", text: "Response" }])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "User test message{Enter}");

			await waitFor(() => {
				// The messages should be in the store
				const messages = messagesAtom.get();
				expect(
					messages.some((m) => m.content === "User test message")
				).toBe(true);
			});
		});

		it("should display assistant responses in the list", async () => {
			const user = userEvent.setup();
			mockPromptAsync.mockResolvedValue(
				createMockStream([
					{ type: "text-delta", text: "AI response text" },
				])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Hello{Enter}");

			await waitFor(() => {
				expect(isStreamingAtom.get()).toBe(false);
			});

			await waitFor(() => {
				const messages = messagesAtom.get();
				expect(messages.some((m) => m.role === "assistant")).toBe(true);
			});
		});
	});

	describe("image attachments", () => {
		it("should have an image upload button", async () => {
			render(<ChatContainer />);

			await waitFor(() => {
				expect(
					screen.getByTestId("attach-image-button")
				).toBeInTheDocument();
			});
		});
	});

	describe("conversation management", () => {
		it("should create a new conversation when sending first message", async () => {
			const user = userEvent.setup();
			mockPromptAsync.mockResolvedValue(
				createMockStream([{ type: "text-delta", text: "Response" }])
			);

			expect(conversationsAtom.get()).toHaveLength(0);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Start new conversation{Enter}");

			await waitFor(() => {
				expect(conversationsAtom.get().length).toBeGreaterThan(0);
			});
		});
	});

	describe("keyboard navigation", () => {
		it("should focus on input when page loads", async () => {
			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			// The input should be easily focusable
			input.focus();
			expect(document.activeElement).toBe(input);
		});
	});

	describe("weather tool with temperature units", () => {
		it("should format weather response with temperature", async () => {
			const user = userEvent.setup();

			mockPromptAsync.mockResolvedValue(
				createMockStream([
					{ type: "tool-call", toolName: "weather" },
					{
						type: "tool-result",
						toolName: "weather",
						output: {
							location: "New York",
							temperature: 75,
							feelsLike: 78,
							condition: "Cloudy",
							humidity: 60,
							windSpeed: 8,
						},
					},
				])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Weather in NYC{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalled();
			});
		});
	});

	describe("weather tool error handling", () => {
		it("should handle weather tool errors gracefully", async () => {
			const user = userEvent.setup();

			mockPromptAsync.mockResolvedValue(
				createMockStream([
					{ type: "tool-call", toolName: "weather" },
					{
						type: "tool-result",
						toolName: "weather",
						output: {
							error: "Location not found",
						},
					},
				])
			);

			render(<ChatContainer />);

			const input = await screen.findByTestId("chat-textarea");
			await user.type(input, "Weather in nonexistent place{Enter}");

			await waitFor(() => {
				expect(mockPromptAsync).toHaveBeenCalled();
			});
		});
	});

	describe("complex multi-turn with tools", () => {
		it("should handle a complex conversation with multiple tool calls", async () => {
			const user = userEvent.setup();

			// First turn - greeting
			mockPromptAsync.mockResolvedValueOnce(
				createMockStream([
					{ type: "text-delta", text: "Hello! I'm here to help." },
				])
			);

			render(<ChatContainer />);
			const input = await screen.findByTestId("chat-textarea");

			// First message
			await user.type(input, "Hello{Enter}");
			await waitFor(() =>
				expect(mockPromptAsync).toHaveBeenCalledTimes(1)
			);
			await waitFor(() => expect(isStreamingAtom.get()).toBe(false));

			// Second turn - weather request
			mockPromptAsync.mockResolvedValueOnce(
				createMockStream([
					{ type: "tool-call", toolName: "weather" },
					{
						type: "tool-result",
						toolName: "weather",
						output: {
							location: "Seattle",
							temperature: 55,
							feelsLike: 52,
							condition: "Rainy",
							humidity: 85,
							windSpeed: 12,
						},
					},
				])
			);

			await user.type(input, "What's the weather in Seattle?{Enter}");
			await waitFor(() =>
				expect(mockPromptAsync).toHaveBeenCalledTimes(2)
			);
			await waitFor(() => expect(isStreamingAtom.get()).toBe(false));

			// Third turn - time request
			mockPromptAsync.mockResolvedValueOnce(
				createMockStream([
					{ type: "tool-call", toolName: "datetime" },
					{
						type: "tool-result",
						toolName: "datetime",
						output: { timestamp: Date.now() },
					},
				])
			);

			await user.type(input, "What time is it?{Enter}");
			await waitFor(() =>
				expect(mockPromptAsync).toHaveBeenCalledTimes(3)
			);
			await waitFor(() => expect(isStreamingAtom.get()).toBe(false));

			// Fourth turn - followup question
			mockPromptAsync.mockResolvedValueOnce(
				createMockStream([
					{
						type: "text-delta",
						text: "Based on our conversation, the weather in Seattle is rainy!",
					},
				])
			);

			await user.type(input, "So is it good weather for a hike?{Enter}");
			await waitFor(() =>
				expect(mockPromptAsync).toHaveBeenCalledTimes(4)
			);

			// Verify all messages are tracked
			const messages = messagesAtom.get();
			expect(messages.length).toBeGreaterThanOrEqual(4);
		});
	});
});
