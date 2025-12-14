import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Separator } from "./separator";

describe("Separator component", () => {
	describe("rendering", () => {
		it("should render a separator element", () => {
			render(<Separator data-testid="separator" />);

			const separator = screen.getByTestId("separator");
			expect(separator).toBeInTheDocument();
			expect(separator).toHaveAttribute("data-slot", "separator");
		});

		it("should apply custom className", () => {
			render(<Separator className="custom-class" data-testid="separator" />);

			const separator = screen.getByTestId("separator");
			expect(separator).toHaveClass("custom-class");
		});

		it("should have horizontal orientation by default", () => {
			render(<Separator data-testid="separator" />);

			const separator = screen.getByTestId("separator");
			expect(separator).toHaveAttribute("data-orientation", "horizontal");
		});
	});

	describe("orientations", () => {
		it("should render horizontal separator", () => {
			render(<Separator orientation="horizontal" data-testid="separator" />);

			const separator = screen.getByTestId("separator");
			expect(separator).toHaveAttribute("data-orientation", "horizontal");
		});

		it("should render vertical separator", () => {
			render(<Separator orientation="vertical" data-testid="separator" />);

			const separator = screen.getByTestId("separator");
			expect(separator).toHaveAttribute("data-orientation", "vertical");
		});
	});

	describe("decorative prop", () => {
		it("should be decorative by default", () => {
			render(<Separator />);

			// Decorative separators should have role="none" or no role
			const separator = screen.getByRole("none");
			expect(separator).toBeInTheDocument();
		});

		it("should have separator role when not decorative", () => {
			render(<Separator decorative={false} />);

			const separator = screen.getByRole("separator");
			expect(separator).toBeInTheDocument();
		});
	});

	describe("accessibility", () => {
		it("should have no axe violations when decorative", async () => {
			const { container } = render(<Separator />);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations when not decorative", async () => {
			const { container } = render(<Separator decorative={false} />);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with vertical orientation", async () => {
			const { container } = render(
				<div style={{ display: "flex", height: "100px" }}>
					<div>Left</div>
					<Separator orientation="vertical" decorative={false} />
					<div>Right</div>
				</div>
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations in navigation context", async () => {
			const { container } = render(
				<nav>
					<a href="#home">Home</a>
					<Separator />
					<a href="#about">About</a>
				</nav>
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});

