import { atom } from "nanostores";

export interface Confirmation {
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel?: () => void;
	confirmText?: string;
	cancelText?: string;
	variant?: "default" | "destructive";
}

export const confirmationAtom = atom<Confirmation | null>(null);

export const confirmAction = (options: Confirmation) => {
	confirmationAtom.set(options);
};

export const clearConfirmation = () => {
	confirmationAtom.set(null);
};
