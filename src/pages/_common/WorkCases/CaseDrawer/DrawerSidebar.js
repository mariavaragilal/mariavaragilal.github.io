import React from 'react';
import { useTranslation } from 'react-i18next';
import { srOnly, focusRing } from '../../../../constants/utils/a11y';
import { joinSkillsDemonstrated } from '../../../../constants/utils/structuredData';
import { hasCaseStudy, CaseSection } from './DrawerShared';

const isGroupedSources = (sources) => Array.isArray(sources) && sources.some((s) => s && typeof s === 'object' && s.theme && Array.isArray(s.links));
const isLegacySourceList = (sources) => Array.isArray(sources) && sources.length > 0 && sources.every((s) => s && typeof s === 'object' && typeof s.url === 'string' && typeof s.label === 'string');

const ReferenceLink = ({ href, label, hostname, opensNewTab }) => (
	<a href={href} target='_blank' rel='noopener noreferrer' className={'flex flex-wrap items-center justify-between border-b border-border py-3 ' + focusRing}>
		<span className='text-[.625em] text-current/66 uppercase tracking-[0.18em]'>{label}</span>
		<span className='text-[.8em] font-mono text-current'>{hostname} →</span>
		<span className={srOnly}>{opensNewTab}</span>
	</a>
);

export const DrawerSidebar = ({ app, ui }) => {
	const { t } = useTranslation();
	const refUi = ui.references || {};
	const opensNewTab = t('mv.contact.opensNewTab');
	const sources = app.references?.sources;
	const demonstratedSkills = joinSkillsDemonstrated(app.caseStudy?.skillsDemonstrated)
		|| joinSkillsDemonstrated(app.caseStudy?.strengthsDemonstrated);
	const projectSpecificSkills = app.caseStudy?.projectSpecificSkills;
	const skillsByStrength = Array.isArray(app.caseStudy?.skillsByStrength) ? app.caseStudy.skillsByStrength : [];

	return (
		<div className='relative w-full xl:w-96 2xl:w-112 shrink-0 flex flex-col md:border-b md:border-border xl:border-b-0 xl:border-r p-4 sm:p-6 mb:pb-0 xl:p-10 space-y-8'>
			<div className='flex flex-col gap-1'>
				<p className='text-[.8em] font-mono text-current underline'>{app.period}</p>
				<h1 className='font-mono font-medium text-2xl leading-snug'>{app.title}</h1>
				<p className='text-[1rem] font-sans text-current/66 mt-1.5'>{app.subtitle}</p>
			</div>

			<section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 md:gap-x-16 xl:gap-y-8 xl:overflow-y-auto space-y-8 xl:space-y-0'>
				{app.role ? (
					<CaseSection heading={ui.role} headingAs='h6'>
						<p className='text-[.8em] font-mono text-current'>{app.role}</p>
					</CaseSection>
				) : null}
				{app.tools ? (
					<CaseSection className='xl:order-last' heading={ui.tools} headingAs='h6'>
						<p className='text-[.8em] font-mono text-current'>{app.tools}</p>
					</CaseSection>
				) : null}
				{(demonstratedSkills || projectSpecificSkills || skillsByStrength.length > 0) ? (
					<CaseSection className='md:col-span-2 xl:col-span-1' heading={ui.caseStudyBlock?.skills || ui.caseStudyBlock?.strengths} headingAs='h6'>
						{skillsByStrength.length > 0 ? (
							<div className='space-y-3'>
								{skillsByStrength.map((group) => (
									<div key={group.strength} className='space-y-0.5'>
										<p className='text-[.72em] uppercase tracking-[0.08em] text-current/66'>{group.strength}</p>
										<p className='text-[.8em] font-mono text-current'>{group.items}</p>
									</div>
								))}
							</div>
						) : (
							<div className='space-y-3'>
								{demonstratedSkills ? (
									<div className='space-y-0.5'>
										<p className='text-[.72em] uppercase tracking-[0.08em] text-current/66'>{ui.caseStudyBlock?.strengths || 'Strengths'}</p>
										<p className='text-[.8em] font-mono text-current'>{demonstratedSkills}</p>
									</div>
								) : null}
								{projectSpecificSkills ? (
									<div className='space-y-0.5'>
										<p className='text-[.72em] uppercase tracking-[0.08em] text-current/66'>{ui.caseStudyBlock?.projectSkills || 'Project-specific skills'}</p>
										<p className='text-[.8em] font-mono text-current'>{projectSpecificSkills}</p>
									</div>
								) : null}
							</div>
						)}
					</CaseSection>
				) : null}
				{app.references?.links?.length > 0 ? (
					<CaseSection heading={hasCaseStudy(app) ? ui.live : ui.directLink} headingAs='h6'>
						<nav className='p-0 -mt-3' aria-label={ui.liveWorkNav}>
							<h1 className='sr-only'>{ui.liveWorkSr}</h1>
							{app.references.links.map((l) => (
								<ReferenceLink key={l.url} href={l.url} label={l.label} hostname={new URL(l.url).hostname.replace('www.', '')} opensNewTab={opensNewTab} />
							))}
						</nav>
					</CaseSection>
				) : null}
				{sources?.length > 0 && (isGroupedSources(sources) || isLegacySourceList(sources)) ? (
					<CaseSection heading={refUi.sourcesHeading || 'Sources'} headingAs='h6'>
						{isGroupedSources(sources) ? (
							<React.Fragment>
								{sources.filter((s) => typeof s === 'string').map((s) => (
									<p key={s} className='text-[.75em] text-current/66 mb-0'>{s}</p>
								))}
								<nav className='p-0' aria-label={refUi.sourcesNavAria || ui.liveWorkNav}>
									<h1 className='sr-only'>{ui.liveWorkSr}</h1>
									{sources.filter((g) => g?.theme && Array.isArray(g.links)).map((g) => (
										<div key={g.theme} className='mt-4 last:mb-0'>
											<p className='text-[.625em] text-current/66 uppercase tracking-[0.18em]'>{g.theme}</p>
											{g.links.map((l) => (
												<a key={l.url} href={l.url} target='_blank' rel='noopener noreferrer' className={'block border-b border-border py-2 leading-tight ' + focusRing}>
													<span className='text-[.75em] font-mono text-current break-all'>{l.url}</span>
													<span className={srOnly}> {opensNewTab}</span>
												</a>
											))}
										</div>
									))}
								</nav>
							</React.Fragment>
						) : (
							<nav className='p-0' aria-label={refUi.sourcesNavAria || ui.liveWorkNav}>
								<h1 className='sr-only'>{ui.liveWorkSr}</h1>
								{sources.map((l) => (
									<a key={l.url} href={l.url} target='_blank' rel='noopener noreferrer' className={'block border-b border-border py-2 leading-tight ' + focusRing}>
										<span className='text-[.75em] font-mono text-current break-all'>{l.url}</span>
										<span className={srOnly}> {opensNewTab}</span>
									</a>
								))}
							</nav>
						)}
					</CaseSection>
				) : null}
				{app.references?.clients?.length > 0 ? (
					<CaseSection heading={ui.clientDeliveries} headingAs='h6'>
						<nav className='p-0 -mt-3' aria-label={ui.clientDeliveriesNav}>
							<h1 className='sr-only'>{ui.clientDeliveriesSr}</h1>
							{app.references.clients.map((c) => (
								<ReferenceLink key={c.url} href={c.url} label={c.label} hostname={new URL(c.url).hostname.replace('www.', '')} opensNewTab={opensNewTab} />
							))}
						</nav>
					</CaseSection>
				) : null}
				{(app.references?.dribbble?.length || app.references?.behance?.length) ? (
					<CaseSection heading={ui.portfolio} headingAs='h6'>
						<nav className='p-0 -mt-3' aria-label={ui.portfolioNav}>
							<h1 className='sr-only'>{ui.portfolioSr}</h1>
							{[...(app.references.dribbble || []), ...(app.references.behance || [])].map((p) => (
								<ReferenceLink key={p.url} href={p.url} label={p.label} hostname={new URL(p.url).hostname.replace('www.', '')} opensNewTab={opensNewTab} />
							))}
						</nav>
					</CaseSection>
				) : null}
			</section>
		</div>
	);
};
