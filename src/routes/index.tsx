import { createFileRoute } from "@tanstack/react-router";
import { ChatContainer } from "@/components/chat/container/ChatContainer";

// Typed search params for the chat page
interface ChatSearchParams {
	chat?: string; // Active chat ID
	sidebar?: boolean; // Sidebar open state
	archived?: boolean; // Show archived chats
	deleted?: boolean; // Show deleted chats
}

export const Route = createFileRoute("/")({
	validateSearch: (search: Record<string, unknown>): ChatSearchParams => ({
		chat: typeof search.chat === "string" ? search.chat : undefined,
		sidebar: search.sidebar === true || search.sidebar === "true",
		archived: search.archived === true || search.archived === "true",
		deleted: search.deleted === true || search.deleted === "true",
	}),
	component: IndexPage,
});

function IndexPage() {
	return <ChatContainer />;
}

