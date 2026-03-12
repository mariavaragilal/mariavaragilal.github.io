// ─────────────────────────────────────────────────────────────────────────────
// Person & identity
// ─────────────────────────────────────────────────────────────────────────────

export const person = {
	name: 'Maria Varagilal',
	jobTitle: 'Head Technical Product Designer',
	description: 'Principal-level Technical Product Designer who ships code. 10+ years unifying fragmented SaaS platforms into trusted, scalable experiences. Skilled in design systems, UX strategy, React, Redux, and frontend implementation.',
	url: 'https://mariavaragilal.github.io',
	image: 'https://mariavaragilal.github.io/images/avatar.png',
	sameAs: ['https://www.linkedin.com/in/mariavaragilal', 'https://codepen.io/mariavaragilal', 'https://dribbble.com/mariavaragilal', 'https://be.net/mariavaragilal'],
	address: { locality: 'Lisbon', country: 'Portugal' },
	knowsAbout: ['User Experience Design', 'User Interface Design', 'Product Design', 'React', 'Redux', 'JavaScript', 'Design Systems', 'Frontend Development', 'AI-Augmented', 'LLM prompting'],
	skills: ['UX Design', 'UI Design', 'React', 'Redux', 'JavaScript', 'Design Systems', 'Gatsby'],
	education: [
		{ name: 'Universidade Lusíada de Lisboa', description: 'Bachelor\'s Degree in Design' },
		{ name: 'Academia Flag', description: 'Pós-Graduação in Design Comunicação' },
	],
	worksFor: { name: 'Securibox', url: 'https://www.securibox.eu', description: 'Head Technical Product Designer' },
	awards: [
		{ name: 'Bronze cyber', description: 'Young Lions Portugal', date: '2014-05-01' },
		{ name: 'Web Design Served', description: 'Behance', date: '2013-07-01' },
	],
};

// ─────────────────────────────────────────────────────────────────────────────
// MVP Method — pillars
//
// summary = the pitch (card view, overview)
// detail  = what you learn when you expand (new information, never restates summary)
// ─────────────────────────────────────────────────────────────────────────────

export const pillars = [
	{
		num: '01',
		title: 'Brand & Experience Audit',
		icon: '◎',
		groundedIn: ['Cohesion'],
		summary:
			'Map every touchpoint — portals, mobile, emails, onboarding, internal tools. Score visual and UX consistency and surface fragmentation risks before they cost clients.',
		philosophy: {
			principle: 'Cohesion Before Creation',
			ask: 'Why start here?',
			answer:
				'Before any line is drawn or code is written, the most important work is seeing the problem clearly. Mapping every touchpoint creates the real picture — who the user actually is, what they\'re trying to achieve, and where the experience is quietly breaking down.',
			checkpoint:
				'If the problem isn\'t clear, nothing built on top of it will be.',
		},
		detail: [
			'Each touchpoint is scored for visual consistency, UX coherence, and accessibility. Treat the entire ecosystem as one experience — not a collection of products. Fragmentation risks surface here before they cost clients.',
		],
	},
	{
		num: '02',
		title: 'Unified Brand Principles',
		icon: '◆',
		groundedIn: ['Boundaries'],
		summary:
			'Distill company vision into 4–6 actionable principles every designer, developer, and stakeholder can reference instantly.',
		philosophy: {
			principle: 'Boundaries',
			ask: 'How do you protect the vision?',
			answer:
				'Modern product development is full of subtle distractions: new APIs, visual flourishes, technologies added simply because they\'re possible. Intentional boundaries remind teams what truly matters. If it doesn\'t serve the committed problem, it doesn\'t ship now.',
			checkpoint:
				'Every \'yes\' to a distraction is an invisible \'no\' to the vision.',
		},
		detail: [
			'Principles are not documentation — they\'re decision-making tools. When a designer, developer, or stakeholder faces a trade-off, the principles answer the question before a meeting is needed.',
		],
	},
	{
		num: '03',
		title: 'Priority & Flow Architecture',
		icon: '⬡',
		groundedIn: ['Priority'],
		summary:
			'A 2×2 matrix (Business Value vs. User Friction) decides what gets unified first. High Value + High Friction ships first — shared auth, core navigation, document viewer. Low-friction items come later.',
		philosophy: {
			principle: 'Priority & Threshold',
			ask: 'When is enough enough?',
			answer:
				'The MVP line is an act of discipline, not compromise. The 2×2 matrix makes priorities visible and shared: what must launch now, and what can wait without weakening the core.',
			checkpoint:
				'The product tells you what to refine — the backlog never will.',
		},
		detail: [
			'The matrix turns prioritisation into a shared, visible decision — not a political one. High Value + High Friction ships first. Low-friction items queue without blocking momentum.',
		],
	},
	{
		num: '04',
		title: 'Design-Language Implementation',
		icon: '◈',
		groundedIn: ['Priority', 'Boundaries'],
		summary:
			'The design language flows from strategy into production. Instead of documentation alone, I bridge design and implementation so it reaches the product — teams get something they can ship, not just specifications.',
		philosophy: {
			principle: 'Cohesion Before Creation',
			ask: 'Why bridge design and code?',
			answer:
				'A design system only works if it lives in the product. When it drifts from what shipped, it becomes shelfware — and the fragmentation starts again.',
			checkpoint:
				'Tokens validated in production, not just approved in Figma.',
		},
		detail: [
			'Tokens, components, and patterns are validated in production — not just approved in Figma. The gap between what was designed and what launched closes to zero.',
		],
	},
	{
		num: '05',
		title: 'Continuous Alignment & Measurement',
		icon: '↻',
		groundedIn: ['Cohesion', 'Boundaries'],
		summary:
			'Ongoing loop that keeps strategy, execution, and outcomes moving in the same direction so the unified brand stays alive.',
		philosophy: {
			principle: 'Evolution',
			ask: 'How does it stay honest?',
			answer:
				'Each commitment evolves through the same cycle: build within boundaries, launch at the MVP line, test with real users, refine while protecting the lens.',
			checkpoint:
				'Declaring \'done\' creates the space to learn.',
		},
		detail: [
			'Measurement is built into the loop — not added after. Cohesion scores are re-run after each major release. New contributors and features are potential drift points the loop catches.',
		],
	},
];


