import React from 'react';
import { Carousel, CarouselCaption, CarouselContent, CarouselCounter, CarouselFooter, CarouselItem, CarouselNext, CarouselPrevious, Media } from '../../../../../../_common/components';
import { ChapterBand, EditorialHeading, formatChapterKicker } from '../_common/CaseChapter';
import { CASE_IMAGES } from '../_common/caseImages';
import { RichText } from '../../../../RichText';
import { cn } from '../../../../../../constants/utils/cn';
import { getProjectKickerStyle } from '../../../../../../constants/utils/colorContrast';

const hasProse = (block) => !!(block && (block.heading || block.description || (block.items && block.items.length > 0)));

const isLegacyImageOnlyBlock = (block) => !!(block && block.image && !hasProse(block));

const isImagesArrayOnlyBlock = (block) =>
	!!(
		block &&
		!hasProse(block) &&
		Array.isArray(block.images) &&
		block.images.length > 0
	);

const isImageOnlyBlock = (block) => isLegacyImageOnlyBlock(block) || isImagesArrayOnlyBlock(block);

const normalizeImplementationImage = (image) => {
	if (image == null) return null;
	if (typeof image === 'string') return { src: image };
	if (typeof image !== 'object') return null;
	const img = { ...image };
	if (img._src && !img.src) img.src = img._src;
	return img;
};

const implementationImageWillRender = (image) => {
	const img = normalizeImplementationImage(image);
	if (!img) return false;
	return Boolean(img.src || img.label || img.title);
};

