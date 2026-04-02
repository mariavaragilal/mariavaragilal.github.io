// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { buildPersonStructuredData, buildWebsiteStructuredData, buildMvpDimensionsStructuredData, buildPrinciplesStructuredData, buildKeyMetricsStructuredData } from '../../constants/data/seoStructuredData';
import { generatePortfolioStructuredData } from '../../constants/utils/structuredData';
import mvEn from '../../constants/i18n/locales/mv.en.json';

const absolutePageUrl = (siteOrigin, pathname) => {
	const p = pathname && pathname !== '/' ? pathname : '/';
	const withSlash = p !== '/' && !p.endsWith('/') ? p + '/' : p;
	return withSlash === '/' ? siteOrigin + '/' : siteOrigin + withSlash;
};

const Seo = ({ title, description, pathname = '/' }) => {
	const { i18n, t } = useTranslation();
	const bundle = i18n.getResourceBundle(i18n.language, 'translation');
	const mv = bundle.mv || mvEn;
	const htmlLang = i18n.language.indexOf('pt') === 0 ? 'pt' : 'en';
	const personStructuredData = buildPersonStructuredData(mv);
	const websiteStructuredData = buildWebsiteStructuredData(mv);
	const mvpDimensionsStructuredData = buildMvpDimensionsStructuredData(mv);
	const principlesStructuredData = buildPrinciplesStructuredData(mv);
	const keyMetricsStructuredData = buildKeyMetricsStructuredData(mv);
	const portfolioJsonLd = generatePortfolioStructuredData(mv.workCases, mv);
	const siteTitle = title !== null ? 'Maria Varagilal: ' + (title || 'CV') : 'Maria Varagilal';
	const siteDescription = description !== null && description !== undefined && description !== '' ? description : t('mv.seo.defaultDescription');
	const metaKeywords = t('mv.seo.defaultKeywords');
	const siteOrigin = 'https://mariavaragilal.github.io';
	const pageUrl = absolutePageUrl(siteOrigin, pathname);
	const criticalCss = 'body { margin: 0; font-family: \'Rubik\', sans-serif; }\n.dark { color-scheme: dark; }\n.bg-slate-100 { background-color: #f1f5f9; }\n.dark .bg-slate-700 { background-color: #334155; }\n.rounded { border-radius: 0.25rem; }';

	return (
		<Helmet>
			<html lang={htmlLang} />
			<meta charset='UTF-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta httpEquiv='Content-Security-Policy' content={'default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; font-src \'self\' https://fonts.gstatic.com https://fonts.googleapis.com; img-src \'self\' data: https:; connect-src \'self\';'} />
			<meta itemProp='name' content={siteTitle} />
			<title>{siteTitle}</title>
			<meta name='description' content={siteDescription} />
			<meta name='keywords' content={metaKeywords} />
			<meta name='author' content='Maria Varagilal' />
			<meta httpEquiv='X-UA-Compatible' content='IE=edge' />

			{/* Open Graph / Facebook */}
			<meta property='og:type' content='website' />
			<meta property='og:url' content={pageUrl} />
			<meta property='og:title' content={siteTitle} />
			<meta property='og:description' content={siteDescription} />
			<meta property='og:image' content={siteOrigin + '/avatar.png'} />

			{/* Twitter */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:url' content={pageUrl} />
			<meta name='twitter:title' content={siteTitle} />
			<meta name='twitter:description' content={siteDescription} />
			<meta name='twitter:image' content={siteOrigin + '/avatar.png'} />

			{/* Critical CSS for above-the-fold content */}
			<style dangerouslySetInnerHTML={{ __html: criticalCss }} />

			{/* Preload critical resources — gatsby-omni-font-loader loads fonts; preload for faster first paint */}
			<link rel='preload' href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap' as='style' onLoad={'this.onload=null;this.rel=' + "'stylesheet'"} />
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
			{/* Same asset as src/assets/images/avatar.png — static/avatar.png copies to site root on build */}
			<link rel='preload' href='/avatar.png' as='image' />

			{/* DNS prefetch for external resources */}
			<link rel='dns-prefetch' href='//fonts.googleapis.com' />
			<link rel='dns-prefetch' href='//fonts.gstatic.com' />
			<link rel='canonical' href={pageUrl} />
			<link rel='sitemap' type='application/xml' href={siteOrigin + '/sitemap.xml'} />

			{/* Structured Data */}
			<script type='application/ld+json'>{JSON.stringify(personStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(websiteStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(mvpDimensionsStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(principlesStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(keyMetricsStructuredData, null, 2)}</script>
			<script type='application/ld+json'>{JSON.stringify(portfolioJsonLd, null, 2)}</script>

		</Helmet>
	);
};

export default Seo;
