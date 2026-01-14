import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./card";

describe("Card components", () => {
	describe("Card", () => {
		it("should render a card", () => {
			render(<Card>Card Content</Card>);

			const card = screen.getByText("Card Content");
			expect(card).toBeInTheDocument();
			expect(card).toHaveAttribute("data-slot", "card");
		});

		it("should apply custom className", () => {
			render(<Card className="custom-card">Content</Card>);

			const card = screen.getByText("Content");
			expect(card).toHaveClass("custom-card");
		});

		it("should render children", () => {
			render(
				<Card>
					<div data-testid="child">Child Element</div>
				</Card>,
			);

			expect(screen.getByTestId("child")).toBeInTheDocument();
		});
	});

	describe("CardHeader", () => {
		it("should render a card header", () => {
			render(<CardHeader>Header Content</CardHeader>);

			const header = screen.getByText("Header Content");
			expect(header).toBeInTheDocument();
			expect(header).toHaveAttribute("data-slot", "card-header");
		});

		it("should apply custom className", () => {
			render(<CardHeader className="custom-header">Header</CardHeader>);

			expect(screen.getByText("Header")).toHaveClass("custom-header");
		});
	});

	describe("CardTitle", () => {
		it("should render a card title", () => {
			render(<CardTitle>My Title</CardTitle>);

			const title = screen.getByText("My Title");
			expect(title).toBeInTheDocument();
			expect(title).toHaveAttribute("data-slot", "card-title");
		});

		it("should apply custom className", () => {
			render(<CardTitle className="custom-title">Title</CardTitle>);

			expect(screen.getByText("Title")).toHaveClass("custom-title");
		});
	});

	describe("CardDescription", () => {
		it("should render a card description", () => {
			render(<CardDescription>Description text</CardDescription>);

			const description = screen.getByText("Description text");
			expect(description).toBeInTheDocument();
			expect(description).toHaveAttribute("data-slot", "card-description");
		});

		it("should apply custom className", () => {
			render(
				<CardDescription className="custom-desc">Description</CardDescription>,
			);

			expect(screen.getByText("Description")).toHaveClass("custom-desc");
		});
	});

	describe("CardContent", () => {
		it("should render card content", () => {
			render(<CardContent>Main content here</CardContent>);

			const content = screen.getByText("Main content here");
			expect(content).toBeInTheDocument();
			expect(content).toHaveAttribute("data-slot", "card-content");
		});

		it("should apply custom className", () => {
			render(<CardContent className="custom-content">Content</CardContent>);

			expect(screen.getByText("Content")).toHaveClass("custom-content");
		});
	});

	describe("CardFooter", () => {
		it("should render a card footer", () => {
			render(<CardFooter>Footer content</CardFooter>);

			const footer = screen.getByText("Footer content");
			expect(footer).toBeInTheDocument();
			expect(footer).toHaveAttribute("data-slot", "card-footer");
		});

		it("should apply custom className", () => {
			render(<CardFooter className="custom-footer">Footer</CardFooter>);

			expect(screen.getByText("Footer")).toHaveClass("custom-footer");
		});
	});

	describe("composition", () => {
		it("should compose all card parts together", () => {
			render(
				<Card>
					<CardHeader>
						<CardTitle>Card Title</CardTitle>
						<CardDescription>Card description goes here</CardDescription>
					</CardHeader>
					<CardContent>This is the main content of the card.</CardContent>
					<CardFooter>Footer actions</CardFooter>
				</Card>,
			);

			expect(screen.getByText("Card Title")).toBeInTheDocument();
			expect(
				screen.getByText("Card description goes here"),
			).toBeInTheDocument();
			expect(
				screen.getByText("This is the main content of the card."),
			).toBeInTheDocument();
			expect(screen.getByText("Footer actions")).toBeInTheDocument();
		});
	});

	describe("accessibility", () => {
		it("should have no axe violations with simple card", async () => {
			const { container } = render(
				<Card>
					<CardContent>Simple content</CardContent>
				</Card>,
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with full card composition", async () => {
			const { container } = render(
				<Card>
					<CardHeader>
						<CardTitle>Card Title</CardTitle>
						<CardDescription>Card description goes here</CardDescription>
					</CardHeader>
					<CardContent>This is the main content of the card.</CardContent>
					<CardFooter>Footer actions</CardFooter>
				</Card>,
			);
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});
});
