import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SettingsPanel } from "./SettingsPanel";
import { SettingsPanelUI } from "./SettingsPanel.ui";

// Mock navigation hook
const mockGoToSettings = vi.fn();
const mockGoToUsage = vi.fn();

vi.mock("@/lib/hooks/useNavigation", () => ({
	useNavigation: () => ({
		goToSettings: mockGoToSettings,
		goToUsage: mockGoToUsage,
		goToChat: vi.fn(),
		goBack: vi.fn(),
		navigate: vi.fn(),
	}),
}));

describe("SettingsPanel", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("rendering", () => {
		it("should render the settings button", () => {
			render(<SettingsPanel />);

			expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument();
		});

		it("should render the usage button", () => {
			render(<SettingsPanel />);

			expect(screen.getByRole("button", { name: /usage/i })).toBeInTheDocument();
		});

		it("should render both buttons", () => {
			render(<SettingsPanel />);

			const buttons = screen.getAllByRole("button");
			expect(buttons).toHaveLength(2);
		});
	});

	describe("interactions", () => {
		it("should call goToSettings when settings button is clicked", async () => {
			const user = userEvent.setup();
			render(<SettingsPanel />);

			const settingsButton = screen.getByRole("button", { name: /settings/i });
			await user.click(settingsButton);

			expect(mockGoToSettings).toHaveBeenCalledTimes(1);
		});

		it("should call goToUsage when usage button is clicked", async () => {
			const user = userEvent.setup();
			render(<SettingsPanel />);

			const usageButton = screen.getByRole("button", { name: /usage/i });
			await user.click(usageButton);

			expect(mockGoToUsage).toHaveBeenCalledTimes(1);
		});

		it("should not call wrong handler when button is clicked", async () => {
			const user = userEvent.setup();
			render(<SettingsPanel />);

			await user.click(screen.getByRole("button", { name: /settings/i }));
			expect(mockGoToUsage).not.toHaveBeenCalled();

			vi.clearAllMocks();

			await user.click(screen.getByRole("button", { name: /usage/i }));
			expect(mockGoToSettings).not.toHaveBeenCalled();
		});
	});
});

describe("SettingsPanelUI", () => {
	describe("rendering", () => {
		it("should render with required props", () => {
			const mockProps = {
				onOpenSettings: vi.fn(),
				onOpenUsage: vi.fn(),
			};

			render(<SettingsPanelUI {...mockProps} />);

			expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: /usage/i })).toBeInTheDocument();
		});

		it("should render icons", () => {
			const mockProps = {
				onOpenSettings: vi.fn(),
				onOpenUsage: vi.fn(),
			};

			render(<SettingsPanelUI {...mockProps} />);

			// The icons are rendered as SVGs inside the buttons
			const buttons = screen.getAllByRole("button");
			expect(buttons[0].querySelector("svg")).toBeInTheDocument();
			expect(buttons[1].querySelector("svg")).toBeInTheDocument();
		});
	});

	describe("callbacks", () => {
		it("should call onOpenSettings callback", async () => {
			const user = userEvent.setup();
			const onOpenSettings = vi.fn();
			const onOpenUsage = vi.fn();

			render(
				<SettingsPanelUI
					onOpenSettings={onOpenSettings}
					onOpenUsage={onOpenUsage}
				/>
			);

			await user.click(screen.getByRole("button", { name: /settings/i }));

			expect(onOpenSettings).toHaveBeenCalledTimes(1);
			expect(onOpenUsage).not.toHaveBeenCalled();
		});

		it("should call onOpenUsage callback", async () => {
			const user = userEvent.setup();
			const onOpenSettings = vi.fn();
			const onOpenUsage = vi.fn();

			render(
				<SettingsPanelUI
					onOpenSettings={onOpenSettings}
					onOpenUsage={onOpenUsage}
				/>
			);

			await user.click(screen.getByRole("button", { name: /usage/i }));

			expect(onOpenUsage).toHaveBeenCalledTimes(1);
			expect(onOpenSettings).not.toHaveBeenCalled();
		});
	});

	describe("styling", () => {
		it("should have properly styled buttons", () => {
			const mockProps = {
				onOpenSettings: vi.fn(),
				onOpenUsage: vi.fn(),
			};

			render(<SettingsPanelUI {...mockProps} />);

			const buttons = screen.getAllByRole("button");
			// Buttons should be rendered
			expect(buttons.length).toBe(2);
		});

		it("should have full width buttons", () => {
			const mockProps = {
				onOpenSettings: vi.fn(),
				onOpenUsage: vi.fn(),
			};

			render(<SettingsPanelUI {...mockProps} />);

			const buttons = screen.getAllByRole("button");
			buttons.forEach((button) => {
				expect(button.className).toContain("w-full");
			});
		});
	});
});
