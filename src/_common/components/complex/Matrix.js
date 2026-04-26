/**
 * Matrix — four-quadrant phase-based tag matrix with optional selection and highlighting.
 *
 * @example — Interactive (WorkSection)
 * <Matrix
 *   phases={phases}
 *   items={items}
 *   activeTag='Design to code'
 *   onTagSelect={(tag) => toggle(tag)}
 *   footer='Create → Launch → Test → Refine'
 *   footerRepeat='repeat'
 * />
 *
 * @example — Per-case highlight (reads from JSON)
 * <Matrix variant='case' caseStudy={caseStudy} />
 *
 * Props (default)
 * ───────────────
 * phases          — Array of 4 quadrants. Each: { key, label, subtitle?, tags: string[] }.
 * items           — Tag data. Each: { tag, body?, color? }. Looked up by tag name.
 * activeTag       — Currently selected tag name (interactive mode), or null.
 * onTagSelect     — Called with the tag name on click.
 * highlightedTags — Array of tag names to emphasise. Others render muted.
 * footer          — Optional string below the grid.
 * footerRepeat    — Optional word in italic at the end of footer.
 * centerIcon      — Show center rotation icon. Default true.
 * className       — Additional classes on root.
 * tagClassName    — Additional classes on each tag.
 *
 * Props (variant='case')
 * ──────────────────────
 * caseStudy       — Case object with skillsDemonstrated and skillsByStrength.
 *                   Phases, items, highlightedTags and footer are derived from JSON.
 * className       — Forwarded to root.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, CardFooter } from '../display/Card';

const DEFAULT_DOT_COLOR = 'currentColor';

const QUADRANT_BORDERS = [
	'border-r border-b border-border',
	'border-b border-border',
	'border-r border-border',
	'',
];

const TAG_COLORS = {
	'Design to code': '#D4537E',
	'Design para código': '#D4537E',
	'Tool exploration': '#BA7517',
	'Exploração de ferramentas': '#BA7517',
	'Systems thinking': '#534AB7',
	'Pensamento sistémico': '#534AB7',
	'Design rationale': '#D85A30',
	'Fundamentação do projeto': '#D85A30',
	'Edge cases & resilience': '#1D9E75',
	'Casos extremos e resiliência': '#1D9E75',
	'Proactive & collaborative': '#639922',
	'Proatividade e colaboração': '#639922',
	'Production-informed iteration': '#378ADD',
	'Iteração orientada para a produção': '#378ADD',
};

/* ── Case variant: derive props from caseStudy + JSON ── */
const useCaseProps = (caseStudy) => {
	const { t, i18n } = useTranslation();
	const wk = t('mv.work', { returnObjects: true }) || {};
	const ws = wk.intro || {};
	const strengthsMatrix = ws?.strengths?.matrix || {};
	const genericStrengths = ws?.strengths?.items || [];

	const skills = caseStudy?.skillsDemonstrated || [];
	const byStrength = caseStudy?.skillsByStrength || [];

	if (!skills.length || !strengthsMatrix.phases?.length) return null;

	const byStrengthMap = {};
	byStrength.forEach((s) => { byStrengthMap[s.strength] = s.items; });

	const genericMap = {};
	genericStrengths.forEach((s) => { genericMap[s.tag] = s.body; });

	return {
		phases: strengthsMatrix.phases.map((p) => ({
			key: p.key,
			label: p.label,
			subtitle: p.dimension,
			tags: p.tags,
		})),
		items: skills.map((tag) => ({
			tag,
			body: byStrengthMap[tag] || genericMap[tag] || '',
			color: TAG_COLORS[tag],
		})),
		highlightedTags: skills,
		footer: (strengthsMatrix.loopLabel || '').replace(/\s*(repeat|repetir)\s*/i, '').trim(),
		footerRepeat: i18n.language?.startsWith('pt') ? 'repetir' : 'repeat',
	};
};

