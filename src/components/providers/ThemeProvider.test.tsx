import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ThemeProvider, themeScript } from "./ThemeProvider";
import { themeAtom } from "@/lib/stores/settings";

describe("ThemeProvider", () => {
	beforeEach(() => {
		// Reset theme atom
		themeAtom.set("system");
		// Reset document classes
		document.documentElement.classList.remove("light", "dark");
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("rendering", () => {
		it("should render children", () => {
			render(
				<ThemeProvider>
					<div data-testid="child">Hello World</div>
				</ThemeProvider>
			);

			expect(screen.getByTestId("child")).toBeInTheDocument();
			expect(screen.getByText("Hello World")).toBeInTheDocument();
		});

		it("should render multiple children", () => {
			render(
				<ThemeProvider>
					<span>First</span>
					<span>Second</span>
				</ThemeProvider>
			);

			expect(screen.getByText("First")).toBeInTheDocument();
			expect(screen.getByText("Second")).toBeInTheDocument();
		});
	});

	describe("theme application", () => {
		it("should apply light theme class to document", async () => {
			themeAtom.set("light");

			render(
				<ThemeProvider>
					<div>Content</div>
				</ThemeProvider>
			);

			// Need to wait for useEffect
			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(document.documentElement.classList.contains("light")).toBe(true);
			expect(document.documentElement.classList.contains("dark")).toBe(false);
		});

		it("should apply dark theme class to document", async () => {
			themeAtom.set("dark");

			render(
				<ThemeProvider>
					<div>Content</div>
				</ThemeProvider>
			);

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(document.documentElement.classList.contains("dark")).toBe(true);
			expect(document.documentElement.classList.contains("light")).toBe(false);
		});

		it("should update theme when atom changes", async () => {
			render(
				<ThemeProvider>
					<div>Content</div>
				</ThemeProvider>
			);

			// Start with light
			act(() => {
				themeAtom.set("light");
			});

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(document.documentElement.classList.contains("light")).toBe(true);

			// Switch to dark
			act(() => {
				themeAtom.set("dark");
			});

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(document.documentElement.classList.contains("dark")).toBe(true);
			expect(document.documentElement.classList.contains("light")).toBe(false);
		});
	});

	describe("system theme", () => {
		it("should apply system preference when theme is system", async () => {
			// matchMedia is mocked to return matches: false (light mode)
			themeAtom.set("system");

			render(
				<ThemeProvider>
					<div>Content</div>
				</ThemeProvider>
			);

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			// Since matchMedia mock returns false, should apply light theme
			expect(document.documentElement.classList.contains("light")).toBe(true);
		});
	});
});

describe("themeScript", () => {
	it("should be a valid JavaScript string", () => {
		expect(typeof themeScript).toBe("string");
		expect(themeScript.length).toBeGreaterThan(0);
	});

	it("should contain localStorage access", () => {
		expect(themeScript).toContain("localStorage");
		expect(themeScript).toContain("theme-preference");
	});

	it("should contain media query for system theme", () => {
		expect(themeScript).toContain("prefers-color-scheme: dark");
	});

	it("should add appropriate classes", () => {
		expect(themeScript).toContain("classList.add");
		expect(themeScript).toContain("dark");
		expect(themeScript).toContain("light");
	});

	it("should handle errors gracefully", () => {
		expect(themeScript).toContain("try");
		expect(themeScript).toContain("catch");
	});

	it("should be an IIFE", () => {
		expect(themeScript.trim()).toMatch(/^\(function\(\)/);
		expect(themeScript.trim()).toMatch(/\)\(\);$/);
	});
});

