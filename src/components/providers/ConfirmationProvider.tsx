import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { clearConfirmation, confirmationAtom } from "@/lib/stores/confirmation";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

export const ConfirmationProvider = () => {
	const confirmation = useStore(confirmationAtom);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
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
		if (confirmation?.onCancel) {
			confirmation.onCancel();
		}
		clearConfirmation();
	};

	return (
		<Dialog
			open={!!confirmation}
			onOpenChange={(open) => !open && handleCancel()}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{confirmation?.title}</DialogTitle>
					<DialogDescription>{confirmation?.message}</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-2 sm:gap-0">
					<Button variant="ghost" onClick={handleCancel}>
						{confirmation?.cancelText || "Cancel"}
					</Button>
					<Button
						variant={
							confirmation?.variant === "destructive"
								? "destructive"
								: "default"
						}
						onClick={handleConfirm}
					>
						{confirmation?.confirmText || "Confirm"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
