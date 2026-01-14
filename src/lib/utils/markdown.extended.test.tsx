import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMarkdownRenderer, MarkdownRenderer } from "./markdown";

describe("MarkdownRenderer extended tests", () => {
	describe("basic text rendering", () => {
		it("should render plain text", () => {
			render(<MarkdownRenderer content="Hello, world!" />);
			expect(screen.getByText("Hello, world!")).toBeInTheDocument();
		});

		it("should render multiple paragraphs", () => {
			render(
				<MarkdownRenderer
					content={`First paragraph.

Second paragraph.`}
				/>,
			);
			expect(screen.getByText("First paragraph.")).toBeInTheDocument();
			expect(screen.getByText("Second paragraph.")).toBeInTheDocument();
		});

		it("should preserve text within paragraphs", () => {
			render(
				<MarkdownRenderer content="This is a longer paragraph with multiple sentences. It should all render correctly." />,
			);
			expect(
				screen.getByText(/This is a longer paragraph/),
			).toBeInTheDocument();
		});
	});

	describe("bold and italic text", () => {
		it("should render bold text with double asterisks", () => {
			render(<MarkdownRenderer content="This is **bold** text." />);
			const bold = document.querySelector("strong");
			expect(bold).toBeInTheDocument();
			expect(bold?.textContent).toBe("bold");
		});

		it("should render bold text with double underscores", () => {
			render(<MarkdownRenderer content="This is __bold__ text." />);
			const bold = document.querySelector("strong");
			expect(bold).toBeInTheDocument();
		});

		it("should render italic text with single asterisk", () => {
			render(<MarkdownRenderer content="This is *italic* text." />);
			const italic = document.querySelector("em");
			expect(italic).toBeInTheDocument();
			expect(italic?.textContent).toBe("italic");
		});

		it("should render italic text with single underscore", () => {
			render(<MarkdownRenderer content="This is _italic_ text." />);
			const italic = document.querySelector("em");
			expect(italic).toBeInTheDocument();
		});

		it("should render bold and italic combined", () => {
			render(
				<MarkdownRenderer content="This is ***bold and italic*** text." />,
			);
			const bold = document.querySelector("strong");
			const italic = document.querySelector("em");
			expect(bold).toBeInTheDocument();
			expect(italic).toBeInTheDocument();
		});
	});

	describe("lists", () => {
		it("should render unordered lists with dashes", () => {
			render(
				<MarkdownRenderer
					content={`- Item 1
- Item 2
- Item 3`}
				/>,
			);
			const list = document.querySelector("ul");
			expect(list).toBeInTheDocument();
			expect(list?.querySelectorAll("li").length).toBe(3);
		});

		it("should render unordered lists with asterisks", () => {
			render(
				<MarkdownRenderer
					content={`* Item 1
* Item 2`}
				/>,
			);
			const list = document.querySelector("ul");
			expect(list).toBeInTheDocument();
		});

		it("should render ordered lists", () => {
			render(
				<MarkdownRenderer
					content={`1. First
2. Second
3. Third`}
				/>,
			);
			const list = document.querySelector("ol");
			expect(list).toBeInTheDocument();
			expect(list?.querySelectorAll("li").length).toBe(3);
		});

		it("should render nested lists", () => {
			render(
				<MarkdownRenderer
					content={`- Item 1
  - Nested 1
  - Nested 2
- Item 2`}
				/>,
			);
			const lists = document.querySelectorAll("ul");
			expect(lists.length).toBeGreaterThanOrEqual(1);
		});
	});

	describe("inline code", () => {
		it("should render inline code", () => {
			render(<MarkdownRenderer content="Use the `console.log()` function." />);
			const code = document.querySelector("code");
			expect(code).toBeInTheDocument();
			expect(code?.textContent).toBe("console.log()");
		});

		it("should render multiple inline code snippets", () => {
			render(
				<MarkdownRenderer content="Use `const` or `let` for variables." />,
			);
			const codes = document.querySelectorAll("code");
			expect(codes.length).toBeGreaterThanOrEqual(2);
		});

		it("should handle inline code with special characters", () => {
			render(<MarkdownRenderer content="Run `npm install --save-dev`" />);
			const code = document.querySelector("code");
			expect(code?.textContent).toBe("npm install --save-dev");
		});
	});

	describe("links", () => {
		it("should render links with href", () => {
			render(
				<MarkdownRenderer content="Visit [Google](https://google.com) for more." />,
			);
			const link = document.querySelector("a");
			expect(link).toBeInTheDocument();
			expect(link?.getAttribute("href")).toBe("https://google.com");
			expect(link?.textContent).toBe("Google");
		});

		it("should open links in new tab", () => {
			render(<MarkdownRenderer content="[Link](https://example.com)" />);
			const link = document.querySelector("a");
			expect(link?.getAttribute("target")).toBe("_blank");
		});

		it("should have noopener noreferrer", () => {
			render(<MarkdownRenderer content="[Link](https://example.com)" />);
			const link = document.querySelector("a");
			expect(link?.getAttribute("rel")).toContain("noopener");
		});
	});

	describe("headings", () => {
		it("should render h1 headings", () => {
			render(<MarkdownRenderer content="# Heading 1" />);
			const h1 = document.querySelector("h1");
			expect(h1).toBeInTheDocument();
			expect(h1?.textContent).toBe("Heading 1");
		});

		it("should render h2 headings", () => {
			render(<MarkdownRenderer content="## Heading 2" />);
			const h2 = document.querySelector("h2");
			expect(h2).toBeInTheDocument();
		});

		it("should render h3 headings", () => {
			render(<MarkdownRenderer content="### Heading 3" />);
			const h3 = document.querySelector("h3");
			expect(h3).toBeInTheDocument();
		});

		it("should render multiple heading levels", () => {
			render(
				<MarkdownRenderer
					content={`# H1

## H2

### H3`}
				/>,
			);
			expect(document.querySelector("h1")).toBeInTheDocument();
			expect(document.querySelector("h2")).toBeInTheDocument();
			expect(document.querySelector("h3")).toBeInTheDocument();
		});
	});

	describe("blockquotes", () => {
		it("should render blockquotes", () => {
			render(<MarkdownRenderer content="> This is a quote." />);
			const blockquote = document.querySelector("blockquote");
			expect(blockquote).toBeInTheDocument();
		});

		it("should render multi-line blockquotes", () => {
			render(
				<MarkdownRenderer
					content={`> Line 1
> Line 2`}
				/>,
			);
			const blockquote = document.querySelector("blockquote");
			expect(blockquote).toBeInTheDocument();
		});
	});

	describe("tables (GFM)", () => {
		it("should render tables", () => {
			const tableContent = `| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |`;
			render(<MarkdownRenderer content={tableContent} />);
			const table = document.querySelector("table");
			expect(table).toBeInTheDocument();
		});

		it("should render table headers", () => {
			const tableContent = `| Name | Age |
| ---- | --- |
| John | 30  |`;
			render(<MarkdownRenderer content={tableContent} />);
			const th = document.querySelectorAll("th");
			expect(th.length).toBe(2);
		});

		it("should render table cells", () => {
			const tableContent = `| A | B |
| - | - |
| 1 | 2 |`;
			render(<MarkdownRenderer content={tableContent} />);
			const td = document.querySelectorAll("td");
			expect(td.length).toBe(2);
		});
	});

	describe("strikethrough (GFM)", () => {
		it("should render strikethrough text", () => {
			render(<MarkdownRenderer content="This is ~~deleted~~ text." />);
			const del = document.querySelector("del");
			expect(del).toBeInTheDocument();
		});
	});

	describe("horizontal rules", () => {
		it("should render horizontal rules with dashes", () => {
			render(
				<MarkdownRenderer
					content={`Above

---

Below`}
				/>,
			);
			const hr = document.querySelector("hr");
			expect(hr).toBeInTheDocument();
		});

		it("should render horizontal rules with asterisks", () => {
			render(
				<MarkdownRenderer
					content={`Above

***

Below`}
				/>,
			);
			const hr = document.querySelector("hr");
			expect(hr).toBeInTheDocument();
		});
	});

	describe("edge cases", () => {
		it("should handle empty content", () => {
			const { container } = render(<MarkdownRenderer content="" />);
			expect(container).toBeInTheDocument();
		});

		it("should handle whitespace-only content", () => {
			const { container } = render(<MarkdownRenderer content="   \n\n   " />);
			expect(container).toBeInTheDocument();
		});

		it("should handle special characters", () => {
			render(<MarkdownRenderer content={"Special chars: < > & \" '"} />);
			expect(screen.getByText(/Special chars/)).toBeInTheDocument();
		});

		it("should handle emoji", () => {
			render(<MarkdownRenderer content="Hello 👋 World 🌍" />);
			expect(screen.getByText(/Hello 👋 World 🌍/)).toBeInTheDocument();
		});

		it("should handle very long content", () => {
			const longText = "A".repeat(1000);
			render(<MarkdownRenderer content={longText} />);
			expect(screen.getByText(longText)).toBeInTheDocument();
		});
	});
});

