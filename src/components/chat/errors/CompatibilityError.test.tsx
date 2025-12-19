import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the hooks and modules
vi.mock("@/lib/ai/hooks", () => ({
	useCompatibility: vi.fn(() => ({
		compatibility: {
			isCompatible: false,
			availability: "unsupported",
			browserInfo: { vendor: "firefox", version: "121", supportsPromptApi: false, minRequiredVersion: 999 },
			error: new Error("Browser not supported"),
			instructions: "Please use Chrome 138+",
		},
		isChecking: false,
		recheck: vi.fn(),
	})),
}));

vi.mock("@/lib/hooks/useNavigation", () => ({
	useChatSearchParams: vi.fn(() => ({
		forceCompat: false,
	})),
}));

vi.mock("@/lib/ai/prompt-api/compat", () => ({
	requestModelDownload: vi.fn().mockResolvedValue({ success: true }),
	detectBrowser: vi.fn(() => ({
		vendor: "chrome",
		version: "138",
		supportsPromptApi: true,
		minRequiredVersion: 138,
	})),
	generateInstructions: vi.fn(() => "Test instructions"),
}));

// Mock the UI component
vi.mock("./CompatibilityError.ui", () => ({
	CompatibilityErrorUI: ({
		availability,
		errorMessage,
		onRetry,
		onRequestDownload,
	}: {
		availability: string;
		errorMessage?: string;
		onRetry?: () => void;
		onRequestDownload?: () => void;
	}) => (
		<div data-testid="compat-error-ui">
			<span data-testid="availability">{availability}</span>
			<span data-testid="error-message">{errorMessage}</span>
			{onRetry && (
				<button data-testid="retry-btn" onClick={onRetry}>
					Retry
				</button>
			)}
			{onRequestDownload && (
				<button data-testid="download-btn" onClick={onRequestDownload}>
					Download
				</button>
			)}
		</div>
	),
}));

import { CompatibilityError } from "./CompatibilityError";
import { useCompatibility } from "@/lib/ai/hooks";
import { useChatSearchParams } from "@/lib/hooks/useNavigation";
import { requestModelDownload } from "@/lib/ai/prompt-api/compat";

describe("CompatibilityError", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("rendering", () => {
		it("should render null when compatibility is null", () => {
			vi.mocked(useCompatibility).mockReturnValueOnce({
				compatibility: null,
				isChecking: false,
				recheck: vi.fn(),
			});

			const { container } = render(<CompatibilityError />);
			expect(container.firstChild).toBeNull();
		});

		it("should render error UI when not compatible", () => {
			render(<CompatibilityError />);
			expect(screen.getByTestId("compat-error-ui")).toBeInTheDocument();
		});

		it("should display availability status", () => {
			render(<CompatibilityError />);
			expect(screen.getByTestId("availability")).toHaveTextContent("unsupported");
		});

		it("should display error message", () => {
			render(<CompatibilityError />);
			expect(screen.getByTestId("error-message")).toHaveTextContent("Browser not supported");
		});
	});

	describe("forceCompat mode", () => {
		it("should show mock error UI when forceCompat is true", () => {
			vi.mocked(useCompatibility).mockReturnValueOnce({
				compatibility: { isCompatible: true, availability: "available", browserInfo: {}, error: null, instructions: null },
				isChecking: false,
				recheck: vi.fn(),
			} as unknown as ReturnType<typeof useCompatibility>);

			vi.mocked(useChatSearchParams).mockReturnValueOnce({
				forceCompat: true,
			} as ReturnType<typeof useChatSearchParams>);

			render(<CompatibilityError />);
			expect(screen.getByTestId("compat-error-ui")).toBeInTheDocument();
			expect(screen.getByTestId("availability")).toHaveTextContent("unsupported");
		});
	});

	describe("retry functionality", () => {
		it("should call recheck when retry button is clicked", async () => {
			const mockRecheck = vi.fn();
			vi.mocked(useCompatibility).mockReturnValueOnce({
				compatibility: {
					isCompatible: false,
					availability: "unsupported",
					browserInfo: {},
					error: new Error("Test error"),
					instructions: null,
				},
				isChecking: false,
				recheck: mockRecheck,
			} as unknown as ReturnType<typeof useCompatibility>);

			render(<CompatibilityError />);
			const user = userEvent.setup();

			const retryBtn = screen.getByTestId("retry-btn");
			await user.click(retryBtn);

			expect(mockRecheck).toHaveBeenCalled();
		});
	});

	describe("download functionality", () => {
		it("should show download button when availability is downloadable", () => {
			vi.mocked(useCompatibility).mockReturnValueOnce({
				compatibility: {
					isCompatible: false,
					availability: "downloadable",
					browserInfo: {},
					error: null,
					instructions: "Download the model",
				},
				isChecking: false,
				recheck: vi.fn(),
			} as unknown as ReturnType<typeof useCompatibility>);

			render(<CompatibilityError />);
			expect(screen.getByTestId("download-btn")).toBeInTheDocument();
		});

		it("should call requestModelDownload when download button is clicked", async () => {
			const mockRecheck = vi.fn();
			vi.mocked(useCompatibility).mockReturnValue({
				compatibility: {
					isCompatible: false,
					availability: "downloadable",
					browserInfo: {},
					error: null,
					instructions: "Download the model",
				},
				isChecking: false,
				recheck: mockRecheck,
			} as unknown as ReturnType<typeof useCompatibility>);

			render(<CompatibilityError />);
			const user = userEvent.setup();

			const downloadBtn = screen.getByTestId("download-btn");
			await user.click(downloadBtn);

			await waitFor(() => {
				expect(requestModelDownload).toHaveBeenCalled();
			});
		});
	});
});

