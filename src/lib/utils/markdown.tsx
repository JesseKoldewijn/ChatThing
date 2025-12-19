import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState, useCallback, useEffect, type ComponentType } from "react";
import type { SyntaxHighlighterProps } from "react-syntax-highlighter";

interface CodeBlockProps {
	language: string;
	code: string;
}

// Cache for lazy-loaded modules
const syntaxHighlighterCache: {
	SyntaxHighlighter: ComponentType<SyntaxHighlighterProps> | null;
	oneDark: Record<string, React.CSSProperties> | null;
	oneLight: Record<string, React.CSSProperties> | null;
	loaded: boolean;
} = {
	SyntaxHighlighter: null,
	oneDark: null,
	oneLight: null,
	loaded: false,
};

// Lazy load syntax highlighter with only common languages
const loadSyntaxHighlighter = async () => {
	if (!syntaxHighlighterCache.loaded) {
		// Use PrismLight for smaller bundle - import directly to avoid pulling all exports
		const [{ default: PrismLight }, stylesModule] = await Promise.all([
			import("react-syntax-highlighter/dist/esm/prism-light"),
			import("react-syntax-highlighter/dist/esm/styles/prism"),
		]);

		// Register common languages
		const [
			{ default: typescript },
			{ default: javascript },
			{ default: jsx },
			{ default: tsx },
			{ default: css },
			{ default: json },
			{ default: bash },
			{ default: python },
			{ default: markdown },
			{ default: sql },
			{ default: yaml },
			{ default: rust },
			{ default: go },
			{ default: java },
			{ default: c },
			{ default: cpp },
			{ default: csharp },
		] = await Promise.all([
			import(
				"react-syntax-highlighter/dist/esm/languages/prism/typescript"
			),
			import(
				"react-syntax-highlighter/dist/esm/languages/prism/javascript"
			),
			import("react-syntax-highlighter/dist/esm/languages/prism/jsx"),
			import("react-syntax-highlighter/dist/esm/languages/prism/tsx"),
			import("react-syntax-highlighter/dist/esm/languages/prism/css"),
			import("react-syntax-highlighter/dist/esm/languages/prism/json"),
			import("react-syntax-highlighter/dist/esm/languages/prism/bash"),
			import("react-syntax-highlighter/dist/esm/languages/prism/python"),
			import(
				"react-syntax-highlighter/dist/esm/languages/prism/markdown"
			),
			import("react-syntax-highlighter/dist/esm/languages/prism/sql"),
			import("react-syntax-highlighter/dist/esm/languages/prism/yaml"),
			import("react-syntax-highlighter/dist/esm/languages/prism/rust"),
			import("react-syntax-highlighter/dist/esm/languages/prism/go"),
			import("react-syntax-highlighter/dist/esm/languages/prism/java"),
			import("react-syntax-highlighter/dist/esm/languages/prism/c"),
			import("react-syntax-highlighter/dist/esm/languages/prism/cpp"),
			import("react-syntax-highlighter/dist/esm/languages/prism/csharp"),
		]);

		PrismLight.registerLanguage("typescript", typescript);
		PrismLight.registerLanguage("ts", typescript);
		PrismLight.registerLanguage("javascript", javascript);
		PrismLight.registerLanguage("js", javascript);
		PrismLight.registerLanguage("jsx", jsx);
		PrismLight.registerLanguage("tsx", tsx);
		PrismLight.registerLanguage("css", css);
		PrismLight.registerLanguage("json", json);
		PrismLight.registerLanguage("bash", bash);
		PrismLight.registerLanguage("sh", bash);
		PrismLight.registerLanguage("shell", bash);
		PrismLight.registerLanguage("python", python);
		PrismLight.registerLanguage("py", python);
		PrismLight.registerLanguage("markdown", markdown);
		PrismLight.registerLanguage("md", markdown);
		PrismLight.registerLanguage("sql", sql);
		PrismLight.registerLanguage("yaml", yaml);
		PrismLight.registerLanguage("yml", yaml);
		PrismLight.registerLanguage("rust", rust);
		PrismLight.registerLanguage("rs", rust);
		PrismLight.registerLanguage("go", go);
		PrismLight.registerLanguage("golang", go);
		PrismLight.registerLanguage("java", java);
		PrismLight.registerLanguage("c", c);
		PrismLight.registerLanguage("cpp", cpp);
		PrismLight.registerLanguage("c++", cpp);
		PrismLight.registerLanguage("csharp", csharp);
		PrismLight.registerLanguage("cs", csharp);

		syntaxHighlighterCache.SyntaxHighlighter = PrismLight;
		syntaxHighlighterCache.oneDark = stylesModule.oneDark;
		syntaxHighlighterCache.oneLight = stylesModule.oneLight;
		syntaxHighlighterCache.loaded = true;
	}
	return syntaxHighlighterCache;
};

