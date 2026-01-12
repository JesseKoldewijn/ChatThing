import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock nanostores
vi.mock("@nanostores/react", () => ({
	useStore: vi.fn((atom) => {
		if (atom === conversationsAtom) return mockConversations;
		if (atom === activeConversationIdAtom) return mockActiveId;
		return atom.get?.() ?? null;
	}),
}));

vi.mock("@/lib/stores/conversations", () => ({
	conversationsAtom: { get: () => [] },
	activeConversationIdAtom: { get: () => null },
}));

import { ChatHeader } from "./ChatHeader";
import { conversationsAtom, activeConversationIdAtom } from "@/lib/stores/conversations";
import { useStore } from "@nanostores/react";

let mockConversations: Array<{ id: string; title: string }> = [];
let mockActiveId: string | null = null;

describe("ChatHeader", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockConversations = [];
		mockActiveId = null;
	});

	describe("rendering", () => {
		it("should render the menu button", () => {
			render(<ChatHeader onMenuClick={vi.fn()} />);

			const buttons = screen.getAllByRole("button");
			expect(buttons.length).toBeGreaterThanOrEqual(1);
		});

		it("should render default title when no active conversation", () => {
			render(<ChatHeader onMenuClick={vi.fn()} />);

			expect(screen.getByText("New Chat")).toBeInTheDocument();
		});

		it("should render conversation title when active", () => {
			mockConversations = [{ id: "conv-1", title: "My Conversation" }];
			mockActiveId = "conv-1";

			// Update the mock return value
			vi.mocked(useStore).mockImplementation((atom) => {
				if (atom === conversationsAtom) return mockConversations;
				if (atom === activeConversationIdAtom) return mockActiveId;
				return null;
			});

			render(<ChatHeader onMenuClick={vi.fn()} />);

			expect(screen.getByText("My Conversation")).toBeInTheDocument();
		});

		it("should render sparkle icon", () => {
			render(<ChatHeader onMenuClick={vi.fn()} />);

			// The icon container should have the gradient background class
			const iconContainer = document.querySelector(".from-primary");
			expect(iconContainer).toBeInTheDocument();
		});
	});

	describe("interactions", () => {
		it("should call onMenuClick when menu button is clicked", () => {
			const onMenuClick = vi.fn();
			render(<ChatHeader onMenuClick={onMenuClick} />);

			const menuButton = screen.getAllByRole("button")[0];
			fireEvent.click(menuButton);

			expect(onMenuClick).toHaveBeenCalledTimes(1);
		});
	});

	describe("sidebar open state", () => {
		it("should indicate sidebar closed when isSidebarOpen is false", () => {
			render(<ChatHeader onMenuClick={vi.fn()} isSidebarOpen={false} />);

			// Button should still render
			expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1);
		});

		it("should indicate sidebar open when isSidebarOpen is true", () => {
			render(<ChatHeader onMenuClick={vi.fn()} isSidebarOpen={true} />);

			// Button should still render
			expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1);
		});
	});

	describe("accessibility", () => {
		it("should have proper heading structure", () => {
			render(<ChatHeader onMenuClick={vi.fn()} />);

			const heading = screen.getByRole("heading", { level: 1 });
			expect(heading).toBeInTheDocument();
		});
	});
});

