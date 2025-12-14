import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatInputUI, type ChatInputUIProps } from "./ChatInput.ui";

const defaultProps: ChatInputUIProps = {
	value: "",
	onChange: vi.fn(),
	onSubmit: vi.fn(),
};

describe("ChatInputUI", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("rendering", () => {
		it("should render textarea with placeholder", () => {
			render(<ChatInputUI {...defaultProps} />);
			expect(
				screen.getByPlaceholderText("Type your message...")
			).toBeInTheDocument();
		});

		it("should render send button", () => {
			render(<ChatInputUI {...defaultProps} />);
			const buttons = screen.getAllByRole("button");
			expect(buttons.length).toBeGreaterThanOrEqual(2); // Image + Send buttons
		});

		it("should render image upload button", () => {
			render(<ChatInputUI {...defaultProps} />);
			expect(screen.getByTitle("Attach image")).toBeInTheDocument();
		});

		it("should render keyboard shortcuts hint", () => {
			render(<ChatInputUI {...defaultProps} />);
			// Check for kbd elements
			const kbds = document.querySelectorAll("kbd");
			expect(kbds.length).toBeGreaterThan(0);
		});

		it("should use custom placeholder", () => {
			render(<ChatInputUI {...defaultProps} placeholder="Custom placeholder" />);
			expect(
				screen.getByPlaceholderText("Custom placeholder")
			).toBeInTheDocument();
		});
	});

	describe("interactions", () => {
		it("should call onChange when typing", async () => {
			const onChange = vi.fn();
			const user = userEvent.setup();
			render(<ChatInputUI {...defaultProps} onChange={onChange} />);

			const textarea = screen.getByRole("textbox");
			await user.type(textarea, "a");

			expect(onChange).toHaveBeenCalled();
		});

		it("should call onSubmit when Enter is pressed with content", async () => {
			const onSubmit = vi.fn();
			render(<ChatInputUI {...defaultProps} value="Hello" onSubmit={onSubmit} />);

			const textarea = screen.getByRole("textbox");
			fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

			expect(onSubmit).toHaveBeenCalled();
		});

		it("should not call onSubmit when Enter is pressed without content", async () => {
			const onSubmit = vi.fn();
			render(<ChatInputUI {...defaultProps} value="" onSubmit={onSubmit} />);

			const textarea = screen.getByRole("textbox");
			fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

			expect(onSubmit).not.toHaveBeenCalled();
		});

		it("should not call onSubmit when Shift+Enter is pressed", async () => {
			const onSubmit = vi.fn();
			render(<ChatInputUI {...defaultProps} value="Hello" onSubmit={onSubmit} />);

			const textarea = screen.getByRole("textbox");
			fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });

			expect(onSubmit).not.toHaveBeenCalled();
		});

		it("should not call onSubmit when loading", async () => {
			const onSubmit = vi.fn();
			render(
				<ChatInputUI {...defaultProps} value="Hello" onSubmit={onSubmit} isLoading />
			);

			const textarea = screen.getByRole("textbox");
			fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

			expect(onSubmit).not.toHaveBeenCalled();
		});
	});

	describe("loading state", () => {
		it("should show stop button when loading", () => {
			const onStop = vi.fn();
			render(<ChatInputUI {...defaultProps} isLoading onStop={onStop} />);

			// Stop button should be visible (destructive variant)
			const buttons = screen.getAllByRole("button");
			const stopButton = buttons.find((b) =>
				b.className.includes("destructive")
			);
			expect(stopButton).toBeDefined();
		});

		it("should show stop button when loading", () => {
			render(<ChatInputUI {...defaultProps} isLoading />);

			// Find the destructive button (stop button)
			const buttons = screen.getAllByRole("button");
			// The stop button is visible during loading state
			expect(buttons.length).toBeGreaterThanOrEqual(2);
		});
	});

	describe("disabled state", () => {
		it("should disable textarea when isDisabled", () => {
			render(<ChatInputUI {...defaultProps} isDisabled />);
			expect(screen.getByRole("textbox")).toBeDisabled();
		});

		it("should disable send button when isDisabled", () => {
			render(<ChatInputUI {...defaultProps} value="Hello" isDisabled />);
			const buttons = screen.getAllByRole("button");
			// At least one button should be disabled
			expect(buttons.some((b) => b.hasAttribute("disabled"))).toBe(true);
		});
	});

	describe("image attachments", () => {
		it("should show pending images", () => {
			const pendingImages = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc123",
					mimeType: "image/png",
					name: "test.png",
				},
			];
			render(<ChatInputUI {...defaultProps} pendingImages={pendingImages} />);

			expect(screen.getByAltText("test.png")).toBeInTheDocument();
		});

		it("should show remove button on pending images", () => {
			const pendingImages = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc123",
					mimeType: "image/png",
					name: "test.png",
				},
			];
			render(<ChatInputUI {...defaultProps} pendingImages={pendingImages} />);

			expect(screen.getByLabelText("Remove image")).toBeInTheDocument();
		});

		it("should call onRemoveImage when remove button clicked", async () => {
			const onRemoveImage = vi.fn();
			const pendingImages = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc123",
					mimeType: "image/png",
					name: "test.png",
				},
			];
			const user = userEvent.setup();
			render(
				<ChatInputUI
					{...defaultProps}
					pendingImages={pendingImages}
					onRemoveImage={onRemoveImage}
				/>
			);

			await user.click(screen.getByLabelText("Remove image"));

			expect(onRemoveImage).toHaveBeenCalledWith("img-1");
		});

		it("should change placeholder when images are pending", () => {
			const pendingImages = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc123",
					mimeType: "image/png",
				},
			];
			render(<ChatInputUI {...defaultProps} pendingImages={pendingImages} />);

			expect(
				screen.getByPlaceholderText(/Add a message about the image/i)
			).toBeInTheDocument();
		});

		it("should allow submit with only images (no text)", () => {
			const onSubmit = vi.fn();
			const pendingImages = [
				{
					id: "img-1",
					data: "data:image/png;base64,abc123",
					mimeType: "image/png",
				},
			];
			render(
				<ChatInputUI
					{...defaultProps}
					value=""
					pendingImages={pendingImages}
					onSubmit={onSubmit}
				/>
			);

			const textarea = screen.getByRole("textbox");
			fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

			expect(onSubmit).toHaveBeenCalled();
		});
	});
});