describe("createMarkdownRenderer", () => {
	it("should return a function", () => {
		const renderer = createMarkdownRenderer();
		expect(typeof renderer).toBe("function");
	});

	it("should render markdown content", () => {
		const renderer = createMarkdownRenderer();
		const element = renderer("**bold** text");

		render(element);

		expect(screen.getByText("bold")).toBeInTheDocument();
	});

	it("should be reusable", () => {
		const renderer = createMarkdownRenderer();

		const { unmount } = render(renderer("First"));
		expect(screen.getByText("First")).toBeInTheDocument();
		unmount();

		render(renderer("Second"));
		expect(screen.getByText("Second")).toBeInTheDocument();
	});
});

describe("MarkdownRenderer component elements", () => {
	describe("paragraph styling", () => {
		it("should add margin to paragraphs", () => {
			render(<MarkdownRenderer content="A paragraph." />);
			const p = document.querySelector("p");
			expect(p?.className).toContain("mb-4");
		});
	});

	describe("list styling", () => {
		it("should style unordered lists with disc markers", () => {
			render(
				<MarkdownRenderer
					content={`- Item 1
- Item 2`}
				/>,
			);
			const ul = document.querySelector("ul");
			expect(ul?.className).toContain("list-disc");
		});

		it("should style ordered lists with decimal markers", () => {
			render(
				<MarkdownRenderer
					content={`1. First
2. Second`}
				/>,
			);
			const ol = document.querySelector("ol");
			expect(ol?.className).toContain("list-decimal");
		});
	});

	describe("heading styling", () => {
		it("should style h1 with large font", () => {
			render(<MarkdownRenderer content="# Title" />);
			const h1 = document.querySelector("h1");
			expect(h1?.className).toContain("text-2xl");
			expect(h1?.className).toContain("font-bold");
		});

		it("should style h2 with medium font", () => {
			render(<MarkdownRenderer content="## Subtitle" />);
			const h2 = document.querySelector("h2");
			expect(h2?.className).toContain("text-xl");
		});

		it("should style h3 with smaller font", () => {
			render(<MarkdownRenderer content="### Section" />);
			const h3 = document.querySelector("h3");
			expect(h3?.className).toContain("text-lg");
		});
	});

	describe("blockquote styling", () => {
		it("should have border and italic styling", () => {
			render(<MarkdownRenderer content="> Quote" />);
			const blockquote = document.querySelector("blockquote");
			expect(blockquote?.className).toContain("border-l-4");
			expect(blockquote?.className).toContain("italic");
		});
	});

	describe("link attributes", () => {
		it("should set rel attribute for security", () => {
			render(<MarkdownRenderer content="[Link](https://example.com)" />);
			const link = document.querySelector("a");
			expect(link?.getAttribute("rel")).toContain("noreferrer");
		});

		it("should have underline styling", () => {
			render(<MarkdownRenderer content="[Link](https://example.com)" />);
			const link = document.querySelector("a");
			expect(link?.className).toContain("underline");
		});
	});

	describe("inline code styling", () => {
		it("should have rounded background", () => {
			render(<MarkdownRenderer content="Use `code` here" />);
			const code = document.querySelector("code");
			expect(code?.className).toContain("rounded");
			expect(code?.className).toContain("bg-muted");
		});

		it("should have monospace font", () => {
			render(<MarkdownRenderer content="Use `code` here" />);
			const code = document.querySelector("code");
			expect(code?.className).toContain("font-mono");
		});
	});

	describe("table rendering", () => {
		it("should render table with wrapper for overflow", () => {
			const tableContent = `| A | B |
| - | - |
| 1 | 2 |`;
			render(<MarkdownRenderer content={tableContent} />);
			const wrapper = document.querySelector(".overflow-x-auto");
			expect(wrapper).toBeInTheDocument();
		});

		it("should style table headers", () => {
			const tableContent = `| Header |
| ------ |
| Cell   |`;
			render(<MarkdownRenderer content={tableContent} />);
			const th = document.querySelector("th");
			expect(th?.className).toContain("font-semibold");
		});
	});

	describe("strikethrough rendering", () => {
		it("should style deleted text", () => {
			render(<MarkdownRenderer content="~~deleted~~" />);
			const del = document.querySelector("del");
			expect(del?.className).toContain("line-through");
		});
	});

	describe("horizontal rule styling", () => {
		it("should have border styling", () => {
			render(
				<MarkdownRenderer
					content={`Above

---

Below`}
				/>,
			);
			const hr = document.querySelector("hr");
			expect(hr?.className).toContain("border-border");
		});
	});
});

