import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Bot } from "lucide-react";
import type { ReactNode } from "react";

export interface MessageListUIProps {
	children: ReactNode;
	isEmpty: boolean;
	isLoading?: boolean;
	scrollRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Animated typing indicator with bouncing dots
 */
const TypingIndicator = () => (
	<div className="flex items-center gap-1">
		<span className="text-sm text-muted-foreground">Thinking</span>
		<div className="flex gap-0.5">
			<span
				className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
				style={{ animationDelay: "0ms", animationDuration: "600ms" }}
			/>
			<span
				className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
				style={{ animationDelay: "150ms", animationDuration: "600ms" }}
			/>
			<span
				className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
				style={{ animationDelay: "300ms", animationDuration: "600ms" }}
			/>
		</div>
	</div>
);

/**
 * Shimmer loading bar animation
 */
const ShimmerBar = ({
	width,
	delay = 0,
}: {
	width: string;
	delay?: number;
}) => (
	<div
		className="h-3 rounded-full bg-muted-foreground/10 overflow-hidden"
		style={{ width }}
	>
		<div
			className="h-full w-full bg-linear-to-r from-transparent via-muted-foreground/20 to-transparent animate-shimmer"
			style={{ animationDelay: `${delay}ms` }}
		/>
	</div>
);

export const MessageListUI = ({
	children,
	isEmpty,
	isLoading = false,
	scrollRef,
}: MessageListUIProps) => {
	return (
		<ScrollArea className="h-full w-full">
			<div ref={scrollRef} className="flex min-h-full min-w-0 flex-col">
				{isEmpty && !isLoading ? (
					<div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
						<div className="relative mb-6">
							<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 shadow-inner">
								<Sparkles className="h-10 w-10 text-primary" />
							</div>
							<div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted shadow-sm ring-2 ring-background">
								<Bot className="h-4 w-4 text-muted-foreground" />
							</div>
						</div>
						<h2 className="mb-2 text-2xl font-semibold tracking-tight">
							How can I help you today?
						</h2>
						<p className="max-w-md text-muted-foreground">
							Start a conversation by typing a message below. I'm
							here to assist with questions, ideas, or anything
							else you'd like to explore.
						</p>
					</div>
				) : (
					<div className="flex-1 min-w-0 py-4">
						{children}
						{isLoading && (
							<div className="flex gap-3 px-4 py-4">
								{/* AI Avatar with pulse animation */}
								<div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
									<Bot className="h-4 w-4 text-muted-foreground" />
									<span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
								</div>

								{/* Loading bubble */}
								<div className="flex flex-col gap-1">
									<span className="px-1 text-xs font-medium text-muted-foreground">
										AI
									</span>
									<div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 min-w-[200px]">
										{/* Typing indicator */}
										<TypingIndicator />

										{/* Shimmer loading bars */}
										<div className="mt-3 space-y-2">
											<ShimmerBar width="85%" delay={0} />
											<ShimmerBar
												width="70%"
												delay={100}
											/>
											<ShimmerBar
												width="45%"
												delay={200}
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</ScrollArea>
	);
};
