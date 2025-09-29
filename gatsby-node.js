// You can delete this file if you're not using it
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require("fs-extra");

// Ensure plugin target directories exist with permissive permissions to avoid EPERM
// when working in iCloud-synced folders during development (fixes copyFile failures).
exports.onPreBootstrap = async () => {
	const paths = [".cache/caches/gatsby-plugin-offline", "public/~partytown", "public/~partytown/debug"];

	for (const p of paths) {
		try {
			await fs.ensureDir(p, { mode: 0o777 });
			// also try to set permissions leniently
			await fs.chmod(p, 0o777);
		} catch (e) {
			// Non-fatal: write minimal message to stdout for troubleshooting without failing lint
			process.stdout.write(`Could not ensure directory ${p}: ${e && e.message ? e.message : e}\n`);
		}
	}
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
	if (stage === "develop") {
		actions.setWebpackConfig({
			resolve: {
				fallback: {
					fs: false,
					path: false,
				},
				alias: {
					"@common": require("path").resolve(__dirname, "src/_common"),
					"@docs": require("path").resolve(__dirname, "src/pages/docs"),
				},
			},
			watchOptions: {
				ignored: ["**/node_modules/**", "**/.cache/**", "**/public/**", "**/.git/**", "**/.DS_Store", "**/.Trash/**", "**/Library/Mobile Documents/com~apple~CloudDocs/**/.Trash/**", "**/bundle-report.html"],
				poll: 1000,
				aggregateTimeout: 1000,
			},
		});
	} else {
		actions.setWebpackConfig({
			resolve: {
				fallback: {
					fs: false,
					path: false,
				},
				alias: {
					"@common": require("path").resolve(__dirname, "src/_common"),
					"@docs": require("path").resolve(__dirname, "src/pages/docs"),
				},
			},
		});
	}
};
