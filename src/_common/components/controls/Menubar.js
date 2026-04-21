import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const ROOT = 'flex h-9 items-center space-x-1 rounded-md border bg-background p-1';
const TRIGGER = 'flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground ' + focusRing;
const CONTENT = 'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md';
const ITEM = 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 ' + focusRing;
const SEPARATOR_CLS = '-mx-1 my-1 h-px bg-muted';
const LABEL_CLS = 'px-2 py-1.5 text-sm font-semibold';

const MenubarContext = createContext({ openMenu: null, setOpenMenu: () => {} });
const MenuItemContext = createContext({ isOpen: false, value: null, setOpenMenu: () => {} });

export const Menubar = ({ className = '', children, ...props }) => {
	const [openMenu, setOpenMenu] = useState(null);
	return (
		<MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
			<div role='menubar' className={cn(ROOT, className)} {...props}>{children}</div>
		</MenubarContext.Provider>
	);
};

export const MenubarMenu = ({ value, children, ...props }) => {
	const { openMenu, setOpenMenu } = useContext(MenubarContext);
	const isOpen = openMenu === value;
	const ref = useRef(null);

	useEffect(() => {
		const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpenMenu(null); };
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, [setOpenMenu]);

	return (
		<MenuItemContext.Provider value={{ isOpen, value, setOpenMenu }}>
			<div ref={ref} className='relative' {...props}>{children}</div>
		</MenuItemContext.Provider>
	);
};

export const MenubarTrigger = ({ className = '', children, ...props }) => {
	const { isOpen, value } = useContext(MenuItemContext);
	const { openMenu, setOpenMenu } = useContext(MenubarContext);
	return (
		<button
			type='button'
			role='menuitem'
			aria-haspopup='menu'
			aria-expanded={isOpen}
			data-state={isOpen ? 'open' : 'closed'}
			className={cn(TRIGGER, className)}
			onClick={() => setOpenMenu(isOpen ? null : value)}
			onMouseEnter={() => { if (openMenu !== null) setOpenMenu(value); }}
			{...props}
		>
			{children}
		</button>
	);
};

export const MenubarContent = ({ className = '', children, ...props }) => {
	const { isOpen } = useContext(MenuItemContext);
	if (!isOpen) return null;
	return (
		<div role='menu' className={cn('absolute top-full left-0 mt-1', CONTENT, className)} {...props}>
			{children}
		</div>
	);
};

export const MenubarItem = ({ className = '', inset, children, ...props }) => (
	<div role='menuitem' tabIndex={0} className={cn(inset && 'pl-8', ITEM, className)} {...props}>{children}</div>
);

export const MenubarSeparator = ({ className = '', ...props }) => (
	<div role='separator' className={cn(SEPARATOR_CLS, className)} {...props}/>
);

export const MenubarLabel = ({ className = '', inset, ...props }) => (
	<div className={cn(inset && 'pl-8', LABEL_CLS, className)} {...props}/>
);

export const MenubarShortcut = ({ className = '', ...props }) => (
	<span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props}/>
);

export const MenubarSub = ({ children }) => <>{children}</>;

export const MenubarSubTrigger = ({ className = '', inset, children, ...props }) => (
	<div role='menuitem' aria-haspopup='menu' tabIndex={0} className={cn(inset && 'pl-8', ITEM, className)} {...props}>
		{children}
		<span aria-hidden='true' className='ml-auto'>▶</span>
	</div>
);

export const MenubarSubContent = ({ className = '', ...props }) => (
	<div role='menu' className={cn('absolute left-full top-0', CONTENT, className)} {...props}/>
);

export const MenubarCheckboxItem = ({ className = '', checked, children, onCheckedChange, ...props }) => (
	<div
		role='menuitemcheckbox'
		aria-checked={checked}
		tabIndex={0}
		className={cn('pl-8', ITEM, className)}
		onClick={() => onCheckedChange && onCheckedChange(!checked)}
		onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCheckedChange && onCheckedChange(!checked); } }}
		{...props}
	>
		<span className='absolute left-2'>{checked && <span aria-hidden='true'>✓</span>}</span>
		{children}
	</div>
);

export const MenubarRadioGroup = ({ children, ...props }) => <div role='group' {...props}>{children}</div>;

export const MenubarRadioItem = ({ className = '', checked, children, onCheckedChange, ...props }) => (
	<div
		role='menuitemradio'
		aria-checked={checked}
		tabIndex={0}
		className={cn('pl-8', ITEM, className)}
		onClick={() => onCheckedChange && onCheckedChange()}
		onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCheckedChange && onCheckedChange(); } }}
		{...props}
	>
		<span className='absolute left-2'>{checked && <span aria-hidden='true'>●</span>}</span>
		{children}
	</div>
);