describe("complex markdown scenarios", () => {
	it("should render mixed content correctly", () => {
		const content = `# Title

Some **bold** and *italic* text with \`inline code\`.

- List item 1
- List item 2

> A blockquote

[A link](https://example.com)`;

		render(<MarkdownRenderer content={content} />);

		expect(document.querySelector("h1")).toBeInTheDocument();
		expect(document.querySelector("strong")).toBeInTheDocument();
		expect(document.querySelector("em")).toBeInTheDocument();
		expect(document.querySelector("code")).toBeInTheDocument();
		expect(document.querySelector("ul")).toBeInTheDocument();
		expect(document.querySelector("blockquote")).toBeInTheDocument();
		expect(document.querySelector("a")).toBeInTheDocument();
	});

	it("should handle nested formatting", () => {
		render(<MarkdownRenderer content="**bold with *italic* inside**" />);
		expect(document.querySelector("strong")).toBeInTheDocument();
		expect(document.querySelector("em")).toBeInTheDocument();
	});

	it("should handle consecutive code blocks", () => {
		render(<MarkdownRenderer content="Use `first` and `second` and `third`" />);
		const codes = document.querySelectorAll("code");
		expect(codes.length).toBe(3);
	});

	it("should handle link with formatting", () => {
		render(<MarkdownRenderer content="[**Bold Link**](https://example.com)" />);
		const link = document.querySelector("a");
		const bold = link?.querySelector("strong");
		expect(bold).toBeInTheDocument();
	});
});
