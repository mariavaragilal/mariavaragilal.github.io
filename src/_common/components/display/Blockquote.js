import { cn } from '../../../constants/utils/cn';

const BASE = 'text-center py-12 px-4 max-w-2xl mx-auto space-y-8';
const VARIANT_B = 'font-mono font-medium text-2xl leading-thighter tracking-tight flex-1';
const VARIANT_A = 'mb-1 text-xs uppercase tracking-[0.18em] font-semibold text-current/44';

export const Blockquote = ({ children, className = '' }) => (
	<blockquote className={cn(BASE, className)}>
		<span className='block text-primary/20 font-light text-3xl leading-1 not-italic' aria-hidden='true'>&mdash;</span>
		<div className='flex flex-col gap-1'>{children}</div>
		<span className='block text-primary/20 font-light text-3xl leading-1 not-italic' aria-hidden='true'>&mdash;</span>
	</blockquote>
);

export const BlockquoteMain = ({ children, className = '' }) => (
	<p className={cn(VARIANT_A, 'mb-1', className)}>{children}</p>
);

export const BlockquoteSecondary = ({ children, className = '' }) => (
	<p className={cn(VARIANT_B, className)}>{children}</p>
);
