export const CASE_STUDY_SECTION_ORDER = [
	{ n: '00', key: 'hero', label: 'Hero', source: 'app', optional: false },
	{ n: '01', key: 'context', label: 'Context', optional: false },
	{ n: '02', key: 'role', label: 'Role', optional: false },
	{ n: '03', key: 'identity', label: 'Identity', optional: false },
	{ n: '04', key: 'keyDecisions', label: 'Key decisions', optional: false },
	{ n: '05', key: 'alwaysOn', label: 'Always on', optional: true },
	{ n: '06', key: 'landingPage', label: 'Landing page', optional: true },
	{ n: '07', key: 'inPractice', label: 'In practice', optional: false },
	{ n: '08', key: 'implementation', label: 'Implementation', optional: false },
	{ n: '09', key: 'metrics', label: 'Results & metrics', optional: false },
	{ n: '10', key: 'tradeoffs', label: 'Trade-offs & learnings', optional: false },
	{ n: '11', key: 'quote', label: 'Quote', optional: false },
];

/** Hero defaults only — caseStudy JSON is consumed as authored (no caseStudy normalization). */
export const normalizeCaseApp = (app) => {
	if (!app) return app;
	const skillList = Array.isArray(app.caseStudy?.skillsDemonstrated)
		? app.caseStudy.skillsDemonstrated
		: (Array.isArray(app.skillsDemonstrated) ? app.skillsDemonstrated : []);
	const fromCase = {
		labels: skillList.slice(0, 3),
		dek: app.highlight || app.subtitle || '',
		heading: app.heading || '',
	};
	const normalizedHero = app.hero ? { ...fromCase, ...app.hero } : fromCase;
	return {
		...app,
		hero: normalizedHero,
	};
};
