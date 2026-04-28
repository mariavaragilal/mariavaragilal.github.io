import React from 'react';
import { useTranslation } from 'react-i18next';

const CVEducationSection = () => {
	const { t } = useTranslation();
	return (
		<section>
			<h2 className='font-mono font-medium tracking-tighter text-4xl text-foreground mb-3'>{t('nav.education')}</h2>
			<div className='space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
				<div className='pb-4 lg:border-b border-border'>
					<h3 className='text-[1.25em] text-foreground pr-4 leading-tight font-medium'>
						<a href='https://www.ulusiada.pt' target='_blank' rel='noopener noreferrer' className='text-foreground hover:text-primary hover:underline'>{t('education.university.name')}</a>
					</h3>
					<p className='text-[1em] text-current/66 mt-2'>{t('education.university.degree')}</p>
					<p className='text-[1em] text-current/66'>{t('education.university.period')}</p>
				</div>
				<div>
					<h3 className='text-[1.25em] text-foreground font-medium'>
						<a href='https://flag.pt/academias' target='_blank' rel='noopener noreferrer' className='text-foreground hover:text-primary hover:underline'>{t('education.academy.name')}</a>
					</h3>
					<p className='text-[1em] text-current/66 mt-2'>{t('education.academy.degree')}</p>
					<p className='text-[1em] text-current/66'>{t('education.academy.period')}</p>
				</div>
			</div>
		</section>
	);
};

export default CVEducationSection;
