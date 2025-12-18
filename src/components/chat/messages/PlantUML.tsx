import { useEffect, useState, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import plantumlEncoder from "plantuml-encoder";
import { DiagramWrapper } from "./DiagramWrapper";

interface PlantUMLProps {
	code: string;
}

export const PlantUML = ({ code }: PlantUMLProps) => {
	const [svg, setSvg] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const render = useCallback(async (isMounted: boolean) => {
		if (!code) return;
		setIsLoading(true);
		setError(null);
		
		try {
			// PlantUML rendering is done via server
			const encoded = plantumlEncoder.encode(code);
			const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
			
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`PlantUML server error: ${response.statusText}`);
			}
			
			const svgText = await response.text();
			
			if (isMounted) {
				setSvg(svgText);
			}
		} catch (err) {
			console.error("PlantUML rendering error:", err);
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
		return () => {
			isMounted = false;
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
			language="plantuml" 
			svgContent={svg} 
			onCopyCode={handleCopyCode}
		>
			<div dangerouslySetInnerHTML={{ __html: svg || "" }} />
		</DiagramWrapper>
	);
};

