import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Route } from "./usage";

// Mock UsagePage since it's already tested
vi.mock("@/components/usage/UsagePage", () => ({
	UsagePage: () => <div data-testid="usage-page">Usage Page</div>,
}));

describe("Usage Route", () => {
	it("should render UsagePage", () => {
		const Component = Route.options.component || (Route as unknown as { component?: typeof Route.options.component }).component;
		if (!Component) {
			throw new Error("Component not found");
		}
		render(<Component />);
		expect(screen.getByTestId("usage-page")).toBeInTheDocument();
	});
});

