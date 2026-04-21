import { Card } from '../../../../../../_common/components';
import { ChapterBand, formatChapterKicker } from '../_common/CaseChapter';
import { RichText } from '../../../../RichText';
import { getProjectKickerStyle } from '../../../../../../constants/utils/colorContrast';

export const isContextVisible = (caseStudy) => {
	const ctx = caseStudy.context;
	return Boolean((ctx?.lead || caseStudy.businessProblem) || ctx?.body || ctx?.bridge || ctx?.title || caseStudy.strategicDecision || ctx?.scope);
};

export const Context = ({ caseStudy, labels, projectColor, sectionNumbers }) => {
	if (!isContextVisible(caseStudy)) return null;
	const ctx = caseStudy.context;
	const lead = ctx?.lead || caseStudy.businessProblem;
	const body = ctx?.body;
	const bridge = ctx?.bridge;
	const strat = caseStudy.strategicDecision;
	const scope = ctx?.scope;

	const eyebrow = formatChapterKicker(ctx?.eyebrow || labels.context || 'Context', sectionNumbers.context);
	const eyebrowStyleVar = getProjectKickerStyle(projectColor, false, true);
	const eyebrowStyle = getProjectKickerStyle(projectColor, false);
	const stratLead = strat?.lead || strat?.intro;
	const scopeLabel = labels.scope || 'Scope';

	const contextHead = (
		<div className='relative min-w-0'>
			<p style={eyebrowStyle} className='text-editorial-eyebrow mb-4 md:mb-5 text-current'><span>{eyebrow}</span></p>
			{scope ? (
				<p className='text-editorial-eyebrow-sm mb-3 md:mb-4 text-current/66 tracking-[0.12em]'>
					<span className='font-medium text-current/70'>{scopeLabel}: </span>
					<RichText as='span' className='tracking-normal text-current/88' text={scope} />
				</p>
			) : null}
			{ctx?.title ? <RichText as='h2' className='text-editorial-section text-current break-words text-current' text={ctx.title} style={eyebrowStyleVar} /> : null}
		</div>
	);

	const hasContextHead = !!(ctx?.title || scope);
	const showLeadGrid = lead && hasContextHead;
	const leadBlock = <RichText as='p' className='text-base leading-relaxed text-current/88 min-w-0' text={lead} />;

	return (
		<ChapterBand variant='paper' className='-mt-12 md:-mt-16'>
			<div className='relative mx-auto w-full'>
				{showLeadGrid ? (
					<div className='relative grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-12 gap-y-8 md:gap-y-12 items-start md:items-end mb-6 md:mb-8 min-w-0'>
						{contextHead}
						{leadBlock}
					</div>
				) : lead ? (
					<div className='mb-6 md:mb-8 space-y-6 md:space-y-8'>
						{contextHead}
						{leadBlock}
					</div>
				) : (
					<div className='mb-6 md:mb-8'>{contextHead}</div>
				)}
				<div className='space-y-5'>
					{body ? <RichText as='p' className='text-base leading-relaxed text-current/88' text={body} /> : null}
					{bridge ? <RichText as='p' className='text-base leading-relaxed text-current/88 max-w-[92ch]' text={bridge} /> : null}
					{strat ? (
						<Card variant='secondary' className='px-4 sm:px-6 py-4 sm:py-5 space-y-2 mt-2'>
							{stratLead ? <RichText as='p' className='text-sm leading-relaxed text-current/66' text={stratLead} /> : null}
							{strat.question ? <RichText as='p' className='font-mono font-medium tracking-tight text-xl leading-snug text-current -mt-1.5' text={strat.question} /> : null}
						</Card>
					) : null}
				</div>
			</div>
		</ChapterBand>
	);
};
