import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Card, CardAction, CardDescription, CardContent, CardHeader, CardTitle } from '../../../_common/components';
import { focusRing } from '../../../constants/utils/a11y';
import { navigate } from 'gatsby';

export const CaseCard = ({ app, isSelected, onToggle, href, to, icon, iconChar = '+', iconClassName, as: _as, id, variant = 'default' }) => {
	const { t } = useTranslation();
	const ui = t('mv.caseUi', { returnObjects: true }) || {};
	const [isHovered, setIsHovered] = useState(false);

	const showRotated = isSelected || isHovered;
	const resolvedIcon = typeof icon === 'function' ? icon(showRotated) : (icon !== undefined ? icon : <span className={iconClassName}>{iconChar}</span>);

	const isLink = !!href;
	const isInternalCase = !!to;

	const cardClassBase = 'flex flex-col items-start p-4 w-full text-left rounded-lg transition-colors ' + (isSelected ? 'border-primary/50 bg-card/75 ring-2 ring-primary/15' : 'border-border hover:bg-card/75') + ' ' + focusRing;
	const cardClassLink = cardClassBase + ' cursor-pointer';

	const hostnameEl = app.references?.links?.[0] ? (
		isLink ? (
			<span className='inline-flex items-center gap-1 font-mono text-[0.65rem] text-current/88'>
				{new URL(app.references.links[0].url).hostname.replace('www.', '')}
				<span aria-hidden>↗</span>
			</span>
		) : (
			<a
				href={app.references.links[0].url}
				target='_blank'
				rel='noopener noreferrer'
				className='inline-flex items-center gap-1 font-mono text-[0.65rem] text-current/88 underline-offset-2 hover:underline hover:text-current'
				onClick={isInternalCase ? (e => e.stopPropagation()) : undefined}
			>
				{new URL(app.references.links[0].url).hostname.replace('www.', '')}
				<span aria-hidden>↗</span>
			</a>
		)
	) : null;

	const footer = (app.tools || hostnameEl) ? (
		<CardContent className={`rounded-md ${variant === 'secondary' ? 'border border-border/50 bg-background' : 'border border-border/40 bg-secondary/75'} w-full mt-auto`} customPadding='px-4 py-2'>
			<div className='flex flex-col gap-0.5'>
				{app.tools ? <span className='font-mono text-[0.65rem] leading-relaxed line-clamp-1'>{app.tools}</span> : null}
				{hostnameEl}
			</div>
		</CardContent>
	) : null;

	const hoverHandlers = { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false) };

	if (isInternalCase) {
		return (
			<Card as='div' variant={variant} className={cardClassLink} id={id} onClick={() => navigate(to)}>
				<CardHeader className='flex gap-1' headerPadding='p-0'>
					<div className='flex flex-col space-y-2'>
						<span className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
							{app.status === 'shipped' ? (
								<Badge variant='secondary' size='sm' className='tracking-[0.06em] uppercase'>{ui.shipped}</Badge>
							) : (
								<Badge variant='outline' size='sm' className='tracking-[0.06em] uppercase'>{ui[app.status] ?? ui.concept}</Badge>
							)}
							<CardTitle className='font-mono text-xl text-primary w-full'>{app.title}</CardTitle>
						</span>
						<CardDescription>{app.subtitle}</CardDescription>
					</div>
					<CardAction>
						<Button
							as='a'
							href={to}
							variant='secondary'
							size='icon'
							aria-label={ui.fullCaseStudy + ': ' + app.title}
							className='shrink-0 size-11'
							{...hoverHandlers}
							onClick={e => e.stopPropagation()}
						>
							{resolvedIcon}
						</Button>
						<p className='font-mono text-[0.65rem] leading-relaxed text-current/88 sr-only'>{ui.fullCaseStudy}<span aria-hidden>↗</span></p>
					</CardAction>
				</CardHeader>
				{footer}
			</Card>
		);
	}

	if (isLink) {
		return (
			<Card as='a' href={href} target='_blank' rel='noopener noreferrer' variant='default' className={cardClassLink} id={id}>
				<CardHeader className='flex gap-1' headerPadding='p-0'>
					<div className='flex flex-col space-y-2'>
						<span className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
							{app.status === 'shipped' ? (
								<Badge variant='secondary' size='sm' className='tracking-[0.06em] uppercase'>{ui.shipped}</Badge>
							) : (
								<Badge variant='outline' size='sm' className='tracking-[0.06em] uppercase'>{ui[app.status] ?? ui.concept}</Badge>
							)}
							<CardTitle className='font-mono text-xl text-primary w-full'>{app.title}</CardTitle>
						</span>
						<CardDescription>{app.subtitle}</CardDescription>
					</div>
					<CardAction>
						<Button title={ui.fullCaseStudy} as='span' variant='secondary' size='icon' aria-hidden='true' className='shrink-0 size-11' {...hoverHandlers}>
							{resolvedIcon}
						</Button>
						<p className='font-mono text-[0.65rem] leading-relaxed text-current/88 sr-only'>{ui.fullCaseStudy}<span aria-hidden>↗</span></p>
					</CardAction>
				</CardHeader>
				{footer}
			</Card>
		);
	}

	return (
		<Card as='div' variant='default' className={cardClassBase} id={id} aria-label={app.title + ' — ' + (isSelected ? ui.cardAriaOpen : ui.cardAriaClosed)}>
			<CardHeader as='button' type='button' className='flex flex-col gap-2 text-start mb-4 cursor-pointer' headerPadding='p-0' enableActionSlot={false} aria-expanded={isSelected} onClick={onToggle}>
				<div className='grid flex-wrap flex-1 grid has-data-[slot=card-action]:grid-cols-[1fr_auto] mb-0 w-full'>
					<span className='text-lg font-medium flex flex-wrap items-center gap-2.5'>
						{app.status === 'shipped' ? (
							<Badge variant='secondary' size='sm' className='tracking-[0.06em] uppercase'>{ui.shipped}</Badge>
						) : (
							<Badge variant='outline' size='sm' className='tracking-[0.06em] uppercase'>{ui[app.status] ?? ui.concept}</Badge>
						)}
						<CardTitle className='font-mono text-xl text-primary w-full text-inherit'>{app.title}</CardTitle>
					</span>
					<CardAction>
						<Button title={ui.fullCaseStudy} as='span' variant='secondary' size='icon' aria-hidden='true' className='shrink-0 size-11' {...hoverHandlers}>
							{resolvedIcon}
						</Button>
						<p className='font-mono text-[0.65rem] leading-relaxed text-current/88 sr-only'>{ui.fullCaseStudy}<span aria-hidden>↗</span></p>
					</CardAction>
				</div>
				<CardDescription className='text-[1em] lg:max-w-[90%]'>{app.subtitle}</CardDescription>
				{Array.isArray(app.skillsDemonstrated) && app.skillsDemonstrated.length > 0 ? <p className='font-mono text-[0.65rem] leading-relaxed text-current/44 mt-1'>{app.skillsDemonstrated.join(' · ')}</p> : null}
			</CardHeader>
			{footer}
		</Card>
	);
};
