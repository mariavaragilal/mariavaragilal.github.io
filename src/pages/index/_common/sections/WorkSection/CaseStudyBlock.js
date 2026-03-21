import { useTranslation } from 'react-i18next';
import { Blockquote, BlockquoteMain, BlockquoteSecondary, Card, ChatBubbleAnswer, Separator } from '../../../../../_common/components';
import { CaseSection, CaseSectionHeading } from './CaseSharedComponents';

export const CaseStudyBlock = ({ caseStudy, as: Tag = 'div' }) => {
	const { t } = useTranslation();
	const b = t('mv.caseUi.caseStudyBlock', { returnObjects: true }) || {};
	const ui = t('mv.caseUi', { returnObjects: true }) || {};
	return (
		<Card variant='secondary' className='px-6 py-8 lg:px-10 space-y-10 md:col-span-2' role='region' aria-label={ui.caseStudyDetailsAria} as={Tag}>
			{(caseStudy.businessProblem || caseStudy.strategicDecision) ? (
				<div className='relative'>
					<CaseSectionHeading as='h6'>{b.context}</CaseSectionHeading>
					{caseStudy.businessProblem ? <p className='text-base leading-relaxed text-current/88 mb-4'>{caseStudy.businessProblem}</p> : null}
					{caseStudy.strategicDecision ? (
						<Card variant='default' className='px-6 py-5'>
							<p className='text-[1em] leading-relaxed text-current/66'>{caseStudy.strategicDecision.intro}</p>
							<p className='font-mono font-medium tracking-tight text-xl leading-snug text-foreground'>{caseStudy.strategicDecision.question}</p>
						</Card>
					) : null}
				</div>
			) : null}
			{caseStudy.process && caseStudy.process.length > 0 ? (
				<div>
					<CaseSectionHeading as='h6'>{caseStudy.processHeading || b.processDefault}</CaseSectionHeading>
					<div className='space-y-0'>
						{caseStudy.process.map((p, pi) => (
							<div key={p.phase + p.label}>
								{pi > 0 ? <Separator decorative/> : null}
								<div className='grid gap-3 py-3 sm:grid-cols-[100px_minmax(0,1fr)]'>
									<div>
										<p className='text-xs uppercase tracking-[0.16em] text-current/66'>{p.phase}</p>
										<p className='text-sm text-current/88'>{p.label}</p>
									</div>
									<div>
										<p className='font-medium text-base text-current'>{p.title}</p>
										<p className='text-sm leading-relaxed text-current/66'>{p.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			) : null}
			{caseStudy.implementation ? (
				<CaseSection heading={b.implementation} headingAs='h6' className='mb-4'>
					<Card variant='inverse' className='grid gap-4 md:gap-8 lg:gap-10 md:grid-cols-2 xl:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] p-4 md:p-8 lg:px-10 text-current'>
						{(Array.isArray(caseStudy.implementation) ? caseStudy.implementation : caseStudy.implementation.split('\n\n')).map((para, i) => (
							typeof para === 'object' && para.heading && para.items ? (
								<div key={i} className='flex flex-col'>
									<p className='text-[.65em] uppercase tracking-[0.18em] font-semibold text-current mb-1'>{para.heading}</p>
									<ul className='space-y-0.5 text-xs leading-relaxed text-current/88 font-mono'>
										{para.items.map((item, j) => <li key={j} className='flex gap-2'><span className='text-current/50 shrink-0'>—</span><span>{item}</span></li>)}
									</ul>
								</div>
							) : (
								<p key={i} className='space-y-0.5 text-xs leading-relaxed text-current/88 font-mono'>{para}</p>
							)
						))}
					</Card>
				</CaseSection>
			) : null}
			{caseStudy.resultsMetrics && caseStudy.resultsMetrics.length > 0 ? (
				<CaseSection heading={b.resultsMetrics} headingAs='h6' className='mb-4'>
					<div className='relative flex flex-wrap gap-1 space-y-1'>
						{caseStudy.resultsMetrics.map((m) => (
							<ChatBubbleAnswer width='fit-content' variant='inverse' key={m}>{m}</ChatBubbleAnswer>
						))}
					</div>
				</CaseSection>
			) : null}
			{caseStudy.tradeoffsLearnings ? (
				<CaseSection heading={caseStudy.tradeoffsHeading || b.tradeoffsDefault} headingAs='h6' className='mb-4'>
					<Card variant='default' className='px-6 py-6 space-y-0.5'>
						{(Array.isArray(caseStudy.tradeoffsLearnings) ? caseStudy.tradeoffsLearnings : caseStudy.tradeoffsLearnings.split('\n\n')).map((para, i) => (
							<p key={i} className='leading-relaxed text-current/88'>{para}</p>
						))}
					</Card>
				</CaseSection>
			) : null}
			{caseStudy.quote ? (
				<Blockquote>
					<BlockquoteMain>{caseStudy.quote.title}</BlockquoteMain>
					{caseStudy.quote.subtitle ? <BlockquoteSecondary>{caseStudy.quote.subtitle}</BlockquoteSecondary> : null}
				</Blockquote>
			) : null}
			{caseStudy.skillsDemonstrated ? (
				<div>
					<CaseSectionHeading as='h6'>{b.skills}</CaseSectionHeading>
					<p className='text-base leading-relaxed text-current/88'>{caseStudy.skillsDemonstrated}</p>
				</div>
			) : null}
		</Card>
	);
};
