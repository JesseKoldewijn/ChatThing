import { s as __toESM } from "../_rolldown.mjs";
import { l as require_react_dom, u as require_react } from "../_libs/@floating-ui/react-dom.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router.mjs";
import { n as atom, t as computed } from "../_libs/nanostores.mjs";
import { J as object, Z as string, j as tool } from "../_libs/@ai-sdk/gateway.mjs";
import { n as streamText, t as generateText } from "../_libs/ai.mjs";
import { t as createOpenRouter } from "../_libs/@openrouter/ai-sdk-provider.mjs";
import { t as createGoogleGenerativeAI } from "../_libs/@ai-sdk/google.mjs";
import { t as createOllama } from "../_libs/ai-sdk-ollama.mjs";
import { t as require_dist } from "../_libs/@built-in-ai/core.mjs";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_dist = require_dist();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
var ALGORITHM = "AES-GCM";
var KEY_LENGTH = 256;
var SALT_LENGTH = 16;
var IV_LENGTH = 12;
var PBKDF2_ITERATIONS = 1e5;
async function deriveKey(password, salt) {
	const encoder = new TextEncoder();
	const baseKey = await window.crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
	return window.crypto.subtle.deriveKey({
		name: "PBKDF2",
		salt: salt.slice(),
		iterations: PBKDF2_ITERATIONS,
		hash: "SHA-256"
	}, baseKey, {
		name: ALGORITHM,
		length: KEY_LENGTH
	}, false, ["encrypt", "decrypt"]);
}
async function encrypt(text, password) {
	const encoder = new TextEncoder();
	const salt = window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
	const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
	const key = await deriveKey(password, salt);
	const encrypted = await window.crypto.subtle.encrypt({
		name: ALGORITHM,
		iv
	}, key, encoder.encode(text));
	const combined = new Uint8Array(SALT_LENGTH + IV_LENGTH + encrypted.byteLength);
	combined.set(salt, 0);
	combined.set(iv, SALT_LENGTH);
	combined.set(new Uint8Array(encrypted), SALT_LENGTH + IV_LENGTH);
	return btoa(String.fromCharCode(...combined));
}
async function decrypt(encryptedBase64, password) {
	const decoder = new TextDecoder();
	const combined = new Uint8Array(atob(encryptedBase64).split("").map((c) => c.charCodeAt(0)));
	const salt = combined.slice(0, SALT_LENGTH);
	const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
	const data = combined.slice(SALT_LENGTH + IV_LENGTH);
	const key = await deriveKey(password, salt);
	try {
		const decrypted = await window.crypto.subtle.decrypt({
			name: ALGORITHM,
			iv
		}, key, data);
		return decoder.decode(decrypted);
	} catch {
		throw new Error("Failed to decrypt. Incorrect password?");
	}
}
var PROVIDER_OPEN_ROUTER = "open-router";
var PROVIDER_GOOGLE = "google";
var PROVIDER_OLLAMA = "ollama";
var PROVIDER_PROMPT_API = "prompt-api";
var SUPPORTED_PROVIDERS = [
	{
		id: PROVIDER_OPEN_ROUTER,
		label: "OpenRouter",
		description: "Cloud-based models"
	},
	{
		id: PROVIDER_GOOGLE,
		label: "Google",
		description: "Gemini models"
	},
	{
		id: PROVIDER_OLLAMA,
		label: "Ollama",
		description: "Local LLM (Ollama)"
	},
	{
		id: PROVIDER_PROMPT_API,
		label: "Prompt API",
		description: "Built-in browser AI"
	}
];
var AIManager = class {
	provider;
	constructor(provider) {
		this.provider = provider;
	}
	async prompt(prompt, options) {
		return this.provider.prompt(prompt, options);
	}
	async generateTitle(firstMessage) {
		return this.provider.generateTitle(firstMessage);
	}
	get providerType() {
		return this.provider.type;
	}
};
var DB_NAME = "ai-chat-images";
var DB_VERSION = 1;
var STORE_NAME = "images";
var db = null;
var initImageStorage = () => {
	return new Promise((resolve, reject) => {
		if (db) {
			resolve(db);
			return;
		}
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onerror = () => {
			reject(request.error);
		};
		request.onsuccess = () => {
			db = request.result;
			resolve(db);
		};
		request.onupgradeneeded = (event) => {
			const database = event.target.result;
			if (!database.objectStoreNames.contains(STORE_NAME)) database.createObjectStore(STORE_NAME, { keyPath: "id" }).createIndex("conversationId", "conversationId", { unique: false });
		};
	});
};
var saveImage = async (id, conversationId, data, mimeType, name) => {
	const database = await initImageStorage();
	return new Promise((resolve, reject) => {
		const store = database.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME);
		const record = {
			id,
			conversationId,
			data,
			mimeType,
			name,
			createdAt: Date.now()
		};
		const request = store.put(record);
		request.onsuccess = () => resolve();
		request.onerror = () => {
			reject(request.error);
		};
	});
};
var getImages = async (ids) => {
	const database = await initImageStorage();
	const results = /* @__PURE__ */ new Map();
	return new Promise((resolve) => {
		const store = database.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME);
		let completed = 0;
		if (ids.length === 0) {
			resolve(results);
			return;
		}
		for (const id of ids) {
			const request = store.get(id);
			request.onsuccess = () => {
				if (request.result) results.set(id, request.result);
				completed++;
				if (completed === ids.length) resolve(results);
			};
			request.onerror = () => {
				completed++;
				if (completed === ids.length) resolve(results);
			};
		}
	});
};
var deleteConversationImages = async (conversationId) => {
	const database = await initImageStorage();
	return new Promise((resolve, reject) => {
		const request = database.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).index("conversationId").openCursor(IDBKeyRange.only(conversationId));
		let deletedCount = 0;
		request.onsuccess = (event) => {
			const cursor = event.target.result;
			if (cursor) {
				cursor.delete();
				deletedCount++;
				cursor.continue();
			} else resolve(deletedCount);
		};
		request.onerror = () => {
			reject(request.error);
		};
	});
};
var clearAllImages = async () => {
	const database = await initImageStorage();
	return new Promise((resolve, reject) => {
		const request = database.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME).clear();
		request.onsuccess = () => resolve();
		request.onerror = () => {
			reject(request.error);
		};
	});
};
var messagesAtom = /* @__PURE__ */ atom([]);
var currentStreamAtom = /* @__PURE__ */ atom("");
var isStreamingAtom = /* @__PURE__ */ atom(false);
var pendingImagesAtom = /* @__PURE__ */ atom([]);
var lastUserMessageAtom = /* @__PURE__ */ computed(messagesAtom, (messages) => {
	const userMessages = messages.filter((m) => m.role === "user");
	return userMessages[userMessages.length - 1] ?? null;
});
var addMessage = (role, content, options) => {
	const currentMessages = messagesAtom.get();
	const transactionId = options?.transactionId ?? crypto.randomUUID();
	if (role === "assistant" && options?.transactionId) {
		const index = currentMessages.findIndex((m) => m.transactionId === options.transactionId && m.role === role);
		if (index !== -1) {
			const updatedMessages = [...currentMessages];
			updatedMessages[index] = {
				...updatedMessages[index],
				content,
				images: options.images
			};
			messagesAtom.set(updatedMessages);
			return updatedMessages[index];
		}
	}
	if (role === "system" && options?.transactionId) {
		const index = currentMessages.findIndex((m) => m.transactionId === options.transactionId && m.role === role && m.content === content);
		if (index !== -1) return currentMessages[index];
	}
	const message = {
		id: crypto.randomUUID(),
		transactionId,
		role,
		content,
		images: options?.images && options.images.length > 0 ? options.images : void 0,
		timestamp: Date.now()
	};
	messagesAtom.set([...currentMessages, message]);
	return message;
};
var removeMessagesFromTransaction = (transactionId) => {
	const messages = messagesAtom.get();
	messagesAtom.set(messages.filter((m) => !(m.transactionId === transactionId && (m.role === "assistant" || m.role === "system"))));
};
var clearMessages = () => {
	messagesAtom.set([]);
	currentStreamAtom.set("");
	isStreamingAtom.set(false);
	pendingImagesAtom.set([]);
};
var appendToStream = (chunk) => {
	currentStreamAtom.set(currentStreamAtom.get() + chunk);
};
var clearStream = () => {
	currentStreamAtom.set("");
};
var addPendingImage = (image) => {
	pendingImagesAtom.set([...pendingImagesAtom.get(), image]);
};
var removePendingImage = (id) => {
	pendingImagesAtom.set(pendingImagesAtom.get().filter((img) => img.id !== id));
};
var clearPendingImages = () => {
	pendingImagesAtom.set([]);
};
var saveImagesToIndexedDB = async (images, conversationId) => {
	const savedImages = [];
	for (const image of images) try {
		await saveImage(image.id, conversationId, image.data, image.mimeType, image.name);
		savedImages.push({
			id: image.id,
			data: "",
			mimeType: image.mimeType,
			name: image.name,
			storedInDb: true
		});
	} catch (error) {
		savedImages.push(image);
	}
	return savedImages;
};
var compressImage = (dataUrl, maxSize = 800, quality = .7) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			let { width, height } = img;
			if (width > height && width > maxSize) {
				height = height * maxSize / width;
				width = maxSize;
			} else if (height > maxSize) {
				width = width * maxSize / height;
				height = maxSize;
			}
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(/* @__PURE__ */ new Error("Failed to get canvas context"));
				return;
			}
			ctx.drawImage(img, 0, 0, width, height);
			resolve(canvas.toDataURL("image/jpeg", quality));
		};
		img.onerror = () => reject(/* @__PURE__ */ new Error("Failed to load image for compression"));
		img.src = dataUrl;
	});
};
var fileToImageAttachment = async (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = async () => {
			const originalDataUrl = reader.result;
			try {
				const isGif = file.type === "image/gif";
				const dataUrl = isGif ? originalDataUrl : await compressImage(originalDataUrl);
				resolve({
					id: crypto.randomUUID(),
					data: dataUrl,
					mimeType: isGif ? file.type : "image/jpeg",
					name: file.name
				});
			} catch (compressError) {
				resolve({
					id: crypto.randomUUID(),
					data: originalDataUrl,
					mimeType: file.type,
					name: file.name
				});
			}
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};
var WEATHER_DESCRIPTIONS = {
	0: "Clear sky",
	1: "Mainly clear",
	2: "Partly cloudy",
	3: "Overcast",
	45: "Foggy",
	48: "Depositing rime fog",
	51: "Light drizzle",
	53: "Moderate drizzle",
	55: "Dense drizzle",
	61: "Slight rain",
	63: "Moderate rain",
	65: "Heavy rain",
	66: "Light freezing rain",
	67: "Heavy freezing rain",
	71: "Slight snow",
	73: "Moderate snow",
	75: "Heavy snow",
	77: "Snow grains",
	80: "Slight rain showers",
	81: "Moderate rain showers",
	82: "Violent rain showers",
	85: "Slight snow showers",
	86: "Heavy snow showers",
	95: "Thunderstorm",
	96: "Thunderstorm with slight hail",
	99: "Thunderstorm with heavy hail"
};
function getCityFromTimezone(timezone) {
	const parts = timezone.split("/");
	return parts[parts.length - 1].replace(/_/g, " ");
}
async function geocodeLocation(location) {
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`;
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Geocoding failed: ${response.statusText}`);
	const data = await response.json();
	if (!data.results || data.results.length === 0) return null;
	const result = data.results[0];
	return {
		name: result.name,
		country: result.country,
		state: result.admin1,
		latitude: result.latitude,
		longitude: result.longitude
	};
}
async function fetchWeather(latitude, longitude) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`;
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Weather API failed: ${response.statusText}`);
	const current = (await response.json()).current;
	return {
		temperature: Math.round(current.temperature_2m),
		feelsLike: Math.round(current.apparent_temperature),
		humidity: current.relative_humidity_2m,
		windSpeed: Math.round(current.wind_speed_10m),
		condition: WEATHER_DESCRIPTIONS[current.weather_code] ?? "Unknown"
	};
}
var weatherTool = tool({
	description: "Get the current weather in a location. Use ONLY if the user EXPLICITLY asks about weather, forecast, or temperature. NEVER use this for general conversation.",
	inputSchema: object({ location: string().optional().describe("The city or location to get the weather for. If not provided, uses the user's timezone location.") }),
	execute: async ({ location: providedLocation }) => {
		const location = providedLocation || getCityFromTimezone(getResolvedTimezone());
		try {
			const geo = await geocodeLocation(location);
			if (!geo) return {
				error: `Could not find location: ${location}`,
				location
			};
			const weather = await fetchWeather(geo.latitude, geo.longitude);
			return {
				location: geo.state ? `${geo.name}, ${geo.state}, ${geo.country}` : `${geo.name}, ${geo.country}`,
				temperature: weather.temperature,
				feelsLike: weather.feelsLike,
				humidity: weather.humidity,
				windSpeed: weather.windSpeed,
				condition: weather.condition
			};
		} catch (error) {
			return {
				error: error instanceof Error ? error.message : "Failed to fetch weather",
				location
			};
		}
	}
});
var datetimeTool = tool({
	description: "Get the current date and time. Use ONLY if the user EXPLICITLY asks for the current time or date (e.g., 'What time is it?', 'What is today's date?'). NEVER use this for greetings, introductions, or general conversation.",
	inputSchema: object({ timezone: string().optional().describe("Optional timezone (e.g., 'America/New_York', 'Europe/London'). Defaults to user's local timezone.") }),
	execute: async ({ timezone }) => {
		const now = /* @__PURE__ */ new Date();
		const dateOptions = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: timezone
		};
		const timeOptions = {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: true,
			timeZone: timezone
		};
		try {
			return {
				date: now.toLocaleDateString("en-US", dateOptions),
				time: now.toLocaleTimeString("en-US", timeOptions),
				timezone: timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
				iso: now.toISOString(),
				timestamp: now.getTime()
			};
		} catch {
			return {
				date: now.toLocaleDateString("en-US", {
					...dateOptions,
					timeZone: void 0
				}),
				time: now.toLocaleTimeString("en-US", {
					...timeOptions,
					timeZone: void 0
				}),
				timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				iso: now.toISOString(),
				timestamp: now.getTime()
			};
		}
	}
});
var stripDataUrlPrefix$2 = (data) => {
	if (data.startsWith("data:")) {
		const base64Index = data.indexOf(";base64,");
		if (base64Index !== -1) return data.slice(base64Index + 8);
	}
	return data;
};
var convertHistoryToMessages$3 = (history) => {
	if (!history || history.length === 0) return [];
	return history.filter((msg) => msg.role !== "system").map((msg) => {
		if (msg.role === "user") {
			if (msg.images && msg.images.length > 0) return {
				role: "user",
				content: [{
					type: "text",
					text: msg.content
				}, ...msg.images.map((img) => ({
					type: "image",
					image: stripDataUrlPrefix$2(img.data)
				}))]
			};
			return {
				role: "user",
				content: msg.content
			};
		}
		return {
			role: "assistant",
			content: msg.content
		};
	});
};
var OpenRouterProvider = class {
	type = PROVIDER_OPEN_ROUTER;
	client;
	settings;
	constructor(settings) {
		this.settings = settings;
		this.client = createOpenRouter({ apiKey: settings.apiKey });
	}
	get model() {
		return this.client.chat(this.settings.model || "mistralai/devstral-2512:free");
	}
	async prompt(prompt, options) {
		const messages = [...convertHistoryToMessages$3(options?.history), {
			role: "user",
			content: options?.images && options.images.length > 0 ? [{
				type: "text",
				text: prompt
			}, ...options.images.map((img) => ({
				type: "image",
				image: stripDataUrlPrefix$2(img.data)
			}))] : prompt
		}];
		const result = streamText({
			model: this.model,
			messages,
			tools: {
				weather: weatherTool,
				datetime: datetimeTool
			},
			maxSteps: 5,
			system: `You are a helpful AI assistant. 
Current Date and Time: ${(/* @__PURE__ */ new Date()).toLocaleString()}

CRITICAL TOOL RULES:
1. Use tools ONLY when specifically requested or absolutely necessary to answer a factual question.
2. datetime tool: ONLY use if the user explicitly asks for the current time or date. DO NOT use it for greetings, general conversation, or to "timestamp" your own responses.
3. weather tool: ONLY use if the user explicitly asks about weather or temperature.
4. If you need to know about the conversation history, refer to the messages provided in the context; do NOT attempt to use tools to fetch previous messages. 
5. Do NOT hallucinate tools that are not provided in the toolset.
6. If no tool is strictly required to answer the user, respond naturally without using any tools.`
		});
		return (async function* () {
			try {
				for await (const part of result.fullStream) switch (part.type) {
					case "text-delta":
						yield {
							type: "text",
							content: part.text
						};
						break;
					case "tool-call":
						yield {
							type: "tool-call",
							toolName: part.toolName,
							toolCallId: part.toolCallId,
							args: "args" in part ? part.args : "input" in part ? part.input : {}
						};
						break;
					case "error":
						yield {
							type: "error",
							error: part.error
						};
						break;
				}
			} catch (error) {
				yield {
					type: "error",
					error
				};
			}
		})();
	}
	async generateTitle(firstMessage) {
		const MAX_TITLE_LENGTH = 30;
		try {
			const { text } = await generateText({
				model: this.model,
				messages: [{
					role: "user",
					content: `Generate a very short title (maximum 4-5 words, under 30 characters) for a conversation that starts with this message. Return ONLY the title, no quotes, no explanation, no punctuation at the end.

Message: "${firstMessage.slice(0, 200)}"

Title:`
				}]
			});
			let title = text.trim().replace(/^["']|["']$/g, "").replace(/[.!?]+$/, "").trim();
			if (title.length > MAX_TITLE_LENGTH) {
				const truncated = title.slice(0, MAX_TITLE_LENGTH);
				const lastSpace = truncated.lastIndexOf(" ");
				title = lastSpace > MAX_TITLE_LENGTH * .6 ? truncated.slice(0, lastSpace) : truncated.trim() + "...";
			}
			return title || this.fallbackTitle(firstMessage);
		} catch {
			return this.fallbackTitle(firstMessage);
		}
	}
	fallbackTitle(message) {
		const MAX_LENGTH = 30;
		const cleaned = message.trim();
		if (cleaned.length <= MAX_LENGTH) return cleaned;
		const truncated = cleaned.slice(0, MAX_LENGTH);
		const lastSpace = truncated.lastIndexOf(" ");
		return lastSpace > MAX_LENGTH * .5 ? truncated.slice(0, lastSpace) + "..." : truncated.trim() + "...";
	}
};
var stripDataUrlPrefix$1 = (data) => {
	if (data.startsWith("data:")) {
		const base64Index = data.indexOf(";base64,");
		if (base64Index !== -1) return data.slice(base64Index + 8);
	}
	return data;
};
var convertHistoryToMessages$2 = (history) => {
	if (!history || history.length === 0) return [];
	return history.filter((msg) => msg.role !== "system").map((msg) => {
		if (msg.role === "user") {
			if (msg.images && msg.images.length > 0) return {
				role: "user",
				content: [{
					type: "text",
					text: msg.content
				}, ...msg.images.map((img) => ({
					type: "image",
					image: stripDataUrlPrefix$1(img.data)
				}))]
			};
			return {
				role: "user",
				content: msg.content
			};
		}
		return {
			role: "assistant",
			content: msg.content
		};
	});
};
var GoogleProvider = class {
	type = PROVIDER_GOOGLE;
	client;
	settings;
	constructor(settings) {
		this.settings = settings;
		this.client = createGoogleGenerativeAI({ apiKey: settings.apiKey });
	}
	get model() {
		return this.client(this.settings.model || "gemini-2.0-flash-exp");
	}
	async prompt(prompt, options) {
		const messages = [...convertHistoryToMessages$2(options?.history), {
			role: "user",
			content: options?.images && options.images.length > 0 ? [{
				type: "text",
				text: prompt
			}, ...options.images.map((img) => ({
				type: "image",
				image: stripDataUrlPrefix$1(img.data)
			}))] : prompt
		}];
		const result = streamText({
			model: this.model,
			messages,
			tools: {
				weather: weatherTool,
				datetime: datetimeTool
			},
			maxSteps: 5,
			system: `You are a helpful AI assistant. 
Current Date and Time: ${(/* @__PURE__ */ new Date()).toLocaleString()}

CRITICAL TOOL RULES:
1. Use tools ONLY when specifically requested or absolutely necessary to answer a factual question.
2. datetime tool: ONLY use if the user explicitly asks for the current time or date. DO NOT use it for greetings, general conversation, or to "timestamp" your own responses.
3. weather tool: ONLY use if the user explicitly asks about weather or temperature.
4. If you need to know about the conversation history, refer to the messages provided in the context; do NOT attempt to use tools to fetch previous messages. 
5. Do NOT hallucinate tools that are not provided in the toolset.
6. If no tool is strictly required to answer the user, respond naturally without any tools.`
		});
		return (async function* () {
			try {
				for await (const part of result.fullStream) switch (part.type) {
					case "text-delta":
						yield {
							type: "text",
							content: part.text
						};
						break;
					case "tool-call":
						yield {
							type: "tool-call",
							toolName: part.toolName,
							toolCallId: part.toolCallId,
							args: "args" in part ? part.args : "input" in part ? part.input : {}
						};
						break;
					case "error":
						yield {
							type: "error",
							error: part.error
						};
						break;
				}
			} catch (error) {
				yield {
					type: "error",
					error
				};
			}
		})();
	}
	async generateTitle(firstMessage) {
		const MAX_TITLE_LENGTH = 30;
		try {
			const { text } = await generateText({
				model: this.model,
				messages: [{
					role: "user",
					content: `Generate a very short title (maximum 4-5 words, under 30 characters) for a conversation that starts with this message. Return ONLY the title, no quotes, no explanation, no punctuation at the end.

Message: "${firstMessage.slice(0, 200)}"

Title:`
				}]
			});
			let title = text.trim().replace(/^["']|["']$/g, "").replace(/[.!?]+$/, "").trim();
			if (title.length > MAX_TITLE_LENGTH) {
				const truncated = title.slice(0, MAX_TITLE_LENGTH);
				const lastSpace = truncated.lastIndexOf(" ");
				title = lastSpace > MAX_TITLE_LENGTH * .6 ? truncated.slice(0, lastSpace) : truncated.trim() + "...";
			}
			return title || this.fallbackTitle(firstMessage);
		} catch {
			return this.fallbackTitle(firstMessage);
		}
	}
	fallbackTitle(message) {
		const MAX_LENGTH = 30;
		const cleaned = message.trim();
		if (cleaned.length <= MAX_LENGTH) return cleaned;
		const truncated = cleaned.slice(0, MAX_LENGTH);
		const lastSpace = truncated.lastIndexOf(" ");
		return lastSpace > MAX_LENGTH * .5 ? truncated.slice(0, lastSpace) + "..." : truncated.trim() + "...";
	}
};
var stripDataUrlPrefix = (data) => {
	if (data.startsWith("data:")) {
		const base64Index = data.indexOf(";base64,");
		if (base64Index !== -1) return data.slice(base64Index + 8);
	}
	return data;
};
var convertHistoryToMessages$1 = (history) => {
	if (!history || history.length === 0) return [];
	return history.filter((msg) => msg.role !== "system").map((msg) => {
		if (msg.role === "user") {
			if (msg.images && msg.images.length > 0) return {
				role: "user",
				content: [{
					type: "text",
					text: msg.content
				}, ...msg.images.map((img) => ({
					type: "image",
					image: stripDataUrlPrefix(img.data)
				}))]
			};
			return {
				role: "user",
				content: msg.content
			};
		}
		return {
			role: "assistant",
			content: msg.content
		};
	});
};
var OllamaProvider = class {
	type = PROVIDER_OLLAMA;
	client;
	settings;
	constructor(settings) {
		this.settings = settings;
		this.client = createOllama({
			baseURL: settings.baseUrl.replace(/\/api\/?$/, "").replace(/\/$/, ""),
			apiKey: settings.apiKey
		});
	}
	get model() {
		const model = this.client(this.settings.model);
		if (!model.specificationVersion || model.specificationVersion === "v1") model.specificationVersion = "v3";
		return model;
	}
	async prompt(prompt, options) {
		const messages = [
			{
				role: "system",
				content: `You are a helpful AI assistant. 
Current Date and Time: ${(/* @__PURE__ */ new Date()).toLocaleString()}

CRITICAL RULES:
1. Respond naturally to the user.
2. If you need to know about the conversation history, refer to the messages provided in the context.`
			},
			...convertHistoryToMessages$1(options?.history),
			{
				role: "user",
				content: options?.images && options.images.length > 0 ? [{
					type: "text",
					text: prompt
				}, ...options.images.map((img) => ({
					type: "image",
					image: stripDataUrlPrefix(img.data)
				}))] : prompt
			}
		];
		const textStream = streamText({
			model: this.model,
			messages
		}).textStream;
		return (async function* () {
			try {
				for await (const chunk of textStream) yield {
					type: "text",
					content: chunk
				};
			} catch (error) {
				yield {
					type: "error",
					error
				};
			}
		})();
	}
	async generateTitle(firstMessage) {
		const MAX_TITLE_LENGTH = 30;
		try {
			const { text } = await generateText({
				model: this.model,
				messages: [{
					role: "user",
					content: `Generate a very short title (maximum 4-5 words, under 30 characters) for a conversation that starts with this message. Return ONLY the title, no quotes, no explanation, no punctuation at the end.

Message: "${firstMessage.slice(0, 200)}"

Title:`
				}]
			});
			let title = text.trim().replace(/^["']|["']$/g, "").replace(/[.!?]+$/, "").trim();
			if (title.length > MAX_TITLE_LENGTH) {
				const truncated = title.slice(0, MAX_TITLE_LENGTH);
				const lastSpace = truncated.lastIndexOf(" ");
				title = lastSpace > MAX_TITLE_LENGTH * .6 ? truncated.slice(0, lastSpace) : truncated.trim() + "...";
			}
			return title || this.fallbackTitle(firstMessage);
		} catch {
			return this.fallbackTitle(firstMessage);
		}
	}
	fallbackTitle(message) {
		const MAX_LENGTH = 30;
		const cleaned = message.trim();
		if (cleaned.length <= MAX_LENGTH) return cleaned;
		const truncated = cleaned.slice(0, MAX_LENGTH);
		const lastSpace = truncated.lastIndexOf(" ");
		return lastSpace > MAX_LENGTH * .5 ? truncated.slice(0, lastSpace) + "..." : truncated.trim() + "...";
	}
};
var convertHistoryToMessages = (history) => {
	if (!history || history.length === 0) return [];
	return history.filter((msg) => msg.role !== "system").map((msg) => {
		if (msg.role === "user") return {
			role: "user",
			content: msg.content
		};
		return {
			role: "assistant",
			content: msg.content
		};
	});
};
var PromptApiProvider = class {
	type = PROVIDER_PROMPT_API;
	model = (0, import_dist.builtInAI)("text");
	async prompt(prompt, options) {
		const messages = [
			{
				role: "system",
				content: `You are a helpful AI assistant running locally in the browser. 
Current Date and Time: ${(/* @__PURE__ */ new Date()).toLocaleString()}

CRITICAL RULES:
1. Respond naturally to the user.
2. If you need to know about the conversation history, refer to the messages provided in the context.`
			},
			...convertHistoryToMessages(options?.history),
			{
				role: "user",
				content: prompt
			}
		];
		const result = streamText({
			model: this.model,
			messages
		});
		return (async function* () {
			try {
				for await (const part of result.fullStream) switch (part.type) {
					case "text-delta":
						yield {
							type: "text",
							content: part.text
						};
						break;
					case "error":
						yield {
							type: "error",
							error: part.error
						};
						break;
				}
			} catch (error) {
				yield {
					type: "error",
					error
				};
			}
		})();
	}
	async generateTitle(firstMessage) {
		const MAX_TITLE_LENGTH = 30;
		try {
			const { text } = await generateText({
				model: this.model,
				messages: [{
					role: "user",
					content: `Generate a very short title (maximum 4-5 words, under 30 characters) for a conversation that starts with this message. Return ONLY the title, no quotes, no explanation, no punctuation at the end.

Message: "${firstMessage.slice(0, 200)}"

Title:`
				}]
			});
			let title = text.trim().replace(/^["']|["']$/g, "").replace(/[.!?]+$/, "").trim();
			if (title.length > MAX_TITLE_LENGTH) {
				const truncated = title.slice(0, MAX_TITLE_LENGTH);
				const lastSpace = truncated.lastIndexOf(" ");
				title = lastSpace > MAX_TITLE_LENGTH * .6 ? truncated.slice(0, lastSpace) : truncated.trim() + "...";
			}
			return title || this.fallbackTitle(firstMessage);
		} catch {
			return this.fallbackTitle(firstMessage);
		}
	}
	fallbackTitle(message) {
		const MAX_LENGTH = 30;
		const cleaned = message.trim();
		if (cleaned.length <= MAX_LENGTH) return cleaned;
		const truncated = cleaned.slice(0, MAX_LENGTH);
		const lastSpace = truncated.lastIndexOf(" ");
		return lastSpace > MAX_LENGTH * .5 ? truncated.slice(0, lastSpace) + "..." : truncated.trim() + "...";
	}
};
var cachedManager = null;
var cachedManagerConfig = null;
var getAIManager = async () => {
	const type = providerTypeAtom.get();
	const model = type === "open-router" ? openRouterModelAtom.get() : type === "google" ? googleModelAtom.get() : type === "ollama" ? ollamaModelAtom.get() : "prompt-api";
	const baseUrl = type === "ollama" ? ollamaBaseUrlAtom.get() : "";
	const currentConfig = JSON.stringify({
		type,
		model,
		baseUrl
	});
	if (cachedManager && cachedManagerConfig === currentConfig) return cachedManager;
	let manager;
	if (type === "prompt-api") manager = new AIManager(new PromptApiProvider());
	else if (type === "ollama") manager = new AIManager(new OllamaProvider({
		model,
		baseUrl,
		apiKey: await getDecryptedOllamaApiKey() || void 0
	}));
	else if (type === "google") {
		const apiKey = await getDecryptedGoogleApiKey();
		if (!apiKey) throw new Error("Google API key is locked or not set. Please unlock it in settings.");
		manager = new AIManager(new GoogleProvider({
			apiKey,
			model
		}));
	} else {
		const apiKey = await getDecryptedOpenRouterApiKey();
		if (!apiKey) throw new Error("OpenRouter API key is locked or not set. Please unlock it in settings.");
		manager = new AIManager(new OpenRouterProvider({
			apiKey,
			model
		}));
	}
	cachedManager = manager;
	cachedManagerConfig = currentConfig;
	return manager;
};
var clearAIManagerCache = () => {
	cachedManager = null;
	cachedManagerConfig = null;
};
var PROMPT_API_SUPPORTED_LANGUAGES = [
	"en",
	"es",
	"ja"
];
var detectBrowserLanguage = () => {
	if (typeof navigator === "undefined") return "en";
	const browserLanguages = navigator.languages ?? [navigator.language];
	for (const lang of browserLanguages) {
		const primaryCode = lang.toLowerCase().split("-")[0];
		if (PROMPT_API_SUPPORTED_LANGUAGES.includes(primaryCode)) return primaryCode;
	}
	return "en";
};
var isBrowser = typeof window !== "undefined";
var appearanceAtom = /* @__PURE__ */ atom("system");
var themeAtom = /* @__PURE__ */ atom("default");
var outputLanguageAtom = /* @__PURE__ */ atom("en");
var temperatureUnitAtom = /* @__PURE__ */ atom("auto");
var timezoneAtom = /* @__PURE__ */ atom("auto");
var getSystemTimezone = () => {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	} catch {
		return "UTC";
	}
};
var getResolvedTimezone = () => {
	const setting = timezoneAtom.get();
	if (setting === "auto") return getSystemTimezone();
	return setting;
};
var providerTypeAtom = /* @__PURE__ */ atom(PROVIDER_OLLAMA);
var masterPasswordAtom = /* @__PURE__ */ atom(null);
var encryptedOpenRouterApiKeyAtom = /* @__PURE__ */ atom(null);
var encryptedGoogleApiKeyAtom = /* @__PURE__ */ atom(null);
var encryptedOllamaApiKeyAtom = /* @__PURE__ */ atom(null);
var hasKeysAtom = /* @__PURE__ */ computed([
	encryptedOpenRouterApiKeyAtom,
	encryptedGoogleApiKeyAtom,
	encryptedOllamaApiKeyAtom
], (orKey, gKey, olKey) => !!(orKey || gKey || olKey));
var isLockedAtom = /* @__PURE__ */ computed([masterPasswordAtom, hasKeysAtom], (password, hasKeys) => {
	return hasKeys && !password;
});
var openRouterModelAtom = /* @__PURE__ */ atom("mistralai/devstral-2512:free");
var googleModelAtom = /* @__PURE__ */ atom("gemini-2.0-flash-exp");
var ollamaModelAtom = /* @__PURE__ */ atom("deepseek-r1:1.5b");
var ollamaBaseUrlAtom = /* @__PURE__ */ atom("http://localhost:11434");
var thresholdToHours = (threshold) => {
	if (threshold.value === 0) return 0;
	switch (threshold.unit) {
		case "hours": return threshold.value;
		case "days": return threshold.value * 24;
		case "weeks": return threshold.value * 24 * 7;
		case "months": return threshold.value * 24 * 30;
		default: return threshold.value * 24;
	}
};
var archiveThresholdAtom = /* @__PURE__ */ atom({
	value: 2,
	unit: "days"
});
var archiveThresholdDaysAtom = /* @__PURE__ */ atom(2);
var ARCHIVE_THRESHOLD_KEY = "archive-threshold";
var TEMPERATURE_UNIT_KEY = "temperature-unit";
var TIMEZONE_KEY = "timezone";
var OUTPUT_LANGUAGE_KEY = "output-language";
var PROVIDER_TYPE_KEY = "ai-provider-type";
var ENCRYPTED_OPENROUTER_API_KEY_KEY = "encrypted-openrouter-api-key";
var ENCRYPTED_GOOGLE_API_KEY_KEY = "encrypted-google-api-key";
var ENCRYPTED_OLLAMA_API_KEY_KEY = "encrypted-ollama-api-key";
var OPENROUTER_MODEL_KEY = "openrouter-model";
var GOOGLE_MODEL_KEY = "google-model";
var OLLAMA_MODEL_KEY = "ollama-model";
var OLLAMA_BASE_URL_KEY = "ollama-base-url";
var loadThemeFromStorage = () => {
	if (!isBrowser) return;
	const storedAppearance = localStorage.getItem("appearance");
	if (storedAppearance && [
		"light",
		"dark",
		"system"
	].includes(storedAppearance)) appearanceAtom.set(storedAppearance);
	const storedTheme = localStorage.getItem("theme");
	if (storedTheme && ["default", "vibrant"].includes(storedTheme)) themeAtom.set(storedTheme);
	else if (storedAppearance === "vibrant") {
		appearanceAtom.set("dark");
		themeAtom.set("vibrant");
		localStorage.setItem("appearance", "dark");
		localStorage.setItem("theme", "vibrant");
	}
};
var loadTemperatureUnitFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(TEMPERATURE_UNIT_KEY);
	if (stored && [
		"auto",
		"fahrenheit",
		"celsius"
	].includes(stored)) temperatureUnitAtom.set(stored);
};
var loadTimezoneFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(TIMEZONE_KEY);
	if (stored) timezoneAtom.set(stored);
};
var loadArchiveThresholdFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(ARCHIVE_THRESHOLD_KEY);
	if (stored) try {
		const parsed = JSON.parse(stored);
		if (typeof parsed.value === "number" && parsed.value >= 0 && parsed.unit) {
			archiveThresholdAtom.set(parsed);
			const hours = thresholdToHours(parsed);
			archiveThresholdDaysAtom.set(Math.ceil(hours / 24));
		}
	} catch {
		const parsed = parseInt(stored, 10);
		if (!isNaN(parsed) && parsed >= 0) {
			archiveThresholdAtom.set({
				value: parsed,
				unit: "days"
			});
			archiveThresholdDaysAtom.set(parsed);
		}
	}
};
var loadOutputLanguageFromStorage = () => {
	if (!isBrowser) return;
	const stored = localStorage.getItem(OUTPUT_LANGUAGE_KEY);
	if (stored && PROMPT_API_SUPPORTED_LANGUAGES.includes(stored)) outputLanguageAtom.set(stored);
	else {
		const detected = detectBrowserLanguage();
		outputLanguageAtom.set(detected);
	}
};
var loadAiProviderSettingsFromStorage = () => {
	if (!isBrowser) return;
	const type = localStorage.getItem(PROVIDER_TYPE_KEY);
	if (type && [
		"open-router",
		"google",
		"ollama",
		"prompt-api"
	].includes(type)) providerTypeAtom.set(type);
	const encryptedOpenRouterKey = localStorage.getItem(ENCRYPTED_OPENROUTER_API_KEY_KEY);
	if (encryptedOpenRouterKey) encryptedOpenRouterApiKeyAtom.set(encryptedOpenRouterKey);
	const encryptedGoogleKey = localStorage.getItem(ENCRYPTED_GOOGLE_API_KEY_KEY);
	if (encryptedGoogleKey) encryptedGoogleApiKeyAtom.set(encryptedGoogleKey);
	const encryptedOllamaKey = localStorage.getItem(ENCRYPTED_OLLAMA_API_KEY_KEY);
	if (encryptedOllamaKey) encryptedOllamaApiKeyAtom.set(encryptedOllamaKey);
	const openRouterModel = localStorage.getItem(OPENROUTER_MODEL_KEY);
	if (openRouterModel) openRouterModelAtom.set(openRouterModel);
	const googleModel = localStorage.getItem(GOOGLE_MODEL_KEY);
	if (googleModel) googleModelAtom.set(googleModel);
	const ollamaModel = localStorage.getItem(OLLAMA_MODEL_KEY);
	if (ollamaModel) ollamaModelAtom.set(ollamaModel);
	const ollamaBaseUrl = localStorage.getItem(OLLAMA_BASE_URL_KEY);
	if (ollamaBaseUrl) ollamaBaseUrlAtom.set(ollamaBaseUrl);
};
var setAppearance = (appearance) => {
	appearanceAtom.set(appearance);
	if (isBrowser) localStorage.setItem("appearance", appearance);
};
var setTheme = (theme) => {
	themeAtom.set(theme);
	if (isBrowser) localStorage.setItem("theme", theme);
};
var setProviderType = (type) => {
	providerTypeAtom.set(type);
	clearAIManagerCache();
	if (isBrowser) localStorage.setItem(PROVIDER_TYPE_KEY, type);
};
var setMasterPassword = (password) => {
	masterPasswordAtom.set(password);
	clearAIManagerCache();
};
var setOpenRouterApiKey = async (key, password) => {
	const currentPassword = password || masterPasswordAtom.get();
	if (!currentPassword) throw new Error("Master password required to set API key");
	const encrypted = await encrypt(key, currentPassword);
	encryptedOpenRouterApiKeyAtom.set(encrypted);
	if (isBrowser) localStorage.setItem(ENCRYPTED_OPENROUTER_API_KEY_KEY, encrypted);
};
var setGoogleApiKey = async (key, password) => {
	const currentPassword = password || masterPasswordAtom.get();
	if (!currentPassword) throw new Error("Master password required to set API key");
	const encrypted = await encrypt(key, currentPassword);
	encryptedGoogleApiKeyAtom.set(encrypted);
	if (isBrowser) localStorage.setItem(ENCRYPTED_GOOGLE_API_KEY_KEY, encrypted);
};
var setOllamaApiKey = async (key, password) => {
	const currentPassword = password || masterPasswordAtom.get();
	if (!currentPassword) throw new Error("Master password required to set API key");
	const encrypted = await encrypt(key, currentPassword);
	encryptedOllamaApiKeyAtom.set(encrypted);
	if (isBrowser) localStorage.setItem(ENCRYPTED_OLLAMA_API_KEY_KEY, encrypted);
};
var getDecryptedOpenRouterApiKey = async (password) => {
	const currentPassword = password || masterPasswordAtom.get();
	const encrypted = encryptedOpenRouterApiKeyAtom.get();
	if (!encrypted || !currentPassword) return null;
	return decrypt(encrypted, currentPassword);
};
var getDecryptedGoogleApiKey = async (password) => {
	const currentPassword = password || masterPasswordAtom.get();
	const encrypted = encryptedGoogleApiKeyAtom.get();
	if (!encrypted || !currentPassword) return null;
	return decrypt(encrypted, currentPassword);
};
var getDecryptedOllamaApiKey = async (password) => {
	const currentPassword = password || masterPasswordAtom.get();
	const encrypted = encryptedOllamaApiKeyAtom.get();
	if (!encrypted || !currentPassword) return null;
	return decrypt(encrypted, currentPassword);
};
var setOpenRouterModel = (model) => {
	openRouterModelAtom.set(model);
	clearAIManagerCache();
	if (isBrowser) localStorage.setItem(OPENROUTER_MODEL_KEY, model);
};
var setGoogleModel = (model) => {
	googleModelAtom.set(model);
	clearAIManagerCache();
	if (isBrowser) localStorage.setItem(GOOGLE_MODEL_KEY, model);
};
var setOllamaModel = (model) => {
	ollamaModelAtom.set(model);
	clearAIManagerCache();
	if (isBrowser) localStorage.setItem(OLLAMA_MODEL_KEY, model);
};
var setOllamaBaseUrl = (url) => {
	ollamaBaseUrlAtom.set(url);
	clearAIManagerCache();
	if (isBrowser) localStorage.setItem(OLLAMA_BASE_URL_KEY, url);
};
var setTemperatureUnit = (unit) => {
	temperatureUnitAtom.set(unit);
	if (isBrowser) localStorage.setItem(TEMPERATURE_UNIT_KEY, unit);
};
var setTimezone = (timezone) => {
	timezoneAtom.set(timezone);
	if (isBrowser) localStorage.setItem(TIMEZONE_KEY, timezone);
};
var setArchiveThreshold = (threshold) => {
	const validThreshold = {
		value: Math.max(0, Math.floor(threshold.value)),
		unit: threshold.unit
	};
	archiveThresholdAtom.set(validThreshold);
	if (isBrowser) localStorage.setItem(ARCHIVE_THRESHOLD_KEY, JSON.stringify(validThreshold));
	const hours = thresholdToHours(validThreshold);
	archiveThresholdDaysAtom.set(Math.ceil(hours / 24));
};
var resetSecuritySettings = () => {
	masterPasswordAtom.set(null);
	encryptedOpenRouterApiKeyAtom.set(null);
	encryptedGoogleApiKeyAtom.set(null);
	encryptedOllamaApiKeyAtom.set(null);
	if (isBrowser) {
		localStorage.removeItem(ENCRYPTED_OPENROUTER_API_KEY_KEY);
		localStorage.removeItem(ENCRYPTED_GOOGLE_API_KEY_KEY);
		localStorage.removeItem(ENCRYPTED_OLLAMA_API_KEY_KEY);
	}
};
var hydrateSettings = () => {
	if (!isBrowser) return;
	loadThemeFromStorage();
	loadOutputLanguageFromStorage();
	loadTemperatureUnitFromStorage();
	loadTimezoneFromStorage();
	loadArchiveThresholdFromStorage();
	loadAiProviderSettingsFromStorage();
};
var notificationsAtom = /* @__PURE__ */ atom([]);
var addNotification = (type, message, duration = 3e3) => {
	const id = crypto.randomUUID();
	const notification = {
		id,
		type,
		message,
		duration
	};
	notificationsAtom.set([...notificationsAtom.get(), notification]);
	if (duration > 0) setTimeout(() => {
		removeNotification(id);
	}, duration);
	return id;
};
var removeNotification = (id) => {
	notificationsAtom.set(notificationsAtom.get().filter((n) => n.id !== id));
};
var showSuccess = (message, duration) => addNotification("success", message, duration);
var showError = (message, duration) => addNotification("error", message, duration);
var showInfo = (message, duration) => addNotification("info", message, duration);
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
var concatArrays = (array1, array2) => {
	const combinedArray = new Array(array1.length + array2.length);
	for (let i = 0; i < array1.length; i++) combinedArray[i] = array1[i];
	for (let i = 0; i < array2.length; i++) combinedArray[array1.length + i] = array2[i];
	return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
	classGroupId,
	validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
	nextPart,
	validators,
	classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		if (className.startsWith("[") && className.endsWith("]")) return getGroupIdForArbitraryProperty(className);
		const classParts = className.split(CLASS_PART_SEPARATOR);
		return getGroupRecursive(classParts, classParts[0] === "" && classParts.length > 1 ? 1 : 0, classMap);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		if (hasPostfixModifier) {
			const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
			const baseConflicts = conflictingClassGroups[classGroupId];
			if (modifierConflicts) {
				if (baseConflicts) return concatArrays(baseConflicts, modifierConflicts);
				return modifierConflicts;
			}
			return baseConflicts || EMPTY_CONFLICTS;
		}
		return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
	if (classParts.length - startIndex === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[startIndex];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	if (nextClassPartObject) {
		const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
		if (result) return result;
	}
	const validators = classPartObject.validators;
	if (validators === null) return;
	const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
	const validatorsLength = validators.length;
	for (let i = 0; i < validatorsLength; i++) {
		const validatorObj = validators[i];
		if (validatorObj.validator(classRest)) return validatorObj.classGroupId;
	}
};
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	const content = className.slice(1, -1);
	const colonIndex = content.indexOf(":");
	const property = content.slice(0, colonIndex);
	return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
var createClassMap = (config) => {
	const { theme, classGroups } = config;
	return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
	const classMap = createClassPartObject();
	for (const classGroupId in classGroups) {
		const group = classGroups[classGroupId];
		processClassesRecursively(group, classMap, classGroupId, theme);
	}
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	const len = classGroup.length;
	for (let i = 0; i < len; i++) {
		const classDefinition = classGroup[i];
		processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
	}
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (typeof classDefinition === "string") {
		processStringDefinition(classDefinition, classPartObject, classGroupId);
		return;
	}
	if (typeof classDefinition === "function") {
		processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
		return;
	}
	processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
	const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
	classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (isThemeGetter(classDefinition)) {
		processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
		return;
	}
	if (classPartObject.validators === null) classPartObject.validators = [];
	classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	const entries = Object.entries(classDefinition);
	const len = entries.length;
	for (let i = 0; i < len; i++) {
		const [key, value] = entries[i];
		processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
	}
};
var getPart = (classPartObject, path) => {
	let current = classPartObject;
	const parts = path.split(CLASS_PART_SEPARATOR);
	const len = parts.length;
	for (let i = 0; i < len; i++) {
		const part = parts[i];
		let next = current.nextPart.get(part);
		if (!next) {
			next = createClassPartObject();
			current.nextPart.set(part, next);
		}
		current = next;
	}
	return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = Object.create(null);
	let previousCache = Object.create(null);
	const update = (key, value) => {
		cache[key] = value;
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = Object.create(null);
		}
	};
	return {
		get(key) {
			let value = cache[key];
			if (value !== void 0) return value;
			if ((value = previousCache[key]) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (key in cache) cache[key] = value;
			else update(key, value);
		}
	};
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
	modifiers,
	hasImportantModifier,
	baseClassName,
	maybePostfixModifierPosition,
	isExternal
});
var createParseClassName = (config) => {
	const { prefix, experimentalParseClassName } = config;
	let parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let parenDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		const len = className.length;
		for (let index = 0; index < len; index++) {
			const currentCharacter = className[index];
			if (bracketDepth === 0 && parenDepth === 0) {
				if (currentCharacter === MODIFIER_SEPARATOR) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + 1;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
			else if (currentCharacter === "(") parenDepth++;
			else if (currentCharacter === ")") parenDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
		let baseClassName = baseClassNameWithImportantModifier;
		let hasImportantModifier = false;
		if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
			hasImportantModifier = true;
		} else if (baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(1);
			hasImportantModifier = true;
		}
		const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
		return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
	};
	if (prefix) {
		const fullPrefix = prefix + MODIFIER_SEPARATOR;
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
	}
	if (experimentalParseClassName) {
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => experimentalParseClassName({
			className,
			parseClassName: parseClassNameOriginal
		});
	}
	return parseClassName;
};
var createSortModifiers = (config) => {
	const modifierWeights = /* @__PURE__ */ new Map();
	config.orderSensitiveModifiers.forEach((mod, index) => {
		modifierWeights.set(mod, 1e6 + index);
	});
	return (modifiers) => {
		const result = [];
		let currentSegment = [];
		for (let i = 0; i < modifiers.length; i++) {
			const modifier = modifiers[i];
			const isArbitrary = modifier[0] === "[";
			const isOrderSensitive = modifierWeights.has(modifier);
			if (isArbitrary || isOrderSensitive) {
				if (currentSegment.length > 0) {
					currentSegment.sort();
					result.push(...currentSegment);
					currentSegment = [];
				}
				result.push(modifier);
			} else currentSegment.push(modifier);
		}
		if (currentSegment.length > 0) {
			currentSegment.sort();
			result.push(...currentSegment);
		}
		return result;
	};
};
var createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	sortModifiers: createSortModifiers(config),
	...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers } = configUtils;
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) {
			result = originalClassName + (result.length > 0 ? " " + result : result);
			continue;
		}
		let hasPostfixModifier = !!maybePostfixModifierPosition;
		let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.indexOf(classId) > -1) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
var twJoin = (...classLists) => {
	let index = 0;
	let argument;
	let resolvedValue;
	let string$1 = "";
	while (index < classLists.length) if (argument = classLists[index++]) {
		if (resolvedValue = toValue(argument)) {
			string$1 && (string$1 += " ");
			string$1 += resolvedValue;
		}
	}
	return string$1;
};
var toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string$1 = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string$1 && (string$1 += " ");
			string$1 += resolvedValue;
		}
	}
	return string$1;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall;
	const initTailwindMerge = (classList) => {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	};
	const tailwindMerge = (classList) => {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	};
	functionToCall = initTailwindMerge;
	return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || fallbackThemeArr;
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+\/\d+$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
	const result = arbitraryVariableRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return shouldMatchNoLabel;
	}
	return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
	const themeColor = fromTheme("color");
	const themeFont = fromTheme("font");
	const themeText = fromTheme("text");
	const themeFontWeight = fromTheme("font-weight");
	const themeTracking = fromTheme("tracking");
	const themeLeading = fromTheme("leading");
	const themeBreakpoint = fromTheme("breakpoint");
	const themeContainer = fromTheme("container");
	const themeSpacing = fromTheme("spacing");
	const themeRadius = fromTheme("radius");
	const themeShadow = fromTheme("shadow");
	const themeInsetShadow = fromTheme("inset-shadow");
	const themeTextShadow = fromTheme("text-shadow");
	const themeDropShadow = fromTheme("drop-shadow");
	const themeBlur = fromTheme("blur");
	const themePerspective = fromTheme("perspective");
	const themeAspect = fromTheme("aspect");
	const themeEase = fromTheme("ease");
	const themeAnimate = fromTheme("animate");
	const scaleBreak = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const scalePosition = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	];
	const scalePositionWithArbitrary = () => [
		...scalePosition(),
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const scaleOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const scaleUnambiguousSpacing = () => [
		isArbitraryVariable,
		isArbitraryValue,
		themeSpacing
	];
	const scaleInset = () => [
		isFraction,
		"full",
		"auto",
		...scaleUnambiguousSpacing()
	];
	const scaleGridTemplateColsRows = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartAndEnd = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartOrEnd = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridAutoColsRows = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleAlignPrimaryAxis = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	];
	const scaleAlignSecondaryAxis = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	];
	const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
	const scaleSizing = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleColor = () => [
		themeColor,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBgPosition = () => [
		...scalePosition(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleBgRepeat = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }];
	const scaleBgSize = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleGradientStopPosition = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleRadius = () => [
		"",
		"none",
		"full",
		themeRadius,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBorderWidth = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleLineStyle = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	];
	const scaleBlendMode = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const scaleMaskImagePosition = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	];
	const scaleBlur = () => [
		"",
		"none",
		themeBlur,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleRotate = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleScale = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleSkew = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleTranslate = () => [
		isFraction,
		"full",
		...scaleUnambiguousSpacing()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				themeAspect
			] }],
			container: ["container"],
			columns: [{ columns: [
				isNumber,
				isArbitraryValue,
				isArbitraryVariable,
				themeContainer
			] }],
			"break-after": [{ "break-after": scaleBreak() }],
			"break-before": [{ "break-before": scaleBreak() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: scalePositionWithArbitrary() }],
			overflow: [{ overflow: scaleOverflow() }],
			"overflow-x": [{ "overflow-x": scaleOverflow() }],
			"overflow-y": [{ "overflow-y": scaleOverflow() }],
			overscroll: [{ overscroll: scaleOverscroll() }],
			"overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
			"overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: scaleInset() }],
			"inset-x": [{ "inset-x": scaleInset() }],
			"inset-y": [{ "inset-y": scaleInset() }],
			start: [{ start: scaleInset() }],
			end: [{ end: scaleInset() }],
			top: [{ top: scaleInset() }],
			right: [{ right: scaleInset() }],
			bottom: [{ bottom: scaleInset() }],
			left: [{ left: scaleInset() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				themeContainer,
				...scaleUnambiguousSpacing()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
			"col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
			"col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
			"col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
			"grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
			"row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
			"row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
			"row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
			"auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
			gap: [{ gap: scaleUnambiguousSpacing() }],
			"gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
			"gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
			"justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
			"justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			"align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
			"align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...scaleAlignSecondaryAxis(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
			"place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			p: [{ p: scaleUnambiguousSpacing() }],
			px: [{ px: scaleUnambiguousSpacing() }],
			py: [{ py: scaleUnambiguousSpacing() }],
			ps: [{ ps: scaleUnambiguousSpacing() }],
			pe: [{ pe: scaleUnambiguousSpacing() }],
			pt: [{ pt: scaleUnambiguousSpacing() }],
			pr: [{ pr: scaleUnambiguousSpacing() }],
			pb: [{ pb: scaleUnambiguousSpacing() }],
			pl: [{ pl: scaleUnambiguousSpacing() }],
			m: [{ m: scaleMargin() }],
			mx: [{ mx: scaleMargin() }],
			my: [{ my: scaleMargin() }],
			ms: [{ ms: scaleMargin() }],
			me: [{ me: scaleMargin() }],
			mt: [{ mt: scaleMargin() }],
			mr: [{ mr: scaleMargin() }],
			mb: [{ mb: scaleMargin() }],
			ml: [{ ml: scaleMargin() }],
			"space-x": [{ "space-x": scaleUnambiguousSpacing() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": scaleUnambiguousSpacing() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: scaleSizing() }],
			w: [{ w: [
				themeContainer,
				"screen",
				...scaleSizing()
			] }],
			"min-w": [{ "min-w": [
				themeContainer,
				"screen",
				"none",
				...scaleSizing()
			] }],
			"max-w": [{ "max-w": [
				themeContainer,
				"screen",
				"none",
				"prose",
				{ screen: [themeBreakpoint] },
				...scaleSizing()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			"font-size": [{ text: [
				"base",
				themeText,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				themeFontWeight,
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryValue,
				themeFont
			] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				themeTracking,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			leading: [{ leading: [themeLeading, ...scaleUnambiguousSpacing()] }],
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: scaleColor() }],
			"text-color": [{ text: scaleColor() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			"text-decoration-color": [{ decoration: scaleColor() }],
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: scaleUnambiguousSpacing() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: scaleBgPosition() }],
			"bg-repeat": [{ bg: scaleBgRepeat() }],
			"bg-size": [{ bg: scaleBgSize() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			"bg-color": [{ bg: scaleColor() }],
			"gradient-from-pos": [{ from: scaleGradientStopPosition() }],
			"gradient-via-pos": [{ via: scaleGradientStopPosition() }],
			"gradient-to-pos": [{ to: scaleGradientStopPosition() }],
			"gradient-from": [{ from: scaleColor() }],
			"gradient-via": [{ via: scaleColor() }],
			"gradient-to": [{ to: scaleColor() }],
			rounded: [{ rounded: scaleRadius() }],
			"rounded-s": [{ "rounded-s": scaleRadius() }],
			"rounded-e": [{ "rounded-e": scaleRadius() }],
			"rounded-t": [{ "rounded-t": scaleRadius() }],
			"rounded-r": [{ "rounded-r": scaleRadius() }],
			"rounded-b": [{ "rounded-b": scaleRadius() }],
			"rounded-l": [{ "rounded-l": scaleRadius() }],
			"rounded-ss": [{ "rounded-ss": scaleRadius() }],
			"rounded-se": [{ "rounded-se": scaleRadius() }],
			"rounded-ee": [{ "rounded-ee": scaleRadius() }],
			"rounded-es": [{ "rounded-es": scaleRadius() }],
			"rounded-tl": [{ "rounded-tl": scaleRadius() }],
			"rounded-tr": [{ "rounded-tr": scaleRadius() }],
			"rounded-br": [{ "rounded-br": scaleRadius() }],
			"rounded-bl": [{ "rounded-bl": scaleRadius() }],
			"border-w": [{ border: scaleBorderWidth() }],
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
			"border-w-t": [{ "border-t": scaleBorderWidth() }],
			"border-w-r": [{ "border-r": scaleBorderWidth() }],
			"border-w-b": [{ "border-b": scaleBorderWidth() }],
			"border-w-l": [{ "border-l": scaleBorderWidth() }],
			"divide-x": [{ "divide-x": scaleBorderWidth() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": scaleBorderWidth() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: scaleColor() }],
			"border-color-x": [{ "border-x": scaleColor() }],
			"border-color-y": [{ "border-y": scaleColor() }],
			"border-color-s": [{ "border-s": scaleColor() }],
			"border-color-e": [{ "border-e": scaleColor() }],
			"border-color-t": [{ "border-t": scaleColor() }],
			"border-color-r": [{ "border-r": scaleColor() }],
			"border-color-b": [{ "border-b": scaleColor() }],
			"border-color-l": [{ "border-l": scaleColor() }],
			"divide-color": [{ divide: scaleColor() }],
			"outline-style": [{ outline: [
				...scaleLineStyle(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"outline-color": [{ outline: scaleColor() }],
			shadow: [{ shadow: [
				"",
				"none",
				themeShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"shadow-color": [{ shadow: scaleColor() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				themeInsetShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"inset-shadow-color": [{ "inset-shadow": scaleColor() }],
			"ring-w": [{ ring: scaleBorderWidth() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: scaleColor() }],
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			"ring-offset-color": [{ "ring-offset": scaleColor() }],
			"inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
			"inset-ring-color": [{ "inset-ring": scaleColor() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				themeTextShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"text-shadow-color": [{ "text-shadow": scaleColor() }],
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"mix-blend": [{ "mix-blend": [
				...scaleBlendMode(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": scaleBlendMode() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
			"mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
			"mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
			"mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
			"mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
			"mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
			"mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
			"mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
			"mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
			"mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
			"mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
			"mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
			"mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
			"mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
			"mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
			"mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
			"mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
			"mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
			"mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
			"mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
			"mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
			"mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
			"mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
			"mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
			"mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: scaleBgPosition() }],
			"mask-repeat": [{ mask: scaleBgRepeat() }],
			"mask-size": [{ mask: scaleBgSize() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			blur: [{ blur: scaleBlur() }],
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				themeDropShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"drop-shadow-color": [{ "drop-shadow": scaleColor() }],
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
			"border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
			"border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				themeEase,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			animate: [{ animate: [
				"none",
				themeAnimate,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				themePerspective,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
			rotate: [{ rotate: scaleRotate() }],
			"rotate-x": [{ "rotate-x": scaleRotate() }],
			"rotate-y": [{ "rotate-y": scaleRotate() }],
			"rotate-z": [{ "rotate-z": scaleRotate() }],
			scale: [{ scale: scaleScale() }],
			"scale-x": [{ "scale-x": scaleScale() }],
			"scale-y": [{ "scale-y": scaleScale() }],
			"scale-z": [{ "scale-z": scaleScale() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: scaleSkew() }],
			"skew-x": [{ "skew-x": scaleSkew() }],
			"skew-y": [{ "skew-y": scaleSkew() }],
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: scalePositionWithArbitrary() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: scaleTranslate() }],
			"translate-x": [{ "translate-x": scaleTranslate() }],
			"translate-y": [{ "translate-y": scaleTranslate() }],
			"translate-z": [{ "translate-z": scaleTranslate() }],
			"translate-none": ["translate-none"],
			accent: [{ accent: scaleColor() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: scaleColor() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
			"scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
			"scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
			"scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
			"scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
			"scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
			"scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
			"scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
			"scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
			"scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			fill: [{ fill: ["none", ...scaleColor()] }],
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			stroke: [{ stroke: ["none", ...scaleColor()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/**
* @license lucide-react v0.562.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string$1) => string$1.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string$1) => string$1.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
var toPascalCase = (string$1) => {
	const camelCase = toCamelCase(string$1);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
};
/**
* @license lucide-react v0.562.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
/**
* @license lucide-react v0.562.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react.createElement)("svg", {
	ref,
	...defaultAttributes,
	width: size,
	height: size,
	stroke: color,
	strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
	className: mergeClasses("lucide", className),
	...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	...rest
}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
/**
* @license lucide-react v0.562.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
var confirmationAtom = /* @__PURE__ */ atom(null);
var confirmAction = (options) => {
	confirmationAtom.set(options);
};
var clearConfirmation = () => {
	confirmationAtom.set(null);
};
typeof window !== "undefined" && window.document && window.document.createElement;
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
	return function handleEvent(event) {
		originalEventHandler?.(event);
		if (checkForDefaultPrevented === false || !event.defaultPrevented) return ourEventHandler?.(event);
	};
}
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef(refs[i], null);
			}
		};
	};
}
function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}
function createContext2(rootComponentName, defaultContext) {
	const Context = import_react.createContext(defaultContext);
	const Provider = (props) => {
		const { children, ...context } = props;
		const value = import_react.useMemo(() => context, Object.values(context));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
			value,
			children
		});
	};
	Provider.displayName = rootComponentName + "Provider";
	function useContext2(consumerName) {
		const context = import_react.useContext(Context);
		if (context) return context;
		if (defaultContext !== void 0) return defaultContext;
		throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
	}
	return [Provider, useContext2];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
	let defaultContexts = [];
	function createContext3(rootComponentName, defaultContext) {
		const BaseContext = import_react.createContext(defaultContext);
		const index = defaultContexts.length;
		defaultContexts = [...defaultContexts, defaultContext];
		const Provider = (props) => {
			const { scope, children, ...context } = props;
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const value = import_react.useMemo(() => context, Object.values(context));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
				value,
				children
			});
		};
		Provider.displayName = rootComponentName + "Provider";
		function useContext2(consumerName, scope) {
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const context = import_react.useContext(Context);
			if (context) return context;
			if (defaultContext !== void 0) return defaultContext;
			throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
		}
		return [Provider, useContext2];
	}
	const createScope = () => {
		const scopeContexts = defaultContexts.map((defaultContext) => {
			return import_react.createContext(defaultContext);
		});
		return function useScope(scope) {
			const contexts = scope?.[scopeName] || scopeContexts;
			return import_react.useMemo(() => ({ [`__scope${scopeName}`]: {
				...scope,
				[scopeName]: contexts
			} }), [scope, contexts]);
		};
	};
	createScope.scopeName = scopeName;
	return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
	const baseScope = scopes[0];
	if (scopes.length === 1) return baseScope;
	const createScope = () => {
		const scopeHooks = scopes.map((createScope2) => ({
			useScope: createScope2(),
			scopeName: createScope2.scopeName
		}));
		return function useComposedScopes(overrideScopes) {
			const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
				const currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
				return {
					...nextScopes2,
					...currentScope
				};
			}, {});
			return import_react.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
		};
	};
	createScope.scopeName = baseScope.scopeName;
	return createScope;
}
var useLayoutEffect2 = globalThis?.document ? import_react.useLayoutEffect : () => {};
var useReactId = import_react[" useId ".trim().toString()] || (() => void 0);
var count$1 = 0;
function useId(deterministicId) {
	const [id, setId] = import_react.useState(useReactId());
	useLayoutEffect2(() => {
		if (!deterministicId) setId((reactId) => reactId ?? String(count$1++));
	}, [deterministicId]);
	return deterministicId || (id ? `radix-${id}` : "");
}
var useInsertionEffect = import_react[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({ prop, defaultProp, onChange = () => {}, caller }) {
	const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
		defaultProp,
		onChange
	});
	const isControlled = prop !== void 0;
	const value = isControlled ? prop : uncontrolledProp;
	{
		const isControlledRef = import_react.useRef(prop !== void 0);
		import_react.useEffect(() => {
			const wasControlled = isControlledRef.current;
			if (wasControlled !== isControlled) {
				const from = wasControlled ? "controlled" : "uncontrolled";
				const to = isControlled ? "controlled" : "uncontrolled";
				console.warn(`${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
			}
			isControlledRef.current = isControlled;
		}, [isControlled, caller]);
	}
	return [value, import_react.useCallback((nextValue) => {
		if (isControlled) {
			const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
			if (value2 !== prop) onChangeRef.current?.(value2);
		} else setUncontrolledProp(nextValue);
	}, [
		isControlled,
		prop,
		setUncontrolledProp,
		onChangeRef
	])];
}
function useUncontrolledState({ defaultProp, onChange }) {
	const [value, setValue] = import_react.useState(defaultProp);
	const prevValueRef = import_react.useRef(value);
	const onChangeRef = import_react.useRef(onChange);
	useInsertionEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);
	import_react.useEffect(() => {
		if (prevValueRef.current !== value) {
			onChangeRef.current?.(value);
			prevValueRef.current = value;
		}
	}, [value, prevValueRef]);
	return [
		value,
		setValue,
		onChangeRef
	];
}
function isFunction(value) {
	return typeof value === "function";
}
/* @__NO_SIDE_EFFECTS__ */
function createSlot$1(ownerName) {
	const SlotClone = /* @__PURE__ */ createSlotClone$1(ownerName);
	const Slot2 = import_react.forwardRef((props, forwardedRef) => {
		const { children, ...slotProps } = props;
		const childrenArray = import_react.Children.toArray(children);
		const slottable = childrenArray.find(isSlottable$1);
		if (slottable) {
			const newElement = slottable.props.children;
			const newChildren = childrenArray.map((child) => {
				if (child === slottable) {
					if (import_react.Children.count(newElement) > 1) return import_react.Children.only(null);
					return import_react.isValidElement(newElement) ? newElement.props.children : null;
				} else return child;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
				...slotProps,
				ref: forwardedRef,
				children: import_react.isValidElement(newElement) ? import_react.cloneElement(newElement, void 0, newChildren) : null
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
			...slotProps,
			ref: forwardedRef,
			children
		});
	});
	Slot2.displayName = `${ownerName}.Slot`;
	return Slot2;
}
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone$1(ownerName) {
	const SlotClone = import_react.forwardRef((props, forwardedRef) => {
		const { children, ...slotProps } = props;
		if (import_react.isValidElement(children)) {
			const childrenRef = getElementRef$2(children);
			const props2 = mergeProps$1(slotProps, children.props);
			if (children.type !== import_react.Fragment) props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
			return import_react.cloneElement(children, props2);
		}
		return import_react.Children.count(children) > 1 ? import_react.Children.only(null) : null;
	});
	SlotClone.displayName = `${ownerName}.SlotClone`;
	return SlotClone;
}
var SLOTTABLE_IDENTIFIER$1 = Symbol("radix.slottable");
function isSlottable$1(child) {
	return import_react.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER$1;
}
function mergeProps$1(slotProps, childProps) {
	const overrideProps = { ...childProps };
	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];
		if (/^on[A-Z]/.test(propName)) {
			if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
				const result = childPropValue(...args);
				slotPropValue(...args);
				return result;
			};
			else if (slotPropValue) overrideProps[propName] = slotPropValue;
		} else if (propName === "style") overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		};
		else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
	}
	return {
		...slotProps,
		...overrideProps
	};
}
function getElementRef$2(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
var Primitive = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((primitive, node) => {
	const Slot$1 = /* @__PURE__ */ createSlot$1(`Primitive.${node}`);
	const Node = import_react.forwardRef((props, forwardedRef) => {
		const { asChild, ...primitiveProps } = props;
		const Comp = asChild ? Slot$1 : node;
		if (typeof window !== "undefined") window[Symbol.for("radix-ui")] = true;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
			...primitiveProps,
			ref: forwardedRef
		});
	});
	Node.displayName = `Primitive.${node}`;
	return {
		...primitive,
		[node]: Node
	};
}, {});
function dispatchDiscreteCustomEvent(target, event) {
	if (target) import_react_dom.flushSync(() => target.dispatchEvent(event));
}
function useCallbackRef(callback) {
	const callbackRef = import_react.useRef(callback);
	import_react.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
	const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") onEscapeKeyDown(event);
		};
		ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
		return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
	}, [onEscapeKeyDown, ownerDocument]);
}
var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = import_react.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = import_react.forwardRef((props, forwardedRef) => {
	const { disableOutsidePointerEvents = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
	const context = import_react.useContext(DismissableLayerContext);
	const [node, setNode] = import_react.useState(null);
	const ownerDocument = node?.ownerDocument ?? globalThis?.document;
	const [, force] = import_react.useState({});
	const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
	const layers = Array.from(context.layers);
	const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
	const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
	const index = node ? layers.indexOf(node) : -1;
	const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
	const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
	const pointerDownOutside = usePointerDownOutside((event) => {
		const target = event.target;
		const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
		if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
		onPointerDownOutside?.(event);
		onInteractOutside?.(event);
		if (!event.defaultPrevented) onDismiss?.();
	}, ownerDocument);
	const focusOutside = useFocusOutside((event) => {
		const target = event.target;
		if ([...context.branches].some((branch) => branch.contains(target))) return;
		onFocusOutside?.(event);
		onInteractOutside?.(event);
		if (!event.defaultPrevented) onDismiss?.();
	}, ownerDocument);
	useEscapeKeydown((event) => {
		if (!(index === context.layers.size - 1)) return;
		onEscapeKeyDown?.(event);
		if (!event.defaultPrevented && onDismiss) {
			event.preventDefault();
			onDismiss();
		}
	}, ownerDocument);
	import_react.useEffect(() => {
		if (!node) return;
		if (disableOutsidePointerEvents) {
			if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
				originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
				ownerDocument.body.style.pointerEvents = "none";
			}
			context.layersWithOutsidePointerEventsDisabled.add(node);
		}
		context.layers.add(node);
		dispatchUpdate();
		return () => {
			if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
		};
	}, [
		node,
		ownerDocument,
		disableOutsidePointerEvents,
		context
	]);
	import_react.useEffect(() => {
		return () => {
			if (!node) return;
			context.layers.delete(node);
			context.layersWithOutsidePointerEventsDisabled.delete(node);
			dispatchUpdate();
		};
	}, [node, context]);
	import_react.useEffect(() => {
		const handleUpdate = () => force({});
		document.addEventListener(CONTEXT_UPDATE, handleUpdate);
		return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...layerProps,
		ref: composedRefs,
		style: {
			pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
			...props.style
		},
		onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
		onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
		onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
	});
});
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = import_react.forwardRef((props, forwardedRef) => {
	const context = import_react.useContext(DismissableLayerContext);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	import_react.useEffect(() => {
		const node = ref.current;
		if (node) {
			context.branches.add(node);
			return () => {
				context.branches.delete(node);
			};
		}
	}, [context.branches]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...props,
		ref: composedRefs
	});
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
	const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
	const isPointerInsideReactTreeRef = import_react.useRef(false);
	const handleClickRef = import_react.useRef(() => {});
	import_react.useEffect(() => {
		const handlePointerDown = (event) => {
			if (event.target && !isPointerInsideReactTreeRef.current) {
				let handleAndDispatchPointerDownOutsideEvent2 = function() {
					handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, { discrete: true });
				};
				const eventDetail = { originalEvent: event };
				if (event.pointerType === "touch") {
					ownerDocument.removeEventListener("click", handleClickRef.current);
					handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
					ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
				} else handleAndDispatchPointerDownOutsideEvent2();
			} else ownerDocument.removeEventListener("click", handleClickRef.current);
			isPointerInsideReactTreeRef.current = false;
		};
		const timerId = window.setTimeout(() => {
			ownerDocument.addEventListener("pointerdown", handlePointerDown);
		}, 0);
		return () => {
			window.clearTimeout(timerId);
			ownerDocument.removeEventListener("pointerdown", handlePointerDown);
			ownerDocument.removeEventListener("click", handleClickRef.current);
		};
	}, [ownerDocument, handlePointerDownOutside]);
	return { onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
	const handleFocusOutside = useCallbackRef(onFocusOutside);
	const isFocusInsideReactTreeRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const handleFocus = (event) => {
			if (event.target && !isFocusInsideReactTreeRef.current) handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, { originalEvent: event }, { discrete: false });
		};
		ownerDocument.addEventListener("focusin", handleFocus);
		return () => ownerDocument.removeEventListener("focusin", handleFocus);
	}, [ownerDocument, handleFocusOutside]);
	return {
		onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
		onBlurCapture: () => isFocusInsideReactTreeRef.current = false
	};
}
function dispatchUpdate() {
	const event = new CustomEvent(CONTEXT_UPDATE);
	document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
	const target = detail.originalEvent.target;
	const event = new CustomEvent(name, {
		bubbles: false,
		cancelable: true,
		detail
	});
	if (handler) target.addEventListener(name, handler, { once: true });
	if (discrete) dispatchDiscreteCustomEvent(target, event);
	else target.dispatchEvent(event);
}
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = import_react.forwardRef((props, forwardedRef) => {
	const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
	const [container, setContainer] = import_react.useState(null);
	const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
	const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
	const lastFocusedElementRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
	const focusScope = import_react.useRef({
		paused: false,
		pause() {
			this.paused = true;
		},
		resume() {
			this.paused = false;
		}
	}).current;
	import_react.useEffect(() => {
		if (trapped) {
			let handleFocusIn2 = function(event) {
				if (focusScope.paused || !container) return;
				const target = event.target;
				if (container.contains(target)) lastFocusedElementRef.current = target;
				else focus(lastFocusedElementRef.current, { select: true });
			}, handleFocusOut2 = function(event) {
				if (focusScope.paused || !container) return;
				const relatedTarget = event.relatedTarget;
				if (relatedTarget === null) return;
				if (!container.contains(relatedTarget)) focus(lastFocusedElementRef.current, { select: true });
			}, handleMutations2 = function(mutations) {
				if (document.activeElement !== document.body) return;
				for (const mutation of mutations) if (mutation.removedNodes.length > 0) focus(container);
			};
			document.addEventListener("focusin", handleFocusIn2);
			document.addEventListener("focusout", handleFocusOut2);
			const mutationObserver = new MutationObserver(handleMutations2);
			if (container) mutationObserver.observe(container, {
				childList: true,
				subtree: true
			});
			return () => {
				document.removeEventListener("focusin", handleFocusIn2);
				document.removeEventListener("focusout", handleFocusOut2);
				mutationObserver.disconnect();
			};
		}
	}, [
		trapped,
		container,
		focusScope.paused
	]);
	import_react.useEffect(() => {
		if (container) {
			focusScopesStack.add(focusScope);
			const previouslyFocusedElement = document.activeElement;
			if (!container.contains(previouslyFocusedElement)) {
				const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
				container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
				container.dispatchEvent(mountEvent);
				if (!mountEvent.defaultPrevented) {
					focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
					if (document.activeElement === previouslyFocusedElement) focus(container);
				}
			}
			return () => {
				container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
				setTimeout(() => {
					const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
					container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
					container.dispatchEvent(unmountEvent);
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
					focusScopesStack.remove(focusScope);
				}, 0);
			};
		}
	}, [
		container,
		onMountAutoFocus,
		onUnmountAutoFocus,
		focusScope
	]);
	const handleKeyDown = import_react.useCallback((event) => {
		if (!loop && !trapped) return;
		if (focusScope.paused) return;
		const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
		const focusedElement = document.activeElement;
		if (isTabKey && focusedElement) {
			const container2 = event.currentTarget;
			const [first, last] = getTabbableEdges(container2);
			if (!(first && last)) {
				if (focusedElement === container2) event.preventDefault();
			} else if (!event.shiftKey && focusedElement === last) {
				event.preventDefault();
				if (loop) focus(first, { select: true });
			} else if (event.shiftKey && focusedElement === first) {
				event.preventDefault();
				if (loop) focus(last, { select: true });
			}
		}
	}, [
		loop,
		trapped,
		focusScope.paused
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		tabIndex: -1,
		...scopeProps,
		ref: composedRefs,
		onKeyDown: handleKeyDown
	});
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(candidates, { select = false } = {}) {
	const previouslyFocusedElement = document.activeElement;
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (document.activeElement !== previouslyFocusedElement) return;
	}
}
function getTabbableEdges(container) {
	const candidates = getTabbableCandidates(container);
	return [findVisible(candidates, container), findVisible(candidates.reverse(), container)];
}
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
function findVisible(elements, container) {
	for (const element of elements) if (!isHidden(element, { upTo: container })) return element;
}
function isHidden(node, { upTo }) {
	if (getComputedStyle(node).visibility === "hidden") return true;
	while (node) {
		if (upTo !== void 0 && node === upTo) return false;
		if (getComputedStyle(node).display === "none") return true;
		node = node.parentElement;
	}
	return false;
}
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
	if (element && element.focus) {
		const previouslyFocusedElement = document.activeElement;
		element.focus({ preventScroll: true });
		if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
	}
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
	let stack = [];
	return {
		add(focusScope) {
			const activeFocusScope = stack[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack = arrayRemove(stack, focusScope);
			stack.unshift(focusScope);
		},
		remove(focusScope) {
			stack = arrayRemove(stack, focusScope);
			stack[0]?.resume();
		}
	};
}
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}
function removeLinks(items) {
	return items.filter((item) => item.tagName !== "A");
}
var PORTAL_NAME = "Portal";
var Portal = import_react.forwardRef((props, forwardedRef) => {
	const { container: containerProp, ...portalProps } = props;
	const [mounted, setMounted] = import_react.useState(false);
	useLayoutEffect2(() => setMounted(true), []);
	const container = containerProp || mounted && globalThis?.document?.body;
	return container ? import_react_dom$1.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...portalProps,
		ref: forwardedRef
	}), container) : null;
});
Portal.displayName = PORTAL_NAME;
function useStateMachine(initialState, machine) {
	return import_react.useReducer((state, event) => {
		return machine[state][event] ?? state;
	}, initialState);
}
var Presence = (props) => {
	const { present, children } = props;
	const presence = usePresence(present);
	const child = typeof children === "function" ? children({ present: presence.isPresent }) : import_react.Children.only(children);
	const ref = useComposedRefs(presence.ref, getElementRef$1(child));
	return typeof children === "function" || presence.isPresent ? import_react.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
	const [node, setNode] = import_react.useState();
	const stylesRef = import_react.useRef(null);
	const prevPresentRef = import_react.useRef(present);
	const prevAnimationNameRef = import_react.useRef("none");
	const [state, send] = useStateMachine(present ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	import_react.useEffect(() => {
		const currentAnimationName = getAnimationName(stylesRef.current);
		prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
	}, [state]);
	useLayoutEffect2(() => {
		const styles = stylesRef.current;
		const wasPresent = prevPresentRef.current;
		if (wasPresent !== present) {
			const prevAnimationName = prevAnimationNameRef.current;
			const currentAnimationName = getAnimationName(styles);
			if (present) send("MOUNT");
			else if (currentAnimationName === "none" || styles?.display === "none") send("UNMOUNT");
			else if (wasPresent && prevAnimationName !== currentAnimationName) send("ANIMATION_OUT");
			else send("UNMOUNT");
			prevPresentRef.current = present;
		}
	}, [present, send]);
	useLayoutEffect2(() => {
		if (node) {
			let timeoutId;
			const ownerWindow = node.ownerDocument.defaultView ?? window;
			const handleAnimationEnd = (event) => {
				const isCurrentAnimation = getAnimationName(stylesRef.current).includes(CSS.escape(event.animationName));
				if (event.target === node && isCurrentAnimation) {
					send("ANIMATION_END");
					if (!prevPresentRef.current) {
						const currentFillMode = node.style.animationFillMode;
						node.style.animationFillMode = "forwards";
						timeoutId = ownerWindow.setTimeout(() => {
							if (node.style.animationFillMode === "forwards") node.style.animationFillMode = currentFillMode;
						});
					}
				}
			};
			const handleAnimationStart = (event) => {
				if (event.target === node) prevAnimationNameRef.current = getAnimationName(stylesRef.current);
			};
			node.addEventListener("animationstart", handleAnimationStart);
			node.addEventListener("animationcancel", handleAnimationEnd);
			node.addEventListener("animationend", handleAnimationEnd);
			return () => {
				ownerWindow.clearTimeout(timeoutId);
				node.removeEventListener("animationstart", handleAnimationStart);
				node.removeEventListener("animationcancel", handleAnimationEnd);
				node.removeEventListener("animationend", handleAnimationEnd);
			};
		} else send("ANIMATION_END");
	}, [node, send]);
	return {
		isPresent: ["mounted", "unmountSuspended"].includes(state),
		ref: import_react.useCallback((node2) => {
			stylesRef.current = node2 ? getComputedStyle(node2) : null;
			setNode(node2);
		}, [])
	};
}
function getAnimationName(styles) {
	return styles?.animationName || "none";
}
function getElementRef$1(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
var count = 0;
function useFocusGuards() {
	import_react.useEffect(() => {
		const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
		document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
		count++;
		return () => {
			if (count === 1) document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
			count--;
		};
	}, []);
}
function createFocusGuard() {
	const element = document.createElement("span");
	element.setAttribute("data-radix-focus-guard", "");
	element.tabIndex = 0;
	element.style.outline = "none";
	element.style.opacity = "0";
	element.style.position = "fixed";
	element.style.pointerEvents = "none";
	return element;
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = import_react[" use ".trim().toString()];
function isPromiseLike(value) {
	return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
	return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
/* @__NO_SIDE_EFFECTS__ */
function createSlot(ownerName) {
	const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
	const Slot2 = import_react.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		const childrenArray = import_react.Children.toArray(children);
		const slottable = childrenArray.find(isSlottable);
		if (slottable) {
			const newElement = slottable.props.children;
			const newChildren = childrenArray.map((child) => {
				if (child === slottable) {
					if (import_react.Children.count(newElement) > 1) return import_react.Children.only(null);
					return import_react.isValidElement(newElement) ? newElement.props.children : null;
				} else return child;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
				...slotProps,
				ref: forwardedRef,
				children: import_react.isValidElement(newElement) ? import_react.cloneElement(newElement, void 0, newChildren) : null
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
			...slotProps,
			ref: forwardedRef,
			children
		});
	});
	Slot2.displayName = `${ownerName}.Slot`;
	return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone(ownerName) {
	const SlotClone = import_react.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		if (import_react.isValidElement(children)) {
			const childrenRef = getElementRef(children);
			const props2 = mergeProps(slotProps, children.props);
			if (children.type !== import_react.Fragment) props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
			return import_react.cloneElement(children, props2);
		}
		return import_react.Children.count(children) > 1 ? import_react.Children.only(null) : null;
	});
	SlotClone.displayName = `${ownerName}.SlotClone`;
	return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
	return import_react.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
	const overrideProps = { ...childProps };
	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];
		if (/^on[A-Z]/.test(propName)) {
			if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
				const result = childPropValue(...args);
				slotPropValue(...args);
				return result;
			};
			else if (slotPropValue) overrideProps[propName] = slotPropValue;
		} else if (propName === "style") overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		};
		else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
	}
	return {
		...slotProps,
		...overrideProps
	};
}
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
	var _config_compoundVariants;
	if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
	const { variants, defaultVariants } = config;
	const getVariantClassNames = Object.keys(variants).map((variant) => {
		const variantProp = props === null || props === void 0 ? void 0 : props[variant];
		const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
		if (variantProp === null) return null;
		const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
		return variants[variant][variantKey];
	});
	const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
		let [key, value] = param;
		if (value === void 0) return acc;
		acc[key] = value;
		return acc;
	}, {});
	return cx(base, getVariantClassNames, config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
		let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
		return Object.entries(compoundVariantOptions).every((param$1) => {
			let [key, value] = param$1;
			return Array.isArray(value) ? value.includes({
				...defaultVariants,
				...propsWithoutUndefined
			}[key]) : {
				...defaultVariants,
				...propsWithoutUndefined
			}[key] === value;
		}) ? [
			...acc,
			cvClass,
			cvClassName
		] : acc;
	}, []), props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-sm": "size-8",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
export { providerTypeAtom as $, encryptedGoogleApiKeyAtom as A, useId as At, googleModelAtom as B, confirmationAtom as C, themeAtom as Ct, currentStreamAtom as D, useComposedRefs as Dt, createLucideIcon as E, useCallbackRef as Et, getDecryptedGoogleApiKey as F, lastUserMessageAtom as G, hydrateSettings as H, getDecryptedOllamaApiKey as I, notificationsAtom as J, masterPasswordAtom as K, getDecryptedOpenRouterApiKey as L, encryptedOpenRouterApiKeyAtom as M, fileToImageAttachment as N, deleteConversationImages as O, useControllableState as Ot, getAIManager as P, pendingImagesAtom as Q, getImages as R, confirmAction as S, temperatureUnitAtom as St, createContextScope as T, timezoneAtom as Tt, isLockedAtom as U, hasKeysAtom as V, isStreamingAtom as W, ollamaModelAtom as X, ollamaBaseUrlAtom as Y, openRouterModelAtom as Z, clearPendingImages as _, setTheme as _t, Portal as a, setAppearance as at, composeEventHandlers as b, showInfo as bt, SUPPORTED_PROVIDERS as c, setGoogleModel as ct, appearanceAtom as d, setOllamaBaseUrl as dt, removeMessagesFromTransaction as et, appendToStream as f, setOllamaModel as ft, clearMessages as g, setTemperatureUnit as gt, clearConfirmation as h, setProviderType as ht, PROVIDER_OLLAMA as i, saveImagesToIndexedDB as it, encryptedOllamaApiKeyAtom as j, useLayoutEffect2 as jt, dispatchDiscreteCustomEvent as k, useFocusGuards as kt, addMessage as l, setMasterPassword as lt, clearAllImages as m, setOpenRouterModel as mt, DismissableLayer as n, removePendingImage as nt, Presence as o, setArchiveThreshold as ot, archiveThresholdAtom as p, setOpenRouterApiKey as pt, messagesAtom as q, FocusScope as r, resetSecuritySettings as rt, Primitive as s, setGoogleApiKey as st, Button as t, removeNotification as tt, addPendingImage as u, setOllamaApiKey as ut, clearStream as v, setTimezone as vt, createContext2 as w, thresholdToHours as wt, composeRefs as x, showSuccess as xt, cn as y, showError as yt, getSystemTimezone as z };
