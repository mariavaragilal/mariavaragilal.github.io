import { useTranslation } from 'react-i18next';
import { Badge, ChatBubbleQuestion } from '../../../../_common/components';
import { hasCaseStudy, CaseSection } from './DrawerShared';
import { CaseStudyBlock } from './DrawerStudyBlock';

export const DrawerMain = ({ app }) => {
	const { t } = useTranslation();
	const ui = t('mv.caseUi', { returnObjects: true }) || {};

	return (
		<main className='min-w-0 min-h-0 flex-1 lg:overflow-y-auto lg:overscroll-y-contain overscroll-y-contain p-8 pb-0 lg:p-10 flex flex-col gap-6 2xl:gap-8 4xl:gap-12' aria-label={ui.caseStudyPrefix + ' ' + app.title}>
			<h5 className='sr-only'>{ui.caseStudy}</h5>
			<div className='relative'>
				<p className='max-w-4xl text-[1.125rem] leading-relaxed text-current/88 mb-5'>{app.highlight}</p>
				<div className='flex gap-1.5 -mt-2'>
					<Badge variant='default' className='mb-0'>{app.dimensions}</Badge>
				</div>
			</div>
			<CaseSection heading={ui.outcomes} headingAs='h6' classHeading='mb-2 w-full' className='relative flex flex-wrap gap-1 space-y-2 w-full'>
				{app.results.map((r) => (
					<ChatBubbleQuestion width='fit-content' key={r}>{r}</ChatBubbleQuestion>
				))}
			</CaseSection>
			{hasCaseStudy(app) ? <CaseStudyBlock caseStudy={app.caseStudy} /> : null}
		</main>
	);
};
