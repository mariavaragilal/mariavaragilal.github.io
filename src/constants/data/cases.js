
export const cases = [
	{
		period: '2015 · Present',
		title: 'Securibox Brand Unification',
		subtitle: 'Document security · from individual products to ecosystem',
		pillars: 'All 5 pillars',
		highlight: 'Led the creation of a unified brand and experience foundation. Proposed and delivered a Unified Solutions Brand — cohesive visual language, shared experience philosophy, and reusable patterns in production.',
		results: [
			'Brand identity and logo from the ground up',
			'Transformed individual products into unified ecosystem',
			'Brand consistency and cohesion improved',
			'Reduced task completion time',
			'Smoother, more predictable user experience',
			'Reusable patterns for team efficiency and design-to-development alignment'
		],
		logo: '/images/securibox-logo.png',
		caseStudy: {
			role: 'Head Digital Product Designer & Frontend Development',
			tools: 'Sketch · Figma · Gatsby · Bootstrap · React · Redux',
			businessProblem: 'As Securibox expanded beyond its original secure vault into multiple solutions, each product emerged in isolation. Without shared principles, inconsistencies accumulated across interfaces, behaviours, and brand expression — fragmenting the experience and weakening trust in a platform that needed to feel like one company.',
			strategicDecision: { intro: 'Every decision began with one question:', question: 'Does this make Securibox feel like one trusted company — or multiple separate tools?' },
			process: [
				{ phase: 'Phase 1', duration: 'Audit', title: 'Brand & Experience Cohesion Audit', description: 'Mapped every touchpoint — portals, mobile, emails, onboarding, and internal tools. Evaluated visual and UX consistency to identify fragmentation risks.' },
				{ phase: 'Phase 2', duration: 'Principles', title: 'Unified Brand Principles', description: 'Translated the company vision into four actionable principles: Trust through Clarity, Precision in Every Interaction, Seamless Flow, Accessible by Default.' },
				{ phase: 'Phase 3', duration: 'Resources', title: 'Brand Library & Company Assets', description: 'Built the brand library in Sketch and defined core company resources — logo, presentations, documentation, and templates. Later migrated the system to Figma to improve collaboration and scalability.' },
				{ phase: 'Phase 4', duration: 'Implementation', title: 'Design Language in Production', description: 'Implemented the design language directly in production using Gatsby and Bootstrap configuration rules. Bootstrap was intentionally chosen to reduce documentation overhead and simplify adoption — creating one shared system for designers and developers.' },
				{ phase: 'Phase 5', duration: 'Alignment', title: 'Continuous Alignment & Measurement', description: 'Established an ongoing loop to keep strategy, execution, and outcomes aligned, ensuring the unified brand evolves consistently as teams and products grow.' }
			],
			implementation: 'The brand system was initially built in Sketch and later migrated to Figma. By that stage, core company assets — including the logo, presentations, and documentation — were already standardised.\n\nI translated the design system directly into production using Gatsby, defining Bootstrap configuration rules to encode the brand. Bootstrap was intentionally chosen to minimise documentation overhead and simplify adoption and support across teams.\n\nApplication logic was built, with consistency applied across cube.securibox.eu, sca.securibox.eu, and white-label client portals.',
			resultsMetrics: [
				'Brand consistency improved significantly across touchpoints',
				'Task completion time reduced across key workflows',
				'Fewer UI-related support issues and smoother user experience',
				'Improved alignment between design and development',
				'Strengthened perception of a cohesive, reliable platform'
			],
			tradeoffsLearnings: 'Prioritising guidelines and shared principles over visual flourish meant scaling back some early design iterations to ensure adoption.\n\nUnification proved to be as much about culture as design. The identity was built to remain resilient — ensuring consistency even as teams evolve.',
			quote: 'Define what matters, shrink the space between design and production — fewer docs, fewer handoffs. Bootstrap was a strategic choice, not a shortcut.'
		}
	},
	{
		period: '2019',
		title: 'ConnectLime Website & Brand',
		subtitle: 'B2B digital agency · brand identity + web',
		pillars: 'Pillars 1, 2, 3',
		highlight: 'Built complete brand identity and website from concept to implementation — clarity and trust for non-technical decision-makers.',
		results: [
			'Deep brand identity definition',
			'Content strategy and information architecture',
			'Professional presence and stronger lead generation',
			'Bilingual FR/EN with cultural adaptation'
		],
		caseStudy: {
			role: 'UX/UI Designer & Brand Developer · 2019',
			tools: 'Figma · React · Gatsby · Brand Guidelines',
			businessProblem: 'ConnectLime, a digital agency for startups and SMEs, lacked differentiation and trust. Fragmented service presentation and weak navigation meant potential clients left without engaging.',
			strategicDecision: { intro: 'The guiding principle:', question: 'How do we balance credibility with approachability for SMEs choosing a digital partner?' },
			process: [
				{ phase: 'Phase 1', duration: 'Research', title: 'Brand audit & competitor analysis', description: 'European agencies benchmark. Outcome-focused content preferred by target audience.' },
				{ phase: 'Phase 2', duration: 'Design', title: 'Content strategy, architecture & brand identity', description: 'Content strategy and information architecture. Deep brand identity definition: logo, color system, typography.' },
				{ phase: 'Phase 3', duration: 'Build', title: 'Website implementation', description: 'Bilingual FR/EN with cultural adaptation. Adaptive theme system.' }
			],
			implementation: 'Built the website in Gatsby and React. Adaptive theme system with intelligent detection of user preferences. Bilingual FR/EN with i18n. Handed off brand guidelines, component specs, and source to the client.',
			resultsMetrics: [
				'Deep brand identity definition',
				'Content strategy and information architecture',
				'Professional presence; stronger lead generation',
				'Bilingual FR/EN with cultural adaptation'
			],
			tradeoffsLearnings: 'Prioritised simplicity over feature density — resisted adding more content that would dilute the message. Stakeholder alignment on "communicate professionalism through simplicity" drove faster decisions.',
			quote: 'Communicate professionalism through simplicity.'
		}
	},
	{
		period: '2016',
		title: 'Epaye — Electronic Payroll',
		subtitle: 'Fintech · proposal (app + landing)',
		pillars: 'Pillars 1, 2, 3',
		highlight: 'Proposal for electronic payroll for everyone. Product and landing concept for a fintech solution — not implemented.',
		results: [
			'Product and landing concept',
			'Clear value proposition for payroll',
			'Trust and clarity for payroll adoption'
		],
		caseStudy: {
			role: 'Product & UX Designer · Proposal · 2016',
			tools: 'Figma · Product design · Landing page',
			businessProblem: 'Epaye aimed to offer electronic payroll for everyone, but fintech adoption depends on trust. The product and landing needed to feel approachable to non-technical decision-makers.',
			strategicDecision: { intro: 'The design question:', question: 'How do we make payroll tech feel approachable and trustworthy to non-technical decision-makers?' },
			process: [
				{ phase: 'Phase 1', duration: 'Discovery', title: 'Value proposition definition', description: 'Mapped user needs and competitive landscape for payroll solutions.' },
				{ phase: 'Phase 2', duration: 'Design', title: 'Product + landing concept', description: 'App flows and landing page proposal with distinctive visual identity (marble, gooey elements).' }
			],
			implementation: null,
			resultsMetrics: ['Proposal only — not implemented.'],
			tradeoffsLearnings: 'Proposal only. Chose a bold visual language to stand out in fintech.',
			quote: 'Electronic payroll for everyone — clarity and trust for adoption.'
		}
	},
	{
		period: '2014',
		title: 'Continente.pt Digital Campaign',
		subtitle: 'Retail · Bronze Young Lions',
		pillars: 'Pillars 1, 2, 5',
		highlight: 'Bronze Young Lions 2014 — creative campaign proposal that would strengthen brand connection with Portuguese families. Not implemented.',
		results: [
			'Bronze Young Lions 2014',
			'Innovative digital storytelling concept',
			'Memorable brand experience proposal',
			'Stronger connection with diverse customer base'
		],
		caseStudy: {
			role: 'Creative team · Bronze Young Lions · Proposal · 2014',
			tools: 'Creative direction · Digital campaign · Brand design',
			businessProblem: 'Continente needed to strengthen emotional connection with Portuguese families while standing out in retail. The brand required innovation without losing its trusted family image.',
			strategicDecision: { intro: 'The creative challenge:', question: 'How do we strengthen emotional connection with Portuguese families while showcasing innovation?' },
			process: [
				{ phase: 'Concept', duration: '2014', title: 'Campaign proposal', description: 'Digital campaign concept and creative direction. Bronze Young Lions 2014.' }
			],
			implementation: null,
			resultsMetrics: ['Bronze Young Lions 2014.', 'Proposal only — not implemented.'],
			tradeoffsLearnings: 'Proposal only. Balanced bold digital storytelling with respect for Continente\'s established family values.',
			quote: 'Stand out in retail while maintaining Continente\'s trusted family brand image.'
		}
	},
	{
		period: '2014',
		title: 'SCP GameBox',
		subtitle: 'Sporting club · proposal (website concept)',
		pillars: 'Pillars 1, 2, 5',
		highlight: 'Proposal for Sporting Clube de Portugal — digital proposal and website concept. Not implemented.',
		results: [
			'Proposal and website concept',
			'Sporting brand experience',
			'Clear presentation of offers and advantages'
		],
		caseStudy: {
			role: 'Digital proposal & website · Proposal · 2014',
			tools: 'Design · Proposal · Web',
			businessProblem: 'SCP GameBox 14\'15 needed to present offers and advantages in a way that felt authentic to Sporting Clube de Portugal\'s brand and sporting audience.',
			strategicDecision: { intro: 'The design goal:', question: 'How do we present SCP offers and advantages in a way that feels authentic to the club?' },
			process: [
				{ phase: 'Proposal', duration: '2014', title: 'Digital proposal concept', description: 'Proposal structure and visual presentation for website concept.' }
			],
			implementation: null,
			resultsMetrics: ['Proposal only — not implemented.'],
			tradeoffsLearnings: 'Proposal only. Focused on brand experience and value proposition over simplistic design.',
			quote: 'Clear value presentation for a sporting institution.'
		}
	},
	{
		period: '2013',
		title: 'CCV — Correios de Cabo Verde',
		subtitle: 'Post office · proposal (landing + currency)',
		pillars: 'Pillars 1, 2, 3',
		highlight: 'Proposal for Cabo Verde post office — landing page concept for currency exchange, foreign orders, and postal services. Not implemented.',
		results: [
			'Landing page concept',
			'Currency and postal services UX',
			'Government-sector digital presence'
		],
		caseStudy: {
			role: 'Landing page design · Proposal · 2013',
			tools: 'Design · Landing page · Government UX',
			businessProblem: 'Correios de Cabo Verde (CCV) needed a digital presence for currency exchange, foreign orders, and postal services — complex offerings for a diverse user base.',
			strategicDecision: { intro: 'The UX challenge:', question: 'How do we present postal and currency services for a diverse user base?' },
			process: [
				{ phase: 'Design', duration: '2013', title: 'Landing structure concept', description: 'Information architecture and visual design proposal.' }
			],
			implementation: null,
			resultsMetrics: ['Proposal only — not implemented.'],
			tradeoffsLearnings: 'Proposal only. Prioritised clarity and accessibility for government-sector context.',
			quote: 'Making postal and currency services clear and accessible.'
		}
	}
];