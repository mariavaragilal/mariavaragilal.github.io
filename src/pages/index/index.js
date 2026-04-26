import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// _Common
import Layout from '../../_common/layout';
import { ScrollToTop } from '../_common/ScrollToTop';

// Constants
import { srOnly } from '../../constants/utils/a11y';

// Components
import { StickyNav } from './_common/StickyNav';
import { IntroSection, PlaybookSection, WorkSection, ContactSection, FooterSection } from './_common/sections';

// Hooks
import { useScrollThresholds } from '../../hooks/useScrollThresholds';
import { useActiveSection } from '../../hooks/useActiveSection';

const SCROLL_THRESHOLDS = { isScrolled: 24, showScrollTop: 400 };
const SECTION_ANCHOR_OFFSET = 80;

const scrollToAnchor = (id, offset) => {
	const el = document.getElementById(id);
	if (!el) return;
	const y = el.getBoundingClientRect().top + window.scrollY - offset;
	window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
};

const IndexPage = () => {
	const { t } = useTranslation();
	const stickyNav = useMemo(() => {
		const raw = t('mv.stickyNav', { returnObjects: true });
		return raw && typeof raw === 'object' ? raw : { sections: [] };
	}, [t]);
	const navSections = stickyNav.sections || [];
	const [expandedDimension, setExpandedDimension] = useState({});
	const [navOpen, setNavOpen] = useState(false);

	const { isScrolled, showScrollTop } = useScrollThresholds(SCROLL_THRESHOLDS);
	const activeSection = useActiveSection(navSections);

	const toggleDimensionDetail = (index) => setExpandedDimension((prev) => ({ ...prev, [index]: !prev[index] }));

	const scrollToSection = (id) => scrollToAnchor(id, SECTION_ANCHOR_OFFSET);

	useEffect(() => {
		if (typeof window === 'undefined') return undefined;
		const run = () => {
			if (window.location.hash === '#work') {
				requestAnimationFrame(() => scrollToAnchor('work', 24));
			}
		};
		run();
		window.addEventListener('hashchange', run);
		return () => window.removeEventListener('hashchange', run);
	}, []);

	return (
		<Layout title={null} description={t('home.description')} className='text-foreground'>
			<a href='#main-content' className={srOnly + ' focus:static focus:w-auto focus:h-auto focus:p-3 focus:m-0 focus:overflow-visible focus:whitespace-normal focus:bg-primary focus:text-primary-foreground z-50'}>{t('home.skipToMain')}</a>
			<h1 className={srOnly}>#MVP</h1>
			<StickyNav showScrollTop={showScrollTop} isScrolled={isScrolled} activeSection={activeSection} onScrollToSection={scrollToSection} navOpen={navOpen} setNavOpen={setNavOpen} stickyNav={stickyNav} />
			<IntroSection />
			<main className='flex flex-col bg-background text-foreground' id='main-content'>
				<PlaybookSection expandedDimension={expandedDimension} toggleDimensionDetail={toggleDimensionDetail} />
				<WorkSection />
				<ContactSection />
			</main>
			<ScrollToTop visible={showScrollTop} />
			<FooterSection />
		</Layout>
	);
};

export default IndexPage;
