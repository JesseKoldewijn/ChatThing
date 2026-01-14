import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Skeleton } from "./skeleton";

describe("Skeleton component", () => {
	describe("rendering", () => {
		it("should render a skeleton element", () => {
			render(<Skeleton data-testid="skeleton" />);

			const skeleton = screen.getByTestId("skeleton");
			expect(skeleton).toBeInTheDocument();
			expect(skeleton).toHaveAttribute("data-slot", "skeleton");
		});

		it("should apply custom className", () => {
			render(<Skeleton className="custom-class" data-testid="skeleton" />);

			const skeleton = screen.getByTestId("skeleton");
			expect(skeleton).toHaveClass("custom-class");
		});

		it("should have animation class", () => {
			render(<Skeleton data-testid="skeleton" />);

			const skeleton = screen.getByTestId("skeleton");
			expect(skeleton).toHaveClass("animate-pulse");
		});

		it("should render children", () => {
			render(
				<Skeleton>
					<span data-testid="child">Loading content</span>
				</Skeleton>,
			);

			expect(screen.getByTestId("child")).toBeInTheDocument();
		});
	});

	describe("styling", () => {
		it("should support width and height via className", () => {
			render(<Skeleton className="h-4 w-32" data-testid="skeleton" />);

			const skeleton = screen.getByTestId("skeleton");
			expect(skeleton).toHaveClass("h-4", "w-32");
		});

		it("should support rounded variants", () => {
			render(<Skeleton className="rounded-full" data-testid="skeleton" />);

			const skeleton = screen.getByTestId("skeleton");
			expect(skeleton).toHaveClass("rounded-full");
		});
	});

	describe("accessibility", () => {
		it("should have no axe violations", async () => {
			const { container } = render(<Skeleton className="h-4 w-32" />);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with multiple skeletons", async () => {
			const { container } = render(
				<div>
					<Skeleton className="mb-2 h-4 w-full" />
					<Skeleton className="mb-2 h-4 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
				</div>,
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations as avatar skeleton", async () => {
			const { container } = render(
				<Skeleton className="h-12 w-12 rounded-full" />,
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});
