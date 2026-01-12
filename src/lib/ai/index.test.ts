import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAIManager, clearAIManagerCache } from "./index";
import { 
	providerTypeAtom, 
	ollamaModelAtom, 
	ollamaBaseUrlAtom,
	PROVIDER_OLLAMA,
	PROVIDER_PROMPT_API
} from "@/lib/stores/settings";

// Mock the providers
vi.mock("./ollama/provider", () => ({
	OllamaProvider: vi.fn().mockImplementation(function() {
		return {
			type: PROVIDER_OLLAMA,
			prompt: vi.fn(),
		};
	}),
}));

vi.mock("./prompt-api/provider", () => ({
	PromptApiProvider: vi.fn().mockImplementation(function() {
		return {
			type: PROVIDER_PROMPT_API,
			prompt: vi.fn(),
		};
	}),
}));

describe("AI Manager (index)", () => {
	beforeEach(() => {
		clearAIManagerCache();
		vi.clearAllMocks();
		
		// Reset atoms
		providerTypeAtom.set(PROVIDER_OLLAMA);
		ollamaModelAtom.set("test-model");
		ollamaBaseUrlAtom.set("http://localhost:11434");
	});

	it("should return a cached manager if config is the same", async () => {
		const manager1 = await getAIManager();
		const manager2 = await getAIManager();

		expect(manager1).toBe(manager2);
	});

	it("should return a new manager if config changes", async () => {
		const manager1 = await getAIManager();
		
		// Change model
		ollamaModelAtom.set("new-model");
		
		const manager2 = await getAIManager();
		expect(manager1).not.toBe(manager2);
	});

	it("should return a new manager if provider type changes", async () => {
		const manager1 = await getAIManager();
		
		// Change provider
		providerTypeAtom.set(PROVIDER_PROMPT_API);
		
		const manager2 = await getAIManager();
		expect(manager1).not.toBe(manager2);
		expect(manager2.providerType).toBe(PROVIDER_PROMPT_API);
	});

	it("should clear cache correctly", async () => {
		const manager1 = await getAIManager();
		clearAIManagerCache();
		const manager2 = await getAIManager();
		
		expect(manager1).not.toBe(manager2);
	});
});
