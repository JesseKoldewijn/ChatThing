import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { clearPrompt, promptAtom } from "@/lib/stores/prompt";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

export const PromptProvider = () => {
	const prompt = useStore(promptAtom);
	const [value, setValue] = useState("");
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		if (prompt) {
			setValue(prompt.defaultValue || "");
		}
	}, [prompt]);

	if (!hasMounted) return null;

	const handleConfirm = (e?: React.FormEvent) => {
		e?.preventDefault();
		if (prompt) {
			prompt.onConfirm(value);
			clearPrompt();
		}
	};

	const handleCancel = () => {
		if (prompt?.onCancel) {
			prompt.onCancel();
		}
		clearPrompt();
	};

	return (
		<Dialog open={!!prompt} onOpenChange={(open) => !open && handleCancel()}>
			<DialogContent>
				<form onSubmit={handleConfirm} className="space-y-4">
					<DialogHeader>
						<DialogTitle>{prompt?.title}</DialogTitle>
						<DialogDescription>{prompt?.message}</DialogDescription>
					</DialogHeader>
					<Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder={prompt?.placeholder}
						autoFocus
					/>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button type="button" variant="ghost" onClick={handleCancel}>
							{prompt?.cancelText || "Cancel"}
						</Button>
						<Button type="submit">{prompt?.confirmText || "Confirm"}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
