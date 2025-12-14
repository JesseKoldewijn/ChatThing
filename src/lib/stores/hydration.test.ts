import { describe, it, expect, beforeEach } from "vitest";
import { isHydratedAtom, markHydrated, canUseLocalStorage } from "./hydration";

describe("hydration store", () => {
	beforeEach(() => {
		// Reset hydration state
		isHydratedAtom.set(false);
	});

	describe("isHydratedAtom", () => {
		it("should default to false", () => {
			isHydratedAtom.set(false);
			expect(isHydratedAtom.get()).toBe(false);
		});

		it("should be settable to true", () => {
			isHydratedAtom.set(true);
			expect(isHydratedAtom.get()).toBe(true);
		});
	});

	describe("markHydrated", () => {
		it("should set hydrated to true", () => {
			expect(isHydratedAtom.get()).toBe(false);
			markHydrated();
			expect(isHydratedAtom.get()).toBe(true);
		});

		it("should be idempotent", () => {
			markHydrated();
			markHydrated();
			expect(isHydratedAtom.get()).toBe(true);
		});
	});

	describe("canUseLocalStorage", () => {
		it("should return false when not hydrated", () => {
			isHydratedAtom.set(false);
			expect(canUseLocalStorage()).toBe(false);
		});

		it("should return true when hydrated in browser", () => {
			markHydrated();
			expect(canUseLocalStorage()).toBe(true);
		});
	});

	describe("subscription", () => {
		it("should notify subscribers when hydrated", () => {
			let notified = false;

			const unsub = isHydratedAtom.subscribe((hydrated) => {
				if (hydrated) {
					notified = true;
				}
			});

			markHydrated();

			expect(notified).toBe(true);

			unsub();
		});
	});
});

