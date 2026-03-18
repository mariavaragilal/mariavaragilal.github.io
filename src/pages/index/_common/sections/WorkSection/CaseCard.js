import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Badge, Button, Card, CardAction, CardDescription, CardHeader, CardTitle } from '../../../../../_common/components';
import { focusRing } from '../../../../../constants/utils/a11y';

const DEFAULT_ICON_CLASSNAME = 'font-mono font-thin text-xl leading-none';

const defaultIcon = (showRotated, iconChar, iconClassName, prefersReducedMotion) => (
	<motion.span
		animate={{ rotate: (!prefersReducedMotion && showRotated) ? 45 : 0 }}
		transition={{ duration: 0.2, ease: 'easeInOut' }}
		className={iconClassName}
		aria-hidden='true'
	>{iconChar}</motion.span>
);

export const CaseCard = ({ app, isSelected, onToggle, href, icon, iconChar = '+', iconClassName = DEFAULT_ICON_CLASSNAME, as, id }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : true));
	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const handler = (e) => setPrefersReducedMotion(e.matches);
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, []);
	const showRotated = isSelected || isHovered;
	const resolvedIcon = typeof icon === 'function' ? icon(showRotated) : (icon !== undefined ? icon : defaultIcon(showRotated, iconChar, iconClassName, prefersReducedMotion));
	const cardClass = 'flex flex-col items-start p-4 w-full cursor-pointer text-left rounded-lg transition-colors ' + (isSelected ? 'border-primary/50 bg-card/75 ring-2 ring-primary/15' : 'border-border hover:bg-card/75') + ' ' + focusRing;
	const isLink = !!href;
	const hostnameEl = app.references?.links?.[0] ? (
		isLink ? (
			<span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
				{new URL(app.references.links[0].url).hostname.replace('www.', '')}
				<span aria-hidden>↗</span>
			</span>
		) : (
			<a href={app.references.links[0].url} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()} className='inline-flex items-center gap-1 text-xs text-muted-foreground hover: transition-colors'>
				{new URL(app.references.links[0].url).hostname.replace('www.', '')}
				<span aria-hidden>↗</span>
			</a>
		)
	) : null;
	return isLink ? (
		<Card as='a' href={href} target='_blank' rel='noopener noreferrer' variant='default' className={cardClass} id={id}>
			<CardHeader className='flex gap-1' headerPadding='p-0'>
				<span className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
					{app.status === 'shipped' ? (
						<Badge variant='secondary' size='sm' className=' tracking-[0.06em] uppercase'>shipped</Badge>
					) : (
						<Badge variant='outline' size='sm' className=' tracking-[0.06em] uppercase'>concept</Badge>
					)}
					<CardTitle className='font-mono text-xl text-primary w-full'>{app.title}</CardTitle>
				</span>
				<CardDescription>
					{app.subtitle}
				</CardDescription>
				{(app.tools || hostnameEl) ? (
					<div className='mt-2 flex flex-col gap-1'>
						{app.tools ? <span className='block text-xs text-muted-foreground'>{app.tools}</span> : null}
						{hostnameEl}
					</div>
				) : null}
				<CardAction>
					<Button as='span' variant='secondary' size='icon' aria-hidden='true' className='shrink-0 size-11' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
						{resolvedIcon}
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	) : (
		<Card as='button' type='button' variant='default' onClick={onToggle} className={cardClass} id={id} aria-expanded={isSelected} aria-label={app.title + ' — ' + (isSelected ? 'Showing full case study, click to close' : 'Click to view full case study details')}>
			<CardHeader className='flex gap-1' headerPadding='p-0'>
				<span className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
					{app.status === 'shipped' ? (
						<Badge variant='secondary' size='sm' className=' tracking-[0.06em] uppercase'>shipped</Badge>
					) : (
						<Badge variant='outline' size='sm' className=' tracking-[0.06em] uppercase'>concept</Badge>
					)}
					<CardTitle className='font-mono text-xl text-primary w-full'>{app.title}</CardTitle>
				</span>
				<CardDescription>
					{app.subtitle}
				</CardDescription>
				{(app.tools || hostnameEl) ? (
					<div className='mt-2 flex flex-col gap-1'>
						{app.tools ? <span className='block text-xs text-muted-foreground'>{app.tools}</span> : null}
						{hostnameEl}
					</div>
				) : null}
				<CardAction>
					<Button as='span' variant='secondary' size='icon' aria-hidden='true' className='shrink-0 size-11' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
						{resolvedIcon}
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	);
};
