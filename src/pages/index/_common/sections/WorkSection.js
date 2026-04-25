import React, { useState, useEffect, useMemo } from 'react';
import { navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Card, ToggleGroup, ToggleGroupItem } from '../../../../_common/components';
import { Matrix } from '../../../../_common/components/complex/Matrix';
import { srOnly } from '../../../../constants/utils/a11y';
import { findCaseByHash, flattenWorkCasesOrdered, toSlug, caseMatchesStrengthTag } from '../../../../constants/utils/structuredData';
import { LazyTerminalTypeEffect } from '../../../../constants/utils/terminalTypeEffect';
import { CaseCard } from '../../../_common/WorkCases/CaseCard';

const caseSlug = (app) => app.slug || toSlug(app.title);

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

export const WorkSection = () => {
	const { t, i18n } = useTranslation();
	const workCases = t('mv.workCases', { returnObjects: true }) || {};
	const aiWorkContextGroup = workCases['AI within Boundaries'] || {};
	const ws = t('mv.workSection', { returnObjects: true }) || {};
	const strengthsItems = ws?.strengths?.items || [];
	const strengthsMatrix = ws?.strengthsMatrix || {};
	const allCases = flattenWorkCasesOrdered(workCases);

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

	/* ── State ── */
	const getInitialStateFromHash = () => {
		if (typeof window === 'undefined') return null;
		return findCaseByHash(workCases, window.location.hash);
	};

	const [activeTag, setActiveTag] = useState(null);
	const activeStrength = strengthsItems.find((s) => s.tag === activeTag) || null;
	const activeEvidenceSet = activeStrength ? { has: (app) => caseMatchesStrengthTag(app, activeStrength.tag || '') } : null;

	useEffect(() => {
		const hashMatch = getInitialStateFromHash();
		if (!hashMatch) return;
		const slug = caseSlug(hashMatch.app);
		navigate('/work/' + slug + '/', { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [i18n.language]);

	useEffect(() => {
		if (activeTag && !strengthsItems.some((s) => s.tag === activeTag)) {
			setActiveTag(null);
		}
	}, [activeTag, strengthsItems]);

	const handleTagSelect = (tag) => setActiveTag((prev) => (prev === tag ? null : tag));

	const hasStrengths = false; // strengthsItems.length > 0 && matrixPhases.length > 0; // 
	const aiContext = aiWorkContextGroup.context || '';
	const aiContextNote = aiWorkContextGroup.contextNote || '';
	const showAiContextBlock = !!(aiContext || aiContextNote);

	return (
		<React.Fragment>
			<Card as='section' variant='secondary' id='work' aria-labelledby='work-heading' className='scroll-mt-6 rounded-xl m-4 px-6 py-12 lg:px-10 -mt-4 lg:-mt-8 space-y-16'>
				<div className='w-full mx-auto max-w-full'>
					<p className='text-[.75em] uppercase tracking-[0.2em] font-semibold text-current/66'>{ws.kicker}</p>
					<LazyTerminalTypeEffect
						animationType='futuristic'
						element='h2'
						className='mb-1 font-mono font-medium lg:font-normal text-[2.75em] lg:text-[clamp(2rem,6vw,5rem)] tracking-[-.05em] lg:tracking-tighter leading-[1em] lg:leading-18 text-foreground'
						id='work-heading'>
						{ws.heading}
					</LazyTerminalTypeEffect>

					<div className='grid gap-x-8 gap-y-6 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-start mt-10'>
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

							{hasStrengths && <Card variant='default' className='p-4'>
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
							<Card variant='default'>
								<p className='sr-only'>{ws.strengths.intro}</p>
								<Matrix
									phases={matrixPhases}
									items={matrixItems}
									activeTag={activeTag}
									onTagSelect={handleTagSelect}
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
					{/* <div className='grid gap-2 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(25em,1fr))] items-start mt-10'>
						{strengthsItems.map((s) => (
							<Card variant='ghost' key={s.tag} className='flex flex-col gap-2 p-4'>
								<div className='flex items-center gap-2'>
									<span className='w-[6px] h-[6px] rounded-full shrink-0 bg-current' aria-hidden='true' />
									<span className='text-sm font-medium leading-snug text-current'>
										{s.tag}
									</span>
								</div>
								<span className='text-xs leading-snug pl-[14px] line-clamp-3 text-current/66' >
									{s.body}
								</span>
							</Card>
						))}
					</div> */}

					<nav aria-label={ws.browseAllCases} className={srOnly}>
						<a href='/work/'>{ws.browseAllCases}</a>
						<ul>
							{allCases.map((app) => {
								const slug = caseSlug(app);
								return <li key={slug}><a href={'/work/' + slug + '/'}>{app.title}</a></li>;
							})}
						</ul>
					</nav>
				</div>

				<div className='flex flex-col gap-6'>
					<ToggleGroup
						type='single'
						value={activeTag || ''}
						onValueChange={(val) => setActiveTag(val || null)}
						variant='outline'
						size='sm'
						aria-label={ws.strengths?.intro || 'Filter by strength'}
						className='flex-wrap justify-start gap-2'>
						<ToggleGroupItem value=''>{i18n.language?.startsWith('pt') ? 'Todos' : 'All'}</ToggleGroupItem>
						{strengthsItems.map((s) => (
							<ToggleGroupItem key={s.tag} value={s.tag} className='gap-2'>
								<span className='inline-block w-[6px] h-[6px] rounded-full shrink-0' style={{ backgroundColor: TAG_COLORS[s.tag] }} aria-hidden='true' />
								{s.tag}
							</ToggleGroupItem>
						))}
					</ToggleGroup>

					<div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(25rem,1fr))]'>
						{allCases
							.filter((app) => !activeEvidenceSet || activeEvidenceSet.has(app))
							.map((app) => {
								const slug = caseSlug(app);
								return (
									<CaseCard key={app.title} id={'case-' + slug} app={app} isSelected={false} to={'/work/' + slug + '/'} as='h4' />
								);
							})}
					</div>
					{showAiContextBlock ? (
						<div className='block space-y-1'>
							<p className='text-[.7em] uppercase tracking-[0.16em] font-medium sr-only'>{ws.aiWithinBoundariesKicker}</p>
							{aiContext ? (
								<p className='text-xs leading-[1.6]'>{aiContext}</p>
							) : null}
							{aiContextNote ? (
								<p className='text-xs leading-[1.6] italic text-current/66'>{aiContextNote}</p>
							) : null}
						</div>
					) : null}
				</div>
			</Card>
		</React.Fragment >
	);
};