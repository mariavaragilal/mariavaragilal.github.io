import React from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../constants/i18n';
import Seo from './seo';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from '../hooks/useTheme';
import useLayoutPage from './hooks/useLayoutPage';
import LayoutHeader from './components/layoutHeader';
import LayoutMain from './components/layoutMain';

const Layout = ({ children, title, description, showWork, className, ...others }) => {
	const { pathname, isWorkPage, isLandingPage, isVisible } = useLayoutPage();
	const wrapperClass = 'flex flex-col font-dm-sans ' + (isLandingPage ? 'gap-0 p-0 bg-max-w-5xl lg:max-w-full m-auto shadow-lg rounded-lg relative w-full bg-secondary text-foreground text-foreground text-foreground' : 'gap-2 bg-secondary p-2 text-foreground');
	return (
		<React.Fragment>
			<I18nextProvider i18n={i18n}>
				<Seo title={title} description={description}/>
				<ThemeProvider>
					<ErrorBoundary>
						<div className={wrapperClass} data-print-root {...others}>
							<LayoutHeader pathname={pathname} isLandingPage={isLandingPage}/>
							<LayoutMain isWorkPage={isWorkPage} isLandingPage={isLandingPage} isVisible={isVisible} showWork={showWork} className={className}>
								{children}
							</LayoutMain>
						</div>
					</ErrorBoundary>
				</ThemeProvider>
			</I18nextProvider>
		</React.Fragment>
	);
};

export default Layout;
