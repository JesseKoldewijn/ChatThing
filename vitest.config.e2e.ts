import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		setupFiles: ["./src/test/setup.e2e.ts"],
		include: ["src/**/*.e2e.test.{ts,tsx}"],
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
				"src/**/*.e2e.test.{ts,tsx}",
				"src/test/**",
				"src/main.tsx",
				"src/entry-*.tsx",
			],
			// Thresholds disabled until more tests are added
			// Enable when coverage improves:
			// thresholds: {
			// 	lines: 80,
			// 	functions: 80,
			// 	branches: 80,
			// 	statements: 80,
			// },
		},
	},
});
