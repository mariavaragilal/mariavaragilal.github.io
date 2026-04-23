import React from 'react';
import { srOnly, focusRing } from '../../../../../constants/utils/a11y';
import { cn } from '../../../../../constants/utils/cn';
import { LabelSection } from './LabelSection';

// Grouped sources: [{ theme, links: [...] }]. Flat sources: [{ url, label }].
// We support both shapes because older case files use the flat form.
const isGrouped = (sources) => Array.isArray(sources) && sources.some((s) => s && typeof s === 'object' && s.theme && Array.isArray(s.links));
const isLegacyFlat = (sources) => Array.isArray(sources) && sources.length > 0 && sources.every((s) => s && typeof s === 'object' && typeof s.url === 'string' && typeof s.label === 'string');

const getHostname = (url) => new URL(url).hostname.replace('www.', '');

// Card-style external link used for live work, client deliveries, portfolios.
const ReferenceLink = ({ href, label, opensNewTab }) => (
	<a href={href} target='_blank' rel='noopener noreferrer' className={cn('flex flex-wrap items-center justify-between gap-x-2 gap-y-1 min-w-0 w-full border-b border-border py-3', focusRing)}>
		<span className='text-[.625em] text-current/66 uppercase tracking-[0.18em] min-w-0 break-words'>{label}</span>
		<span className='text-[.8em] font-mono text-current shrink-0 break-all text-right'>{getHostname(href)} →</span>
		<span className={srOnly}>{opensNewTab}</span>
	</a>
);

// Plain-URL row used inside the Sources section (no curated label).
const SourceLink = ({ url, opensNewTab }) => (
	<a href={url} target='_blank' rel='noopener noreferrer' className={cn('block border-b border-border py-2 leading-tight', focusRing)}>
		<span className='text-[.75em] font-mono text-current break-all'>{url}</span>
		<span className={srOnly}> {opensNewTab}</span>
	</a>
);

const LinkList = ({ links, opensNewTab, ariaLabel }) => (
	<nav className='p-0 -mt-3' aria-label={ariaLabel}>
		{links.map((l) => (
			<ReferenceLink key={l.url} href={l.url} label={l.label} opensNewTab={opensNewTab}/>
		))}
	</nav>
);

const SourcesBlock = ({ sources, opensNewTab, navAria }) => (
	<nav className='p-0' aria-label={navAria}>
		{isGrouped(sources) ? (
			<React.Fragment>
				{sources.filter((s) => typeof s === 'string').map((s) => (
					<p key={s} className='text-[.75em] text-current/66 mb-0'>{s}</p>
				))}
				{sources.filter((g) => g?.theme && Array.isArray(g.links)).map((g) => (
					<div key={g.theme} className='mt-4 last:mb-0'>
						<p className='text-[.625em] text-current/66 uppercase tracking-[0.18em]'>{g.theme}</p>
						{g.links.map((l) => <SourceLink key={l.url} url={l.url} opensNewTab={opensNewTab}/>)}
					</div>
				))}
			</React.Fragment>
		) : (
			sources.map((l) => <SourceLink key={l.url} url={l.url} opensNewTab={opensNewTab}/>)
		)}
	</nav>
);

export const References = ({ app, ui, opensNewTab }) => {
	const refs = app.references || {};
	const refUi = ui.references || {};
	const sources = refs.sources;
	const showSources = sources?.length > 0 && (isGrouped(sources) || isLegacyFlat(sources));
	const portfolio = [...(refs.dribbble || []), ...(refs.behance || [])];

	return (
		<React.Fragment>
			{refs.links?.length > 0 ? (
				<LabelSection heading={app.caseStudy && Object.keys(app.caseStudy).length > 0 ? ui.live : ui.directLink} headingAs='h3'>
					<LinkList links={refs.links} opensNewTab={opensNewTab} ariaLabel={ui.liveWorkNav}/>
				</LabelSection>
			) : null}

			{showSources ? (
				<LabelSection heading={refUi.sourcesHeading || 'Sources'} headingAs='h3'>
					<SourcesBlock sources={sources} opensNewTab={opensNewTab} navAria={refUi.sourcesNavAria || ui.liveWorkNav}/>
				</LabelSection>
			) : null}

			{refs.clients?.length > 0 ? (
				<LabelSection heading={ui.clientDeliveries} headingAs='h3'>
					<LinkList links={refs.clients} opensNewTab={opensNewTab} ariaLabel={ui.clientDeliveriesNav}/>
				</LabelSection>
			) : null}

			{portfolio.length > 0 ? (
				<LabelSection heading={ui.portfolio} headingAs='h3'>
					<LinkList links={portfolio} opensNewTab={opensNewTab} ariaLabel={ui.portfolioNav}/>
				</LabelSection>
			) : null}
		</React.Fragment>
	);
};
