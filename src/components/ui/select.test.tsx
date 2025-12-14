import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectGroup,
	SelectLabel,
	SelectSeparator,
} from "./select";

describe("Select component", () => {
	describe("rendering", () => {
		it("should render select trigger", () => {
			render(
				<Select>
					<SelectTrigger aria-label="Select option">
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByRole("combobox")).toBeInTheDocument();
		});

		it("should show placeholder", () => {
			render(
				<Select>
					<SelectTrigger aria-label="Select option">
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByText("Select an option")).toBeInTheDocument();
		});

		it("should render with data-slot attribute", () => {
			render(
				<Select>
					<SelectTrigger aria-label="Select option" data-testid="trigger">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "select-trigger");
		});
	});

	describe("controlled value", () => {
		it("should display controlled value", () => {
			render(
				<Select value="option2">
					<SelectTrigger aria-label="Select option">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByRole("combobox")).toHaveTextContent("Option 2");
		});

		it("should display default value", () => {
			render(
				<Select defaultValue="option1">
					<SelectTrigger aria-label="Select option">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByRole("combobox")).toHaveTextContent("Option 1");
		});
	});

	describe("sizes", () => {
		it("should render default size", () => {
			render(
				<Select>
					<SelectTrigger size="default" data-testid="trigger" aria-label="Select">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="opt">Option</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByTestId("trigger")).toHaveAttribute("data-size", "default");
		});

		it("should render small size", () => {
			render(
				<Select>
					<SelectTrigger size="sm" data-testid="trigger" aria-label="Select">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="opt">Option</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByTestId("trigger")).toHaveAttribute("data-size", "sm");
		});
	});

	describe("disabled state", () => {
		it("should be disabled when disabled prop is set", () => {
			render(
				<Select disabled>
					<SelectTrigger aria-label="Select option">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByRole("combobox")).toBeDisabled();
		});
	});

	describe("open state (controlled)", () => {
		it("should show content when open is true", () => {
			render(
				<Select open>
					<SelectTrigger aria-label="Select option">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByText("Option 1")).toBeInTheDocument();
			expect(screen.getByText("Option 2")).toBeInTheDocument();
		});

		it("should render groups and labels when open", () => {
			render(
				<Select open>
					<SelectTrigger aria-label="Select fruit">
						<SelectValue placeholder="Select a fruit" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="apple">Apple</SelectItem>
							<SelectItem value="banana">Banana</SelectItem>
						</SelectGroup>
						<SelectSeparator />
						<SelectGroup>
							<SelectLabel>Vegetables</SelectLabel>
							<SelectItem value="carrot">Carrot</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			);

			expect(screen.getByText("Fruits")).toBeInTheDocument();
			expect(screen.getByText("Vegetables")).toBeInTheDocument();
			expect(screen.getByText("Apple")).toBeInTheDocument();
			expect(screen.getByText("Carrot")).toBeInTheDocument();
		});
	});

	describe("accessibility", () => {
		it("should have no axe violations when closed", async () => {
			const { container } = render(
				<div>
					<label id="select-label">Choose an option</label>
					<Select>
						<SelectTrigger aria-labelledby="select-label">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="option1">Option 1</SelectItem>
							<SelectItem value="option2">Option 2</SelectItem>
						</SelectContent>
					</Select>
				</div>
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations when open (controlled)", async () => {
			render(
				<div>
					<label id="select-label">Choose an option</label>
					<Select open>
						<SelectTrigger aria-labelledby="select-label">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="option1">Option 1</SelectItem>
							<SelectItem value="option2">Option 2</SelectItem>
						</SelectContent>
					</Select>
				</div>
			);

			expect(screen.getByText("Option 1")).toBeInTheDocument();

			// Test the whole document since select content is portaled
			// Disable rules that conflict with Radix UI's implementation
			const results = await axe(document.body, {
				rules: {
					region: { enabled: false },
					"aria-hidden-focus": { enabled: false }, // Radix focus guards
				},
			});
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with groups", async () => {
			render(
				<div>
					<label id="select-label">Choose a food</label>
					<Select open>
						<SelectTrigger aria-labelledby="select-label">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Fruits</SelectLabel>
								<SelectItem value="apple">Apple</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Vegetables</SelectLabel>
								<SelectItem value="carrot">Carrot</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			);

			// Test the whole document since select content is portaled
			// Disable rules that conflict with Radix UI's implementation
			const results = await axe(document.body, {
				rules: {
					region: { enabled: false },
					"aria-hidden-focus": { enabled: false }, // Radix focus guards
				},
			});
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with disabled items", async () => {
			render(
				<div>
					<label id="select-label">Choose an option</label>
					<Select open>
						<SelectTrigger aria-labelledby="select-label">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="option1">Option 1</SelectItem>
							<SelectItem value="option2" disabled>
								Option 2 (disabled)
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			);

			// Test the whole document since select content is portaled
			// Disable rules that conflict with Radix UI's implementation
			const results = await axe(document.body, {
				rules: {
					region: { enabled: false },
					"aria-hidden-focus": { enabled: false }, // Radix focus guards
				},
			});
			expect(results).toHaveNoViolations();
		});
	});
});
