import { StrictMode } from "react";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import {
	createMemoryHistory,
	RouterProvider,
} from "@tanstack/react-router";
import { createAppRouter } from "./router";

 
type PipeableStream = ReturnType<typeof renderToPipeableStream>;

export interface StreamRenderResult {
	pipe: PipeableStream["pipe"];
	abort: PipeableStream["abort"];
}

export interface StringRenderResult {
	html: string;
	head?: string;
}

/**
 * Render the app to a pipeable stream for SSR streaming
 * @param url - The URL path to render (e.g., "/" or "/settings")
 * @param options - Streaming options
 */
export function renderToStream(
	url: string,
	options?: {
		onShellReady?: () => void;
		onShellError?: (error: unknown) => void;
		onAllReady?: () => void;
		onError?: (error: unknown) => void;
	}
): StreamRenderResult {
	// Create router with memory history for SSR
	const router = createAppRouter();
	const memoryHistory = createMemoryHistory({
		initialEntries: [url],
	});

	// Update router to use memory history
	router.update({
		history: memoryHistory,
	});

	// Load the route before rendering
	router.load();

	const { pipe, abort } = renderToPipeableStream(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
		{
			onShellReady: options?.onShellReady,
			onShellError: options?.onShellError,
			onAllReady: options?.onAllReady,
			onError: options?.onError,
		}
	);

	return { pipe, abort };
}

/**
 * Render the app to a string for pre-rendering (static generation)
 * Uses streaming internally but collects to string
 * @param url - The URL path to render (e.g., "/" or "/settings")
 */
export async function render(url: string): Promise<StringRenderResult> {
	// Create router with memory history for SSR
	const router = createAppRouter();
	const memoryHistory = createMemoryHistory({
		initialEntries: [url],
	});

	// Update router to use memory history
	router.update({
		history: memoryHistory,
	});

	// Load the route before rendering
	await router.load();

	// Render to string (for pre-rendering/static generation)
	const html = renderToString(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);

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
