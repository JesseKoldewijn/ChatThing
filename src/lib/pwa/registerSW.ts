/**
 * PWA Service Worker Registration and Update Handler
 * 
 * This module handles:
 * 1. Registering the service worker
 * 2. Periodically checking for updates
 * 3. Automatically reloading when updates are available
 */

// Check interval for SW updates (every 60 seconds)
const UPDATE_CHECK_INTERVAL = 60 * 1000;

/**
 * Register the service worker and set up automatic updates
 */
export async function registerServiceWorker(): Promise<void> {
	if (!("serviceWorker" in navigator)) {
		console.log("[PWA] Service workers not supported");
		return;
	}

	try {
		const registration = await navigator.serviceWorker.register("/sw.js", {
			scope: "/",
		});
		console.log("[PWA] Service worker registered");

		// Check for updates immediately
		await registration.update();

		// Set up periodic update checks
		setInterval(async () => {
			try {
				await registration.update();
			} catch (error) {
				if (import.meta.env.DEV) {
					console.warn("[PWA] Update check failed:", error);
				}
			}
		}, UPDATE_CHECK_INTERVAL);

		// Handle the "waiting" state - a new SW is ready but waiting
		if (registration.waiting) {
			handleWaitingServiceWorker(registration.waiting);
		}

		// Listen for new service workers becoming available
		registration.addEventListener("updatefound", () => {
			const newWorker = registration.installing;
			if (!newWorker) return;

			console.log("[PWA] New service worker installing...");

			newWorker.addEventListener("statechange", () => {
				if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
					// New SW installed but waiting - trigger reload
					handleWaitingServiceWorker(newWorker);
				}
			});
		});

		// Handle controller change (new SW took over)
		let refreshing = false;
		navigator.serviceWorker.addEventListener("controllerchange", () => {
			if (refreshing) return;
			refreshing = true;
			window.location.reload();
		});

	} catch (error) {
		if (import.meta.env.DEV) {
			console.error("[PWA] Service worker registration failed:", error);
		}
	}
}

/**
 * Handle a waiting service worker by telling it to skip waiting
 */
function handleWaitingServiceWorker(worker: ServiceWorker): void {
	// Tell the waiting SW to skip waiting and become active
	worker.postMessage({ type: "SKIP_WAITING" });
}

/**
 * Unregister all service workers (useful for debugging)
 */
export async function unregisterServiceWorkers(): Promise<void> {
	if (!("serviceWorker" in navigator)) return;

	const registrations = await navigator.serviceWorker.getRegistrations();
	await Promise.all(registrations.map((r) => r.unregister()));
	console.log("[PWA] All service workers unregistered");
}

