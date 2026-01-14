import react from "@vitejs/plugin-react";
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
		environment: "happy-dom",
		setupFiles: ["./src/test/setup.tsx"],
		include: ["src/**/*.test.{ts,tsx}"],
		exclude: [
			"src/**/*.e2e.test.{ts,tsx}",
			"src/**/*.integration.test.{ts,tsx}",
			"node_modules",
		],
		globals: true,
		coverage: {
			provider: "v8",
			reportsDirectory: "./coverage/unit",
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
