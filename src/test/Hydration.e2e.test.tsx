import { ChatContainer } from "@/components/chat/container/ChatContainer";
import { ConfirmationProvider } from "@/components/providers/ConfirmationProvider";
import { NotificationProvider } from "@/components/providers/NotificationProvider";
import { PromptProvider } from "@/components/providers/PromptProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SettingsPage } from "@/components/settings/SettingsPage";
import { UsagePage } from "@/components/usage/UsagePage";
import RootLayout from "@/layout/root";
import { act, cleanup } from "@testing-library/react";
import type React from "react";
import { hydrateRoot } from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import { afterEach, beforeEach, describe, it, vi } from "vitest";

// Mock TanStack Router hooks to avoid RouterProvider dependency
vi.mock("@tanstack/react-router", async (importOriginal) => {
	const actual = (await importOriginal()) as Record<string, unknown>;
	return {
		...actual,
		useNavigate: () => vi.fn(),
		useSearch: () => ({}),
		useRouter: () => ({
			history: {
				back: vi.fn(),
			},
		}),
		HeadContent: () => null,
		Scripts: () => null,
		Outlet: () => null,
		Link: ({ children }: { children: React.ReactNode }) => (
			<a data-testid="mock-link">{children}</a>
		),
	};
});

// Also mock the custom hooks that use these router hooks
vi.mock("@/lib/hooks/useNavigation", () => ({
	useNavigation: () => ({
		goToChat: vi.fn(),
		goToSettings: vi.fn(),
		goToUsage: vi.fn(),
		goBack: vi.fn(),
		navigate: vi.fn(),
	}),
	useChatSearchParams: () => ({
		activeChat: undefined,
		sidebarOpen: false,
		showArchived: false,
		showDeleted: false,
		forceCompat: false,
		setActiveChat: vi.fn(),
		toggleSidebar: vi.fn(),
		setSidebar: vi.fn(),
		toggleShowArchived: vi.fn(),
		setShowArchived: vi.fn(),
		toggleShowDeleted: vi.fn(),
		setShowDeleted: vi.fn(),
	}),
}));

const AllProviders = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider>
		<RootLayout>{children}</RootLayout>
		<NotificationProvider />
		<ConfirmationProvider />
		<PromptProvider />
	</ThemeProvider>
);

import {
	activeConversationIdAtom,
	conversationsAtom,
} from "@/lib/stores/conversations";
import {
	appearanceAtom,
	encryptedGoogleApiKeyAtom,
	encryptedOllamaApiKeyAtom,
	encryptedOpenRouterApiKeyAtom,
	experimentsAtom,
	masterPasswordAtom,
	providerTypeAtom,
	themeAtom,
	timezoneAtom,
} from "@/lib/stores/settings";
import { dailyUsageAtom, usageEventsAtom } from "@/lib/stores/usage";

// ... (existing mocks)

