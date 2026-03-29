// ─────────────────────────────────────────────────────────────────────────────
// SEO structured data (derived from person + active-locale mv bundle from i18n)
// Callers pass `mv` from i18n.getResourceBundle(lng, 'translation').mv
// ─────────────────────────────────────────────────────────────────────────────

import { person } from './mvpData';

export const buildPersonStructuredData = (mv) => ({
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: person.name,
	jobTitle: mv.intro.schemaJobTitle,
	description: mv.seo.defaultDescription,
	url: person.url,
	image: person.image,
	sameAs: person.sameAs,
	address: { '@type': 'PostalAddress', addressLocality: person.address.locality, addressCountry: person.address.country },
	knowsAbout: person.knowsAbout,
	hasOccupation: { '@type': 'Occupation', name: mv.intro.schemaJobTitle, description: mv.seo.occupationDescription, skills: person.skills },
	alumniOf: person.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.name, description: e.description })),
	worksFor: { '@type': 'Organization', name: person.worksFor.name, url: person.worksFor.url, description: person.worksFor.description },
	award: person.awards.map((a) => ({ '@type': 'Award', name: a.name, description: a.description, datePublished: a.date })),
});

export const buildWebsiteStructuredData = (mv) => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: person.name + '—' + mv.intro.schemaJobTitle,
	description: mv.seo.defaultDescription,
	url: person.url,
	author: { '@type': 'Person', name: person.name },
	inLanguage: ['en', 'pt'],
	copyrightYear: new Date().getFullYear(),
	publisher: { '@type': 'Person', name: person.name },
});

export const buildMvpDimensionsStructuredData = (mv) => ({
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	name: mv.method.heading + ' — ' + mv.method.label,
	description: mv.method.subtitle,
	numberOfItems: mv.dimensions.length,
	itemListElement: mv.dimensions.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title })),
});

export const buildPrinciplesStructuredData = (mv) => ({
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	name: mv.methodSection.outcomesHeading,
	description: mv.methodSection.outcomesLead,
	numberOfItems: mv.outcomes.length,
	itemListElement: mv.outcomes.map((o, i) => ({ '@type': 'ListItem', position: i + 1, name: o.principle, description: o.protects })),
});

export const buildKeyMetricsStructuredData = (mv) => ({
	'@context': 'https://schema.org',
	'@type': 'Dataset',
	name: mv.intro.metricsAriaLabel + ' — ' + mv.method.heading,
	description: mv.workSection.p1,
	url: person.url + '/',
	license: person.url + '/license.txt',
	creator: { '@type': 'Person', name: person.name },
	variableMeasured: (mv.intro.keyMetrics || []).map((m) => ({ '@type': 'PropertyValue', name: m.label + ' — ' + m.ctx, value: m.value })),
});
