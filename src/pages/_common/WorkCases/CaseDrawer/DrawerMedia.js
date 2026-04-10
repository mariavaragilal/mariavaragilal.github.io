import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../../constants/utils/cn';

// ─── Variant config ───────────────────────────────────────────────────────────
const VARIANT_CONFIG = {
	hero: { defaultRatio: '16.05 / 9', wrapperClass: 'w-full my-4' },
	annotated: { defaultRatio: '16.05 / 9', wrapperClass: 'w-full my-4' },
	strip: { defaultRatio: '16 / 8', wrapperClass: 'w-full my-4' },
	mobile: { defaultRatio: '9 / 16', wrapperClass: 'w-full my-4' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const parseRatio = (ratio) => {
	if (!ratio) return null;
	if (typeof ratio === 'number') return String(ratio);
	const str = String(ratio).trim();
	if (/^[\d.]+\s*\/\s*[\d.]+$/.test(str)) return str;
	const normalized = str.replace(/\s*[/:]+\s*/g, ' / ');
	if (/^[\d.]+\s*\/\s*[\d.]+$/.test(normalized)) return normalized;
	return null;
};

const getImageAlt = (img) => {
	if (img?.decorative) return '';
	if (img?.alt && img.alt.trim()) return img.alt;
	if (img?.caption && img.caption.trim()) return 'Case study: ' + img.caption;
	return 'Product interface screenshot';
};

const FADE_UP = {
	initial: { opacity: 0, y: 6 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, margin: '-40px' },
	transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── Browser chrome bar ───────────────────────────────────────────────────────
const BrowserChrome = ({ url }) => (
	<div className='flex min-w-0 items-center gap-2 px-3 py-2 bg-muted/60 border-b border-border/50 shrink-0' aria-hidden={url ? undefined : 'true'}>
		<div className='flex gap-1.5'>
			<span className='w-2.5 h-2.5 rounded-full bg-current/55 ring-1 ring-current/20' />
			<span className='w-2.5 h-2.5 rounded-full bg-current/70 ring-1 ring-current/20' />
			<span className='w-2.5 h-2.5 rounded-full bg-current/85 ring-1 ring-current/20' />
		</div>
		{url ? (
			<div className='flex-1 min-w-0 mx-2 px-2 py-0.5 rounded bg-background/90 border border-border/50'>
				<span className='text-sm text-current font-mono tracking-tight truncate block'>{url}</span>
			</div>
		) : (
			<div className='flex-1 min-w-0 mx-2 h-4 rounded bg-background/70 border border-border/40' />
		)}
	</div>
);

// ─── Component ───────────────────────────────────────────────────────────────
export const DrawerMedia = ({ image, variant = 'annotated', className = '', caseImageMap = {} }) => {
	const prefersReducedMotion = useReducedMotion();

	const img = typeof image === 'string' ? { src: image } : image;
	if (!img?.src) return null;

	const resolvedSrc = caseImageMap[img.src] || img.src;

	const cfg = VARIANT_CONFIG[variant] || VARIANT_CONFIG.annotated;
	const frame = img.frame ?? (variant === 'mobile' ? 'none' : 'browser');
	const showChrome = frame === 'browser';
	const ratioValue = parseRatio(img.ratio);
	const objectPosition = img.objectPosition || 'top center';

	return (
		<motion.figure {...FADE_UP} initial={prefersReducedMotion ? { opacity: 0 } : FADE_UP.initial} whileInView={prefersReducedMotion ? { opacity: 1 } : FADE_UP.whileInView} transition={prefersReducedMotion ? { duration: 0.2, ease: 'linear' } : FADE_UP.transition} className={cn(cfg.wrapperClass, className)}>

			<div
				className={cn(
					'w-full min-w-0 flex flex-col overflow-hidden',
					showChrome ? 'rounded-lg border border-border/60 shadow-sm' : 'rounded-lg shadow-sm',
				)}
			>
				{showChrome ? <BrowserChrome url={img.url} /> : null}

				<div
					className='relative w-full overflow-hidden'
					style={ratioValue ? { aspectRatio: ratioValue } : undefined}
				>
					<img
						src={resolvedSrc}
						alt={getImageAlt(img)}
						loading='lazy'
						decoding='async'
						className='block w-full h-auto'
						style={{ objectPosition }}
					/>
				</div>
			</div>

			{img.caption ? (
				<figcaption className='mt-2 text-xs leading-5 text-current/77 tracking-[0.02em] max-w-sm select-text font-mono'>
					{img.caption}
				</figcaption>
			) : null}

		</motion.figure>
	);
};