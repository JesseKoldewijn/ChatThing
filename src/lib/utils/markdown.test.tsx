import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

// Mock react-syntax-highlighter to avoid dynamic imports and fetch issues in tests
vi.mock("react-syntax-highlighter/dist/esm/prism-light", () => ({
	default: {
		registerLanguage: vi.fn(),
	},
}));

vi.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
	oneDark: {},
	oneLight: {},
}));

// Mock all language imports to avoid dynamic import overhead and potential fetch issues
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/typescript", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/javascript", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/jsx", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/tsx", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/css", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/json", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/bash", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/python", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/markdown", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/sql", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/yaml", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/rust", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/go", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/java", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/c", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/cpp", () => ({
	default: {},
}));
vi.mock("react-syntax-highlighter/dist/esm/languages/prism/csharp", () => ({
	default: {},
}));

import { createMarkdownRenderer, MarkdownRenderer } from "./markdown";

// Mock fetch globally to avoid actual network calls during tests
beforeAll(() => {
	vi.stubGlobal(
		"fetch",
		vi.fn().mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve([]),
				text: () => Promise.resolve(""),
				blob: () => Promise.resolve(new Blob()),
			} as Response),
		),
	);
});

// Mock the components that might use atoms
vi.mock("@/lib/stores/settings", () => ({
	themeAtom: { get: () => "default", subscribe: vi.fn(() => vi.fn()) },
}));

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
			expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
		});

		it("should render links", () => {
			render(<MarkdownRenderer content="Check [Google](https://google.com)" />);
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

		it("should render tables", () => {
			const tableContent = `
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
            `;
			render(<MarkdownRenderer content={tableContent} />);
			expect(screen.getByRole("table")).toBeInTheDocument();
			expect(screen.getByText("Header 1")).toBeInTheDocument();
			expect(screen.getByText("Cell 1")).toBeInTheDocument();
		});

		it("should render code blocks with language", () => {
			const codeBlock = "```javascript\nconsole.log('test');\n```";
			render(<MarkdownRenderer content={codeBlock} />);
			// Since we use SyntaxHighlighter, we search for the content
			expect(screen.getByText(/console\.log/)).toBeInTheDocument();
		});

		it("should handle mixed content", () => {
			const mixed =
				"# Title\n\nSome text with **bold** and `code`.\n\n- List item";
			render(<MarkdownRenderer content={mixed} />);
			expect(screen.getByRole("heading")).toHaveTextContent("Title");
			expect(screen.getByText("bold")).toBeInTheDocument();
			expect(screen.getByText("code")).toBeInTheDocument();
			expect(screen.getByText("List item")).toBeInTheDocument();
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
