// ─────────────────────────────────────────────────────────────────────────────
// Case studies — grouped by ecosystem
//
// Shape: { [group]: { context, period, cases: [...] } }
//   status      — 'shipped' | 'proposal'
//   role, tools — display next to title/subtitle (case level, always visible)
//   pillars     — display string rendered directly in UI
//   results     — headline outcomes (external-facing, concise)
//   caseStudy.resultsMetrics — evidence layer (metrics, directional data)
//   process[].label — short tag for the step (replaces former 'duration')
//   Proposal cases use a leaner shape: no implementation, simplified learnings
//   references  — live links, dribbble, clients (zero maintenance: links to live sites)
//   caseStudy.skillsDemonstrated — lean summary for granular projects (index 1+)
//   cases[0]    — umbrella case; cases[1+] — granular projects per product
// ─────────────────────────────────────────────────────────────────────────────

export const workCases = {
	Securibox: {
		context: 'Designed and developed the entire product family — brand identity, design system, and production frontend across all properties.',
		period: '2015–Present',
		cases: [
			{
				period: '2015–Present',
				status: 'shipped',
				title: 'Securibox Unified Brand',
				subtitle: 'Automated solutions of data & document collection, parsing & classification · from individual products to ecosystem',
				role: 'Head Technical Product Designer & Frontend Development',
				tools: 'Sketch · Figma · Gatsby · Bootstrap · React · Redux · Accessibility (WCAG)',
				pillars: 'All 5 pillars',
				highlight: 'Led the creation of a unified brand and experience foundation. Proposed and delivered a Unified Solutions Brand — cohesive visual language, shared experience philosophy, and reusable patterns in production.',
				results: [
					'Brand identity and logo from the ground up',
					'Transformed individual products into unified ecosystem',
					'Reusable patterns and improved design-to-development alignment',
					'Reduced task completion time and friction across key workflows',
				],
				references: {
					links: [
						{ url: 'https://www.securibox.eu', label: 'Corporate site', role: 'Brand, design system, Gatsby build' },
						{ url: 'https://cube.securibox.eu', label: 'Cube - Own your data', role: 'Sub-brand, product design, frontend' },
						{ url: 'https://www.securibox.eu/solutions/sca', label: 'SCA - CloudAgents', role: 'API product design, landing page' },
						{ url: 'https://accounts.securibox.eu/id/register', label: 'Securibox ID — Authentication', role: 'Identity UX, registration flows' },
						{ url: 'https://me.securibox.eu', label: 'Me - Securibox Account', role: 'Account management' },
						{ url: 'https://rh.securibox.eu', label: 'RH — HR payslip distribution', role: 'Product design' },
					],
					dribbble: [
						{ url: 'https://dribbble.com/shots/3440959-cube-securibox-eu', label: 'Cube — Securibox' },
						{ url: 'https://dribbble.com/shots/3188588-sca-securibox-eu', label: 'SCA — Securibox CloudAgents' },
					],
				},
				caseStudy: {
					businessProblem: 'As Securibox expanded beyond its original secure vault into multiple solutions, each product emerged in isolation. Without shared principles, inconsistencies accumulated across interfaces, behaviours, and brand expression — fragmenting the experience and weakening trust in a platform that needed to feel like one company.',
					strategicDecision: {
						intro: 'Every decision began with one question:',
						question: 'Does this make Securibox feel like one trusted company — or multiple separate tools?',
					},
					process: [
						{ phase: 'Phase 1', label: 'Audit', title: 'Brand & Experience Audit', description: 'Mapped every touchpoint — portals, mobile, emails, onboarding, and internal tools. Evaluated visual and UX consistency to identify fragmentation risks.' },
						{ phase: 'Phase 2', label: 'Principles', title: 'Unified Brand Principles', description: 'Translated the company vision into four actionable principles: Trust through Clarity, Precision in Every Interaction, Seamless Flow, Accessible by Default.' },
						{ phase: 'Phase 3', label: 'Resources', title: 'Brand Library & Company Assets', description: 'Built the brand library in Sketch and defined core company resources — logo, presentations, documentation, and templates. Later migrated the system to Figma to improve collaboration and scalability.' },
						{ phase: 'Phase 4', label: 'Implementation', title: 'Design Language in Production', description: 'Implemented the design language directly in production using Gatsby and Bootstrap configuration rules. Bootstrap was intentionally chosen to reduce documentation overhead and simplify adoption — creating one shared system for designers and developers.' },
						{ phase: 'Phase 5', label: 'Alignment', title: 'Continuous Alignment & Measurement', description: 'Established an ongoing loop to keep strategy, execution, and outcomes aligned, ensuring the unified brand evolves consistently as teams and products grow.' },
					],
					implementation: 'The brand system was initially built in Sketch and later migrated to Figma. By that stage, core company assets — including the logo, presentations, and documentation — were already standardised.\n\nI translated the design system directly into production using Gatsby, defining Bootstrap configuration rules to encode the brand. Bootstrap was intentionally chosen to minimise documentation overhead and simplify adoption and support across teams.\n\nApplication logic was built, with consistency applied across cube.securibox.eu, sca.securibox.eu, and white-label client portals.',
					resultsMetrics: [
						'Brand consistency improved across all client-facing touchpoints',
						'Task completion time reduced across key workflows',
						'React/Redux/Gatsby implementation with performance and accessibility (WCAG) focus',
						'Design-to-development alignment improved — fewer handoff iterations per component',
						'Strengthened perception of a cohesive, reliable platform across enterprise clients',
					],
					tradeoffsLearnings: 'Prioritising guidelines and shared principles over visual flourish meant scaling back some early design iterations to ensure adoption.\n\nUnification proved to be as much about culture as design. The identity was built to remain resilient — ensuring consistency even as teams evolve.',
					quote: {
						title: 'Define what matters, shrink the space between design and production.',
						subtitle: 'Fewer docs, fewer handoffs. Bootstrap was a strategic choice, not a shortcut.',
					},
				},
			},
			{
				period: '2015',
				status: 'shipped',
				title: 'Cube - Own your data',
				role: 'Head Technical Product Designer & Frontend Development',
				tools: 'Figma · React · Gatsby',
				subtitle: 'A sandbox showcase for Securibox’s document aggregation technology',
				pillars: 'Pillars 1, 3, 4',
				highlight: 'Designed Cube brand and product experience for a consumer-facing interface that allows users to explore and understand Securibox’s document aggregation concept.',
				results: [
					'Own-your-data experience',
					'Cohesive sub-brand extending the unified system',
					'Hands-on demo that drives enterprise interest',
				],
				references: {
					links: [{ url: 'https://cube.securibox.eu', label: 'Cube - Own your data', role: 'Sub-brand, product design, frontend' }],
					dribbble: [{ url: 'https://dribbble.com/shots/3440959-cube-securibox-eu', label: 'Cube design' }],
				},
				caseStudy: {
					businessProblem: 'Securibox needed a consumer-friendly way to demonstrate its enterprise document aggregation technology — a sub-brand where users could explore and experiment with the technology in a hands-on way. The experience had to feel empowering, not corporate.',
					strategicDecision: {
						intro: 'The design question:',
						question: 'How might we make complex data aggregation technology feel approachable — inviting exploration rather than requiring explanation?',
					},
					process: [
						{ phase: 'Phase 1', label: 'Brand & Positioning', title: 'Defining the Cube concept', description: 'Defined visual language and tone — distinct from corporate Securibox but recognisably part of the family' },
						{ phase: 'Phase 2', label: 'UX/UI', title: 'Experience design', description: 'Designed flows and interfaces for both the app and the landing page — aggregation and navigation tailored for non-technical consumers.' },
						{ phase: 'Phase 3', label: 'Build', title: 'Production frontend', description: 'Implemented in Gatsby and React — sub-brand in production within the unified system.' },
					],
					skillsDemonstrated: 'Brand design, product design, UX design, interface design, information architecture',
					tradeoffsLearnings:
						'Creating a separate brand helped make the concept more approachable, but it also required balancing independence with alignment to the parent company’s credibility.',
					quote: {
						title: 'Own-your-data experience within a unified ecosystem.',
						subtitle: 'Consumer-friendly sub-brand that extends, not fragments, the Securibox identity.',
					},
				},
			},
			{
				period: '2015',
				status: 'shipped',
				title: 'SCA - CloudAgents',
				subtitle: 'Automated document collection API solution',
				role: 'Head Technical Product Designer',
				tools: 'Figma · React · Gatsby',
				pillars: 'Pillars 2, 4',
				highlight: 'Designed the API product experience and documentation, defined the SCA brand (logo and graphics), designed and developed the Backoffice for client environment management and the Webview white-label platform — then migrated the landing to the unified system.',
				results: [
					'Clear developer experience for API product',
					'SCA brand definition — logo and graphics',
					'Streamlined client environment management',
					'Faster launches and reduced code integration time',
					'Landing page unified with corporate brand',
				],
				references: {
					links: [{ url: 'https://www.securibox.eu/solutions/sca/', label: 'Cloud Agents', role: 'API product design, landing page' }],
					dribbble: [{ url: 'https://dribbble.com/shots/3188588-sca-securibox-eu', label: 'SCA design' }],
				},
				caseStudy: {
					businessProblem: 'SCA (CloudAgents) is a technical API product for automated document collection. Its existing presentation was disconnected from the unified brand and failed to communicate value clearly to both technical decision-makers and business stakeholders.',
					strategicDecision: {
						intro: 'The API challenge:',
						question: 'How do we present an API product in a way that resonates with developers while remaining accessible to business leaders who approve purchases?',
					},
					process: [
						{ phase: 'Phase 1', label: 'Product', title: 'API product experience', description: 'Designed developer-facing value proposition and documentation structure.' },
						{ phase: 'Phase 2', label: 'Brand', title: 'SCA brand definition', description: 'Defined the SCA brand — logo and associated graphics for the service.' },
						{ phase: 'Phase 3', label: 'Backoffice', title: 'Client environment management', description: 'Designed and developed a Backoffice to manage different client environments.' },
						{ phase: 'Phase 4', label: 'Webview', title: 'White-label platform', description: 'Developed Webview — a white-label platform with predefined and customizable UI components to launch quicker and save time during code integration.' },
						{ phase: 'Phase 5', label: 'Landing', title: 'Unified landing page', description: 'Migrated landing to the unified brand system with clear value communication for technical and non-technical audiences.' },
					],
				},
			},
			{
				period: '2019',
				status: 'shipped',
				title: 'Me - Securibox Account',
				subtitle: 'Centralized account management',
				role: 'Head Technical Product Designer',
				tools: 'Figma · Account UX',
				pillars: 'Pillars 3, 5',
				highlight: 'Designed the account management hub that gives users control over their profile, preferences, and data across the entire Securibox ecosystem.',
				results: [
					'Unified account settings across all products',
					'Profile and preference management',
					'Single source of truth for user data',
					'Data consistency without product-specific fragmentation',
				],
				references: {
					links: [{ url: 'https://me.securibox.eu', label: 'Securibox Me - Account management', role: 'Account management' }],
				},
				caseStudy: {
					businessProblem: 'As the Securibox ecosystem grew, users had no central place to manage their profile, preferences, or connected accounts. Each product operated in isolation, creating friction and data fragmentation.',
					strategicDecision: {
						intro: 'The account challenge:',
						question: 'How might we give users a single home for their account while keeping each product experience focused and uncluttered?',
					},
					process: [
						{ phase: 'Phase 1', label: 'Strategy', title: 'Account hub concept', description: 'Defined the scope of centralized account management — profile, preferences, connected accounts — without duplicating product-specific settings.' },
						{ phase: 'Phase 2', label: 'Design', title: 'Unified account experience', description: 'Designed the Me hub as a single home for account control, integrated across Cube, SCA, RH, and client portals.' },
					],
				},
			},
			{
				period: '2017',
				status: 'shipped',
				title: 'Securibox ID',
				subtitle: 'Authentication & registration flows',
				role: 'Head Technical Product Designer',
				tools: 'Figma · Accessibility (WCAG)',
				pillars: 'Pillars 3, 5',
				highlight: 'Designed the central authentication experience used by every Securibox product — creating a single, consistent identity layer across the ecosystem.',
				results: [
					'Google & Microsoft OAuth integration',
					'Consistent registration and login flows across the ecosystem',
					'WCAG-compliant authentication forms',
					'Single identity across all Securibox products',
				],
				references: {
					links: [{ url: 'https://accounts.securibox.eu/id/register', label: 'Securibox ID', role: 'Identity UX, registration flows' }],
				},
				caseStudy: {
					businessProblem: 'Every Securibox product required authentication. Without a central identity layer, users faced repeated sign-ups and inconsistent flows across the ecosystem, eroding trust.',
					strategicDecision: {
						intro: 'The identity question:',
						question: 'How do we make authentication feel like a trusted entry point to a unified platform, not a gate at every individual product?',
					},
					process: [
						{ phase: 'Phase 1', label: 'Flows', title: 'Identity UX design', description: 'Designed OAuth flows (Google, Microsoft) and registration flows for cross-product consistency.' },
						{ phase: 'Phase 2', label: 'Accessibility', title: 'RGPD-compliant auth', description: 'Ensured auth forms and flows met RGPD standards — critical for enterprise clients.' },
					],
					skillsDemonstrated: 'Authentication UX · Cross-product consistency',
					tradeoffsLearnings: 'Auth is often treated as an afterthought. Making it central to the design system ensured every product inherited the same trust baseline.',
					quote: {
						title: 'One identity across the entire platform.',
						subtitle: 'Auth that feels like a welcome, not a checkpoint.',
					},
				},
			},
			{
				period: '2017',
				status: 'shipped',
				title: 'RH — HR Payslip Distribution',
				subtitle: 'Secure digital payslip portal for French SMEs',
				role: 'Product Designer',
				tools: 'Figma',
				pillars: 'Pillars 1, 4',
				highlight: 'Designed and developed an app on Securibox solutions to answer the 2017 French norm: digital payslips as default, with employee opt-out right and secure document delivery.',
				results: [
					'User flows that translate the 2017 norm into clear opt-in/opt-out choices',
					'Information architecture for secure payslip delivery',
					'White-label product design powered by Securibox solutions',
				],
				references: {
					links: [{ url: 'https://rh.securibox.eu', label: 'RH portal', role: 'Product design' }],
				},
				caseStudy: {
					businessProblem: 'In 2017, France authorised employers to issue payslips in electronic format by default. Employers must inform employees but do not need permission to switch. Employees retain a legal right to opt out and request paper. Securibox needed a product built on its existing solutions — document collection, parsing, and secure delivery — to support this norm while ensuring confidential, long-term access.',
					strategicDecision: {
						intro: 'The design question:',
						question: 'How do we answer the 2017 norm — digital payslips by default, employee opt-out for paper — with a product that guarantees secure, personal, and long-term access?',
					},
					process: [
						{ phase: 'Phase 1', label: 'Foundation', title: 'Securibox solutions mapping', description: 'Identified how existing Securibox document and secure delivery solutions could serve the payslip use case — collection, parsing, and digital access.' },
						{ phase: 'Phase 2', label: 'Compliance', title: 'Norm and user needs', description: 'Mapped the 2017 legal framework: default electronic, employee opt-out right, employer obligations for monthly delivery.' },
						{ phase: 'Phase 3', label: 'Design', title: 'RH portal experience', description: 'Designed the RH portal on top of Securibox — secure document delivery, intuitive access to the digital access — for French SMEs and their employees.' },
					],
					skillsDemonstrated: 'Platform product design · Regulatory UX · Secure document delivery',
					tradeoffsLearnings: 'Building on Securibox solutions accelerated delivery. The norm shifted behaviour overnight — the app had to feel trustworthy from day one, with employees confident that opting in to digital would not compromise access or confidentiality.',
					quote: {
						title: 'Digital payslips for everyone.',
						subtitle: 'Securibox solutions, built for the 2017 norm.',
					},
				},
			},
		],
	},
	ConnectLime: {
		context: 'Built the agency brand and website from scratch — then delivered client products through the studio.',
		period: '2019',
		cases: [
			{
				period: '2019',
				status: 'shipped',
				title: 'ConnectLime Website & Brand',
				subtitle: 'B2B digital agency · brand identity + web',
				role: 'UX/UI Designer & Brand Developer · 2019',
				tools: 'Figma · React · Gatsby · Brand Guidelines',
				pillars: 'Pillars 1, 2, 3',
				highlight: 'Built complete brand identity and website from concept to implementation — clarity and trust for non-technical decision-makers.',
				results: [
					'Deep brand identity definition — logo, colour system, typography',
					'Content strategy and information architecture',
					'Professional presence and stronger lead generation',
					'Bilingual FR/EN with cultural adaptation',
				],
				references: {
					links: [
						{ url: 'https://www.connectlime.com/en/', label: 'ConnectLime — digital product studio', role: 'Brand identity, website, bilingual' },
					],
					clients: [
						{ url: 'https://www.connectlime.com/en/work/GererMaBoite', label: 'Gerer Ma Boite — POS for entrepreneurs', role: 'Senior Design oversight & final UI · acquired by CEGID' },
						{ url: 'https://www.connectlime.com/work/HotelAppz/', label: 'HotelAppz — hotel CRM platform', role: 'Senior Design supervision' },
						{ url: 'https://www.assistarobase.fr', label: 'Assist@ — admin life management', role: 'App design · brand and public site by third parties · employer portal runs on Securibox' },
					],
					dribbble: [
						{ url: 'https://dribbble.com/shots/7212848-CONNECTLIME-Createurs-de-solutions-digitales', label: 'ConnectLime design' },
					],
				},
				caseStudy: {
					businessProblem: 'ConnectLime, a digital agency for startups and SMEs, lacked differentiation and trust. Fragmented service presentation and weak navigation meant potential clients left without engaging.',
					strategicDecision: {
						intro: 'The guiding principle:',
						question: 'How do we balance credibility with approachability for SMEs choosing a digital partner?',
					},
					process: [
						{ phase: 'Phase 1', label: 'Research', title: 'Brand audit & competitor analysis', description: 'European agencies benchmark. Outcome-focused content preferred by target audience.' },
						{ phase: 'Phase 2', label: 'Design', title: 'Content strategy, architecture & brand identity', description: 'Content strategy and information architecture. Deep brand identity definition: logo, colour system, typography.' },
						{ phase: 'Phase 3', label: 'Build', title: 'Website implementation', description: 'Bilingual FR/EN with cultural adaptation. Adaptive theme system with intelligent detection of user preferences.' },
					],
					implementation: 'Built the website in Gatsby and React. Adaptive theme system with intelligent detection of user preferences. Bilingual FR/EN with i18n. Handed off brand guidelines, component specs, and source to the client.',
					resultsMetrics: [
						'Professional digital presence established from zero',
						'Bilingual FR/EN with i18n — culturally adapted, not just translated',
						'Adaptive theme system shipped in production',
					],
					tradeoffsLearnings: 'Prioritised simplicity over feature density — resisted adding more content that would dilute the message. Stakeholder alignment on \'communicate professionalism through simplicity\' drove faster decisions.',
					quote: {
						title: 'Communicate professionalism through simplicity.',
						subtitle: 'Clarity and trust for non-technical decision-makers choosing a digital partner.',
					},
				},
			},
			{
				period: '2019',
				status: 'shipped',
				title: 'Gerer Ma Boite (GMB)',
				subtitle: 'SaaS point of sale platform for entrepreneurs · acquired by CEGID',
				role: 'Senior Designer',
				tools: 'Figma · AngularJS · Azure',
				pillars: 'Pillars 2, 3, 4',
				highlight: 'Served as Senior Designer, mentoring the project team and stepping in to deliver the final UI. The platform was later acquired by CEGID and integrated into their enterprise offering.',
				results: [
					'Mentored the product team through strategy, branding, and architecture phases',
					'Delivered the final UI design, ensuring a polished, cohesive finish',
					'Platform built in ~8 weeks with AngularJS front-end and robust Azure back-end',
					'Integrated with Dropbox, Revolut, Stripe, and SendGrid APIs',
					'Acquired by CEGID and integrated into their enterprise solution'
				],
				references: {
					links: [
						{ url: 'https://www.connectlime.com/en/work/GererMaBoite', label: 'Gerer Ma Boite case study', role: 'Senior Design oversight & final UI' }
					]
				}
			},
			{
				period: '2018',
				status: 'shipped',
				title: 'HotelAppz',
				subtitle: 'Next-gen CRM platform for hotels',
				role: 'Senior Design supervision',
				tools: 'Figma · React · PMS systems',
				pillars: 'Pillars 2, 3, 4',
				highlight: 'Provided senior design oversight and mentorship for a comprehensive hotel CRM platform. Supervised the team through product strategy, branding, and UX/UI development.',
				results: [
					'Supervised product design and User Experience',
					'Mentored the design team on information architecture and interaction patterns',
					'Ensured platform integrations with PMS systems maintained UX consistency',
					'Positive user feedback highlighted ease of use and understanding of hotelier needs'
				],
				references: {
					links: [
						{ url: 'https://www.connectlime.com/work/HotelAppz/', label: 'HotelAppz case study', role: 'Senior Design supervision' },
						{ url: 'https://hoteltechreport.com/marketing/hotel-crm/hotelappz', label: 'HotelAppz on Hotel Tech Report', role: 'Product profile and reviews' }
					]
				}
			},
			{
				period: '2019',
				status: 'shipped',
				title: 'Assist@ — Admin Life Management',
				subtitle: 'Life management & Employee portal — runs on RH Securibox white-labeling)',
				role: 'Product Designer',
				tools: 'Figma · App design',
				pillars: 'Pillars 2, 4',
				highlight: 'Implemented the core application experience for this French HR startup. Designed micro-interactions and flows to enhance the user experience.',
				results: ['Clean admin workflows', 'Micro-interactions and flows to enhance the user experience'],
				references: {
					links: [{ url: 'https://www.assistarobase.fr', label: 'Assist@', role: 'App design' }],
				},
			},
		],
	},
	'Earlier work': {
		context: 'Other Proposals and award-winning concepts.',
		period: '2013–2016',
		cases: [
			{
				period: '2016',
				status: 'proposal',
				title: 'Epaye — Electronic Payroll',
				subtitle: 'Fintech · proposal (app + landing)',
				role: 'Product & UX Designer · 2016',
				tools: 'Figma · Product design · Landing page',
				pillars: 'Pillars 1, 2, 3',
				highlight: 'Product and landing concept for a fintech solution — electronic payroll for everyone.',
				results: [
					'Product and landing concept',
					'Clear value proposition for payroll adoption',
					'Trust-first visual language for fintech',
				],
				references: {
					dribbble: [
						{ url: 'https://dribbble.com/mariavaragilal', label: 'Epaye design' },
					],
					behance: [
						{ url: 'https://www.behance.net/gallery/41258845/Epaye-la-paye-lectronique-pour-tous', label: 'Epaye | Electronic Payroll' },
					],
				},
				caseStudy: {
					businessProblem: 'Epaye — the electronic payroll for all — positions itself as the ideal entry point to start dematerialisation in a company. It simplifies and automates all steps of pay between employer and employee. The challenge: build a digital identity and product from scratch, rooted in one core pillar — human relationships.',
					strategicDecision: {
						intro: 'The design question:',
						question: 'How do we make payroll tech feel approachable and trustworthy to non-technical decision-makers?',
					},
					process: [
						{ phase: 'Phase 1', label: 'Concept', title: 'Brand pillar — human relationships', description: 'Defined the brand around one core pillar: the complexity and beauty of human iterations in payroll.' },
						{ phase: 'Phase 2', label: 'Design', title: 'Digital identity & product concept', description: 'Product and landing concept that visualises human relationships — a brand and digital identity built from this foundation.' },
					],
					tradeoffsLearnings: 'Built on a brand new concept: instead of focusing on trust or adoption alone, the identity rests on human relationships — making the abstract tangible through a distinctive visual language. A deliberate bet on standing out over blending in a sector dominated by conservative interfaces.',
					quote: {
						title: 'The electronic payroll for all.',
						subtitle: 'The ideal entry point to start dematerialisation — a brand that reflects the complexity and beauty of human relationships.',
					},
				},
			},
			{
				period: '2014',
				status: 'proposal',
				title: 'Continente.pt Digital Campaign',
				subtitle: 'Retail · Bronze Young Lions',
				role: 'Creative team · Bronze Young Lions · 2014',
				tools: 'Creative direction · Digital campaign',
				pillars: 'Pillars 1, 2',
				highlight: 'Bronze Young Lions 2014 — creative campaign proposal to strengthen brand connection with Portuguese families.',
				results: [
					'Bronze Young Lions 2014',
					'Innovative digital storytelling concept',
					'Stronger connection with diverse customer base',
				],
				caseStudy: {
					businessProblem: 'Continente needed to strengthen emotional connection with Portuguese families while standing out in retail. The brand required innovation without losing its trusted family image.',
					strategicDecision: {
						intro: 'The creative challenge:',
						question: 'How do we strengthen emotional connection with Portuguese families while showcasing innovation?',
					},
					process: [
						{ phase: 'Concept', label: 'Campaign', title: 'Campaign proposal', description: 'Digital campaign concept and creative direction for Continente\'s family-oriented brand.' },
					],
					tradeoffsLearnings: 'Balanced bold digital storytelling with respect for Continente\'s established family values — innovation that extended the brand rather than disrupting it.',
					quote: {
						title: 'Stand out in retail without losing trust.',
						subtitle: 'Bold digital storytelling that extends Continente\'s family values rather than disrupting them.',
					},
				},
				references: {
					dribbble: [
						{ url: 'https://dribbble.com/shots/2409291-Continente-Bronze-Young-Lions-14', label: 'Continente | Bronze Young Lions \'14' },
					],
					behance: [
						{ url: 'https://www.behance.net/gallery/16891063/Bronze-Young-Lions-2014-Continentept', label: 'Bronze Young Lions 2014, Continente.pt' },
					],
				},
			},
			{
				period: '2014',
				status: 'proposal',
				title: 'SCP GameBox',
				subtitle: 'Sporting club · proposal (website concept)',
				role: 'Digital proposal & website · 2014',
				tools: 'Design · Proposal · Web',
				pillars: 'Pillars 1, 2',
				highlight: 'Digital proposal and website concept for Sporting Clube de Portugal.',
				results: [
					'Website concept and digital proposal',
					'Sporting brand experience',
					'Clear presentation of offers and advantages',
				],
				references: {
					dribbble: [
						{ url: 'https://dribbble.com/shots/1741544-SCP-GameBox-14-15', label: 'SCP GameBox design' },
					],
				},
				caseStudy: {
					businessProblem: 'SCP GameBox 14\'15 needed to present offers and advantages in a way that felt authentic to Sporting Clube de Portugal\'s brand and sporting audience.',
					strategicDecision: {
						intro: 'The design goal:',
						question: 'How do we present SCP offers and advantages in a way that feels authentic to the club?',
					},
					process: [
						{ phase: 'Proposal', label: 'Concept', title: 'Digital proposal concept', description: 'Proposal structure and visual presentation for website concept.' },
					],
					tradeoffsLearnings: 'Focused on brand experience and value proposition — let the club\'s identity lead the design rather than imposing a generic template.',
					quote: {
						title: 'Clear value presentation for Sporting Club.',
						subtitle: 'Let Sporting Club\'s identity lead the design — authenticity over template.',
					},
				},
			},
			{
				period: '2013',
				status: 'proposal',
				title: 'CCV — Correios de Cabo Verde',
				subtitle: 'Post office · proposal (landing + currency)',
				role: 'Landing page design · 2013',
				tools: 'Design · Landing page · Government UX',
				pillars: 'Pillars 1, 2, 3',
				highlight: 'Landing page concept for Cabo Verde post office — currency exchange, foreign orders, and postal services.',
				results: [
					'Landing page concept',
					'Currency and postal services UX',
					'Government-sector digital presence',
				],
				references: {
					dribbble: [
						{ url: 'https://dribbble.com/shots/1676694-CCV-Correios-de-Cabo-Verde', label: 'CCV — Correios de Cabo Verde' },
					],
				},
				caseStudy: {
					businessProblem: 'Correios de Cabo Verde (CCV) needed a digital presence for currency exchange, foreign orders, and postal services — complex offerings for a diverse user base.',
					strategicDecision: {
						intro: 'The UX challenge:',
						question: 'How do we present postal and currency services for a diverse user base?',
					},
					process: [
						{ phase: 'Design', label: 'Concept', title: 'Landing structure concept', description: 'Information architecture and visual design proposal for currency exchange, foreign orders, and postal services.' },
					],
					tradeoffsLearnings: 'Prioritised clarity and accessibility for a government-sector context — where trust and usability matter more than visual ambition.',
					quote: {
						title: 'Making postal and currency services clear and accessible.',
						subtitle: 'Trust and usability first in a government-sector context.',
					},
				},
			},
		],
	},
};
