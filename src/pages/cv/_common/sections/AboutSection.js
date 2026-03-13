import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../../../../_common/components';

const CVAboutSection = () => {
	const { t } = useTranslation();
	return (
		<section>
			<h2 className='font-mon font-medium tracking-tighter text-4xl text-foreground mb-3'>{t('nav.about')}</h2>
			<p className='text-[1em] mb-4 text-foreground'>{t('cv.summary')}</p>
			<blockquote className='text-[1em] mb-4 text-foreground font-medium'>{t('about.quote')}</blockquote>
			<p className='text-[1em] text-current/66 leading-relaxed mb-2'>{t('about.description1')}</p>
			<p className='text-[1em] text-current/66 leading-relaxed mb-4'>{t('about.description2')}</p>
			<div className='flex flex-wrap gap-2'>
				<Badge variant='secondary'>{t('about.skills.productDesign')}</Badge>
				<Badge variant='secondary'>{t('about.skills.userInterface')}</Badge>
				<Badge variant='secondary'>{t('about.skills.userExperience')}</Badge>
				<Badge variant='secondary'>{t('about.skills.react')}</Badge>
				<Badge variant='secondary'>{t('about.skills.redux')}</Badge>
			</div>
		</section>
	);
};

export default CVAboutSection;
