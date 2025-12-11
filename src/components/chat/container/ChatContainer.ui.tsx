import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface ChatContainerUIProps {
	sidebar?: ReactNode;
	header?: ReactNode;
	messageList: ReactNode;
	input: ReactNode;
	errorBanner?: ReactNode;
	isSidebarOpen?: boolean;
	onCloseSidebar?: () => void;
}

export const ChatContainerUI = ({
	sidebar,
	header,
	messageList,
	input,
	errorBanner,
	isSidebarOpen = false,
	onCloseSidebar,
}: ChatContainerUIProps) => {
	return (
		<div className="flex h-screen w-full overflow-hidden bg-background">
			{/* Sidebar */}
			{sidebar && (
				<aside
					className={cn(
						"flex h-full w-72 shrink-0 flex-col border-r bg-sidebar transition-all duration-300 ease-in-out",
						// On mobile: fixed positioning, slide in/out
						"fixed left-0 top-0 z-40 lg:relative lg:z-auto",
						// Control visibility with state on all screen sizes
						isSidebarOpen
							? "translate-x-0"
							: "-translate-x-full lg:ml-[-288px] lg:translate-x-0"
					)}
				>
					{sidebar}
				</aside>
			)}

			{/* Mobile overlay - click to close */}
			{sidebar && isSidebarOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
					onClick={onCloseSidebar}
					aria-hidden="true"
				/>
			)}

			{/* Main chat area */}
			<main className="flex min-w-0 flex-1 flex-col overflow-hidden">
				{/* Header - fixed height to prevent shift */}
				{header && (
					<header className="flex h-14 shrink-0 items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
						{header}
					</header>
				)}

				{/* Message list - flexible area */}
				<div className="min-w-0 flex-1 overflow-hidden">
					{messageList}
				</div>

				{/* Error banner - above input, fixed height when visible */}
				{errorBanner && <div className="shrink-0">{errorBanner}</div>}

				{/* Input - fixed at bottom */}
				{input && <div className="shrink-0">{input}</div>}
			</main>
		</div>
	);
};
