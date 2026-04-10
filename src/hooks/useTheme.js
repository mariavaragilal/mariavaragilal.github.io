import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const isBrowser = typeof window !== 'undefined';
const STORAGE_KEY = 'theme';

const _getSystemTheme = () => {
	if (!isBrowser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const _applyTheme = (resolved) => {
	if (!isBrowser) return;
	const root = document.documentElement;
	if (resolved === 'dark') root.classList.add('dark');
	else root.classList.remove('dark');
};

const useThemeCore = ({ initialTheme, persist = true, applyToDOM = true } = {}) => {
	// Initial render must match SSR: never read localStorage in useState (avoids React #418 hydration text mismatch on theme toggle, etc.).
	const [theme, _setTheme] = useState(() => initialTheme || 'system');
	const [resolvedTheme, setResolvedTheme] = useState('light');

	const setTheme = useCallback((value) => {
		if (!isBrowser) return;
		if (persist) localStorage.setItem(STORAGE_KEY, value);
		_setTheme(value);
	}, [persist]);

	useEffect(() => {
		if (!isBrowser || !persist) return;
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark' || stored === 'system') _setTheme(stored);
	}, [persist]);

	useEffect(() => {
		if (!isBrowser) return;
		const resolve = () => setResolvedTheme(theme === 'system' ? _getSystemTheme() : theme);
		resolve();
		if (theme !== 'system') return;
		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		mql.addEventListener('change', resolve);
		return () => mql.removeEventListener('change', resolve);
	}, [theme]);

	useEffect(() => {
		if (applyToDOM) _applyTheme(resolvedTheme);
	}, [resolvedTheme, applyToDOM]);

	return { theme, setTheme, resolvedTheme };
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children, initialTheme, persist = true }) => {
	const themeState = useThemeCore({ initialTheme, persist, applyToDOM: true });
	const value = useMemo(() => themeState, [themeState.theme, themeState.setTheme, themeState.resolvedTheme]);
	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
ThemeProvider.displayName = 'ThemeProvider';

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within a ThemeProvider');
	return context;
};
