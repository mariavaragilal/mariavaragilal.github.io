import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

// _Common
import Layout from '../../_common/layout';
// Components
import CVHeader from './_common/header';
import CVAboutSection from './_common/sections/AboutSection';
import CVEducationSection from './_common/sections/EducationSection';
import CVAwardsSection from './_common/sections/AwardsSection';
import CVExperienceSection from './_common/sections/ExperienceSection';
import CVFooter from './_common/footer';
import { ScrollToTop } from '../_common/ScrollToTop';

const CVPage = () => {
	const { t } = useTranslation();

	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const onScroll = () => setShowScrollTop(window.scrollY > 400);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);
	return (
		<Layout title='CV' description={t('cv.title')}>
			<CVHeader />
			<main className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
				<div className='p-8 space-y-12 border-r border-border'>
					<CVAboutSection />
					<CVEducationSection />
					<CVAwardsSection />
				</div>
				<div className='p-8 lg:pr-10 lg:pl-4 space-y-16 lg:col-span-2'>
					<CVExperienceSection />
				</div>
			</main>
			<ScrollToTop visible={showScrollTop} />
			<CVFooter />
		</Layout>
	);
};

export default CVPage;

export const query = graphql`
	query CvPageQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
