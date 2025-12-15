import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Route } from "./index";

// Mock ChatContainer since it's already tested
vi.mock("@/components/chat/container/ChatContainer", () => ({
	ChatContainer: () => <div data-testid="chat-container">Chat Container</div>,
}));

describe("Index Route", () => {
	it("should render ChatContainer", () => {
		// Route.component is the component function
		const Component = Route.options.component || (Route as unknown as { component?: typeof Route.options.component }).component;
		if (!Component) {
			throw new Error("Component not found");
		}
		render(<Component />);
		expect(screen.getByTestId("chat-container")).toBeInTheDocument();
	});

	it("should validate search params correctly", () => {
		const validateSearch = Route.options.validateSearch || (Route as unknown as { validateSearch?: typeof Route.options.validateSearch }).validateSearch;
		if (!validateSearch) {
			throw new Error("validateSearch not found");
		}

		expect(validateSearch({})).toEqual({
			chat: undefined,
			sidebar: false,
			archived: false,
			deleted: false,
			forceCompat: false,
		});

		expect(validateSearch({ chat: "conv-1" })).toEqual({
			chat: "conv-1",
			sidebar: false,
			archived: false,
			deleted: false,
			forceCompat: false,
		});

		expect(validateSearch({ sidebar: true })).toEqual({
			chat: undefined,
			sidebar: true,
			archived: false,
			deleted: false,
			forceCompat: false,
		});

		expect(validateSearch({ sidebar: "true" })).toEqual({
			chat: undefined,
			sidebar: true,
			archived: false,
			deleted: false,
			forceCompat: false,
		});

		expect(validateSearch({ archived: true, deleted: "true" })).toEqual({
			chat: undefined,
			sidebar: false,
			archived: true,
			deleted: true,
			forceCompat: false,
		});

		expect(validateSearch({ forceCompat: true })).toEqual({
			chat: undefined,
			sidebar: false,
			archived: false,
			deleted: false,
			forceCompat: true,
		});
	});
});

