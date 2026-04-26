import React from 'react';
import { useTranslation } from 'react-i18next';

const CVAwardsSection = () => {
	const { t } = useTranslation();
	return (
		<section>
			<h2 className='font-mono font-medium tracking-tighter text-4xl text-foreground mb-3'>{t('nav.awards')}</h2>
			<div className='space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
				<div className='pb-4 lg:border-b border-border'>
					<h3 className='text-[1.25em] text-foreground font-bold'>
						<a href='https://www.canneslions.com/festival' target='_blank' rel='noopener noreferrer' className='text-foreground hover:text-primary hover:underline'>{t('awards.younglions.name')}</a>
					</h3>
					<p className='text-[1em] text-current/66 mt-2'>{t('awards.younglions.award')}</p>
					<p className='text-[1em] text-current/66'>{t('awards.younglions.date')}</p>
				</div>
				<div>
					<h3 className='text-[1.25em] text-foreground font-bold'>
						<a href='https://www.behance.net/mariavaragilal' target='_blank' rel='noopener noreferrer' className='text-foreground hover:text-primary hover:underline'>{t('awards.behance.name')}</a>
					</h3>
					<p className='text-[1em] text-current/66 mt-2'>{t('awards.behance.award')}</p>
					<p className='text-[1em] text-current/66'>{t('awards.behance.date')}</p>
				</div>
			</div>
		</section>
	);
};

export default CVAwardsSection;
