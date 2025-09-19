// You can delete this file if you're not using it
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const glob = require("glob");
const fs = require("fs-extra");

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
				ignored: ["**/node_modules/**", "**/.cache/**", "**/public/**", "**/.git/**", "**/.DS_Store"],
				poll: false,
				aggregateTimeout: 300,
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
