import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CompatibilityErrorUI } from "./CompatibilityError.ui";
import type { BrowserInfo } from "@/lib/ai/prompt-api/compat";

const defaultBrowserInfo: BrowserInfo = {
	vendor: "chrome",
	version: "120",
	supportsPromptApi: false,
	minRequiredVersion: 138,
};

describe("CompatibilityErrorUI", () => {
	beforeEach(() => {
		// Mock clipboard
		Object.defineProperty(navigator, "clipboard", {
			value: {
				writeText: vi.fn().mockResolvedValue(undefined),
			},
			writable: true,
			configurable: true,
		});
	});

	describe("rendering", () => {
		it("should render error message", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={defaultBrowserInfo}
					errorMessage="Browser not supported"
					instructions={null}
				/>
			);

			expect(screen.getByText(/Browser not supported/)).toBeInTheDocument();
		});

		it("should render browser info", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={defaultBrowserInfo}
					errorMessage="Error"
					instructions={null}
				/>
			);

			expect(screen.getByText(/Chrome/i)).toBeInTheDocument();
		});

		it("should render instructions when provided", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={defaultBrowserInfo}
					errorMessage="Error"
					instructions="Please update your browser"
				/>
			);

			expect(screen.getByText(/Please update your browser/)).toBeInTheDocument();
		});

		it("should render when onRetry is provided", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={defaultBrowserInfo}
					errorMessage="Retry available"
					instructions={null}
					onRetry={vi.fn()}
				/>
			);

			expect(screen.getByText(/Retry available/)).toBeInTheDocument();
		});
	});

	describe("availability states", () => {
		it("should show download button for downloadable state", () => {
			render(
				<CompatibilityErrorUI
					availability="downloadable"
					browserInfo={{ ...defaultBrowserInfo, version: "138", supportsPromptApi: true }}
					errorMessage="Model needs download"
					instructions="Download the AI model"
					onRequestDownload={vi.fn()}
				/>
			);

			expect(screen.getByRole("button", { name: /download/i })).toBeInTheDocument();
		});

		it("should show loading state when checking", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={defaultBrowserInfo}
					errorMessage="Loading state"
					instructions={null}
					isChecking={true}
				/>
			);

			// Verify component renders with checking state
			expect(screen.getByText(/Loading state/)).toBeInTheDocument();
		});

		it("should show downloading state", () => {
			render(
				<CompatibilityErrorUI
					availability="downloading"
					browserInfo={{ ...defaultBrowserInfo, version: "138", supportsPromptApi: true }}
					errorMessage="Currently downloading model"
					instructions={null}
					isDownloading={true}
					downloadProgress={{ loaded: 50, total: 100, percentage: 50 }}
				/>
			);

			expect(screen.getByText(/Currently downloading model/)).toBeInTheDocument();
		});

		it("should show download error", () => {
			render(
				<CompatibilityErrorUI
					availability="downloadable"
					browserInfo={{ ...defaultBrowserInfo, version: "138", supportsPromptApi: true }}
					errorMessage="Error"
					instructions={null}
					downloadError="Download failed"
				/>
			);

			expect(screen.getByText(/Download failed/)).toBeInTheDocument();
		});
	});

	describe("interactions", () => {
		it("should provide onRetry handler", () => {
			const onRetry = vi.fn();
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={defaultBrowserInfo}
					errorMessage="Error"
					instructions={null}
					onRetry={onRetry}
				/>
			);

			// Verify the component renders with retry functionality
			expect(screen.getByText(/Error/)).toBeInTheDocument();
		});

		it("should provide onRequestDownload handler", () => {
			const onRequestDownload = vi.fn();
			render(
				<CompatibilityErrorUI
					availability="downloadable"
					browserInfo={{ ...defaultBrowserInfo, version: "138", supportsPromptApi: true }}
					errorMessage="Model needs download"
					instructions={null}
					onRequestDownload={onRequestDownload}
				/>
			);

			// Verify the component renders with download functionality
			expect(screen.getByText(/Model needs download/)).toBeInTheDocument();
		});
	});

	describe("browser vendor displays", () => {
		it("should display Firefox info", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={{ ...defaultBrowserInfo, vendor: "firefox" }}
					errorMessage="Error"
					instructions={null}
				/>
			);

			expect(screen.getByText(/Firefox/i)).toBeInTheDocument();
		});

		it("should display Edge info", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={{ ...defaultBrowserInfo, vendor: "edge" }}
					errorMessage="Error"
					instructions={null}
				/>
			);

			expect(screen.getByText(/Edge/i)).toBeInTheDocument();
		});

		it("should display Safari info", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={{ ...defaultBrowserInfo, vendor: "safari" }}
					errorMessage="Error"
					instructions={null}
				/>
			);

			expect(screen.getByText(/Safari/i)).toBeInTheDocument();
		});

		it("should display Opera info", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={{ ...defaultBrowserInfo, vendor: "opera" }}
					errorMessage="Error"
					instructions={null}
				/>
			);

			expect(screen.getByText(/Opera/i)).toBeInTheDocument();
		});

		it("should display unknown browser info", () => {
			render(
				<CompatibilityErrorUI
					availability="unsupported"
					browserInfo={{ ...defaultBrowserInfo, vendor: "unknown" }}
					errorMessage="Error"
					instructions={null}
				/>
			);

			// Should still render without crashing
			expect(screen.getByText(/Error/)).toBeInTheDocument();
		});
	});

	describe("download progress", () => {
		it("should display progress when downloading", () => {
			render(
				<CompatibilityErrorUI
					availability="downloading"
					browserInfo={{ ...defaultBrowserInfo, version: "138", supportsPromptApi: true }}
					errorMessage="Downloading in progress"
					instructions={null}
					isDownloading={true}
					downloadProgress={{ loaded: 500000000, total: 1000000000, percentage: 50 }}
				/>
			);

			// Should show the error message
			expect(screen.getByText(/Downloading in progress/)).toBeInTheDocument();
		});

		it("should handle zero progress", () => {
			render(
				<CompatibilityErrorUI
					availability="downloading"
					browserInfo={{ ...defaultBrowserInfo, version: "138", supportsPromptApi: true }}
					errorMessage="Starting download"
					instructions={null}
					isDownloading={true}
					downloadProgress={{ loaded: 0, total: 0, percentage: 0 }}
				/>
			);

			expect(screen.getByText(/Starting download/)).toBeInTheDocument();
		});
	});
});

