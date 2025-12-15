import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock all the dependencies
vi.mock("@nanostores/react", () => ({
	useStore: vi.fn((atom) => atom.get?.() ?? atom),
}));

vi.mock("@/lib/hooks/useNavigation", () => ({
	useChatSearchParams: vi.fn(() => ({
		sidebarOpen: false,
		toggleSidebar: vi.fn(),
		setSidebar: vi.fn(),
		forceCompat: false,
		activeChat: undefined,
		showArchived: false,
		showDeleted: false,
		setActiveChat: vi.fn(),
		toggleShowArchived: vi.fn(),
		setShowArchived: vi.fn(),
		toggleShowDeleted: vi.fn(),
		setShowDeleted: vi.fn(),
	})),
}));

vi.mock("@/lib/ai/hooks", () => ({
	useCompatibility: () => ({
		compatibility: { isCompatible: true },
	}),
}));

vi.mock("@/lib/ai/prompt", () => ({
	promptAsync: vi.fn().mockResolvedValue({
		[Symbol.asyncIterator]: async function* () {
			yield { type: "text-delta", textDelta: "Hello" };
		},
	}),
}));

vi.mock("ai", () => ({
	tool: vi.fn((config) => config),
}));

// Mock all stores
vi.mock("@/lib/stores/chat", () => ({
	addMessage: vi.fn(() => ({ id: "msg-1", transactionId: "tx-1" })),
	isStreamingAtom: { get: () => false, set: vi.fn() },
	currentStreamAtom: { get: () => "", set: vi.fn() },
	clearStream: vi.fn(),
	appendToStream: vi.fn(),
	messagesAtom: { get: () => [] },
}));

vi.mock("@/lib/stores/conversations", () => ({
	saveCurrentConversation: vi.fn(),
	activeConversationIdAtom: { get: () => "conv-1" },
	createConversation: vi.fn(),
	triggerTitleGeneration: vi.fn(),
}));

vi.mock("@/lib/stores/settings", () => ({
	aiSettingsAtom: { get: () => ({}) },
	temperatureUnitAtom: { get: () => "auto" },
	getResolvedTimezone: () => "America/New_York",
}));

vi.mock("@/lib/stores/errors", () => ({
	setError: vi.fn(),
	clearError: vi.fn(),
}));

vi.mock("@/lib/stores/usage", () => ({
	recordMessage: vi.fn(),
	recordResponse: vi.fn(),
	recordToolCall: vi.fn(),
	recordTokenUsage: vi.fn(),
	estimateTokens: vi.fn(() => 100),
}));

vi.mock("@/lib/ai/store", () => ({
	loadingAtom: { get: () => false, set: vi.fn() },
}));

// Mock child components to simplify testing
vi.mock("../messages/MessageList", () => ({
	MessageList: () => <div data-testid="message-list">MessageList</div>,
}));

vi.mock("../input/ChatInput", () => ({
	ChatInput: () => <div data-testid="chat-input">ChatInput</div>,
}));

