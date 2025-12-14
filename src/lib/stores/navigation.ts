import { atom, onMount } from "nanostores";
import { isHydratedAtom } from "./hydration";

export type Page = "chat" | "settings" | "usage";

// Route configuration
const ROUTES: Record<Page, string> = {
	chat: "/",
	settings: "/settings",
	usage: "/usage",
};

// Reverse lookup: path -> page
const PATH_TO_PAGE: Record<string, Page> = {
	"/": "chat",
	"/settings": "settings",
	"/usage": "usage",
};

// Query parameter keys
const QUERY_PARAMS = {
	CHAT_ID: "chat",
	SIDEBAR: "sidebar",
	SHOW_ARCHIVED: "archived",
	SHOW_DELETED: "deleted",
} as const;

// Current page
export const currentPageAtom = atom<Page>("chat");

// Sidebar open state - only open when ?sidebar=true
export const sidebarOpenAtom = atom<boolean>(false);

// Active chat ID - synced with URL
export const activeChatIdAtom = atom<string | null>(null);

// Show archived chats toggle - synced with URL
export const showArchivedAtom = atom<boolean>(false);

// Show deleted chats toggle - synced with URL
export const showDeletedAtom = atom<boolean>(false);

// SSR initial route (set by server before render)
let ssrInitialRoute: string | null = null;

/**
 * Parse query parameters from a URL string (works on server without window)
 */
const parseQueryParams = (url: string): URLSearchParams => {
	const queryIndex = url.indexOf("?");
	if (queryIndex === -1) return new URLSearchParams();
	return new URLSearchParams(url.slice(queryIndex + 1));
};

/**
 * Get the pathname from a URL string (works on server without window)
 */
const getPathnameFromUrl = (url: string): string => {
	const queryIndex = url.indexOf("?");
	return queryIndex === -1 ? url : url.slice(0, queryIndex);
};

/**
 * Check if sidebar param is true
 */
const isSidebarOpen = (params: URLSearchParams): boolean => {
	const sidebarParam = params.get(QUERY_PARAMS.SIDEBAR);
	return sidebarParam === "true" || sidebarParam === "1";
};

/**
 * Set the initial route for SSR (called before render)
 * @param url - Full URL including query string (e.g., "/?sidebar=true")
 */
export const setSSRInitialRoute = (url: string) => {
	const pathname = getPathnameFromUrl(url);
	ssrInitialRoute = pathname;

	const page = PATH_TO_PAGE[pathname] ?? "chat";
	currentPageAtom.set(page);

	// Parse query params
	const params = parseQueryParams(url);

	// Sidebar is only open if explicitly set to true
	sidebarOpenAtom.set(isSidebarOpen(params));

	// Parse showArchived and showDeleted from query params
	const archivedParam = params.get(QUERY_PARAMS.SHOW_ARCHIVED);
	if (archivedParam === "true" || archivedParam === "1") {
		showArchivedAtom.set(true);
	}

	const deletedParam = params.get(QUERY_PARAMS.SHOW_DELETED);
	if (deletedParam === "true" || deletedParam === "1") {
		showDeletedAtom.set(true);
	}

	// Parse active chat ID from query params
	const chatIdParam = params.get(QUERY_PARAMS.CHAT_ID);
	if (chatIdParam) {
		activeChatIdAtom.set(chatIdParam);
	}
};

/**
 * Get the page from a URL path
 */
export const getPageFromRoute = (route: string): Page => {
	return PATH_TO_PAGE[route] ?? "chat";
};

/**
 * Get the current page from the URL path
 */
const getPageFromPath = (): Page => {
	// Use SSR initial route if set (server-side)
	if (ssrInitialRoute !== null) {
		return PATH_TO_PAGE[ssrInitialRoute] ?? "chat";
	}
	if (typeof window === "undefined") return "chat";
	const path = window.location.pathname;
	return PATH_TO_PAGE[path] ?? "chat";
};

/**
 * Get query parameters from the current URL
 */
const getQueryParams = (): URLSearchParams => {
	if (typeof window === "undefined") return new URLSearchParams();
	return new URLSearchParams(window.location.search);
};

