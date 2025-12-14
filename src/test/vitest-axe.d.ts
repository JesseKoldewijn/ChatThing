import "vitest";
import type { AxeMatchers } from "vitest-axe/matchers";

declare module "vitest" {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Assertion<T> extends AxeMatchers {
		toHaveNoViolations(): void;
	}
	interface AsymmetricMatchersContaining extends AxeMatchers {
		toHaveNoViolations(): void;
	}
}

