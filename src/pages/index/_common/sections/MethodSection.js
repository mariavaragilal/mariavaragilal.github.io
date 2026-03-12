import React from 'react';
import { LazyTerminalTypeEffect } from '../../../../constants/utils/terminalTypeEffect';
import { pillars, outcomes, evolution } from '../../../../constants/data/mvpData';
import { Card, Badge, Separator, ChatBubbleQuestion, ChatBubbleAnswer, Insight } from '../../../../_common/components';
import { AccordionItem, AccordionTrigger, AccordionContent } from '../../../../_common/components/controls/Accordion';

export const MethodSection = ({ expandedPillar, togglePillarDetail }) => (
	<Card as='section' id='framework' aria-labelledby='framework-heading' className='border-border px-6 py-16 lg:px-12 lg:py-24 space-y-16'>
		<div className='w-full mx-auto max-w-full'>
			<p className='text-[.8em] uppercase tracking-[0.2em] font-semibold text-current/66 mb-3'>My playbook</p>
			<LazyTerminalTypeEffect
				animationType='futuristic'
				element='h2'
				id='framework-heading'
				className='mb-1 font-[Rubik] font-medium text-[clamp(1.25rem,5vw,2.5rem)] lg:text-[clamp(2rem,6vw,5rem)] tracking-tighter lg:leading-18 text-foreground'>
				The MVP Method
			</LazyTerminalTypeEffect>
			<p className='mb-10 text-[.8em] uppercase tracking-[0.18em] text-current/66 font-semibold'>Maria Varagilal Playbook</p>
			<div className='grid gap-x-10 gap-y-6 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)]'>
				<div className='space-y-4 text-[1.125rem] leading-relaxed text-foreground'>
					<p>
						Growth creates complexity. When a single product becomes a platform of interconnected solutions, the biggest risk is losing the feeling of one company.
					</p>
				</div>
				<p className='text-[1.125rem] leading-relaxed text-current/88'>
					The MVP Method is the approach I&apos;ve developed and refined throughout my career — translating the philosophy behind my work into a repeatable practice. Applied across strategy, design, implementation, and rollout — not just documentation — it protects the original vision as products evolve.
				</p>
			</div>
			{/* <p className='max-w- mb-10 text-[1.125rem] leading-relaxed pr-6'>
				<span className='underline'>When the pillars operate together, they produce 3 interlocking principles:</span> <strong className='text-current'>Clarity, Confidence, Consistency</strong>
			</p> */}
		</div>
		<div className='relative flex flex-col gap-8'>
			{pillars.map((pillar, index) => {
				const isExpanded = expandedPillar[index];
				return (
					<React.Fragment key={pillar.num}>
						<Separator decorative />
						<AccordionItem className='flex flex-col gap-4' isExpanded={isExpanded} onToggle={() => togglePillarDetail(index)}>
							<AccordionTrigger icon='plus' gridCols='md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_24px] items-start' triggerPadding='p-0'>
								<div className='flex flex-col'>
									<span className='uppercase tracking-[0.16em] text-current/22 font-medium' aria-hidden='true'>{pillar.num}</span>
									<h3 className='font-[Rubik] text-[clamp(1.2rem,2.5vw,1.5rem)] font-medium text-current'>{pillar.title}</h3>
								</div>
								<div className='relative w-full md:pr-32 flex flex-col gap-2'>
									<p className='leading-relaxed text-current/66'>{pillar.summary}</p>
								</div>
							</AccordionTrigger>
							<AccordionContent animate={false}>
								<Card variant='secondary' className='px-6 py-8 lg:px-10'>
									{pillar.groundedIn && (
										<div className='flex gap-1.5 -mb-2'>
											{pillar.groundedIn.map(tag => <Badge key={tag} variant='default'>{tag}</Badge>)}
										</div>
									)}
									<p className='max-w-4xl text-[1rem] leading-relaxed text-current/88 my-5'>
										{pillar.detail[0]}
									</p>
									{pillar.philosophy && (
										<div className='flex flex-col gap-2.5 pt-3 border-t border-border/50'>
											{/* <p className='text-[0.6rem] tracking-[0.14em] uppercase text-current/22 mb-0.5'>
												{pillar.philosophy.principle}
											</p> */}
											<ChatBubbleQuestion>
												{pillar.philosophy.ask}
											</ChatBubbleQuestion>
											<ChatBubbleAnswer>
												{pillar.philosophy.answer}
											</ChatBubbleAnswer>
											<Insight>
												{pillar.philosophy.checkpoint}
											</Insight>
										</div>
									)}
								</Card>
							</AccordionContent>
						</AccordionItem>
						{/* {index !== pillars.length - 1 && <Separator decorative/>} */}
					</React.Fragment>
				);
			})}
		</div>
		<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6'>
			<Card variant='secondary' className='p-4 sm:p-6 min-w-0'>
				<p className='text-[.8em] uppercase tracking-[0.2em] font-semibold text-current/66 mb-3'>Outcomes</p>
				<h3 className='font-[Rubik] text-[1.25rem]/5 font-medium text-current mb-6'>When the pillars operate together</h3>
				<p className='text-[0.95rem] text-current/88 mb-6 xl:max-w-xl'>These are results, not steps. They emerge when the five pillars work together at the leadership level.</p>
				<div className='grid grid-cols-1 xl:grid-cols-3 gap-px rounded-lg overflow-hidden bg-border min-w-0' role='list' aria-label='Outcomes'>
					{outcomes.map((o) => (
						<div key={o.principle} className='bg-background p-4 sm:p-5 md:p-6 min-w-0 break-words' role='listitem'>
							<p className='font-[Rubik] text-xl font-semibold text-primary mb-1'>{o.principle}</p>
							<p className='text-[.675rem] font-semibold tracking-[0.06em] uppercase text-current/66 mb-2.5'>{o.drivenBy}</p>
							<p className='text-[0.8125rem] leading-[1.55] text-current/88'>{o.protects}</p>
						</div>
					))}
				</div>
			</Card>

			<Card variant='secondary' className='p-4 sm:p-6 min-w-0'>
				<p className='mb-2 text-[.8em] uppercase tracking-[0.2em] font-semibold text-current/66'>Evolution</p>
				<h3 className='font-[Rubik] font-medium text-[1.25rem]/5 text-current mb-6'>The loop that ties it together</h3>
				<p className='text-[0.95rem] leading-relaxed text-current/88 mb-6'>{evolution.intro}</p>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-5 xl:gap-1 mb-3' role='list' aria-label='Learning cycle'>
					{evolution.loop.map((item, i) => (
						<div key={item.step} role='listitem' className='flex gap-2.5 items-start bg-background p-4 sm:px-2.5 min-w-0 break-words'>
							<span className='font-[Rubik] text-[0.8125rem] font-bold text-current/66 shrink-0 mt-0.5'>{i + 1}.</span>
							<div>
								<p className='font-[Rubik] font-medium text-current mb-0.5'>{item.step}</p>
								<p className='text-[0.8125rem] leading-relaxed text-current/66 mb-1'>{item.desc}</p>
								<p className='text-[.675rem] font-semibold tracking-[0.06em] uppercase text-current/66'>{item.pillar}</p>
							</div>
						</div>
					))}
				</div>
				<p className='text-[0.8125rem] leading-relaxed text-current/66 max-w-full mb-0'>{evolution.closing}</p>
			</Card>
		</div>

		{/* <Blockquote className='mt-10'>
				<BlockquoteMain className='mb-2'>The pillars are intended to be universally applicable.</BlockquoteMain>
				<BlockquoteSecondary>Applying the MVP process enables order-of-magnitude gains in consistency, speed, and overall enterprise-level perception. Growth creates complexity. The MVP Framework exists to make sure that complexity never costs you the feeling of one company.</BlockquoteSecondary>
			</Blockquote> */}
	</Card>
);
