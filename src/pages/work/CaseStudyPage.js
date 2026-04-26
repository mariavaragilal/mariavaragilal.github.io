import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../../_common/layout';
import { Card } from '../../_common/components';
import { srOnly } from '../../constants/utils/a11y';
import { buildDescription, findCaseBySlug, flattenWorkCasesOrdered } from '../../constants/utils/structuredData';
import { CaseStudyView } from '../_common/WorkCases/CaseDrawer';
import { ScrollToTop } from '../_common/ScrollToTop';

const CaseStudyPage = ({ pageContext }) => {
	const { slug } = pageContext;
	const { t } = useTranslation();
	const work = t('mv.work', { returnObjects: true }) || {};
	const workCases = work.cases || {};
	const match = findCaseBySlug(workCases, slug);

	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const onScroll = () => {
			const main = document.getElementById('main-content');
			const view = main?.parentElement || null;
			const top = Math.max(window.scrollY || 0, main?.scrollTop || 0, view?.scrollTop || 0);
			setShowScrollTop(top > 400);
		};
		onScroll();
		document.addEventListener('scroll', onScroll, { capture: true, passive: true });
		return () => document.removeEventListener('scroll', onScroll, { capture: true });
	}, []);

	const handleScrollTop = () => {
		const main = document.getElementById('main-content');
		const view = main?.parentElement || null;
		main?.scrollTo?.({ top: 0, behavior: 'smooth' });
		view?.scrollTo?.({ top: 0, behavior: 'smooth' });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (!match) return null;
	const { app } = match;
	const cases = flattenWorkCasesOrdered(workCases);
	const descRaw = buildDescription(app);
	const desc = descRaw.length > 320 ? descRaw.slice(0, 317) + '...' : descRaw;
	return (
		<Layout title={app.title} description={desc} className='text-foreground h-full'>
			<a href='#main-content' className={srOnly + ' focus:static focus:w-auto focus:h-auto focus:p-3 focus:m-0 focus:overflow-visible focus:whitespace-normal focus:bg-primary focus:text-primary-foreground z-50'}>{t('home.skipToMain')}</a>
			<CaseStudyView app={app} cases={cases} />
			<ScrollToTop visible={showScrollTop} onClick={handleScrollTop} />
		</Layout>
	);
};

export default CaseStudyPage;
