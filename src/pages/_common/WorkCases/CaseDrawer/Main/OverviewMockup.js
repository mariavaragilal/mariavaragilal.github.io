import { useState } from 'react';
import { Carousel, CarouselCaption, CarouselContent, CarouselCounter, CarouselFooter, CarouselItem, CarouselNext, CarouselPrevious, Media, MediaUrlLink } from '../../../../../_common/components';
import { useTheme } from '../../../../../hooks/useTheme';

const CAPTION_CLASS = 'mt-2 text-xs leading-5 text-current/77 tracking-[0.02em] max-w-sm select-text font-mono';
const LABEL_CLASS = 'mt-2 text-editorial-eyebrow-sm text-current/66 tracking-[0.1em] max-w-full select-text';

const mockupWillRender = (image) => {
	if (!image || typeof image !== 'object') return false;
	return !!(image.src || image.label || image.title);
};

const OverviewMockupCaption = ({ image, labels }) => {
	const captionText = image?.caption || image?.label;
	if (!captionText && !image?.url) return null;
	const captionClassName = image?.caption ? CAPTION_CLASS : LABEL_CLASS;
	return (
		<div className='flex flex-wrap items-baseline gap-x-3 gap-y-1 min-w-0'>
			{captionText ? <p className={captionClassName}>{captionText}</p> : null}
			{image?.url ? <MediaUrlLink url={image.url} opensNewTabLabel={labels.opensNewTab} /> : null}
		</div>
	);
};

const OverviewMockupSlide = ({ image, imageMap, labels, preferDark, projectColor, hideCaption }) => {
	const { resolvedTheme } = useTheme();
	const [override, setOverride] = useState(null);
	const hasToggle = !!(image?.src && image?.srcDark);
	const defaultMode = preferDark && image?.srcDark ? 'dark' : (resolvedTheme === 'dark' ? 'dark' : 'light');
	const mode = override ?? defaultMode;
	const activeSrc = hasToggle && mode === 'dark' ? image.srcDark : image.src;
	const mediaImage = hasToggle ? { ...image, src: activeSrc, caption: undefined, label: undefined, alt: image.alt || image.caption || image.title || image.label } : image;
	const switchLabel = labels.themePreview || 'Preview theme';
	const stateLabel = mode === 'dark' ? (labels.darkMode || 'Dark mode') : (labels.lightMode || 'Light mode');
	const coverThemeToggle = hasToggle ? { mode, onCheckedChange: (next) => setOverride(next ? 'dark' : 'light'), switchLabel, stateLabel } : undefined;

	return (
		<Media image={mediaImage} imageMap={imageMap} variant='annotated' className='my-0' hideUrlLink={hasToggle} hideCaption={hideCaption} coverThemeToggle={coverThemeToggle} opensNewTabLabel={labels.opensNewTab} projectColor={projectColor}/>
	);
};

export const OverviewMockup = ({ image, imageMap, fallback, labels = {}, preferDark = false, projectColor }) => {
	const list = Array.isArray(image) ? image.filter(mockupWillRender) : (mockupWillRender(image) ? [image] : []);
	const resolvedFallback = fallback && (fallback.src || fallback.label || fallback.title) ? fallback : null;

	if (list.length === 0) {
		if (!resolvedFallback) return null;
		return <Media image={resolvedFallback} imageMap={imageMap} variant='annotated' className='my-0' opensNewTabLabel={labels.opensNewTab} projectColor={projectColor}/>;
	}

	if (list.length === 1) {
		const slide = list[0];
		const hasToggle = !!(slide.src && slide.srcDark);
		return (
			<div className='my-0'>
				<OverviewMockupSlide image={slide} imageMap={imageMap} labels={labels} preferDark={preferDark} projectColor={projectColor} hideCaption={hasToggle}/>
				{hasToggle ? <OverviewMockupCaption image={slide} labels={labels} /> : null}
			</div>
		);
	}

	const captions = list.map((img) => img.caption || img.label || '');
	return (
		<div className='my-0'>
			<Carousel navigationMode='step' controlLayout='inline' className='w-full min-w-0'>
				<CarouselContent>
					{list.map((slide, idx) => (
						<CarouselItem key={idx}>
							<OverviewMockupSlide image={slide} imageMap={imageMap} labels={labels} preferDark={preferDark} projectColor={projectColor} hideCaption={true}/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselFooter>
					<CarouselCaption captions={captions} />
					<div className='flex items-center justify-between gap-3 flex-wrap'>
						<CarouselPrevious aria-label='Previous mockup' />
						<CarouselCounter />
						<CarouselNext aria-label='Next mockup' />
					</div>
				</CarouselFooter>
			</Carousel>
		</div>
	);
};
