import React, { useEffect, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { focusRing } from '../../../constants/utils/a11y';

const OVERLAY = 'fixed inset-0 z-50 bg-black/80';
const CLOSE = 'absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 ' + focusRing;
const HEADER = 'flex flex-col space-y-2 text-center sm:text-left';
const FOOTER = 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2';
const TITLE = 'text-lg font-semibold text-foreground';
const DESCRIPTION = 'text-sm text-muted-foreground';
const SIDES = {
	top: 'inset-x-0 top-0 border-b animate-in slide-in-from-top',
	bottom: 'inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom',
	left: 'inset-y-0 left-0 h-full w-3/4 border-r animate-in slide-in-from-left sm:max-w-sm',
	right: 'inset-y-0 right-0 h-full w-3/4 border-l animate-in slide-in-from-right sm:max-w-sm',
};
const CONTENT_BASE = 'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out duration-500';

const SheetContext = createContext({ open: false, onOpenChange: null });

export const Sheet = ({ open = false, onOpenChange, children }) => (
	<SheetContext.Provider value={{ open, onOpenChange }}>
		{children}
	</SheetContext.Provider>
);

export const SheetTrigger = ({ children, asChild = false, ...props }) => {
	const { onOpenChange } = useContext(SheetContext);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: () => onOpenChange && onOpenChange(true), ...props });
	return <button type='button' onClick={() => onOpenChange && onOpenChange(true)} {...props}>{children}</button>;
};

export const SheetClose = ({ children, asChild = false, ...props }) => {
	const { onOpenChange } = useContext(SheetContext);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: () => onOpenChange && onOpenChange(false), ...props });
	return <button type='button' onClick={() => onOpenChange && onOpenChange(false)} {...props}>{children}</button>;
};

export const SheetPortal = ({ children }) => children;

export const SheetOverlay = ({ className = '', ...props }) => {
	const { open } = useContext(SheetContext);
	if (!open) return null;
	return <div className={OVERLAY + ' ' + className} aria-hidden='true' {...props}/>;
};

export const SheetContent = ({ side = 'right', children, className = '', ...props }) => {
	const { open, onOpenChange } = useContext(SheetContext);
	const ref = useRef(null);

	useEffect(() => {
		if (!open) return;
		const esc = (e) => { if (e.key === 'Escape') onOpenChange && onOpenChange(false); };
		document.addEventListener('keydown', esc);
		document.body.style.overflow = 'hidden';
		const el = ref.current;
		if (el) {
			const focusable = el.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex=\'-1\'])');
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			first?.focus();
			const trap = (e) => {
				if (e.key !== 'Tab') return;
				if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
				else { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
			};
			el.addEventListener('keydown', trap);
			return () => { el.removeEventListener('keydown', trap); document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
		}
		return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
	}, [open, onOpenChange]);

	if (!open || typeof document === 'undefined') return null;
	return createPortal(
		<>
			<div className={OVERLAY} aria-hidden='true' onClick={() => onOpenChange && onOpenChange(false)}/>
			<div ref={ref} role='dialog' aria-modal='true' className={CONTENT_BASE + ' ' + (SIDES[side] || SIDES.right) + ' ' + className} {...props}>
				<button type='button' aria-label='Close' className={CLOSE} onClick={() => onOpenChange && onOpenChange(false)}>
					<span aria-hidden='true'>×</span>
				</button>
				{children}
			</div>
		</>,
		document.body
	);
};

export const SheetHeader = ({ className = '', ...props }) => (
	<div className={HEADER + ' ' + className} {...props}/>
);

export const SheetFooter = ({ className = '', ...props }) => (
	<div className={FOOTER + ' ' + className} {...props}/>
);

export const SheetTitle = ({ className = '', children, ...props }) => (
	<h2 className={TITLE + ' ' + className} {...props}>{children}</h2>
);

export const SheetDescription = ({ className = '', ...props }) => (
	<p className={DESCRIPTION + ' ' + className} {...props}/>
);
