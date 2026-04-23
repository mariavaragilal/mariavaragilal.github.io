import { getProjectAccentVars } from '../../../../../constants/utils/colorContrast';
import { RichText } from '../../../RichText';

export const Hero = ({ app, kicker, projectColor }) => {
	const hero = app.hero;
	if (!hero) return null;
	const heading = hero.heading;
	const dek = hero.dek;
	const labels = hero.labels;
	const hasHeading = !!(heading && String(heading).length > 0);
	const hasDek = !!(dek && String(dek).length > 0);
	const hasLabels = Array.isArray(labels) && labels.length > 0;
	if (!hasHeading && !hasDek && !hasLabels) return null;
	const accentVars = getProjectAccentVars(projectColor, 4.5);
	const accentScope = projectColor && accentVars ? { 'data-project-accent': '', style: accentVars } : {};
	const accentFg = projectColor ? { color: 'var(--project-accent)' } : undefined;
	return (
		<header className='min-w-0 max-w-full space-y-4' {...accentScope}>
			{hasHeading ? <p className='sr-only text-editorial-hero-tag text-current' style={accentFg}>{kicker}</p> : null}
			{hasHeading ? <RichText as='h1' className='text-editorial-hero text-current break-words min-w-0 w-full max-w-full' text={heading} /> : null}
			{hasDek ? <RichText as='p' className='text-editorial-hero-sub text-current/88 break-words min-w-0 w-full max-w-full' text={dek} /> : null}
			{hasLabels ? (
				<ul className='flex flex-wrap gap-4 pt-1 list-none m-0 p-0'>
					{labels.map((label, i) => (
						<li key={'hero-skill-' + i} className='text-editorial-hero-tag inline-flex gap-1'>
							<span aria-hidden='true' className='inline-block items-middle leading-none lh-1' style={accentFg}>●</span>
							<RichText as='span' className='text-current/66 items-middle' text={label} />
						</li>
					))}
				</ul>
			) : null}
		</header>
	);
};