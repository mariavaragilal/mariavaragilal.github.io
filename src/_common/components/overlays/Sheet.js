import React, { useCallback, useEffect, useRef, useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cva } from 'class-variance-authority';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';
import { Button } from '../controls/Button';

const OVERLAY_BASE = 'fixed inset-0 z-250 cursor-pointer bg-foreground text-current';
const WRAPPER = 'fixed z-250 overflow-hidden text-foreground';
const HEADER = 'flex flex-col space-y-2 text-center sm:text-left';
const FOOTER = 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2';
const TITLE = 'font-mono text-lg font-semibold';
const DESCRIPTION = 'text-sm text-current/66';

const sheetContentVariants = cva('absolute inset-0 gap-4 bg-background p-6 shadow-lg text-current overflow-y-auto', {
	variants: {
		side: {
			top: 'bottom-auto',
			bottom: 'top-auto',
			left: 'right-auto',
			right: 'left-auto',
		},
	},
	defaultVariants: {
		side: 'right',
	},
});

const SIDES = {
	top: { flush: 'top-0 left-0 right-0', contentAlign: 'bottom-auto', initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' } },
	bottom: { flush: 'bottom-0 left-0 right-0', contentAlign: 'top-auto', initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } },
	left: { flush: 'top-0 bottom-0 left-0 w-3/4', contentAlign: 'right-auto', initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
	right: { flush: 'top-0 bottom-0 right-0 w-3/4', contentAlign: 'left-auto', initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
};

const TRANSITION = { duration: 0.2, ease: [0.4, 0, 0.2, 1] };

const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\'-1\'])';

const SheetContext = createContext({ open: false, onOpenChange: null });

export const Sheet = ({ open: controlledOpen, defaultOpen = false, onOpenChange, children }) => {
	const [internal, setInternal] = useState(defaultOpen);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internal;
	const setOpen = useCallback((val) => {
		if (!isControlled) setInternal(val);
		onOpenChange && onOpenChange(val);
	}, [isControlled, onOpenChange]);
	return (
		<SheetContext.Provider value={{ open, onOpenChange: setOpen }}>
			{children}
		</SheetContext.Provider>
	);
};

export const SheetTrigger = ({ children, asChild = false, className = '', ...props }) => {
	const { onOpenChange } = useContext(SheetContext);
	const handleOpen = useCallback(() => onOpenChange && onOpenChange(true), [onOpenChange]);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: handleOpen, ...props });
	return <Button variant='default' className={className} onClick={handleOpen} {...props}>{children}</Button>;
};

export const SheetClose = ({ children, asChild = false, className = '', ...props }) => {
	const { onOpenChange } = useContext(SheetContext);
	const handleClose = useCallback(() => onOpenChange && onOpenChange(false), [onOpenChange]);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: handleClose, ...props });
	return <Button variant='secondary' size='icon' aria-label='Close' className={cn('absolute right-4 top-4 shrink-0 size-11', className)} onClick={handleClose} {...props}>{children}</Button>;
};

export const SheetPortal = ({ children }) => createPortal(children, document.body);

export const SheetOverlay = ({ overlayOpacity = 0.5, onClick, className = '', ...props }) => (
	<motion.div
		key='sheet-overlay'
		initial={{ opacity: 0 }}
		animate={{ opacity: overlayOpacity }}
		exit={{ opacity: 0 }}
		transition={{ duration: 0.2 }}
		className={cn(OVERLAY_BASE, className)}
		aria-hidden='true'
		onClick={onClick}
		{...props}
	/>
);

export const SheetContent = ({ side = 'right', overlayOpacity = 0.5, closeButton = true, wrapperClassName = '', children, className = '', ...props }) => {
	const { open, onOpenChange } = useContext(SheetContext);
	const ref = useRef(null);
	const sideConfig = SIDES[side] || SIDES.right;

	const handleClose = useCallback(() => onOpenChange && onOpenChange(false), [onOpenChange]);
	const handleOverlayClick = handleClose;
	const handleWrapperClick = useCallback((e) => {
		if (!ref.current?.contains(e.target)) handleClose();
	}, [handleClose]);

	useEffect(() => {
		if (!open) return;
		const el = ref.current;
		const handleEsc = (e) => { if (e.key === 'Escape') handleClose(); };
		const handleTrap = (e) => {
			if (e.key !== 'Tab') return;
			const focusable = el.querySelectorAll(FOCUSABLE_SELECTOR);
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
			else { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
		};
		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleEsc);
		if (el) {
			const focusable = el.querySelectorAll(FOCUSABLE_SELECTOR);
			const first = focusable[0];
			first?.focus();
			el.addEventListener('keydown', handleTrap);
		}
		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleEsc);
			if (el) el.removeEventListener('keydown', handleTrap);
		};
	}, [open, handleClose]);

	if (typeof document === 'undefined') return null;

	return (
		<SheetPortal>
			<AnimatePresence mode='popLayout'>
				{open && (
					<React.Fragment>
						<SheetOverlay overlayOpacity={overlayOpacity} onClick={handleOverlayClick} />
						<motion.div
							key='sheet-wrapper'
							initial={sideConfig.initial}
							animate={sideConfig.animate}
							exit={sideConfig.exit}
							transition={TRANSITION}
							className={cn(WRAPPER, wrapperClassName || sideConfig.flush)}
							onClick={handleWrapperClick}>
							<div ref={ref} role='dialog' aria-modal='true' className={cn(sheetContentVariants({ side }), focusRing, className)} {...props}>
								{closeButton && (
									<SheetClose>
										<motion.span animate={{ rotate: 45 }} className='font-mono font-thin text-xl leading-none' aria-hidden='true'>+</motion.span>
									</SheetClose>
								)}
								{children}
							</div>
						</motion.div>
					</React.Fragment>
				)}
			</AnimatePresence>
		</SheetPortal>
	);
};

export const SheetHeader = ({ className = '', ...props }) => (
	<div className={cn(HEADER, className)} {...props} />
);

export const SheetFooter = ({ className = '', ...props }) => (
	<div className={cn(FOOTER, className)} {...props} />
);

export const SheetTitle = ({ className = '', children, ...props }) => (
	<h2 className={cn(TITLE, className)} {...props}>{children}</h2>
);

export const SheetDescription = ({ className = '', ...props }) => (
	<p className={cn(DESCRIPTION, className)} {...props} />
);
