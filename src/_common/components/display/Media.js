import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../constants/utils/cn';
import { focusRing, srOnly } from '../../../constants/utils/a11y';
import { getHostname } from '../../../constants/utils/strings';
import { Switch } from '../forms/Switch';

// --- Constants ---

const COVER_NEUTRAL_BG = '#1e2029';
const COVER_SHELL_DEFAULT_RATIO = '4 / 3';
const COVER_CONTENT_DEFAULT_RATIO = '4 / 3';
const COVER_BROWSER_CHROME_HEIGHT = 28;

const VIDEO_MIME = {
	'.webm': 'video/webm',
	'.mp4': 'video/mp4',
	'.mov': 'video/quicktime',
	'.ogv': 'video/ogg',
};

const VARIANT_CONFIG = {
	hero: { defaultRatio: '16.05 / 9', wrapperClass: 'w-full my-4' },
	annotated: { defaultRatio: '16.05 / 9', wrapperClass: 'w-full my-4' },
	strip: { defaultRatio: '16 / 8', wrapperClass: 'w-full my-4' },
	mobile: { defaultRatio: '9 / 16', wrapperClass: 'w-full my-4' },
};

const FADE_UP = {
	initial: { opacity: 0, y: 6 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, margin: '-40px' },
	transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
};

const FADE_UP_REDUCED = {
	initial: { opacity: 0 },
	whileInView: { opacity: 1 },
	transition: { duration: 0.2, ease: 'linear' },
};

// --- Styles ---

const LINK_CLASS = [
	'inline-flex items-center gap-1',
	'font-mono text-editorial-eyebrow-sm',
	'text-current/88 hover:text-current',
	'hover:underline underline-offset-2',
	'decoration-current/33 hover:decoration-current',
	'transition-colors',
	focusRing,
].join(' ');

const LABEL_CLASS = 'mt-2 text-editorial-eyebrow-sm text-current/66 tracking-[0.1em] max-w-full select-text';
const CAPTION_CLASS = 'mt-2 text-xs leading-5 text-current/77 tracking-[0.02em] max-w-sm select-text font-mono';

// --- Context ---

const MediaA11yContext = createContext({ opensNewTabLabel: undefined });

export const MediaA11yProvider = ({ opensNewTabLabel, children }) => (
	<MediaA11yContext.Provider value={{ opensNewTabLabel }}>{children}</MediaA11yContext.Provider>
);

// --- Utilities ---

const resolveSrc = (key, map) => (key ? (map[key] || key) : null);

const isMediaFlag = (value) => value === true || value === 'true';

const parseRatio = (ratio) => {
	if (!ratio) return null;
	if (typeof ratio === 'number') return String(ratio);
	const str = String(ratio).trim();
	if (/^[\d.]+\s*\/\s*[\d.]+$/.test(str)) return str;
	const normalized = str.replace(/\s*[/:]+\s*/g, ' / ');
	if (/^[\d.]+\s*\/\s*[\d.]+$/.test(normalized)) return normalized;
	return null;
};

const ratioToNumber = (ratioStr) => {
	const parsed = parseRatio(ratioStr);
	if (!parsed) return 4 / 3;
	const parts = parsed.split('/').map((s) => parseFloat(s.trim()));
	if (parts.length !== 2 || !Number.isFinite(parts[0]) || !Number.isFinite(parts[1]) || parts[1] === 0) return 4 / 3;
	return parts[0] / parts[1];
};

const normalizeMediaFrame = (frame) => {
	if (frame == null || frame === '') return undefined;
	const f = String(frame).trim().toLowerCase();
	if (f === 'cover' || f === 'browser' || f === 'none') return f;
	return String(frame).trim();
};

const getImageAlt = (img) => {
	if (img?.decorative) return '';
	if (img?.alt && img.alt.trim()) return img.alt;
	if (img?.caption && img.caption.trim()) return img.caption;
	if (img?.title && String(img.title).trim()) return String(img.title);
	if (img?.label && String(img.label).trim()) return String(img.label);
	return '';
};

