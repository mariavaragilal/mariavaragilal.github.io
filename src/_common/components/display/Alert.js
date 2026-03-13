const BASE = 'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-.125rem] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground';
const VARIANTS = {
	default: 'bg-background text-foreground border-border',
	destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
};

const TITLE = 'mb-1 font-medium leading-none tracking-tight';
const DESCRIPTION = 'text-sm [&_p]:leading-relaxed';

export const Alert = ({ variant = 'default', role = 'alert', className = '', ...props }) => (
	<div role={role} className={BASE + ' ' + (VARIANTS[variant] || VARIANTS.default) + ' ' + className} {...props} />
);

export const AlertTitle = ({ className = '', children, ...props }) => (
	<h5 className={TITLE + ' ' + className} {...props}>{children}</h5>
);

export const AlertDescription = ({ className = '', ...props }) => (
	<div className={DESCRIPTION + ' ' + className} {...props} />
);
