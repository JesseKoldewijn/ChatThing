import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
	currentPageAtom,
	sidebarOpenAtom,
	activeChatIdAtom,
	showArchivedAtom,
	showDeletedAtom,
	setSSRInitialRoute,
	getPageFromRoute,
	navigateTo,
	goToChat,
	goToSettings,
	goToUsage,
	goBack,
	setActiveChat,
	toggleSidebar,
	setSidebar,
	toggleShowArchived,
	setShowArchived,
	toggleShowDeleted,
	setShowDeleted,
} from "./navigation";
import { isHydratedAtom } from "./hydration";

// Mock window
const mockHistoryState: Record<string, unknown> = {};
const mockLocation = {
	pathname: "/",
	search: "",
	origin: "http://localhost",
	href: "http://localhost/",
};

const mockHistory = {
	pushState: vi.fn((state: Record<string, unknown>, _: string, url: string) => {
		Object.assign(mockHistoryState, state);
		const [pathname, search] = url.split("?");
		mockLocation.pathname = pathname;
		mockLocation.search = search ? `?${search}` : "";
		mockLocation.href = mockLocation.origin + url;
	}),
	replaceState: vi.fn((state: Record<string, unknown>, _: string, url: string) => {
		Object.assign(mockHistoryState, state);
		const [pathname, search] = url.split("?");
		mockLocation.pathname = pathname;
		mockLocation.search = search ? `?${search}` : "";
		mockLocation.href = mockLocation.origin + url;
	}),
	back: vi.fn(),
	state: mockHistoryState,
};

vi.stubGlobal("window", {
	location: mockLocation,
	history: mockHistory,
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
});