// Fallback component shown while syntax highlighter loads
const CodeBlockFallback = ({ code }: { code: string }) => (
	<div className="overflow-x-auto">
		<pre
			className="p-4 font-mono text-sm"
			style={{ minWidth: "100%", width: "fit-content" }}
		>
			<code>{code}</code>
		</pre>
	</div>
);

const CodeBlock = ({ language, code }: CodeBlockProps) => {
	const [copied, setCopied] = useState(false);
	const [highlighterLoaded, setHighlighterLoaded] = useState(
		!!syntaxHighlighterCache.SyntaxHighlighter
	);
	// Initialize as null to avoid hydration mismatch - render fallback first
	const [isDark, setIsDark] = useState<boolean | null>(null);

	// Detect dark mode after hydration to avoid SSR mismatch
	useEffect(() => {
		const checkDarkMode = () => {
			const dark =
				document.documentElement.classList.contains("dark") ||
				(!document.documentElement.classList.contains("light") &&
					window.matchMedia("(prefers-color-scheme: dark)").matches);
			setIsDark(dark);
		};
		checkDarkMode();

		// Listen for theme changes via class mutations on <html>
		const observer = new MutationObserver(checkDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	// Lazy load syntax highlighter on mount
	useEffect(() => {
		if (!highlighterLoaded) {
			loadSyntaxHighlighter().then(() => setHighlighterLoaded(true));
		}
	}, [highlighterLoaded]);

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard access denied
		}
	}, [code]);

	const { SyntaxHighlighter, oneDark, oneLight } = syntaxHighlighterCache;

	return (
		<div className="group relative my-4 overflow-hidden rounded-lg border bg-muted">
			{/* Header with language and copy button */}
			<div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
				<span className="text-xs font-medium uppercase text-muted-foreground">
					{language || "code"}
				</span>
				<Button
					variant="ghost"
					size="icon"
					className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
					onClick={handleCopy}
				>
					{copied ? (
						<Check className="h-3 w-3 text-green-500" />
					) : (
						<Copy className="h-3 w-3" />
					)}
				</Button>
			</div>

			{/* Scrollable code content */}
			<div className="overflow-x-auto">
				{highlighterLoaded &&
				SyntaxHighlighter &&
				oneDark &&
				oneLight &&
				isDark !== null ? (
					<SyntaxHighlighter
						language={language || "text"}
						style={isDark ? oneDark : oneLight}
						customStyle={{
							margin: 0,
							padding: "1rem",
							background: "transparent",
							fontSize: "0.875rem",
							minWidth: "100%",
							width: "fit-content",
						}}
						codeTagProps={{
							style: {
								fontFamily:
									"ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
							},
						}}
					>
						{code}
					</SyntaxHighlighter>
				) : (
					<CodeBlockFallback code={code} />
				)}
			</div>
		</div>
	);
};

interface MarkdownRendererProps {
	content: string;
	isStreaming?: boolean;
}

