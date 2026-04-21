import { Fragment } from 'react';
import { Blockquote, Separator, Media } from '../../../../../../_common/components';
import { CASE_IMAGES } from './caseImages';
import { RichText } from '../../../../RichText';
import { cn } from '../../../../../../constants/utils/cn';
import { formatTwoDigit } from '../../../../../../constants/utils/formatNumberString';

const DecisionDescription = ({ text }) => {
	if (text == null || text === '') return null;
	const paras = (Array.isArray(text) ? text : [text]).filter((p) => p != null && String(p).trim() !== '');
	if (!paras.length) return null;
	return (
		<div className='space-y-3'>
			{paras.map((p, i) => <RichText key={i} as='p' className='text-base leading-relaxed text-current/88' text={p} />)}
		</div>
	);
};

const DecisionDensityStats = ({ stats }) => {
	if (!Array.isArray(stats) || !stats.length) return null;
	return (
		<div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4'>
			{stats.map((s, i) => (
				<div key={i} className='rounded-md border border-border/60 bg-secondary/35 px-4 py-3 min-w-0'>
					<p className='font-mono text-2xl tracking-tight text-current'>
						{s.value}{s.unit ? <span className='text-base text-current/55 ml-1'>{s.unit}</span> : null}
					</p>
					<p className='text-xs leading-relaxed text-current/70 mt-1'>{s.label}</p>
				</div>
			))}
		</div>
	);
};

const DiagramCaption = ({ text, dotted }) =>
	(text ? <p className={cn('text-xs font-mono text-current/55 leading-relaxed', dotted ? 'uppercase tracking-[0.12em] pt-4 mt-4 border-t border-dotted border-current/20' : 'mt-4')}>{text}</p> : null);

const DiagramTrackTitle = ({ title, compact }) =>
	(title ? (
		<>
			<p className={cn('text-[0.6875rem] font-mono text-current/50 uppercase tracking-[0.14em]', compact ? 'mb-2' : 'mb-3')}>{title}</p>
			<div className={cn('h-px bg-border/60', compact ? 'mb-2' : 'mb-4')} aria-hidden />
		</>
	) : null);

const PathDiagram = ({ diagram: d, projectColor }) => {
	const items = Array.isArray(d.items) ? d.items : [];
	const keyStyle = projectColor ? { color: projectColor } : undefined;
	const footPaths = <DiagramCaption text={d.caption} dotted />;
	const gridCols = items.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3';
	return (
		<div className='rounded-lg border border-border/50 bg-secondary/30 p-4 md:p-5'>
			<DiagramTrackTitle title={d.title} />
			<ul className={cn('grid grid-cols-1 gap-3 md:gap-4 list-none p-0 m-0', gridCols)}>
				{items.map((it, j) => (
					<li key={j} className='rounded-md border border-border/55 bg-background/85 px-4 py-3.5 min-w-0 flex flex-col gap-2'>
						<span className='font-mono text-sm tabular-nums text-current/45' style={keyStyle}>{it.key != null && it.key !== '' ? it.key : '\u00a0'}</span>
						<div className='min-w-0 space-y-1.5'>
							<p className='text-[15px] md:text-base font-semibold text-current leading-snug tracking-tight'>{it.label}</p>
							{it.detail ? <p className='text-[0.8125rem] leading-relaxed text-current/65'>{it.detail}</p> : null}
							{it.note ? <p className='text-xs font-mono text-current/50 leading-relaxed mt-0.5'>{it.note}</p> : null}
						</div>
					</li>
				))}
			</ul>
			{footPaths}
		</div>
	);
};

