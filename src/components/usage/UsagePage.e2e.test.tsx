import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

import { PROVIDER_OLLAMA } from "@/lib/ai/constants";
import { experimentsAtom } from "@/lib/stores/settings";
import {
	clearUsageData,
	dailyUsageAtom,
	getUsageSummary,
	recordMessage,
	recordResponse,
	recordTokenUsage,
	recordToolCall,
	usageEventsAtom,
} from "@/lib/stores/usage";
// Import after mocks
import { UsagePage } from "./UsagePage";

// Mock confirmation store
vi.mock("@/lib/stores/confirmation", () => ({
	confirmAction: vi.fn(({ onConfirm }) => onConfirm()),
}));

describe("UsagePage E2E", () => {
	beforeEach(() => {
		// Clear all usage data
		usageEventsAtom.set([]);
		dailyUsageAtom.set([]);
		experimentsAtom.set({}); // Reset experiments
		if (typeof localStorage !== "undefined") {
			localStorage.clear();
		}
		vi.clearAllMocks();
	});

	afterEach(() => {
		clearUsageData();
	});

	describe("page navigation and rendering", () => {
		it("should render the usage analytics page", async () => {
			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("usage-page")).toBeInTheDocument();
				expect(screen.getByTestId("usage-title")).toBeInTheDocument();
			});
		});

		it("should have a back button", async () => {
			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("usage-back-button")).toBeInTheDocument();
			});
		});

		it("should navigate back when clicking back button", async () => {
			const user = userEvent.setup();
			await act(async () => {
				render(<UsagePage />);
			});

			const backButton = await screen.findByTestId("usage-back-button");
			await user.click(backButton);

			expect(mockGoBack).toHaveBeenCalled();
		});

		it("should show subtitle", async () => {
			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("usage-subtitle")).toBeInTheDocument();
			});
		});
	});

	describe("empty state", () => {
		it("should show empty state initially", async () => {
			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("chart-empty-state")).toBeInTheDocument();
				expect(screen.getByTestId("table-empty-state")).toBeInTheDocument();
			});
		});

		it("should show helpful message in empty state", async () => {
			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(
					screen.getByText("No events found in this range"),
				).toBeInTheDocument();
			});
		});

		it("should not show clear data button in empty state", async () => {
			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				// Clear data button should not appear when there's no data
				expect(
					screen.queryByTestId("clear-data-button"),
				).not.toBeInTheDocument();
			});
		});
	});

	describe("overview section", () => {
		it("should display overview section header", async () => {
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("usage-overview-title")).toBeInTheDocument();
			});
		});

		it("should show estimated tokens note", async () => {
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(
					screen.getByTestId("usage-estimated-tokens-note"),
				).toBeInTheDocument();
			});
		});
	});

	describe("hero stats", () => {
		it("should display Total Tokens hero stat", async () => {
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 150, PROVIDER_OLLAMA, "m1");
			recordTokenUsage(13, 38);

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(
					screen.getByTestId("hero-stat-total-tokens"),
				).toBeInTheDocument();
			});
		});

		it("should display Conversations hero stat", async () => {
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(
					screen.getByTestId("hero-stat-conversations"),
				).toBeInTheDocument();
			});
		});

		it("should display Tool Calls hero stat when tools experiment is enabled", async () => {
			experimentsAtom.set({ tools: true });
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("hero-stat-tool-calls")).toBeInTheDocument();
			});
		});

		it("should NOT display Tool Calls hero stat when tools experiment is disabled", async () => {
			experimentsAtom.set({ tools: false });
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(
					screen.queryByTestId("hero-stat-tool-calls"),
				).not.toBeInTheDocument();
			});
		});
	});

	describe("data display", () => {
		it("should display usage data after recording events", async () => {
			experimentsAtom.set({ tools: true });
			recordMessage("conv-1", 50, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 150, PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "datetime", PROVIDER_OLLAMA, "m1");
			recordTokenUsage(13, 38);

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(
					screen.getByTestId("hero-stat-total-tokens"),
				).toBeInTheDocument();
				expect(
					screen.getByTestId("hero-stat-conversations"),
				).toBeInTheDocument();
				expect(screen.getByTestId("hero-stat-tool-calls")).toBeInTheDocument();
			});
		});

		it("should show 'By Tool' option in chart view select when tools experiment is enabled", async () => {
			const user = userEvent.setup();
			experimentsAtom.set({ tools: true });
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			const selectTrigger = await screen.findByRole("combobox", {
				name: /select view/i,
			});
			await user.click(selectTrigger);

			expect(await screen.findByText("By Tool")).toBeInTheDocument();
		});

		it("should NOT show 'By Tool' option in chart view select when tools experiment is disabled", async () => {
			const user = userEvent.setup();
			experimentsAtom.set({ tools: false });
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			const selectTrigger = await screen.findByRole("combobox", {
				name: /select view/i,
			});
			await user.click(selectTrigger);

			expect(screen.queryByText("By Tool")).not.toBeInTheDocument();
		});

		it("should track unique conversations", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-1", 200, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-2", 150, PROVIDER_OLLAMA, "m1");
			recordMessage("conv-2", 250, PROVIDER_OLLAMA, "m1");

			const summary = getUsageSummary();
			expect(summary.totalMessages).toBe(4);
		});

		it("should track tool calls by type", () => {
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-1", "datetime", PROVIDER_OLLAMA, "m1");
			recordToolCall("conv-2", "weather", PROVIDER_OLLAMA, "m1");

			const summary = getUsageSummary();
			expect(summary.totalToolCalls).toBe(3);
			expect(summary.toolBreakdown).toHaveProperty("weather");
			expect(summary.toolBreakdown).toHaveProperty("datetime");
		});

		it("should track token usage correctly", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordTokenUsage(100, 200);
			recordTokenUsage(50, 100);

			const summary = getUsageSummary();
			expect(summary.totalInputTokens).toBe(150);
			expect(summary.totalOutputTokens).toBe(300);
		});
	});

	describe("chart section", () => {
		it("should display Activity Visualization chart section when data exists", async () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("chart-title")).toBeInTheDocument();
			});
		});

		it("should show chart subtitle when data exists", async () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("chart-subtitle")).toBeInTheDocument();
			});
		});
	});

	describe("table section", () => {
		it("should display Interaction History section", async () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("table-title")).toBeInTheDocument();
			});
		});

		it("should show table description", async () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("table-subtitle")).toBeInTheDocument();
			});
		});

		it("should render table with data", async () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 200, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("usage-table")).toBeInTheDocument();
			});
		});
	});

	describe("clear data functionality", () => {
		it("should show clear data button when there is data", async () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 200, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			const clearButton = await screen.findByTestId("clear-data-button");
			expect(clearButton).toBeInTheDocument();
		});

		it("should clear data and immediately update UI to empty state when confirmed", async () => {
			const user = userEvent.setup();

			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordResponse("conv-1", 200, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			// Verify data is present initially
			expect(screen.queryByTestId("chart-empty-state")).not.toBeInTheDocument();
			expect(screen.queryByTestId("table-empty-state")).not.toBeInTheDocument();

			const clearButton = await screen.findByTestId("clear-data-button");
			await user.click(clearButton);

			// Check that data is cleared in atoms
			expect(usageEventsAtom.get()).toHaveLength(0);
			expect(dailyUsageAtom.get()).toHaveLength(0);

			// Verify UI updates to empty state immediately without page refresh
			await waitFor(() => {
				expect(screen.getByTestId("chart-empty-state")).toBeInTheDocument();
				expect(screen.getByTestId("table-empty-state")).toBeInTheDocument();
				// Clear button should also be gone
				expect(
					screen.queryByTestId("clear-data-button"),
				).not.toBeInTheDocument();
			});
		});

		it("should display danger zone section", async () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(screen.getByTestId("clear-data-title")).toBeInTheDocument();
			});
		});

		it("should show warning about permanent deletion", async () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			await act(async () => {
				render(<UsagePage />);
			});

			await waitFor(() => {
				expect(
					screen.getByTestId("clear-data-description"),
				).toBeInTheDocument();
			});
		});
	});
});
