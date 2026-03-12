import React from 'react';
import { Link } from 'gatsby';
import { motion } from 'motion/react';
import { LazyTerminalTypeEffect } from '../../../../constants/utils/terminalTypeEffect';
import { Button, Card } from '../../../../_common/components';

export const IntroSection = ({ scrollToWork }) => {

	const METRICS = [
		{ value: '9', label: 'Digital products', ctx: 'designed & shipped' },
		{ value: '5+', label: 'Platforms unified', ctx: 'single experience' },
		{ value: '4+', label: 'B2B SaaS', ctx: 'complex workflows' },
		{ value: '10+', label: 'Years', ctx: 'experience' },
	];

	return (
		<header className='relative w-full rounded-t-lg' aria-labelledby='hero-heading'>
			<section aria-labelledby='hero-heading' className='border-b border-border px-6 py-12 lg:px-12 lg:py-16'>
				<div className='mx-auto grid max-w-full items-baseline-start gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'>
					<div className='space-y-6'>
						<div className='flex flex-wrap justify-inherit gap-3 text-current/44'>
							<span className='text-[.8em] uppercase tracking-[0.2em] font-semibold'>Lisbon</span>
							<span className='text-current/66' aria-hidden='true'>·</span>
							<span className='text-[.8em] uppercase tracking-[0.2em] font-semibold'>B2B · SaaS · Fintech · AI exploration</span>
						</div>
						<LazyTerminalTypeEffect
							animationType='shuffle'
							duration={500}
							element='h1'
							id='hero-heading'
							className='relative transition-all ease-in-out duration-500 drop-shadow-[0_0_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] font-[Rubik] font-medium text-[clamp(52px,7vw,130px)] leading-tight tracking-tighter text-foreground -mb-1 block min-h-[1.2em]'
							fallback={<h1 id='hero-heading' className='font-[Rubik] font-medium text-[clamp(52px,8vw,110px)] leading-[clamp(52px,6vw,80px)] tracking-tighter text-current mb-0'>Maria Varagilal</h1>}>
							Maria Varagilal
						</LazyTerminalTypeEffect>
						<p className='text-[1.325em] font-[Rubik] tracking-wide text-current'>
							Head Technical Product Designer that ships code.
						</p>
						<p className='max-w-3xl text-xl leading-relaxed text-current/66'>
							10+ years turning SaaS products into unified platforms: designing the system, writing the code, protecting the vision as products scale.
						</p>
						<div className='flex flex-wrap gap-3'>
							<Button as='a' href='#work' variant='default' size='label' onClick={scrollToWork}>
								View My Work
							</Button>
							<Button as={Link} to='/cv' variant='outline' size='label'>
								Full CV
							</Button>
						</div>
					</div>
					{/* a11y: stats as definition list — cited from platform unification projects */}
					<div className='grid grid-cols-2 gap-1 rounded border border-background bg-background' aria-label='Key metrics'>
						{METRICS.map((metric, index) => (
							<Card variant='secondary' className='px-5 py-6' as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: index * 0.25 }} key={metric.label}>
								<dd className='font-[Rubik] font-medium text-[clamp(1.2rem,5vw,2.25rem)] leading-tight tracking-tight text-current'>{metric.value}</dd>
								<dt className='font-[Rubik] mt-1 text-[.8em] uppercase tracking-[0.16em] text-current/66'>{metric.label}</dt>
								<span className='mt-0.5 text-[.75em] text-current/66 opacity-70'>{metric.ctx}</span>
							</Card>
						))}
					</div>
				</div>
			</section>
		</header>
	);
};
