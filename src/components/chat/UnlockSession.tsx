import { useState, useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import {
	isLockedAtom,
	setMasterPassword,
	getDecryptedOpenRouterApiKey,
	getDecryptedGoogleApiKey,
	resetSecuritySettings,
} from "@/lib/stores/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Unlock, AlertTriangle } from "lucide-react";
import { showError, showSuccess } from "@/lib/stores/notifications";
import { confirmAction } from "@/lib/stores/confirmation";
import { fetchOpenRouterModels } from "@/lib/ai/open-router/models";
import { fetchGoogleModels } from "@/lib/ai/google/models";

export const UnlockSession = () => {
	const isLocked = useStore(isLockedAtom);
	const [password, setPassword] = useState("");
	const [isUnlocking, setIsUnlocking] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// Listen for focus-unlock-input event
	useEffect(() => {
		const handleFocus = () => {
			inputRef.current?.focus();
			inputRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		};
		window.addEventListener("focus-unlock-input", handleFocus);
		return () =>
			window.removeEventListener("focus-unlock-input", handleFocus);
	}, []);

	if (!isLocked) return null;

	const handleUnlock = async (e?: React.FormEvent) => {
		e?.preventDefault();
		if (!password) return;

		setIsUnlocking(true);
		try {
			// Try to decrypt one of the keys to verify password
			// We try both because the user might only have one set
			const orKey = await getDecryptedOpenRouterApiKey(password);
			const gKey = await getDecryptedGoogleApiKey(password);

			if (orKey === null && gKey === null) {
				// This shouldn't happen if isLocked is true, but safety first
				showError("No keys found to unlock.");
				setIsUnlocking(false);
				return;
			}

			setMasterPassword(password);
			showSuccess("Session unlocked.");
			setPassword("");

			// Trigger model fetching
			if (orKey) fetchOpenRouterModels();
			if (gKey) fetchGoogleModels();
			// oxlint-disable-next-line no-unused-vars
		} catch (_error) {
			showError("Incorrect password. Please try again.");
		} finally {
			setIsUnlocking(false);
		}
	};

	const handleReset = () => {
		confirmAction({
			title: "Reset Security Settings",
			message:
				"Are you sure you want to reset your master password? All stored API keys will be deleted.",
			confirmText: "Reset Everything",
			variant: "destructive",
			onConfirm: () => {
				resetSecuritySettings();
				showSuccess("Security settings reset.");
			},
		});
	};

	return (
		<div className="flex flex-col items-center justify-center p-8 bg-card rounded-xl border shadow-sm max-w-md mx-auto my-8 animate-in fade-in zoom-in-95 duration-300">
			<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
				<Lock className="h-6 w-6 text-primary" />
			</div>
			<h2 className="text-xl font-bold mb-2">Session Locked</h2>
			<p className="text-sm text-muted-foreground text-center mb-6">
				Enter your master password to unlock your API keys and resume
				chatting.
			</p>

			<form onSubmit={handleUnlock} className="w-full space-y-4">
				<Input
					ref={inputRef}
					type="password"
					placeholder="Master Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
					autoFocus
				/>
				<Button
					type="submit"
					className="w-full gap-2"
					disabled={!password || isUnlocking}
				>
					{isUnlocking ? (
						<Unlock className="h-4 w-4 animate-pulse" />
					) : (
						<Unlock className="h-4 w-4" />
					)}
					Unlock Session
				</Button>
			</form>

			<button
				type="button"
				onClick={handleReset}
				className="mt-6 text-xs text-destructive hover:underline flex items-center gap-1"
			>
				<AlertTriangle className="h-3 w-3" />
				Forgot password? Reset security settings
			</button>
		</div>
	);
};
