import React, { useState, useRef, createContext, useContext, useCallback } from 'react';
import { cn } from '../../../constants/utils/cn';

const CONTENT = 'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95';

const HoverCardContext = createContext({ open: false, show: () => {}, hide: () => {} });

export const HoverCard = ({ openDelay = 700, closeDelay = 300, children }) => {
	const [open, setOpen] = useState(false);
	const timer = useRef(null);
	const show = useCallback(() => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(true), openDelay); }, [openDelay]);
	const hide = useCallback(() => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), closeDelay); }, [closeDelay]);
	return (
		<HoverCardContext.Provider value={{ open, show, hide, setOpen }}>
			<div className='relative inline-block'>{children}</div>
		</HoverCardContext.Provider>
	);
};

export const HoverCardTrigger = ({ children, asChild = false, ...props }) => {
	const { show, hide } = useContext(HoverCardContext);
	const handlers = { onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide };
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { ...handlers, ...props });
	return <span {...handlers} {...props}>{children}</span>;
};

export const HoverCardContent = ({ className = '', align = 'center', sideOffset = 4, ...props }) => {
	const { open, show, hide } = useContext(HoverCardContext);
	if (!open) return null;
	const alignStyle = align === 'start' ? { left: 0 } : align === 'end' ? { right: 0 } : { left: '50%', transform: 'translateX(-50%)' };
	return (
		<div
			data-state='open'
			style={{ position: 'absolute', top: 'calc(100% + ' + sideOffset + 'px)', ...alignStyle }}
			className={cn(CONTENT, className)}
			onMouseEnter={show}
			onMouseLeave={hide}
			{...props}
		/>
	);
};
