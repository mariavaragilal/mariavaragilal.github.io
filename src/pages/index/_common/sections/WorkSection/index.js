import React, { useState } from 'react';
import { Card, Separator } from '../../../../../_common/components';
import { AccordionItem, AccordionTrigger, AccordionContent } from '../../../../../_common/components/controls/Accordion';
import { workCases } from '../../../../../constants/data/cases';
import { LazyTerminalTypeEffect } from '../../../../../constants/utils/terminalTypeEffect';
import { CaseCard } from './CaseCard';
import { CaseDetail } from './CaseDetail';
import { CaseSectionHeading } from './CaseSharedComponents';

const _initialSelected = Object.fromEntries(Object.entries(workCases).map(([group, data]) => [group, data.cases[0]]));

export const WorkSection = () => {
	const [expandedGroup, setExpandedGroup] = useState('Securibox');
	const [selectedByGroup, setSelectedByGroup] = useState(_initialSelected);
	const toggleGroup = (groupName) => setExpandedGroup((prev) => (prev === groupName ? null : groupName));
	const toggleCase = (groupName, app) => setSelectedByGroup((prev) => {
		const current = prev[groupName];
		const next = { ...prev };
		next[groupName] = current?.title === app.title ? null : app;
		return next;
	});

	return (
		<Card as='section' variant='secondary' id='work' aria-labelledby='work-heading' className='scroll-mt-6 rounded-xl m-4 px-6 py-12 lg:px-10 -mt-4 lg:-mt-8 space-y-16'>
			<div className='w-full mx-auto max-w-full'>
				<p className='text-[.75em] uppercase tracking-[0.2em] font-semibold text-current/66'>My work</p>
				<LazyTerminalTypeEffect
					animationType='futuristic'
					element='h2'
					className='mb-1 font-mono font-medium lg:font-normal text-[2.75em] lg:text-[clamp(2rem,6vw,5rem)] tracking-[-.05em] lg:tracking-tighter leading-[1em] lg:leading-18 text-foreground'
					id='work-heading'>

					Design to Production
				</LazyTerminalTypeEffect>
				<p className='text-lg leading-relaxed text-current/88 max-w-2xl mt-10'>
					I design it, I build it. Below is live work — brand identity, design systems, flows, and frontend development I worked on. Technologies include React, Gatsby, Figma, Redux, Bootstrap, AngularJS, and more.
				</p>
			</div>
			<div className='relative flex flex-col gap-8'>
				{Object.entries(workCases).map(([groupName, group]) => {
					const isExpanded = expandedGroup === groupName;
					const selectedCase = selectedByGroup[groupName];
					return (
						<React.Fragment key={groupName}>
							<Separator decorative />
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
												return [
													<CaseCard key={app.title} app={app} isSelected={isSelected} onToggle={() => toggleCase(groupName, app)} as='h4' />,
													...(isSelected && selectedCase ? [
														<Card key={app.title + '-detail'} as='div' variant='default' className='md:order-last md:col-span-2 lg:col-span-3 xl:col-span-full px-6 py-8 lg:px-10' role='region' aria-label={'Case study: ' + selectedCase.title}>
															<div className='grid grid-cols-1 md:grid-cols-2 mb-6'>
																<div className='flex flex-col'>
																	<p className='text-2xl font-mono font-medium text-foreground mb-0.5'>{selectedCase.title}</p>
																	<p className='text-md text-current/66'>{selectedCase.subtitle}</p>
																</div>
																{(selectedCase.role || selectedCase.tools) ? (
																	<div className='flex flex-col md:flex-row gap-x-4 gap-y-2 text-sm text-current/66 mt-2 justify-end md:ml-auto md:pl-6'>
																		{selectedCase.role ? <div className='relative'><CaseSectionHeading as='h5' className='mb-0'>Role</CaseSectionHeading><span>{selectedCase.role}</span></div> : null}
																		{selectedCase.tools ? <div className='relative'><CaseSectionHeading as='h5' className='mb-0'>Tools</CaseSectionHeading><span>{selectedCase.tools}</span></div> : null}
																	</div>
																) : null}
																{selectedCase.references?.links?.[0] ?
																	<a href={selectedCase.references.links[0].url} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()} className='mt-4 inline-flex md:hidden items-center gap-1 text-xs text-current/66 hover:text-primary transition-colors'>
																		{new URL(selectedCase.references.links[0].url).hostname.replace('www.', '')}
																		<span aria-hidden>↗</span>
																	</a>
																	: null}
															</div>
															<Separator decorative />
															<CaseDetail app={selectedCase} />
														</Card>
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
	);
};
