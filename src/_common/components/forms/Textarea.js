import { focusRing } from '../../../constants/utils/a11y';

const BASE = 'flex min-h-[60px] w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ' + focusRing;

export const Textarea = ({ className = '', ...props }) => (
	<textarea className={BASE + ' ' + className} {...props}/>
);
