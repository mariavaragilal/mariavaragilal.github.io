import { useTranslation } from 'react-i18next';
import { Blockquote, BlockquoteMain, BlockquoteSecondary, Card, ChatBubbleAnswer, Separator } from '../../../../_common/components';
import { CaseSection } from './DrawerShared';
import { DrawerMedia } from './DrawerMedia';
import { DrawerDecisionsInPractice } from './DrawerDecisionsInPractice';
import { Matrix } from '../../../../_common/components/complex/Matrix';

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
	return (
		items.map((para, i) =>
			para && typeof para === 'object' && para.heading && para.items ? (
				<Card variant='ghost' className='min-w-0 w-full p-0 border-0 space-y-2' key={i}>
					{i === 0 && title ? <p className='text-xs uppercase tracking-[0.06em] text-current/88 mt-0 mb-2'>{title}</p> : null}
					<p className='font-medium text-base text-current break-words'>{para.heading}</p>
					<ul className='space-y-1 text-sm leading-relaxed text-current/88 mt-1'>
						{para.items.map((item, j) => (
							<li key={j} className='flex min-w-0 gap-2'>
								<span className='text-current/80 shrink-0'>—</span>
								<span className='min-w-0 break-words'>{item}</span>
							</li>
						))}
					</ul>
					{para.image ? <DrawerMedia image={para.image} variant='strip' className='my-4' /> : null}
				</Card>
			) : (
				<div className='min-w-0 w-full space-y-2' key={i}>
					<p className='text-sm leading-relaxed text-current/88 break-words'>{para}</p>
					{i < items.length - 1 ? <Separator className='my-4' decorative /> : null}
				</div>
			)
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
	const hasSkills = caseStudy.skillsDemonstrated?.length > 0;

	return (
		<Card variant='secondary' className='min-w-0 w-full px-3 sm:px-4 py-6 sm:py-8 lg:px-10 space-y-8 md:col-span-auto' role='region' aria-label={ui.caseStudyDetailsAria} as={Tag}>
			{(caseStudy.businessProblem || caseStudy.strategicDecision || caseStudy.heroImage || caseStudy.mobileHeroImage) ? (
				<CaseSection heading={b.context} headingAs='h3' className='relative'>
					{caseStudy.businessProblem ? <p className='text-base leading-relaxed text-current/88 mb-4'>{caseStudy.businessProblem}</p> : null}
					<Card variant='ghost' className={'bg-secondary border-0 flex flex-col gap-4' + (caseStudy.heroImage || caseStudy.mobileHeroImage ? ' p-3 sm:p-4' : '')}>
						{caseStudy.heroImage || caseStudy.mobileHeroImage ? (
							<div className='flex flex-col md:flex-row items-center gap-4 my-4'>
								{caseStudy.heroImage ? <DrawerMedia image={caseStudy.heroImage} variant='annotated' className={caseStudy.mobileHeroImage ? 'md:flex-1 min-w-0 my-0' : 'w-full mt-0'} /> : null}
								{caseStudy.mobileHeroImage ? <DrawerMedia image={caseStudy.mobileHeroImage} variant='mobile' className={caseStudy.heroImage ? 'w-[min(11rem,35vw)] md:w-44 shrink-0 my-0 h-full' : 'w-full mt-0'} /> : null}
							</div>
						) : null}
						{caseStudy.strategicDecision ? (
							<Card variant='default' className='bg-background/95 border border-border/60 px-4 sm:px-6 py-4 sm:py-5 space-y-2'>
								<p className='text-sm leading-relaxed text-current/66'>{caseStudy.strategicDecision.intro}</p>
								<p className='font-mono font-medium tracking-tight text-xl leading-snug text-current -mt-1.5'>{caseStudy.strategicDecision.question}</p>
							</Card>
						) : null}
					</Card>
				</CaseSection>
			) : null}
			{caseStudy.process?.length > 0 ? (
				<CaseSection heading={caseStudy.processHeading || b.processDefault} headingAs='h3'>
					{caseStudy.process.map((p, pi) => (
						<div key={p.phase + p.label}>
							{pi > 0 ? <Separator decorative /> : null}
							<div className='grid gap-4 py-4 lg:grid-cols-[7.5rem_minmax(0,1fr)] items-start'>
								<div className='flex flex-col gap-1'>
									<p className='text-xs uppercase tracking-[0.04em] text-current/88'>{p.phase}</p>
									<p className='text-sm text-current/66'>{p.label}</p>
								</div>
								<div className='flex flex-col gap-1 min-w-0'>
									<p className='font-medium text-base text-current'>{p.title}</p>
									<p className='text-sm leading-relaxed text-current/88'>{p.description}</p>
									{(p.image || p.mobileImage || p.imageMobile) ? (
										<div className='flex flex-col md:flex-row items-stretch md:items-start gap-4 mt-4'>
											{p.image ? <DrawerMedia image={p.image} variant='annotated' className={p.mobileImage || p.imageMobile ? 'w-full self-stretch min-w-0 my-0' : 'w-full self-stretch mt-0'} /> : null}
											{(p.mobileImage || p.imageMobile) ? <DrawerMedia image={p.mobileImage || p.imageMobile} variant='mobile' className='w-full self-stretch md:w-[min(7rem,28vw)] md:w-28 shrink-0 my-0' /> : null}
										</div>
									) : null}
								</div>
							</div>
						</div>
					))}
				</CaseSection>
			) : null}
			<DrawerDecisionsInPractice caseStudy={caseStudy} labels={b} />
			{impl && (hasDesign || hasCode) ? (
				<CaseSection heading={b.implementation} headingAs='h3'>
					<div className={'grid w-full min-w-0 gap-6 2xl:gap-8 ' + (hasDesign && hasCode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1')}>
						{hasDesign && hasCode ? (
							<>
								<ImplementationBlocks blocks={impl.design} title={b.implementationDesign} />
								<ImplementationBlocks blocks={impl.code} title={b.implementationCode} />
							</>
						) : (
							<ImplementationBlocks blocks={hasDesign ? impl.design : impl.code} />
						)}
					</div>
				</CaseSection>
			) : null}
			{caseStudy.resultsMetrics?.length > 0 ? (
				<CaseSection heading={b.resultsMetrics} headingAs='h3'>
					<div className='relative flex flex-wrap gap-2'>
						{caseStudy.resultsMetrics.map((m) => (
							<ChatBubbleAnswer width='fit-content' variant='inverse' key={m}>{m}</ChatBubbleAnswer>
						))}
					</div>
				</CaseSection>
			) : null}
			{caseStudy.tradeoffsLearnings ? (
				<CaseSection heading={caseStudy.tradeoffsHeading || b.tradeoffsDefault} headingAs='h3'>
					<Card variant='default' className='px-6 py-6 space-y-2'>
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
