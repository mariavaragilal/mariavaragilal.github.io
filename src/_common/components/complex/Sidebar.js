import { useState, useCallback, createContext, useContext } from 'react';
import { focusRing } from '../../../constants/utils/a11y';

const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_ICON = '3rem';

const SidebarContext = createContext({ state: 'expanded', open: true, setOpen: () => {}, toggleSidebar: () => {} });

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ defaultOpen = true, open: controlledOpen, onOpenChange, className = '', style, children, ...props }) => {
	const [openState, setOpenState] = useState(defaultOpen);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : openState;

	const setOpen = useCallback((val) => {
		const next = typeof val === 'function' ? val(open) : val;
		if (!isControlled) setOpenState(next);
		if (onOpenChange) onOpenChange(next);
	}, [open, isControlled, onOpenChange]);

	const toggleSidebar = useCallback(() => setOpen(!open), [open, setOpen]);
	const state = open ? 'expanded' : 'collapsed';

	return (
		<SidebarContext.Provider value={{ state, open, setOpen, toggleSidebar }}>
			<div
				data-sidebar='provider'
				style={{ '--sidebar-width': SIDEBAR_WIDTH, '--sidebar-width-icon': SIDEBAR_WIDTH_ICON, ...style }}
				className={'group/sidebar-wrapper flex min-h-svh w-full ' + (className || '')}
				{...props}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
};

export const SidebarTrigger = ({ className = '', onClick, ...props }) => {
	const { toggleSidebar } = useSidebar();
	return (
		<button
			type='button'
			data-sidebar='trigger'
			aria-label='Toggle sidebar'
			className={'inline-flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ' + focusRing + ' ' + className}
			onClick={(e) => { if (onClick) onClick(e); toggleSidebar(); }}
			{...props}
		>
			<span aria-hidden='true'>☰</span>
		</button>
	);
};

export const Sidebar = ({ side = 'left', variant = 'sidebar', collapsible = 'offcanvas', className = '', children, ...props }) => {
	const { state } = useSidebar();
	return (
		<div
			data-state={state}
			data-collapsible={collapsible}
			data-variant={variant}
			data-side={side}
			className={'group peer hidden md:block text-sidebar-foreground ' + className}
			{...props}
		>
			<div className={'relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[collapsible=icon]:w-[--sidebar-width-icon]'}/>
			<div className={'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex ' + (side === 'left' ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]' : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]') + ' ' + (variant !== 'sidebar' ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4)+2px)]' : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l')}>
				<div data-sidebar='sidebar' className={'flex h-full w-full flex-col bg-sidebar ' + (variant === 'floating' ? 'rounded-lg border border-sidebar-border shadow' : variant === 'inset' ? 'rounded-xl' : '')}>
					{children}
				</div>
			</div>
		</div>
	);
};

export const SidebarInset = ({ className = '', ...props }) => (
	<main className={'relative flex min-h-svh flex-1 flex-col bg-background ' + className} {...props}/>
);

export const SidebarHeader = ({ className = '', ...props }) => (
	<div data-sidebar='header' className={'flex flex-col gap-2 p-2 ' + className} {...props}/>
);

export const SidebarFooter = ({ className = '', ...props }) => (
	<div data-sidebar='footer' className={'flex flex-col gap-2 p-2 ' + className} {...props}/>
);

export const SidebarSeparator = ({ className = '', ...props }) => (
	<div data-sidebar='separator' className={'mx-2 w-auto h-px bg-sidebar-border ' + className} {...props}/>
);

export const SidebarContent = ({ className = '', ...props }) => (
	<div data-sidebar='content' className={'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden ' + className} {...props}/>
);

export const SidebarGroup = ({ className = '', ...props }) => (
	<div data-sidebar='group' className={'relative flex w-full min-w-0 flex-col p-2 ' + className} {...props}/>
);

export const SidebarGroupLabel = ({ className = '', ...props }) => (
	<div data-sidebar='group-label' className={'duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] ease-linear focus-visible:ring-2 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 ' + className} {...props}/>
);

export const SidebarGroupContent = ({ className = '', ...props }) => (
	<div data-sidebar='group-content' className={'w-full text-sm ' + className} {...props}/>
);

export const SidebarMenu = ({ className = '', ...props }) => (
	<ul data-sidebar='menu' className={'flex w-full min-w-0 flex-col gap-1 ' + className} {...props}/>
);

export const SidebarMenuItem = ({ className = '', ...props }) => (
	<li data-sidebar='menu-item' className={'group/menu-item relative ' + className} {...props}/>
);

const MENU_BUTTON_BASE = 'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0';

export const SidebarMenuButton = ({ isActive = false, size = 'default', className = '', ...props }) => (
	<button
		data-sidebar='menu-button'
		data-size={size}
		data-active={isActive}
		className={MENU_BUTTON_BASE + ' ' + className}
		{...props}
	/>
);

export const SidebarMenuBadge = ({ className = '', ...props }) => (
	<div data-sidebar='menu-badge' className={'absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none ' + className} {...props}/>
);

export const SidebarMenuSub = ({ className = '', ...props }) => (
	<ul data-sidebar='menu-sub' className={'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden ' + className} {...props}/>
);

export const SidebarMenuSubItem = ({ ...props }) => <li {...props}/>;

export const SidebarMenuSubButton = ({ isActive = false, size = 'md', className = '', children, ...props }) => (
	<a
		data-sidebar='menu-sub-button'
		data-size={size}
		data-active={isActive}
		className={'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 ' + (size === 'sm' ? 'text-xs' : 'text-sm') + ' ' + (isActive ? 'font-medium ' : '') + className}
		{...props}
	>
		{children}
	</a>
);

export const SidebarMenuSkeleton = ({ showIcon = false, className = '', ...props }) => (
	<div data-sidebar='menu-skeleton' className={'rounded-md h-8 flex gap-2 px-2 items-center ' + className} {...props}>
		{showIcon && <div className='size-4 rounded-md bg-sidebar-accent-foreground/10 shrink-0 animate-pulse'/>}
		<div className='h-4 max-w-[80%] flex-1 bg-sidebar-accent-foreground/10 rounded-full animate-pulse'/>
	</div>
);

export const SidebarRail = ({ className = '', ...props }) => {
	const { toggleSidebar } = useSidebar();
	return (
		<button
			data-sidebar='rail'
			aria-label='Toggle sidebar'
			tabIndex={-1}
			onClick={toggleSidebar}
			title='Toggle sidebar'
			className={'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 cursor-w-resize transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 sm:flex ' + className}
			{...props}
		/>
	);
};
