import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { NumberStepper } from "./number-stepper";

describe("NumberStepper component", () => {
	describe("rendering", () => {
		it("should render stepper with value", () => {
			render(<NumberStepper value={5} onChange={() => {}} />);

			expect(screen.getByDisplayValue("5")).toBeInTheDocument();
		});

		it("should render increment and decrement buttons", () => {
			render(<NumberStepper value={5} onChange={() => {}} />);

			const buttons = screen.getAllByRole("button");
			expect(buttons).toHaveLength(2);
		});

		it("should apply custom className", () => {
			render(
				<NumberStepper
					value={5}
					onChange={() => {}}
					className="custom-class"
				/>,
			);

			const container = document.querySelector(".custom-class");
			expect(container).toBeInTheDocument();
		});
	});

	describe("interactions", () => {
		it("should increment value on plus button click", async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();

			render(<NumberStepper value={5} onChange={handleChange} />);

			const buttons = screen.getAllByRole("button");
			const incrementButton = buttons[1]; // Plus button is second
			await user.click(incrementButton);

			expect(handleChange).toHaveBeenCalledWith(6);
		});

		it("should decrement value on minus button click", async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();

			render(<NumberStepper value={5} onChange={handleChange} />);

			const buttons = screen.getAllByRole("button");
			const decrementButton = buttons[0]; // Minus button is first
			await user.click(decrementButton);

			expect(handleChange).toHaveBeenCalledWith(4);
		});

		it("should allow manual input when enabled", async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();

			render(
				<NumberStepper value={5} onChange={handleChange} allowManualInput />,
			);

			const input = screen.getByRole("textbox");
			await user.clear(input);
			await user.type(input, "10");
			await user.tab(); // Trigger blur

			expect(handleChange).toHaveBeenCalledWith(10);
		});

		it("should clamp value to min/max on blur", async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();

			render(
				<NumberStepper
					value={5}
					onChange={handleChange}
					min={0}
					max={10}
					allowManualInput
				/>,
			);

			const input = screen.getByRole("textbox");
			await user.clear(input);
			await user.type(input, "50");
			await user.tab();

			expect(handleChange).toHaveBeenCalledWith(10);
		});
	});

	describe("constraints", () => {
		it("should disable decrement at min value", () => {
			render(<NumberStepper value={0} onChange={() => {}} min={0} />);

			const buttons = screen.getAllByRole("button");
			const decrementButton = buttons[0];
			expect(decrementButton).toBeDisabled();
		});

		it("should disable increment at max value", () => {
			render(<NumberStepper value={10} onChange={() => {}} max={10} />);

			const buttons = screen.getAllByRole("button");
			const incrementButton = buttons[1];
			expect(incrementButton).toBeDisabled();
		});

		it("should respect step value", async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();

			render(<NumberStepper value={5} onChange={handleChange} step={5} />);

			const buttons = screen.getAllByRole("button");
			await user.click(buttons[1]);

			expect(handleChange).toHaveBeenCalledWith(10);
		});
	});

	describe("disabled state", () => {
		it("should disable all controls when disabled", () => {
			render(<NumberStepper value={5} onChange={() => {}} disabled />);

			const buttons = screen.getAllByRole("button");
			expect(buttons[0]).toBeDisabled();
			expect(buttons[1]).toBeDisabled();

			const input = screen.getByRole("textbox");
			expect(input).toBeDisabled();
		});
	});

	describe("accessibility", () => {
		it("should have no axe violations", async () => {
			const { container } = render(
				<NumberStepper value={5} onChange={() => {}} aria-label="Quantity" />,
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations when disabled", async () => {
			const { container } = render(
				<NumberStepper
					value={5}
					onChange={() => {}}
					disabled
					aria-label="Quantity"
				/>,
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations at min value", async () => {
			const { container } = render(
				<NumberStepper
					value={0}
					onChange={() => {}}
					min={0}
					aria-label="Quantity"
				/>,
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations at max value", async () => {
			const { container } = render(
				<NumberStepper
					value={10}
					onChange={() => {}}
					max={10}
					aria-label="Quantity"
				/>,
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should support keyboard navigation", async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();

			render(<NumberStepper value={5} onChange={handleChange} />);

			const input = screen.getByRole("textbox");
			input.focus();

			await user.keyboard("{ArrowUp}");
			expect(handleChange).toHaveBeenCalledWith(6);

			await user.keyboard("{ArrowDown}");
			expect(handleChange).toHaveBeenCalledWith(4);
		});
	});
});
