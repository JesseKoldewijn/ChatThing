import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { createAppRouter } from "./router";
import { markHydrated } from "@/lib/stores/hydration";
import "@/styles/globals.css";

// Create the router instance
const router = createAppRouter();

const rootElement = document.getElementById("root")!;

// Check if the page was pre-rendered (has content)
const hasPrerenderedContent = rootElement.innerHTML.trim().length > 0;

if (hasPrerenderedContent) {
	// Hydrate pre-rendered HTML
	hydrateRoot(
		rootElement,
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
} else {
	// Fallback to client-side rendering (dev mode or if pre-render failed)
	createRoot(rootElement).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}

// Mark hydration as complete after React has hydrated
// This allows stores to safely read from localStorage
requestIdleCallback(() => {
	markHydrated();
}, { timeout: 100 });

// Register service worker for PWA (production only)
if (import.meta.env.PROD) {
	import("@/lib/pwa/registerSW").then(({ registerServiceWorker }) => {
		registerServiceWorker();
	});
}
