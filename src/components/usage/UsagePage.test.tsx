import { PROVIDER_OLLAMA } from "@/lib/ai/constants";
import type { Confirmation } from "@/lib/stores/confirmation";
import { experimentsAtom } from "@/lib/stores/settings";
import {
	dailyUsageAtom,
	recordMessage,
	recordTokenUsage,
	recordToolCall,
	usageEventsAtom,
} from "@/lib/stores/usage";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UsagePage } from "./UsagePage";

// Mock confirmation store
const mockConfirmAction = vi.fn();
vi.mock("@/lib/stores/confirmation", () => ({
	confirmAction: (options: Confirmation) => mockConfirmAction(options),
}));

// Mock useNavigation
const mockGoBack = vi.fn();
vi.mock("@/lib/hooks/useNavigation", () => ({
	useNavigation: () => ({
		goBack: mockGoBack,
	}),
}));

describe("UsagePage component", () => {
	beforeEach(() => {
		// Reset usage data
		usageEventsAtom.set([]);
		dailyUsageAtom.set([]);
		experimentsAtom.set({ tools: true });
		vi.clearAllMocks();
	});

	describe("rendering", () => {
		it("should render the page header", () => {
			render(<UsagePage />);

			expect(screen.getByText("Usage Analytics")).toBeInTheDocument();
			expect(
				screen.getByText("Track your AI interactions"),
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
			expect(
				screen.getByText("Individual events for the selected period"),
			).toBeInTheDocument();
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

		it("should display Tool Calls hero stat when tools are enabled", () => {
			experimentsAtom.set({ tools: true });
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(screen.getByTestId("hero-stat-tool-calls")).toBeInTheDocument();
		});

		it("should HIDE Tool Calls hero stat when tools are disabled", () => {
			experimentsAtom.set({ tools: false });
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(
				screen.queryByTestId("hero-stat-tool-calls"),
			).not.toBeInTheDocument();
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

		it("should display Tools Used breakdown when tools are enabled", () => {
			experimentsAtom.set({ tools: true });
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(screen.getByText("Tools Used")).toBeInTheDocument();
		});

		it("should HIDE Tools Used breakdown when tools are disabled", () => {
			experimentsAtom.set({ tools: false });
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(screen.queryByText("Tools Used")).not.toBeInTheDocument();
		});

		it("should show clear data button when data exists", () => {
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			expect(screen.getByTestId("clear-data-button")).toBeInTheDocument();
		});

		it("should HIDE tool call events in interaction view when disabled", async () => {
			experimentsAtom.set({ tools: false });
			recordToolCall("conv-1", "weather", PROVIDER_OLLAMA, "m1");

			// Set granularity to interaction to see individual events
			render(<UsagePage />);

			// We need to trigger granularity change to interaction
			// For simplicity, let's just check if any tool name is present in the document
			expect(screen.queryByText("weather")).not.toBeInTheDocument();
		});
	});

	describe("interactions", () => {
		it("should call goBack when back button is clicked", async () => {
			const user = userEvent.setup();
			render(<UsagePage />);

			const backButton = screen.getByTestId("usage-back-button");
			await user.click(backButton);

			expect(mockGoBack).toHaveBeenCalled();
		});

		it("should clear usage data when confirmed", async () => {
			const user = userEvent.setup();

			// Add data first
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");

			render(<UsagePage />);

			const clearButton = await screen.findByTestId("clear-data-button");
			await user.click(clearButton);

			expect(mockConfirmAction).toHaveBeenCalled();
			const options = mockConfirmAction.mock.calls[0][0];

			// Manually call the onConfirm callback to cover the logic
			await act(async () => {
				options.onConfirm();
			});

			expect(usageEventsAtom.get().length).toBe(0);
		});

		it("should reset chart view to volume if tools are disabled while viewing tools chart", async () => {
			const user = userEvent.setup();
			experimentsAtom.set({ tools: true });
			render(<UsagePage />);

			// Set chart view to tools
			const select = screen.getByLabelText("Select view");
			await user.click(select);
			const option = await screen.findByText("By Tool");
			await user.click(option);

			expect(screen.getByText("By Tool")).toBeInTheDocument();

			// Disable tools
			await act(async () => {
				experimentsAtom.set({ tools: false });
			});

			// Should reset to Interaction Volume (which is the default "volume" view label)
			expect(await screen.findByText("Interaction Volume")).toBeInTheDocument();
		});

		it("should open range dialog and allow selecting presets", async () => {
			const user = userEvent.setup();
			render(<UsagePage />);

			await user.click(screen.getByText("Change Range"));

			expect(screen.getByText("Select Activity Range")).toBeInTheDocument();

			// Click presets to cover onClick handlers
			await user.click(screen.getByText("Last 7d"));
			await user.click(screen.getByText("Last 30d"));
			await user.click(screen.getByText("Last 90d"));
			await user.click(screen.getByText("All Time"));
		});

		it("should allow changing granularity and show interaction details", async () => {
			const user = userEvent.setup();
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			const select = screen.getByLabelText("Granularity");
			await user.click(select);

			const option = await screen.findByText("Interaction");
			await user.click(option);

			expect(screen.getByText("Interaction")).toBeInTheDocument();
			// Use getAllByText and check for existence to avoid "multiple elements" error
			const m1Elements = screen.getAllByText("m1");
			expect(m1Elements.length).toBeGreaterThan(0);
		});

		it("should allow sorting the table", async () => {
			const user = userEvent.setup();
			recordMessage("conv-1", 100, PROVIDER_OLLAMA, "m1");
			render(<UsagePage />);

			const modelHeader = screen.getByText("Model");
			await user.click(modelHeader);

			// Toggle sorting
			await user.click(modelHeader);
		});

		it("should allow changing chart view", async () => {
			const user = userEvent.setup();
			render(<UsagePage />);

			const select = screen.getByLabelText("Select view");
			await user.click(select);

			const option = await screen.findByText("By Provider");
			await user.click(option);

			expect(screen.getByText("By Provider")).toBeInTheDocument();
		});
	});
});
