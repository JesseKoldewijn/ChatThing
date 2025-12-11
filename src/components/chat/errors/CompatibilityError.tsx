import { useCallback, useState } from "react";
import { CompatibilityErrorUI } from "./CompatibilityError.ui";
import { useCompatibility } from "@/lib/ai/hooks";
import { requestModelDownload } from "@/lib/ai/compat";

export const CompatibilityError = () => {
	const { compatibility, isChecking, recheck } = useCompatibility();
	const [isDownloading, setIsDownloading] = useState(false);

	const handleRequestDownload = useCallback(async () => {
		setIsDownloading(true);
		try {
			const result = await requestModelDownload();
			if (result.success) {
				// Recheck after attempting download
				await recheck();
			}
		} finally {
			setIsDownloading(false);
		}
	}, [recheck]);

	if (!compatibility) {
		return null;
	}

	return (
		<CompatibilityErrorUI
			availability={compatibility.availability}
			browserInfo={compatibility.browserInfo}
			errorMessage={compatibility.error?.message ?? "Unknown error"}
			instructions={compatibility.instructions}
			isChecking={isChecking}
			isDownloading={isDownloading}
			onRetry={recheck}
			onRequestDownload={
				compatibility.availability === "downloadable"
					? handleRequestDownload
					: undefined
			}
		/>
	);
};

