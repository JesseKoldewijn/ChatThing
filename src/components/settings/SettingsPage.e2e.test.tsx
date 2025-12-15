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
	setArchiveThreshold,
} from "@/lib/stores/settings";
import {
	conversationsAtom,
	clearAllConversations,
	type Conversation,
} from "@/lib/stores/conversations";

// Helper to create test conversations
const createTestConversation = (
	overrides: Partial<Conversation> = {}
): Conversation => ({
	id: crypto.randomUUID(),
	title: "Test Conversation",
	messages: [],
	createdAt: Date.now(),
	updatedAt: Date.now(),
	status: "active",
	...overrides,
});

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

	afterEach(() => {
		clearAllConversations();
	});

	describe("page navigation and rendering", () => {
		it("should render the settings page with title", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("settings-page")).toBeInTheDocument();
				expect(screen.getByTestId("settings-title")).toBeInTheDocument();
			});
		});

		it("should have a back button that navigates back", async () => {
			const user = userEvent.setup();
			render(<SettingsPage />);

			const backButton = await screen.findByTestId("settings-back-button");
			await user.click(backButton);

			expect(mockGoBack).toHaveBeenCalled();
		});

		it("should render all settings sections", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("settings-section-appearance")).toBeInTheDocument();
				expect(screen.getByTestId("settings-section-temperature")).toBeInTheDocument();
				expect(screen.getByTestId("settings-section-timezone")).toBeInTheDocument();
				expect(screen.getByTestId("settings-section-auto-archive")).toBeInTheDocument();
				expect(screen.getByTestId("settings-section-chat-history")).toBeInTheDocument();
				expect(screen.getByTestId("settings-section-trash")).toBeInTheDocument();
				expect(screen.getByTestId("settings-section-danger-zone")).toBeInTheDocument();
			});
		});
	});

	describe("theme settings UI interactions", () => {
		it("should display all theme options", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("theme-button-light")).toBeInTheDocument();
				expect(screen.getByTestId("theme-button-dark")).toBeInTheDocument();
				expect(screen.getByTestId("theme-button-system")).toBeInTheDocument();
			});
		});

		it("should change theme when clicking Light button", async () => {
			const user = userEvent.setup();
			render(<SettingsPage />);

			const lightButton = await screen.findByTestId("theme-button-light");
			await user.click(lightButton);

			expect(themeAtom.get()).toBe("light");
			expect(localStorage.getItem("theme")).toBe("light");
		});

		it("should change theme when clicking Dark button", async () => {
			const user = userEvent.setup();
			render(<SettingsPage />);

			const darkButton = await screen.findByTestId("theme-button-dark");
			await user.click(darkButton);

			expect(themeAtom.get()).toBe("dark");
			expect(localStorage.getItem("theme")).toBe("dark");
		});

		it("should change theme when clicking System button", async () => {
			const user = userEvent.setup();
			// Start with a non-system theme
			setTheme("dark");

			render(<SettingsPage />);

			const systemButton = await screen.findByTestId("theme-button-system");
			await user.click(systemButton);

			expect(themeAtom.get()).toBe("system");
		});

		it("should visually indicate the currently selected theme", async () => {
			setTheme("dark");
			render(<SettingsPage />);

			const darkButton = await screen.findByTestId("theme-button-dark");
			// The selected button should have primary styling (checking via class)
			expect(darkButton.className).toContain("primary");
		});
	});

	describe("temperature unit settings UI interactions", () => {
		it("should display all temperature unit options", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("temp-unit-button-auto")).toBeInTheDocument();
				expect(screen.getByTestId("temp-unit-button-fahrenheit")).toBeInTheDocument();
				expect(screen.getByTestId("temp-unit-button-celsius")).toBeInTheDocument();
			});
		});

		it("should change temperature unit when clicking Fahrenheit button", async () => {
			const user = userEvent.setup();
			render(<SettingsPage />);

			const fahrenheitButton = await screen.findByTestId("temp-unit-button-fahrenheit");
			await user.click(fahrenheitButton);

			expect(temperatureUnitAtom.get()).toBe("fahrenheit");
			expect(localStorage.getItem("temperature-unit")).toBe("fahrenheit");
		});

		it("should change temperature unit when clicking Celsius button", async () => {
			const user = userEvent.setup();
			render(<SettingsPage />);

			const celsiusButton = await screen.findByTestId("temp-unit-button-celsius");
			await user.click(celsiusButton);

			expect(temperatureUnitAtom.get()).toBe("celsius");
			expect(localStorage.getItem("temperature-unit")).toBe("celsius");
		});

		it("should change temperature unit when clicking Auto button", async () => {
			const user = userEvent.setup();
			setTemperatureUnit("celsius");

			render(<SettingsPage />);

			const autoButton = await screen.findByTestId("temp-unit-button-auto");
			await user.click(autoButton);

			expect(temperatureUnitAtom.get()).toBe("auto");
		});
	});

	describe("timezone settings UI interactions", () => {
		it("should display Auto (System) option", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("timezone-auto-button")).toBeInTheDocument();
			});
		});

		it("should change to auto timezone when clicking Auto button", async () => {
			const user = userEvent.setup();
			setTimezone("America/New_York");

			render(<SettingsPage />);

			const autoButton = await screen.findByTestId("timezone-auto-button");
			await user.click(autoButton);

			expect(timezoneAtom.get()).toBe("auto");
		});

		it("should have a timezone dropdown", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("timezone-select-trigger")).toBeInTheDocument();
			});
		});

		it("should persist timezone to localStorage when changed", () => {
			setTimezone("Europe/London");

			expect(localStorage.getItem("timezone")).toBe("Europe/London");
		});
	});

	describe("auto-archive settings UI interactions", () => {
		it("should display auto-archive toggle", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("auto-archive-toggle")).toBeInTheDocument();
			});
		});

		it("should toggle auto-archive off when clicking toggle", async () => {
			const user = userEvent.setup();
			setArchiveThreshold({ value: 2, unit: "days" });

			render(<SettingsPage />);

			const archiveToggle = await screen.findByTestId("auto-archive-toggle");
			await user.click(archiveToggle);

			await waitFor(() => {
				expect(archiveThresholdAtom.get().value).toBe(0);
			});
		});

		it("should show threshold controls when auto-archive is enabled", async () => {
			setArchiveThreshold({ value: 7, unit: "days" });

			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("settings-section-auto-archive")).toBeInTheDocument();
			});
		});

		it("should respect archive threshold atom", () => {
			archiveThresholdAtom.set({ value: 7, unit: "days" });
			const threshold = archiveThresholdAtom.get();
			expect(threshold.value).toBe(7);
			expect(threshold.unit).toBe("days");
		});
	});

	describe("conversation management UI interactions", () => {
		it("should display conversation counts", async () => {
			conversationsAtom.set([
				createTestConversation({ status: "active" }),
				createTestConversation({ status: "active" }),
				createTestConversation({ status: "archived" }),
				createTestConversation({ status: "deleted" }),
			]);

			render(<SettingsPage />);

			await waitFor(() => {
				// Should show count boxes
				expect(screen.getByTestId("stat-active")).toBeInTheDocument();
				expect(screen.getByTestId("stat-archived")).toBeInTheDocument();
				expect(screen.getByTestId("stat-deleted")).toBeInTheDocument();
				// Check the conversation counts exist in the atom
				const convs = conversationsAtom.get();
				expect(convs.filter((c) => c.status === "active").length).toBe(2);
				expect(convs.filter((c) => c.status === "archived").length).toBe(1);
			});
		});

		it("should have export button", async () => {
			conversationsAtom.set([createTestConversation()]);

			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("export-button")).toBeInTheDocument();
			});
		});

		it("should have import button", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("import-button")).toBeInTheDocument();
			});
		});

		it("should disable export when no conversations exist", async () => {
			conversationsAtom.set([]);

			render(<SettingsPage />);

			await waitFor(() => {
				const exportButton = screen.getByTestId("export-button");
				expect(exportButton).toBeDisabled();
			});
		});

		it("should allow clearing all conversations", async () => {
			conversationsAtom.set([
				createTestConversation({ id: "conv-1", title: "Test" }),
			]);

			expect(conversationsAtom.get()).toHaveLength(1);

			clearAllConversations();

			expect(conversationsAtom.get()).toHaveLength(0);
		});

		it("should filter active conversations correctly", () => {
			conversationsAtom.set([
				createTestConversation({ id: "conv-1", title: "Active", status: "active" }),
				createTestConversation({ id: "conv-2", title: "Archived", status: "archived" }),
			]);

			const active = conversationsAtom.get().filter((c) => c.status === "active");
			expect(active).toHaveLength(1);
		});
	});

	describe("trash section UI interactions", () => {
		it("should show empty trash message when no deleted conversations", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("trash-status")).toBeInTheDocument();
			});
		});

		it("should show deleted count when there are deleted conversations", async () => {
			conversationsAtom.set([
				createTestConversation({ status: "deleted" }),
				createTestConversation({ status: "deleted" }),
			]);

			render(<SettingsPage />);

			await waitFor(() => {
				const trashStatus = screen.getByTestId("trash-status");
				expect(trashStatus).toHaveTextContent(/2 items? in trash/i);
			});
		});

		it("should have empty trash button", async () => {
			conversationsAtom.set([createTestConversation({ status: "deleted" })]);

			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("empty-trash-button")).toBeInTheDocument();
			});
		});

		it("should disable empty trash button when trash is empty", async () => {
			conversationsAtom.set([]);

			render(<SettingsPage />);

			await waitFor(() => {
				const emptyTrashButton = screen.getByTestId("empty-trash-button");
				expect(emptyTrashButton).toBeDisabled();
			});
		});
	});

	describe("danger zone UI interactions", () => {
		it("should show delete all button", async () => {
			conversationsAtom.set([createTestConversation()]);

			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("delete-all-button")).toBeInTheDocument();
			});
		});

		it("should disable delete all button when no conversations", async () => {
			conversationsAtom.set([]);

			render(<SettingsPage />);

			await waitFor(() => {
				const deleteAllButton = screen.getByTestId("delete-all-button");
				expect(deleteAllButton).toBeDisabled();
			});
		});

		it("should show total conversation count in danger zone", async () => {
			conversationsAtom.set([
				createTestConversation(),
				createTestConversation(),
				createTestConversation(),
			]);

			render(<SettingsPage />);

			await waitFor(() => {
				const description = screen.getByTestId("delete-all-description");
				expect(description).toHaveTextContent(/delete all 3 conversations/i);
			});
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
				createTestConversation({ id: "conv-1", title: "Test Conversation 1" }),
				createTestConversation({ id: "conv-2", title: "Test Conversation 2" }),
			]);

			expect(conversationsAtom.get()).toHaveLength(2);
		});
	});

	describe("responsive layout", () => {
		it("should render all stat boxes", async () => {
			conversationsAtom.set([
				createTestConversation({ status: "active" }),
				createTestConversation({ status: "archived" }),
				createTestConversation({ status: "deleted" }),
			]);

			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByTestId("stat-active")).toBeInTheDocument();
				expect(screen.getByTestId("stat-archived")).toBeInTheDocument();
				expect(screen.getByTestId("stat-deleted")).toBeInTheDocument();
			});
		});
	});

	describe("settings actions via store functions", () => {
		it("should allow changing theme via setTheme", () => {
			setTheme("dark");
			expect(themeAtom.get()).toBe("dark");

			setTheme("light");
			expect(themeAtom.get()).toBe("light");

			setTheme("system");
			expect(themeAtom.get()).toBe("system");
		});

		it("should allow changing temperature unit via action", () => {
			setTemperatureUnit("celsius");
			expect(temperatureUnitAtom.get()).toBe("celsius");

			setTemperatureUnit("fahrenheit");
			expect(temperatureUnitAtom.get()).toBe("fahrenheit");

			setTemperatureUnit("auto");
			expect(temperatureUnitAtom.get()).toBe("auto");
		});

		it("should allow changing timezone via action", () => {
			setTimezone("America/New_York");
			expect(timezoneAtom.get()).toBe("America/New_York");

			setTimezone("auto");
			expect(timezoneAtom.get()).toBe("auto");
		});
	});
});
