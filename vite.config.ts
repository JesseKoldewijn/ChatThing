import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
	plugins: [
		tsConfigPaths(),
		tailwindcss(),
		tanstackStart(),
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
