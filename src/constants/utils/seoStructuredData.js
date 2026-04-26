// ─────────────────────────────────────────────────────────────────────────────
// SEO structured data — Person + WebSite only
// All fields come from `site` (gatsby-config.js siteMetadata via useSiteMetadata)
// and `mv` (active i18n bundle). No mvpData imports.
// ─────────────────────────────────────────────────────────────────────────────
import avatarUrl from '../../assets/images/avatar.png';

export const buildPersonStructuredData = (mv, site) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.author,
		jobTitle: mv?.intro?.content?.schemaJobTitle,
		description: mv.seo.defaultDescription,
		url: site.siteUrl,
		image: site.siteUrl + avatarUrl,
		sameAs: Object.values(site.social),
		address: { '@type': 'PostalAddress', addressLocality: site.address.locality, addressCountry: site.address.country },
		knowsAbout: site.knowsAbout,
		hasOccupation: { '@type': 'Occupation', name: mv?.intro?.content?.schemaJobTitle, description: mv.seo.occupationDescription, skills: site.skills },
		alumniOf: site.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.name, description: e.description })),
		worksFor: { '@type': 'Organization', name: site.worksFor.name, url: site.worksFor.url, description: site.worksFor.description },
		award: site.awards.map((a) => ({ '@type': 'Award', name: a.name, description: a.description, datePublished: a.date })),
	};
};

export const buildWebsiteStructuredData = (mv, site) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: site.author + ' — ' + (mv?.intro?.content?.schemaJobTitle || ''),
		description: mv.seo.defaultDescription,
		url: site.siteUrl,
		author: { '@type': 'Person', name: site.author },
		inLanguage: ['en', 'pt'],
		copyrightYear: new Date().getFullYear(),
		publisher: { '@type': 'Person', name: site.author },
	};
};
