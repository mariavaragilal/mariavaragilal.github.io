const LIST = 'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5';
const ITEM = 'inline-flex items-center gap-1.5';
const LINK = 'transition-colors hover:text-foreground';
const PAGE = 'font-normal text-foreground';
const SEPARATOR = '[&>svg]:h-3.5 [&>svg]:w-3.5';
const ELLIPSIS = 'flex h-9 w-9 items-center justify-center';

export const Breadcrumb = ({ className = '', ...props }) => (
	<nav aria-label='breadcrumb' className={className} {...props}/>
);

export const BreadcrumbList = ({ className = '', ...props }) => (
	<ol className={LIST + ' ' + className} {...props}/>
);

export const BreadcrumbItem = ({ className = '', ...props }) => (
	<li className={ITEM + ' ' + className} {...props}/>
);

export const BreadcrumbLink = ({ className = '', href, children, ...props }) => (
	<a href={href} className={LINK + ' ' + className} {...props}>{children}</a>
);

export const BreadcrumbPage = ({ className = '', ...props }) => (
	<span aria-current='page' className={PAGE + ' ' + className} {...props}/>
);

export const BreadcrumbSeparator = ({ className = '', children, ...props }) => (
	<li role='presentation' aria-hidden='true' className={SEPARATOR + ' ' + className} {...props}>
		{children || <span aria-hidden='true'>/</span>}
	</li>
);

export const BreadcrumbEllipsis = ({ className = '', ...props }) => (
	<span role='presentation' aria-hidden='true' className={ELLIPSIS + ' ' + className} {...props}>
		<span aria-hidden='true'>…</span>
	</span>
);