const parseCoverPadding = (value) => {
	if (value == null || value === '') return 0.1;
	const n = typeof value === 'number' ? value : parseFloat(String(value));
	if (!Number.isFinite(n) || n < 0) return 0.1;
	return Math.min(n, 0.4);
};

// --- Resolvers ---

const resolveBrowserFrame = (img, showBrowserFrame) => {
	if (isMediaFlag(showBrowserFrame)) return true;
	if (showBrowserFrame === false || showBrowserFrame === 'false') return false;
	if (isMediaFlag(img.browserFrame)) return true;
	if (img.browserFrame === false || img.browserFrame === 'false') return false;
	return false;
};

const resolveShowBrowserChrome = (img, variant, showBrowserFrame) => {
	const frame = normalizeMediaFrame(img.frame);
	if (frame === 'cover') return false;
	if (showBrowserFrame === false || showBrowserFrame === 'false') return false;
	if (img.browserFrame === false || img.browserFrame === 'false') return false;
	if (isMediaFlag(showBrowserFrame) || isMediaFlag(img.browserFrame)) return true;
	if (frame === 'browser' || img.frame === true) return true;
	if (frame === 'none' || img.frame === false) return false;
	return variant !== 'mobile';
};

const resolveCoverBackground = (img, projectColor) => {
	if (img.coverColor && String(img.coverColor).trim()) return String(img.coverColor).trim();
	if (img.coverUseProjectColor === false) return COVER_NEUTRAL_BG;
	if (projectColor && String(projectColor).trim()) return String(projectColor).trim();
	return COVER_NEUTRAL_BG;
};

const resolveCoverShellRatio = (img) => parseRatio(img.coverRatio) || COVER_SHELL_DEFAULT_RATIO;

const resolveCoverContentRatio = (img) => parseRatio(img.ratio) || COVER_CONTENT_DEFAULT_RATIO;

const resolveVideoSources = (img, map) => {
	if (Array.isArray(img.sources) && img.sources.length > 0) {
		return img.sources
			.map((s) => {
				if (!s || !s.src) return null;
				const resolved = resolveSrc(s.src, map);
				if (!resolved) return null;
				const ext = String(resolved).match(/\.[a-z0-9]+$/i)?.[0]?.toLowerCase();
				return { src: resolved, type: s.type || (ext ? VIDEO_MIME[ext] : undefined) };
			})
			.filter(Boolean);
	}
	if (!img.src) return [];
	const base = String(img.src);
	const knownExt = base.match(/\.(webm|mp4|mov|ogv)$/i);
	if (knownExt) {
		const resolved = resolveSrc(base, map);
		return resolved ? [{ src: resolved, type: VIDEO_MIME['.' + knownExt[1].toLowerCase()] }] : [];
	}
	return ['.webm', '.mp4']
		.map((ext) => {
			const resolved = map[base + ext];
			return resolved ? { src: resolved, type: VIDEO_MIME[ext] } : null;
		})
		.filter(Boolean);
};

// --- Sub-components ---

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

const BrowserChrome = ({ url, compact }) => (
	<div className={cn('flex shrink-0 min-w-0 items-center gap-2 bg-muted/60 border-b border-border/50', compact ? 'px-2 py-1' : 'px-3 py-2')} aria-hidden={url ? undefined : 'true'}>
		<div className={cn('flex', compact ? 'gap-1' : 'gap-1.5')}>
			<span className={cn('rounded-full bg-current/55 ring-1 ring-current/20', compact ? 'w-2 h-2' : 'w-2.5 h-2.5')} />
			<span className={cn('rounded-full bg-current/70 ring-1 ring-current/20', compact ? 'w-2 h-2' : 'w-2.5 h-2.5')} />
			<span className={cn('rounded-full bg-current/85 ring-1 ring-current/20', compact ? 'w-2 h-2' : 'w-2.5 h-2.5')} />
		</div>
		{url ? (
			<div className={cn('flex-1 min-w-0 rounded bg-background/90 border border-border/50', compact ? 'mx-1 px-1.5 py-px' : 'mx-2 px-2 py-0.5')}>
				<span className={cn('text-current font-mono tracking-tight truncate block', compact ? 'text-[11px] leading-4' : 'text-sm')}>{compact ? getHostname(url) : url}</span>
			</div>
		) : (
			<div className={cn('flex-1 min-w-0 rounded bg-background/70 border border-border/40', compact ? 'mx-1 h-3' : 'mx-2 h-4')} />
		)}
	</div>
);

