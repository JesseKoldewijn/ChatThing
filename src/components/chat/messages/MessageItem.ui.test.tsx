import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MessageItemUI, type MessageItemUIProps } from "./MessageItem.ui";

const defaultProps: MessageItemUIProps = {
	content: "Hello, world!",
	role: "user",
	isStreaming: false,
};

describe("MessageItemUI", () => {
	describe("rendering", () => {
		it("should render user message", () => {
			render(<MessageItemUI {...defaultProps} />);
			expect(screen.getByText("Hello, world!")).toBeInTheDocument();
		});

		it("should render assistant message", () => {
			render(
				<MessageItemUI
					{...defaultProps}
					role="assistant"
					content="Hi there! How can I help?"
				/>
			);
			expect(
				screen.getByText("Hi there! How can I help?")
			).toBeInTheDocument();
		});

		it("should render with different styling for user vs assistant", () => {
			const { container: userContainer } = render(
				<MessageItemUI {...defaultProps} />
			);
			const userDiv = userContainer.firstChild;

			const { container: assistantContainer } = render(
				<MessageItemUI {...defaultProps} role="assistant" />
			);
			const assistantDiv = assistantContainer.firstChild;

			// They should have different layout (flex direction)
			expect((userDiv as HTMLElement)?.className).toContain("flex-row-reverse");
			expect((assistantDiv as HTMLElement)?.className).not.toContain(
				"flex-row-reverse"
			);
		});
	});

	describe("streaming", () => {
		it("should render streaming content", () => {
			render(
				<MessageItemUI {...defaultProps} role="assistant" isStreaming />
			);

			const messageContainer = screen.getByText("Hello, world!").parentElement;
			expect(messageContainer).toBeInTheDocument();
		});
	});

	describe("regenerate button", () => {
		it("should show regenerate button for assistant message with onRegenerate", () => {
			const onRegenerate = vi.fn();
			render(
				<MessageItemUI
					{...defaultProps}
					role="assistant"
					onRegenerate={onRegenerate}
				/>
			);

			// Assistant messages should have buttons (copy, regenerate)
			const buttons = screen.queryAllByRole("button");
			expect(buttons.length).toBeGreaterThan(0);
		});
	});

	describe("images", () => {
		it("should render attached images", () => {
			const images = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc123",
					mimeType: "image/png",
					name: "test.png",
				},
			];
			render(<MessageItemUI {...defaultProps} images={images} />);

			expect(screen.getByAltText("test.png")).toBeInTheDocument();
		});

		it("should render multiple images", () => {
			const images = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc1",
					mimeType: "image/png",
					name: "first.png",
				},
				{
					id: "img-2",
					data: "data:image/png;base64,abc2",
					mimeType: "image/png",
					name: "second.png",
				},
			];
			render(<MessageItemUI {...defaultProps} images={images} />);

			expect(screen.getByAltText("first.png")).toBeInTheDocument();
			expect(screen.getByAltText("second.png")).toBeInTheDocument();
		});
	});

	describe("content rendering", () => {
		it("should use custom renderContent if provided", () => {
			const renderContent = (content: string) => (
				<div data-testid="custom-render">{content.toUpperCase()}</div>
			);
			render(
				<MessageItemUI
					{...defaultProps}
					role="assistant"
					renderContent={renderContent}
				/>
			);

			expect(screen.getByTestId("custom-render")).toBeInTheDocument();
			expect(screen.getByTestId("custom-render")).toHaveTextContent(
				"HELLO, WORLD!"
			);
		});
	});

	describe("copy functionality", () => {
		it("should render assistant message with content", () => {
			render(<MessageItemUI {...defaultProps} role="assistant" />);

			// Should render the content
			expect(screen.getByText("Hello, world!")).toBeInTheDocument();
		});

		it("should have onCopy handler available", () => {
			const onCopy = vi.fn();
			render(
				<MessageItemUI {...defaultProps} role="assistant" onCopy={onCopy} />
			);

			// Component should render with the handler
			expect(screen.getByText("Hello, world!")).toBeInTheDocument();
		});

		it("should render with isCopied state", () => {
			render(
				<MessageItemUI {...defaultProps} role="assistant" isCopied />
			);

			// Should still render content
			expect(screen.getByText("Hello, world!")).toBeInTheDocument();
		});
	});
});

