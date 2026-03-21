import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Separator } from '../../../../../_common/components';
import { AccordionItem, AccordionTrigger, AccordionContent } from '../../../../../_common/components/controls/Accordion';
import { findCaseByHash, toSlug } from '../../../../../constants/utils/structuredData';
import { LazyTerminalTypeEffect } from '../../../../../constants/utils/terminalTypeEffect';
import { CaseCard } from './CaseCard';
import { CaseDrawer } from './CaseDrawer';

const caseSlug = (app) => app.slug || toSlug(app.title);

export const WorkSection = () => {
	const { t, i18n } = useTranslation();
	const workCases = t('mv.workCases', { returnObjects: true }) || {};
	const ws = t('mv.workSection', { returnObjects: true }) || {};
	const _initialSelected = Object.fromEntries(Object.entries(workCases).map(([group]) => [group, null]));

	const getInitialStateFromHash = () => {
		if (typeof window === 'undefined') return null;
		return findCaseByHash(workCases, window.location.hash);
	};

	const [expandedGroup, setExpandedGroup] = useState('Securibox');
	const [selectedByGroup, setSelectedByGroup] = useState(_initialSelected);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [drawerGroup, setDrawerGroup] = useState(null);
	const didScrollRef = useRef(false);

	useEffect(() => {
		/* eslint-disable react-hooks/set-state-in-effect -- hydrate accordion/drawer from URL hash */
		const hashMatch = getInitialStateFromHash();
		if (!hashMatch) return;
		setExpandedGroup(hashMatch.groupName);
		setSelectedByGroup((prev) => ({ ...prev, [hashMatch.groupName]: hashMatch.app }));
		setDrawerOpen(true);
		setDrawerGroup(hashMatch.groupName);
		/* eslint-enable react-hooks/set-state-in-effect */
		if (didScrollRef.current) return;
		didScrollRef.current = true;
		setTimeout(() => {
			const slug = caseSlug(hashMatch.app);
			const el = document.getElementById('case-' + slug);
			if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}, 100);
	// eslint-disable-next-line react-hooks/exhaustive-deps -- workCases follows i18n.language
	}, [i18n.language]);

	const toggleGroup = (groupName) => setExpandedGroup((prev) => (prev === groupName ? null : groupName));
	const selectCase = (groupName, app) => {
		const current = selectedByGroup[groupName];
		if (current?.title === app.title) {
			setDrawerOpen(false);
			if (typeof window !== 'undefined') history.replaceState(null, '', window.location.pathname);
		} else {
			setSelectedByGroup((prev) => ({ ...prev, [groupName]: app }));
			setDrawerGroup(groupName);
			setDrawerOpen(true);
			if (typeof window !== 'undefined') history.replaceState(null, '', '#' + caseSlug(app));
		}
	};
	const closeDrawer = () => {
		setDrawerOpen(false);
		if (drawerGroup) {
			setSelectedByGroup((prev) => ({ ...prev, [drawerGroup]: null }));
		}
		setDrawerGroup(null);
		if (typeof window !== 'undefined') history.replaceState(null, '', window.location.pathname);
	};

	const drawerCase = drawerGroup ? selectedByGroup[drawerGroup] : null;

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

					<div className='grid gap-x-10 gap-y-6 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] mt-10'>
						<div className='space-y-4 text-[1.125rem] leading-relaxed text-foreground'>
							<p className='text-[1.125rem] leading-relaxed text-current/88'>
								{ws.p1}
							</p>
							<p className='text-base leading-relaxed text-current/66 mt-4'>
								<strong className='text-current/88'>{ws.p2Lead}</strong> {ws.p2}
							</p>
						</div>
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
						</Card>
					</div>
				</div>
				<div className='relative flex flex-col gap-8'>
					{Object.entries(workCases).map(([groupName, group]) => {
						const isExpanded = expandedGroup === groupName;
						const selectedCase = selectedByGroup[groupName];
						return (
							<React.Fragment key={groupName}>
								<Separator decorative/>
								<AccordionItem className='flex flex-col gap-4' isExpanded={isExpanded} onToggle={() => toggleGroup(groupName)}>
									<AccordionTrigger icon='plus' gridCols='md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_1.6rem] items-start' triggerPadding='p-0'>
										<div className='flex flex-col'>
											<span className='uppercase tracking-[0.16em] text-current/22 font-medium' aria-hidden='true'>{group.period}</span>
											<h3 className='font-mono text-[clamp(1.2rem,2.5vw,1.5rem)] leading-8 font-medium text-current mb-0'>{groupName}</h3>
										</div>
										<div className='relative w-full max-w-xl flex flex-col gap-2'>
											<p className='leading-relaxed text-current/66'>{group.context}</p>
										</div>
									</AccordionTrigger>
									<AccordionContent animate={false} ariaLabel={groupName + ' case studies'}>
										<div className='px-1 pb-6'>
											<div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(25rem,1fr))]'>
												{group.cases.flatMap((app) => {
													const isSelected = selectedCase?.title === app.title;
													const slug = caseSlug(app);
													return [
														<CaseCard key={app.title} id={'case-' + slug} app={app} isSelected={isSelected} onToggle={() => selectCase(groupName, app)} as='h4'/>,
														...(isSelected && selectedCase ? [
															<CaseDrawer
																key={app.title + '-detail'}
																open={drawerOpen}
																onClose={closeDrawer}
																app={drawerCase}
																cases={group.cases}
																onSelectCase={(nextApp) => selectCase(groupName, nextApp)}
															/>
														] : []),
													];
												})}
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</React.Fragment>
						);
					})}
				</div>
			</Card>
		</React.Fragment>
	);
};
