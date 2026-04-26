import React, { useEffect, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const OVERLAY = 'fixed inset-0 z-50 bg-black/80';
const CONTENT = 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95';
const HEADER = 'flex flex-col space-y-2 text-center sm:text-left';
const FOOTER = 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2';
const TITLE = 'font-mono text-lg font-semibold';
const DESCRIPTION = 'text-sm text-muted-foreground';
const ACTION = 'inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50 ' + focusRing;
const CANCEL = 'mt-2 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0 ' + focusRing;

const AlertDialogContext = createContext({ open: false, onOpenChange: null });

export const AlertDialog = ({ open = false, onOpenChange, children }) => (
	<AlertDialogContext.Provider value={{ open, onOpenChange }}>
		{children}
	</AlertDialogContext.Provider>
);

export const AlertDialogTrigger = ({ children, asChild = false, ...props }) => {
	const { onOpenChange } = useContext(AlertDialogContext);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: () => onOpenChange && onOpenChange(true), ...props });
	return <button type='button' onClick={() => onOpenChange && onOpenChange(true)} {...props}>{children}</button>;
};

export const AlertDialogPortal = ({ children }) => children;

export const AlertDialogOverlay = ({ className = '', ...props }) => {
	const { open } = useContext(AlertDialogContext);
	if (!open) return null;
	return <div className={cn(OVERLAY, className)} aria-hidden='true' {...props}/>;
};

export const AlertDialogContent = ({ children, className = '', ...props }) => {
	const { open } = useContext(AlertDialogContext);
	const ref = useRef(null);

	useEffect(() => {
		if (!open || !ref.current) return;
		const el = ref.current;
		document.body.style.overflow = 'hidden';
		const focusable = el.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])');
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		first?.focus();
		const trap = (e) => {
			if (e.key !== 'Tab') return;
			if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
			else { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
		};
		el.addEventListener('keydown', trap);
		return () => { el.removeEventListener('keydown', trap); document.body.style.overflow = ''; };
	}, [open]);

	if (!open || typeof document === 'undefined') return null;
	return createPortal(
		<>
			<div className={OVERLAY} aria-hidden='true'/>
			<div ref={ref} role='alertdialog' aria-modal='true' className={cn(CONTENT, className)} {...props}>
				{children}
			</div>
		</>,
		document.body
	);
};

export const AlertDialogHeader = ({ className = '', ...props }) => (
	<div className={cn(HEADER, className)} {...props}/>
);

export const AlertDialogFooter = ({ className = '', ...props }) => (
	<div className={cn(FOOTER, className)} {...props}/>
);

export const AlertDialogTitle = ({ className = '', children, ...props }) => (
	<h2 className={cn(TITLE, className)} {...props}>{children}</h2>
);

export const AlertDialogDescription = ({ className = '', ...props }) => (
	<p className={cn(DESCRIPTION, className)} {...props}/>
);

export const AlertDialogAction = ({ className = '', ...props }) => (
	<button type='button' className={cn(ACTION, className)} {...props}/>
);

export const AlertDialogCancel = ({ className = '', ...props }) => {
	const { onOpenChange } = useContext(AlertDialogContext);
	return (
		<button type='button' className={cn(CANCEL, className)} onClick={() => onOpenChange && onOpenChange(false)} {...props}/>
	);
};
