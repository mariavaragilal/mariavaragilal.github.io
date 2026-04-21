import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../constants/utils/cn';
import { focusRing, srOnly } from '../../../constants/utils/a11y';

const LINK_CLASS = 'inline-flex items-center gap-1 font-mono text-editorial-eyebrow-sm text-current/88 hover:text-current hover:underline underline-offset-2 decoration-current/33 hover:decoration-current transition-colors ' + focusRing;
const LABEL_CLASS = 'mt-2 text-editorial-eyebrow-sm text-current/66 tracking-[0.1em] max-w-full select-text';

const MediaA11yContext = createContext({ opensNewTabLabel: undefined });

export const MediaA11yProvider = ({ opensNewTabLabel, children }) => (
	<MediaA11yContext.Provider value={{ opensNewTabLabel }}>{children}</MediaA11yContext.Provider>
);

const getHostname = (url) => {
	try { return new URL(url).hostname.replace('www.', ''); }
	catch { return url; }
};

export const MediaUrlLink = ({ url, opensNewTabLabel, className = '' }) => {
	const ctx = useContext(MediaA11yContext);
	const srLabel = opensNewTabLabel ?? ctx.opensNewTabLabel;
	if (!url) return null;
	return (
		<a href={url} target='_blank' rel='noopener noreferrer' className={cn(LINK_CLASS, className)}>
			<span className={LABEL_CLASS + ' hover:text-current/88'}>[{getHostname(url)}]</span>
			{srLabel ? <span className={srOnly}> {srLabel}</span> : null}
		</a>
	);
};

const VARIANT_CONFIG = {
	hero: { defaultRatio: '16.05 / 9', wrapperClass: 'w-full my-4' },
	annotated: { defaultRatio: '16.05 / 9', wrapperClass: 'w-full my-4' },
	strip: { defaultRatio: '16 / 8', wrapperClass: 'w-full my-4' },
	mobile: { defaultRatio: '9 / 16', wrapperClass: 'w-full my-4' },
};

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
	if (img?.caption && img.caption.trim()) return img.caption;
	if (img?.title && String(img.title).trim()) return String(img.title);
	if (img?.label && String(img.label).trim()) return String(img.label);
	return '';
};

const FADE_UP = {
	initial: { opacity: 0, y: 6 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, margin: '-40px' },
	transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
};

