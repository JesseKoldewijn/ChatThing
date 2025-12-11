import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import { setSSRInitialRoute } from "@/lib/stores/navigation";
import "@/styles/globals.css";

// Initialize navigation state from URL BEFORE React renders
// This ensures sidebar state matches URL on first render (avoiding flash)
const initialUrl = window.location.pathname + window.location.search;
setSSRInitialRoute(initialUrl);

const rootElement = document.getElementById("root")!;

// Check if the page was pre-rendered (has content)
const hasPrerenderedContent = rootElement.innerHTML.trim().length > 0;

if (hasPrerenderedContent) {
	// Hydrate pre-rendered HTML
	hydrateRoot(
		rootElement,
		<StrictMode>
			<App />
		</StrictMode>
	);
} else {
	// Fallback to client-side rendering (dev mode or if pre-render failed)
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}