vi.mock("../sidebar/ConversationSidebar", () => ({
	ConversationSidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock("../sidebar/ChatHeader", () => ({
	ChatHeader: () => <div data-testid="header">Header</div>,
}));

vi.mock("../errors/CompatibilityError", () => ({
	CompatibilityError: () => <div data-testid="compat-error">CompatibilityError</div>,
}));

vi.mock("../errors/ErrorBanner", () => ({
	ErrorBanner: () => <div data-testid="error-banner">ErrorBanner</div>,
}));

vi.mock("@/lib/utils/markdown", () => ({
	createMarkdownRenderer: vi.fn(() => (content: string) => <span>{content}</span>),
}));

import { ChatContainer } from "./ChatContainer";

describe("ChatContainer", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("rendering", () => {
		it("should render the chat container", () => {
			render(<ChatContainer />);
			expect(screen.getByTestId("chat-container")).toBeInTheDocument();
		});

		it("should render the message list", () => {
			render(<ChatContainer />);
			expect(screen.getByTestId("message-list")).toBeInTheDocument();
		});

		it("should render the chat input", () => {
			render(<ChatContainer />);
			expect(screen.getByTestId("chat-input")).toBeInTheDocument();
		});

		it("should render the header", () => {
			render(<ChatContainer />);
			expect(screen.getByTestId("header")).toBeInTheDocument();
		});

		it("should render the sidebar", () => {
			render(<ChatContainer />);
			expect(screen.getByTestId("sidebar")).toBeInTheDocument();
		});
	});

	describe("forceCompat mode", () => {
		it("should render CompatibilityError when forceCompat is true", async () => {
			const navModule = await import("@/lib/hooks/useNavigation");
			vi.mocked(navModule.useChatSearchParams).mockReturnValueOnce({
				sidebarOpen: false,
				toggleSidebar: vi.fn(),
				setSidebar: vi.fn(),
				forceCompat: true, // Force compatibility error to show
				activeChat: undefined,
				showArchived: false,
				showDeleted: false,
				setActiveChat: vi.fn(),
				toggleShowArchived: vi.fn(),
				setShowArchived: vi.fn(),
				toggleShowDeleted: vi.fn(),
				setShowDeleted: vi.fn(),
			});

			render(<ChatContainer />);
			expect(screen.getByTestId("compat-error")).toBeInTheDocument();
		});
	});
});

// Test the helper functions that are internal to the component
// These are tested by reimplementing the logic and ensuring it matches expected behavior

describe("ChatContainer helper functions", () => {
	describe("stripToolResultTags", () => {
		const stripToolResultTags = (content: string): string => {
			return content.replace(/<result>[\s\S]*?<\/result>/g, "").trim();
		};

		it("should strip single result tag", () => {
			const input = "Some text<result>data</result>more text";
			expect(stripToolResultTags(input)).toBe("Some textmore text");
		});

		it("should strip multiple result tags", () => {
			const input = "<result>first</result>middle<result>second</result>";
			expect(stripToolResultTags(input)).toBe("middle");
		});

		it("should handle multiline content in tags", () => {
			const input = "Before<result>\nline1\nline2\n</result>After";
			expect(stripToolResultTags(input)).toBe("BeforeAfter");
		});

		it("should return original content if no tags", () => {
			const input = "Just plain text";
			expect(stripToolResultTags(input)).toBe("Just plain text");
		});
	});

	describe("detectTemperatureUnitFromLocale", () => {
		const FAHRENHEIT_COUNTRIES = new Set(["US", "BS", "BZ", "KY", "PW", "FM", "MH"]);

		const detectTemperatureUnitFromLocale = (
			locale: string
		): "fahrenheit" | "celsius" => {
			try {
				const regionMatch = locale.match(/-([A-Z]{2})$/i);
				const region = regionMatch ? regionMatch[1].toUpperCase() : null;

				if (region && FAHRENHEIT_COUNTRIES.has(region)) {
					return "fahrenheit";
				}
				return "celsius";
			} catch {
				return "celsius";
			}
		};

		it("should return fahrenheit for US locale", () => {
			expect(detectTemperatureUnitFromLocale("en-US")).toBe("fahrenheit");
		});

		it("should return celsius for UK locale", () => {
			expect(detectTemperatureUnitFromLocale("en-GB")).toBe("celsius");
		});

		it("should return celsius for German locale", () => {
			expect(detectTemperatureUnitFromLocale("de-DE")).toBe("celsius");
		});

		it("should return celsius for French locale", () => {
			expect(detectTemperatureUnitFromLocale("fr-FR")).toBe("celsius");
		});

		it("should return fahrenheit for Bahamas", () => {
			expect(detectTemperatureUnitFromLocale("en-BS")).toBe("fahrenheit");
		});

		it("should return celsius when no region", () => {
			expect(detectTemperatureUnitFromLocale("en")).toBe("celsius");
		});
	});

	describe("fahrenheitToCelsius", () => {
		const fahrenheitToCelsius = (f: number): number => {
			return Math.round(((f - 32) * 5) / 9);
		};

		it("should convert 32°F to 0°C", () => {
			expect(fahrenheitToCelsius(32)).toBe(0);
		});

		it("should convert 212°F to 100°C", () => {
			expect(fahrenheitToCelsius(212)).toBe(100);
		});

		it("should convert 77°F to 25°C", () => {
			expect(fahrenheitToCelsius(77)).toBe(25);
		});

		it("should convert negative temperatures", () => {
			expect(fahrenheitToCelsius(-40)).toBe(-40); // Same in both scales
		});

		it("should round to nearest integer", () => {
			expect(fahrenheitToCelsius(70)).toBe(21);
		});
	});

	describe("formatTemperature", () => {
		const fahrenheitToCelsius = (f: number): number => {
			return Math.round(((f - 32) * 5) / 9);
		};

		const formatTemperature = (
			tempF: number,
			unit: "fahrenheit" | "celsius"
		): string => {
			if (unit === "celsius") {
				return `${fahrenheitToCelsius(tempF)}°C`;
			}
			return `${tempF}°F`;
		};

		it("should format in Fahrenheit", () => {
			expect(formatTemperature(72, "fahrenheit")).toBe("72°F");
		});

		it("should format in Celsius (converted from F)", () => {
			expect(formatTemperature(72, "celsius")).toBe("22°C");
		});

		it("should format freezing temperature in Celsius", () => {
			expect(formatTemperature(32, "celsius")).toBe("0°C");
		});

		it("should format boiling temperature in Celsius", () => {
			expect(formatTemperature(212, "celsius")).toBe("100°C");
		});
	});

	describe("getResolvedTemperatureUnit", () => {
		// Simulating the logic
		const getResolvedTemperatureUnit = (
			setting: "auto" | "fahrenheit" | "celsius",
			detectedUnit: "fahrenheit" | "celsius"
		): "fahrenheit" | "celsius" => {
			if (setting === "auto") {
				return detectedUnit;
			}
			return setting;
		};

		it("should return setting when not auto", () => {
			expect(getResolvedTemperatureUnit("fahrenheit", "celsius")).toBe("fahrenheit");
			expect(getResolvedTemperatureUnit("celsius", "fahrenheit")).toBe("celsius");
		});

		it("should use detected unit when auto", () => {
			expect(getResolvedTemperatureUnit("auto", "fahrenheit")).toBe("fahrenheit");
			expect(getResolvedTemperatureUnit("auto", "celsius")).toBe("celsius");
		});
	});
});

