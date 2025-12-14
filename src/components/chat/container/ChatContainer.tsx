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
import {
	aiSettingsAtom,
	temperatureUnitAtom,
	type TemperatureUnit,
	getResolvedTimezone,
} from "@/lib/stores/settings";
import { setError, clearError } from "@/lib/stores/errors";
import {
	recordMessage,
	recordResponse,
	recordToolCall,
	recordTokenUsage,
	estimateTokens,
} from "@/lib/stores/usage";
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

/**
 * Strip tool result tags from content that may have leaked through the middleware
 */
const stripToolResultTags = (content: string): string => {
	return content.replace(/<result>[\s\S]*?<\/result>/g, "").trim();
};

// Countries that primarily use Fahrenheit for temperature
const FAHRENHEIT_COUNTRIES = new Set([
	"US", // United States
	"BS", // Bahamas
	"BZ", // Belize
	"KY", // Cayman Islands
	"PW", // Palau
	"FM", // Micronesia
	"MH", // Marshall Islands
]);

/**
 * Detect user's preferred temperature unit based on locale
 */
const detectTemperatureUnitFromLocale = (): "fahrenheit" | "celsius" => {
	try {
		const locale = navigator.language || "en-US";
		const regionMatch = locale.match(/-([A-Z]{2})$/i);
		const region = regionMatch ? regionMatch[1].toUpperCase() : null;

		if (region && FAHRENHEIT_COUNTRIES.has(region)) {
			return "fahrenheit";
		}

		if (typeof Intl !== "undefined" && Intl.Locale) {
			const intlLocale = new Intl.Locale(locale);
			const intlRegion = intlLocale.region?.toUpperCase();
			if (intlRegion && FAHRENHEIT_COUNTRIES.has(intlRegion)) {
				return "fahrenheit";
			}
		}

		return "celsius";
	} catch {
		return "celsius";
	}
};

/**
 * Get the resolved temperature unit (handles "auto" setting)
 */
const getResolvedTemperatureUnit = (
	setting: TemperatureUnit
): "fahrenheit" | "celsius" => {
	if (setting === "auto") {
		return detectTemperatureUnitFromLocale();
	}
	return setting;
};

/**
 * Convert Fahrenheit to Celsius
 */
const fahrenheitToCelsius = (f: number): number => {
	return Math.round(((f - 32) * 5) / 9);
};

/**
 * Format temperature with the user's preferred unit
 * Assumes input temperature is in Fahrenheit (from the weather tool)
 */
const formatTemperature = (
	tempF: number,
	unit: "fahrenheit" | "celsius"
): string => {
	if (unit === "celsius") {
		return `${fahrenheitToCelsius(tempF)}°C`;
	}
	return `${tempF}°F`;
};

