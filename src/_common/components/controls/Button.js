import { cva } from 'class-variance-authority';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[readonly=true]:cursor-default [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 shrink-0 ' + focusRing, {
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground hover:bg-primary/90',
			destructive: 'bg-destructive text-white hover:bg-destructive/90',
			outline: 'border border-foreground/20 bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/66 hover:text-primary',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			link: 'text-primary underline-offset-4 hover:underline',
			primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
			inverse: 'bg-foreground/90 text-background hover:bg-foreground',
			card: 'bg-card text-card-foreground hover:bg-card/90',
		},
		size: {
			default: 'h-9 px-4 py-2',
			sm: 'h-8 gap-1.5 px-3',
			lg: 'h-10 px-6',
			icon: 'size-9',
			fab: 'size-12 rounded-full',
			label: 'px-5 py-2.5 text-[.8em] font-medium uppercase tracking-[0.18em]',
			unset: 'h-auto',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

export const Button = ({ variant = 'default', size = null, as: Component = 'button', className = '', readOnly, children, ...props }) => {
	const Comp = Component;
	const classes = cn(buttonVariants({ variant, size: size || 'default' }), className);
	return <Comp className={classes} data-readonly={readOnly} {...props}>{children}</Comp>;
};
