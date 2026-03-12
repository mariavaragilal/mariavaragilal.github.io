// ─────────────────────────────────────────────────────────────────────────────
// SEO structured data (derived from person, pillars)
// ─────────────────────────────────────────────────────────────────────────────

import { person, pillars, outcomes, keyMetrics } from './mvpData';

export const personStructuredData = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: person.name,
	jobTitle: person.jobTitle,
	description: person.description,
	url: person.url,
	image: person.image,
	sameAs: person.sameAs,
	address: { '@type': 'PostalAddress', addressLocality: person.address.locality, addressCountry: person.address.country },
	knowsAbout: person.knowsAbout,
	hasOccupation: { '@type': 'Occupation', name: person.jobTitle, description: 'Designs and develops digital products from concept to production', skills: person.skills },
	alumniOf: person.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.name, description: e.description })),
	worksFor: { '@type': 'Organization', name: person.worksFor.name, url: person.worksFor.url, description: person.worksFor.description },
	award: person.awards.map((a) => ({ '@type': 'Award', name: a.name, description: a.description, datePublished: a.date })),
};

export const websiteStructuredData = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: person.name + '—' + person.jobTitle,
	description: 'CV of Maria Varagilal, Technical Product Designer that ships code',
	url: person.url,
	author: { '@type': 'Person', name: person.name },
	inLanguage: ['en', 'pt'],
	copyrightYear: new Date().getFullYear(),
	publisher: { '@type': 'Person', name: person.name },
};

export const mvpPillarsStructuredData = {
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	name: 'MVP Method — Five Operational Pillars',
	description: 'Maria Varagilal Playbook: execution system that operationalises the Manifest (Cohesion, Priority, Boundaries) through five pillars',
	numberOfItems: pillars.length,
	itemListElement: pillars.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title })),
};

export const principlesStructuredData = {
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	name: 'Three Interlocking Principles',
	description: 'Outcomes when the Manifest is operationalised through the MVP Method — Clarity, Confidence, Consistency',
	numberOfItems: outcomes.length,
	itemListElement: outcomes.map((o, i) => ({ '@type': 'ListItem', position: i + 1, name: o.principle, description: o.protects })),
};

export const keyMetricsStructuredData = {
	'@context': 'https://schema.org',
	'@type': 'Dataset',
	name: 'Platform Unification Key Metrics',
	description: 'Outcomes from applying the MVP Method to B2B SaaS platform unification',
	creator: { '@type': 'Person', name: person.name },
	variableMeasured: keyMetrics.map((m) => ({ '@type': 'PropertyValue', name: m.name, value: m.value })),
};
