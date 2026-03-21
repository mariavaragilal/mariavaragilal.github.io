import { Link } from 'gatsby';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { LazyTerminalTypeEffect } from '../../../../constants/utils/terminalTypeEffect';
import { Button, Card } from '../../../../_common/components';

export const IntroSection = ({ onScrollToWork }) => {
	const { t } = useTranslation();
	const keyMetrics = t('mv.keyMetrics', { returnObjects: true }) || [];
	const intro = t('mv.intro', { returnObjects: true }) || {};
	return (
		<header className='relative w-full rounded-t-lg' aria-labelledby='hero-heading'>
			<section aria-labelledby='hero-heading' className='border-b border-border px-6 py-12 lg:px-12 lg:py-16'>
				<div className='mx-auto grid max-w-full items-baseline-start gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'>
					<div className='space-y-6'>
						<div className='flex flex-wrap justify-inherit gap-3 text-current/44'>
							<span className='text-[.75em] uppercase tracking-[0.2em] font-semibold'>{intro.locationLine}</span>
							<span className='text-current/66' aria-hidden='true'>·</span>
							<span className='text-[.75em] uppercase tracking-[0.2em] font-semibold'>{intro.tagline}</span>
						</div>
						<LazyTerminalTypeEffect
							animationType='cursor'
							duration={500}
							element='h1'
							className='relative transition-all ease-in-out duration-500 drop-shadow-[0_0_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] font-mono md:font-light text-[clamp(2rem,15vw,8.5rem)] leading-[clamp(2.5rem,15vw,8rem)] md:text-[clamp(2rem,8vw,8.5rem)] md:leading-[clamp(2.5rem,7vw,7rem)] tracking-[-.075em]'
							fallback={<h1 id='hero-heading' className='font-mono md:font-light text-[clamp(2rem,15vw,8.5rem)] leading-[clamp(2.5rem,15vw,8rem)] md:text-[clamp(2rem,8vw,8.5rem)] md:leading-[clamp(2.5rem,7vw,7rem)] tracking-[-.075em]'>{t('cv.name')}</h1>}
							id='hero-heading'>
							{intro.heroNameLine1} <br />{intro.heroNameLine2}
						</LazyTerminalTypeEffect>
						<p className='text-[1.25em] underline tracking-wide text-current'>
							{intro.title}
						</p>
						<p className='max-w-3xl text-xl leading-relaxed text-current/66'>
							{intro.body}
						</p>
						<div className='flex flex-wrap gap-3'>
							<Button as='a' href='#work' variant='default' size='label' onClick={onScrollToWork}>
								{intro.viewWork}
							</Button>
							<Button as={Link} to='/cv' variant='outline' size='label'>
								{intro.fullCv}
							</Button>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-1 rounded border border-background bg-background' aria-label={intro.metricsAriaLabel}>
						{keyMetrics.map((metric, index) => (
							<Card variant='secondary' className='px-5 py-6' as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: index * 0.25 }} key={metric.label}>
								<dd className='font-mono text-[clamp(1.2rem,5vw,2.5rem)] leading-tight tracking-tight text-current'>{metric.value}</dd>
								<dt className='mt-1 text-[.75em] uppercase font-medium tracking-[0.16em] text-current/88'>{metric.label}</dt>
								<span className='mt-0.5 text-[.785em] text-current/50'>{metric.ctx}</span>
							</Card>
						))}
					</div>
				</div>
			</section>
		</header>
	);
};
