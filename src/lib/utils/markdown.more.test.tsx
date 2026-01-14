import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CodeBlock, MarkdownRenderer } from "./markdown";

// Mock Prism highlighters and register common languages to avoid dynamic import issues
vi.mock("react-syntax-highlighter/dist/esm/prism-light", () => {
	const mockHighlighter = ({
		children,
		language,
	}: {
		children: React.ReactNode;
		language: string;
	}) => (
		<pre data-testid="syntax-highlighter" data-language={language}>
			{children}
		</pre>
	);
	(
		mockHighlighter as unknown as { registerLanguage: unknown }
	).registerLanguage = vi.fn();
	return { default: mockHighlighter };
});

vi.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
	oneDark: { color: "dark" },
	oneLight: { color: "light" },
}));

// Mock the language imports
const mockLang = { default: {} };
vi.mock(
	"react-syntax-highlighter/dist/esm/languages/prism/typescript",
	() => mockLang,
);
vi.mock(
	"react-syntax-highlighter/dist/esm/languages/prism/javascript",
	() => mockLang,
);

describe("MarkdownRenderer - additional coverage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		document.documentElement.className = "";
		vi.stubGlobal(
			"matchMedia",
			vi.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
			})),
		);
	});

	describe("CodeBlock component", () => {
		it("should render with language and code", async () => {
			render(<CodeBlock language="typescript" code="const x = 1;" />);

			expect(screen.getByText("typescript")).toBeInTheDocument();

			await waitFor(() => {
				expect(screen.getByTestId("syntax-highlighter")).toBeInTheDocument();
			});

			expect(screen.getByText("const x = 1;")).toBeInTheDocument();
		});

		it("should handle copy to clipboard", async () => {
			const user = (
				await import("@testing-library/user-event")
			).default.setup();
			render(<CodeBlock language="js" code="console.log(1);" />);

			const copyButton = await screen.findByRole("button");

			const mockClipboard = {
				writeText: vi.fn().mockResolvedValue(undefined),
			};
			vi.stubGlobal("navigator", { clipboard: mockClipboard });

			await user.click(copyButton);
			expect(mockClipboard.writeText).toHaveBeenCalledWith("console.log(1);");
		});

		it("should detect dark mode", async () => {
			document.documentElement.classList.add("dark");
			render(<CodeBlock language="ts" code="hi" />);

			await waitFor(() => {
				expect(screen.getByTestId("syntax-highlighter")).toBeInTheDocument();
			});
		});
	});

	describe("MarkdownRenderer integration", () => {
		it("should render paragraphs", () => {
			render(<MarkdownRenderer content="Hello world" />);
			expect(screen.getByText("Hello world")).toBeInTheDocument();
		});

		it("should render inline code", () => {
			render(<MarkdownRenderer content="use `code`" />);
			expect(document.querySelector("code")).toBeInTheDocument();
		});
	});
});
