import { n as atom } from "../_libs/nanostores.mjs";
import { E as createLucideIcon, F as getDecryptedGoogleApiKey, Y as ollamaBaseUrlAtom } from "./button-Dt876Ufa.mjs";
var Archive = createLucideIcon("archive", [
	["rect", {
		width: "20",
		height: "5",
		x: "2",
		y: "3",
		rx: "1",
		key: "1wp1u1"
	}],
	["path", {
		d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
		key: "1s80jp"
	}],
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}]
]);
var Clock = createLucideIcon("clock", [["path", {
	d: "M12 6v6l4 2",
	key: "mmk7yg"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]);
var LoaderCircle = createLucideIcon("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]);
var Lock = createLucideIcon("lock", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 10 0v4",
	key: "fwvmzm"
}]]);
var Plus = createLucideIcon("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
var openRouterModelsAtom = /* @__PURE__ */ atom([]);
var isLoadingModelsAtom = /* @__PURE__ */ atom(false);
var fetchOpenRouterModels = async () => {
	if (isLoadingModelsAtom.get()) return;
	if (openRouterModelsAtom.get().length > 0) return;
	isLoadingModelsAtom.set(true);
	try {
		const response = await fetch("https://openrouter.ai/api/v1/models");
		if (!response.ok) throw new Error("Failed to fetch models");
		const data = await response.json();
		if (data.data && Array.isArray(data.data)) {
			const models = data.data.map((m) => {
				const model = m;
				return {
					id: model.id,
					name: model.name,
					description: model.description,
					pricing: model.pricing
				};
			});
			openRouterModelsAtom.set(models);
		}
	} catch (error) {
		console.error("Error fetching OpenRouter models:", error);
	} finally {
		isLoadingModelsAtom.set(false);
	}
};
var googleModelsAtom = /* @__PURE__ */ atom([]);
var isLoadingGoogleModelsAtom = /* @__PURE__ */ atom(false);
var fetchGoogleModels = async () => {
	if (isLoadingGoogleModelsAtom.get()) return;
	const apiKey = await getDecryptedGoogleApiKey();
	if (!apiKey) return;
	if (googleModelsAtom.get().length > 0) return;
	isLoadingGoogleModelsAtom.set(true);
	try {
		const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
		if (!response.ok) throw new Error("Failed to fetch Google models");
		const data = await response.json();
		if (data.models && Array.isArray(data.models)) {
			const models = data.models.filter((m) => m.supportedGenerationMethods.includes("generateContent")).map((m) => ({
				id: m.name.replace("models/", ""),
				name: m.displayName || m.name.replace("models/", ""),
				description: m.description,
				supportedGenerationMethods: m.supportedGenerationMethods
			}));
			googleModelsAtom.set(models);
		}
	} catch (error) {
		console.error("Error fetching Google models:", error);
	} finally {
		isLoadingGoogleModelsAtom.set(false);
	}
};
async function checkOllamaAvailability(baseUrl) {
	const url = baseUrl.endsWith("/api") ? `${baseUrl}/tags` : `${baseUrl}/api/tags`;
	try {
		return (await fetch(url, { method: "GET" })).ok;
	} catch {
		return false;
	}
}
async function fetchOllamaModels(baseUrl) {
	const url = baseUrl.endsWith("/api") ? `${baseUrl}/tags` : `${baseUrl}/api/tags`;
	const response = await fetch(url, { method: "GET" });
	if (!response.ok) throw new Error(`Failed to fetch models: ${response.statusText}`);
	return (await response.json()).models;
}
async function pullOllamaModel(baseUrl, model, onProgress) {
	const url = baseUrl.endsWith("/api") ? `${baseUrl}/pull` : `${baseUrl}/api/pull`;
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({ name: model })
	});
	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to pull model: ${error}`);
	}
	if (!response.body) throw new Error("Response body is null");
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split("\n");
		buffer = lines.pop() || "";
		for (const line of lines) {
			if (!line.trim()) continue;
			try {
				const progress = JSON.parse(line);
				onProgress(progress);
				if (progress.error) throw new Error(progress.error);
			} catch (e) {}
		}
	}
	if (buffer.trim()) try {
		const progress = JSON.parse(buffer);
		onProgress(progress);
		if (progress.error) throw new Error(progress.error);
	} catch (e) {}
}
var ollamaModelsAtom = /* @__PURE__ */ atom([]);
var isLoadingOllamaModelsAtom = /* @__PURE__ */ atom(false);
var ollamaStatusAtom = /* @__PURE__ */ atom("idle");
var fetchOllamaModelsAction = async () => {
	const baseUrl = ollamaBaseUrlAtom.get();
	if (!baseUrl) return;
	isLoadingOllamaModelsAtom.set(true);
	ollamaStatusAtom.set("checking");
	try {
		if (await checkOllamaAvailability(baseUrl)) {
			ollamaStatusAtom.set("available");
			const models = await fetchOllamaModels(baseUrl);
			ollamaModelsAtom.set(models);
		} else {
			ollamaStatusAtom.set("unavailable");
			ollamaModelsAtom.set([]);
		}
	} catch (error) {
		console.warn("Failed to fetch Ollama models:", error);
		ollamaStatusAtom.set("unavailable");
		ollamaModelsAtom.set([]);
	} finally {
		isLoadingOllamaModelsAtom.set(false);
	}
};
export { Plus as a, fetchOpenRouterModels as c, isLoadingModelsAtom as d, isLoadingOllamaModelsAtom as f, pullOllamaModel as g, openRouterModelsAtom as h, Lock as i, googleModelsAtom as l, ollamaStatusAtom as m, Clock as n, fetchGoogleModels as o, ollamaModelsAtom as p, LoaderCircle as r, fetchOllamaModelsAction as s, Archive as t, isLoadingGoogleModelsAtom as u };
