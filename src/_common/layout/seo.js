// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Helmet } from 'react-helmet';
import { personStructuredData, websiteStructuredData, mvpPillarsStructuredData, principlesStructuredData, keyMetricsStructuredData } from '../../constants/data/seoStructuredData';
import { generatePortfolioStructuredData } from '../../constants/utils/structuredData';
import { workCases } from '../../constants/data/cases';

const Seo = ({ title, description }) => {
	const portfolioJsonLd = generatePortfolioStructuredData(workCases);
	const siteTitle = title !== null ? 'Maria Varagilal: ' + (title || 'CV') : 'Maria Varagilal';
	const siteDescription = description || 'Principal-level Product Designer who ships code. 10+ years unifying fragmented SaaS platforms. UI/UX · React · Redux · Design Systems';
	const siteUrl = 'https://mariavaragilal.github.io';
	const criticalCss = 'body { margin: 0; font-family: \'Rubik\', sans-serif; }\n.dark { color-scheme: dark; }\n.bg-slate-100 { background-color: #f1f5f9; }\n.dark .bg-slate-700 { background-color: #334155; }\n.rounded { border-radius: 0.25rem; }';

	return (
		<Helmet>
			<html lang='en' />
			<meta charset='UTF-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta httpEquiv='Content-Security-Policy' content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self';" />
			<meta itemProp='name' content={siteTitle} />
			<title>{siteTitle}</title>
			<meta name='description' content={siteDescription} />
			<meta name='keywords' content='Maria Varagilal, Principal Product Designer, Frontend Dev, UI, UX, React, Redux, Design Systems, B2B SaaS' />
			<meta name='author' content='Maria Varagilal' />
			<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
			<meta name='google-site-verification' content='r7xo1KhMjSdlYA2KULzXVzTERDUgkiiLQlit_u_2MCk'/>

			{/* Open Graph / Facebook */}
			<meta property='og:type' content='website' />
			<meta property='og:url' content={siteUrl} />
			<meta property='og:title' content={siteTitle} />
			<meta property='og:description' content={siteDescription} />
			<meta property='og:image' content={siteUrl + '/src/assets/images/avatar.png'} />

			{/* Twitter */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:url' content={siteUrl} />
			<meta name='twitter:title' content={siteTitle} />
			<meta name='twitter:description' content={siteDescription} />
			<meta name='twitter:image' content={siteUrl + '/src/assets/images/avatar.png'} />

			{/* Favicon — Gatsby manifest copies avatar to public */}
			<link rel='icon' type='image/png' href='/src/assets/images/avatar.png' />
			<link rel='apple-touch-icon' href='/src/assets/images/avatar.png' />

			{/* Critical CSS for above-the-fold content */}
			<style dangerouslySetInnerHTML={{ __html: criticalCss }} />

			{/* Preload critical resources — gatsby-omni-font-loader loads fonts; preload for faster first paint */}
			<link rel='preload' href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap' as='style' onLoad={'this.onload=null;this.rel=' + "'stylesheet'"} />
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
			<link rel='preload' href='/src/assets/images/avatar.png' as='image' />

			{/* DNS prefetch for external resources */}
			<link rel='dns-prefetch' href='//fonts.googleapis.com' />
			<link rel='dns-prefetch' href='//fonts.gstatic.com' />

			{/* Structured Data */}
			<script type='application/ld+json'>{JSON.stringify(personStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(websiteStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(mvpPillarsStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(principlesStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(keyMetricsStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(portfolioJsonLd, null, 2)}</script>

			{/* Analytics removed for better privacy and performance */}
		</Helmet>
	);
};

export default Seo;
