import { cva } from 'class-variance-authority';
import { cn } from '../../../constants/utils/cn';

const alertVariants = cva('relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-.125rem] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground', {
	variants: {
		variant: {
			default: 'bg-background text-foreground border-border',
			destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

const TITLE = 'mb-1 font-medium leading-none tracking-tight';
const DESCRIPTION = 'text-sm [&_p]:leading-relaxed';

export const Alert = ({ variant = 'default', role = 'alert', className = '', ...props }) => (
	<div role={role} className={cn(alertVariants({ variant }), className)} {...props} />
);

export const AlertTitle = ({ className = '', children, ...props }) => (
	<h5 className={cn(TITLE, className)} {...props}>{children}</h5>
);

export const AlertDescription = ({ className = '', ...props }) => (
	<div className={cn(DESCRIPTION, className)} {...props} />
);
