import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../_common/layout';
import { Button } from '../_common/components';

const NotFoundPage = () => {
	const { t } = useTranslation();

	return (
		<Layout>
			<div className='flex flex-col items-center justify-center min-h-[calc(100vh-3.25em)] p-8 text-center'>
				<h1 className='text-6xl font-bold text-foreground mb-4'>404</h1>
				<h2 className='text-2xl text-foreground mb-1'>{t('404.title', 'Page Not Found')}</h2>
				<p className='text-lg font-regular text-current/66 mb-8 max-w-md'>{t('404.description', 'Sorry, the page you are looking for does not exist.')}</p>
				<Button as='a' href='/' variant='default' size='lg'>{t('404.backHome', 'Back to Home')}</Button>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
