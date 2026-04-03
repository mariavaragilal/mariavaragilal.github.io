import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Card, CardAction, CardDescription, CardContent, CardHeader, CardTitle } from '../../../_common/components';
import { focusRing } from '../../../constants/utils/a11y';
import { useLocation } from '@gatsbyjs/reach-router';
import { Link } from 'gatsby';
import { getAbsoluteUrl } from '../../../constants/utils/index';

export const CaseCard = ({ app, isSelected, onToggle, href, to, icon, iconChar = '+', iconClassName, as: _as, id, variant = 'default' }) => {
	const { t } = useTranslation();
	const location = useLocation();
	const ui = t('mv.caseUi', { returnObjects: true }) || {};
	const [isHovered, setIsHovered] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : true));
	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const handler = (e) => setPrefersReducedMotion(e.matches);
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, []);
	const showRotated = isSelected || isHovered;
	const resolvedIcon = typeof icon === 'function' ? icon(showRotated) : (icon !== undefined ? icon : <span className={iconClassName}>{iconChar}</span>);
	const cardClassBase = 'flex flex-col items-start p-4 w-full text-left rounded-lg transition-colors ' + (isSelected ? 'border-primary/50 bg-card/75 ring-2 ring-primary/15' : 'border-border hover:bg-card/75') + ' ' + focusRing;
	const cardClassLink = cardClassBase + ' cursor-pointer';
	const isLink = !!href;
	const isInternalCase = !!to;
	const hostnameEl = app.references?.links?.[0] ? (
		(isLink || isInternalCase) ? (
			<span className='inline-flex items-center gap-1 font-mono text-[0.65rem] text-current/88'>
				{new URL(app.references.links[0].url).hostname.replace('www.', '')}
				<span aria-hidden>↗</span>
			</span>
		) : (
			<a href={app.references.links[0].url} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1 font-mono text-[0.65rem] text-current/88 underline-offset-2 hover:underline hover:text-current'>
				{new URL(app.references.links[0].url).hostname.replace('www.', '')}
				<span aria-hidden>↗</span>
			</a>
		)
	) : null;
	const cardAria = app.title + ' — ' + (isSelected ? ui.cardAriaOpen : ui.cardAriaClosed);
	return isInternalCase ? (
		<Card as={Link} to={to} variant={variant} className={cardClassLink} id={id}>
			<CardHeader className='flex gap-1' headerPadding='p-0'>
				<div className='flex flex-col space-y-2'>
					<span className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
						{app.status === 'shipped' ? (
							<Badge variant='secondary' size='sm' className=' tracking-[0.06em] uppercase'>{ui.shipped}</Badge>
						) : (
							<Badge variant='outline' size='sm' className=' tracking-[0.06em] uppercase'>{ui[app.status] ?? ui.concept}</Badge>
						)}
						<CardTitle className='font-mono text-xl text-primary w-full'>{app.title}</CardTitle>
					</span>
					<CardDescription>
						{app.subtitle}
					</CardDescription>
				</div>
				<CardAction>
					<Button title={ui.fullCaseStudy + ' ' + app.title + ' - ' + getAbsoluteUrl(to)} as='span' variant='secondary' size='icon' aria-hidden='true' className='shrink-0 size-11' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
						{resolvedIcon}
					</Button>
					<p className='font-mono text-[0.65rem] leading-relaxed text-current/88 sr-only'>{ui.fullCaseStudy}<span aria-hidden>↗</span></p>
				</CardAction>
			</CardHeader>

			{(app.tools || hostnameEl) ? (
				<CardContent className='rounded-md border border-border/40 bg-secondary/75 w-full mt-auto' customPadding='px-4 py-2'>
					<div className='flex flex-col gap-0.5'>
						{app.tools ? <span className='font-mono text-[0.65rem] leading-relaxed line-clamp-1'>{app.tools}</span> : null}
						{hostnameEl}
					</div>
				</CardContent>
			) : null}
		</Card>
	) : isLink ? (
		<Card as='a' href={href} target='_blank' rel='noopener noreferrer' variant='default' className={cardClassLink} id={id}>
			<CardHeader className='flex gap-1' headerPadding='p-0'>
				<div className='flex flex-col space-y-2'>
					<span className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
						{app.status === 'shipped' ? (
							<Badge variant='secondary' size='sm' className=' tracking-[0.06em] uppercase'>{ui.shipped}</Badge>
						) : (
							<Badge variant='outline' size='sm' className=' tracking-[0.06em] uppercase'>{ui[app.status] ?? ui.concept}</Badge>
						)}
						<CardTitle className='font-mono text-xl text-primary w-full'>{app.title}</CardTitle>
					</span>
					<CardDescription>
						{app.subtitle}
					</CardDescription>
				</div>
				<CardAction>
					<Button title={ui.fullCaseStudy} as='span' variant='secondary' size='icon' aria-hidden='true' className='shrink-0 size-11' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
						{resolvedIcon}
					</Button>
					<p className='font-mono text-[0.65rem] leading-relaxed text-current/88 sr-only'>{ui.fullCaseStudy}<span aria-hidden>↗</span></p>
				</CardAction>
			</CardHeader>

			{(app.tools || hostnameEl) ? (
				<CardContent className='rounded-md border border-border/40 bg-secondary/75 w-full mt-auto' customPadding='px-4 py-2'>
					<div className='flex flex-col gap-0.5'>
						{app.tools ? <span className='font-mono text-[0.65rem] leading-relaxed line-clamp-1'>{app.tools}</span> : null}
						{hostnameEl}
					</div>
				</CardContent>
			) : null}
		</Card>
	) : (
		<Card as='div' variant='default' className={cardClassBase} id={id} aria-label={cardAria}>
			<CardHeader as='button' type='button' className='flex flex-col gap-2 text-start mb-4 cursor-pointer' headerPadding='p-0' enableActionSlot={false} aria-expanded={isSelected} onClick={onToggle}>
				<div className='grid flex-wrap flex-1 grid has-data-[slot=card-action]:grid-cols-[1fr_auto] mb-0 w-full'>
					<span className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
						{app.status === 'shipped' ? (
							<Badge variant='secondary' size='sm' className=' tracking-[0.06em] uppercase'>{ui.shipped}</Badge>
						) : (
							<Badge variant='outline' size='sm' className=' tracking-[0.06em] uppercase'>{ui[app.status] ?? ui.concept}</Badge>
						)}
						<CardTitle className='font-mono text-xl text-primary w-full text-inherit'>{app.title}</CardTitle>
					</span>
					<CardAction>
						<Button title={ui.fullCaseStudy} as='span' variant='secondary' size='icon' aria-hidden='true' className='shrink-0 size-11' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
							{resolvedIcon}
						</Button>
						<p className='font-mono text-[0.65rem] leading-relaxed text-current/88 sr-only'>{ui.fullCaseStudy}<span aria-hidden>↗</span></p>
					</CardAction>
				</div>
				<CardDescription className='text-[1em] lg:max-w-[90%]'>
					{app.subtitle}
				</CardDescription>
			</CardHeader>
			{(app.tools || hostnameEl) ? (
				<CardContent className='rounded-md border border-border/40 bg-secondary/75 w-full mt-auto' customPadding='px-4 py-2'>
					<div className='flex flex-col gap-0.5'>
						{app.tools ? <span className='font-mono text-[0.65rem] leading-relaxed line-clamp-1'>{app.tools}</span> : null}
						{hostnameEl}
					</div>
				</CardContent>
			) : null}
		</Card>
	);
};
