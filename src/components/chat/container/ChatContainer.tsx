import { getAIManager } from "@/lib/ai";
import { loadingAtom } from "@/lib/ai/store";
import { useChatSearchParams } from "@/lib/hooks/useNavigation";
import {
	addMessage,
	appendToStream,
	clearStream,
	currentStreamAtom,
	hydrateMessages,
	type ImageAttachment,
	isStreamingAtom,
	messagesAtom,
} from "@/lib/stores/chat";
import {
	activeConversationIdAtom,
	createConversation,
	isConversationsHydratedAtom,
	isSyncingFromUrlAtom,
	saveCurrentConversation,
	setActiveChat as setActiveChatAtom,
	switchConversation,
	triggerTitleGeneration,
} from "@/lib/stores/conversations";
import { clearError, setError } from "@/lib/stores/errors";
import {
	experimentsAtom,
	googleModelAtom,
	isProviderLockedAtom,
	isUnlockDialogOpenAtom,
	ollamaModelAtom,
	openRouterModelAtom,
	PROVIDER_GOOGLE,
	PROVIDER_OLLAMA,
	PROVIDER_OPEN_ROUTER,
	providerTypeAtom,
	setIsUnlockDialogOpen,
} from "@/lib/stores/settings";
import {
	estimateTokens,
	recordMessage,
	recordResponse,
	recordTokenUsage,
	recordToolCall,
} from "@/lib/stores/usage";
import { createMarkdownRenderer } from "@/lib/utils/markdown";
import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ErrorBanner } from "../errors/ErrorBanner";
import { ChatInput } from "../input/ChatInput";
import { MessageList } from "../messages/MessageList";
import { ChatHeader } from "../sidebar/ChatHeader";
import { ConversationSidebar } from "../sidebar/ConversationSidebar";
import { UnlockDialog } from "../UnlockDialog";
import { ChatContainerUI } from "./ChatContainer.ui";

// Abort controller for stopping streams
let abortController: AbortController | null = null;

