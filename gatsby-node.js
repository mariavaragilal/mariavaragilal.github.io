// You can delete this file if you're not using it
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const fs = require('fs-extra');
const mvEn = require('./src/constants/i18n/locales/mv.en.json');

const toSlug = (title) =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

exports.createPages = ({ actions: { createPage, createRedirect } }) => {
	createRedirect({ fromPath: '/cases/', toPath: '/work/', isPermanent: true, redirectInBrowser: true });
	const workCases = mvEn.workCases || {};
	Object.values(workCases).forEach((group) => {
		(group.cases || []).forEach((app) => {
			const slug = app.slug || toSlug(app.title);
			createPage({
				path: '/work/' + slug + '/',
				component: path.resolve(__dirname, 'src/pages/work/_common/CaseStudyPage.js'),
				context: { slug },
			});
			createRedirect({ fromPath: '/cases/' + slug + '/', toPath: '/work/' + slug + '/', isPermanent: true, redirectInBrowser: true });
		});
	});
};

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

exports.onPostBuild = async () => {
	const publicDir = path.join(__dirname, 'public');
	const chunkPath = path.join(publicDir, 'sitemap-0.xml');
	const indexPath = path.join(publicDir, 'sitemap-index.xml');
	const legacyPath = path.join(publicDir, 'sitemap.xml');
	try {
		if (await fs.pathExists(chunkPath)) {
			await fs.copy(chunkPath, legacyPath);
			await fs.remove(chunkPath);
		}
		if (await fs.pathExists(indexPath)) {
			await fs.remove(indexPath);
		}
	} catch (e) {
		process.stdout.write('onPostBuild sitemap: ' + (e && e.message ? e.message : e) + '\n');
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
