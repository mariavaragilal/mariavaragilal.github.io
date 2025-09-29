/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: "Maria Varagilal: CV",
		description: "Digital Product Designer & Frontend Dev | UI/UX · React · Redux · Design Systems",
		author: "Maria Varagilal",
		keywords: "Maria Varagilal, Digital Product Designer, Frontend Dev, UI, UX, React, Redux, Design Systems",
		siteUrl: "https://mariavaragilal.github.io",
	},
	flags: {
		FAST_DEV: true,
		PRESERVE_FILE_DOWNLOAD_CACHE: true,
		PARALLEL_SOURCING: false,
		DEV_SSR: false,
		PARTIAL_HYDRATION: false,
		DETECT_NODE_MUTATIONS: false,
	},
	jsxRuntime: "automatic",
	jsxImportSource: "react",
	plugins: [
		"gatsby-plugin-image",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-plugin-sass",
			options: {
				sassOptions: {
					quietDeps: true,
					silenceDeprecations: ["legacy-js-api", "import"],
				},
			},
		},
		"gatsby-plugin-postcss",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/assets/images/",
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Maria Varagilal CV",
				short_name: "CV",
				start_url: "/",
				background_color: "#ffffff",
				theme_color: "#030213",
				display: "minimal-ui",
				icon: "src/assets/images/avatar.png",
				cache_busting_mode: "query",
				include_favicon: true,
				legacy: true,
				// theme_color_in_manifest: true,
				// display_override: ["window-controls-overlay"],
				icons: [
					{
						src: "src/assets/images/avatar.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "src/assets/images/avatar.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-robots-txt",
			options: {
				host: "https://mariavaragilal.github.io",
				sitemap: "https://mariavaragilal.github.io/sitemap.xml",
				policy: [{ userAgent: "*", allow: "/" }],
			},
		},
		{
			resolve: "gatsby-omni-font-loader",
			options: {
				enableListener: true,
				preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
				web: [
					{
						name: "Inter",
						file: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
					},
					{
						name: "Rubik",
						file: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700&display=swap",
					},
					{
						name: "Google Sans Code",
						file: "https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap",
					},
					{
						name: "Material Symbols Rounded",
						file: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0&display=swap",
					},
				],
			},
		},
		// Enable these heavy file-copying plugins only in production or when explicitly allowed.
		// This avoids EPERM copyfile errors when the project is on iCloud-synced folders during dev.
		...(process.env.NODE_ENV === "production" || process.env.ENABLE_OFFLINE === "true" ? ["gatsby-plugin-offline"] : []),
		{
			resolve: "gatsby-plugin-sitemap",
			options: {
				createLinkInHead: true,
				excludes: [],
			},
		},
		{
			resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
			options: {
				analyzerMode: "static",
				openAnalyzer: false,
				reportFilename: "./bundle-report.html",
			},
		},
	],
	developMiddleware: (app) => {
		app.use((req, res, next) => {
			res.setHeader("X-Content-Type-Options", "nosniff");
			res.setHeader("X-Frame-Options", "DENY");
			res.setHeader("X-XSS-Protection", "1; mode=block");
			next();
		});
	},
};