const PlaceholderBody = ({ label, title }) => (
	<div className='absolute inset-0 flex flex-col items-center justify-center text-center gap-3 px-6 py-8 bg-muted/35'>
		{label ? <p className='text-editorial-eyebrow-sm text-current/66'>{label}</p> : null}
		{title ? <p className='font-mono text-[15px] md:text-[18px] leading-snug text-current max-w-[42rem]'>{title}</p> : null}
	</div>
);

const AspectRatioImageViewport = ({ viewportAspect, resolvedSrc, alt, objectPosition, className, style, fillParent }) => {
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

	const viewportStyle = fillParent ? { width: '100%', height: '100%', ...style } : { aspectRatio: viewportAspect, ...style };
	return (
		<div ref={viewportRef} className={cn('relative min-h-0 overflow-hidden', className)} style={viewportStyle}>
			<div ref={innerRef} className={cn('absolute inset-0 overflow-x-hidden', needsScroll ? 'overflow-y-auto overscroll-y-contain' : 'overflow-y-hidden')}>
				<img src={resolvedSrc} alt={alt} loading='lazy' decoding='async' className='block h-auto w-full max-w-full min-w-0 shrink-0' style={{ objectPosition }} onLoad={measure} />
			</div>
		</div>
	);
};

const VideoBody = ({ sources, poster, alt, objectPosition, prefersReducedMotion, controlsHint }) => {
	const ref = useRef(null);

	useEffect(() => {
		if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') return undefined;
		const video = ref.current;
		if (!video) return undefined;
		const io = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const p = video.play();
					if (p && typeof p.catch === 'function') p.catch(() => { });
				} else {
					video.pause();
				}
			});
		}, { threshold: 0.25 });
		io.observe(video);
		return () => io.disconnect();
	}, [prefersReducedMotion]);

	if (prefersReducedMotion && poster) {
		return <img src={poster} alt={alt} loading='lazy' decoding='async' className='block h-auto w-full max-w-full min-w-0 shrink-0' style={{ objectPosition }} />;
	}

	return (
		<video ref={ref} poster={poster || undefined} muted playsInline loop preload='metadata' autoPlay={!prefersReducedMotion} controls={prefersReducedMotion || !!controlsHint} aria-label={alt || undefined} className='block h-auto w-full max-w-full min-w-0 shrink-0' style={{ objectPosition }}>
			{sources.map((s, i) => <source key={i} src={s.src} type={s.type} />)}
		</video>
	);
};

const EmbedBody = ({ src, alt }) => (
	<iframe src={src} title={alt || 'Animated UI demo'} loading='lazy' sandbox='allow-scripts' referrerPolicy='no-referrer' className='block w-full h-full border-0' />
);

const CoverThemeToggle = ({ coverThemeToggle }) => {
	if (!coverThemeToggle) return null;
	const { mode, onCheckedChange, switchLabel, stateLabel } = coverThemeToggle;
	return (
		<div className='flex items-center gap-2' data-cover-theme-toggle=''>
			<span className='text-xs text-current/66 tracking-[0.02em] font-mono' aria-hidden='true'>{stateLabel}</span>
			<Switch checked={mode === 'dark'} onCheckedChange={onCheckedChange} aria-label={switchLabel} />
		</div>
	);
};