const BrowserChrome = ({ url }) => (
	<div className='flex shrink-0 min-w-0 items-center gap-2 px-3 py-2 bg-muted/60 border-b border-border/50' aria-hidden={url ? undefined : 'true'}>
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

const PlaceholderBody = ({ label, title }) => (
	<div className='absolute inset-0 flex flex-col items-center justify-center text-center gap-3 px-6 py-8 bg-muted/35'>
		{label ? <p className='text-editorial-eyebrow-sm text-current/66'>{label}</p> : null}
		{title ? <p className='font-mono text-[15px] md:text-[18px] leading-snug text-current max-w-[42rem]'>{title}</p> : null}
	</div>
);

const AspectRatioImageViewport = ({ viewportAspect, resolvedSrc, alt, objectPosition }) => {
	const viewportRef = useRef(null);
	const innerRef = useRef(null);
	const [needsScroll, setNeedsScroll] = useState(false);

	const measure = () => {
		const inner = innerRef.current;
		if (!inner) return;
		setNeedsScroll(inner.scrollHeight > inner.clientHeight + 0.5);
	};

	useLayoutEffect(() => {
		setNeedsScroll(false);
		const vp = viewportRef.current;
		if (!vp) return undefined;
		const ro = new ResizeObserver(() => {
			measure();
		});
		ro.observe(vp);
		measure();
		return () => {
			ro.disconnect();
		};
	}, [resolvedSrc, viewportAspect]);

	return (
		<div ref={viewportRef} className='relative w-full min-h-0 overflow-hidden' style={{ aspectRatio: viewportAspect }}>
			<div ref={innerRef} className={cn('absolute inset-0 overflow-x-hidden', needsScroll ? 'overflow-y-auto overscroll-y-contain' : 'overflow-y-hidden')}>
				<img src={resolvedSrc} alt={alt} loading='lazy' decoding='async' className='block h-auto w-full max-w-full min-w-0 shrink-0' style={{ objectPosition }} onLoad={measure} />
			</div>
		</div>
	);
};

export const Media = ({ image, variant = 'annotated', className = '', imageMap = {}, hideCaption = false, hideUrlLink = false, opensNewTabLabel }) => {
	const prefersReducedMotion = useReducedMotion();

	const img = typeof image === 'string' ? { src: image } : image;
	if (!img) return null;

	const hasSrc = !!img.src;
	const hasPlaceholderText = !!(img.label || img.title);
	if (!hasSrc && !hasPlaceholderText) return null;

	const resolvedSrc = hasSrc ? (imageMap[img.src] || img.src) : null;
	const cfg = VARIANT_CONFIG[variant] || VARIANT_CONFIG.annotated;
	const frame = img.frame ?? (variant === 'mobile' ? 'none' : 'browser');
	const showChrome = frame === 'browser';
	const scrollableBrowserViewport = showChrome && hasSrc;
	const explicitRatio = parseRatio(img.ratio);
	const ratioFramedImage = hasSrc && explicitRatio && !showChrome;
	const useAspectRatioBox = !hasSrc;
	const ratioForBox = explicitRatio || cfg.defaultRatio;
	const browserViewportRatio = scrollableBrowserViewport ? (explicitRatio || '16 / 9') : null;
	const objectPosition = img.objectPosition || 'top center';
	const figureClass = cn(cfg.wrapperClass, className, 'self-start');

	let figcaption = null;
	if (!hideCaption) {
		if (img.caption) figcaption = { kind: 'caption', text: img.caption };
		else if (img.label) figcaption = { kind: 'label', text: img.label };
		else if (hasSrc && img.alt && String(img.alt).trim() && !img.decorative) figcaption = { kind: 'label', text: String(img.alt).trim() };
	}

	const figcaptionClassCaption = 'mt-2 text-xs leading-5 text-current/77 tracking-[0.02em] max-w-sm select-text font-mono';
	const figcaptionClassLabel = 'mt-2 text-editorial-eyebrow-sm text-current/66 tracking-[0.1em] max-w-full select-text';

	return (
		<motion.figure
			{...FADE_UP}
			initial={prefersReducedMotion ? { opacity: 0 } : FADE_UP.initial}
			whileInView={prefersReducedMotion ? { opacity: 1 } : FADE_UP.whileInView}
			transition={prefersReducedMotion ? { duration: 0.2, ease: 'linear' } : FADE_UP.transition}
			className={figureClass}
		>
			<div className={cn('w-full min-w-0 flex flex-col justify-start overflow-hidden', showChrome ? 'rounded-lg border border-border/60' : 'rounded-lg')}>
				{showChrome ? <BrowserChrome url={img.url} /> : null}
				{scrollableBrowserViewport ? (
					<AspectRatioImageViewport key={'b-' + String(resolvedSrc) + '-' + String(browserViewportRatio)} viewportAspect={browserViewportRatio} resolvedSrc={resolvedSrc} alt={getImageAlt(img)} objectPosition={objectPosition} />
				) : ratioFramedImage ? (
					<AspectRatioImageViewport key={'r-' + String(resolvedSrc) + '-' + String(explicitRatio)} viewportAspect={explicitRatio} resolvedSrc={resolvedSrc} alt={getImageAlt(img)} objectPosition={objectPosition} />
				) : (
					<div
						className={cn('relative w-full min-h-0', useAspectRatioBox ? 'overflow-hidden' : '')}
						style={useAspectRatioBox ? { aspectRatio: ratioForBox } : undefined}
					>
						{hasSrc ? (
							<img src={resolvedSrc} alt={getImageAlt(img)} loading='lazy' decoding='async' className='block h-auto w-full max-w-full min-w-0 shrink-0' style={{ objectPosition }} />
						) : (
							<PlaceholderBody label={img.label} title={img.title} />
						)}
					</div>
				)}
			</div>
			{figcaption || (!hideUrlLink && img.url) ? (
				<figcaption className={cn('flex flex-wrap items-baseline gap-x-3 gap-y-1', figcaption ? (figcaption.kind === 'caption' ? figcaptionClassCaption : figcaptionClassLabel) : 'mt-2')}>
					{figcaption ? <span className={LABEL_CLASS}>{figcaption.text}</span> : null}
					{!hideUrlLink && img.url ? <MediaUrlLink url={img.url} opensNewTabLabel={opensNewTabLabel} /> : null}
				</figcaption>
			) : null}
		</motion.figure>
	);
};