export const MarkdownRenderer = ({ content, isStreaming = false }: MarkdownRendererProps) => {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			components={{
				code({ className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");
					const isInline = !match;

					if (isInline) {
						return (
							<code
								className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
								{...props}
							>
								{children}
							</code>
						);
					}

					const language = match[1];
					const code = String(children).replace(/\n$/, "");

					return (
						<CodeBlock
							language={language}
							code={code}
						/>
					);
				},
				pre({ children }) {
					// The code component handles everything, just pass through
					return <>{children}</>;
				},
				p({ children }) {
					return <p className="mb-4 last:mb-0">{children}</p>;
				},
				ul({ children }) {
					return (
						<ul className="mb-4 list-disc pl-6 last:mb-0">
							{children}
						</ul>
					);
				},
				ol({ children }) {
					return (
						<ol className="mb-4 list-decimal pl-6 last:mb-0">
							{children}
						</ol>
					);
				},
				li({ children }) {
					return <li className="mb-1">{children}</li>;
				},
				h1({ children }) {
					return (
						<h1 className="mb-4 text-2xl font-bold">{children}</h1>
					);
				},
				h2({ children }) {
					return (
						<h2 className="mb-3 text-xl font-bold">{children}</h2>
					);
				},
				h3({ children }) {
					return (
						<h3 className="mb-2 text-lg font-semibold">
							{children}
						</h3>
					);
				},
				blockquote({ children }) {
					return (
						<blockquote className="mb-4 border-l-4 border-muted-foreground/30 pl-4 italic">
							{children}
						</blockquote>
					);
				},
				a({ href, children }) {
					return (
						<a
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline hover:no-underline"
						>
							{children}
						</a>
					);
				},
				hr() {
					return <hr className="my-4 border-border" />;
				},
				// Table components for GFM tables
				table({ children }) {
					return (
						<div className="my-4 overflow-x-auto rounded-lg border border-border">
							<table className="w-full border-collapse text-sm">
								{children}
							</table>
						</div>
					);
				},
				thead({ children }) {
					return <thead className="bg-muted/50">{children}</thead>;
				},
				tbody({ children }) {
					return (
						<tbody className="divide-y divide-border">
							{children}
						</tbody>
					);
				},
				tr({ children }) {
					return (
						<tr className="hover:bg-muted/30 transition-colors">
							{children}
						</tr>
					);
				},
				th({ children, style }) {
					// Handle text alignment from GFM
					const align = style?.textAlign as
						| "left"
						| "center"
						| "right"
						| undefined;
					const alignClass =
						align === "center"
							? "text-center"
							: align === "right"
							? "text-right"
							: "text-left";

					return (
						<th
							className={`px-4 py-2.5 font-semibold text-foreground ${alignClass}`}
						>
							{children}
						</th>
					);
				},
				td({ children, style }) {
					// Handle text alignment from GFM
					const align = style?.textAlign as
						| "left"
						| "center"
						| "right"
						| undefined;
					const alignClass =
						align === "center"
							? "text-center"
							: align === "right"
							? "text-right"
							: "text-left";

					return (
						<td
							className={`px-4 py-2.5 text-muted-foreground ${alignClass}`}
						>
							{children}
						</td>
					);
				},
				// Strikethrough support from GFM
				del({ children }) {
					return (
						<del className="text-muted-foreground line-through">
							{children}
						</del>
					);
				},
				// Task list support from GFM
				input({ checked, disabled, ...props }) {
					return (
						<input
							type="checkbox"
							checked={checked}
							disabled={disabled}
							className="mr-2 h-4 w-4 rounded border-border"
							{...props}
						/>
					);
				},
			}}
		>
			{content}
		</Markdown>
	);
};

// Helper to create a render function for MessageItem
// eslint-disable-next-line react-refresh/only-export-components
export const createMarkdownRenderer = () => {
	return (content: string, isStreaming = false) => <MarkdownRenderer content={content} isStreaming={isStreaming} />;
};
