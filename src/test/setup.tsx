import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import "fake-indexeddb/auto";
import type React from "react";
import { afterEach, expect, vi } from "vitest";
import * as matchers from "vitest-axe/matchers";

// Extend vitest with axe matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
	cleanup();
});

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: vi.fn((key: string) => store[key] ?? null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value;
		}),
		removeItem: vi.fn((key: string) => {
			delete store[key];
		}),
		clear: vi.fn(() => {
			store = {};
		}),
		get length() {
			return Object.keys(store).length;
		},
		key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
	};
})();

Object.defineProperty(globalThis, "localStorage", {
	value: localStorageMock,
	writable: true,
});

// Mock matchMedia
Object.defineProperty(globalThis, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock crypto.randomUUID if not available
if (!globalThis.crypto?.randomUUID) {
	Object.defineProperty(globalThis, "crypto", {
		value: {
			...globalThis.crypto,
			randomUUID: vi.fn(() => {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
					const r = (Math.random() * 16) | 0;
					const v = c === "x" ? r : (r & 0x3) | 0x8;
					return v.toString(16);
				});
			}),
		},
		writable: true,
	});
}

// Mock ResizeObserver as a proper class (required by Radix UI)
class ResizeObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}
globalThis.ResizeObserver = ResizeObserverMock;

// Mock Recharts ResponsiveContainer to avoid warnings about width/height
vi.mock("recharts", async (importOriginal) => {
	const original = (await importOriginal()) as Record<string, unknown>;
	return {
		...original,
		ResponsiveContainer: ({
			children,
			width,
			height,
		}: {
			children: React.ReactNode;
			width?: number | string;
			height?: number | string;
		}) => (
			<div style={{ width: width || "100%", height: height || "100%" }}>
				{children}
			</div>
		),
	};
});

// Mock fetch globally
vi.stubGlobal(
	"fetch",
	vi.fn().mockImplementation(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve([]),
			text: () => Promise.resolve(""),
			blob: () => Promise.resolve(new Blob()),
		} as Response),
	),
);

// Mock IntersectionObserver as a proper class
class IntersectionObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	root = null;
	rootMargin = "";
	thresholds: number[] = [];
	constructor(
		_callback: IntersectionObserverCallback,
		_options?: IntersectionObserverInit,
	) {
		// Parameters are intentionally unused - this is a mock
		void _callback;
		void _options;
	}
}
globalThis.IntersectionObserver =
	IntersectionObserverMock as unknown as typeof IntersectionObserver;

// Mock pointer capture methods (required by Radix UI Select)
if (typeof Element !== "undefined") {
	Element.prototype.hasPointerCapture = vi.fn().mockReturnValue(false);
	Element.prototype.setPointerCapture = vi.fn();
	Element.prototype.releasePointerCapture = vi.fn();
}

// Mock scrollIntoView (required by some Radix UI components)
if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
	Element.prototype.scrollIntoView = vi.fn();
}

// Reset localStorage between tests
afterEach(() => {
	localStorageMock.clear();
	vi.clearAllMocks();
});
