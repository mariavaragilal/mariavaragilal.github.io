import React from 'react';

import { GOOGLE_SITE_VERIFICATION_CONTENT } from './src/constants/googleSiteVerification';

/**
 * Search Console verification meta tag.
 */
export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<meta key='google-site-verification' name='google-site-verification' content={GOOGLE_SITE_VERIFICATION_CONTENT} />,
	]);
};
