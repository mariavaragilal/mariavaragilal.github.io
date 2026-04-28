// ─────────────────────────────────────────────────────────────────────────────
// Person & identity
// ─────────────────────────────────────────────────────────────────────────────

// All person/identity SEO data lives in gatsby-config.js siteMetadata — access via useSiteMetadata().
// name, url, image, sameAs live in gatsby-config.js siteMetadata — access via useSiteMetadata()
export const person = {
	name: 'Maria Varagilal',
	jobTitle: 'Principal Product Designer · Design Engineer',
	description: 'Design Engineer. Coherent multi-product experiences from concept to production — product strategy, UI/UX, and the Maria Varagilal Playbook Method.',
	address: { locality: 'Lisbon', country: 'Portugal' },
	knowsAbout: ['User Experience Design', 'User Interface Design', 'Product Design', 'React', 'Redux', 'JavaScript (ES6+)', 'Frontend Developer', 'AI-accelerated workflows', 'Prompt engineering'],
	skills: ['UX Design', 'UI Design', 'React', 'Redux', 'JavaScript (ES6+)', 'Gatsby'],
	education: [
		{ name: 'Universidade Lusíada de Lisboa', description: 'Bachelor\'s Degree in Design' },
		{ name: 'Academia Flag', description: 'Specialization in Communication Design' },
	],
	worksFor: { name: 'Securibox', url: 'https://www.securibox.eu', description: 'Principal Product Designer & Frontend Developer' },
	awards: [
		{ name: 'Bronze cyber', description: 'Young Lions Portugal', date: '2014-05-01' },
		{ name: 'Web Design Served', description: 'Behance', date: '2013-07-01' },
	],
};

// ─────────────────────────────────────────────────────────────────────────────
// Maria Varagilal Playbook Method — JS-accessible export for non-i18n contexts
// (gatsby-node, scripts, tests). Keep in sync with mv.en.json.
// ─────────────────────────────────────────────────────────────────────────────

