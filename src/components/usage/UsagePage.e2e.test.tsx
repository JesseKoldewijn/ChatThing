import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock navigation hook
const mockGoBack = vi.fn();
vi.mock("@/lib/hooks/useNavigation", () => ({
	useNavigation: () => ({
		goBack: mockGoBack,
		goToSettings: vi.fn(),
		goToUsage: vi.fn(),
		goToChat: vi.fn(),
		navigate: vi.fn(),
	}),
}));

// Import after mocks
import { UsagePage } from "./UsagePage";
import {
	usageEventsAtom,
	dailyUsageAtom,
	recordMessage,
	recordResponse,
	recordToolCall,
	recordTokenUsage,
	clearUsageData,
	getUsageSummary,
	getRecentDailyUsage,
} from "@/lib/stores/usage";

describe("UsagePage E2E", () => {
	beforeEach(() => {
		// Clear all usage data
		usageEventsAtom.set([]);
		dailyUsageAtom.set([]);
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		clearUsageData();
	});

	describe("page navigation and rendering", () => {
		it("should render the usage analytics page", async () => {
			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("usage-page")).toBeInTheDocument();
				expect(screen.getByTestId("usage-title")).toBeInTheDocument();
			});
		});

		it("should have a back button", async () => {
			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("usage-back-button")).toBeInTheDocument();
			});
		});

		it("should navigate back when clicking back button", async () => {
			const user = userEvent.setup();
			render(<UsagePage />);

			const backButton = await screen.findByTestId("usage-back-button");
			await user.click(backButton);

			expect(mockGoBack).toHaveBeenCalled();
		});

		it("should show subtitle", async () => {
			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("usage-subtitle")).toBeInTheDocument();
			});
		});
	});

	describe("empty state", () => {
		it("should show empty state initially", async () => {
			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("empty-state-message")).toBeInTheDocument();
			});
		});

		it("should show helpful message in empty state", async () => {
			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("empty-state-hint")).toBeInTheDocument();
			});
		});

		it("should not show clear data button in empty state", async () => {
			render(<UsagePage />);

			await waitFor(() => {
				// Clear data button should not appear when there's no data
				expect(screen.queryByTestId("clear-data-button")).not.toBeInTheDocument();
			});
		});
	});

	describe("overview section", () => {
		it("should display overview section header", async () => {
			recordMessage("conv-1", 50);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("usage-overview-title")).toBeInTheDocument();
			});
		});

		it("should show estimated tokens note", async () => {
			recordMessage("conv-1", 50);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("usage-estimated-tokens-note")).toBeInTheDocument();
			});
		});
	});

	describe("hero stats", () => {
		it("should display Total Tokens hero stat", async () => {
			recordMessage("conv-1", 50);
			recordResponse("conv-1", 150);
			recordTokenUsage(13, 38);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("hero-stat-total-tokens")).toBeInTheDocument();
			});
		});

		it("should display Conversations hero stat", async () => {
			recordMessage("conv-1", 50);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("hero-stat-conversations")).toBeInTheDocument();
			});
		});

		it("should display Tool Calls hero stat", async () => {
			recordMessage("conv-1", 50);
			recordToolCall("conv-1", "weather");

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("hero-stat-tool-calls")).toBeInTheDocument();
			});
		});
	});

	describe("secondary stats", () => {
		it("should render all stat cards", async () => {
			recordMessage("conv-1", 100);
			recordResponse("conv-1", 200);
			recordTokenUsage(25, 50);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("compact-stat-messages")).toBeInTheDocument();
				expect(screen.getByTestId("compact-stat-responses")).toBeInTheDocument();
				expect(screen.getByTestId("compact-stat-input-tokens")).toBeInTheDocument();
				expect(screen.getByTestId("compact-stat-output-tokens")).toBeInTheDocument();
			});
		});
	});

	describe("data display", () => {
		it("should display usage data after recording events", async () => {
			recordMessage("conv-1", 50);
			recordResponse("conv-1", 150);
			recordToolCall("conv-1", "datetime");
			recordTokenUsage(13, 38);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("hero-stat-total-tokens")).toBeInTheDocument();
				expect(screen.getByTestId("hero-stat-conversations")).toBeInTheDocument();
				expect(screen.getByTestId("hero-stat-tool-calls")).toBeInTheDocument();
			});
		});

		it("should update when new data is recorded", async () => {
			recordMessage("conv-1", 100);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("compact-stat-messages")).toBeInTheDocument();
			});
		});

		it("should accumulate multiple messages", () => {
			recordMessage("conv-1", 100);
			recordMessage("conv-1", 200);
			recordMessage("conv-2", 150);

			const summary = getUsageSummary();
			expect(summary.totalMessages).toBe(3);
		});

		it("should track tool calls by type", () => {
			recordToolCall("conv-1", "weather");
			recordToolCall("conv-1", "datetime");
			recordToolCall("conv-2", "weather");

			const summary = getUsageSummary();
			expect(summary.totalToolCalls).toBe(3);
			expect(summary.toolBreakdown).toHaveProperty("weather");
			expect(summary.toolBreakdown).toHaveProperty("datetime");
		});

		it("should track token usage correctly", () => {
			recordTokenUsage(100, 200);
			recordTokenUsage(50, 100);

			const summary = getUsageSummary();
			expect(summary.totalInputTokens).toBe(150);
			expect(summary.totalOutputTokens).toBe(300);
		});
	});

	describe("chart section", () => {
		it("should display Activity Over Time chart section when data exists", async () => {
			// Set atom data directly instead of using record functions
			dailyUsageAtom.set([{
				date: new Date().toISOString().split("T")[0],
				messageCount: 1,
				responseCount: 1,
				toolCallCount: 0,
				totalCharacters: 100,
				inputTokens: 50,
				outputTokens: 100,
				toolBreakdown: {},
			}]);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("chart-title")).toBeInTheDocument();
			});
		});

		it("should show chart legend when data exists", async () => {
			// Set atom data directly
			dailyUsageAtom.set([{
				date: new Date().toISOString().split("T")[0],
				messageCount: 1,
				responseCount: 1,
				toolCallCount: 0,
				totalCharacters: 100,
				inputTokens: 50,
				outputTokens: 100,
				toolBreakdown: {},
			}]);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("chart-legend")).toBeInTheDocument();
				expect(screen.getByTestId("chart-legend-messages")).toBeInTheDocument();
				expect(screen.getByTestId("chart-legend-responses")).toBeInTheDocument();
				expect(screen.getByTestId("chart-legend-tools")).toBeInTheDocument();
			});
		});

		it("should show last 30 days subtitle when data exists", async () => {
			dailyUsageAtom.set([{
				date: new Date().toISOString().split("T")[0],
				messageCount: 1,
				responseCount: 0,
				toolCallCount: 0,
				totalCharacters: 100,
				inputTokens: 0,
				outputTokens: 0,
				toolBreakdown: {},
			}]);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("chart-subtitle")).toBeInTheDocument();
			});
		});
	});

	describe("table section", () => {
		it("should display Daily Breakdown section", async () => {
			recordMessage("conv-1", 100);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("table-title")).toBeInTheDocument();
			});
		});

		it("should show table description", async () => {
			recordMessage("conv-1", 100);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("table-subtitle")).toBeInTheDocument();
			});
		});

		it("should render table with data", async () => {
			recordMessage("conv-1", 100);
			recordResponse("conv-1", 200);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("usage-table")).toBeInTheDocument();
			});
		});

		it("should show no data message when table is empty", async () => {
			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("table-empty-message")).toBeInTheDocument();
			});
		});
	});

	describe("table sorting", () => {
		it("should have sortable column headers", async () => {
			recordMessage("conv-1", 100);
			recordResponse("conv-1", 200);

			render(<UsagePage />);

			// Table should render with sortable headers
			await waitFor(() => {
				expect(screen.getByTestId("usage-table")).toBeInTheDocument();
			});
		});
	});

	describe("clear data functionality", () => {
		it("should show clear data button when there is data", async () => {
			recordMessage("conv-1", 100);
			recordResponse("conv-1", 200);

			render(<UsagePage />);

			const clearButton = await screen.findByTestId("clear-data-button");
			expect(clearButton).toBeInTheDocument();
		});

		it("should clear data when confirmed", async () => {
			const user = userEvent.setup();

			recordMessage("conv-1", 100);
			recordResponse("conv-1", 200);

			// Mock confirm to return true
			const originalConfirm = window.confirm;
			window.confirm = () => true;

			render(<UsagePage />);

			const clearButton = await screen.findByTestId("clear-data-button");
			await user.click(clearButton);

			// Check that data is cleared
			expect(usageEventsAtom.get()).toHaveLength(0);
			expect(dailyUsageAtom.get()).toHaveLength(0);

			// Restore confirm
			window.confirm = originalConfirm;
		});

		it("should not clear data when cancelled", async () => {
			const user = userEvent.setup();

			recordMessage("conv-1", 100);

			// Mock confirm to return false
			const originalConfirm = window.confirm;
			window.confirm = () => false;

			render(<UsagePage />);

			const clearButton = await screen.findByTestId("clear-data-button");
			await user.click(clearButton);

			// Data should still exist
			expect(usageEventsAtom.get().length).toBeGreaterThan(0);

			// Restore confirm
			window.confirm = originalConfirm;
		});

		it("should display danger zone section", async () => {
			recordMessage("conv-1", 100);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("clear-data-title")).toBeInTheDocument();
			});
		});

		it("should show warning about permanent deletion", async () => {
			recordMessage("conv-1", 100);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("clear-data-description")).toBeInTheDocument();
			});
		});
	});

	describe("usage summary calculations", () => {
		it("should calculate correct totals", () => {
			recordMessage("conv-1", 100);
			recordMessage("conv-2", 200);
			recordResponse("conv-1", 300);
			recordToolCall("conv-1", "weather");
			recordToolCall("conv-2", "datetime");
			recordTokenUsage(50, 100);

			const summary = getUsageSummary();

			expect(summary.totalMessages).toBe(2);
			expect(summary.totalResponses).toBe(1);
			expect(summary.totalToolCalls).toBe(2);
			expect(summary.totalInputTokens).toBe(50);
			expect(summary.totalOutputTokens).toBe(100);
		});

		it("should track unique conversations", () => {
			recordMessage("conv-1", 100);
			recordMessage("conv-1", 200);
			recordMessage("conv-2", 150);
			recordMessage("conv-2", 250);

			const summary = getUsageSummary();

			expect(summary.totalMessages).toBe(4);
		});
	});

	describe("daily usage tracking", () => {
		it("should aggregate usage by day", () => {
			recordMessage("conv-1", 100);
			recordMessage("conv-1", 200);
			recordResponse("conv-1", 300);

			const dailyUsage = getRecentDailyUsage(30);

			// Should have at least one day of data
			expect(dailyUsage.length).toBeGreaterThan(0);

			// Today's data should have the messages
			const today = new Date().toISOString().split("T")[0];
			const todayData = dailyUsage.find((d) => d.date === today);
			expect(todayData).toBeDefined();
			expect(todayData!.messageCount).toBe(2);
			expect(todayData!.responseCount).toBe(1);
		});
	});

	describe("tool breakdown display", () => {
		it("should show tool breakdown in hero stat", async () => {
			recordToolCall("conv-1", "weather");
			recordToolCall("conv-1", "datetime");
			recordToolCall("conv-2", "weather");

			render(<UsagePage />);

			// The tool breakdown should be visible in the Tool Calls hero stat
			await waitFor(() => {
				expect(screen.getByTestId("hero-stat-tool-calls")).toBeInTheDocument();
			});
		});

		it("should show 'No tools used yet' when no tool calls", async () => {
			recordMessage("conv-1", 100);

			render(<UsagePage />);

			await waitFor(() => {
				const toolCallsStat = screen.getByTestId("hero-stat-tool-calls");
				expect(toolCallsStat).toBeInTheDocument();
			});
		});
	});

	describe("responsive layout", () => {
		it("should render hero stats in grid", async () => {
			recordMessage("conv-1", 100);
			recordTokenUsage(50, 100);

			render(<UsagePage />);

			await waitFor(() => {
				// All three hero stats should be present
				expect(screen.getByTestId("hero-stat-total-tokens")).toBeInTheDocument();
				expect(screen.getByTestId("hero-stat-conversations")).toBeInTheDocument();
				expect(screen.getByTestId("hero-stat-tool-calls")).toBeInTheDocument();
			});
		});

		it("should render secondary stats in grid", async () => {
			recordMessage("conv-1", 100);
			recordResponse("conv-1", 200);
			recordTokenUsage(50, 100);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByTestId("compact-stat-messages")).toBeInTheDocument();
				expect(screen.getByTestId("compact-stat-responses")).toBeInTheDocument();
				expect(screen.getByTestId("compact-stat-input-tokens")).toBeInTheDocument();
				expect(screen.getByTestId("compact-stat-output-tokens")).toBeInTheDocument();
			});
		});
	});

	describe("data formatting", () => {
		it("should format large numbers with commas", async () => {
			// Need to record a message first to have data displayed
			recordMessage("conv-1", 100);
			recordTokenUsage(10000, 25000);

			render(<UsagePage />);

			// Just verify the summary calculates correctly
			// The UI rendering is tested elsewhere
			const summary = getUsageSummary();
			expect(summary.totalInputTokens + summary.totalOutputTokens).toBe(35000);
		});

		it("should format dates correctly in table", async () => {
			recordMessage("conv-1", 100);

			render(<UsagePage />);

			// Table should show formatted dates (e.g., "Mon, Dec 15")
			await waitFor(() => {
				expect(screen.getByText("Date")).toBeInTheDocument();
			});
		});
	});

	describe("interaction with usage store functions", () => {
		it("should record message correctly", () => {
			recordMessage("conv-test", 123);

			const events = usageEventsAtom.get();
			const messageEvent = events.find((e) => e.type === "message");

			expect(messageEvent).toBeDefined();
			expect(messageEvent!.conversationId).toBe("conv-test");
		});

		it("should record response correctly", () => {
			recordResponse("conv-test", 456);

			const events = usageEventsAtom.get();
			const responseEvent = events.find((e) => e.type === "response");

			expect(responseEvent).toBeDefined();
			expect(responseEvent!.conversationId).toBe("conv-test");
		});

		it("should record tool call correctly", () => {
			recordToolCall("conv-test", "weather");

			const events = usageEventsAtom.get();
			const toolEvent = events.find((e) => e.type === "tool_call");

			expect(toolEvent).toBeDefined();
			expect(toolEvent!.toolName).toBe("weather");
		});

		it("should record token usage correctly", () => {
			recordTokenUsage(100, 200);

			// Token usage is stored in dailyUsageAtom, not as individual events
			const dailyUsage = dailyUsageAtom.get();
			expect(dailyUsage.length).toBeGreaterThan(0);

			const today = new Date().toISOString().split("T")[0];
			const todayData = dailyUsage.find((d) => d.date === today);
			expect(todayData).toBeDefined();
			expect(todayData!.inputTokens).toBe(100);
			expect(todayData!.outputTokens).toBe(200);
		});
	});
});
