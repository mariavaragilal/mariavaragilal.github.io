import { useEffect } from 'react';
import { useLocation } from '@reach/router';
import { initWebVitals } from '../../../constants/utils/webVitals';

const useLayoutPage = () => {
	const location = useLocation();
	const pathParts = location.pathname.replace(/\/$/, '').split('/').filter(Boolean);
	const isCaseStudyPage = pathParts.length >= 2 && pathParts[0] === 'work';
	const isLandingPage = location.pathname === '/landing';

	useEffect(() => {
		try {
			initWebVitals();
		} catch (error) {
			console.warn('Web Vitals initialization failed:', error);
		}
	}, []);

	return { pathname: location.pathname, isCaseStudyPage, isLandingPage };
};

export default useLayoutPage;
