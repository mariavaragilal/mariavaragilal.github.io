import React from 'react';
import { srOnly, focusRing } from '../../../../../constants/utils/a11y';
import { Badge, ChatBubbleQuestion } from '../../../../../_common/components';
import { CaseSection } from './CaseSharedComponents';
import { CaseStudyBlock } from './CaseStudyBlock';

const hasCaseStudy = (app) => app.caseStudy && app.caseStudy !== null && Object.keys(app.caseStudy).length > 0;

export const CaseDetail = ({ app }) => {
	const isDirectLink = !hasCaseStudy(app);
	return (
		<React.Fragment>
			<section className='grid md:grid-cols-2 gap-6 xl:gap-16 my-8 items-end'>
				<div className='relative flex flex-col gap-2 justify-between space-y-8 pr-6 h-full'>
					<div className='relative mb-auto'>
						<div className='flex gap-1.5 -mb-2'>
							<Badge variant='default' className='mb-0'>{app.pillars}</Badge>
						</div>
						<p className='max-w-4xl text-[1rem] leading-relaxed text-current/88 my-5'>
							{app.highlight}
						</p>
					</div>
					<CaseSection heading='Outcomes'>
						<div className='relative flex flex-wrap gap-1 space-y-1'>
							{app.results.map((r) => (
								<ChatBubbleQuestion width='fit-content' key={r}>{r}</ChatBubbleQuestion>
							))}
						</div>
					</CaseSection>
				</div>
				<div className='relative space-y-8'>
					{app.references?.links?.length > 0 ? (
						<CaseSection heading={isDirectLink ? 'Direct link' : 'Live'}>
							<nav className='p-0' aria-label='Live work'>
								{app.references.links.map((l) => (
									<a key={l.url} href={l.url} target='_blank' rel='noopener noreferrer' className={'flex items-center justify-between border-b border-border py-3 text-sm text-foreground ' + focusRing}>
										<span className='text-[.8em] uppercase tracking-[0.18em] text-current/66'>{l.label}</span>
										<span className='text-[.8em] text-current'>{new URL(l.url).hostname.replace('www.', '')} →</span>
										<span className={srOnly}> (opens in new tab)</span>
									</a>
								))}
							</nav>
						</CaseSection>
					) : null}
					{app.references?.clients?.length > 0 ? (
						<CaseSection heading='Client deliveries'>
							<nav className='p-0' aria-label='Client deliveries'>
								{app.references.clients.map((c) => (
									<a key={c.url} href={c.url} target='_blank' rel='noopener noreferrer' className={'flex items-center justify-between border-b border-border py-3 text-sm text-foreground ' + focusRing}>
										<span className='text-[.8em] uppercase tracking-[0.18em] text-current/66'>{c.label}</span>
										<span className='text-[.8em] text-current'>{new URL(c.url).hostname.replace('www.', '')} →</span>
										<span className={srOnly}> (opens in new tab)</span>
									</a>
								))}
							</nav>
						</CaseSection>
					) : null}
					{(app.references?.dribbble?.length || app.references?.behance?.length) ? (
						<CaseSection heading='Portfolio'>
							<nav className='p-0' aria-label='Portfolio'>
								{app.references?.dribbble?.map((d) => (
									<a key={d.url} href={d.url} target='_blank' rel='noopener noreferrer' className={'flex items-center justify-between border-b border-border py-3 text-sm text-foreground ' + focusRing}>
										<span className='text-[.8em] uppercase tracking-[0.18em] text-current/66'>{d.label}</span>
										<span className='text-[.8em] text-current'>{new URL(d.url).hostname.replace('www.', '')} →</span>
										<span className={srOnly}> (opens in new tab)</span>
									</a>
								))}
								{app.references?.behance?.map((b) => (
									<a key={b.url} href={b.url} target='_blank' rel='noopener noreferrer' className={'flex items-center justify-between border-b border-border py-3 text-sm text-foreground ' + focusRing}>
										<span className='text-[.8em] uppercase tracking-[0.18em] text-current/66'>{b.label}</span>
										<span className='text-[.8em] text-current'>{new URL(b.url).hostname.replace('www.', '')} →</span>
										<span className={srOnly}> (opens in new tab)</span>
									</a>
								))}
							</nav>
						</CaseSection>
					) : null}
				</div>
			</section>
			{hasCaseStudy(app) ? <CaseStudyBlock caseStudy={app.caseStudy} /> : null}
		</React.Fragment>
	);
};
