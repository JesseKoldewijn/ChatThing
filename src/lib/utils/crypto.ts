/**
 * Simple AES-GCM encryption/decryption using the Web Crypto API.
 * Used for securing API keys in localStorage with a user-provided password.
 */

const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const PBKDF2_ITERATIONS = 100000;

/**
 * Derive a crypto key from a password and salt
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
	const encoder = new TextEncoder();
	const baseKey = await window.crypto.subtle.importKey(
		"raw",
		encoder.encode(password),
		"PBKDF2",
		false,
		["deriveKey"]
	);

	return window.crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: salt.slice(),
			iterations: PBKDF2_ITERATIONS,
			hash: "SHA-256",
		},
		baseKey,
		{ name: ALGORITHM, length: KEY_LENGTH },
		false,
		["encrypt", "decrypt"]
	);
}

/**
 * Encrypt a string using a password
 */
export async function encrypt(text: string, password: string): Promise<string> {
	const encoder = new TextEncoder();
	const salt = window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
	const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
	const key = await deriveKey(password, salt);

	const encrypted = await window.crypto.subtle.encrypt(
		{ name: ALGORITHM, iv },
		key,
		encoder.encode(text)
	);

	// Combine salt, iv, and encrypted data into a single base64 string
	const combined = new Uint8Array(SALT_LENGTH + IV_LENGTH + encrypted.byteLength);
	combined.set(salt, 0);
	combined.set(iv, SALT_LENGTH);
	combined.set(new Uint8Array(encrypted), SALT_LENGTH + IV_LENGTH);

	return btoa(String.fromCharCode(...combined));
}

/**
 * Decrypt a base64 string using a password
 */
export async function decrypt(encryptedBase64: string, password: string): Promise<string> {
	const decoder = new TextDecoder();
	const combined = new Uint8Array(
		atob(encryptedBase64)
			.split("")
			.map((c) => c.charCodeAt(0))
	);

	const salt = combined.slice(0, SALT_LENGTH);
	const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
	const data = combined.slice(SALT_LENGTH + IV_LENGTH);

	const key = await deriveKey(password, salt);

	try {
		const decrypted = await window.crypto.subtle.decrypt(
			{ name: ALGORITHM, iv },
			key,
			data
		);
		return decoder.decode(decrypted);
	} catch {
		throw new Error("Failed to decrypt. Incorrect password?");
	}
}
