/// <reference types="vite/client" />

import { ConfirmationProvider } from "@/components/providers/ConfirmationProvider";
import { NotificationProvider } from "@/components/providers/NotificationProvider";
import { PromptProvider } from "@/components/providers/PromptProvider";
import {
	ThemeProvider,
	themeScript,
} from "@/components/providers/ThemeProvider";
import RootLayout from "@/layout/root";
import appCss from "@/styles/globals.css?url";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				title: "ChatThing",
			},
			{
				name: "description",
				content:
					"Chat with AI using your browser's built-in AI capabilities. No API keys, no cloud costs, no data leaving your device.",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0",
			},
			{
				name: "theme-color",
				content: "#0a0a0b",
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent",
			},
			{
				name: "apple-mobile-web-app-title",
				content: "ChatThing",
			},
			{
				name: "application-name",
				content: "ChatThing",
			},
			{
				name: "mobile-web-app-capable",
				content: "yes",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/icons/icon-96x96.svg",
			},
			{
				rel: "apple-touch-icon",
				href: "/icons/icon-192x192.svg",
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest",
			},
		],
	}),
	shellComponent: RootComponent,
	notFoundComponent: () => (
		<RootLayout>
			<h1>Not Found</h1>
		</RootLayout>
	),
	errorComponent: () => (
		<RootLayout>
			<h1>Error</h1>
		</RootLayout>
	),
});

function RootComponent() {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				<script
					dangerouslySetInnerHTML={{ __html: themeScript }}
					suppressHydrationWarning
				/>
			</head>
			<body suppressHydrationWarning>
				<ThemeProvider>
					<RootLayout>
						<Outlet />
					</RootLayout>
					<NotificationProvider />
					<ConfirmationProvider />
					<PromptProvider />
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
