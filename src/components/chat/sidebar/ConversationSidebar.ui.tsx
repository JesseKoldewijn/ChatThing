import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
	Plus,
	MessageSquare,
	MoreVertical,
	Trash2,
	Pencil,
	X,
	Loader2,
	Archive,
	ArchiveRestore,
	ChevronDown,
	ChevronRight,
	RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConversationStatus } from "@/lib/stores/conversations";

export interface ConversationItem {
	id: string;
	title: string;
	updatedAt: number;
	isActive: boolean;
	isGeneratingTitle?: boolean;
	status: ConversationStatus;
}

export interface ConversationSidebarUIProps {
	conversations: ConversationItem[];
	onNewChat: () => void;
	onSelectConversation: (id: string) => void;
	onDeleteConversation: (id: string) => void;
	onRenameConversation: (id: string) => void;
	onRegenerateTitle: (id: string) => void;
	onArchiveConversation: (id: string) => void;
	onUnarchiveConversation: (id: string) => void;
	onRestoreConversation: (id: string) => void;
	onClose?: () => void;
	settingsButton?: React.ReactNode;
	showArchived: boolean;
	showDeleted: boolean;
	onToggleArchived: () => void;
	onToggleDeleted: () => void;
	archivedCount: number;
	deletedCount: number;
}

export const ConversationSidebarUI = ({
	conversations,
	onNewChat,
	onSelectConversation,
	onDeleteConversation,
	onRenameConversation,
	onRegenerateTitle,
	onArchiveConversation,
	onUnarchiveConversation,
	onRestoreConversation,
	onClose,
	settingsButton,
	showArchived,
	showDeleted,
	onToggleArchived,
	onToggleDeleted,
	archivedCount,
	deletedCount,
}: ConversationSidebarUIProps) => {
	// Filter conversations by status
	const activeConversations = conversations.filter(
		(c) => c.status === "active"
	);
	const archivedConversations = conversations.filter(
		(c) => c.status === "archived"
	);
	const deletedConversations = conversations.filter(
		(c) => c.status === "deleted"
	);

	const renderSection = (
		title: string,
		items: ConversationItem[],
		isCollapsible: boolean,
		isOpen: boolean,
		onToggle: () => void,
		count: number,
		icon?: React.ReactNode
	) => {
		if (!isCollapsible && items.length === 0) {
			return null;
		}

		if (isCollapsible && count === 0) {
			return null;
		}

		return (
			<div className="mb-1">
				{isCollapsible ? (
					<button
						data-testid={`section-toggle-${title.toLowerCase()}`}
						onClick={onToggle}
						aria-expanded={isOpen}
						className="flex w-full items-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors min-h-[44px]"
					>
						{isOpen ? (
							<ChevronDown className="h-4 w-4" />
						) : (
							<ChevronRight className="h-4 w-4" />
						)}
						{icon}
						<span>{title}</span>
						<span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px]">
							{count}
						</span>
					</button>
				) : (
					items.length > 0 && (
						<p className="px-3 py-2.5 text-xs font-medium text-muted-foreground">
							{title}
						</p>
					)
				)}

				{(!isCollapsible || isOpen) && (
					<div className="space-y-1">
						{items.map((c) => (
							<ConversationRow
								key={c.id}
								conversation={c}
								onSelect={onSelectConversation}
								onRename={onRenameConversation}
								onDelete={onDeleteConversation}
								onRegenerateTitle={onRegenerateTitle}
								onArchive={onArchiveConversation}
								onUnarchive={onUnarchiveConversation}
								onRestore={onRestoreConversation}
							/>
						))}
					</div>
				)}
			</div>
		);
	};

	const hasAnyConversations =
		activeConversations.length > 0 || archivedCount > 0 || deletedCount > 0;

	return (
		<div className="flex h-full flex-col">
			{/* Header */}
			<div className="flex h-14 items-center justify-between border-b px-3">
				<h2 data-testid="sidebar-title" className="font-semibold text-sidebar-foreground">Chats</h2>
				<div className="flex items-center gap-0.5">
					<Button
						data-testid="new-chat-button"
						variant="ghost"
						size="icon"
						onClick={onNewChat}
						className="h-10 w-10"
						aria-label="Start new chat"
					>
						<Plus className="h-5 w-5" />
					</Button>
					{onClose && (
						<Button
							data-testid="close-sidebar-button"
							variant="ghost"
							size="icon"
							onClick={onClose}
							className="h-10 w-10 lg:hidden"
							aria-label="Close sidebar"
						>
							<X className="h-5 w-5" />
						</Button>
					)}
				</div>
			</div>

			{/* Conversation list - flex-1 with min-h-0 enables scrolling in flex container */}
			<ScrollArea className="flex-1 min-h-0">
				<div className="p-2">
					{!hasAnyConversations ? (
						<div className="px-2 py-8 text-center text-sm text-muted-foreground">
							No conversations yet.
							<br />
							Start a new chat!
						</div>
					) : (
						<>
							{/* Active chats */}
							{renderSection(
								"Active",
								activeConversations,
								false,
								true,
								() => {},
								activeConversations.length
							)}

							{/* Archived chats */}
							{renderSection(
								"Archived",
								archivedConversations,
								true,
								showArchived,
								onToggleArchived,
								archivedCount,
								<Archive className="h-3 w-3" />
							)}

							{/* Deleted chats */}
							{renderSection(
								"Deleted",
								deletedConversations,
								true,
								showDeleted,
								onToggleDeleted,
								deletedCount,
								<Trash2 className="h-3 w-3" />
							)}
						</>
					)}
				</div>
			</ScrollArea>

			{/* Footer with settings */}
			{settingsButton && (
				<div className="border-t p-2">{settingsButton}</div>
			)}
		</div>
	);
};

