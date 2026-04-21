import { Blockquote } from '../../../../../../_common/components';
import { ChapterBand, formatChapterKicker } from '../_common/CaseChapter';
import { DecisionDiagram } from '../_common/CaseDecisions';
import { RichText } from '../../../../RichText';
import { cn } from '../../../../../../constants/utils/cn';
import { getProjectKickerStyle } from '../../../../../../constants/utils/colorContrast';
import { CASE_IMAGES } from '../_common/caseImages';

const resolveLogo = (src) => (src ? (CASE_IMAGES[src] || src) : null);
const SubHeading = ({ children }) => (
	<p className='text-editorial-eyebrow-sm mb-5 text-current/66 tracking-[0.2em]'>{children}</p>
);

const PunchlineBlock = ({ text }) => (
	<Blockquote variant='punchline'>
		<p className='text-lg md:text-xl font-semibold leading-snug text-current tracking-[-0.005em]'>
			<span className='font-mono text-[var(--project-accent,theme(colors.primary))] mr-2' aria-hidden>&ldquo;</span>
			{text}
		</p>
	</Blockquote>
);

const IdentityMarkColumn = ({ logo, marks }) => {
	const logoSrc = resolveLogo(logo?.image?.src);
	const compact = logo?.marksCompact !== false;
	const cols = logo?.marksCols ?? (marks?.length >= 2 ? 2 : 1);
	const colsCls = cols >= 2 ? 'md:grid-cols-2' : '';
	return (
		<div className='flex flex-col gap-4 min-w-0'>
			{logoSrc ? (
				<figure className={cn('rounded-lg bg-secondary/45 flex flex-col items-center justify-center', compact ? 'min-h-[140px] p-8 md:p-10 gap-6' : 'min-h-[220px] p-12 md:p-16 gap-8')}>
					<img src={logoSrc} alt={logo.image.alt || 'Primary mark'} loading='lazy' decoding='async' className='max-w-[75%] h-auto' style={{ maxHeight: '100px' }} />
				</figure>
			) : null}
			{marks?.length > 0 ? (
				<div className={cn('grid gap-4 grid-cols-1', colsCls)}>
					{marks.map((m, i) => (
						<figure key={(m.src || '') + i} className='flex flex-col gap-3 min-w-0'>
							<div
								className={cn('rounded-lg flex items-center justify-center', compact ? 'p-6 md:p-8 min-h-[80px]' : 'p-10 md:p-12 min-h-[140px]')}
								style={{ background: m.bg || 'var(--color-secondary, rgba(0,0,0,0.06))' }}
							>
								<img src={resolveLogo(m.src)} alt={m.alt || m.label || 'Mark variant'} loading='lazy' decoding='async' className='max-w-[65%] h-auto' style={{ maxHeight: compact ? '32px' : '48px' }} />
							</div>
							{m.label ? <figcaption className='font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-current/55'>{m.label}</figcaption> : null}
						</figure>
					))}
				</div>
			) : null}
		</div>
	);
};

const Swatch = ({ hex, name, role }) => {
	const isHex = typeof hex === 'string' && hex.trim().startsWith('#');
	const caption = isHex ? hex : (name || 'Gradient');
	const label = [role || name, caption].filter(Boolean).join(', ');
	return (
		<figure className='flex flex-col gap-2 min-w-0' aria-label={'Color swatch: ' + label}>
			<div aria-hidden='true' className='w-10 h-10 shrink-0 rounded-md border border-border/40' style={{ background: hex }} />
			<figcaption className='flex flex-col gap-0.5 min-w-0'>
				<span className='text-editorial-eyebrow text-current break-all normal-case tracking-[0.1em] font-mono'>{caption}</span>
				<span className='text-editorial-eyebrow-sm text-current/66'>{role || name}</span>
			</figcaption>
		</figure>
	);
};

const TypeSpec = ({ role, family, weights = [], use }) => (
	<div className='rounded-md p-6 bg-secondary/45 min-w-0'>
		{role ? <p className='text-editorial-eyebrow-sm mb-3 text-current/66'>{role}{use ? ' — ' + use : ''}</p> : null}
		<p className='text-[clamp(32px,4vw,52px)] leading-[1] tracking-[-0.02em] text-current mb-4 break-words' style={{ fontFamily: '\'' + family + '\', ui-sans-serif, system-ui' }}>{family}</p>
		<p className='text-[12.5px] leading-relaxed text-current/66 flex flex-wrap items-center gap-x-3 gap-y-1'>
			{weights.map((w, i) => (
				<span key={w} className='inline-flex items-center gap-3 font-mono'>
					{w}
					{i < weights.length - 1 ? <span aria-hidden='true' className='opacity-33'>·</span> : null}
				</span>
			))}
		</p>
	</div>
);

