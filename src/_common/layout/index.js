import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../constants/i18n';
import Seo from './seo';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from '../../hooks/useTheme';
import useLayoutPage from '../../hooks/useLayoutPage';
import LayoutHeader from './components/layoutHeader';
import LayoutMain from './components/layoutMain';

const Layout = ({ children, title, description, showWork, className, ...others }) => {
	const { pathname, isCaseStudyPage, isLandingPage } = useLayoutPage();

	useEffect(() => {
		if (!isCaseStudyPage) return;
		const html = document.documentElement;
		const body = document.body;
		const prevHtml = html.style.overflow;
		const prevBody = body.style.overflow;
		html.style.overflow = 'hidden';
		body.style.overflow = 'hidden';
		return () => {
			html.style.overflow = prevHtml;
			body.style.overflow = prevBody;
		};
	}, [isCaseStudyPage]);

	const wrapperClass = 'flex flex-col min-w-0 font-dm-sans gap-2 bg-secondary p-2 text-foreground ' + (isCaseStudyPage ? 'h-dvh max-h-dvh overflow-hidden min-h-0' : 'min-h-dvh');
	return (
		<React.Fragment>
			<I18nextProvider i18n={i18n}>
				<Seo title={title} description={description} pathname={pathname} />
				<ThemeProvider>
					<ErrorBoundary>
						<div className={wrapperClass} data-print-root {...others}>
							<LayoutHeader pathname={pathname} isLandingPage={isLandingPage} />
							<LayoutMain isCaseStudyPage={isCaseStudyPage} isLandingPage={isLandingPage} showWork={showWork} className={className}>
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
