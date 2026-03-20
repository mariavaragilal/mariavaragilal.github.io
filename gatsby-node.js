// You can delete this file if you're not using it
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const fs = require('fs-extra');

// Ensure plugin target directories exist to avoid EPERM during build.
exports.onPreBootstrap = async () => {
	const paths = ['.cache/caches/gatsby-plugin-offline', 'public/~partytown', 'public/~partytown/debug'];

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

// gatsby-plugin-sitemap emits sitemap-index.xml; copy to sitemap.xml so /sitemap.xml and robots.txt match.
exports.onPostBuild = async () => {
	const publicDir = path.join(__dirname, 'public');
	const indexPath = path.join(publicDir, 'sitemap-index.xml');
	const legacyPath = path.join(publicDir, 'sitemap.xml');
	try {
		if (await fs.pathExists(indexPath)) await fs.copy(indexPath, legacyPath);
	} catch (e) {
		process.stdout.write('onPostBuild sitemap copy: ' + (e && e.message ? e.message : e) + '\n');
	}
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
	if (stage === 'develop') {
		actions.setWebpackConfig({
			resolve: {
				fallback: {
					fs: false,
					path: false,
				},
				alias: {
					'@common': require('path').resolve(__dirname, 'src/_common'),
				},
			},
			watchOptions: {
				ignored: ['**/node_modules/**', '**/.cache/**', '**/public/**', '**/.git/**', '**/.DS_Store', '**/.Trash/**', '**/Library/Mobile Documents/com~apple~CloudDocs/**/.Trash/**', '**/bundle-report.html'],
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
					'@common': require('path').resolve(__dirname, 'src/_common'),
				},
			},
		});
	}
};
