import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components';

const Languages = () => {
	const { i18n } = useTranslation();
	return (
		<div className='flex rounded-t-lg lg:rounded-none gap-1 sm:gap-2 align-center justify-end'>
			<Button variant={i18n.language === 'en' ? 'default' : 'secondary'} size='sm' onClick={() => i18n.changeLanguage('en')} className='px-3 py-1 text-[.75em] rounded-xl h-auto'>EN</Button>
			<Button variant={i18n.language === 'pt' ? 'default' : 'secondary'} size='sm' onClick={() => i18n.changeLanguage('pt')} className='px-3 py-1 text-[.75em] rounded-xl h-auto'>PT</Button>
		</div>
	);
};

export default Languages;
