import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Sparkles } from "lucide-react";
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
		<span className="text-muted-foreground text-sm">Thinking</span>
		<div className="flex gap-0.5">
			<span
				className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full"
				style={{ animationDelay: "0ms", animationDuration: "600ms" }}
			/>
			<span
				className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full"
				style={{ animationDelay: "150ms", animationDuration: "600ms" }}
			/>
			<span
				className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full"
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
		className="bg-muted-foreground/10 h-3 overflow-hidden rounded-full"
		style={{ width }}
	>
		<div
			className="via-muted-foreground/20 animate-shimmer h-full w-full bg-linear-to-r from-transparent to-transparent"
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
		<ScrollArea data-testid="message-list" className="h-full w-full">
			<div ref={scrollRef} className="flex min-h-full min-w-0 flex-col">
				{isEmpty && !isLoading ? (
					<div
						data-testid="empty-chat-state"
						className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center"
					>
						<div className="relative mb-6">
							<div className="from-primary/20 to-primary/5 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br shadow-inner">
								<Sparkles className="text-primary h-10 w-10" />
							</div>
							<div className="bg-muted ring-background absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-2">
								<Bot className="text-muted-foreground h-4 w-4" />
							</div>
						</div>
						<h2
							data-testid="empty-chat-title"
							className="mb-2 text-2xl font-semibold tracking-tight"
						>
							How can I help you today?
						</h2>
						<p
							data-testid="empty-chat-description"
							className="text-muted-foreground max-w-md"
						>
							Start a conversation by typing a message below. I'm here to assist
							with questions, ideas, or anything else you'd like to explore.
						</p>
					</div>
				) : (
					<div
						data-testid="message-list-content"
						className="min-w-0 flex-1 py-4"
					>
						{children}
						{isLoading && (
							<div
								data-testid="ai-typing-indicator"
								className="flex gap-3 px-4 py-4"
							>
								{/* AI Avatar with pulse animation */}
								<div className="bg-muted relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
									<Bot className="text-muted-foreground h-4 w-4" />
									<span className="bg-primary/20 absolute inset-0 animate-ping rounded-full" />
								</div>

								{/* Loading bubble */}
								<div className="flex flex-col gap-1">
									<span className="text-muted-foreground px-1 text-xs font-medium">
										AI
									</span>
									<div className="bg-muted min-w-[200px] rounded-2xl rounded-tl-sm px-4 py-3">
										{/* Typing indicator */}
										<TypingIndicator />

										{/* Shimmer loading bars */}
										<div className="mt-3 space-y-2">
											<ShimmerBar width="85%" delay={0} />
											<ShimmerBar width="70%" delay={100} />
											<ShimmerBar width="45%" delay={200} />
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
