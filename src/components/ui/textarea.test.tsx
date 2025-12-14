import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Textarea } from "./textarea";

describe("Textarea component", () => {
	describe("rendering", () => {
		it("should render a textarea element", () => {
			render(<Textarea aria-label="Message" />);

			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("data-slot", "textarea");
		});

		it("should render with placeholder", () => {
			render(<Textarea placeholder="Enter your message..." />);

			expect(
				screen.getByPlaceholderText("Enter your message...")
			).toBeInTheDocument();
		});

		it("should apply custom className", () => {
			render(<Textarea className="custom-class" aria-label="Custom" />);

			const textarea = screen.getByRole("textbox");
			expect(textarea).toHaveClass("custom-class");
		});
	});

	describe("interactions", () => {
		it("should accept user input", async () => {
			const user = userEvent.setup();
			render(<Textarea aria-label="Message" />);

			const textarea = screen.getByRole("textbox");
			await user.type(textarea, "Hello World");

			expect(textarea).toHaveValue("Hello World");
		});

		it("should call onChange when value changes", async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();

			render(<Textarea onChange={handleChange} aria-label="Message" />);

			const textarea = screen.getByRole("textbox");
			await user.type(textarea, "a");

			expect(handleChange).toHaveBeenCalled();
		});

		it("should not accept input when disabled", async () => {
			const user = userEvent.setup();
			render(<Textarea disabled defaultValue="" aria-label="Disabled" />);

			const textarea = screen.getByRole("textbox");
			await user.type(textarea, "test");

			expect(textarea).toHaveValue("");
		});
	});

	describe("states", () => {
		it("should be disabled when disabled prop is true", () => {
			render(<Textarea disabled aria-label="Disabled" />);

			expect(screen.getByRole("textbox")).toBeDisabled();
		});

		it("should be required when required prop is true", () => {
			render(<Textarea required aria-label="Required" />);

			expect(screen.getByRole("textbox")).toBeRequired();
		});

		it("should be readonly when readOnly prop is true", () => {
			render(<Textarea readOnly aria-label="Readonly" />);

			expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
		});
	});

	describe("accessibility", () => {
		it("should support aria-label", () => {
			render(<Textarea aria-label="Message content" />);

			expect(
				screen.getByRole("textbox", { name: /message content/i })
			).toBeInTheDocument();
		});

		it("should support aria-describedby", () => {
			render(
				<>
					<Textarea aria-describedby="helper" aria-label="Message" />
					<span id="helper">Enter your message</span>
				</>
			);

			expect(screen.getByRole("textbox")).toHaveAttribute(
				"aria-describedby",
				"helper"
			);
		});

		it("should have no axe violations with label", async () => {
			const { container } = render(
				<div>
					<label htmlFor="message">Message</label>
					<Textarea id="message" />
				</div>
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with aria-label", async () => {
			const { container } = render(
				<Textarea aria-label="Description" />
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations when disabled", async () => {
			const { container } = render(
				<div>
					<label htmlFor="disabled-textarea">Disabled</label>
					<Textarea id="disabled-textarea" disabled />
				</div>
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});

