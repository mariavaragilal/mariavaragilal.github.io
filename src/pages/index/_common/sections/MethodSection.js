import React from 'react';
import { useTranslation } from 'react-i18next';
import { LazyTerminalTypeEffect } from '../../../../constants/utils/terminalTypeEffect';
import { Card, Badge, Separator, ChatBubbleQuestion, ChatBubbleAnswer, Insight } from '../../../../_common/components';
import { AccordionItem, AccordionTrigger, AccordionContent } from '../../../../_common/components/controls/Accordion';

export const MethodSection = ({ expandedDimension, toggleDimensionDetail }) => {
	const { t } = useTranslation();
	const method = t('mv.method', { returnObjects: true }) || {};
	const dimensions = t('mv.dimensions', { returnObjects: true }) || [];
	const outcomes = t('mv.outcomes', { returnObjects: true }) || [];
	const evolution = t('mv.evolution', { returnObjects: true }) || {};
	const ms = t('mv.methodSection', { returnObjects: true }) || {};
	return (
		<Card as='section' id='framework' aria-labelledby='framework-heading' className='border-border px-6 py-16 lg:px-12 lg:py-24 space-y-16'>
			<div className='w-full mx-auto max-w-full'>
				<p className='text-[.75em] uppercase tracking-[0.2em] font-semibold text-current/66 mb-3'>{method.label}</p>
				<LazyTerminalTypeEffect
					animationType='futuristic'
					element='h2'
					className='mb-1 font-mono font-medium lg:font-normal text-[2.75em] lg:text-[clamp(2rem,6vw,5rem)] tracking-[-.05em] lg:tracking-tighter leading-[1em] lg:leading-18 text-foreground'
					id='framework-heading'>
					{method.heading}
				</LazyTerminalTypeEffect>
				<p className='text-[1.25em] text-current tracking-wide underline'>{method.subtitle}</p>
				<div className='grid gap-x-10 gap-y-6 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] mt-10'>
					<div className='space-y-4 text-[1.125rem] leading-relaxed text-foreground'>
						<p>{method.intro?.column1}</p>
					</div>
					<p className='text-[1.125rem] leading-relaxed text-current/88'>{method.intro?.column2}</p>
				</div>
			</div>
			<div className='relative flex flex-col gap-8'>
				{dimensions.map((dimension, index) => {
					const isExpanded = expandedDimension[index];
					return (
						<React.Fragment key={dimension.num}>
							<Separator decorative/>
							<AccordionItem className='flex flex-col gap-4' isExpanded={isExpanded} onToggle={() => toggleDimensionDetail(index)}>
								<AccordionTrigger icon='plus' gridCols='md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_1.6rem] items-start' triggerPadding='p-0'>
									<div className='flex flex-col'>
										<span className='uppercase tracking-[0.16em] text-current/22 font-medium' aria-hidden='true'>{dimension.num}</span>
										<h3 className='font-mono text-[clamp(1.2rem,2.5vw,1.5rem)] font-medium text-current'>{dimension.title}</h3>
									</div>
									<div className='relative w-full md:pr-32 flex flex-col gap-2'>
										<p className='leading-relaxed text-current/66'>{dimension.summary}</p>
									</div>
								</AccordionTrigger>
								<AccordionContent animate={false}>
									<Card variant='secondary' className='px-6 py-8 lg:px-10'>
										{dimension.groundedIn && (
											<div className='flex gap-1.5 -mb-2'>
												{dimension.groundedIn.map((tag) => <Badge key={tag} variant='default'>{tag}</Badge>)}
											</div>
										)}
										<p className='max-w-4xl text-[1rem] leading-relaxed text-current/88 my-5'>
											{dimension.detail[0]}
										</p>
										{dimension.philosophy && (
											<div className='flex flex-col gap-2.5 pt-3 border-t border-border/50'>
												<ChatBubbleQuestion>
													{dimension.philosophy.ask}
												</ChatBubbleQuestion>
												<ChatBubbleAnswer>
													{dimension.philosophy.answer}
												</ChatBubbleAnswer>
												<Insight>
													{dimension.philosophy.checkpoint}
												</Insight>
											</div>
										)}
									</Card>
								</AccordionContent>
							</AccordionItem>
						</React.Fragment>
					);
				})}
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6'>
				<Card variant='secondary' className='p-4 sm:p-6 min-w-0'>
					<p className='text-[.75em] uppercase tracking-[0.2em] font-semibold text-current/66 mb-3'>{ms.outcomesKicker}</p>
					<h3 className='font-mono text-[1.25rem]/5 font-medium text-current mb-6'>{ms.outcomesHeading}</h3>
					<p className='text-[0.95rem] text-current/88 mb-6 xl:max-w-xl'>{ms.outcomesLead}</p>
					<div className='grid grid-cols-1 xl:grid-cols-3 gap-px rounded-lg overflow-hidden bg-border min-w-0' role='list' aria-label={ms.outcomesListAria}>
						{outcomes.map((o) => (
							<div key={o.principle} className='bg-background p-4 sm:p-5 md:p-6 min-w-0 break-words' role='listitem'>
								<h4 className='font-mono text-xl font-medium text-primary mb-1'>{o.principle}</h4>
								<p className='text-[.675rem] font-semibold tracking-[0.06em] uppercase text-current/66 mb-2.5'>{o.drivenBy}</p>
								<p className='text-[0.8125rem] leading-[1.55] text-current/66'>{o.protects}</p>
							</div>
						))}
					</div>
				</Card>

				<Card variant='secondary' className='p-4 sm:p-6 min-w-0'>
					<p className='mb-2 text-[.75em] uppercase tracking-[0.2em] font-semibold text-current/66'>{ms.evolutionKicker}</p>
					<h3 className='font-mono text-[1.25rem]/5 font-medium text-current mb-6'>{ms.evolutionHeading}</h3>
					<p className='text-[0.95rem] leading-relaxed text-current/88 mb-6'>{evolution.intro}</p>
					<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-5 xl:gap-1 mb-3' role='list' aria-label={ms.evolutionLoopAria}>
						{evolution.loop.map((item, i) => (
							<div key={item.step} role='listitem' className='flex gap-2.5 items-start bg-background p-4 sm:px-2.5 min-w-0 break-words'>
								<span className='font-mono text-[0.8125rem] font-light text-current/66 shrink-0 mt-0.5'>{i + 1}.</span>
								<div className='relative'>
									<h4 className='font-mono text-xl font-medium text-primary mb-1'>{item.step}</h4>
									<p className='text-[.675rem] font-semibold tracking-[0.06em] uppercase text-current/66 mb-2.5'>{item.dimension}</p>
									<p className='text-[0.8125rem] leading-[1.55] text-current/66'>{item.desc}</p>
								</div>
							</div>
						))}
					</div>
					<p className='text-[0.8125rem] leading-relaxed text-current/66 max-w-full mb-0'>{evolution.closing}</p>
				</Card>
			</div>
		</Card>
	);
};
