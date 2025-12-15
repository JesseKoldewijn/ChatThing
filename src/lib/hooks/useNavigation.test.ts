import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

// Mock TanStack Router
const mockNavigate = vi.fn();
const mockRouterHistoryBack = vi.fn();
const mockSearch = {
	chat: undefined as string | undefined,
	sidebar: false,
	archived: false,
	deleted: false,
	forceCompat: false,
};

vi.mock("@tanstack/react-router", () => ({
	useNavigate: vi.fn(() => mockNavigate),
	useSearch: vi.fn(() => mockSearch),
	useRouter: vi.fn(() => ({
		history: {
			back: mockRouterHistoryBack,
		},
	})),
}));

import { useNavigation, useChatSearchParams } from "./useNavigation";

describe("useNavigation", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("navigation functions", () => {
		it("should provide goToChat function", () => {
			const { result } = renderHook(() => useNavigation());
			expect(typeof result.current.goToChat).toBe("function");
		});

		it("should provide goToSettings function", () => {
			const { result } = renderHook(() => useNavigation());
			expect(typeof result.current.goToSettings).toBe("function");
		});

		it("should provide goToUsage function", () => {
			const { result } = renderHook(() => useNavigation());
			expect(typeof result.current.goToUsage).toBe("function");
		});

		it("should provide goBack function", () => {
			const { result } = renderHook(() => useNavigation());
			expect(typeof result.current.goBack).toBe("function");
		});

		it("should provide navigate function", () => {
			const { result } = renderHook(() => useNavigation());
			expect(result.current.navigate).toBeDefined();
		});
	});

	describe("goToChat", () => {
		it("should navigate to root path", () => {
			const { result } = renderHook(() => useNavigation());

			act(() => {
				result.current.goToChat();
			});

			expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
		});
	});

	describe("goToSettings", () => {
		it("should navigate to settings path", () => {
			const { result } = renderHook(() => useNavigation());

			act(() => {
				result.current.goToSettings();
			});

			expect(mockNavigate).toHaveBeenCalledWith({ to: "/settings" });
		});
	});

	describe("goToUsage", () => {
		it("should navigate to usage path", () => {
			const { result } = renderHook(() => useNavigation());

			act(() => {
				result.current.goToUsage();
			});

			expect(mockNavigate).toHaveBeenCalledWith({ to: "/usage" });
		});
	});

	describe("goBack", () => {
		it("should call router history back", () => {
			const { result } = renderHook(() => useNavigation());

			act(() => {
				result.current.goBack();
			});

			expect(mockRouterHistoryBack).toHaveBeenCalled();
		});
	});
});

describe("useChatSearchParams", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Reset mock search params
		Object.assign(mockSearch, {
			chat: undefined,
			sidebar: false,
			archived: false,
			deleted: false,
			forceCompat: false,
		});
	});

	describe("current values", () => {
		it("should return activeChat from search params", () => {
			mockSearch.chat = "conv-123";
			const { result } = renderHook(() => useChatSearchParams());
			expect(result.current.activeChat).toBe("conv-123");
		});

		it("should return sidebarOpen state", () => {
			mockSearch.sidebar = true;
			const { result } = renderHook(() => useChatSearchParams());
			expect(result.current.sidebarOpen).toBe(true);
		});

		it("should return showArchived state", () => {
			mockSearch.archived = true;
			const { result } = renderHook(() => useChatSearchParams());
			expect(result.current.showArchived).toBe(true);
		});

		it("should return showDeleted state", () => {
			mockSearch.deleted = true;
			const { result } = renderHook(() => useChatSearchParams());
			expect(result.current.showDeleted).toBe(true);
		});

		it("should return forceCompat state", () => {
			mockSearch.forceCompat = true;
			const { result } = renderHook(() => useChatSearchParams());
			expect(result.current.forceCompat).toBe(true);
		});

		it("should default sidebarOpen to false when undefined", () => {
			mockSearch.sidebar = undefined as unknown as boolean;
			const { result } = renderHook(() => useChatSearchParams());
			expect(result.current.sidebarOpen).toBe(false);
		});
	});

	describe("setters", () => {
		it("should provide setActiveChat function", () => {
			const { result } = renderHook(() => useChatSearchParams());
			expect(typeof result.current.setActiveChat).toBe("function");
		});

		it("should provide toggleSidebar function", () => {
			const { result } = renderHook(() => useChatSearchParams());
			expect(typeof result.current.toggleSidebar).toBe("function");
		});

		it("should provide setSidebar function", () => {
			const { result } = renderHook(() => useChatSearchParams());
			expect(typeof result.current.setSidebar).toBe("function");
		});

		it("should provide toggleShowArchived function", () => {
			const { result } = renderHook(() => useChatSearchParams());
			expect(typeof result.current.toggleShowArchived).toBe("function");
		});

		it("should provide setShowArchived function", () => {
			const { result } = renderHook(() => useChatSearchParams());
			expect(typeof result.current.setShowArchived).toBe("function");
		});

		it("should provide toggleShowDeleted function", () => {
			const { result } = renderHook(() => useChatSearchParams());
			expect(typeof result.current.toggleShowDeleted).toBe("function");
		});

		it("should provide setShowDeleted function", () => {
			const { result } = renderHook(() => useChatSearchParams());
			expect(typeof result.current.setShowDeleted).toBe("function");
		});
	});

	describe("setActiveChat", () => {
		it("should call navigate with chat param", () => {
			const { result } = renderHook(() => useChatSearchParams());

			act(() => {
				result.current.setActiveChat("conv-456");
			});

			expect(mockNavigate).toHaveBeenCalledWith(
				expect.objectContaining({
					search: expect.any(Function),
					replace: true,
				})
			);
		});
	});

	describe("toggleSidebar", () => {
		it("should call navigate to toggle sidebar", () => {
			const { result } = renderHook(() => useChatSearchParams());

			act(() => {
				result.current.toggleSidebar();
			});

			expect(mockNavigate).toHaveBeenCalled();
		});
	});

	describe("setSidebar", () => {
		it("should call navigate with sidebar param", () => {
			const { result } = renderHook(() => useChatSearchParams());

			act(() => {
				result.current.setSidebar(true);
			});

			expect(mockNavigate).toHaveBeenCalledWith(
				expect.objectContaining({
					search: expect.any(Function),
					replace: true,
				})
			);
		});
	});

	describe("toggleShowArchived", () => {
		it("should call navigate to toggle archived", () => {
			const { result } = renderHook(() => useChatSearchParams());

			act(() => {
				result.current.toggleShowArchived();
			});

			expect(mockNavigate).toHaveBeenCalled();
		});
	});

	describe("setShowArchived", () => {
		it("should call navigate with archived param", () => {
			const { result } = renderHook(() => useChatSearchParams());

			act(() => {
				result.current.setShowArchived(true);
			});

			expect(mockNavigate).toHaveBeenCalled();
		});
	});

	describe("toggleShowDeleted", () => {
		it("should call navigate to toggle deleted", () => {
			const { result } = renderHook(() => useChatSearchParams());

			act(() => {
				result.current.toggleShowDeleted();
			});

			expect(mockNavigate).toHaveBeenCalled();
		});
	});

	describe("setShowDeleted", () => {
		it("should call navigate with deleted param", () => {
			const { result } = renderHook(() => useChatSearchParams());

			act(() => {
				result.current.setShowDeleted(true);
			});

			expect(mockNavigate).toHaveBeenCalled();
		});
	});
});

