import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		tailwindcss(),
		// Only register PWA plugin in production builds
		isProd &&
			VitePWA({
				registerType: "autoUpdate",
				includeAssets: ["icons/*.svg"],
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
					runtimeCaching: [
						{
							urlPattern:
								/^https:\/\/fonts\.googleapis\.com\/.*/i,
							handler: "CacheFirst",
							options: {
								cacheName: "google-fonts-cache",
								expiration: {
									maxEntries: 10,
									maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
								},
								cacheableResponse: {
									statuses: [0, 200],
								},
							},
						},
					],
				},
			}),
	].filter(Boolean),
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	optimizeDeps: {
		include: ["react-is", "recharts", "@tanstack/react-table"],
	},
	// SPA fallback - all routes serve index.html
	appType: "spa",
	// SSR configuration
	ssr: {
		// Bundle these dependencies for SSR (they use ESM or need processing)
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
	build: {
		outDir: "dist/client",
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Split node_modules into separate chunks
					// NOTE: Order matters! More specific patterns must come before generic ones
					if (id.includes("node_modules")) {
						// Syntax highlighting - separate chunk (includes dependencies)
						// Must come before "react" check since react-syntax-highlighter contains "react"
						if (
							id.includes("/react-syntax-highlighter/") ||
							id.includes("/highlight.js/") ||
							id.includes("/highlightjs-") ||
							id.includes("/prismjs/") ||
							id.includes("/refractor/") ||
							id.includes("/lowlight/") ||
							id.includes("/fault/")
						) {
							return "vendor-syntax";
						}

						// Markdown - heavy dependency
						// Must come before "react" check since react-markdown contains "react"
						if (
							id.includes("/react-markdown/") ||
							id.includes("/remark-")
						) {
							return "vendor-markdown";
						}

						// Focus management and accessibility utilities
						// Must come before "react" check since some contain "react"
						if (
							id.includes("/aria-hidden/") ||
							id.includes("/react-remove-scroll") ||
							id.includes("/use-callback-ref/") ||
							id.includes("/use-sidecar/") ||
							id.includes("/focus-lock/") ||
							id.includes("/react-focus-lock/") ||
							id.includes("/detect-node")
						) {
							return "vendor-a11y";
						}

						// Radix UI components - UI library
						// Must come before "react" check
						if (id.includes("/@radix-ui/")) {
							return "vendor-radix";
						}

						// Lucide icons
						// Must come before "react" check since lucide-react contains "react"
						if (id.includes("/lucide-react/")) {
							return "vendor-icons";
						}

						// React and React DOM - core framework
						// This is now more specific to avoid matching react-* packages
						if (
							id.includes("/react/") ||
							id.includes("/react-dom/")
						) {
							return "vendor-react";
						}

						// React scheduler - React's internal scheduling
						if (id.includes("/scheduler/")) {
							return "vendor-scheduler";
						}

						// AI libraries - can be large
						if (
							id.includes("/@built-in-ai/") ||
							id.includes("/ai/")
						) {
							return "vendor-ai";
						}

						// Unified/hast/mdast ecosystem - markdown AST processing
						if (
							id.includes("/hast-") ||
							id.includes("/mdast-") ||
							id.includes("/unist-") ||
							id.includes("/unified/") ||
							id.includes("/micromark") ||
							id.includes("/property-information/") ||
							id.includes("/space-separated-tokens/") ||
							id.includes("/comma-separated-tokens/") ||
							id.includes("/vfile/") ||
							id.includes("/hastscript/") ||
							id.includes("/html-void-elements/") ||
							id.includes("/ccount/") ||
							id.includes("/zwitch/") ||
							id.includes("/stringify-entities/") ||
							id.includes("/character-entities")
						) {
							return "vendor-unified";
						}

						// Floating UI - positioning library for tooltips/popovers
						if (id.includes("/@floating-ui/")) {
							return "vendor-floating";
						}

						// Nanostores - state management
						if (
							id.includes("/nanostores/") ||
							id.includes("/@nanostores/")
						) {
							return "vendor-state";
						}

						// Tailwind and styling utilities
						if (
							id.includes("/tailwind") ||
							id.includes("/clsx/") ||
							id.includes("/class-variance-authority/") ||
							id.includes("/tailwind-merge/")
						) {
							return "vendor-styles";
						}

						// Other vendor libraries - split further if needed
						return "vendor-other";
					}
				},
			},
		},
		chunkSizeWarningLimit: 600,
	},
});
