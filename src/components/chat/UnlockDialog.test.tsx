import {
	encryptedOpenRouterApiKeyAtom,
	masterPasswordAtom,
} from "@/lib/stores/settings";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UnlockDialog } from "./UnlockDialog";

vi.mock("@/lib/stores/settings", async (importOriginal) => {
	const actual = (await importOriginal()) as Record<string, unknown>;
	return {
		...actual,
		getDecryptedOpenRouterApiKey: vi.fn(),
		getDecryptedGoogleApiKey: vi.fn(),
		setMasterPassword: vi.fn(),
	};
});

vi.mock("@/lib/stores/notifications", () => ({
	showError: vi.fn(),
	showSuccess: vi.fn(),
}));

describe("UnlockDialog", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		encryptedOpenRouterApiKeyAtom.set("encrypted-key");
		masterPasswordAtom.set(null);
	});

	it("should not render when isOpen is false", () => {
		render(
			<UnlockDialog
				isOpen={false}
				onOpenChange={() => {}}
				onUnlockSuccess={() => {}}
			/>,
		);
		expect(screen.queryByText(/session locked/i)).not.toBeInTheDocument();
	});

	it("should render when isOpen is true", () => {
		render(
			<UnlockDialog
				isOpen={true}
				onOpenChange={() => {}}
				onUnlockSuccess={() => {}}
			/>,
		);
		expect(screen.getByText(/session locked/i)).toBeInTheDocument();
	});

	it("should call onUnlockSuccess when correct password is entered", async () => {
		const onUnlockSuccess = vi.fn();
		const { getDecryptedOpenRouterApiKey, setMasterPassword } =
			await import("@/lib/stores/settings");
		vi.mocked(getDecryptedOpenRouterApiKey).mockResolvedValue("decrypted-key");
		const user = userEvent.setup();

		render(
			<UnlockDialog
				isOpen={true}
				onOpenChange={() => {}}
				onUnlockSuccess={onUnlockSuccess}
			/>,
		);

		const input = screen.getByPlaceholderText(/master password/i);
		await user.type(input, "correct-password");

		const button = screen.getByRole("button", { name: /unlock session/i });
		await user.click(button);

		await waitFor(() => {
			expect(setMasterPassword).toHaveBeenCalledWith("correct-password");
			expect(onUnlockSuccess).toHaveBeenCalled();
		});
	});

	it("should show error when incorrect password is entered", async () => {
		const { getDecryptedOpenRouterApiKey } =
			await import("@/lib/stores/settings");
		vi.mocked(getDecryptedOpenRouterApiKey).mockRejectedValue(
			new Error("wrong password"),
		);
		const { showError } = await import("@/lib/stores/notifications");
		const user = userEvent.setup();

		render(
			<UnlockDialog
				isOpen={true}
				onOpenChange={() => {}}
				onUnlockSuccess={() => {}}
			/>,
		);

		const input = screen.getByPlaceholderText(/master password/i);
		await user.type(input, "wrong-password");

		const button = screen.getByRole("button", { name: /unlock session/i });
		await user.click(button);

		await waitFor(() => {
			expect(showError).toHaveBeenCalledWith(
				expect.stringContaining("Incorrect password"),
			);
		});
	});

	it("should call onOpenChange when close button is clicked", async () => {
		const onOpenChange = vi.fn();
		const user = userEvent.setup();

		render(
			<UnlockDialog
				isOpen={true}
				onOpenChange={onOpenChange}
				onUnlockSuccess={() => {}}
			/>,
		);

		const closeButton = screen.getByRole("button", { name: /close/i });
		await user.click(closeButton);

		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it("should handle Google provider unlock", async () => {
		const onUnlockSuccess = vi.fn();
		const {
			getDecryptedGoogleApiKey,
			getDecryptedOpenRouterApiKey,
			setMasterPassword,
			providerTypeAtom,
		} = await import("@/lib/stores/settings");

		providerTypeAtom.set("google");
		// Ensure first attempt returns null so it proceeds to Google key
		vi.mocked(getDecryptedOpenRouterApiKey).mockResolvedValue(null);
		vi.mocked(getDecryptedGoogleApiKey).mockResolvedValue("google-key");
		const user = userEvent.setup();

		render(
			<UnlockDialog
				isOpen={true}
				onOpenChange={() => {}}
				onUnlockSuccess={onUnlockSuccess}
			/>,
		);

		const input = screen.getByPlaceholderText(/master password/i);
		await user.type(input, "pwd");

		const button = screen.getByRole("button", { name: /unlock session/i });
		await user.click(button);

		await waitFor(() => {
			expect(getDecryptedGoogleApiKey).toHaveBeenCalledWith("pwd");
			expect(setMasterPassword).toHaveBeenCalledWith("pwd");
			expect(onUnlockSuccess).toHaveBeenCalled();
		});
	});
});
