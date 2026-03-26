module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
	moduleNameMapper: {
		'^@reach/router$': '<rootDir>/src/test/reach-router-stub.js',
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@common/(.*)$': '<rootDir>/src/_common/$1',
		'^@constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@assets/(.*)$': '<rootDir>/src/assets/$1',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
	},
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	transformIgnorePatterns: ['node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)'],
	testMatch: ['<rootDir>/src/test/**/*.test.js', '<rootDir>/src/test/**/*.test.jsx'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.cache/', '<rootDir>/public/'],
	collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/**/*.test.{js,jsx}', '!src/**/*.spec.{js,jsx}', '!src/test/setup.js', '!src/test/reach-router-stub.js', '!src/test/**'],
	coverageReporters: ['text', 'lcov', 'html'],
	coverageDirectory: 'coverage',
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
};
