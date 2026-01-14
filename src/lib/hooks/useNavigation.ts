import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";

/**
 * Search params for the chat page
 */
export interface ChatSearchParams {
	chat?: string;
	sidebar?: boolean;
	archived?: boolean;
	deleted?: boolean;
	inactive?: boolean;
	forceCompat?: boolean;
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
				search: (prev) => {
					const newSearch = { ...prev };
					if (chatId) {
						newSearch.chat = chatId;
					} else {
						delete newSearch.chat;
					}
					return newSearch;
				},
				replace: true,
			});
		},
		[navigate],
	);

	const toggleSidebar = useCallback(() => {
		navigate({
			search: (prev) => {
				const newValue = !(prev.sidebar ?? false);
				const newSearch = { ...prev };
				if (newValue) {
					newSearch.sidebar = true;
				} else {
					delete newSearch.sidebar;
					delete newSearch.archived;
					delete newSearch.deleted;
					delete newSearch.inactive;
				}
				return newSearch;
			},
			replace: true,
		});
	}, [navigate]);

	const setSidebar = useCallback(
		(open: boolean) => {
			navigate({
				search: (prev) => {
					const newSearch = { ...prev };
					if (open) {
						newSearch.sidebar = true;
					} else {
						delete newSearch.sidebar;
						delete newSearch.archived;
						delete newSearch.deleted;
						delete newSearch.inactive;
					}
					return newSearch;
				},
				replace: true,
			});
		},
		[navigate],
	);

	const toggleShowArchived = useCallback(() => {
		navigate({
			search: (prev) => {
				const newValue = !(prev.archived ?? false);
				const newSearch = { ...prev };
				if (newValue) {
					newSearch.archived = true;
				} else {
					delete newSearch.archived;
				}
				return newSearch;
			},
			replace: true,
		});
	}, [navigate]);

	const setShowArchived = useCallback(
		(show: boolean) => {
			navigate({
				search: (prev) => {
					const newSearch = { ...prev };
					if (show) {
						newSearch.archived = true;
					} else {
						delete newSearch.archived;
					}
					return newSearch;
				},
				replace: true,
			});
		},
		[navigate],
	);

	const toggleShowDeleted = useCallback(() => {
		navigate({
			search: (prev) => {
				const newValue = !(prev.deleted ?? false);
				const newSearch = { ...prev };
				if (newValue) {
					newSearch.deleted = true;
				} else {
					delete newSearch.deleted;
				}
				return newSearch;
			},
			replace: true,
		});
	}, [navigate]);

	const setShowDeleted = useCallback(
		(show: boolean) => {
			navigate({
				search: (prev) => {
					const newSearch = { ...prev };
					if (show) {
						newSearch.deleted = true;
					} else {
						delete newSearch.deleted;
					}
					return newSearch;
				},
				replace: true,
			});
		},
		[navigate],
	);

	return {
		// Current values
		activeChat: search.chat,
		sidebarOpen: search.sidebar ?? false,
		showArchived: search.archived ?? false,
		showDeleted: search.deleted ?? false,
		showInactive: search.inactive ?? false,
		forceCompat: search.forceCompat ?? false,
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
