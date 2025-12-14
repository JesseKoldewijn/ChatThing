import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

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
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
					/[xy]/g,
					(c) => {
						const r = (Math.random() * 16) | 0;
						const v = c === "x" ? r : (r & 0x3) | 0x8;
						return v.toString(16);
					}
				);
			}),
		},
		writable: true,
	});
}

// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// Mock IntersectionObserver
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
	root: null,
	rootMargin: "",
	thresholds: [],
}));

// Mock IndexedDB for image storage tests
const indexedDBMock = (() => {
	let stores: Record<string, Record<string, unknown>> = {};
	
	const createMockObjectStore = (name: string) => {
		if (!stores[name]) stores[name] = {};
		return {
			put: vi.fn((value: { id: string }) => {
				stores[name][value.id] = value;
				return { onsuccess: null, onerror: null };
			}),
			get: vi.fn((key: string) => {
				const result = stores[name][key] || null;
				return { 
					result,
					onsuccess: null, 
					onerror: null,
				};
			}),
			delete: vi.fn((key: string) => {
				delete stores[name][key];
				return { onsuccess: null, onerror: null };
			}),
			clear: vi.fn(() => {
				stores[name] = {};
				return { onsuccess: null, onerror: null };
			}),
			createIndex: vi.fn(),
			index: vi.fn(() => ({
				openCursor: vi.fn(() => ({
					onsuccess: null,
					onerror: null,
					result: null,
				})),
			})),
		};
	};

	const createMockTransaction = () => ({
		objectStore: vi.fn((name: string) => createMockObjectStore(name)),
	});

	const createMockDB = () => ({
		objectStoreNames: { contains: vi.fn(() => true) },
		createObjectStore: vi.fn((name: string) => createMockObjectStore(name)),
		transaction: vi.fn(() => createMockTransaction()),
	});

	return {
		open: vi.fn(() => {
			const request = {
				result: createMockDB(),
				onsuccess: null as (() => void) | null,
				onerror: null as (() => void) | null,
				onupgradeneeded: null as ((event: unknown) => void) | null,
			};
			// Simulate async success
			setTimeout(() => {
				if (request.onsuccess) request.onsuccess();
			}, 0);
			return request;
		}),
		deleteDatabase: vi.fn(),
		_reset: () => {
			stores = {};
		},
	};
})();

Object.defineProperty(globalThis, "indexedDB", {
	value: indexedDBMock,
	writable: true,
});

// Reset localStorage and IndexedDB between tests
afterEach(() => {
	localStorageMock.clear();
	indexedDBMock._reset();
	vi.clearAllMocks();
});

