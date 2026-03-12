import React, { useState, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const CollapsibleContext = createContext({ open: false, onOpenChange: () => {} });

export const Collapsible = ({ open, defaultOpen, onOpenChange, className = '', children, ...props }) => {
	const [internal, setInternal] = useState(defaultOpen || false);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? open : internal;
	const handleChange = (val) => {
		if (!isControlled) setInternal(val);
		if (onOpenChange) onOpenChange(val);
	};
	return (
		<CollapsibleContext.Provider value={{ open: isOpen, onOpenChange: handleChange }}>
			<div data-state={isOpen ? 'open' : 'closed'} className={className} {...props}>{children}</div>
		</CollapsibleContext.Provider>
	);
};

export const CollapsibleTrigger = ({ children, asChild = false, className = '', ...props }) => {
	const { open, onOpenChange } = useContext(CollapsibleContext);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: () => onOpenChange(!open), 'aria-expanded': open, ...props });
	return (
		<button type='button' aria-expanded={open} className={className} onClick={() => onOpenChange(!open)} {...props}>
			{children}
		</button>
	);
};

export const CollapsibleContent = ({ className = '', children, ...props }) => {
	const { open } = useContext(CollapsibleContext);
	return (
		<AnimatePresence initial={false}>
			{open && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.2, ease: 'easeInOut' }}
					className={'overflow-hidden ' + className}
					{...props}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
