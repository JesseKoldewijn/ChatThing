/**
 * Pre-render script for static site generation
 * Generates static HTML files at build time
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

async function prerender() {
	console.log("🚀 Starting pre-render...\n");

	// Read the client HTML template
	const templatePath = path.resolve(rootDir, "dist/client/index.html");
	if (!fs.existsSync(templatePath)) {
		console.error("❌ Client build not found. Run `npm run build:client` first.");
		process.exit(1);
	}
	const template = fs.readFileSync(templatePath, "utf-8");

	// Import the server bundle
	const serverBundlePath = path.resolve(rootDir, "dist/server/entry-server.js");
	if (!fs.existsSync(serverBundlePath)) {
		console.error("❌ Server build not found. Run `npm run build:server` first.");
		process.exit(1);
	}

	const { render, getRoutesToPrerender } = await import(serverBundlePath);

	// Get routes to pre-render
	const routes = getRoutesToPrerender();
	console.log(`📄 Pre-rendering ${routes.length} routes:\n`);

	for (const route of routes) {
		try {
			console.log(`  Rendering: ${route}`);

			// Render the route
			const { html: appHtml, head } = render(route);

			// Inject the rendered HTML into the template
			let finalHtml = template;

			// Replace the placeholder in the template
			finalHtml = finalHtml.replace(
				'<div id="root"></div>',
				`<div id="root">${appHtml}</div>`
			);

			// Inject head content if provided
			if (head) {
				// Replace existing head content with SSR head
				finalHtml = finalHtml.replace(
					/<title>.*?<\/title>/,
					head.match(/<title>.*?<\/title>/)?.[0] || "<title>AI Chat</title>"
				);

				// Add meta description if not present
				const descriptionMatch = head.match(/<meta name="description"[^>]*>/);
				if (descriptionMatch && !finalHtml.includes('name="description"')) {
					finalHtml = finalHtml.replace(
						"</head>",
						`  ${descriptionMatch[0]}\n  </head>`
					);
				}
			}

			// Determine output path
			let outputPath;
			if (route === "/") {
				outputPath = path.resolve(rootDir, "dist/client/index.html");
			} else {
				// Create route-specific HTML file (e.g., /settings -> settings.html)
				const routeName = route.replace(/^\//, "").replace(/\//g, "-") || "index";
				outputPath = path.resolve(rootDir, `dist/client/${routeName}.html`);
			}

			// Write the file
			fs.writeFileSync(outputPath, finalHtml);
			console.log(`  ✅ Written: ${path.relative(rootDir, outputPath)}`);
		} catch (error) {
			console.error(`  ❌ Failed to render ${route}:`, error.message);
		}
	}

	console.log("\n✨ Pre-rendering complete!");
}

prerender().catch((error) => {
	console.error("Pre-render failed:", error);
	process.exit(1);
});

