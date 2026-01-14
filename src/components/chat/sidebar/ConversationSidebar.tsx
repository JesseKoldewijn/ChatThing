import { useChatSearchParams } from "@/lib/hooks/useNavigation";
import { confirmAction } from "@/lib/stores/confirmation";
import {
	activeConversationIdAtom,
	archiveConversation,
	conversationsAtom,
	createConversation,
	deleteConversation,
	permanentlyDeleteConversation,
	restoreConversation,
	saveCurrentConversation,
	switchConversation,
	triggerTitleGeneration,
	unarchiveConversation,
	updateConversationTitle,
} from "@/lib/stores/conversations";
import { showSuccess } from "@/lib/stores/notifications";
import { promptAction } from "@/lib/stores/prompt";
import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SettingsPanel } from "../settings/SettingsPanel";
import {
	type ConversationItem,
	ConversationSidebarUI,
} from "./ConversationSidebar.ui";

// Desktop breakpoint (lg)
const DESKTOP_BREAKPOINT = 1024;

// Check if we're on mobile
const isMobile = () =>
	typeof window !== "undefined" && window.innerWidth < DESKTOP_BREAKPOINT;

interface ConversationSidebarProps {
	onClose?: () => void;
}

export const ConversationSidebar = ({ onClose }: ConversationSidebarProps) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	const conversations = useStore(conversationsAtom);
	const activeConversationId = useStore(activeConversationIdAtom);
	const { showArchived, showDeleted, toggleShowArchived, toggleShowDeleted } =
		useChatSearchParams();

	// Calculate counts
	const { archivedCount, deletedCount } = useMemo(
		() => ({
			archivedCount: conversations.filter((c) => c.status === "archived")
				.length,
			deletedCount: conversations.filter((c) => c.status === "deleted").length,
		}),
		[conversations],
	);

	// Map conversations to items
	const conversationItems: ConversationItem[] = useMemo(
		() =>
			conversations.map((c) => ({
				id: c.id,
				title: c.title,
				updatedAt: c.updatedAt,
				isActive: c.id === activeConversationId,
				isGeneratingTitle: c.isGeneratingTitle,
				status: c.status,
			})),
		[conversations, activeConversationId],
	);

	// Ensure deterministic render between server and client
	const displayConversations = hasMounted ? conversationItems : [];
	const displayArchivedCount = hasMounted ? archivedCount : 0;
	const displayDeletedCount = hasMounted ? deletedCount : 0;

	// Close sidebar only on mobile after actions
	const closeSidebarOnMobile = useCallback(() => {
		if (isMobile()) {
			onClose?.();
		}
	}, [onClose]);

	const handleNewChat = useCallback(() => {
		saveCurrentConversation();
		createConversation();
		closeSidebarOnMobile();
	}, [closeSidebarOnMobile]);

	const handleSelectConversation = useCallback(
		(id: string) => {
			if (id !== activeConversationId) {
				switchConversation(id);
			}
			closeSidebarOnMobile();
		},
		[activeConversationId, closeSidebarOnMobile],
	);

	const handleDeleteConversation = useCallback(
		(id: string) => {
			const conversation = conversations.find((c) => c.id === id);
			if (!conversation) return;

			if (conversation.status === "deleted") {
				// Already deleted - permanently delete
				confirmAction({
					title: "Permanently Delete",
					message:
						"This will permanently delete the conversation. This cannot be undone. Continue?",
					confirmText: "Delete Permanently",
					variant: "destructive",
					onConfirm: () => {
						permanentlyDeleteConversation(id);
						showSuccess("Conversation permanently deleted.");
					},
				});
			} else {
				// Soft delete
				confirmAction({
					title: "Move to Trash",
					message: "Move this conversation to trash?",
					confirmText: "Move to Trash",
					variant: "destructive",
					onConfirm: () => {
						deleteConversation(id);
						showSuccess("Conversation moved to trash.");
					},
				});
			}
		},
		[conversations],
	);

	const handleRenameConversation = useCallback(
		(id: string) => {
			const conversation = conversations.find((c) => c.id === id);
			if (!conversation) return;

			promptAction({
				title: "Rename Conversation",
				message: "Enter a new title for this conversation:",
				defaultValue: conversation.title,
				placeholder: "Conversation title...",
				onConfirm: (newTitle) => {
					if (newTitle && newTitle.trim()) {
						updateConversationTitle(id, newTitle.trim());
						showSuccess("Conversation renamed.");
					}
				},
			});
		},
		[conversations],
	);

	const handleRegenerateTitle = useCallback((id: string) => {
		triggerTitleGeneration(id, true);
	}, []);

	const handleArchiveConversation = useCallback((id: string) => {
		archiveConversation(id);
	}, []);

	const handleUnarchiveConversation = useCallback((id: string) => {
		unarchiveConversation(id);
	}, []);

	const handleRestoreConversation = useCallback((id: string) => {
		restoreConversation(id);
	}, []);

	return (
		<ConversationSidebarUI
			conversations={displayConversations}
			onNewChat={handleNewChat}
			onSelectConversation={handleSelectConversation}
			onDeleteConversation={handleDeleteConversation}
			onRenameConversation={handleRenameConversation}
			onRegenerateTitle={handleRegenerateTitle}
			onArchiveConversation={handleArchiveConversation}
			onUnarchiveConversation={handleUnarchiveConversation}
			onRestoreConversation={handleRestoreConversation}
			onClose={onClose}
			settingsButton={<SettingsPanel />}
			showArchived={showArchived}
			showDeleted={showDeleted}
			onToggleArchived={toggleShowArchived}
			onToggleDeleted={toggleShowDeleted}
			archivedCount={displayArchivedCount}
			deletedCount={displayDeletedCount}
		/>
	);
};
