import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetchGoogleModels } from "@/lib/ai/google/models";
import { fetchOpenRouterModels } from "@/lib/ai/open-router/models";
import { confirmAction } from "@/lib/stores/confirmation";
import { showError, showSuccess } from "@/lib/stores/notifications";
import {
	getDecryptedGoogleApiKey,
	getDecryptedOpenRouterApiKey,
	resetSecuritySettings,
	setMasterPassword,
} from "@/lib/stores/settings";
import { AlertTriangle, Lock, Unlock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface UnlockDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onUnlockSuccess: () => void;
}

export const UnlockDialog = ({
	isOpen,
	onOpenChange,
	onUnlockSuccess,
}: UnlockDialogProps) => {
	const [password, setPassword] = useState("");
	const [isUnlocking, setIsUnlocking] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen) {
			// Small delay to ensure dialog is rendered
			setTimeout(() => inputRef.current?.focus(), 100);
		} else {
			setPassword("");
		}
	}, [isOpen]);

	const handleUnlock = async (e?: React.FormEvent) => {
		e?.preventDefault();
		if (!password) return;

		setIsUnlocking(true);
		try {
			// Try to decrypt one of the keys to verify password
			const orKey = await getDecryptedOpenRouterApiKey(password);
			const gKey = await getDecryptedGoogleApiKey(password);

			if (orKey === null && gKey === null) {
				// Safety check: if no keys found, we can't verify password
				// but we'll allow setting it anyway if it's the first time
				// (this case is handled by stores/settings logic usually)
				setMasterPassword(password);
				onUnlockSuccess();
				onOpenChange(false);
				return;
			}

			setMasterPassword(password);
			showSuccess("Session unlocked.");

			// Trigger model fetching
			if (orKey) fetchOpenRouterModels();
			if (gKey) fetchGoogleModels();

			onUnlockSuccess();
			onOpenChange(false);
		} catch {
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
				onOpenChange(false);
			},
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
						<Lock className="text-primary h-6 w-6" />
					</div>
					<DialogTitle className="text-center text-xl font-bold">
						Session Locked
					</DialogTitle>
					<DialogDescription className="text-muted-foreground text-center text-sm">
						Enter your master password to unlock your API keys and send your
						message.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleUnlock} className="space-y-4 py-4">
					{/* Hidden username field for password managers accessibility */}
					<input
						type="text"
						name="username"
						value=""
						readOnly
						autoComplete="off"
						className="sr-only"
						aria-hidden="true"
						tabIndex={-1}
					/>
					<Input
						ref={inputRef}
						type="password"
						placeholder="Master Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="current-password"
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

				<div className="flex justify-center border-t pt-4">
					<button
						type="button"
						onClick={handleReset}
						className="text-destructive flex items-center gap-1 text-xs hover:underline"
					>
						<AlertTriangle className="h-3 w-3" />
						Forgot password? Reset security settings
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
