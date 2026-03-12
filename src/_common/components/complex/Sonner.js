import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const TOAST_LIMIT = 5;
const TOAST_DURATION = 4000;

const POSITIONS = {
	'top-left': 'top-0 left-0',
	'top-center': 'top-0 left-1/2 -translate-x-1/2',
	'top-right': 'top-0 right-0',
	'bottom-left': 'bottom-0 left-0',
	'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
	'bottom-right': 'bottom-0 right-0',
};

const TYPE_STYLES = {
	success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
	error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
	warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
	info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
	default: 'border-border bg-background text-foreground',
};

let listeners = [];
let memToasts = [];

const createToast = (message, options) => {
	const id = Date.now() + Math.random();
	const newToast = { id, message, type: 'default', duration: TOAST_DURATION, ...options };
	memToasts = [newToast, ...memToasts].slice(0, TOAST_LIMIT);
	listeners.forEach(l => l([...memToasts]));
	return id;
};

export const toast = (message, options) => createToast(message, options);
toast.success = (msg, opts) => createToast(msg, { type: 'success', ...opts });
toast.error = (msg, opts) => createToast(msg, { type: 'error', ...opts });
toast.warning = (msg, opts) => createToast(msg, { type: 'warning', ...opts });
toast.info = (msg, opts) => createToast(msg, { type: 'info', ...opts });
toast.dismiss = (id) => {
	memToasts = id ? memToasts.filter(t => t.id !== id) : [];
	listeners.forEach(l => l([...memToasts]));
};

const ToastItem = ({ t, onDismiss }) => {
	useEffect(() => {
		if (!t.duration) return;
		const timer = setTimeout(() => onDismiss(t.id), t.duration);
		return () => clearTimeout(timer);
	}, [t.id, t.duration, onDismiss]);

	return (
		<div
			role='status'
			aria-live='polite'
			aria-atomic='true'
			className={'relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all ' + (TYPE_STYLES[t.type] || TYPE_STYLES.default)}
		>
			<div className='flex flex-col gap-1'>
				{t.title && <div className='text-sm font-semibold'>{t.title}</div>}
				<div className='text-sm opacity-90'>{t.message || t.description}</div>
			</div>
			{t.action && (
				<button type='button' className='shrink-0 rounded-md text-sm font-medium underline-offset-4 hover:underline' onClick={t.action.onClick}>
					{t.action.label}
				</button>
			)}
			<button
				type='button'
				aria-label='Close notification'
				className='absolute right-2 top-2 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100'
				onClick={() => onDismiss(t.id)}
			>
				<span aria-hidden='true'>×</span>
			</button>
		</div>
	);
};

export const Toaster = ({ position = 'bottom-right', className = '' }) => {
	const [toasts, setToasts] = useState([...memToasts]);

	useEffect(() => {
		listeners.push(setToasts);
		return () => { listeners = listeners.filter(l => l !== setToasts); };
	}, []);

	const dismiss = useCallback((id) => toast.dismiss(id), []);

	if (typeof document === 'undefined') return null;
	return createPortal(
		<div
			role='region'
			aria-label='Notifications'
			aria-live='polite'
			className={'fixed z-[100] flex max-h-screen flex-col-reverse p-4 gap-2 ' + (POSITIONS[position] || POSITIONS['bottom-right']) + ' ' + className}
		>
			{toasts.map(t => (
				<ToastItem key={t.id} t={t} onDismiss={dismiss}/>
			))}
		</div>,
		document.body
	);
};
