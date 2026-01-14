"use client";

import {
	hydrateConversations,
	setupConversationsPersistence,
} from "@/lib/stores/conversations";
import {
	hydrateSettings,
	setupSettingsPersistence,
} from "@/lib/stores/settings";
import { hydrateUsage, setupUsagePersistence } from "@/lib/stores/usage";
import { useEffect } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		// Hydrate stores from localStorage
		hydrateSettings();
		hydrateConversations();
		hydrateUsage();

		// Set up persistence listeners and handle side effects
		const cleanupSettings = setupSettingsPersistence();
		const cleanupConversations = setupConversationsPersistence();
		const cleanupUsage = setupUsagePersistence();

		return () => {
			cleanupSettings();
			cleanupConversations();
			cleanupUsage();
		};
	}, []);

	return children;
};

export default RootLayout;
