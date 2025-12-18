import { useState } from "react";
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
	// Track which dropdown is open to prevent row click
	const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

	const formatDate = (timestamp: number) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diffDays = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
		);

		if (diffDays === 0) return "Today";
		if (diffDays === 1) return "Yesterday";
		if (diffDays < 7) return `${diffDays} days ago`;
		return date.toLocaleDateString();
	};

	const handleRowClick = (conversationId: string) => {
		// Don't trigger row click if dropdown is open
		if (openDropdownId) return;
		onSelectConversation(conversationId);
	};

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

	const renderConversationItem = (conversation: ConversationItem) => {
		const isArchived = conversation.status === "archived";
		const isDeleted = conversation.status === "deleted";

		return (
			<div
				key={conversation.id}
				data-testid={`conversation-item-${conversation.id}`}
				className={cn(
					"group relative flex items-center rounded-lg px-3 py-3 cursor-pointer min-h-[52px]",
					"hover:bg-sidebar-accent active:bg-sidebar-accent",
					conversation.isActive && "bg-sidebar-accent",
					isDeleted && "opacity-60"
				)}
				onClick={() => handleRowClick(conversation.id)}
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
						<p
							className={cn(
								"truncate text-sm font-medium max-w-[180px]",
								isDeleted
									? "text-muted-foreground line-through"
									: "text-sidebar-foreground"
							)}
						>
							{conversation.title}
						</p>
					)}
					{/* suppressHydrationWarning: date formatting depends on current time which differs between SSR and hydration */}
					<p
						className="text-xs text-muted-foreground"
						suppressHydrationWarning
					>
						{formatDate(conversation.updatedAt)}
					</p>
				</div>

				{/* Actions dropdown */}
				<DropdownMenu
					open={openDropdownId === conversation.id}
					onOpenChange={(open) => {
						setOpenDropdownId(open ? conversation.id : null);
					}}
				>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							data-testid={`conversation-menu-${conversation.id}`}
							className={cn(
								"h-10 w-10 shrink-0 transition-opacity",
								"opacity-100 lg:opacity-0 lg:group-hover:opacity-100",
								openDropdownId === conversation.id &&
									"lg:opacity-100"
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
									setOpenDropdownId(null);
									onRenameConversation(conversation.id);
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
									setOpenDropdownId(null);
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
									setOpenDropdownId(null);
									if (isArchived) {
										onUnarchiveConversation(
											conversation.id
										);
									} else {
										onArchiveConversation(conversation.id);
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
									setOpenDropdownId(null);
									onRestoreConversation(conversation.id);
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
								setOpenDropdownId(null);
								onDeleteConversation(conversation.id);
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
						{items.map(renderConversationItem)}
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
