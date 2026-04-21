import React, { useState, useEffect, useMemo } from 'react';
import { navigate, Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Card, Badge, Button, Separator } from '../../../../_common/components';
import { AccordionItem, AccordionTrigger, AccordionContent } from '../../../../_common/components/controls/Accordion';
import { Matrix } from '../../../../_common/components/complex/Matrix';
import { srOnly } from '../../../../constants/utils/a11y';
import { findCaseByHash, flattenWorkCasesOrdered, toSlug, caseMatchesStrengthTag } from '../../../../constants/utils/structuredData';
import { LazyTerminalTypeEffect } from '../../../../constants/utils/terminalTypeEffect';
import { CaseCard } from '../../../_common/WorkCases/CaseCard';

const caseSlug = (app) => app.slug || toSlug(app.title);
const isUnfilteredGroup = (groupName) => groupName === 'Earlier work';

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
	const ws = t('mv.workSection', { returnObjects: true }) || {};
	const strengthsItems = ws?.strengths?.items || [];
	const strengthsMatrix = ws?.strengthsMatrix || {};
	const allCases = flattenWorkCasesOrdered(workCases);
	const groupEntries = Object.entries(workCases);
	const firstGroupName = groupEntries[0]?.[0];

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

	const [expandedGroups, setExpandedGroups] = useState(() => (firstGroupName ? { [firstGroupName]: true } : {}));
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

	useEffect(() => {
		if (activeTag || !firstGroupName) return;
		const visibleCount = groupEntries.reduce((count, [groupName]) => (expandedGroups[groupName] ? count + 1 : count), 0);
		if (visibleCount > 0) return;
		setExpandedGroups({ [firstGroupName]: true });
	}, [expandedGroups, firstGroupName, groupEntries, activeTag]);

	/* ── Handlers ── */
	const getGroupMatchCount = (group, evidenceSet) => {
		if (!evidenceSet) return 0;
		return (group.cases || []).reduce((count, app) => (evidenceSet.has(app) ? count + 1 : count), 0);
	};

	const toggleGroup = (groupName) => setExpandedGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));

	const handleTagSelect = (tag) => {
		if (tag === activeTag) {
			setActiveTag(null);
			setExpandedGroups(firstGroupName ? { [firstGroupName]: true } : {});
			return;
		}
		setActiveTag(tag);
		const evidenceSet = { has: (app) => caseMatchesStrengthTag(app, tag) };
		const nextExpandedGroups = {};
		groupEntries.forEach(([groupName, group]) => {
			if (isUnfilteredGroup(groupName)) return;
			nextExpandedGroups[groupName] = getGroupMatchCount(group, evidenceSet) > 0;
		});
		setExpandedGroups(nextExpandedGroups);
	};

	const hasStrengths = false; // strengthsItems.length > 0 && matrixPhases.length > 0; // 

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

				<div className='relative flex flex-col gap-8'>
					{groupEntries.map(([groupName, group]) => {
						const skipFilter = isUnfilteredGroup(groupName);
						const isExpanded = !!expandedGroups[groupName];
						const matchCount = skipFilter ? 0 : getGroupMatchCount(group, activeEvidenceSet);
						return (
							<React.Fragment key={groupName}>
								<Separator decorative />
								<AccordionItem className='flex flex-col gap-4' isExpanded={isExpanded} onToggle={() => toggleGroup(groupName)}>
									<AccordionTrigger icon='plus' gridCols='md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_1.6rem] items-start' triggerPadding='p-0'>
										<div className='flex flex-col'>
											<span className='font-mono uppercase tracking-[0.16em] text-current/22 font-medium text-sm' aria-hidden='true'>{group.period}</span>
											<div className='flex flex-wrap items-center gap-2'>
												<h3 className='font-mono text-[clamp(1.2rem,2.5vw,1.5rem)] leading-8 font-medium text-current my-auto'>{groupName}</h3>
												{activeTag && !skipFilter && matchCount > 0 ? <Badge variant='secondary' size='sm' className='tracking-[0.04em] uppercase mt-1'>{matchCount + ' projects'}</Badge> : null}
											</div>
										</div>
										<div className='relative w-full flex flex-col gap-2'>
											{group.context && <p className='leading-relaxed text-current/66'>{group.context}</p>}
											{group.contextNote && <p className='leading-relaxed text-current/66 text-sm italic'>{group.contextNote}</p>}
										</div>
									</AccordionTrigger>
									<AccordionContent animate={false} ariaLabel={groupName + ' case studies'}>
										<div className='px-1 pb-6 -mx-3 lg:mx-0'>
											<div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(25rem,1fr))]'>
												{group.cases.map((app) => {
													const slug = caseSlug(app);
													const isMatch = skipFilter || !activeEvidenceSet || activeEvidenceSet.has(app);
													return (
														<div key={app.title} className={'transition-opacity duration-300 ' + (isMatch ? 'opacity-100' : 'opacity-20')}>
															<CaseCard id={'case-' + slug} app={app} isSelected={false} to={'/work/' + slug + '/'} as='h4' />
														</div>
													);
												})}
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</React.Fragment>
						);
					})}
				</div>
				<div className='flex justify-end px-1'>
					<Link to='/work/' className='font-mono text-[0.75rem] tracking-[0.12em] uppercase text-current/55 hover:text-current hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1.5'>
						{ws.seeAllWork || 'See all work'}<span aria-hidden>→</span>
					</Link>
				</div>
			</Card>
		</React.Fragment >
	);
};