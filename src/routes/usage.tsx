import { UsagePage } from "@/components/usage/UsagePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/usage")({
	component: UsagePage,
});
