import { useEffect, useState, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { DiagramWrapper } from "./DiagramWrapper";

interface MermaidProps {
	code: string;
}

// Lazy-loaded mermaid module cache
let mermaidModule: typeof import("mermaid")["default"] | null = null;

const loadMermaid = async () => {
	if (!mermaidModule) {
		const mod = await import("mermaid");
		mermaidModule = mod.default;
		mermaidModule.initialize({
			startOnLoad: false,
			theme: "dark",
			securityLevel: "loose",
			fontFamily: "ui-sans-serif, system-ui, sans-serif",
		});
	}
	return mermaidModule;
};

export const Mermaid = ({ code }: MermaidProps) => {
	const [svg, setSvg] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const render = useCallback(async (isMounted: boolean) => {
		if (!code) return;
		setIsLoading(true);
		setError(null);
		try {
			const mermaid = await loadMermaid();
			
			// Detect current theme
			const isDark = document.documentElement.classList.contains("dark") ||
				(!document.documentElement.classList.contains("light") &&
					window.matchMedia("(prefers-color-scheme: dark)").matches);
			
			mermaid.initialize({
				startOnLoad: false,
				theme: isDark ? "dark" : "default",
				securityLevel: "loose",
				fontFamily: "ui-sans-serif, system-ui, sans-serif",
			});

			const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
			const { svg } = await mermaid.render(id, code);
			
			if (isMounted) {
				setSvg(svg);
			}
		} catch (err) {
			console.error("Mermaid rendering error:", err);
			if (isMounted) {
				setError(err instanceof Error ? err.message : "Failed to render diagram");
			}
		} finally {
			if (isMounted) {
				setIsLoading(false);
			}
		}
	}, [code]);

	useEffect(() => {
		let isMounted = true;
		render(isMounted);

		// Re-render when theme changes
		const observer = new MutationObserver(() => render(isMounted));
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => {
			isMounted = false;
			observer.disconnect();
		};
	}, [code, render]);

	const handleCopyCode = useCallback(() => {
		navigator.clipboard.writeText(code);
	}, [code]);

	if (isLoading) {
		return (
			<div className="my-4 flex h-32 w-full items-center justify-center rounded-lg border bg-muted/30">
				<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="my-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-destructive">
				<AlertCircle className="h-5 w-5 shrink-0" />
				<div className="space-y-1">
					<p className="text-sm font-semibold">Diagram Error</p>
					<p className="text-xs opacity-80">{error}</p>
					<pre className="mt-2 overflow-x-auto rounded bg-destructive/10 p-2 font-mono text-[10px]">
						{code}
					</pre>
				</div>
			</div>
		);
	}

	return (
		<DiagramWrapper 
			language="mermaid" 
			svgContent={svg} 
			onCopyCode={handleCopyCode}
		>
			<div dangerouslySetInnerHTML={{ __html: svg || "" }} />
		</DiagramWrapper>
	);
};
