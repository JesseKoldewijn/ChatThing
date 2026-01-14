import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Input } from "./input";

describe("Input component", () => {
	describe("rendering", () => {
		it("should render an input element", () => {
			render(<Input />);

			const input = screen.getByRole("textbox");
			expect(input).toBeInTheDocument();
			expect(input).toHaveAttribute("data-slot", "input");
		});

		it("should render with placeholder", () => {
			render(<Input placeholder="Enter text..." />);

			expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
		});

		it("should apply custom className", () => {
			render(<Input className="custom-class" />);

			const input = screen.getByRole("textbox");
			expect(input).toHaveClass("custom-class");
		});
	});

	describe("types", () => {
		it("should render text input when type is specified", () => {
			render(<Input type="text" />);

			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute("type", "text");
		});

		it("should render email input", () => {
			render(<Input type="email" />);

			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute("type", "email");
		});

		it("should render password input", () => {
			render(<Input type="password" />);

			// Password inputs don't have textbox role
			const input = document.querySelector('input[type="password"]');
			expect(input).toBeInTheDocument();
		});

		it("should render number input", () => {
			render(<Input type="number" />);

			const input = screen.getByRole("spinbutton");
			expect(input).toHaveAttribute("type", "number");
		});
	});

	describe("interactions", () => {
		it("should accept user input", async () => {
			const user = userEvent.setup();
			render(<Input />);

			const input = screen.getByRole("textbox");
			await user.type(input, "Hello World");

			expect(input).toHaveValue("Hello World");
		});

		it("should call onChange when value changes", async () => {
			const handleChange = vi.fn();
			const user = userEvent.setup();

			render(<Input onChange={handleChange} />);

			const input = screen.getByRole("textbox");
			await user.type(input, "a");

			expect(handleChange).toHaveBeenCalled();
		});

		it("should not accept input when disabled", async () => {
			const user = userEvent.setup();
			render(<Input disabled defaultValue="" />);

			const input = screen.getByRole("textbox");
			await user.type(input, "test");

			expect(input).toHaveValue("");
		});
	});

	describe("states", () => {
		it("should be disabled when disabled prop is true", () => {
			render(<Input disabled />);

			expect(screen.getByRole("textbox")).toBeDisabled();
		});

		it("should be required when required prop is true", () => {
			render(<Input required />);

			expect(screen.getByRole("textbox")).toBeRequired();
		});

		it("should be readonly when readOnly prop is true", () => {
			render(<Input readOnly />);

			expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
		});
	});

	describe("accessibility", () => {
		it("should support aria-label", () => {
			render(<Input aria-label="Email address" />);

			expect(
				screen.getByRole("textbox", { name: /email address/i }),
			).toBeInTheDocument();
		});

		it("should support aria-describedby", () => {
			render(
				<>
					<Input aria-describedby="helper" />
					<span id="helper">Enter your email</span>
				</>,
			);

			expect(screen.getByRole("textbox")).toHaveAttribute(
				"aria-describedby",
				"helper",
			);
		});

		it("should support aria-invalid", () => {
			render(<Input aria-invalid="true" />);

			expect(screen.getByRole("textbox")).toHaveAttribute(
				"aria-invalid",
				"true",
			);
		});

		it("should have no axe violations with label", async () => {
			const { container } = render(
				<div>
					<label htmlFor="email">Email</label>
					<Input id="email" type="email" />
				</div>,
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with aria-label", async () => {
			const { container } = render(<Input aria-label="Search" type="search" />);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations when disabled", async () => {
			const { container } = render(
				<div>
					<label htmlFor="disabled-input">Disabled</label>
					<Input id="disabled-input" disabled />
				</div>,
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});

	describe("controlled vs uncontrolled", () => {
		it("should work as controlled input", async () => {
			const TestComponent = () => {
				const [value, setValue] = React.useState("");
				return (
					<Input
						value={value}
						onChange={(e) => setValue(e.target.value.toUpperCase())}
					/>
				);
			};

			const user = userEvent.setup();
			render(<TestComponent />);

			const input = screen.getByRole("textbox");
			await user.type(input, "hello");

			expect(input).toHaveValue("HELLO");
		});

		it("should work as uncontrolled input with defaultValue", () => {
			render(<Input defaultValue="initial" />);

			expect(screen.getByRole("textbox")).toHaveValue("initial");
		});
	});
});

// Import React for controlled component test
import * as React from "react";
