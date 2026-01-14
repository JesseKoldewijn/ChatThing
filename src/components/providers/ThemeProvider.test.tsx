import { appearanceAtom, themeAtom } from "@/lib/stores/settings";
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, themeScript } from "./ThemeProvider";

describe("ThemeProvider", () => {
	beforeEach(() => {
		// Reset atoms
		appearanceAtom.set("system");
		themeAtom.set("default");
		// Reset document classes
		document.documentElement.classList.remove("light", "dark", "vibrant");
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("rendering", () => {
		it("should render children", () => {
			render(
				<ThemeProvider>
					<div data-testid="child">Hello World</div>
				</ThemeProvider>,
			);

			expect(screen.getByTestId("child")).toBeInTheDocument();
			expect(screen.getByText("Hello World")).toBeInTheDocument();
		});

		it("should render multiple children", () => {
			render(
				<ThemeProvider>
					<span>First</span>
					<span>Second</span>
				</ThemeProvider>,
			);

			expect(screen.getByText("First")).toBeInTheDocument();
			expect(screen.getByText("Second")).toBeInTheDocument();
		});
	});

	describe("appearance and theme application", () => {
		it("should apply light appearance class to document", async () => {
			appearanceAtom.set("light");

			render(
				<ThemeProvider>
					<div>Content</div>
				</ThemeProvider>,
			);

			// Need to wait for useEffect
			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(document.documentElement.classList.contains("light")).toBe(true);
			expect(document.documentElement.classList.contains("dark")).toBe(false);
		});

		it("should apply dark appearance class to document", async () => {
			appearanceAtom.set("dark");

			render(
				<ThemeProvider>
					<div>Content</div>
				</ThemeProvider>,
			);

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(document.documentElement.classList.contains("dark")).toBe(true);
			expect(document.documentElement.classList.contains("light")).toBe(false);
		});

		it("should apply vibrant theme class to document", async () => {
			themeAtom.set("vibrant");

			render(
				<ThemeProvider>
					<div>Content</div>
				</ThemeProvider>,
			);

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(document.documentElement.classList.contains("vibrant")).toBe(true);
		});

		it("should update appearance and theme when atoms change", async () => {
			render(
				<ThemeProvider>
					<div>Content</div>
				</ThemeProvider>,
			);

			// Start with light default
			act(() => {
				appearanceAtom.set("light");
				themeAtom.set("default");
			});

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(document.documentElement.classList.contains("light")).toBe(true);
			expect(document.documentElement.classList.contains("vibrant")).toBe(
				false,
			);

			// Switch to dark vibrant
			act(() => {
				appearanceAtom.set("dark");
				themeAtom.set("vibrant");
			});

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			expect(document.documentElement.classList.contains("dark")).toBe(true);
			expect(document.documentElement.classList.contains("vibrant")).toBe(true);
		});
	});

	describe("system appearance", () => {
		it("should apply system preference when appearance is system", async () => {
			// matchMedia is mocked to return matches: false (light mode)
			appearanceAtom.set("system");

			render(
				<ThemeProvider>
					<div>Content</div>
				</ThemeProvider>,
			);

			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 0));
			});

			// Since matchMedia mock returns false, should apply light appearance
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
		expect(themeScript).toContain("appearance");
		expect(themeScript).toContain("theme");
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
