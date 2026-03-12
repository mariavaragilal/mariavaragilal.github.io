import { useState, useRef, createContext, useContext } from 'react';
import { focusRing } from '../../../constants/utils/a11y';

const LIST = 'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground';
const TRIGGER_BASE = 'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all disabled:pointer-events-none disabled:opacity-50 ' + focusRing;
const TRIGGER_ACTIVE = 'bg-background text-foreground shadow';
const CONTENT = 'mt-2 ring-offset-background';

const TabsContext = createContext({ activeTab: '', handleChange: () => {} });

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

export const TabsTrigger = ({ value, className = '', disabled, children, ...props }) => {
	const { activeTab, handleChange } = useContext(TabsContext);
	const isActive = activeTab === value;
	return (
		<button
			role='tab'
			type='button'
			aria-selected={isActive}
			aria-controls={'tabpanel-' + value}
			id={'tab-' + value}
			disabled={disabled}
			tabIndex={isActive ? 0 : -1}
			className={TRIGGER_BASE + ' ' + (isActive ? TRIGGER_ACTIVE : '') + ' ' + className}
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
