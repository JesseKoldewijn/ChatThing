import { describe, it, expect, beforeEach, vi } from "vitest";
import { notificationsAtom, showSuccess, showError, showInfo, removeNotification } from "./notifications";
import { confirmationAtom, confirmAction, clearConfirmation } from "./confirmation";
import { promptAtom, promptAction, clearPrompt } from "./prompt";

describe("UI stores", () => {
	beforeEach(() => {
		notificationsAtom.set([]);
		confirmationAtom.set(null);
		promptAtom.set(null);
		vi.useFakeTimers();
	});

	describe("notifications store", () => {
		it("should add and remove notifications", () => {
			showSuccess("Success message");
			expect(notificationsAtom.get()).toHaveLength(1);
			expect(notificationsAtom.get()[0].type).toBe("success");
			expect(notificationsAtom.get()[0].message).toBe("Success message");

			const id = notificationsAtom.get()[0].id;
			removeNotification(id);
			expect(notificationsAtom.get()).toHaveLength(0);
		});

		it("should automatically remove notifications after duration", () => {
			showError("Error message", 1000);
			expect(notificationsAtom.get()).toHaveLength(1);

			vi.advanceTimersByTime(1001);
			expect(notificationsAtom.get()).toHaveLength(0);
		});

		it("should support info notifications", () => {
			showInfo("Info message");
			expect(notificationsAtom.get()[0].type).toBe("info");
		});
	});

	describe("confirmation store", () => {
		it("should set and clear confirmation options", () => {
			const onConfirm = vi.fn();
			confirmAction({
				title: "Confirm Delete",
				message: "Are you sure?",
				onConfirm,
			});

			const state = confirmationAtom.get();
			expect(state?.title).toBe("Confirm Delete");
			expect(state?.onConfirm).toBe(onConfirm);

			clearConfirmation();
			expect(confirmationAtom.get()).toBeNull();
		});
	});

	describe("prompt store", () => {
		it("should set and clear prompt options", () => {
			const onConfirm = vi.fn();
			promptAction({
				title: "Enter Name",
				message: "Please enter your name",
				onConfirm,
				defaultValue: "John",
			});

			const state = promptAtom.get();
			expect(state?.title).toBe("Enter Name");
			expect(state?.defaultValue).toBe("John");

			clearPrompt();
			expect(promptAtom.get()).toBeNull();
		});
	});
});
