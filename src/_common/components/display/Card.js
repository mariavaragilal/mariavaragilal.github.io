import { createContext, useContext } from 'react';

const CARD_BASE = 'flex flex-col rounded-lg ';
const CARD_VARIANTS = {
	default: 'bg-card text-card-foreground gap-x-6',
	secondary: 'bg-secondary/50 text-secondary-foreground',
	muted: 'bg-secondary/25 text-card-foreground border-border',
};
const DEFAULT_PADDING = 'px-6';
const DEFAULT_HEADER_PADDING = 'pt-6 [.border-b]:pb-6';
const DEFAULT_CONTENT_PADDING = '[&:last-child]:pb-6';
const DEFAULT_FOOTER_PADDING = 'pb-6 [.border-t]:pt-6';
const HEADER_BASE = 'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 w-full has-data-[slot=card-action]:grid-cols-[1fr_auto]';
const TITLE = 'leading-none font-semibold tracking-tight';
const DESCRIPTION = 'text-sm text-current/66';
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
		<Tag data-slot='card' className={CARD_BASE + ' ' + (CARD_VARIANTS[variant] || CARD_VARIANTS.default) + ' ' + className} {...props}>{children}</Tag>
	</CardContext.Provider>
);

export const CardHeader = ({ className = '', headerPadding: headerPaddingProp, ...props }) => {
	const { padding, headerPadding: headerPaddingCtx } = useContext(CardContext);
	const headerPadding = headerPaddingProp !== undefined ? headerPaddingProp : headerPaddingCtx;
	const useHeaderPaddingOnly = headerPaddingProp !== undefined;
	return <div data-slot='card-header' className={HEADER_BASE + ' ' + (useHeaderPaddingOnly ? headerPadding : padding + ' ' + headerPadding) + ' ' + className} {...props} />;
};

export const CardTitle = ({ className = '', children, ...props }) => (
	<h4 data-slot='card-title' className={TITLE + ' ' + className} {...props}>{children}</h4>
);

export const CardDescription = ({ className = '', ...props }) => (
	<p data-slot='card-description' className={DESCRIPTION + ' ' + className} {...props} />
);

export const CardAction = ({ className = '', ...props }) => (
	<div data-slot='card-action' className={ACTION + ' ' + className} {...props} />
);

export const CardContent = ({ className = '', ...props }) => {
	const { padding, contentPadding } = useContext(CardContext);
	return <div data-slot='card-content' className={CONTENT_BASE + ' ' + padding + ' ' + contentPadding + ' ' + className} {...props} />;
};

export const CardFooter = ({ className = '', ...props }) => {
	const { padding, footerPadding } = useContext(CardContext);
	return <div data-slot='card-footer' className={FOOTER_BASE + ' ' + padding + ' ' + footerPadding + ' ' + className} {...props} />;
};

export const MetricCard = ({ value, label, className = '' }) => (
	<div className={'text-center flex flex-col gap-2 ' + className}>
		<div className='text-2xl md:text-3xl text-current'>{value}</div>
		<div className='text-[.75rem] text-current/66 uppercase tracking-[0.2em]'>{label}</div>
	</div>
);
