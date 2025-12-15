/**
 * E2E Test Setup
 *
 * Minimal setup for E2E browser tests.
 * Real browser APIs are available, so no mocking needed.
 */

import { afterEach, beforeAll, afterAll, vi } from "vitest";

// Suppress React act() warnings in e2e tests
// These warnings occur because nanostores updates trigger React re-renders
// In e2e tests, we're testing real browser behavior, so these warnings are expected
const originalError = console.error;
beforeAll(() => {
	vi.spyOn(console, "error").mockImplementation((message, ...args) => {
		// Suppress act() warnings in e2e tests
		if (
			typeof message === "string" &&
			message.includes("not wrapped in act(...)")
		) {
			return;
		}
		originalError(message, ...args);
	});
});

afterAll(() => {
	vi.restoreAllMocks();
});

// Clear any test data between tests
afterEach(() => {
	// Clear localStorage to ensure clean state between tests
	if (typeof localStorage !== "undefined") {
		localStorage.clear();
	}
});

