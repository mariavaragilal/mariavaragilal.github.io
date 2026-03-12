import React, { useState, useRef, useId, useCallback, createContext, useContext } from 'react';

const CONTENT = 'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95';

const TooltipProviderContext = createContext({ delayDuration: 700 });
const TooltipStateContext = createContext({ open: false, show: () => {}, hide: () => {}, id: '' });

export const TooltipProvider = ({ delayDuration = 700, children }) => (
	<TooltipProviderContext.Provider value={{ delayDuration }}>
		{children}
	</TooltipProviderContext.Provider>
);

export const Tooltip = ({ children }) => {
	const [open, setOpen] = useState(false);
	const id = useId();
	const { delayDuration } = useContext(TooltipProviderContext);
	const timer = useRef(null);
	const show = useCallback(() => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(true), delayDuration); }, [delayDuration]);
	const hide = useCallback(() => { clearTimeout(timer.current); setOpen(false); }, []);
	return (
		<TooltipStateContext.Provider value={{ open, show, hide, id }}>
			<div className='relative inline-block'>{children}</div>
		</TooltipStateContext.Provider>
	);
};

export const TooltipTrigger = ({ children, asChild = false, ...props }) => {
	const { open, show, hide, id } = useContext(TooltipStateContext);
	const handlers = {
		onMouseEnter: show,
		onMouseLeave: hide,
		onFocus: show,
		onBlur: hide,
		'aria-describedby': open ? 'tooltip-' + id : undefined,
	};
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { ...handlers, ...props });
	return <span {...handlers} {...props}>{children}</span>;
};

export const TooltipContent = ({ className = '', children, sideOffset = 4, ...props }) => {
	const { open, id } = useContext(TooltipStateContext);
	if (!open) return null;
	return (
		<div
			id={'tooltip-' + id}
			role='tooltip'
			data-state='open'
			style={{ position: 'absolute', bottom: 'calc(100% + ' + sideOffset + 'px)', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
			className={CONTENT + ' ' + className}
			{...props}
		>
			{children}
		</div>
	);
};
