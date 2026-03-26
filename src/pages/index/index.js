import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// _Common	
import Layout from '../../_common/layout';
import { ScrollToTop } from '../_common/ScrollToTop';

// Constants
import { srOnly } from '../../constants/utils/a11y';

// Components
import { StickyNav } from './_common/StickyNav';
import { IntroSection, MethodSection, WorkSection, ContactSection, FooterSection } from './_common/sections';

const IndexPage = () => {
	const { t } = useTranslation();
	const stickyNav = useMemo(() => {
		const raw = t('mv.stickyNav', { returnObjects: true });
		return raw && typeof raw === 'object' ? raw : { sections: [] };
	}, [t]);
	const navSections = stickyNav.sections || [];
	const [expandedDimension, setExpandedDimension] = useState({});
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [activeSection, setActiveSection] = useState(null);
	const [navOpen, setNavOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const toggleDimensionDetail = (index) => setExpandedDimension((prev) => ({ ...prev, [index]: !prev[index] }));

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
			for (let i = navSections.length - 1; i >= 0; i--) {
				const el = document.getElementById(navSections[i].id);
				if (el && el.getBoundingClientRect().top <= threshold) {
					current = navSections[i].id;
					break;
				}
			}
			setActiveSection(current);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- nav tracks stickyNav.sections via locale
	}, [stickyNav]);

	return (
		<Layout title={null} description={t('home.description')} className='text-foreground'>
			<a href='#main-content' className={srOnly + ' focus:static focus:w-auto focus:h-auto focus:p-3 focus:m-0 focus:overflow-visible focus:whitespace-normal focus:bg-primary focus:text-primary-foreground z-50'}>{t('home.skipToMain')}</a>
			<StickyNav showScrollTop={showScrollTop} isScrolled={isScrolled} activeSection={activeSection} onScrollToSection={scrollToSection} navOpen={navOpen} setNavOpen={setNavOpen} stickyNav={stickyNav} />
			<IntroSection onScrollToWork={scrollToWork} />
			<main className='flex flex-col bg-background text-foreground' id='main-content'>
				<MethodSection expandedDimension={expandedDimension} toggleDimensionDetail={toggleDimensionDetail} />
				<WorkSection />
				<ContactSection />
			</main>
			<ScrollToTop visible={showScrollTop} />
			<FooterSection />
		</Layout>
	);
};

export default IndexPage;
