import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { themeAtom, type Theme } from "@/lib/stores/settings";

interface ThemeProviderProps {
	children: React.ReactNode;
}

/**
 * Check if running in browser environment
 */
const isBrowser = typeof window !== "undefined";

/**
 * Apply theme class to the document root
 * SSR-safe: only runs in browser
 */
const applyThemeToDOM = (theme: Theme) => {
	if (!isBrowser) return;

	const root = document.documentElement;
	const isDark =
		theme === "dark" ||
		(theme === "system" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);

	if (isDark) {
		if (!root.classList.contains("dark")) {
			root.classList.remove("light");
			root.classList.add("dark");
		}
	} else {
		if (!root.classList.contains("light")) {
			root.classList.remove("dark");
			root.classList.add("light");
		}
	}
};

/**
 * ThemeProvider ensures the theme is applied on all pages.
 * It subscribes to the themeAtom and applies the theme to the document root.
 * This component should wrap the entire application.
 *
 * SSR-safe: Uses CSS media queries for initial server render, then hydrates
 * with the user's stored theme preference via useEffect.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const theme = useStore(themeAtom);

	// Apply theme on mount and when it changes (client-side only via useEffect)
	useEffect(() => {
		applyThemeToDOM(theme);
	}, [theme]);

	// Listen for system theme changes when using "system" theme
	useEffect(() => {
		if (!isBrowser || theme !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => applyThemeToDOM("system");

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	return <>{children}</>;
};

/**
 * Inline script to prevent theme flash (FOUC)
 * This script runs before React hydrates to apply the correct theme immediately.
 * Include this in the HTML head for best results.
 */
export const themeScript = `
(function() {
	try {
		var theme = localStorage.getItem('theme') || 'system';
		var root = document.documentElement;
		root.classList.remove('light', 'dark');
		if (theme === 'system') {
			var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			root.classList.add(isDark ? 'dark' : 'light');
		} else {
			root.classList.add(theme);
		}
	} catch (e) {}
})();
`;

