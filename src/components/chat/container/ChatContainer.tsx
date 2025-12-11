import { useCallback, useRef } from "react";
import { useStore } from "@nanostores/react";
import { ChatContainerUI } from "./ChatContainer.ui";
import { MessageList } from "../messages/MessageList";
import { ChatInput } from "../input/ChatInput";
import { ConversationSidebar } from "../sidebar/ConversationSidebar";
import { ChatHeader } from "../sidebar/ChatHeader";
import { CompatibilityError } from "../errors/CompatibilityError";
import { ErrorBanner } from "../errors/ErrorBanner";
import { createMarkdownRenderer } from "@/lib/utils/markdown";
import {
	addMessage,
	isStreamingAtom,
	currentStreamAtom,
	clearStream,
	appendToStream,
	messagesAtom,
	type ImageAttachment,
} from "@/lib/stores/chat";
import {
	saveCurrentConversation,
	activeConversationIdAtom,
	createConversation,
	triggerTitleGeneration,
} from "@/lib/stores/conversations";
import { aiSettingsAtom } from "@/lib/stores/settings";
import { setError, clearError } from "@/lib/stores/errors";
import { promptAsync } from "@/lib/ai/prompt";
import { loadingAtom } from "@/lib/ai/store";
import { useCompatibility } from "@/lib/ai/hooks";
import {
	sidebarOpenAtom,
	toggleSidebar,
	setSidebar,
} from "@/lib/stores/navigation";

// Abort controller for stopping streams
let abortController: AbortController | null = null;

export const ChatContainer = () => {
	const isSidebarOpen = useStore(sidebarOpenAtom);
	const activeConversationId = useStore(activeConversationIdAtom);
	const aiSettings = useStore(aiSettingsAtom);
	const { compatibility } = useCompatibility();

	// Keep track of last message and images for retry functionality
	const lastMessageRef = useRef<string>("");
	const lastImagesRef = useRef<ImageAttachment[] | undefined>(undefined);

	/**
	 * Core function to stream AI response for a given prompt
	 * @param prompt - The prompt to send to the AI
	 * @param options - Options including whether to add user message and images
	 */
	const streamResponse = useCallback(
		async (
			prompt: string,
			options: {
				addUserMessage?: boolean;
				images?: ImageAttachment[];
			} = {}
		) => {
			const { addUserMessage = true, images } = options;

			// Clear any existing error
			clearError();

			// Store the message and images for potential retry
			lastMessageRef.current = prompt;
			lastImagesRef.current = images;

			// Create a new conversation if none exists
			let conversationId = activeConversationId;
			if (!conversationId) {
				const newConversation = createConversation();
				conversationId = newConversation.id;
			}

			// Add user message only if this is a new message (not a retry/regenerate)
			if (addUserMessage) {
				addMessage("user", prompt, images);

				// Trigger title generation immediately in parallel with the AI response
				// This makes the title appear sooner rather than waiting for the response to complete
				triggerTitleGeneration(conversationId, prompt);
			}

			// Start streaming state
			isStreamingAtom.set(true);
			loadingAtom.set(true);
			clearStream();

			try {
				abortController = new AbortController();

				// Get the current message history for context
				const currentMessages = messagesAtom.get();

				// Get the stream from the AI (pass images and history)
				const stream = await promptAsync(prompt, {
					...aiSettings,
					images,
					history: currentMessages,
				});

				// Process the stream
				for await (const chunk of stream) {
					if (abortController?.signal.aborted) {
						break;
					}

					if (chunk.type === "text-delta") {
						appendToStream(chunk.text);
					}
				}

				// After streaming completes, add the full message
				const finalContent = currentStreamAtom.get();
				if (finalContent) {
					addMessage("assistant", finalContent);
				}

				// Save the conversation
				saveCurrentConversation();
			} catch (error) {
				if ((error as Error).name !== "AbortError") {
					// Set the error with retry action (don't add user message on retry)
					const retryMessage = lastMessageRef.current;
					const retryImages = lastImagesRef.current;
					setError(error as Error, () => {
						streamResponse(retryMessage, {
							addUserMessage: false,
							images: retryImages,
						});
					});
				}
			} finally {
				isStreamingAtom.set(false);
				loadingAtom.set(false);
				clearStream();
				abortController = null;
			}
		},
		[activeConversationId, aiSettings]
	);

	// Public handler for sending new messages (with optional images)
	const handleSend = useCallback(
		async (message: string, images?: ImageAttachment[]) => {
			await streamResponse(message, { addUserMessage: true, images });
		},
		[streamResponse]
	);

	const handleStop = useCallback(() => {
		if (abortController) {
			abortController.abort();
		}
		isStreamingAtom.set(false);
		loadingAtom.set(false);

		// Keep what was streamed so far
		const partialContent = currentStreamAtom.get();
		if (partialContent) {
			addMessage("assistant", partialContent + " [stopped]");
		}
		clearStream();
	}, []);

	// Regenerate doesn't add a new user message, just streams a new response
	const handleRegenerate = useCallback(
		(prompt: string) => {
			streamResponse(prompt, { addUserMessage: false });
		},
		[streamResponse]
	);

	const handleToggleSidebar = useCallback(() => {
		toggleSidebar();
	}, []);

	const handleCloseSidebar = useCallback(() => {
		setSidebar(false);
	}, []);

	const markdownRenderer = createMarkdownRenderer();

	// Skip loading state - go straight to the real UI
	// The compatibility check runs in the background.
	// If incompatible, we'll show the error once the check completes.

	// Show compatibility error if not compatible
	if (compatibility && !compatibility.isCompatible) {
		return <CompatibilityError />;
	}

	return (
		<ChatContainerUI
			isSidebarOpen={isSidebarOpen}
			onCloseSidebar={handleCloseSidebar}
			sidebar={<ConversationSidebar onClose={handleCloseSidebar} />}
			header={
				<ChatHeader
					onMenuClick={handleToggleSidebar}
					isSidebarOpen={isSidebarOpen}
				/>
			}
			messageList={
				<MessageList
					onRegenerate={handleRegenerate}
					renderContent={markdownRenderer}
				/>
			}
			errorBanner={<ErrorBanner />}
			input={<ChatInput onSend={handleSend} onStop={handleStop} />}
		/>
	);
};
