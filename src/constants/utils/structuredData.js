// ─────────────────────────────────────────────────────────────────────────────
// Portfolio structured data & hash routing utilities
// Generates JSON-LD for SEO: CreativeWork per case, Person, CollectionPage
// ─────────────────────────────────────────────────────────────────────────────

import { person } from '../data/mvpData';

const BASE_URL = person.url;

export const toSlug = (title) =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

export const findCaseByHash = (cases, hash) => {
	if (!hash) return null;
	const slug = hash.replace('#', '');
	for (const [groupName, group] of Object.entries(cases)) {
		for (const app of group.cases) {
			if (toSlug(app.title) === slug) return { groupName, app };
		}
	}
	return null;
};

const buildDescription = (app) => {
	const parts = [];
	if (app.highlight) parts.push(app.highlight);
	if (app.caseStudy?.businessProblem) parts.push(app.caseStudy.businessProblem);
	if (app.caseStudy?.strategicDecision?.question) parts.push(app.caseStudy.strategicDecision.question);
	if (app.caseStudy?.process?.length) {
		app.caseStudy.process.forEach((step) => {
			if (step.title && step.description) parts.push(step.title + ': ' + step.description);
		});
	}
	if (app.caseStudy?.implementation) {
		const impl = app.caseStudy.implementation;
		parts.push(Array.isArray(impl) ? impl.map((i) => i.items?.join('. ') || '').join(' ') : impl);
	}
	if (app.caseStudy?.tradeoffsLearnings) {
		const tl = app.caseStudy.tradeoffsLearnings;
		parts.push(Array.isArray(tl) ? tl.join(' ') : tl);
	}
	return parts.join(' ').replace(/\s+/g, ' ').trim();
};

const buildKeywords = (app) => {
	const keywords = [];
	if (app.tools) app.tools.split(/[·,]/).map((t) => t.trim()).filter(Boolean).forEach((t) => keywords.push(t));
	if (app.role) keywords.push(app.role);
	if (app.results?.length) app.results.slice(0, 3).forEach((r) => keywords.push(r));
	keywords.push('product design', 'UX design', 'frontend development');
	return [...new Set(keywords)].join(', ');
};

const buildCreativeWork = (app, groupName) => {
	const slug = toSlug(app.title);
	const url = BASE_URL + '/#' + slug;
	const work = {
		'@type': 'CreativeWork',
		'@id': url,
		name: app.title,
		alternateName: app.subtitle || undefined,
		description: buildDescription(app),
		url,
		author: { '@type': 'Person', name: person.name, url: person.url, jobTitle: person.jobTitle },
		keywords: buildKeywords(app),
		dateCreated: app.period ? app.period.split('–')[0].trim() : undefined,
		genre: groupName,
		creativeWorkStatus: app.status === 'shipped' ? 'Published' : 'Concept',
	};
	if (app.references?.links?.[0]?.url) work.mainEntityOfPage = app.references.links[0].url;
	const portfolioLinks = [...(app.references?.dribbble || []), ...(app.references?.behance || [])];
	if (portfolioLinks.length) {
		work.associatedMedia = portfolioLinks.map((l) => ({ '@type': 'ImageObject', url: l.url, name: l.label }));
	}
	if (app.results?.length) work.abstract = app.results.join('. ');
	return work;
};

export const generatePortfolioStructuredData = (cases) => {
	const allCases = [];
	Object.entries(cases).forEach(([groupName, group]) => {
		group.cases.forEach((app) => allCases.push(buildCreativeWork(app, groupName)));
	});
	const personSchema = {
		'@type': 'Person',
		'@id': BASE_URL + '/#person',
		name: person.name,
		url: BASE_URL,
		jobTitle: person.jobTitle,
		description: '10+ years turning SaaS products into unified platforms — designing the system, writing the code, protecting the vision as products scale.',
		knowsAbout: ['Product Design', 'UX Design', 'Design Systems', 'Frontend Development', 'React', 'Gatsby', 'JavaScript', 'Accessibility (WCAG)', 'B2B SaaS', 'API Design', 'Brand Identity'],
		sameAs: person.sameAs,
		hasOccupation: { '@type': 'Occupation', name: 'Technical Product Designer', occupationLocation: { '@type': 'City', name: 'Lisbon' } },
		alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Universidade Lusíada de Lisboa', url: 'https://www.ulusiada.pt' }],
		award: 'Bronze Young Lions 2014, Cannes Lions',
	};
	const portfolioSchema = {
		'@type': 'CollectionPage',
		'@id': BASE_URL + '/#portfolio',
		name: 'Maria Varagilal — Portfolio',
		description: 'Design to Production — brand identity, design systems, and frontend development across B2B SaaS and fintech products.',
		url: BASE_URL,
		author: { '@id': BASE_URL + '/#person' },
		hasPart: allCases.map((c) => ({ '@id': c['@id'] })),
	};
	return {
		'@context': 'https://schema.org',
		'@graph': [personSchema, portfolioSchema, ...allCases],
	};
};

export const generateCaseStructuredData = (app, groupName) => ({
	'@context': 'https://schema.org',
	'@graph': [buildCreativeWork(app, groupName)],
});
