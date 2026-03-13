import React from 'react';
import { useTranslation } from 'react-i18next';

const Languages = () => {
	const { i18n } = useTranslation();
	return (
		<div className='flex rounded-t-lg lg:rounded-none gap-1 sm:gap-2 align-center justify-end'>
			<button onClick={() => i18n.changeLanguage('en')} className={'px-3 py-1 text-[.75em] rounded-xl ' + (i18n.language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-accent')}>EN</button>
			<button onClick={() => i18n.changeLanguage('pt')} className={'px-3 py-1 text-[.75em] rounded-xl ' + (i18n.language === 'pt' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-accent')}>PT</button>
		</div>
	);
};

export default Languages;
