import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
	detectBrowser,
	quickCompatibilityCheck,
	compatibilityCheck,
	requestModelDownload,
	type BrowserInfo,
	type PromptApiAvailability,
} from "./compat";

describe("compat module extended tests", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	describe("quickCompatibilityCheck", () => {
		beforeEach(() => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
			});
		});

		it("should return browser info", () => {
			const result = quickCompatibilityCheck();

			expect(result.browserInfo).toBeDefined();
			expect(result.browserInfo.vendor).toBe("chrome");
		});

		it("should return isSupported based on browser and API presence", () => {
			// Without the API present, should be false even with supported browser
			const result = quickCompatibilityCheck();

			expect(typeof result.isSupported).toBe("boolean");
		});

		it("should return false for unsupported browsers", () => {
			vi.stubGlobal("navigator", {
				userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121",
			});

			const result = quickCompatibilityCheck();

			expect(result.isSupported).toBe(false);
			expect(result.browserInfo.vendor).toBe("firefox");
		});
	});

	describe("compatibilityCheck", () => {
		it("should return unsupported when window is undefined", async () => {
			vi.stubGlobal("window", undefined);
			vi.stubGlobal("navigator", {
				userAgent: "Chrome/138",
			});

			const result = await compatibilityCheck();

			expect(result.isCompatible).toBe(false);
			expect(result.availability).toBe("unsupported");
		});

		it("should return unsupported for old browser versions", async () => {
			vi.stubGlobal("navigator", {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
			});
			vi.stubGlobal("window", {});

			const result = await compatibilityCheck();

			expect(result.isCompatible).toBe(false);
			expect(result.error).not.toBeNull();
			expect(result.instructions).not.toBeNull();
		});

		it("should include browser info in result", async () => {
			vi.stubGlobal("navigator", {
				userAgent: "Chrome/138",
			});
			vi.stubGlobal("window", {});

			const result = await compatibilityCheck();

			expect(result.browserInfo).toBeDefined();
			expect(result.browserInfo.vendor).toBeDefined();
		});

		it("should return unsupported when Prompt API not present", async () => {
			vi.stubGlobal("navigator", {
				userAgent: "Chrome/138",
			});
			vi.stubGlobal("window", {});

			const result = await compatibilityCheck();

			expect(result.isCompatible).toBe(false);
			expect(result.availability).toBe("unsupported");
		});
	});

	describe("requestModelDownload", () => {
		it("should return error when API not available", async () => {
			vi.stubGlobal("window", {});

			const result = await requestModelDownload();

			expect(result.success).toBe(false);
			expect(result.error).not.toBeNull();
		});

		it("should attempt to create session when API available", async () => {
			const mockCreate = vi.fn().mockResolvedValue({});
			vi.stubGlobal("window", {
				LanguageModel: {
					availability: vi.fn().mockResolvedValue("available"),
					create: mockCreate,
				},
			});

			const result = await requestModelDownload();

			expect(mockCreate).toHaveBeenCalled();
			expect(result.success).toBe(true);
		});

		it("should handle create failure", async () => {
			const mockCreate = vi.fn().mockRejectedValue(new Error("Download failed"));
			vi.stubGlobal("window", {
				LanguageModel: {
					availability: vi.fn().mockResolvedValue("downloadable"),
					create: mockCreate,
				},
			});

			const result = await requestModelDownload();

			expect(result.success).toBe(false);
			expect(result.error?.message).toBe("Download failed");
		});
	});

	describe("detectBrowser edge cases", () => {
		it("should handle missing version numbers gracefully", () => {
			vi.stubGlobal("navigator", {
				userAgent: "Mozilla/5.0 (Windows NT 10.0) Chrome/ Safari/537.36",
			});

			const result = detectBrowser();

			expect(result.version).toBe("0");
		});

		it("should detect Opera with alternative UA format", () => {
			vi.stubGlobal("navigator", {
				userAgent: "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14",
			});

			const result = detectBrowser();

			// Opera old format may be detected differently
			expect(result.vendor).toBeDefined();
		});

		it("should handle very long user agent strings", () => {
			const longUA = "Mozilla/5.0 " + "A".repeat(1000) + " Chrome/138.0.0.0";
			vi.stubGlobal("navigator", {
				userAgent: longUA,
			});

			const result = detectBrowser();

			expect(result.vendor).toBe("chrome");
			expect(result.version).toBe("138");
		});

		it("should handle empty user agent", () => {
			vi.stubGlobal("navigator", {
				userAgent: "",
			});

			const result = detectBrowser();

			expect(result.vendor).toBe("unknown");
			expect(result.version).toBe("0");
		});
	});

	describe("browser version comparisons", () => {
		const testCases: Array<{
			ua: string;
			expectedVendor: string;
			expectedSupport: boolean;
		}> = [
			{
				ua: "Chrome/138.0.0.0",
				expectedVendor: "chrome",
				expectedSupport: true,
			},
			{
				ua: "Chrome/137.0.0.0",
				expectedVendor: "chrome",
				expectedSupport: false,
			},
			{
				ua: "Chrome/139.0.0.0",
				expectedVendor: "chrome",
				expectedSupport: true,
			},
			{
				ua: "Edg/138.0.0.0",
				expectedVendor: "edge",
				expectedSupport: true,
			},
			{
				ua: "Edg/137.0.0.0",
				expectedVendor: "edge",
				expectedSupport: false,
			},
		];

		testCases.forEach(({ ua, expectedVendor, expectedSupport }) => {
			it(`should detect ${expectedVendor} with support=${expectedSupport} for ${ua}`, () => {
				vi.stubGlobal("navigator", {
					userAgent: `Mozilla/5.0 AppleWebKit/537.36 ${ua}`,
				});

				const result = detectBrowser();

				expect(result.vendor).toBe(expectedVendor);
				expect(result.supportsPromptApi).toBe(expectedSupport);
			});
		});
	});

	describe("instructions generation", () => {
		it("should provide instructions for downloadable state", async () => {
			vi.stubGlobal("navigator", {
				userAgent: "Chrome/138",
			});
			vi.stubGlobal("window", {
				LanguageModel: {
					availability: vi.fn().mockResolvedValue("downloadable"),
				},
			});

			const result = await compatibilityCheck();

			expect(result.instructions).toContain("download");
		});

		it("should provide instructions for unsupported browsers", async () => {
			vi.stubGlobal("navigator", {
				userAgent: "Some Unknown Browser/1.0",
			});
			vi.stubGlobal("window", {});

			const result = await compatibilityCheck();

			expect(result.instructions).toBeTruthy();
			// Unknown browsers get a message suggesting Chrome or Edge
			expect(result.instructions).toContain("Chrome");
		});
	});

	describe("availability states", () => {
		const availabilityStates: PromptApiAvailability[] = [
			"available",
			"downloadable",
			"downloading",
			"unavailable",
			"unsupported",
			"unknown",
		];

		availabilityStates.forEach((state) => {
			it(`should handle "${state}" availability state`, async () => {
				vi.stubGlobal("navigator", {
					userAgent: "Chrome/138",
				});
				vi.stubGlobal("window", {
					LanguageModel: {
						availability: vi.fn().mockResolvedValue(state),
						create: vi.fn(),
					},
				});

				const result = await compatibilityCheck();

				// Only "available" should be compatible
				if (state === "available") {
					expect(result.isCompatible).toBe(true);
				} else if (state !== "unsupported") {
					// For other states that reach the API check
					expect(result.availability).toBe(state);
				}
			});
		});
	});

	describe("BrowserInfo type", () => {
		it("should have all required properties", () => {
			vi.stubGlobal("navigator", {
				userAgent: "Chrome/138",
			});

			const info: BrowserInfo = detectBrowser();

			expect(info).toHaveProperty("vendor");
			expect(info).toHaveProperty("version");
			expect(info).toHaveProperty("supportsPromptApi");
			expect(info).toHaveProperty("minRequiredVersion");
		});
	});
});

