const BASE = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';

export const Label = ({ className = '', htmlFor, children, ...props }) => (
	<label htmlFor={htmlFor} className={BASE + ' ' + className} {...props}>{children}</label>
);
