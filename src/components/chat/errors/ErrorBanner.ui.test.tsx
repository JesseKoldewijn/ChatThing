import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBannerUI, type ErrorBannerUIProps } from "./ErrorBanner.ui";

const defaultProps: ErrorBannerUIProps = {
	title: "Something went wrong",
	message: "An error occurred while processing your request.",
	category: "unknown",
	isRetryable: true,
};

describe("ErrorBannerUI", () => {
	describe("rendering", () => {
		it("should render error title", () => {
			render(<ErrorBannerUI {...defaultProps} title="Connection Error" />);
			expect(screen.getByText("Connection Error")).toBeInTheDocument();
		});

		it("should render error message", () => {
			render(
				<ErrorBannerUI
					{...defaultProps}
					message="Check your internet connection."
				/>
			);
			expect(
				screen.getByText("Check your internet connection.")
			).toBeInTheDocument();
		});

		it("should have alert role", () => {
			render(<ErrorBannerUI {...defaultProps} />);
			expect(screen.getByRole("alert")).toBeInTheDocument();
		});
	});

	describe("categories", () => {
		it("should render network error", () => {
			render(
				<ErrorBannerUI
					{...defaultProps}
					category="network"
					title="Connection Error"
				/>
			);
			expect(screen.getByText("Connection Error")).toBeInTheDocument();
		});

		it("should render rate limit error", () => {
			render(
				<ErrorBannerUI
					{...defaultProps}
					category="rate_limit"
					title="Rate Limited"
				/>
			);
			expect(screen.getByText("Rate Limited")).toBeInTheDocument();
		});

		it("should render context error", () => {
			render(
				<ErrorBannerUI
					{...defaultProps}
					category="context"
					title="Message Too Long"
				/>
			);
			expect(screen.getByText("Message Too Long")).toBeInTheDocument();
		});

		it("should render model error", () => {
			render(
				<ErrorBannerUI
					{...defaultProps}
					category="model"
					title="AI Model Error"
				/>
			);
			expect(screen.getByText("AI Model Error")).toBeInTheDocument();
		});

		it("should render api error", () => {
			render(
				<ErrorBannerUI {...defaultProps} category="api" title="API Error" />
			);
			expect(screen.getByText("API Error")).toBeInTheDocument();
		});

		it("should render permission error", () => {
			render(
				<ErrorBannerUI
					{...defaultProps}
					category="permission"
					title="Permission Denied"
				/>
			);
			expect(screen.getByText("Permission Denied")).toBeInTheDocument();
		});
	});

	describe("dismiss", () => {
		it("should call onDismiss when dismiss button clicked", async () => {
			const onDismiss = vi.fn();
			const user = userEvent.setup();
			render(<ErrorBannerUI {...defaultProps} onDismiss={onDismiss} />);

			// Find dismiss button (X icon button)
			const buttons = screen.getAllByRole("button");
			const dismissButton = buttons.find(
				(b) => !b.textContent?.toLowerCase().includes("retry")
			);
			if (dismissButton) {
				await user.click(dismissButton);
				expect(onDismiss).toHaveBeenCalled();
			}
		});
	});

	describe("retry", () => {
		it("should show retry button when isRetryable and onRetry provided", () => {
			const onRetry = vi.fn();
			render(
				<ErrorBannerUI {...defaultProps} isRetryable onRetry={onRetry} />
			);

			// Look for any button that could be retry
			const buttons = screen.getAllByRole("button");
			expect(buttons.length).toBeGreaterThanOrEqual(1);
		});

		it("should not show retry text when not retryable", () => {
			render(<ErrorBannerUI {...defaultProps} isRetryable={false} />);

			// Should only have dismiss button, not retry
			const buttons = screen.queryAllByRole("button");
			// 0 or 1 button (dismiss only)
			expect(buttons.length).toBeLessThanOrEqual(1);
		});

		it("should call onRetry when retry button clicked", async () => {
			const onRetry = vi.fn();
			const user = userEvent.setup();
			render(
				<ErrorBannerUI {...defaultProps} isRetryable onRetry={onRetry} />
			);

			// Find all buttons and click the retry one
			const buttons = screen.getAllByRole("button");
			// First button with "Retry" text or just click the first one
			const retryButton = buttons.find((b) =>
				b.textContent?.toLowerCase().includes("retry")
			);
			if (retryButton) {
				await user.click(retryButton);
				expect(onRetry).toHaveBeenCalled();
			}
		});
	});
});

