import { joinSkillsDemonstrated } from '../../../../../constants/utils/structuredData';
import { LabelSection } from './LabelSection';

const SubGroup = ({ label, value }) => (
	<div className='space-y-0.5'>
		<p className='text-[.72em] uppercase tracking-[0.08em] text-current/66'>{label}</p>
		<p className='text-[.8em] font-mono text-current'>{value}</p>
	</div>
);

// Two display modes:
//   - byStrength: pre-grouped list like [{ strength, items }]
//   - flat:       Strengths + Project-specific skills blob
// Only one is shown depending on what the case study provides.
export const Skills = ({ caseStudy, ui }) => {
	const demonstrated = joinSkillsDemonstrated(caseStudy?.skillsDemonstrated)
		|| joinSkillsDemonstrated(caseStudy?.strengthsDemonstrated);
	const projectSpecific = caseStudy?.projectSpecificSkills;
	const byStrength = Array.isArray(caseStudy?.skillsByStrength) ? caseStudy.skillsByStrength : [];

	if (!demonstrated && !projectSpecific && byStrength.length === 0) return null;

	const heading = ui.caseStudyBlock?.skills || ui.caseStudyBlock?.strengths;
	const strengthsLabel = ui.caseStudyBlock?.strengths || 'Strengths';
	const projectLabel = ui.caseStudyBlock?.projectSkills || 'Project-specific skills';

	return (
		<LabelSection className='md:col-span-2 xl:col-span-1' heading={heading} headingAs='h3'>
			{byStrength.length > 0 ? (
				<div className='space-y-3'>
					{byStrength.map((group) => (
						<SubGroup key={group.strength} label={group.strength} value={group.items}/>
					))}
				</div>
			) : (
				<div className='space-y-3'>
					{demonstrated ? <SubGroup label={strengthsLabel} value={demonstrated}/> : null}
					{projectSpecific ? <SubGroup label={projectLabel} value={projectSpecific}/> : null}
				</div>
			)}
		</LabelSection>
	);
};
