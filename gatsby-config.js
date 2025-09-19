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
		PARALLEL_SOURCING: true,
		DEV_SSR: true,
	},
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
			},
		},
		{
			resolve: `gatsby-omni-font-loader`,
			options: {
				enableListener: true,
				preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
				web: [
					{
						name: `Inter`,
						file: `https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700&display=swap`,
					},
					{
						name: `Rubik`,
						file: `https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700&display=swap`,
					},
					{
						name: `Material Symbols Rounded`,
						file: `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0`,
					},
				],
			},
		},
	],
};
