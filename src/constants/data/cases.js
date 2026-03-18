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
				title: 'Securibox: Unified Identity',
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
						{ url: 'https://accounts.securibox.eu/id/register', label: 'Securibox ID — Auth', role: 'Identity UX, registration flows' },
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
				tools: 'Figma · React · Gatsby · Accessibility (WCAG)',
				subtitle: 'Making credential handover feel safe and worth doing — showcasing a technology',
				pillars: 'Consumer · Trust · Systems',
				highlight: 'Cube asks users to hand over login credentials for their bank, telecoms, insurance, and retail accounts so automated agents collect documents on their behalf. The design problem: making something inherently invasive feel safe, clear, and worth doing — across 319 integrations, designed and built in production.',
				results: [
					'319 agent integrations across banking, telecoms, utilities, HR, retail, and government services',
					'10 document categories surfaced through a single taxonomy',
					'3 cloud sync destinations — Securibox, Google Drive, OneDrive — unified folder architecture',
					'2 view modes (list and card) from the same component system',
					'Full mobile layout — redesigned single-column with bottom tab navigation, not a responsive shrink',
					'Bilingual FR/EN throughout',
				],
				references: {
					links: [{ url: 'https://cube.securibox.eu', label: 'Cube - Own your data', role: 'Sub-brand, product design, frontend' }],
					dribbble: [{ url: 'https://dribbble.com/shots/3440959-cube-securibox-eu', label: 'Cube design' }],
				},
				caseStudy: {
					processHeading: 'Key decisions',
					tradeoffsHeading: 'Trade-offs & Learnings',
					businessProblem: 'Cube asks users to hand over login credentials for their bank, telecoms, insurance, and retail accounts so automated agents collect documents on their behalf. The technology works. The design problem is the moment of handing over those credentials: making something inherently invasive feel safe, clear, and worth doing. Everything else follows from that.\n\nI designed both the consumer product (Cube) and the developer integration experience (SCA) for the same underlying technology. One audience needed emotional trust and simplicity. The other needed API flexibility and precision. Both shipped in production code.',
					strategicDecision: {
						intro: 'Users already wanted to automate. The only question that mattered:',
						question: 'Can I trust you with my credentials?',
					},
					process: [
						{
							phase: 'Decision 1',
							label: 'Trust',
							title: 'Credentials and sync status on the same screen — spatially separated, not behind a tab',
							description: 'The instinct is to put sync status on a separate screen. Instead, credentials live on the left, synchronisation status on the right — same view, different zones. Users returning to check on an agent shouldn\'t navigate away to confirm it worked. The MFA button is persistent in the top right, always reachable without disrupting the form. The folder path breadcrumb appears here too — seeing exactly where documents will land, at the moment of saving credentials, reduces the anxiety that the data is going somewhere unknown.',
						},
						{
							phase: 'Decision 2',
							label: 'Scale',
							title: 'Two views for 319 agents — both necessary',
							description: 'A user who knows exactly which provider they want needs a scannable list with status at a glance. A user exploring needs logo density — to feel the scale of what\'s possible. List view: provider name, document types, last sync, and connection status in one row. Card view: same data, denser grid, prioritising provider identity and the add action. The filter sidebar is identical in both modes — same system, two expressions. The "Unavailable" badge was a late decision: testing showed users couldn\'t distinguish working from unconfigured with only a status dot, so the explicit text label was added alongside the colour signal.',
						},
						{
							phase: 'Decision 3',
							label: 'Legibility',
							title: 'The dashboard\'s third column — keeping sources legible',
							description: 'The dashboard has three columns: My Collection (user-pulled documents), My Agents (configuration and status), and HR Documents pushed by the user\'s employer. The tension: Cube is a product the user controls. HR Documents arrive without user action, from their company. The decision: keep them visible but explicitly labelled and spatially separated — "HR DOCUMENTS" header — so the source is always legible. The same logic applies to the files explorer: Securibox-collected folders, employer folders, and personal cloud (Google Drive, OneDrive) appear as siblings under the same root. Different origins, unified view — never presented as if they came from the same place.',
						},
					],
					implementation: [
						{
							heading: 'Landing page',
							items: [
								'Static site with Gatsby — fast load, SEO-friendly',
								'Introduces what agents are — automated document collectors that connect to your providers',
								'Explains how agents work — credential-based sync, document categories, cloud destinations',
								'Value proposition and trust — designed to build understanding before users reach the app, reducing the anxiety of credential handover',
								'Bilingual FR/EN with i18n — language follows user preference',
							],
						},
						{
							heading: 'App',
							items: [
								'Built in React',
								'Agent card and list component system with shared sidebar filter (document taxonomy, sort, view toggle)',
								'Credential form with masked fields, help tooltips, password visibility toggle, and persistent MFA action',
								'Synchronisation status panel with sync history and document count',
								'3-column dashboard and its mobile reorganisation (single column, bottom tab navigation)',
								'Files explorer with folder tree and multi-source root architecture',
								'Connected applications settings (Google Drive, OneDrive, revoke flows)',
								'Bilingual FR/EN with i18n throughout',
							],
						},
						{
							heading: 'Branding',
							items: [
								'Cube Branding & Visual identity.',
								'Cube Brand guidelines: usage, spacing, typography, colour, visual hierarchy, and visual patterns.',
								'Cube Brand assets: logos, icons, colour palettes, typography, and visual patterns.', 'Cube Brand application: application of the brand to the app and landing page.',
							],
						},
					],
					tradeoffsLearnings: [
						'The landing page (cube.securibox.eu) introduces what agents are and how they work — it was intentionally designed alongside the app to handle that initial layer of understanding.',
						'Inside the app, there used to be a step-by-step walkthrough. I chose to remove it to reduce friction and give users space to explore naturally. Instead of pushing actions or asking for immediate commitment, the experience stays open and pressure-free — no insistence on credentials, no urgency to configure an agent.',
						'When no agent is set up, the interface remains intentionally minimal, showing a single clear entry point: "Configure your first agent." Only after interacting with it do users see the available agent options. This progressive reveal keeps the experience lightweight while still enabling discovery.',
						'The result is a flow that respects the user\'s pace, builds trust early, and avoids overwhelming them upfront.',
					],
				},
			},
			{
				period: '2015',
				status: 'shipped',
				title: 'SCA - CloudAgents',
				subtitle: 'Designing the operator layer for an API product — from agent configuration to sync monitoring across 500+ integrations',
				role: 'Head Technical Product Designer & Frontend Development',
				tools: 'Figma · React · Bootstrap · Accessibility (WCAG)',
				pillars: 'Developer · Operations · Systems',
				highlight: 'SCA is the infrastructure Cube runs on. I designed both sides of the same technology: the consumer product where users collect their documents, and the operator platform where developers configure integrations and operations teams monitor them at scale.',
				results: [
					'500+ provider integrations accessible through a single API',
					'BackOffice with 6 operational sections, role-based permission management, dark and light theme',
					'Multilingual BO — French, English, Portuguese',
					'White-label Webview deployed across enterprise client portals',
				],
				references: {
					links: [{ url: 'https://www.securibox.eu/solutions/sca/', label: 'Cloud Agents', role: 'API product design, landing page' }],
					dribbble: [{ url: 'https://dribbble.com/shots/3188588-sca-securibox-eu', label: 'SCA design' }],
				},
				caseStudy: {
					processHeading: 'Key decisions',
					tradeoffsHeading: 'Trade-offs & Learnings',
					businessProblem: 'SCA is the infrastructure Cube runs on — but its users are developers and operations teams, not consumers. Developers need to integrate document collection into their own products. Operations teams need to monitor hundreds of agents across thousands of accounts in real time. Two completely different jobs on the same platform, both requiring clarity at scale.',
					strategicDecision: {
						intro: 'The operator challenge:',
						question: 'How do you design a platform that serves developers configuring integrations and operations teams debugging sync failures — without collapsing two very different jobs into one confused interface?',
					},
					process: [
						{
							phase: 'Decision 1',
							label: 'Navigation',
							title: 'Three-section navigation — separating jobs at the top level',
							description: 'The BO homepage presents three explicit paths: CloudAgents (manage all agents), Données de support (monitor and debug syncs), Configuration des permissions (manage users and teams). The decision to separate these at navigation level — not behind permission gates — came from the different mental modes they serve. An administrator editing agent field definitions should never land in sync monitoring by accident. The dashboard below shows aggregate health in 10 seconds: agent count, sync success/error states, API response time and availability. Know your system state first, then go to the right section.',
						},
						{
							phase: 'Decision 2',
							label: 'Boundaries',
							title: 'The Webview field configuration — where client control ends and platform responsibility begins',
							description: 'The Webview is the embeddable credential form clients put in their own products. What that form shows — field labels, order, placeholder text, validation patterns, whether a field is masked — is controlled here in the BackOffice, not by client code. Security-critical behaviour is fixed: credential transmission, MFA handling, session management. Field presentation is configurable: labels, position, regex, required/optional. This lets clients brand the experience in an afternoon without negotiating the trust layer per integration. Securibox maintains the security guarantees across all integrations without case-by-case exceptions.',
						},
						{
							phase: 'Decision 3',
							label: 'Status',
							title: 'Two distinct status signals per sync — because they can diverge',
							description: 'Each sync operation shows two status values: delivery report state and sync process state. A sync can complete successfully while its delivery report fails. A sync can end with "nothing new to download" — a success, not a failure. Four process states use explicit colour coding across card and list views: green (Terminé), red (errors), orange (credential/validation states), yellow (warnings). The per-account drill-down shows the full sync history timeline — sync date, delivery date, documents detected vs downloaded, both status fields per row — alongside the auto-sync scheduling toggle. The person investigating a failed sync often needs to immediately reschedule; burying that control in agent settings would add an unnecessary context switch.',
						},
						{
							phase: 'Decision 4',
							label: 'Data viz',
							title: 'The statistics chart — aggregate rhythm as context for individual signals',
							description: 'The time-series chart shows pink/red as the aggregate activity baseline across all agents, with specific agents highlighted in distinct colours when selected. The multi-layer area chart means the overall system rhythm is always visible as context — individual agent anomalies stand out against it. A spike in one agent\'s activity that matches the baseline rhythm is expected behaviour. The same spike outside the normal cycle is the signal worth investigating. The chart makes that distinction visible without requiring separate views.',
						},
					],
					implementation: [
						{
							heading: 'BackOffice',
							items: [
								'Full BO frontend across all six sections — dashboard with aggregate metrics and API health indicators',
								'CloudAgents grid and list with filter system (Type, Usage, Sort, Availability, Status, Category)',
								'Agent detail with sync activity chart and status breakdowns',
								'Agent field configuration modal (multilingual FR/EN/PT, per-field type and validation)',
								'Support section in card and list view with per-account sync history drill-down',
								'Statistics multi-layer area chart with agent selection',
								'Permission configuration (users, teams, API clients, certificate management)',
								'Profile and dark/light theme toggle',
							],
						},
						{
							heading: 'Webview',
							items: [
								'Embeddable credential form — clients embed in their own products',
								'White-label — field labels, placeholders, validation configurable per integration',
							],
						},
						{
							heading: 'Branding',
							items: [
								'SCA logo and visual identity — distinct within the Securibox product family',
								'Brand guidelines applied across BackOffice, Webview, and landing page',
								'Landing page concept and design — product introduction for developers and operators',
							],
						},
					],
					tradeoffsLearnings: [
						'The BackOffice was designed to support the configuration and management of agents. Each section is internally coherent, while the relationships between them remain intentionally implicit.',
						'Some connections are naturally discoverable. *CloudAgents* and *Statistiques*, for example, are tightly linked — users can move from an individual agent to its statistics in an isolated view, and back again. *Support* operates at the account level, and the transition between support and account management is straightforward enough that it doesn\'t require explicit linking.',
						'This structure reflects how the product was originally built. Over time, though, it could evolve to better align with how it\'s actually used — shifting the BackOffice toward a support-first workflow as the primary entry point, with agent configuration and permissions becoming secondary paths.',
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
