import { useRef, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { MessageListUI } from "./MessageList.ui";
import { MessageItem } from "./MessageItem";
import { messagesAtom, currentStreamAtom, isStreamingAtom } from "@/lib/stores/chat";

interface MessageListProps {
	onRegenerate?: (prompt: string, transactionId: string) => void;
	renderContent?: (content: string) => React.ReactNode;
}

export const MessageList = ({ onRegenerate, renderContent }: MessageListProps) => {
	const messages = useStore(messagesAtom);
	const currentStream = useStore(currentStreamAtom);
	const isStreaming = useStore(isStreamingAtom);
	const scrollRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom on new messages or stream updates
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [messages, currentStream]);

	// When streaming starts, add an assistant message placeholder
	// This is handled in the chat hook, but we show the streaming content
	// Use a stable timestamp for the streaming message to avoid React purity issues
	const streamingMessage = isStreaming && currentStream ? {
		id: "streaming",
		transactionId: "streaming",
		role: "assistant" as const,
		content: currentStream,
		timestamp: 0, // Streaming messages don't need a real timestamp
	} : null;

	// Combine real messages with streaming message
	const allMessages = streamingMessage 
		? [...messages.filter(m => m.id !== "streaming"), streamingMessage]
		: messages;

	return (
		<MessageListUI
			isEmpty={messages.length === 0 && !isStreaming}
			isLoading={isStreaming && !currentStream}
			scrollRef={scrollRef}
		>
			{allMessages.map((message) => (
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

