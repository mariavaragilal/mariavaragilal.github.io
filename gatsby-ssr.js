import React from 'react';

import { GOOGLE_SITE_VERIFICATION_CONTENT } from './src/constants/googleSiteVerification';

/**
 * Injects verification meta directly into static HTML <head> during SSR.
 * Ensures Google’s crawler sees the tag in the initial response (per Search Console HTML tag requirements).
 * @see https://support.google.com/webmasters/answer/9008080#meta_tag_verification
 */
export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<meta key='google-site-verification' name='google-site-verification' content={GOOGLE_SITE_VERIFICATION_CONTENT}/>,
	]);
};