/**
 * Get the active chat ID from URL query params
 */
const getChatIdFromUrl = (): string | null => {
	const params = getQueryParams();
	return params.get(QUERY_PARAMS.CHAT_ID);
};

/**
 * Get the sidebar state from URL query params
 */
const getSidebarStateFromUrl = (): boolean => {
	return isSidebarOpen(getQueryParams());
};

/**
 * Get the show archived state from URL query params
 */
const getShowArchivedFromUrl = (): boolean => {
	const params = getQueryParams();
	const param = params.get(QUERY_PARAMS.SHOW_ARCHIVED);
	return param === "true" || param === "1";
};

/**
 * Get the show deleted state from URL query params
 */
const getShowDeletedFromUrl = (): boolean => {
	const params = getQueryParams();
	const param = params.get(QUERY_PARAMS.SHOW_DELETED);
	return param === "true" || param === "1";
};

/**
 * Build URL with current path and query params
 */
const buildUrl = (
	page: Page,
	chatId: string | null,
	sidebarOpen: boolean,
	showArchived: boolean,
	showDeleted: boolean
): string => {
	const path = ROUTES[page];

	// Settings page has no query params
	if (page === "settings") {
		return path;
	}

	const params = new URLSearchParams();

	// Only add chat param if there's a chat ID
	if (chatId) {
		params.set(QUERY_PARAMS.CHAT_ID, chatId);
	}

	// Only add sidebar param if open (default is closed)
	if (sidebarOpen) {
		params.set(QUERY_PARAMS.SIDEBAR, "true");
	}

	// Only add archived/deleted params if they are true (default is false)
	if (showArchived) {
		params.set(QUERY_PARAMS.SHOW_ARCHIVED, "true");
	}
	if (showDeleted) {
		params.set(QUERY_PARAMS.SHOW_DELETED, "true");
	}

	const queryString = params.toString();
	return queryString ? `${path}?${queryString}` : path;
};

/**
 * Update the browser URL without triggering a page reload
 */
const updateUrl = (replace = false) => {
	if (typeof window === "undefined") return;

	const page = currentPageAtom.get();
	const chatId = activeChatIdAtom.get();
	const sidebarOpen = sidebarOpenAtom.get();
	const showArchived = showArchivedAtom.get();
	const showDeleted = showDeletedAtom.get();

	const url = buildUrl(page, chatId, sidebarOpen, showArchived, showDeleted);
	const currentUrl = window.location.pathname + window.location.search;

	// Don't update if URL is the same
	if (currentUrl === url) return;

	const state = { page, chatId, sidebarOpen, showArchived, showDeleted };

	if (replace) {
		window.history.replaceState(state, "", url);
	} else {
		window.history.pushState(state, "", url);
	}
};

/**
 * Restore state from URL or history state
 */
const restoreStateFromUrl = (historyState?: {
	page?: Page;
	chatId?: string | null;
	sidebarOpen?: boolean;
	showArchived?: boolean;
	showDeleted?: boolean;
}) => {
	// Get page from path
	const page = historyState?.page ?? getPageFromPath();
	currentPageAtom.set(page);

	// Get chat ID from history state or URL
	const chatId =
		historyState?.chatId !== undefined
			? historyState.chatId
			: getChatIdFromUrl();
	activeChatIdAtom.set(chatId);

	// Get sidebar state from history state or URL (default false)
	const sidebarOpen =
		historyState?.sidebarOpen !== undefined
			? historyState.sidebarOpen
			: getSidebarStateFromUrl();
	sidebarOpenAtom.set(sidebarOpen);

	// Get archived/deleted toggle states from history state or URL
	const showArchived =
		historyState?.showArchived !== undefined
			? historyState.showArchived
			: getShowArchivedFromUrl();
	showArchivedAtom.set(showArchived);

	const showDeleted =
		historyState?.showDeleted !== undefined
			? historyState.showDeleted
			: getShowDeletedFromUrl();
	showDeletedAtom.set(showDeleted);
};

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

