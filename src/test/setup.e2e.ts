/**
 * E2E Test Setup
 *
 * Minimal setup for E2E browser tests.
 * Real browser APIs are available, so no mocking needed.
 */

import { afterEach } from "vitest";

// Clear any test data between tests
afterEach(() => {
	// Clear localStorage to ensure clean state between tests
	if (typeof localStorage !== "undefined") {
		localStorage.clear();
	}
});

