import { ChapterBand, EditorialHeading, formatChapterKicker } from '../_common/CaseChapter';
import { DecisionList } from '../_common/CaseDecisions';
import { Card } from '../../../../../../_common/components';
import { RichText } from '../../../../RichText';
import { getProjectKickerStyle } from '../../../../../../constants/utils/colorContrast';
import { formatTwoDigit } from '../../../../../../constants/utils/formatNumberString';

const IndexLine = ({ index, name, summary }) => {
	const s = summary || '';
	return (
		<li className='grid md:grid-cols-[2.25rem_minmax(0,14rem)_1fr] gap-x-6 md:gap-x-8 gap-y-1 items-baseline py-2.5 min-w-0'>
			<span className='font-mono text-[0.6875rem] font-medium text-current/40 tabular-nums' aria-hidden='true'>{formatTwoDigit(index)}</span>
			<span className='font-mono text-[0.8125rem] md:text-[0.875rem] font-medium text-current leading-snug break-words min-w-0'>{name}</span>
			{s ? <RichText as='span' className='text-[0.875rem] leading-relaxed text-current/70 break-words min-w-0' text={s} /> : <span className='text-[0.875rem] text-current/40'>—</span>}
		</li>
	);
};

const IndexGroup = ({ label, count, items }) => {
	if (!items.length) return null;
	return (
		<div className='min-w-0'>
			<div className='flex items-baseline gap-3 mb-2'>
				<span className='mb-4 text-xs md:text-sm uppercase tracking-[0.08em] font-semibold text-current/88'>{label}</span>
				<span className='text-current/22'>·</span>
				<span className='font-mono text-[0.6875rem] text-current tabular-nums'>{formatTwoDigit(count)}</span>
			</div>
			<ul className='list-none p-0 m-0'>
				{items.map((item, i) => (
					<IndexLine key={(item.name || i) + '-' + i} index={i + 1} name={item.name} summary={item.summary || item.description} />
				))}
			</ul>
		</div>
	);
};

const isSystemIndexVisible = (systemIndex) => {
	if (!systemIndex || typeof systemIndex !== 'object') return false;
	const hasComponents = Array.isArray(systemIndex.components) && systemIndex.components.length > 0;
	const hasPatterns = Array.isArray(systemIndex.patterns) && systemIndex.patterns.length > 0;
	return Boolean(hasComponents || hasPatterns);
};

const SystemIndex = ({ systemIndex, labels }) => {
	if (!isSystemIndexVisible(systemIndex)) return null;
	const components = Array.isArray(systemIndex.components) ? systemIndex.components : [];
	const patterns = Array.isArray(systemIndex.patterns) ? systemIndex.patterns : [];
	const titleLabel = labels.systemIndexToggle || labels.designSystemIndexTitle || 'Primitive references';
	return (
		<div className='relative mt-14 md:mt-20'>
			<p className='text-editorial-eyebrow-sm mb-5 text-current/66 tracking-[0.2em]'>{titleLabel}</p>
			<Card as='section' variant='muted' padding='' className='relative p-6 md:p-10 min-w-0'>
				{systemIndex.intro ? <RichText as='p' className='text-base leading-relaxed text-current/75 mb-8 max-w-full' text={systemIndex.intro} /> : null}
				<div className='space-y-10'>
					<IndexGroup label={labels.designSystemComponents || 'Components'} count={components.length} items={components} />
					<IndexGroup label={labels.designSystemPatterns || 'Patterns'} count={patterns.length} items={patterns} />
				</div>
			</Card>
		</div>
	);
};

export const isKeyDecisionsVisible = (caseStudy) => {
	const items = caseStudy.keyDecisions?.items;
	return Array.isArray(items) && items.length > 0;
};

export const KeyDecisions = ({ caseStudy, labels, projectColor, sectionNumbers }) => {
	if (!isKeyDecisionsVisible(caseStudy)) return null;
	const kd = caseStudy.keyDecisions || {};
	const showProcessIntro = !!(kd.introTitle || kd.intro);
	return (
		<ChapterBand variant='paper' projectColor={projectColor}>
			<EditorialHeading
				eyebrow={formatChapterKicker(kd.heading || labels.keyDecisionsDefault || 'Key decisions', sectionNumbers.keyDecisions)}
				title={kd.title}
				eyebrowStyle={getProjectKickerStyle(projectColor, false)}
			>
				{showProcessIntro ? (
					<div className='relative mb-10 space-y-4'>
						{kd.introTitle ? <RichText as='h3' className='text-editorial-h3 text-current' text={kd.introTitle} /> : null}
						{kd.intro ? <RichText as='p' className='text-base leading-relaxed mb-10 text-current/88' text={kd.intro} /> : null}
					</div>
				) : null}
				<DecisionList items={kd.items} projectColor={projectColor} labels={labels} />
				{isSystemIndexVisible(kd.systemIndex) ? <SystemIndex systemIndex={kd.systemIndex} labels={labels} /> : null}
			</EditorialHeading>
		</ChapterBand>
	);
};
