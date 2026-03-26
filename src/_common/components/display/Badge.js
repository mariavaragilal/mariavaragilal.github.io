import { cva } from 'class-variance-authority';
import { cn } from '../../../constants/utils/cn';

const badgeVariants = cva('inline-flex items-center rounded-full border font-semibold transition-colors', {
	variants: {
		variant: {
			default: 'border-transparent bg-primary text-primary-foreground',
			secondary: 'border-transparent bg-secondary/75 text-secondary-foreground',
			destructive: 'border-transparent bg-destructive text-destructive-foreground',
			outline: 'text-foreground border-foreground/20',
		},
		size: {
			default: 'px-2.5 py-0.5 text-xs',
			sm: 'px-1.5 py-0.25 text-[.625em]',
			lg: 'px-3 py-1 text-sm',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

export const Badge = ({ variant = 'default', size = 'default', className = '', ...props }) => (
	<div className={cn(badgeVariants({ variant, size }), className)} {...props}/>
);