export const isIdentityVisible = (caseStudy) => Boolean(caseStudy.identity);

export const Identity = ({ caseStudy, labels, projectColor, sectionNumbers }) => {
	if (!isIdentityVisible(caseStudy)) return null;
	const identity = caseStudy.identity;
	const eyebrow = formatChapterKicker(identity.eyebrow || labels.identity || 'Identity', sectionNumbers.identity);
	const eyebrowStyle = getProjectKickerStyle(projectColor, false);
	const concept = identity.concept;
	const identityConceptPunch = concept?.punchline || concept?.closing;
	const hasMarkColumn = identity.logo?.image || identity.logo?.marks?.length > 0;
	const identityDiagrams = concept?.diagrams;
	const hasIdentityDiagrams = identityDiagrams?.length > 0;
	const logoGridClass = cn('grid grid-cols-1 gap-10 md:gap-x-16 items-start', hasMarkColumn && '2xl:grid-cols-2');
	return (
		<ChapterBand variant='paper' className='mx-auto w-full'>
			<div className='mb-6 md:mb-8'>
				<p style={eyebrowStyle} className='text-editorial-eyebrow mb-4 md:mb-5 text-current'><span>{eyebrow}</span></p>
				{identity.title ? <RichText as='h2' className='text-editorial-section text-current' text={identity.title} /> : null}
			</div>
			{identity.intro ? <RichText as='p' className='text-base leading-relaxed mb-14 text-current/88 max-w-full' text={identity.intro} /> : null}

			{concept || identity.logo ? (
				<div className='relative mb-14'>
					<SubHeading>{identity.identityConceptSubheading || labels.identityLogo || 'Logo & mark'}</SubHeading>
					<div className={logoGridClass}>
						{concept ? (() => {
							const narrativeKeys = ['premise', 'tension', 'resolution', 'stakes'];
							const hasNarrative = narrativeKeys.some((k) => concept[k]);
							const paras = hasNarrative
								? narrativeKeys.map((k) => concept[k]).filter(Boolean)
								: (Array.isArray(concept.description) ? concept.description : (concept.description ? [concept.description] : []));
							const punch = identityConceptPunch;
							const insertAt = punch && !hasIdentityDiagrams ? Math.max(0, paras.length - 1) : paras.length;
							const points = concept.points || concept.principles;
							return (
								<div className='min-w-0 space-y-5'>
									{paras.slice(0, insertAt).map((p, i) => <RichText key={i} as='p' className='text-base leading-[1.7] text-current/77' text={p} />)}
									{punch && !hasIdentityDiagrams ? <PunchlineBlock text={punch} /> : null}
									{paras.slice(insertAt).map((p, i) => <RichText key={'a' + i} as='p' className='text-base leading-[1.7] text-current/77' text={p} />)}
									{points?.length > 0 && !concept.diagrams?.length ? (
										<ul className='mt-2 space-y-2 text-base leading-relaxed text-current/88 list-disc pl-5 marker:text-current/40'>
											{points.map((pt, i) => (
												<li key={i}>{typeof pt === 'string' ? <RichText text={pt} /> : (<><span className='font-medium'>{pt.label}</span>{pt.description ? ' — ' + pt.description : ''}</>)}</li>
											))}
										</ul>
									) : null}
								</div>
							);
						})() : null}
						{hasMarkColumn ? (
							<div className='min-w-0 order-first 2xl:order-last' >
								<IdentityMarkColumn logo={identity.logo} marks={identity.logo?.marks} />
							</div>
						) : null}
					</div>
					{hasIdentityDiagrams ? (
						<div className='mt-10 md:mt-12 space-y-6'>
							{identityConceptPunch ? <PunchlineBlock text={identityConceptPunch} /> : null}
							<div className='space-y-4'>
								<SubHeading>Structure</SubHeading>
								{identityDiagrams.map((d, i) => <DecisionDiagram key={i} diagram={d} projectColor={projectColor} />)}
							</div>
						</div>
					) : null}
				</div>
			) : null}

			{identity.palette?.length > 0 ? (
				<div className='relative mb-10'>
					<SubHeading>{labels.identityPalette || 'Palette'}</SubHeading>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8'>
						{identity.palette.map((p) => <Swatch key={p.hex + (p.role || '')} {...p} />)}
					</div>
				</div>
			) : null}
			{identity.typography?.length > 0 ? (
				<div className='relative'>
					<SubHeading>{labels.identityTypography || 'Typography'}</SubHeading>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
						{identity.typography.map((tp) => <TypeSpec key={tp.family + (tp.role || '')} {...tp} />)}
					</div>
				</div>
			) : null}
		</ChapterBand>
	);
};
