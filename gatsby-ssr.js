import React from 'react';

import { GTM_CONTAINER_ID } from './src/constants/googleTagManager';
import { GOOGLE_SITE_VERIFICATION_CONTENT } from './src/constants/googleSiteVerification';

const gtmInlineScript = '(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);})(window,document,\'script\',\'dataLayer\',\'' + GTM_CONTAINER_ID + '\');';

/**
 * Search Console verification meta + GTM (head script + body noscript per Google’s install snippet).
 */
export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
	setHeadComponents([
		<script key='gtm' dangerouslySetInnerHTML={{ __html: gtmInlineScript }}/>,
		<meta key='google-site-verification' name='google-site-verification' content={GOOGLE_SITE_VERIFICATION_CONTENT}/>,
	]);
	setPreBodyComponents([<noscript key='gtm-noscript'><iframe src={'https://www.googletagmanager.com/ns.html?id=' + GTM_CONTAINER_ID} height='0' width='0' style={{ display: 'none', visibility: 'hidden' }} title='Google Tag Manager'/></noscript>]);
};