describe("navigation store", () => {
	beforeEach(() => {
		// Reset all atoms
		currentPageAtom.set("chat");
		sidebarOpenAtom.set(false);
		activeChatIdAtom.set(null);
		showArchivedAtom.set(false);
		showDeletedAtom.set(false);
		isHydratedAtom.set(true);

		// Reset mocks
		vi.clearAllMocks();
		mockLocation.pathname = "/";
		mockLocation.search = "";
		mockLocation.href = "http://localhost/";
		Object.keys(mockHistoryState).forEach((key) => delete mockHistoryState[key]);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("atoms", () => {
		it("should have default page as chat", () => {
			expect(currentPageAtom.get()).toBe("chat");
		});

		it("should have sidebar closed by default", () => {
			expect(sidebarOpenAtom.get()).toBe(false);
		});

		it("should have no active chat by default", () => {
			expect(activeChatIdAtom.get()).toBeNull();
		});

		it("should have showArchived false by default", () => {
			expect(showArchivedAtom.get()).toBe(false);
		});

		it("should have showDeleted false by default", () => {
			expect(showDeletedAtom.get()).toBe(false);
		});
	});

	describe("getPageFromRoute", () => {
		it("should return chat for /", () => {
			expect(getPageFromRoute("/")).toBe("chat");
		});

		it("should return settings for /settings", () => {
			expect(getPageFromRoute("/settings")).toBe("settings");
		});

		it("should return usage for /usage", () => {
			expect(getPageFromRoute("/usage")).toBe("usage");
		});

		it("should return chat for unknown routes", () => {
			expect(getPageFromRoute("/unknown")).toBe("chat");
			expect(getPageFromRoute("/foo/bar")).toBe("chat");
		});
	});

	describe("setSSRInitialRoute", () => {
		it("should set page from path", () => {
			setSSRInitialRoute("/settings");
			expect(currentPageAtom.get()).toBe("settings");
		});

		it("should set page to chat for root", () => {
			setSSRInitialRoute("/");
			expect(currentPageAtom.get()).toBe("chat");
		});

		it("should parse sidebar query param", () => {
			setSSRInitialRoute("/?sidebar=true");
			expect(sidebarOpenAtom.get()).toBe(true);
		});

		it("should parse sidebar=1 as true", () => {
			setSSRInitialRoute("/?sidebar=1");
			expect(sidebarOpenAtom.get()).toBe(true);
		});

		it("should parse chat ID from query", () => {
			setSSRInitialRoute("/?chat=abc123");
			expect(activeChatIdAtom.get()).toBe("abc123");
		});

		it("should parse archived=true", () => {
			setSSRInitialRoute("/?archived=true");
			expect(showArchivedAtom.get()).toBe(true);
		});

		it("should parse deleted=true", () => {
			setSSRInitialRoute("/?deleted=true");
			expect(showDeletedAtom.get()).toBe(true);
		});

		it("should parse multiple query params", () => {
			setSSRInitialRoute("/?chat=xyz&sidebar=true&archived=true&deleted=1");
			expect(activeChatIdAtom.get()).toBe("xyz");
			expect(sidebarOpenAtom.get()).toBe(true);
			expect(showArchivedAtom.get()).toBe(true);
			expect(showDeletedAtom.get()).toBe(true);
		});
	});

	describe("navigateTo", () => {
		it("should set current page", () => {
			navigateTo("settings");
			expect(currentPageAtom.get()).toBe("settings");
		});

		it("should call pushState by default", () => {
			navigateTo("usage");
			expect(mockHistory.pushState).toHaveBeenCalled();
		});

		it("should call replaceState when replace=true", () => {
			navigateTo("settings", true);
			expect(mockHistory.replaceState).toHaveBeenCalled();
		});
	});

	describe("goToChat", () => {
		it("should navigate to chat page", () => {
			currentPageAtom.set("settings");
			goToChat();
			expect(currentPageAtom.get()).toBe("chat");
		});
	});

	describe("goToSettings", () => {
		it("should navigate to settings page", () => {
			goToSettings();
			expect(currentPageAtom.get()).toBe("settings");
		});

		it("should close sidebar", () => {
			sidebarOpenAtom.set(true);
			goToSettings();
			expect(sidebarOpenAtom.get()).toBe(false);
		});

		it("should update URL to /settings", () => {
			goToSettings();
			expect(mockHistory.pushState).toHaveBeenCalledWith(
				expect.objectContaining({ page: "settings" }),
				"",
				"/settings"
			);
		});
	});

	describe("goToUsage", () => {
		it("should navigate to usage page", () => {
			goToUsage();
			expect(currentPageAtom.get()).toBe("usage");
		});

		it("should close sidebar", () => {
			sidebarOpenAtom.set(true);
			goToUsage();
			expect(sidebarOpenAtom.get()).toBe(false);
		});

		it("should update URL to /usage", () => {
			goToUsage();
			expect(mockHistory.pushState).toHaveBeenCalledWith(
				expect.objectContaining({ page: "usage" }),
				"",
				"/usage"
			);
		});
	});

	describe("goBack", () => {
		it("should call history.back", () => {
			goBack();
			expect(mockHistory.back).toHaveBeenCalled();
		});
	});

	describe("setActiveChat", () => {
		it("should set active chat ID", () => {
			setActiveChat("chat-123");
			expect(activeChatIdAtom.get()).toBe("chat-123");
		});

		it("should clear active chat with null", () => {
			activeChatIdAtom.set("existing");
			setActiveChat(null);
			expect(activeChatIdAtom.get()).toBeNull();
		});
	});

	describe("toggleSidebar", () => {
		it("should toggle sidebar open", () => {
			expect(sidebarOpenAtom.get()).toBe(false);
			toggleSidebar();
			expect(sidebarOpenAtom.get()).toBe(true);
		});

		it("should toggle sidebar closed", () => {
			sidebarOpenAtom.set(true);
			toggleSidebar();
			expect(sidebarOpenAtom.get()).toBe(false);
		});
	});

	describe("setSidebar", () => {
		it("should set sidebar to open", () => {
			setSidebar(true);
			expect(sidebarOpenAtom.get()).toBe(true);
		});

		it("should set sidebar to closed", () => {
			sidebarOpenAtom.set(true);
			setSidebar(false);
			expect(sidebarOpenAtom.get()).toBe(false);
		});
	});

	describe("toggleShowArchived", () => {
		it("should toggle showArchived on", () => {
			expect(showArchivedAtom.get()).toBe(false);
			toggleShowArchived();
			expect(showArchivedAtom.get()).toBe(true);
		});

		it("should toggle showArchived off", () => {
			showArchivedAtom.set(true);
			toggleShowArchived();
			expect(showArchivedAtom.get()).toBe(false);
		});
	});

	describe("setShowArchived", () => {
		it("should set showArchived to true", () => {
			setShowArchived(true);
			expect(showArchivedAtom.get()).toBe(true);
		});

		it("should set showArchived to false", () => {
			showArchivedAtom.set(true);
			setShowArchived(false);
			expect(showArchivedAtom.get()).toBe(false);
		});
	});

	describe("toggleShowDeleted", () => {
		it("should toggle showDeleted on", () => {
			expect(showDeletedAtom.get()).toBe(false);
			toggleShowDeleted();
			expect(showDeletedAtom.get()).toBe(true);
		});

		it("should toggle showDeleted off", () => {
			showDeletedAtom.set(true);
			toggleShowDeleted();
			expect(showDeletedAtom.get()).toBe(false);
		});
	});

	describe("setShowDeleted", () => {
		it("should set showDeleted to true", () => {
			setShowDeleted(true);
			expect(showDeletedAtom.get()).toBe(true);
		});

		it("should set showDeleted to false", () => {
			showDeletedAtom.set(true);
			setShowDeleted(false);
			expect(showDeletedAtom.get()).toBe(false);
		});
	});

	describe("URL building", () => {
		it("should build URL with chat ID", () => {
			setActiveChat("test-chat");
			expect(mockLocation.search).toContain("chat=test-chat");
		});

		it("should build URL with sidebar=true", () => {
			setSidebar(true);
			expect(mockLocation.search).toContain("sidebar=true");
		});

		it("should build URL with archived=true", () => {
			setShowArchived(true);
			expect(mockLocation.search).toContain("archived=true");
		});

		it("should build URL with deleted=true", () => {
			setShowDeleted(true);
			expect(mockLocation.search).toContain("deleted=true");
		});

		it("should not include false values in URL", () => {
			setSidebar(false);
			setShowArchived(false);
			setShowDeleted(false);
			expect(mockLocation.search).not.toContain("sidebar");
			expect(mockLocation.search).not.toContain("archived");
			expect(mockLocation.search).not.toContain("deleted");
		});
	});
});
