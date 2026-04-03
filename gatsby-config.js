/**
 * @type {import('gatsby').GatsbyConfig}
 */
const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 20;

module.exports = {
	siteMetadata: {
		title: 'Maria Varagilal: CV',
		description: 'Principal-level Product Designer who ships code. 10+ years unifying fragmented SaaS platforms.',
		author: 'Maria Varagilal',
		keywords: 'Maria Varagilal, Principal Product Designer, Frontend Dev, UI, UX, React, Redux, Design Systems, B2B SaaS',
		siteUrl: 'https://mariavaragilal.github.io',
		image: '/avatar.png',
		social: {
			linkedin: 'https://www.linkedin.com/in/mariavaragilal',
			dribbble: 'https://dribbble.com/mariavaragilal',
			codepen: 'https://codepen.io/mariavaragilal',
			behance: 'https://be.net/mariavaragilal',
			github: 'https://github.com/mariavaragilal',
		},
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
	},
	flags: {
		FAST_DEV: false,
		PRESERVE_FILE_DOWNLOAD_CACHE: true,
		PARALLEL_SOURCING: false,
		DEV_SSR: false,
		PARTIAL_HYDRATION: false,
		DETECT_NODE_MUTATIONS: false,
	},
	jsxRuntime: 'automatic',
	jsxImportSource: 'react',
	plugins: [
		{
			resolve: 'gatsby-plugin-page-creator',
			options: {
				path: __dirname + '/src/pages',
				ignore: ['**/components/**', '**/_common/**', '**/_shared/**', '**/index/index.js'],
			},
		},
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-image',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-plugin-sass',
			options: {
				sassOptions: {
					quietDeps: true,
					silenceDeprecations: ['legacy-js-api', 'import'],
				},
			},
		},
		'gatsby-plugin-postcss',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/assets/images/',

				fastHash: true,
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Maria Varagilal',
				short_name: 'MV',
				start_url: '/',
				background_color: '#ffffff',
				theme_color: '#030213',
				display: 'minimal-ui',
				icon: 'src/assets/images/avatar.png',
				cache_busting_mode: 'query',
				include_favicon: true,
				legacy: true,
			},
		},
		{
			resolve: 'gatsby-omni-font-loader',
			options: {
				enableListener: true,
				preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
				web: [
					{
						name: 'Inter',
						file: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
					},
					{
						name: 'Rubik',
						file: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
					},
					{
						name: 'Outfit',
						file: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap',
					},
					{
						name: 'DM Sans',
						file: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap',
					},
					{
						name: 'Noto Serif Display',
						file: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Display:ital,wght@0,100..900;1,100..900&display=swap',
					},
					{
						name: 'DM Mono',
						file: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
					},
					{
						name: 'Material Symbols Rounded',
						file: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0&display=swap',
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-sitemap',
			options: {
				createLinkInHead: true,
				output: '/',
				serialize: ({ path }) => {
					let priority = 0.6;
					let changefreq = 'monthly';
					if (path === '/') {
						priority = 1.0;
						changefreq = 'weekly';
					} else if (path === '/work/') {
						priority = 0.9;
						changefreq = 'weekly';
					} else if (path === '/cv/') {
						priority = 0.8;
						changefreq = 'monthly';
					} else if (path.startsWith('/work/')) {
						priority = 0.7;
						changefreq = 'monthly';
					}
					return { url: path, changefreq, priority };
				},
			},
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				host: 'https://mariavaragilal.github.io',
				sitemap: 'https://mariavaragilal.github.io/sitemap.xml',
				policy: [{ userAgent: '*', allow: '/' }],
			},
		},
		// Enable these heavy file-copying plugins only in production or when explicitly allowed.
		...(process.env.NODE_ENV === 'production' || process.env.ENABLE_OFFLINE === 'true' ? ['gatsby-plugin-offline'] : []),
		// Bundle analyser only in production when explicitly requested (avoids slow plugin load in dev).
		...(process.env.NODE_ENV === 'production' && process.env.ANALYZE_BUNDLE === 'true'
			? [
				{
					resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
					options: {
						analyzerMode: 'static',
						openAnalyzer: false,
						reportFilename: './bundle-report.html',
					},
				},
			]
			: []),
	],
	developMiddleware: (app) => {
		app.use((req, res, next) => {
			res.setHeader('X-Content-Type-Options', 'nosniff');
			res.setHeader('X-Frame-Options', 'DENY');
			res.setHeader('X-XSS-Protection', '1; mode=block');
			next();
		});
	},
};
