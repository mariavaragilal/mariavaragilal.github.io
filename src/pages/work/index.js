import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../../_common/layout';
import { srOnly } from '../../constants/utils/a11y';
import { Card, Separator } from '../../_common/components';
import { toSlug } from '../../constants/utils/structuredData';
import { CaseCard } from '../_common/WorkCases/CaseCard';
import { Link } from 'gatsby';
import { flattenWorkCasesOrdered } from '../../constants/utils/structuredData';
import { Matrix } from '../../_common/components/complex/Matrix';

/* ── Tag dot colors (both languages) ── */
const TAG_COLORS = {
	'Design to code': '#D4537E',
	'Design para código': '#D4537E',
	'Tool exploration': '#BA7517',
	'Exploração de ferramentas': '#BA7517',
	'Systems thinking': '#534AB7',
	'Pensamento sistémico': '#534AB7',
	'Design rationale': '#D85A30',
	'Fundamentação do projeto': '#D85A30',
	'Edge cases & resilience': '#1D9E75',
	'Casos extremos e resiliência': '#1D9E75',
	'Proactive & collaborative': '#639922',
	'Proatividade e colaboração': '#639922',
	'Production-informed iteration': '#378ADD',
	'Iteração orientada para a produção': '#378ADD',
};
const caseSlug = (app) => app.slug || toSlug(app.title);

