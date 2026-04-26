import React, { useEffect, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const OVERLAY = 'fixed inset-0 z-50 bg-black/80';
const CONTENT = 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background text-foreground border-background p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]';
const HEADER = 'flex flex-col space-y-1.5 text-center sm:text-left';
const FOOTER = 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2';
const TITLE = 'font-mono text-lg font-semibold leading-none tracking-tight text-current';
const DESCRIPTION = 'text-sm text-muted-foreground';
const CLOSE = 'absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 ' + focusRing;

const DialogContext = createContext({ open: false, onOpenChange: null });

export const Dialog = ({ open = false, onOpenChange, children }) => (
	<DialogContext.Provider value={{ open, onOpenChange }}>
		{children}
	</DialogContext.Provider>
);

export const DialogTrigger = ({ children, asChild = false, ...props }) => {
	const { onOpenChange } = useContext(DialogContext);
	const handleClick = () => onOpenChange && onOpenChange(true);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: handleClick, ...props });
	return <button type='button' onClick={handleClick} {...props}>{children}</button>;
};

export const DialogPortal = ({ children }) => children;

export const DialogOverlay = ({ className = '', ...props }) => {
	const { open } = useContext(DialogContext);
	if (!open) return null;
	return <div className={cn(OVERLAY, className)} aria-hidden='true' {...props} />;
};

export const DialogContent = ({ children, className = '', ...props }) => {
	const { open, onOpenChange } = useContext(DialogContext);
	const ref = useRef(null);

	useEffect(() => {
		if (!open || !ref.current) return;
		const el = ref.current;
		document.body.style.overflow = 'hidden';
		const focusable = el.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\'-1\'])');
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		first?.focus();
		const trap = (e) => {
			if (e.key !== 'Tab') return;
			if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
			else { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
		};
		const esc = (e) => { if (e.key === 'Escape') onOpenChange && onOpenChange(false); };
		el.addEventListener('keydown', trap);
		document.addEventListener('keydown', esc);
		return () => { el.removeEventListener('keydown', trap); document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
	}, [open, onOpenChange]);

	if (!open || typeof document === 'undefined') return null;
	return createPortal(
		<>
			<div className={OVERLAY} aria-hidden='true' onClick={() => onOpenChange && onOpenChange(false)} />
			<div ref={ref} role='dialog' aria-modal='true' className={cn(CONTENT, className)} {...props}>
				{children}
				<button type='button' aria-label='Close' className={CLOSE} onClick={() => onOpenChange && onOpenChange(false)}>
					<span aria-hidden='true'>×</span>
				</button>
			</div>
		</>,
		document.body
	);
};

export const DialogClose = ({ children, asChild = false, ...props }) => {
	const { onOpenChange } = useContext(DialogContext);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: () => onOpenChange && onOpenChange(false), ...props });
	return <button type='button' onClick={() => onOpenChange && onOpenChange(false)} {...props}>{children}</button>;
};

export const DialogHeader = ({ className = '', ...props }) => (
	<div className={cn(HEADER, className)} {...props} />
);

export const DialogFooter = ({ className = '', ...props }) => (
	<div className={cn(FOOTER, className)} {...props} />
);

export const DialogTitle = ({ className = '', children, ...props }) => (
	<h2 className={cn(TITLE, className)} {...props}>{children}</h2>
);

export const DialogDescription = ({ className = '', ...props }) => (
	<p className={cn(DESCRIPTION, className)} {...props} />
);
