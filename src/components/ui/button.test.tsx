import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button component", () => {
	describe("rendering", () => {
		it("should render with default variant", () => {
			render(<Button>Click me</Button>);

			const button = screen.getByRole("button", { name: /click me/i });
			expect(button).toBeInTheDocument();
			expect(button).toHaveAttribute("data-slot", "button");
		});

		it("should render children correctly", () => {
			render(<Button>Test Button</Button>);

			expect(screen.getByText("Test Button")).toBeInTheDocument();
		});

		it("should apply custom className", () => {
			render(<Button className="custom-class">Button</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("custom-class");
		});
	});

	describe("variants", () => {
		it("should render default variant", () => {
			render(<Button variant="default">Default</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("bg-primary");
		});

		it("should render destructive variant", () => {
			render(<Button variant="destructive">Delete</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("bg-destructive");
		});

		it("should render outline variant", () => {
			render(<Button variant="outline">Outline</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("border");
		});

		it("should render secondary variant", () => {
			render(<Button variant="secondary">Secondary</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("bg-secondary");
		});

		it("should render ghost variant", () => {
			render(<Button variant="ghost">Ghost</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("hover:bg-accent");
		});

		it("should render link variant", () => {
			render(<Button variant="link">Link</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("text-primary");
		});
	});

	describe("sizes", () => {
		it("should render default size", () => {
			render(<Button size="default">Default Size</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("h-9");
		});

		it("should render small size", () => {
			render(<Button size="sm">Small</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("h-8");
		});

		it("should render large size", () => {
			render(<Button size="lg">Large</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("h-10");
		});

		it("should render icon size", () => {
			render(<Button size="icon">Icon</Button>);

			const button = screen.getByRole("button");
			expect(button).toHaveClass("size-9");
		});
	});

	describe("interactions", () => {
		it("should call onClick when clicked", async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();

			render(<Button onClick={handleClick}>Click Me</Button>);

			await user.click(screen.getByRole("button"));

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("should not call onClick when disabled", async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();

			render(
				<Button onClick={handleClick} disabled>
					Disabled
				</Button>
			);

			await user.click(screen.getByRole("button"));

			expect(handleClick).not.toHaveBeenCalled();
		});

		it("should be disabled when disabled prop is true", () => {
			render(<Button disabled>Disabled</Button>);

			expect(screen.getByRole("button")).toBeDisabled();
		});
	});

	describe("asChild prop", () => {
		it("should render as a different element when asChild is true", () => {
			render(
				<Button asChild>
					<a href="/test">Link Button</a>
				</Button>
			);

			const link = screen.getByRole("link", { name: /link button/i });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", "/test");
		});
	});

	describe("accessibility", () => {
		it("should have button role by default", () => {
			render(<Button>Accessible</Button>);

			expect(screen.getByRole("button")).toBeInTheDocument();
		});

		it("should support aria-label", () => {
			render(<Button aria-label="Close dialog">X</Button>);

			expect(
				screen.getByRole("button", { name: /close dialog/i })
			).toBeInTheDocument();
		});

		it("should support type attribute", () => {
			render(<Button type="submit">Submit</Button>);

			expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
		});
	});
});

