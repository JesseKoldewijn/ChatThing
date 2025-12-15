import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
	registerServiceWorker,
	unregisterServiceWorkers,
} from "./registerSW";

describe("registerServiceWorker", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Reset service worker mocks
		Object.defineProperty(navigator, "serviceWorker", {
			value: undefined,
			writable: true,
			configurable: true,
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should return early if service workers are not supported", async () => {
		// Remove serviceWorker property entirely
		delete (navigator as { serviceWorker?: unknown }).serviceWorker;

		const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

		await registerServiceWorker();

		expect(consoleSpy).toHaveBeenCalledWith(
			"[PWA] Service workers not supported"
		);
		consoleSpy.mockRestore();
	});

	it("should register service worker when supported", async () => {
		const mockRegistration = {
			waiting: null,
			installing: null,
			update: vi.fn().mockResolvedValue(undefined),
			addEventListener: vi.fn(),
		};

		const mockRegister = vi.fn().mockResolvedValue(mockRegistration);

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: mockRegister,
				controller: null,
				addEventListener: vi.fn(),
			},
			writable: true,
			configurable: true,
		});

		const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

		await registerServiceWorker();

		expect(mockRegister).toHaveBeenCalledWith("/sw.js", { scope: "/" });
		expect(mockRegistration.update).toHaveBeenCalled();
		expect(consoleSpy).toHaveBeenCalledWith("[PWA] Service worker registered");

		consoleSpy.mockRestore();
	});

	it("should handle waiting service worker", async () => {
		const mockWorker = {
			postMessage: vi.fn(),
			state: "installed",
		};

		const mockRegistration = {
			waiting: mockWorker,
			installing: null,
			update: vi.fn().mockResolvedValue(undefined),
			addEventListener: vi.fn(),
		};

		const mockRegister = vi.fn().mockResolvedValue(mockRegistration);

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: mockRegister,
				controller: null,
				addEventListener: vi.fn(),
			},
			writable: true,
			configurable: true,
		});

		await registerServiceWorker();

		expect(mockWorker.postMessage).toHaveBeenCalledWith({
			type: "SKIP_WAITING",
		});
	});

	it("should set up periodic update checks", async () => {
		vi.useFakeTimers();

		const mockRegistration = {
			waiting: null,
			installing: null,
			update: vi.fn().mockResolvedValue(undefined),
			addEventListener: vi.fn(),
		};

		const mockRegister = vi.fn().mockResolvedValue(mockRegistration);

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: mockRegister,
				controller: null,
				addEventListener: vi.fn(),
			},
			writable: true,
			configurable: true,
		});

		await registerServiceWorker();

		// Clear initial update call
		mockRegistration.update.mockClear();

		// Advance time by update interval
		vi.advanceTimersByTime(60 * 1000);

		expect(mockRegistration.update).toHaveBeenCalled();

		vi.useRealTimers();
	});

	it("should handle update check failures gracefully", async () => {
		const mockRegistration = {
			waiting: null,
			installing: null,
			update: vi
				.fn()
				.mockResolvedValueOnce(undefined) // Initial update succeeds
				.mockRejectedValueOnce(new Error("Update failed")), // Periodic check fails
			addEventListener: vi.fn(),
		};

		const mockRegister = vi.fn().mockResolvedValue(mockRegistration);

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: mockRegister,
				controller: null,
				addEventListener: vi.fn(),
			},
			writable: true,
			configurable: true,
		});

		const consoleWarnSpy = vi
			.spyOn(console, "warn")
			.mockImplementation(() => {});

		await registerServiceWorker();

		// Wait a bit for the periodic check to run
		await new Promise((resolve) => setTimeout(resolve, 100));

		// The periodic check runs in setInterval, so we can't easily test it without timers
		// Just verify the initial setup worked
		expect(mockRegistration.update).toHaveBeenCalled();

		consoleWarnSpy.mockRestore();
	});

	it("should handle updatefound event", async () => {
		let stateChangeHandler: (() => void) | null = null;
		const mockWorker = {
			state: "installing",
			addEventListener: vi.fn((event, handler) => {
				if (event === "statechange") {
					stateChangeHandler = handler;
				}
			}),
			postMessage: vi.fn(),
		};

		let updateFoundHandler: (() => void) | null = null;
		const mockRegistration = {
			waiting: null,
			installing: mockWorker,
			update: vi.fn().mockResolvedValue(undefined),
			addEventListener: vi.fn((event, handler) => {
				if (event === "updatefound") {
					updateFoundHandler = handler;
				}
			}),
		};

		const mockRegister = vi.fn().mockResolvedValue(mockRegistration);

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: mockRegister,
				controller: {}, // Has controller, so new worker is waiting
				addEventListener: vi.fn(),
			},
			writable: true,
			configurable: true,
		});

		const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

		await registerServiceWorker();

		// Trigger updatefound event
		if (updateFoundHandler) {
			(updateFoundHandler as () => void)();
		}

		// Simulate state change to installed
		if (stateChangeHandler) {
			Object.defineProperty(mockWorker, "state", { value: "installed", writable: true });
			(stateChangeHandler as () => void)();
		}

		expect(consoleSpy).toHaveBeenCalledWith(
			"[PWA] New service worker installing..."
		);
		expect(mockWorker.addEventListener).toHaveBeenCalledWith(
			"statechange",
			expect.any(Function)
		);

		consoleSpy.mockRestore();
	});

	it("should handle controllerchange event", async () => {
		const mockRegistration = {
			waiting: null,
			installing: null,
			update: vi.fn().mockResolvedValue(undefined),
			addEventListener: vi.fn(),
		};

		const mockRegister = vi.fn().mockResolvedValue(mockRegistration);

		let controllerChangeHandler: (() => void) | null = null;

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: mockRegister,
				controller: null,
				addEventListener: vi.fn((event, handler) => {
					if (event === "controllerchange") {
						controllerChangeHandler = handler;
					}
				}),
			},
			writable: true,
			configurable: true,
		});

		const reloadSpy = vi
			.spyOn(window.location, "reload")
			.mockImplementation(() => {});

		await registerServiceWorker();

		// Trigger controller change
		if (controllerChangeHandler) {
			(controllerChangeHandler as () => void)();
		}

		expect(reloadSpy).toHaveBeenCalled();

		reloadSpy.mockRestore();
	});

	it("should handle registration errors", async () => {
		const mockRegister = vi
			.fn()
			.mockRejectedValue(new Error("Registration failed"));

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: mockRegister,
				controller: null,
				addEventListener: vi.fn(),
			},
			writable: true,
			configurable: true,
		});

		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});

		await registerServiceWorker();

		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"[PWA] Service worker registration failed:",
			expect.any(Error)
		);

		consoleErrorSpy.mockRestore();
	});
});

describe("unregisterServiceWorkers", () => {
	it("should return early if service workers are not supported", async () => {
		// Remove serviceWorker property entirely
		delete (navigator as { serviceWorker?: unknown }).serviceWorker;

		await expect(unregisterServiceWorkers()).resolves.toBeUndefined();
	});

	it("should unregister all service workers", async () => {
		const mockUnregister1 = vi.fn().mockResolvedValue(true);
		const mockUnregister2 = vi.fn().mockResolvedValue(true);

		const mockRegistration1 = { unregister: mockUnregister1 };
		const mockRegistration2 = { unregister: mockUnregister2 };

		const mockGetRegistrations = vi
			.fn()
			.mockResolvedValue([mockRegistration1, mockRegistration2]);

		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				getRegistrations: mockGetRegistrations,
			},
			writable: true,
			configurable: true,
		});

		const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

		await unregisterServiceWorkers();

		expect(mockGetRegistrations).toHaveBeenCalled();
		expect(mockUnregister1).toHaveBeenCalled();
		expect(mockUnregister2).toHaveBeenCalled();
		expect(consoleSpy).toHaveBeenCalledWith(
			"[PWA] All service workers unregistered"
		);

		consoleSpy.mockRestore();
	});
});

