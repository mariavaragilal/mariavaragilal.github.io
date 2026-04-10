import { useTranslation } from 'react-i18next';
import { Badge, ChatBubbleQuestion } from '../../../../_common/components';
import { hasCaseStudy, CaseSection } from './DrawerShared';
import { CaseStudyBlock } from './DrawerStudyBlock';

export const DrawerMain = ({ app }) => {
	const { t } = useTranslation();
	const ui = t('mv.caseUi', { returnObjects: true }) || {};

	return (
		<main className='min-w-0 min-h-0 flex-1 xl:overflow-y-auto xl:overscroll-y-contain overscroll-y-contain p-2 sm:p-4 pb-0 xl:p-10 flex flex-col gap-6 2xl:gap-8 4xl:gap-12' aria-label={ui.caseStudyPrefix + ' ' + app.title}>
			<h5 className='sr-only'>{ui.caseStudy}</h5>
			<p className='max-w-4xl text-[1.125rem] leading-relaxed text-current/88 mb-5'>{app.highlight}</p>
			<CaseSection heading={ui.outcomes} headingAs='h6' classHeading='mb-2 w-full' className='relative flex flex-wrap gap-1 w-full -mt-5'>
				{Array.isArray(app.results) && app.results.length > 0 ?
					<div className='flex flex-wrap gap-1.5 -mt-2'>
						{app.results.map((r) => (
							<ChatBubbleQuestion width='fit-content' key={r}>{r}</ChatBubbleQuestion>
						))}
					</div>
					: null}
			</CaseSection>
			{hasCaseStudy(app) ? <CaseStudyBlock caseStudy={app.caseStudy} /> : null}
		</main>
	);
};
