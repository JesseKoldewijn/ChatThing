import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock stores
vi.mock("@nanostores/react", () => ({
	useStore: vi.fn(() => mockError),
}));

vi.mock("@/lib/stores/errors", () => ({
	currentErrorAtom: { get: () => null },
	clearError: vi.fn(),
}));

// Mock the UI component
vi.mock("./ErrorBanner.ui", () => ({
	ErrorBannerUI: ({
		title,
		message,
		onRetry,
		onDismiss,
	}: {
		title: string;
		message: string;
		onRetry?: () => void;
		onDismiss?: () => void;
	}) => (
		<div data-testid="error-banner-ui">
			<span data-testid="error-title">{title}</span>
			<span data-testid="error-message">{message}</span>
			{onRetry && (
				<button data-testid="retry-btn" onClick={onRetry}>
					Retry
				</button>
			)}
			{onDismiss && (
				<button data-testid="dismiss-btn" onClick={onDismiss}>
					Dismiss
				</button>
			)}
		</div>
	),
}));

import { clearError } from "@/lib/stores/errors";
import { useStore } from "@nanostores/react";
import { ErrorBanner } from "./ErrorBanner";

let mockError: {
	title: string;
	message: string;
	isRetryable: boolean;
	retryAction?: () => void;
	category: string;
} | null = null;

describe("ErrorBanner", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockError = null;
	});

	describe("rendering", () => {
		it("should render null when no error", () => {
			vi.mocked(useStore).mockReturnValue(null);

			const { container } = render(<ErrorBanner />);
			expect(container.firstChild).toBeNull();
		});

		it("should render error UI when error exists", () => {
			mockError = {
				title: "Error Title",
				message: "Error message",
				isRetryable: false,
				category: "network",
			};
			vi.mocked(useStore).mockReturnValue(mockError);

			render(<ErrorBanner />);
			expect(screen.getByTestId("error-banner-ui")).toBeInTheDocument();
		});

		it("should display error title", () => {
			mockError = {
				title: "Network Error",
				message: "Connection failed",
				isRetryable: false,
				category: "network",
			};
			vi.mocked(useStore).mockReturnValue(mockError);

			render(<ErrorBanner />);
			expect(screen.getByTestId("error-title")).toHaveTextContent(
				"Network Error",
			);
		});

		it("should display error message", () => {
			mockError = {
				title: "Error",
				message: "Something went wrong",
				isRetryable: false,
				category: "network",
			};
			vi.mocked(useStore).mockReturnValue(mockError);

			render(<ErrorBanner />);
			expect(screen.getByTestId("error-message")).toHaveTextContent(
				"Something went wrong",
			);
		});
	});

	describe("retry functionality", () => {
		it("should show retry button when retryAction is provided", () => {
			mockError = {
				title: "Error",
				message: "Failed",
				isRetryable: true,
				retryAction: vi.fn(),
				category: "network",
			};
			vi.mocked(useStore).mockReturnValue(mockError);

			render(<ErrorBanner />);
			expect(screen.getByTestId("retry-btn")).toBeInTheDocument();
		});

		it("should call clearError and retryAction when retry is clicked", async () => {
			const retryAction = vi.fn();
			mockError = {
				title: "Error",
				message: "Failed",
				isRetryable: true,
				retryAction,
				category: "network",
			};
			vi.mocked(useStore).mockReturnValue(mockError);

			render(<ErrorBanner />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("retry-btn"));

			expect(clearError).toHaveBeenCalled();
			expect(retryAction).toHaveBeenCalled();
		});
	});

	describe("dismiss functionality", () => {
		it("should always show dismiss button", () => {
			mockError = {
				title: "Error",
				message: "Failed",
				isRetryable: false,
				category: "network",
			};
			vi.mocked(useStore).mockReturnValue(mockError);

			render(<ErrorBanner />);
			expect(screen.getByTestId("dismiss-btn")).toBeInTheDocument();
		});

		it("should call clearError when dismiss is clicked", async () => {
			mockError = {
				title: "Error",
				message: "Failed",
				isRetryable: false,
				category: "network",
			};
			vi.mocked(useStore).mockReturnValue(mockError);

			render(<ErrorBanner />);
			const user = userEvent.setup();

			await user.click(screen.getByTestId("dismiss-btn"));

			expect(clearError).toHaveBeenCalled();
		});
	});
});
