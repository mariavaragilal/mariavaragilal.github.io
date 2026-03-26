import { cn } from '../../../constants/utils/cn';

const BASE = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';

export const Label = ({ className = '', htmlFor, children, ...props }) => (
	<label htmlFor={htmlFor} className={cn(BASE, className)} {...props}>{children}</label>
);
