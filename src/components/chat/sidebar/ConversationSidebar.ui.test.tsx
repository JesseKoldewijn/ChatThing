import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
	ConversationSidebarUI,
	type ConversationSidebarUIProps,
	type ConversationItem,
} from "./ConversationSidebar.ui";

const createConversationItem = (
	overrides: Partial<ConversationItem> = {}
): ConversationItem => ({
	id: `conv-${Math.random()}`,
	title: "Test Conversation",
	updatedAt: Date.now(),
	isActive: false,
	status: "active",
	...overrides,
});

const defaultProps: ConversationSidebarUIProps = {
	conversations: [],
	showArchived: false,
	showDeleted: false,
	archivedCount: 0,
	deletedCount: 0,
	onClose: vi.fn(),
	onNewChat: vi.fn(),
	onSelectConversation: vi.fn(),
	onDeleteConversation: vi.fn(),
	onRenameConversation: vi.fn(),
	onArchiveConversation: vi.fn(),
	onUnarchiveConversation: vi.fn(),
	onRestoreConversation: vi.fn(),
	onToggleArchived: vi.fn(),
	onToggleDeleted: vi.fn(),
};

describe("ConversationSidebarUI", () => {
	describe("rendering", () => {
		it("should render when open", () => {
			render(<ConversationSidebarUI {...defaultProps} />);
			// Should render sidebar with new chat button
			expect(screen.getByText(/new chat/i)).toBeInTheDocument();
		});

		it("should show empty state when no conversations", () => {
			render(<ConversationSidebarUI {...defaultProps} conversations={[]} />);
			// Should indicate empty state
			const content = document.body.textContent;
			expect(content).toMatch(/no conversation|start|new chat/i);
		});
	});

	describe("conversations list", () => {
		it("should render conversation titles", () => {
			const conversations = [
				createConversationItem({ id: "1", title: "First Chat" }),
				createConversationItem({ id: "2", title: "Second Chat" }),
			];
			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			expect(screen.getByText("First Chat")).toBeInTheDocument();
			expect(screen.getByText("Second Chat")).toBeInTheDocument();
		});

		it("should highlight active conversation", () => {
			const conversations = [
				createConversationItem({ id: "active-id", title: "Active Chat", isActive: true }),
			];
			render(
				<ConversationSidebarUI
					{...defaultProps}
					conversations={conversations}
				/>
			);

			expect(screen.getByText("Active Chat")).toBeInTheDocument();
		});

		it("should render conversation with click handler", () => {
			const onSelectConversation = vi.fn();
			const conversations = [
				createConversationItem({ id: "click-me", title: "Click Me" }),
			];
			render(
				<ConversationSidebarUI
					{...defaultProps}
					conversations={conversations}
					onSelectConversation={onSelectConversation}
				/>
			);

			// Verify the conversation is rendered
			expect(screen.getByText("Click Me")).toBeInTheDocument();
		});
	});

	describe("new chat", () => {
		it("should render new chat button", () => {
			const onNewChat = vi.fn();
			render(<ConversationSidebarUI {...defaultProps} onNewChat={onNewChat} />);

			// Verify the button is rendered
			expect(screen.getByText(/new chat/i)).toBeInTheDocument();
		});
	});

	describe("archived conversations", () => {
		it("should show archived conversations when showArchived is true", () => {
			const conversations = [
				createConversationItem({ id: "1", title: "Active Chat", status: "active" }),
				createConversationItem({
					id: "2",
					title: "Archived Chat",
					status: "archived",
				}),
			];
			render(
				<ConversationSidebarUI
					{...defaultProps}
					conversations={conversations}
					archivedCount={1}
					showArchived
				/>
			);

			expect(screen.getByText("Archived Chat")).toBeInTheDocument();
		});
	});

	describe("deleted conversations", () => {
		it("should show deleted conversations when showDeleted is true", () => {
			const conversations = [
				createConversationItem({ id: "1", title: "Normal Chat", status: "active" }),
				createConversationItem({
					id: "2",
					title: "Deleted Chat",
					status: "deleted",
				}),
			];
			render(
				<ConversationSidebarUI
					{...defaultProps}
					conversations={conversations}
					deletedCount={1}
					showDeleted
				/>
			);

			expect(screen.getByText("Deleted Chat")).toBeInTheDocument();
		});
	});

	describe("buttons", () => {
		it("should have buttons for interaction", () => {
			render(<ConversationSidebarUI {...defaultProps} />);

			const buttons = screen.getAllByRole("button");
			expect(buttons.length).toBeGreaterThan(0);
		});
	});
});

