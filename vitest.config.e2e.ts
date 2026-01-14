import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		setupFiles: ["./src/test/setup.e2e.tsx"],
		include: ["src/**/*.e2e.test.{ts,tsx}"],
		exclude: ["src/**/*.integration.test.{ts,tsx}", "node_modules"],
		globals: true,
		browser: {
			enabled: true,
			provider: playwright(),
			instances: [{ browser: "chromium" }],
			headless: true, // CI mode by default
		},
		coverage: {
			provider: "v8",
			reportsDirectory: "./coverage/e2e",
			reporter: ["text", "lcov", "json-summary"],
			include: ["src/**/*.{ts,tsx}"],
			exclude: [
				"src/**/*.test.{ts,tsx}",
				"src/**/*.integration.test.{ts,tsx}",
				"src/**/*.e2e.test.{ts,tsx}",
				"src/test/**",
				"src/main.tsx",
				"src/entry-*.tsx",
				"src/routeTree.gen.ts",
				"src/router.tsx",
				"src/types/**",
				"src/routes/**",
				"src/layout/**",
				"src/components/providers/**",
			],
			// Enable all to ensure browser context code is instrumented
			all: true,
			// Allow coverage collection in browser context
			allowExternal: false,
			// Enable per-file coverage to better track browser execution
			perFile: true,
			// Ensure coverage is collected even for files that are imported but not directly executed
			skipFull: false,
		},
	},
});
