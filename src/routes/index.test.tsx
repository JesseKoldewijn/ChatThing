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
		const validateSearchRaw = Route.options.validateSearch || (Route as unknown as { validateSearch?: typeof Route.options.validateSearch }).validateSearch;
		if (!validateSearchRaw || typeof validateSearchRaw !== "function") {
			throw new Error("validateSearch not found");
		}
		const validateSearch = validateSearchRaw as (search: Record<string, unknown>) => {
			chat?: string;
			sidebar?: boolean;
			archived?: boolean;
			deleted?: boolean;
			forceCompat?: boolean;
		};

		expect(validateSearch({})).toEqual({
			chat: undefined,
			sidebar: undefined,
			archived: undefined,
			deleted: undefined,
			forceCompat: undefined,
		});

		expect(validateSearch({ chat: "conv-1" })).toEqual({
			chat: "conv-1",
			sidebar: undefined,
			archived: undefined,
			deleted: undefined,
			forceCompat: undefined,
		});

		expect(validateSearch({ sidebar: true })).toEqual({
			chat: undefined,
			sidebar: true,
			archived: undefined,
			deleted: undefined,
			forceCompat: undefined,
		});

		expect(validateSearch({ sidebar: "true" })).toEqual({
			chat: undefined,
			sidebar: true,
			archived: undefined,
			deleted: undefined,
			forceCompat: undefined,
		});

		expect(validateSearch({ archived: true, deleted: "true" })).toEqual({
			chat: undefined,
			sidebar: undefined,
			archived: true,
			deleted: true,
			forceCompat: undefined,
		});

		expect(validateSearch({ forceCompat: true })).toEqual({
			chat: undefined,
			sidebar: undefined,
			archived: undefined,
			deleted: undefined,
			forceCompat: true,
		});

		// When params are explicitly set to false, they should return false
		expect(validateSearch({ sidebar: false })).toEqual({
			chat: undefined,
			sidebar: false,
			archived: undefined,
			deleted: undefined,
			forceCompat: undefined,
		});

		expect(validateSearch({ sidebar: "false" })).toEqual({
			chat: undefined,
			sidebar: false,
			archived: undefined,
			deleted: undefined,
			forceCompat: undefined,
		});
	});
});

