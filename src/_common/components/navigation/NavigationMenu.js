import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const ROOT = 'relative z-10 flex max-w-max flex-1 items-center justify-center';
const LIST = 'group flex flex-1 list-none items-center justify-center space-x-1';
const TRIGGER_BASE = 'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 ' + focusRing;
const CONTENT_BASE = 'absolute top-full left-0 mt-1.5 w-auto rounded-md border bg-popover text-popover-foreground shadow animate-in fade-in-0 zoom-in-95';
const LINK_BASE = 'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground ' + focusRing;
const VIEWPORT = 'origin-top-center relative mt-1.5 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90';

const NavContext = createContext({ openItem: null, setOpenItem: () => {} });
const NavItemContext = createContext({ isOpen: false, value: null });

export const NavigationMenu = ({ className = '', children, ...props }) => {
	const [openItem, setOpenItem] = useState(null);
	return (
		<NavContext.Provider value={{ openItem, setOpenItem }}>
			<nav className={cn(ROOT, className)} {...props}>
				{children}
			</nav>
		</NavContext.Provider>
	);
};

export const NavigationMenuList = ({ className = '', ...props }) => (
	<ul className={cn(LIST, className)} {...props}/>
);

export const NavigationMenuItem = ({ className = '', value, ...props }) => {
	const { openItem, setOpenItem } = useContext(NavContext);
	const isOpen = openItem === value;
	const ref = useRef(null);

	useEffect(() => {
		if (!isOpen) return;
		const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpenItem(null); };
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, [isOpen, setOpenItem]);

	return (
		<NavItemContext.Provider value={{ isOpen, value, setOpenItem }}>
			<li ref={ref} className={className} {...props}/>
		</NavItemContext.Provider>
	);
};

export const NavigationMenuTrigger = ({ className = '', children, ...props }) => {
	const { isOpen, value, setOpenItem } = useContext(NavItemContext);
	return (
		<button
			type='button'
			aria-expanded={isOpen}
			aria-haspopup='true'
			className={cn(TRIGGER_BASE, className)}
			onClick={() => setOpenItem(isOpen ? null : value)}
			{...props}
		>
			{children}
			<span aria-hidden='true' className={cn('ml-1 inline-block transition-transform duration-200', isOpen && 'rotate-180')}>▾</span>
		</button>
	);
};

export const NavigationMenuContent = ({ className = '', children, ...props }) => {
	const { isOpen } = useContext(NavItemContext);
	if (!isOpen) return null;
	return (
		<div className={cn('absolute', CONTENT_BASE, className)} {...props}>
			{children}
		</div>
	);
};

export const NavigationMenuLink = ({ className = '', href, children, ...props }) => (
	<a href={href} className={cn(LINK_BASE, className)} {...props}>{children}</a>
);

export const NavigationMenuViewport = ({ className = '', ...props }) => (
	<div className='absolute left-0 top-full flex justify-center'>
		<div className={cn(VIEWPORT, className)} {...props}/>
	</div>
);

export const NavigationMenuIndicator = ({ className = '', ...props }) => (
	<div className={cn('top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden', className)} {...props}>
		<div className='relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md'/>
	</div>
);