/**
 * Sub-component for a single conversation row to handle its own date formatting
 * deterministicly between server and client.
 */
const ConversationRow = ({
	conversation,
	onSelect,
	onRename,
	onDelete,
	onRegenerateTitle,
	onArchive,
	onUnarchive,
	onRestore,
}: {
	conversation: ConversationItem;
	onSelect: (id: string) => void;
	onRename: (id: string) => void;
	onDelete: (id: string) => void;
	onRegenerateTitle: (id: string) => void;
	onArchive: (id: string) => void;
	onUnarchive: (id: string) => void;
	onRestore: (id: string) => void;
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [displayDate, setDisplayDate] = useState("");

	useEffect(() => {
		const date = new Date(conversation.updatedAt);
		const now = new Date();
		const diffDays = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
		);

		if (diffDays === 0) setDisplayDate("Today");
		else if (diffDays === 1) setDisplayDate("Yesterday");
		else if (diffDays < 7) setDisplayDate(`${diffDays} days ago`);
		else setDisplayDate(date.toLocaleDateString());
	}, [conversation.updatedAt]);

	const isArchived = conversation.status === "archived";
	const isDeleted = conversation.status === "deleted";

	return (
		<div
			data-testid={`conversation-item-${conversation.id}`}
			role="button"
			tabIndex={0}
			aria-current={conversation.isActive ? "true" : undefined}
			aria-label={`Conversation: ${conversation.title}`}
			className={cn(
				"group relative flex items-center rounded-lg px-3 py-3 cursor-pointer min-h-[52px] outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary focus-visible:ring-inset",
				"hover:bg-sidebar-accent active:bg-sidebar-accent",
				conversation.isActive && "bg-sidebar-accent",
				isDeleted && "opacity-60"
			)}
			onClick={() => !isMenuOpen && onSelect(conversation.id)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						if (!isMenuOpen) {
							onSelect(conversation.id);
						}
					}
				}}
		>
			<MessageSquare
				className={cn(
					"mr-2 h-4 w-4 shrink-0",
					isArchived
						? "text-amber-500"
						: isDeleted
						? "text-destructive"
						: "text-muted-foreground"
				)}
			/>
			<div className="min-w-0 flex-1 overflow-hidden">
				{conversation.isGeneratingTitle ? (
					<div className="flex items-center gap-1.5">
						<Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
						<span className="text-sm text-muted-foreground italic">
							Generating title...
						</span>
					</div>
				) : (
					<span
						className={cn(
							"truncate text-sm font-medium max-w-[180px] inline-block first-letter:uppercase",
							isDeleted
								? "text-muted-foreground line-through"
								: "text-sidebar-foreground"
						)}
					>
						{conversation.title}
					</span>
				)}
				<p className="text-xs text-muted-foreground h-4">
					{displayDate}
				</p>
			</div>

			{/* Actions dropdown */}
			<DropdownMenu
				open={isMenuOpen}
				onOpenChange={setIsMenuOpen}
			>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						data-testid={`conversation-menu-${conversation.id}`}
						className={cn(
							"h-10 w-10 shrink-0 transition-opacity",
							"opacity-100 lg:opacity-0 lg:group-hover:opacity-100",
							isMenuOpen && "lg:opacity-100"
						)}
						onClick={(e) => e.stopPropagation()}
					>
						<MoreVertical className="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					side="bottom"
					className="w-48 p-1.5"
				>
					{/* Rename - only for active/archived */}
					{!isDeleted && (
						<DropdownMenuItem
							data-testid={`conversation-rename-${conversation.id}`}
							className="py-2.5 text-sm"
							onClick={(e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								onRename(conversation.id);
							}}
						>
							<Pencil className="mr-2.5 h-4 w-4" />
							Rename
						</DropdownMenuItem>
					)}

					{/* Regenerate Title - only for active/archived */}
					{!isDeleted && (
						<DropdownMenuItem
							data-testid={`conversation-regenerate-title-${conversation.id}`}
							className="py-2.5 text-sm"
							onClick={(e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								onRegenerateTitle(conversation.id);
							}}
						>
							<RotateCcw className="mr-2.5 h-4 w-4" />
							Regenerate Title
						</DropdownMenuItem>
					)}

					{/* Archive/Unarchive - only for active/archived */}
					{!isDeleted && (
						<DropdownMenuItem
							data-testid={`conversation-${isArchived ? "unarchive" : "archive"}-${conversation.id}`}
							className="py-2.5 text-sm"
							onClick={(e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								if (isArchived) {
									onUnarchive(conversation.id);
								} else {
									onArchive(conversation.id);
								}
							}}
						>
							{isArchived ? (
								<>
									<ArchiveRestore className="mr-2.5 h-4 w-4" />
									Unarchive
								</>
							) : (
								<>
									<Archive className="mr-2.5 h-4 w-4" />
									Archive
								</>
							)}
						</DropdownMenuItem>
					)}

					{/* Restore - only for deleted */}
					{isDeleted && (
						<DropdownMenuItem
							data-testid={`conversation-restore-${conversation.id}`}
							className="py-2.5 text-sm"
							onClick={(e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								onRestore(conversation.id);
							}}
						>
							<RotateCcw className="mr-2.5 h-4 w-4" />
							Restore
						</DropdownMenuItem>
					)}

					{!isDeleted && <DropdownMenuSeparator />}

					{/* Delete */}
					<DropdownMenuItem
						data-testid={`conversation-delete-${conversation.id}`}
						className="py-2.5 text-sm text-destructive focus:text-destructive"
						onClick={(e) => {
							e.stopPropagation();
							setIsMenuOpen(false);
							onDelete(conversation.id);
						}}
					>
						<Trash2 className="mr-2.5 h-4 w-4" />
						{isDeleted ? "Delete Forever" : "Delete"}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
