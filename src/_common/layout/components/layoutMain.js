import React, { useRef } from 'react';
import { motion } from 'motion/react';
import LayoutPageLoader from './layoutPageLoader';

const LayoutMain = ({ children, isWorkPage, isLandingPage, isVisible, showWork, className }) => {
	const cvRef = useRef(null);
	const baseClass = isLandingPage ? 'w-full max-w-none m-0 shadow-none rounded-none relative bg-background text-foreground ' : 'max-w-5xl lg:max-w-full m-auto shadow-lg rounded-lg relative ';
	const workClass = showWork && !isLandingPage ? 'mx-[2rem] w-[calc(100%-4rem)] mt-1 bg-background/90' : isLandingPage ? '' : 'w-full bg-background text-foreground';
	const sectionClass = baseClass + workClass + (' ' + (className || ''));
	return (
		<section ref={cvRef} className={sectionClass} aria-label='Page content' id='page-scroll-container'>
			{isWorkPage && !isVisible && <LayoutPageLoader />}
			{!isWorkPage ? <React.Fragment>{children}</React.Fragment> :
				<motion.div initial={{ opacity: 0, y: '100%', scale: 0.95 }} animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: '100%', scale: 0.95 }} transition={{ duration: isVisible ? 0.7 : 0.3, ease: isVisible ? 'easeOut' : 'easeIn' }}>{children}</motion.div>
			}
		</section>
	);
};

export default LayoutMain;
