import type { AsyncIterableStream, TextStreamPart, ToolSet } from "ai";
import { atom } from "nanostores";

// Nanostores atoms for state management
export const conversationAtom = atom<string[]>([]);
export const loadingAtom = atom<boolean>(false);
export const errorAtom = atom<Error | null>(null);
export const streamDataAtom = atom<AsyncIterableStream<
	TextStreamPart<ToolSet>
> | null>(null);
export const dataAtom = atom<TextStreamPart<ToolSet>[] | null>(null);
