import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Card, Separator } from '../../../../../_common/components';
import { AccordionItem, AccordionTrigger, AccordionContent } from '../../../../../_common/components/controls/Accordion';
import { findCaseByHash, toSlug } from '../../../../../constants/utils/structuredData';
import { LazyTerminalTypeEffect } from '../../../../../constants/utils/terminalTypeEffect';
import { CaseCard } from './CaseCard';

const caseSlug = (app) => app.slug || toSlug(app.title);

export const WorkSection = () => {
	const { t, i18n } = useTranslation();
	const workCases = t('mv.workCases', { returnObjects: true }) || {};
	const ws = t('mv.workSection', { returnObjects: true }) || {};

	const getInitialStateFromHash = () => {
		if (typeof window === 'undefined') return null;
		return findCaseByHash(workCases, window.location.hash);
	};

	const [expandedGroup, setExpandedGroup] = useState('Securibox');

	useEffect(() => {
		const hashMatch = getInitialStateFromHash();
		if (!hashMatch) return;
		const slug = caseSlug(hashMatch.app);
		navigate('/cases/' + slug + '/', { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps -- workCases follows i18n.language
	}, [i18n.language]);

	const toggleGroup = (groupName) => setExpandedGroup((prev) => (prev === groupName ? null : groupName));

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
							<p className='text-sm text-current/55 mt-4'>{ws.designSystemCtaNote}</p>
						</Card>
					</div>
				</div>
				<div className='relative flex flex-col gap-8'>
					{Object.entries(workCases).map(([groupName, group]) => {
						const isExpanded = expandedGroup === groupName;
						return (
							<React.Fragment key={groupName}>
								<Separator decorative />
								<AccordionItem className='flex flex-col gap-4' isExpanded={isExpanded} onToggle={() => toggleGroup(groupName)}>
									<AccordionTrigger icon='plus' gridCols='md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_1.6rem] items-start' triggerPadding='p-0'>
										<div className='flex flex-col'>
											<span className='uppercase tracking-[0.16em] text-current/22 font-medium' aria-hidden='true'>{group.period}</span>
											<h3 className='font-mono text-[clamp(1.2rem,2.5vw,1.5rem)] leading-8 font-medium text-current mb-0'>{groupName}</h3>
										</div>
										<div className='relative w-full max-w-3xl flex flex-col gap-2'>
											{group.context && <p className='leading-relaxed text-current/66'>{group.context}</p>}
											{group.contextNote && <p className='leading-relaxed text-current/66 text-sm italic'>{group.contextNote}</p>}
										</div>
									</AccordionTrigger>
									<AccordionContent animate={false} ariaLabel={groupName + ' case studies'}>
										<div className='px-1 pb-6 -mx-3 lg:mx-0'>
											<div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(25rem,1fr))]'>
												{group.cases.map((app) => {
													const slug = caseSlug(app);
													return <CaseCard key={app.title} id={'case-' + slug} app={app} isSelected={false} to={'/cases/' + slug + '/'} as='h4' />;
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
