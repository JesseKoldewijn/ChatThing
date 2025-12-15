import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Route } from "./settings";

// Mock SettingsPage since it's already tested
vi.mock("@/components/settings/SettingsPage", () => ({
	SettingsPage: () => <div data-testid="settings-page">Settings Page</div>,
}));

describe("Settings Route", () => {
	it("should render SettingsPage", () => {
		const Component = Route.options.component || (Route as unknown as { component?: typeof Route.options.component }).component;
		if (!Component) {
			throw new Error("Component not found");
		}
		render(<Component />);
		expect(screen.getByTestId("settings-page")).toBeInTheDocument();
	});
});

