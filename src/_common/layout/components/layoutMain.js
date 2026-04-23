import { useRef } from 'react';

const LayoutMain = ({ children, isCaseStudyPage, isLandingPage, showWork, className }) => {
	const cvRef = useRef(null);
	const fullBleedMain = isLandingPage;
	const baseClass = fullBleedMain ? 'w-full max-w-none m-0 shadow-none rounded-none relative bg-background text-foreground ' : 'max-w-5xl lg:max-w-full m-auto shadow-lg rounded-lg relative ';
	const workClass = showWork && !isLandingPage ? 'mx-[2rem] w-[calc(100%-4rem)] mt-1 bg-background/90' : isLandingPage ? '' : 'w-full bg-background text-foreground';
	const caseStudyClass = isCaseStudyPage ? 'flex-1 min-h-0 min-w-0 w-full overflow-hidden flex flex-col ' : '';
	const sectionClass = baseClass + workClass + caseStudyClass + (className ? ' ' + className : '');
	return (
		<section ref={cvRef} className={sectionClass} aria-label='Page content' id='page-scroll-container'>
			{children}
		</section>
	);
};

export default LayoutMain;
