// ─────────────────────────────────────────────────────────────────────────────
// Person & identity
// ─────────────────────────────────────────────────────────────────────────────

// All person/identity SEO data lives in gatsby-config.js siteMetadata — access via useSiteMetadata().
// name, url, image, sameAs live in gatsby-config.js siteMetadata — access via useSiteMetadata()
export const person = {
	name: 'Maria Varagilal',
	jobTitle: 'Senior Technical Product Designer · Design Engineer',
	description: 'Frontend Designer. Coherent multi-product experiences from concept to production — product strategy, UI/UX, and the Maria Varagilal Playbook Method.',
	address: { locality: 'Lisbon', country: 'Portugal' },
	knowsAbout: ['User Experience Design', 'User Interface Design', 'Product Design', 'React', 'Redux', 'JavaScript (ES6+)', 'Frontend Developer', 'AI-accelerated workflows', 'Prompt engineering'],
	skills: ['UX Design', 'UI Design', 'React', 'Redux', 'JavaScript (ES6+)', 'Gatsby'],
	education: [
		{ name: 'Universidade Lusíada de Lisboa', description: 'Bachelor\'s Degree in Design' },
		{ name: 'Academia Flag', description: 'Specialization in Communication Design' },
	],
	worksFor: { name: 'Securibox', url: 'https://www.securibox.eu', description: 'Lead Technical Product Designer & Frontend Developer' },
	awards: [
		{ name: 'Bronze cyber', description: 'Young Lions Portugal', date: '2014-05-01' },
		{ name: 'Web Design Served', description: 'Behance', date: '2013-07-01' },
	],
};
// Landing copy (dimensions, commitments, outcomes, evolution, work cases; intro.keyMetrics in mv.*.json)
// lives in `mv.en.json` / `mv.pt.json` (merged in `en.js` / `pt.js`). Each dimension’s
// `philosophy.lens` there is a short kicker aligned with this file’s three pillars below.

// ─────────────────────────────────────────────────────────────────────────────
// Philosophy — Maria Varagilal Playbook Method (three commitments: cohesion, priority, boundaries)
//
// Markup convention: {{bold:text}} marks inline emphasis.
// Render helper: str.split(/(\{\{bold:.*?\}\})/g) then match {{bold:(.+)}}
// to wrap in <strong> — keeps data free of JSX.
// ─────────────────────────────────────────────────────────────────────────────

export const method = [
	{
		num: '01',
		title: 'Cohesion Before Creation',
		summary: 'Map reality before making decisions. Understand the problem before shaping the solution.',
		content: [
			'Before any line is drawn or code is written, the most important work is seeing the problem clearly — not aesthetics or features first. This means disciplined observation that eliminates illusion and reveals reality. Mapping every touchpoint creates the true picture: who the user actually is, what they are trying to achieve, and where the current experience is quietly breaking down.',
			'Clarity at this stage is the highest-leverage act in the entire process. This is where the vision either ignites — or fades.',
		],
		checkpoint: 'If the problem isn\'t clear, nothing built on top of it will be.',
		practice: 'A team is tasked with improving onboarding conversion. The instinct is to redesign the sign-up screen. The audit reveals the real drop-off happens two steps later — users land on an empty dashboard with no guidance. The sign-up screen was never the problem. Without the audit, the team ships a polished solution to the wrong question.',
		evolution: 'Each cycle deepens understanding. After launch, real user data feeds the next audit. What looked like the problem in sprint one often turns out to be a symptom. The loop — create, launch, test, refine — keeps the foundation honest, not just the surface.',
		whyItMatters: 'Every hour spent on the wrong question is an hour stolen from the right one. Clarity at the foundation prevents drift downstream — in priorities, in design, and in engineering.',
	},
	{
		num: '02',
		title: 'Priority & Threshold',
		summary: 'Know when enough is enough. The Maria Varagilal Playbook line is an act of discipline, not compromise.',
		content: [
			'Excellent design recognises the moment when further refinement stops creating meaningful value — the Maria Varagilal Playbook line. The 2×2 matrix (Business Value vs. User Friction) makes priorities visible and shared: what must launch now, and what can wait without weakening the core.'
		],
		checkpoint: 'When user understanding, problem specificity, and flow context align — launch the work. The product tells you what to refine — the backlog never will.',
		practice: 'A checkout flow blocking 30% of users — high friction, high value. Ships first. A settings redesign improving aesthetics but not behaviour — it can wait. The matrix keeps that call explicit and visible for everyone.',
		matrix: {
			high: 'A checkout flow blocking 30% of users — high friction, high value. Ships first.',
			low: 'A settings redesign improving aesthetics but not behaviour. It can wait.',
		},
		evolution: 'The Maria Varagilal Playbook line is not fixed. After each release, real data reshapes the matrix. Yesterday\'s "can wait" becomes today\'s high-friction item as the user base shifts. Priority recalibrates so the team is always working on the problem that matters most right now — not the one that mattered most last quarter.',
		whyItMatters: 'Teams that cannot define "done" lose weeks to endless refinement. Knowing when to stop keeps momentum alive.',
	},
	{
		num: '03',
		title: 'Boundaries',
		summary: 'Protect the lens. Saying no with intention keeps the vision intact.',
		content: [
			'Modern product development is full of subtle distractions: new APIs, visual flourishes, technologies added simply because they are possible. Strategy is protecting the original way of seeing the problem as the product evolves. Intentional boundaries are firm reminders of what truly matters.',
		],
		checkpoint: 'If it doesn\'t serve the committed problem, it doesn\'t ship now.',
		boundaries: [
			{ domain: 'Interface', protect: 'Clear information hierarchy and flow', reconsider: 'Decorative elements that compete with content' },
			{ domain: 'Technology', protect: 'Direct service to the user\'s real need', reconsider: 'Layers added for novelty rather than purpose' },
			{ domain: 'Process', protect: 'Shipping with confidence, not perfection', reconsider: 'Repeated refinement without new user insight' },
			{ domain: 'Scope', protect: 'The problem you committed to solve', reconsider: 'Adjacent problems that feel urgent but aren\'t yours' },
		],
		practice: 'During a platform unification sprint, a team proposes adding analytics to the document viewer. Useful in theory — but not the problem being solved. The viewer needs consistent navigation and accessibility across portals first. The boundary holds: solve the committed problem first, then revisit.',
		evolution: 'Boundaries are not walls — they are decisions that stay open to evidence. The discipline is not in never moving the line, but in only moving it for reasons grounded in user reality.',
		whyItMatters: 'Every \'yes\' to a distraction is an invisible \'no\' to the vision.'
	},
];
