/**
 * E2E Test Setup
 *
 * Minimal setup for E2E browser tests.
 * Real browser APIs are available, so no mocking needed.
 */

import type React from "react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

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

// Mock fetch globally for consistency, though browser tests often use real fetch
// We keep it flexible here
if (
	typeof globalThis.fetch === "undefined" ||
	vi.isMockFunction(globalThis.fetch)
) {
	globalThis.fetch = vi.fn().mockImplementation(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve([]),
			text: () => Promise.resolve(""),
			blob: () => Promise.resolve(new Blob()),
		} as Response),
	);
}

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
