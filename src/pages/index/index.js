import { useState, useEffect } from 'react';

// _Common	
import Layout from '../../_common/layout';
import { ScrollToTop } from '../_common/ScrollToTop';

// Constants
import { srOnly } from '../../constants/utils/a11y';

// Components
import { StickyNav, SECTIONS } from './_common/StickyNav';
import { IntroSection } from './_common/sections/IntroSection';
import { MethodSection } from './_common/sections/MethodSection';
import { WorkSection } from './_common/sections/WorkSection';
import { ContactSection } from './_common/sections/ContactSection';
import { FooterSection } from './_common/sections/FooterSection';

const IndexPage = () => {
	const [expandedPillar, setExpandedPillar] = useState({});
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [activeSection, setActiveSection] = useState(null);
	const [navOpen, setNavOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const togglePillarDetail = (index) => setExpandedPillar((prev) => ({ ...prev, [index]: !prev[index] }));

	const scrollToWork = (e) => {
		e.preventDefault();
		const el = document.getElementById('work');
		if (el) {
			const y = el.getBoundingClientRect().top + window.scrollY - 24;
			window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
		}
		window.history.pushState(null, '', '#work');
	};

	const scrollToSection = (id) => {
		const el = document.getElementById(id);
		if (el) {
			const y = el.getBoundingClientRect().top + window.scrollY - 80;
			window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
		}
	};

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const run = () => {
			if (window.location.hash === '#work') {
				requestAnimationFrame(() => {
					const el = document.getElementById('work');
					if (el) {
						const y = el.getBoundingClientRect().top + window.scrollY - 24;
						window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
					}
				});
			}
		};
		run();
		window.addEventListener('hashchange', run);
		return () => window.removeEventListener('hashchange', run);
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const onScroll = () => setShowScrollTop(window.scrollY > 400);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const onScroll = () => setIsScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const onScroll = () => {
			const threshold = 120;
			let current = null;
			for (let i = SECTIONS.length - 1; i >= 0; i--) {
				const el = document.getElementById(SECTIONS[i].id);
				if (el && el.getBoundingClientRect().top <= threshold) {
					current = SECTIONS[i].id;
					break;
				}
			}
			setActiveSection(current);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<Layout title={null} description='Technical Product Designer that ships code exploring AI & LLM — prompting for agent interfaces.' className='text-foreground'>
			<a href='#main-content' className={srOnly + ' focus:static focus:w-auto focus:h-auto focus:p-3 focus:m-0 focus:overflow-visible focus:whitespace-normal focus:bg-primary focus:text-primary-foreground z-50'}>Skip to main content</a>
			<StickyNav showScrollTop={showScrollTop} isScrolled={isScrolled} activeSection={activeSection} onScrollToSection={scrollToSection} navOpen={navOpen} setNavOpen={setNavOpen} />
			<IntroSection onScrollToWork={scrollToWork} />
			<main className='flex flex-col bg-background text-foreground' id='main-content'>
				<MethodSection expandedPillar={expandedPillar} togglePillarDetail={togglePillarDetail} />
				<WorkSection />
				<ContactSection />
			</main>
			<ScrollToTop visible={showScrollTop} />
			<FooterSection />
		</Layout>
	);
};

export default IndexPage;
