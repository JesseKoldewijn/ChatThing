import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./dropdown-menu";

describe("DropdownMenu component", () => {
	describe("rendering", () => {
		it("should render trigger element", async () => {
			await act(async () => {
				render(
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(
				screen.getByRole("button", { name: /open menu/i }),
			).toBeInTheDocument();
		});

		it("should not show content by default", async () => {
			await act(async () => {
				render(
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
		});

		it("should render with data-slot attribute", async () => {
			await act(async () => {
				render(
					<DropdownMenu>
						<DropdownMenuTrigger data-testid="trigger">
							Open
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByTestId("trigger")).toHaveAttribute(
				"data-slot",
				"dropdown-menu-trigger",
			);
		});
	});

	describe("controlled state", () => {
		it("should show content when open is true", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
							<DropdownMenuItem>Item 2</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Item 2")).toBeInTheDocument();
		});

		it("should have menu role when open", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByRole("menu")).toBeInTheDocument();
		});
	});

	describe("menu items", () => {
		it("should render menu items with menuitem role", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger>Open</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem>Copy</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getAllByRole("menuitem")).toHaveLength(2);
		});

		it("should support destructive variant", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger>Open</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem variant="destructive" data-testid="delete">
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByTestId("delete")).toHaveAttribute(
				"data-variant",
				"destructive",
			);
		});

		it("should support inset items", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger>Open</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem inset data-testid="inset">
								Inset Item
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByTestId("inset")).toHaveAttribute("data-inset", "true");
		});
	});

	describe("checkbox items", () => {
		it("should render checkbox items", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger>Open</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuCheckboxItem checked>
								Show Toolbar
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>
								Show Status Bar
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			const checkboxItems = screen.getAllByRole("menuitemcheckbox");
			expect(checkboxItems).toHaveLength(2);
			expect(checkboxItems[0]).toHaveAttribute("aria-checked", "true");
			expect(checkboxItems[1]).toHaveAttribute("aria-checked", "false");
		});
	});

	describe("radio items", () => {
		it("should render radio items", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger>Open</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuRadioGroup value="top">
								<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="bottom">
									Bottom
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			const radioItems = screen.getAllByRole("menuitemradio");
			expect(radioItems).toHaveLength(2);
			expect(radioItems[0]).toHaveAttribute("aria-checked", "true");
			expect(radioItems[1]).toHaveAttribute("aria-checked", "false");
		});
	});

	describe("groups and labels", () => {
		it("should render groups with labels", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger>Open</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuGroup>
								<DropdownMenuItem>Edit</DropdownMenuItem>
								<DropdownMenuItem>Copy</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByText("Actions")).toBeInTheDocument();
			expect(screen.getByText("Edit")).toBeInTheDocument();
			expect(screen.getByText("Copy")).toBeInTheDocument();
			expect(screen.getByText("Delete")).toBeInTheDocument();
		});

		it("should support inset labels", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger>Open</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel inset data-testid="label">
								Actions
							</DropdownMenuLabel>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByTestId("label")).toHaveAttribute("data-inset", "true");
		});
	});

	describe("shortcuts", () => {
		it("should render keyboard shortcuts", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger>Open</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								Copy
								<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByText("⌘C")).toBeInTheDocument();
		});
	});

	describe("submenus", () => {
		it("should render submenu trigger", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger>Open</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
									<DropdownMenuItem>Sub Item</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByText("More Options")).toBeInTheDocument();
		});
	});

	describe("accessibility", () => {
		it("should have no axe violations when closed", async () => {
			let container: HTMLElement;
			await act(async () => {
				const result = render(
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
							<DropdownMenuItem>Item 2</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
				container = result.container;
			});

			const results = await axe(container!);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations when open (controlled)", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
							<DropdownMenuItem>Item 2</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			expect(screen.getByText("Item 1")).toBeInTheDocument();

			// Test the whole document since dropdown content is portaled
			// Disable rules that conflict with Radix UI's implementation
			const results = await axe(document.body, {
				rules: {
					region: { enabled: false },
					"aria-hidden-focus": { enabled: false }, // Radix focus guards
				},
			});
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with groups and labels", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Log out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			// Test the whole document since dropdown content is portaled
			// Disable rules that conflict with Radix UI's implementation
			const results = await axe(document.body, {
				rules: {
					region: { enabled: false },
					"aria-hidden-focus": { enabled: false }, // Radix focus guards
				},
			});
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with checkbox items", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuCheckboxItem checked>
								Show Toolbar
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>
								Show Status Bar
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			// Test the whole document since dropdown content is portaled
			// Disable rules that conflict with Radix UI's implementation
			const results = await axe(document.body, {
				rules: {
					region: { enabled: false },
					"aria-hidden-focus": { enabled: false }, // Radix focus guards
				},
			});
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with radio items", async () => {
			await act(async () => {
				render(
					<DropdownMenu open>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
							<DropdownMenuRadioGroup value="top">
								<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="bottom">
									Bottom
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="right">
									Right
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>,
				);
			});

			// Test the whole document since dropdown content is portaled
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
