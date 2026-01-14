import {
	currentStreamAtom,
	isStreamingAtom,
	messagesAtom,
} from "@/lib/stores/chat";
import { isConversationsHydratedAtom } from "@/lib/stores/conversations";
import { useStore } from "@nanostores/react";
import { useEffect, useRef } from "react";
import { MessageItem } from "./MessageItem";
import { MessageListUI } from "./MessageList.ui";

interface MessageListProps {
	onRegenerate?: (prompt: string, transactionId: string) => void;
	renderContent?: (content: string, isStreaming?: boolean) => React.ReactNode;
}

export const MessageList = ({
	onRegenerate,
	renderContent,
}: MessageListProps) => {
	const messages = useStore(messagesAtom);
	const currentStream = useStore(currentStreamAtom);
	const isStreaming = useStore(isStreamingAtom);
	const isHydrated = useStore(isConversationsHydratedAtom);
	const scrollRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom on new messages or stream updates
	useEffect(() => {
		if (scrollRef.current && isHydrated) {
			// Use "auto" for stream updates to avoid stuttering/chunking appearance
			// and "smooth" only when a message is completed
			const behavior = isStreaming ? "auto" : "smooth";
			scrollRef.current.scrollIntoView({ behavior, block: "end" });
		}
	}, [messages, currentStream, isStreaming, isHydrated]);

	// When streaming starts, add an assistant message placeholder
	// This is handled in the chat hook, but we show the streaming content
	// Use a stable timestamp for the streaming message to avoid React purity issues
	const streamingMessage =
		isStreaming && currentStream
			? {
					id: "streaming",
					transactionId: "streaming",
					role: "assistant" as const,
					content: currentStream,
					timestamp: 0, // Streaming messages don't need a real timestamp
				}
			: null;

	// Combine real messages with streaming message
	const allMessages = streamingMessage
		? [...messages.filter((m) => m.id !== "streaming"), streamingMessage]
		: messages;

	// Ensure we only show messages after hydration to avoid SSR mismatch
	const displayMessages = isHydrated ? allMessages : [];

	return (
		<MessageListUI
			isEmpty={displayMessages.length === 0 && !isStreaming}
			isLoading={isStreaming && !currentStream}
			scrollRef={scrollRef}
		>
			{displayMessages.map((message) => (
				<MessageItem
					key={message.id}
					message={message}
					isStreaming={message.id === "streaming"}
					onRegenerate={onRegenerate}
					renderContent={renderContent}
				/>
			))}
		</MessageListUI>
	);
};