export const ChatContainer = () => {
	const {
		activeChat,
		sidebarOpen: isSidebarOpen,
		toggleSidebar,
		setSidebar,
		setActiveChat,
	} = useChatSearchParams();
	const activeConversationId = useStore(activeConversationIdAtom);

	const isStreaming = useStore(isStreamingAtom);
	const isConversationsHydrated = useStore(isConversationsHydratedAtom);
	const lastUrlChatRef = useRef<string | undefined>(undefined);
	const hasInitializedRef = useRef(false);

	// Unlock UX state
	const isUnlockDialogOpen = useStore(isUnlockDialogOpenAtom);
	const [pendingMessage, setPendingMessage] = useState<{
		message: string;
		images?: ImageAttachment[];
	} | null>(null);

	// Sync URL -> Atom
	useEffect(() => {
		// Wait for conversations to be hydrated before trying to sync from URL
		if (!isConversationsHydrated) {
			return;
		}

		const currentUrlId = activeChat || undefined;
		const currentAtomId = activeConversationId || undefined;

		// Initial sync from URL to Atom
		if (!hasInitializedRef.current) {
			if (currentUrlId && currentUrlId !== currentAtomId) {
				switchConversation(currentUrlId, false);
			}
			hasInitializedRef.current = true;
			lastUrlChatRef.current = currentUrlId;
			return;
		}

		// Subsequent syncs
		if (currentUrlId !== lastUrlChatRef.current) {
			const wasJustInitialized = lastUrlChatRef.current === undefined;
			// Strict check: only clear if the URL param was present and is now GONE,
			// and we are NOT in the middle of a hydration/initialization phase.
			const transitionedFromIdToNone =
				lastUrlChatRef.current !== undefined &&
				lastUrlChatRef.current !== null &&
				!currentUrlId;

			if (currentUrlId && currentUrlId !== currentAtomId) {
				switchConversation(currentUrlId, false);
			} else if (
				transitionedFromIdToNone &&
				currentAtomId &&
				!isStreaming &&
				!wasJustInitialized
			) {
				// We only clear the atom if the URL was previously set and is now cleared.
				// This prevents accidental clearing during hydration if the router briefly reports undefined.
				setActiveChatAtom(null, false);
			}
			lastUrlChatRef.current = currentUrlId;
		}
	}, [activeChat, activeConversationId, isStreaming, isConversationsHydrated]);

	// Sync Atom -> URL
	useEffect(() => {
		const unsubscribe = activeConversationIdAtom.subscribe((id) => {
			const currentAtomId = id ?? undefined;
			const currentUrlId = activeChat || undefined;

			// Only sync to URL if initialized, hydrated, not currently syncing FROM the URL,
			// and the values actually differ.
			if (
				hasInitializedRef.current &&
				isConversationsHydrated &&
				!isSyncingFromUrlAtom.get() &&
				currentAtomId !== currentUrlId
			) {
				setActiveChat(currentAtomId);
			}
		});
		return unsubscribe;
	}, [setActiveChat, isConversationsHydrated, activeChat]);

	// Keep track of last message and images for retry functionality
	const lastMessageRef = useRef<string>("");
	const lastImagesRef = useRef<ImageAttachment[] | undefined>(undefined);
	// Keep track of current transaction ID for stop functionality
	const currentTransactionIdRef = useRef<string | null>(null);

	// Pre-warm AI manager once hydrated
	useEffect(() => {
		if (isConversationsHydrated) {
			getAIManager().catch(() => {});
		}
	}, [isConversationsHydrated]);

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
				transactionId?: string;
			} = {},
		) => {
			const { addUserMessage = true, images } = options;

			// Clear any existing error
			clearError();

			// Store the message and images for potential retry
			lastMessageRef.current = prompt;
			lastImagesRef.current = images;

			// Create a new conversation if none exists
			let conversationId = activeConversationIdAtom.get();
			if (!conversationId) {
				const newConversation = createConversation();
				conversationId = newConversation.id;
			}

			// Start streaming state AFTER conversation is established/cleared
			isStreamingAtom.set(true);
			loadingAtom.set(true);
			clearStream();

			// Generate a transaction ID to link the prompt with all its responses
			const transactionId = options.transactionId ?? crypto.randomUUID();
			currentTransactionIdRef.current = transactionId;

			// Get the current message history for context BEFORE adding the new user message
			// Hydrate images from IndexedDB for the history
			const currentMessages = await hydrateMessages(messagesAtom.get());

			// Get experiments
			const experiments = experimentsAtom.get();
			const toolsEnabled = experiments.tools;

			// Add user message only if this is a new message (not a retry/regenerate)
			const provider = providerTypeAtom.get();
			const model =
				provider === PROVIDER_OPEN_ROUTER
					? openRouterModelAtom.get()
					: provider === PROVIDER_GOOGLE
						? googleModelAtom.get()
						: provider === PROVIDER_OLLAMA
							? ollamaModelAtom.get()
							: "prompt-api";

			if (addUserMessage) {
				addMessage("user", prompt, { images, transactionId });

				// Run non-critical tasks in background
				queueMicrotask(() => {
					if (conversationId) {
						recordMessage(conversationId, prompt.length, provider, model);
					}
					saveCurrentConversation();
					if (conversationId) {
						// Trigger title generation early and in parallel
						triggerTitleGeneration(conversationId, false, prompt);
					}
				});
			}

			try {
				abortController = new AbortController();

				// Get the current manager based on settings
				const manager = await getAIManager();

				// Get the stream from the AI (pass images and history)
				const stream = await manager.prompt(prompt, {
					images,
					history: currentMessages,
					toolsEnabled,
				});

				// Process the stream
				let textBuffer = "";
				const streamImages: ImageAttachment[] = [];
				let animationFrameId: number | null = null;

				const updateUI = () => {
					if (textBuffer) {
						appendToStream(textBuffer);
						textBuffer = "";
					}
					animationFrameId = null;
				};

				const scheduleUpdate = () => {
					if (animationFrameId === null && textBuffer) {
						animationFrameId = requestAnimationFrame(updateUI);
					}
				};

				for await (const part of stream) {
					if (abortController?.signal.aborted) {
						break;
					}

					if (!part) continue;

					// If the stream yields an error part, throw it so it's handled by the main catch block
					if (part.type === "error") {
						throw part.error instanceof Error
							? part.error
							: new Error(String(part.error));
					}

					try {
						if (part.type === "text") {
							textBuffer += part.content;
							scheduleUpdate();
						} else if (part.type === "image") {
							streamImages.push({
								id: crypto.randomUUID(),
								data: part.data,
								mimeType: part.mimeType,
								name: part.name,
							});
						} else if (part.type === "tool-call") {
							// Flash any buffered text before tool call
							if (animationFrameId !== null) {
								cancelAnimationFrame(animationFrameId);
							}
							updateUI();
							clearStream();
							const toolAnnouncement = `🔧 Using tool: ${part.toolName}`;
							const existingAnnouncement = messagesAtom
								.get()
								.find(
									(m) =>
										m.transactionId === transactionId &&
										m.role === "system" &&
										m.content === toolAnnouncement,
								);
							if (!existingAnnouncement) {
								addMessage("system", toolAnnouncement, {
									transactionId,
								});
								recordToolCall(conversationId!, part.toolName, provider, model);
							}
						}
					} catch (chunkError) {
						if (import.meta.env.DEV) {
							console.error("Error processing stream chunk:", chunkError);
						}
					}
				}
				// Final flush
				if (animationFrameId !== null) {
					cancelAnimationFrame(animationFrameId);
				}
				updateUI();

				// After streaming completes, add the full message (the final response)
				let finalContent = currentStreamAtom.get();

				// If the final content looks like a JSON tool call that leaked through as text
				// (common with smaller models or when tool calling fails), we try to hide it
				// if it doesn't contain any other meaningful text.
				if (
					finalContent.startsWith("{") &&
					finalContent.endsWith("}") &&
					(finalContent.includes('"name":') || finalContent.includes('"tool":'))
				) {
					// It's likely a leaked JSON tool call - check if it's the ONLY thing in the message
					try {
						JSON.parse(finalContent);
						// If it's valid JSON and looks like a tool, clear it if we already handled tool calls
						// or if it's a hallucinated tool.
						finalContent = "";
					} catch {
						// Not valid JSON, keep it
					}
				}

				if (finalContent || streamImages.length > 0) {
					addMessage("assistant", finalContent, {
						transactionId,
						images: streamImages.length > 0 ? streamImages : undefined,
					});

					// Run non-critical tasks in background
					queueMicrotask(() => {
						if (finalContent) {
							recordResponse(
								conversationId!,
								finalContent.length,
								provider,
								model,
							);

							// Track token usage (estimated since built-in AI doesn't provide actual counts)
							// Input tokens: prompt + context from history
							// Output tokens: the response
							const inputTokens = estimateTokens(prompt);
							const outputTokens = estimateTokens(finalContent);
							recordTokenUsage(inputTokens, outputTokens);
						}

						// Final save
						saveCurrentConversation();
					});
				}
			} catch (error) {
				const isAbortError =
					error instanceof Error && error.name === "AbortError";

				if (!isAbortError) {
					// Error handled by UI via system message

					// Ensure we have an Error object
					const errorObj =
						error instanceof Error ? error : new Error(String(error));

					// Set the error with retry action (don't add user message on retry)
					const retryMessage = lastMessageRef.current;
					const retryImages = lastImagesRef.current;
					const promptError = setError(errorObj, () => {
						streamResponse(retryMessage, {
							addUserMessage: false,
							images: retryImages,
							transactionId, // Preserve the transaction ID on retry
						});
					});

					// ALSO show the error inside the chat conversation for better visibility
					addMessage(
						"system",
						`❌ ${promptError.title}: ${promptError.message}`,
						{
							transactionId,
						},
					);

					// Save the conversation even on error to persist the error message
					saveCurrentConversation();
				}
			} finally {
				isStreamingAtom.set(false);
				loadingAtom.set(false);
				clearStream();
				abortController = null;
				currentTransactionIdRef.current = null;
			}
		},
		[],
	);

	// Public handler for sending new messages (with optional images)
	const handleSend = useCallback(
		async (message: string, images?: ImageAttachment[]) => {
			if (isProviderLockedAtom.get()) {
				setPendingMessage({ message, images });
				setIsUnlockDialogOpen(true);
				return;
			}
			await streamResponse(message, { addUserMessage: true, images });
		},
		[streamResponse],
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
			const transactionId = currentTransactionIdRef.current ?? undefined;
			addMessage("assistant", partialContent + " [stopped]", {
				transactionId,
			});
		}
		clearStream();
		currentTransactionIdRef.current = null;
	}, []);

	// Regenerate doesn't add a new user message, just streams a new response
	// Uses the same transactionId to avoid duplicate tool announcements
	const handleRegenerate = useCallback(
		(prompt: string, transactionId: string) => {
			streamResponse(prompt, { addUserMessage: false, transactionId });
		},
		[streamResponse],
	);

	const handleUnlockSuccess = useCallback(() => {
		if (pendingMessage) {
			streamResponse(pendingMessage.message, {
				addUserMessage: true,
				images: pendingMessage.images,
			});
			setPendingMessage(null);
		}
	}, [pendingMessage, streamResponse]);

	const handleToggleSidebar = useCallback(() => {
		toggleSidebar();
	}, [toggleSidebar]);

	const handleCloseSidebar = useCallback(() => {
		setSidebar(false);
	}, [setSidebar]);

	// Move focus to main content when sidebar closes to prevent a11y warnings
	useEffect(() => {
		if (!isSidebarOpen) {
			const mainContent = document.querySelector("main");
			if (mainContent && mainContent.contains(document.activeElement)) {
				// Focus is already in main, good
			} else if (
				document.activeElement &&
				document
					.querySelector("#chat-sidebar")
					?.contains(document.activeElement)
			) {
				// Focus was in sidebar, move it to the menu button or header
				const menuButton = document.querySelector(
					'[aria-controls="chat-sidebar"]',
				);
				(menuButton as HTMLElement)?.focus();
			}
		}
	}, [isSidebarOpen]);

	const markdownRenderer = useMemo(() => createMarkdownRenderer(), []);

	return (
		<>
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
			<UnlockDialog
				isOpen={isUnlockDialogOpen}
				onOpenChange={setIsUnlockDialogOpen}
				onUnlockSuccess={handleUnlockSuccess}
			/>
		</>
	);
};