/**
 * Initialize navigation from URL and set up history listener
 * Called after hydration to avoid hydration mismatches
 */
const initializeNavigation = () => {
	// Restore initial state from URL
	restoreStateFromUrl();

	// Set initial history state
	const page = currentPageAtom.get();
	const chatId = activeChatIdAtom.get();
	const sidebarOpen = sidebarOpenAtom.get();
	const showArchived = showArchivedAtom.get();
	const showDeleted = showDeletedAtom.get();

	if (!window.history.state?.page) {
		const url = buildUrl(
			page,
			chatId,
			sidebarOpen,
			showArchived,
			showDeleted
		);
		window.history.replaceState(
			{ page, chatId, sidebarOpen, showArchived, showDeleted },
			"",
			url
		);
	}
};

// Initialize from URL and set up history listener - defer until after hydration
onMount(currentPageAtom, () => {
	// Skip on server
	if (!isBrowser) return;

	// Handle browser back/forward navigation (always needed)
	const handlePopState = (event: PopStateEvent) => {
		restoreStateFromUrl(event.state);
	};
	window.addEventListener("popstate", handlePopState);

	// If already hydrated, initialize immediately
	if (isHydratedAtom.get()) {
		initializeNavigation();
	} else {
		// Wait for hydration to complete before reading URL and updating state
		const unsubHydration = isHydratedAtom.subscribe((hydrated) => {
			if (hydrated) {
				initializeNavigation();
				unsubHydration();
			}
		});
	}

	return () => {
		window.removeEventListener("popstate", handlePopState);
	};
});

// Navigation actions
export const navigateTo = (page: Page, replace = false) => {
	currentPageAtom.set(page);
	updateUrl(replace);
};

export const goToChat = () => navigateTo("chat");

export const goToSettings = () => {
	if (typeof window === "undefined") return;

	// Close sidebar and navigate to settings
	sidebarOpenAtom.set(false);
	currentPageAtom.set("settings");

	const settingsState = {
		page: "settings" as Page,
		chatId: null,
		sidebarOpen: false,
		showArchived: false,
		showDeleted: false,
	};
	window.history.pushState(settingsState, "", ROUTES.settings);
};

export const goToUsage = () => {
	if (typeof window === "undefined") return;

	// Close sidebar and navigate to usage
	sidebarOpenAtom.set(false);
	currentPageAtom.set("usage");

	const usageState = {
		page: "usage" as Page,
		chatId: null,
		sidebarOpen: false,
		showArchived: false,
		showDeleted: false,
	};
	window.history.pushState(usageState, "", ROUTES.usage);
};

/**
 * Navigate back in browser history
 */
export const goBack = () => {
	if (typeof window !== "undefined") {
		window.history.back();
	}
};

/**
 * Set the active chat and update URL
 */
export const setActiveChat = (chatId: string | null, replace = false) => {
	activeChatIdAtom.set(chatId);
	updateUrl(replace);
};

/**
 * Toggle sidebar and update URL
 */
export const toggleSidebar = () => {
	sidebarOpenAtom.set(!sidebarOpenAtom.get());
	updateUrl(true); // Use replace for sidebar toggle to avoid polluting history
};

/**
 * Set sidebar state and update URL
 */
export const setSidebar = (open: boolean, replace = true) => {
	sidebarOpenAtom.set(open);
	updateUrl(replace);
};

/**
 * Toggle show archived chats and update URL
 */
export const toggleShowArchived = () => {
	showArchivedAtom.set(!showArchivedAtom.get());
	updateUrl(true);
};

/**
 * Set show archived state and update URL
 */
export const setShowArchived = (show: boolean, replace = true) => {
	showArchivedAtom.set(show);
	updateUrl(replace);
};

/**
 * Toggle show deleted chats and update URL
 */
export const toggleShowDeleted = () => {
	showDeletedAtom.set(!showDeletedAtom.get());
	updateUrl(true);
};

/**
 * Set show deleted state and update URL
 */
export const setShowDeleted = (show: boolean, replace = true) => {
	showDeletedAtom.set(show);
	updateUrl(replace);
};
