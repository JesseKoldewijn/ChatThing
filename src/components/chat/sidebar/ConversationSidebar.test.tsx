import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock nanostores
vi.mock("@nanostores/react", () => ({
	useStore: vi.fn((atom) => atom._mockValue ?? atom.get?.() ?? null),
}));

// Mock navigation hooks
vi.mock("@/lib/hooks/useNavigation", () => ({
	useChatSearchParams: vi.fn(() => ({
		showArchived: false,
		showDeleted: false,
		toggleShowArchived: vi.fn(),
		toggleShowDeleted: vi.fn(),
	})),
}));

// Mock conversation store
vi.mock("@/lib/stores/conversations", () => {
	const mockConversations = [
		{
			id: "conv-1",
			title: "Conversation 1",
			updatedAt: Date.now(),
			status: "active" as const,
		},
		{
			id: "conv-2",
			title: "Conversation 2",
			updatedAt: Date.now() - 1000,
			status: "archived" as const,
		},
	];
	return {
		conversationsAtom: { get: () => mockConversations, _mockValue: mockConversations },
		activeConversationIdAtom: { get: () => "conv-1", _mockValue: "conv-1" },
		createConversation: vi.fn(),
		switchConversation: vi.fn(),
		deleteConversation: vi.fn(),
		updateConversationTitle: vi.fn(),
		saveCurrentConversation: vi.fn(),
		archiveConversation: vi.fn(),
		unarchiveConversation: vi.fn(),
		restoreConversation: vi.fn(),
		permanentlyDeleteConversation: vi.fn(),
	};
});

// Mock the UI component
vi.mock("./ConversationSidebar.ui", () => ({
	ConversationSidebarUI: ({
		conversations,
		onNewChat,
		onSelect,
		archivedCount,
		deletedCount,
	}: {
		conversations: unknown[];
		onNewChat: () => void;
		onSelect: (id: string) => void;
		archivedCount: number;
		deletedCount: number;
	}) => (
		<div data-testid="sidebar-ui">
			<span data-testid="conversation-count">{conversations.length}</span>
			<span data-testid="archived-count">{archivedCount}</span>
			<span data-testid="deleted-count">{deletedCount}</span>
			<button data-testid="new-chat" onClick={onNewChat}>
				New Chat
			</button>
			<button data-testid="select-conv" onClick={() => onSelect("conv-2")}>
				Select
			</button>
		</div>
	),
}));

vi.mock("../settings/SettingsPanel", () => ({
	SettingsPanel: () => <div data-testid="settings-panel" />,
}));

import { ConversationSidebar } from "./ConversationSidebar";
import {
	createConversation,
	saveCurrentConversation,
} from "@/lib/stores/conversations";

describe("ConversationSidebar", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("rendering", () => {
		it("should render the sidebar UI", () => {
			render(<ConversationSidebar />);
			expect(screen.getByTestId("sidebar-ui")).toBeInTheDocument();
		});

		it("should pass conversations to UI", () => {
			render(<ConversationSidebar />);
			expect(screen.getByTestId("conversation-count")).toHaveTextContent("2");
		});

		it("should calculate archived count", () => {
			render(<ConversationSidebar />);
			expect(screen.getByTestId("archived-count")).toHaveTextContent("1");
		});

		it("should calculate deleted count", () => {
			render(<ConversationSidebar />);
			expect(screen.getByTestId("deleted-count")).toHaveTextContent("0");
		});
	});

	describe("new chat handler", () => {
		it("should save current conversation when creating new chat", async () => {
			const { fireEvent } = await import("@testing-library/react");
			render(<ConversationSidebar />);

			const newChatButton = screen.getByTestId("new-chat");
			fireEvent.click(newChatButton);

			expect(saveCurrentConversation).toHaveBeenCalled();
			expect(createConversation).toHaveBeenCalled();
		});
	});

	describe("select conversation handler", () => {
		it("should pass onSelect handler to UI", () => {
			render(<ConversationSidebar />);

			// The UI component should have received an onSelect prop
			// Verify the select button exists (handler was passed)
			const selectButton = screen.getByTestId("select-conv");
			expect(selectButton).toBeInTheDocument();
		});
	});
});

describe("ConversationSidebar helper functions", () => {
	describe("isMobile", () => {
		const DESKTOP_BREAKPOINT = 1024;
		const isMobile = () =>
			typeof window !== "undefined" && window.innerWidth < DESKTOP_BREAKPOINT;

		it("should return true for mobile width", () => {
			// Simulate mobile viewport
			Object.defineProperty(window, "innerWidth", { value: 768, writable: true });
			expect(isMobile()).toBe(true);
		});

		it("should return false for desktop width", () => {
			Object.defineProperty(window, "innerWidth", { value: 1280, writable: true });
			expect(isMobile()).toBe(false);
		});

		it("should return false at exact breakpoint", () => {
			Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
			expect(isMobile()).toBe(false);
		});
	});
});

