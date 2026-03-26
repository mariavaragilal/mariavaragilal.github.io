import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const ITEM = 'h-4 w-4 rounded-full border border-primary accent-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ' + focusRing;

export const RadioGroup = ({ className = '', ...props }) => (
	<div role='radiogroup' className={cn('grid gap-2', className)} {...props}/>
);

export const RadioGroupItem = ({ className = '', ...props }) => (
	<input type='radio' className={cn(ITEM, className)} {...props}/>
);
