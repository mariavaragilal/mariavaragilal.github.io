import { ChapterBand, EditorialHeading, formatChapterKicker } from '../_common/CaseChapter';
import { RichText } from '../../../../RichText';
import { cn } from '../../../../../../constants/utils/cn';
import { getProjectKickerStyle, pickForegroundForBg } from '../../../../../../constants/utils/colorContrast';

const splitTradeoffs = (tradeoffs) => (Array.isArray(tradeoffs) ? tradeoffs : tradeoffs.split('\n\n'));

// Trade-offs & Learnings — closing chapter on the project-color band.
// Keeps `ink` variant's inverted foreground tokens, overrides the surface with
// `projectColor` so each case closes on its own brand hue. Falls back to the
// default dark `ink` surface when no projectColor is set. Foreground is picked
// per-color for WCAG AAA (7:1) — white on dark brands, near-black on light
// brands like ConnectLime's lime #C3F41D where white would fail contrast.
// Body opacity is dropped to 100% on project-color bands so /88 blending does
// not drag the effective contrast below AAA (e.g. white on #2b49d7 is 6.91 raw
// but only 5.73 at /88 — holding full opacity keeps the chapter as close to
// AAA as each brand color allows). Theme-independent: the picked color is
// measured against the fixed brand hex, so it reads the same in light/dark.
// Body is a two-column grid of paragraphs so dense text stays scannable.
export const isTradeoffsVisible = (caseStudy) => {
	const raw = caseStudy.tradeoffs?.items;
	return Array.isArray(raw) ? raw.length > 0 : !!raw;
};

export const Tradeoffs = ({ caseStudy, labels, projectColor, sectionNumbers }) => {
	if (!isTradeoffsVisible(caseStudy)) return null;
	const t = caseStudy.tradeoffs || {};
	const raw = t.items;
	const fg = projectColor ? pickForegroundForBg(projectColor, 7) : undefined;
	const bandStyle = projectColor ? { backgroundColor: projectColor, color: fg } : undefined;
	const onBrand = !!projectColor;
	const paraClass = cn('text-[15px] leading-relaxed', onBrand ? 'text-current' : 'text-current/88');
	return (
		<ChapterBand variant='ink' projectColor={projectColor} style={bandStyle} className='px-6 sm:px-12 lg:px-16'>
			<EditorialHeading
				eyebrow={formatChapterKicker(t.heading || labels.tradeoffsDefault || 'Trade-offs & Learnings', sectionNumbers.tradeoffs)}
				title={t.title}
				onInk={!onBrand}
				eyebrowStyle={getProjectKickerStyle(projectColor, true)}
			>
				{(() => {
					const paras = splitTradeoffs(raw);
					const gridCols = paras.length === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2';
					return (
						<div className={cn('grid grid-cols-1 gap-6 md:gap-x-12', gridCols)}>
							{paras.map((para, i) => <RichText key={i} as='p' className={paraClass} text={para} />)}
						</div>
					);
				})()}
			</EditorialHeading>
		</ChapterBand>
	);
};
