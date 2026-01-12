import { n as atom } from "../_libs/nanostores.mjs";
import { E as createLucideIcon, O as deleteConversationImages, P as getAIManager, g as clearMessages, it as saveImagesToIndexedDB, m as clearAllImages, p as archiveThresholdAtom, q as messagesAtom, wt as thresholdToHours } from "./button-Dt876Ufa.mjs";
var TriangleAlert = createLucideIcon("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
var isBrowser = typeof window !== "undefined";
var activeChatIdAtom = /* @__PURE__ */ atom(null);
var isSyncingFromUrlAtom = /* @__PURE__ */ atom(false);
var setActiveChat = (id, syncToUrl = true) => {
	isSyncingFromUrlAtom.set(!syncToUrl);
	activeChatIdAtom.set(id);
	queueMicrotask(() => {
		isSyncingFromUrlAtom.set(false);
	});
};
var conversationsAtom = /* @__PURE__ */ atom([]);
var titleGenerationInProgress = /* @__PURE__ */ new Set();
var previousChatId = null;
var programmaticSwitchCounter = 0;
var programmaticSwitchInProgress = false;
var STORAGE_KEY = "ai-chat-conversations";
var loadMessagesForChat = (chatId) => {
	if (!chatId) {
		clearMessages();
		return;
	}
	const conversation = conversationsAtom.get().find((c) => c.id === chatId);
	if (conversation) messagesAtom.set(conversation.messages);
	else {
		setActiveChat(null);
		clearMessages();
	}
};
var isConversationsHydratedAtom = /* @__PURE__ */ atom(false);
var initializeConversations = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) try {
		const conversations = JSON.parse(stored).map((conv) => ({
			...conv,
			status: conv.status ?? "active"
		}));
		conversationsAtom.set(conversations);
	} catch {}
	runAutoArchive();
	const urlChatId = activeChatIdAtom.get();
	previousChatId = urlChatId;
	loadMessagesForChat(urlChatId);
	isConversationsHydratedAtom.set(true);
};
if (isBrowser) activeChatIdAtom.subscribe((newChatId) => {
	if (newChatId === previousChatId) return;
	if (programmaticSwitchInProgress || programmaticSwitchCounter > 0) {
		previousChatId = newChatId;
		return;
	}
	queueMicrotask(() => {
		if (activeChatIdAtom.get() !== newChatId) return;
		if (programmaticSwitchInProgress || programmaticSwitchCounter > 0) return;
		if (previousChatId) saveCurrentConversationById(previousChatId);
		loadMessagesForChat(newChatId);
		previousChatId = newChatId;
	});
});
var prepareMessagesForStorage = async (messages, conversationId) => {
	const preparedMessages = [];
	for (const msg of messages) if (msg.images && msg.images.length > 0) {
		const imagesNeedingSave = msg.images.filter((img) => img.data && !img.storedInDb);
		if (imagesNeedingSave.length > 0) {
			const savedImages = await saveImagesToIndexedDB(imagesNeedingSave, conversationId);
			const allImages = [...msg.images.filter((img) => img.storedInDb), ...savedImages];
			preparedMessages.push({
				...msg,
				images: allImages
			});
		} else preparedMessages.push(msg);
	} else preparedMessages.push(msg);
	return preparedMessages;
};
var pendingPersistTimeout = null;
var persist = (immediate = false) => {
	if (!isBrowser) return;
	const performPersist = () => {
		const conversations = conversationsAtom.get();
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
		} catch (error) {
			if (error instanceof DOMException && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED")) {}
		}
		pendingPersistTimeout = null;
	};
	if (immediate) {
		if (pendingPersistTimeout) {
			clearTimeout(pendingPersistTimeout);
			pendingPersistTimeout = null;
		}
		performPersist();
	} else if (!pendingPersistTimeout) pendingPersistTimeout = setTimeout(performPersist, 500);
};
var saveCurrentConversationById = async (chatId) => {
	const currentActiveId = activeChatIdAtom.get();
	const messages = messagesAtom.get();
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === chatId);
	if (index !== -1) {
		const messagesToSave = chatId === currentActiveId ? messages : conversations[index].messages;
		if (messagesToSave.length === 0) return;
		const preparedMessages = await prepareMessagesForStorage(messagesToSave, chatId);
		const currentConversations = conversationsAtom.get();
		const currentIndex = currentConversations.findIndex((c) => c.id === chatId);
		if (currentIndex !== -1) {
			const updated = [...currentConversations];
			updated[currentIndex] = {
				...updated[currentIndex],
				messages: preparedMessages,
				updatedAt: Date.now()
			};
			conversationsAtom.set(updated);
			persist();
		}
	}
};
var saveCurrentConversation = async () => {
	const activeId = activeChatIdAtom.get();
	if (!activeId) return;
	await saveCurrentConversationById(activeId);
};
var shouldAutoArchive = (conversation, thresholdHours) => {
	if (thresholdHours <= 0) return false;
	if (conversation.status !== "active") return false;
	const thresholdMs = thresholdHours * 60 * 60 * 1e3;
	return Date.now() - conversation.updatedAt > thresholdMs;
};
var runAutoArchive = () => {
	const thresholdHours = thresholdToHours(archiveThresholdAtom.get());
	if (thresholdHours <= 0) return 0;
	const conversations = conversationsAtom.get();
	let archivedCount = 0;
	const updated = conversations.map((conv) => {
		if (shouldAutoArchive(conv, thresholdHours)) {
			archivedCount++;
			return {
				...conv,
				status: "archived"
			};
		}
		return conv;
	});
	if (archivedCount > 0) {
		conversationsAtom.set(updated);
		persist();
	}
	return archivedCount;
};
var createConversation = (title) => {
	const conversation = {
		id: crypto.randomUUID(),
		title: title ?? "New Chat",
		createdAt: Date.now(),
		updatedAt: Date.now(),
		messages: [],
		status: "active"
	};
	conversationsAtom.set([conversation, ...conversationsAtom.get()]);
	programmaticSwitchInProgress = true;
	programmaticSwitchCounter++;
	previousChatId = conversation.id;
	setActiveChat(conversation.id);
	clearMessages();
	queueMicrotask(() => {
		programmaticSwitchInProgress = false;
		queueMicrotask(() => {
			programmaticSwitchCounter = Math.max(0, programmaticSwitchCounter - 1);
		});
	});
	persist();
	return conversation;
};
var switchConversation = async (id, syncToUrl = true) => {
	if (!syncToUrl) isSyncingFromUrlAtom.set(true);
	try {
		await saveCurrentConversation();
		const conversation = conversationsAtom.get().find((c) => c.id === id);
		if (conversation) {
			programmaticSwitchInProgress = true;
			programmaticSwitchCounter++;
			previousChatId = id;
			messagesAtom.set(conversation.messages);
			setActiveChat(id, syncToUrl);
			queueMicrotask(() => {
				programmaticSwitchInProgress = false;
				queueMicrotask(() => {
					programmaticSwitchCounter = Math.max(0, programmaticSwitchCounter - 1);
				});
			});
		} else {
			setActiveChat(null, syncToUrl);
			clearMessages();
		}
	} finally {
		if (!syncToUrl) queueMicrotask(() => {
			isSyncingFromUrlAtom.set(false);
		});
	}
};
var generateTitleAsync = async (conversationId, firstMessage) => {
	if (titleGenerationInProgress.has(conversationId)) return;
	titleGenerationInProgress.add(conversationId);
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === conversationId);
	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			isGeneratingTitle: true
		};
		conversationsAtom.set(updated);
	}
	try {
		const title = await (await getAIManager()).generateTitle(firstMessage);
		const latestConversations = conversationsAtom.get();
		const currentIndex = latestConversations.findIndex((c) => c.id === conversationId);
		if (currentIndex !== -1) {
			const updated = [...latestConversations];
			updated[currentIndex] = {
				...updated[currentIndex],
				title,
				isGeneratingTitle: false
			};
			conversationsAtom.set(updated);
			persist();
		}
	} catch (error) {
		const currentConversations = conversationsAtom.get();
		const currentIndex = currentConversations.findIndex((c) => c.id === conversationId);
		if (currentIndex !== -1) {
			const updated = [...currentConversations];
			const fallbackTitle = firstMessage.slice(0, 30).trim() + (firstMessage.length > 30 ? "..." : "");
			updated[currentIndex] = {
				...updated[currentIndex],
				title: fallbackTitle,
				isGeneratingTitle: false
			};
			conversationsAtom.set(updated);
			persist();
		}
	} finally {
		titleGenerationInProgress.delete(conversationId);
	}
};
var triggerTitleGeneration = (conversationId, force = false, initialPrompt) => {
	const conversation = conversationsAtom.get().find((c) => c.id === conversationId);
	if (!conversation) return;
	const firstMessage = initialPrompt || conversation.messages.find((m) => m.role === "user")?.content || "";
	if (!firstMessage) return;
	if ((force || !conversation.title || conversation.title === "New Chat") && !titleGenerationInProgress.has(conversationId)) generateTitleAsync(conversationId, firstMessage);
};
var deleteConversation = async (id) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);
	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			status: "deleted",
			deletedAt: Date.now()
		};
		conversationsAtom.set(updated);
		persist();
	}
	if (activeChatIdAtom.get() === id) {
		const activeConversations = conversationsAtom.get().filter((c) => c.status === "active");
		if (activeConversations.length > 0) await switchConversation(activeConversations[0].id);
		else {
			setActiveChat(null);
			clearMessages();
		}
	}
};
var archiveConversation = async (id) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);
	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			status: "archived"
		};
		conversationsAtom.set(updated);
		persist();
	}
	if (activeChatIdAtom.get() === id) {
		const activeConversations = conversationsAtom.get().filter((c) => c.status === "active");
		if (activeConversations.length > 0) await switchConversation(activeConversations[0].id);
		else {
			setActiveChat(null);
			clearMessages();
		}
	}
};
var unarchiveConversation = async (id) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);
	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			status: "active",
			updatedAt: Date.now()
		};
		conversationsAtom.set(updated);
		persist();
		await switchConversation(id);
	}
};
var restoreConversation = async (id) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);
	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			status: "active",
			deletedAt: void 0,
			updatedAt: Date.now()
		};
		conversationsAtom.set(updated);
		persist();
		await switchConversation(id);
	}
};
var permanentlyDeleteConversation = async (id) => {
	const conversations = conversationsAtom.get().filter((c) => c.id !== id);
	conversationsAtom.set(conversations);
	try {
		await deleteConversationImages(id);
	} catch (error) {}
	if (activeChatIdAtom.get() === id) {
		const activeConversations = conversations.filter((c) => c.status === "active");
		if (activeConversations.length > 0) switchConversation(activeConversations[0].id);
		else {
			setActiveChat(null);
			clearMessages();
		}
	}
	persist();
};
var cleanupDeletedConversations = async () => {
	const conversations = conversationsAtom.get();
	const deletedConversations = conversations.filter((c) => c.status === "deleted");
	const deletedCount = deletedConversations.length;
	if (deletedCount > 0) {
		for (const conv of deletedConversations) try {
			await deleteConversationImages(conv.id);
		} catch (error) {}
		const remaining = conversations.filter((c) => c.status !== "deleted");
		conversationsAtom.set(remaining);
		persist();
	}
	return deletedCount;
};
var updateConversationTitle = (id, title) => {
	const conversations = conversationsAtom.get();
	const index = conversations.findIndex((c) => c.id === id);
	if (index !== -1) {
		const updated = [...conversations];
		updated[index] = {
			...updated[index],
			title
		};
		conversationsAtom.set(updated);
		persist();
	}
};
var exportConversations = () => {
	const cleanedConversations = conversationsAtom.get().filter((c) => c.status !== "deleted").map((c) => ({
		id: c.id,
		title: c.title,
		createdAt: c.createdAt,
		updatedAt: c.updatedAt,
		messages: c.messages,
		status: c.status
	}));
	const exportData = {
		version: 1,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		conversations: cleanedConversations
	};
	const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `chat-history-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};
var importConversations = async (file, mode = "merge") => {
	try {
		const text = await file.text();
		const data = JSON.parse(text);
		if (!data.conversations || !Array.isArray(data.conversations)) return {
			success: false,
			imported: 0,
			error: "Invalid file format"
		};
		const validConversations = [];
		for (const conv of data.conversations) if (typeof conv.id === "string" && typeof conv.title === "string" && typeof conv.createdAt === "number" && typeof conv.updatedAt === "number" && Array.isArray(conv.messages)) {
			const status = conv.status === "active" || conv.status === "archived" || conv.status === "deleted" ? conv.status : "active";
			validConversations.push({
				id: conv.id,
				title: conv.title,
				createdAt: conv.createdAt,
				updatedAt: conv.updatedAt,
				messages: conv.messages,
				status
			});
		}
		if (validConversations.length === 0) return {
			success: false,
			imported: 0,
			error: "No valid conversations found"
		};
		if (mode === "replace") {
			conversationsAtom.set(validConversations);
			setActiveChat(null);
			clearMessages();
		} else {
			const existing = conversationsAtom.get();
			const existingIds = new Set(existing.map((c) => c.id));
			const newConversations = validConversations.filter((c) => !existingIds.has(c.id));
			conversationsAtom.set([...newConversations, ...existing]);
		}
		persist();
		return {
			success: true,
			imported: validConversations.length
		};
	} catch (error) {
		return {
			success: false,
			imported: 0,
			error: error instanceof Error ? error.message : "Failed to parse file"
		};
	}
};
var clearAllConversations = async () => {
	conversationsAtom.set([]);
	setActiveChat(null);
	clearMessages();
	persist();
	try {
		await clearAllImages();
	} catch (error) {}
};
var hydrateConversations = () => {
	if (!isBrowser) return;
	initializeConversations();
};
export { updateConversationTitle as S, saveCurrentConversation as _, clearAllConversations as a, triggerTitleGeneration as b, deleteConversation as c, importConversations as d, isConversationsHydratedAtom as f, runAutoArchive as g, restoreConversation as h, cleanupDeletedConversations as i, exportConversations as l, permanentlyDeleteConversation as m, activeChatIdAtom as n, conversationsAtom as o, isSyncingFromUrlAtom as p, archiveConversation as r, createConversation as s, TriangleAlert as t, hydrateConversations as u, setActiveChat as v, unarchiveConversation as x, switchConversation as y };
