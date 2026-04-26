import React, { useState, useEffect, useMemo } from 'react';
import { Link, navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Button, Card, Stack, ToggleGroup, ToggleGroupItem } from '../../../../_common/components';
import { Matrix } from '../../../../_common/components/complex/Matrix';
import { srOnly } from '../../../../constants/utils/a11y';
import { findCaseByHash, findCaseBySlug, toSlug, caseMatchesStrengthTag } from '../../../../constants/utils/structuredData';
import { LazyTerminalTypeEffect } from '../../../../constants/utils/terminalTypeEffect';
import { RichText } from '../../../_common/RichText';

const caseSlug = (app) => app.slug || toSlug(app.title);

const EMPTY_STRENGTHS = [];
const EMPTY_MATRIX = { phases: [] };

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
	const work = t('mv.work', { returnObjects: true }) || {};
	const workKicker = work.kicker;
	const workCases = work.cases || {};
	const aiWorkContextGroup = workCases['AI within Boundaries'] || {};
	const ws = work.intro || {};
	const ds = ws.designSystem || {};
	const projects = Array.isArray(ws.projects) ? ws.projects : [];
	const ecosystem = ws.ecosystem || {};
	const strengthsItems = (ws.strengths && ws.strengths.items) || EMPTY_STRENGTHS;
	const strengthsMatrix = (ws.strengths && ws.strengths.matrix) || EMPTY_MATRIX;

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

	const hasStrengths = false; // strengthsItems.length > 0 && matrixPhases.length > 0;
	const aiContext = aiWorkContextGroup.context || '';
	const aiContextNote = aiWorkContextGroup.contextNote || '';
	const showAiContextBlock = !!(aiContext || aiContextNote);

	const projectTitle = (p) => {
		if (p.slug) {
			const m = findCaseBySlug(workCases, p.slug);
			if (m && m.app && m.app.title) return m.app.title;
		}
		return p.name || '';
	};

	const visibleProjects = projects.filter((p) => {
		if (!activeEvidenceSet) return true;
		if (!p.slug) return false;
		const m = findCaseBySlug(workCases, p.slug);
		if (!m) return false;
		return activeEvidenceSet.has(m.app);
	});

	return (
		<div className='max-w-full hd:max-w-[160ch] mx-auto px-6 lg:px-10 space-y-6'>
			<Card as='section' variant='muted' id='work' aria-labelledby='work-heading' className='rounded-xl m-4 lg:mt-16 p-6 lg:p-12 -mx-6 lg:-mx-10'>
				<div className='w-full mx-auto max-w-full'>
					<p className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold mb-2'>{workKicker}</p>
					<LazyTerminalTypeEffect
						animationType='futuristic'
						element='h3'
						className='mb-1 font-mono font-medium text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.05em] text-foreground'
						id='work-heading'>
						{ws.heading}
					</LazyTerminalTypeEffect>

					<div className='grid gap-x-8 gap-y-6 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-start my-12'>
						<div className='space-y-6 text-foreground'>
							<p className='text-[1.125rem] leading-[1.7] text-current/88'>
								{ws.p1}
							</p>
							<RichText as='p' className='text-[1rem] leading-[1.7] text-current/88' text={ws.p2} />
							{ws.philosophy && (
								<p className='text-md leading-[1.7] text-current/55 italic -mt-3'>{ws.philosophy}</p>
							)}

							{hasStrengths && <Card variant='default' className='p-4'>
								<p className='text-[.75em] uppercase tracking-[0.16em] font-medium text-current/66 mb-2'>{ds.kicker}</p>
								<p className='text-current/88 mb-3'>{ds.body}</p>
								<div className='flex flex-wrap gap-x-1 gap-y-1 items-center text-sm text-current/66'>
									{(ds.components || []).map((name, i) => (
										<React.Fragment key={name}>
											{i > 0 ? <span className='shrink-0' aria-hidden='true'>·</span> : null}
											<span>{name}</span>
										</React.Fragment>
									))}
								</div>
								<p className='text-sm text-current/55 mt-4'>{ds.ctaNote}</p>
							</Card>}
						</div>

						{hasStrengths ? (
							<Card variant='default'>
								<p className='sr-only'>{ws.strengths.sub}</p>
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
								<p className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold mb-2'>{ds.kicker}</p>
								<p className='text-current/88 mb-3'>{ds.body}</p>
								<div className='flex flex-wrap gap-x-1 gap-y-1 items-center text-sm text-current/66'>
									{(ds.components || []).map((name, i) => (
										<React.Fragment key={name}>
											{i > 0 ? <span className='shrink-0' aria-hidden='true'>·</span> : null}
											<span>{name}</span>
										</React.Fragment>
									))}
								</div>
								<p className='text-sm text-current/55 mt-4'>{ds.ctaNote}</p>
							</Card>
						)}
					</div>
				</div>


				<div className='flex flex-col gap-6'>
					<h4 className={srOnly}>{ws.browseAllCases}</h4>
					<div className='flex justify-between items-baseline'>
						<ToggleGroup
							type='single'
							value={activeTag || ''}
							onValueChange={(val) => setActiveTag(val || null)}
							variant='outline'
							size='sm'
							aria-label={ws.strengths?.intro || 'Filter by strength'}
							className='flex-wrap justify-start gap-2'>
							<ToggleGroupItem value='' className=''>{i18n.language?.startsWith('pt') ? 'Todos' : 'All'}</ToggleGroupItem>
							{strengthsItems.map((s) => (
								<ToggleGroupItem key={s.tag} value={s.tag} className='gap-2'>
									<span className='inline-block w-[0.375rem] h-[0.375rem] rounded-full shrink-0' style={{ backgroundColor: TAG_COLORS[s.tag] }} aria-hidden='true' />
									{s.tag}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
						<span className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold hidden sm:inline'>{ws.strengths?.sub}</span>
					</div>

					<div className='relative border-t border-border'>
						{visibleProjects.map((p) => {
							const matched = p.slug ? findCaseBySlug(workCases, p.slug) : null;
							const app = matched && matched.app;
							const summary = (app && app.subtitle) || p.meta || '';
							const scope = (app && app.caseStudy && app.caseStudy.scope) || p.meta || '';
							const rowClass = 'group flex md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_1.5rem] items-start gap-x-6 gap-y-3 py-8 border-b border-border w-full font-normal text-left rounded-none whitespace-normal hover:bg-transparent';
							const inner = (
								<React.Fragment>
									<div className='flex-1 min-w-0 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:col-span-2 gap-x-6 gap-y-3'>
										<Stack kicker={scope} title={projectTitle(p)} titleAs='h5' summary={summary} summaryClassName='max-w-[80ch]' />
									</div>
									<Button as='span' variant='secondary' size='icon' aria-hidden='true' tabIndex={-1} className='shrink-0 self-center pointer-events-none'>↗</Button>
								</React.Fragment>
							);
							if (p.slug) return (
								<Button key={p.n} as={Link} to={'/work/' + p.slug + '/'} variant='ghost' size='unset' className={rowClass + ' cursor-pointer'}>
									{inner}
								</Button>
							);
							return <div key={p.n} className={rowClass}>{inner}</div>;
						})}
					</div>
					<Card variant='ink' as='div' className='px-8 lg:px-14 py-12 lg:py-16 rounded-md gap-0 shadow-none'>
						<div className='font-mono uppercase tracking-[0.04em] text-[0.6875rem] text-primary-foreground/66 mb-3.5'>{ecosystem.kicker}</div>
						<RichText as='h4' className='font-mono font-medium text-[clamp(1.625rem,3.5vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-inherit' text={ecosystem.heading} />
						<p className='mt-5 text-[1rem] leading-[1.6] opacity-80 max-w-[95%]'>{ecosystem.body}</p>
					</Card>
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
		</div>
	);
};
