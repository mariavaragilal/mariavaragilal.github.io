import { getProjectAccentVars } from '../../../../../constants/utils/colorContrast';
import { RichText } from '../../../RichText';

export const Hero = ({ app, kicker, projectColor }) => {
	const hero = app.hero;
	if (!hero) return null;
	const heading = hero.heading;
	const dek = hero.dek;
	const scope = app.caseStudy?.scope ?? app.scope;
	const scopeItems = Array.isArray(scope) ? scope : (typeof scope === 'string' ? scope.split('·').map(s => s.trim()).filter(Boolean) : []);
	const hasHeading = !!(heading && String(heading).length > 0);
	const hasDek = !!(dek && String(dek).length > 0);
	const hasScope = scopeItems.length > 0;
	if (!hasHeading && !hasDek && !hasScope) return null;
	const accentVars = getProjectAccentVars(projectColor, 4.5);
	const accentScope = projectColor && accentVars ? { 'data-project-accent': '', style: accentVars } : {};
	const accentFg = projectColor ? { color: 'var(--project-accent)' } : undefined;
	const scopeLabel = app.caseStudy?.scopeLabel || 'Scope';

	return (
		<header className='min-w-0 max-w-full space-y-4' {...accentScope}>
			{hasHeading ? <p className='sr-only text-editorial-hero-tag text-current' style={accentFg}>{kicker}</p> : null}
			{hasHeading ? <RichText as='h1' className='text-editorial-hero text-current break-words min-w-0 w-full max-w-full' text={heading} /> : null}
			{hasDek ? <RichText as='p' className='text-editorial-hero-sub text-current/88 break-words min-w-0 w-full max-w-full' text={dek} /> : null}
			{hasScope ? (
				<ul className='flex flex-wrap gap-6 pt-1 list-none m-0 p-0'>
					{scopeItems.map((item, i) => (
						<li key={'hero-scope-' + i} className='text-editorial-hero-tag inline-flex items-center gap-2'>
							<span aria-hidden='true' className='inline-block items-middle leading-none leading-none mb-0.5' style={accentFg}>●</span>
							<RichText as='span' className='tracking-normal text-current/88 items-middle' text={item} />
						</li>
					))}
				</ul>
			) : null}
		</header>
	);
};