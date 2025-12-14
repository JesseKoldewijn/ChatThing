import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MarkdownRenderer, createMarkdownRenderer } from "./markdown";

describe("markdown utilities", () => {
	describe("exports", () => {
		it("should export MarkdownRenderer component", () => {
			expect(MarkdownRenderer).toBeDefined();
			expect(typeof MarkdownRenderer).toBe("function");
		});

		it("should export createMarkdownRenderer function", () => {
			expect(createMarkdownRenderer).toBeDefined();
			expect(typeof createMarkdownRenderer).toBe("function");
		});
	});

	describe("MarkdownRenderer component", () => {
		it("should render plain text", () => {
			render(<MarkdownRenderer content="Hello world" />);
			expect(screen.getByText("Hello world")).toBeInTheDocument();
		});

		it("should render bold text", () => {
			render(<MarkdownRenderer content="This is **bold** text" />);
			expect(screen.getByText("bold")).toBeInTheDocument();
		});

		it("should render italic text", () => {
			render(<MarkdownRenderer content="This is *italic* text" />);
			expect(screen.getByText("italic")).toBeInTheDocument();
		});

		it("should render headers", () => {
			render(<MarkdownRenderer content="# Heading 1" />);
			expect(
				screen.getByRole("heading", { level: 1 })
			).toBeInTheDocument();
		});

		it("should render links", () => {
			render(
				<MarkdownRenderer content="Check [Google](https://google.com)" />
			);
			const link = screen.getByRole("link", { name: "Google" });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", "https://google.com");
		});

		it("should render lists", () => {
			render(<MarkdownRenderer content="- Item 1\n- Item 2" />);
			// List items should be in the document
			expect(screen.getByText(/Item 1/)).toBeInTheDocument();
			expect(screen.getByText(/Item 2/)).toBeInTheDocument();
		});

		it("should render blockquotes", () => {
			render(<MarkdownRenderer content="> This is a quote" />);
			expect(screen.getByText("This is a quote")).toBeInTheDocument();
		});

		it("should render inline code", () => {
			render(<MarkdownRenderer content="Use `console.log`" />);
			const code = screen.getByText("console.log");
			expect(code.tagName.toLowerCase()).toBe("code");
		});

		it("should handle empty content", () => {
			const { container } = render(<MarkdownRenderer content="" />);
			expect(container).toBeInTheDocument();
		});

		it("should handle content with special characters", () => {
			render(<MarkdownRenderer content="1 < 2 && 3 > 2" />);
			expect(screen.getByText(/1 < 2/)).toBeInTheDocument();
		});
	});

	describe("createMarkdownRenderer", () => {
		it("should return a render function", () => {
			const renderFn = createMarkdownRenderer();
			expect(typeof renderFn).toBe("function");
		});

		it("should render content when called", () => {
			const renderFn = createMarkdownRenderer();
			const result = renderFn("Hello world");
			expect(result).toBeDefined();
		});
	});
});

