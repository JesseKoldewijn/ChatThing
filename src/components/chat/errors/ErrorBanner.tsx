import { clearError, currentErrorAtom } from "@/lib/stores/errors";
import { useStore } from "@nanostores/react";
import { useCallback } from "react";
import { ErrorBannerUI } from "./ErrorBanner.ui";

export const ErrorBanner = () => {
	const error = useStore(currentErrorAtom);

	const handleRetry = useCallback(() => {
		if (error?.retryAction) {
			clearError();
			error.retryAction();
		}
	}, [error]);

	const handleDismiss = useCallback(() => {
		clearError();
	}, []);

	if (!error) {
		return null;
	}

	return (
		<ErrorBannerUI
			title={error.title}
			message={error.message}
			category={error.category}
			isRetryable={error.isRetryable}
			onRetry={error.retryAction ? handleRetry : undefined}
			onDismiss={handleDismiss}
		/>
	);
};
