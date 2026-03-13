import { useEffect, useSyncExternalStore } from 'react';

const HMR_PATTERNS = ['removeChild', 'Cannot read properties of null', 'hotModuleReplacement'];
const isHmrError = (msg) => HMR_PATTERNS.some(p => msg && msg.includes(p));

let errorState = { hasError: false, error: null, errorInfo: null };
const listeners = new Set();
const notify = () => listeners.forEach(l => l());
const subscribe = (cb) => { listeners.add(cb); return () => listeners.delete(cb); };
const getSnapshot = () => errorState;
const getServerSnapshot = () => ({ hasError: false, error: null, errorInfo: null });

const setErrorState = (err, info) => {
	errorState = { hasError: true, error: err, errorInfo: info };
	notify();
};

const resetError = () => {
	errorState = { hasError: false, error: null, errorInfo: null };
	notify();
};

if (typeof window !== 'undefined') {
	window.addEventListener('error', (event) => {
		if (event.error && isHmrError(event.error.message)) {
			if (process.env.NODE_ENV === 'development') console.warn('HMR-related error (ignored):', event.error.message); // eslint-disable-line no-console
			return;
		}
		setErrorState(event.error, { componentStack: event.error?.stack || 'No stack trace available' });
		console.error('ErrorBoundary caught an error:', event.error); // eslint-disable-line no-console
	});
	window.addEventListener('unhandledrejection', (event) => {
		if (event.reason && isHmrError(event.reason.message)) {
			if (process.env.NODE_ENV === 'development') console.warn('HMR-related promise rejection (ignored):', event.reason.message); // eslint-disable-line no-console
			return;
		}
		setErrorState(event.reason, { componentStack: 'Unhandled Promise Rejection' });
		console.error('ErrorBoundary caught an unhandled promise rejection:', event.reason); // eslint-disable-line no-console
	});
}

export const ErrorBoundary = ({ children }) => {
	const { hasError, error, errorInfo } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	useEffect(() => {
		if (hasError) resetError();
	}, [children]); // eslint-disable-line react-hooks/exhaustive-deps

	if (hasError) return (
		<div className='min-h-screen flex items-center justify-center bg-background p-4'>
			<div className='max-w-md w-full bg-card rounded-lg shadow-lg p-6 text-center'>
				<div className='w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center'>
					<span className='text-2xl' aria-hidden='true'>&#9888;</span>
				</div>
				<h2 className='text-xl text-foreground mb-2'>Something went wrong</h2>
				<p className='text-current/66 mb-4'>We&apos;re sorry, but something unexpected happened. Please try refreshing the page.</p>
				<button onClick={() => typeof window !== 'undefined' && window.location.reload()} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200'>Refresh Page</button>
				{process.env.NODE_ENV === 'development' && error && (
					<details className='mt-4 text-left'>
						<summary className='cursor-pointer text-sm text-current/66'>Error Details (Development)</summary>
						<pre className='mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto'>{error && error.toString()}{errorInfo?.componentStack}</pre>
					</details>
				)}
			</div>
		</div>
	);

	return children;
};

export default ErrorBoundary;
