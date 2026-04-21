import { useTranslation } from 'react-i18next';
import { AlwaysOn, isAlwaysOnVisible } from './AlwaysOn';
import { Context, isContextVisible } from './Context';
import { Identity, isIdentityVisible } from './Identity';
import { Implementation, isImplementationVisible } from './Implementation';
import { InPractice, isInPracticeVisible } from './InPractice';
import { KeyDecisions, isKeyDecisionsVisible } from './KeyDecisions';
import { LandingPage, isLandingPageVisible } from './LandingPage';
import { Quote } from './Quote';
import { Results, isResultsVisible } from './Results';
import { RoleChapter, isRoleVisible } from './RoleChapter';
import { Tradeoffs, isTradeoffsVisible } from './Tradeoffs';

// Canonical narrative order; each row pairs a chapter with its own visibility
// predicate so the kicker numbers (01 · …) stay contiguous per case — hidden
// chapters don't leave gaps. Quote has no eyebrow and sits outside the list.
const SECTIONS = [
	['context', Context, isContextVisible],
	['role', RoleChapter, isRoleVisible],
	['identity', Identity, isIdentityVisible],
	['keyDecisions', KeyDecisions, isKeyDecisionsVisible],
	['alwaysOn', AlwaysOn, isAlwaysOnVisible],
	['landingPage', LandingPage, isLandingPageVisible],
	['inPractice', InPractice, isInPracticeVisible],
	['implementation', Implementation, isImplementationVisible],
	['metrics', Results, isResultsVisible],
	['tradeoffs', Tradeoffs, isTradeoffsVisible],
];

export const CaseStudy = ({ caseStudy, outcomes = [], as: Tag = 'div' }) => {
	const { t } = useTranslation();
	const labels = t('mv.caseUi.caseStudyBlock', { returnObjects: true }) || {};
	const ui = t('mv.caseUi', { returnObjects: true }) || {};
	const projectColor = caseStudy.projectColor;

	const visibleKeys = SECTIONS.filter(([, , visible]) => visible(caseStudy, outcomes)).map(([key]) => key);
	const sectionNumbers = Object.fromEntries(visibleKeys.map((k, i) => [k, i + 1]));
	const common = { caseStudy, labels, projectColor, sectionNumbers };

	return (
		<Tag className='min-w-0 font-sans' role='region' aria-label={ui.caseStudyDetailsAria}>
			{SECTIONS.map(([key, Component]) => <Component key={key} {...common} outcomes={outcomes} />)}
			<Quote caseStudy={caseStudy} />
		</Tag>
	);
};
