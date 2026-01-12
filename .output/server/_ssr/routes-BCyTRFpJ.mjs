import { s as __toESM } from "../_rolldown.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom.mjs";
import { a as find, i as svg, n as stringify$1, o as hastToReact, r as html } from "../_libs/hastscript.mjs";
import { n as stringify } from "../_libs/comma-separated-tokens.mjs";
import { t as decodeNamedCharacterReference } from "../_libs/decode-named-character-reference.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router.mjs";
import { n as atom } from "../_libs/nanostores.mjs";
import { t as useStore } from "../_libs/@nanostores/react.mjs";
import { $ as providerTypeAtom, A as encryptedGoogleApiKeyAtom, At as useId, B as googleModelAtom, D as currentStreamAtom, Dt as useComposedRefs, E as createLucideIcon, Et as useCallbackRef, F as getDecryptedGoogleApiKey, G as lastUserMessageAtom, K as masterPasswordAtom, L as getDecryptedOpenRouterApiKey, M as encryptedOpenRouterApiKeyAtom, N as fileToImageAttachment, Ot as useControllableState, P as getAIManager, Q as pendingImagesAtom, R as getImages, S as confirmAction, T as createContextScope, U as isLockedAtom, V as hasKeysAtom, W as isStreamingAtom, X as ollamaModelAtom, Z as openRouterModelAtom, _ as clearPendingImages, a as Portal, b as composeEventHandlers, c as SUPPORTED_PROVIDERS, ct as setGoogleModel, et as removeMessagesFromTransaction, f as appendToStream, ft as setOllamaModel, ht as setProviderType, j as encryptedOllamaApiKeyAtom, k as dispatchDiscreteCustomEvent, kt as useFocusGuards, l as addMessage, lt as setMasterPassword, mt as setOpenRouterModel, n as DismissableLayer, nt as removePendingImage, o as Presence, q as messagesAtom, r as FocusScope, rt as resetSecuritySettings, s as Primitive, t as Button, u as addPendingImage, v as clearStream, x as composeRefs, xt as showSuccess, y as cn, yt as showError } from "./button-Dt876Ufa.mjs";
import { a as promptAction, n as Info, r as Input, t as CircleAlert } from "./input-Dp5uu2rT.mjs";
import { S as updateConversationTitle, _ as saveCurrentConversation, b as triggerTitleGeneration, c as deleteConversation, f as isConversationsHydratedAtom, h as restoreConversation, m as permanentlyDeleteConversation, n as activeChatIdAtom, o as conversationsAtom, p as isSyncingFromUrlAtom, r as archiveConversation, s as createConversation, t as TriangleAlert, v as setActiveChat, x as unarchiveConversation, y as switchConversation } from "./conversations-DrNMxTDL.mjs";
import { d as recordTokenUsage, f as recordToolCall, l as recordMessage, r as estimateTokens, t as X, u as recordResponse } from "./usage-xUoNdpW5.mjs";
import { t as Combination_default } from "../_libs/react-remove-scroll.mjs";
import { t as hideOthers } from "../_libs/aria-hidden.mjs";
import { a as Plus, c as fetchOpenRouterModels, d as isLoadingModelsAtom, f as isLoadingOllamaModelsAtom, h as openRouterModelsAtom, i as Lock, l as googleModelsAtom, n as Clock, o as fetchGoogleModels, p as ollamaModelsAtom, r as LoaderCircle, s as fetchOllamaModelsAction, t as Archive, u as isLoadingGoogleModelsAtom } from "./models-0RdEeAZv.mjs";
import { C as useDirection, S as useChatSearchParams, _ as Sparkles, b as createCollection, c as MessageSquare, d as ScrollArea, f as Select, g as SelectValue, h as SelectTrigger, i as ChevronDown, m as SelectItem, n as Arrow, o as Content, p as SelectContent, r as Check, s as Cpu, t as Anchor, u as Root2$1, v as Trash2, w as useNavigation, x as createPopperScope, y as Zap } from "./select-Bf4A7Fuq.mjs";
import { a as TooltipContent, i as Tooltip, n as ChartColumn, o as TooltipProvider, r as ChevronRight, s as TooltipTrigger, t as Bot } from "./tooltip-DsN8bmnd.mjs";
import { n as unreachable, t as ok } from "../_libs/devlop.mjs";
import { t as name } from "../_libs/estree-util-is-identifier-name.mjs";
import { t as require_cjs } from "../_libs/style-to-js.mjs";
import { n as VFileMessage, t as VFile } from "../_libs/vfile.mjs";
import { t as urlAttributes } from "../_libs/html-url-attributes.mjs";
import { t as trimLines } from "../_libs/trim-lines.mjs";
import { t as esm_default } from "../_libs/@ungap/structured-clone.mjs";
import { t as bail } from "../_libs/bail.mjs";
import { t as require_extend } from "../_libs/extend.mjs";
import { t as isPlainObject } from "../_libs/is-plain-obj.mjs";
import { t as trough } from "../_libs/trough.mjs";
import { t as ccount } from "../_libs/ccount.mjs";
import { t as escapeStringRegexp } from "../_libs/escape-string-regexp.mjs";
import { t as markdownTable } from "../_libs/markdown-table.mjs";
import { t as longestStreak } from "../_libs/longest-streak.mjs";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_cjs = /* @__PURE__ */ __toESM(require_cjs());
var import_extend = /* @__PURE__ */ __toESM(require_extend());
var __defProp = Object.defineProperty;
var __export = (all$1, symbols) => {
	let target = {};
	for (var name$1 in all$1) __defProp(target, name$1, {
		get: all$1[name$1],
		enumerable: true
	});
	if (symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var ArchiveRestore = createLucideIcon("archive-restore", [
	["rect", {
		width: "20",
		height: "5",
		x: "2",
		y: "3",
		rx: "1",
		key: "1wp1u1"
	}],
	["path", {
		d: "M4 8v11a2 2 0 0 0 2 2h2",
		key: "tvwodi"
	}],
	["path", {
		d: "M20 8v11a2 2 0 0 1-2 2h-2",
		key: "1gkqxj"
	}],
	["path", {
		d: "m9 15 3-3 3 3",
		key: "1pd0qc"
	}],
	["path", {
		d: "M12 12v9",
		key: "192myk"
	}]
]);
var CircleQuestionMark = createLucideIcon("circle-question-mark", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
var Copy = createLucideIcon("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]);
var EllipsisVertical = createLucideIcon("ellipsis-vertical", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "12",
		cy: "5",
		r: "1",
		key: "gxeob9"
	}],
	["circle", {
		cx: "12",
		cy: "19",
		r: "1",
		key: "lyex9k"
	}]
]);
var FileExclamationPoint = createLucideIcon("file-exclamation-point", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
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
var ImagePlus = createLucideIcon("image-plus", [
	["path", {
		d: "M16 5h6",
		key: "1vod17"
	}],
	["path", {
		d: "M19 2v6",
		key: "4bpg5p"
	}],
	["path", {
		d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
		key: "1ue2ih"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}]
]);
var LockOpen = createLucideIcon("lock-open", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 9.9-1",
	key: "1mm8w8"
}]]);
var Menu = createLucideIcon("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]);
var PanelLeftClose = createLucideIcon("panel-left-close", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M9 3v18",
		key: "fh3hqa"
	}],
	["path", {
		d: "m16 15-3-3 3-3",
		key: "14y99z"
	}]
]);
var PanelLeft = createLucideIcon("panel-left", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}], ["path", {
	d: "M9 3v18",
	key: "fh3hqa"
}]]);
var Pencil = createLucideIcon("pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]);
var RefreshCw = createLucideIcon("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]);
var RotateCcw = createLucideIcon("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]);
var Send = createLucideIcon("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]);
var Settings = createLucideIcon("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
var ShieldAlert = createLucideIcon("shield-alert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]);
var Square = createLucideIcon("square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]);
var User = createLucideIcon("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]);
var Wifi = createLucideIcon("wifi", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 20 0",
		key: "dnpr2z"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 14 0",
		key: "1x1e6c"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}]
]);
var ChatContainerUI = ({ sidebar, header, messageList, input, unlockSession, isLocked = false, errorBanner, isSidebarOpen = false, onCloseSidebar }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "chat-container",
		className: "flex h-screen w-full overflow-hidden bg-background",
		children: [
			sidebar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				id: "chat-sidebar",
				"data-testid": "chat-sidebar",
				"aria-label": "Conversation list",
				"aria-hidden": !isSidebarOpen,
				inert: !isSidebarOpen ? true : void 0,
				tabIndex: !isSidebarOpen ? -1 : void 0,
				className: cn("flex h-full w-72 shrink-0 flex-col border-r bg-sidebar transition-all duration-300 ease-in-out", "fixed left-0 top-0 z-40 lg:relative lg:z-auto", isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:ml-[-288px] lg:translate-x-0"),
				children: sidebar
			}),
			sidebar && isSidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-testid": "chat-sidebar-overlay",
				className: "fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden",
				onClick: onCloseSidebar,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				"data-testid": "chat-main",
				className: "flex min-w-0 flex-1 flex-col overflow-hidden",
				children: [
					header && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						"data-testid": "chat-header",
						className: "flex h-14 shrink-0 items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4",
						children: header
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-testid": "chat-message-list-container",
						className: "min-w-0 flex-1 overflow-hidden",
						children: isLocked ? unlockSession : messageList
					}),
					!isLocked && errorBanner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-testid": "chat-error-banner-container",
						className: "shrink-0",
						children: errorBanner
					}),
					!isLocked && input && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-testid": "chat-input-container",
						className: "shrink-0",
						children: input
					})
				]
			})
		]
	});
};
var TypingIndicator = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex items-center gap-1",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm text-muted-foreground",
		children: "Thinking"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce",
				style: {
					animationDelay: "0ms",
					animationDuration: "600ms"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce",
				style: {
					animationDelay: "150ms",
					animationDuration: "600ms"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce",
				style: {
					animationDelay: "300ms",
					animationDuration: "600ms"
				}
			})
		]
	})]
});
var ShimmerBar = ({ width, delay = 0 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "h-3 rounded-full bg-muted-foreground/10 overflow-hidden",
	style: { width },
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full w-full bg-linear-to-r from-transparent via-muted-foreground/20 to-transparent animate-shimmer",
		style: { animationDelay: `${delay}ms` }
	})
});
var MessageListUI = ({ children, isEmpty, isLoading = false, scrollRef }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
		"data-testid": "message-list",
		className: "h-full w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: scrollRef,
			className: "flex min-h-full min-w-0 flex-col",
			children: isEmpty && !isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-testid": "empty-chat-state",
				className: "flex flex-1 flex-col items-center justify-center px-4 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-10 w-10 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted shadow-sm ring-2 ring-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4 text-muted-foreground" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-testid": "empty-chat-title",
						className: "mb-2 text-2xl font-semibold tracking-tight",
						children: "How can I help you today?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-testid": "empty-chat-description",
						className: "max-w-md text-muted-foreground",
						children: "Start a conversation by typing a message below. I'm here to assist with questions, ideas, or anything else you'd like to explore."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-testid": "message-list-content",
				className: "flex-1 min-w-0 py-4",
				children: [children, isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-testid": "ai-typing-indicator",
					className: "flex gap-3 px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-primary/20 animate-ping" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-1 text-xs font-medium text-muted-foreground",
							children: "AI"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl rounded-tl-sm bg-muted px-4 py-3 min-w-[200px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerBar, {
										width: "85%",
										delay: 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerBar, {
										width: "70%",
										delay: 100
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerBar, {
										width: "45%",
										delay: 200
									})
								]
							})]
						})]
					})]
				})]
			})
		})
	});
};
var MessageItemUI = ({ content: content$2, role, images, isStreaming = false, isCopied = false, onCopy, onRegenerate, renderContent }) => {
	const isUser = role === "user";
	const isSystem = role === "system";
	const isError = isSystem && content$2.includes("❌");
	const hasImages = images && images.length > 0;
	const [lightboxImage, setLightboxImage] = (0, import_react.useState)(null);
	if (isSystem) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": `message-${role}`,
		className: "flex w-full justify-center px-4 py-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium border shadow-sm", isError ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-muted text-muted-foreground border-border"),
			children: [isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-hidden text-ellipsis",
				children: content$2
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [lightboxImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200",
		onClick: () => setLightboxImage(null),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			className: "absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white",
			onClick: (e) => {
				e.stopPropagation();
				setLightboxImage(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: lightboxImage.data,
			alt: lightboxImage.name || "Full size image",
			className: "max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200",
			onClick: (e) => e.stopPropagation()
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": `message-${role}`,
		className: cn("group flex w-full min-w-0 gap-3 px-4 py-4 overflow-hidden", isUser ? "flex-row-reverse" : "flex-row"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-testid": `message-avatar-${role}`,
			className: cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
			children: isUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex min-w-0 max-w-[80%] flex-col gap-1", isUser ? "items-end" : "items-start"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-testid": `message-sender-${role}`,
					className: "px-1 text-xs font-medium text-muted-foreground",
					children: isUser ? "You" : "AI"
				}),
				hasImages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex flex-wrap gap-2 mb-2", isUser ? "justify-end" : "justify-start"),
					children: images.map((image$2) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-xl border border-border shadow-sm",
						children: image$2.storedInDb && !image$2.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-32 w-32 flex-col items-center justify-center gap-2 bg-muted p-4 text-center text-muted-foreground animate-pulse",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl",
								children: "🖼️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: "Loading..."
							})]
						}) : image$2.stripped || !image$2.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-32 w-32 flex-col items-center justify-center gap-2 bg-muted p-4 text-center text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl",
								children: "🖼️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs",
								children: [
									image$2.name || "Image",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] opacity-70",
										children: "(not saved)"
									})
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: image$2.data,
							alt: image$2.name || "Attached image",
							className: "max-h-64 max-w-xs object-contain cursor-pointer hover:opacity-90 transition-opacity",
							onClick: () => setLightboxImage(image$2)
						})
					}, image$2.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-testid": `message-bubble-${role}`,
					className: cn("min-w-0 max-w-full overflow-hidden rounded-2xl px-4 py-3", isUser ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-testid": `message-content-${role}`,
						className: cn("prose prose-sm max-w-full *:max-w-full", isUser ? "prose-invert" : "dark:prose-invert"),
						children: [renderContent ? renderContent(content$2, isStreaming) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "m-0 whitespace-pre-wrap",
							children: content$2
						}), isStreaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-testid": "streaming-cursor",
							className: "ml-1 inline-block h-4 w-0.5 animate-pulse bg-current align-middle"
						})]
					})
				}),
				!isUser && !isStreaming && content$2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-testid": "message-actions",
					className: "flex items-center gap-0.5 px-1 opacity-0 transition-opacity group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
						delayDuration: 0,
						children: [onCopy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-testid": "copy-message-button",
								variant: "ghost",
								size: "icon",
								className: "h-7 w-7 text-muted-foreground hover:text-foreground",
								onClick: onCopy,
								children: isCopied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-green-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
							side: "bottom",
							children: isCopied ? "Copied!" : "Copy message"
						})] }), onRegenerate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-testid": "regenerate-button",
								variant: "ghost",
								size: "icon",
								className: "h-7 w-7 text-muted-foreground hover:text-foreground",
								onClick: onRegenerate,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
							side: "bottom",
							children: "Regenerate response"
						})] })]
					})
				})
			]
		})]
	})] });
};
var MessageItem = ({ message, isStreaming = false, onRegenerate, renderContent }) => {
	const [isCopied, setIsCopied] = (0, import_react.useState)(false);
	const [loadedImages, setLoadedImages] = (0, import_react.useState)(message.images);
	const messages = useStore(messagesAtom);
	const lastUserMessage = useStore(lastUserMessageAtom);
	(0, import_react.useEffect)(() => {
		const loadImagesFromDb = async () => {
			if (!message.images || message.images.length === 0) {
				setLoadedImages(void 0);
				return;
			}
			const imagesNeedingLoad = message.images.filter((img) => img.storedInDb && !img.data);
			if (imagesNeedingLoad.length === 0) {
				setLoadedImages(message.images);
				return;
			}
			try {
				const loadedFromDb = await getImages(imagesNeedingLoad.map((img) => img.id));
				setLoadedImages(message.images.map((img) => {
					if (img.storedInDb && !img.data) {
						const loaded = loadedFromDb.get(img.id);
						if (loaded) return {
							...img,
							data: loaded.data
						};
					}
					return img;
				}));
			} catch (error) {
				console.error("Failed to load images from IndexedDB:", error);
				setLoadedImages(message.images);
			}
		};
		loadImagesFromDb();
	}, [message.images]);
	const isLastAssistantMessage = message.role === "assistant" && messages[messages.length - 1]?.id === message.id;
	const handleCopy = (0, import_react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(message.content);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2e3);
		} catch {}
	}, [message.content]);
	const handleRegenerate = (0, import_react.useCallback)(() => {
		if (onRegenerate && lastUserMessage) {
			removeMessagesFromTransaction(lastUserMessage.transactionId);
			onRegenerate(lastUserMessage.content, lastUserMessage.transactionId);
		}
	}, [onRegenerate, lastUserMessage]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageItemUI, {
		content: message.content,
		role: message.role,
		images: loadedImages,
		isStreaming,
		isCopied,
		onCopy: handleCopy,
		onRegenerate: isLastAssistantMessage ? handleRegenerate : void 0,
		renderContent
	});
};
var MessageList = ({ onRegenerate, renderContent }) => {
	const messages = useStore(messagesAtom);
	const currentStream = useStore(currentStreamAtom);
	const isStreaming = useStore(isStreamingAtom);
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (scrollRef.current) {
			const behavior = isStreaming ? "auto" : "smooth";
			scrollRef.current.scrollIntoView({
				behavior,
				block: "end"
			});
		}
	}, [
		messages,
		currentStream,
		isStreaming
	]);
	const streamingMessage = isStreaming && currentStream ? {
		id: "streaming",
		transactionId: "streaming",
		role: "assistant",
		content: currentStream,
		timestamp: 0
	} : null;
	const allMessages = streamingMessage ? [...messages.filter((m) => m.id !== "streaming"), streamingMessage] : messages;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListUI, {
		isEmpty: messages.length === 0 && !isStreaming,
		isLoading: isStreaming && !currentStream,
		scrollRef,
		children: allMessages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageItem, {
			message,
			isStreaming: message.id === "streaming",
			onRegenerate,
			renderContent
		}, message.id))
	});
};
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
}
var ChatInputUI = ({ value, onChange, onSubmit, onStop, onImageSelect, onRemoveImage, pendingImages = [], isLoading = false, isDisabled = false, placeholder = "Type your message..." }) => {
	const fileInputRef = (0, import_react.useRef)(null);
	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (!isLoading && !isDisabled && (value.trim() || pendingImages.length > 0)) onSubmit();
		}
	};
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			onImageSelect?.(e.target.files);
			e.target.value = "";
		}
	};
	const handleImageButtonClick = () => {
		fileInputRef.current?.click();
	};
	const canSubmit = value.trim() || pendingImages.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "chat-input",
		className: "shrink-0 border-t bg-background p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [
				pendingImages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-testid": "pending-images",
					className: "mb-3 flex flex-wrap gap-2",
					children: pendingImages.map((image$2) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-testid": `pending-image-${image$2.id}`,
						className: "group relative h-20 w-20 overflow-hidden rounded-lg border-2 border-border bg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: image$2.data,
								alt: image$2.name || "Attached image",
								className: "h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": `remove-image-${image$2.id}`,
								onClick: () => onRemoveImage?.(image$2.id),
								className: "absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-md",
								"aria-label": "Remove image",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							}),
							image$2.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-x-0 bottom-0 truncate bg-black/50 px-1 py-0.5 text-[10px] text-white",
								children: image$2.name
							})
						]
					}, image$2.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInputRef,
							"data-testid": "image-file-input",
							type: "file",
							accept: "image/jpeg,image/png,image/gif,image/webp",
							multiple: true,
							className: "hidden",
							onChange: handleFileChange
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							"data-testid": "attach-image-button",
							size: "icon",
							variant: "outline",
							onClick: handleImageButtonClick,
							disabled: isDisabled || isLoading,
							className: "h-[52px] w-[52px] shrink-0 rounded-xl transition-none",
							title: "Attach image",
							"aria-label": "Attach image",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-testid": "chat-textarea",
								value,
								onChange: (e) => onChange(e.target.value),
								onKeyDown: handleKeyDown,
								placeholder: pendingImages.length > 0 ? "Add a message about the image(s)..." : placeholder,
								disabled: isDisabled,
								className: cn("min-h-[52px] max-h-[200px] resize-none py-3.5 px-4", "rounded-xl border-2 border-input bg-background dark:bg-input/30", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0", "transition-none"),
								rows: 1
							})
						}),
						isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							"data-testid": "stop-button",
							size: "icon",
							variant: "destructive",
							onClick: onStop,
							className: "h-[52px] w-[52px] shrink-0 rounded-xl transition-none",
							"aria-label": "Stop generating",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-5 w-5" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							"data-testid": "send-button",
							size: "icon",
							onClick: onSubmit,
							disabled: isDisabled || !canSubmit,
							className: "h-[52px] w-[52px] shrink-0 rounded-xl transition-none",
							"aria-label": "Send message",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-5 w-5" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-testid": "chat-input-hint",
					className: "mt-2 text-center text-xs text-muted-foreground",
					children: [
						"Press",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded bg-muted px-1 py-0.5",
							children: "Enter"
						}),
						" to send,",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded bg-muted px-1 py-0.5",
							children: "Shift + Enter"
						}),
						" ",
						"for new line"
					]
				})
			]
		})
	});
};
var inputAtom = /* @__PURE__ */ atom("");
var ChatInput = ({ onSend, onStop, isDisabled = false }) => {
	const input = useStore(inputAtom);
	const isStreaming = useStore(isStreamingAtom);
	const pendingImages = useStore(pendingImagesAtom);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatInputUI, {
		value: input,
		onChange: (0, import_react.useCallback)((value) => {
			inputAtom.set(value);
		}, []),
		onSubmit: (0, import_react.useCallback)(() => {
			const trimmedInput = input.trim();
			const images = pendingImages.length > 0 ? [...pendingImages] : void 0;
			if (trimmedInput || images) {
				onSend(trimmedInput || "What's in this image?", images);
				inputAtom.set("");
				clearPendingImages();
			}
		}, [
			input,
			pendingImages,
			onSend
		]),
		onStop,
		onImageSelect: (0, import_react.useCallback)(async (files) => {
			const imagePromises = Array.from(files).map((file) => {
				if (!file.type.startsWith("image/")) {
					console.warn(`Skipping non-image file: ${file.name}`);
					return null;
				}
				if (file.size > 10 * 1024 * 1024) {
					console.warn(`Skipping large file: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`);
					return null;
				}
				return fileToImageAttachment(file);
			});
			const images = (await Promise.all(imagePromises)).filter(Boolean);
			for (const image$2 of images) addPendingImage(image$2);
		}, []),
		onRemoveImage: (0, import_react.useCallback)((id) => {
			removePendingImage(id);
		}, []),
		pendingImages,
		isLoading: isStreaming,
		isDisabled
	});
};
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var GROUP_NAME$2 = "RovingFocusGroup";
var [Collection$1, useCollection$1, createCollectionScope$1] = createCollection(GROUP_NAME$2);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME$2, [createCollectionScope$1]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME$2);
var RovingFocusGroup = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.Provider, {
		scope: props.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.Slot, {
			scope: props.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, {
				...props,
				ref: forwardedRef
			})
		})
	});
});
RovingFocusGroup.displayName = GROUP_NAME$2;
var RovingFocusGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const direction = useDirection(dir);
	const [currentTabStopId, setCurrentTabStopId] = useControllableState({
		prop: currentTabStopIdProp,
		defaultProp: defaultCurrentTabStopId ?? null,
		onChange: onCurrentTabStopIdChange,
		caller: GROUP_NAME$2
	});
	const [isTabbingBackOut, setIsTabbingBackOut] = import_react.useState(false);
	const handleEntryFocus = useCallbackRef(onEntryFocus);
	const getItems = useCollection$1(__scopeRovingFocusGroup);
	const isClickFocusRef = import_react.useRef(false);
	const [focusableItemsCount, setFocusableItemsCount] = import_react.useState(0);
	import_react.useEffect(() => {
		const node$1 = ref.current;
		if (node$1) {
			node$1.addEventListener(ENTRY_FOCUS, handleEntryFocus);
			return () => node$1.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
		}
	}, [handleEntryFocus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusProvider, {
		scope: __scopeRovingFocusGroup,
		orientation,
		dir: direction,
		loop,
		currentTabStopId,
		onItemFocus: import_react.useCallback((tabStopId) => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]),
		onItemShiftTab: import_react.useCallback(() => setIsTabbingBackOut(true), []),
		onFocusableItemAdd: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount + 1), []),
		onFocusableItemRemove: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount - 1), []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
			"data-orientation": orientation,
			...groupProps,
			ref: composedRefs,
			style: {
				outline: "none",
				...props.style
			},
			onMouseDown: composeEventHandlers(props.onMouseDown, () => {
				isClickFocusRef.current = true;
			}),
			onFocus: composeEventHandlers(props.onFocus, (event) => {
				const isKeyboardFocus = !isClickFocusRef.current;
				if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
					const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
					event.currentTarget.dispatchEvent(entryFocusEvent);
					if (!entryFocusEvent.defaultPrevented) {
						const items = getItems().filter((item) => item.focusable);
						focusFirst$1([
							items.find((item) => item.active),
							items.find((item) => item.id === currentTabStopId),
							...items
						].filter(Boolean).map((item) => item.ref.current), preventScrollOnEntryFocus);
					}
				}
				isClickFocusRef.current = false;
			}),
			onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
		})
	});
});
var ITEM_NAME$2 = "RovingFocusGroupItem";
var RovingFocusGroupItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
	const autoId = useId();
	const id = tabStopId || autoId;
	const context = useRovingFocusContext(ITEM_NAME$2, __scopeRovingFocusGroup);
	const isCurrentTabStop = context.currentTabStopId === id;
	const getItems = useCollection$1(__scopeRovingFocusGroup);
	const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
	import_react.useEffect(() => {
		if (focusable) {
			onFocusableItemAdd();
			return () => onFocusableItemRemove();
		}
	}, [
		focusable,
		onFocusableItemAdd,
		onFocusableItemRemove
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.ItemSlot, {
		scope: __scopeRovingFocusGroup,
		id,
		focusable,
		active,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			tabIndex: isCurrentTabStop ? 0 : -1,
			"data-orientation": context.orientation,
			...itemProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!focusable) event.preventDefault();
				else context.onItemFocus(id);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (event.key === "Tab" && event.shiftKey) {
					context.onItemShiftTab();
					return;
				}
				if (event.target !== event.currentTarget) return;
				const focusIntent = getFocusIntent(event, context.orientation, context.dir);
				if (focusIntent !== void 0) {
					if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
					event.preventDefault();
					let candidateNodes = getItems().filter((item) => item.focusable).map((item) => item.ref.current);
					if (focusIntent === "last") candidateNodes.reverse();
					else if (focusIntent === "prev" || focusIntent === "next") {
						if (focusIntent === "prev") candidateNodes.reverse();
						const currentIndex = candidateNodes.indexOf(event.currentTarget);
						candidateNodes = context.loop ? wrapArray$1(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
					}
					setTimeout(() => focusFirst$1(candidateNodes));
				}
			}),
			children: typeof children === "function" ? children({
				isCurrentTabStop,
				hasTabStop: currentTabStopId != null
			}) : children
		})
	});
});
RovingFocusGroupItem.displayName = ITEM_NAME$2;
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst$1(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray$1(array, startIndex) {
	return array.map((_, index$1) => array[(startIndex + index$1) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
/* @__NO_SIDE_EFFECTS__ */
function createSlot(ownerName) {
	const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
	const Slot2 = import_react.forwardRef((props, forwardedRef) => {
		const { children, ...slotProps } = props;
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
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone(ownerName) {
	const SlotClone = import_react.forwardRef((props, forwardedRef) => {
		const { children, ...slotProps } = props;
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
function getElementRef(element$1) {
	let getter = Object.getOwnPropertyDescriptor(element$1.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element$1.ref;
	getter = Object.getOwnPropertyDescriptor(element$1, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element$1.props.ref;
	return element$1.props.ref || element$1.ref;
}
var SELECTION_KEYS = ["Enter", " "];
var FIRST_KEYS = [
	"ArrowDown",
	"PageUp",
	"Home"
];
var LAST_KEYS = [
	"ArrowUp",
	"PageDown",
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
	ltr: [...SELECTION_KEYS, "ArrowRight"],
	rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
};
var MENU_NAME = "Menu";
var [Collection, useCollection, createCollectionScope] = createCollection(MENU_NAME);
var [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
	createCollectionScope,
	createPopperScope,
	createRovingFocusGroupScope
]);
var usePopperScope = createPopperScope();
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
var Menu$1 = (props) => {
	const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
	const popperScope = usePopperScope(__scopeMenu);
	const [content$2, setContent] = import_react.useState(null);
	const isUsingKeyboardRef = import_react.useRef(false);
	const handleOpenChange = useCallbackRef(onOpenChange);
	const direction = useDirection(dir);
	import_react.useEffect(() => {
		const handleKeyDown = () => {
			isUsingKeyboardRef.current = true;
			document.addEventListener("pointerdown", handlePointer, {
				capture: true,
				once: true
			});
			document.addEventListener("pointermove", handlePointer, {
				capture: true,
				once: true
			});
		};
		const handlePointer = () => isUsingKeyboardRef.current = false;
		document.addEventListener("keydown", handleKeyDown, { capture: true });
		return () => {
			document.removeEventListener("keydown", handleKeyDown, { capture: true });
			document.removeEventListener("pointerdown", handlePointer, { capture: true });
			document.removeEventListener("pointermove", handlePointer, { capture: true });
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuProvider, {
			scope: __scopeMenu,
			open,
			onOpenChange: handleOpenChange,
			content: content$2,
			onContentChange: setContent,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootProvider, {
				scope: __scopeMenu,
				onClose: import_react.useCallback(() => handleOpenChange(false), [handleOpenChange]),
				isUsingKeyboardRef,
				dir: direction,
				modal,
				children
			})
		})
	});
};
Menu$1.displayName = MENU_NAME;
var ANCHOR_NAME = "MenuAnchor";
var MenuAnchor = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...anchorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
		...usePopperScope(__scopeMenu),
		...anchorProps,
		ref: forwardedRef
	});
});
MenuAnchor.displayName = ANCHOR_NAME;
var PORTAL_NAME$1 = "MenuPortal";
var [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME$1, { forceMount: void 0 });
var MenuPortal = (props) => {
	const { __scopeMenu, forceMount, children, container } = props;
	const context = useMenuContext(PORTAL_NAME$1, __scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: __scopeMenu,
		forceMount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
				asChild: true,
				container,
				children
			})
		})
	});
};
MenuPortal.displayName = PORTAL_NAME$1;
var CONTENT_NAME$1 = "MenuContent";
var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME$1);
var MenuContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeMenu,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeMenu,
				children: rootContext.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContentModal, {
					...contentProps,
					ref: forwardedRef
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContentNonModal, {
					...contentProps,
					ref: forwardedRef
				})
			})
		})
	});
});
var MenuRootContentModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	import_react.useEffect(() => {
		const content$2 = ref.current;
		if (content$2) return hideOthers(content$2);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
		...props,
		ref: composedRefs,
		trapFocus: context.open,
		disableOutsidePointerEvents: context.open,
		disableOutsideScroll: true,
		onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault(), { checkForDefaultPrevented: false }),
		onDismiss: () => context.onOpenChange(false)
	});
});
var MenuRootContentNonModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		disableOutsideScroll: false,
		onDismiss: () => context.onOpenChange(false)
	});
});
var Slot = /* @__PURE__ */ createSlot("MenuContent.ScrollLock");
var MenuContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, loop = false, trapFocus, onOpenAutoFocus, onCloseAutoFocus, disableOutsidePointerEvents, onEntryFocus, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, disableOutsideScroll, ...contentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, __scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, __scopeMenu);
	const popperScope = usePopperScope(__scopeMenu);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
	const getItems = useCollection(__scopeMenu);
	const [currentItemId, setCurrentItemId] = import_react.useState(null);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
	const timerRef = import_react.useRef(0);
	const searchRef = import_react.useRef("");
	const pointerGraceTimerRef = import_react.useRef(0);
	const pointerGraceIntentRef = import_react.useRef(null);
	const pointerDirRef = import_react.useRef("right");
	const lastPointerXRef = import_react.useRef(0);
	const ScrollLockWrapper = disableOutsideScroll ? Combination_default : import_react.Fragment;
	const scrollLockWrapperProps = disableOutsideScroll ? {
		as: Slot,
		allowPinchZoom: true
	} : void 0;
	const handleTypeaheadSearch = (key) => {
		const search$1 = searchRef.current + key;
		const items = getItems().filter((item) => !item.disabled);
		const currentItem = document.activeElement;
		const currentMatch = items.find((item) => item.ref.current === currentItem)?.textValue;
		const nextMatch = getNextMatch(items.map((item) => item.textValue), search$1, currentMatch);
		const newItem = items.find((item) => item.textValue === nextMatch)?.ref.current;
		(function updateSearch(value) {
			searchRef.current = value;
			window.clearTimeout(timerRef.current);
			if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
		})(search$1);
		if (newItem) setTimeout(() => newItem.focus());
	};
	import_react.useEffect(() => {
		return () => window.clearTimeout(timerRef.current);
	}, []);
	useFocusGuards();
	const isPointerMovingToSubmenu = import_react.useCallback((event) => {
		return pointerDirRef.current === pointerGraceIntentRef.current?.side && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentProvider, {
		scope: __scopeMenu,
		searchRef,
		onItemEnter: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) event.preventDefault();
		}, [isPointerMovingToSubmenu]),
		onItemLeave: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) return;
			contentRef.current?.focus();
			setCurrentItemId(null);
		}, [isPointerMovingToSubmenu]),
		onTriggerLeave: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) event.preventDefault();
		}, [isPointerMovingToSubmenu]),
		pointerGraceTimerRef,
		onPointerGraceIntentChange: import_react.useCallback((intent) => {
			pointerGraceIntentRef.current = intent;
		}, []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollLockWrapper, {
			...scrollLockWrapperProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
				asChild: true,
				trapped: trapFocus,
				onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
					event.preventDefault();
					contentRef.current?.focus({ preventScroll: true });
				}),
				onUnmountAutoFocus: onCloseAutoFocus,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
					asChild: true,
					disableOutsidePointerEvents,
					onEscapeKeyDown,
					onPointerDownOutside,
					onFocusOutside,
					onInteractOutside,
					onDismiss,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
						asChild: true,
						...rovingFocusGroupScope,
						dir: rootContext.dir,
						orientation: "vertical",
						loop,
						currentTabStopId: currentItemId,
						onCurrentTabStopIdChange: setCurrentItemId,
						onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
							if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
						}),
						preventScrollOnEntryFocus: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": getOpenState(context.open),
							"data-radix-menu-content": "",
							dir: rootContext.dir,
							...popperScope,
							...contentProps,
							ref: composedRefs,
							style: {
								outline: "none",
								...contentProps.style
							},
							onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
								const isKeyDownInside = event.target.closest("[data-radix-menu-content]") === event.currentTarget;
								const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
								const isCharacterKey = event.key.length === 1;
								if (isKeyDownInside) {
									if (event.key === "Tab") event.preventDefault();
									if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
								}
								const content$2 = contentRef.current;
								if (event.target !== content$2) return;
								if (!FIRST_LAST_KEYS.includes(event.key)) return;
								event.preventDefault();
								const candidateNodes = getItems().filter((item) => !item.disabled).map((item) => item.ref.current);
								if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
								focusFirst(candidateNodes);
							}),
							onBlur: composeEventHandlers(props.onBlur, (event) => {
								if (!event.currentTarget.contains(event.target)) {
									window.clearTimeout(timerRef.current);
									searchRef.current = "";
								}
							}),
							onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
								const target = event.target;
								const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
								if (event.currentTarget.contains(target) && pointerXHasChanged) {
									pointerDirRef.current = event.clientX > lastPointerXRef.current ? "right" : "left";
									lastPointerXRef.current = event.clientX;
								}
							}))
						})
					})
				})
			})
		})
	});
});
MenuContent.displayName = CONTENT_NAME$1;
var GROUP_NAME$1 = "MenuGroup";
var MenuGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...groupProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		role: "group",
		...groupProps,
		ref: forwardedRef
	});
});
MenuGroup.displayName = GROUP_NAME$1;
var LABEL_NAME$1 = "MenuLabel";
var MenuLabel = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...labelProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...labelProps,
		ref: forwardedRef
	});
});
MenuLabel.displayName = LABEL_NAME$1;
var ITEM_NAME$1 = "MenuItem";
var ITEM_SELECT = "menu.itemSelect";
var MenuItem = import_react.forwardRef((props, forwardedRef) => {
	const { disabled = false, onSelect, ...itemProps } = props;
	const ref = import_react.useRef(null);
	const rootContext = useMenuRootContext(ITEM_NAME$1, props.__scopeMenu);
	const contentContext = useMenuContentContext(ITEM_NAME$1, props.__scopeMenu);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const isPointerDownRef = import_react.useRef(false);
	const handleSelect = () => {
		const menuItem = ref.current;
		if (!disabled && menuItem) {
			const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
				bubbles: true,
				cancelable: true
			});
			menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), { once: true });
			dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
			if (itemSelectEvent.defaultPrevented) isPointerDownRef.current = false;
			else rootContext.onClose();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemImpl, {
		...itemProps,
		ref: composedRefs,
		disabled,
		onClick: composeEventHandlers(props.onClick, handleSelect),
		onPointerDown: (event) => {
			props.onPointerDown?.(event);
			isPointerDownRef.current = true;
		},
		onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
			if (!isPointerDownRef.current) event.currentTarget?.click();
		}),
		onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
			const isTypingAhead = contentContext.searchRef.current !== "";
			if (disabled || isTypingAhead && event.key === " ") return;
			if (SELECTION_KEYS.includes(event.key)) {
				event.currentTarget.click();
				event.preventDefault();
			}
		})
	});
});
MenuItem.displayName = ITEM_NAME$1;
var MenuItemImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
	const contentContext = useMenuContentContext(ITEM_NAME$1, __scopeMenu);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const [isFocused, setIsFocused] = import_react.useState(false);
	const [textContent, setTextContent] = import_react.useState("");
	import_react.useEffect(() => {
		const menuItem = ref.current;
		if (menuItem) setTextContent((menuItem.textContent ?? "").trim());
	}, [itemProps.children]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeMenu,
		disabled,
		textValue: textValue ?? textContent,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
			asChild: true,
			...rovingFocusGroupScope,
			focusable: !disabled,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				role: "menuitem",
				"data-highlighted": isFocused ? "" : void 0,
				"aria-disabled": disabled || void 0,
				"data-disabled": disabled ? "" : void 0,
				...itemProps,
				ref: composedRefs,
				onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
					if (disabled) contentContext.onItemLeave(event);
					else {
						contentContext.onItemEnter(event);
						if (!event.defaultPrevented) event.currentTarget.focus({ preventScroll: true });
					}
				})),
				onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => contentContext.onItemLeave(event))),
				onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
				onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
			})
		})
	});
});
var CHECKBOX_ITEM_NAME$1 = "MenuCheckboxItem";
var MenuCheckboxItem = import_react.forwardRef((props, forwardedRef) => {
	const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicatorProvider, {
		scope: props.__scopeMenu,
		checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			role: "menuitemcheckbox",
			"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
			...checkboxItemProps,
			ref: forwardedRef,
			"data-state": getCheckedState(checked),
			onSelect: composeEventHandlers(checkboxItemProps.onSelect, () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked), { checkForDefaultPrevented: false })
		})
	});
});
MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME$1;
var RADIO_GROUP_NAME$1 = "MenuRadioGroup";
var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(RADIO_GROUP_NAME$1, {
	value: void 0,
	onValueChange: () => {}
});
var MenuRadioGroup = import_react.forwardRef((props, forwardedRef) => {
	const { value, onValueChange, ...groupProps } = props;
	const handleValueChange = useCallbackRef(onValueChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, {
		scope: props.__scopeMenu,
		value,
		onValueChange: handleValueChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroup, {
			...groupProps,
			ref: forwardedRef
		})
	});
});
MenuRadioGroup.displayName = RADIO_GROUP_NAME$1;
var RADIO_ITEM_NAME$1 = "MenuRadioItem";
var MenuRadioItem = import_react.forwardRef((props, forwardedRef) => {
	const { value, ...radioItemProps } = props;
	const context = useRadioGroupContext(RADIO_ITEM_NAME$1, props.__scopeMenu);
	const checked = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicatorProvider, {
		scope: props.__scopeMenu,
		checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			role: "menuitemradio",
			"aria-checked": checked,
			...radioItemProps,
			ref: forwardedRef,
			"data-state": getCheckedState(checked),
			onSelect: composeEventHandlers(radioItemProps.onSelect, () => context.onValueChange?.(value), { checkForDefaultPrevented: false })
		})
	});
});
MenuRadioItem.displayName = RADIO_ITEM_NAME$1;
var ITEM_INDICATOR_NAME = "MenuItemIndicator";
var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(ITEM_INDICATOR_NAME, { checked: false });
var MenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
	const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			...itemIndicatorProps,
			ref: forwardedRef,
			"data-state": getCheckedState(indicatorContext.checked)
		})
	});
});
MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SEPARATOR_NAME$1 = "MenuSeparator";
var MenuSeparator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...separatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...separatorProps,
		ref: forwardedRef
	});
});
MenuSeparator.displayName = SEPARATOR_NAME$1;
var ARROW_NAME$1 = "MenuArrow";
var MenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...arrowProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
		...usePopperScope(__scopeMenu),
		...arrowProps,
		ref: forwardedRef
	});
});
MenuArrow.displayName = ARROW_NAME$1;
var SUB_NAME = "MenuSub";
var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
var MenuSub = (props) => {
	const { __scopeMenu, children, open = false, onOpenChange } = props;
	const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
	const popperScope = usePopperScope(__scopeMenu);
	const [trigger, setTrigger] = import_react.useState(null);
	const [content$2, setContent] = import_react.useState(null);
	const handleOpenChange = useCallbackRef(onOpenChange);
	import_react.useEffect(() => {
		if (parentMenuContext.open === false) handleOpenChange(false);
		return () => handleOpenChange(false);
	}, [parentMenuContext.open, handleOpenChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuProvider, {
			scope: __scopeMenu,
			open,
			onOpenChange: handleOpenChange,
			content: content$2,
			onContentChange: setContent,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSubProvider, {
				scope: __scopeMenu,
				contentId: useId(),
				triggerId: useId(),
				trigger,
				onTriggerChange: setTrigger,
				children
			})
		})
	});
};
MenuSub.displayName = SUB_NAME;
var SUB_TRIGGER_NAME$1 = "MenuSubTrigger";
var MenuSubTrigger = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const subContext = useMenuSubContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const contentContext = useMenuContentContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const openTimerRef = import_react.useRef(null);
	const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
	const scope = { __scopeMenu: props.__scopeMenu };
	const clearOpenTimer = import_react.useCallback(() => {
		if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
		openTimerRef.current = null;
	}, []);
	import_react.useEffect(() => clearOpenTimer, [clearOpenTimer]);
	import_react.useEffect(() => {
		const pointerGraceTimer = pointerGraceTimerRef.current;
		return () => {
			window.clearTimeout(pointerGraceTimer);
			onPointerGraceIntentChange(null);
		};
	}, [pointerGraceTimerRef, onPointerGraceIntentChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuAnchor, {
		asChild: true,
		...scope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemImpl, {
			id: subContext.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": context.open,
			"aria-controls": subContext.contentId,
			"data-state": getOpenState(context.open),
			...props,
			ref: composeRefs(forwardedRef, subContext.onTriggerChange),
			onClick: (event) => {
				props.onClick?.(event);
				if (props.disabled || event.defaultPrevented) return;
				event.currentTarget.focus();
				if (!context.open) context.onOpenChange(true);
			},
			onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
				contentContext.onItemEnter(event);
				if (event.defaultPrevented) return;
				if (!props.disabled && !context.open && !openTimerRef.current) {
					contentContext.onPointerGraceIntentChange(null);
					openTimerRef.current = window.setTimeout(() => {
						context.onOpenChange(true);
						clearOpenTimer();
					}, 100);
				}
			})),
			onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => {
				clearOpenTimer();
				const contentRect = context.content?.getBoundingClientRect();
				if (contentRect) {
					const side = context.content?.dataset.side;
					const rightSide = side === "right";
					const bleed = rightSide ? -5 : 5;
					const contentNearEdge = contentRect[rightSide ? "left" : "right"];
					const contentFarEdge = contentRect[rightSide ? "right" : "left"];
					contentContext.onPointerGraceIntentChange({
						area: [
							{
								x: event.clientX + bleed,
								y: event.clientY
							},
							{
								x: contentNearEdge,
								y: contentRect.top
							},
							{
								x: contentFarEdge,
								y: contentRect.top
							},
							{
								x: contentFarEdge,
								y: contentRect.bottom
							},
							{
								x: contentNearEdge,
								y: contentRect.bottom
							}
						],
						side
					});
					window.clearTimeout(pointerGraceTimerRef.current);
					pointerGraceTimerRef.current = window.setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
				} else {
					contentContext.onTriggerLeave(event);
					if (event.defaultPrevented) return;
					contentContext.onPointerGraceIntentChange(null);
				}
			})),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				const isTypingAhead = contentContext.searchRef.current !== "";
				if (props.disabled || isTypingAhead && event.key === " ") return;
				if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
					context.onOpenChange(true);
					context.content?.focus();
					event.preventDefault();
				}
			})
		})
	});
});
MenuSubTrigger.displayName = SUB_TRIGGER_NAME$1;
var SUB_CONTENT_NAME$1 = "MenuSubContent";
var MenuSubContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
	const { forceMount = portalContext.forceMount, ...subContentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
	const subContext = useMenuSubContext(SUB_CONTENT_NAME$1, props.__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeMenu,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeMenu,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
					id: subContext.contentId,
					"aria-labelledby": subContext.triggerId,
					...subContentProps,
					ref: composedRefs,
					align: "start",
					side: rootContext.dir === "rtl" ? "left" : "right",
					disableOutsidePointerEvents: false,
					disableOutsideScroll: false,
					trapFocus: false,
					onOpenAutoFocus: (event) => {
						if (rootContext.isUsingKeyboardRef.current) ref.current?.focus();
						event.preventDefault();
					},
					onCloseAutoFocus: (event) => event.preventDefault(),
					onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
						if (event.target !== subContext.trigger) context.onOpenChange(false);
					}),
					onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
						rootContext.onClose();
						event.preventDefault();
					}),
					onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
						const isKeyDownInside = event.currentTarget.contains(event.target);
						const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
						if (isKeyDownInside && isCloseKey) {
							context.onOpenChange(false);
							subContext.trigger?.focus();
							event.preventDefault();
						}
					})
				})
			})
		})
	});
});
MenuSubContent.displayName = SUB_CONTENT_NAME$1;
function getOpenState(open) {
	return open ? "open" : "closed";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getCheckedState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst(candidates) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus();
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray(array, startIndex) {
	return array.map((_, index$1) => array[(startIndex + index$1) % array.length]);
}
function getNextMatch(values, search$1, currentMatch) {
	const normalizedSearch = search$1.length > 1 && Array.from(search$1).every((char) => char === search$1[0]) ? search$1[0] : search$1;
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
	if (normalizedSearch.length === 1) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}
function isPointInPolygon(point$3, polygon) {
	const { x, y } = point$3;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const ii = polygon[i];
		const jj = polygon[j];
		const xi = ii.x;
		const yi = ii.y;
		const xj = jj.x;
		const yj = jj.y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function isPointerInGraceArea(event, area) {
	if (!area) return false;
	return isPointInPolygon({
		x: event.clientX,
		y: event.clientY
	}, area);
}
function whenMouse(handler) {
	return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
var Root3 = Menu$1;
var Anchor2 = MenuAnchor;
var Portal$1 = MenuPortal;
var Content2$1 = MenuContent;
var Group = MenuGroup;
var Label = MenuLabel;
var Item2$1 = MenuItem;
var CheckboxItem = MenuCheckboxItem;
var RadioGroup = MenuRadioGroup;
var RadioItem = MenuRadioItem;
var ItemIndicator = MenuItemIndicator;
var Separator = MenuSeparator;
var Arrow2 = MenuArrow;
var SubTrigger = MenuSubTrigger;
var SubContent = MenuSubContent;
var DROPDOWN_MENU_NAME = "DropdownMenu";
var [createDropdownMenuContext, createDropdownMenuScope] = createContextScope(DROPDOWN_MENU_NAME, [createMenuScope]);
var useMenuScope = createMenuScope();
var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
var DropdownMenu$1 = (props) => {
	const { __scopeDropdownMenu, children, dir, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const triggerRef = import_react.useRef(null);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DROPDOWN_MENU_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuProvider, {
		scope: __scopeDropdownMenu,
		triggerId: useId(),
		triggerRef,
		contentId: useId(),
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, {
			...menuScope,
			open,
			onOpenChange: setOpen,
			dir,
			modal,
			children
		})
	});
};
DropdownMenu$1.displayName = DROPDOWN_MENU_NAME;
var TRIGGER_NAME = "DropdownMenuTrigger";
var DropdownMenuTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
	const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor2, {
		asChild: true,
		...useMenuScope(__scopeDropdownMenu),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			id: context.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": context.open,
			"aria-controls": context.open ? context.contentId : void 0,
			"data-state": context.open ? "open" : "closed",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			...triggerProps,
			ref: composeRefs(forwardedRef, context.triggerRef),
			onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) {
					context.onOpenToggle();
					if (!context.open) event.preventDefault();
				}
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (disabled) return;
				if (["Enter", " "].includes(event.key)) context.onOpenToggle();
				if (event.key === "ArrowDown") context.onOpenChange(true);
				if ([
					"Enter",
					" ",
					"ArrowDown"
				].includes(event.key)) event.preventDefault();
			})
		})
	});
});
DropdownMenuTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DropdownMenuPortal";
var DropdownMenuPortal = (props) => {
	const { __scopeDropdownMenu, ...portalProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, {
		...useMenuScope(__scopeDropdownMenu),
		...portalProps
	});
};
DropdownMenuPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "DropdownMenuContent";
var DropdownMenuContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...contentProps } = props;
	const context = useDropdownMenuContext(CONTENT_NAME, __scopeDropdownMenu);
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const hasInteractedOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		id: context.contentId,
		"aria-labelledby": context.triggerId,
		...menuScope,
		...contentProps,
		ref: forwardedRef,
		onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
			if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
			hasInteractedOutsideRef.current = false;
			event.preventDefault();
		}),
		onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
			if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
		}),
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuContent$1.displayName = CONTENT_NAME;
var GROUP_NAME = "DropdownMenuGroup";
var DropdownMenuGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...groupProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
		...useMenuScope(__scopeDropdownMenu),
		...groupProps,
		ref: forwardedRef
	});
});
DropdownMenuGroup.displayName = GROUP_NAME;
var LABEL_NAME = "DropdownMenuLabel";
var DropdownMenuLabel = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...labelProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		...useMenuScope(__scopeDropdownMenu),
		...labelProps,
		ref: forwardedRef
	});
});
DropdownMenuLabel.displayName = LABEL_NAME;
var ITEM_NAME = "DropdownMenuItem";
var DropdownMenuItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2$1, {
		...useMenuScope(__scopeDropdownMenu),
		...itemProps,
		ref: forwardedRef
	});
});
DropdownMenuItem$1.displayName = ITEM_NAME;
var CHECKBOX_ITEM_NAME = "DropdownMenuCheckboxItem";
var DropdownMenuCheckboxItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...checkboxItemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxItem, {
		...useMenuScope(__scopeDropdownMenu),
		...checkboxItemProps,
		ref: forwardedRef
	});
});
DropdownMenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "DropdownMenuRadioGroup";
var DropdownMenuRadioGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioGroupProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
		...useMenuScope(__scopeDropdownMenu),
		...radioGroupProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "DropdownMenuRadioItem";
var DropdownMenuRadioItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioItemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioItem, {
		...useMenuScope(__scopeDropdownMenu),
		...radioItemProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioItem.displayName = RADIO_ITEM_NAME;
var INDICATOR_NAME = "DropdownMenuItemIndicator";
var DropdownMenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, {
		...useMenuScope(__scopeDropdownMenu),
		...itemIndicatorProps,
		ref: forwardedRef
	});
});
DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
var SEPARATOR_NAME = "DropdownMenuSeparator";
var DropdownMenuSeparator$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...separatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		...useMenuScope(__scopeDropdownMenu),
		...separatorProps,
		ref: forwardedRef
	});
});
DropdownMenuSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "DropdownMenuArrow";
var DropdownMenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...arrowProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow2, {
		...useMenuScope(__scopeDropdownMenu),
		...arrowProps,
		ref: forwardedRef
	});
});
DropdownMenuArrow.displayName = ARROW_NAME;
var SUB_TRIGGER_NAME = "DropdownMenuSubTrigger";
var DropdownMenuSubTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subTriggerProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTrigger, {
		...useMenuScope(__scopeDropdownMenu),
		...subTriggerProps,
		ref: forwardedRef
	});
});
DropdownMenuSubTrigger.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "DropdownMenuSubContent";
var DropdownMenuSubContent = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subContentProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent, {
		...useMenuScope(__scopeDropdownMenu),
		...subContentProps,
		ref: forwardedRef,
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuSubContent.displayName = SUB_CONTENT_NAME;
var Root2 = DropdownMenu$1;
var Trigger = DropdownMenuTrigger$1;
var Portal2 = DropdownMenuPortal;
var Content2 = DropdownMenuContent$1;
var Item2 = DropdownMenuItem$1;
var Separator2 = DropdownMenuSeparator$1;
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-slot": "dropdown-menu-content",
		sideOffset,
		className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		"data-slot": "dropdown-menu-separator",
		className: cn("bg-border -mx-1 my-1 h-px", className),
		...props
	});
}
var ConversationSidebarUI = ({ conversations, onNewChat, onSelectConversation, onDeleteConversation, onRenameConversation, onRegenerateTitle, onArchiveConversation, onUnarchiveConversation, onRestoreConversation, onClose, settingsButton, showArchived, showDeleted, onToggleArchived, onToggleDeleted, archivedCount, deletedCount }) => {
	const activeConversations = conversations.filter((c) => c.status === "active");
	const archivedConversations = conversations.filter((c) => c.status === "archived");
	const deletedConversations = conversations.filter((c) => c.status === "deleted");
	const renderSection = (title, items, isCollapsible, isOpen, onToggle, count, icon) => {
		if (!isCollapsible && items.length === 0) return null;
		if (isCollapsible && count === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1",
			children: [isCollapsible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				"data-testid": `section-toggle-${title.toLowerCase()}`,
				onClick: onToggle,
				"aria-expanded": isOpen,
				className: "flex w-full items-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors min-h-[44px]",
				children: [
					isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" }),
					icon,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px]",
						children: count
					})
				]
			}) : items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 py-2.5 text-xs font-medium text-muted-foreground",
				children: title
			}), (!isCollapsible || isOpen) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationRow, {
					conversation: c,
					onSelect: onSelectConversation,
					onRename: onRenameConversation,
					onDelete: onDeleteConversation,
					onRegenerateTitle,
					onArchive: onArchiveConversation,
					onUnarchive: onUnarchiveConversation,
					onRestore: onRestoreConversation
				}, c.id))
			})]
		});
	};
	const hasAnyConversations = activeConversations.length > 0 || archivedCount > 0 || deletedCount > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-14 items-center justify-between border-b px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-testid": "sidebar-title",
					className: "font-semibold text-sidebar-foreground",
					children: "Chats"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-testid": "new-chat-button",
						variant: "ghost",
						size: "icon",
						onClick: onNewChat,
						className: "h-10 w-10",
						"aria-label": "Start new chat",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
					}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-testid": "close-sidebar-button",
						variant: "ghost",
						size: "icon",
						onClick: onClose,
						className: "h-10 w-10 lg:hidden",
						"aria-label": "Close sidebar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "flex-1 min-h-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2",
					children: !hasAnyConversations ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-2 py-8 text-center text-sm text-muted-foreground",
						children: [
							"No conversations yet.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Start a new chat!"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						renderSection("Active", activeConversations, false, true, () => {}, activeConversations.length),
						renderSection("Archived", archivedConversations, true, showArchived, onToggleArchived, archivedCount, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "h-3 w-3" })),
						renderSection("Deleted", deletedConversations, true, showDeleted, onToggleDeleted, deletedCount, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }))
					] })
				})
			}),
			settingsButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t p-2",
				children: settingsButton
			})
		]
	});
};
var ConversationRow = ({ conversation, onSelect, onRename, onDelete, onRegenerateTitle, onArchive, onUnarchive, onRestore }) => {
	const [isMenuOpen, setIsMenuOpen] = (0, import_react.useState)(false);
	const [displayDate, setDisplayDate] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const date = new Date(conversation.updatedAt);
		const now = /* @__PURE__ */ new Date();
		const diffDays = Math.floor((now.getTime() - date.getTime()) / (1e3 * 60 * 60 * 24));
		if (diffDays === 0) setDisplayDate("Today");
		else if (diffDays === 1) setDisplayDate("Yesterday");
		else if (diffDays < 7) setDisplayDate(`${diffDays} days ago`);
		else setDisplayDate(date.toLocaleDateString());
	}, [conversation.updatedAt]);
	const isArchived = conversation.status === "archived";
	const isDeleted = conversation.status === "deleted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": `conversation-item-${conversation.id}`,
		role: "button",
		tabIndex: 0,
		"aria-current": conversation.isActive ? "true" : void 0,
		"aria-label": `Conversation: ${conversation.title}`,
		className: cn("group relative flex items-center rounded-lg px-3 py-3 cursor-pointer min-h-[52px] outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary focus-visible:ring-inset", "hover:bg-sidebar-accent active:bg-sidebar-accent", conversation.isActive && "bg-sidebar-accent", isDeleted && "opacity-60"),
		onClick: () => !isMenuOpen && onSelect(conversation.id),
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				if (!isMenuOpen) onSelect(conversation.id);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: cn("mr-2 h-4 w-4 shrink-0", isArchived ? "text-amber-500" : isDeleted ? "text-destructive" : "text-muted-foreground") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 overflow-hidden",
				children: [conversation.isGeneratingTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground italic",
						children: "Generating title..."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("truncate text-sm font-medium max-w-[180px] inline-block first-letter:uppercase", isDeleted ? "text-muted-foreground line-through" : "text-sidebar-foreground"),
					children: conversation.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground h-4",
					children: displayDate
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
				open: isMenuOpen,
				onOpenChange: setIsMenuOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"data-testid": `conversation-menu-${conversation.id}`,
						className: cn("h-10 w-10 shrink-0 transition-opacity", "opacity-100 lg:opacity-0 lg:group-hover:opacity-100", isMenuOpen && "lg:opacity-100"),
						onClick: (e) => e.stopPropagation(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-5 w-5" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					side: "bottom",
					className: "w-48 p-1.5",
					children: [
						!isDeleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-testid": `conversation-rename-${conversation.id}`,
							className: "py-2.5 text-sm",
							onClick: (e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								onRename(conversation.id);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-2.5 h-4 w-4" }), "Rename"]
						}),
						!isDeleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-testid": `conversation-regenerate-title-${conversation.id}`,
							className: "py-2.5 text-sm",
							onClick: (e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								onRegenerateTitle(conversation.id);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-2.5 h-4 w-4" }), "Regenerate Title"]
						}),
						!isDeleted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							"data-testid": `conversation-${isArchived ? "unarchive" : "archive"}-${conversation.id}`,
							className: "py-2.5 text-sm",
							onClick: (e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								if (isArchived) onUnarchive(conversation.id);
								else onArchive(conversation.id);
							},
							children: isArchived ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, { className: "mr-2.5 h-4 w-4" }), "Unarchive"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "mr-2.5 h-4 w-4" }), "Archive"] })
						}),
						isDeleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-testid": `conversation-restore-${conversation.id}`,
							className: "py-2.5 text-sm",
							onClick: (e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								onRestore(conversation.id);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-2.5 h-4 w-4" }), "Restore"]
						}),
						!isDeleted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-testid": `conversation-delete-${conversation.id}`,
							className: "py-2.5 text-sm text-destructive focus:text-destructive",
							onClick: (e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								onDelete(conversation.id);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2.5 h-4 w-4" }), isDeleted ? "Delete Forever" : "Delete"]
						})
					]
				})]
			})
		]
	});
};
var SettingsPanelUI = ({ onOpenSettings, onOpenUsage }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			className: "w-full justify-start gap-2",
			onClick: onOpenUsage,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4" }), "Usage"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			className: "w-full justify-start gap-2",
			onClick: onOpenSettings,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }), "Settings"]
		})]
	});
};
var SettingsPanel = () => {
	const { goToSettings, goToUsage } = useNavigation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanelUI, {
		onOpenSettings: (0, import_react.useCallback)(() => {
			goToSettings();
		}, [goToSettings]),
		onOpenUsage: (0, import_react.useCallback)(() => {
			goToUsage();
		}, [goToUsage])
	});
};
var DESKTOP_BREAKPOINT = 1024;
var isMobile = () => typeof window !== "undefined" && window.innerWidth < DESKTOP_BREAKPOINT;
var ConversationSidebar = ({ onClose }) => {
	const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHasMounted(true);
	}, []);
	const conversations = useStore(conversationsAtom);
	const activeConversationId = useStore(activeChatIdAtom);
	const { showArchived, showDeleted, toggleShowArchived, toggleShowDeleted } = useChatSearchParams();
	const { archivedCount, deletedCount } = (0, import_react.useMemo)(() => ({
		archivedCount: conversations.filter((c) => c.status === "archived").length,
		deletedCount: conversations.filter((c) => c.status === "deleted").length
	}), [conversations]);
	const conversationItems = (0, import_react.useMemo)(() => conversations.map((c) => ({
		id: c.id,
		title: c.title,
		updatedAt: c.updatedAt,
		isActive: c.id === activeConversationId,
		isGeneratingTitle: c.isGeneratingTitle,
		status: c.status
	})), [conversations, activeConversationId]);
	const displayConversations = hasMounted ? conversationItems : [];
	const displayArchivedCount = hasMounted ? archivedCount : 0;
	const displayDeletedCount = hasMounted ? deletedCount : 0;
	const closeSidebarOnMobile = (0, import_react.useCallback)(() => {
		if (isMobile()) onClose?.();
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationSidebarUI, {
		conversations: displayConversations,
		onNewChat: (0, import_react.useCallback)(() => {
			saveCurrentConversation();
			createConversation();
			closeSidebarOnMobile();
		}, [closeSidebarOnMobile]),
		onSelectConversation: (0, import_react.useCallback)((id) => {
			if (id !== activeConversationId) switchConversation(id);
			closeSidebarOnMobile();
		}, [activeConversationId, closeSidebarOnMobile]),
		onDeleteConversation: (0, import_react.useCallback)((id) => {
			const conversation = conversations.find((c) => c.id === id);
			if (!conversation) return;
			if (conversation.status === "deleted") confirmAction({
				title: "Permanently Delete",
				message: "This will permanently delete the conversation. This cannot be undone. Continue?",
				confirmText: "Delete Permanently",
				variant: "destructive",
				onConfirm: () => {
					permanentlyDeleteConversation(id);
					showSuccess("Conversation permanently deleted.");
				}
			});
			else confirmAction({
				title: "Move to Trash",
				message: "Move this conversation to trash?",
				confirmText: "Move to Trash",
				variant: "destructive",
				onConfirm: () => {
					deleteConversation(id);
					showSuccess("Conversation moved to trash.");
				}
			});
		}, [conversations]),
		onRenameConversation: (0, import_react.useCallback)((id) => {
			const conversation = conversations.find((c) => c.id === id);
			if (!conversation) return;
			promptAction({
				title: "Rename Conversation",
				message: "Enter a new title for this conversation:",
				defaultValue: conversation.title,
				placeholder: "Conversation title...",
				onConfirm: (newTitle) => {
					if (newTitle && newTitle.trim()) {
						updateConversationTitle(id, newTitle.trim());
						showSuccess("Conversation renamed.");
					}
				}
			});
		}, [conversations]),
		onRegenerateTitle: (0, import_react.useCallback)((id) => {
			triggerTitleGeneration(id, true);
		}, []),
		onArchiveConversation: (0, import_react.useCallback)((id) => {
			archiveConversation(id);
		}, []),
		onUnarchiveConversation: (0, import_react.useCallback)((id) => {
			unarchiveConversation(id);
		}, []),
		onRestoreConversation: (0, import_react.useCallback)((id) => {
			restoreConversation(id);
		}, []),
		onClose,
		settingsButton: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {}),
		showArchived,
		showDeleted,
		onToggleArchived: toggleShowArchived,
		onToggleDeleted: toggleShowDeleted,
		archivedCount: displayArchivedCount,
		deletedCount: displayDeletedCount
	});
};
var ChatHeader = ({ onMenuClick, isSidebarOpen = false }) => {
	const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHasMounted(true);
	}, []);
	const conversations = useStore(conversationsAtom);
	const activeConversationId = useStore(activeChatIdAtom);
	const providerType = useStore(providerTypeAtom);
	const isLocked = useStore(isLockedAtom);
	const encryptedOpenRouterApiKey = useStore(encryptedOpenRouterApiKeyAtom);
	const encryptedGoogleApiKey = useStore(encryptedGoogleApiKeyAtom);
	const encryptedOllamaApiKey = useStore(encryptedOllamaApiKeyAtom);
	const openRouterModel = useStore(openRouterModelAtom);
	const googleModel = useStore(googleModelAtom);
	const ollamaModel = useStore(ollamaModelAtom);
	const openRouterModelsRaw = useStore(openRouterModelsAtom);
	const openRouterModels = (0, import_react.useMemo)(() => openRouterModelsRaw || [], [openRouterModelsRaw]);
	const googleModelsRaw = useStore(googleModelsAtom);
	const googleModels = (0, import_react.useMemo)(() => googleModelsRaw || [], [googleModelsRaw]);
	const ollamaModelsRaw = useStore(ollamaModelsAtom);
	const ollamaModels = (0, import_react.useMemo)(() => ollamaModelsRaw || [], [ollamaModelsRaw]);
	const isLoadingOpenRouter = useStore(isLoadingModelsAtom);
	const isLoadingGoogle = useStore(isLoadingGoogleModelsAtom);
	const isLoadingOllama = useStore(isLoadingOllamaModelsAtom);
	const masterPassword = useStore(masterPasswordAtom);
	const hasKeys = useStore(hasKeysAtom);
	(0, import_react.useEffect)(() => {
		if (!hasMounted || isLocked) return;
		if (providerType === "open-router" && openRouterModels.length === 0) fetchOpenRouterModels();
		else if (providerType === "google" && googleModels.length === 0) fetchGoogleModels();
		else if (providerType === "ollama" && ollamaModels.length === 0) fetchOllamaModelsAction();
	}, [
		hasMounted,
		providerType,
		isLocked,
		openRouterModels.length,
		googleModels.length,
		ollamaModels.length
	]);
	const activeConversation = conversations.find((c) => c.id === activeConversationId);
	const currentProviderLabel = (0, import_react.useMemo)(() => {
		return SUPPORTED_PROVIDERS.find((p) => p.id === providerType)?.label || "Provider";
	}, [providerType]);
	const currentModel = providerType === "open-router" ? openRouterModel : providerType === "google" ? googleModel : ollamaModel;
	const currentModels = (0, import_react.useMemo)(() => {
		return providerType === "open-router" ? openRouterModels : providerType === "google" ? googleModels : providerType === "ollama" ? ollamaModels.map((m) => ({
			id: m.name || m.model,
			name: m.name || m.model,
			description: ""
		})) : [{
			id: "text",
			name: "Browser Gemini Nano",
			description: "Built-in AI"
		}];
	}, [
		providerType,
		openRouterModels,
		googleModels,
		ollamaModels
	]);
	const isLoadingModels = providerType === "open-router" ? isLoadingOpenRouter : providerType === "google" ? isLoadingGoogle : isLoadingOllama;
	const isUnlocked = !!masterPassword;
	const currentModelName = (0, import_react.useMemo)(() => {
		return currentModels.find((m) => m.id === currentModel)?.name || currentModel || "Select Model";
	}, [currentModels, currentModel]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full items-center justify-between gap-3 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
				delayDuration: 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "icon",
						className: "h-9 w-9 shrink-0",
						onClick: onMenuClick,
						"aria-expanded": isSidebarOpen,
						"aria-controls": "chat-sidebar",
						"aria-label": isSidebarOpen ? "Close sidebar" : "Open sidebar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5 lg:hidden" }), isSidebarOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "hidden h-5 w-5 lg:block" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, { className: "hidden h-5 w-5 lg:block" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
					side: "bottom",
					children: isSidebarOpen ? "Close sidebar" : "Open sidebar"
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 shadow-sm transition-transform hover:scale-105",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary-foreground" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "truncate text-sm font-semibold leading-none flex items-center gap-2",
						children: hasMounted ? activeConversation?.isGeneratingTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate inline-block first-letter:uppercase",
							children: activeConversation?.title ?? "New Chat"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-[10px] font-medium text-muted-foreground animate-pulse shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-2.5 w-2.5 animate-spin" }), "Generating title..."]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate inline-block first-letter:uppercase",
							children: activeConversation?.title ?? "New Chat"
						}) : "New Chat"
					})
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 shrink-0",
			children: [hasMounted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-0.5 rounded-full border bg-muted/20 p-0.5 shadow-xs transition-all hover:bg-muted/30 focus-within:ring-1 focus-within:ring-primary/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: providerType,
						onValueChange: (value) => setProviderType(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-7 border-none bg-transparent hover:bg-background/50 focus:ring-0 px-2.5 gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors rounded-full data-[state=open]:bg-background/80 shadow-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 truncate",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: cn("h-3 w-3 transition-colors", providerType === "open-router" ? "text-blue-500 fill-blue-500/20" : providerType === "google" ? "text-red-500 fill-red-500/20" : providerType === "ollama" ? "text-orange-500 fill-orange-500/20" : "text-purple-500 fill-purple-500/20") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									placeholder: "Provider",
									children: currentProviderLabel
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							align: "end",
							className: "min-w-[160px]",
							children: SUPPORTED_PROVIDERS.map((p) => {
								const hasKey = p.id === "open-router" ? !!encryptedOpenRouterApiKey : p.id === "google" ? !!encryptedGoogleApiKey : p.id === "ollama" ? !!encryptedOllamaApiKey : true;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: p.id,
									disabled: !hasKey && p.id !== "ollama" && p.id !== "prompt-api",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-2 w-2 rounded-full", p.id === "open-router" ? "bg-blue-500" : p.id === "google" ? "bg-red-500" : p.id === "ollama" ? "bg-orange-500" : "bg-purple-500") }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: p.label
											}),
											!hasKey && p.id !== "ollama" && p.id !== "prompt-api" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] uppercase font-bold text-muted-foreground ml-auto opacity-50",
												children: "Locked"
											})
										]
									})
								}, p.id);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-[1px] bg-border mx-0.5 opacity-50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: currentModel,
						onValueChange: (value) => {
							if (providerType === "open-router") setOpenRouterModel(value);
							else if (providerType === "google") setGoogleModel(value);
							else setOllamaModel(value);
						},
						disabled: isLoadingModels || isLocked || currentModels.length === 0 && !isLoadingModels,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-7 max-w-[180px] border-none bg-transparent hover:bg-background/50 focus:ring-0 px-2.5 gap-1.5 text-[11px] font-medium transition-colors rounded-full data-[state=open]:bg-background/80 shadow-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 truncate",
								children: [isLoadingModels ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-3 w-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									placeholder: isLoadingModels ? "Loading..." : "Model",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: currentModelName
										}), isLocked && (providerType === "open-router" && encryptedOpenRouterApiKey || providerType === "google" && encryptedGoogleApiKey || providerType === "ollama" && encryptedOllamaApiKey) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-2.5 w-2.5 shrink-0 opacity-50" })]
									})
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							align: "end",
							className: "max-w-[320px]",
							children: currentModels.length > 0 ? currentModels.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m.id,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-0.5 py-0.5 overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium leading-none truncate",
										children: m.name || m.id
									}), m.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground line-clamp-1 opacity-70",
										children: m.description
									})]
								})
							}, m.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: currentModel,
								disabled: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs",
										children: isLocked ? "Unlock session to load models" : "No models found"
									})]
								})
							})
						})]
					})
				]
			}), hasMounted && (hasKeys || isUnlocked) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
				delayDuration: 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: cn("h-8 w-8 shrink-0 rounded-full transition-all border shadow-xs", isLocked ? "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 animate-pulse" : "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20"),
						onClick: () => {
							if (isLocked) window.dispatchEvent(new CustomEvent("focus-unlock-input"));
							else setMasterPassword(null);
						},
						children: isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "h-4 w-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
					side: "bottom",
					align: "end",
					children: isLocked ? "Session Locked: Your API keys are encrypted. Click to unlock." : "Session Unlocked: Your API keys are available for use. Click to lock."
				})] })
			})]
		})]
	});
};
var categoryIcons = {
	network: Wifi,
	rate_limit: Clock,
	context: FileExclamationPoint,
	model: Bot,
	permission: ShieldAlert,
	api: TriangleAlert,
	unknown: CircleQuestionMark
};
var categoryColors = {
	network: "border-orange-500/50 bg-orange-500/10",
	rate_limit: "border-yellow-500/50 bg-yellow-500/10",
	context: "border-blue-500/50 bg-blue-500/10",
	model: "border-purple-500/50 bg-purple-500/10",
	permission: "border-red-500/50 bg-red-500/10",
	api: "border-red-500/50 bg-red-500/10",
	unknown: "border-muted-foreground/50 bg-muted"
};
var categoryIconColors = {
	network: "text-orange-500",
	rate_limit: "text-yellow-500",
	context: "text-blue-500",
	model: "text-purple-500",
	permission: "text-red-500",
	api: "text-red-500",
	unknown: "text-muted-foreground"
};
var ErrorBannerUI = ({ title, message, category, isRetryable, onRetry, onDismiss }) => {
	const Icon = categoryIcons[category];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-4 mb-4 rounded-lg border-2 p-4", categoryColors[category]),
		role: "alert",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("mt-0.5 shrink-0", categoryIconColors[category]),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-foreground",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [
								isRetryable && onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: onRetry,
									className: "h-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1.5 h-3.5 w-3.5" }), "Try Again"]
								}),
								category === "context" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => {
										window.location.reload();
									},
									className: "h-8",
									children: "Start New Chat"
								}),
								category === "rate_limit" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Please wait a few seconds before retrying"
								})
							]
						})
					]
				}),
				onDismiss && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "icon",
					className: "h-8 w-8 shrink-0",
					onClick: onDismiss,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Dismiss"
					})]
				})
			]
		})
	});
};
var currentErrorAtom = /* @__PURE__ */ atom(null);
var errorHistoryAtom = /* @__PURE__ */ atom([]);
var categorizeError = (error) => {
	const message = error.message.toLowerCase();
	const name$1 = error.name.toLowerCase();
	if (error.name === "AI_APICallError" || error.name === "APICallError" || name$1.includes("apicallerror") || name$1.includes("aicallerror") || name$1.includes("ai_apicallerror") || name$1.includes("apierror") || error.constructor?.name === "APICallError" || error.constructor?.name === "AI_APICallError") {
		const statusCode = error.statusCode || error.status || error.errorCode;
		const statusText = error.statusText || error.message;
		const responseBody = error.body || error.data;
		console.error(`AI_APICallError Details:
Provider: ${providerTypeAtom.get()}
Status Code: ${statusCode}
Status Text: ${statusText}
Response Body: ${JSON.stringify(responseBody, null, 2)}
Original Error:`, error);
		if (statusCode === 429) return {
			category: "rate_limit",
			title: "Rate Limited",
			isRetryable: true
		};
		if (statusCode === 401 || statusCode === 403) return {
			category: "permission",
			title: "Authentication Error",
			isRetryable: false
		};
		if (statusCode === 404) return {
			category: "model",
			title: "Model Not Found",
			isRetryable: false
		};
		if (statusCode >= 500) return {
			category: "api",
			title: "AI Provider Error",
			isRetryable: true
		};
		return {
			category: "api",
			title: "AI API Error",
			isRetryable: true
		};
	}
	if (message.includes("network") || message.includes("fetch") || message.includes("connection") || message.includes("offline") || name$1.includes("networkerror") || name$1.includes("typeerror") && message.includes("failed to fetch")) return {
		category: "network",
		title: "Connection Error",
		isRetryable: true
	};
	if (message.includes("rate limit") || message.includes("too many requests") || message.includes("429")) return {
		category: "rate_limit",
		title: "Rate Limited",
		isRetryable: true
	};
	if (message.includes("context") || message.includes("token") || message.includes("too long") || message.includes("maximum length")) return {
		category: "context",
		title: "Message Too Long",
		isRetryable: false
	};
	if (message.includes("model") || message.includes("not available") || message.includes("not found") || message.includes("download") || message.includes("load")) return {
		category: "model",
		title: "AI Model Error",
		isRetryable: true
	};
	if (message.includes("permission") || message.includes("denied") || message.includes("unauthorized") || message.includes("forbidden")) return {
		category: "permission",
		title: "Permission Denied",
		isRetryable: false
	};
	if (message.includes("no endpoints found that support image input") || message.includes("multimodal")) return {
		category: "model",
		title: "Image Input Not Supported",
		isRetryable: false
	};
	if (message.includes("api") || message.includes("error") || name$1.includes("apierror") || name$1.includes("aicallerror") || name$1.includes("ai_apicallerror")) return {
		category: "api",
		title: "AI Error",
		isRetryable: true
	};
	return {
		category: "unknown",
		title: "Something Went Wrong",
		isRetryable: true
	};
};
var getUserFriendlyMessage = (error, category) => {
	const name$1 = error.name.toLowerCase();
	if (error.name === "AI_APICallError" || error.name === "APICallError" || name$1.includes("apicallerror") || name$1.includes("aicallerror") || name$1.includes("ai_apicallerror") || name$1.includes("apierror") || error.constructor?.name === "APICallError" || error.constructor?.name === "AI_APICallError") {
		const statusCode = error.statusCode || error.status || error.errorCode;
		const providerType = providerTypeAtom.get();
		const provider = providerType === "open-router" ? "OpenRouter" : providerType === "google" ? "Google Gemini" : providerType === "ollama" ? "Ollama" : "AI Provider";
		switch (statusCode) {
			case 401: return `Your API key for ${provider} seems to be invalid. Please check your settings.`;
			case 403: return `Access denied by ${provider}. Please check if your account has access to the requested model.`;
			case 404: return `The requested model was not found on ${provider}. Please select a different model in settings.`;
			case 429: return `You've exceeded the rate limit for ${provider}. Please wait a moment before trying again.`;
			case 500: return `${provider} is currently experiencing internal errors. Please try again later.`;
			case 503: return `${provider} is temporarily overloaded or down for maintenance. Please try again in a few minutes.`;
			default:
				if (statusCode && statusCode >= 400) return `The AI provider (${provider}) returned an error (HTTP ${statusCode}). ${error.message}`;
				return `The AI provider (${provider}) encountered a call error: ${error.message}`;
		}
	}
	switch (category) {
		case "network": return "Unable to connect to the AI. Please check your internet connection and try again.";
		case "rate_limit": return "You're sending messages too quickly. Please wait a moment before trying again.";
		case "context": return "Your message or conversation is too long. Try starting a new conversation or sending a shorter message.";
		case "model": {
			const providerType = providerTypeAtom.get();
			const msg = error.message.toLowerCase();
			if (msg.includes("image input") || msg.includes("multimodal")) {
				if (providerType === "open-router") return "The selected model does not support image input. Please choose a multimodal model (like Gemini 1.5 Flash or Claude 3.5 Sonnet) to use this feature.";
				if (providerType === "google") return "The selected Gemini model does not support image input. Please choose a multimodal model like Gemini 1.5 Flash or Pro.";
			}
			return "The AI model is temporarily unavailable. This might be due to the model still downloading or a temporary issue. Please try again in a moment.";
		}
		case "permission": return "You don't have permission to use this feature. Please check your browser settings and ensure the Prompt API is enabled.";
		case "api": return `The AI encountered an error while processing your request. ${error.message}`;
		default: return `An unexpected error occurred: ${error.message}`;
	}
};
var setError = (error, retryAction) => {
	const { category, title, isRetryable } = categorizeError(error);
	const promptError = {
		id: crypto.randomUUID(),
		category,
		title,
		message: getUserFriendlyMessage(error, category),
		originalError: error,
		timestamp: Date.now(),
		isRetryable,
		retryAction
	};
	currentErrorAtom.set(promptError);
	errorHistoryAtom.set([promptError, ...errorHistoryAtom.get()].slice(0, 50));
	return promptError;
};
var clearError = () => {
	currentErrorAtom.set(null);
};
var ErrorBanner = () => {
	const error = useStore(currentErrorAtom);
	const handleRetry = (0, import_react.useCallback)(() => {
		if (error?.retryAction) {
			clearError();
			error.retryAction();
		}
	}, [error]);
	const handleDismiss = (0, import_react.useCallback)(() => {
		clearError();
	}, []);
	if (!error) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBannerUI, {
		title: error.title,
		message: error.message,
		category: error.category,
		isRetryable: error.isRetryable,
		onRetry: error.retryAction ? handleRetry : void 0,
		onDismiss: handleDismiss
	});
};
var re = /[ \t\n\f\r]/g;
function whitespace(thing) {
	return typeof thing === "object" ? thing.type === "text" ? empty$1(thing.value) : false : empty$1(thing);
}
function empty$1(value) {
	return value.replace(re, "") === "";
}
var pointEnd = point$2("end");
var pointStart = point$2("start");
function point$2(type) {
	return point$3;
	function point$3(node$1) {
		const point$4 = node$1 && node$1.position && node$1.position[type] || {};
		if (typeof point$4.line === "number" && point$4.line > 0 && typeof point$4.column === "number" && point$4.column > 0) return {
			line: point$4.line,
			column: point$4.column,
			offset: typeof point$4.offset === "number" && point$4.offset > -1 ? point$4.offset : void 0
		};
	}
}
function position(node$1) {
	const start = pointStart(node$1);
	const end = pointEnd(node$1);
	if (start && end) return {
		start,
		end
	};
}
var own$3 = {}.hasOwnProperty;
var emptyMap = /* @__PURE__ */ new Map();
var cap = /[A-Z]/g;
var tableElements = new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]);
var tableCellElement = new Set(["td", "th"]);
var docs = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function toJsxRuntime(tree, options) {
	if (!options || options.Fragment === void 0) throw new TypeError("Expected `Fragment` in options");
	const filePath = options.filePath || void 0;
	let create;
	if (options.development) {
		if (typeof options.jsxDEV !== "function") throw new TypeError("Expected `jsxDEV` in options when `development: true`");
		create = developmentCreate(filePath, options.jsxDEV);
	} else {
		if (typeof options.jsx !== "function") throw new TypeError("Expected `jsx` in production options");
		if (typeof options.jsxs !== "function") throw new TypeError("Expected `jsxs` in production options");
		create = productionCreate(filePath, options.jsx, options.jsxs);
	}
	const state = {
		Fragment: options.Fragment,
		ancestors: [],
		components: options.components || {},
		create,
		elementAttributeNameCase: options.elementAttributeNameCase || "react",
		evaluater: options.createEvaluater ? options.createEvaluater() : void 0,
		filePath,
		ignoreInvalidStyle: options.ignoreInvalidStyle || false,
		passKeys: options.passKeys !== false,
		passNode: options.passNode || false,
		schema: options.space === "svg" ? svg : html,
		stylePropertyNameCase: options.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: options.tableCellAlignToStyle !== false
	};
	const result = one$1(state, tree, void 0);
	if (result && typeof result !== "string") return result;
	return state.create(tree, state.Fragment, { children: result || void 0 }, void 0);
}
function one$1(state, node$1, key) {
	if (node$1.type === "element") return element(state, node$1, key);
	if (node$1.type === "mdxFlowExpression" || node$1.type === "mdxTextExpression") return mdxExpression(state, node$1);
	if (node$1.type === "mdxJsxFlowElement" || node$1.type === "mdxJsxTextElement") return mdxJsxElement(state, node$1, key);
	if (node$1.type === "mdxjsEsm") return mdxEsm(state, node$1);
	if (node$1.type === "root") return root$2(state, node$1, key);
	if (node$1.type === "text") return text$5(state, node$1);
}
function element(state, node$1, key) {
	const parentSchema = state.schema;
	let schema = parentSchema;
	if (node$1.tagName.toLowerCase() === "svg" && parentSchema.space === "html") {
		schema = svg;
		state.schema = schema;
	}
	state.ancestors.push(node$1);
	const type = findComponentFromName(state, node$1.tagName, false);
	const props = createElementProps(state, node$1);
	let children = createChildren(state, node$1);
	if (tableElements.has(node$1.tagName)) children = children.filter(function(child) {
		return typeof child === "string" ? !whitespace(child) : true;
	});
	addNode(state, props, type, node$1);
	addChildren(props, children);
	state.ancestors.pop();
	state.schema = parentSchema;
	return state.create(node$1, type, props, key);
}
function mdxExpression(state, node$1) {
	if (node$1.data && node$1.data.estree && state.evaluater) {
		const expression = node$1.data.estree.body[0];
		expression.type;
		return state.evaluater.evaluateExpression(expression.expression);
	}
	crashEstree(state, node$1.position);
}
function mdxEsm(state, node$1) {
	if (node$1.data && node$1.data.estree && state.evaluater) return state.evaluater.evaluateProgram(node$1.data.estree);
	crashEstree(state, node$1.position);
}
function mdxJsxElement(state, node$1, key) {
	const parentSchema = state.schema;
	let schema = parentSchema;
	if (node$1.name === "svg" && parentSchema.space === "html") {
		schema = svg;
		state.schema = schema;
	}
	state.ancestors.push(node$1);
	const type = node$1.name === null ? state.Fragment : findComponentFromName(state, node$1.name, true);
	const props = createJsxElementProps(state, node$1);
	const children = createChildren(state, node$1);
	addNode(state, props, type, node$1);
	addChildren(props, children);
	state.ancestors.pop();
	state.schema = parentSchema;
	return state.create(node$1, type, props, key);
}
function root$2(state, node$1, key) {
	const props = {};
	addChildren(props, createChildren(state, node$1));
	return state.create(node$1, state.Fragment, props, key);
}
function text$5(_, node$1) {
	return node$1.value;
}
function addNode(state, props, type, node$1) {
	if (typeof type !== "string" && type !== state.Fragment && state.passNode) props.node = node$1;
}
function addChildren(props, children) {
	if (children.length > 0) {
		const value = children.length > 1 ? children : children[0];
		if (value) props.children = value;
	}
}
function productionCreate(_, jsx$1, jsxs$1) {
	return create;
	function create(_$1, type, props, key) {
		const fn = Array.isArray(props.children) ? jsxs$1 : jsx$1;
		return key ? fn(type, props, key) : fn(type, props);
	}
}
function developmentCreate(filePath, jsxDEV) {
	return create;
	function create(node$1, type, props, key) {
		const isStaticChildren = Array.isArray(props.children);
		const point$3 = pointStart(node$1);
		return jsxDEV(type, props, key, isStaticChildren, {
			columnNumber: point$3 ? point$3.column - 1 : void 0,
			fileName: filePath,
			lineNumber: point$3 ? point$3.line : void 0
		}, void 0);
	}
}
function createElementProps(state, node$1) {
	const props = {};
	let alignValue;
	let prop;
	for (prop in node$1.properties) if (prop !== "children" && own$3.call(node$1.properties, prop)) {
		const result = createProperty(state, prop, node$1.properties[prop]);
		if (result) {
			const [key, value] = result;
			if (state.tableCellAlignToStyle && key === "align" && typeof value === "string" && tableCellElement.has(node$1.tagName)) alignValue = value;
			else props[key] = value;
		}
	}
	if (alignValue) {
		const style = props.style || (props.style = {});
		style[state.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = alignValue;
	}
	return props;
}
function createJsxElementProps(state, node$1) {
	const props = {};
	for (const attribute of node$1.attributes) if (attribute.type === "mdxJsxExpressionAttribute") if (attribute.data && attribute.data.estree && state.evaluater) {
		const expression = attribute.data.estree.body[0];
		expression.type;
		const objectExpression = expression.expression;
		objectExpression.type;
		const property = objectExpression.properties[0];
		property.type;
		Object.assign(props, state.evaluater.evaluateExpression(property.argument));
	} else crashEstree(state, node$1.position);
	else {
		const name$1 = attribute.name;
		let value;
		if (attribute.value && typeof attribute.value === "object") if (attribute.value.data && attribute.value.data.estree && state.evaluater) {
			const expression = attribute.value.data.estree.body[0];
			expression.type;
			value = state.evaluater.evaluateExpression(expression.expression);
		} else crashEstree(state, node$1.position);
		else value = attribute.value === null ? true : attribute.value;
		props[name$1] = value;
	}
	return props;
}
function createChildren(state, node$1) {
	const children = [];
	let index$1 = -1;
	/* c8 ignore next */
	const countsByName = state.passKeys ? /* @__PURE__ */ new Map() : emptyMap;
	while (++index$1 < node$1.children.length) {
		const child = node$1.children[index$1];
		let key;
		if (state.passKeys) {
			const name$1 = child.type === "element" ? child.tagName : child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement" ? child.name : void 0;
			if (name$1) {
				const count = countsByName.get(name$1) || 0;
				key = name$1 + "-" + count;
				countsByName.set(name$1, count + 1);
			}
		}
		const result = one$1(state, child, key);
		if (result !== void 0) children.push(result);
	}
	return children;
}
function createProperty(state, prop, value) {
	const info = find(state.schema, prop);
	if (value === null || value === void 0 || typeof value === "number" && Number.isNaN(value)) return;
	if (Array.isArray(value)) value = info.commaSeparated ? stringify(value) : stringify$1(value);
	if (info.property === "style") {
		let styleObject = typeof value === "object" ? value : parseStyle(state, String(value));
		if (state.stylePropertyNameCase === "css") styleObject = transformStylesToCssCasing(styleObject);
		return ["style", styleObject];
	}
	return [state.elementAttributeNameCase === "react" && info.space ? hastToReact[info.property] || info.property : info.attribute, value];
}
function parseStyle(state, value) {
	try {
		return (0, import_cjs.default)(value, { reactCompat: true });
	} catch (error) {
		if (state.ignoreInvalidStyle) return {};
		const cause = error;
		const message = new VFileMessage("Cannot parse `style` attribute", {
			ancestors: state.ancestors,
			cause,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		message.file = state.filePath || void 0;
		message.url = docs + "#cannot-parse-style-attribute";
		throw message;
	}
}
function findComponentFromName(state, name$1, allowExpression) {
	let result;
	if (!allowExpression) result = {
		type: "Literal",
		value: name$1
	};
	else if (name$1.includes(".")) {
		const identifiers = name$1.split(".");
		let index$1 = -1;
		let node$1;
		while (++index$1 < identifiers.length) {
			const prop = name(identifiers[index$1]) ? {
				type: "Identifier",
				name: identifiers[index$1]
			} : {
				type: "Literal",
				value: identifiers[index$1]
			};
			node$1 = node$1 ? {
				type: "MemberExpression",
				object: node$1,
				property: prop,
				computed: Boolean(index$1 && prop.type === "Literal"),
				optional: false
			} : prop;
		}
		result = node$1;
	} else result = name(name$1) && !/^[a-z]/.test(name$1) ? {
		type: "Identifier",
		name: name$1
	} : {
		type: "Literal",
		value: name$1
	};
	if (result.type === "Literal") {
		const name$2 = result.value;
		return own$3.call(state.components, name$2) ? state.components[name$2] : name$2;
	}
	if (state.evaluater) return state.evaluater.evaluateExpression(result);
	crashEstree(state);
}
function crashEstree(state, place) {
	const message = new VFileMessage("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: state.ancestors,
		place,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	message.file = state.filePath || void 0;
	message.url = docs + "#cannot-handle-mdx-estrees-without-createevaluater";
	throw message;
}
function transformStylesToCssCasing(domCasing) {
	const cssCasing = {};
	let from;
	for (from in domCasing) if (own$3.call(domCasing, from)) cssCasing[transformStyleToCssCasing(from)] = domCasing[from];
	return cssCasing;
}
function transformStyleToCssCasing(from) {
	let to = from.replace(cap, toDash);
	if (to.slice(0, 3) === "ms-") to = "-" + to;
	return to;
}
function toDash($0) {
	return "-" + $0.toLowerCase();
}
var emptyOptions$2 = {};
function toString(value, options) {
	const settings = options || emptyOptions$2;
	return one(value, typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true, typeof settings.includeHtml === "boolean" ? settings.includeHtml : true);
}
function one(value, includeImageAlt, includeHtml) {
	if (node(value)) {
		if ("value" in value) return value.type === "html" && !includeHtml ? "" : value.value;
		if (includeImageAlt && "alt" in value && value.alt) return value.alt;
		if ("children" in value) return all(value.children, includeImageAlt, includeHtml);
	}
	if (Array.isArray(value)) return all(value, includeImageAlt, includeHtml);
	return "";
}
function all(values, includeImageAlt, includeHtml) {
	const result = [];
	let index$1 = -1;
	while (++index$1 < values.length) result[index$1] = one(values[index$1], includeImageAlt, includeHtml);
	return result.join("");
}
function node(value) {
	return Boolean(value && typeof value === "object");
}
function splice(list$3, start, remove, items) {
	const end = list$3.length;
	let chunkStart = 0;
	let parameters;
	if (start < 0) start = -start > end ? 0 : end + start;
	else start = start > end ? end : start;
	remove = remove > 0 ? remove : 0;
	if (items.length < 1e4) {
		parameters = Array.from(items);
		parameters.unshift(start, remove);
		list$3.splice(...parameters);
	} else {
		if (remove) list$3.splice(start, remove);
		while (chunkStart < items.length) {
			parameters = items.slice(chunkStart, chunkStart + 1e4);
			parameters.unshift(start, 0);
			list$3.splice(...parameters);
			chunkStart += 1e4;
			start += 1e4;
		}
	}
}
function push(list$3, items) {
	if (list$3.length > 0) {
		splice(list$3, list$3.length, 0, items);
		return list$3;
	}
	return items;
}
var hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
	const all$1 = {};
	let index$1 = -1;
	while (++index$1 < extensions.length) syntaxExtension(all$1, extensions[index$1]);
	return all$1;
}
function syntaxExtension(all$1, extension$1) {
	let hook;
	for (hook in extension$1) {
		const left = (hasOwnProperty.call(all$1, hook) ? all$1[hook] : void 0) || (all$1[hook] = {});
		const right = extension$1[hook];
		let code$3;
		if (right) for (code$3 in right) {
			if (!hasOwnProperty.call(left, code$3)) left[code$3] = [];
			const value = right[code$3];
			constructs(left[code$3], Array.isArray(value) ? value : value ? [value] : []);
		}
	}
}
function constructs(existing, list$3) {
	let index$1 = -1;
	const before = [];
	while (++index$1 < list$3.length) (list$3[index$1].add === "after" ? existing : before).push(list$3[index$1]);
	splice(existing, 0, 0, before);
}
function decodeNumericCharacterReference(value, base) {
	const code$3 = Number.parseInt(value, base);
	if (code$3 < 9 || code$3 === 11 || code$3 > 13 && code$3 < 32 || code$3 > 126 && code$3 < 160 || code$3 > 55295 && code$3 < 57344 || code$3 > 64975 && code$3 < 65008 || (code$3 & 65535) === 65535 || (code$3 & 65535) === 65534 || code$3 > 1114111) return "�";
	return String.fromCodePoint(code$3);
}
function normalizeIdentifier(value) {
	return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
var asciiAlpha = regexCheck(/[A-Za-z]/);
var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code$3) {
	return code$3 !== null && (code$3 < 32 || code$3 === 127);
}
var asciiDigit = regexCheck(/\d/);
var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code$3) {
	return code$3 !== null && code$3 < -2;
}
function markdownLineEndingOrSpace(code$3) {
	return code$3 !== null && (code$3 < 0 || code$3 === 32);
}
function markdownSpace(code$3) {
	return code$3 === -2 || code$3 === -1 || code$3 === 32;
}
var unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
var unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
	return check;
	function check(code$3) {
		return code$3 !== null && code$3 > -1 && regex.test(String.fromCharCode(code$3));
	}
}
function normalizeUri(value) {
	const result = [];
	let index$1 = -1;
	let start = 0;
	let skip = 0;
	while (++index$1 < value.length) {
		const code$3 = value.charCodeAt(index$1);
		let replace$1 = "";
		if (code$3 === 37 && asciiAlphanumeric(value.charCodeAt(index$1 + 1)) && asciiAlphanumeric(value.charCodeAt(index$1 + 2))) skip = 2;
		else if (code$3 < 128) {
			if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code$3))) replace$1 = String.fromCharCode(code$3);
		} else if (code$3 > 55295 && code$3 < 57344) {
			const next = value.charCodeAt(index$1 + 1);
			if (code$3 < 56320 && next > 56319 && next < 57344) {
				replace$1 = String.fromCharCode(code$3, next);
				skip = 1;
			} else replace$1 = "�";
		} else replace$1 = String.fromCharCode(code$3);
		if (replace$1) {
			result.push(value.slice(start, index$1), encodeURIComponent(replace$1));
			start = index$1 + skip + 1;
			replace$1 = "";
		}
		if (skip) {
			index$1 += skip;
			skip = 0;
		}
	}
	return result.join("") + value.slice(start);
}
function factorySpace(effects, ok$2, type, max) {
	const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
	let size = 0;
	return start;
	function start(code$3) {
		if (markdownSpace(code$3)) {
			effects.enter(type);
			return prefix(code$3);
		}
		return ok$2(code$3);
	}
	function prefix(code$3) {
		if (markdownSpace(code$3) && size++ < limit) {
			effects.consume(code$3);
			return prefix;
		}
		effects.exit(type);
		return ok$2(code$3);
	}
}
var content = { tokenize: initializeContent };
function initializeContent(effects) {
	const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
	let previous$2;
	return contentStart;
	function afterContentStartConstruct(code$3) {
		if (code$3 === null) {
			effects.consume(code$3);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return factorySpace(effects, contentStart, "linePrefix");
	}
	function paragraphInitial(code$3) {
		effects.enter("paragraph");
		return lineStart(code$3);
	}
	function lineStart(code$3) {
		const token = effects.enter("chunkText", {
			contentType: "text",
			previous: previous$2
		});
		if (previous$2) previous$2.next = token;
		previous$2 = token;
		return data(code$3);
	}
	function data(code$3) {
		if (code$3 === null) {
			effects.exit("chunkText");
			effects.exit("paragraph");
			effects.consume(code$3);
			return;
		}
		if (markdownLineEnding(code$3)) {
			effects.consume(code$3);
			effects.exit("chunkText");
			return lineStart;
		}
		effects.consume(code$3);
		return data;
	}
}
var document$1 = { tokenize: initializeDocument };
var containerConstruct = { tokenize: tokenizeContainer };
function initializeDocument(effects) {
	const self = this;
	const stack = [];
	let continued = 0;
	let childFlow;
	let childToken;
	let lineStartOffset;
	return start;
	function start(code$3) {
		if (continued < stack.length) {
			const item = stack[continued];
			self.containerState = item[1];
			return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code$3);
		}
		return checkNewContainers(code$3);
	}
	function documentContinue(code$3) {
		continued++;
		if (self.containerState._closeFlow) {
			self.containerState._closeFlow = void 0;
			if (childFlow) closeFlow();
			const indexBeforeExits = self.events.length;
			let indexBeforeFlow = indexBeforeExits;
			let point$3;
			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
				point$3 = self.events[indexBeforeFlow][1].end;
				break;
			}
			exitContainers(continued);
			let index$1 = indexBeforeExits;
			while (index$1 < self.events.length) {
				self.events[index$1][1].end = { ...point$3 };
				index$1++;
			}
			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
			self.events.length = index$1;
			return checkNewContainers(code$3);
		}
		return start(code$3);
	}
	function checkNewContainers(code$3) {
		if (continued === stack.length) {
			if (!childFlow) return documentContinued(code$3);
			if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) return flowStart(code$3);
			self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
		}
		self.containerState = {};
		return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code$3);
	}
	function thereIsANewContainer(code$3) {
		if (childFlow) closeFlow();
		exitContainers(continued);
		return documentContinued(code$3);
	}
	function thereIsNoNewContainer(code$3) {
		self.parser.lazy[self.now().line] = continued !== stack.length;
		lineStartOffset = self.now().offset;
		return flowStart(code$3);
	}
	function documentContinued(code$3) {
		self.containerState = {};
		return effects.attempt(containerConstruct, containerContinue, flowStart)(code$3);
	}
	function containerContinue(code$3) {
		continued++;
		stack.push([self.currentConstruct, self.containerState]);
		return documentContinued(code$3);
	}
	function flowStart(code$3) {
		if (code$3 === null) {
			if (childFlow) closeFlow();
			exitContainers(0);
			effects.consume(code$3);
			return;
		}
		childFlow = childFlow || self.parser.flow(self.now());
		effects.enter("chunkFlow", {
			_tokenizer: childFlow,
			contentType: "flow",
			previous: childToken
		});
		return flowContinue(code$3);
	}
	function flowContinue(code$3) {
		if (code$3 === null) {
			writeToChild(effects.exit("chunkFlow"), true);
			exitContainers(0);
			effects.consume(code$3);
			return;
		}
		if (markdownLineEnding(code$3)) {
			effects.consume(code$3);
			writeToChild(effects.exit("chunkFlow"));
			continued = 0;
			self.interrupt = void 0;
			return start;
		}
		effects.consume(code$3);
		return flowContinue;
	}
	function writeToChild(token, endOfFile) {
		const stream = self.sliceStream(token);
		if (endOfFile) stream.push(null);
		token.previous = childToken;
		if (childToken) childToken.next = token;
		childToken = token;
		childFlow.defineSkip(token.start);
		childFlow.write(stream);
		if (self.parser.lazy[token.start.line]) {
			let index$1 = childFlow.events.length;
			while (index$1--) if (childFlow.events[index$1][1].start.offset < lineStartOffset && (!childFlow.events[index$1][1].end || childFlow.events[index$1][1].end.offset > lineStartOffset)) return;
			const indexBeforeExits = self.events.length;
			let indexBeforeFlow = indexBeforeExits;
			let seen;
			let point$3;
			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
				if (seen) {
					point$3 = self.events[indexBeforeFlow][1].end;
					break;
				}
				seen = true;
			}
			exitContainers(continued);
			index$1 = indexBeforeExits;
			while (index$1 < self.events.length) {
				self.events[index$1][1].end = { ...point$3 };
				index$1++;
			}
			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
			self.events.length = index$1;
		}
	}
	function exitContainers(size) {
		let index$1 = stack.length;
		while (index$1-- > size) {
			const entry = stack[index$1];
			self.containerState = entry[1];
			entry[0].exit.call(self, effects);
		}
		stack.length = size;
	}
	function closeFlow() {
		childFlow.write([null]);
		childToken = void 0;
		childFlow = void 0;
		self.containerState._closeFlow = void 0;
	}
}
function tokenizeContainer(effects, ok$2, nok) {
	return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok$2, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function classifyCharacter(code$3) {
	if (code$3 === null || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3)) return 1;
	if (unicodePunctuation(code$3)) return 2;
}
function resolveAll(constructs$1, events, context) {
	const called = [];
	let index$1 = -1;
	while (++index$1 < constructs$1.length) {
		const resolve = constructs$1[index$1].resolveAll;
		if (resolve && !called.includes(resolve)) {
			events = resolve(events, context);
			called.push(resolve);
		}
	}
	return events;
}
var attention = {
	name: "attention",
	resolveAll: resolveAllAttention,
	tokenize: tokenizeAttention
};
function resolveAllAttention(events, context) {
	let index$1 = -1;
	let open;
	let group;
	let text$6;
	let openingSequence;
	let closingSequence;
	let use;
	let nextEvents;
	let offset;
	while (++index$1 < events.length) if (events[index$1][0] === "enter" && events[index$1][1].type === "attentionSequence" && events[index$1][1]._close) {
		open = index$1;
		while (open--) if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index$1][1]).charCodeAt(0)) {
			if ((events[open][1]._close || events[index$1][1]._open) && (events[index$1][1].end.offset - events[index$1][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index$1][1].end.offset - events[index$1][1].start.offset) % 3)) continue;
			use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index$1][1].end.offset - events[index$1][1].start.offset > 1 ? 2 : 1;
			const start = { ...events[open][1].end };
			const end = { ...events[index$1][1].start };
			movePoint(start, -use);
			movePoint(end, use);
			openingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start,
				end: { ...events[open][1].end }
			};
			closingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...events[index$1][1].start },
				end
			};
			text$6 = {
				type: use > 1 ? "strongText" : "emphasisText",
				start: { ...events[open][1].end },
				end: { ...events[index$1][1].start }
			};
			group = {
				type: use > 1 ? "strong" : "emphasis",
				start: { ...openingSequence.start },
				end: { ...closingSequence.end }
			};
			events[open][1].end = { ...openingSequence.start };
			events[index$1][1].start = { ...closingSequence.end };
			nextEvents = [];
			if (events[open][1].end.offset - events[open][1].start.offset) nextEvents = push(nextEvents, [[
				"enter",
				events[open][1],
				context
			], [
				"exit",
				events[open][1],
				context
			]]);
			nextEvents = push(nextEvents, [
				[
					"enter",
					group,
					context
				],
				[
					"enter",
					openingSequence,
					context
				],
				[
					"exit",
					openingSequence,
					context
				],
				[
					"enter",
					text$6,
					context
				]
			]);
			nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index$1), context));
			nextEvents = push(nextEvents, [
				[
					"exit",
					text$6,
					context
				],
				[
					"enter",
					closingSequence,
					context
				],
				[
					"exit",
					closingSequence,
					context
				],
				[
					"exit",
					group,
					context
				]
			]);
			if (events[index$1][1].end.offset - events[index$1][1].start.offset) {
				offset = 2;
				nextEvents = push(nextEvents, [[
					"enter",
					events[index$1][1],
					context
				], [
					"exit",
					events[index$1][1],
					context
				]]);
			} else offset = 0;
			splice(events, open - 1, index$1 - open + 3, nextEvents);
			index$1 = open + nextEvents.length - offset - 2;
			break;
		}
	}
	index$1 = -1;
	while (++index$1 < events.length) if (events[index$1][1].type === "attentionSequence") events[index$1][1].type = "data";
	return events;
}
function tokenizeAttention(effects, ok$2) {
	const attentionMarkers$1 = this.parser.constructs.attentionMarkers.null;
	const previous$2 = this.previous;
	const before = classifyCharacter(previous$2);
	let marker;
	return start;
	function start(code$3) {
		marker = code$3;
		effects.enter("attentionSequence");
		return inside(code$3);
	}
	function inside(code$3) {
		if (code$3 === marker) {
			effects.consume(code$3);
			return inside;
		}
		const token = effects.exit("attentionSequence");
		const after = classifyCharacter(code$3);
		const open = !after || after === 2 && before || attentionMarkers$1.includes(code$3);
		const close = !before || before === 2 && after || attentionMarkers$1.includes(previous$2);
		token._open = Boolean(marker === 42 ? open : open && (before || !close));
		token._close = Boolean(marker === 42 ? close : close && (after || !open));
		return ok$2(code$3);
	}
}
function movePoint(point$3, offset) {
	point$3.column += offset;
	point$3.offset += offset;
	point$3._bufferIndex += offset;
}
var autolink = {
	name: "autolink",
	tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok$2, nok) {
	let size = 0;
	return start;
	function start(code$3) {
		effects.enter("autolink");
		effects.enter("autolinkMarker");
		effects.consume(code$3);
		effects.exit("autolinkMarker");
		effects.enter("autolinkProtocol");
		return open;
	}
	function open(code$3) {
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return schemeOrEmailAtext;
		}
		if (code$3 === 64) return nok(code$3);
		return emailAtext(code$3);
	}
	function schemeOrEmailAtext(code$3) {
		if (code$3 === 43 || code$3 === 45 || code$3 === 46 || asciiAlphanumeric(code$3)) {
			size = 1;
			return schemeInsideOrEmailAtext(code$3);
		}
		return emailAtext(code$3);
	}
	function schemeInsideOrEmailAtext(code$3) {
		if (code$3 === 58) {
			effects.consume(code$3);
			size = 0;
			return urlInside;
		}
		if ((code$3 === 43 || code$3 === 45 || code$3 === 46 || asciiAlphanumeric(code$3)) && size++ < 32) {
			effects.consume(code$3);
			return schemeInsideOrEmailAtext;
		}
		size = 0;
		return emailAtext(code$3);
	}
	function urlInside(code$3) {
		if (code$3 === 62) {
			effects.exit("autolinkProtocol");
			effects.enter("autolinkMarker");
			effects.consume(code$3);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok$2;
		}
		if (code$3 === null || code$3 === 32 || code$3 === 60 || asciiControl(code$3)) return nok(code$3);
		effects.consume(code$3);
		return urlInside;
	}
	function emailAtext(code$3) {
		if (code$3 === 64) {
			effects.consume(code$3);
			return emailAtSignOrDot;
		}
		if (asciiAtext(code$3)) {
			effects.consume(code$3);
			return emailAtext;
		}
		return nok(code$3);
	}
	function emailAtSignOrDot(code$3) {
		return asciiAlphanumeric(code$3) ? emailLabel(code$3) : nok(code$3);
	}
	function emailLabel(code$3) {
		if (code$3 === 46) {
			effects.consume(code$3);
			size = 0;
			return emailAtSignOrDot;
		}
		if (code$3 === 62) {
			effects.exit("autolinkProtocol").type = "autolinkEmail";
			effects.enter("autolinkMarker");
			effects.consume(code$3);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok$2;
		}
		return emailValue(code$3);
	}
	function emailValue(code$3) {
		if ((code$3 === 45 || asciiAlphanumeric(code$3)) && size++ < 63) {
			const next = code$3 === 45 ? emailValue : emailLabel;
			effects.consume(code$3);
			return next;
		}
		return nok(code$3);
	}
}
var blankLine = {
	partial: true,
	tokenize: tokenizeBlankLine
};
function tokenizeBlankLine(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		return markdownSpace(code$3) ? factorySpace(effects, after, "linePrefix")(code$3) : after(code$3);
	}
	function after(code$3) {
		return code$3 === null || markdownLineEnding(code$3) ? ok$2(code$3) : nok(code$3);
	}
}
var blockQuote = {
	continuation: { tokenize: tokenizeBlockQuoteContinuation },
	exit: exit$1,
	name: "blockQuote",
	tokenize: tokenizeBlockQuoteStart
};
function tokenizeBlockQuoteStart(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$3) {
		if (code$3 === 62) {
			const state = self.containerState;
			if (!state.open) {
				effects.enter("blockQuote", { _container: true });
				state.open = true;
			}
			effects.enter("blockQuotePrefix");
			effects.enter("blockQuoteMarker");
			effects.consume(code$3);
			effects.exit("blockQuoteMarker");
			return after;
		}
		return nok(code$3);
	}
	function after(code$3) {
		if (markdownSpace(code$3)) {
			effects.enter("blockQuotePrefixWhitespace");
			effects.consume(code$3);
			effects.exit("blockQuotePrefixWhitespace");
			effects.exit("blockQuotePrefix");
			return ok$2;
		}
		effects.exit("blockQuotePrefix");
		return ok$2(code$3);
	}
}
function tokenizeBlockQuoteContinuation(effects, ok$2, nok) {
	const self = this;
	return contStart;
	function contStart(code$3) {
		if (markdownSpace(code$3)) return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3);
		return contBefore(code$3);
	}
	function contBefore(code$3) {
		return effects.attempt(blockQuote, ok$2, nok)(code$3);
	}
}
function exit$1(effects) {
	effects.exit("blockQuote");
}
var characterEscape = {
	name: "characterEscape",
	tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		effects.enter("characterEscape");
		effects.enter("escapeMarker");
		effects.consume(code$3);
		effects.exit("escapeMarker");
		return inside;
	}
	function inside(code$3) {
		if (asciiPunctuation(code$3)) {
			effects.enter("characterEscapeValue");
			effects.consume(code$3);
			effects.exit("characterEscapeValue");
			effects.exit("characterEscape");
			return ok$2;
		}
		return nok(code$3);
	}
}
var characterReference = {
	name: "characterReference",
	tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok$2, nok) {
	const self = this;
	let size = 0;
	let max;
	let test;
	return start;
	function start(code$3) {
		effects.enter("characterReference");
		effects.enter("characterReferenceMarker");
		effects.consume(code$3);
		effects.exit("characterReferenceMarker");
		return open;
	}
	function open(code$3) {
		if (code$3 === 35) {
			effects.enter("characterReferenceMarkerNumeric");
			effects.consume(code$3);
			effects.exit("characterReferenceMarkerNumeric");
			return numeric;
		}
		effects.enter("characterReferenceValue");
		max = 31;
		test = asciiAlphanumeric;
		return value(code$3);
	}
	function numeric(code$3) {
		if (code$3 === 88 || code$3 === 120) {
			effects.enter("characterReferenceMarkerHexadecimal");
			effects.consume(code$3);
			effects.exit("characterReferenceMarkerHexadecimal");
			effects.enter("characterReferenceValue");
			max = 6;
			test = asciiHexDigit;
			return value;
		}
		effects.enter("characterReferenceValue");
		max = 7;
		test = asciiDigit;
		return value(code$3);
	}
	function value(code$3) {
		if (code$3 === 59 && size) {
			const token = effects.exit("characterReferenceValue");
			if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) return nok(code$3);
			effects.enter("characterReferenceMarker");
			effects.consume(code$3);
			effects.exit("characterReferenceMarker");
			effects.exit("characterReference");
			return ok$2;
		}
		if (test(code$3) && size++ < max) {
			effects.consume(code$3);
			return value;
		}
		return nok(code$3);
	}
}
var nonLazyContinuation = {
	partial: true,
	tokenize: tokenizeNonLazyContinuation
};
var codeFenced = {
	concrete: true,
	name: "codeFenced",
	tokenize: tokenizeCodeFenced
};
function tokenizeCodeFenced(effects, ok$2, nok) {
	const self = this;
	const closeStart = {
		partial: true,
		tokenize: tokenizeCloseStart
	};
	let initialPrefix = 0;
	let sizeOpen = 0;
	let marker;
	return start;
	function start(code$3) {
		return beforeSequenceOpen(code$3);
	}
	function beforeSequenceOpen(code$3) {
		const tail = self.events[self.events.length - 1];
		initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
		marker = code$3;
		effects.enter("codeFenced");
		effects.enter("codeFencedFence");
		effects.enter("codeFencedFenceSequence");
		return sequenceOpen(code$3);
	}
	function sequenceOpen(code$3) {
		if (code$3 === marker) {
			sizeOpen++;
			effects.consume(code$3);
			return sequenceOpen;
		}
		if (sizeOpen < 3) return nok(code$3);
		effects.exit("codeFencedFenceSequence");
		return markdownSpace(code$3) ? factorySpace(effects, infoBefore, "whitespace")(code$3) : infoBefore(code$3);
	}
	function infoBefore(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("codeFencedFence");
			return self.interrupt ? ok$2(code$3) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code$3);
		}
		effects.enter("codeFencedFenceInfo");
		effects.enter("chunkString", { contentType: "string" });
		return info(code$3);
	}
	function info(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return infoBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return factorySpace(effects, metaBefore, "whitespace")(code$3);
		}
		if (code$3 === 96 && code$3 === marker) return nok(code$3);
		effects.consume(code$3);
		return info;
	}
	function metaBefore(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return infoBefore(code$3);
		effects.enter("codeFencedFenceMeta");
		effects.enter("chunkString", { contentType: "string" });
		return meta(code$3);
	}
	function meta(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceMeta");
			return infoBefore(code$3);
		}
		if (code$3 === 96 && code$3 === marker) return nok(code$3);
		effects.consume(code$3);
		return meta;
	}
	function atNonLazyBreak(code$3) {
		return effects.attempt(closeStart, after, contentBefore)(code$3);
	}
	function contentBefore(code$3) {
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return contentStart;
	}
	function contentStart(code$3) {
		return initialPrefix > 0 && markdownSpace(code$3) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code$3) : beforeContentChunk(code$3);
	}
	function beforeContentChunk(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code$3);
		effects.enter("codeFlowValue");
		return contentChunk(code$3);
	}
	function contentChunk(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("codeFlowValue");
			return beforeContentChunk(code$3);
		}
		effects.consume(code$3);
		return contentChunk;
	}
	function after(code$3) {
		effects.exit("codeFenced");
		return ok$2(code$3);
	}
	function tokenizeCloseStart(effects$1, ok$3, nok$1) {
		let size = 0;
		return startBefore;
		function startBefore(code$3) {
			effects$1.enter("lineEnding");
			effects$1.consume(code$3);
			effects$1.exit("lineEnding");
			return start$1;
		}
		function start$1(code$3) {
			effects$1.enter("codeFencedFence");
			return markdownSpace(code$3) ? factorySpace(effects$1, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3) : beforeSequenceClose(code$3);
		}
		function beforeSequenceClose(code$3) {
			if (code$3 === marker) {
				effects$1.enter("codeFencedFenceSequence");
				return sequenceClose(code$3);
			}
			return nok$1(code$3);
		}
		function sequenceClose(code$3) {
			if (code$3 === marker) {
				size++;
				effects$1.consume(code$3);
				return sequenceClose;
			}
			if (size >= sizeOpen) {
				effects$1.exit("codeFencedFenceSequence");
				return markdownSpace(code$3) ? factorySpace(effects$1, sequenceCloseAfter, "whitespace")(code$3) : sequenceCloseAfter(code$3);
			}
			return nok$1(code$3);
		}
		function sequenceCloseAfter(code$3) {
			if (code$3 === null || markdownLineEnding(code$3)) {
				effects$1.exit("codeFencedFence");
				return ok$3(code$3);
			}
			return nok$1(code$3);
		}
	}
}
function tokenizeNonLazyContinuation(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$3) {
		if (code$3 === null) return nok(code$3);
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return lineStart;
	}
	function lineStart(code$3) {
		return self.parser.lazy[self.now().line] ? nok(code$3) : ok$2(code$3);
	}
}
var codeIndented = {
	name: "codeIndented",
	tokenize: tokenizeCodeIndented
};
var furtherStart = {
	partial: true,
	tokenize: tokenizeFurtherStart
};
function tokenizeCodeIndented(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$3) {
		effects.enter("codeIndented");
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code$3);
	}
	function afterPrefix(code$3) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code$3) : nok(code$3);
	}
	function atBreak(code$3) {
		if (code$3 === null) return after(code$3);
		if (markdownLineEnding(code$3)) return effects.attempt(furtherStart, atBreak, after)(code$3);
		effects.enter("codeFlowValue");
		return inside(code$3);
	}
	function inside(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("codeFlowValue");
			return atBreak(code$3);
		}
		effects.consume(code$3);
		return inside;
	}
	function after(code$3) {
		effects.exit("codeIndented");
		return ok$2(code$3);
	}
}
function tokenizeFurtherStart(effects, ok$2, nok) {
	const self = this;
	return furtherStart$1;
	function furtherStart$1(code$3) {
		if (self.parser.lazy[self.now().line]) return nok(code$3);
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return furtherStart$1;
		}
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code$3);
	}
	function afterPrefix(code$3) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok$2(code$3) : markdownLineEnding(code$3) ? furtherStart$1(code$3) : nok(code$3);
	}
}
var codeText = {
	name: "codeText",
	previous: previous$1,
	resolve: resolveCodeText,
	tokenize: tokenizeCodeText
};
function resolveCodeText(events) {
	let tailExitIndex = events.length - 4;
	let headEnterIndex = 3;
	let index$1;
	let enter;
	if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
		index$1 = headEnterIndex;
		while (++index$1 < tailExitIndex) if (events[index$1][1].type === "codeTextData") {
			events[headEnterIndex][1].type = "codeTextPadding";
			events[tailExitIndex][1].type = "codeTextPadding";
			headEnterIndex += 2;
			tailExitIndex -= 2;
			break;
		}
	}
	index$1 = headEnterIndex - 1;
	tailExitIndex++;
	while (++index$1 <= tailExitIndex) if (enter === void 0) {
		if (index$1 !== tailExitIndex && events[index$1][1].type !== "lineEnding") enter = index$1;
	} else if (index$1 === tailExitIndex || events[index$1][1].type === "lineEnding") {
		events[enter][1].type = "codeTextData";
		if (index$1 !== enter + 2) {
			events[enter][1].end = events[index$1 - 1][1].end;
			events.splice(enter + 2, index$1 - enter - 2);
			tailExitIndex -= index$1 - enter - 2;
			index$1 = enter + 2;
		}
		enter = void 0;
	}
	return events;
}
function previous$1(code$3) {
	return code$3 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok$2, nok) {
	let sizeOpen = 0;
	let size;
	let token;
	return start;
	function start(code$3) {
		effects.enter("codeText");
		effects.enter("codeTextSequence");
		return sequenceOpen(code$3);
	}
	function sequenceOpen(code$3) {
		if (code$3 === 96) {
			effects.consume(code$3);
			sizeOpen++;
			return sequenceOpen;
		}
		effects.exit("codeTextSequence");
		return between(code$3);
	}
	function between(code$3) {
		if (code$3 === null) return nok(code$3);
		if (code$3 === 32) {
			effects.enter("space");
			effects.consume(code$3);
			effects.exit("space");
			return between;
		}
		if (code$3 === 96) {
			token = effects.enter("codeTextSequence");
			size = 0;
			return sequenceClose(code$3);
		}
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return between;
		}
		effects.enter("codeTextData");
		return data(code$3);
	}
	function data(code$3) {
		if (code$3 === null || code$3 === 32 || code$3 === 96 || markdownLineEnding(code$3)) {
			effects.exit("codeTextData");
			return between(code$3);
		}
		effects.consume(code$3);
		return data;
	}
	function sequenceClose(code$3) {
		if (code$3 === 96) {
			effects.consume(code$3);
			size++;
			return sequenceClose;
		}
		if (size === sizeOpen) {
			effects.exit("codeTextSequence");
			effects.exit("codeText");
			return ok$2(code$3);
		}
		token.type = "codeTextData";
		return data(code$3);
	}
}
var SpliceBuffer = class {
	constructor(initial) {
		this.left = initial ? [...initial] : [];
		this.right = [];
	}
	get(index$1) {
		if (index$1 < 0 || index$1 >= this.left.length + this.right.length) throw new RangeError("Cannot access index `" + index$1 + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		if (index$1 < this.left.length) return this.left[index$1];
		return this.right[this.right.length - index$1 + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		this.setCursor(0);
		return this.right.pop();
	}
	slice(start, end) {
		const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
		if (stop < this.left.length) return this.left.slice(start, stop);
		if (start > this.left.length) return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
		return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
	}
	splice(start, deleteCount, items) {
		const count = deleteCount || 0;
		this.setCursor(Math.trunc(start));
		const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
		if (items) chunkedPush(this.left, items);
		return removed.reverse();
	}
	pop() {
		this.setCursor(Number.POSITIVE_INFINITY);
		return this.left.pop();
	}
	push(item) {
		this.setCursor(Number.POSITIVE_INFINITY);
		this.left.push(item);
	}
	pushMany(items) {
		this.setCursor(Number.POSITIVE_INFINITY);
		chunkedPush(this.left, items);
	}
	unshift(item) {
		this.setCursor(0);
		this.right.push(item);
	}
	unshiftMany(items) {
		this.setCursor(0);
		chunkedPush(this.right, items.reverse());
	}
	setCursor(n) {
		if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
		if (n < this.left.length) {
			const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
			chunkedPush(this.right, removed.reverse());
		} else {
			const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
			chunkedPush(this.left, removed.reverse());
		}
	}
};
function chunkedPush(list$3, right) {
	let chunkStart = 0;
	if (right.length < 1e4) list$3.push(...right);
	else while (chunkStart < right.length) {
		list$3.push(...right.slice(chunkStart, chunkStart + 1e4));
		chunkStart += 1e4;
	}
}
function subtokenize(eventsArray) {
	const jumps = {};
	let index$1 = -1;
	let event;
	let lineIndex;
	let otherIndex;
	let otherEvent;
	let parameters;
	let subevents;
	let more;
	const events = new SpliceBuffer(eventsArray);
	while (++index$1 < events.length) {
		while (index$1 in jumps) index$1 = jumps[index$1];
		event = events.get(index$1);
		if (index$1 && event[1].type === "chunkFlow" && events.get(index$1 - 1)[1].type === "listItemPrefix") {
			subevents = event[1]._tokenizer.events;
			otherIndex = 0;
			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") otherIndex += 2;
			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") while (++otherIndex < subevents.length) {
				if (subevents[otherIndex][1].type === "content") break;
				if (subevents[otherIndex][1].type === "chunkText") {
					subevents[otherIndex][1]._isInFirstContentOfListItem = true;
					otherIndex++;
				}
			}
		}
		if (event[0] === "enter") {
			if (event[1].contentType) {
				Object.assign(jumps, subcontent(events, index$1));
				index$1 = jumps[index$1];
				more = true;
			}
		} else if (event[1]._container) {
			otherIndex = index$1;
			lineIndex = void 0;
			while (otherIndex--) {
				otherEvent = events.get(otherIndex);
				if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
					if (otherEvent[0] === "enter") {
						if (lineIndex) events.get(lineIndex)[1].type = "lineEndingBlank";
						otherEvent[1].type = "lineEnding";
						lineIndex = otherIndex;
					}
				} else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") {} else break;
			}
			if (lineIndex) {
				event[1].end = { ...events.get(lineIndex)[1].start };
				parameters = events.slice(lineIndex, index$1);
				parameters.unshift(event);
				events.splice(lineIndex, index$1 - lineIndex + 1, parameters);
			}
		}
	}
	splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
	return !more;
}
function subcontent(events, eventIndex) {
	const token = events.get(eventIndex)[1];
	const context = events.get(eventIndex)[2];
	let startPosition = eventIndex - 1;
	const startPositions = [];
	let tokenizer = token._tokenizer;
	if (!tokenizer) {
		tokenizer = context.parser[token.contentType](token.start);
		if (token._contentTypeTextTrailing) tokenizer._contentTypeTextTrailing = true;
	}
	const childEvents = tokenizer.events;
	const jumps = [];
	const gaps = {};
	let stream;
	let previous$2;
	let index$1 = -1;
	let current = token;
	let adjust = 0;
	let start = 0;
	const breaks = [start];
	while (current) {
		while (events.get(++startPosition)[1] !== current);
		startPositions.push(startPosition);
		if (!current._tokenizer) {
			stream = context.sliceStream(current);
			if (!current.next) stream.push(null);
			if (previous$2) tokenizer.defineSkip(current.start);
			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = true;
			tokenizer.write(stream);
			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = void 0;
		}
		previous$2 = current;
		current = current.next;
	}
	current = token;
	while (++index$1 < childEvents.length) if (childEvents[index$1][0] === "exit" && childEvents[index$1 - 1][0] === "enter" && childEvents[index$1][1].type === childEvents[index$1 - 1][1].type && childEvents[index$1][1].start.line !== childEvents[index$1][1].end.line) {
		start = index$1 + 1;
		breaks.push(start);
		current._tokenizer = void 0;
		current.previous = void 0;
		current = current.next;
	}
	tokenizer.events = [];
	if (current) {
		current._tokenizer = void 0;
		current.previous = void 0;
	} else breaks.pop();
	index$1 = breaks.length;
	while (index$1--) {
		const slice = childEvents.slice(breaks[index$1], breaks[index$1 + 1]);
		const start$1 = startPositions.pop();
		jumps.push([start$1, start$1 + slice.length - 1]);
		events.splice(start$1, 2, slice);
	}
	jumps.reverse();
	index$1 = -1;
	while (++index$1 < jumps.length) {
		gaps[adjust + jumps[index$1][0]] = adjust + jumps[index$1][1];
		adjust += jumps[index$1][1] - jumps[index$1][0] - 1;
	}
	return gaps;
}
var content$1 = {
	resolve: resolveContent,
	tokenize: tokenizeContent
};
var continuationConstruct = {
	partial: true,
	tokenize: tokenizeContinuation
};
function resolveContent(events) {
	subtokenize(events);
	return events;
}
function tokenizeContent(effects, ok$2) {
	let previous$2;
	return chunkStart;
	function chunkStart(code$3) {
		effects.enter("content");
		previous$2 = effects.enter("chunkContent", { contentType: "content" });
		return chunkInside(code$3);
	}
	function chunkInside(code$3) {
		if (code$3 === null) return contentEnd(code$3);
		if (markdownLineEnding(code$3)) return effects.check(continuationConstruct, contentContinue, contentEnd)(code$3);
		effects.consume(code$3);
		return chunkInside;
	}
	function contentEnd(code$3) {
		effects.exit("chunkContent");
		effects.exit("content");
		return ok$2(code$3);
	}
	function contentContinue(code$3) {
		effects.consume(code$3);
		effects.exit("chunkContent");
		previous$2.next = effects.enter("chunkContent", {
			contentType: "content",
			previous: previous$2
		});
		previous$2 = previous$2.next;
		return chunkInside;
	}
}
function tokenizeContinuation(effects, ok$2, nok) {
	const self = this;
	return startLookahead;
	function startLookahead(code$3) {
		effects.exit("chunkContent");
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return factorySpace(effects, prefixed, "linePrefix");
	}
	function prefixed(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return nok(code$3);
		const tail = self.events[self.events.length - 1];
		if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) return ok$2(code$3);
		return effects.interrupt(self.parser.constructs.flow, nok, ok$2)(code$3);
	}
}
function factoryDestination(effects, ok$2, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
	const limit = max || Number.POSITIVE_INFINITY;
	let balance = 0;
	return start;
	function start(code$3) {
		if (code$3 === 60) {
			effects.enter(type);
			effects.enter(literalType);
			effects.enter(literalMarkerType);
			effects.consume(code$3);
			effects.exit(literalMarkerType);
			return enclosedBefore;
		}
		if (code$3 === null || code$3 === 32 || code$3 === 41 || asciiControl(code$3)) return nok(code$3);
		effects.enter(type);
		effects.enter(rawType);
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return raw(code$3);
	}
	function enclosedBefore(code$3) {
		if (code$3 === 62) {
			effects.enter(literalMarkerType);
			effects.consume(code$3);
			effects.exit(literalMarkerType);
			effects.exit(literalType);
			effects.exit(type);
			return ok$2;
		}
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return enclosed(code$3);
	}
	function enclosed(code$3) {
		if (code$3 === 62) {
			effects.exit("chunkString");
			effects.exit(stringType);
			return enclosedBefore(code$3);
		}
		if (code$3 === null || code$3 === 60 || markdownLineEnding(code$3)) return nok(code$3);
		effects.consume(code$3);
		return code$3 === 92 ? enclosedEscape : enclosed;
	}
	function enclosedEscape(code$3) {
		if (code$3 === 60 || code$3 === 62 || code$3 === 92) {
			effects.consume(code$3);
			return enclosed;
		}
		return enclosed(code$3);
	}
	function raw(code$3) {
		if (!balance && (code$3 === null || code$3 === 41 || markdownLineEndingOrSpace(code$3))) {
			effects.exit("chunkString");
			effects.exit(stringType);
			effects.exit(rawType);
			effects.exit(type);
			return ok$2(code$3);
		}
		if (balance < limit && code$3 === 40) {
			effects.consume(code$3);
			balance++;
			return raw;
		}
		if (code$3 === 41) {
			effects.consume(code$3);
			balance--;
			return raw;
		}
		if (code$3 === null || code$3 === 32 || code$3 === 40 || asciiControl(code$3)) return nok(code$3);
		effects.consume(code$3);
		return code$3 === 92 ? rawEscape : raw;
	}
	function rawEscape(code$3) {
		if (code$3 === 40 || code$3 === 41 || code$3 === 92) {
			effects.consume(code$3);
			return raw;
		}
		return raw(code$3);
	}
}
function factoryLabel(effects, ok$2, nok, type, markerType, stringType) {
	const self = this;
	let size = 0;
	let seen;
	return start;
	function start(code$3) {
		effects.enter(type);
		effects.enter(markerType);
		effects.consume(code$3);
		effects.exit(markerType);
		effects.enter(stringType);
		return atBreak;
	}
	function atBreak(code$3) {
		if (size > 999 || code$3 === null || code$3 === 91 || code$3 === 93 && !seen || code$3 === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) return nok(code$3);
		if (code$3 === 93) {
			effects.exit(stringType);
			effects.enter(markerType);
			effects.consume(code$3);
			effects.exit(markerType);
			effects.exit(type);
			return ok$2;
		}
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return atBreak;
		}
		effects.enter("chunkString", { contentType: "string" });
		return labelInside(code$3);
	}
	function labelInside(code$3) {
		if (code$3 === null || code$3 === 91 || code$3 === 93 || markdownLineEnding(code$3) || size++ > 999) {
			effects.exit("chunkString");
			return atBreak(code$3);
		}
		effects.consume(code$3);
		if (!seen) seen = !markdownSpace(code$3);
		return code$3 === 92 ? labelEscape : labelInside;
	}
	function labelEscape(code$3) {
		if (code$3 === 91 || code$3 === 92 || code$3 === 93) {
			effects.consume(code$3);
			size++;
			return labelInside;
		}
		return labelInside(code$3);
	}
}
function factoryTitle(effects, ok$2, nok, type, markerType, stringType) {
	let marker;
	return start;
	function start(code$3) {
		if (code$3 === 34 || code$3 === 39 || code$3 === 40) {
			effects.enter(type);
			effects.enter(markerType);
			effects.consume(code$3);
			effects.exit(markerType);
			marker = code$3 === 40 ? 41 : code$3;
			return begin;
		}
		return nok(code$3);
	}
	function begin(code$3) {
		if (code$3 === marker) {
			effects.enter(markerType);
			effects.consume(code$3);
			effects.exit(markerType);
			effects.exit(type);
			return ok$2;
		}
		effects.enter(stringType);
		return atBreak(code$3);
	}
	function atBreak(code$3) {
		if (code$3 === marker) {
			effects.exit(stringType);
			return begin(marker);
		}
		if (code$3 === null) return nok(code$3);
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return factorySpace(effects, atBreak, "linePrefix");
		}
		effects.enter("chunkString", { contentType: "string" });
		return inside(code$3);
	}
	function inside(code$3) {
		if (code$3 === marker || code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("chunkString");
			return atBreak(code$3);
		}
		effects.consume(code$3);
		return code$3 === 92 ? escape$1 : inside;
	}
	function escape$1(code$3) {
		if (code$3 === marker || code$3 === 92) {
			effects.consume(code$3);
			return inside;
		}
		return inside(code$3);
	}
}
function factoryWhitespace(effects, ok$2) {
	let seen;
	return start;
	function start(code$3) {
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			seen = true;
			return start;
		}
		if (markdownSpace(code$3)) return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code$3);
		return ok$2(code$3);
	}
}
var definition$1 = {
	name: "definition",
	tokenize: tokenizeDefinition
};
var titleBefore = {
	partial: true,
	tokenize: tokenizeTitleBefore
};
function tokenizeDefinition(effects, ok$2, nok) {
	const self = this;
	let identifier;
	return start;
	function start(code$3) {
		effects.enter("definition");
		return before(code$3);
	}
	function before(code$3) {
		return factoryLabel.call(self, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code$3);
	}
	function labelAfter(code$3) {
		identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
		if (code$3 === 58) {
			effects.enter("definitionMarker");
			effects.consume(code$3);
			effects.exit("definitionMarker");
			return markerAfter;
		}
		return nok(code$3);
	}
	function markerAfter(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, destinationBefore)(code$3) : destinationBefore(code$3);
	}
	function destinationBefore(code$3) {
		return factoryDestination(effects, destinationAfter, nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code$3);
	}
	function destinationAfter(code$3) {
		return effects.attempt(titleBefore, after, after)(code$3);
	}
	function after(code$3) {
		return markdownSpace(code$3) ? factorySpace(effects, afterWhitespace, "whitespace")(code$3) : afterWhitespace(code$3);
	}
	function afterWhitespace(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("definition");
			self.parser.defined.push(identifier);
			return ok$2(code$3);
		}
		return nok(code$3);
	}
}
function tokenizeTitleBefore(effects, ok$2, nok) {
	return titleBefore$1;
	function titleBefore$1(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, beforeMarker)(code$3) : nok(code$3);
	}
	function beforeMarker(code$3) {
		return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code$3);
	}
	function titleAfter(code$3) {
		return markdownSpace(code$3) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code$3) : titleAfterOptionalWhitespace(code$3);
	}
	function titleAfterOptionalWhitespace(code$3) {
		return code$3 === null || markdownLineEnding(code$3) ? ok$2(code$3) : nok(code$3);
	}
}
var hardBreakEscape = {
	name: "hardBreakEscape",
	tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		effects.enter("hardBreakEscape");
		effects.consume(code$3);
		return after;
	}
	function after(code$3) {
		if (markdownLineEnding(code$3)) {
			effects.exit("hardBreakEscape");
			return ok$2(code$3);
		}
		return nok(code$3);
	}
}
var headingAtx = {
	name: "headingAtx",
	resolve: resolveHeadingAtx,
	tokenize: tokenizeHeadingAtx
};
function resolveHeadingAtx(events, context) {
	let contentEnd = events.length - 2;
	let contentStart = 3;
	let content$2;
	let text$6;
	if (events[contentStart][1].type === "whitespace") contentStart += 2;
	if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") contentEnd -= 2;
	if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
	if (contentEnd > contentStart) {
		content$2 = {
			type: "atxHeadingText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end
		};
		text$6 = {
			type: "chunkText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end,
			contentType: "text"
		};
		splice(events, contentStart, contentEnd - contentStart + 1, [
			[
				"enter",
				content$2,
				context
			],
			[
				"enter",
				text$6,
				context
			],
			[
				"exit",
				text$6,
				context
			],
			[
				"exit",
				content$2,
				context
			]
		]);
	}
	return events;
}
function tokenizeHeadingAtx(effects, ok$2, nok) {
	let size = 0;
	return start;
	function start(code$3) {
		effects.enter("atxHeading");
		return before(code$3);
	}
	function before(code$3) {
		effects.enter("atxHeadingSequence");
		return sequenceOpen(code$3);
	}
	function sequenceOpen(code$3) {
		if (code$3 === 35 && size++ < 6) {
			effects.consume(code$3);
			return sequenceOpen;
		}
		if (code$3 === null || markdownLineEndingOrSpace(code$3)) {
			effects.exit("atxHeadingSequence");
			return atBreak(code$3);
		}
		return nok(code$3);
	}
	function atBreak(code$3) {
		if (code$3 === 35) {
			effects.enter("atxHeadingSequence");
			return sequenceFurther(code$3);
		}
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("atxHeading");
			return ok$2(code$3);
		}
		if (markdownSpace(code$3)) return factorySpace(effects, atBreak, "whitespace")(code$3);
		effects.enter("atxHeadingText");
		return data(code$3);
	}
	function sequenceFurther(code$3) {
		if (code$3 === 35) {
			effects.consume(code$3);
			return sequenceFurther;
		}
		effects.exit("atxHeadingSequence");
		return atBreak(code$3);
	}
	function data(code$3) {
		if (code$3 === null || code$3 === 35 || markdownLineEndingOrSpace(code$3)) {
			effects.exit("atxHeadingText");
			return atBreak(code$3);
		}
		effects.consume(code$3);
		return data;
	}
}
var htmlBlockNames = [
	"address",
	"article",
	"aside",
	"base",
	"basefont",
	"blockquote",
	"body",
	"caption",
	"center",
	"col",
	"colgroup",
	"dd",
	"details",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"frame",
	"frameset",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hr",
	"html",
	"iframe",
	"legend",
	"li",
	"link",
	"main",
	"menu",
	"menuitem",
	"nav",
	"noframes",
	"ol",
	"optgroup",
	"option",
	"p",
	"param",
	"search",
	"section",
	"summary",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"title",
	"tr",
	"track",
	"ul"
];
var htmlRawNames = [
	"pre",
	"script",
	"style",
	"textarea"
];
var htmlFlow = {
	concrete: true,
	name: "htmlFlow",
	resolveTo: resolveToHtmlFlow,
	tokenize: tokenizeHtmlFlow
};
var blankLineBefore = {
	partial: true,
	tokenize: tokenizeBlankLineBefore
};
var nonLazyContinuationStart = {
	partial: true,
	tokenize: tokenizeNonLazyContinuationStart
};
function resolveToHtmlFlow(events) {
	let index$1 = events.length;
	while (index$1--) if (events[index$1][0] === "enter" && events[index$1][1].type === "htmlFlow") break;
	if (index$1 > 1 && events[index$1 - 2][1].type === "linePrefix") {
		events[index$1][1].start = events[index$1 - 2][1].start;
		events[index$1 + 1][1].start = events[index$1 - 2][1].start;
		events.splice(index$1 - 2, 2);
	}
	return events;
}
function tokenizeHtmlFlow(effects, ok$2, nok) {
	const self = this;
	let marker;
	let closingTag;
	let buffer;
	let index$1;
	let markerB;
	return start;
	function start(code$3) {
		return before(code$3);
	}
	function before(code$3) {
		effects.enter("htmlFlow");
		effects.enter("htmlFlowData");
		effects.consume(code$3);
		return open;
	}
	function open(code$3) {
		if (code$3 === 33) {
			effects.consume(code$3);
			return declarationOpen;
		}
		if (code$3 === 47) {
			effects.consume(code$3);
			closingTag = true;
			return tagCloseStart;
		}
		if (code$3 === 63) {
			effects.consume(code$3);
			marker = 3;
			return self.interrupt ? ok$2 : continuationDeclarationInside;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			buffer = String.fromCharCode(code$3);
			return tagName;
		}
		return nok(code$3);
	}
	function declarationOpen(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			marker = 2;
			return commentOpenInside;
		}
		if (code$3 === 91) {
			effects.consume(code$3);
			marker = 5;
			index$1 = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			marker = 4;
			return self.interrupt ? ok$2 : continuationDeclarationInside;
		}
		return nok(code$3);
	}
	function commentOpenInside(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return self.interrupt ? ok$2 : continuationDeclarationInside;
		}
		return nok(code$3);
	}
	function cdataOpenInside(code$3) {
		if (code$3 === "CDATA[".charCodeAt(index$1++)) {
			effects.consume(code$3);
			if (index$1 === 6) return self.interrupt ? ok$2 : continuation;
			return cdataOpenInside;
		}
		return nok(code$3);
	}
	function tagCloseStart(code$3) {
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			buffer = String.fromCharCode(code$3);
			return tagName;
		}
		return nok(code$3);
	}
	function tagName(code$3) {
		if (code$3 === null || code$3 === 47 || code$3 === 62 || markdownLineEndingOrSpace(code$3)) {
			const slash = code$3 === 47;
			const name$1 = buffer.toLowerCase();
			if (!slash && !closingTag && htmlRawNames.includes(name$1)) {
				marker = 1;
				return self.interrupt ? ok$2(code$3) : continuation(code$3);
			}
			if (htmlBlockNames.includes(buffer.toLowerCase())) {
				marker = 6;
				if (slash) {
					effects.consume(code$3);
					return basicSelfClosing;
				}
				return self.interrupt ? ok$2(code$3) : continuation(code$3);
			}
			marker = 7;
			return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code$3) : closingTag ? completeClosingTagAfter(code$3) : completeAttributeNameBefore(code$3);
		}
		if (code$3 === 45 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			buffer += String.fromCharCode(code$3);
			return tagName;
		}
		return nok(code$3);
	}
	function basicSelfClosing(code$3) {
		if (code$3 === 62) {
			effects.consume(code$3);
			return self.interrupt ? ok$2 : continuation;
		}
		return nok(code$3);
	}
	function completeClosingTagAfter(code$3) {
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeClosingTagAfter;
		}
		return completeEnd(code$3);
	}
	function completeAttributeNameBefore(code$3) {
		if (code$3 === 47) {
			effects.consume(code$3);
			return completeEnd;
		}
		if (code$3 === 58 || code$3 === 95 || asciiAlpha(code$3)) {
			effects.consume(code$3);
			return completeAttributeName;
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeAttributeNameBefore;
		}
		return completeEnd(code$3);
	}
	function completeAttributeName(code$3) {
		if (code$3 === 45 || code$3 === 46 || code$3 === 58 || code$3 === 95 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			return completeAttributeName;
		}
		return completeAttributeNameAfter(code$3);
	}
	function completeAttributeNameAfter(code$3) {
		if (code$3 === 61) {
			effects.consume(code$3);
			return completeAttributeValueBefore;
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeAttributeNameAfter;
		}
		return completeAttributeNameBefore(code$3);
	}
	function completeAttributeValueBefore(code$3) {
		if (code$3 === null || code$3 === 60 || code$3 === 61 || code$3 === 62 || code$3 === 96) return nok(code$3);
		if (code$3 === 34 || code$3 === 39) {
			effects.consume(code$3);
			markerB = code$3;
			return completeAttributeValueQuoted;
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeAttributeValueBefore;
		}
		return completeAttributeValueUnquoted(code$3);
	}
	function completeAttributeValueQuoted(code$3) {
		if (code$3 === markerB) {
			effects.consume(code$3);
			markerB = null;
			return completeAttributeValueQuotedAfter;
		}
		if (code$3 === null || markdownLineEnding(code$3)) return nok(code$3);
		effects.consume(code$3);
		return completeAttributeValueQuoted;
	}
	function completeAttributeValueUnquoted(code$3) {
		if (code$3 === null || code$3 === 34 || code$3 === 39 || code$3 === 47 || code$3 === 60 || code$3 === 61 || code$3 === 62 || code$3 === 96 || markdownLineEndingOrSpace(code$3)) return completeAttributeNameAfter(code$3);
		effects.consume(code$3);
		return completeAttributeValueUnquoted;
	}
	function completeAttributeValueQuotedAfter(code$3) {
		if (code$3 === 47 || code$3 === 62 || markdownSpace(code$3)) return completeAttributeNameBefore(code$3);
		return nok(code$3);
	}
	function completeEnd(code$3) {
		if (code$3 === 62) {
			effects.consume(code$3);
			return completeAfter;
		}
		return nok(code$3);
	}
	function completeAfter(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return continuation(code$3);
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeAfter;
		}
		return nok(code$3);
	}
	function continuation(code$3) {
		if (code$3 === 45 && marker === 2) {
			effects.consume(code$3);
			return continuationCommentInside;
		}
		if (code$3 === 60 && marker === 1) {
			effects.consume(code$3);
			return continuationRawTagOpen;
		}
		if (code$3 === 62 && marker === 4) {
			effects.consume(code$3);
			return continuationClose;
		}
		if (code$3 === 63 && marker === 3) {
			effects.consume(code$3);
			return continuationDeclarationInside;
		}
		if (code$3 === 93 && marker === 5) {
			effects.consume(code$3);
			return continuationCdataInside;
		}
		if (markdownLineEnding(code$3) && (marker === 6 || marker === 7)) {
			effects.exit("htmlFlowData");
			return effects.check(blankLineBefore, continuationAfter, continuationStart)(code$3);
		}
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("htmlFlowData");
			return continuationStart(code$3);
		}
		effects.consume(code$3);
		return continuation;
	}
	function continuationStart(code$3) {
		return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code$3);
	}
	function continuationStartNonLazy(code$3) {
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return continuationBefore;
	}
	function continuationBefore(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return continuationStart(code$3);
		effects.enter("htmlFlowData");
		return continuation(code$3);
	}
	function continuationCommentInside(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return continuationDeclarationInside;
		}
		return continuation(code$3);
	}
	function continuationRawTagOpen(code$3) {
		if (code$3 === 47) {
			effects.consume(code$3);
			buffer = "";
			return continuationRawEndTag;
		}
		return continuation(code$3);
	}
	function continuationRawEndTag(code$3) {
		if (code$3 === 62) {
			const name$1 = buffer.toLowerCase();
			if (htmlRawNames.includes(name$1)) {
				effects.consume(code$3);
				return continuationClose;
			}
			return continuation(code$3);
		}
		if (asciiAlpha(code$3) && buffer.length < 8) {
			effects.consume(code$3);
			buffer += String.fromCharCode(code$3);
			return continuationRawEndTag;
		}
		return continuation(code$3);
	}
	function continuationCdataInside(code$3) {
		if (code$3 === 93) {
			effects.consume(code$3);
			return continuationDeclarationInside;
		}
		return continuation(code$3);
	}
	function continuationDeclarationInside(code$3) {
		if (code$3 === 62) {
			effects.consume(code$3);
			return continuationClose;
		}
		if (code$3 === 45 && marker === 2) {
			effects.consume(code$3);
			return continuationDeclarationInside;
		}
		return continuation(code$3);
	}
	function continuationClose(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("htmlFlowData");
			return continuationAfter(code$3);
		}
		effects.consume(code$3);
		return continuationClose;
	}
	function continuationAfter(code$3) {
		effects.exit("htmlFlow");
		return ok$2(code$3);
	}
}
function tokenizeNonLazyContinuationStart(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$3) {
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return after;
		}
		return nok(code$3);
	}
	function after(code$3) {
		return self.parser.lazy[self.now().line] ? nok(code$3) : ok$2(code$3);
	}
}
function tokenizeBlankLineBefore(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return effects.attempt(blankLine, ok$2, nok);
	}
}
var htmlText = {
	name: "htmlText",
	tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok$2, nok) {
	const self = this;
	let marker;
	let index$1;
	let returnState;
	return start;
	function start(code$3) {
		effects.enter("htmlText");
		effects.enter("htmlTextData");
		effects.consume(code$3);
		return open;
	}
	function open(code$3) {
		if (code$3 === 33) {
			effects.consume(code$3);
			return declarationOpen;
		}
		if (code$3 === 47) {
			effects.consume(code$3);
			return tagCloseStart;
		}
		if (code$3 === 63) {
			effects.consume(code$3);
			return instruction;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return tagOpen;
		}
		return nok(code$3);
	}
	function declarationOpen(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return commentOpenInside;
		}
		if (code$3 === 91) {
			effects.consume(code$3);
			index$1 = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return declaration;
		}
		return nok(code$3);
	}
	function commentOpenInside(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return commentEnd;
		}
		return nok(code$3);
	}
	function comment(code$3) {
		if (code$3 === null) return nok(code$3);
		if (code$3 === 45) {
			effects.consume(code$3);
			return commentClose;
		}
		if (markdownLineEnding(code$3)) {
			returnState = comment;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return comment;
	}
	function commentClose(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return commentEnd;
		}
		return comment(code$3);
	}
	function commentEnd(code$3) {
		return code$3 === 62 ? end(code$3) : code$3 === 45 ? commentClose(code$3) : comment(code$3);
	}
	function cdataOpenInside(code$3) {
		if (code$3 === "CDATA[".charCodeAt(index$1++)) {
			effects.consume(code$3);
			return index$1 === 6 ? cdata : cdataOpenInside;
		}
		return nok(code$3);
	}
	function cdata(code$3) {
		if (code$3 === null) return nok(code$3);
		if (code$3 === 93) {
			effects.consume(code$3);
			return cdataClose;
		}
		if (markdownLineEnding(code$3)) {
			returnState = cdata;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return cdata;
	}
	function cdataClose(code$3) {
		if (code$3 === 93) {
			effects.consume(code$3);
			return cdataEnd;
		}
		return cdata(code$3);
	}
	function cdataEnd(code$3) {
		if (code$3 === 62) return end(code$3);
		if (code$3 === 93) {
			effects.consume(code$3);
			return cdataEnd;
		}
		return cdata(code$3);
	}
	function declaration(code$3) {
		if (code$3 === null || code$3 === 62) return end(code$3);
		if (markdownLineEnding(code$3)) {
			returnState = declaration;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return declaration;
	}
	function instruction(code$3) {
		if (code$3 === null) return nok(code$3);
		if (code$3 === 63) {
			effects.consume(code$3);
			return instructionClose;
		}
		if (markdownLineEnding(code$3)) {
			returnState = instruction;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return instruction;
	}
	function instructionClose(code$3) {
		return code$3 === 62 ? end(code$3) : instruction(code$3);
	}
	function tagCloseStart(code$3) {
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return tagClose;
		}
		return nok(code$3);
	}
	function tagClose(code$3) {
		if (code$3 === 45 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			return tagClose;
		}
		return tagCloseBetween(code$3);
	}
	function tagCloseBetween(code$3) {
		if (markdownLineEnding(code$3)) {
			returnState = tagCloseBetween;
			return lineEndingBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return tagCloseBetween;
		}
		return end(code$3);
	}
	function tagOpen(code$3) {
		if (code$3 === 45 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			return tagOpen;
		}
		if (code$3 === 47 || code$3 === 62 || markdownLineEndingOrSpace(code$3)) return tagOpenBetween(code$3);
		return nok(code$3);
	}
	function tagOpenBetween(code$3) {
		if (code$3 === 47) {
			effects.consume(code$3);
			return end;
		}
		if (code$3 === 58 || code$3 === 95 || asciiAlpha(code$3)) {
			effects.consume(code$3);
			return tagOpenAttributeName;
		}
		if (markdownLineEnding(code$3)) {
			returnState = tagOpenBetween;
			return lineEndingBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return tagOpenBetween;
		}
		return end(code$3);
	}
	function tagOpenAttributeName(code$3) {
		if (code$3 === 45 || code$3 === 46 || code$3 === 58 || code$3 === 95 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			return tagOpenAttributeName;
		}
		return tagOpenAttributeNameAfter(code$3);
	}
	function tagOpenAttributeNameAfter(code$3) {
		if (code$3 === 61) {
			effects.consume(code$3);
			return tagOpenAttributeValueBefore;
		}
		if (markdownLineEnding(code$3)) {
			returnState = tagOpenAttributeNameAfter;
			return lineEndingBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return tagOpenAttributeNameAfter;
		}
		return tagOpenBetween(code$3);
	}
	function tagOpenAttributeValueBefore(code$3) {
		if (code$3 === null || code$3 === 60 || code$3 === 61 || code$3 === 62 || code$3 === 96) return nok(code$3);
		if (code$3 === 34 || code$3 === 39) {
			effects.consume(code$3);
			marker = code$3;
			return tagOpenAttributeValueQuoted;
		}
		if (markdownLineEnding(code$3)) {
			returnState = tagOpenAttributeValueBefore;
			return lineEndingBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return tagOpenAttributeValueBefore;
		}
		effects.consume(code$3);
		return tagOpenAttributeValueUnquoted;
	}
	function tagOpenAttributeValueQuoted(code$3) {
		if (code$3 === marker) {
			effects.consume(code$3);
			marker = void 0;
			return tagOpenAttributeValueQuotedAfter;
		}
		if (code$3 === null) return nok(code$3);
		if (markdownLineEnding(code$3)) {
			returnState = tagOpenAttributeValueQuoted;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return tagOpenAttributeValueQuoted;
	}
	function tagOpenAttributeValueUnquoted(code$3) {
		if (code$3 === null || code$3 === 34 || code$3 === 39 || code$3 === 60 || code$3 === 61 || code$3 === 96) return nok(code$3);
		if (code$3 === 47 || code$3 === 62 || markdownLineEndingOrSpace(code$3)) return tagOpenBetween(code$3);
		effects.consume(code$3);
		return tagOpenAttributeValueUnquoted;
	}
	function tagOpenAttributeValueQuotedAfter(code$3) {
		if (code$3 === 47 || code$3 === 62 || markdownLineEndingOrSpace(code$3)) return tagOpenBetween(code$3);
		return nok(code$3);
	}
	function end(code$3) {
		if (code$3 === 62) {
			effects.consume(code$3);
			effects.exit("htmlTextData");
			effects.exit("htmlText");
			return ok$2;
		}
		return nok(code$3);
	}
	function lineEndingBefore(code$3) {
		effects.exit("htmlTextData");
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return lineEndingAfter;
	}
	function lineEndingAfter(code$3) {
		return markdownSpace(code$3) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3) : lineEndingAfterPrefix(code$3);
	}
	function lineEndingAfterPrefix(code$3) {
		effects.enter("htmlTextData");
		return returnState(code$3);
	}
}
var labelEnd = {
	name: "labelEnd",
	resolveAll: resolveAllLabelEnd,
	resolveTo: resolveToLabelEnd,
	tokenize: tokenizeLabelEnd
};
var resourceConstruct = { tokenize: tokenizeResource };
var referenceFullConstruct = { tokenize: tokenizeReferenceFull };
var referenceCollapsedConstruct = { tokenize: tokenizeReferenceCollapsed };
function resolveAllLabelEnd(events) {
	let index$1 = -1;
	const newEvents = [];
	while (++index$1 < events.length) {
		const token = events[index$1][1];
		newEvents.push(events[index$1]);
		if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
			const offset = token.type === "labelImage" ? 4 : 2;
			token.type = "data";
			index$1 += offset;
		}
	}
	if (events.length !== newEvents.length) splice(events, 0, events.length, newEvents);
	return events;
}
function resolveToLabelEnd(events, context) {
	let index$1 = events.length;
	let offset = 0;
	let token;
	let open;
	let close;
	let media;
	while (index$1--) {
		token = events[index$1][1];
		if (open) {
			if (token.type === "link" || token.type === "labelLink" && token._inactive) break;
			if (events[index$1][0] === "enter" && token.type === "labelLink") token._inactive = true;
		} else if (close) {
			if (events[index$1][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
				open = index$1;
				if (token.type !== "labelLink") {
					offset = 2;
					break;
				}
			}
		} else if (token.type === "labelEnd") close = index$1;
	}
	const group = {
		type: events[open][1].type === "labelLink" ? "link" : "image",
		start: { ...events[open][1].start },
		end: { ...events[events.length - 1][1].end }
	};
	const label = {
		type: "label",
		start: { ...events[open][1].start },
		end: { ...events[close][1].end }
	};
	const text$6 = {
		type: "labelText",
		start: { ...events[open + offset + 2][1].end },
		end: { ...events[close - 2][1].start }
	};
	media = [[
		"enter",
		group,
		context
	], [
		"enter",
		label,
		context
	]];
	media = push(media, events.slice(open + 1, open + offset + 3));
	media = push(media, [[
		"enter",
		text$6,
		context
	]]);
	media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
	media = push(media, [
		[
			"exit",
			text$6,
			context
		],
		events[close - 2],
		events[close - 1],
		[
			"exit",
			label,
			context
		]
	]);
	media = push(media, events.slice(close + 1));
	media = push(media, [[
		"exit",
		group,
		context
	]]);
	splice(events, open, events.length, media);
	return events;
}
function tokenizeLabelEnd(effects, ok$2, nok) {
	const self = this;
	let index$1 = self.events.length;
	let labelStart;
	let defined;
	while (index$1--) if ((self.events[index$1][1].type === "labelImage" || self.events[index$1][1].type === "labelLink") && !self.events[index$1][1]._balanced) {
		labelStart = self.events[index$1][1];
		break;
	}
	return start;
	function start(code$3) {
		if (!labelStart) return nok(code$3);
		if (labelStart._inactive) return labelEndNok(code$3);
		defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
			start: labelStart.end,
			end: self.now()
		})));
		effects.enter("labelEnd");
		effects.enter("labelMarker");
		effects.consume(code$3);
		effects.exit("labelMarker");
		effects.exit("labelEnd");
		return after;
	}
	function after(code$3) {
		if (code$3 === 40) return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code$3);
		if (code$3 === 91) return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code$3);
		return defined ? labelEndOk(code$3) : labelEndNok(code$3);
	}
	function referenceNotFull(code$3) {
		return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code$3);
	}
	function labelEndOk(code$3) {
		return ok$2(code$3);
	}
	function labelEndNok(code$3) {
		labelStart._balanced = true;
		return nok(code$3);
	}
}
function tokenizeResource(effects, ok$2, nok) {
	return resourceStart;
	function resourceStart(code$3) {
		effects.enter("resource");
		effects.enter("resourceMarker");
		effects.consume(code$3);
		effects.exit("resourceMarker");
		return resourceBefore;
	}
	function resourceBefore(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, resourceOpen)(code$3) : resourceOpen(code$3);
	}
	function resourceOpen(code$3) {
		if (code$3 === 41) return resourceEnd(code$3);
		return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code$3);
	}
	function resourceDestinationAfter(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, resourceBetween)(code$3) : resourceEnd(code$3);
	}
	function resourceDestinationMissing(code$3) {
		return nok(code$3);
	}
	function resourceBetween(code$3) {
		if (code$3 === 34 || code$3 === 39 || code$3 === 40) return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code$3);
		return resourceEnd(code$3);
	}
	function resourceTitleAfter(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, resourceEnd)(code$3) : resourceEnd(code$3);
	}
	function resourceEnd(code$3) {
		if (code$3 === 41) {
			effects.enter("resourceMarker");
			effects.consume(code$3);
			effects.exit("resourceMarker");
			effects.exit("resource");
			return ok$2;
		}
		return nok(code$3);
	}
}
function tokenizeReferenceFull(effects, ok$2, nok) {
	const self = this;
	return referenceFull;
	function referenceFull(code$3) {
		return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code$3);
	}
	function referenceFullAfter(code$3) {
		return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok$2(code$3) : nok(code$3);
	}
	function referenceFullMissing(code$3) {
		return nok(code$3);
	}
}
function tokenizeReferenceCollapsed(effects, ok$2, nok) {
	return referenceCollapsedStart;
	function referenceCollapsedStart(code$3) {
		effects.enter("reference");
		effects.enter("referenceMarker");
		effects.consume(code$3);
		effects.exit("referenceMarker");
		return referenceCollapsedOpen;
	}
	function referenceCollapsedOpen(code$3) {
		if (code$3 === 93) {
			effects.enter("referenceMarker");
			effects.consume(code$3);
			effects.exit("referenceMarker");
			effects.exit("reference");
			return ok$2;
		}
		return nok(code$3);
	}
}
var labelStartImage = {
	name: "labelStartImage",
	resolveAll: labelEnd.resolveAll,
	tokenize: tokenizeLabelStartImage
};
function tokenizeLabelStartImage(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$3) {
		effects.enter("labelImage");
		effects.enter("labelImageMarker");
		effects.consume(code$3);
		effects.exit("labelImageMarker");
		return open;
	}
	function open(code$3) {
		if (code$3 === 91) {
			effects.enter("labelMarker");
			effects.consume(code$3);
			effects.exit("labelMarker");
			effects.exit("labelImage");
			return after;
		}
		return nok(code$3);
	}
	function after(code$3) {
		/* c8 ignore next 3 */
		return code$3 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code$3) : ok$2(code$3);
	}
}
var labelStartLink = {
	name: "labelStartLink",
	resolveAll: labelEnd.resolveAll,
	tokenize: tokenizeLabelStartLink
};
function tokenizeLabelStartLink(effects, ok$2, nok) {
	const self = this;
	return start;
	function start(code$3) {
		effects.enter("labelLink");
		effects.enter("labelMarker");
		effects.consume(code$3);
		effects.exit("labelMarker");
		effects.exit("labelLink");
		return after;
	}
	function after(code$3) {
		/* c8 ignore next 3 */
		return code$3 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code$3) : ok$2(code$3);
	}
}
var lineEnding = {
	name: "lineEnding",
	tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok$2) {
	return start;
	function start(code$3) {
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return factorySpace(effects, ok$2, "linePrefix");
	}
}
var thematicBreak$2 = {
	name: "thematicBreak",
	tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok$2, nok) {
	let size = 0;
	let marker;
	return start;
	function start(code$3) {
		effects.enter("thematicBreak");
		return before(code$3);
	}
	function before(code$3) {
		marker = code$3;
		return atBreak(code$3);
	}
	function atBreak(code$3) {
		if (code$3 === marker) {
			effects.enter("thematicBreakSequence");
			return sequence(code$3);
		}
		if (size >= 3 && (code$3 === null || markdownLineEnding(code$3))) {
			effects.exit("thematicBreak");
			return ok$2(code$3);
		}
		return nok(code$3);
	}
	function sequence(code$3) {
		if (code$3 === marker) {
			effects.consume(code$3);
			size++;
			return sequence;
		}
		effects.exit("thematicBreakSequence");
		return markdownSpace(code$3) ? factorySpace(effects, atBreak, "whitespace")(code$3) : atBreak(code$3);
	}
}
var list$2 = {
	continuation: { tokenize: tokenizeListContinuation },
	exit: tokenizeListEnd,
	name: "list",
	tokenize: tokenizeListStart
};
var listItemPrefixWhitespaceConstruct = {
	partial: true,
	tokenize: tokenizeListItemPrefixWhitespace
};
var indentConstruct = {
	partial: true,
	tokenize: tokenizeIndent$1
};
function tokenizeListStart(effects, ok$2, nok) {
	const self = this;
	const tail = self.events[self.events.length - 1];
	let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
	let size = 0;
	return start;
	function start(code$3) {
		const kind = self.containerState.type || (code$3 === 42 || code$3 === 43 || code$3 === 45 ? "listUnordered" : "listOrdered");
		if (kind === "listUnordered" ? !self.containerState.marker || code$3 === self.containerState.marker : asciiDigit(code$3)) {
			if (!self.containerState.type) {
				self.containerState.type = kind;
				effects.enter(kind, { _container: true });
			}
			if (kind === "listUnordered") {
				effects.enter("listItemPrefix");
				return code$3 === 42 || code$3 === 45 ? effects.check(thematicBreak$2, nok, atMarker)(code$3) : atMarker(code$3);
			}
			if (!self.interrupt || code$3 === 49) {
				effects.enter("listItemPrefix");
				effects.enter("listItemValue");
				return inside(code$3);
			}
		}
		return nok(code$3);
	}
	function inside(code$3) {
		if (asciiDigit(code$3) && ++size < 10) {
			effects.consume(code$3);
			return inside;
		}
		if ((!self.interrupt || size < 2) && (self.containerState.marker ? code$3 === self.containerState.marker : code$3 === 41 || code$3 === 46)) {
			effects.exit("listItemValue");
			return atMarker(code$3);
		}
		return nok(code$3);
	}
	function atMarker(code$3) {
		effects.enter("listItemMarker");
		effects.consume(code$3);
		effects.exit("listItemMarker");
		self.containerState.marker = self.containerState.marker || code$3;
		return effects.check(blankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
	}
	function onBlank(code$3) {
		self.containerState.initialBlankLine = true;
		initialSize++;
		return endOfPrefix(code$3);
	}
	function otherPrefix(code$3) {
		if (markdownSpace(code$3)) {
			effects.enter("listItemPrefixWhitespace");
			effects.consume(code$3);
			effects.exit("listItemPrefixWhitespace");
			return endOfPrefix;
		}
		return nok(code$3);
	}
	function endOfPrefix(code$3) {
		self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
		return ok$2(code$3);
	}
}
function tokenizeListContinuation(effects, ok$2, nok) {
	const self = this;
	self.containerState._closeFlow = void 0;
	return effects.check(blankLine, onBlank, notBlank);
	function onBlank(code$3) {
		self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
		return factorySpace(effects, ok$2, "listItemIndent", self.containerState.size + 1)(code$3);
	}
	function notBlank(code$3) {
		if (self.containerState.furtherBlankLines || !markdownSpace(code$3)) {
			self.containerState.furtherBlankLines = void 0;
			self.containerState.initialBlankLine = void 0;
			return notInCurrentItem(code$3);
		}
		self.containerState.furtherBlankLines = void 0;
		self.containerState.initialBlankLine = void 0;
		return effects.attempt(indentConstruct, ok$2, notInCurrentItem)(code$3);
	}
	function notInCurrentItem(code$3) {
		self.containerState._closeFlow = true;
		self.interrupt = void 0;
		return factorySpace(effects, effects.attempt(list$2, ok$2, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3);
	}
}
function tokenizeIndent$1(effects, ok$2, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
	function afterPrefix(code$3) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok$2(code$3) : nok(code$3);
	}
}
function tokenizeListEnd(effects) {
	effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok$2, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function afterPrefix(code$3) {
		const tail = self.events[self.events.length - 1];
		return !markdownSpace(code$3) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok$2(code$3) : nok(code$3);
	}
}
var setextUnderline = {
	name: "setextUnderline",
	resolveTo: resolveToSetextUnderline,
	tokenize: tokenizeSetextUnderline
};
function resolveToSetextUnderline(events, context) {
	let index$1 = events.length;
	let content$2;
	let text$6;
	let definition$2;
	while (index$1--) if (events[index$1][0] === "enter") {
		if (events[index$1][1].type === "content") {
			content$2 = index$1;
			break;
		}
		if (events[index$1][1].type === "paragraph") text$6 = index$1;
	} else {
		if (events[index$1][1].type === "content") events.splice(index$1, 1);
		if (!definition$2 && events[index$1][1].type === "definition") definition$2 = index$1;
	}
	const heading$2 = {
		type: "setextHeading",
		start: { ...events[content$2][1].start },
		end: { ...events[events.length - 1][1].end }
	};
	events[text$6][1].type = "setextHeadingText";
	if (definition$2) {
		events.splice(text$6, 0, [
			"enter",
			heading$2,
			context
		]);
		events.splice(definition$2 + 1, 0, [
			"exit",
			events[content$2][1],
			context
		]);
		events[content$2][1].end = { ...events[definition$2][1].end };
	} else events[content$2][1] = heading$2;
	events.push([
		"exit",
		heading$2,
		context
	]);
	return events;
}
function tokenizeSetextUnderline(effects, ok$2, nok) {
	const self = this;
	let marker;
	return start;
	function start(code$3) {
		let index$1 = self.events.length;
		let paragraph$2;
		while (index$1--) if (self.events[index$1][1].type !== "lineEnding" && self.events[index$1][1].type !== "linePrefix" && self.events[index$1][1].type !== "content") {
			paragraph$2 = self.events[index$1][1].type === "paragraph";
			break;
		}
		if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph$2)) {
			effects.enter("setextHeadingLine");
			marker = code$3;
			return before(code$3);
		}
		return nok(code$3);
	}
	function before(code$3) {
		effects.enter("setextHeadingLineSequence");
		return inside(code$3);
	}
	function inside(code$3) {
		if (code$3 === marker) {
			effects.consume(code$3);
			return inside;
		}
		effects.exit("setextHeadingLineSequence");
		return markdownSpace(code$3) ? factorySpace(effects, after, "lineSuffix")(code$3) : after(code$3);
	}
	function after(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("setextHeadingLine");
			return ok$2(code$3);
		}
		return nok(code$3);
	}
}
var flow = { tokenize: initializeFlow };
function initializeFlow(effects) {
	const self = this;
	const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content$1, afterConstruct)), "linePrefix")));
	return initial;
	function atBlankEnding(code$3) {
		if (code$3 === null) {
			effects.consume(code$3);
			return;
		}
		effects.enter("lineEndingBlank");
		effects.consume(code$3);
		effects.exit("lineEndingBlank");
		self.currentConstruct = void 0;
		return initial;
	}
	function afterConstruct(code$3) {
		if (code$3 === null) {
			effects.consume(code$3);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		self.currentConstruct = void 0;
		return initial;
	}
}
var resolver = { resolveAll: createResolver() };
var string = initializeFactory("string");
var text$3 = initializeFactory("text");
function initializeFactory(field) {
	return {
		resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
		tokenize: initializeText
	};
	function initializeText(effects) {
		const self = this;
		const constructs$1 = this.parser.constructs[field];
		const text$6 = effects.attempt(constructs$1, start, notText);
		return start;
		function start(code$3) {
			return atBreak(code$3) ? text$6(code$3) : notText(code$3);
		}
		function notText(code$3) {
			if (code$3 === null) {
				effects.consume(code$3);
				return;
			}
			effects.enter("data");
			effects.consume(code$3);
			return data;
		}
		function data(code$3) {
			if (atBreak(code$3)) {
				effects.exit("data");
				return text$6(code$3);
			}
			effects.consume(code$3);
			return data;
		}
		function atBreak(code$3) {
			if (code$3 === null) return true;
			const list$3 = constructs$1[code$3];
			let index$1 = -1;
			if (list$3) while (++index$1 < list$3.length) {
				const item = list$3[index$1];
				if (!item.previous || item.previous.call(self, self.previous)) return true;
			}
			return false;
		}
	}
}
function createResolver(extraResolver) {
	return resolveAllText;
	function resolveAllText(events, context) {
		let index$1 = -1;
		let enter;
		while (++index$1 <= events.length) if (enter === void 0) {
			if (events[index$1] && events[index$1][1].type === "data") {
				enter = index$1;
				index$1++;
			}
		} else if (!events[index$1] || events[index$1][1].type !== "data") {
			if (index$1 !== enter + 2) {
				events[enter][1].end = events[index$1 - 1][1].end;
				events.splice(enter + 2, index$1 - enter - 2);
				index$1 = enter + 2;
			}
			enter = void 0;
		}
		return extraResolver ? extraResolver(events, context) : events;
	}
}
function resolveAllLineSuffixes(events, context) {
	let eventIndex = 0;
	while (++eventIndex <= events.length) if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
		const data = events[eventIndex - 1][1];
		const chunks = context.sliceStream(data);
		let index$1 = chunks.length;
		let bufferIndex = -1;
		let size = 0;
		let tabs;
		while (index$1--) {
			const chunk = chunks[index$1];
			if (typeof chunk === "string") {
				bufferIndex = chunk.length;
				while (chunk.charCodeAt(bufferIndex - 1) === 32) {
					size++;
					bufferIndex--;
				}
				if (bufferIndex) break;
				bufferIndex = -1;
			} else if (chunk === -2) {
				tabs = true;
				size++;
			} else if (chunk === -1) {} else {
				index$1++;
				break;
			}
		}
		if (context._contentTypeTextTrailing && eventIndex === events.length) size = 0;
		if (size) {
			const token = {
				type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: index$1 ? bufferIndex : data.start._bufferIndex + bufferIndex,
					_index: data.start._index + index$1,
					line: data.end.line,
					column: data.end.column - size,
					offset: data.end.offset - size
				},
				end: { ...data.end }
			};
			data.end = { ...token.start };
			if (data.start.offset === data.end.offset) Object.assign(data, token);
			else {
				events.splice(eventIndex, 0, [
					"enter",
					token,
					context
				], [
					"exit",
					token,
					context
				]);
				eventIndex += 2;
			}
		}
		eventIndex++;
	}
	return events;
}
var constructs_exports = /* @__PURE__ */ __export({
	attentionMarkers: () => attentionMarkers,
	contentInitial: () => contentInitial,
	disable: () => disable,
	document: () => document$2,
	flow: () => flow$1,
	flowInitial: () => flowInitial,
	insideSpan: () => insideSpan,
	string: () => string$1,
	text: () => text$4
}, 1);
var document$2 = {
	[42]: list$2,
	[43]: list$2,
	[45]: list$2,
	[48]: list$2,
	[49]: list$2,
	[50]: list$2,
	[51]: list$2,
	[52]: list$2,
	[53]: list$2,
	[54]: list$2,
	[55]: list$2,
	[56]: list$2,
	[57]: list$2,
	[62]: blockQuote
};
var contentInitial = { [91]: definition$1 };
var flowInitial = {
	[-2]: codeIndented,
	[-1]: codeIndented,
	[32]: codeIndented
};
var flow$1 = {
	[35]: headingAtx,
	[42]: thematicBreak$2,
	[45]: [setextUnderline, thematicBreak$2],
	[60]: htmlFlow,
	[61]: setextUnderline,
	[95]: thematicBreak$2,
	[96]: codeFenced,
	[126]: codeFenced
};
var string$1 = {
	[38]: characterReference,
	[92]: characterEscape
};
var text$4 = {
	[-5]: lineEnding,
	[-4]: lineEnding,
	[-3]: lineEnding,
	[33]: labelStartImage,
	[38]: characterReference,
	[42]: attention,
	[60]: [autolink, htmlText],
	[91]: labelStartLink,
	[92]: [hardBreakEscape, characterEscape],
	[93]: labelEnd,
	[95]: attention,
	[96]: codeText
};
var insideSpan = { null: [attention, resolver] };
var attentionMarkers = { null: [42, 95] };
var disable = { null: [] };
function createTokenizer(parser, initialize, from) {
	let point$3 = {
		_bufferIndex: -1,
		_index: 0,
		line: from && from.line || 1,
		column: from && from.column || 1,
		offset: from && from.offset || 0
	};
	const columnStart = {};
	const resolveAllConstructs = [];
	let chunks = [];
	let stack = [];
	const effects = {
		attempt: constructFactory(onsuccessfulconstruct),
		check: constructFactory(onsuccessfulcheck),
		consume,
		enter,
		exit: exit$2,
		interrupt: constructFactory(onsuccessfulcheck, { interrupt: true })
	};
	const context = {
		code: null,
		containerState: {},
		defineSkip,
		events: [],
		now,
		parser,
		previous: null,
		sliceSerialize,
		sliceStream,
		write
	};
	let state = initialize.tokenize.call(context, effects);
	if (initialize.resolveAll) resolveAllConstructs.push(initialize);
	return context;
	function write(slice) {
		chunks = push(chunks, slice);
		main();
		if (chunks[chunks.length - 1] !== null) return [];
		addResult(initialize, 0);
		context.events = resolveAll(resolveAllConstructs, context.events, context);
		return context.events;
	}
	function sliceSerialize(token, expandTabs) {
		return serializeChunks(sliceStream(token), expandTabs);
	}
	function sliceStream(token) {
		return sliceChunks(chunks, token);
	}
	function now() {
		const { _bufferIndex, _index, line, column, offset } = point$3;
		return {
			_bufferIndex,
			_index,
			line,
			column,
			offset
		};
	}
	function defineSkip(value) {
		columnStart[value.line] = value.column;
		accountForPotentialSkip();
	}
	function main() {
		let chunkIndex;
		while (point$3._index < chunks.length) {
			const chunk = chunks[point$3._index];
			if (typeof chunk === "string") {
				chunkIndex = point$3._index;
				if (point$3._bufferIndex < 0) point$3._bufferIndex = 0;
				while (point$3._index === chunkIndex && point$3._bufferIndex < chunk.length) go(chunk.charCodeAt(point$3._bufferIndex));
			} else go(chunk);
		}
	}
	function go(code$3) {
		state = state(code$3);
	}
	function consume(code$3) {
		if (markdownLineEnding(code$3)) {
			point$3.line++;
			point$3.column = 1;
			point$3.offset += code$3 === -3 ? 2 : 1;
			accountForPotentialSkip();
		} else if (code$3 !== -1) {
			point$3.column++;
			point$3.offset++;
		}
		if (point$3._bufferIndex < 0) point$3._index++;
		else {
			point$3._bufferIndex++;
			if (point$3._bufferIndex === chunks[point$3._index].length) {
				point$3._bufferIndex = -1;
				point$3._index++;
			}
		}
		context.previous = code$3;
	}
	function enter(type, fields) {
		const token = fields || {};
		token.type = type;
		token.start = now();
		context.events.push([
			"enter",
			token,
			context
		]);
		stack.push(token);
		return token;
	}
	function exit$2(type) {
		const token = stack.pop();
		token.end = now();
		context.events.push([
			"exit",
			token,
			context
		]);
		return token;
	}
	function onsuccessfulconstruct(construct, info) {
		addResult(construct, info.from);
	}
	function onsuccessfulcheck(_, info) {
		info.restore();
	}
	function constructFactory(onreturn, fields) {
		return hook;
		function hook(constructs$1, returnState, bogusState) {
			let listOfConstructs;
			let constructIndex;
			let currentConstruct;
			let info;
			return Array.isArray(constructs$1) ? handleListOfConstructs(constructs$1) : "tokenize" in constructs$1 ? handleListOfConstructs([constructs$1]) : handleMapOfConstructs(constructs$1);
			function handleMapOfConstructs(map$2) {
				return start;
				function start(code$3) {
					const left = code$3 !== null && map$2[code$3];
					const all$1 = code$3 !== null && map$2.null;
					return handleListOfConstructs([...Array.isArray(left) ? left : left ? [left] : [], ...Array.isArray(all$1) ? all$1 : all$1 ? [all$1] : []])(code$3);
				}
			}
			function handleListOfConstructs(list$3) {
				listOfConstructs = list$3;
				constructIndex = 0;
				if (list$3.length === 0) return bogusState;
				return handleConstruct(list$3[constructIndex]);
			}
			function handleConstruct(construct) {
				return start;
				function start(code$3) {
					info = store();
					currentConstruct = construct;
					if (!construct.partial) context.currentConstruct = construct;
					if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) return nok(code$3);
					return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok$2, nok)(code$3);
				}
			}
			function ok$2(code$3) {
				onreturn(currentConstruct, info);
				return returnState;
			}
			function nok(code$3) {
				info.restore();
				if (++constructIndex < listOfConstructs.length) return handleConstruct(listOfConstructs[constructIndex]);
				return bogusState;
			}
		}
	}
	function addResult(construct, from$1) {
		if (construct.resolveAll && !resolveAllConstructs.includes(construct)) resolveAllConstructs.push(construct);
		if (construct.resolve) splice(context.events, from$1, context.events.length - from$1, construct.resolve(context.events.slice(from$1), context));
		if (construct.resolveTo) context.events = construct.resolveTo(context.events, context);
	}
	function store() {
		const startPoint = now();
		const startPrevious = context.previous;
		const startCurrentConstruct = context.currentConstruct;
		const startEventsIndex = context.events.length;
		const startStack = Array.from(stack);
		return {
			from: startEventsIndex,
			restore
		};
		function restore() {
			point$3 = startPoint;
			context.previous = startPrevious;
			context.currentConstruct = startCurrentConstruct;
			context.events.length = startEventsIndex;
			stack = startStack;
			accountForPotentialSkip();
		}
	}
	function accountForPotentialSkip() {
		if (point$3.line in columnStart && point$3.column < 2) {
			point$3.column = columnStart[point$3.line];
			point$3.offset += columnStart[point$3.line] - 1;
		}
	}
}
function sliceChunks(chunks, token) {
	const startIndex = token.start._index;
	const startBufferIndex = token.start._bufferIndex;
	const endIndex = token.end._index;
	const endBufferIndex = token.end._bufferIndex;
	let view;
	if (startIndex === endIndex) view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
	else {
		view = chunks.slice(startIndex, endIndex);
		if (startBufferIndex > -1) {
			const head = view[0];
			if (typeof head === "string") view[0] = head.slice(startBufferIndex);
			else view.shift();
		}
		if (endBufferIndex > 0) view.push(chunks[endIndex].slice(0, endBufferIndex));
	}
	return view;
}
function serializeChunks(chunks, expandTabs) {
	let index$1 = -1;
	const result = [];
	let atTab;
	while (++index$1 < chunks.length) {
		const chunk = chunks[index$1];
		let value;
		if (typeof chunk === "string") value = chunk;
		else switch (chunk) {
			case -5:
				value = "\r";
				break;
			case -4:
				value = "\n";
				break;
			case -3:
				value = "\r\n";
				break;
			case -2:
				value = expandTabs ? " " : "	";
				break;
			case -1:
				if (!expandTabs && atTab) continue;
				value = " ";
				break;
			default: value = String.fromCharCode(chunk);
		}
		atTab = chunk === -2;
		result.push(value);
	}
	return result.join("");
}
function parse(options) {
	const parser = {
		constructs: combineExtensions([constructs_exports, ...(options || {}).extensions || []]),
		content: create(content),
		defined: [],
		document: create(document$1),
		flow: create(flow),
		lazy: {},
		string: create(string),
		text: create(text$3)
	};
	return parser;
	function create(initial) {
		return creator;
		function creator(from) {
			return createTokenizer(parser, initial, from);
		}
	}
}
function postprocess(events) {
	while (!subtokenize(events));
	return events;
}
var search = /[\0\t\n\r]/g;
function preprocess() {
	let column = 1;
	let buffer = "";
	let start = true;
	let atCarriageReturn;
	return preprocessor;
	function preprocessor(value, encoding, end) {
		const chunks = [];
		let match;
		let next;
		let startPosition;
		let endPosition;
		let code$3;
		value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
		startPosition = 0;
		buffer = "";
		if (start) {
			if (value.charCodeAt(0) === 65279) startPosition++;
			start = void 0;
		}
		while (startPosition < value.length) {
			search.lastIndex = startPosition;
			match = search.exec(value);
			endPosition = match && match.index !== void 0 ? match.index : value.length;
			code$3 = value.charCodeAt(endPosition);
			if (!match) {
				buffer = value.slice(startPosition);
				break;
			}
			if (code$3 === 10 && startPosition === endPosition && atCarriageReturn) {
				chunks.push(-3);
				atCarriageReturn = void 0;
			} else {
				if (atCarriageReturn) {
					chunks.push(-5);
					atCarriageReturn = void 0;
				}
				if (startPosition < endPosition) {
					chunks.push(value.slice(startPosition, endPosition));
					column += endPosition - startPosition;
				}
				switch (code$3) {
					case 0:
						chunks.push(65533);
						column++;
						break;
					case 9:
						next = Math.ceil(column / 4) * 4;
						chunks.push(-2);
						while (column++ < next) chunks.push(-1);
						break;
					case 10:
						chunks.push(-4);
						column = 1;
						break;
					default:
						atCarriageReturn = true;
						column = 1;
				}
			}
			startPosition = endPosition + 1;
		}
		if (end) {
			if (atCarriageReturn) chunks.push(-5);
			if (buffer) chunks.push(buffer);
			chunks.push(null);
		}
		return chunks;
	}
}
var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
	return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
	if ($1) return $1;
	if ($2.charCodeAt(0) === 35) {
		const head = $2.charCodeAt(1);
		const hex = head === 120 || head === 88;
		return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
	}
	return decodeNamedCharacterReference($2) || $0;
}
function stringifyPosition(value) {
	if (!value || typeof value !== "object") return "";
	if ("position" in value || "type" in value) return position$1(value.position);
	if ("start" in value || "end" in value) return position$1(value);
	if ("line" in value || "column" in value) return point$1(value);
	return "";
}
function point$1(point$3) {
	return index(point$3 && point$3.line) + ":" + index(point$3 && point$3.column);
}
function position$1(pos) {
	return point$1(pos && pos.start) + "-" + point$1(pos && pos.end);
}
function index(value) {
	return value && typeof value === "number" ? value : 1;
}
var own$2 = {}.hasOwnProperty;
function fromMarkdown(value, encoding, options) {
	if (typeof encoding !== "string") {
		options = encoding;
		encoding = void 0;
	}
	return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
}
function compiler(options) {
	const config = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: opener(link$2),
			autolinkProtocol: onenterdata,
			autolinkEmail: onenterdata,
			atxHeading: opener(heading$2),
			blockQuote: opener(blockQuote$1),
			characterEscape: onenterdata,
			characterReference: onenterdata,
			codeFenced: opener(codeFlow),
			codeFencedFenceInfo: buffer,
			codeFencedFenceMeta: buffer,
			codeIndented: opener(codeFlow, buffer),
			codeText: opener(codeText$1, buffer),
			codeTextData: onenterdata,
			data: onenterdata,
			codeFlowValue: onenterdata,
			definition: opener(definition$2),
			definitionDestinationString: buffer,
			definitionLabelString: buffer,
			definitionTitleString: buffer,
			emphasis: opener(emphasis$2),
			hardBreakEscape: opener(hardBreak$2),
			hardBreakTrailing: opener(hardBreak$2),
			htmlFlow: opener(html$3, buffer),
			htmlFlowData: onenterdata,
			htmlText: opener(html$3, buffer),
			htmlTextData: onenterdata,
			image: opener(image$2),
			label: buffer,
			link: opener(link$2),
			listItem: opener(listItem$2),
			listItemValue: onenterlistitemvalue,
			listOrdered: opener(list$3, onenterlistordered),
			listUnordered: opener(list$3),
			paragraph: opener(paragraph$2),
			reference: onenterreference,
			referenceString: buffer,
			resourceDestinationString: buffer,
			resourceTitleString: buffer,
			setextHeading: opener(heading$2),
			strong: opener(strong$2),
			thematicBreak: opener(thematicBreak$3)
		},
		exit: {
			atxHeading: closer(),
			atxHeadingSequence: onexitatxheadingsequence,
			autolink: closer(),
			autolinkEmail: onexitautolinkemail,
			autolinkProtocol: onexitautolinkprotocol,
			blockQuote: closer(),
			characterEscapeValue: onexitdata,
			characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
			characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
			characterReferenceValue: onexitcharacterreferencevalue,
			characterReference: onexitcharacterreference,
			codeFenced: closer(onexitcodefenced),
			codeFencedFence: onexitcodefencedfence,
			codeFencedFenceInfo: onexitcodefencedfenceinfo,
			codeFencedFenceMeta: onexitcodefencedfencemeta,
			codeFlowValue: onexitdata,
			codeIndented: closer(onexitcodeindented),
			codeText: closer(onexitcodetext),
			codeTextData: onexitdata,
			data: onexitdata,
			definition: closer(),
			definitionDestinationString: onexitdefinitiondestinationstring,
			definitionLabelString: onexitdefinitionlabelstring,
			definitionTitleString: onexitdefinitiontitlestring,
			emphasis: closer(),
			hardBreakEscape: closer(onexithardbreak),
			hardBreakTrailing: closer(onexithardbreak),
			htmlFlow: closer(onexithtmlflow),
			htmlFlowData: onexitdata,
			htmlText: closer(onexithtmltext),
			htmlTextData: onexitdata,
			image: closer(onexitimage),
			label: onexitlabel,
			labelText: onexitlabeltext,
			lineEnding: onexitlineending,
			link: closer(onexitlink),
			listItem: closer(),
			listOrdered: closer(),
			listUnordered: closer(),
			paragraph: closer(),
			referenceString: onexitreferencestring,
			resourceDestinationString: onexitresourcedestinationstring,
			resourceTitleString: onexitresourcetitlestring,
			resource: onexitresource,
			setextHeading: closer(onexitsetextheading),
			setextHeadingLineSequence: onexitsetextheadinglinesequence,
			setextHeadingText: onexitsetextheadingtext,
			strong: closer(),
			thematicBreak: closer()
		}
	};
	configure(config, (options || {}).mdastExtensions || []);
	const data = {};
	return compile;
	function compile(events) {
		let tree = {
			type: "root",
			children: []
		};
		const context = {
			stack: [tree],
			tokenStack: [],
			config,
			enter,
			exit: exit$2,
			buffer,
			resume,
			data
		};
		const listStack = [];
		let index$1 = -1;
		while (++index$1 < events.length) if (events[index$1][1].type === "listOrdered" || events[index$1][1].type === "listUnordered") if (events[index$1][0] === "enter") listStack.push(index$1);
		else index$1 = prepareList(events, listStack.pop(), index$1);
		index$1 = -1;
		while (++index$1 < events.length) {
			const handler = config[events[index$1][0]];
			if (own$2.call(handler, events[index$1][1].type)) handler[events[index$1][1].type].call(Object.assign({ sliceSerialize: events[index$1][2].sliceSerialize }, context), events[index$1][1]);
		}
		if (context.tokenStack.length > 0) {
			const tail = context.tokenStack[context.tokenStack.length - 1];
			(tail[1] || defaultOnError).call(context, void 0, tail[0]);
		}
		tree.position = {
			start: point(events.length > 0 ? events[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: point(events.length > 0 ? events[events.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		};
		index$1 = -1;
		while (++index$1 < config.transforms.length) tree = config.transforms[index$1](tree) || tree;
		return tree;
	}
	function prepareList(events, start, length) {
		let index$1 = start - 1;
		let containerBalance = -1;
		let listSpread = false;
		let listItem$3;
		let lineIndex;
		let firstBlankLineIndex;
		let atMarker;
		while (++index$1 <= length) {
			const event = events[index$1];
			switch (event[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					if (event[0] === "enter") containerBalance++;
					else containerBalance--;
					atMarker = void 0;
					break;
				case "lineEndingBlank":
					if (event[0] === "enter") {
						if (listItem$3 && !atMarker && !containerBalance && !firstBlankLineIndex) firstBlankLineIndex = index$1;
						atMarker = void 0;
					}
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: atMarker = void 0;
			}
			if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
				if (listItem$3) {
					let tailIndex = index$1;
					lineIndex = void 0;
					while (tailIndex--) {
						const tailEvent = events[tailIndex];
						if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
							if (tailEvent[0] === "exit") continue;
							if (lineIndex) {
								events[lineIndex][1].type = "lineEndingBlank";
								listSpread = true;
							}
							tailEvent[1].type = "lineEnding";
							lineIndex = tailIndex;
						} else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {} else break;
					}
					if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) listItem$3._spread = true;
					listItem$3.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
					events.splice(lineIndex || index$1, 0, [
						"exit",
						listItem$3,
						event[2]
					]);
					index$1++;
					length++;
				}
				if (event[1].type === "listItemPrefix") {
					const item = {
						type: "listItem",
						_spread: false,
						start: Object.assign({}, event[1].start),
						end: void 0
					};
					listItem$3 = item;
					events.splice(index$1, 0, [
						"enter",
						item,
						event[2]
					]);
					index$1++;
					length++;
					firstBlankLineIndex = void 0;
					atMarker = true;
				}
			}
		}
		events[start][1]._spread = listSpread;
		return length;
	}
	function opener(create, and) {
		return open;
		function open(token) {
			enter.call(this, create(token), token);
			if (and) and.call(this, token);
		}
	}
	function buffer() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function enter(node$1, token, errorHandler) {
		this.stack[this.stack.length - 1].children.push(node$1);
		this.stack.push(node$1);
		this.tokenStack.push([token, errorHandler || void 0]);
		node$1.position = {
			start: point(token.start),
			end: void 0
		};
	}
	function closer(and) {
		return close;
		function close(token) {
			if (and) and.call(this, token);
			exit$2.call(this, token);
		}
	}
	function exit$2(token, onExitError) {
		const node$1 = this.stack.pop();
		const open = this.tokenStack.pop();
		if (!open) throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
			start: token.start,
			end: token.end
		}) + "): it’s not open");
		else if (open[0].type !== token.type) if (onExitError) onExitError.call(this, token, open[0]);
		else (open[1] || defaultOnError).call(this, token, open[0]);
		node$1.position.end = point(token.end);
	}
	function resume() {
		return toString(this.stack.pop());
	}
	function onenterlistordered() {
		this.data.expectingFirstListItemValue = true;
	}
	function onenterlistitemvalue(token) {
		if (this.data.expectingFirstListItemValue) {
			const ancestor = this.stack[this.stack.length - 2];
			ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
			this.data.expectingFirstListItemValue = void 0;
		}
	}
	function onexitcodefencedfenceinfo() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.lang = data$1;
	}
	function onexitcodefencedfencemeta() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.meta = data$1;
	}
	function onexitcodefencedfence() {
		if (this.data.flowCodeInside) return;
		this.buffer();
		this.data.flowCodeInside = true;
	}
	function onexitcodefenced() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
		this.data.flowCodeInside = void 0;
	}
	function onexitcodeindented() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1.replace(/(\r?\n|\r)$/g, "");
	}
	function onexitdefinitionlabelstring(token) {
		const label = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.label = label;
		node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	}
	function onexitdefinitiontitlestring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.title = data$1;
	}
	function onexitdefinitiondestinationstring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = data$1;
	}
	function onexitatxheadingsequence(token) {
		const node$1 = this.stack[this.stack.length - 1];
		if (!node$1.depth) node$1.depth = this.sliceSerialize(token).length;
	}
	function onexitsetextheadingtext() {
		this.data.setextHeadingSlurpLineEnding = true;
	}
	function onexitsetextheadinglinesequence(token) {
		const node$1 = this.stack[this.stack.length - 1];
		node$1.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
	}
	function onexitsetextheading() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function onenterdata(token) {
		const siblings = this.stack[this.stack.length - 1].children;
		let tail = siblings[siblings.length - 1];
		if (!tail || tail.type !== "text") {
			tail = text$6();
			tail.position = {
				start: point(token.start),
				end: void 0
			};
			siblings.push(tail);
		}
		this.stack.push(tail);
	}
	function onexitdata(token) {
		const tail = this.stack.pop();
		tail.value += this.sliceSerialize(token);
		tail.position.end = point(token.end);
	}
	function onexitlineending(token) {
		const context = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			const tail = context.children[context.children.length - 1];
			tail.position.end = point(token.end);
			this.data.atHardBreak = void 0;
			return;
		}
		if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
			onenterdata.call(this, token);
			onexitdata.call(this, token);
		}
	}
	function onexithardbreak() {
		this.data.atHardBreak = true;
	}
	function onexithtmlflow() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1;
	}
	function onexithtmltext() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1;
	}
	function onexitcodetext() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1;
	}
	function onexitlink() {
		const node$1 = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			const referenceType = this.data.referenceType || "shortcut";
			node$1.type += "Reference";
			node$1.referenceType = referenceType;
			delete node$1.url;
			delete node$1.title;
		} else {
			delete node$1.identifier;
			delete node$1.label;
		}
		this.data.referenceType = void 0;
	}
	function onexitimage() {
		const node$1 = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			const referenceType = this.data.referenceType || "shortcut";
			node$1.type += "Reference";
			node$1.referenceType = referenceType;
			delete node$1.url;
			delete node$1.title;
		} else {
			delete node$1.identifier;
			delete node$1.label;
		}
		this.data.referenceType = void 0;
	}
	function onexitlabeltext(token) {
		const string$2 = this.sliceSerialize(token);
		const ancestor = this.stack[this.stack.length - 2];
		ancestor.label = decodeString(string$2);
		ancestor.identifier = normalizeIdentifier(string$2).toLowerCase();
	}
	function onexitlabel() {
		const fragment = this.stack[this.stack.length - 1];
		const value = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		this.data.inReference = true;
		if (node$1.type === "link") node$1.children = fragment.children;
		else node$1.alt = value;
	}
	function onexitresourcedestinationstring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = data$1;
	}
	function onexitresourcetitlestring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.title = data$1;
	}
	function onexitresource() {
		this.data.inReference = void 0;
	}
	function onenterreference() {
		this.data.referenceType = "collapsed";
	}
	function onexitreferencestring(token) {
		const label = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.label = label;
		node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		this.data.referenceType = "full";
	}
	function onexitcharacterreferencemarker(token) {
		this.data.characterReferenceType = token.type;
	}
	function onexitcharacterreferencevalue(token) {
		const data$1 = this.sliceSerialize(token);
		const type = this.data.characterReferenceType;
		let value;
		if (type) {
			value = decodeNumericCharacterReference(data$1, type === "characterReferenceMarkerNumeric" ? 10 : 16);
			this.data.characterReferenceType = void 0;
		} else value = decodeNamedCharacterReference(data$1);
		const tail = this.stack[this.stack.length - 1];
		tail.value += value;
	}
	function onexitcharacterreference(token) {
		const tail = this.stack.pop();
		tail.position.end = point(token.end);
	}
	function onexitautolinkprotocol(token) {
		onexitdata.call(this, token);
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = this.sliceSerialize(token);
	}
	function onexitautolinkemail(token) {
		onexitdata.call(this, token);
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = "mailto:" + this.sliceSerialize(token);
	}
	function blockQuote$1() {
		return {
			type: "blockquote",
			children: []
		};
	}
	function codeFlow() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	function codeText$1() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	function definition$2() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function emphasis$2() {
		return {
			type: "emphasis",
			children: []
		};
	}
	function heading$2() {
		return {
			type: "heading",
			depth: 0,
			children: []
		};
	}
	function hardBreak$2() {
		return { type: "break" };
	}
	function html$3() {
		return {
			type: "html",
			value: ""
		};
	}
	function image$2() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	function link$2() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	function list$3(token) {
		return {
			type: "list",
			ordered: token.type === "listOrdered",
			start: null,
			spread: token._spread,
			children: []
		};
	}
	function listItem$2(token) {
		return {
			type: "listItem",
			spread: token._spread,
			checked: null,
			children: []
		};
	}
	function paragraph$2() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function strong$2() {
		return {
			type: "strong",
			children: []
		};
	}
	function text$6() {
		return {
			type: "text",
			value: ""
		};
	}
	function thematicBreak$3() {
		return { type: "thematicBreak" };
	}
}
function point(d) {
	return {
		line: d.line,
		column: d.column,
		offset: d.offset
	};
}
function configure(combined, extensions) {
	let index$1 = -1;
	while (++index$1 < extensions.length) {
		const value = extensions[index$1];
		if (Array.isArray(value)) configure(combined, value);
		else extension(combined, value);
	}
}
function extension(combined, extension$1) {
	let key;
	for (key in extension$1) if (own$2.call(extension$1, key)) switch (key) {
		case "canContainEols": {
			const right = extension$1[key];
			if (right) combined[key].push(...right);
			break;
		}
		case "transforms": {
			const right = extension$1[key];
			if (right) combined[key].push(...right);
			break;
		}
		case "enter":
		case "exit": {
			const right = extension$1[key];
			if (right) Object.assign(combined[key], right);
			break;
		}
	}
}
function defaultOnError(left, right) {
	if (left) throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
		start: left.start,
		end: left.end
	}) + "): a different token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is open");
	else throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is still open");
}
function remarkParse(options) {
	const self = this;
	self.parser = parser;
	function parser(doc) {
		return fromMarkdown(doc, {
			...self.data("settings"),
			...options,
			extensions: self.data("micromarkExtensions") || [],
			mdastExtensions: self.data("fromMarkdownExtensions") || []
		});
	}
}
function blockquote$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: state.wrap(state.all(node$1), true)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function hardBreak$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	state.patch(node$1, result);
	return [state.applyData(node$1, result), {
		type: "text",
		value: "\n"
	}];
}
function code$2(state, node$1) {
	const value = node$1.value ? node$1.value + "\n" : "";
	const properties = {};
	const language = node$1.lang ? node$1.lang.split(/\s+/) : [];
	if (language.length > 0) properties.className = ["language-" + language[0]];
	let result = {
		type: "element",
		tagName: "code",
		properties,
		children: [{
			type: "text",
			value
		}]
	};
	if (node$1.meta) result.data = { meta: node$1.meta };
	state.patch(node$1, result);
	result = state.applyData(node$1, result);
	result = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [result]
	};
	state.patch(node$1, result);
	return result;
}
function strikethrough(state, node$1) {
	const result = {
		type: "element",
		tagName: "del",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function emphasis$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "em",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function footnoteReference$1(state, node$1) {
	const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
	const id = String(node$1.identifier).toUpperCase();
	const safeId = normalizeUri(id.toLowerCase());
	const index$1 = state.footnoteOrder.indexOf(id);
	let counter;
	let reuseCounter = state.footnoteCounts.get(id);
	if (reuseCounter === void 0) {
		reuseCounter = 0;
		state.footnoteOrder.push(id);
		counter = state.footnoteOrder.length;
	} else counter = index$1 + 1;
	reuseCounter += 1;
	state.footnoteCounts.set(id, reuseCounter);
	const link$2 = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + clobberPrefix + "fn-" + safeId,
			id: clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
			dataFootnoteRef: true,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(counter)
		}]
	};
	state.patch(node$1, link$2);
	const sup = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [link$2]
	};
	state.patch(node$1, sup);
	return state.applyData(node$1, sup);
}
function heading$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "h" + node$1.depth,
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function html$2(state, node$1) {
	if (state.options.allowDangerousHtml) {
		const result = {
			type: "raw",
			value: node$1.value
		};
		state.patch(node$1, result);
		return state.applyData(node$1, result);
	}
}
function revert(state, node$1) {
	const subtype = node$1.referenceType;
	let suffix = "]";
	if (subtype === "collapsed") suffix += "[]";
	else if (subtype === "full") suffix += "[" + (node$1.label || node$1.identifier) + "]";
	if (node$1.type === "imageReference") return [{
		type: "text",
		value: "![" + node$1.alt + suffix
	}];
	const contents = state.all(node$1);
	const head = contents[0];
	if (head && head.type === "text") head.value = "[" + head.value;
	else contents.unshift({
		type: "text",
		value: "["
	});
	const tail = contents[contents.length - 1];
	if (tail && tail.type === "text") tail.value += suffix;
	else contents.push({
		type: "text",
		value: suffix
	});
	return contents;
}
function imageReference$1(state, node$1) {
	const id = String(node$1.identifier).toUpperCase();
	const definition$2 = state.definitionById.get(id);
	if (!definition$2) return revert(state, node$1);
	const properties = {
		src: normalizeUri(definition$2.url || ""),
		alt: node$1.alt
	};
	if (definition$2.title !== null && definition$2.title !== void 0) properties.title = definition$2.title;
	const result = {
		type: "element",
		tagName: "img",
		properties,
		children: []
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function image$1(state, node$1) {
	const properties = { src: normalizeUri(node$1.url) };
	if (node$1.alt !== null && node$1.alt !== void 0) properties.alt = node$1.alt;
	if (node$1.title !== null && node$1.title !== void 0) properties.title = node$1.title;
	const result = {
		type: "element",
		tagName: "img",
		properties,
		children: []
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function inlineCode$1(state, node$1) {
	const text$6 = {
		type: "text",
		value: node$1.value.replace(/\r?\n|\r/g, " ")
	};
	state.patch(node$1, text$6);
	const result = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [text$6]
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function linkReference$1(state, node$1) {
	const id = String(node$1.identifier).toUpperCase();
	const definition$2 = state.definitionById.get(id);
	if (!definition$2) return revert(state, node$1);
	const properties = { href: normalizeUri(definition$2.url || "") };
	if (definition$2.title !== null && definition$2.title !== void 0) properties.title = definition$2.title;
	const result = {
		type: "element",
		tagName: "a",
		properties,
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function link$1(state, node$1) {
	const properties = { href: normalizeUri(node$1.url) };
	if (node$1.title !== null && node$1.title !== void 0) properties.title = node$1.title;
	const result = {
		type: "element",
		tagName: "a",
		properties,
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function listItem$1(state, node$1, parent) {
	const results = state.all(node$1);
	const loose = parent ? listLoose(parent) : listItemLoose(node$1);
	const properties = {};
	const children = [];
	if (typeof node$1.checked === "boolean") {
		const head = results[0];
		let paragraph$2;
		if (head && head.type === "element" && head.tagName === "p") paragraph$2 = head;
		else {
			paragraph$2 = {
				type: "element",
				tagName: "p",
				properties: {},
				children: []
			};
			results.unshift(paragraph$2);
		}
		if (paragraph$2.children.length > 0) paragraph$2.children.unshift({
			type: "text",
			value: " "
		});
		paragraph$2.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: node$1.checked,
				disabled: true
			},
			children: []
		});
		properties.className = ["task-list-item"];
	}
	let index$1 = -1;
	while (++index$1 < results.length) {
		const child = results[index$1];
		if (loose || index$1 !== 0 || child.type !== "element" || child.tagName !== "p") children.push({
			type: "text",
			value: "\n"
		});
		if (child.type === "element" && child.tagName === "p" && !loose) children.push(...child.children);
		else children.push(child);
	}
	const tail = results[results.length - 1];
	if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) children.push({
		type: "text",
		value: "\n"
	});
	const result = {
		type: "element",
		tagName: "li",
		properties,
		children
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function listLoose(node$1) {
	let loose = false;
	if (node$1.type === "list") {
		loose = node$1.spread || false;
		const children = node$1.children;
		let index$1 = -1;
		while (!loose && ++index$1 < children.length) loose = listItemLoose(children[index$1]);
	}
	return loose;
}
function listItemLoose(node$1) {
	const spread = node$1.spread;
	return spread === null || spread === void 0 ? node$1.children.length > 1 : spread;
}
function list$1(state, node$1) {
	const properties = {};
	const results = state.all(node$1);
	let index$1 = -1;
	if (typeof node$1.start === "number" && node$1.start !== 1) properties.start = node$1.start;
	while (++index$1 < results.length) {
		const child = results[index$1];
		if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
			properties.className = ["contains-task-list"];
			break;
		}
	}
	const result = {
		type: "element",
		tagName: node$1.ordered ? "ol" : "ul",
		properties,
		children: state.wrap(results, true)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function paragraph$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "p",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function root$1(state, node$1) {
	const result = {
		type: "root",
		children: state.wrap(state.all(node$1))
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function strong$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function table(state, node$1) {
	const rows = state.all(node$1);
	const firstRow = rows.shift();
	const tableContent = [];
	if (firstRow) {
		const head = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: state.wrap([firstRow], true)
		};
		state.patch(node$1.children[0], head);
		tableContent.push(head);
	}
	if (rows.length > 0) {
		const body = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: state.wrap(rows, true)
		};
		const start = pointStart(node$1.children[1]);
		const end = pointEnd(node$1.children[node$1.children.length - 1]);
		if (start && end) body.position = {
			start,
			end
		};
		tableContent.push(body);
	}
	const result = {
		type: "element",
		tagName: "table",
		properties: {},
		children: state.wrap(tableContent, true)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function tableRow(state, node$1, parent) {
	const siblings = parent ? parent.children : void 0;
	const tagName = (siblings ? siblings.indexOf(node$1) : 1) === 0 ? "th" : "td";
	const align = parent && parent.type === "table" ? parent.align : void 0;
	const length = align ? align.length : node$1.children.length;
	let cellIndex = -1;
	const cells = [];
	while (++cellIndex < length) {
		const cell = node$1.children[cellIndex];
		const properties = {};
		const alignValue = align ? align[cellIndex] : void 0;
		if (alignValue) properties.align = alignValue;
		let result$1 = {
			type: "element",
			tagName,
			properties,
			children: []
		};
		if (cell) {
			result$1.children = state.all(cell);
			state.patch(cell, result$1);
			result$1 = state.applyData(cell, result$1);
		}
		cells.push(result$1);
	}
	const result = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: state.wrap(cells, true)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function tableCell(state, node$1) {
	const result = {
		type: "element",
		tagName: "td",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function text$2(state, node$1) {
	const result = {
		type: "text",
		value: trimLines(String(node$1.value))
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function thematicBreak$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
var handlers = {
	blockquote: blockquote$1,
	break: hardBreak$1,
	code: code$2,
	delete: strikethrough,
	emphasis: emphasis$1,
	footnoteReference: footnoteReference$1,
	heading: heading$1,
	html: html$2,
	imageReference: imageReference$1,
	image: image$1,
	inlineCode: inlineCode$1,
	linkReference: linkReference$1,
	link: link$1,
	listItem: listItem$1,
	list: list$1,
	paragraph: paragraph$1,
	root: root$1,
	strong: strong$1,
	table,
	tableCell,
	tableRow,
	text: text$2,
	thematicBreak: thematicBreak$1,
	toml: ignore,
	yaml: ignore,
	definition: ignore,
	footnoteDefinition: ignore
};
function ignore() {}
function defaultFootnoteBackContent(_, rereferenceIndex) {
	const result = [{
		type: "text",
		value: "↩"
	}];
	if (rereferenceIndex > 1) result.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(rereferenceIndex)
		}]
	});
	return result;
}
function defaultFootnoteBackLabel(referenceIndex, rereferenceIndex) {
	return "Back to reference " + (referenceIndex + 1) + (rereferenceIndex > 1 ? "-" + rereferenceIndex : "");
}
function footer(state) {
	const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
	const footnoteBackContent = state.options.footnoteBackContent || defaultFootnoteBackContent;
	const footnoteBackLabel = state.options.footnoteBackLabel || defaultFootnoteBackLabel;
	const footnoteLabel = state.options.footnoteLabel || "Footnotes";
	const footnoteLabelTagName = state.options.footnoteLabelTagName || "h2";
	const footnoteLabelProperties = state.options.footnoteLabelProperties || { className: ["sr-only"] };
	const listItems = [];
	let referenceIndex = -1;
	while (++referenceIndex < state.footnoteOrder.length) {
		const definition$2 = state.footnoteById.get(state.footnoteOrder[referenceIndex]);
		if (!definition$2) continue;
		const content$2 = state.all(definition$2);
		const id = String(definition$2.identifier).toUpperCase();
		const safeId = normalizeUri(id.toLowerCase());
		let rereferenceIndex = 0;
		const backReferences = [];
		const counts = state.footnoteCounts.get(id);
		while (counts !== void 0 && ++rereferenceIndex <= counts) {
			if (backReferences.length > 0) backReferences.push({
				type: "text",
				value: " "
			});
			let children = typeof footnoteBackContent === "string" ? footnoteBackContent : footnoteBackContent(referenceIndex, rereferenceIndex);
			if (typeof children === "string") children = {
				type: "text",
				value: children
			};
			backReferences.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + clobberPrefix + "fnref-" + safeId + (rereferenceIndex > 1 ? "-" + rereferenceIndex : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof footnoteBackLabel === "string" ? footnoteBackLabel : footnoteBackLabel(referenceIndex, rereferenceIndex),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(children) ? children : [children]
			});
		}
		const tail = content$2[content$2.length - 1];
		if (tail && tail.type === "element" && tail.tagName === "p") {
			const tailTail = tail.children[tail.children.length - 1];
			if (tailTail && tailTail.type === "text") tailTail.value += " ";
			else tail.children.push({
				type: "text",
				value: " "
			});
			tail.children.push(...backReferences);
		} else content$2.push(...backReferences);
		const listItem$2 = {
			type: "element",
			tagName: "li",
			properties: { id: clobberPrefix + "fn-" + safeId },
			children: state.wrap(content$2, true)
		};
		state.patch(definition$2, listItem$2);
		listItems.push(listItem$2);
	}
	if (listItems.length === 0) return;
	return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: true,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: footnoteLabelTagName,
				properties: {
					...esm_default(footnoteLabelProperties),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: footnoteLabel
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: state.wrap(listItems, true)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
var convert = (function(test) {
	if (test === null || test === void 0) return ok$1;
	if (typeof test === "function") return castFactory(test);
	if (typeof test === "object") return Array.isArray(test) ? anyFactory(test) : propertiesFactory(test);
	if (typeof test === "string") return typeFactory(test);
	throw new Error("Expected function, string, or object as test");
});
function anyFactory(tests) {
	const checks = [];
	let index$1 = -1;
	while (++index$1 < tests.length) checks[index$1] = convert(tests[index$1]);
	return castFactory(any);
	function any(...parameters) {
		let index$2 = -1;
		while (++index$2 < checks.length) if (checks[index$2].apply(this, parameters)) return true;
		return false;
	}
}
function propertiesFactory(check) {
	const checkAsRecord = check;
	return castFactory(all$1);
	function all$1(node$1) {
		const nodeAsRecord = node$1;
		let key;
		for (key in check) if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
		return true;
	}
}
function typeFactory(check) {
	return castFactory(type);
	function type(node$1) {
		return node$1 && node$1.type === check;
	}
}
function castFactory(testFunction) {
	return check;
	function check(value, index$1, parent) {
		return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index$1 === "number" ? index$1 : void 0, parent || void 0));
	}
}
function ok$1() {
	return true;
}
function looksLikeANode(value) {
	return value !== null && typeof value === "object" && "type" in value;
}
function color(d) {
	return "\x1B[33m" + d + "\x1B[39m";
}
var empty = [];
function visitParents(tree, test, visitor, reverse) {
	let check;
	if (typeof test === "function" && typeof visitor !== "function") {
		reverse = visitor;
		visitor = test;
	} else check = test;
	const is = convert(check);
	const step = reverse ? -1 : 1;
	factory(tree, void 0, [])();
	function factory(node$1, index$1, parents) {
		const value = node$1 && typeof node$1 === "object" ? node$1 : {};
		if (typeof value.type === "string") {
			const name$1 = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
			Object.defineProperty(visit$1, "name", { value: "node (" + color(node$1.type + (name$1 ? "<" + name$1 + ">" : "")) + ")" });
		}
		return visit$1;
		function visit$1() {
			let result = empty;
			let subresult;
			let offset;
			let grandparents;
			if (!test || is(node$1, index$1, parents[parents.length - 1] || void 0)) {
				result = toResult(visitor(node$1, parents));
				if (result[0] === false) return result;
			}
			if ("children" in node$1 && node$1.children) {
				const nodeAsParent = node$1;
				if (nodeAsParent.children && result[0] !== "skip") {
					offset = (reverse ? nodeAsParent.children.length : -1) + step;
					grandparents = parents.concat(nodeAsParent);
					while (offset > -1 && offset < nodeAsParent.children.length) {
						const child = nodeAsParent.children[offset];
						subresult = factory(child, offset, grandparents)();
						if (subresult[0] === false) return subresult;
						offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
					}
				}
			}
			return result;
		}
	}
}
function toResult(value) {
	if (Array.isArray(value)) return value;
	if (typeof value === "number") return [true, value];
	return value === null || value === void 0 ? empty : [value];
}
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
	let reverse;
	let test;
	let visitor;
	if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
		test = void 0;
		visitor = testOrVisitor;
		reverse = visitorOrReverse;
	} else {
		test = testOrVisitor;
		visitor = visitorOrReverse;
		reverse = maybeReverse;
	}
	visitParents(tree, test, overload, reverse);
	function overload(node$1, parents) {
		const parent = parents[parents.length - 1];
		const index$1 = parent ? parent.children.indexOf(node$1) : void 0;
		return visitor(node$1, index$1, parent);
	}
}
var own$1 = {}.hasOwnProperty;
var emptyOptions$1 = {};
function createState(tree, options) {
	const settings = options || emptyOptions$1;
	const definitionById = /* @__PURE__ */ new Map();
	const footnoteById = /* @__PURE__ */ new Map();
	const state = {
		all: all$1,
		applyData,
		definitionById,
		footnoteById,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...handlers,
			...settings.handlers
		},
		one: one$2,
		options: settings,
		patch,
		wrap
	};
	visit(tree, function(node$1) {
		if (node$1.type === "definition" || node$1.type === "footnoteDefinition") {
			const map$2 = node$1.type === "definition" ? definitionById : footnoteById;
			const id = String(node$1.identifier).toUpperCase();
			if (!map$2.has(id)) map$2.set(id, node$1);
		}
	});
	return state;
	function one$2(node$1, parent) {
		const type = node$1.type;
		const handle$1 = state.handlers[type];
		if (own$1.call(state.handlers, type) && handle$1) return handle$1(state, node$1, parent);
		if (state.options.passThrough && state.options.passThrough.includes(type)) {
			if ("children" in node$1) {
				const { children, ...shallow } = node$1;
				const result = esm_default(shallow);
				result.children = state.all(node$1);
				return result;
			}
			return esm_default(node$1);
		}
		return (state.options.unknownHandler || defaultUnknownHandler)(state, node$1, parent);
	}
	function all$1(parent) {
		const values = [];
		if ("children" in parent) {
			const nodes = parent.children;
			let index$1 = -1;
			while (++index$1 < nodes.length) {
				const result = state.one(nodes[index$1], parent);
				if (result) {
					if (index$1 && nodes[index$1 - 1].type === "break") {
						if (!Array.isArray(result) && result.type === "text") result.value = trimMarkdownSpaceStart(result.value);
						if (!Array.isArray(result) && result.type === "element") {
							const head = result.children[0];
							if (head && head.type === "text") head.value = trimMarkdownSpaceStart(head.value);
						}
					}
					if (Array.isArray(result)) values.push(...result);
					else values.push(result);
				}
			}
		}
		return values;
	}
}
function patch(from, to) {
	if (from.position) to.position = position(from);
}
function applyData(from, to) {
	let result = to;
	if (from && from.data) {
		const hName = from.data.hName;
		const hChildren = from.data.hChildren;
		const hProperties = from.data.hProperties;
		if (typeof hName === "string") if (result.type === "element") result.tagName = hName;
		else result = {
			type: "element",
			tagName: hName,
			properties: {},
			children: "children" in result ? result.children : [result]
		};
		if (result.type === "element" && hProperties) Object.assign(result.properties, esm_default(hProperties));
		if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) result.children = hChildren;
	}
	return result;
}
function defaultUnknownHandler(state, node$1) {
	const data = node$1.data || {};
	const result = "value" in node$1 && !(own$1.call(data, "hProperties") || own$1.call(data, "hChildren")) ? {
		type: "text",
		value: node$1.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function wrap(nodes, loose) {
	const result = [];
	let index$1 = -1;
	if (loose) result.push({
		type: "text",
		value: "\n"
	});
	while (++index$1 < nodes.length) {
		if (index$1) result.push({
			type: "text",
			value: "\n"
		});
		result.push(nodes[index$1]);
	}
	if (loose && nodes.length > 0) result.push({
		type: "text",
		value: "\n"
	});
	return result;
}
function trimMarkdownSpaceStart(value) {
	let index$1 = 0;
	let code$3 = value.charCodeAt(index$1);
	while (code$3 === 9 || code$3 === 32) {
		index$1++;
		code$3 = value.charCodeAt(index$1);
	}
	return value.slice(index$1);
}
function toHast(tree, options) {
	const state = createState(tree, options);
	const node$1 = state.one(tree, void 0);
	const foot = footer(state);
	const result = Array.isArray(node$1) ? {
		type: "root",
		children: node$1
	} : node$1 || {
		type: "root",
		children: []
	};
	if (foot) {
		"children" in result;
		result.children.push({
			type: "text",
			value: "\n"
		}, foot);
	}
	return result;
}
function remarkRehype(destination, options) {
	if (destination && "run" in destination) return async function(tree, file) {
		const hastTree = toHast(tree, {
			file,
			...options
		});
		await destination.run(hastTree, file);
	};
	return function(tree, file) {
		return toHast(tree, {
			file,
			...destination || options
		});
	};
}
var CallableInstance = (function(property) {
	const proto = this.constructor.prototype;
	const value = proto[property];
	const apply = function() {
		return value.apply(apply, arguments);
	};
	Object.setPrototypeOf(apply, proto);
	return apply;
});
var own = {}.hasOwnProperty;
var unified = new class Processor extends CallableInstance {
	constructor() {
		super("copy");
		this.Compiler = void 0;
		this.Parser = void 0;
		this.attachers = [];
		this.compiler = void 0;
		this.freezeIndex = -1;
		this.frozen = void 0;
		this.namespace = {};
		this.parser = void 0;
		this.transformers = trough();
	}
	copy() {
		const destination = new Processor();
		let index$1 = -1;
		while (++index$1 < this.attachers.length) {
			const attacher = this.attachers[index$1];
			destination.use(...attacher);
		}
		destination.data((0, import_extend.default)(true, {}, this.namespace));
		return destination;
	}
	data(key, value) {
		if (typeof key === "string") {
			if (arguments.length === 2) {
				assertUnfrozen("data", this.frozen);
				this.namespace[key] = value;
				return this;
			}
			return own.call(this.namespace, key) && this.namespace[key] || void 0;
		}
		if (key) {
			assertUnfrozen("data", this.frozen);
			this.namespace = key;
			return this;
		}
		return this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		const self = this;
		while (++this.freezeIndex < this.attachers.length) {
			const [attacher, ...options] = this.attachers[this.freezeIndex];
			if (options[0] === false) continue;
			if (options[0] === true) options[0] = void 0;
			const transformer = attacher.call(self, ...options);
			if (typeof transformer === "function") this.transformers.use(transformer);
		}
		this.frozen = true;
		this.freezeIndex = Number.POSITIVE_INFINITY;
		return this;
	}
	parse(file) {
		this.freeze();
		const realFile = vfile(file);
		const parser = this.parser || this.Parser;
		assertParser("parse", parser);
		return parser(String(realFile), realFile);
	}
	process(file, done) {
		const self = this;
		this.freeze();
		assertParser("process", this.parser || this.Parser);
		assertCompiler("process", this.compiler || this.Compiler);
		return done ? executor(void 0, done) : new Promise(executor);
		function executor(resolve, reject) {
			const realFile = vfile(file);
			const parseTree = self.parse(realFile);
			self.run(parseTree, realFile, function(error, tree, file$1) {
				if (error || !tree || !file$1) return realDone(error);
				const compileTree = tree;
				const compileResult = self.stringify(compileTree, file$1);
				if (looksLikeAValue(compileResult)) file$1.value = compileResult;
				else file$1.result = compileResult;
				realDone(error, file$1);
			});
			function realDone(error, file$1) {
				if (error || !file$1) reject(error);
				else if (resolve) resolve(file$1);
				else done(void 0, file$1);
			}
		}
	}
	processSync(file) {
		let complete = false;
		let result;
		this.freeze();
		assertParser("processSync", this.parser || this.Parser);
		assertCompiler("processSync", this.compiler || this.Compiler);
		this.process(file, realDone);
		assertDone("processSync", "process", complete);
		return result;
		function realDone(error, file$1) {
			complete = true;
			bail(error);
			result = file$1;
		}
	}
	run(tree, file, done) {
		assertNode(tree);
		this.freeze();
		const transformers = this.transformers;
		if (!done && typeof file === "function") {
			done = file;
			file = void 0;
		}
		return done ? executor(void 0, done) : new Promise(executor);
		function executor(resolve, reject) {
			const realFile = vfile(file);
			transformers.run(tree, realFile, realDone);
			function realDone(error, outputTree, file$1) {
				const resultingTree = outputTree || tree;
				if (error) reject(error);
				else if (resolve) resolve(resultingTree);
				else done(void 0, resultingTree, file$1);
			}
		}
	}
	runSync(tree, file) {
		let complete = false;
		let result;
		this.run(tree, file, realDone);
		assertDone("runSync", "run", complete);
		return result;
		function realDone(error, tree$1) {
			bail(error);
			result = tree$1;
			complete = true;
		}
	}
	stringify(tree, file) {
		this.freeze();
		const realFile = vfile(file);
		const compiler$1 = this.compiler || this.Compiler;
		assertCompiler("stringify", compiler$1);
		assertNode(tree);
		return compiler$1(tree, realFile);
	}
	use(value, ...parameters) {
		const attachers = this.attachers;
		const namespace = this.namespace;
		assertUnfrozen("use", this.frozen);
		if (value === null || value === void 0) {} else if (typeof value === "function") addPlugin(value, parameters);
		else if (typeof value === "object") if (Array.isArray(value)) addList(value);
		else addPreset(value);
		else throw new TypeError("Expected usable value, not `" + value + "`");
		return this;
		function add(value$1) {
			if (typeof value$1 === "function") addPlugin(value$1, []);
			else if (typeof value$1 === "object") if (Array.isArray(value$1)) {
				const [plugin, ...parameters$1] = value$1;
				addPlugin(plugin, parameters$1);
			} else addPreset(value$1);
			else throw new TypeError("Expected usable value, not `" + value$1 + "`");
		}
		function addPreset(result) {
			if (!("plugins" in result) && !("settings" in result)) throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			addList(result.plugins);
			if (result.settings) namespace.settings = (0, import_extend.default)(true, namespace.settings, result.settings);
		}
		function addList(plugins) {
			let index$1 = -1;
			if (plugins === null || plugins === void 0) {} else if (Array.isArray(plugins)) while (++index$1 < plugins.length) {
				const thing = plugins[index$1];
				add(thing);
			}
			else throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
		}
		function addPlugin(plugin, parameters$1) {
			let index$1 = -1;
			let entryIndex = -1;
			while (++index$1 < attachers.length) if (attachers[index$1][0] === plugin) {
				entryIndex = index$1;
				break;
			}
			if (entryIndex === -1) attachers.push([plugin, ...parameters$1]);
			else if (parameters$1.length > 0) {
				let [primary, ...rest] = parameters$1;
				const currentPrimary = attachers[entryIndex][1];
				if (isPlainObject(currentPrimary) && isPlainObject(primary)) primary = (0, import_extend.default)(true, currentPrimary, primary);
				attachers[entryIndex] = [
					plugin,
					primary,
					...rest
				];
			}
		}
	}
}().freeze();
function assertParser(name$1, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name$1 + "` without `parser`");
}
function assertCompiler(name$1, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name$1 + "` without `compiler`");
}
function assertUnfrozen(name$1, frozen) {
	if (frozen) throw new Error("Cannot call `" + name$1 + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function assertNode(node$1) {
	if (!isPlainObject(node$1) || typeof node$1.type !== "string") throw new TypeError("Expected node, got `" + node$1 + "`");
}
function assertDone(name$1, asyncName, complete) {
	if (!complete) throw new Error("`" + name$1 + "` finished async. Use `" + asyncName + "` instead");
}
function vfile(value) {
	return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
	return Boolean(value && typeof value === "object" && "message" in value && "messages" in value);
}
function looksLikeAValue(value) {
	return typeof value === "string" || isUint8Array(value);
}
function isUint8Array(value) {
	return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
}
var emptyPlugins = [];
var emptyRemarkRehypeOptions = { allowDangerousHtml: true };
var safeProtocol = /^(https?|ircs?|mailto|xmpp)$/i;
var deprecations = [
	{
		from: "astPlugins",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowDangerousHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowNode",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowElement"
	},
	{
		from: "allowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowedElements"
	},
	{
		from: "className",
		id: "remove-classname"
	},
	{
		from: "disallowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "disallowedElements"
	},
	{
		from: "escapeHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "includeElementIndex",
		id: "#remove-includeelementindex"
	},
	{
		from: "includeNodeIndex",
		id: "change-includenodeindex-to-includeelementindex"
	},
	{
		from: "linkTarget",
		id: "remove-linktarget"
	},
	{
		from: "plugins",
		id: "change-plugins-to-remarkplugins",
		to: "remarkPlugins"
	},
	{
		from: "rawSourcePos",
		id: "#remove-rawsourcepos"
	},
	{
		from: "renderers",
		id: "change-renderers-to-components",
		to: "components"
	},
	{
		from: "source",
		id: "change-source-to-children",
		to: "children"
	},
	{
		from: "sourcePos",
		id: "#remove-sourcepos"
	},
	{
		from: "transformImageUri",
		id: "#add-urltransform",
		to: "urlTransform"
	},
	{
		from: "transformLinkUri",
		id: "#add-urltransform",
		to: "urlTransform"
	}
];
function Markdown(options) {
	const processor = createProcessor(options);
	const file = createFile(options);
	return post(processor.runSync(processor.parse(file), file), options);
}
function createProcessor(options) {
	const rehypePlugins = options.rehypePlugins || emptyPlugins;
	const remarkPlugins = options.remarkPlugins || emptyPlugins;
	const remarkRehypeOptions = options.remarkRehypeOptions ? {
		...options.remarkRehypeOptions,
		...emptyRemarkRehypeOptions
	} : emptyRemarkRehypeOptions;
	return unified().use(remarkParse).use(remarkPlugins).use(remarkRehype, remarkRehypeOptions).use(rehypePlugins);
}
function createFile(options) {
	const children = options.children || "";
	const file = new VFile();
	if (typeof children === "string") file.value = children;
	else "" + children;
	return file;
}
function post(tree, options) {
	const allowedElements = options.allowedElements;
	const allowElement = options.allowElement;
	const components = options.components;
	const disallowedElements = options.disallowedElements;
	const skipHtml = options.skipHtml;
	const unwrapDisallowed = options.unwrapDisallowed;
	const urlTransform = options.urlTransform || defaultUrlTransform;
	for (const deprecation of deprecations) if (Object.hasOwn(options, deprecation.from)) "" + deprecation.from + (deprecation.to ? "use `" + deprecation.to + "` instead" : "remove it") + deprecation.id;
	if (allowedElements && disallowedElements);
	visit(tree, transform);
	return toJsxRuntime(tree, {
		Fragment: import_jsx_runtime.Fragment,
		components,
		ignoreInvalidStyle: true,
		jsx: import_jsx_runtime.jsx,
		jsxs: import_jsx_runtime.jsxs,
		passKeys: true,
		passNode: true
	});
	function transform(node$1, index$1, parent) {
		if (node$1.type === "raw" && parent && typeof index$1 === "number") {
			if (skipHtml) parent.children.splice(index$1, 1);
			else parent.children[index$1] = {
				type: "text",
				value: node$1.value
			};
			return index$1;
		}
		if (node$1.type === "element") {
			let key;
			for (key in urlAttributes) if (Object.hasOwn(urlAttributes, key) && Object.hasOwn(node$1.properties, key)) {
				const value = node$1.properties[key];
				const test = urlAttributes[key];
				if (test === null || test.includes(node$1.tagName)) node$1.properties[key] = urlTransform(String(value || ""), key, node$1);
			}
		}
		if (node$1.type === "element") {
			let remove = allowedElements ? !allowedElements.includes(node$1.tagName) : disallowedElements ? disallowedElements.includes(node$1.tagName) : false;
			if (!remove && allowElement && typeof index$1 === "number") remove = !allowElement(node$1, index$1, parent);
			if (remove && parent && typeof index$1 === "number") {
				if (unwrapDisallowed && node$1.children) parent.children.splice(index$1, 1, ...node$1.children);
				else parent.children.splice(index$1, 1);
				return index$1;
			}
		}
	}
}
function defaultUrlTransform(value) {
	const colon = value.indexOf(":");
	const questionMark = value.indexOf("?");
	const numberSign = value.indexOf("#");
	const slash = value.indexOf("/");
	if (colon === -1 || slash !== -1 && colon > slash || questionMark !== -1 && colon > questionMark || numberSign !== -1 && colon > numberSign || safeProtocol.test(value.slice(0, colon))) return value;
	return "";
}
function findAndReplace(tree, list$3, options) {
	const ignored = convert((options || {}).ignore || []);
	const pairs = toPairs(list$3);
	let pairIndex = -1;
	while (++pairIndex < pairs.length) visitParents(tree, "text", visitor);
	function visitor(node$1, parents) {
		let index$1 = -1;
		let grandparent;
		while (++index$1 < parents.length) {
			const parent = parents[index$1];
			const siblings = grandparent ? grandparent.children : void 0;
			if (ignored(parent, siblings ? siblings.indexOf(parent) : void 0, grandparent)) return;
			grandparent = parent;
		}
		if (grandparent) return handler(node$1, parents);
	}
	function handler(node$1, parents) {
		const parent = parents[parents.length - 1];
		const find$1 = pairs[pairIndex][0];
		const replace$1 = pairs[pairIndex][1];
		let start = 0;
		const index$1 = parent.children.indexOf(node$1);
		let change = false;
		let nodes = [];
		find$1.lastIndex = 0;
		let match = find$1.exec(node$1.value);
		while (match) {
			const position$2 = match.index;
			const matchObject = {
				index: match.index,
				input: match.input,
				stack: [...parents, node$1]
			};
			let value = replace$1(...match, matchObject);
			if (typeof value === "string") value = value.length > 0 ? {
				type: "text",
				value
			} : void 0;
			if (value === false) find$1.lastIndex = position$2 + 1;
			else {
				if (start !== position$2) nodes.push({
					type: "text",
					value: node$1.value.slice(start, position$2)
				});
				if (Array.isArray(value)) nodes.push(...value);
				else if (value) nodes.push(value);
				start = position$2 + match[0].length;
				change = true;
			}
			if (!find$1.global) break;
			match = find$1.exec(node$1.value);
		}
		if (change) {
			if (start < node$1.value.length) nodes.push({
				type: "text",
				value: node$1.value.slice(start)
			});
			parent.children.splice(index$1, 1, ...nodes);
		} else nodes = [node$1];
		return index$1 + nodes.length;
	}
}
function toPairs(tupleOrList) {
	const result = [];
	if (!Array.isArray(tupleOrList)) throw new TypeError("Expected find and replace tuple or list of tuples");
	const list$3 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
	let index$1 = -1;
	while (++index$1 < list$3.length) {
		const tuple = list$3[index$1];
		result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
	}
	return result;
}
function toExpression(find$1) {
	return typeof find$1 === "string" ? new RegExp(escapeStringRegexp(find$1), "g") : find$1;
}
function toFunction(replace$1) {
	return typeof replace$1 === "function" ? replace$1 : function() {
		return replace$1;
	};
}
var inConstruct = "phrasing";
var notInConstruct = [
	"autolink",
	"link",
	"image",
	"label"
];
function gfmAutolinkLiteralFromMarkdown() {
	return {
		transforms: [transformGfmAutolinkLiterals],
		enter: {
			literalAutolink: enterLiteralAutolink,
			literalAutolinkEmail: enterLiteralAutolinkValue,
			literalAutolinkHttp: enterLiteralAutolinkValue,
			literalAutolinkWww: enterLiteralAutolinkValue
		},
		exit: {
			literalAutolink: exitLiteralAutolink,
			literalAutolinkEmail: exitLiteralAutolinkEmail,
			literalAutolinkHttp: exitLiteralAutolinkHttp,
			literalAutolinkWww: exitLiteralAutolinkWww
		}
	};
}
function gfmAutolinkLiteralToMarkdown() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct,
			notInConstruct
		}
	] };
}
function enterLiteralAutolink(token) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, token);
}
function enterLiteralAutolinkValue(token) {
	this.config.enter.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkHttp(token) {
	this.config.exit.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkWww(token) {
	this.config.exit.data.call(this, token);
	const node$1 = this.stack[this.stack.length - 1];
	node$1.type;
	node$1.url = "http://" + this.sliceSerialize(token);
}
function exitLiteralAutolinkEmail(token) {
	this.config.exit.autolinkEmail.call(this, token);
}
function exitLiteralAutolink(token) {
	this.exit(token);
}
function transformGfmAutolinkLiterals(tree) {
	findAndReplace(tree, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl], [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), findEmail]], { ignore: ["link", "linkReference"] });
}
function findUrl(_, protocol, domain$1, path$1, match) {
	let prefix = "";
	if (!previous(match)) return false;
	if (/^w/i.test(protocol)) {
		domain$1 = protocol + domain$1;
		protocol = "";
		prefix = "http://";
	}
	if (!isCorrectDomain(domain$1)) return false;
	const parts = splitUrl(domain$1 + path$1);
	if (!parts[0]) return false;
	const result = {
		type: "link",
		title: null,
		url: prefix + protocol + parts[0],
		children: [{
			type: "text",
			value: protocol + parts[0]
		}]
	};
	if (parts[1]) return [result, {
		type: "text",
		value: parts[1]
	}];
	return result;
}
function findEmail(_, atext, label, match) {
	if (!previous(match, true) || /[-\d_]$/.test(label)) return false;
	return {
		type: "link",
		title: null,
		url: "mailto:" + atext + "@" + label,
		children: [{
			type: "text",
			value: atext + "@" + label
		}]
	};
}
function isCorrectDomain(domain$1) {
	const parts = domain$1.split(".");
	if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) return false;
	return true;
}
function splitUrl(url) {
	const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
	if (!trailExec) return [url, void 0];
	url = url.slice(0, trailExec.index);
	let trail$1 = trailExec[0];
	let closingParenIndex = trail$1.indexOf(")");
	const openingParens = ccount(url, "(");
	let closingParens = ccount(url, ")");
	while (closingParenIndex !== -1 && openingParens > closingParens) {
		url += trail$1.slice(0, closingParenIndex + 1);
		trail$1 = trail$1.slice(closingParenIndex + 1);
		closingParenIndex = trail$1.indexOf(")");
		closingParens++;
	}
	return [url, trail$1];
}
function previous(match, email) {
	const code$3 = match.input.charCodeAt(match.index - 1);
	return (match.index === 0 || unicodeWhitespace(code$3) || unicodePunctuation(code$3)) && (!email || code$3 !== 47);
}
footnoteReference.peek = footnoteReferencePeek;
function enterFootnoteCallString() {
	this.buffer();
}
function enterFootnoteCall(token) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, token);
}
function enterFootnoteDefinitionLabelString() {
	this.buffer();
}
function enterFootnoteDefinition(token) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, token);
}
function exitFootnoteCallString(token) {
	const label = this.resume();
	const node$1 = this.stack[this.stack.length - 1];
	node$1.type;
	node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	node$1.label = label;
}
function exitFootnoteCall(token) {
	this.exit(token);
}
function exitFootnoteDefinitionLabelString(token) {
	const label = this.resume();
	const node$1 = this.stack[this.stack.length - 1];
	node$1.type;
	node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	node$1.label = label;
}
function exitFootnoteDefinition(token) {
	this.exit(token);
}
function footnoteReferencePeek() {
	return "[";
}
function footnoteReference(node$1, _, state, info) {
	const tracker = state.createTracker(info);
	let value = tracker.move("[^");
	const exit$2 = state.enter("footnoteReference");
	const subexit = state.enter("reference");
	value += tracker.move(state.safe(state.associationId(node$1), {
		after: "]",
		before: value
	}));
	subexit();
	exit$2();
	value += tracker.move("]");
	return value;
}
function gfmFootnoteFromMarkdown() {
	return {
		enter: {
			gfmFootnoteCallString: enterFootnoteCallString,
			gfmFootnoteCall: enterFootnoteCall,
			gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
			gfmFootnoteDefinition: enterFootnoteDefinition
		},
		exit: {
			gfmFootnoteCallString: exitFootnoteCallString,
			gfmFootnoteCall: exitFootnoteCall,
			gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
			gfmFootnoteDefinition: exitFootnoteDefinition
		}
	};
}
function gfmFootnoteToMarkdown(options) {
	let firstLineBlank = false;
	if (options && options.firstLineBlank) firstLineBlank = true;
	return {
		handlers: {
			footnoteDefinition,
			footnoteReference
		},
		unsafe: [{
			character: "[",
			inConstruct: [
				"label",
				"phrasing",
				"reference"
			]
		}]
	};
	function footnoteDefinition(node$1, _, state, info) {
		const tracker = state.createTracker(info);
		let value = tracker.move("[^");
		const exit$2 = state.enter("footnoteDefinition");
		const subexit = state.enter("label");
		value += tracker.move(state.safe(state.associationId(node$1), {
			before: value,
			after: "]"
		}));
		subexit();
		value += tracker.move("]:");
		if (node$1.children && node$1.children.length > 0) {
			tracker.shift(4);
			value += tracker.move((firstLineBlank ? "\n" : " ") + state.indentLines(state.containerFlow(node$1, tracker.current()), firstLineBlank ? mapAll : mapExceptFirst));
		}
		exit$2();
		return value;
	}
}
function mapExceptFirst(line, index$1, blank) {
	return index$1 === 0 ? line : mapAll(line, index$1, blank);
}
function mapAll(line, index$1, blank) {
	return (blank ? "" : "    ") + line;
}
var constructsWithoutStrikethrough = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
handleDelete.peek = peekDelete;
function gfmStrikethroughFromMarkdown() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: enterStrikethrough },
		exit: { strikethrough: exitStrikethrough }
	};
}
function gfmStrikethroughToMarkdown() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: constructsWithoutStrikethrough
		}],
		handlers: { delete: handleDelete }
	};
}
function enterStrikethrough(token) {
	this.enter({
		type: "delete",
		children: []
	}, token);
}
function exitStrikethrough(token) {
	this.exit(token);
}
function handleDelete(node$1, _, state, info) {
	const tracker = state.createTracker(info);
	const exit$2 = state.enter("strikethrough");
	let value = tracker.move("~~");
	value += state.containerPhrasing(node$1, {
		...tracker.current(),
		before: value,
		after: "~"
	});
	value += tracker.move("~~");
	exit$2();
	return value;
}
function peekDelete() {
	return "~";
}
function blockquote(node$1, _, state, info) {
	const exit$2 = state.enter("blockquote");
	const tracker = state.createTracker(info);
	tracker.move("> ");
	tracker.shift(2);
	const value = state.indentLines(state.containerFlow(node$1, tracker.current()), map$1);
	exit$2();
	return value;
}
function map$1(line, _, blank) {
	return ">" + (blank ? "" : " ") + line;
}
function patternInScope(stack, pattern) {
	return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
function listInScope(stack, list$3, none) {
	if (typeof list$3 === "string") list$3 = [list$3];
	if (!list$3 || list$3.length === 0) return none;
	let index$1 = -1;
	while (++index$1 < list$3.length) if (stack.includes(list$3[index$1])) return true;
	return false;
}
function hardBreak(_, _1, state, info) {
	let index$1 = -1;
	while (++index$1 < state.unsafe.length) if (state.unsafe[index$1].character === "\n" && patternInScope(state.stack, state.unsafe[index$1])) return /[ \t]/.test(info.before) ? "" : " ";
	return "\\\n";
}
function formatCodeAsIndented(node$1, state) {
	return Boolean(state.options.fences === false && node$1.value && !node$1.lang && /[^ \r\n]/.test(node$1.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node$1.value));
}
function checkFence(state) {
	const marker = state.options.fence || "`";
	if (marker !== "`" && marker !== "~") throw new Error("Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`");
	return marker;
}
function code$1(node$1, _, state, info) {
	const marker = checkFence(state);
	const raw = node$1.value || "";
	const suffix = marker === "`" ? "GraveAccent" : "Tilde";
	if (formatCodeAsIndented(node$1, state)) {
		const exit$3 = state.enter("codeIndented");
		const value$1 = state.indentLines(raw, map);
		exit$3();
		return value$1;
	}
	const tracker = state.createTracker(info);
	const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
	const exit$2 = state.enter("codeFenced");
	let value = tracker.move(sequence);
	if (node$1.lang) {
		const subexit = state.enter(`codeFencedLang${suffix}`);
		value += tracker.move(state.safe(node$1.lang, {
			before: value,
			after: " ",
			encode: ["`"],
			...tracker.current()
		}));
		subexit();
	}
	if (node$1.lang && node$1.meta) {
		const subexit = state.enter(`codeFencedMeta${suffix}`);
		value += tracker.move(" ");
		value += tracker.move(state.safe(node$1.meta, {
			before: value,
			after: "\n",
			encode: ["`"],
			...tracker.current()
		}));
		subexit();
	}
	value += tracker.move("\n");
	if (raw) value += tracker.move(raw + "\n");
	value += tracker.move(sequence);
	exit$2();
	return value;
}
function map(line, _, blank) {
	return (blank ? "" : "    ") + line;
}
function checkQuote(state) {
	const marker = state.options.quote || "\"";
	if (marker !== "\"" && marker !== "'") throw new Error("Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`");
	return marker;
}
function definition(node$1, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const exit$2 = state.enter("definition");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("[");
	value += tracker.move(state.safe(state.associationId(node$1), {
		before: value,
		after: "]",
		...tracker.current()
	}));
	value += tracker.move("]: ");
	subexit();
	if (!node$1.url || /[\0- \u007F]/.test(node$1.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: node$1.title ? " " : "\n",
			...tracker.current()
		}));
	}
	subexit();
	if (node$1.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node$1.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	exit$2();
	return value;
}
function checkEmphasis(state) {
	const marker = state.options.emphasis || "*";
	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`");
	return marker;
}
function encodeCharacterReference(code$3) {
	return "&#x" + code$3.toString(16).toUpperCase() + ";";
}
function encodeInfo(outside, inside, marker) {
	const outsideKind = classifyCharacter(outside);
	const insideKind = classifyCharacter(inside);
	if (outsideKind === void 0) return insideKind === void 0 ? marker === "_" ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: false
	} : insideKind === 1 ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: true
	};
	if (outsideKind === 1) return insideKind === void 0 ? {
		inside: false,
		outside: false
	} : insideKind === 1 ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: false
	};
	return insideKind === void 0 ? {
		inside: false,
		outside: false
	} : insideKind === 1 ? {
		inside: true,
		outside: false
	} : {
		inside: false,
		outside: false
	};
}
emphasis.peek = emphasisPeek;
function emphasis(node$1, _, state, info) {
	const marker = checkEmphasis(state);
	const exit$2 = state.enter("emphasis");
	const tracker = state.createTracker(info);
	const before = tracker.move(marker);
	let between = tracker.move(state.containerPhrasing(node$1, {
		after: marker,
		before,
		...tracker.current()
	}));
	const betweenHead = between.charCodeAt(0);
	const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
	if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
	const betweenTail = between.charCodeAt(between.length - 1);
	const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
	if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
	const after = tracker.move(marker);
	exit$2();
	state.attentionEncodeSurroundingInfo = {
		after: close.outside,
		before: open.outside
	};
	return before + between + after;
}
function emphasisPeek(_, _1, state) {
	return state.options.emphasis || "*";
}
function formatHeadingAsSetext(node$1, state) {
	let literalWithBreak = false;
	visit(node$1, function(node$2) {
		if ("value" in node$2 && /\r?\n|\r/.test(node$2.value) || node$2.type === "break") {
			literalWithBreak = true;
			return false;
		}
	});
	return Boolean((!node$1.depth || node$1.depth < 3) && toString(node$1) && (state.options.setext || literalWithBreak));
}
function heading(node$1, _, state, info) {
	const rank = Math.max(Math.min(6, node$1.depth || 1), 1);
	const tracker = state.createTracker(info);
	if (formatHeadingAsSetext(node$1, state)) {
		const exit$3 = state.enter("headingSetext");
		const subexit$1 = state.enter("phrasing");
		const value$1 = state.containerPhrasing(node$1, {
			...tracker.current(),
			before: "\n",
			after: "\n"
		});
		subexit$1();
		exit$3();
		return value$1 + "\n" + (rank === 1 ? "=" : "-").repeat(value$1.length - (Math.max(value$1.lastIndexOf("\r"), value$1.lastIndexOf("\n")) + 1));
	}
	const sequence = "#".repeat(rank);
	const exit$2 = state.enter("headingAtx");
	const subexit = state.enter("phrasing");
	tracker.move(sequence + " ");
	let value = state.containerPhrasing(node$1, {
		before: "# ",
		after: "\n",
		...tracker.current()
	});
	if (/^[\t ]/.test(value)) value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
	value = value ? sequence + " " + value : sequence;
	if (state.options.closeAtx) value += " " + sequence;
	subexit();
	exit$2();
	return value;
}
html$1.peek = htmlPeek;
function html$1(node$1) {
	return node$1.value || "";
}
function htmlPeek() {
	return "<";
}
image.peek = imagePeek;
function image(node$1, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const exit$2 = state.enter("image");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("![");
	value += tracker.move(state.safe(node$1.alt, {
		before: value,
		after: "]",
		...tracker.current()
	}));
	value += tracker.move("](");
	subexit();
	if (!node$1.url && node$1.title || /[\0- \u007F]/.test(node$1.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: node$1.title ? " " : ")",
			...tracker.current()
		}));
	}
	subexit();
	if (node$1.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node$1.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	value += tracker.move(")");
	exit$2();
	return value;
}
function imagePeek() {
	return "!";
}
imageReference.peek = imageReferencePeek;
function imageReference(node$1, _, state, info) {
	const type = node$1.referenceType;
	const exit$2 = state.enter("imageReference");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("![");
	const alt = state.safe(node$1.alt, {
		before: value,
		after: "]",
		...tracker.current()
	});
	value += tracker.move(alt + "][");
	subexit();
	const stack = state.stack;
	state.stack = [];
	subexit = state.enter("reference");
	const reference = state.safe(state.associationId(node$1), {
		before: value,
		after: "]",
		...tracker.current()
	});
	subexit();
	state.stack = stack;
	exit$2();
	if (type === "full" || !alt || alt !== reference) value += tracker.move(reference + "]");
	else if (type === "shortcut") value = value.slice(0, -1);
	else value += tracker.move("]");
	return value;
}
function imageReferencePeek() {
	return "!";
}
inlineCode.peek = inlineCodePeek;
function inlineCode(node$1, _, state) {
	let value = node$1.value || "";
	let sequence = "`";
	let index$1 = -1;
	while ((/* @__PURE__ */ new RegExp("(^|[^`])" + sequence + "([^`]|$)")).test(value)) sequence += "`";
	if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) value = " " + value + " ";
	while (++index$1 < state.unsafe.length) {
		const pattern = state.unsafe[index$1];
		const expression = state.compilePattern(pattern);
		let match;
		if (!pattern.atBreak) continue;
		while (match = expression.exec(value)) {
			let position$2 = match.index;
			if (value.charCodeAt(position$2) === 10 && value.charCodeAt(position$2 - 1) === 13) position$2--;
			value = value.slice(0, position$2) + " " + value.slice(match.index + 1);
		}
	}
	return sequence + value + sequence;
}
function inlineCodePeek() {
	return "`";
}
function formatLinkAsAutolink(node$1, state) {
	const raw = toString(node$1);
	return Boolean(!state.options.resourceLink && node$1.url && !node$1.title && node$1.children && node$1.children.length === 1 && node$1.children[0].type === "text" && (raw === node$1.url || "mailto:" + raw === node$1.url) && /^[a-z][a-z+.-]+:/i.test(node$1.url) && !/[\0- <>\u007F]/.test(node$1.url));
}
link.peek = linkPeek;
function link(node$1, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const tracker = state.createTracker(info);
	let exit$2;
	let subexit;
	if (formatLinkAsAutolink(node$1, state)) {
		const stack = state.stack;
		state.stack = [];
		exit$2 = state.enter("autolink");
		let value$1 = tracker.move("<");
		value$1 += tracker.move(state.containerPhrasing(node$1, {
			before: value$1,
			after: ">",
			...tracker.current()
		}));
		value$1 += tracker.move(">");
		exit$2();
		state.stack = stack;
		return value$1;
	}
	exit$2 = state.enter("link");
	subexit = state.enter("label");
	let value = tracker.move("[");
	value += tracker.move(state.containerPhrasing(node$1, {
		before: value,
		after: "](",
		...tracker.current()
	}));
	value += tracker.move("](");
	subexit();
	if (!node$1.url && node$1.title || /[\0- \u007F]/.test(node$1.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: node$1.title ? " " : ")",
			...tracker.current()
		}));
	}
	subexit();
	if (node$1.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node$1.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	value += tracker.move(")");
	exit$2();
	return value;
}
function linkPeek(node$1, _, state) {
	return formatLinkAsAutolink(node$1, state) ? "<" : "[";
}
linkReference.peek = linkReferencePeek;
function linkReference(node$1, _, state, info) {
	const type = node$1.referenceType;
	const exit$2 = state.enter("linkReference");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("[");
	const text$6 = state.containerPhrasing(node$1, {
		before: value,
		after: "]",
		...tracker.current()
	});
	value += tracker.move(text$6 + "][");
	subexit();
	const stack = state.stack;
	state.stack = [];
	subexit = state.enter("reference");
	const reference = state.safe(state.associationId(node$1), {
		before: value,
		after: "]",
		...tracker.current()
	});
	subexit();
	state.stack = stack;
	exit$2();
	if (type === "full" || !text$6 || text$6 !== reference) value += tracker.move(reference + "]");
	else if (type === "shortcut") value = value.slice(0, -1);
	else value += tracker.move("]");
	return value;
}
function linkReferencePeek() {
	return "[";
}
function checkBullet(state) {
	const marker = state.options.bullet || "*";
	if (marker !== "*" && marker !== "+" && marker !== "-") throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return marker;
}
function checkBulletOther(state) {
	const bullet = checkBullet(state);
	const bulletOther = state.options.bulletOther;
	if (!bulletOther) return bullet === "*" ? "-" : "*";
	if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") throw new Error("Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (bulletOther === bullet) throw new Error("Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different");
	return bulletOther;
}
function checkBulletOrdered(state) {
	const marker = state.options.bulletOrdered || ".";
	if (marker !== "." && marker !== ")") throw new Error("Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`");
	return marker;
}
function checkRule(state) {
	const marker = state.options.rule || "*";
	if (marker !== "*" && marker !== "-" && marker !== "_") throw new Error("Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`");
	return marker;
}
function list(node$1, parent, state, info) {
	const exit$2 = state.enter("list");
	const bulletCurrent = state.bulletCurrent;
	let bullet = node$1.ordered ? checkBulletOrdered(state) : checkBullet(state);
	const bulletOther = node$1.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
	let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
	if (!node$1.ordered) {
		const firstListItem = node$1.children ? node$1.children[0] : void 0;
		if ((bullet === "*" || bullet === "-") && firstListItem && (!firstListItem.children || !firstListItem.children[0]) && state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0) useDifferentMarker = true;
		if (checkRule(state) === bullet && firstListItem) {
			let index$1 = -1;
			while (++index$1 < node$1.children.length) {
				const item = node$1.children[index$1];
				if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
					useDifferentMarker = true;
					break;
				}
			}
		}
	}
	if (useDifferentMarker) bullet = bulletOther;
	state.bulletCurrent = bullet;
	const value = state.containerFlow(node$1, info);
	state.bulletLastUsed = bullet;
	state.bulletCurrent = bulletCurrent;
	exit$2();
	return value;
}
function checkListItemIndent(state) {
	const style = state.options.listItemIndent || "one";
	if (style !== "tab" && style !== "one" && style !== "mixed") throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return style;
}
function listItem(node$1, parent, state, info) {
	const listItemIndent = checkListItemIndent(state);
	let bullet = state.bulletCurrent || checkBullet(state);
	if (parent && parent.type === "list" && parent.ordered) bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node$1)) + bullet;
	let size = bullet.length + 1;
	if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node$1.spread)) size = Math.ceil(size / 4) * 4;
	const tracker = state.createTracker(info);
	tracker.move(bullet + " ".repeat(size - bullet.length));
	tracker.shift(size);
	const exit$2 = state.enter("listItem");
	const value = state.indentLines(state.containerFlow(node$1, tracker.current()), map$2);
	exit$2();
	return value;
	function map$2(line, index$1, blank) {
		if (index$1) return (blank ? "" : " ".repeat(size)) + line;
		return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
	}
}
function paragraph(node$1, _, state, info) {
	const exit$2 = state.enter("paragraph");
	const subexit = state.enter("phrasing");
	const value = state.containerPhrasing(node$1, info);
	subexit();
	exit$2();
	return value;
}
var phrasing = convert([
	"break",
	"delete",
	"emphasis",
	"footnote",
	"footnoteReference",
	"image",
	"imageReference",
	"inlineCode",
	"inlineMath",
	"link",
	"linkReference",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"strong",
	"text",
	"textDirective"
]);
function root(node$1, _, state, info) {
	return (node$1.children.some(function(d) {
		return phrasing(d);
	}) ? state.containerPhrasing : state.containerFlow).call(state, node$1, info);
}
function checkStrong(state) {
	const marker = state.options.strong || "*";
	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`");
	return marker;
}
strong.peek = strongPeek;
function strong(node$1, _, state, info) {
	const marker = checkStrong(state);
	const exit$2 = state.enter("strong");
	const tracker = state.createTracker(info);
	const before = tracker.move(marker + marker);
	let between = tracker.move(state.containerPhrasing(node$1, {
		after: marker,
		before,
		...tracker.current()
	}));
	const betweenHead = between.charCodeAt(0);
	const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
	if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
	const betweenTail = between.charCodeAt(between.length - 1);
	const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
	if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
	const after = tracker.move(marker + marker);
	exit$2();
	state.attentionEncodeSurroundingInfo = {
		after: close.outside,
		before: open.outside
	};
	return before + between + after;
}
function strongPeek(_, _1, state) {
	return state.options.strong || "*";
}
function text$1(node$1, _, state, info) {
	return state.safe(node$1.value, info);
}
function checkRuleRepetition(state) {
	const repetition = state.options.ruleRepetition || 3;
	if (repetition < 3) throw new Error("Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more");
	return repetition;
}
function thematicBreak(_, _1, state) {
	const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
	return state.options.ruleSpaces ? value.slice(0, -1) : value;
}
var handle = {
	blockquote,
	break: hardBreak,
	code: code$1,
	definition,
	emphasis,
	hardBreak,
	heading,
	html: html$1,
	image,
	imageReference,
	inlineCode,
	link,
	linkReference,
	list,
	listItem,
	paragraph,
	root,
	strong,
	text: text$1,
	thematicBreak
};
function gfmTableFromMarkdown() {
	return {
		enter: {
			table: enterTable,
			tableData: enterCell,
			tableHeader: enterCell,
			tableRow: enterRow
		},
		exit: {
			codeText: exitCodeText,
			table: exitTable,
			tableData: exit,
			tableHeader: exit,
			tableRow: exit
		}
	};
}
function enterTable(token) {
	const align = token._align;
	this.enter({
		type: "table",
		align: align.map(function(d) {
			return d === "none" ? null : d;
		}),
		children: []
	}, token);
	this.data.inTable = true;
}
function exitTable(token) {
	this.exit(token);
	this.data.inTable = void 0;
}
function enterRow(token) {
	this.enter({
		type: "tableRow",
		children: []
	}, token);
}
function exit(token) {
	this.exit(token);
}
function enterCell(token) {
	this.enter({
		type: "tableCell",
		children: []
	}, token);
}
function exitCodeText(token) {
	let value = this.resume();
	if (this.data.inTable) value = value.replace(/\\([\\|])/g, replace);
	const node$1 = this.stack[this.stack.length - 1];
	node$1.type;
	node$1.value = value;
	this.exit(token);
}
function replace($0, $1) {
	return $1 === "|" ? $1 : $0;
}
function gfmTableToMarkdown(options) {
	const settings = options || {};
	const padding = settings.tableCellPadding;
	const alignDelimiters = settings.tablePipeAlign;
	const stringLength = settings.stringLength;
	const around = padding ? " " : "|";
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: true,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: true,
				character: ":",
				after: "-"
			},
			{
				atBreak: true,
				character: "-",
				after: "[:|-]"
			}
		],
		handlers: {
			inlineCode: inlineCodeWithTable,
			table: handleTable,
			tableCell: handleTableCell,
			tableRow: handleTableRow
		}
	};
	function handleTable(node$1, _, state, info) {
		return serializeData(handleTableAsData(node$1, state, info), node$1.align);
	}
	function handleTableRow(node$1, _, state, info) {
		const value = serializeData([handleTableRowAsData(node$1, state, info)]);
		return value.slice(0, value.indexOf("\n"));
	}
	function handleTableCell(node$1, _, state, info) {
		const exit$2 = state.enter("tableCell");
		const subexit = state.enter("phrasing");
		const value = state.containerPhrasing(node$1, {
			...info,
			before: around,
			after: around
		});
		subexit();
		exit$2();
		return value;
	}
	function serializeData(matrix, align) {
		return markdownTable(matrix, {
			align,
			alignDelimiters,
			padding,
			stringLength
		});
	}
	function handleTableAsData(node$1, state, info) {
		const children = node$1.children;
		let index$1 = -1;
		const result = [];
		const subexit = state.enter("table");
		while (++index$1 < children.length) result[index$1] = handleTableRowAsData(children[index$1], state, info);
		subexit();
		return result;
	}
	function handleTableRowAsData(node$1, state, info) {
		const children = node$1.children;
		let index$1 = -1;
		const result = [];
		const subexit = state.enter("tableRow");
		while (++index$1 < children.length) result[index$1] = handleTableCell(children[index$1], node$1, state, info);
		subexit();
		return result;
	}
	function inlineCodeWithTable(node$1, parent, state) {
		let value = handle.inlineCode(node$1, parent, state);
		if (state.stack.includes("tableCell")) value = value.replace(/\|/g, "\\$&");
		return value;
	}
}
function gfmTaskListItemFromMarkdown() {
	return { exit: {
		taskListCheckValueChecked: exitCheck,
		taskListCheckValueUnchecked: exitCheck,
		paragraph: exitParagraphWithTaskListItem
	} };
}
function gfmTaskListItemToMarkdown() {
	return {
		unsafe: [{
			atBreak: true,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: listItemWithTaskListItem }
	};
}
function exitCheck(token) {
	const node$1 = this.stack[this.stack.length - 2];
	node$1.type;
	node$1.checked = token.type === "taskListCheckValueChecked";
}
function exitParagraphWithTaskListItem(token) {
	const parent = this.stack[this.stack.length - 2];
	if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
		const node$1 = this.stack[this.stack.length - 1];
		node$1.type;
		const head = node$1.children[0];
		if (head && head.type === "text") {
			const siblings = parent.children;
			let index$1 = -1;
			let firstParaghraph;
			while (++index$1 < siblings.length) {
				const sibling = siblings[index$1];
				if (sibling.type === "paragraph") {
					firstParaghraph = sibling;
					break;
				}
			}
			if (firstParaghraph === node$1) {
				head.value = head.value.slice(1);
				if (head.value.length === 0) node$1.children.shift();
				else if (node$1.position && head.position && typeof head.position.start.offset === "number") {
					head.position.start.column++;
					head.position.start.offset++;
					node$1.position.start = Object.assign({}, head.position.start);
				}
			}
		}
	}
	this.exit(token);
}
function listItemWithTaskListItem(node$1, parent, state, info) {
	const head = node$1.children[0];
	const checkable = typeof node$1.checked === "boolean" && head && head.type === "paragraph";
	const checkbox = "[" + (node$1.checked ? "x" : " ") + "] ";
	const tracker = state.createTracker(info);
	if (checkable) tracker.move(checkbox);
	let value = handle.listItem(node$1, parent, state, {
		...info,
		...tracker.current()
	});
	if (checkable) value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
	return value;
	function check($0) {
		return $0 + checkbox;
	}
}
function gfmFromMarkdown() {
	return [
		gfmAutolinkLiteralFromMarkdown(),
		gfmFootnoteFromMarkdown(),
		gfmStrikethroughFromMarkdown(),
		gfmTableFromMarkdown(),
		gfmTaskListItemFromMarkdown()
	];
}
function gfmToMarkdown(options) {
	return { extensions: [
		gfmAutolinkLiteralToMarkdown(),
		gfmFootnoteToMarkdown(options),
		gfmStrikethroughToMarkdown(),
		gfmTableToMarkdown(options),
		gfmTaskListItemToMarkdown()
	] };
}
var wwwPrefix = {
	tokenize: tokenizeWwwPrefix,
	partial: true
};
var domain = {
	tokenize: tokenizeDomain,
	partial: true
};
var path = {
	tokenize: tokenizePath,
	partial: true
};
var trail = {
	tokenize: tokenizeTrail,
	partial: true
};
var emailDomainDotTrail = {
	tokenize: tokenizeEmailDomainDotTrail,
	partial: true
};
var wwwAutolink = {
	name: "wwwAutolink",
	tokenize: tokenizeWwwAutolink,
	previous: previousWww
};
var protocolAutolink = {
	name: "protocolAutolink",
	tokenize: tokenizeProtocolAutolink,
	previous: previousProtocol
};
var emailAutolink = {
	name: "emailAutolink",
	tokenize: tokenizeEmailAutolink,
	previous: previousEmail
};
var text = {};
function gfmAutolinkLiteral() {
	return { text };
}
var code = 48;
while (code < 123) {
	text[code] = emailAutolink;
	code++;
	if (code === 58) code = 65;
	else if (code === 91) code = 97;
}
text[43] = emailAutolink;
text[45] = emailAutolink;
text[46] = emailAutolink;
text[95] = emailAutolink;
text[72] = [emailAutolink, protocolAutolink];
text[104] = [emailAutolink, protocolAutolink];
text[87] = [emailAutolink, wwwAutolink];
text[119] = [emailAutolink, wwwAutolink];
function tokenizeEmailAutolink(effects, ok$2, nok) {
	const self = this;
	let dot;
	let data;
	return start;
	function start(code$3) {
		if (!gfmAtext(code$3) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) return nok(code$3);
		effects.enter("literalAutolink");
		effects.enter("literalAutolinkEmail");
		return atext(code$3);
	}
	function atext(code$3) {
		if (gfmAtext(code$3)) {
			effects.consume(code$3);
			return atext;
		}
		if (code$3 === 64) {
			effects.consume(code$3);
			return emailDomain;
		}
		return nok(code$3);
	}
	function emailDomain(code$3) {
		if (code$3 === 46) return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code$3);
		if (code$3 === 45 || code$3 === 95 || asciiAlphanumeric(code$3)) {
			data = true;
			effects.consume(code$3);
			return emailDomain;
		}
		return emailDomainAfter(code$3);
	}
	function emailDomainDot(code$3) {
		effects.consume(code$3);
		dot = true;
		return emailDomain;
	}
	function emailDomainAfter(code$3) {
		if (data && dot && asciiAlpha(self.previous)) {
			effects.exit("literalAutolinkEmail");
			effects.exit("literalAutolink");
			return ok$2(code$3);
		}
		return nok(code$3);
	}
}
function tokenizeWwwAutolink(effects, ok$2, nok) {
	const self = this;
	return wwwStart;
	function wwwStart(code$3) {
		if (code$3 !== 87 && code$3 !== 119 || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) return nok(code$3);
		effects.enter("literalAutolink");
		effects.enter("literalAutolinkWww");
		return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code$3);
	}
	function wwwAfter(code$3) {
		effects.exit("literalAutolinkWww");
		effects.exit("literalAutolink");
		return ok$2(code$3);
	}
}
function tokenizeProtocolAutolink(effects, ok$2, nok) {
	const self = this;
	let buffer = "";
	let seen = false;
	return protocolStart;
	function protocolStart(code$3) {
		if ((code$3 === 72 || code$3 === 104) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
			effects.enter("literalAutolink");
			effects.enter("literalAutolinkHttp");
			buffer += String.fromCodePoint(code$3);
			effects.consume(code$3);
			return protocolPrefixInside;
		}
		return nok(code$3);
	}
	function protocolPrefixInside(code$3) {
		if (asciiAlpha(code$3) && buffer.length < 5) {
			buffer += String.fromCodePoint(code$3);
			effects.consume(code$3);
			return protocolPrefixInside;
		}
		if (code$3 === 58) {
			const protocol = buffer.toLowerCase();
			if (protocol === "http" || protocol === "https") {
				effects.consume(code$3);
				return protocolSlashesInside;
			}
		}
		return nok(code$3);
	}
	function protocolSlashesInside(code$3) {
		if (code$3 === 47) {
			effects.consume(code$3);
			if (seen) return afterProtocol;
			seen = true;
			return protocolSlashesInside;
		}
		return nok(code$3);
	}
	function afterProtocol(code$3) {
		return code$3 === null || asciiControl(code$3) || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3) || unicodePunctuation(code$3) ? nok(code$3) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code$3);
	}
	function protocolAfter(code$3) {
		effects.exit("literalAutolinkHttp");
		effects.exit("literalAutolink");
		return ok$2(code$3);
	}
}
function tokenizeWwwPrefix(effects, ok$2, nok) {
	let size = 0;
	return wwwPrefixInside;
	function wwwPrefixInside(code$3) {
		if ((code$3 === 87 || code$3 === 119) && size < 3) {
			size++;
			effects.consume(code$3);
			return wwwPrefixInside;
		}
		if (code$3 === 46 && size === 3) {
			effects.consume(code$3);
			return wwwPrefixAfter;
		}
		return nok(code$3);
	}
	function wwwPrefixAfter(code$3) {
		return code$3 === null ? nok(code$3) : ok$2(code$3);
	}
}
function tokenizeDomain(effects, ok$2, nok) {
	let underscoreInLastSegment;
	let underscoreInLastLastSegment;
	let seen;
	return domainInside;
	function domainInside(code$3) {
		if (code$3 === 46 || code$3 === 95) return effects.check(trail, domainAfter, domainAtPunctuation)(code$3);
		if (code$3 === null || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3) || code$3 !== 45 && unicodePunctuation(code$3)) return domainAfter(code$3);
		seen = true;
		effects.consume(code$3);
		return domainInside;
	}
	function domainAtPunctuation(code$3) {
		if (code$3 === 95) underscoreInLastSegment = true;
		else {
			underscoreInLastLastSegment = underscoreInLastSegment;
			underscoreInLastSegment = void 0;
		}
		effects.consume(code$3);
		return domainInside;
	}
	function domainAfter(code$3) {
		if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) return nok(code$3);
		return ok$2(code$3);
	}
}
function tokenizePath(effects, ok$2) {
	let sizeOpen = 0;
	let sizeClose = 0;
	return pathInside;
	function pathInside(code$3) {
		if (code$3 === 40) {
			sizeOpen++;
			effects.consume(code$3);
			return pathInside;
		}
		if (code$3 === 41 && sizeClose < sizeOpen) return pathAtPunctuation(code$3);
		if (code$3 === 33 || code$3 === 34 || code$3 === 38 || code$3 === 39 || code$3 === 41 || code$3 === 42 || code$3 === 44 || code$3 === 46 || code$3 === 58 || code$3 === 59 || code$3 === 60 || code$3 === 63 || code$3 === 93 || code$3 === 95 || code$3 === 126) return effects.check(trail, ok$2, pathAtPunctuation)(code$3);
		if (code$3 === null || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3)) return ok$2(code$3);
		effects.consume(code$3);
		return pathInside;
	}
	function pathAtPunctuation(code$3) {
		if (code$3 === 41) sizeClose++;
		effects.consume(code$3);
		return pathInside;
	}
}
function tokenizeTrail(effects, ok$2, nok) {
	return trail$1;
	function trail$1(code$3) {
		if (code$3 === 33 || code$3 === 34 || code$3 === 39 || code$3 === 41 || code$3 === 42 || code$3 === 44 || code$3 === 46 || code$3 === 58 || code$3 === 59 || code$3 === 63 || code$3 === 95 || code$3 === 126) {
			effects.consume(code$3);
			return trail$1;
		}
		if (code$3 === 38) {
			effects.consume(code$3);
			return trailCharacterReferenceStart;
		}
		if (code$3 === 93) {
			effects.consume(code$3);
			return trailBracketAfter;
		}
		if (code$3 === 60 || code$3 === null || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3)) return ok$2(code$3);
		return nok(code$3);
	}
	function trailBracketAfter(code$3) {
		if (code$3 === null || code$3 === 40 || code$3 === 91 || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3)) return ok$2(code$3);
		return trail$1(code$3);
	}
	function trailCharacterReferenceStart(code$3) {
		return asciiAlpha(code$3) ? trailCharacterReferenceInside(code$3) : nok(code$3);
	}
	function trailCharacterReferenceInside(code$3) {
		if (code$3 === 59) {
			effects.consume(code$3);
			return trail$1;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return trailCharacterReferenceInside;
		}
		return nok(code$3);
	}
}
function tokenizeEmailDomainDotTrail(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		effects.consume(code$3);
		return after;
	}
	function after(code$3) {
		return asciiAlphanumeric(code$3) ? nok(code$3) : ok$2(code$3);
	}
}
function previousWww(code$3) {
	return code$3 === null || code$3 === 40 || code$3 === 42 || code$3 === 95 || code$3 === 91 || code$3 === 93 || code$3 === 126 || markdownLineEndingOrSpace(code$3);
}
function previousProtocol(code$3) {
	return !asciiAlpha(code$3);
}
function previousEmail(code$3) {
	return !(code$3 === 47 || gfmAtext(code$3));
}
function gfmAtext(code$3) {
	return code$3 === 43 || code$3 === 45 || code$3 === 46 || code$3 === 95 || asciiAlphanumeric(code$3);
}
function previousUnbalanced(events) {
	let index$1 = events.length;
	let result = false;
	while (index$1--) {
		const token = events[index$1][1];
		if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
			result = true;
			break;
		}
		if (token._gfmAutolinkLiteralWalkedInto) {
			result = false;
			break;
		}
	}
	if (events.length > 0 && !result) events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
	return result;
}
var indent = {
	tokenize: tokenizeIndent,
	partial: true
};
function gfmFootnote() {
	return {
		document: { [91]: {
			name: "gfmFootnoteDefinition",
			tokenize: tokenizeDefinitionStart,
			continuation: { tokenize: tokenizeDefinitionContinuation },
			exit: gfmFootnoteDefinitionEnd
		} },
		text: {
			[91]: {
				name: "gfmFootnoteCall",
				tokenize: tokenizeGfmFootnoteCall
			},
			[93]: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: tokenizePotentialGfmFootnoteCall,
				resolveTo: resolveToPotentialGfmFootnoteCall
			}
		}
	};
}
function tokenizePotentialGfmFootnoteCall(effects, ok$2, nok) {
	const self = this;
	let index$1 = self.events.length;
	const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
	let labelStart;
	while (index$1--) {
		const token = self.events[index$1][1];
		if (token.type === "labelImage") {
			labelStart = token;
			break;
		}
		if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") break;
	}
	return start;
	function start(code$3) {
		if (!labelStart || !labelStart._balanced) return nok(code$3);
		const id = normalizeIdentifier(self.sliceSerialize({
			start: labelStart.end,
			end: self.now()
		}));
		if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) return nok(code$3);
		effects.enter("gfmFootnoteCallLabelMarker");
		effects.consume(code$3);
		effects.exit("gfmFootnoteCallLabelMarker");
		return ok$2(code$3);
	}
}
function resolveToPotentialGfmFootnoteCall(events, context) {
	let index$1 = events.length;
	while (index$1--) if (events[index$1][1].type === "labelImage" && events[index$1][0] === "enter") {
		events[index$1][1];
		break;
	}
	events[index$1 + 1][1].type = "data";
	events[index$1 + 3][1].type = "gfmFootnoteCallLabelMarker";
	const call = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, events[index$1 + 3][1].start),
		end: Object.assign({}, events[events.length - 1][1].end)
	};
	const marker = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, events[index$1 + 3][1].end),
		end: Object.assign({}, events[index$1 + 3][1].end)
	};
	marker.end.column++;
	marker.end.offset++;
	marker.end._bufferIndex++;
	const string$2 = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, marker.end),
		end: Object.assign({}, events[events.length - 1][1].start)
	};
	const chunk = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, string$2.start),
		end: Object.assign({}, string$2.end)
	};
	const replacement = [
		events[index$1 + 1],
		events[index$1 + 2],
		[
			"enter",
			call,
			context
		],
		events[index$1 + 3],
		events[index$1 + 4],
		[
			"enter",
			marker,
			context
		],
		[
			"exit",
			marker,
			context
		],
		[
			"enter",
			string$2,
			context
		],
		[
			"enter",
			chunk,
			context
		],
		[
			"exit",
			chunk,
			context
		],
		[
			"exit",
			string$2,
			context
		],
		events[events.length - 2],
		events[events.length - 1],
		[
			"exit",
			call,
			context
		]
	];
	events.splice(index$1, events.length - index$1 + 1, ...replacement);
	return events;
}
function tokenizeGfmFootnoteCall(effects, ok$2, nok) {
	const self = this;
	const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
	let size = 0;
	let data;
	return start;
	function start(code$3) {
		effects.enter("gfmFootnoteCall");
		effects.enter("gfmFootnoteCallLabelMarker");
		effects.consume(code$3);
		effects.exit("gfmFootnoteCallLabelMarker");
		return callStart;
	}
	function callStart(code$3) {
		if (code$3 !== 94) return nok(code$3);
		effects.enter("gfmFootnoteCallMarker");
		effects.consume(code$3);
		effects.exit("gfmFootnoteCallMarker");
		effects.enter("gfmFootnoteCallString");
		effects.enter("chunkString").contentType = "string";
		return callData;
	}
	function callData(code$3) {
		if (size > 999 || code$3 === 93 && !data || code$3 === null || code$3 === 91 || markdownLineEndingOrSpace(code$3)) return nok(code$3);
		if (code$3 === 93) {
			effects.exit("chunkString");
			const token = effects.exit("gfmFootnoteCallString");
			if (!defined.includes(normalizeIdentifier(self.sliceSerialize(token)))) return nok(code$3);
			effects.enter("gfmFootnoteCallLabelMarker");
			effects.consume(code$3);
			effects.exit("gfmFootnoteCallLabelMarker");
			effects.exit("gfmFootnoteCall");
			return ok$2;
		}
		if (!markdownLineEndingOrSpace(code$3)) data = true;
		size++;
		effects.consume(code$3);
		return code$3 === 92 ? callEscape : callData;
	}
	function callEscape(code$3) {
		if (code$3 === 91 || code$3 === 92 || code$3 === 93) {
			effects.consume(code$3);
			size++;
			return callData;
		}
		return callData(code$3);
	}
}
function tokenizeDefinitionStart(effects, ok$2, nok) {
	const self = this;
	const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
	let identifier;
	let size = 0;
	let data;
	return start;
	function start(code$3) {
		effects.enter("gfmFootnoteDefinition")._container = true;
		effects.enter("gfmFootnoteDefinitionLabel");
		effects.enter("gfmFootnoteDefinitionLabelMarker");
		effects.consume(code$3);
		effects.exit("gfmFootnoteDefinitionLabelMarker");
		return labelAtMarker;
	}
	function labelAtMarker(code$3) {
		if (code$3 === 94) {
			effects.enter("gfmFootnoteDefinitionMarker");
			effects.consume(code$3);
			effects.exit("gfmFootnoteDefinitionMarker");
			effects.enter("gfmFootnoteDefinitionLabelString");
			effects.enter("chunkString").contentType = "string";
			return labelInside;
		}
		return nok(code$3);
	}
	function labelInside(code$3) {
		if (size > 999 || code$3 === 93 && !data || code$3 === null || code$3 === 91 || markdownLineEndingOrSpace(code$3)) return nok(code$3);
		if (code$3 === 93) {
			effects.exit("chunkString");
			const token = effects.exit("gfmFootnoteDefinitionLabelString");
			identifier = normalizeIdentifier(self.sliceSerialize(token));
			effects.enter("gfmFootnoteDefinitionLabelMarker");
			effects.consume(code$3);
			effects.exit("gfmFootnoteDefinitionLabelMarker");
			effects.exit("gfmFootnoteDefinitionLabel");
			return labelAfter;
		}
		if (!markdownLineEndingOrSpace(code$3)) data = true;
		size++;
		effects.consume(code$3);
		return code$3 === 92 ? labelEscape : labelInside;
	}
	function labelEscape(code$3) {
		if (code$3 === 91 || code$3 === 92 || code$3 === 93) {
			effects.consume(code$3);
			size++;
			return labelInside;
		}
		return labelInside(code$3);
	}
	function labelAfter(code$3) {
		if (code$3 === 58) {
			effects.enter("definitionMarker");
			effects.consume(code$3);
			effects.exit("definitionMarker");
			if (!defined.includes(identifier)) defined.push(identifier);
			return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
		}
		return nok(code$3);
	}
	function whitespaceAfter(code$3) {
		return ok$2(code$3);
	}
}
function tokenizeDefinitionContinuation(effects, ok$2, nok) {
	return effects.check(blankLine, ok$2, effects.attempt(indent, ok$2, nok));
}
function gfmFootnoteDefinitionEnd(effects) {
	effects.exit("gfmFootnoteDefinition");
}
function tokenizeIndent(effects, ok$2, nok) {
	const self = this;
	return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 5);
	function afterPrefix(code$3) {
		const tail = self.events[self.events.length - 1];
		return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok$2(code$3) : nok(code$3);
	}
}
function gfmStrikethrough(options) {
	let single = (options || {}).singleTilde;
	const tokenizer = {
		name: "strikethrough",
		tokenize: tokenizeStrikethrough,
		resolveAll: resolveAllStrikethrough
	};
	if (single === null || single === void 0) single = true;
	return {
		text: { [126]: tokenizer },
		insideSpan: { null: [tokenizer] },
		attentionMarkers: { null: [126] }
	};
	function resolveAllStrikethrough(events, context) {
		let index$1 = -1;
		while (++index$1 < events.length) if (events[index$1][0] === "enter" && events[index$1][1].type === "strikethroughSequenceTemporary" && events[index$1][1]._close) {
			let open = index$1;
			while (open--) if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index$1][1].end.offset - events[index$1][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
				events[index$1][1].type = "strikethroughSequence";
				events[open][1].type = "strikethroughSequence";
				const strikethrough$1 = {
					type: "strikethrough",
					start: Object.assign({}, events[open][1].start),
					end: Object.assign({}, events[index$1][1].end)
				};
				const text$6 = {
					type: "strikethroughText",
					start: Object.assign({}, events[open][1].end),
					end: Object.assign({}, events[index$1][1].start)
				};
				const nextEvents = [
					[
						"enter",
						strikethrough$1,
						context
					],
					[
						"enter",
						events[open][1],
						context
					],
					[
						"exit",
						events[open][1],
						context
					],
					[
						"enter",
						text$6,
						context
					]
				];
				const insideSpan$1 = context.parser.constructs.insideSpan.null;
				if (insideSpan$1) splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan$1, events.slice(open + 1, index$1), context));
				splice(nextEvents, nextEvents.length, 0, [
					[
						"exit",
						text$6,
						context
					],
					[
						"enter",
						events[index$1][1],
						context
					],
					[
						"exit",
						events[index$1][1],
						context
					],
					[
						"exit",
						strikethrough$1,
						context
					]
				]);
				splice(events, open - 1, index$1 - open + 3, nextEvents);
				index$1 = open + nextEvents.length - 2;
				break;
			}
		}
		index$1 = -1;
		while (++index$1 < events.length) if (events[index$1][1].type === "strikethroughSequenceTemporary") events[index$1][1].type = "data";
		return events;
	}
	function tokenizeStrikethrough(effects, ok$2, nok) {
		const previous$2 = this.previous;
		const events = this.events;
		let size = 0;
		return start;
		function start(code$3) {
			if (previous$2 === 126 && events[events.length - 1][1].type !== "characterEscape") return nok(code$3);
			effects.enter("strikethroughSequenceTemporary");
			return more(code$3);
		}
		function more(code$3) {
			const before = classifyCharacter(previous$2);
			if (code$3 === 126) {
				if (size > 1) return nok(code$3);
				effects.consume(code$3);
				size++;
				return more;
			}
			if (size < 2 && !single) return nok(code$3);
			const token = effects.exit("strikethroughSequenceTemporary");
			const after = classifyCharacter(code$3);
			token._open = !after || after === 2 && Boolean(before);
			token._close = !before || before === 2 && Boolean(after);
			return ok$2(code$3);
		}
	}
}
var EditMap = class {
	constructor() {
		this.map = [];
	}
	add(index$1, remove, add) {
		addImplementation(this, index$1, remove, add);
	}
	consume(events) {
		this.map.sort(function(a, b) {
			return a[0] - b[0];
		});
		/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
		if (this.map.length === 0) return;
		let index$1 = this.map.length;
		const vecs = [];
		while (index$1 > 0) {
			index$1 -= 1;
			vecs.push(events.slice(this.map[index$1][0] + this.map[index$1][1]), this.map[index$1][2]);
			events.length = this.map[index$1][0];
		}
		vecs.push(events.slice());
		events.length = 0;
		let slice = vecs.pop();
		while (slice) {
			for (const element$1 of slice) events.push(element$1);
			slice = vecs.pop();
		}
		this.map.length = 0;
	}
};
function addImplementation(editMap, at, remove, add) {
	let index$1 = 0;
	/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
	if (remove === 0 && add.length === 0) return;
	while (index$1 < editMap.map.length) {
		if (editMap.map[index$1][0] === at) {
			editMap.map[index$1][1] += remove;
			editMap.map[index$1][2].push(...add);
			return;
		}
		index$1 += 1;
	}
	editMap.map.push([
		at,
		remove,
		add
	]);
}
function gfmTableAlign(events, index$1) {
	let inDelimiterRow = false;
	const align = [];
	while (index$1 < events.length) {
		const event = events[index$1];
		if (inDelimiterRow) {
			if (event[0] === "enter") {
				if (event[1].type === "tableContent") align.push(events[index$1 + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			} else if (event[1].type === "tableContent") {
				if (events[index$1 - 1][1].type === "tableDelimiterMarker") {
					const alignIndex = align.length - 1;
					align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
				}
			} else if (event[1].type === "tableDelimiterRow") break;
		} else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") inDelimiterRow = true;
		index$1 += 1;
	}
	return align;
}
function gfmTable() {
	return { flow: { null: {
		name: "table",
		tokenize: tokenizeTable,
		resolveAll: resolveTable
	} } };
}
function tokenizeTable(effects, ok$2, nok) {
	const self = this;
	let size = 0;
	let sizeB = 0;
	let seen;
	return start;
	function start(code$3) {
		let index$1 = self.events.length - 1;
		while (index$1 > -1) {
			const type = self.events[index$1][1].type;
			if (type === "lineEnding" || type === "linePrefix") index$1--;
			else break;
		}
		const tail = index$1 > -1 ? self.events[index$1][1].type : null;
		const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
		if (next === bodyRowStart && self.parser.lazy[self.now().line]) return nok(code$3);
		return next(code$3);
	}
	function headRowBefore(code$3) {
		effects.enter("tableHead");
		effects.enter("tableRow");
		return headRowStart(code$3);
	}
	function headRowStart(code$3) {
		if (code$3 === 124) return headRowBreak(code$3);
		seen = true;
		sizeB += 1;
		return headRowBreak(code$3);
	}
	function headRowBreak(code$3) {
		if (code$3 === null) return nok(code$3);
		if (markdownLineEnding(code$3)) {
			if (sizeB > 1) {
				sizeB = 0;
				self.interrupt = true;
				effects.exit("tableRow");
				effects.enter("lineEnding");
				effects.consume(code$3);
				effects.exit("lineEnding");
				return headDelimiterStart;
			}
			return nok(code$3);
		}
		if (markdownSpace(code$3)) return factorySpace(effects, headRowBreak, "whitespace")(code$3);
		sizeB += 1;
		if (seen) {
			seen = false;
			size += 1;
		}
		if (code$3 === 124) {
			effects.enter("tableCellDivider");
			effects.consume(code$3);
			effects.exit("tableCellDivider");
			seen = true;
			return headRowBreak;
		}
		effects.enter("data");
		return headRowData(code$3);
	}
	function headRowData(code$3) {
		if (code$3 === null || code$3 === 124 || markdownLineEndingOrSpace(code$3)) {
			effects.exit("data");
			return headRowBreak(code$3);
		}
		effects.consume(code$3);
		return code$3 === 92 ? headRowEscape : headRowData;
	}
	function headRowEscape(code$3) {
		if (code$3 === 92 || code$3 === 124) {
			effects.consume(code$3);
			return headRowData;
		}
		return headRowData(code$3);
	}
	function headDelimiterStart(code$3) {
		self.interrupt = false;
		if (self.parser.lazy[self.now().line]) return nok(code$3);
		effects.enter("tableDelimiterRow");
		seen = false;
		if (markdownSpace(code$3)) return factorySpace(effects, headDelimiterBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3);
		return headDelimiterBefore(code$3);
	}
	function headDelimiterBefore(code$3) {
		if (code$3 === 45 || code$3 === 58) return headDelimiterValueBefore(code$3);
		if (code$3 === 124) {
			seen = true;
			effects.enter("tableCellDivider");
			effects.consume(code$3);
			effects.exit("tableCellDivider");
			return headDelimiterCellBefore;
		}
		return headDelimiterNok(code$3);
	}
	function headDelimiterCellBefore(code$3) {
		if (markdownSpace(code$3)) return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code$3);
		return headDelimiterValueBefore(code$3);
	}
	function headDelimiterValueBefore(code$3) {
		if (code$3 === 58) {
			sizeB += 1;
			seen = true;
			effects.enter("tableDelimiterMarker");
			effects.consume(code$3);
			effects.exit("tableDelimiterMarker");
			return headDelimiterLeftAlignmentAfter;
		}
		if (code$3 === 45) {
			sizeB += 1;
			return headDelimiterLeftAlignmentAfter(code$3);
		}
		if (code$3 === null || markdownLineEnding(code$3)) return headDelimiterCellAfter(code$3);
		return headDelimiterNok(code$3);
	}
	function headDelimiterLeftAlignmentAfter(code$3) {
		if (code$3 === 45) {
			effects.enter("tableDelimiterFiller");
			return headDelimiterFiller(code$3);
		}
		return headDelimiterNok(code$3);
	}
	function headDelimiterFiller(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return headDelimiterFiller;
		}
		if (code$3 === 58) {
			seen = true;
			effects.exit("tableDelimiterFiller");
			effects.enter("tableDelimiterMarker");
			effects.consume(code$3);
			effects.exit("tableDelimiterMarker");
			return headDelimiterRightAlignmentAfter;
		}
		effects.exit("tableDelimiterFiller");
		return headDelimiterRightAlignmentAfter(code$3);
	}
	function headDelimiterRightAlignmentAfter(code$3) {
		if (markdownSpace(code$3)) return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code$3);
		return headDelimiterCellAfter(code$3);
	}
	function headDelimiterCellAfter(code$3) {
		if (code$3 === 124) return headDelimiterBefore(code$3);
		if (code$3 === null || markdownLineEnding(code$3)) {
			if (!seen || size !== sizeB) return headDelimiterNok(code$3);
			effects.exit("tableDelimiterRow");
			effects.exit("tableHead");
			return ok$2(code$3);
		}
		return headDelimiterNok(code$3);
	}
	function headDelimiterNok(code$3) {
		return nok(code$3);
	}
	function bodyRowStart(code$3) {
		effects.enter("tableRow");
		return bodyRowBreak(code$3);
	}
	function bodyRowBreak(code$3) {
		if (code$3 === 124) {
			effects.enter("tableCellDivider");
			effects.consume(code$3);
			effects.exit("tableCellDivider");
			return bodyRowBreak;
		}
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("tableRow");
			return ok$2(code$3);
		}
		if (markdownSpace(code$3)) return factorySpace(effects, bodyRowBreak, "whitespace")(code$3);
		effects.enter("data");
		return bodyRowData(code$3);
	}
	function bodyRowData(code$3) {
		if (code$3 === null || code$3 === 124 || markdownLineEndingOrSpace(code$3)) {
			effects.exit("data");
			return bodyRowBreak(code$3);
		}
		effects.consume(code$3);
		return code$3 === 92 ? bodyRowEscape : bodyRowData;
	}
	function bodyRowEscape(code$3) {
		if (code$3 === 92 || code$3 === 124) {
			effects.consume(code$3);
			return bodyRowData;
		}
		return bodyRowData(code$3);
	}
}
function resolveTable(events, context) {
	let index$1 = -1;
	let inFirstCellAwaitingPipe = true;
	let rowKind = 0;
	let lastCell = [
		0,
		0,
		0,
		0
	];
	let cell = [
		0,
		0,
		0,
		0
	];
	let afterHeadAwaitingFirstBodyRow = false;
	let lastTableEnd = 0;
	let currentTable;
	let currentBody;
	let currentCell;
	const map$2 = new EditMap();
	while (++index$1 < events.length) {
		const event = events[index$1];
		const token = event[1];
		if (event[0] === "enter") {
			if (token.type === "tableHead") {
				afterHeadAwaitingFirstBodyRow = false;
				if (lastTableEnd !== 0) {
					flushTableEnd(map$2, context, lastTableEnd, currentTable, currentBody);
					currentBody = void 0;
					lastTableEnd = 0;
				}
				currentTable = {
					type: "table",
					start: Object.assign({}, token.start),
					end: Object.assign({}, token.end)
				};
				map$2.add(index$1, 0, [[
					"enter",
					currentTable,
					context
				]]);
			} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
				inFirstCellAwaitingPipe = true;
				currentCell = void 0;
				lastCell = [
					0,
					0,
					0,
					0
				];
				cell = [
					0,
					index$1 + 1,
					0,
					0
				];
				if (afterHeadAwaitingFirstBodyRow) {
					afterHeadAwaitingFirstBodyRow = false;
					currentBody = {
						type: "tableBody",
						start: Object.assign({}, token.start),
						end: Object.assign({}, token.end)
					};
					map$2.add(index$1, 0, [[
						"enter",
						currentBody,
						context
					]]);
				}
				rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
			} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
				inFirstCellAwaitingPipe = false;
				if (cell[2] === 0) {
					if (lastCell[1] !== 0) {
						cell[0] = cell[1];
						currentCell = flushCell(map$2, context, lastCell, rowKind, void 0, currentCell);
						lastCell = [
							0,
							0,
							0,
							0
						];
					}
					cell[2] = index$1;
				}
			} else if (token.type === "tableCellDivider") if (inFirstCellAwaitingPipe) inFirstCellAwaitingPipe = false;
			else {
				if (lastCell[1] !== 0) {
					cell[0] = cell[1];
					currentCell = flushCell(map$2, context, lastCell, rowKind, void 0, currentCell);
				}
				lastCell = cell;
				cell = [
					lastCell[1],
					index$1,
					0,
					0
				];
			}
		} else if (token.type === "tableHead") {
			afterHeadAwaitingFirstBodyRow = true;
			lastTableEnd = index$1;
		} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
			lastTableEnd = index$1;
			if (lastCell[1] !== 0) {
				cell[0] = cell[1];
				currentCell = flushCell(map$2, context, lastCell, rowKind, index$1, currentCell);
			} else if (cell[1] !== 0) currentCell = flushCell(map$2, context, cell, rowKind, index$1, currentCell);
			rowKind = 0;
		} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) cell[3] = index$1;
	}
	if (lastTableEnd !== 0) flushTableEnd(map$2, context, lastTableEnd, currentTable, currentBody);
	map$2.consume(context.events);
	index$1 = -1;
	while (++index$1 < context.events.length) {
		const event = context.events[index$1];
		if (event[0] === "enter" && event[1].type === "table") event[1]._align = gfmTableAlign(context.events, index$1);
	}
	return events;
}
function flushCell(map$2, context, range, rowKind, rowEnd, previousCell) {
	const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
	const valueName = "tableContent";
	if (range[0] !== 0) {
		previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
		map$2.add(range[0], 0, [[
			"exit",
			previousCell,
			context
		]]);
	}
	const now = getPoint(context.events, range[1]);
	previousCell = {
		type: groupName,
		start: Object.assign({}, now),
		end: Object.assign({}, now)
	};
	map$2.add(range[1], 0, [[
		"enter",
		previousCell,
		context
	]]);
	if (range[2] !== 0) {
		const relatedStart = getPoint(context.events, range[2]);
		const relatedEnd = getPoint(context.events, range[3]);
		const valueToken = {
			type: valueName,
			start: Object.assign({}, relatedStart),
			end: Object.assign({}, relatedEnd)
		};
		map$2.add(range[2], 0, [[
			"enter",
			valueToken,
			context
		]]);
		if (rowKind !== 2) {
			const start = context.events[range[2]];
			const end = context.events[range[3]];
			start[1].end = Object.assign({}, end[1].end);
			start[1].type = "chunkText";
			start[1].contentType = "text";
			if (range[3] > range[2] + 1) {
				const a = range[2] + 1;
				const b = range[3] - range[2] - 1;
				map$2.add(a, b, []);
			}
		}
		map$2.add(range[3] + 1, 0, [[
			"exit",
			valueToken,
			context
		]]);
	}
	if (rowEnd !== void 0) {
		previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
		map$2.add(rowEnd, 0, [[
			"exit",
			previousCell,
			context
		]]);
		previousCell = void 0;
	}
	return previousCell;
}
function flushTableEnd(map$2, context, index$1, table$1, tableBody) {
	const exits = [];
	const related = getPoint(context.events, index$1);
	if (tableBody) {
		tableBody.end = Object.assign({}, related);
		exits.push([
			"exit",
			tableBody,
			context
		]);
	}
	table$1.end = Object.assign({}, related);
	exits.push([
		"exit",
		table$1,
		context
	]);
	map$2.add(index$1 + 1, 0, exits);
}
function getPoint(events, index$1) {
	const event = events[index$1];
	const side = event[0] === "enter" ? "start" : "end";
	return event[1][side];
}
var tasklistCheck = {
	name: "tasklistCheck",
	tokenize: tokenizeTasklistCheck
};
function gfmTaskListItem() {
	return { text: { [91]: tasklistCheck } };
}
function tokenizeTasklistCheck(effects, ok$2, nok) {
	const self = this;
	return open;
	function open(code$3) {
		if (self.previous !== null || !self._gfmTasklistFirstContentOfListItem) return nok(code$3);
		effects.enter("taskListCheck");
		effects.enter("taskListCheckMarker");
		effects.consume(code$3);
		effects.exit("taskListCheckMarker");
		return inside;
	}
	function inside(code$3) {
		if (markdownLineEndingOrSpace(code$3)) {
			effects.enter("taskListCheckValueUnchecked");
			effects.consume(code$3);
			effects.exit("taskListCheckValueUnchecked");
			return close;
		}
		if (code$3 === 88 || code$3 === 120) {
			effects.enter("taskListCheckValueChecked");
			effects.consume(code$3);
			effects.exit("taskListCheckValueChecked");
			return close;
		}
		return nok(code$3);
	}
	function close(code$3) {
		if (code$3 === 93) {
			effects.enter("taskListCheckMarker");
			effects.consume(code$3);
			effects.exit("taskListCheckMarker");
			effects.exit("taskListCheck");
			return after;
		}
		return nok(code$3);
	}
	function after(code$3) {
		if (markdownLineEnding(code$3)) return ok$2(code$3);
		if (markdownSpace(code$3)) return effects.check({ tokenize: spaceThenNonSpace }, ok$2, nok)(code$3);
		return nok(code$3);
	}
}
function spaceThenNonSpace(effects, ok$2, nok) {
	return factorySpace(effects, after, "whitespace");
	function after(code$3) {
		return code$3 === null ? nok(code$3) : ok$2(code$3);
	}
}
function gfm(options) {
	return combineExtensions([
		gfmAutolinkLiteral(),
		gfmFootnote(),
		gfmStrikethrough(options),
		gfmTable(),
		gfmTaskListItem()
	]);
}
var emptyOptions = {};
function remarkGfm(options) {
	const self = this;
	const settings = options || emptyOptions;
	const data = self.data();
	const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
	const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
	const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
	micromarkExtensions.push(gfm(settings));
	fromMarkdownExtensions.push(gfmFromMarkdown());
	toMarkdownExtensions.push(gfmToMarkdown(settings));
}
var syntaxHighlighterCache = {
	SyntaxHighlighter: null,
	oneDark: null,
	oneLight: null,
	loaded: false
};
var loadSyntaxHighlighter = async () => {
	if (!syntaxHighlighterCache.loaded) {
		const [{ default: PrismLight }, stylesModule] = await Promise.all([import("./prism-light-tF5JPiAR.mjs"), import("./prism-B5fj_84W.mjs")]);
		const [{ default: typescript }, { default: javascript }, { default: jsx$1 }, { default: tsx }, { default: css }, { default: json }, { default: bash }, { default: python }, { default: markdown }, { default: sql }, { default: yaml }, { default: rust }, { default: go }, { default: java }, { default: c }, { default: cpp }, { default: csharp }] = await Promise.all([
			import("./typescript-Shd0THVO.mjs"),
			import("./javascript-rZjQs5rV.mjs"),
			import("./jsx-D7G5YmEW.mjs"),
			import("./tsx-C0FymoXJ.mjs"),
			import("./css-CzI0ZA7a.mjs"),
			import("./json-BcPvrVmC.mjs"),
			import("./bash-CFPCLKT1.mjs"),
			import("./python-BTe3qhvp.mjs"),
			import("./markdown-DujkRa41.mjs"),
			import("./sql-B2n--cHT.mjs"),
			import("./yaml-CKMbHrKG.mjs"),
			import("./rust-CsgTz1Nf.mjs"),
			import("./go-CmGH1gNV.mjs"),
			import("./java-DkxfJDAy.mjs"),
			import("./c-DVmBJEuq.mjs"),
			import("./cpp-Bjs7YM14.mjs"),
			import("./csharp-DYujcNpg.mjs")
		]);
		PrismLight.registerLanguage("typescript", typescript);
		PrismLight.registerLanguage("ts", typescript);
		PrismLight.registerLanguage("javascript", javascript);
		PrismLight.registerLanguage("js", javascript);
		PrismLight.registerLanguage("jsx", jsx$1);
		PrismLight.registerLanguage("tsx", tsx);
		PrismLight.registerLanguage("css", css);
		PrismLight.registerLanguage("json", json);
		PrismLight.registerLanguage("bash", bash);
		PrismLight.registerLanguage("sh", bash);
		PrismLight.registerLanguage("shell", bash);
		PrismLight.registerLanguage("python", python);
		PrismLight.registerLanguage("py", python);
		PrismLight.registerLanguage("markdown", markdown);
		PrismLight.registerLanguage("md", markdown);
		PrismLight.registerLanguage("sql", sql);
		PrismLight.registerLanguage("yaml", yaml);
		PrismLight.registerLanguage("yml", yaml);
		PrismLight.registerLanguage("rust", rust);
		PrismLight.registerLanguage("rs", rust);
		PrismLight.registerLanguage("go", go);
		PrismLight.registerLanguage("golang", go);
		PrismLight.registerLanguage("java", java);
		PrismLight.registerLanguage("c", c);
		PrismLight.registerLanguage("cpp", cpp);
		PrismLight.registerLanguage("c++", cpp);
		PrismLight.registerLanguage("csharp", csharp);
		PrismLight.registerLanguage("cs", csharp);
		syntaxHighlighterCache.SyntaxHighlighter = PrismLight;
		syntaxHighlighterCache.oneDark = stylesModule.oneDark;
		syntaxHighlighterCache.oneLight = stylesModule.oneLight;
		syntaxHighlighterCache.loaded = true;
	}
	return syntaxHighlighterCache;
};
var CodeBlockFallback = ({ code: code$3 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "overflow-x-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		className: "p-4 font-mono text-sm",
		style: {
			minWidth: "100%",
			width: "fit-content"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code$3 })
	})
});
var CodeBlock = ({ language, code: code$3 }) => {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [highlighterLoaded, setHighlighterLoaded] = (0, import_react.useState)(!!syntaxHighlighterCache.SyntaxHighlighter);
	const [isDark, setIsDark] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const checkDarkMode = () => {
			setIsDark(document.documentElement.classList.contains("dark") || !document.documentElement.classList.contains("light") && window.matchMedia("(prefers-color-scheme: dark)").matches);
		};
		checkDarkMode();
		const observer = new MutationObserver(checkDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		return () => observer.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!highlighterLoaded) loadSyntaxHighlighter().then(() => setHighlighterLoaded(true));
	}, [highlighterLoaded]);
	const handleCopy = (0, import_react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(code$3);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} catch {}
	}, [code$3]);
	const { SyntaxHighlighter, oneDark, oneLight } = syntaxHighlighterCache;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative my-4 overflow-hidden rounded-lg border bg-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b bg-muted/50 px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium uppercase text-muted-foreground",
				children: language || "code"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100",
				onClick: handleCopy,
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-green-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: highlighterLoaded && SyntaxHighlighter && oneDark && oneLight && isDark !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyntaxHighlighter, {
				language: language || "text",
				style: isDark ? oneDark : oneLight,
				customStyle: {
					margin: 0,
					padding: "1rem",
					background: "transparent",
					fontSize: "0.875rem",
					minWidth: "100%",
					width: "fit-content"
				},
				codeTagProps: { style: { fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace" } },
				children: code$3
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlockFallback, { code: code$3 })
		})]
	});
};
var MarkdownRenderer = ({ content: content$2 }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
		remarkPlugins: [remarkGfm],
		components: {
			code({ className, children, ...props }) {
				const match = /language-(\w+)/.exec(className || "");
				if (!match) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
					...props,
					children
				});
				const language = match[1];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
					language,
					code: String(children).replace(/\n$/, "")
				});
			},
			pre({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
			},
			p({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 last:mb-0",
					children
				});
			},
			ul({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mb-4 list-disc pl-6 last:mb-0",
					children
				});
			},
			ol({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mb-4 list-decimal pl-6 last:mb-0",
					children
				});
			},
			li({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "mb-1",
					children
				});
			},
			h1({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-4 text-2xl font-bold",
					children
				});
			},
			h2({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-xl font-bold",
					children
				});
			},
			h3({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-lg font-semibold",
					children
				});
			},
			blockquote({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
					className: "mb-4 border-l-4 border-muted-foreground/30 pl-4 italic",
					children
				});
			},
			a({ href, children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "text-primary underline hover:no-underline",
					children
				});
			},
			hr() {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-4 border-border" });
			},
			table({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "my-4 overflow-x-auto rounded-lg border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
						className: "w-full border-collapse text-sm",
						children
					})
				});
			},
			thead({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/50",
					children
				});
			},
			tbody({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border",
					children
				});
			},
			tr({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "hover:bg-muted/30 transition-colors",
					children
				});
			},
			th({ children, style }) {
				const align = style?.textAlign;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: `px-4 py-2.5 font-semibold text-foreground ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`,
					children
				});
			},
			td({ children, style }) {
				const align = style?.textAlign;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: `px-4 py-2.5 text-muted-foreground ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`,
					children
				});
			},
			del({ children }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("del", {
					className: "text-muted-foreground line-through",
					children
				});
			},
			input({ checked, disabled, ...props }) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked,
					disabled,
					className: "mr-2 h-4 w-4 rounded border-border",
					...props
				});
			}
		},
		children: content$2
	});
};
var createMarkdownRenderer = () => {
	return (content$2, isStreaming = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownRenderer, {
		content: content$2,
		isStreaming
	});
};
var loadingAtom = /* @__PURE__ */ atom(false);
var UnlockSession = () => {
	const isLocked = useStore(isLockedAtom);
	const [password, setPassword] = (0, import_react.useState)("");
	const [isUnlocking, setIsUnlocking] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const handleFocus = () => {
			inputRef.current?.focus();
			inputRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		};
		window.addEventListener("focus-unlock-input", handleFocus);
		return () => window.removeEventListener("focus-unlock-input", handleFocus);
	}, []);
	if (!isLocked) return null;
	const handleUnlock = async (e) => {
		e?.preventDefault();
		if (!password) return;
		setIsUnlocking(true);
		try {
			const orKey = await getDecryptedOpenRouterApiKey(password);
			const gKey = await getDecryptedGoogleApiKey(password);
			if (orKey === null && gKey === null) {
				showError("No keys found to unlock.");
				setIsUnlocking(false);
				return;
			}
			setMasterPassword(password);
			showSuccess("Session unlocked.");
			setPassword("");
			if (orKey) fetchOpenRouterModels();
			if (gKey) fetchGoogleModels();
		} catch (_error) {
			showError("Incorrect password. Please try again.");
		} finally {
			setIsUnlocking(false);
		}
	};
	const handleReset = () => {
		confirmAction({
			title: "Reset Security Settings",
			message: "Are you sure you want to reset your master password? All stored API keys will be deleted.",
			confirmText: "Reset Everything",
			variant: "destructive",
			onConfirm: () => {
				resetSecuritySettings();
				showSuccess("Security settings reset.");
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center p-8 bg-card rounded-xl border shadow-sm max-w-md mx-auto my-8 animate-in fade-in zoom-in-95 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-6 w-6 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold mb-2",
				children: "Session Locked"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground text-center mb-6",
				children: "Enter your master password to unlock your API keys and resume chatting."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleUnlock,
				className: "w-full space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					ref: inputRef,
					type: "password",
					placeholder: "Master Password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					autoComplete: "current-password",
					autoFocus: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					className: "w-full gap-2",
					disabled: !password || isUnlocking,
					children: [isUnlocking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "h-4 w-4 animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "h-4 w-4" }), "Unlock Session"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: handleReset,
				className: "mt-6 text-xs text-destructive hover:underline flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }), "Forgot password? Reset security settings"]
			})
		]
	});
};
var abortController = null;
var ChatContainer = () => {
	const { activeChat, sidebarOpen: isSidebarOpen, toggleSidebar, setSidebar, setActiveChat: setActiveChat$1 } = useChatSearchParams();
	const activeConversationId = useStore(activeChatIdAtom);
	const isStreaming = useStore(isStreamingAtom);
	const isConversationsHydrated = useStore(isConversationsHydratedAtom);
	const lastUrlChatRef = (0, import_react.useRef)(void 0);
	const hasInitializedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!isConversationsHydrated) return;
		const currentUrlId = activeChat || void 0;
		const currentAtomId = activeConversationId || void 0;
		if (!hasInitializedRef.current) {
			if (currentUrlId && currentUrlId !== currentAtomId) switchConversation(currentUrlId, false);
			hasInitializedRef.current = true;
			lastUrlChatRef.current = currentUrlId;
			return;
		}
		if (currentUrlId !== lastUrlChatRef.current) {
			const wasJustInitialized = lastUrlChatRef.current === void 0;
			const transitionedFromIdToNone = lastUrlChatRef.current !== void 0 && lastUrlChatRef.current !== null && !currentUrlId;
			if (currentUrlId && currentUrlId !== currentAtomId) switchConversation(currentUrlId, false);
			else if (transitionedFromIdToNone && currentAtomId && !isStreaming && !wasJustInitialized) setActiveChat(null, false);
			lastUrlChatRef.current = currentUrlId;
		}
	}, [
		activeChat,
		activeConversationId,
		isStreaming,
		isConversationsHydrated
	]);
	(0, import_react.useEffect)(() => {
		return activeChatIdAtom.subscribe((id) => {
			const currentAtomId = id ?? void 0;
			const currentUrlId = activeChat || void 0;
			if (hasInitializedRef.current && isConversationsHydrated && !isSyncingFromUrlAtom.get() && currentAtomId !== currentUrlId) setActiveChat$1(currentAtomId);
		});
	}, [
		setActiveChat$1,
		isConversationsHydrated,
		activeChat
	]);
	const lastMessageRef = (0, import_react.useRef)("");
	const lastImagesRef = (0, import_react.useRef)(void 0);
	const currentTransactionIdRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isConversationsHydrated) getAIManager().catch(() => {});
	}, [isConversationsHydrated]);
	const streamResponse = (0, import_react.useCallback)(async (prompt, options = {}) => {
		const { addUserMessage = true, images } = options;
		clearError();
		lastMessageRef.current = prompt;
		lastImagesRef.current = images;
		let conversationId = activeChatIdAtom.get();
		if (!conversationId) conversationId = createConversation().id;
		isStreamingAtom.set(true);
		loadingAtom.set(true);
		clearStream();
		const transactionId = options.transactionId ?? crypto.randomUUID();
		currentTransactionIdRef.current = transactionId;
		const currentMessages = messagesAtom.get();
		const provider = providerTypeAtom.get();
		const model = provider === "open-router" ? openRouterModelAtom.get() : provider === "google" ? googleModelAtom.get() : provider === "ollama" ? ollamaModelAtom.get() : "prompt-api";
		if (addUserMessage) {
			addMessage("user", prompt, {
				images,
				transactionId
			});
			queueMicrotask(() => {
				if (conversationId) recordMessage(conversationId, prompt.length, provider, model);
				saveCurrentConversation();
				if (conversationId) triggerTitleGeneration(conversationId, false, prompt);
			});
		}
		try {
			abortController = new AbortController();
			const stream = await (await getAIManager()).prompt(prompt, {
				images,
				history: currentMessages
			});
			let textBuffer = "";
			let streamImages = [];
			let animationFrameId = null;
			const updateUI = () => {
				if (textBuffer) {
					appendToStream(textBuffer);
					textBuffer = "";
				}
				animationFrameId = null;
			};
			const scheduleUpdate = () => {
				if (animationFrameId === null && textBuffer) animationFrameId = requestAnimationFrame(updateUI);
			};
			for await (const part of stream) {
				if (abortController?.signal.aborted) break;
				if (!part) continue;
				try {
					if (part.type === "text") {
						textBuffer += part.content;
						scheduleUpdate();
					} else if (part.type === "image") streamImages.push({
						id: crypto.randomUUID(),
						data: part.data,
						mimeType: part.mimeType,
						name: part.name
					});
					else if (part.type === "tool-call") {
						if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
						updateUI();
						clearStream();
						const toolAnnouncement = `🔧 Using tool: ${part.toolName}`;
						if (!messagesAtom.get().find((m) => m.transactionId === transactionId && m.role === "system" && m.content === toolAnnouncement)) {
							addMessage("system", toolAnnouncement, { transactionId });
							recordToolCall(conversationId, part.toolName, provider, model);
						}
					} else if (part.type === "error") addMessage("system", `❌ Stream Error: ${part.error instanceof Error ? part.error.message : String(part.error)}`, { transactionId });
				} catch (chunkError) {}
			}
			if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
			updateUI();
			let finalContent = currentStreamAtom.get();
			if (finalContent.startsWith("{") && finalContent.endsWith("}") && (finalContent.includes("\"name\":") || finalContent.includes("\"tool\":"))) try {
				JSON.parse(finalContent);
				finalContent = "";
			} catch {}
			if (finalContent || streamImages.length > 0) {
				addMessage("assistant", finalContent, {
					transactionId,
					images: streamImages.length > 0 ? streamImages : void 0
				});
				queueMicrotask(() => {
					if (finalContent) {
						recordResponse(conversationId, finalContent.length, provider, model);
						recordTokenUsage(estimateTokens(prompt), estimateTokens(finalContent));
					}
					saveCurrentConversation();
				});
			}
		} catch (error) {
			if (!(error instanceof Error && error.name === "AbortError")) {
				const errorObj = error instanceof Error ? error : new Error(String(error));
				const retryMessage = lastMessageRef.current;
				const retryImages = lastImagesRef.current;
				const promptError = setError(errorObj, () => {
					streamResponse(retryMessage, {
						addUserMessage: false,
						images: retryImages,
						transactionId
					});
				});
				addMessage("system", `❌ ${promptError.title}: ${promptError.message}`, { transactionId });
				saveCurrentConversation();
			}
		} finally {
			isStreamingAtom.set(false);
			loadingAtom.set(false);
			clearStream();
			abortController = null;
			currentTransactionIdRef.current = null;
		}
	}, []);
	const handleSend = (0, import_react.useCallback)(async (message, images) => {
		await streamResponse(message, {
			addUserMessage: true,
			images
		});
	}, [streamResponse]);
	const handleStop = (0, import_react.useCallback)(() => {
		if (abortController) abortController.abort();
		isStreamingAtom.set(false);
		loadingAtom.set(false);
		const partialContent = currentStreamAtom.get();
		if (partialContent) {
			const transactionId = currentTransactionIdRef.current ?? void 0;
			addMessage("assistant", partialContent + " [stopped]", { transactionId });
		}
		clearStream();
		currentTransactionIdRef.current = null;
	}, []);
	const handleRegenerate = (0, import_react.useCallback)((prompt, transactionId) => {
		streamResponse(prompt, {
			addUserMessage: false,
			transactionId
		});
	}, [streamResponse]);
	const handleToggleSidebar = (0, import_react.useCallback)(() => {
		toggleSidebar();
	}, [toggleSidebar]);
	const handleCloseSidebar = (0, import_react.useCallback)(() => {
		setSidebar(false);
	}, [setSidebar]);
	(0, import_react.useEffect)(() => {
		if (!isSidebarOpen) {
			const mainContent = document.querySelector("main");
			if (mainContent && mainContent.contains(document.activeElement)) {} else if (document.activeElement && document.querySelector("#chat-sidebar")?.contains(document.activeElement)) document.querySelector("[aria-controls=\"chat-sidebar\"]")?.focus();
		}
	}, [isSidebarOpen]);
	const markdownRenderer = (0, import_react.useMemo)(() => createMarkdownRenderer(), []);
	const isLocked = useStore(isLockedAtom);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatContainerUI, {
		isSidebarOpen,
		onCloseSidebar: handleCloseSidebar,
		sidebar: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationSidebar, { onClose: handleCloseSidebar }),
		header: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatHeader, {
			onMenuClick: handleToggleSidebar,
			isSidebarOpen
		}),
		isLocked,
		unlockSession: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnlockSession, {}),
		messageList: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageList, {
			onRegenerate: handleRegenerate,
			renderContent: markdownRenderer
		}),
		errorBanner: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, {}),
		input: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatInput, {
			onSend: handleSend,
			onStop: handleStop
		})
	});
};
function IndexPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatContainer, {});
}
export { IndexPage as component };
