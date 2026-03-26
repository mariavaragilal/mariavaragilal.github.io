import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const BASE = 'flex min-h-[60px] w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ' + focusRing;

export const Textarea = ({ className = '', ...props }) => (
	<textarea className={cn(BASE, className)} {...props}/>
);
