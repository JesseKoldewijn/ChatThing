import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UsagePage } from "./UsagePage";
import {
	usageEventsAtom,
	dailyUsageAtom,
	recordMessage,
	recordToolCall,
	recordTokenUsage,
} from "@/lib/stores/usage";
import { PROVIDER_OLLAMA } from "@/lib/ai/constants";
import type { Confirmation } from "@/lib/stores/confirmation";

// Mock confirmation store
const mockConfirmAction = vi.fn();
vi.mock("@/lib/stores/confirmation", () => ({
	confirmAction: (options: Confirmation) => mockConfirmAction(options),
}));

// Mock useNavigation
vi.mock("@/lib/hooks/useNavigation", () => ({
	useNavigation: () => ({
		goBack: vi.fn(),
	}),
}));

// Mock ResizeObserver for Recharts
class MockResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}
vi.stubGlobal("ResizeObserver", MockResizeObserver);

describe("UsagePage component", () => {
	beforeEach(() => {
		// Reset usage data
		usageEventsAtom.set([]);
		dailyUsageAtom.set([]);
		vi.clearAllMocks();
	});

	describe("rendering", () => {
		it("should render the page header", () => {
			render(<UsagePage />);

			expect(screen.getByText("Usage Analytics")).toBeInTheDocument();
			expect(
				screen.getByText("Track your AI interactions")
			).toBeInTheDocument();
		});

		it("should render overview section", () => {
			render(<UsagePage />);

			expect(screen.getByText("Overview")).toBeInTheDocument();
		});

		it("should render empty state when no data", () => {
			render(<UsagePage />);

			expect(screen.getByTestId("chart-empty-state")).toBeInTheDocument();
			expect(screen.getByTestId("table-empty-state")).toBeInTheDocument();
		});

		it("should render activity visualization section", () => {
			render(<UsagePage />);

			expect(screen.getByText("Activity Visualization")).toBeInTheDocument();
			expect(screen.getByText("Trend for selected range")).toBeInTheDocument();
		});

		it("should render interaction history section", () => {
			render(<UsagePage />);

			expect(screen.getByText("Interaction History")).toBeInTheDocument();
			expect(screen.getByText("Individual events for the selected period")).toBeInTheDocument();
		});
	});

	describe("with usage data", () => {
		it("should display Total Tokens hero stat", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			recordTokenUsage(25, 50);
			render(<UsagePage />);

			expect(screen.getByTestId("hero-stat-total-tokens")).toBeInTheDocument();
		});

		it("should display Conversations hero stat", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(screen.getByTestId("hero-stat-conversations")).toBeInTheDocument();
		});

		it("should display Tool Calls hero stat", () => {
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(screen.getByTestId("hero-stat-tool-calls")).toBeInTheDocument();
		});

		it("should display AI providers breakdown", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(screen.getByText("AI Providers")).toBeInTheDocument();
		});

		it("should display AI models breakdown", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(screen.getByText("AI Models")).toBeInTheDocument();
		});

		it("should show clear data button when data exists", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(screen.getByTestId("clear-data-button")).toBeInTheDocument();
		});
	});

	describe("interactions", () => {
		it("should have a back button", () => {
			render(<UsagePage />);

			// Back button is the first button in the header
			const buttons = screen.getAllByRole("button");
			expect(buttons.length).toBeGreaterThan(0);
		});

		it("should call confirmAction when clear data is clicked", async () => {
			const user = userEvent.setup();

			// Add data first
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			render(<UsagePage />);

			const clearButton = await screen.findByTestId("clear-data-button");
			await user.click(clearButton);

			expect(mockConfirmAction).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "Clear Usage Data",
				})
			);
		});
	});
});

