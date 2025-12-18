import { useState, useCallback, type ReactNode } from "react";
import { 
	Download, 
	Copy, 
	Code as CodeIcon, 
	FileCode, 
	Image as ImageIcon,
	Check,
	Maximize2,
	ZoomIn,
	ZoomOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface DiagramWrapperProps {
	children: ReactNode;
	language: string;
	svgContent: string | null;
	onCopyCode: () => void;
}

export const DiagramWrapper = ({ 
	children, 
	language, 
	svgContent, 
	onCopyCode 
}: DiagramWrapperProps) => {
	const [copied, setCopied] = useState(false);
	const [isZoomed, setIsZoomed] = useState(false);

	const handleCopyCode = useCallback(() => {
		onCopyCode();
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [onCopyCode]);

	const downloadFile = (content: string, fileName: string, contentType: string) => {
		const a = document.createElement("a");
		const file = new Blob([content], { type: contentType });
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
		URL.revokeObjectURL(a.href);
	};

	const exportSvg = () => {
		if (!svgContent) return;
		downloadFile(svgContent, `diagram-${Date.now()}.svg`, "image/svg+xml");
	};

	const exportPng = () => {
		if (!svgContent) return;
		
		const canvas = document.createElement("canvas");
		const img = new Image();
		const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(svgBlob);
		
		img.onload = () => {
			// Add padding
			const padding = 40;
			canvas.width = img.width + padding * 2;
			canvas.height = img.height + padding * 2;
			
			const ctx = canvas.getContext("2d");
			if (ctx) {
				// Fill background
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, padding, padding);
				
				canvas.toBlob((blob) => {
					if (blob) {
						const url = URL.createObjectURL(blob);
						const a = document.createElement("a");
						a.href = url;
						a.download = `diagram-${Date.now()}.png`;
						a.click();
						URL.revokeObjectURL(url);
					}
				}, "image/png");
			}
			URL.revokeObjectURL(url);
		};
		img.src = url;
	};

	return (
		<div className="group relative my-4 flex flex-col rounded-lg border bg-muted/30 overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
				<span className="text-xs font-medium uppercase text-muted-foreground">
					{language} Diagram
				</span>
				
				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon"
						className="h-7 w-7"
						onClick={() => setIsZoomed(!isZoomed)}
						title={isZoomed ? "Fit to Width" : "Original Size"}
					>
						{isZoomed ? (
							<ZoomOut className="h-3.5 w-3.5" />
						) : (
							<ZoomIn className="h-3.5 w-3.5" />
						)}
					</Button>

					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7"
								title="Fullscreen"
							>
								<Maximize2 className="h-3.5 w-3.5" />
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full flex flex-col p-0 overflow-hidden">
							<div className="flex items-center justify-between border-b bg-muted/50 px-6 py-3 shrink-0">
								<span className="text-sm font-semibold uppercase tracking-wider">
									{language} Diagram
								</span>
							</div>
							<div className="flex-1 overflow-auto bg-white p-8 dark:bg-zinc-950 flex items-center justify-center">
								<div 
									className="max-w-none [&_svg]:max-w-none [&_svg]:h-auto"
									dangerouslySetInnerHTML={{ __html: svgContent || "" }} 
								/>
							</div>
						</DialogContent>
					</Dialog>

					<Button
						variant="ghost"
						size="icon"
						className="h-7 w-7"
						onClick={handleCopyCode}
						title="Copy Code"
					>
						{copied ? (
							<Check className="h-3.5 w-3.5 text-green-500" />
						) : (
							<Copy className="h-3.5 w-3.5" />
						)}
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="h-7 w-7">
								<Download className="h-3.5 w-3.5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={exportSvg} disabled={!svgContent}>
								<FileCode className="mr-2 h-4 w-4" />
								<span>Export as SVG</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={exportPng} disabled={!svgContent}>
								<ImageIcon className="mr-2 h-4 w-4" />
								<span>Export as PNG</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleCopyCode}>
								<CodeIcon className="mr-2 h-4 w-4" />
								<span>Copy Source Code</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Content */}
			<div className={cn(
				"flex justify-center p-4 overflow-auto bg-white dark:bg-zinc-900/50 min-h-[100px]",
				!isZoomed ? "[&_svg]:max-w-full [&_svg]:h-auto" : "[&_svg]:max-w-none [&_svg]:h-auto"
			)}>
				{children}
			</div>
		</div>
	);
};
