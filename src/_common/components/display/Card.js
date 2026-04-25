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
			ghost: 'bg-transparent border border-border',
			transparent: 'bg-transparent',
			paper: 'bg-transparent',
			soft: 'bg-secondary/25 text-card-foreground border-border',
			accent: 'bg-secondary/50 text-secondary-foreground',
			ink: 'bg-foreground text-background border-transparent',
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
const DESCRIPTION = 'text-current/66 mb-2';
const CONTENT_BASE = '';
const FOOTER_BASE = 'flex items-center';
const ACTION = 'col-start-2 row-span-2 row-start-1 self-start justify-self-end';

const IMAGE_BASE = 'w-full overflow-hidden rounded-lg border border-border/60';
const LOGOMARK_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' shape-rendering='crispEdges' fill='%23d655ad'><rect x='1' y='1' width='8' height='2'/><rect x='1' y='4' width='8' height='2'/><rect x='1' y='6' width='2' height='1'/><rect x='7' y='6' width='2' height='1'/><rect x='1' y='7' width='8' height='2'/></svg>`;
const PLACEHOLDER_PATTERN = {
	backgroundColor: 'color-mix(in oklab, var(--color-secondary) 35%, transparent)',
	backgroundImage: `url("data:image/svg+xml;utf8,${LOGOMARK_SVG}")`,
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	backgroundSize: '96px 96px',
};

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

export const CardImage = ({ className = '', src, alt = '', aspectRatio = '16 / 9', imgClassName = '', loading = 'lazy', decoding = 'async', style, ...props }) => {
	const hasSrc = !!src;
	return (
		<div data-slot='card-image' className={cn(IMAGE_BASE, className)} style={{ aspectRatio, ...(hasSrc ? null : PLACEHOLDER_PATTERN), ...style }} aria-label={!hasSrc && alt ? alt : undefined} role={!hasSrc ? 'img' : undefined} {...props} >
			{hasSrc ? (
				<img
					src={src}
					alt={alt}
					loading={loading}
					decoding={decoding}
					className={cn('block w-full h-full object-cover object-top', imgClassName)}
				/>
			) : null}
		</div>
	);
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
