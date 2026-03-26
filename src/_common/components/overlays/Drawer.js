import React, { useEffect, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../constants/utils/cn';

const HEADER = 'grid gap-1.5 p-4 text-center sm:text-left';
const FOOTER = 'mt-auto flex flex-col gap-2 p-4';
const TITLE = 'text-lg font-semibold leading-none tracking-tight text-current';
const DESCRIPTION = 'text-sm text-muted-foreground';
const HANDLE = 'mx-auto mt-4 h-2 w-24 rounded-full bg-muted shrink-0';

const DrawerContext = createContext({ open: false, onOpenChange: null });

export const Drawer = ({ open = false, onOpenChange, children }) => (
	<DrawerContext.Provider value={{ open, onOpenChange }}>
		{children}
	</DrawerContext.Provider>
);

export const DrawerTrigger = ({ children, asChild = false, ...props }) => {
	const { onOpenChange } = useContext(DrawerContext);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: () => onOpenChange && onOpenChange(true), ...props });
	return <button type='button' onClick={() => onOpenChange && onOpenChange(true)} {...props}>{children}</button>;
};

export const DrawerPortal = ({ children }) => children;

export const DrawerOverlay = ({ className = '', ...props }) => {
	const { open } = useContext(DrawerContext);
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn('fixed inset-0 z-50 bg-black/80', className)}
					aria-hidden='true'
					{...props}
				/>
			)}
		</AnimatePresence>
	);
};

export const DrawerContent = ({ children, className = '', ...props }) => {
	const { open, onOpenChange } = useContext(DrawerContext);
	const ref = useRef(null);

	useEffect(() => {
		if (!open) return;
		const esc = (e) => { if (e.key === 'Escape') onOpenChange && onOpenChange(false); };
		document.addEventListener('keydown', esc);
		document.body.style.overflow = 'hidden';
		return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
	}, [open, onOpenChange]);

	if (typeof document === 'undefined') return null;
	return createPortal(
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-black/80'
						aria-hidden='true'
						onClick={() => onOpenChange && onOpenChange(false)}
					/>
					<motion.div
						ref={ref}
						role='dialog'
						aria-modal='true'
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						className={cn('fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-sm border bg-current text-foreground border-current', className)}
						{...props}
					>
						<div className={HANDLE} />
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body
	);
};

export const DrawerClose = ({ children, asChild = false, ...props }) => {
	const { onOpenChange } = useContext(DrawerContext);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: () => onOpenChange && onOpenChange(false), ...props });
	return <button type='button' onClick={() => onOpenChange && onOpenChange(false)} {...props}>{children}</button>;
};

export const DrawerHeader = ({ className = '', ...props }) => (
	<div className={cn(HEADER, className)} {...props} />
);

export const DrawerFooter = ({ className = '', ...props }) => (
	<div className={cn(FOOTER, className)} {...props} />
);

export const DrawerTitle = ({ className = '', children, ...props }) => (
	<h2 className={cn(TITLE, className)} {...props}>{children}</h2>
);

export const DrawerDescription = ({ className = '', ...props }) => (
	<p className={cn(DESCRIPTION, className)} {...props} />
);
