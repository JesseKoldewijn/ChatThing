import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ChatContainerUI, type ChatContainerUIProps } from "./ChatContainer.ui";

const defaultProps: ChatContainerUIProps = {
	messageList: <div data-testid="message-list">Messages</div>,
	input: <div data-testid="input">Input</div>,
};

describe("ChatContainerUI", () => {
	const user = userEvent.setup();

	describe("rendering", () => {
		it("should render message list", () => {
			render(<ChatContainerUI {...defaultProps} />);

			expect(screen.getByTestId("message-list")).toBeInTheDocument();
		});

		it("should render input", () => {
			render(<ChatContainerUI {...defaultProps} />);

			expect(screen.getByTestId("input")).toBeInTheDocument();
		});

		it("should render sidebar when provided", () => {
			render(
				<ChatContainerUI
					{...defaultProps}
					sidebar={<div data-testid="sidebar">Sidebar</div>}
				/>,
			);

			expect(screen.getByTestId("sidebar")).toBeInTheDocument();
		});

		it("should render header when provided", () => {
			render(
				<ChatContainerUI
					{...defaultProps}
					header={<div data-testid="header">Header</div>}
				/>,
			);

			expect(screen.getByTestId("header")).toBeInTheDocument();
		});

		it("should render error banner when provided", () => {
			render(
				<ChatContainerUI
					{...defaultProps}
					errorBanner={<div data-testid="error-banner">Error</div>}
				/>,
			);

			expect(screen.getByTestId("error-banner")).toBeInTheDocument();
		});
	});

	describe("sidebar visibility", () => {
		it("should have sidebar hidden by default", () => {
			render(
				<ChatContainerUI {...defaultProps} sidebar={<div>Sidebar</div>} />,
			);

			// Sidebar should have translate class for hidden state
			const sidebar = document.querySelector("aside");
			expect(sidebar?.className).toContain("-translate-x-full");
		});

		it("should show sidebar when isSidebarOpen is true", () => {
			render(
				<ChatContainerUI
					{...defaultProps}
					sidebar={<div>Sidebar</div>}
					isSidebarOpen={true}
				/>,
			);

			const sidebar = document.querySelector("aside");
			expect(sidebar?.className).toContain("translate-x-0");
		});

		it("should render overlay when sidebar is open", () => {
			render(
				<ChatContainerUI
					{...defaultProps}
					sidebar={<div>Sidebar</div>}
					isSidebarOpen={true}
				/>,
			);

			// Should have overlay div
			expect(screen.getByTestId("chat-sidebar-overlay")).toBeInTheDocument();
		});

		it("should not render overlay when sidebar is closed", () => {
			render(
				<ChatContainerUI
					{...defaultProps}
					sidebar={<div>Sidebar</div>}
					isSidebarOpen={false}
				/>,
			);

			expect(
				screen.queryByTestId("chat-sidebar-overlay"),
			).not.toBeInTheDocument();
		});
	});

	describe("interactions", () => {
		it("should call onCloseSidebar when overlay is clicked", async () => {
			const onCloseSidebar = vi.fn();
			render(
				<ChatContainerUI
					{...defaultProps}
					sidebar={<div>Sidebar</div>}
					isSidebarOpen={true}
					onCloseSidebar={onCloseSidebar}
				/>,
			);

			const overlay = screen.getByTestId("chat-sidebar-overlay");
			await user.click(overlay);

			expect(onCloseSidebar).toHaveBeenCalled();
		});
	});

	describe("layout structure", () => {
		it("should have proper flex layout", () => {
			render(<ChatContainerUI {...defaultProps} />);

			const container = document.querySelector(".flex.h-screen");
			expect(container).toBeInTheDocument();
		});

		it("should have main element", () => {
			render(<ChatContainerUI {...defaultProps} />);

			expect(document.querySelector("main")).toBeInTheDocument();
		});

		it("should render header within header element", () => {
			render(
				<ChatContainerUI
					{...defaultProps}
					header={<div data-testid="header-content">Header</div>}
				/>,
			);

			const header = document.querySelector("header");
			expect(header).toBeInTheDocument();
			expect(
				header?.querySelector('[data-testid="header-content"]'),
			).toBeInTheDocument();
		});
	});

	describe("styling classes", () => {
		it("should have background class on container", () => {
			render(<ChatContainerUI {...defaultProps} />);

			const container = document.querySelector(".bg-background");
			expect(container).toBeInTheDocument();
		});

		it("should have sidebar background class", () => {
			render(
				<ChatContainerUI {...defaultProps} sidebar={<div>Sidebar</div>} />,
			);

			const sidebar = document.querySelector(".bg-sidebar");
			expect(sidebar).toBeInTheDocument();
		});

		it("should have border on sidebar", () => {
			render(
				<ChatContainerUI {...defaultProps} sidebar={<div>Sidebar</div>} />,
			);

			const sidebar = document.querySelector(".border-r");
			expect(sidebar).toBeInTheDocument();
		});
	});

	describe("responsive behavior", () => {
		it("should have fixed position on mobile for sidebar", () => {
			render(
				<ChatContainerUI {...defaultProps} sidebar={<div>Sidebar</div>} />,
			);

			const sidebar = document.querySelector("aside");
			expect(sidebar?.className).toContain("fixed");
			expect(sidebar?.className).toContain("lg:relative");
		});

		it("should have proper z-index for sidebar", () => {
			render(
				<ChatContainerUI {...defaultProps} sidebar={<div>Sidebar</div>} />,
			);

			const sidebar = document.querySelector("aside");
			expect(sidebar?.className).toContain("z-40");
		});
	});

	describe("without optional elements", () => {
		it("should render without sidebar", () => {
			render(<ChatContainerUI {...defaultProps} />);

			expect(document.querySelector("aside")).not.toBeInTheDocument();
		});

		it("should render without header", () => {
			render(<ChatContainerUI {...defaultProps} />);

			expect(document.querySelector("header")).not.toBeInTheDocument();
		});

		it("should render without error banner", () => {
			render(<ChatContainerUI {...defaultProps} />);

			expect(screen.queryByTestId("error-banner")).not.toBeInTheDocument();
		});
	});
});
