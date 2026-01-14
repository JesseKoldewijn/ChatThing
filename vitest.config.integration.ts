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
		include: ["**/*.integration.test.{ts,tsx}"],
		exclude: [
			"**/*.e2e.test.{ts,tsx}",
			"**/*.extended.test.{ts,tsx}",
			"**/node_modules/**",
			// Exclude regular unit tests (but not integration tests)
			"**/!(*.integration).test.{ts,tsx}",
		],
		globals: true,
		coverage: {
			provider: "v8",
			reportsDirectory: "./coverage/integration",
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
			all: true,
			perFile: true,
			skipFull: false,
		},
	},
});
