import { useState, useRef, createContext, useContext, useId } from 'react';
import { cva } from 'class-variance-authority';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const LIST = 'inline-flex h-9 items-center justify-center rounded-lg gap-1 p-0.5';
const CONTENT = 'mt-2 ring-offset-background';

const tabsTriggerVariants = cva('inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all disabled:pointer-events-none disabled:opacity-50 ' + focusRing, {
	variants: {
		tabVariant: {
			default: '',
			underline: '',
			outline: '',
		},
		active: {
			true: '',
			false: '',
		},
	},
	compoundVariants: [
		{ tabVariant: 'default', active: true, class: 'bg-background text-foreground shadow' },
		{ tabVariant: 'default', active: false, class: '' },
		{ tabVariant: 'underline', active: true, class: 'border-b-2 border-current text-foreground shadow-none bg-transparent rounded-none' },
		{ tabVariant: 'underline', active: false, class: 'border-b-2 border-transparent text-current/66 rounded-none shadow-none bg-transparent' },
		{ tabVariant: 'outline', active: true, class: 'border-b-2 border-border text-foreground shadow-none bg-transparent rounded-none' },
		{ tabVariant: 'outline', active: false, class: 'border-b-2 border-transparent text-current/66 rounded-none shadow-none bg-transparent' },
	],
	defaultVariants: {
		tabVariant: 'default',
		active: false,
	},
});

const BUTTON_VARIANTS = {
	default: 'bg-primary text-primary-foreground hover:bg-primary/90',
	destructive: 'bg-destructive text-white hover:bg-destructive/90',
	outline: 'border border-foreground/20 bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
	secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/66 hover:text-primary',
	ghost: 'hover:bg-accent hover:text-accent-foreground',
	link: 'text-primary underline-offset-4 hover:underline',
	primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
};

const TabsContext = createContext({ activeTab: '', handleChange: () => { }, idPrefix: '' });

export const Tabs = ({ defaultValue, value: controlledValue, onValueChange, className = '', children, ...props }) => {
	const [internal, setInternal] = useState(defaultValue || '');
	const isControlled = controlledValue !== undefined;
	const activeTab = isControlled ? controlledValue : internal;
	const uid = useId();
	const idPrefix = 'tabs-' + uid.replace(/:/g, '');

	const handleChange = (val) => {
		if (!isControlled) setInternal(val);
		if (onValueChange) onValueChange(val);
	};

	return (
		<TabsContext.Provider value={{ activeTab, handleChange, idPrefix }}>
			<div className={cn(className)} {...props}>{children}</div>
		</TabsContext.Provider>
	);
};

export const TabsList = ({ className = '', children, ...props }) => {
	const tabsRef = useRef(null);

	const handleKeyDown = (e) => {
		const tabs = Array.from(tabsRef.current?.querySelectorAll('[role=\'tab\']:not([disabled])') || []);
		const idx = tabs.indexOf(document.activeElement);
		if (e.key === 'ArrowRight') { e.preventDefault(); tabs[(idx + 1) % tabs.length]?.focus(); }
		if (e.key === 'ArrowLeft') { e.preventDefault(); tabs[(idx - 1 + tabs.length) % tabs.length]?.focus(); }
		if (e.key === 'Home') { e.preventDefault(); tabs[0]?.focus(); }
		if (e.key === 'End') { e.preventDefault(); tabs[tabs.length - 1]?.focus(); }
	};

	return (
		<div ref={tabsRef} role='tablist' tabIndex={-1} className={cn(LIST, className)} onKeyDown={handleKeyDown} {...props}>
			{children}
		</div>
	);
};

export const TabsTrigger = ({ value, variant = 'default', buttonVariant, className = '', disabled, children, ...props }) => {
	const { activeTab, handleChange, idPrefix } = useContext(TabsContext);
	const isActive = activeTab === value;
	const tabVariantKey = variant === 'underline' || variant === 'outline' ? variant : 'default';
	const buttonExtra = buttonVariant && isActive && BUTTON_VARIANTS[buttonVariant] ? BUTTON_VARIANTS[buttonVariant] : '';
	const panelId = idPrefix + '-panel-' + value;
	const triggerId = idPrefix + '-tab-' + value;
	return (
		<button
			role='tab'
			type='button'
			aria-selected={isActive}
			aria-controls={panelId}
			id={triggerId}
			disabled={disabled}
			tabIndex={isActive ? 0 : -1}
			className={cn(tabsTriggerVariants({ tabVariant: tabVariantKey, active: isActive }), buttonExtra, className)}
			onClick={() => handleChange(value)}
			{...props}
		>
			{children}
		</button>
	);
};

export const TabsContent = ({ value, className = '', ...props }) => {
	const { activeTab, idPrefix } = useContext(TabsContext);
	const panelId = idPrefix + '-panel-' + value;
	const triggerId = idPrefix + '-tab-' + value;
	return (
		<div
			role='tabpanel'
			id={panelId}
			aria-labelledby={triggerId}
			hidden={activeTab !== value}
			tabIndex={0}
			className={cn(CONTENT, className)}
			{...props}
		/>
	);
};