describe("Hydration Integrity E2E", () => {
	let consoleErrors: string[] = [];
	const originalError = console.error;

	beforeEach(() => {
		consoleErrors = [];
		vi.spyOn(console, "error").mockImplementation((message, ...args) => {
			const fullMessage =
				typeof message === "string"
					? message.replace(/%s/g, () => args.shift())
					: "";

			// React 18 hydration mismatch errors
			if (
				fullMessage.includes("Hydration failed") ||
				fullMessage.includes("did not match") ||
				fullMessage.includes("Text content did not match") ||
				fullMessage.includes("Prop `%s` did not match") ||
				fullMessage.includes("Extra attributes from the server") ||
				fullMessage.includes("Warning:") ||
				fullMessage.includes("React hydration")
			) {
				consoleErrors.push(fullMessage);
			}
			originalError(message, ...args);
		});

		if (typeof localStorage !== "undefined") {
			localStorage.clear();
		}

		// Reset atoms to default values to avoid test leakage
		appearanceAtom.set("system");
		themeAtom.set("default");
		providerTypeAtom.set("ollama");
		experimentsAtom.set({});
		masterPasswordAtom.set(null);
		encryptedOpenRouterApiKeyAtom.set(null);
		encryptedGoogleApiKeyAtom.set(null);
		encryptedOllamaApiKeyAtom.set(null);
		timezoneAtom.set("auto");
		usageEventsAtom.set([]);
		dailyUsageAtom.set([]);
		conversationsAtom.set([]);
		activeConversationIdAtom.set(null);
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	const checkHydration = () => {
		if (consoleErrors.length > 0) {
			throw new Error(
				`Hydration errors detected:\n${consoleErrors.join("\n")}`,
			);
		}
	};

	/**
	 * Helper to perform a real hydration check:
	 * 1. Render to string (SSR)
	 * 2. Set innerHTML of a container
	 * 3. Hydrate on the client
	 */
	const performHydrationTest = async (ui: React.ReactElement) => {
		const container = document.createElement("div");
		document.body.appendChild(container);

		try {
			// 1. SSR
			const html = ReactDOMServer.renderToString(ui);
			container.innerHTML = html;

			// 2. Hydrate
			let root: ReturnType<typeof hydrateRoot>;
			await act(async () => {
				root = hydrateRoot(container, ui);
			});

			// Give it a tick to log any mismatches
			await act(async () => {
				await new Promise((resolve) => setTimeout(resolve, 10));
			});

			checkHydration();
			await act(async () => {
				root.unmount();
			});
		} finally {
			document.body.removeChild(container);
		}
	};

	describe("HomePage (Chat)", () => {
		it("should hydrate without errors in default state", async () => {
			await performHydrationTest(
				<AllProviders>
					<ChatContainer />
				</AllProviders>,
			);
		});

		it("should hydrate without errors with existing conversations", async () => {
			if (typeof localStorage !== "undefined") {
				localStorage.setItem(
					"ai-chat-conversations",
					JSON.stringify([
						{
							id: "1",
							title: "Active Chat",
							messages: [],
							status: "active",
							createdAt: Date.now(),
							updatedAt: Date.now(),
						},
						{
							id: "2",
							title: "Archived Chat",
							messages: [],
							status: "archived",
							createdAt: Date.now() - 10000,
							updatedAt: Date.now() - 5000,
						},
						{
							id: "3",
							title: "Deleted Chat",
							messages: [],
							status: "deleted",
							createdAt: Date.now() - 20000,
							updatedAt: Date.now() - 15000,
						},
					]),
				);
				localStorage.setItem("chatthing_active_conversation_id", "1");
			}
			await performHydrationTest(
				<AllProviders>
					<ChatContainer />
				</AllProviders>,
			);
		});

		it("should hydrate without errors when locked", async () => {
			if (typeof localStorage !== "undefined") {
				localStorage.setItem("ai-provider-type", "open-router");
				localStorage.setItem(
					"encrypted-openrouter-api-key",
					"some-encrypted-key",
				);
			}
			await performHydrationTest(
				<AllProviders>
					<ChatContainer />
				</AllProviders>,
			);
		});

		it("should hydrate without errors with different theme settings", async () => {
			if (typeof localStorage !== "undefined") {
				localStorage.setItem("theme", "vibrant");
				localStorage.setItem("appearance", "dark");
			}
			await performHydrationTest(
				<AllProviders>
					<ChatContainer />
				</AllProviders>,
			);
		});
	});

	describe("SettingsPage", () => {
		it("should hydrate without errors in default state", async () => {
			await performHydrationTest(
				<AllProviders>
					<SettingsPage />
				</AllProviders>,
			);
		});

		it("should hydrate without errors with various experiments enabled", async () => {
			if (typeof localStorage !== "undefined") {
				localStorage.setItem(
					"experiments",
					JSON.stringify({ tools: true, promptApi: true }),
				);
			}
			await performHydrationTest(
				<AllProviders>
					<SettingsPage />
				</AllProviders>,
			);
		});

		it("should hydrate without errors with custom model settings", async () => {
			if (typeof localStorage !== "undefined") {
				localStorage.setItem("openrouter-model", "openai/gpt-4");
				localStorage.setItem("ollama-base-url", "http://192.168.1.100:11434");
				localStorage.setItem(
					"archive-threshold",
					JSON.stringify({ value: 30, unit: "days" }),
				);
			}
			await performHydrationTest(
				<AllProviders>
					<SettingsPage />
				</AllProviders>,
			);
		});
	});

	describe("UsagePage", () => {
		it("should hydrate without errors in default state", async () => {
			await performHydrationTest(
				<AllProviders>
					<UsagePage />
				</AllProviders>,
			);
		});

		it("should hydrate without errors with extensive usage data", async () => {
			if (typeof localStorage !== "undefined") {
				const now = Date.now();
				localStorage.setItem(
					"ai-chat-usage",
					JSON.stringify({
						events: [
							{
								id: "1",
								type: "message",
								timestamp: now,
								characterCount: 10,
								provider: "google",
								model: "gemini-pro",
							},
							{
								id: "2",
								type: "response",
								timestamp: now + 1000,
								characterCount: 100,
								provider: "google",
								model: "gemini-pro",
							},
						],
						daily: [
							{
								date: new Date(now).toISOString().split("T")[0],
								messageCount: 1,
								responseCount: 1,
								totalCharacters: 110,
							},
						],
					}),
				);
			}
			await performHydrationTest(
				<AllProviders>
					<UsagePage />
				</AllProviders>,
			);
		});

		it("should hydrate without errors with different timezones", async () => {
			if (typeof localStorage !== "undefined") {
				localStorage.setItem("timezone", "Asia/Tokyo");
			}
			await performHydrationTest(
				<AllProviders>
					<UsagePage />
				</AllProviders>,
			);
		});
	});
});
