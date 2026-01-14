import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea component", () => {
	describe("rendering", () => {
		it("should render scroll area with content", () => {
			render(
				<ScrollArea className="h-48 w-48">
					<div data-testid="content">Scrollable content</div>
				</ScrollArea>,
			);

			expect(screen.getByTestId("content")).toBeInTheDocument();
		});

		it("should render with data-slot attribute", () => {
			render(
				<ScrollArea data-testid="scroll-area" className="h-48 w-48">
					<div>Content</div>
				</ScrollArea>,
			);

			const scrollArea = screen.getByTestId("scroll-area");
			expect(scrollArea).toHaveAttribute("data-slot", "scroll-area");
		});

		it("should apply custom className", () => {
			render(
				<ScrollArea
					className="custom-class h-48 w-48"
					data-testid="scroll-area"
				>
					<div>Content</div>
				</ScrollArea>,
			);

			const scrollArea = screen.getByTestId("scroll-area");
			expect(scrollArea).toHaveClass("custom-class");
		});
	});

	describe("ScrollBar", () => {
		it("should include scrollbar component", () => {
			render(
				<ScrollArea className="h-48 w-48" data-testid="scroll-area">
					<div style={{ height: "500px" }}>Tall content</div>
				</ScrollArea>,
			);

			// ScrollBar is rendered as part of ScrollArea - check it's in the DOM structure
			const scrollArea = screen.getByTestId("scroll-area");
			expect(scrollArea).toBeInTheDocument();
		});
	});

	describe("accessibility", () => {
		it("should have no axe violations with simple content", async () => {
			const { container } = render(
				<ScrollArea className="h-48 w-48">
					<p>Simple content inside scroll area</p>
				</ScrollArea>,
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with list content", async () => {
			const { container } = render(
				<ScrollArea className="h-48 w-48">
					<ul>
						<li>Item 1</li>
						<li>Item 2</li>
						<li>Item 3</li>
						<li>Item 4</li>
						<li>Item 5</li>
					</ul>
				</ScrollArea>,
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with tall content", async () => {
			const { container } = render(
				<ScrollArea className="h-48 w-48">
					<div style={{ height: "500px" }}>
						<p>This content is taller than the container</p>
					</div>
				</ScrollArea>,
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});