const CasesIndexPage = () => {
	const { t, i18n } = useTranslation();
	const workCases = t('mv.workCases', { returnObjects: true }) || {};
	const ws = t('mv.workSection', { returnObjects: true }) || {};
	const title = ws.kicker + ' — ' + ws.heading;
	const strengthsItems = ws?.strengths?.items || [];
	const strengthsMatrix = ws?.strengthsMatrix || {};

	/* ── Bridge: strengths JSON → Matrix props ── */
	const matrixItems = useMemo(
		() =>
			strengthsItems.map((s) => ({
				tag: s.tag,
				body: s.body,
				color: TAG_COLORS[s.tag],
			})),
		[strengthsItems]
	);

	const matrixPhases = useMemo(
		() =>
			(strengthsMatrix.phases || []).map((p) => ({
				key: p.key,
				label: p.label,
				subtitle: p.dimension,
				tags: p.tags,
			})),
		[strengthsMatrix.phases]
	);

	const matrixFooter = (strengthsMatrix.loopLabel || '').replace(/\s*(repeat|repetir)\s*/i, '').trim();
	const matrixFooterRepeat = i18n.language?.startsWith('pt') ? 'repetir' : 'repeat';

	const hasStrengths = strengthsItems.length > 0 && matrixPhases.length > 0; // 

	return (
		<Layout title={title} description={ws.p1} className='text-foreground flex-1 min-h-0 overflow-y-auto h-full'>
			<a href='#main-content' className={srOnly + ' focus:static focus:w-auto focus:h-auto focus:p-3 focus:m-0 focus:overflow-visible focus:whitespace-normal focus:bg-primary focus:text-primary-foreground z-50'}>{t('home.skipToMain')}</a>
			<Card as='section' id='main-content' className='flex-1 rounded-xl px-6 py-12 lg:px-10 space-y-10'>
				<div className='flex flex-col relative'>
					<p className='text-[.75em] uppercase tracking-[0.2em] font-semibold text-current/66'>{ws.kicker}</p>
					<h1 className='font-mono font-medium text-[clamp(1.5rem,4vw,2.5rem)] tracking-tight text-foreground mt-2'>{ws.heading}</h1>
					<div className='grid gap-x-8 gap-y-6 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] items-start'>
						{/* ── Left column: text + component library ── */}
						<div className='space-y-6 text-foreground'>
							<p className='text-[1.125rem] leading-[1.7] text-current/88'>
								{ws.p1}
							</p>
							<p className='text-[1rem] leading-[1.7] text-current/88'>
								<strong className='font-bold'>{ws.p2Lead}</strong> {ws.p2}
							</p>
							{ws.philosophy && (
								<p className='text-md leading-[1.7] text-current/55 italic -mt-3'>{ws.philosophy}</p>
							)}

							{hasStrengths && <Card variant='secondary' className='p-4'>
								<p className='text-[.75em] uppercase tracking-[0.16em] font-medium text-current/66 mb-2'>{ws.designSystemKicker}</p>
								<p className='text-current/88 mb-3'>{ws.designSystemBody}</p>
								<div className='flex flex-wrap gap-x-1 gap-y-1 items-center text-sm text-current/66'>
									{(ws.designSystemComponents || []).map((name, i) => (
										<React.Fragment key={name}>
											{i > 0 ? <span className='shrink-0' aria-hidden='true'>·</span> : null}
											<span>{name}</span>
										</React.Fragment>
									))}
								</div>
								<p className='text-sm text-current/55 mt-4'>{ws.designSystemCtaNote}</p>
							</Card>}
						</div>

						{/* ── Right column: 2×2 Matrix in Card ── */}
						{hasStrengths ? (
							<Card variant='secondary'>
								<p className='sr-only'>{ws.strengths.intro}</p>
								<Matrix
									variant='transparent'
									phases={matrixPhases}
									items={matrixItems}
									footer={matrixFooter}
									footerRepeat={matrixFooterRepeat}
								/>
							</Card>
						) : (
							<Card variant='default' className='p-6' as='div'>
								<p className='text-[.75em] uppercase tracking-[0.16em] font-medium text-current/66 mb-2'>{ws.designSystemKicker}</p>
								<p className='text-current/88 mb-3'>{ws.designSystemBody}</p>
								<div className='flex flex-wrap gap-x-1 gap-y-1 items-center text-sm text-current/66'>
									{(ws.designSystemComponents || []).map((name, i) => (
										<React.Fragment key={name}>
											{i > 0 ? <span className='shrink-0' aria-hidden='true'>·</span> : null}
											<span>{name}</span>
										</React.Fragment>
									))}
								</div>
								<p className='text-sm text-current/55 mt-4'>{ws.designSystemCtaNote}</p>
							</Card>
						)}
					</div>
					<nav aria-label={ws.browseAllCases} className={srOnly}>
						<h1><Link to='/work/' className='text-current/88 hover:underline'>{ws.browseAllCases}</Link></h1>
						<ul>
							{flattenWorkCasesOrdered(workCases).map((app) => {
								const slug = caseSlug(app);
								return <li key={slug}><Link className='font-mono' to={'/work/' + slug + '/'}><span className='block'>{app.title}</span></Link></li>;
							})}
						</ul>
					</nav>
				</div>
				<div className='relative flex flex-col gap-8'>
					{Object.entries(workCases).map(([groupName, group]) => (
						<React.Fragment key={groupName}>
							<Separator decorative />
							<section className='flex flex-col gap-4' aria-labelledby={'cases-group-' + toSlug(groupName)}>
								<div className='flex w-full min-w-0 items-center gap-6 text-left grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:col-span-2 px-1 py-7 items-start'>
									<div className='flex flex-col'>
										<span className='font-mono uppercase tracking-[0.16em] text-current/22 font-medium text-sm' aria-hidden='true'>{group.period}</span>
										<h2 id={'cases-group-' + toSlug(groupName)} className='font-mono text-[clamp(1.2rem,2.5vw,1.5rem)] leading-8 font-medium text-current mb-0'>{groupName}</h2>
									</div>
									<div className='relative w-full flex flex-col gap-2'>
										{group.context && <p className='leading-relaxed text-current/66'>{group.context}</p>}
										{group.contextNote && <p className='leading-relaxed text-current/66 text-sm italic'>{group.contextNote}</p>}
									</div>
								</div>
								<div className='px-1 pb-6 -mx-3 lg:mx-0' role='region' aria-label={groupName + ' case studies'}>
									<div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(25rem,1fr))]'>
										{group.cases.map((app) => {
											const slug = caseSlug(app);
											return <CaseCard variant='secondary' className='border border-border/50' key={app.title} id={'case-' + slug} app={app} isSelected={false} to={'/work/' + slug + '/'} as='h4' />;
										})}
									</div>
								</div>
							</section>
						</React.Fragment>
					))}
				</div>
			</Card>
		</Layout>
	);
};

export default CasesIndexPage;
