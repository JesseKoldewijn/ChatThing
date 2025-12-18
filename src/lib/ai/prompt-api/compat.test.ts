import { describe, it, expect, vi, afterEach } from "vitest";
import { detectBrowser } from "./compat";

describe("compat module", () => {
	describe("detectBrowser", () => {
		afterEach(() => {
			vi.unstubAllGlobals();
		});

		it("should return unknown when navigator is undefined", () => {
			vi.stubGlobal("navigator", undefined);

			const result = detectBrowser();

			expect(result.vendor).toBe("unknown");
			expect(result.version).toBe("0");
			expect(result.supportsPromptApi).toBe(false);
		});

		it("should detect Chrome", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
			});

			const result = detectBrowser();

			expect(result.vendor).toBe("chrome");
			expect(result.version).toBe("138");
		});

		it("should detect Edge", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0",
			});

			const result = detectBrowser();

			expect(result.vendor).toBe("edge");
			expect(result.version).toBe("138");
		});

		it("should detect Firefox", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121",
			});

			const result = detectBrowser();

			expect(result.vendor).toBe("firefox");
			expect(result.version).toBe("121");
		});

		it("should detect Safari", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
			});

			const result = detectBrowser();

			expect(result.vendor).toBe("safari");
			expect(result.version).toBe("17");
		});

		it("should detect Opera", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106",
			});

			const result = detectBrowser();

			expect(result.vendor).toBe("opera");
			expect(result.version).toBe("106");
		});

		it("should report supportsPromptApi true for Chrome >= 138", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
			});

			const result = detectBrowser();

			expect(result.supportsPromptApi).toBe(true);
		});

		it("should report supportsPromptApi false for Chrome < 138", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
			});

			const result = detectBrowser();

			expect(result.supportsPromptApi).toBe(false);
		});

		it("should report supportsPromptApi true for Edge >= 138", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0",
			});

			const result = detectBrowser();

			expect(result.supportsPromptApi).toBe(true);
		});

		it("should report supportsPromptApi false for Firefox", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121",
			});

			const result = detectBrowser();

			expect(result.supportsPromptApi).toBe(false);
		});

		it("should report supportsPromptApi false for Safari", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
			});

			const result = detectBrowser();

			expect(result.supportsPromptApi).toBe(false);
		});

		it("should have correct minRequiredVersion for Chrome", () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
			});

			const result = detectBrowser();

			expect(result.minRequiredVersion).toBe(138);
		});

		it("should handle unknown browser", () => {
			vi.stubGlobal("navigator", {
				userAgent: "Some Unknown Browser/1.0",
			});

			const result = detectBrowser();

			expect(result.vendor).toBe("unknown");
			expect(result.supportsPromptApi).toBe(false);
		});
	});
});

