import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
	it("should merge class names", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("should handle conditional classes", () => {
		const includeClass = true;
		const excludeClass = false;
		expect(cn("base", includeClass && "included", excludeClass && "excluded")).toBe(
			"base included"
		);
	});

	it("should handle undefined and null values", () => {
		expect(cn("base", undefined, null, "end")).toBe("base end");
	});

	it("should merge tailwind classes correctly", () => {
		// Later classes should override earlier ones
		expect(cn("px-2", "px-4")).toBe("px-4");
		expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
	});

	it("should handle object syntax", () => {
		expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
	});

	it("should handle array syntax", () => {
		expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
	});

	it("should handle empty inputs", () => {
		expect(cn()).toBe("");
		expect(cn("")).toBe("");
	});

	it("should deduplicate tailwind utility classes", () => {
		expect(cn("p-4 p-2")).toBe("p-2");
	});

	it("should handle complex tailwind merging", () => {
		expect(cn("bg-red-500 hover:bg-red-600", "bg-blue-500")).toBe(
			"hover:bg-red-600 bg-blue-500"
		);
	});

	it("should preserve non-conflicting classes", () => {
		expect(cn("flex items-center", "justify-between gap-2")).toBe(
			"flex items-center justify-between gap-2"
		);
	});
});

