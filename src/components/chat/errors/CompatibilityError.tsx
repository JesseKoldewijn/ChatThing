import { useCallback, useState } from "react";
import { CompatibilityErrorUI } from "./CompatibilityError.ui";
import { useCompatibility } from "@/lib/ai/hooks";
import {
	requestModelDownload,
	detectBrowser,
	generateInstructions,
	type DownloadProgress,
} from "@/lib/ai/compat";
import { useChatSearchParams } from "@/lib/hooks/useNavigation";

export const CompatibilityError = () => {
	const { compatibility, isChecking, recheck } = useCompatibility();
	const { forceCompat } = useChatSearchParams();
	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadProgress, setDownloadProgress] =
		useState<DownloadProgress | null>(null);
	const [downloadError, setDownloadError] = useState<string | null>(null);

	const handleRequestDownload = useCallback(async () => {
		setIsDownloading(true);
		setDownloadProgress(null);
		setDownloadError(null);

		try {
			const result = await requestModelDownload((progress) => {
				setDownloadProgress(progress);
			});

			if (result.success) {
				// Recheck after download completes
				await recheck();
			} else if (result.error) {
				setDownloadError(result.error.message);
			}
		} catch (err) {
			setDownloadError(
				err instanceof Error ? err.message : "Download failed"
			);
		} finally {
			setIsDownloading(false);
		}
	}, [recheck]);

	// When forceCompat is enabled and we don't have real compatibility data (or it's compatible),
	// show a mock "unsupported" state for testing purposes
	if (forceCompat && (!compatibility || compatibility.isCompatible)) {
		const browserInfo = detectBrowser();
		const instructions = generateInstructions(browserInfo, "unsupported");
		return (
			<CompatibilityErrorUI
				availability="unsupported"
				browserInfo={browserInfo}
				errorMessage="[Testing Mode] Forced compatibility UI display"
				instructions={instructions}
				isChecking={isChecking}
				isDownloading={false}
				onRetry={recheck}
			/>
		);
	}

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
			downloadProgress={downloadProgress}
			downloadError={downloadError}
			onRetry={recheck}
			onRequestDownload={
				compatibility.availability === "downloadable" ||
				compatibility.availability === "downloading"
					? handleRequestDownload
					: undefined
			}
		/>
	);
};
