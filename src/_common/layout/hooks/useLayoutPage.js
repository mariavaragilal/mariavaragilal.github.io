import { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import { initWebVitals } from '../../../constants/utils/webVitals';

const useLayoutPage = () => {
	const location = useLocation();
	const [isVisible, setIsVisible] = useState(false);
	const isWorkPage = location.pathname.startsWith('/work/');
	const isLandingPage = location.pathname === '/landing';

	useEffect(() => {
		try {
			initWebVitals();
		} catch (error) {
			console.warn('Web Vitals initialization failed:', error);
		}
		if (isWorkPage) {
			const timer = setTimeout(() => setIsVisible(true), 800);
			return () => clearTimeout(timer);
		}
		setIsVisible(true);
	}, [isWorkPage]);

	return { pathname: location.pathname, isWorkPage, isLandingPage, isVisible };
};

export default useLayoutPage;
