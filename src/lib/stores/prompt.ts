import { atom } from "nanostores";

export interface PromptOptions {
	title: string;
	message: string;
	defaultValue?: string;
	placeholder?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: (value: string) => void;
	onCancel?: () => void;
}

export const promptAtom = atom<PromptOptions | null>(null);

export const promptAction = (options: PromptOptions) => {
	promptAtom.set(options);
};

export const clearPrompt = () => {
	promptAtom.set(null);
};