export const methodMVP = {
	heading: 'The MVP Method',
	subtitle: 'MVP — Maria Varagilal Playbook',
	commitments: [
		{
			principle: 'Cohesion',
			dimensionNos: ['01', '04'],
			protects: 'The product is one experience — not a collection of products. Fragmentation risks surface before they cost clients.',
		},
		{
			principle: 'Boundaries',
			dimensionNos: ['02', '04', '05'],
			protects: 'Intentional boundaries remind teams what truly matters. If it doesn\'t serve the committed problem, it doesn\'t ship now.',
		},
		{
			principle: 'Priority',
			dimensionNos: ['03', '04'],
			protects: 'The launch line is an act of discipline, not compromise. It names what must ship now, what can wait, and what the core cannot lose.',
		},
	],
	dimensions: [
		{
			num: '01',
			title: 'Brand & Experience Audit',
			icon: '◎',
			groundedIn: ['Cohesion'],
			summary: 'Map every touchpoint — portals, mobile, emails, onboarding, internal tools. Score visual and UX consistency, identify where understanding of user needs is thinnest, and surface fragmentation risks before any work begins.',
			philosophy: {
				lens: 'Clarity Before Execution',
				ask: 'Why start here?',
				answer: 'Before any line is drawn or code is written, the most important work is seeing the problem clearly. Mapping every touchpoint creates the real picture — who the user actually is, what they\'re trying to achieve, and where the experience is quietly breaking down.',
				checkpoint: 'If the problem isn\'t clear, nothing built on top of it will be.',
			},
			detail: ['Each touchpoint is scored for visual consistency, UX coherence, and accessibility. Treat the entire ecosystem as one experience — not a collection of products. Fragmentation risks surface here before they cost clients.'],
		},
		{
			num: '02',
			title: 'Unified Brand Principles',
			icon: '◆',
			groundedIn: ['Boundaries'],
			summary: 'Distill company vision into a concise set of actionable principles and decision rules every designer, developer, and stakeholder can reference instantly as decision filters — small bets you sanity-check in production as you ship.',
			philosophy: {
				lens: 'Intention Over Distraction',
				ask: 'How do you protect the vision?',
				answer: 'Modern product development is full of subtle distractions: new APIs, visual flourishes, technologies added simply because they\'re possible. Intentional boundaries remind teams what truly matters. If it doesn\'t serve the committed problem, it doesn\'t ship now.',
				checkpoint: 'Every \'yes\' to a distraction is an invisible \'no\' to the vision.',
			},
			detail: ['Principles and decision rules aren\'t documentation — they\'re decision-making tools. When a trade-off appears, the answers are there before a meeting is needed.'],
		},
		{
			num: '03',
			title: 'Priority & Flow Architecture',
			icon: '⬡',
			groundedIn: ['Priority'],
			summary: 'A prioritization grid: define what ships first. High Value + High Friction ships first — shared auth, core navigation, document viewer. Low-friction items come later.',
			philosophy: {
				lens: 'The Launch Line',
				ask: 'When is enough enough?',
				answer: 'The launch line is an act of discipline, not compromise. The grid makes priorities visible and shared: what must launch now, and what can wait without weakening the core.',
				checkpoint: 'The product tells you what to refine — the backlog never will.',
			},
			detail: ['The grid keeps prioritization and scope definition explicit and visible for the whole project. High Value + High Friction ships first; low-friction items queue without blocking momentum.'],
		},
		{
			num: '04',
			title: 'Design Implementation',
			icon: '◈',
			groundedIn: ['Priority', 'Boundaries'],
			summary: 'The design — visuals, interactions, and flows — translates from strategy into production. Bridging design and implementation — not documentation alone — validates the intended experience in the live product.',
			philosophy: {
				lens: 'Cohesion Before Creation',
				ask: 'Why bridge design and code?',
				answer: 'A design only works if it lives in the product. When it drifts from what is shipped, it becomes shelfware — and the fragmentation starts again.',
				checkpoint: 'Validated in production, not just approved in a mockup.',
			},
			detail: ['Components and patterns are validated in production — not just approved in a mockup. The gap between designed intent and launched reality closes to zero.'],
		},
		{
			num: '05',
			title: 'Continuous Alignment & Measurement',
			icon: '↻',
			groundedIn: ['Cohesion', 'Boundaries'],
			summary: 'An ongoing build–measure–learn cycle keeps strategy, execution, and outcomes honest, moving in the same direction so the unified brand stays alive after launch.',
			philosophy: {
				lens: 'Continuous Honesty',
				ask: 'How does it stay honest?',
				answer: 'Once something ships, honesty is what you can measure in production — usage, friction, outcomes — fed back into the next decisions. Build–measure–learn is that rhythm; without it, drift stacks up while everyone still believes the map.',
				checkpoint: 'Declaring \'done\' creates the space to learn.',
			},
			detail: ['Measurement is built into the loop — not added after. Cohesion scores are re-run after each major release. New contributors and features are potential drift points the loop catches early.'],
		},
	],
	outcomes: [
		{ principle: 'Clarity', drivenBy: 'D01 · D03', protects: 'Seeing only what truly matters — stripping noise before it compounds' },
		{ principle: 'Confidence', drivenBy: 'D04', protects: 'Decisions made once, launched, and trusted — no second-guessing' },
		{ principle: 'Consistency', drivenBy: 'D02 · D05', protects: 'A unified experience that evolves without losing its identity' },
	],
	evolution: {
		intro: 'Each commitment describes how it evolves, but the underlying cycle is the same across all three — create, launch, test, refine — the evolution loop that keeps the vision honest.',
		loop: [
			{ step: 'Create', desc: 'Work within defined boundaries', dimension: 'Dimension 4' },
			{ step: 'Launch', desc: 'Reach the launch line and release', dimension: 'Dimension 3' },
			{ step: 'Test', desc: 'Learn from real users and real data', dimension: 'Dimension 5' },
			{ step: 'Refine', desc: 'Iterate while protecting the vision', dimension: 'Dimension 1 + Dimension 2' },
		],
		closing: 'Each pass through the loop sharpens the product and deepens understanding. The work has always been about more than any single method — it\'s about what disciplined practice makes possible.',
		whyItMatters: 'Declaring Done creates the space to learn. Learning keeps the vision honest. The cycle builds quiet, compounding advantage.',
	},
};
