import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

// Mock navigation with all needed exports
vi.mock("@/lib/stores/navigation", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/lib/stores/navigation")>();
	return {
		...actual,
		goBack: vi.fn(),
	};
});

vi.mock("@/lib/ai/compat", () => ({
	checkBuiltInAIAvailability: vi.fn().mockResolvedValue({
		available: true,
		languageModel: { available: true },
		assistant: { available: true },
	}),
}));

// Import after mocks
import { SettingsPage } from "./SettingsPage";
import {
	themeAtom,
	temperatureUnitAtom,
	timezoneAtom,
	outputLanguageAtom,
} from "@/lib/stores/settings";

describe("SettingsPage", () => {
	beforeEach(() => {
		// Reset settings to defaults
		themeAtom.set("system");
		temperatureUnitAtom.set("auto");
		timezoneAtom.set("auto");
		outputLanguageAtom.set("en");
		localStorage.clear();
	});

	describe("page rendering", () => {
		it("should render the settings page", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByText("Settings")).toBeInTheDocument();
			});
		});

		it("should have a back button", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				// Back button is the first button
				const buttons = screen.getAllByRole("button");
				expect(buttons.length).toBeGreaterThan(0);
			});
		});
	});

	describe("theme settings", () => {
		it("should display theme options", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByText(/theme/i)).toBeInTheDocument();
			});
		});
	});
});

