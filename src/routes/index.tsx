import { createFileRoute } from "@tanstack/react-router";
import { ChatContainer } from "@/components/chat/container/ChatContainer";

// Typed search params for the chat page
interface ChatSearchParams {
	chat?: string; // Active chat ID
	sidebar?: boolean; // Sidebar open state
	archived?: boolean; // Show archived chats
	deleted?: boolean; // Show deleted chats
	forceCompat?: boolean; // Force show compatibility UI (for testing)
}

export const Route = createFileRoute("/")({
	validateSearch: (search: Record<string, unknown>): ChatSearchParams => {
		const result: ChatSearchParams = {
			chat: typeof search.chat === "string" ? search.chat : undefined,
		};

		if ("sidebar" in search) {
			result.sidebar =
				search.sidebar === true || search.sidebar === "true";
		}
		if ("archived" in search) {
			result.archived =
				search.archived === true || search.archived === "true";
		}
		if ("deleted" in search) {
			result.deleted =
				search.deleted === true || search.deleted === "true";
		}
		if ("forceCompat" in search) {
			result.forceCompat =
				search.forceCompat === true || search.forceCompat === "true";
		}

		return result;
	},
	component: IndexPage,
});

function IndexPage() {
	return <ChatContainer />;
}
