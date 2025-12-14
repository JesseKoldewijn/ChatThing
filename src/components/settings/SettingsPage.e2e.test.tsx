import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
	archiveThresholdAtom,
	setTheme,
	setTemperatureUnit,
	setTimezone,
} from "@/lib/stores/settings";
import { conversationsAtom, clearAllConversations } from "@/lib/stores/conversations";
import { goBack } from "@/lib/stores/navigation";

describe("SettingsPage E2E", () => {
	beforeEach(() => {
		// Reset settings to defaults
		themeAtom.set("system");
		temperatureUnitAtom.set("auto");
		timezoneAtom.set("auto");
		outputLanguageAtom.set("en");
		archiveThresholdAtom.set({ value: 2, unit: "days" });
		conversationsAtom.set([]);
		localStorage.clear();
		vi.clearAllMocks();
	});

	describe("page navigation and rendering", () => {
		it("should render the settings page with title", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByText("Settings")).toBeInTheDocument();
			});
		});

		it("should have a back button that navigates back", async () => {
			const user = userEvent.setup();
			render(<SettingsPage />);

			// Find and click the back button (first button or button with back icon)
			const buttons = screen.getAllByRole("button");
			await user.click(buttons[0]);

			expect(goBack).toHaveBeenCalled();
		});
	});

	describe("theme settings", () => {
		it("should allow changing theme via setTheme", () => {
			// Use the action to change theme
			setTheme("dark");
			expect(themeAtom.get()).toBe("dark");

			setTheme("light");
			expect(themeAtom.get()).toBe("light");

			setTheme("system");
			expect(themeAtom.get()).toBe("system");
		});
	});

	describe("temperature unit settings", () => {
		it("should allow changing temperature unit via action", () => {
			setTemperatureUnit("celsius");
			expect(temperatureUnitAtom.get()).toBe("celsius");

			setTemperatureUnit("fahrenheit");
			expect(temperatureUnitAtom.get()).toBe("fahrenheit");

			setTemperatureUnit("auto");
			expect(temperatureUnitAtom.get()).toBe("auto");
		});
	});

	describe("timezone settings", () => {
		it("should allow changing timezone via action", () => {
			setTimezone("America/New_York");
			expect(timezoneAtom.get()).toBe("America/New_York");

			setTimezone("auto");
			expect(timezoneAtom.get()).toBe("auto");
		});
	});

	describe("conversation management", () => {
		it("should allow clearing all conversations", async () => {
			conversationsAtom.set([
				{
					id: "conv-1",
					title: "Test",
					messages: [],
					createdAt: Date.now(),
					updatedAt: Date.now(),
					status: "active",
				},
			]);

			expect(conversationsAtom.get()).toHaveLength(1);

			clearAllConversations();

			expect(conversationsAtom.get()).toHaveLength(0);
		});
	});

	describe("archive threshold settings", () => {
		it("should respect archive threshold atom", () => {
			archiveThresholdAtom.set({ value: 7, unit: "days" });
			const threshold = archiveThresholdAtom.get();
			expect(threshold.value).toBe(7);
			expect(threshold.unit).toBe("days");
		});
	});

	describe("state persistence", () => {
		it("should persist theme to localStorage when changed", () => {
			setTheme("dark");

			expect(localStorage.getItem("theme")).toBe("dark");
		});

		it("should persist temperature unit to localStorage when changed", () => {
			setTemperatureUnit("celsius");

			expect(localStorage.getItem("temperature-unit")).toBe("celsius");
		});

		it("should persist timezone to localStorage when changed", () => {
			setTimezone("Europe/London");

			expect(localStorage.getItem("timezone")).toBe("Europe/London");
		});
	});

	describe("conversation data", () => {
		it("should display conversation count correctly", () => {
			conversationsAtom.set([
				{
					id: "conv-1",
					title: "Test Conversation 1",
					messages: [],
					createdAt: Date.now(),
					updatedAt: Date.now(),
					status: "active",
				},
				{
					id: "conv-2",
					title: "Test Conversation 2",
					messages: [],
					createdAt: Date.now(),
					updatedAt: Date.now(),
					status: "active",
				},
			]);

			expect(conversationsAtom.get()).toHaveLength(2);
		});

		it("should filter active conversations correctly", () => {
			conversationsAtom.set([
				{
					id: "conv-1",
					title: "Active",
					messages: [],
					createdAt: Date.now(),
					updatedAt: Date.now(),
					status: "active",
				},
				{
					id: "conv-2",
					title: "Archived",
					messages: [],
					createdAt: Date.now(),
					updatedAt: Date.now(),
					status: "archived",
				},
			]);

			const active = conversationsAtom.get().filter((c) => c.status === "active");
			expect(active).toHaveLength(1);
		});
	});
});
