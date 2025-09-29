module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
	moduleNameMapping: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@common/(.*)$": "<rootDir>/src/_common/$1",
		"^@constants/(.*)$": "<rootDir>/src/constants/$1",
		"^@assets/(.*)$": "<rootDir>/src/assets/$1",
		"^@pages/(.*)$": "<rootDir>/src/pages/$1",
	},
	transform: {
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	transformIgnorePatterns: ["node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)"],
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.cache/", "<rootDir>/public/"],
	collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/**/*.test.{js,jsx}", "!src/**/*.spec.{js,jsx}", "!src/setupTests.js"],
	coverageReporters: ["text", "lcov", "html"],
	coverageDirectory: "coverage",
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
};
