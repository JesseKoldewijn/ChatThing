export interface PullProgress {
	status: string;
	digest?: string;
	total?: number;
	completed?: number;
	error?: string;
}

export interface OllamaModel {
	name: string;
	model: string;
	modified_at: string;
	size: number;
	digest: string;
	details: {
		parent_model: string;
		format: string;
		family: string;
		families: string[];
		parameter_size: string;
		quantization_level: string;
	};
}

export interface OllamaTagsResponse {
	models: OllamaModel[];
}

/**
 * Check if Ollama is available at the given base URL
 */
export async function checkOllamaAvailability(baseUrl: string): Promise<boolean> {
	const url = baseUrl.endsWith("/api") ? `${baseUrl}/tags` : `${baseUrl}/api/tags`;
	try {
		const response = await fetch(url, {
			method: "GET",
		});
		return response.ok;
	} catch (error) {
		return false;
	}
}

/**
 * Fetch installed models from Ollama
 */
export async function fetchOllamaModels(baseUrl: string): Promise<OllamaModel[]> {
	const url = baseUrl.endsWith("/api") ? `${baseUrl}/tags` : `${baseUrl}/api/tags`;
	const response = await fetch(url, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch models: ${response.statusText}`);
	}

	const data = (await response.json()) as OllamaTagsResponse;
	return data.models;
}

/**
 * Pull a model from Ollama with progress tracking
 */
export async function pullOllamaModel(
	baseUrl: string,
	model: string,
	onProgress: (progress: PullProgress) => void
): Promise<void> {
	const url = baseUrl.endsWith("/api") ? `${baseUrl}/pull` : `${baseUrl}/api/pull`;
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({ name: model }),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to pull model: ${error}`);
	}

	if (!response.body) {
		throw new Error("Response body is null");
	}

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
				const progress = JSON.parse(line) as PullProgress;
				onProgress(progress);
				if (progress.error) {
					throw new Error(progress.error);
				}
			} catch (e) {
				console.error("Failed to parse progress line:", line, e);
			}
		}
	}

	if (buffer.trim()) {
		try {
			const progress = JSON.parse(buffer) as PullProgress;
			onProgress(progress);
			if (progress.error) {
				throw new Error(progress.error);
			}
		} catch (e) {
			console.error("Failed to parse final progress line:", buffer, e);
		}
	}
}

