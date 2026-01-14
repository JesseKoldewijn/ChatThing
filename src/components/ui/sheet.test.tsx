import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Button } from "./button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./sheet";

describe("Sheet component", () => {
	describe("rendering", () => {
		it("should render trigger element", () => {
			render(
				<Sheet>
					<SheetTrigger asChild>
						<Button>Open Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>Sheet description</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			);

			expect(
				screen.getByRole("button", { name: /open sheet/i }),
			).toBeInTheDocument();
		});

		it("should not show content by default", () => {
			render(
				<Sheet>
					<SheetTrigger asChild>
						<Button>Open Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>Sheet description</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			);

			expect(screen.queryByText("Sheet Title")).not.toBeInTheDocument();
		});

		it("should render with data-slot attributes", () => {
			render(
				<Sheet>
					<SheetTrigger data-testid="trigger">Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Title</SheetTitle>
						<SheetDescription>Description</SheetDescription>
					</SheetContent>
				</Sheet>,
			);

			expect(screen.getByTestId("trigger")).toHaveAttribute(
				"data-slot",
				"sheet-trigger",
			);
		});
	});

	describe("controlled state", () => {
		it("should show content when open is true", () => {
			render(
				<Sheet open>
					<SheetTrigger asChild>
						<Button>Open Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>Sheet description</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			);

			expect(screen.getByText("Sheet Title")).toBeInTheDocument();
		});

		it("should have dialog role when open", () => {
			render(
				<Sheet open>
					<SheetTrigger asChild>
						<Button>Open Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>Sheet description</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			);

			expect(screen.getByRole("dialog")).toBeInTheDocument();
		});
	});

	describe("interactions", () => {
		it("should open sheet on trigger click", async () => {
			const user = userEvent.setup();

			render(
				<Sheet>
					<SheetTrigger asChild>
						<Button>Open Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>Sheet description</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			);

			await user.click(screen.getByRole("button", { name: /open sheet/i }));

			await waitFor(() => {
				expect(screen.getByText("Sheet Title")).toBeInTheDocument();
			});
		});
	});

	describe("sides", () => {
		it("should render from right by default", () => {
			render(
				<Sheet open>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent data-testid="sheet-content">
						<SheetTitle>Title</SheetTitle>
						<SheetDescription>Description</SheetDescription>
					</SheetContent>
				</Sheet>,
			);

			const content = screen.getByTestId("sheet-content");
			expect(content).toHaveClass("right-0");
		});

		it("should render from left when specified", () => {
			render(
				<Sheet open>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent side="left" data-testid="sheet-content">
						<SheetTitle>Title</SheetTitle>
						<SheetDescription>Description</SheetDescription>
					</SheetContent>
				</Sheet>,
			);

			const content = screen.getByTestId("sheet-content");
			expect(content).toHaveClass("left-0");
		});

		it("should render from top when specified", () => {
			render(
				<Sheet open>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent side="top" data-testid="sheet-content">
						<SheetTitle>Title</SheetTitle>
						<SheetDescription>Description</SheetDescription>
					</SheetContent>
				</Sheet>,
			);

			const content = screen.getByTestId("sheet-content");
			expect(content).toHaveClass("top-0");
		});

		it("should render from bottom when specified", () => {
			render(
				<Sheet open>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent side="bottom" data-testid="sheet-content">
						<SheetTitle>Title</SheetTitle>
						<SheetDescription>Description</SheetDescription>
					</SheetContent>
				</Sheet>,
			);

			const content = screen.getByTestId("sheet-content");
			expect(content).toHaveClass("bottom-0");
		});
	});

	describe("composition", () => {
		it("should compose header, footer, title, and description", () => {
			render(
				<Sheet open>
					<SheetTrigger asChild>
						<Button>Open Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Edit Profile</SheetTitle>
							<SheetDescription>
								Make changes to your profile here.
							</SheetDescription>
						</SheetHeader>
						<div>Form content</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button>Save changes</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>,
			);

			expect(screen.getByText("Edit Profile")).toBeInTheDocument();
			expect(
				screen.getByText("Make changes to your profile here."),
			).toBeInTheDocument();
			expect(screen.getByText("Form content")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: /save changes/i }),
			).toBeInTheDocument();
		});
	});

	describe("accessibility", () => {
		it("should have no axe violations when closed", async () => {
			const { container } = render(
				<Sheet>
					<SheetTrigger asChild>
						<Button>Open Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>Sheet description</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations when open (controlled)", async () => {
			render(
				<Sheet open>
					<SheetTrigger asChild>
						<Button>Open Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>Sheet description</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			);

			expect(screen.getByText("Sheet Title")).toBeInTheDocument();

			// Test the whole document since sheet content is portaled
			// Disable rules that conflict with Radix UI's implementation
			const results = await axe(document.body, {
				rules: {
					region: { enabled: false },
					"aria-hidden-focus": { enabled: false }, // Radix focus guards
				},
			});
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with form content", async () => {
			render(
				<Sheet open>
					<SheetTrigger asChild>
						<Button>Open Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Edit Settings</SheetTitle>
							<SheetDescription>Update your preferences</SheetDescription>
						</SheetHeader>
						<form>
							<label htmlFor="name">Name</label>
							<input id="name" type="text" />
						</form>
						<SheetFooter>
							<Button type="submit">Save</Button>
						</SheetFooter>
					</SheetContent>
				</Sheet>,
			);

			// Test the whole document since sheet content is portaled
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
