import React from 'react';
import { useTranslation } from 'react-i18next';
import { srOnly, focusRing } from '../../../constants/utils/a11y';

const CVHeader = () => {
	const { t } = useTranslation();
	return (
		<header className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 border-b border-border'>
			<div className='block w-full'>
				<h1 className='sr-only'>CV</h1>
				<p className='text-7xl/15 text-foreground max-w-xs min-h-[7.5rem] font-mon tracking-tighter font-medium'>{t('cv.name')}</p>
			</div>
			<div className='block mt-auto'>
				<p className='text-[1em] text-foreground mb-0'>{t('location')}</p>
				<p className='font-mon font-medium leading-[1.175em] text-[1.675em] text-foreground mt-0 mb-0 w-full'>{t('cv.title')}</p>
				<a href='https://www.linkedin.com/in/mariavaragilal' target='_blank' rel='noopener noreferrer' className='text-[1em] text-current/66 hover:text-blue-600 dark:hover:text-blue-400 hover:underline'>linkedin.com/in/mariavaragilal</a>
			</div>
			<nav className='p-0 mt-auto' aria-label='External profiles'>
				<h1 className='sr-only'>links</h1>
				<a href='https://dribbble.com/mariavaragilal' target='_blank' rel='noreferrer' className={'flex items-center justify-between border-b border-border py-2 text-sm text-foreground ' + focusRing}>
					<span className='text-[.75em] uppercase tracking-[0.18em] text-current/66'>Dribbble</span>
					<span className='text-[1em] text-current'>dribbble.com/mariavaragilal →</span>
					<span className={srOnly}> (opens in new tab)</span>
				</a>
				<a href='https://codepen.io/mariavaragilal' target='_blank' rel='noreferrer' className={'flex items-center justify-between border-b border-border py-2 text-sm text-foreground ' + focusRing}>
					<span className='text-[.75em] uppercase tracking-[0.18em] text-current/66'>CodePen</span>
					<span className='text-[1em] text-current'>codepen.io/mariavaragilal →</span>
					<span className={srOnly}> (opens in new tab)</span>
				</a>
				<a href='https://be.net/mariavaragilal' target='_blank' rel='noreferrer' className={'flex items-center justify-between border-border pt-2 text-sm text-foreground ' + focusRing}>
					<span className='text-[.75em] uppercase tracking-[0.18em] text-current/66'>Behance</span>
					<span className='text-[1em] text-foreground hover:text-primary hover:underline'>be.net/mariavaragilal →</span>
					<span className={srOnly}> (opens in new tab)</span>
				</a>
			</nav>
		</header>
	);
};

export default CVHeader;