// ─────────────────────────────────────────────────────────────────────────────
// Outcomes — when the pillars operate together
// ─────────────────────────────────────────────────────────────────────────────

export const outcomes = [
	{
		principle: 'Clarity',
		drivenBy: 'Pillar 1 + Pillar 3',
		protects: 'Seeing only what truly matters — stripping noise before it compounds'
	},
	{
		principle: 'Confidence',
		drivenBy: 'Pillar 4',
		protects: 'Decisions made once, launched, and trusted — no second-guessing in production'
	},
	{
		principle: 'Consistency',
		drivenBy: 'Pillar 2 + Pillar 5',
		protects: 'A unified experience that evolves without losing its identity'
	},
];

// ─────────────────────────────────────────────────────────────────────────────
// Key metrics — platform unification outcomes (for SEO Dataset schema)
// ─────────────────────────────────────────────────────────────────────────────

export const keyMetrics = [
	{ name: 'Brand consistency', value: 'Scaled' },
	{ name: 'Task completion', value: 'Reduced' },
	{ name: 'Services support friction', value: 'Reduced' },
	{ name: 'Experience', value: '10+ years' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Philosophy — manifest commitments
//
// Markup convention: {{bold:text}} marks inline emphasis.
// Render helper: str.split(/(\{\{bold:.*?\}\})/g) then match {{bold:(.+)}}
// to wrap in <strong> — keeps data free of JSX.
// ─────────────────────────────────────────────────────────────────────────────

export const manifest = [
	{
		num: '01',
		title: 'Cohesion Before Creation',
		summary: 'Map reality before making decisions. Understand the problem before shaping the solution.',
		content: [
			'Before any line is drawn or code is written, the most important work is seeing the problem clearly — not aesthetics or features first.This means disciplined observation that eliminates illusion and reveals reality. Mapping every touchpoint creates the true picture: who the user actually is, what they are trying to achieve, and where the current experience is quietly breaking down.',
			'Clarity at this stage is the highest-leverage act in the entire process. This is where the vision either ignites — or fades.',
		],
		checkpoint: 'If the problem isn\'t clear, nothing built on top of it will be.',
		practice: 'A team is tasked with improving onboarding conversion. The instinct is to redesign the sign-up screen. The audit reveals the real drop-off happens two steps later — users land on an empty dashboard with no guidance. The sign-up screen was never the problem. Without the audit, the team ships a polished solution to the wrong question.',
		evolution: 'Each cycle deepens understanding. After launch, real user data feeds the next audit. What looked like the problem in sprint one often turns out to be a symptom. The loop — build, launch, test, refine — keeps the foundation honest, not just the surface.',
		whyItMatters: 'Every hour spent on the wrong question is an hour stolen from the right one. Clarity at the foundation prevents drift downstream — in priorities, in design, and in engineering.',
	},
	{
		num: '02',
		title: 'Priority & Threshold',
		summary: 'Know when enough is enough. The MVP line is an act of discipline, not compromise.',
		content: [
			'Excellent design recognises the moment when further refinement stops creating meaningful value — the MVP line. The 2×2 matrix (Business Value vs. User Friction) makes priorities visible and shared: what must launch now, and what can wait without weakening the core.'
		],
		checkpoint: 'When user understanding, problem specificity, and flow context align — launch the work. The product tells you what to refine — the backlog never will.',
		practice: 'A checkout flow blocking 30% of users — high friction, high value. Ships first. A settings redesign improving aesthetics but not behaviour — it can wait. The matrix makes that call explicit, not political.',
		matrix: {
			high: 'A checkout flow blocking 30% of users — high friction, high value. Ships first.',
			low: 'A settings redesign improving aesthetics but not behaviour. It can wait.',
		},
		evolution: 'The MVP line is not fixed. After each release, real data reshapes the matrix. Yesterday\'s "can wait" becomes today\'s high-friction item as the user base shifts. Priority recalibrates so the team is always working on the problem that matters most right now — not the one that mattered most last quarter.',
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

// ─────────────────────────────────────────────────────────────────────────────
// Evolution loop
// ─────────────────────────────────────────────────────────────────────────────

export const evolution = {
	intro: 'Each commitment describes how it evolves, but the underlying cycle is the same across all three — the steady learning loop that keeps the vision honest.',
	loop: [
		{ step: 'Build', desc: 'Create within defined boundaries', pillar: 'Pillar 4' },
		{ step: 'Launch', desc: 'Reach the MVP line and release', pillar: 'Pillar 3' },
		{ step: 'Test', desc: 'Learn from real users and real data', pillar: 'Pillar 5' },
		{ step: 'Refine', desc: 'Iterate while protecting the original lens', pillar: 'Pillar 1 + Pillar 2' },
	],
	closing: 'Each pass through the loop sharpens the product and deepens understanding. The role of leadership is to protect clarity, confidence, and consistency — so the team can release, learn, and move forward with purpose.',
	whyItMatters: 'Declaring Done creates the space to learn. Learning keeps the vision honest. The cycle builds quiet, compounding advantage that no single feature sprint can replicate.',
};
