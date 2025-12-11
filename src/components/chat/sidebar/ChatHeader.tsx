import { useStore } from "@nanostores/react";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeftClose, PanelLeft, Sparkles } from "lucide-react";
import {
	conversationsAtom,
	activeConversationIdAtom,
} from "@/lib/stores/conversations";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/components/ui/tooltip";

interface ChatHeaderProps {
	onMenuClick: () => void;
	isSidebarOpen?: boolean;
}

export const ChatHeader = ({
	onMenuClick,
	isSidebarOpen = false,
}: ChatHeaderProps) => {
	const conversations = useStore(conversationsAtom);
	const activeConversationId = useStore(activeConversationIdAtom);

	const activeConversation = conversations.find(
		(c) => c.id === activeConversationId
	);

	return (
		<div className="flex w-full items-center gap-3">
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-10 w-10 shrink-0"
							onClick={onMenuClick}
						>
							{/* Show different icon on mobile vs desktop */}
							<Menu className="h-5 w-5 lg:hidden" />
							{isSidebarOpen ? (
								<PanelLeftClose className="hidden h-5 w-5 lg:block" />
							) : (
								<PanelLeft className="hidden h-5 w-5 lg:block" />
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom">
						{isSidebarOpen ? "Close sidebar" : "Open sidebar"}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<div className="flex items-center gap-3">
				<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 shadow-sm">
					<Sparkles className="h-5 w-5 text-primary-foreground" />
				</div>
				<div className="min-w-0 flex-1 min-h-10 flex flex-col justify-center">
					<h1 className="truncate font-semibold leading-tight">
						{activeConversation?.title ?? "New Chat"}
					</h1>
					<p className="text-xs text-muted-foreground leading-tight">
						AI Assistant
					</p>
				</div>
			</div>
		</div>
	);
};
