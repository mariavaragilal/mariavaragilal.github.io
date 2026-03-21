// ─────────────────────────────────────────────────────────────────────────────
// Person & identity
// ─────────────────────────────────────────────────────────────────────────────

export const person = {
	name: 'Maria Varagilal',
	jobTitle: 'Technical Product Designer & Frontend Development',
	description: 'Principal Technical Product Designer who ships code. 10+ years delivering digital products from concept to production. Skilled in design systems, product strategy, React, Redux, and frontend implementation.',
	url: 'https://mariavaragilal.github.io',
	image: 'https://mariavaragilal.github.io/avatar.png',
	sameAs: ['https://www.linkedin.com/in/mariavaragilal', 'https://codepen.io/mariavaragilal', 'https://dribbble.com/mariavaragilal', 'https://be.net/mariavaragilal'],
	address: { locality: 'Lisbon', country: 'Portugal' },
	knowsAbout: ['User Experience Design', 'User Interface Design', 'Product Design', 'React', 'Redux', 'JavaScript (ES6+)', 'Design Systems', 'Frontend Development', 'AI-Augmented', 'LLM prompting'],
	skills: ['UX Design', 'UI Design', 'React', 'Redux', 'JavaScript (ES6+)', 'Design Systems', 'Gatsby'],
	education: [
		{ name: 'Universidade Lusíada de Lisboa', description: 'Bachelor\'s Degree in Design' },
		{ name: 'Academia Flag', description: 'Specialization in Communication Design' },
	],
	worksFor: { name: 'Securibox', url: 'https://www.securibox.eu', description: 'Head Technical Product Designer' },
	awards: [
		{ name: 'Bronze cyber', description: 'Young Lions Portugal', date: '2014-05-01' },
		{ name: 'Web Design Served', description: 'Behance', date: '2013-07-01' },
	],
};

// Landing copy (method, dimensions, outcomes, evolution, keyMetrics, work cases) lives in
// src/constants/i18n/locales/mv.en.json — edit that file directly.

// ─────────────────────────────────────────────────────────────────────────────
// Philosophy — MVP Method (three commitments: cohesion, priority, boundaries)
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
// AI & LLM exploration
// ─────────────────────────────────────────────────────────────────────────────

