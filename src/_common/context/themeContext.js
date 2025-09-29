import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("system");
	const [resolvedTheme, setResolvedTheme] = useState("light");

	useEffect(() => {
		// Only run on client side
		if (typeof window === "undefined") return;

		const getSystemTheme = () => {
			if (window.matchMedia) return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			return "light";
		};

		const updateResolvedTheme = () => {
			if (theme === "system") setResolvedTheme(getSystemTheme());
			else setResolvedTheme(theme);
		};

		updateResolvedTheme();

		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = () => updateResolvedTheme();

			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, [theme]);

	useEffect(() => {
		// Only run on client side
		if (typeof document === "undefined") return;

		const root = document.documentElement;

		if (resolvedTheme === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
	}, [resolvedTheme]);

	const value = {
		theme,
		setTheme,
		resolvedTheme,
	};

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
