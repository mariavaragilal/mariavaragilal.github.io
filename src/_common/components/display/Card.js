import { createContext, useContext } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../constants/utils/cn';

const cardVariants = cva('flex flex-col rounded-lg', {
	variants: {
		variant: {
			default: 'bg-card text-card-foreground gap-x-6',
			secondary: 'bg-secondary/50 text-secondary-foreground',
			muted: 'bg-secondary/25 text-card-foreground border-border',
			inverse: 'bg-primary/5',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

const DEFAULT_PADDING = 'px-6';
const DEFAULT_HEADER_PADDING = 'pt-6 [.border-b]:pb-6';
const DEFAULT_CONTENT_PADDING = '[&:last-child]:pb-6';
const DEFAULT_FOOTER_PADDING = 'pb-6 [.border-t]:pt-6';
const HEADER_BASE = 'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 w-full';
const TITLE = 'leading-none font-medium tracking-tight';
const DESCRIPTION = 'text-current/66';
const CONTENT_BASE = '';
const FOOTER_BASE = 'flex items-center';
const ACTION = 'col-start-2 row-span-2 row-start-1 self-start justify-self-end';

const CardContext = createContext({
	padding: DEFAULT_PADDING,
	headerPadding: DEFAULT_HEADER_PADDING,
	contentPadding: DEFAULT_CONTENT_PADDING,
	footerPadding: DEFAULT_FOOTER_PADDING,
});

export const Card = ({ as: Tag = 'div', variant = 'default', padding = DEFAULT_PADDING, headerPadding = DEFAULT_HEADER_PADDING, contentPadding = DEFAULT_CONTENT_PADDING, footerPadding = DEFAULT_FOOTER_PADDING, className = '', children, ...props }) => (
	<CardContext.Provider value={{ padding, headerPadding, contentPadding, footerPadding }}>
		<Tag data-slot='card' className={cn(cardVariants({ variant }), className)} {...props}>{children}</Tag>
	</CardContext.Provider>
);

export const CardHeader = ({ className = '', headerPadding: headerPaddingProp, as: Tag = 'div', enableActionSlot = true, ...props }) => {
	const { padding, headerPadding: headerPaddingCtx } = useContext(CardContext);
	const headerPadding = headerPaddingProp !== undefined ? headerPaddingProp : headerPaddingCtx;
	const useHeaderPaddingOnly = headerPaddingProp !== undefined;
	return <Tag data-slot='card-header' className={cn(HEADER_BASE, enableActionSlot && 'has-data-[slot=card-action]:grid-cols-[1fr_auto]', useHeaderPaddingOnly ? headerPadding : padding + ' ' + headerPadding, className)} {...props} />;
};

export const CardTitle = ({ className = '', as: Tag = 'h4', children, ...props }) => (
	<Tag data-slot='card-title' className={cn(TITLE, className)} {...props}>{children}</Tag>
);

export const CardDescription = ({ className = '', ...props }) => (
	<p data-slot='card-description' className={cn(DESCRIPTION, className)} {...props} />
);

export const CardAction = ({ className = '', ...props }) => (
	<div data-slot='card-action' className={cn(ACTION, className)} {...props} />
);

export const CardContent = ({ className = '', customPadding = '', ...props }) => {
	const { padding, contentPadding } = useContext(CardContext);
	return <div data-slot='card-content' className={cn(CONTENT_BASE, customPadding ? customPadding : padding + ' ' + contentPadding, className)} {...props} />;
};

export const CardFooter = ({ className = '', ...props }) => {
	const { padding, footerPadding } = useContext(CardContext);
	return <div data-slot='card-footer' className={cn(FOOTER_BASE, padding, footerPadding, className)} {...props} />;
};

export const MetricCard = ({ value, label, className = '' }) => (
	<div className={cn('text-center flex flex-col gap-2', className)}>
		<div className='text-2xl md:text-3xl text-current'>{value}</div>
		<div className='text-[.75rem] text-current/66 uppercase tracking-[0.2em]'>{label}</div>
	</div>
);
