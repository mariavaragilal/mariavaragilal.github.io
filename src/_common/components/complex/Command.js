import { useState, createContext, useContext } from 'react';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const ROOT = 'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground';
const INPUT_WRAPPER = 'flex items-center border-b px-3';
const INPUT = 'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0';
const LIST = 'max-h-[300px] overflow-y-auto overflow-x-hidden';
const EMPTY = 'py-6 text-center text-sm text-muted-foreground';
const GROUP = 'overflow-hidden p-1 text-foreground';
const GROUP_HEADING = 'px-2 py-1.5 text-xs font-medium text-muted-foreground';
const ITEM_BASE = 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ' + focusRing;
const SEPARATOR = '-mx-1 h-px bg-border';
const SHORTCUT = 'ml-auto text-xs tracking-widest text-muted-foreground';

const CommandContext = createContext({ search: '', setSearch: () => {} });

export const Command = ({ className = '', children, ...props }) => {
	const [search, setSearch] = useState('');
	return (
		<CommandContext.Provider value={{ search, setSearch }}>
			<div role='combobox' aria-expanded='true' aria-haspopup='listbox' aria-controls='command-listbox' className={cn(ROOT, className)} {...props}>
				{children}
			</div>
		</CommandContext.Provider>
	);
};

export const CommandDialog = ({ open, onOpenChange, children }) => {
	const [search, setSearch] = useState('');
	if (!open) return null;
	return (
		<div className='fixed inset-0 z-50' role='dialog' aria-modal='true'>
			<button type='button' aria-label='Close' className='fixed inset-0 bg-black/50 cursor-default border-0 p-0' onClick={() => onOpenChange && onOpenChange(false)}/>
			<div className='fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border bg-popover shadow-lg'>
				<CommandContext.Provider value={{ search, setSearch }}>
					{children}
				</CommandContext.Provider>
			</div>
		</div>
	);
};

export const CommandInput = ({ className = '', placeholder, ...props }) => {
	const { search, setSearch } = useContext(CommandContext);
	return (
		<div className={INPUT_WRAPPER}>
			<span aria-hidden='true' className='mr-2 shrink-0 text-muted-foreground'>⌕</span>
			<input
				type='text'
				role='searchbox'
				aria-autocomplete='list'
				value={search}
				onChange={e => setSearch(e.target.value)}
				className={cn(INPUT, className)}
				placeholder={placeholder}
				{...props}
			/>
		</div>
	);
};

export const CommandList = ({ className = '', children, ...props }) => (
	<div id='command-listbox' role='listbox' className={cn(LIST, className)} {...props}>{children}</div>
);

export const CommandEmpty = ({ className = '', ...props }) => (
	<div className={cn(EMPTY, className)} {...props}/>
);

export const CommandGroup = ({ heading, className = '', children, ...props }) => (
	<div role='group' aria-label={heading} className={cn(GROUP, className)} {...props}>
		{heading && <div className={GROUP_HEADING}>{heading}</div>}
		{children}
	</div>
);

export const CommandItem = ({ onSelect, disabled, className = '', children, value, ...props }) => {
	const { search } = useContext(CommandContext);
	const strVal = value || (typeof children === 'string' ? children : '');
	const isMatch = !search || strVal.toLowerCase().includes(search.toLowerCase()) || (typeof children === 'string' && children.toLowerCase().includes(search.toLowerCase()));
	if (!isMatch) return null;
	return (
		<div
			role='option'
			aria-selected='false'
			data-disabled={disabled || undefined}
			className={cn(ITEM_BASE, className)}
			onClick={() => !disabled && onSelect && onSelect(value || '')}
			onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) { e.preventDefault(); onSelect && onSelect(value || ''); } }}
			tabIndex={disabled ? -1 : 0}
			{...props}
		>
			{children}
		</div>
	);
};

export const CommandSeparator = ({ className = '', ...props }) => (
	<div role='separator' className={cn(SEPARATOR, className)} {...props}/>
);

export const CommandShortcut = ({ className = '', ...props }) => (
	<span className={cn(SHORTCUT, className)} {...props}/>
);
