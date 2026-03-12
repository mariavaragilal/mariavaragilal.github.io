const BASE = 'inline-flex items-center rounded-full border font-semibold transition-colors';
const SIZES = {
	default: 'px-2.5 py-0.5 text-xs',
	sm: 'px-1.5 py-0.25 text-[.625em]',
	lg: 'px-3 py-1 text-sm',
};
const VARIANTS = {
	default: 'border-transparent bg-primary text-primary-foreground',
	secondary: 'border-transparent bg-secondary/75 text-secondary-foreground',
	destructive: 'border-transparent bg-destructive text-destructive-foreground',
	outline: 'text-foreground border-foreground/20',
};

export const Badge = ({ variant = 'default', size = 'default', className = '', ...props }) => (
	<div className={BASE + ' ' + (SIZES[size] || SIZES.default) + ' ' + (VARIANTS[variant] || VARIANTS.default) + ' ' + className} {...props}/>
);