const CoverThemeToggleRow = ({ coverThemeToggle }) => {
	if (!coverThemeToggle) return null;
	return (
		<div className='absolute top-4 right-4 z-20' data-cover-theme-row=''>
			<CoverThemeToggle coverThemeToggle={coverThemeToggle} />
		</div>
	);
};

const CoverContentFrame = ({ contentRatio, resolvedSrc, alt, objectPosition, showBrowser, url }) => {
	const fitRef = useRef(null);
	const [boxSize, setBoxSize] = useState(null);

	const measureFit = () => {
		const el = fitRef.current;
		if (!el) return;
		const pw = el.clientWidth;
		const ph = el.clientHeight;
		if (pw <= 0 || ph <= 0) return;
		const chromeH = showBrowser ? COVER_BROWSER_CHROME_HEIGHT : 0;
		const ar = ratioToNumber(contentRatio);
		const availH = Math.max(0, ph - chromeH);
		let w = pw;
		let h = w / ar;
		if (h > availH) {
			h = availH;
			w = h * ar;
		}
		setBoxSize({ width: w, height: h });
	};

	useLayoutEffect(() => {
		setBoxSize(null);
		const el = fitRef.current;
		if (!el) return undefined;
		if (typeof ResizeObserver === 'undefined') {
			measureFit();
			return undefined;
		}
		const ro = new ResizeObserver(() => {
			measureFit();
		});
		ro.observe(el);
		measureFit();
		return () => {
			ro.disconnect();
		};
	}, [contentRatio, resolvedSrc, showBrowser]);

	const plainContentStyle = boxSize ? { width: boxSize.width, height: boxSize.height } : { aspectRatio: contentRatio, width: '100%', maxHeight: '100%' };
	const viewportStyle = boxSize ? { width: boxSize.width, height: boxSize.height } : undefined;
	const browserCardStyle = boxSize ? { width: boxSize.width, height: boxSize.height + COVER_BROWSER_CHROME_HEIGHT } : { width: '100%', height: '100%', maxHeight: '100%' };
	const coverContentClass = cn('relative shrink-0 overflow-hidden', showBrowser ? 'rounded-b-xl' : 'rounded-xl shadow-xl');
	const coverMediaClass = cn('relative min-h-0 shrink-0 overflow-hidden', showBrowser ? 'rounded-b-xl' : 'rounded-xl');

	return (
		<div ref={fitRef} className='relative z-10 h-full w-full max-h-full min-h-0 min-w-0 flex items-center justify-center'>
			{showBrowser ? (
				<div className='flex min-h-0 flex-col overflow-hidden rounded-lg border border-border/60 bg-background shadow-xl' data-cover-browser='' style={browserCardStyle}>
					<BrowserChrome url={url} compact={true} />
					<div className={coverContentClass} data-cover-content='' data-cover-content-ratio={contentRatio} style={boxSize ? { width: boxSize.width, height: boxSize.height } : undefined}>
						<div className={coverMediaClass} style={viewportStyle}>
							<AspectRatioImageViewport viewportAspect={contentRatio} resolvedSrc={resolvedSrc} alt={alt} objectPosition={objectPosition} fillParent={!!boxSize} className='rounded-b-xl' />
						</div>
					</div>
				</div>
			) : (
				<div className={coverContentClass} data-cover-content='' data-cover-content-ratio={contentRatio} style={plainContentStyle}>
					<div className={coverMediaClass} style={viewportStyle}>
						<AspectRatioImageViewport viewportAspect={contentRatio} resolvedSrc={resolvedSrc} alt={alt} objectPosition={objectPosition} fillParent={!!boxSize} className='rounded-xl' />
					</div>
				</div>
			)}
		</div>
	);
};

