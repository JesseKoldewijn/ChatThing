import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Button } from "./button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./tooltip";

describe("Tooltip component", () => {
	describe("rendering", () => {
		it("should render trigger element", async () => {
			await act(async () => {
				render(
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button>Hover me</Button>
							</TooltipTrigger>
							<TooltipContent>Tooltip content</TooltipContent>
						</Tooltip>
					</TooltipProvider>,
				);
			});

			expect(
				screen.getByRole("button", { name: /hover me/i }),
			).toBeInTheDocument();
		});

		it("should not show content by default", async () => {
			await act(async () => {
				render(
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button>Hover me</Button>
							</TooltipTrigger>
							<TooltipContent>Tooltip content</TooltipContent>
						</Tooltip>
					</TooltipProvider>,
				);
			});

			expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
		});

		it("should apply data-slot to trigger", async () => {
			await act(async () => {
				render(
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger data-testid="trigger">
								<span>Trigger</span>
							</TooltipTrigger>
							<TooltipContent>Content</TooltipContent>
						</Tooltip>
					</TooltipProvider>,
				);
			});

			expect(screen.getByTestId("trigger")).toHaveAttribute(
				"data-slot",
				"tooltip-trigger",
			);
		});
	});

	describe("controlled state", () => {
		it("should show content when open is true", async () => {
			await act(async () => {
				render(
					<TooltipProvider>
						<Tooltip open>
							<TooltipTrigger asChild>
								<Button>Hover me</Button>
							</TooltipTrigger>
							<TooltipContent>Tooltip content</TooltipContent>
						</Tooltip>
					</TooltipProvider>,
				);
			});

			// Tooltip may render content in multiple places for accessibility
			expect(
				screen.getAllByText("Tooltip content").length,
			).toBeGreaterThanOrEqual(1);
		});

		it("should hide content when open is false", async () => {
			await act(async () => {
				render(
					<TooltipProvider>
						<Tooltip open={false}>
							<TooltipTrigger asChild>
								<Button>Hover me</Button>
							</TooltipTrigger>
							<TooltipContent>Tooltip content</TooltipContent>
						</Tooltip>
					</TooltipProvider>,
				);
			});

			expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
		});
	});

	describe("accessibility", () => {
		it("should have no axe violations when closed", async () => {
			let container: HTMLElement;
			await act(async () => {
				const result = render(
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button>Hover me</Button>
							</TooltipTrigger>
							<TooltipContent>Tooltip content</TooltipContent>
						</Tooltip>
					</TooltipProvider>,
				);
				container = result.container;
			});

			const results = await axe(container!);
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations when open (controlled)", async () => {
			await act(async () => {
				render(
					<TooltipProvider>
						<Tooltip open>
							<TooltipTrigger asChild>
								<Button>Hover me</Button>
							</TooltipTrigger>
							<TooltipContent>Tooltip content</TooltipContent>
						</Tooltip>
					</TooltipProvider>,
				);
			});

			expect(
				screen.getAllByText("Tooltip content").length,
			).toBeGreaterThanOrEqual(1);

			// Test the whole document since tooltip content is portaled
			// Disable rules that conflict with Radix UI's implementation
			const results = await axe(document.body, {
				rules: {
					region: { enabled: false },
					"aria-hidden-focus": { enabled: false }, // Radix focus guards
				},
			});
			expect(results).toHaveNoViolations();
		});

		it("should have no axe violations with multiple tooltips", async () => {
			let container: HTMLElement;
			await act(async () => {
				const result = render(
					<TooltipProvider>
						<div>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button>First</Button>
								</TooltipTrigger>
								<TooltipContent>First tooltip</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button>Second</Button>
								</TooltipTrigger>
								<TooltipContent>Second tooltip</TooltipContent>
							</Tooltip>
						</div>
					</TooltipProvider>,
				);
				container = result.container;
			});

			const results = await axe(container!);
			expect(results).toHaveNoViolations();
		});
	});
});
