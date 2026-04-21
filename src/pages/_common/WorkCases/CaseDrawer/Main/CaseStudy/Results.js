import { ChapterBand, EditorialHeading, formatChapterKicker } from '../_common/CaseChapter';
import { RichText } from '../../../../RichText';
import { cn } from '../../../../../../constants/utils/cn';
import { getProjectKickerStyle } from '../../../../../../constants/utils/colorContrast';

const toMetricObjects = (raw) => {
	if (raw.length === 0) return [];
	if (typeof raw[0] === 'object') return raw;
	return raw.map((r) => ({ value: '—', label: r }));
};

const METRICS_GRID_GAP = 'gap-x-8 gap-y-12 md:gap-x-14 md:gap-y-14';

// Column count follows item count so 3 metrics use md:grid-cols-3 (not 4), etc.
const metricsGridClass = (n) => {
	if (n <= 1) return cn('grid grid-cols-1', METRICS_GRID_GAP);
	if (n === 2) return cn('grid grid-cols-1 sm:grid-cols-2', METRICS_GRID_GAP);
	if (n === 3) return cn('grid grid-cols-1 md:grid-cols-3', METRICS_GRID_GAP);
	if (n === 4) return cn('grid grid-cols-2 md:grid-cols-4', METRICS_GRID_GAP);
	return cn('grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4', METRICS_GRID_GAP);
};

// Value ink uses var(--project-accent) so it picks the contrast-safe tint
// for the current theme (darkened vs white paper, lightened vs dark paper).
// Border stays raw since the decorative rule is not a text element.
const MetricsRow = ({ metrics, projectColor }) => {
	const valueStyle = projectColor ? { color: 'var(--project-accent)' } : undefined;
	const gridClass = metricsGridClass(metrics.length);
	return (
		<div className={gridClass}>
			{metrics.map((m, i) => (
				<div key={i} className='relative pt-6 md:pt-8' style={projectColor ? { borderTopColor: projectColor } : undefined}>
					<p className='text-editorial-metric font-mono mb-4 md:mb-5' style={valueStyle}>{m.value}</p>
					<RichText as='p' className='text-[0.875rem] leading-relaxed text-current/88' text={m.label} />
				</div>
			))}
		</div>
	);
};

export const isResultsVisible = (caseStudy, outcomes) => {
	const hasMetrics = caseStudy.metrics?.items?.length > 0;
	const hasOutcomes = Array.isArray(outcomes) && outcomes.length > 0;
	return hasMetrics || hasOutcomes;
};

export const Results = ({ caseStudy, outcomes, labels, projectColor, sectionNumbers }) => {
	if (!isResultsVisible(caseStudy, outcomes)) return null;
	const m = caseStudy.metrics || {};
	const hasMetrics = m.items?.length > 0;
	const metrics = toMetricObjects(hasMetrics ? m.items : outcomes);
	return (
		<ChapterBand variant='paper' projectColor={projectColor} className='py-16 lg:py-24'>
			<EditorialHeading
				eyebrow={formatChapterKicker(labels.metrics || 'Results & Metrics', sectionNumbers.metrics)}
				title={m.title}
				eyebrowStyle={getProjectKickerStyle(projectColor, false)}
				className='mb-2 md:mb-4'
			>
				<MetricsRow metrics={metrics} projectColor={projectColor} />
			</EditorialHeading>
		</ChapterBand>
	);
};