const CoverBody = ({ resolvedSrc, alt, backgroundColor, shellRatio, contentRatio, padding, objectPosition, label, title, hasSrc, showBrowser, url, coverThemeToggle }) => (
	<div className='relative w-full min-h-0 overflow-hidden flex items-center justify-center box-border' data-cover-shell='' data-cover-shell-ratio={shellRatio} style={{ aspectRatio: shellRatio, backgroundColor, padding: Math.round(padding * 100) + '%' }}>
		<CoverThemeToggleRow coverThemeToggle={coverThemeToggle} />
		{hasSrc ? (
			<CoverContentFrame contentRatio={contentRatio} resolvedSrc={resolvedSrc} alt={alt} objectPosition={objectPosition} showBrowser={showBrowser} url={url} />
		) : (
			<div className='relative z-10 flex flex-col items-center justify-center text-center gap-3 px-6 py-8 max-w-full'>
				{label ? <p className='text-editorial-eyebrow-sm text-white/66'>{label}</p> : null}
				{title ? <p className='font-mono text-[15px] md:text-[18px] leading-snug max-w-[42rem] text-white'>{title}</p> : null}
			</div>
		)}
	</div>
);

// --- Render helpers ---

const resolveImageBody = ({ img, cfg, resolvedSrc, alt, objectPosition, explicitRatio, showChrome, isCover, coverBackground, coverPadding, showCoverBrowser, coverThemeToggle }) => {
	const scrollableBrowserViewport = showChrome && !!img.src;
	const ratioFramedImage = !!img.src && explicitRatio && !showChrome && !isCover;
	const useAspectRatioBox = !img.src && !isCover;
	const ratioForBox = explicitRatio || cfg.defaultRatio;
	const browserViewportRatio = scrollableBrowserViewport ? (explicitRatio || '16 / 9') : null;

	if (isCover) {
		return (
			<CoverBody
				resolvedSrc={resolvedSrc}
				alt={alt}
				backgroundColor={coverBackground}
				shellRatio={resolveCoverShellRatio(img)}
				contentRatio={resolveCoverContentRatio(img)}
				padding={coverPadding}
				objectPosition={objectPosition}
				label={img.label}
				title={img.title}
				hasSrc={!!img.src}
				showBrowser={showCoverBrowser}
				url={img.url}
				coverThemeToggle={coverThemeToggle}
			/>
		);
	}

	if (scrollableBrowserViewport) {
		return <AspectRatioImageViewport key={'b-' + String(resolvedSrc) + '-' + String(browserViewportRatio)} viewportAspect={browserViewportRatio} resolvedSrc={resolvedSrc} alt={alt} objectPosition={objectPosition} />;
	}

	if (ratioFramedImage) {
		return <AspectRatioImageViewport key={'r-' + String(resolvedSrc) + '-' + String(explicitRatio)} viewportAspect={explicitRatio} resolvedSrc={resolvedSrc} alt={alt} objectPosition={objectPosition} />;
	}

	return (
		<div className={cn('relative w-full min-h-0', useAspectRatioBox ? 'overflow-hidden' : '')} style={useAspectRatioBox ? { aspectRatio: ratioForBox } : undefined}>
			{img.src ? (
				<img src={resolvedSrc} alt={alt} loading='lazy' decoding='async' className='block h-auto w-full max-w-full min-w-0 shrink-0' style={{ objectPosition }} />
			) : (
				<PlaceholderBody label={img.label} title={img.title} />
			)}
		</div>
	);
};

const resolveFigcaption = (img, hasSrc, hasVideoSources, hideCaption) => {
	if (hideCaption) return null;
	if (img.caption) return { kind: 'caption', text: img.caption };
	if (img.label) return { kind: 'label', text: img.label };
	if ((hasSrc || hasVideoSources) && img.alt && String(img.alt).trim() && !img.decorative) return { kind: 'label', text: String(img.alt).trim() };
	return null;
};

// --- Main export ---

