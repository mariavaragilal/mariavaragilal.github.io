import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const BASE = 'flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ' + focusRing;

export const Select = ({ children, className = '', ...props }) => (
	<select className={cn(BASE, className)} {...props}>
		{children}
	</select>
);

export const SelectItem = ({ value, children, ...props }) => (
	<option value={value} {...props}>{children}</option>
);

export const SelectGroup = ({ label, children }) => (
	<optgroup label={label}>{children}</optgroup>
);
