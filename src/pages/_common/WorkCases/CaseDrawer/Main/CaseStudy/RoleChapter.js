import { ChapterBand, formatChapterKicker } from '../_common/CaseChapter';
import { RichText } from '../../../../RichText';
import { getProjectKickerStyle } from '../../../../../../constants/utils/colorContrast';

export const isRoleVisible = (caseStudy) => {
	const raw = caseStudy.role?.body;
	const paragraphs = Array.isArray(raw) ? raw : raw ? [raw] : [];
	return paragraphs.some((p) => p && String(p).trim());
};

export const RoleChapter = ({ caseStudy, labels, projectColor, sectionNumbers }) => {
	if (!isRoleVisible(caseStudy)) return null;
	const rc = caseStudy.role;
	const raw = rc?.body;
	const paragraphs = Array.isArray(raw) ? raw : raw ? [raw] : [];
	const nonEmpty = paragraphs.filter((p) => p && String(p).trim());
	const eyebrow = formatChapterKicker(rc?.eyebrow || labels.role || 'Role', sectionNumbers.role);
	const eyebrowStyle = getProjectKickerStyle(projectColor, false);
	return (
		<ChapterBand variant='paper' projectColor={projectColor} className={'!space-y-0 !p-0 border-0 bg-transparent rounded-lg mb-6 md:mb-8'}>
			<div className={'rounded-lg bg-transparent min-w-0 w-full border-0 pt-[clamp(5rem,10vw,7rem)] pb-[clamp(5rem,10vw,6rem)] grid grid-cols-1 md:grid-cols-[7fr_4fr] gap-8 md:gap-12 xl:gap-[clamp(5rem,10vw,9rem)] items-center'}>
				<div className='min-w-0 space-y-5'>
					{nonEmpty.map((p, i) => (
						<RichText key={i} as='p' className='text-base leading-relaxed text-current/88' text={p} />
					))}
				</div>
				<div className='min-w-0'>
					<p style={eyebrowStyle} className='text-editorial-eyebrow mb-4 md:mb-5 text-current'><span>{eyebrow}</span></p>
					{rc?.title ? <RichText as='h2' className='text-editorial-section text-current break-words' text={rc.title} /> : null}
				</div>
			</div>
		</ChapterBand>
	);
};
