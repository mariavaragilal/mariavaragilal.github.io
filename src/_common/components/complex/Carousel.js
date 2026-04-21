import { useState, useRef, useCallback, useEffect, useLayoutEffect, createContext, useContext, Children } from 'react';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';
import { Button } from '../controls/Button';

const BTN = 'absolute h-8 w-8 inline-flex items-center justify-center rounded-full border bg-background transition-colors hover:bg-accent disabled:opacity-50 ' + focusRing;

const CarouselContext = createContext({
	navigationMode: 'scroll',
	controlLayout: 'overlay',
	ref: null,
	scrollPrev: () => {},
	scrollNext: () => {},
	canScrollPrev: false,
	canScrollNext: false,
	orientation: 'horizontal',
	updateScrollState: () => {},
	activeIndex: 0,
	slideCount: 0,
	setSlideCount: () => {},
});

export const Carousel = ({
	orientation = 'horizontal',
	navigationMode = 'scroll',
	controlLayout = 'overlay',
	className = '',
	children,
	...props
}) => {
	const ref = useRef(null);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(true);
	const [activeIndex, setActiveIndex] = useState(0);
	const [slideCount, setSlideCount] = useState(0);

	const updateScrollState = useCallback(() => {
		const el = ref.current;
		if (!el) return;
		if (orientation === 'vertical') {
			setCanScrollPrev(el.scrollTop > 0);
			setCanScrollNext(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
		} else {
			setCanScrollPrev(el.scrollLeft > 0);
			setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
		}
	}, [orientation]);

	const scrollPrev = useCallback(() => {
		if (navigationMode === 'step') {
			setActiveIndex((j) => Math.max(0, j - 1));
			return;
		}
		const el = ref.current;
		if (!el) return;
		const size = orientation === 'vertical' ? el.clientHeight : el.clientWidth;
		el.scrollBy({ [orientation === 'vertical' ? 'top' : 'left']: -size, behavior: 'smooth' });
	}, [navigationMode, orientation]);

	const scrollNext = useCallback(() => {
		if (navigationMode === 'step') {
			setActiveIndex((j) => Math.min(Math.max(0, slideCount - 1), j + 1));
			return;
		}
		const el = ref.current;
		if (!el) return;
		const size = orientation === 'vertical' ? el.clientHeight : el.clientWidth;
		el.scrollBy({ [orientation === 'vertical' ? 'top' : 'left']: size, behavior: 'smooth' });
	}, [navigationMode, orientation, slideCount]);

	useEffect(() => {
		if (navigationMode !== 'scroll') return;
		updateScrollState();
	}, [navigationMode, updateScrollState]);

	useEffect(() => {
		if (navigationMode !== 'step') return;
		setActiveIndex((j) => Math.min(Math.max(0, j), Math.max(0, slideCount - 1)));
	}, [slideCount, navigationMode]);

	const canPrev = navigationMode === 'step' ? activeIndex > 0 : canScrollPrev;
	const canNext = navigationMode === 'step' ? activeIndex < slideCount - 1 : canScrollNext;

	return (
		<CarouselContext.Provider value={{
			ref,
			navigationMode,
			controlLayout,
			scrollPrev,
			scrollNext,
			canScrollPrev: canPrev,
			canScrollNext: canNext,
			orientation,
			updateScrollState,
			activeIndex,
			slideCount,
			setSlideCount,
		}}>
			<div role='region' aria-roledescription='carousel' className={cn('relative', className)} {...props}>
				{children}
			</div>
		</CarouselContext.Provider>
	);
};

export const CarouselContent = ({ className = '', children, ...props }) => {
	const { ref, navigationMode, orientation, updateScrollState, activeIndex, slideCount, setSlideCount } = useContext(CarouselContext);
	const count = Children.count(children);

	useLayoutEffect(() => {
		setSlideCount(count);
	}, [count, setSlideCount]);

	if (navigationMode === 'step') {
		const trackWidth = slideCount > 0 ? String(slideCount * 100) + '%' : '100%';
		const translatePct = slideCount > 0 ? String((100 * activeIndex) / slideCount) + '%' : '0%';
		return (
			<div className={cn('overflow-hidden w-full min-w-0', className)} {...props}>
				<div
					className='flex min-w-0 transition-transform duration-300 ease-out'
					style={{ width: trackWidth, transform: 'translateX(-' + translatePct + ')' }}
				>
					{children}
				</div>
			</div>
		);
	}

	return (
		<div className='overflow-hidden'>
			<div
				ref={ref}
				onScroll={updateScrollState}
				aria-live='polite'
				className={cn('flex', orientation === 'vertical' ? 'flex-col overflow-y-auto' : 'overflow-x-auto', 'scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -ml-4', className)}
				{...props}
			/>
		</div>
	);
};

export const CarouselItem = ({ className = '', style, ...props }) => {
	const { navigationMode, slideCount } = useContext(CarouselContext);
	const stepStyle =
		navigationMode === 'step' && slideCount > 0
			? { flex: '0 0 calc(' + String(100 / slideCount) + '%)', ...style }
			: style;
	const base =
		navigationMode === 'step'
			? 'min-w-0 shrink-0'
			: 'min-w-0 shrink-0 grow-0 basis-full pl-4 snap-start';
	return <div role='group' aria-roledescription='slide' className={cn(base, className)} style={stepStyle} {...props} />;
};

export const CarouselFooter = ({ className = '', children, ...props }) => {
	const { slideCount, navigationMode, controlLayout } = useContext(CarouselContext);
	if (!children) return null;
	if (slideCount <= 1) return null;
	if (navigationMode !== 'step' || controlLayout !== 'inline') return <>{children}</>;
	return (
		<div className={cn('flex items-center justify-between gap-3 py-3 border-b border-border flex-wrap', className)} {...props}>
			{children}
		</div>
	);
};

export const CarouselCaption = ({ captions, className = '', ...props }) => {
	const { navigationMode, activeIndex, slideCount } = useContext(CarouselContext);
	if (navigationMode !== 'step' || slideCount <= 1) return null;
	const text = Array.isArray(captions) ? captions[activeIndex] : captions;
	if (!text) return null;
	return (
		<figcaption className={cn('text-xs leading-5 text-current/77 tracking-[0.02em] max-w-sm select-text font-mono', className)} {...props}>
			{text}
		</figcaption>
	);
};

export const CarouselCounter = ({ className = '', ...props }) => {
	const { navigationMode, activeIndex, slideCount } = useContext(CarouselContext);
	if (navigationMode !== 'step' || slideCount <= 1) return null;
	return (
		<span className={cn('text-xs leading-5 text-current/77 tracking-[0.02em] max-w-sm select-text font-mono my-auto', className)} {...props}>
			{String(activeIndex + 1) + ' / ' + String(slideCount)}
		</span>
	);
};

export const CarouselPrevious = ({ className = '', ...props }) => {
	const { scrollPrev, canScrollPrev, orientation, controlLayout } = useContext(CarouselContext);
	if (controlLayout === 'inline') {
		return (
			<Button type='button' variant='secondary' size='icon' className={cn('size-8', className)} disabled={!canScrollPrev} onClick={scrollPrev} {...props}>
				<span aria-hidden='true'>←</span>
			</Button>
		);
	}
	return (
		<button
			type='button'
			aria-label='Go to previous slide'
			disabled={!canScrollPrev}
			className={cn(BTN, orientation === 'vertical' ? '-top-12 left-1/2 -translate-x-1/2 rotate-90' : '-left-12 top-1/2 -translate-y-1/2', className)}
			onClick={scrollPrev}
			{...props}
		>
			<span aria-hidden='true'>←</span>
		</button>
	);
};

export const CarouselNext = ({ className = '', ...props }) => {
	const { scrollNext, canScrollNext, orientation, controlLayout } = useContext(CarouselContext);
	if (controlLayout === 'inline') {
		return (
			<Button type='button' variant='secondary' size='icon' className={cn('size-8', className)} disabled={!canScrollNext} onClick={scrollNext} {...props}>
				<span aria-hidden='true'>→</span>
			</Button>
		);
	}
	return (
		<button
			type='button'
			aria-label='Go to next slide'
			disabled={!canScrollNext}
			className={cn(BTN, orientation === 'vertical' ? '-bottom-12 left-1/2 -translate-x-1/2 rotate-90' : '-right-12 top-1/2 -translate-y-1/2', className)}
			onClick={scrollNext}
			{...props}
		>
			<span aria-hidden='true'>→</span>
		</button>
	);
};
