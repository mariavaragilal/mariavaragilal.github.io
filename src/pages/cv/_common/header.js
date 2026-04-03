import React from 'react';
import { useTranslation } from 'react-i18next';
import { srOnly, focusRing } from '../../../constants/utils/a11y';
import { useSiteMetadata } from '../../../hooks/useSiteMetadata';

const NAV_LINKS = [
	{ key: 'dribbble', label: 'Dribbble' },
	{ key: 'codepen', label: 'CodePen' },
	{ key: 'github', label: 'Github' },
	{ key: 'behance', label: 'Behance' },
];

const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, '');

const CVHeader = () => {
	const { t } = useTranslation();
	const { social } = useSiteMetadata();
	return (
		<header className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 border-b border-border'>
			<div className='block w-full'>
				<h1 className='sr-only'>CV</h1>
				<p className='text-7xl/15 text-foreground max-w-xs min-h-[7.5rem] font-mon tracking-tighter font-medium'>{t('cv.name')}</p>
			</div>
			<div className='block mt-auto'>
				<p className='text-[1em] text-foreground mb-auto'>{t('location')}</p>
				<p className='font-mon font-medium leading-[1.175em] text-[1.675em] text-foreground mt-0 mb-0 w-full max-w-md'>{t('cv.title')}</p>
				<a href={social.linkedin} target='_blank' rel='noopener noreferrer' className='text-[1em] text-current/66 hover:text-blue-600 dark:hover:text-blue-400 hover:underline'>{stripProtocol(social.linkedin)}</a>
			</div>
			<nav className='p-0 mt-auto' aria-label='External profiles'>
				<h1 className='sr-only'>links</h1>
				{NAV_LINKS.map(({ key, label }, i) => (
					<a
						key={key}
						href={social[key]}
						target='_blank'
						rel='noreferrer'
						className={'flex items-center justify-between text-sm text-foreground ' + (i < NAV_LINKS.length - 1 ? 'border-b border-border py-2 ' : 'border-border pt-2 ') + focusRing}
					>
						<span className='text-[.75em] uppercase tracking-[0.18em] text-current/66'>{label}</span>
						<span className='text-[1em] text-current'>{stripProtocol(social[key])} →</span>
						<span className={srOnly}> (opens in new tab)</span>
					</a>
				))}
			</nav>
		</header>
	);
};

export default CVHeader;
