import React from 'react';
import { useTranslation } from 'react-i18next';
import { FORMAT_DURATION } from '../../../../constants/utils';
import { Separator } from '../../../../_common/components';

const CVExperienceSection = () => {
	const { t } = useTranslation();
	const renderDescription = (key) => {
		const items = t(key, { returnObjects: true });
		if (!Array.isArray(items)) return null;
		return items.map((item, index) => <li key={index}>- {item}</li>);
	};
	return (
		<section>
			<h2 className='font-[Rubik] tracking-tighter text-4xl text-foreground font-bold mb-3'>{t('nav.experience')}</h2>
			<div className='space-y-12'>
				<div className='pb-12'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-6'>
						<div className='block'>
							<h3 className='text-[1.25em] text-foreground font-bold'>
								<a href='https://www.securibox.eu' target='_blank' rel='noopener noreferrer' className='text-foreground hover:text-primary hover:underline'>{t('experience.securibox.company')}</a>
							</h3>
							<p className='text-[1em] text-current/66'>{t('experience.securibox.location')}</p>
							<p className='text-[1em] text-current/66 mt-2'>{t('experience.securibox.period')}</p>
							<p className='text-[.875em] text-current/66'>{FORMAT_DURATION('2015-09-01')}</p>
						</div>
						<div className='block'>
							<h4 className='text-[1.125em] font-bold text-foreground mb-2'>{t('experience.securibox.position')}</h4>
							<ul className='text-[1em] text-current/66 space-y-1'>{renderDescription('experience.securibox.description')}</ul>
						</div>
					</div>
				</div>
				<Separator/>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 pb-12'>
					<div>
						<h3 className='text-[1.25em] text-foreground font-bold'>
							<a href='https://www.youngnetworkgroup.com/' target='_blank' rel='noopener noreferrer' className='text-foreground hover:text-primary hover:underline'>{t('experience.youngnetwork.company')}</a>
						</h3>
						<p className='text-[1em] text-current/66'>{t('experience.youngnetwork.location')}</p>
						<p className='text-[1em] text-current/66 mt-2'>{t('experience.youngnetwork.period')}</p>
						<p className='text-[.875em] text-current/66'>{FORMAT_DURATION('2013-01-01', '2015-09-01')}</p>
					</div>
					<div>
						<h4 className='text-[1.125em] font-bold text-foreground mb-2'>{t('experience.youngnetwork.position')}</h4>
						<ul className='text-[1em] text-current/66 space-y-1'>{renderDescription('experience.youngnetwork.description')}</ul>
					</div>
				</div>
				<Separator/>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 pb-12'>
					<div>
						<h3 className='text-[1.25em] text-foreground font-bold'>
							<a href='https://www.infoportugal.pt' target='_blank' rel='noopener noreferrer' className='text-foreground hover:text-primary hover:underline'>{t('experience.infoportugal.company')}</a>
						</h3>
						<p className='text-[1em] text-current/66'>{t('experience.infoportugal.location')}</p>
						<p className='text-[1em] text-current/66 mt-2'>{t('experience.infoportugal.period')}</p>
						<p className='text-[.875em] text-current/66'>{FORMAT_DURATION('2012-09-01', '2013-01-01')}</p>
					</div>
					<div>
						<h4 className='text-[1.125em] font-bold text-foreground mb-2'>{t('experience.infoportugal.position')}</h4>
						<ul className='text-[1em] text-current/66 space-y-1'>{renderDescription('experience.infoportugal.description')}</ul>
					</div>
				</div>
				<Separator/>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<h3 className='text-[1.25em] text-foreground font-bold'>{t('experience.cofina.company')}</h3>
						<p className='text-[1em] text-current/66'>{t('experience.cofina.location')}</p>
						<p className='text-[1em] text-current/66 mt-2'>{t('experience.cofina.period')}</p>
						<p className='text-[.875em] text-current/66'>{FORMAT_DURATION('2012-07-01', '2012-08-01')}</p>
					</div>
					<div>
						<h4 className='text-[1.125em] font-bold text-foreground mb-2'>{t('experience.cofina.position')}</h4>
						<ul className='text-[1em] text-current/66 space-y-1'>{renderDescription('experience.cofina.description')}</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CVExperienceSection;
