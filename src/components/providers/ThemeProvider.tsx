import {
	type Appearance,
	appearanceAtom,
	type Theme,
	themeAtom,
} from "@/lib/stores/settings";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

interface ThemeProviderProps {
	children: React.ReactNode;
}

/**
 * Apply theme and appearance classes to the document root
 * SSR-safe: only runs in browser
 */
const applyThemeToDOM = (appearance: Appearance, theme: Theme) => {
	if (typeof window === "undefined") return;

	const root = document.documentElement;

	// Determine if we should use dark mode
	const isDark =
		appearance === "dark" ||
		(appearance === "system" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);

	// Reset classes
	root.classList.remove("light", "dark", "vibrant");

	// Apply appearance
	root.classList.add(isDark ? "dark" : "light");

	// Apply theme
	if (theme === "vibrant") {
		root.classList.add("vibrant");
	}
};

/**
 * ThemeProvider ensures the appearance and theme are applied on all pages.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const appearance = useStore(appearanceAtom);
	const theme = useStore(themeAtom);

	// Apply theme on mount and when appearance or theme changes
	useEffect(() => {
		applyThemeToDOM(appearance, theme);
	}, [appearance, theme]);

	// Listen for system theme changes when using "system" appearance
	useEffect(() => {
		if (typeof window === "undefined" || appearance !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => applyThemeToDOM("system", theme);

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [appearance, theme]);

	return <>{children}</>;
};

/**
 * Inline script to prevent theme flash (FOUC)
 */
export const themeScript = `
(function() {
	try {
		var appearance = localStorage.getItem('appearance');
		var theme = localStorage.getItem('theme') || 'default';
		
		// Migration handling for old combined theme
		if (!appearance && theme === 'vibrant') {
			appearance = 'dark';
		}
		if (!appearance) appearance = 'system';
		
		var root = document.documentElement;
		var isDark = appearance === 'dark' || 
			(appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		
		root.classList.remove('light', 'dark', 'vibrant');
		root.classList.add(isDark ? 'dark' : 'light');
		if (theme === 'vibrant') root.classList.add('vibrant');
	} catch (e) {}
})();
`;