export const aiExploration = {
	id: 'ai-exploration',
	ariaLabelledBy: 'ai-exploration-heading',
	label: 'AI & LLM exploration',
	heading: 'AI within Boundaries',
	intro: [
		'AI accelerates execution, not clarity. That distinction shapes where AI enters the workflow — and where it does not. The MVP Method still applies: boundaries first. AI operates within them.',
		'Without constraints, AI generates fast and drifts faster. A prompt that yields a decent component today yields an inconsistent one tomorrow — wrong spacing, broken hierarchy, tone that doesn\'t match. Speed without guardrails is fragmentation at scale.',
		'The answer stays the same: clarity first, execution second. The shift is that those boundaries must now live inside the prompting itself.',
	],
	skillsInPrompting: {
		title: 'Skills in prompting',
		intro: [
			'Reusable, domain-specific instructions that encode boundaries into AI context: project conventions, coding standards, design tokens, constraints.',
			'A skill is not a prompt template — it mirrors the design system.',
			'Result: less correcting, more iterating; repeatable tasks accelerate.',
			'Skills encode the same boundaries that guide human decisions.',
		],
		skills: [
			{
				name: 'Prompt Architect',
				type: 'methodology',
				methodology: [
					{ step: '1. DECONSTRUCT', description: 'Extract core intent, map what\'s provided vs. missing' },
					{ step: '2. DIAGNOSE', description: 'Identify ambiguity, missing constraints, weak definitions' },
					{ step: '3. DEVELOP', description: 'Select techniques, enrich context, apply optimizations' },
					{ step: '4. DELIVER', description: 'Clean copy-paste block + explanation' },
				],
				anatomy: [
					{ part: '1. Role', description: 'Expertise, perspective, explicit tradeoffs' },
					{ part: '2. Task', description: 'Specific deliverable, format, end state' },
					{ part: '3. Context', description: 'Facts the model can\'t infer: constraints, risks' },
					{ part: '4. Reasoning', description: 'Why this matters — steers judgment calls' },
					{ part: '5. Stop Conditions', description: 'When output is complete and verified' },
					{ part: '6. Output', description: 'Structure, format, field labels' },
				],
				result: 'Transforms rough ideas into precision prompts. Same systematic approach every time — repeatable quality.',
			},
			{
				name: 'Design System',
				type: 'structure',
				structure: {
					name: 'design-system/',
					type: 'folder',
					children: [
						{ name: 'SKILL.md', type: 'file' },
						{ name: 'references/', type: 'folder', children: [{ name: 'tokens.md', type: 'file' }, { name: 'component-patterns.md', type: 'file' }, { name: 'guidelines.md', type: 'file' }, { name: 'ui-refinement-checklist.md', type: 'file' }] },
						{ name: 'subagents/', type: 'folder', children: [{ name: 'component-scaffolder.md', type: 'file' }, { name: 'component-auditor.md', type: 'file' }, { name: 'token-auditor.md', type: 'file' }, { name: 'ui-auditor.md', type: 'file' }] },
						{ name: 'scripts/', type: 'folder', children: [{ name: 'generate-component.py', type: 'file' }, { name: 'export-tokens.py', type: 'file' }, { name: 'validate-component.sh', type: 'file' }] },
					],
				},
				features: [
					{ title: 'Token System', description: 'Semantic Tailwind classes, CSS custom properties, dark mode variables — never hardcode values' },
					{ title: 'Component Anatomy', description: 'Single CVA (class-variance-authority) + cn() style for .js/.jsx/.tsx, compound patterns, controlled/uncontrolled state' },
					{ title: 'Accessibility Rules', description: 'focusRing on every interactive element, disabled states, ARIA patterns' },
					{ title: 'Subagents', description: 'Specialized tasks: scaffold new components, audit existing ones, validate tokens' },
				],
				result: 'AI generates components that match the system exactly — same tokens, same patterns, same accessibility rules. No drift.',
			},
			{
				name: 'Project Conventions',
				type: 'structure',
				structure: {
					name: 'project-conventions/',
					type: 'folder',
					children: [
						{ name: 'SKILL.md', type: 'file' },
						{ name: 'references/', type: 'folder', children: [{ name: 'vite-structure.md', type: 'file' }, { name: 'next-structure.md', type: 'file' }, { name: 'naming-conventions.md', type: 'file' }, { name: 'coding-standards.md', type: 'file' }, { name: 'testing-ci.md', type: 'file' }, { name: 'typescript-patterns.md', type: 'file' }] },
						{ name: 'subagents/', type: 'folder', children: [{ name: 'feature-scaffolder.md', type: 'file' }, { name: 'conventions-reviewer.md', type: 'file' }, { name: 'placement-advisor.md', type: 'file' }] },
						{ name: 'scripts/', type: 'folder', children: [{ name: 'create-component.sh', type: 'file' }, { name: 'check-conventions.sh', type: 'file' }] },
					],
				},
				features: [
					{ title: 'Project Structure', description: 'Vite/Next/Gatsby patterns, feature vs shared folders, barrel exports, path aliases' },
					{ title: 'Naming Conventions', description: 'Files, components, hooks, utils, constants — consistent patterns across codebase' },
					{ title: 'Coding Standards', description: 'ESLint rules, Prettier config, import order, comment style, error handling' },
					{ title: 'Team Distribution', description: 'Placement rules for new features, handoff documentation patterns' },
				],
				result: 'AI places files correctly, follows team conventions, generates code that passes linting. No refactoring needed.',
			},
		],
	},
	whatDoesntWorkTitle: 'What doesn\'t work',
	whatDoesntWork: [
		{ title: 'AI without boundaries', description: 'Generating UI from a blank prompt produces components that look plausible but drift from the system. Every output needs manual correction — the speed gain disappears.' },
		{ title: 'AI as the starting point', description: 'When AI leads ideation before the problem is clear, it anchors the team on what\'s easy to generate — not what needs to be solved. Cohesion before creation applies here too.' },
		{ title: 'One-shot prompting', description: 'A single prompt rarely produces production-ready output. The value is in the iteration loop — prompt, evaluate against the boundaries, refine — the same Build–Launch–Test–Refine cycle.' },
	],
	whereAICreatesValueTitle: 'Where AI creates real value',
	whereAICreatesValue: [
		{ title: 'Ideation & copy', description: 'Exploring directions at the pace of conversation. Rough concepts to production-ready tone in minutes — with brand voice encoded in the skill.' },
		{ title: 'Rapid prototyping', description: 'From problem statement to interactive prototype — testing layout, hierarchy, and flow before committing to production code.' },
		{ title: 'Design system scaling', description: 'Scaffolding new components that respect existing tokens, spacing, and hierarchy. The skill enforces consistency — the designer focuses on intent.' },
		{ title: 'Documentation & handoff', description: 'Generating component documentation, changelog entries, and implementation notes that follow project conventions without starting from scratch.' },
	],
	blockquote: {
		main: 'AI scales the execution. The boundaries stay.',
		secondary: 'Grounding in clear boundaries and constraints keeps work unified and meaningful, no matter the pace.',
	},
};
