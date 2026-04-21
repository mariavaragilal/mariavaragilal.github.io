import { Card, Media } from '../../../../../../_common/components';
import { ChapterBand, formatChapterKicker } from '../_common/CaseChapter';
import { CASE_IMAGES } from '../_common/caseImages';
import { RichText } from '../../../../RichText';
import { cn } from '../../../../../../constants/utils/cn';
import { getProjectKickerStyle } from '../../../../../../constants/utils/colorContrast';

const STEP_ORDER = ['task', 'issue', 'insight', 'decision', 'outcome'];
const labelKey = (step) => 'decision' + step.charAt(0).toUpperCase() + step.slice(1);

const StepRow = ({ label, text, isOutcome, isDecision }) => {
	if (!text) return null;
	const rowClass = isOutcome ? 'rounded-md bg-secondary/55 px-3 mt-1' : 'border-b last:border-b-0 border-border';
	const textClass = isDecision ? 'text-current font-medium' : 'text-current/80';
	return (
		<div className={cn('grid grid-cols-[4.5rem_1fr] py-3 gap-3', rowClass)}>
			<span className='text-xs font-medium uppercase tracking-wide text-current pt-1'>{label}</span>
			<RichText as='p' className={cn('text-sm leading-relaxed m-0 break-words', textClass)} text={text} />
		</div>
	);
};

const DecisionCard = ({ item, labels }) => (
	<Card variant='ghost' className='border border-border bg-card px-4 sm:px-5 py-5'>
		{item.image ? <Media image={item.image} imageMap={CASE_IMAGES} variant='annotated' className='w-full mb-5 mt-0' /> : null}
		<div className='flex flex-col items-start gap-2 justify-between mb-5'>
			<RichText as='p' className='text-sm text-current/66' text={item.badge || item.strength} />
			{item.title ? <RichText as='p' className='text-base leading-snug font-medium -mt-1' text={item.title} /> : null}
		</div>
		{STEP_ORDER.map((step) => (
			<StepRow key={step} label={labels[labelKey(step)]} text={item[step]} isDecision={step === 'decision'} isOutcome={step === 'outcome'} />
		))}
	</Card>
);

export const isInPracticeVisible = (caseStudy) => {
	const items = caseStudy.inPractice?.items;
	return Array.isArray(items) && items.length > 0;
};

export const InPractice = ({ caseStudy, labels, projectColor, sectionNumbers }) => {
	if (!isInPracticeVisible(caseStudy)) return null;
	const ip = caseStudy.inPractice || {};
	const items = ip.items;
	const heading = formatChapterKicker(labels.inPractice || 'In practice', sectionNumbers.inPractice);
	const eyebrowStyle = getProjectKickerStyle(projectColor, false);
	return (
		<ChapterBand variant='paper'>
			<section className='mx-auto w-full' aria-label={heading}>
				<p style={eyebrowStyle} className='text-editorial-eyebrow text-current mb-4 md:mb-5'><span>{heading}</span></p>
				{ip.title ? <RichText as='p' className='text-base leading-snug font-medium text-current mb-6 md:mb-8 sr-only' text={ip.title} /> : null}
				<div className='grid gap-x-2 gap-y-6 md:grid-cols-[repeat(auto-fit,minmax(25em,1fr))]'>
					{items.map((item, i) => <DecisionCard key={item.title || i} item={item} labels={labels} />)}
				</div>
			</section>
		</ChapterBand>
	);
};
