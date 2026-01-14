import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsConfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === "production";

const routeFileIgnorePrefixPatterns = [
	"**/*.test.tsx",
	"**/*.test.ts",
	"**/*.ui.tsx",
	"**/*.integration.tsx",
	"**/__tests__/**",
	"**/__mocks__/**",
];

/**
 * Builds a regex pattern from a list of prefixes
 * @param prefixes - The list of prefixes to build the regex pattern from
 * @returns The regex pattern
 */
const buildIgnorePrefix = (prefixes: string[]) => {
	return prefixes.map((prefix) => `^${prefix}$`).join("|");
};

const routeFileIgnorePrefix = buildIgnorePrefix(routeFileIgnorePrefixPatterns);

export default defineConfig({
	plugins: [
		tsConfigPaths(),
		tailwindcss(),
		tanstackStart({
			router: {
				quoteStyle: "double",
				routeFileIgnorePrefix,
			},
		}),
		nitro(),
		viteReact({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		// Only register PWA plugin in production builds
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["icons/*.svg"],
			injectRegister: false,
			devOptions: {
				enabled: !isProd,
			},
			manifest: {
				name: "ChatThing",
				short_name: "ChatThing",
				description:
					"Chat with AI using your browser's built-in AI capabilities. No API keys, no cloud costs, no data leaving your device.",
				start_url: "/",
				display: "standalone",
				background_color: "#0a0a0b",
				theme_color: "#0a0a0b",
				orientation: "any",
				scope: "/",
				categories: ["productivity", "utilities"],
				icons: [
					{
						src: "/icons/icon-192x192.svg",
						sizes: "192x192",
						type: "image/svg+xml",
						purpose: "any",
					},
					{
						src: "/icons/icon-512x512.svg",
						sizes: "512x512",
						type: "image/svg+xml",
						purpose: "any",
					},
					{
						src: "/icons/icon-maskable-192x192.svg",
						sizes: "192x192",
						type: "image/svg+xml",
						purpose: "maskable",
					},
					{
						src: "/icons/icon-maskable-512x512.svg",
						sizes: "512x512",
						type: "image/svg+xml",
						purpose: "maskable",
					},
				],
				shortcuts: [
					{
						name: "New Chat",
						short_name: "New",
						description: "Start a new conversation",
						url: "/?new=true",
						icons: [
							{
								src: "/icons/icon-96x96.svg",
								sizes: "96x96",
							},
						],
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,woff2}"],
				globIgnores: [
					"assets/vendor-mermaid-*.js",
					"assets/vendor-plantuml-*.js",
				],
				skipWaiting: true,
				clientsClaim: true,
				cleanupOutdatedCaches: true,
				navigateFallback: "index.html",
				navigateFallbackDenylist: [/^\/api\//],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules")) {
						if (id.includes("react-syntax-highlighter")) {
							return "vendor-syntax-highlighter";
						}
						if (id.includes("react-dom") || id.includes("react/")) {
							return "vendor-react";
						}
						if (id.includes("@tanstack")) {
							return "vendor-tanstack";
						}
						if (id.includes("@radix-ui") || id.includes("lucide-react")) {
							return "vendor-ui";
						}
						if (id.includes("@ai-sdk")) {
							return "vendor-ai-sdk";
						}
						if (id.includes("@openrouter")) {
							return "vendor-openrouter";
						}
						if (
							id.includes("react-markdown") ||
							id.includes("remark") ||
							id.includes("unified")
						) {
							return "vendor-utils";
						}
						if (id.includes("micromark")) {
							return "vendor-micromark";
						}
						if (id.includes("mdast")) {
							return "vendor-mdast";
						}
						return "vendor";
					}
				},
			},
		},
	},
	ssr: {
		noExternal: [
			/^@radix-ui\/.*/,
			"lucide-react",
			"class-variance-authority",
			"clsx",
			"tailwind-merge",
			"react-syntax-highlighter",
			"react-markdown",
			/^remark-.*/,
			/^unified.*/,
			/^unist-.*/,
			/^mdast-.*/,
			/^micromark.*/,
			/^hast-.*/,
		],
	},
});
