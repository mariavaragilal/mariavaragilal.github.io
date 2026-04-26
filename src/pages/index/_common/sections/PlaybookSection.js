import { useTranslation } from 'react-i18next';
import { LazyTerminalTypeEffect } from '../../../../constants/utils/terminalTypeEffect';
import { Card, Badge, ChatBubbleQuestion, ChatBubbleAnswer, Insight, AccordionItem, AccordionTrigger, AccordionContent, Stack } from '../../../../_common/components';
import { RichText } from '../../../_common/RichText';

export const PlaybookSection = ({ expandedDimension, toggleDimensionDetail }) => {
	const { t } = useTranslation();
	const pb = t('mv.playbook', { returnObjects: true }) || {};
	const intro = pb.intro || {};
	const com = pb.commitments || {};
	const dim = pb.dimensions || {};
	const dimLabels = dim.labels || {};
	const commitments = com.items || [];
	const dimensions = dim.items || [];
	const outcomes = pb.outcomes || {};
	const outcomeCards = outcomes.items || [];
	const evolution = pb.evolution || {};

	return (
		<Card as='section' id='framework' aria-labelledby='framework-heading' variant='ghost' className='border-none pt-24 lg:pt-32 lg:pb-0 pb-16'>
			<div className='max-w-full hd:max-w-[160ch] mx-auto px-6 lg:px-10 space-y-14'>
				<div className='text-center'>
					<div className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold mb-2'>{intro.kicker}</div>
					<h3 id='framework-heading' className='font-mono font-medium text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.05em] text-foreground'>
						<LazyTerminalTypeEffect animationType='futuristic' element='span' className='inline'>{intro.title}</LazyTerminalTypeEffect>
						{': '}
						<RichText as='span' className='inline' text={intro.sub} />
					</h3>
					<p className='mx-auto max-w-[125ch] mt-4 text-[1rem] leading-[1.6] text-current/88'>
						<RichText as='span' className='text-foreground' text={intro.lead} />{' '}
						<RichText as='span' text={intro.body} />
					</p>
				</div>

				<div className='relative'>
					<h4 className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold mb-3'>{com.kicker}</h4>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{commitments.map((c) => (
							<Card key={c.principle} variant='transparent' className='border-t border-border rounded-none pt-5 pb-4 gap-0 shadow-none'>
								<p className='font-mono font-bold tracking-[0.06em] text-[0.6875rem] text-brand mt-2.5 mb-2'>{(c.dimensionNos || []).map((n) => 'D' + n).join(' · ')}</p>
								<h5 className='text-[1.125rem] font-medium tracking-[-0.01em] text-foreground'>{c.principle}</h5>
								<p className='text-[0.84375rem] leading-[1.55] text-current/88'>{c.protects}</p>
							</Card>
						))}
					</div>
				</div>

				<div className='relative'>
					<h4 className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold mb-3'>{dim.kicker}</h4>
					<div className='relative border-t border-border'>
						{dimensions.map((dimension, index) => {
							const isExpanded = expandedDimension[index];
							return (
								<AccordionItem key={dimension.num} className='border-b border-border' isExpanded={isExpanded} onToggle={() => toggleDimensionDetail(index)}>
									<AccordionTrigger icon='plus' gridCols='md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_1.5rem] items-start' triggerPadding='py-8'>
										<Stack kicker={'D' + dimension.num} title={dimension.title} titleAs='h5' summary={dimension.summary} />
									</AccordionTrigger>
									<AccordionContent animate={false}>
										<Card variant='muted' className='px-6 py-8 lg:px-10'>
											{dimension.groundedIn && (
												<div className='flex gap-1.5 -mb-2'>
													{dimension.groundedIn.map((tag) => <Badge key={tag} variant='default'>{tag}</Badge>)}
												</div>
											)}
											<p className='max-w-full text-[1rem] leading-relaxed text-current/88 my-5'>
												{dimension.detail[0]}
											</p>
											{dimension.philosophy && (
												<div className='flex flex-col gap-2.5 pt-3 border-t border-border/50'>
													{dimension.philosophy.lens && (
														<div className='flex flex-wrap flex-1 items-center gap-1 text-xs leading-relaxed '>
															<p className='font-semibold uppercase tracking-[0.0875em] text-current/66'>{dimLabels.lens}: </p>
															<p className='font-mono font-medium text-primary'>{dimension.philosophy.lens}</p>
														</div>
													)}
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
							);
						})}
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6'>
					<div role='region' aria-label={outcomes.listAria || 'Outcomes'}>
						<h4 className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold mb-2'>{outcomes.kicker}</h4>
						{outcomes.heading ? <h5 className='font-mono font-medium text-[1.25rem] leading-tight text-foreground tracking-[-0.02em] mb-2'>{outcomes.heading}</h5> : null}
						{outcomes.lead ? <p className='text-sm text-current/80 leading-relaxed max-w-4xl mb-4'>{outcomes.lead}</p> : null}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-[2px]'>
							{outcomeCards.map((o, index) => (
								<Card key={o.principle} variant='muted' className={'p-5 gap-0 ' + (index === 0 ? ' rounded-r-none' : index === outcomeCards.length - 1 ? ' rounded-l-none' : ' rounded-none')}>
									<p className='font-mono font-bold tracking-[0.06em] text-[0.6875rem] text-brand mt-2.5 mb-2'>{o.drivenBy}</p>
									<h5 className='text-[1.125rem] font-medium tracking-[-0.01em] text-foreground'>{o.principle}</h5>
									<p className='text-[0.84375rem] leading-[1.55] text-current/88'>{o.protects}</p>
								</Card>
							))}
						</div>
					</div>
					<div className='space-y-3 relative mb-16' role='region' aria-label={evolution.loopAria || 'Evolution'}>
						<h4 className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold'>{evolution.kicker}</h4>
						<h5 className='font-mono font-medium text-[1.125rem] text-foreground tracking-[-0.01em]'>{evolution.heading}</h5>
						<div className='flex flex-col gap-2'>
							<p className='leading-[1.6] text-current/88'>
								{evolution.intro}
								<span className='text-current/66'> — {evolution.whyItMatters}</span>
							</p>
							{evolution.closing ? <p className='text-[0.84375rem] leading-[1.6]'>{evolution.closing}</p> : null}
						</div>
					</div>
				</div>
			</div>

		</Card>
	);
};