const DecisionDiagram = ({ diagram, projectColor }) => {
	const d = diagram;
	const items = Array.isArray(d.items) ? d.items : [];
	const foot = <DiagramCaption text={d.caption} />;

	switch (d.kind) {
	case 'paths':
		return <PathDiagram diagram={d} projectColor={projectColor} />;
	case 'columns':
		return <PathDiagram diagram={d} projectColor={projectColor} />;
	case 'chips':
		return (
			<div className='rounded-lg border border-border/50 bg-secondary/30 p-4 md:p-5'>
				<DiagramTrackTitle title={d.title} />
				<div className='flex flex-wrap gap-2'>
					{items.map((it, j) => {
						const active = !!it.active;
						return (
							<span
								key={j}
								className={cn(
									'inline-flex items-center rounded-full border font-mono font-medium uppercase tracking-[0.1em] text-[0.6875rem]',
									active
										? 'gap-2 border-foreground bg-foreground pl-2.5 pr-3 py-1.5 text-white'
										: 'border-border/65 bg-background/90 px-3 py-1.5 text-current/72',
								)}
							>
								{active ? <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-white' aria-hidden /> : null}
								{it.label}
							</span>
						);
					})}
				</div>
				{foot}
			</div>
		);
	case 'swatches': {
		const footSwatches = <DiagramCaption text={d.caption} dotted />;
		return (
			<div className='rounded-lg border border-border/50 bg-secondary/30 p-3 md:p-4'>
				<DiagramTrackTitle title={d.title} compact />
				<ul className='list-none p-0 m-0 divide-y divide-border/25'>
					{items.map((it, j) => (
						<li key={j} className='grid grid-cols-1 gap-2 py-2 min-w-0 sm:grid-cols-[minmax(0,8.75rem)_1fr] sm:items-center sm:gap-x-5 sm:py-2'>
							<div className='flex items-center gap-2 min-w-0'>
								{it.color ? <div className='h-6 w-6 shrink-0 rounded border border-border/45' style={{ background: it.color }} aria-hidden /> : <span className='h-6 w-6 shrink-0 block' aria-hidden />}
								<p className='min-w-0 font-mono text-[10px] sm:text-[0.6875rem] font-semibold uppercase tracking-[0.08em] leading-tight text-current'>{it.label}</p>
							</div>
							<p className='min-w-0 text-[12px] leading-snug text-current/70 sm:border-l sm:border-border/35 sm:pl-5'>{it.detail}</p>
						</li>
					))}
				</ul>
				{footSwatches}
			</div>
		);
	}
	case 'tabs': {
		const trackLabel = typeof d.title === 'string' && d.title.trim() ? d.title.trim() : 'Options';
		return (
			<div className='rounded-lg border border-border/50 bg-secondary/30 p-4 md:p-5'>
				<DiagramTrackTitle title={d.title} />
				<div
					role='tablist'
					aria-label={trackLabel}
					className='flex w-full max-w-xl rounded-full border border-border/55 bg-secondary/45 p-1 gap-1'
				>
					{items.map((it, j) => {
						const active = !!it.active;
						const activeStyle = active && projectColor ? { backgroundColor: projectColor, color: '#fff' } : undefined;
						return (
							<span
								key={j}
								role='tab'
								aria-selected={active}
								className={cn(
									'flex-1 min-w-0 flex items-center justify-center rounded-full py-2 px-2 sm:px-3 text-[0.6875rem] sm:text-xs font-mono font-medium uppercase tracking-[0.1em] transition-colors whitespace-nowrap',
									active
										? (projectColor ? 'shadow-sm' : 'bg-primary text-primary-foreground')
										: 'text-current/60 hover:text-current/75',
								)}
								style={activeStyle}
							>
								{it.label}
							</span>
						);
					})}
				</div>
				{foot}
			</div>
		);
	}
	default:
		return null;
	}
};

const DecisionDiagrams = ({ diagrams, projectColor }) => {
	if (!Array.isArray(diagrams) || !diagrams.length) return null;
	return (
		<div className='mt-6 space-y-8'>
			{diagrams.map((d, i) => <DecisionDiagram key={i} diagram={d} projectColor={projectColor} />)}
		</div>
	);
};

/** One-line pointer to the primitive name; no second copy of summary/specs (those live in the index or prose). */
const DecisionSystemRef = ({ system, labels, projectColor }) => {
	if (!system || !system.name) return null;
	const prefix = labels.systemRefPrefix || 'Primitive';
	const nameStyle = projectColor ? { color: 'var(--project-accent)' } : undefined;
	return (
		<p className='text-[0.8125rem] sm:text-[0.875rem] font-mono font-medium leading-snug mt-2 mb-4 tracking-tight'>
			<span className='text-current/72'>{prefix}</span>
			<span className='text-current/45'> · </span>
			<span className={projectColor ? 'text-current' : 'text-current/92'} style={nameStyle}>{system.name}</span>
		</p>
	);
};

const DecisionRow = ({ item, index = 0, projectColor, labels }) => {
	const taglineStyle = projectColor ? { color: 'var(--project-accent)' } : undefined;
	return (
		<div className='grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-4 md:gap-10 items-start'>
			<div className='min-w-0'>
				<div className='text-editorial-decision text-current font-mono'>
					{item.phase || formatTwoDigit(index + 1)}
				</div>
				{(item.label || item.strength) ? (
					<div className='text-editorial-eyebrow-sm mt-2 text-current/66'>{item.label || item.strength}</div>
				) : null}
			</div>
			<div className='min-w-0 pt-1'>
				{item.tagline ? (
					<RichText as='p' className={cn('text-editorial-eyebrow mb-3', !projectColor && 'text-current/88')} style={taglineStyle} text={item.tagline} />
				) : null}
				{item.title ? (
					<RichText as='h3' className='text-editorial-h3 mb-3 text-current' text={item.title} />
				) : null}
				{item.description ? <DecisionDescription text={item.description} /> : null}
				{item.system ? <DecisionSystemRef system={item.system} labels={labels} projectColor={projectColor} /> : null}
				{item.densityStats ? <DecisionDensityStats stats={item.densityStats} /> : null}
				{(item.image || item.mobileImage || item.imageMobile) ? (
					<div className='flex flex-col md:flex-row items-start gap-4 mt-4'>
						{item.image ? (
							<Media image={item.image} imageMap={CASE_IMAGES} variant='annotated' className='w-full min-w-0 my-0' />
						) : null}
						{(item.mobileImage || item.imageMobile) ? (
							<Media image={item.mobileImage || item.imageMobile} imageMap={CASE_IMAGES} variant='mobile' className='w-full md:w-[min(7rem,28vw)] md:w-28 shrink-0 my-0' />
						) : null}
					</div>
				) : null}
				{item.diagrams ? <DecisionDiagrams diagrams={item.diagrams} projectColor={projectColor} /> : null}
				{item.pullquote?.text ? (
					<Blockquote variant='punchline' className='mt-6'>
						<RichText as='p' className='text-lg leading-snug text-current font-medium' text={item.pullquote.text} />
						{item.pullquote.attribution ? (
							<cite className='not-italic block text-editorial-eyebrow-sm text-current/55 tracking-wide'>{item.pullquote.attribution}</cite>
						) : null}
					</Blockquote>
				) : null}
			</div>
		</div>
	);
};

export { DecisionDiagram };

export const DecisionList = ({ items, projectColor, labels = {} }) => {
	if (!items?.length) return null;
	return (
		<div>
			{items.map((item, i) => (
				<Fragment key={'decision-row-' + i}>
					<DecisionRow item={item} index={i} projectColor={projectColor} labels={labels} />
					{i < items.length - 1 ? <Separator orientation='horizontal' className='my-10' /> : null}
				</Fragment>
			))}
		</div>
	);
};
