const BASE = 'border-l-4 border-primary pl-6';
const VARIANT_A = 'font-mono font-medium tracking-tight text-[clamp(1.4rem,2.5vw,1.75rem)] leading-tight text-foreground';
const VARIANT_B = 'text-[1em] leading-relaxed text-current/66';

export const Blockquote = ({ children, className = '' }) => (
	<blockquote className={BASE + ' ' + className}>
		{children}
	</blockquote>
);

export const BlockquoteMain = ({ children, className = '' }) => (
	<p className={VARIANT_A + ' mb-2 ' + className}>{children}</p>
);

export const BlockquoteSecondary = ({ children, className = '' }) => (
	<p className={VARIANT_B + ' ' + className}>{children}</p>
);
