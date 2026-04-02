import { useTranslation } from 'react-i18next';
import Layout from '../../../_common/layout';
import { Card } from '../../../_common/components';
import { srOnly } from '../../../constants/utils/a11y';
import { buildDescription, findCaseBySlug, flattenWorkCasesOrdered } from '../../../constants/utils/structuredData';
import { CaseStudyView } from '../../index/_common/sections/WorkSection/CaseDrawer';

const CaseStudyPage = ({ pageContext }) => {
	const { slug } = pageContext;
	const { t } = useTranslation();
	const workCases = t('mv.workCases', { returnObjects: true }) || {};
	const match = findCaseBySlug(workCases, slug);
	if (!match) return null;
	const { app } = match;
	const cases = flattenWorkCasesOrdered(workCases);
	const descRaw = buildDescription(app);
	const desc = descRaw.length > 320 ? descRaw.slice(0, 317) + '...' : descRaw;
	return (
		<Layout title={app.title} description={desc} className='text-foreground h-full'>
			<a href='#main-content' className={srOnly + ' focus:static focus:w-auto focus:h-auto focus:p-3 focus:m-0 focus:overflow-visible focus:whitespace-normal focus:bg-primary focus:text-primary-foreground z-50'}>{t('home.skipToMain')}</a>
			<CaseStudyView app={app} cases={cases} />
		</Layout>
	);
};

export default CaseStudyPage;
