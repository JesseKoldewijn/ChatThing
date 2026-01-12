import { describe, it, expect } from "vitest";
import { encrypt, decrypt } from "./crypto";

describe("crypto utilities", () => {
	const password = "test-password-123";
	const secretText = "This is a secret API key";

	it("should encrypt and decrypt a string correctly", async () => {
		const encrypted = await encrypt(secretText, password);
		expect(encrypted).toBeDefined();
		expect(encrypted).not.toBe(secretText);

		const decrypted = await decrypt(encrypted, password);
		expect(decrypted).toBe(secretText);
	});

	it("should throw error when decrypting with wrong password", async () => {
		const encrypted = await encrypt(secretText, password);
		
		await expect(decrypt(encrypted, "wrong-password")).rejects.toThrow("Failed to decrypt. Incorrect password?");
	});

	it("should generate different ciphertexts for the same input (due to random IV/salt)", async () => {
		const encrypted1 = await encrypt(secretText, password);
		const encrypted2 = await encrypt(secretText, password);
		
		expect(encrypted1).not.toBe(encrypted2);
		
		// Both should still decrypt to the same text
		expect(await decrypt(encrypted1, password)).toBe(secretText);
		expect(await decrypt(encrypted2, password)).toBe(secretText);
	});

	it("should handle empty strings", async () => {
		const empty = "";
		const encrypted = await encrypt(empty, password);
		const decrypted = await decrypt(encrypted, password);
		expect(decrypted).toBe(empty);
	});
});
