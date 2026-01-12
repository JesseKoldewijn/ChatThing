import { s as __toESM } from "../_rolldown.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom.mjs";
import { S as require_jsx_runtime, c as lazyRouteComponent, i as HeadContent, l as createFileRoute, o as createRouter, r as Scripts, s as Outlet, u as createRootRoute } from "../_libs/@tanstack/react-router.mjs";
import { t as useStore } from "../_libs/@nanostores/react.mjs";
import { C as confirmationAtom, Ct as themeAtom, E as createLucideIcon, H as hydrateSettings, J as notificationsAtom, d as appearanceAtom, h as clearConfirmation, t as Button, tt as removeNotification, y as cn } from "./button-Dt876Ufa.mjs";
import { i as clearPrompt, n as Info, o as promptAtom, r as Input, t as CircleAlert } from "./input-Dp5uu2rT.mjs";
import { t as TriangleAlert, u as hydrateConversations } from "./conversations-DrNMxTDL.mjs";
import { c as hydrateUsage, t as X } from "./usage-xUoNdpW5.mjs";
import "../_libs/react-remove-scroll.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DVq_I_k4.mjs";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_react = /* @__PURE__ */ __toESM(require_react());
var isBrowser = typeof window !== "undefined";
var applyThemeToDOM = (appearance, theme) => {
	if (!isBrowser) return;
	const root = document.documentElement;
	const isDark = appearance === "dark" || appearance === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
	root.classList.remove("light", "dark", "vibrant");
	root.classList.add(isDark ? "dark" : "light");
	if (theme === "vibrant") root.classList.add("vibrant");
};
var ThemeProvider = ({ children }) => {
	const appearance = useStore(appearanceAtom);
	const theme = useStore(themeAtom);
	(0, import_react.useEffect)(() => {
		applyThemeToDOM(appearance, theme);
	}, [appearance, theme]);
	(0, import_react.useEffect)(() => {
		if (!isBrowser || appearance !== "system") return;
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => applyThemeToDOM("system", theme);
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [appearance, theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
};
var themeScript = `
(function() {
	try {
		var appearance = localStorage.getItem('appearance');
		var theme = localStorage.getItem('theme') || 'default';
		
		// Migration handling for old combined theme
		if (!appearance && theme === 'vibrant') {
			appearance = 'dark';
		}
		if (!appearance) appearance = 'system';
		
		var root = document.documentElement;
		var isDark = appearance === 'dark' || 
			(appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		
		root.classList.remove('light', 'dark', 'vibrant');
		root.classList.add(isDark ? 'dark' : 'light');
		if (theme === 'vibrant') root.classList.add('vibrant');
	} catch (e) {}
})();
`;
var icons = {
	success: createLucideIcon("circle-check", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]]),
	error: CircleAlert,
	info: Info,
	warning: TriangleAlert
};
var variants = {
	success: "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400",
	error: "bg-destructive/10 border-destructive/20 text-destructive",
	info: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
	warning: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
};
var NotificationProvider = () => {
	const notifications = useStore(notificationsAtom);
	const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHasMounted(true);
	}, []);
	if (!hasMounted) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none",
		children: notifications.map((notification) => {
			const Icon = icons[notification.type];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-right-full fade-in duration-300 pointer-events-auto", variants[notification.type]),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 text-sm font-medium",
						children: notification.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => removeNotification(notification.id),
						className: "shrink-0 hover:opacity-70 transition-opacity",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})
				]
			}, notification.id);
		})
	});
};
var ConfirmationProvider = () => {
	const confirmation = useStore(confirmationAtom);
	const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHasMounted(true);
	}, []);
	if (!hasMounted) return null;
	const handleConfirm = () => {
		if (confirmation) {
			confirmation.onConfirm();
			clearConfirmation();
		}
	};
	const handleCancel = () => {
		if (confirmation?.onCancel) confirmation.onCancel();
		clearConfirmation();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!confirmation,
		onOpenChange: (open) => !open && handleCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: confirmation?.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: confirmation?.message })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
			className: "gap-2 sm:gap-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: handleCancel,
				children: confirmation?.cancelText || "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: confirmation?.variant === "destructive" ? "destructive" : "default",
				onClick: handleConfirm,
				children: confirmation?.confirmText || "Confirm"
			})]
		})] })
	});
};
var PromptProvider = () => {
	const prompt = useStore(promptAtom);
	const [value, setValue] = (0, import_react.useState)("");
	const [hasMounted, setHasMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHasMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (prompt) setValue(prompt.defaultValue || "");
	}, [prompt]);
	if (!hasMounted) return null;
	const handleConfirm = (e) => {
		e?.preventDefault();
		if (prompt) {
			prompt.onConfirm(value);
			clearPrompt();
		}
	};
	const handleCancel = () => {
		if (prompt?.onCancel) prompt.onCancel();
		clearPrompt();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!prompt,
		onOpenChange: (open) => !open && handleCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleConfirm,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: prompt?.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: prompt?.message })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value,
					onChange: (e) => setValue(e.target.value),
					placeholder: prompt?.placeholder,
					autoFocus: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "gap-2 sm:gap-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: handleCancel,
						children: prompt?.cancelText || "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: prompt?.confirmText || "Confirm"
					})]
				})
			]
		}) })
	});
};
var RootLayout = ({ children }) => {
	(0, import_react.useEffect)(() => {
		hydrateSettings();
		hydrateConversations();
		hydrateUsage();
	}, []);
	return children;
};
var root_default = RootLayout;
var globals_default = "/assets/globals-D3Zu2XUM.css";
var Route = createRootRoute({
	head: () => ({
		meta: [
			{ title: "ChatThing" },
			{
				name: "description",
				content: "Chat with AI using your browser's built-in AI capabilities. No API keys, no cloud costs, no data leaving your device."
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0"
			},
			{
				name: "theme-color",
				content: "#0a0a0b"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "ChatThing"
			},
			{
				name: "application-name",
				content: "ChatThing"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: globals_default
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/icons/icon-96x96.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/icons/icon-192x192.svg"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			}
		]
	}),
	shellComponent: RootComponent,
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(root_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Not Found" }) }),
	errorComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(root_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Error" }) })
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			dangerouslySetInnerHTML: { __html: themeScript },
			suppressHydrationWarning: true
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			suppressHydrationWarning: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(root_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationProvider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmationProvider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptProvider, {})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
var $$splitComponentImporter$2 = () => import("./usage-DmgEnM0M.mjs");
var Route$1 = createFileRoute("/usage")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./settings-etjCo3b4.mjs");
var Route$2 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./routes-BCyTRFpJ.mjs");
var Route$3 = createFileRoute("/")({
	validateSearch: (search) => {
		const result = { chat: typeof search.chat === "string" ? search.chat : void 0 };
		if ("sidebar" in search) result.sidebar = search.sidebar === true || search.sidebar === "true";
		if ("archived" in search) result.archived = search.archived === true || search.archived === "true";
		if ("deleted" in search) result.deleted = search.deleted === true || search.deleted === "true";
		if ("forceCompat" in search) result.forceCompat = search.forceCompat === true || search.forceCompat === "true";
		return result;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var UsageRoute = Route$1.update({
	id: "/usage",
	path: "/usage",
	getParentRoute: () => Route
});
var SettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route
});
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route
	}),
	SettingsRoute,
	UsageRoute
};
var routeTree = Route._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
export { getRouter };
