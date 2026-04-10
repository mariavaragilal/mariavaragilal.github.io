import { Card } from '../../../../_common/components';
import { CaseSection } from './DrawerShared';

const STEP_ORDER = ['task', 'issue', 'insight', 'decision', 'outcome'];

const labelKey = (step) => 'decision' + step.charAt(0).toUpperCase() + step.slice(1);

const StepRow = ({ label, text, isOutcome, isDecision }) => {
	if (!text) return null;

	return (
		<div className={'grid grid-cols-[4.5rem_1fr] py-3 gap-3 ' + (isOutcome ? 'rounded-md bg-secondary/55 px-3 mt-1' : 'border-b last:border-b-0 border-border')}>
			<span className='text-xs font-medium uppercase tracking-wide text-current pt-1'>{label}</span>
			<p className={'text-sm leading-relaxed m-0 break-words ' + (isDecision ? 'text-current font-medium' : 'text-current/80')}>{text}</p>
		</div>
	);
};

const DecisionCard = ({ item, labels }) => {
	return (
		<Card variant='ghost' className='border border-border bg-card px-4 sm:px-5 py-5'>
			<div className='flex flex-col items-start gap-2 justify-between mb-5'>
				<p className='text-sm text-current/66'>{item.strength}</p>
				{item.title ? <p className='text-base leading-snug font-medium -mt-1'>{item.title}</p> : null}
			</div>
			{STEP_ORDER.map((step) => (
				<StepRow key={step} label={labels[labelKey(step)]} text={item[step]} isDecision={step === 'decision'} isOutcome={step === 'outcome'} />
			))}
		</Card>
	);
};

export const DrawerDecisionsInPractice = ({ caseStudy, labels }) => {
	const items = caseStudy?.decisionsInPractice;
	if (!Array.isArray(items) || items.length === 0) return null;

	return (
		<CaseSection heading={labels.decisionsInPractice} headingAs='h3'>
			<div className='grid gap-x-2 gap-y-6 md:grid-cols-[repeat(auto-fit,minmax(30em,1fr))]'>
				{items.map((item, i) => (
					<DecisionCard key={item.title || i} item={item} labels={labels} />
				))}
			</div>
		</CaseSection>
	);
};
