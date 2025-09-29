import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
	const [hasError, setHasError] = useState(false);
	const [error, setError] = useState(null);
	const [errorInfo, setErrorInfo] = useState(null);

	useEffect(() => {
		// Only run on client side
		if (typeof window === "undefined") return;

		// Global error handler for unhandled errors
		const handleError = (event) => {
			// Ignore HMR-related errors that are common in development
			if (event.error && event.error.message && (event.error.message.includes("removeChild") || event.error.message.includes("Cannot read properties of null") || event.error.message.includes("hotModuleReplacement"))) {
				// Log but don't show error UI for HMR issues
				if (process.env.NODE_ENV === "development") {
					console.warn("HMR-related error (ignored):", event.error.message);
				}
				return;
			}

			setHasError(true);
			setError(event.error);
			setErrorInfo({
				componentStack: event.error?.stack || "No stack trace available",
			});

			// Log error to console in development
			if (process.env.NODE_ENV === "development") {
				console.error("ErrorBoundary caught an error:", event.error);
			}

			// Log error to analytics in production
			if (process.env.NODE_ENV === "production") {
				// You can send error to your analytics service here
				console.error("ErrorBoundary caught an error:", event.error);
			}
		};

		// Global unhandled promise rejection handler
		const handleUnhandledRejection = (event) => {
			// Ignore HMR-related promise rejections
			if (event.reason && event.reason.message && (event.reason.message.includes("removeChild") || event.reason.message.includes("Cannot read properties of null") || event.reason.message.includes("hotModuleReplacement"))) {
				// Log but don't show error UI for HMR issues
				if (process.env.NODE_ENV === "development") {
					console.warn("HMR-related promise rejection (ignored):", event.reason.message);
				}
				return;
			}

			setHasError(true);
			setError(event.reason);
			setErrorInfo({
				componentStack: "Unhandled Promise Rejection",
			});

			// Log error to console in development
			if (process.env.NODE_ENV === "development") {
				console.error("ErrorBoundary caught an unhandled promise rejection:", event.reason);
			}
		};

		// Add event listeners
		window.addEventListener("error", handleError);
		window.addEventListener("unhandledrejection", handleUnhandledRejection);

		// Cleanup
		return () => {
			window.removeEventListener("error", handleError);
			window.removeEventListener("unhandledrejection", handleUnhandledRejection);
		};
	}, []);

	// Reset error state when children change
	useEffect(() => {
		setHasError(false);
		setError(null);
		setErrorInfo(null);
	}, [children]);

	if (hasError) {
		// Fallback UI
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
				<div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
					<div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
						<span className="text-2xl">⚠️</span>
					</div>
					<h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Something went wrong</h2>
					<p className="text-slate-600 dark:text-slate-300 mb-4">We&apos;re sorry, but something unexpected happened. Please try refreshing the page.</p>
					<button onClick={() => typeof window !== "undefined" && window.location.reload()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
						Refresh Page
					</button>
					{process.env.NODE_ENV === "development" && error && (
						<details className="mt-4 text-left">
							<summary className="cursor-pointer text-sm text-slate-600 dark:text-slate-300">Error Details (Development)</summary>
							<pre className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto">
								{error && error.toString()}
								{errorInfo?.componentStack}
							</pre>
						</details>
					)}
				</div>
			</div>
		);
	}

	return children;
};

export default ErrorBoundary;
