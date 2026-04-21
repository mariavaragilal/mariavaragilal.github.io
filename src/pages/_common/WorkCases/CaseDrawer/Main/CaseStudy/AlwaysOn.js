import { Media } from '../../../../../../_common/components';
import { ChapterBand, EditorialHeading, formatChapterKicker } from '../_common/CaseChapter';
import { CASE_IMAGES } from '../_common/caseImages';
import { RichText } from '../../../../RichText';
import { getProjectKickerStyle } from '../../../../../../constants/utils/colorContrast';

export const isAlwaysOnVisible = (caseStudy) => {
	const block = caseStudy.alwaysOn;
	const body = block?.body;
	const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
	const hasProse = paragraphs.some((p) => p && String(p).trim());
	return Boolean(block && (hasProse || block.title || block.image));
};

export const AlwaysOn = ({ caseStudy, labels, projectColor, sectionNumbers }) => {
	if (!isAlwaysOnVisible(caseStudy)) return null;
	const block = caseStudy.alwaysOn;
	const body = block?.body;
	const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
	return (
		<ChapterBand variant='ink' projectColor={projectColor} className='px-6 sm:px-12 lg:px-16'>
			<EditorialHeading
				eyebrow={formatChapterKicker(block.eyebrow || labels.alwaysOn || 'Always on', sectionNumbers.alwaysOn)}
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
