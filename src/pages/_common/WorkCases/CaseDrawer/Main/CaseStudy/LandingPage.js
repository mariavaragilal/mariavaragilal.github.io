import { Media } from '../../../../../../_common/components';
import { ChapterBand, EditorialHeading, formatChapterKicker } from '../_common/CaseChapter';
import { CASE_IMAGES } from '../_common/caseImages';
import { RichText } from '../../../../RichText';
import { getProjectKickerStyle } from '../../../../../../constants/utils/colorContrast';

export const isLandingPageVisible = (caseStudy) => {
	const block = caseStudy.landingPage;
	const body = block?.body;
	const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
	const hasProse = paragraphs.some((p) => p && String(p).trim());
	return Boolean(block && (hasProse || block.title || block.image));
};

export const LandingPage = ({ caseStudy, labels, projectColor, sectionNumbers }) => {
	if (!isLandingPageVisible(caseStudy)) return null;
	const block = caseStudy.landingPage;
	const body = block?.body;
	const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
	return (
		<ChapterBand variant='paper' projectColor={projectColor} className='-mb-12 md:-mb-16'>
			<EditorialHeading
				eyebrow={formatChapterKicker(block.eyebrow || labels.landingPage || 'Landing page', sectionNumbers.landingPage)}
				title={block.title}
				eyebrowStyle={getProjectKickerStyle(projectColor, false)}
			>
				{paragraphs.filter((p) => p && String(p).trim()).map((p, i) => (
					<RichText key={i} as='p' className='text-base leading-relaxed text-current/88 mb-4 last:mb-0' text={p} />
				))}
				{block.image ? <Media image={block.image} imageMap={CASE_IMAGES} variant='strip' className='mt-6 md:mt-8 w-full' /> : null}
			</EditorialHeading>
		</ChapterBand>
	);
};
