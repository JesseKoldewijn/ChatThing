import { useCallback, useMemo } from "react";
import { useStore } from "@nanostores/react";
import { ConversationSidebarUI, type ConversationItem } from "./ConversationSidebar.ui";
import { SettingsPanel } from "../settings/SettingsPanel";
import {
	conversationsAtom,
	activeConversationIdAtom,
	createConversation,
	switchConversation,
	deleteConversation,
	updateConversationTitle,
	saveCurrentConversation,
	archiveConversation,
	unarchiveConversation,
	restoreConversation,
	permanentlyDeleteConversation,
} from "@/lib/stores/conversations";
import { useChatSearchParams } from "@/lib/hooks/useNavigation";

// Desktop breakpoint (lg)
const DESKTOP_BREAKPOINT = 1024;

// Check if we're on mobile
const isMobile = () =>
	typeof window !== "undefined" && window.innerWidth < DESKTOP_BREAKPOINT;

interface ConversationSidebarProps {
	onClose?: () => void;
}

export const ConversationSidebar = ({ onClose }: ConversationSidebarProps) => {
	const conversations = useStore(conversationsAtom);
	const activeConversationId = useStore(activeConversationIdAtom);
	const { showArchived, showDeleted, toggleShowArchived, toggleShowDeleted } =
		useChatSearchParams();

	// Calculate counts
	const { archivedCount, deletedCount } = useMemo(() => ({
		archivedCount: conversations.filter((c) => c.status === "archived").length,
		deletedCount: conversations.filter((c) => c.status === "deleted").length,
	}), [conversations]);

	// Map conversations to items
	const conversationItems: ConversationItem[] = useMemo(() => 
		conversations.map((c) => ({
			id: c.id,
			title: c.title,
			updatedAt: c.updatedAt,
			isActive: c.id === activeConversationId,
			isGeneratingTitle: c.isGeneratingTitle,
			status: c.status,
		})),
		[conversations, activeConversationId]
	);

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
		[activeConversationId, closeSidebarOnMobile]
	);

	const handleDeleteConversation = useCallback((id: string) => {
		const conversation = conversations.find((c) => c.id === id);
		if (!conversation) return;

		if (conversation.status === "deleted") {
			// Already deleted - permanently delete
			if (confirm("This will permanently delete the conversation. This cannot be undone. Continue?")) {
				permanentlyDeleteConversation(id);
			}
		} else {
			// Soft delete
			if (confirm("Move this conversation to trash?")) {
				deleteConversation(id);
			}
		}
	}, [conversations]);

	const handleRenameConversation = useCallback((id: string) => {
		const conversation = conversations.find((c) => c.id === id);
		if (!conversation) return;

		const newTitle = prompt("Enter new title:", conversation.title);
		if (newTitle && newTitle.trim()) {
			updateConversationTitle(id, newTitle.trim());
		}
	}, [conversations]);

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
			conversations={conversationItems}
			onNewChat={handleNewChat}
			onSelectConversation={handleSelectConversation}
			onDeleteConversation={handleDeleteConversation}
			onRenameConversation={handleRenameConversation}
			onArchiveConversation={handleArchiveConversation}
			onUnarchiveConversation={handleUnarchiveConversation}
			onRestoreConversation={handleRestoreConversation}
			onClose={onClose}
			settingsButton={<SettingsPanel />}
			showArchived={showArchived}
			showDeleted={showDeleted}
			onToggleArchived={toggleShowArchived}
			onToggleDeleted={toggleShowDeleted}
			archivedCount={archivedCount}
			deletedCount={deletedCount}
		/>
	);
};
