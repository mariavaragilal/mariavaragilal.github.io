import { useState, useRef, useCallback, useEffect, createContext, useContext } from 'react';
import { focusRing } from '../../../constants/utils/a11y';
import { cn } from '../../../constants/utils/cn';

const BTN = 'absolute h-8 w-8 inline-flex items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-accent disabled:opacity-50 ' + focusRing;

const CarouselContext = createContext({ scrollPrev: () => {}, scrollNext: () => {}, canScrollPrev: false, canScrollNext: false, orientation: 'horizontal' });

export const Carousel = ({ orientation = 'horizontal', className = '', children, ...props }) => {
	const ref = useRef(null);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(true);

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
		const el = ref.current;
		if (!el) return;
		const size = orientation === 'vertical' ? el.clientHeight : el.clientWidth;
		el.scrollBy({ [orientation === 'vertical' ? 'top' : 'left']: -size, behavior: 'smooth' });
	}, [orientation]);

	const scrollNext = useCallback(() => {
		const el = ref.current;
		if (!el) return;
		const size = orientation === 'vertical' ? el.clientHeight : el.clientWidth;
		el.scrollBy({ [orientation === 'vertical' ? 'top' : 'left']: size, behavior: 'smooth' });
	}, [orientation]);

	useEffect(() => { updateScrollState(); }, [updateScrollState]);

	return (
		<CarouselContext.Provider value={{ ref, scrollPrev, scrollNext, canScrollPrev, canScrollNext, orientation, updateScrollState }}>
			<div role='region' aria-roledescription='carousel' className={cn('relative', className)} {...props}>
				{children}
			</div>
		</CarouselContext.Provider>
	);
};

export const CarouselContent = ({ className = '', ...props }) => {
	const { ref, orientation, updateScrollState } = useContext(CarouselContext);
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

export const CarouselItem = ({ className = '', ...props }) => (
	<div role='group' aria-roledescription='slide' className={cn('min-w-0 shrink-0 grow-0 basis-full pl-4 snap-start', className)} {...props}/>
);

export const CarouselPrevious = ({ className = '', ...props }) => {
	const { scrollPrev, canScrollPrev, orientation } = useContext(CarouselContext);
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
	const { scrollNext, canScrollNext, orientation } = useContext(CarouselContext);
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
