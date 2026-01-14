import { atom } from "nanostores";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
	id: string;
	type: NotificationType;
	message: string;
	duration?: number;
}

export const notificationsAtom = atom<Notification[]>([]);

/**
 * Add a new notification
 */
const addNotification = (
	type: NotificationType,
	message: string,
	duration = 3000,
) => {
	const id = crypto.randomUUID();
	const notification: Notification = { id, type, message, duration };

	notificationsAtom.set([...notificationsAtom.get(), notification]);

	if (duration > 0) {
		setTimeout(() => {
			removeNotification(id);
		}, duration);
	}

	return id;
};

/**
 * Remove a notification by ID
 */
export const removeNotification = (id: string) => {
	notificationsAtom.set(notificationsAtom.get().filter((n) => n.id !== id));
};

export const showSuccess = (message: string, duration?: number) =>
	addNotification("success", message, duration);
export const showError = (message: string, duration?: number) =>
	addNotification("error", message, duration);
export const showInfo = (message: string, duration?: number) =>
	addNotification("info", message, duration);
