"use client";

import { hydrateConversations } from "@/lib/stores/conversations";
import { hydrateSettings } from "@/lib/stores/settings";
import { hydrateUsage } from "@/lib/stores/usage";
import { useEffect } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		hydrateSettings();
		hydrateConversations();
		hydrateUsage();
	}, []);

	return children;
};

export default RootLayout;

