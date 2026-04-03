// ─────────────────────────────────────────────────────────────────────────────
// Case routing utilities
// ─────────────────────────────────────────────────────────────────────────────

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
	return findCaseBySlug(cases, slug);
};

export const findCaseBySlug = (cases, slug) => {
	if (!slug) return null;
	for (const [groupName, group] of Object.entries(cases)) {
		for (const app of group.cases) {
			const appSlug = app.slug || toSlug(app.title);
			if (appSlug === slug) return { groupName, app };
		}
	}
	return null;
};

export const flattenWorkCasesOrdered = (workCases) => {
	if (!workCases || typeof workCases !== 'object') return [];
	return Object.values(workCases).flatMap((group) => (group && Array.isArray(group.cases) ? group.cases : []));
};

export const buildDescription = (app) => {
	const parts = [];
	if (app.highlight) parts.push(app.highlight);
	if (app.caseStudy?.businessProblem) parts.push(app.caseStudy.businessProblem);
	return parts.join(' ').trim();
};
