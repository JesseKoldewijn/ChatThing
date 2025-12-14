import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MessageListUI, type MessageListUIProps } from "./MessageList.ui";

const defaultProps: MessageListUIProps = {
	children: null,
	isEmpty: true,
};

describe("MessageListUI", () => {
	describe("empty state", () => {
		it("should render empty state when isEmpty is true", () => {
			render(<MessageListUI {...defaultProps} isEmpty />);

			// Should show welcome or empty state with sparkles icon
			expect(
				screen.getByText(/start|chat|conversation/i)
			).toBeInTheDocument();
		});
	});

	describe("children rendering", () => {
		it("should render children when provided", () => {
			render(
				<MessageListUI {...defaultProps} isEmpty={false}>
					<div data-testid="child-message">Hello World</div>
				</MessageListUI>
			);

			expect(screen.getByTestId("child-message")).toBeInTheDocument();
			expect(screen.getByText("Hello World")).toBeInTheDocument();
		});

		it("should render multiple children", () => {
			render(
				<MessageListUI {...defaultProps} isEmpty={false}>
					<div>Message 1</div>
					<div>Message 2</div>
					<div>Message 3</div>
				</MessageListUI>
			);

			expect(screen.getByText("Message 1")).toBeInTheDocument();
			expect(screen.getByText("Message 2")).toBeInTheDocument();
			expect(screen.getByText("Message 3")).toBeInTheDocument();
		});
	});

	describe("loading state", () => {
		it("should show loading indicator when isLoading", () => {
			render(<MessageListUI {...defaultProps} isEmpty={false} isLoading />);

			// Should show typing indicator with "Thinking" text
			expect(screen.getByText("Thinking")).toBeInTheDocument();
		});

		it("should not show empty state when loading", () => {
			render(<MessageListUI {...defaultProps} isEmpty isLoading />);

			// Loading takes precedence - should show Thinking instead of empty state
			expect(screen.getByText("Thinking")).toBeInTheDocument();
		});
	});

	describe("scroll container", () => {
		it("should have scroll area container", () => {
			const { container } = render(
				<MessageListUI {...defaultProps} isEmpty={false}>
					<div>Content</div>
				</MessageListUI>
			);

			// Should have a scrollable container
			const scrollContainer = container.querySelector(
				'[data-slot="scroll-area"]'
			);
			expect(scrollContainer).toBeInTheDocument();
		});
	});
});

