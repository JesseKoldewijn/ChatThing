import { useStore } from "@nanostores/react";
import { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { currentPageAtom, setSSRInitialRoute } from "@/lib/stores/navigation";
import { markHydrated } from "@/lib/stores/hydration";

// Lazy load ChatContainer for code splitting
const ChatContainer = lazy(() =>
	import("@/components/chat/container/ChatContainer").then((m) => ({
		default: m.ChatContainer,
	}))
);

// Lazy load SettingsPage for code splitting
const SettingsPage = lazy(() =>
	import("@/components/settings/SettingsPage").then((m) => ({
		default: m.SettingsPage,
	}))
);

// Lazy load UsagePage for code splitting
const UsagePage = lazy(() =>
	import("@/components/usage/UsagePage").then((m) => ({
		default: m.UsagePage,
	}))
);

/**
 * Page router component
 * Note: With SSR pre-rendering, the settings page HTML is already pre-rendered.
 * The Suspense fallback (null) is only shown briefly during client-side navigation.
 */
const PageRouter = () => {
	const currentPage = useStore(currentPageAtom);

	switch (currentPage) {
		case "settings":
			return (
				<Suspense fallback={null}>
					<SettingsPage />
				</Suspense>
			);
		case "usage":
			return (
				<Suspense fallback={null}>
					<UsagePage />
				</Suspense>
			);
		case "chat":
		default:
			return (
				<Suspense fallback={null}>
					<ChatContainer />
				</Suspense>
			);
	}
};

interface AppProps {
	/** Initial route for SSR pre-rendering */
	initialRoute?: string;
}

/**
 * Root App component with providers
 */
const App = ({ initialRoute }: AppProps) => {
	// Set initial route for SSR (runs before first render on server)
	if (initialRoute) {
		setSSRInitialRoute(initialRoute);
	}

	// Mark hydration as complete after first render
	// This allows stores to safely read from localStorage
	useEffect(() => {
		markHydrated();
	}, []);

	return (
		<ThemeProvider>
			<PageRouter />
		</ThemeProvider>
	);
};

export default App;