const ImplementationScreensCarousel = ({ images, defaultRatio }) => {
	const def = typeof defaultRatio === 'string' && defaultRatio.trim() ? defaultRatio.trim() : null;
	const list = (Array.isArray(images) ? images : [])
		.filter(implementationImageWillRender)
		.map((raw) => {
			const n = normalizeImplementationImage(raw);
			if (def && (n.ratio == null || String(n.ratio).trim() === '')) n.ratio = def;
			return n;
		});
	if (list.length === 0) return null;
	if (list.length === 1) {
		return (
			<div className='col-span-full w-full min-w-0'>
				<Media image={list[0]} imageMap={CASE_IMAGES} variant='strip' className='mb-4 mt-0' />
			</div>
		);
	}
	const captions = list.map((img) => img.caption || img.label || (img.alt && !img.decorative ? String(img.alt).trim() : ''));
	return (
		<Carousel navigationMode='step' controlLayout='inline' className='col-span-full w-full min-w-0'>
			<CarouselContent>
				{list.map((img, idx) => (
					<CarouselItem key={idx}>
						<Media image={img} imageMap={CASE_IMAGES} variant='strip' className='my-0' hideCaption />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselFooter>
				<CarouselCaption captions={captions} />
				<div className='flex items-center justify-between gap-3 flex-wrap'>
					<CarouselPrevious aria-label='Previous screen' />
					<CarouselCounter />
					<CarouselNext aria-label='Next screen' />
				</div>
			</CarouselFooter>
		</Carousel>
	);
};

const ImplementationBlock = ({ block, showImages }) => (
	<div className='min-w-0 space-y-2'>
		{showImages && block.image ? <Media image={normalizeImplementationImage(block.image)} imageMap={CASE_IMAGES} variant='strip' className='mb-4 mt-0' /> : null}
		{block.heading ? <RichText as='p' className='font-mono font-medium text-base text-current break-words' text={block.heading} /> : null}
		{block.description ? <RichText as='p' className='text-sm leading-relaxed text-current/88 break-words' text={block.description} /> : null}
		{block.items?.length > 0 ? (
			<ul className='space-y-1 text-sm leading-relaxed text-current/88 mt-1'>
				{block.items.map((item, j) => (
					<li key={j} className='flex min-w-0 gap-2'>
						<span className='text-current/80 shrink-0'>—</span>
						<RichText as='span' className='min-w-0 break-words' text={item} />
					</li>
				))}
			</ul>
		) : null}
	</div>
);

const gridClassForProseCount = (n) => {
	if (n <= 1) return 'grid-cols-1';
	if (n === 2) return 'grid-cols-1 md:grid-cols-2';
	return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
};

const ImplementationColumn = ({ blocks, title, onAccent, showImages = true, className = '' }) => {
	if (!blocks?.length) return null;
	const titleClass = onAccent ? 'text-current/90' : 'text-current/66';
	const segments = [];
	let imageBuffer = [];
	let carouselId = 0;

	const flushImages = () => {
		if (imageBuffer.length === 0) return;
		const imgs = imageBuffer
			.map((b) => normalizeImplementationImage(b.image))
			.filter(implementationImageWillRender);
		imageBuffer = [];
		if (imgs.length === 0) return;
		const k = 'impl-screens-' + carouselId;
		carouselId += 1;
		segments.push({ type: 'screens', key: k, images: imgs });
	};

	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		if (!showImages && isImageOnlyBlock(block)) continue;
		if (isImagesArrayOnlyBlock(block)) {
			flushImages();
			const imgs = block.images.filter(implementationImageWillRender).map(normalizeImplementationImage);
			if (imgs.length > 0) {
				const k = 'impl-screens-' + carouselId;
				carouselId += 1;
				const defaultRatio = typeof block.ratio === 'string' && block.ratio.trim() ? block.ratio.trim() : undefined;
				segments.push({ type: 'screens', key: k, images: imgs, defaultRatio });
			}
			continue;
		}
		if (isLegacyImageOnlyBlock(block)) imageBuffer.push(block);
		else {
			flushImages();
			segments.push({ type: 'prose', key: 'impl-block-' + i, block });
		}
	}
	flushImages();

	const proseCount = segments.filter((s) => s.type === 'prose').length;
	const gridCols = gridClassForProseCount(proseCount);

	return (
		<div className={cn('min-w-0 w-full', className)}>
			{title ? <RichText as='p' className={cn('text-editorial-eyebrow-sm mb-4', titleClass)} text={title} /> : null}
			<div className={cn('grid max-w-full min-w-0 gap-6 md:gap-8', gridCols)}>
				{segments.map((seg) => {
					if (seg.type === 'prose') {
						return <ImplementationBlock key={seg.key} block={seg.block} showImages={showImages} />;
					}
					return <ImplementationScreensCarousel key={seg.key} images={seg.images} defaultRatio={seg.defaultRatio} />;
				})}
			</div>
		</div>
	);
};

const TWO_COL_GRID = 'grid w-full min-w-0 gap-6 2xl:gap-8 grid-cols-1 lg:grid-cols-2';

export const isImplementationVisible = (caseStudy) => {
	const impl = caseStudy.implementation;
	const hasDesign = impl?.design?.length > 0;
	const hasCode = impl?.code?.length > 0;
	const car = impl?.carousel;
	const hasTopScreens = Array.isArray(car?.images) && car.images.length > 0;
	return Boolean(impl && (hasDesign || hasCode || hasTopScreens));
};

export const Implementation = ({ caseStudy, labels, projectColor, sectionNumbers }) => {
	if (!isImplementationVisible(caseStudy)) return null;
	const impl = caseStudy.implementation;
	const hasDesign = impl?.design?.length > 0;
	const hasCode = impl?.code?.length > 0;
	const car = impl?.carousel;
	const hasTopScreens = Array.isArray(car?.images) && car.images.length > 0;
	const topScreensDefaultRatio = typeof car?.ratio === 'string' && car.ratio.trim() ? car.ratio.trim() : undefined;
	const onAccent = !!projectColor;
	const singleEach = hasDesign && hasCode && impl.design.length === 1 && impl.code.length === 1;
	return (
		<ChapterBand variant='accent' projectColor={projectColor} className='px-6 sm:px-12 lg:px-16'>
			<EditorialHeading
				eyebrow={formatChapterKicker(impl.eyebrow || labels.implementation || 'Implementation', sectionNumbers.implementation)}
				title={impl.title}
				onAccent={onAccent}
				eyebrowStyle={getProjectKickerStyle(projectColor, true)}
			>
				{hasTopScreens ? (
					<div className='w-full min-w-0 mb-6 md:mb-8'>
						<ImplementationScreensCarousel images={car.images} defaultRatio={topScreensDefaultRatio} />
					</div>
				) : null}
				{singleEach ? (
					<div className={TWO_COL_GRID}>
						<ImplementationColumn blocks={impl.design} title={labels.implementationDesign || 'Design'} onAccent={onAccent} showImages={true} />
						<ImplementationColumn blocks={impl.code} title={labels.implementationCode || 'Code'} onAccent={onAccent} showImages={false} />
					</div>
				) : (
					<React.Fragment>
						{hasDesign ? <ImplementationColumn blocks={impl.design} title={labels.implementationDesign || 'Design'} onAccent={onAccent} showImages={true} className={hasCode ? 'mb-8' : ''} /> : null}
						{hasCode ? <ImplementationColumn blocks={impl.code} title={labels.implementationCode || 'Code'} onAccent={onAccent} showImages={false} /> : null}
					</React.Fragment>
				)}
			</EditorialHeading>
		</ChapterBand>
	);
};
