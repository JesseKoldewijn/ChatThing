import { renderToString } from "react-dom/server";
import App from "./App";
import { setSSRInitialRoute } from "@/lib/stores/navigation";

export interface RenderResult {
	html: string;
	head?: string;
}

/**
 * Render the app to a string for SSR/pre-rendering
 * @param url - The URL path to render (e.g., "/" or "/settings")
 */
export function render(url: string): RenderResult {
	// Set the initial route in the store before rendering
	setSSRInitialRoute(url);

	// Render the app with the initial route
	const html = renderToString(<App initialRoute={url} />);

	// Generate head content based on route
	const head = getHeadForRoute(url);

	return { html, head };
}

/**
 * Get meta tags for a specific route
 */
function getHeadForRoute(url: string): string {
	const baseHead = `
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="icon" type="image/svg+xml" href="/icons/icon-96x96.svg" />
	`;

	switch (url) {
		case "/settings":
			return `
				${baseHead}
				<title>Settings - ChatThing</title>
				<meta name="description" content="Configure your ChatThing settings" />
			`;
		case "/usage":
			return `
				${baseHead}
				<title>Usage - ChatThing</title>
				<meta name="description" content="View your ChatThing usage statistics and history" />
			`;
		case "/":
		default:
			return `
				${baseHead}
				<title>ChatThing</title>
				<meta name="description" content="Chat with AI using your browser's built-in AI capabilities" />
			`;
	}
}

/**
 * Get the list of routes to pre-render
 */
export function getRoutesToPrerender(): string[] {
	return ["/", "/settings", "/usage"];
}

