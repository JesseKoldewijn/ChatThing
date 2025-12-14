import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UsagePage } from "./UsagePage";
import {
	usageEventsAtom,
	dailyUsageAtom,
	recordMessage,
	recordResponse,
	recordToolCall,
	recordTokenUsage,
} from "@/lib/stores/usage";

// Mock window.confirm
vi.stubGlobal("confirm", vi.fn(() => true));

// Mock goBack
vi.mock("@/lib/stores/navigation", () => ({
	goBack: vi.fn(),
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

			expect(screen.getByText("No usage data yet")).toBeInTheDocument();
			expect(
				screen.getByText("Start chatting to see your metrics")
			).toBeInTheDocument();
		});

		it("should render activity over time section", () => {
			render(<UsagePage />);

			expect(screen.getByText("Activity Over Time")).toBeInTheDocument();
			expect(screen.getByText("Last 30 days of usage")).toBeInTheDocument();
		});

		it("should render daily breakdown section", () => {
			render(<UsagePage />);

			expect(screen.getByText("Daily Breakdown")).toBeInTheDocument();
			expect(screen.getByText("Detailed usage by day")).toBeInTheDocument();
		});
	});

	describe("with usage data", () => {
		it("should display total tokens", () => {
			recordMessage("conv-1", 100);
			recordTokenUsage(25, 50);
			render(<UsagePage />);

			expect(screen.getByText("Total Tokens")).toBeInTheDocument();
		});

		it("should display conversations count", () => {
			recordMessage("conv-1", 100);
			render(<UsagePage />);

			expect(screen.getByText("Conversations")).toBeInTheDocument();
		});

		it("should display tool calls count", () => {
			recordToolCall("conv-1", "weather");
			render(<UsagePage />);

			expect(screen.getByText("Tool Calls")).toBeInTheDocument();
		});

		it("should display messages sent stat", () => {
			recordMessage("conv-1", 100);
			render(<UsagePage />);

			expect(screen.getByText("Messages Sent")).toBeInTheDocument();
		});

		it("should display AI responses stat", () => {
			recordResponse("conv-1", 200);
			render(<UsagePage />);

			expect(screen.getByText("AI Responses")).toBeInTheDocument();
		});

		it("should display input tokens stat", () => {
			recordTokenUsage(25, 50);
			render(<UsagePage />);

			expect(screen.getByText("Input Tokens")).toBeInTheDocument();
		});

		it("should display output tokens stat", () => {
			recordTokenUsage(25, 50);
			render(<UsagePage />);

			expect(screen.getByText("Output Tokens")).toBeInTheDocument();
		});

		it("should show clear data button when data exists", () => {
			recordMessage("conv-1", 100);
			render(<UsagePage />);

			expect(screen.getByText("Clear All Usage Data")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: /clear data/i })
			).toBeInTheDocument();
		});
	});

	describe("interactions", () => {
		it("should have a back button", () => {
			render(<UsagePage />);

			// Back button is the first button in the header
			const buttons = screen.getAllByRole("button");
			expect(buttons.length).toBeGreaterThan(0);
		});

		it("should call confirm when clear data is clicked", async () => {
			const user = userEvent.setup();

			// Add data first
			recordMessage("conv-1", 100);

			render(<UsagePage />);

			const clearButton = screen.getByRole("button", { name: /clear data/i });
			await user.click(clearButton);

			expect(window.confirm).toHaveBeenCalledWith(
				"Are you sure you want to clear all usage data? This cannot be undone."
			);
		});
	});

	describe("chart legend", () => {
		it("should display legend items", () => {
			render(<UsagePage />);

			expect(screen.getByText("Messages")).toBeInTheDocument();
			expect(screen.getByText("Responses")).toBeInTheDocument();
			expect(screen.getByText("Tools")).toBeInTheDocument();
		});
	});
});

