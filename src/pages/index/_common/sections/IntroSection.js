import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { RichText } from '../../../_common/RichText';
import { Button, Card } from '../../../../_common/components';
import { Link } from 'gatsby';

export const IntroSection = () => {
	const { t } = useTranslation();
	const introBlock = t('mv.intro', { returnObjects: true }) || {};
	const intro = introBlock.content || {};
	const kicker = introBlock.kicker;
	const codeLines = Array.isArray(intro.code) ? intro.code : [];
	const identityRows = Array.isArray(intro.identity) ? intro.identity : [];

	return (
		<header className='relative w-full py-12 lg:py-14 border-b border-border' aria-labelledby='hero-heading'>
			<div className='max-w-full hd:max-w-[160ch] mx-auto px-6 lg:px-10 space-y-16 md:space-y-24'>
				<div role='group' aria-label='Identity' className='border-b border-t border-border grid gap-4 md:grid-cols-4 lg:gap-2 py-6 lg:-mt-8'>
					{identityRows.map((row, i) => (
						<div className={'block' + (i === identityRows.length - 1 ? ' md:col-span-2 ms-auto mr-8' : '')} key={row.label + '-' + i}>
							<div className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold'>{row.label}</div>
							<div className='font-mono text-[1rem] sm:text-[.975em] leading-tight text-foreground mt-1.5'>{row.value}</div>
						</div>
					))}
				</div>
				<div className='text-[.72em] uppercase tracking-[0.08em] text-current/66 font-bold sr-only'>{kicker}</div>
				<div aria-labelledby='hero-heading' className='mx-auto grid max-w-full items-center gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]'>
					<div className='w-full'>
						<RichText as='h3' className='font-mono font-medium text-[clamp(2.5rem,9vw,5rem)] leading-[0.94] tracking-[-0.04em] text-foreground' id='hero-heading' text={intro.headline} />
					</div>
					<Card variant='secondary' className='w-full min-w-0 font-mono text-[0.8125rem] leading-[1.85] text-current/88 py-5 max-w-full gap-0'>
						{codeLines.map((ln, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.08 + i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}
								className='grid min-w-0 grid-cols-[2.5rem_1fr]'>
								<span className='text-current/44 text-right pr-3.5 select-none'>{i + 1}</span>
								<span className='min-w-0 break-words whitespace-pre-wrap'>{ln}</span>
							</motion.div>
						))}
					</Card>
				</div>
				<div className='w-full max-w-[95%]'>
					<RichText as='p' className='font-sans tracking-[-0.02em] leading-[1.44] text-[clamp(1.125rem,1.6vw,1.375rem)] text-foreground max-w-[85%]' text={intro.deckPrimary} />
					<RichText as='p' className='text-base leading-[1.55] text-current/75 mt-4 max-w-[75%]' text={intro.deckSecondary} />
					<div className='flex flex-wrap gap-3 mt-6'>
						<Button as='a' href='#work' variant='default' size='label'>
							{intro?.viewWork}
						</Button>
						<Button as={Link} to='/cv' variant='outline' size='label'>
							{intro?.fullCv}
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};
