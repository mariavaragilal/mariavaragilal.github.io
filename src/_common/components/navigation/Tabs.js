import { useState, useRef, createContext, useContext } from 'react';
import { focusRing } from '../../../constants/utils/a11y';

const LIST = 'inline-flex h-9 items-center justify-center rounded-lg';
const TRIGGER_BASE = 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all disabled:pointer-events-none disabled:opacity-50 ' + focusRing;
const CONTENT = 'mt-2 ring-offset-background';

const TRIGGER_VARIANTS = {
	default: { active: 'bg-background text-foreground shadow', inactive: '' },
	underline: { active: 'border-b-2 border-current text-foreground shadow-none bg-transparent rounded-none', inactive: 'border-b-2 border-transparent text-current/66 rounded-none shadow-none bg-transparent' },
	outline: { active: 'border-b-2 border-border text-foreground shadow-none bg-transparent rounded-none', inactive: 'border-b-2 border-transparent text-current/66 rounded-none shadow-none bg-transparent' },
};

const BUTTON_VARIANTS = {
	default: 'bg-primary text-primary-foreground hover:bg-primary/90',
	destructive: 'bg-destructive text-white hover:bg-destructive/90',
	outline: 'border border-foreground/20 bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
	secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/66 hover:text-primary',
	ghost: 'hover:bg-accent hover:text-accent-foreground',
	link: 'text-primary underline-offset-4 hover:underline',
	primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
};

const TabsContext = createContext({ activeTab: '', handleChange: () => { } });

export const Tabs = ({ defaultValue, value: controlledValue, onValueChange, className = '', children, ...props }) => {
	const [internal, setInternal] = useState(defaultValue || '');
	const isControlled = controlledValue !== undefined;
	const activeTab = isControlled ? controlledValue : internal;

	const handleChange = (val) => {
		if (!isControlled) setInternal(val);
		if (onValueChange) onValueChange(val);
	};

	return (
		<TabsContext.Provider value={{ activeTab, handleChange }}>
			<div className={className} {...props}>{children}</div>
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
		<div ref={tabsRef} role='tablist' tabIndex={-1} className={LIST + ' ' + className} onKeyDown={handleKeyDown} {...props}>
			{children}
		</div>
	);
};

export const TabsTrigger = ({ value, variant = 'default', buttonVariant, className = '', disabled, children, ...props }) => {
	const { activeTab, handleChange } = useContext(TabsContext);
	const isActive = activeTab === value;
	const v = TRIGGER_VARIANTS[variant] || TRIGGER_VARIANTS.default;
	let activeClass = isActive ? v.active : v.inactive;
	if (buttonVariant && isActive && BUTTON_VARIANTS[buttonVariant]) activeClass = activeClass + ' ' + BUTTON_VARIANTS[buttonVariant];
	return (
		<button
			role='tab'
			type='button'
			aria-selected={isActive}
			aria-controls={'tabpanel-' + value}
			id={'tab-' + value}
			disabled={disabled}
			tabIndex={isActive ? 0 : -1}
			className={TRIGGER_BASE + ' ' + activeClass + ' ' + className}
			onClick={() => handleChange(value)}
			{...props}
		>
			{children}
		</button>
	);
};

export const TabsContent = ({ value, className = '', ...props }) => {
	const { activeTab } = useContext(TabsContext);
	return (
		<div
			role='tabpanel'
			id={'tabpanel-' + value}
			aria-labelledby={'tab-' + value}
			hidden={activeTab !== value}
			tabIndex={0}
			className={CONTENT + ' ' + className}
			{...props}
		/>
	);
};
