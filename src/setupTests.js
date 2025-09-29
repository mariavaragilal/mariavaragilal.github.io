import "@testing-library/jest-dom";

// Mock Gatsby
global.__PATH_PREFIX__ = "";

// Mock reach router
jest.mock("@reach/router", () => ({
	useLocation: () => ({
		pathname: "/",
	}),
	navigate: jest.fn(),
}));

// Mock react-i18next
jest.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key) => key,
		i18n: {
			changeLanguage: jest.fn(),
		},
	}),
	I18nextProvider: ({ children }) => children,
}));

// Mock react-helmet
jest.mock("react-helmet", () => ({
	Helmet: ({ children }) => children,
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	observe() {
		return null;
	}
	disconnect() {
		return null;
	}
	unobserve() {
		return null;
	}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	constructor() {}
	observe() {
		return null;
	}
	disconnect() {
		return null;
	}
	unobserve() {
		return null;
	}
};
