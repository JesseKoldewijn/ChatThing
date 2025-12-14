import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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

describe("UsagePage E2E", () => {
	beforeEach(() => {
		// Clear all usage data
		usageEventsAtom.set([]);
		dailyUsageAtom.set([]);
		localStorage.clear();
	});

	describe("page navigation and rendering", () => {
		it("should render the usage analytics page", async () => {
			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByText("Usage Analytics")).toBeInTheDocument();
			});
		});

		it("should show empty state initially", async () => {
			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByText("No usage data yet")).toBeInTheDocument();
			});
		});
	});

	describe("data display", () => {
		it("should display usage data after recording events", async () => {
			// Record some usage
			recordMessage("conv-1", 50);
			recordResponse("conv-1", 150);
			recordToolCall("conv-1", "datetime");
			recordTokenUsage(13, 38);

			render(<UsagePage />);

			await waitFor(() => {
				// Check that stats are displayed
				expect(screen.getByText("Total Tokens")).toBeInTheDocument();
				expect(screen.getByText("Conversations")).toBeInTheDocument();
				expect(screen.getByText("Tool Calls")).toBeInTheDocument();
			});
		});

		it("should update when new data is recorded", async () => {
			// Record data first
			recordMessage("conv-1", 100);

			// Then render
			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByText("Messages Sent")).toBeInTheDocument();
			});
		});
	});

	describe("clear data functionality", () => {
		it("should clear data when confirmed", async () => {
			const user = userEvent.setup();

			// Add data
			recordMessage("conv-1", 100);
			recordResponse("conv-1", 200);

			// Mock confirm to return true
			const originalConfirm = window.confirm;
			window.confirm = () => true;

			render(<UsagePage />);

			// Find and click clear button
			const clearButton = await screen.findByRole("button", {
				name: /clear data/i,
			});
			await user.click(clearButton);

			// Check that data is cleared
			expect(usageEventsAtom.get()).toHaveLength(0);
			expect(dailyUsageAtom.get()).toHaveLength(0);

			// Restore confirm
			window.confirm = originalConfirm;
		});

		it("should not clear data when cancelled", async () => {
			const user = userEvent.setup();

			// Add data
			recordMessage("conv-1", 100);

			// Mock confirm to return false
			const originalConfirm = window.confirm;
			window.confirm = () => false;

			render(<UsagePage />);

			const clearButton = await screen.findByRole("button", {
				name: /clear data/i,
			});
			await user.click(clearButton);

			// Data should still exist
			expect(usageEventsAtom.get().length).toBeGreaterThan(0);

			// Restore confirm
			window.confirm = originalConfirm;
		});
	});

	describe("table interactions", () => {
		it("should render table with data", async () => {
			// Add test data
			recordMessage("conv-1", 100);
			recordResponse("conv-1", 200);

			render(<UsagePage />);

			await waitFor(() => {
				// Table headers should be present
				expect(screen.getByText("Date")).toBeInTheDocument();
			});
		});
	});

	describe("responsive layout", () => {
		it("should render all stat cards", async () => {
			recordMessage("conv-1", 100);
			recordTokenUsage(25, 50);

			render(<UsagePage />);

			await waitFor(() => {
				expect(screen.getByText("Total Tokens")).toBeInTheDocument();
				expect(screen.getByText("Conversations")).toBeInTheDocument();
				expect(screen.getByText("Tool Calls")).toBeInTheDocument();
				expect(screen.getByText("Messages Sent")).toBeInTheDocument();
				expect(screen.getByText("AI Responses")).toBeInTheDocument();
				expect(screen.getByText("Input Tokens")).toBeInTheDocument();
				expect(screen.getByText("Output Tokens")).toBeInTheDocument();
			});
		});
	});
});

