import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { type ProviderType, SUPPORTED_PROVIDERS } from "@/lib/ai/constants";
import {
	fetchGoogleModels,
	googleModelsAtom,
	isLoadingGoogleModelsAtom,
} from "@/lib/ai/google/models";
import {
	fetchOllamaModelsAction,
	isLoadingOllamaModelsAtom,
	ollamaModelsAtom,
} from "@/lib/ai/ollama/models";
import {
	fetchOpenRouterModels,
	isLoadingModelsAtom,
	openRouterModelsAtom,
} from "@/lib/ai/open-router/models";
import {
	activeConversationIdAtom,
	conversationsAtom,
} from "@/lib/stores/conversations";
import {
	encryptedGoogleApiKeyAtom,
	encryptedOllamaApiKeyAtom,
	encryptedOpenRouterApiKeyAtom,
	googleModelAtom,
	hasKeysAtom,
	isLockedAtom,
	masterPasswordAtom,
	ollamaModelAtom,
	openRouterModelAtom,
	PROVIDER_GOOGLE,
	PROVIDER_OLLAMA,
	PROVIDER_OPEN_ROUTER,
	PROVIDER_PROMPT_API,
	providerTypeAtom,
	setGoogleModel,
	setIsUnlockDialogOpen,
	setMasterPassword,
	setOllamaModel,
	setOpenRouterModel,
	setProviderType,
} from "@/lib/stores/settings";
import { cn } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import {
	Cpu,
	Loader2,
	Lock,
	Menu,
	PanelLeft,
	PanelLeftClose,
	Sparkles,
	Unlock,
	Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ChatHeaderProps {
	onMenuClick: () => void;
	isSidebarOpen?: boolean;
}

export const ChatHeader = ({
	onMenuClick,
	isSidebarOpen = false,
}: ChatHeaderProps) => {
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);

	const conversations = useStore(conversationsAtom);
	const activeConversationId = useStore(activeConversationIdAtom);
	const providerType = useStore(providerTypeAtom);
	const isLocked = useStore(isLockedAtom);

	const encryptedOpenRouterApiKey = useStore(encryptedOpenRouterApiKeyAtom);
	const encryptedGoogleApiKey = useStore(encryptedGoogleApiKeyAtom);
	const encryptedOllamaApiKey = useStore(encryptedOllamaApiKeyAtom);

	const openRouterModel = useStore(openRouterModelAtom);
	const googleModel = useStore(googleModelAtom);
	const ollamaModel = useStore(ollamaModelAtom);

	const openRouterModelsRaw = useStore(openRouterModelsAtom);
	const openRouterModels = useMemo(
		() => openRouterModelsRaw || [],
		[openRouterModelsRaw],
	);

	const googleModelsRaw = useStore(googleModelsAtom);
	const googleModels = useMemo(() => googleModelsRaw || [], [googleModelsRaw]);

	const ollamaModelsRaw = useStore(ollamaModelsAtom);
	const ollamaModels = useMemo(() => ollamaModelsRaw || [], [ollamaModelsRaw]);

	const isLoadingOpenRouter = useStore(isLoadingModelsAtom);
	const isLoadingGoogle = useStore(isLoadingGoogleModelsAtom);
	const isLoadingOllama = useStore(isLoadingOllamaModelsAtom);

	const masterPassword = useStore(masterPasswordAtom);
	const hasKeys = useStore(hasKeysAtom);

	// Load models on mount or when provider changes
	useEffect(() => {
		if (!hasMounted || isLocked) return;

		if (
			providerType === PROVIDER_OPEN_ROUTER &&
			openRouterModels.length === 0
		) {
			fetchOpenRouterModels();
		} else if (providerType === PROVIDER_GOOGLE && googleModels.length === 0) {
			fetchGoogleModels();
		} else if (providerType === PROVIDER_OLLAMA && ollamaModels.length === 0) {
			fetchOllamaModelsAction();
		}
	}, [
		hasMounted,
		providerType,
		isLocked,
		openRouterModels.length,
		googleModels.length,
		ollamaModels.length,
	]);

	const activeConversation = conversations.find(
		(c) => c.id === activeConversationId,
	);

	const currentProviderLabel = useMemo(() => {
		return (
			SUPPORTED_PROVIDERS.find((p) => p.id === providerType)?.label ||
			"Provider"
		);
	}, [providerType]);

	const currentModel =
		providerType === PROVIDER_OPEN_ROUTER
			? openRouterModel
			: providerType === PROVIDER_GOOGLE
				? googleModel
				: ollamaModel;

	const currentModels = useMemo(() => {
		return providerType === PROVIDER_OPEN_ROUTER
			? openRouterModels
			: providerType === PROVIDER_GOOGLE
				? googleModels
				: providerType === PROVIDER_OLLAMA
					? ollamaModels.map((m) => ({
							id: m.name || m.model,
							name: m.name || m.model,
							description: "",
						}))
					: [
							{
								id: "text",
								name: "Browser Gemini Nano",
								description: "Built-in AI",
							},
						];
	}, [providerType, openRouterModels, googleModels, ollamaModels]);

	const isLoadingModels =
		providerType === PROVIDER_OPEN_ROUTER
			? isLoadingOpenRouter
			: providerType === PROVIDER_GOOGLE
				? isLoadingGoogle
				: isLoadingOllama;

	const isUnlocked = !!masterPassword;

	const currentModelName = useMemo(() => {
		const model = currentModels.find((m) => m.id === currentModel);
		return model?.name || currentModel || "Select Model";
	}, [currentModels, currentModel]);

	return (
		<div className="flex w-full items-center justify-between gap-3 overflow-hidden">
			<div className="flex min-w-0 items-center gap-2">
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-9 w-9 shrink-0"
								onClick={onMenuClick}
								aria-expanded={isSidebarOpen}
								aria-controls="chat-sidebar"
								aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
							>
								<Menu className="h-5 w-5 lg:hidden" />
								{isSidebarOpen ? (
									<PanelLeftClose className="hidden h-5 w-5 lg:block" />
								) : (
									<PanelLeft className="hidden h-5 w-5 lg:block" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							{isSidebarOpen ? "Close sidebar" : "Open sidebar"}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<div className="flex min-w-0 items-center gap-2">
					<div className="from-primary to-primary/80 hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br shadow-sm transition-transform hover:scale-105 sm:flex">
						<Sparkles className="text-primary-foreground h-4 w-4" />
					</div>
					<div className="min-w-0">
						<h1 className="flex items-center gap-2 truncate text-sm leading-none font-semibold">
							{hasMounted ? (
								activeConversation?.isGeneratingTitle ? (
									<>
										<span className="inline-block truncate first-letter:uppercase">
											{activeConversation?.title ?? "New Chat"}
										</span>
										<span className="text-muted-foreground flex shrink-0 animate-pulse items-center gap-1 text-[10px] font-medium">
											<Loader2 className="h-2.5 w-2.5 animate-spin" />
											Generating title...
										</span>
									</>
								) : (
									<span className="inline-block truncate first-letter:uppercase">
										{activeConversation?.title ?? "New Chat"}
									</span>
								)
							) : (
								"New Chat"
							)}
						</h1>
					</div>
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				{hasMounted && (
					<div className="bg-muted/20 hover:bg-muted/30 focus-within:ring-primary/20 flex items-center gap-0.5 rounded-full border p-0.5 shadow-xs transition-all focus-within:ring-1">
						{/* Provider Selector */}
						<Select
							value={providerType}
							onValueChange={(value) => setProviderType(value as ProviderType)}
						>
							<SelectTrigger className="hover:bg-background/50 data-[state=open]:bg-background/80 h-7 gap-1.5 rounded-full border-none bg-transparent px-2.5 text-[10px] font-bold tracking-wider uppercase shadow-none transition-colors focus:ring-0">
								<div className="flex items-center gap-1.5 truncate">
									<Zap
										className={cn(
											"h-3 w-3 transition-colors",
											providerType === PROVIDER_OPEN_ROUTER
												? "fill-blue-500/20 text-blue-500"
												: providerType === PROVIDER_GOOGLE
													? "fill-red-500/20 text-red-500"
													: providerType === PROVIDER_OLLAMA
														? "fill-orange-500/20 text-orange-500"
														: "fill-purple-500/20 text-purple-500",
										)}
									/>
									<SelectValue placeholder="Provider">
										{currentProviderLabel}
									</SelectValue>
								</div>
							</SelectTrigger>
							<SelectContent align="end" className="min-w-[160px]">
								{SUPPORTED_PROVIDERS.map((p) => {
									const hasKey =
										p.id === PROVIDER_OPEN_ROUTER
											? !!encryptedOpenRouterApiKey
											: p.id === PROVIDER_GOOGLE
												? !!encryptedGoogleApiKey
												: p.id === PROVIDER_OLLAMA
													? !!encryptedOllamaApiKey
													: true;
									return (
										<SelectItem
											key={p.id}
											value={p.id}
											disabled={
												!hasKey &&
												p.id !== PROVIDER_OLLAMA &&
												p.id !== PROVIDER_PROMPT_API
											}
										>
											<div className="flex items-center gap-2">
												<div
													className={cn(
														"h-2 w-2 rounded-full",
														p.id === PROVIDER_OPEN_ROUTER
															? "bg-blue-500"
															: p.id === PROVIDER_GOOGLE
																? "bg-red-500"
																: p.id === PROVIDER_OLLAMA
																	? "bg-orange-500"
																	: "bg-purple-500",
													)}
												/>
												<span className="font-medium">{p.label}</span>
												{!hasKey &&
													p.id !== PROVIDER_OLLAMA &&
													p.id !== PROVIDER_PROMPT_API && (
														<span className="text-muted-foreground ml-auto text-[9px] font-bold uppercase opacity-50">
															Locked
														</span>
													)}
											</div>
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>

						<div className="bg-border mx-0.5 h-3 w-[1px] opacity-50" />

						{/* Model Selector */}
						<Select
							value={currentModel}
							onValueChange={(value) => {
								if (providerType === PROVIDER_OPEN_ROUTER)
									setOpenRouterModel(value);
								else if (providerType === PROVIDER_GOOGLE)
									setGoogleModel(value);
								else setOllamaModel(value);
							}}
							disabled={
								isLoadingModels ||
								isLocked ||
								(currentModels.length === 0 && !isLoadingModels)
							}
						>
							<SelectTrigger className="hover:bg-background/50 data-[state=open]:bg-background/80 h-7 max-w-[180px] gap-1.5 rounded-full border-none bg-transparent px-2.5 text-[11px] font-medium shadow-none transition-colors focus:ring-0">
								<div className="flex items-center gap-1.5 truncate">
									{isLoadingModels ? (
										<Loader2 className="text-primary h-3 w-3 animate-spin" />
									) : (
										<Cpu className="text-muted-foreground h-3 w-3" />
									)}
									<SelectValue
										placeholder={isLoadingModels ? "Loading..." : "Model"}
									>
										<div className="flex min-w-0 items-center gap-1.5">
											<span className="truncate">{currentModelName}</span>
											{isLocked &&
												((providerType === PROVIDER_OPEN_ROUTER &&
													encryptedOpenRouterApiKey) ||
													(providerType === PROVIDER_GOOGLE &&
														encryptedGoogleApiKey) ||
													(providerType === PROVIDER_OLLAMA &&
														encryptedOllamaApiKey)) && (
													<Lock className="h-2.5 w-2.5 shrink-0 opacity-50" />
												)}
										</div>
									</SelectValue>
								</div>
							</SelectTrigger>
							<SelectContent align="end" className="max-w-[320px]">
								{currentModels.length > 0 ? (
									currentModels.map((m) => (
										<SelectItem key={m.id} value={m.id}>
											<div className="flex flex-col gap-0.5 overflow-hidden py-0.5">
												<span className="truncate text-sm leading-none font-medium">
													{m.name || m.id}
												</span>
												{m.description && (
													<span className="text-muted-foreground line-clamp-1 text-[10px] opacity-70">
														{m.description}
													</span>
												)}
											</div>
										</SelectItem>
									))
								) : (
									<SelectItem value={currentModel} disabled>
										<div className="flex items-center gap-2 py-1">
											<Loader2 className="h-3 w-3 animate-spin" />
											<span className="text-xs">
												{isLocked
													? "Unlock session to load models"
													: "No models found"}
											</span>
										</div>
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</div>
				)}

				{hasMounted && (hasKeys || isUnlocked) && (
					<TooltipProvider delayDuration={0}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className={cn(
										"h-8 w-8 shrink-0 rounded-full border shadow-xs transition-all",
										isLocked
											? "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 animate-pulse"
											: "border-green-500/20 bg-green-500/10 text-green-600 hover:bg-green-500/20",
									)}
									onClick={() => {
										if (isLocked) {
											setIsUnlockDialogOpen(true);
										} else {
											setMasterPassword(null);
										}
									}}
								>
									{isLocked ? (
										<Lock className="h-4 w-4" />
									) : (
										<Unlock className="h-4 w-4" />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom" align="end">
								{isLocked
									? "Session Locked: Your API keys are encrypted. Click to unlock."
									: "Session Unlocked: Your API keys are available for use. Click to lock."}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
		</div>
	);
};
