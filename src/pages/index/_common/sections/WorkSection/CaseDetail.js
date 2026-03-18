import { Badge, ChatBubbleQuestion } from '../../../../../_common/components';
import { CaseSection } from './CaseSharedComponents';
import { CaseStudyBlock } from './CaseStudyBlock';

const hasCaseStudy = (app) => app.caseStudy && app.caseStudy !== null && Object.keys(app.caseStudy).length > 0;

export const CaseDetail = ({ app }) => (
	<main className='flex-1 lg:overflow-y-auto p-8 pb-0 lg:p-10 grid md:grid-cols-[1fr_2fr] md:grid-rows-[auto_1fr] gap-6 xl:gap-16' aria-label={'Case study: ' + app.title}>
		<h5 className='sr-only'>Case study</h5>
		<div className='relative mb-auto'>
			<p className='max-w-4xl text-[1.125rem] leading-relaxed text-current/88 mb-5'>
				{app.highlight}
			</p>
			<div className='flex gap-1.5 -mt-2'>
				<Badge variant='default' className='mb-0'>{app.pillars}</Badge>
			</div>
		</div>
		<CaseSection heading='Outcomes' headingAs='h6'>
			<div className='relative flex flex-wrap gap-1 space-y-1'>
				{app.results.map((r) => (
					<ChatBubbleQuestion width='fit-content' key={r}>{r}</ChatBubbleQuestion>
				))}
			</div>
		</CaseSection>
		{hasCaseStudy(app) ? <CaseStudyBlock caseStudy={app.caseStudy} /> : null}
	</main>
);
