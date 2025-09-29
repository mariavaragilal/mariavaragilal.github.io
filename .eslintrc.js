module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		jest: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:jsx-a11y/recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "react-hooks", "jsx-a11y"],
	rules: {
		// Code style rules to match your preferences
		quotes: ["error", "double"],
		semi: ["error", "always"],
		indent: ["error", "tab"],
		"no-tabs": "off",
		"no-mixed-spaces-and-tabs": "error",

		// React specific rules
		"react/react-in-jsx-scope": "off", // Not needed in React 17+
		"react/prop-types": "off", // Using TypeScript-like prop validation
		"react/jsx-uses-react": "off", // Not needed in React 17+
		"react/jsx-uses-vars": "error",

		// React Hooks rules
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",

		// Accessibility rules
		"jsx-a11y/anchor-is-valid": "off", // Gatsby Link components
		"jsx-a11y/click-events-have-key-events": "warn",
		"jsx-a11y/no-static-element-interactions": "warn",

		// General rules
		"no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
		"no-console": "warn",
		"prefer-const": "error",
		"no-var": "error",

		// Switch statement rules
		"default-case": "warn",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	ignorePatterns: ["node_modules/", "public/", ".cache/", "coverage/", "*.config.js"],
};
