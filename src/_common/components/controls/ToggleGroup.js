import { useState, createContext, useContext } from 'react';
import { focusRing } from '../../../constants/utils/a11y';

const ITEM_BASE = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ' + focusRing;
const VARIANTS = {
	default: 'bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
	outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
};
const SIZES = {
	default: 'h-9 px-2 min-w-9',
	sm: 'h-8 px-1.5 min-w-8',
	lg: 'h-10 px-2.5 min-w-10',
};

const ToggleGroupContext = createContext({ type: 'single', value: null, onValueChange: () => {}, variant: 'default', size: 'default' });

export const ToggleGroup = ({ type = 'single', value, defaultValue, onValueChange, variant = 'default', size = 'default', className = '', children, ...props }) => {
	const [internal, setInternal] = useState(defaultValue || (type === 'multiple' ? [] : ''));
	const isControlled = value !== undefined;
	const activeValue = isControlled ? value : internal;

	const handleChange = (itemValue) => {
		let next;
		if (type === 'multiple') {
			const arr = Array.isArray(activeValue) ? activeValue : [];
			next = arr.includes(itemValue) ? arr.filter(v => v !== itemValue) : [...arr, itemValue];
		} else {
			next = activeValue === itemValue ? '' : itemValue;
		}
		if (!isControlled) setInternal(next);
		if (onValueChange) onValueChange(next);
	};

	return (
		<ToggleGroupContext.Provider value={{ type, value: activeValue, onValueChange: handleChange, variant, size }}>
			<div role='group' className={'flex items-center justify-center gap-1 ' + className} {...props}>{children}</div>
		</ToggleGroupContext.Provider>
	);
};

export const ToggleGroupItem = ({ value, className = '', children, variant: itemVariant, size: itemSize, ...props }) => {
	const { value: activeValue, onValueChange, variant, size, type } = useContext(ToggleGroupContext);
	const resolvedVariant = itemVariant || variant;
	const resolvedSize = itemSize || size;
	const isPressed = type === 'multiple'
		? Array.isArray(activeValue) && activeValue.includes(value)
		: activeValue === value;
	return (
		<button
			type='button'
			aria-pressed={isPressed}
			data-state={isPressed ? 'on' : 'off'}
			className={ITEM_BASE + ' ' + (VARIANTS[resolvedVariant] || VARIANTS.default) + ' ' + (SIZES[resolvedSize] || SIZES.default) + ' ' + className}
			onClick={() => onValueChange(value)}
			{...props}
		>
			{children}
		</button>
	);
};
