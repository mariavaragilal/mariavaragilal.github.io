import { motion } from 'motion/react';
import { srOnly, focusRing } from '../../../../../constants/utils/a11y';
import { Button, Sheet, SheetClose, SheetContent } from '../../../../../_common/components';
import { CaseDetail } from './CaseDetail';
import { CaseSection } from './CaseSharedComponents';

const hasCaseStudy = (app) => app.caseStudy && app.caseStudy !== null && Object.keys(app.caseStudy).length > 0;

export const CaseDrawer = ({ open, onClose, app }) => (
	<Sheet open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
		<SheetContent
			side='right'
			closeButton={false}
			wrapperClassName='full lg:max-w-full top-4 left-4 bottom-4 right-4 rounded-xl '
			className='p-0! overflow-hidden!'
			aria-label={app ? 'Case study: ' + app.title : 'Case study'}
		>
			{app && (
				<div className='flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-y-hidden'>

					{/* ── Left sidebar ─────────────────────────────── */}
					<div className='relative w-full lg:w-96 xl:w-112 shrink-0 flex flex-col border-b border-border md:border-b-0 md:border-r p-8 pb-0 lg:p-10 space-y-8'>

						{/* Close */}

						{/* Title + subtitle */}
						<div className='relative flex flex-col gap-2'>
							<div className='flex flex-wrap gap-5 items-center shrink-0'>
								<SheetClose asChild>
									<Button variant='secondary' size='icon' className='size-8'>
										<motion.span animate={{ rotate: 45 }} className='font-mono font-thin text-xl leading-none' aria-hidden='true'>+</motion.span>
									</Button>
								</SheetClose>
							</div>
							<div className='flex flex-col gap-1 flex-1'>
								<h1 className='font-mono font-medium text-2xl leading-snug flex-1'>{app.title}</h1>
								<p className='text-[1rem] font-sans text-current/66 mt-1.5'>{app.subtitle}</p>
							</div>
						</div>

						{/* Info — scrollable on its own if tall */}
						<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-x-16 lg:gap-16  lg:overflow-y-auto space-y-8 lg:space-y-0'>
							{app.role ? (
								<CaseSection heading='Role' headingAs='h6'>
									<p className='text-[.8em] font-mono text-current'>{app.role}</p>
								</CaseSection>
							) : null}
							{app.tools ? (
								<CaseSection heading='Tools' headingAs='h6'>
									<p className='text-[.8em] font-mono text-current'>{app.tools}</p>
								</CaseSection>
							) : null}
							{app.references?.links?.length > 0 ? (
								<CaseSection heading={hasCaseStudy(app) ? 'Live' : 'Direct link'} headingAs='h6'>
									<nav className='p-0' aria-label='Live work'>
										<h1 className='sr-only'>Live work: nav</h1>
										{app.references.links.map((l) => (
											<a key={l.url} href={l.url} target='_blank' rel='noopener noreferrer' className={'flex flex-wrap items-center justify-between border-b border-border py-3 ' + focusRing}>
												<span className='text-[.625em] text-current/66 uppercase tracking-[0.18em]'>{l.label}</span>
												<span className='text-[.8em] font-mono text-current'>{new URL(l.url).hostname.replace('www.', '')} →</span>
												<span className={srOnly}> (opens in new tab)</span>
											</a>
										))}
									</nav>
								</CaseSection>
							) : null}
							{app.references?.clients?.length > 0 ? (
								<CaseSection heading='Client deliveries' headingAs='h6'>
									<nav className='p-0' aria-label='Client deliveries'>
										<h1 className='sr-only'>Client deliveries: nav</h1>
										{app.references.clients.map((c) => (
											<a key={c.url} href={c.url} target='_blank' rel='noopener noreferrer' className={'flex flex-wrap items-center justify-between border-b border-border py-3 ' + focusRing}>
												<span className='text-[.625em] text-current/66 uppercase tracking-[0.18em]'>{c.label}</span>
												<span className='text-[.8em] font-mono text-current'>{new URL(c.url).hostname.replace('www.', '')} →</span>
												<span className={srOnly}> (opens in new tab)</span>
											</a>
										))}
									</nav>
								</CaseSection>
							) : null}
							{(app.references?.dribbble?.length || app.references?.behance?.length) ? (
								<CaseSection heading='Portfolio' headingAs='h6'>
									<nav className='p-0' aria-label='Portfolio'>
										<h1 className='sr-only'>Portfolio: nav</h1>
										{app.references?.dribbble?.map((d) => (
											<a key={d.url} href={d.url} target='_blank' rel='noopener noreferrer' className={'flex flex-wrap items-center justify-between border-b border-border py-3 ' + focusRing}>
												<span className='text-[.625em] text-current/66 uppercase tracking-[0.18em]'>{d.label}</span>
												<span className='text-[.8em] font-mono text-current'>{new URL(d.url).hostname.replace('www.', '')} →</span>
												<span className={srOnly}> (opens in new tab)</span>
											</a>
										))}
										{app.references?.behance?.map((b) => (
											<a key={b.url} href={b.url} target='_blank' rel='noopener noreferrer' className={'flex flex-wrap items-center justify-between border-b border-border py-3 ' + focusRing}>
												<span className='text-[.625em] text-current/66 uppercase tracking-[0.18em]'>{b.label}</span>
												<span className='text-[.8em] font-mono text-current'>{new URL(b.url).hostname.replace('www.', '')} →</span>
												<span className={srOnly}> (opens in new tab)</span>
											</a>
										))}
									</nav>
								</CaseSection>
							) : null}
						</section>
					</div>

					{/* ── Right content ─────────────────────────────── */}
					<CaseDetail app={app} />

				</div>
			)}
		</SheetContent>
	</Sheet>
);
