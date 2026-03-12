import { useState } from 'react';
import { motion } from 'motion/react';
import { Badge, Button, Card, CardAction, CardDescription, CardHeader, CardTitle } from '../../../../../_common/components';
import { focusRing } from '../../../../../constants/utils/a11y';

const DEFAULT_ICON_CLASSNAME = 'font-[Rubik] font-thin text-xl leading-none';

const defaultIcon = (showRotated, iconChar, iconClassName) => (
	<motion.span
		animate={{ rotate: showRotated ? 45 : 0 }}
		transition={{ duration: 0.2, ease: 'easeInOut' }}
		className={iconClassName}
		aria-hidden='true'
	>{iconChar}</motion.span>
);

export const CaseCard = ({ app, isSelected, onToggle, href, icon, iconChar = '+', iconClassName = DEFAULT_ICON_CLASSNAME }) => {
	const [isHovered, setIsHovered] = useState(false);
	const showRotated = isSelected || isHovered;
	const resolvedIcon = typeof icon === 'function' ? icon(showRotated) : (icon !== undefined ? icon : defaultIcon(showRotated, iconChar, iconClassName));
	const cardClass = 'flex flex-col items-start p-4 w-full cursor-pointer text-left rounded-lg transition-colors ' + (isSelected ? 'border-primary/50 bg-card/75 ring-2 ring-primary/15' : 'border-border hover:bg-card/75') + ' ' + focusRing;
	const isLink = !!href;
	const hostnameEl = app.references?.links?.[0] ? (
		isLink ? (
			<span className='mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground'>
				{new URL(app.references.links[0].url).hostname.replace('www.', '')}
				<span aria-hidden>↗</span>
			</span>
		) : (
			<a href={app.references.links[0].url} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()} className='mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors'>
				{new URL(app.references.links[0].url).hostname.replace('www.', '')}
				<span aria-hidden>↗</span>
			</a>
		)
	) : null;
	return isLink ? (
		<Card as='a' href={href} target='_blank' rel='noopener noreferrer' variant='default' className={cardClass}>
			<CardHeader className='flex gap-1' headerPadding='p-0'>
				<CardTitle className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
					{app.status === 'shipped' ? (
						<Badge variant='secondary' size='sm' className=' tracking-[0.06em] uppercase'>shipped</Badge>
					) : (
						<Badge variant='outline' size='sm' className=' tracking-[0.06em] uppercase'>concept</Badge>
					)}
					<span className='font-[Rubik] text-xl font-semibold text-primary w-full'>{app.title}</span>
				</CardTitle>
				<CardDescription className='text-sm text-current/50 leading-snug'>
					{app.subtitle}
				</CardDescription>
				{hostnameEl}
				<CardAction>
					<Button as='span' variant='secondary' size='icon' aria-hidden='true' className='shrink-0' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
						{resolvedIcon}
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	) : (
		<Card as='button' type='button' variant='default' onClick={onToggle} className={cardClass}>
			<CardHeader className='flex gap-1' headerPadding='p-0'>
				<CardTitle className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
					{app.status === 'shipped' ? (
						<Badge variant='secondary' size='sm' className=' tracking-[0.06em] uppercase'>shipped</Badge>
					) : (
						<Badge variant='outline' size='sm' className=' tracking-[0.06em] uppercase'>concept</Badge>
					)}
					<span className='font-[Rubik] text-xl font-semibold text-primary w-full'>{app.title}</span>
				</CardTitle>
				<CardDescription className='text-sm text-current/50 leading-snug'>
					{app.subtitle}
				</CardDescription>
				{hostnameEl}
				<CardAction>
					<Button as='span' variant='secondary' size='icon' aria-hidden='true' className='shrink-0' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
						{resolvedIcon}
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	);
};
