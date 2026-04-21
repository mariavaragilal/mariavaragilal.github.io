import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const BASE = 'flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ' + focusRing;

export const Input = ({ className = '', type = 'text', ...props }) => (
	<input type={type} className={cn(BASE, className)} {...props} />
);
