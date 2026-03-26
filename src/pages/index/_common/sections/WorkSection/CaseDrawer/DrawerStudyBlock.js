import { useTranslation } from 'react-i18next';
import { Blockquote, BlockquoteMain, BlockquoteSecondary, Card, ChatBubbleAnswer, Separator } from '../../../../../../_common/components';
import { CaseSection } from './DrawerShared';

const normalizeImpl = (impl) => {
	if (!impl) return null;
	if (impl.design !== undefined) return impl;
	if (Array.isArray(impl)) return { design: impl, code: [] };
	if (typeof impl === 'string') return { design: impl.split('\n\n').filter(Boolean), code: [] };
	return null;
};

const ImplementationBlocks = ({ blocks, title }) => {
	if (!blocks?.length) return null;
	const items = Array.isArray(blocks) ? blocks : [blocks];
	return items.map((para, i) =>
		para && typeof para === 'object' && para.heading && para.items ? (
			<div className='w-full space-y-0' key={i}>
				<p className={'text-xs uppercase tracking-[0.16em] text-current/66 mt-2' + (i > 0 ? ' opacity-0 hidden 2xl:block' : '')}>{title}</p>
				<p className='font-medium text-base text-current'>{para.heading}</p>
				<ul className='space-y-0.5 text-sm leading-relaxed text-current/66 mt-1'>
					{para.items.map((item, j) => (
						<li key={j} className='flex gap-2'>
							<span className='text-current/50 shrink-0'>—</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		) : (
			<div className='w-full space-y-0' key={i}>
				<p className='text-sm leading-relaxed text-current/66'>{para}</p>
				{i === 0 ? <Separator className='mt-6 lg:mt-8' decorative /> : null}
			</div>
		)
	);
};

export const CaseStudyBlock = ({ caseStudy, as: Tag = 'div' }) => {
	const { t } = useTranslation();
	const b = t('mv.caseUi.caseStudyBlock', { returnObjects: true }) || {};
	const ui = t('mv.caseUi', { returnObjects: true }) || {};
	const impl = normalizeImpl(caseStudy.implementation);
	const hasDesign = impl?.design?.length > 0;
	const hasCode = impl?.code?.length > 0;

	return (
		<Card variant='secondary' className='px-6 py-8 lg:px-10 space-y-10 md:col-span-2' role='region' aria-label={ui.caseStudyDetailsAria} as={Tag}>
			{(caseStudy.businessProblem || caseStudy.strategicDecision) ? (
				<CaseSection heading={b.context} headingAs='h6' className='relative'>
					{caseStudy.businessProblem ? <p className='text-base leading-relaxed text-current/88 mb-4'>{caseStudy.businessProblem}</p> : null}
					{caseStudy.strategicDecision ? (
						<Card variant='default' className='px-6 py-5'>
							<p className='text-[1em] leading-relaxed text-current/66'>{caseStudy.strategicDecision.intro}</p>
							<p className='font-mono font-medium tracking-tight text-xl leading-snug text-foreground'>{caseStudy.strategicDecision.question}</p>
						</Card>
					) : null}
				</CaseSection>
			) : null}
			{caseStudy.process?.length > 0 ? (
				<CaseSection heading={caseStudy.processHeading || b.processDefault} headingAs='h6'>
					{caseStudy.process.map((p, pi) => (
						<div key={p.phase + p.label}>
							{pi > 0 ? <Separator decorative /> : null}
							<div className='grid gap-3 py-3 sm:grid-cols-[100px_minmax(0,1fr)]'>
								<div className='flex flex-col gap-1'>
									<p className='text-xs uppercase tracking-[0.16em] text-current/66'>{p.phase}</p>
									<p className='text-sm text-current/88'>{p.label}</p>
								</div>
								<div className='flex flex-col gap-1'>
									<p className='font-medium text-base text-current'>{p.title}</p>
									<p className='text-sm leading-relaxed text-current/66'>{p.description}</p>
								</div>
							</div>
						</div>
					))}
				</CaseSection>
			) : null}
			{impl && (hasDesign || hasCode) ? (
				<CaseSection heading={b.implementation} headingAs='h6'>
					<div className={'grid w-full gap-6 2xl:gap-8 ' + (hasDesign && hasCode ? 'grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]' : 'grid-cols-[repeat(auto-fill,minmax(25rem,1fr))]')}>
						{hasDesign && hasCode ? (
							<>
								<ImplementationBlocks blocks={impl.design} title={b.implementationDesign} />
								<ImplementationBlocks blocks={impl.code} title={b.implementationCode} />
							</>
						) : (
							<ImplementationBlocks blocks={impl.design} />
						)}
					</div>
				</CaseSection>
			) : null}
			{caseStudy.resultsMetrics?.length > 0 ? (
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
		</Card>
	);
};