/* ── Matrix grid renderer ── */
const MatrixGrid = ({
	phases,
	items,
	activeTag,
	onTagSelect,
	highlightedTags,
	footer,
	footerRepeat,
	centerIcon = true,
	className = '',
	tagClassName = '',
	variant = 'default',
}) => {
	if (!phases?.length) return null;

	const itemMap = {};
	items.forEach((item) => { itemMap[item.tag] = item; });

	const highlightSet = highlightedTags ? new Set(highlightedTags) : null;
	const isInteractive = typeof onTagSelect === 'function';

	return (
		<div className={`flex flex-col ${className}`}>
			<div className='grid grid-cols-2 rounded-t-lg overflow-clip relative border-b border-border'>
				{centerIcon && (
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center'>
						<svg
							width='14'
							height='14'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
							className='text-current/33'
							aria-hidden='true'
						>
							<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10' />
							<path d='M22 12l-3-3m3 3l-3 3' />
						</svg>
					</div>
				)}

				{phases.map((phase, qi) => {
					const phaseHasHighlight = highlightSet
						? phase.tags.some((tag) => highlightSet.has(tag))
						: true;

					return (
						<Card
							variant={variant}
							key={phase.key}
							className={`p-4 lg:p-5 flex flex-col gap-2 rounded-none transition-opacity duration-300 ${QUADRANT_BORDERS[qi] || ''} ${highlightSet && !phaseHasHighlight ? 'opacity-30' : ''}`}
						>
							<CardHeader className='flex items-baseline gap-2 p-0'>
								<span className='text-xs uppercase tracking-[0.04em] text-current/88'>
									{phase.label}
								</span>
								{phase.subtitle && (
									<span className='text-[.675rem] font-semibold tracking-[0.06em] uppercase text-current/66 ms-auto'>
										{phase.subtitle}
									</span>
								)}
							</CardHeader>

							<CardContent className='flex flex-col gap-2 p-0 [&:last-child]:pb-0'>
								{phase.tags.map((tagName) => {
									const item = itemMap[tagName];
									const isActive = tagName === activeTag;
									const isHighlighted = highlightSet ? highlightSet.has(tagName) : true;
									const dotColor = item?.color || DEFAULT_DOT_COLOR;

									const TagEl = isInteractive ? 'button' : 'div';
									const interactiveProps = isInteractive
										? { type: 'button', onClick: () => onTagSelect(tagName), 'aria-pressed': isActive }
										: {};

									return (
										<TagEl
											key={tagName}
											{...interactiveProps}
											className={`
												group flex flex-col gap-0.5 text-left rounded-md
												px-2.5 py-2 -mx-1.5
												transition-all duration-300
												${isInteractive ? 'cursor-pointer' : ''}
												${isActive
													? 'bg-foreground text-background'
													: isHighlighted
														? 'hover:bg-current/[0.04]'
														: 'opacity-25'
												}
												${tagClassName}
											`}
										>
											<span className='flex items-center gap-2'>
												<span
													className='w-[0.375rem] h-[0.375rem] rounded-full shrink-0'
													style={{ backgroundColor: isActive ? 'currentColor' : dotColor }}
													aria-hidden='true'
												/>
												<span
													className={`text-[0.76rem] font-medium leading-snug ${isActive ? 'text-background' : 'text-current'
														}`}
												>
													{tagName}
												</span>
											</span>

											{item?.body && (
												<span
													className={`text-[0.68rem] leading-snug pl-[0.875rem] line-clamp-2 ${isActive ? 'text-background/66' : 'text-current/66'
														}`}
												>
													{item.body}
												</span>
											)}
										</TagEl>
									);
								})}
							</CardContent>
						</Card>
					);
				})}
			</div>

			{footer && (
				<CardFooter className={`p-2 ${variant === 'transparent' ? 'bg-background' : 'bg-secondary/50'} m-2 rounded-lg justify-center`}>
					<p className='text-[0.7rem] text-current/33 text-center tracking-wider'>
						{footer}
						{footerRepeat && (
							<>
								{' '}
								<em className='italic mx-1'>[{footerRepeat}]</em>
							</>
						)}
					</p>
				</CardFooter>
			)}
		</div>
	);
};

/* ── Public API ── */
export const Matrix = ({ variant, caseStudy, ...props }) => {
	const caseProps = useCaseProps(variant === 'case' ? caseStudy : null);

	if (variant === 'case') {
		if (!caseProps) return null;
		return <MatrixGrid {...caseProps} variant={variant} className={props.className} />;
	}

	return <MatrixGrid {...props} variant={variant} />;
};

export default Matrix;