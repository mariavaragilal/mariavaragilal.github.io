import { Blockquote, BlockquoteMain, BlockquoteSecondary, Card, ChatBubbleAnswer, Separator } from '../../../../../_common/components';
import { CaseSection, CaseSectionHeading } from './CaseSharedComponents';

export const CaseStudyBlock = ({ caseStudy }) => (
	<Card variant='secondary' className='px-6 py-8 lg:px-10'>
		{/* <CaseSectionHeading className='mb-6'>MVP Method</CaseSectionHeading> */}
		<div className='space-y-10'>
			{(caseStudy.businessProblem || caseStudy.strategicDecision) ? (
				<div className='relative'>
					<CaseSectionHeading>Context</CaseSectionHeading>
					{caseStudy.businessProblem ? <p className='text-base leading-relaxed text-current/88 mb-4'>{caseStudy.businessProblem}</p> : null}
					{caseStudy.strategicDecision ? (
						<Card variant='default' className='px-6 py-5'>
							<p className='mb-0 text-base text-current/88'>{caseStudy.strategicDecision.intro}</p>
							<p className='font-[Rubik] font-medium text-lg leading-snug text-foreground'>{caseStudy.strategicDecision.question}</p>
						</Card>
					) : null}
				</div>
			) : null}
			{caseStudy.process && caseStudy.process.length > 0 ? (
				<div>
					<CaseSectionHeading>Process</CaseSectionHeading>
					<div className='space-y-0'>
						{caseStudy.process.map((p, pi) => (
							<div key={p.phase + p.label}>
								{pi > 0 ? <Separator decorative /> : null}
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
				<div>
					<CaseSectionHeading>Implementation</CaseSectionHeading>
					{caseStudy.implementation.split('\n\n').map((para, i) => (
						<p key={i} className='text-base leading-relaxed text-current/88 last:mb-4'>{para}</p>
					))}
				</div>
			) : null}
			{caseStudy.resultsMetrics && caseStudy.resultsMetrics.length > 0 ? (
				<CaseSection heading='Results & Metrics'>
					<div className='relative flex flex-wrap gap-1 space-y-1'>
						{caseStudy.resultsMetrics.map((m) => (
							<ChatBubbleAnswer width='fit-content' variant='inverse' key={m}>{m}</ChatBubbleAnswer>
						))}
					</div>
				</CaseSection>
			) : null}
			{caseStudy.tradeoffsLearnings ? (
				<div>
					<CaseSectionHeading>Trade-offs & Learnings</CaseSectionHeading>
					{caseStudy.tradeoffsLearnings.split('\n\n').map((para, i) => (
						<p key={i} className='text-base leading-relaxed text-current/88 last:mb-4'>{para}</p>
					))}
				</div>
			) : null}
			{caseStudy.quote ? (
				<Blockquote>
					<BlockquoteMain>{caseStudy.quote.title}</BlockquoteMain>
					{caseStudy.quote.subtitle ? <BlockquoteSecondary>{caseStudy.quote.subtitle}</BlockquoteSecondary> : null}
				</Blockquote>
			) : null}
			{caseStudy.skillsDemonstrated ? (
				<div>
					<CaseSectionHeading>Skills</CaseSectionHeading>
					<p className='text-base leading-relaxed text-current/88'>{caseStudy.skillsDemonstrated}</p>
				</div>
			) : null}
		</div>
	</Card>
);
