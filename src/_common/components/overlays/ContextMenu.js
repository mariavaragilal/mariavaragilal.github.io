import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { focusRing } from '../../../constants/utils/a11y';

const CONTENT = 'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80';
const ITEM_BASE = 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ' + focusRing;
const SEPARATOR = '-mx-1 my-1 h-px bg-muted';
const LABEL_CLS = 'px-2 py-1.5 text-sm font-semibold text-foreground';
const SHORTCUT = 'ml-auto text-xs tracking-widest opacity-60';

const ContextMenuContext = createContext({ pos: null, setPos: () => {} });
const ContextSubContext = createContext({ open: false, setOpen: () => {} });

export const ContextMenu = ({ children }) => {
	const [pos, setPos] = useState(null);
	const ref = useRef(null);

	const handleContextMenu = (e) => { e.preventDefault(); setPos({ x: e.clientX, y: e.clientY }); };

	useEffect(() => {
		if (!pos) return;
		const handler = (e) => { if (!e.target.closest('[data-context-menu-content]')) setPos(null); };
		const keyHandler = (e) => { if (e.key === 'Escape') setPos(null); };
		document.addEventListener('mousedown', handler);
		document.addEventListener('keydown', keyHandler);
		return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', keyHandler); };
	}, [pos]);

	return (
		<ContextMenuContext.Provider value={{ pos, setPos }}>
			<div ref={ref} onContextMenu={handleContextMenu}>{children}</div>
		</ContextMenuContext.Provider>
	);
};

export const ContextMenuTrigger = ({ children, asChild = false, ...props }) => {
	if (asChild && React.isValidElement(children)) return children;
	return <div {...props}>{children}</div>;
};

export const ContextMenuPortal = ({ children }) => children;

export const ContextMenuContent = ({ children, className = '', ...props }) => {
	const { pos } = useContext(ContextMenuContext);
	if (!pos || typeof document === 'undefined') return null;
	return createPortal(
		<div
			data-context-menu-content
			role='menu'
			aria-orientation='vertical'
			style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 50 }}
			className={CONTENT + ' ' + className}
			{...props}
		>
			{children}
		</div>,
		document.body
	);
};

export const ContextMenuItem = ({ className = '', inset, disabled, onSelect, children, ...props }) => {
	const handle = !disabled ? onSelect : undefined;
	const handleKey = !disabled ? (e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect && onSelect(); } }) : undefined;
	return (
		<div role='menuitem' tabIndex={disabled ? -1 : 0} data-disabled={disabled || undefined} className={(inset ? 'pl-8 ' : '') + ITEM_BASE + ' ' + className} onClick={handle} onKeyDown={handleKey} {...props}>
			{children}
		</div>
	);
};

export const ContextMenuCheckboxItem = ({ className = '', checked, children, onCheckedChange, ...props }) => {
	const toggle = () => onCheckedChange && onCheckedChange(!checked);
	return (
		<div role='menuitemcheckbox' aria-checked={checked} tabIndex={0} className={'pl-8 ' + ITEM_BASE + ' ' + className} onClick={toggle} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }} {...props}>
			<span className='absolute left-2'>{checked && <span aria-hidden='true'>✓</span>}</span>
			{children}
		</div>
	);
};

export const ContextMenuRadioGroup = ({ children, value, onValueChange, ...props }) => (
	<div role='group' {...props}>{React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, { _groupValue: value, _onGroupChange: onValueChange }) : child)}</div>
);

export const ContextMenuRadioItem = ({ className = '', children, value, _groupValue, _onGroupChange, ...props }) => {
	const select = () => _onGroupChange && _onGroupChange(value);
	return (
		<div role='menuitemradio' aria-checked={_groupValue === value} tabIndex={0} className={'pl-8 ' + ITEM_BASE + ' ' + className} onClick={select} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } }} {...props}>
			<span className='absolute left-2'>{_groupValue === value && <span aria-hidden='true'>●</span>}</span>
			{children}
		</div>
	);
};

export const ContextMenuLabel = ({ className = '', inset, ...props }) => (
	<div className={(inset ? 'pl-8 ' : '') + LABEL_CLS + ' ' + className} {...props}/>
);

export const ContextMenuSeparator = ({ className = '', ...props }) => (
	<div role='separator' className={SEPARATOR + ' ' + className} {...props}/>
);

export const ContextMenuShortcut = ({ className = '', ...props }) => (
	<span className={SHORTCUT + ' ' + className} {...props}/>
);

export const ContextMenuSub = ({ children }) => {
	const [open, setOpen] = useState(false);
	return (
		<ContextSubContext.Provider value={{ open, setOpen }}>
			<div className='relative'>{children}</div>
		</ContextSubContext.Provider>
	);
};

export const ContextMenuSubTrigger = ({ className = '', inset, children, ...props }) => {
	const { open, setOpen } = useContext(ContextSubContext);
	const toggle = () => setOpen(!open);
	return (
		<div role='menuitem' aria-haspopup='menu' aria-expanded={open} tabIndex={0} className={(inset ? 'pl-8 ' : '') + ITEM_BASE + ' ' + className} onClick={toggle} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }} {...props}>
			{children}
			<span aria-hidden='true' className='ml-auto'>▶</span>
		</div>
	);
};

export const ContextMenuSubContent = ({ className = '', ...props }) => {
	const { open } = useContext(ContextSubContext);
	if (!open) return null;
	return <div role='menu' className={'absolute left-full top-0 ' + CONTENT + ' ' + className} {...props}/>;
};
