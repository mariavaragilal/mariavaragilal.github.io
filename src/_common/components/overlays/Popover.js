import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

const CONTENT = 'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95';

const PopoverContext = createContext({ open: false, onOpenChange: null });

export const Popover = ({ open, onOpenChange, children }) => {
	const [internal, setInternal] = useState(false);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? open : internal;
	const handleChange = (val) => {
		if (!isControlled) setInternal(val);
		if (onOpenChange) onOpenChange(val);
	};
	return (
		<PopoverContext.Provider value={{ open: isOpen, onOpenChange: handleChange }}>
			<div className='relative inline-block'>{children}</div>
		</PopoverContext.Provider>
	);
};

export const PopoverTrigger = ({ children, asChild = false, ...props }) => {
	const { open, onOpenChange } = useContext(PopoverContext);
	const handleClick = () => onOpenChange(!open);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: handleClick, 'aria-expanded': open, 'aria-haspopup': 'dialog', ...props });
	return <button type='button' aria-expanded={open} aria-haspopup='dialog' onClick={handleClick} {...props}>{children}</button>;
};

export const PopoverContent = ({ children, className = '', align = 'center', sideOffset = 4, ...props }) => {
	const { open, onOpenChange } = useContext(PopoverContext);
	const ref = useRef(null);

	useEffect(() => {
		if (!open) return;
		const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onOpenChange(false); };
		const keyHandler = (e) => { if (e.key === 'Escape') onOpenChange(false); };
		document.addEventListener('mousedown', handler);
		document.addEventListener('keydown', keyHandler);
		return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', keyHandler); };
	}, [open, onOpenChange]);

	if (!open) return null;
	const alignStyle = align === 'start' ? { left: 0 } : align === 'end' ? { right: 0 } : { left: '50%', transform: 'translateX(-50%)' };
	return (
		<div
			ref={ref}
			role='dialog'
			data-state='open'
			style={{ position: 'absolute', top: 'calc(100% + ' + sideOffset + 'px)', ...alignStyle }}
			className={CONTENT + ' ' + className}
			{...props}
		>
			{children}
		</div>
	);
};

export const PopoverAnchor = ({ className = '', ...props }) => (
	<div className={'inline-flex ' + className} {...props}/>
);
