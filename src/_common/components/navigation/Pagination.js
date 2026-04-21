import { cva } from 'class-variance-authority';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const LINK_BASE = 'inline-flex items-center justify-center gap-1 rounded-md border border-transparent text-sm font-medium h-9 min-w-9 px-3 transition-colors hover:bg-accent hover:text-accent-foreground ' + focusRing;

const paginationLinkVariants = cva(LINK_BASE, {
	variants: {
		isActive: {
			true: 'border-border bg-background',
			false: '',
		},
	},
	defaultVariants: {
		isActive: false,
	},
});

export const Pagination = ({ className = '', ...props }) => (
	<nav role='navigation' aria-label='pagination' className={className} {...props} />
);

export const PaginationContent = ({ className = '', ...props }) => (
	<ul className={cn('flex flex-row items-center gap-1', className)} {...props} />
);

export const PaginationItem = ({ className = '', ...props }) => (
	<li className={className} {...props} />
);

export const PaginationLink = ({ isActive = false, className = '', href, children, ...props }) => (
	<a
		href={href}
		aria-current={isActive ? 'page' : undefined}
		className={cn(paginationLinkVariants({ isActive }), className)}
		{...props}
	>{children}</a>
);

export const PaginationPrevious = ({ className = '', href, ...props }) => (
	<a href={href} aria-label='Go to previous page' className={cn(LINK_BASE, 'gap-1 pl-2.5', className)} {...props}>
		<span aria-hidden='true'>←</span>
		<span>Previous</span>
	</a>
);

export const PaginationNext = ({ className = '', href, ...props }) => (
	<a href={href} aria-label='Go to next page' className={cn(LINK_BASE, 'gap-1 pr-2.5', className)} {...props}>
		<span>Next</span>
		<span aria-hidden='true'>→</span>
	</a>
);

export const PaginationEllipsis = ({ className = '', ...props }) => (
	<span aria-hidden='true' className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>…</span>
);
