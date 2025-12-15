import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

/**
 * Root route - wraps all routes with shared providers
 */
export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<ThemeProvider>
			<Outlet />
		</ThemeProvider>
	);
}

