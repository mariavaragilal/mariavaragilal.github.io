import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const CONTENT = 'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95';
const ITEM_BASE = 'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ' + focusRing;
const SEPARATOR = '-mx-1 my-1 h-px bg-muted';
const LABEL_CLS = 'px-2 py-1.5 text-sm font-semibold';
const SHORTCUT = 'ml-auto text-xs tracking-widest opacity-60';
const SUB_TRIGGER = ITEM_BASE + ' data-[state=open]:bg-accent data-[state=open]:text-accent-foreground';

const DropdownContext = createContext({ open: false, onOpenChange: null });
const DropdownSubContext = createContext({ open: false, setOpen: () => {} });

export const DropdownMenu = ({ children, open, onOpenChange }) => {
	const [internal, setInternal] = useState(false);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? open : internal;
	const handleChange = (val) => { if (!isControlled) setInternal(val); if (onOpenChange) onOpenChange(val); };
	return (
		<DropdownContext.Provider value={{ open: isOpen, onOpenChange: handleChange }}>
			<div className='relative inline-block'>{children}</div>
		</DropdownContext.Provider>
	);
};

export const DropdownMenuTrigger = ({ children, asChild = false, ...props }) => {
	const { open, onOpenChange } = useContext(DropdownContext);
	const handleClick = () => onOpenChange(!open);
	if (asChild && React.isValidElement(children)) return React.cloneElement(children, { onClick: handleClick, 'aria-expanded': open, 'aria-haspopup': 'menu', ...props });
	return <button type='button' aria-expanded={open} aria-haspopup='menu' onClick={handleClick} {...props}>{children}</button>;
};

export const DropdownMenuPortal = ({ children }) => children;

export const DropdownMenuContent = ({ className = '', align = 'start', sideOffset = 4, children, ...props }) => {
	const { open, onOpenChange } = useContext(DropdownContext);
	const ref = useRef(null);

	useEffect(() => {
		if (!open) return;
		const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onOpenChange(false); };
		const keyHandler = (e) => {
			if (e.key === 'Escape') { onOpenChange(false); return; }
			if (!ref.current) return;
			const items = Array.from(ref.current.querySelectorAll('[role=\'menuitem\']:not([data-disabled])'));
			const idx = items.indexOf(document.activeElement);
			if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
			if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus(); }
			if (e.key === 'Home') { e.preventDefault(); items[0]?.focus(); }
			if (e.key === 'End') { e.preventDefault(); items[items.length - 1]?.focus(); }
		};
		document.addEventListener('mousedown', handler);
		document.addEventListener('keydown', keyHandler);
		return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', keyHandler); };
	}, [open, onOpenChange]);

	if (!open) return null;
	return (
		<div
			ref={ref}
			role='menu'
			aria-orientation='vertical'
			data-state='open'
			style={{ top: 'calc(100% + ' + sideOffset + 'px)' }}
			className={cn('absolute', align === 'end' ? 'right-0' : 'left-0', CONTENT, className)}
			{...props}
		>
			{children}
		</div>
	);
};

export const DropdownMenuItem = ({ className = '', inset, disabled, onSelect, children, ...props }) => (
	<div
		role='menuitem'
		tabIndex={disabled ? -1 : 0}
		data-disabled={disabled || undefined}
		className={cn(inset && 'pl-8', ITEM_BASE, className)}
		onClick={!disabled ? onSelect : undefined}
		onKeyDown={!disabled ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect && onSelect(); } } : undefined}
		{...props}
	>
		{children}
	</div>
);

export const DropdownMenuCheckboxItem = ({ className = '', checked, children, onCheckedChange, ...props }) => {
	const toggle = () => onCheckedChange && onCheckedChange(!checked);
	return (
		<div role='menuitemcheckbox' aria-checked={checked} tabIndex={0} className={cn('pl-8', ITEM_BASE, className)} onClick={toggle} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }} {...props}>
			<span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>{checked && <span aria-hidden='true'>✓</span>}</span>
			{children}
		</div>
	);
};

export const DropdownMenuRadioGroup = ({ children, value, onValueChange, ...props }) => (
	<div role='group' {...props}>{React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, { _groupValue: value, _onGroupChange: onValueChange }) : child)}</div>
);

export const DropdownMenuRadioItem = ({ className = '', children, value, _groupValue, _onGroupChange, ...props }) => {
	const select = () => _onGroupChange && _onGroupChange(value);
	return (
		<div role='menuitemradio' aria-checked={_groupValue === value} tabIndex={0} className={cn('pl-8', ITEM_BASE, className)} onClick={select} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } }} {...props}>
			<span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>{_groupValue === value && <span aria-hidden='true'>●</span>}</span>
			{children}
		</div>
	);
};

export const DropdownMenuLabel = ({ className = '', inset, ...props }) => (
	<div className={cn(inset && 'pl-8', LABEL_CLS, className)} {...props}/>
);

export const DropdownMenuSeparator = ({ className = '', ...props }) => (
	<div role='separator' className={cn(SEPARATOR, className)} {...props}/>
);

export const DropdownMenuShortcut = ({ className = '', ...props }) => (
	<span className={cn(SHORTCUT, className)} {...props}/>
);

export const DropdownMenuGroup = ({ className = '', ...props }) => (
	<div role='group' className={className} {...props}/>
);

export const DropdownMenuSub = ({ children }) => {
	const [open, setOpen] = useState(false);
	return (
		<DropdownSubContext.Provider value={{ open, setOpen }}>
			<div className='relative'>{children}</div>
		</DropdownSubContext.Provider>
	);
};

export const DropdownMenuSubTrigger = ({ className = '', inset, children, ...props }) => {
	const { open, setOpen } = useContext(DropdownSubContext);
	return (
		<div
			role='menuitem'
			aria-haspopup='menu'
			aria-expanded={open}
			tabIndex={0}
			data-state={open ? 'open' : 'closed'}
			className={cn(inset && 'pl-8', SUB_TRIGGER, className)}
			onClick={() => setOpen(!open)}
			onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}
			{...props}
		>
			{children}
			<span aria-hidden='true' className='ml-auto'>▶</span>
		</div>
	);
};

export const DropdownMenuSubContent = ({ className = '', ...props }) => {
	const { open } = useContext(DropdownSubContext);
	if (!open) return null;
	return <div role='menu' className={cn('absolute left-full top-0', CONTENT, className)} {...props}/>;
};