export const Media = ({ image, variant = 'annotated', className = '', imageMap = {}, hideCaption = false, hideUrlLink = false, opensNewTabLabel, showBrowserFrame, projectColor, coverThemeToggle }) => {
	const prefersReducedMotion = useReducedMotion();

	const img = typeof image === 'string' ? { src: image } : image;
	if (!img) return null;

	const mediaType = img.type === 'video' || img.type === 'embed' ? img.type : 'image';
	const hasSrc = !!img.src;
	const hasPlaceholderText = !!(img.label || img.title);
	const videoSources = mediaType === 'video' ? resolveVideoSources(img, imageMap) : [];
	const hasVideoSources = videoSources.length > 0;

	if (mediaType === 'image' && !hasSrc && !hasPlaceholderText) return null;
	if (mediaType === 'video' && !hasVideoSources) return null;
	if (mediaType === 'embed' && !hasSrc) return null;

	const resolvedSrc = hasSrc ? resolveSrc(img.src, imageMap) : null;
	const resolvedPoster = img.poster ? resolveSrc(img.poster, imageMap) : null;
	const cfg = VARIANT_CONFIG[variant] || VARIANT_CONFIG.annotated;
	const mediaFrame = normalizeMediaFrame(img.frame);
	const isCover = mediaFrame === 'cover';
	const showChrome = resolveShowBrowserChrome(img, variant, showBrowserFrame);
	const showCoverBrowser = isCover ? resolveBrowserFrame(img, showBrowserFrame) : false;
	const explicitRatio = parseRatio(img.ratio);
	const coverBackground = isCover ? resolveCoverBackground(img, projectColor) : null;
	const coverPadding = isCover ? parseCoverPadding(img.coverPadding) : null;
	const objectPosition = img.objectPosition || 'top center';
	const alt = getImageAlt(img);
	const figureClass = cn(cfg.wrapperClass, className, 'self-start max-w-full min-w-0');

	let body;
	if (mediaType === 'video') {
		const ratio = explicitRatio || (showChrome ? '16 / 9' : cfg.defaultRatio);
		body = (
			<div className='relative w-full min-h-0 overflow-hidden bg-muted/20' style={{ aspectRatio: ratio }}>
				<VideoBody sources={videoSources} poster={resolvedPoster} alt={alt} objectPosition={objectPosition} prefersReducedMotion={prefersReducedMotion} controlsHint={img.controls} />
			</div>
		);
	} else if (mediaType === 'embed') {
		const ratio = explicitRatio || (showChrome ? '16 / 9' : cfg.defaultRatio);
		body = (
			<div className='relative w-full min-h-0 overflow-hidden bg-muted/20' style={{ aspectRatio: ratio }}>
				<EmbedBody src={resolvedSrc} alt={alt} />
			</div>
		);
	} else {
		body = resolveImageBody({ img, cfg, resolvedSrc, alt, objectPosition, explicitRatio, showChrome, isCover, coverBackground, coverPadding, showCoverBrowser, coverThemeToggle: isCover ? coverThemeToggle : undefined });
	}

	const figcaption = resolveFigcaption(img, hasSrc, hasVideoSources, hideCaption);
	const hasMeta = figcaption || (!hideUrlLink && img.url);
	const motionProps = prefersReducedMotion ? { ...FADE_UP_REDUCED, viewport: FADE_UP.viewport } : FADE_UP;

	return (
		<motion.figure {...motionProps} className={figureClass}>
			<div className={cn('w-full min-w-0 flex flex-col justify-start overflow-hidden rounded-lg', showChrome ? 'border border-border/60' : '')}>
				{showChrome ? <BrowserChrome url={img.url} /> : null}
				{body}
			</div>
			{hasMeta ? (
				<figcaption className={cn('flex flex-wrap items-baseline gap-x-3 gap-y-1', figcaption ? (figcaption.kind === 'caption' ? CAPTION_CLASS : LABEL_CLASS) : 'mt-2')}>
					{figcaption ? <span className={LABEL_CLASS}>{figcaption.text}</span> : null}
					{!hideUrlLink && img.url ? <MediaUrlLink url={img.url} opensNewTabLabel={opensNewTabLabel} /> : null}
				</figcaption>
			) : null}
		</motion.figure>
	);
};
