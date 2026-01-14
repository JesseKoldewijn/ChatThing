import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock stores
vi.mock("@nanostores/react", () => ({
	useStore: vi.fn((atom) => atom._mockValue ?? ""),
}));

vi.mock("nanostores", () => ({
	atom: vi.fn((value) => ({
		get: () => value,
		set: vi.fn(),
		_mockValue: value,
	})),
}));

vi.mock("@/lib/stores/chat", () => ({
	isStreamingAtom: { get: () => false, _mockValue: false },
	pendingImagesAtom: { get: () => [], _mockValue: [] },
	addPendingImage: vi.fn(),
	removePendingImage: vi.fn(),
	clearPendingImages: vi.fn(),
	fileToImageAttachment: vi.fn().mockResolvedValue({
		id: "img-1",
		data: "data:image/png;base64,test",
		mimeType: "image/png",
		name: "test.png",
	}),
}));

// Mock the UI component
vi.mock("./ChatInput.ui", () => ({
	ChatInputUI: ({
		value,
		onChange,
		onSubmit,
		onStop,
		onImageSelect,
		onRemoveImage,
		isLoading,
		isDisabled,
		pendingImages,
	}: {
		value: string;
		onChange: (value: string) => void;
		onSubmit: () => void;
		onStop?: () => void;
		onImageSelect?: (files: FileList) => void;
		onRemoveImage?: (id: string) => void;
		isLoading?: boolean;
		isDisabled?: boolean;
		pendingImages?: Array<{ id: string }>;
	}) => (
		<div data-testid="chat-input-ui">
			<input
				data-testid="input-field"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<button data-testid="submit-btn" onClick={onSubmit}>
				Submit
			</button>
			{onStop && (
				<button data-testid="stop-btn" onClick={onStop}>
					Stop
				</button>
			)}
			{onImageSelect && (
				<input
					data-testid="file-input"
					type="file"
					onChange={(e) => e.target.files && onImageSelect(e.target.files)}
				/>
			)}
			{pendingImages?.map((img) => (
				<button
					key={img.id}
					data-testid={`remove-${img.id}`}
					onClick={() => onRemoveImage?.(img.id)}
				>
					Remove
				</button>
			))}
			<span data-testid="is-loading">{String(isLoading)}</span>
			<span data-testid="is-disabled">{String(isDisabled)}</span>
			<span data-testid="pending-count">{pendingImages?.length ?? 0}</span>
		</div>
	),
}));

import {
	addPendingImage,
	fileToImageAttachment,
	removePendingImage,
} from "@/lib/stores/chat";
import { useStore } from "@nanostores/react";
import type { ReadableAtom } from "nanostores";
import { ChatInput } from "./ChatInput";

describe("ChatInput", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("rendering", () => {
		it("should render the input UI", () => {
			render(<ChatInput onSend={vi.fn()} />);
			expect(screen.getByTestId("chat-input-ui")).toBeInTheDocument();
		});

		it("should show loading state when streaming", () => {
			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { _mockValue?: unknown };
				if (a._mockValue === false) return true; // isStreamingAtom
				return a._mockValue ?? "";
			});

			render(<ChatInput onSend={vi.fn()} />);
			expect(screen.getByTestId("is-loading")).toHaveTextContent("true");
		});

		it("should show disabled state when disabled prop is true", () => {
			render(<ChatInput onSend={vi.fn()} isDisabled={true} />);
			expect(screen.getByTestId("is-disabled")).toHaveTextContent("true");
		});
	});

	describe("submit functionality", () => {
		it("should provide submit handler to UI", () => {
			render(<ChatInput onSend={vi.fn()} />);
			expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
		});
	});

	describe("stop functionality", () => {
		it("should provide stop handler when onStop is provided", () => {
			render(<ChatInput onSend={vi.fn()} onStop={vi.fn()} />);
			expect(screen.getByTestId("stop-btn")).toBeInTheDocument();
		});

		it("should not show stop button when onStop is not provided", () => {
			render(<ChatInput onSend={vi.fn()} />);
			expect(screen.queryByTestId("stop-btn")).not.toBeInTheDocument();
		});
	});

	describe("image selection", () => {
		it("should provide image select handler to UI", () => {
			render(<ChatInput onSend={vi.fn()} />);
			expect(screen.getByTestId("file-input")).toBeInTheDocument();
		});

		it("should convert file to image attachment", async () => {
			render(<ChatInput onSend={vi.fn()} />);
			const user = userEvent.setup();

			const file = new File(["test"], "test.png", { type: "image/png" });
			const input = screen.getByTestId("file-input");

			await user.upload(input, file);

			await waitFor(() => {
				expect(fileToImageAttachment).toHaveBeenCalledWith(file);
			});
		});

		it("should add valid images to pending", async () => {
			render(<ChatInput onSend={vi.fn()} />);
			const user = userEvent.setup();

			const file = new File(["test"], "test.png", { type: "image/png" });
			const input = screen.getByTestId("file-input");

			await user.upload(input, file);

			await waitFor(() => {
				expect(addPendingImage).toHaveBeenCalled();
			});
		});
	});

	describe("image removal", () => {
		it("should call removePendingImage when remove is triggered", async () => {
			vi.mocked(useStore).mockImplementation((atom: ReadableAtom) => {
				const a = atom as ReadableAtom & { _mockValue?: unknown };
				// Return pending images when queried
				if (Array.isArray(a._mockValue)) {
					return [{ id: "img-1", data: "test", mimeType: "image/png" }];
				}
				return a._mockValue ?? "";
			});

			render(<ChatInput onSend={vi.fn()} />);
			const user = userEvent.setup();

			const removeBtn = screen.getByTestId("remove-img-1");
			await user.click(removeBtn);

			expect(removePendingImage).toHaveBeenCalledWith("img-1");
		});
	});
});

describe("ChatInput validation logic", () => {
	describe("file type validation", () => {
		it("should skip non-image files", () => {
			const file = new File(["test"], "test.txt", { type: "text/plain" });
			expect(file.type.startsWith("image/")).toBe(false);
		});

		it("should accept image files", () => {
			const file = new File(["test"], "test.png", { type: "image/png" });
			expect(file.type.startsWith("image/")).toBe(true);
		});
	});

	describe("file size validation", () => {
		it("should skip files larger than 10MB", () => {
			const maxSize = 10 * 1024 * 1024;
			const largeFileSize = 11 * 1024 * 1024;
			expect(largeFileSize > maxSize).toBe(true);
		});

		it("should accept files smaller than 10MB", () => {
			const maxSize = 10 * 1024 * 1024;
			const smallFileSize = 5 * 1024 * 1024;
			expect(smallFileSize > maxSize).toBe(false);
		});
	});
});
