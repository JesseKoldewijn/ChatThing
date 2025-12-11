import { useState, useCallback } from "react";
import { useStore } from "@nanostores/react";
import { MessageItemUI } from "./MessageItem.ui";
import { messagesAtom, removeLastMessage, lastUserMessageAtom } from "@/lib/stores/chat";
import type { Message } from "@/lib/stores/chat";

interface MessageItemProps {
	message: Message;
	isStreaming?: boolean;
	onRegenerate?: (prompt: string) => void;
	renderContent?: (content: string) => React.ReactNode;
}

export const MessageItem = ({
	message,
	isStreaming = false,
	onRegenerate,
	renderContent,
}: MessageItemProps) => {
	const [isCopied, setIsCopied] = useState(false);
	const messages = useStore(messagesAtom);
	const lastUserMessage = useStore(lastUserMessageAtom);

	const isLastAssistantMessage =
		message.role === "assistant" &&
		messages[messages.length - 1]?.id === message.id;

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(message.content);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch {
			// Clipboard access denied
		}
	}, [message.content]);

	const handleRegenerate = useCallback(() => {
		if (onRegenerate && lastUserMessage) {
			// Remove the current assistant message
			removeLastMessage();
			// Regenerate with the last user message
			onRegenerate(lastUserMessage.content);
		}
	}, [onRegenerate, lastUserMessage]);

	return (
		<MessageItemUI
			content={message.content}
			role={message.role}
			images={message.images}
			isStreaming={isStreaming}
			isCopied={isCopied}
			onCopy={handleCopy}
			onRegenerate={isLastAssistantMessage ? handleRegenerate : undefined}
			renderContent={renderContent}
		/>
	);
};