export const ChatContainer = () => {
	const isSidebarOpen = useStore(sidebarOpenAtom);
	const activeConversationId = useStore(activeConversationIdAtom);
	const aiSettings = useStore(aiSettingsAtom);
	const { compatibility } = useCompatibility();

	// Keep track of last message and images for retry functionality
	const lastMessageRef = useRef<string>("");
	const lastImagesRef = useRef<ImageAttachment[] | undefined>(undefined);
	// Keep track of current transaction ID for stop functionality
	const currentTransactionIdRef = useRef<string | null>(null);

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
			} = {}
		) => {
			const { addUserMessage = true, images } = options;

			// Generate a transaction ID to link the prompt with all its responses
			const transactionId = options.transactionId ?? crypto.randomUUID();
			currentTransactionIdRef.current = transactionId;

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

			// Get the current message history for context BEFORE adding the new user message
			const currentMessages = messagesAtom.get();

			// Add user message only if this is a new message (not a retry/regenerate)
			if (addUserMessage) {
				addMessage("user", prompt, { images, transactionId });
				// Track usage
				recordMessage(conversationId, prompt.length);
			}

			// Start streaming state
			isStreamingAtom.set(true);
			loadingAtom.set(true);
			clearStream();

			try {
				abortController = new AbortController();

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

					switch (chunk.type) {
						case "text-delta":
							appendToStream(chunk.text);
							break;
						case "tool-call": {
							// Discard any content before the tool call - it's typically a guess
							// The model should wait for tool results, but sometimes generates text first
							clearStream();
							// Check if we already announced this tool in this transaction (avoid duplicates on retry)
							const toolAnnouncement = `🔧 Using tool: ${chunk.toolName}`;
							const existingAnnouncement = messagesAtom
								.get()
								.find(
									(m) =>
										m.transactionId === transactionId &&
										m.role === "assistant" &&
										m.content === toolAnnouncement
								);
							if (!existingAnnouncement) {
								addMessage("assistant", toolAnnouncement, {
									transactionId,
								});
								// Track tool usage
								recordToolCall(conversationId, chunk.toolName);
							}
							break;
						}
						case "tool-result": {
							// Tool completed - format the response based on the tool type
							const result = chunk.output as Record<
								string,
								unknown
							>;
							if (chunk.toolName === "weather" && result) {
								// Check for errors
								if (result.error) {
									appendToStream(
										`I couldn't get the weather: ${result.error}`
									);
								} else {
									const tempUnit = getResolvedTemperatureUnit(
										temperatureUnitAtom.get()
									);
									const formattedTemp = formatTemperature(
										result.temperature as number,
										tempUnit
									);
									const formattedFeelsLike =
										formatTemperature(
											result.feelsLike as number,
											tempUnit
										);

									const weatherResponse = [
										`The weather in ${
											result.location
										} is currently ${formattedTemp} and ${result.condition
											?.toString()
											.toLowerCase()}.`,
										`Feels like ${formattedFeelsLike} with ${result.humidity}% humidity and winds at ${result.windSpeed} mph.`,
									].join(" ");
									appendToStream(weatherResponse);
								}
							} else if (
								chunk.toolName === "datetime" &&
								result
							) {
								// Format datetime using user's preferred timezone
								const userTimezone = getResolvedTimezone();
								const timestamp = result.timestamp as number;
								const date = new Date(timestamp);

								const dateStr = date.toLocaleDateString(
									"en-US",
									{
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
										timeZone: userTimezone,
									}
								);
								const timeStr = date.toLocaleTimeString(
									"en-US",
									{
										hour: "2-digit",
										minute: "2-digit",
										second: "2-digit",
										hour12: true,
										timeZone: userTimezone,
									}
								);

								const datetimeResponse = `It's currently ${timeStr} on ${dateStr} (${userTimezone}).`;
								appendToStream(datetimeResponse);
							}
							break;
						}
						case "tool-error":
							// Tool failed - show error as its own message
							addMessage(
								"assistant",
								`❌ Error: ${chunk.error}`,
								{ transactionId }
							);
							break;
						// Other chunk types (step-start, step-finish, etc.) are handled automatically
					}
				}

				// After streaming completes, add the full message (the final response)
				const finalContent = stripToolResultTags(
					currentStreamAtom.get()
				);
				if (finalContent) {
					addMessage("assistant", finalContent, { transactionId });
					// Track response usage
					recordResponse(conversationId, finalContent.length);

					// Track token usage (estimated since built-in AI doesn't provide actual counts)
					// Input tokens: prompt + context from history
					// Output tokens: the response
					const inputTokens = estimateTokens(prompt);
					const outputTokens = estimateTokens(finalContent);
					recordTokenUsage(inputTokens, outputTokens);
				}

				// Save the conversation
				saveCurrentConversation();

				// Trigger title generation asynchronously AFTER the conversation completes
				// This runs outside the main conversation flow to avoid blocking the UI
				// and to not compete with the built-in AI for concurrent requests
				if (addUserMessage && conversationId) {
					queueMicrotask(() => {
						triggerTitleGeneration(conversationId, prompt);
					});
				}
			} catch (error) {
				if ((error as Error).name !== "AbortError") {
					// Set the error with retry action (don't add user message on retry)
					const retryMessage = lastMessageRef.current;
					const retryImages = lastImagesRef.current;
					setError(error as Error, () => {
						streamResponse(retryMessage, {
							addUserMessage: false,
							images: retryImages,
							transactionId, // Preserve the transaction ID on retry
						});
					});
				}
			} finally {
				isStreamingAtom.set(false);
				loadingAtom.set(false);
				clearStream();
				abortController = null;
				currentTransactionIdRef.current = null;
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
		const partialContent = stripToolResultTags(currentStreamAtom.get());
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
