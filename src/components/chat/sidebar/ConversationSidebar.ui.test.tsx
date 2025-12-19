import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConversationSidebarUI, type ConversationItem } from "./ConversationSidebar.ui";

const createMockConversation = (
	overrides: Partial<ConversationItem> = {}
): ConversationItem => ({
	id: `conv-${Math.random().toString(36).slice(2)}`,
	title: "Test Conversation",
	updatedAt: Date.now(),
	isActive: false,
	status: "active",
	...overrides,
});

describe("ConversationSidebarUI", () => {
	const user = userEvent.setup();

	const defaultProps = {
		conversations: [] as ConversationItem[],
		onNewChat: vi.fn(),
		onSelectConversation: vi.fn(),
	onDeleteConversation: vi.fn(),
	onRenameConversation: vi.fn(),
	onRegenerateTitle: vi.fn(),
	onArchiveConversation: vi.fn(),
		onUnarchiveConversation: vi.fn(),
		onRestoreConversation: vi.fn(),
		onClose: vi.fn(),
		settingsButton: null,
		showArchived: false,
		showDeleted: false,
		onToggleArchived: vi.fn(),
		onToggleDeleted: vi.fn(),
		archivedCount: 0,
		deletedCount: 0,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("empty state", () => {
		it("should show empty state when no conversations", () => {
			render(<ConversationSidebarUI {...defaultProps} />);

			expect(screen.getByText(/no conversations yet/i)).toBeInTheDocument();
		});
	});

	describe("header", () => {
		it("should render sidebar title", () => {
			render(<ConversationSidebarUI {...defaultProps} />);

			expect(screen.getByTestId("sidebar-title")).toHaveTextContent("Chats");
		});

		it("should call onNewChat when new chat button is clicked", async () => {
			render(<ConversationSidebarUI {...defaultProps} />);

			await user.click(screen.getByTestId("new-chat-button"));

			expect(defaultProps.onNewChat).toHaveBeenCalledTimes(1);
		});

		it("should call onClose when close button is clicked", async () => {
			render(<ConversationSidebarUI {...defaultProps} />);

			await user.click(screen.getByTestId("close-sidebar-button"));

			expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
		});
	});

	describe("conversation items", () => {
		it("should render active conversations", () => {
			const conversations = [
				createMockConversation({ id: "conv-1", title: "First Chat" }),
				createMockConversation({ id: "conv-2", title: "Second Chat" }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			expect(screen.getByTestId("conversation-item-conv-1")).toBeInTheDocument();
			expect(screen.getByTestId("conversation-item-conv-2")).toBeInTheDocument();
		});

		it("should call onSelectConversation when conversation is clicked", async () => {
			const conversations = [
				createMockConversation({ id: "conv-1", title: "First Chat" }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			await user.click(screen.getByTestId("conversation-item-conv-1"));

			expect(defaultProps.onSelectConversation).toHaveBeenCalledWith("conv-1");
		});

		it("should highlight active conversation", () => {
			const conversations = [
				createMockConversation({ id: "conv-1", isActive: true }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			const item = screen.getByTestId("conversation-item-conv-1");
			expect(item).toHaveClass("bg-sidebar-accent");
		});

		it("should show generating title state", () => {
			const conversations = [
				createMockConversation({ id: "conv-1", isGeneratingTitle: true }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			expect(screen.getByText(/generating title/i)).toBeInTheDocument();
		});
	});

	describe("conversation actions - active conversations", () => {
		it("should call onRenameConversation from dropdown", async () => {
			const conversations = [
				createMockConversation({ id: "conv-1", title: "Chat" }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			// Open dropdown
			await user.click(screen.getByTestId("conversation-menu-conv-1"));

			// Wait for dropdown to open
			await waitFor(() => {
				expect(screen.getByTestId("conversation-rename-conv-1")).toBeInTheDocument();
			});

			await user.click(screen.getByTestId("conversation-rename-conv-1"));

			expect(defaultProps.onRenameConversation).toHaveBeenCalledWith("conv-1");
		});

		it("should call onArchiveConversation from dropdown", async () => {
			const conversations = [
				createMockConversation({ id: "conv-1", title: "Chat" }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			await user.click(screen.getByTestId("conversation-menu-conv-1"));

			await waitFor(() => {
				expect(screen.getByTestId("conversation-archive-conv-1")).toBeInTheDocument();
			});

			await user.click(screen.getByTestId("conversation-archive-conv-1"));

			expect(defaultProps.onArchiveConversation).toHaveBeenCalledWith("conv-1");
		});

		it("should call onDeleteConversation from dropdown", async () => {
			const conversations = [
				createMockConversation({ id: "conv-1", title: "Chat" }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			await user.click(screen.getByTestId("conversation-menu-conv-1"));

			await waitFor(() => {
				expect(screen.getByTestId("conversation-delete-conv-1")).toBeInTheDocument();
			});

			await user.click(screen.getByTestId("conversation-delete-conv-1"));

			expect(defaultProps.onDeleteConversation).toHaveBeenCalledWith("conv-1");
		});
	});

	describe("archived conversations", () => {
		it("should show archived section when archivedCount > 0", () => {
			render(
				<ConversationSidebarUI {...defaultProps} archivedCount={3} />
			);

			expect(screen.getByTestId("section-toggle-archived")).toBeInTheDocument();
		});

		it("should not show archived section when archivedCount is 0", () => {
			render(
				<ConversationSidebarUI {...defaultProps} archivedCount={0} />
			);

			expect(screen.queryByTestId("section-toggle-archived")).not.toBeInTheDocument();
		});

		it("should toggle archived section when clicked", async () => {
			render(
				<ConversationSidebarUI {...defaultProps} archivedCount={2} />
			);

			await user.click(screen.getByTestId("section-toggle-archived"));

			expect(defaultProps.onToggleArchived).toHaveBeenCalledTimes(1);
		});

		it("should show archived conversations when showArchived is true", () => {
			const conversations = [
				createMockConversation({ id: "archived-1", status: "archived" }),
			];

			render(
				<ConversationSidebarUI
					{...defaultProps}
					conversations={conversations}
					archivedCount={1}
					showArchived={true}
				/>
			);

			expect(screen.getByTestId("conversation-item-archived-1")).toBeInTheDocument();
		});

		it("should call onUnarchiveConversation for archived items", async () => {
			const conversations = [
				createMockConversation({ id: "archived-1", status: "archived" }),
			];

			render(
				<ConversationSidebarUI
					{...defaultProps}
					conversations={conversations}
					archivedCount={1}
					showArchived={true}
				/>
			);

			await user.click(screen.getByTestId("conversation-menu-archived-1"));

			await waitFor(() => {
				expect(screen.getByTestId("conversation-unarchive-archived-1")).toBeInTheDocument();
			});

			await user.click(screen.getByTestId("conversation-unarchive-archived-1"));

			expect(defaultProps.onUnarchiveConversation).toHaveBeenCalledWith("archived-1");
		});
	});

	describe("deleted conversations", () => {
		it("should show deleted section when deletedCount > 0", () => {
			render(
				<ConversationSidebarUI {...defaultProps} deletedCount={2} />
			);

			expect(screen.getByTestId("section-toggle-deleted")).toBeInTheDocument();
		});

		it("should toggle deleted section when clicked", async () => {
			render(
				<ConversationSidebarUI {...defaultProps} deletedCount={1} />
			);

			await user.click(screen.getByTestId("section-toggle-deleted"));

			expect(defaultProps.onToggleDeleted).toHaveBeenCalledTimes(1);
		});

		it("should show deleted conversations when showDeleted is true", () => {
			const conversations = [
				createMockConversation({ id: "deleted-1", status: "deleted" }),
			];

			render(
				<ConversationSidebarUI
					{...defaultProps}
					conversations={conversations}
					deletedCount={1}
					showDeleted={true}
				/>
			);

			expect(screen.getByTestId("conversation-item-deleted-1")).toBeInTheDocument();
		});

		it("should call onRestoreConversation for deleted items", async () => {
			const conversations = [
				createMockConversation({ id: "deleted-1", status: "deleted" }),
			];

			render(
				<ConversationSidebarUI
					{...defaultProps}
					conversations={conversations}
					deletedCount={1}
					showDeleted={true}
				/>
			);

			await user.click(screen.getByTestId("conversation-menu-deleted-1"));

			await waitFor(() => {
				expect(screen.getByTestId("conversation-restore-deleted-1")).toBeInTheDocument();
			});

			await user.click(screen.getByTestId("conversation-restore-deleted-1"));

			expect(defaultProps.onRestoreConversation).toHaveBeenCalledWith("deleted-1");
		});
	});

	describe("date formatting", () => {
		it("should show 'Today' for conversations updated today", () => {
			const conversations = [
				createMockConversation({ id: "conv-1", updatedAt: Date.now() }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			expect(screen.getByText("Today")).toBeInTheDocument();
		});

		it("should show 'Yesterday' for conversations updated yesterday", () => {
			const yesterday = Date.now() - 24 * 60 * 60 * 1000;
			const conversations = [
				createMockConversation({ id: "conv-1", updatedAt: yesterday }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			expect(screen.getByText("Yesterday")).toBeInTheDocument();
		});

		it("should show 'X days ago' for recent conversations", () => {
			const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
			const conversations = [
				createMockConversation({ id: "conv-1", updatedAt: threeDaysAgo }),
			];

			render(
				<ConversationSidebarUI {...defaultProps} conversations={conversations} />
			);

			expect(screen.getByText("3 days ago")).toBeInTheDocument();
		});
	});

	describe("settings button", () => {
		it("should render settings button when provided", () => {
			render(
				<ConversationSidebarUI
					{...defaultProps}
					settingsButton={<button data-testid="settings-btn">Settings</button>}
				/>
			);

			expect(screen.getByTestId("settings-btn")).toBeInTheDocument();
		});
	});
});
