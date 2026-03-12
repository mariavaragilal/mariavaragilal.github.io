import { focusRing } from '../../../constants/utils/a11y';

const BASE = 'flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50 ' + focusRing;

export const Select = ({ children, className = '', ...props }) => (
	<select className={BASE + ' ' + className} {...props}>
		{children}
	</select>
);

export const SelectItem = ({ value, children, ...props }) => (
	<option value={value} {...props}>{children}</option>
);

export const SelectGroup = ({ label, children }) => (
	<optgroup label={label}>{children}</optgroup>
);
