import { useNavigate, useSearch, useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

/**
 * Search params for the chat page
 */
export interface ChatSearchParams {
	chat?: string;
	sidebar?: boolean;
	archived?: boolean;
	deleted?: boolean;
}

/**
 * Hook for navigation actions using TanStack Router
 */
export function useNavigation() {
	const navigate = useNavigate();
	const router = useRouter();

	const goToChat = useCallback(() => {
		navigate({ to: "/" });
	}, [navigate]);

	const goToSettings = useCallback(() => {
		navigate({ to: "/settings" });
	}, [navigate]);

	const goToUsage = useCallback(() => {
		navigate({ to: "/usage" });
	}, [navigate]);

	const goBack = useCallback(() => {
		router.history.back();
	}, [router]);

	return {
		goToChat,
		goToSettings,
		goToUsage,
		goBack,
		navigate,
	};
}

/**
 * Hook for chat page search params
 * Only works on the "/" route
 */
export function useChatSearchParams() {
	const search = useSearch({ from: "/" });
	const navigate = useNavigate({ from: "/" });

	const setActiveChat = useCallback(
		(chatId: string | undefined) => {
			navigate({
				search: (prev) => ({ ...prev, chat: chatId }),
				replace: true,
			});
		},
		[navigate]
	);

	const toggleSidebar = useCallback(() => {
		navigate({
			search: (prev) => ({ ...prev, sidebar: !prev.sidebar }),
			replace: true,
		});
	}, [navigate]);

	const setSidebar = useCallback(
		(open: boolean) => {
			navigate({
				search: (prev) => ({ ...prev, sidebar: open || undefined }),
				replace: true,
			});
		},
		[navigate]
	);

	const toggleShowArchived = useCallback(() => {
		navigate({
			search: (prev) => ({ ...prev, archived: !prev.archived }),
			replace: true,
		});
	}, [navigate]);

	const setShowArchived = useCallback(
		(show: boolean) => {
			navigate({
				search: (prev) => ({ ...prev, archived: show || undefined }),
				replace: true,
			});
		},
		[navigate]
	);

	const toggleShowDeleted = useCallback(() => {
		navigate({
			search: (prev) => ({ ...prev, deleted: !prev.deleted }),
			replace: true,
		});
	}, [navigate]);

	const setShowDeleted = useCallback(
		(show: boolean) => {
			navigate({
				search: (prev) => ({ ...prev, deleted: show || undefined }),
				replace: true,
			});
		},
		[navigate]
	);

	return {
		// Current values
		activeChat: search.chat,
		sidebarOpen: search.sidebar ?? false,
		showArchived: search.archived ?? false,
		showDeleted: search.deleted ?? false,
		// Setters
		setActiveChat,
		toggleSidebar,
		setSidebar,
		toggleShowArchived,
		setShowArchived,
		toggleShowDeleted,
		setShowDeleted,
	};
}

