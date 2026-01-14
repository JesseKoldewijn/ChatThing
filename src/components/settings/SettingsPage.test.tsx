import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock navigation hook
vi.mock("@/lib/hooks/useNavigation", () => ({
	useNavigation: () => ({
		goBack: vi.fn(),
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

import {
	appearanceAtom,
	experimentsAtom,
	masterPasswordAtom,
	outputLanguageAtom,
	temperatureUnitAtom,
	themeAtom,
	timezoneAtom,
} from "@/lib/stores/settings";
// Import after mocks
import { SettingsPage } from "./SettingsPage";

describe("SettingsPage", () => {
	beforeEach(() => {
		// Reset settings to defaults
		appearanceAtom.set("system");
		themeAtom.set("default");
		temperatureUnitAtom.set("auto");
		timezoneAtom.set("auto");
		outputLanguageAtom.set("en");
		experimentsAtom.set({});
		masterPasswordAtom.set(null);
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

		it("should change appearance when clicked", async () => {
			const { appearanceAtom } = await import("@/lib/stores/settings");
			const user = (
				await import("@testing-library/user-event")
			).default.setup();

			render(<SettingsPage />);

			const darkButton = await screen.findByTestId("appearance-button-dark");
			await user.click(darkButton);

			expect(appearanceAtom.get()).toBe("dark");
		});
	});

	describe("experiments settings", () => {
		it("should display experiments section", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByText("Experiments")).toBeInTheDocument();
				expect(screen.getByLabelText("AI Tools")).toBeInTheDocument();
			});
		});

		it("should toggle AI Tools experiment", async () => {
			const { experimentsAtom } = await import("@/lib/stores/settings");
			const user = (
				await import("@testing-library/user-event")
			).default.setup();

			render(<SettingsPage />);

			const toggle = await screen.findByTestId("exp-tools-toggle");
			await user.click(toggle);

			expect(experimentsAtom.get().tools).toBe(true);
		});
	});

	describe("provider settings", () => {
		it("should display provider selection", async () => {
			render(<SettingsPage />);

			await waitFor(() => {
				expect(screen.getByText(/ai provider/i)).toBeInTheDocument();
			});
		});

		it("should show API key fields for cloud providers when unlocked", async () => {
			const { providerTypeAtom, masterPasswordAtom } =
				await import("@/lib/stores/settings");
			providerTypeAtom.set("google");
			masterPasswordAtom.set("test-password");

			render(<SettingsPage />);

			await waitFor(() => {
				expect(
					screen.getByPlaceholderText(/Enter Gemini API Key/i),
				).toBeInTheDocument();
			});
		});

		it("should show unlock warning when cloud provider is selected and locked", async () => {
			const { providerTypeAtom, masterPasswordAtom } =
				await import("@/lib/stores/settings");
			providerTypeAtom.set("google");
			masterPasswordAtom.set(null);

			render(<SettingsPage />);

			await waitFor(() => {
				expect(
					screen.getByText(/Master Password Required/i),
				).toBeInTheDocument();
				expect(
					screen.getByPlaceholderText(/Set master password to enter key/i),
				).toBeInTheDocument();
			});
		});

		it("should switch providers when clicked", async () => {
			const { providerTypeAtom } = await import("@/lib/stores/settings");
			const user = (
				await import("@testing-library/user-event")
			).default.setup();

			render(<SettingsPage />);

			const googleButton = await screen.findByTestId("provider-button-google");
			await user.click(googleButton);

			expect(providerTypeAtom.get()).toBe("google");
		});
	});

	describe("auto-archive settings", () => {
		it("should show auto-archive settings", async () => {
			render(<SettingsPage />);
			expect(
				screen.getByText(/auto-archive inactive chats/i),
			).toBeInTheDocument();
		});

		it("should toggle auto-archive", async () => {
			const { archiveThresholdAtom } = await import("@/lib/stores/settings");
			const user = (
				await import("@testing-library/user-event")
			).default.setup();

			// Start with disabled
			archiveThresholdAtom.set({ value: 0, unit: "days" });

			render(<SettingsPage />);

			const toggle = await screen.findByTestId("auto-archive-toggle");
			await user.click(toggle);

			expect(archiveThresholdAtom.get().value).toBe(2);
		});
	});

	describe("danger zone", () => {
		it("should show danger zone", async () => {
			render(<SettingsPage />);
			expect(screen.getByText(/danger zone/i)).toBeInTheDocument();
		});

		it("should have a delete all button", async () => {
			render(<SettingsPage />);
			expect(screen.getByTestId("delete-all-button")).toBeInTheDocument();
		});
	});
});
