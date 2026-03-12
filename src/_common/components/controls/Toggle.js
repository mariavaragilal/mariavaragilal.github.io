import { useState } from 'react';
import { focusRing } from '../../../constants/utils/a11y';

const BASE = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ' + focusRing;
const VARIANTS = {
	default: 'bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
	outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
};
const SIZES = {
	default: 'h-9 px-2 min-w-9',
	sm: 'h-8 px-1.5 min-w-8',
	lg: 'h-10 px-2.5 min-w-10',
};

export const Toggle = ({ pressed, defaultPressed, onPressedChange, variant = 'default', size = 'default', className = '', children, ...props }) => {
	const [internal, setInternal] = useState(defaultPressed || false);
	const isControlled = pressed !== undefined;
	const isPressed = isControlled ? pressed : internal;
	const handleClick = () => {
		if (!isControlled) setInternal(!isPressed);
		if (onPressedChange) onPressedChange(!isPressed);
	};
	return (
		<button
			type='button'
			aria-pressed={isPressed}
			data-state={isPressed ? 'on' : 'off'}
			className={BASE + ' ' + (VARIANTS[variant] || VARIANTS.default) + ' ' + (SIZES[size] || SIZES.default) + ' ' + className}
			onClick={handleClick}
			{...props}
		>
			{children}
		</button>
	);
};
