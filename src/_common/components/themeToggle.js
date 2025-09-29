import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/themeContext";

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const dropdownRef = useRef(null);

	const handleThemeChange = (newTheme) => {
		setTheme(newTheme);
		setIsOpen(false);
	};

	const themes = [
		{ value: "light", label: "Light", icon: "☀️" },
		{ value: "dark", label: "Dark", icon: "🌙" },
		{ value: "system", label: "System", icon: "💻" },
	];

	useEffect(() => {
		// Set client-side flag
		setIsClient(true);
	}, []);

	useEffect(() => {
		// Only run on client side
		if (typeof window === "undefined") return;

		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		const handleKeyDown = (event) => {
			if (!isOpen) return;

			const options = Array.from(dropdownRef.current?.querySelectorAll('button[role="menuitem"]') || []);
			const currentIndex = options.findIndex((option) => option === document.activeElement);

			switch (event.key) {
				case "ArrowDown": {
					event.preventDefault();
					const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
					options[nextIndex]?.focus();
					break;
				}
				case "ArrowUp": {
					event.preventDefault();
					const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
					options[prevIndex]?.focus();
					break;
				}
				case "Home": {
					event.preventDefault();
					options[0]?.focus();
					break;
				}
				case "End": {
					event.preventDefault();
					options[options.length - 1]?.focus();
					break;
				}
				default:
					// No action for other keys
					break;
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div className="relative ml-auto justify-end" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="group flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
				aria-label="Theme selector"
				aria-expanded={isOpen}
				aria-haspopup="true">
				<span className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "💻"}</span>
			</button>

			{isClient && isOpen && (
				<div className="absolute right-0 p-1 mt-2 w-48 border-0 bg-white dark:bg-slate-800 rounded-xl shadow-xl border z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200" role="menu" aria-label="Theme selection menu">
					{themes.map((themeOption, index) => (
						<button
							key={themeOption.value}
							role="menuitem"
							onClick={() => handleThemeChange(themeOption.value)}
							className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors duration-150 ${
								theme === themeOption.value ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
							} ${index === 0 ? "rounded-t-lg" : ""} ${index === themes.length - 1 ? "rounded-b-lg" : ""}`}
							aria-current={theme === themeOption.value ? "true" : "false"}
							aria-describedby={`theme-${themeOption.value}-description`}>
							<span className="text-lg" aria-hidden="true">
								{themeOption.icon}
							</span>
							<div className="flex-1">
								<div className="font-medium">{themeOption.label}</div>
								<div id={`theme-${themeOption.value}-description`} className="text-xs text-slate-500 dark:text-slate-400">
									{themeOption.value === "system" ? "Use system preference" : `Switch to ${themeOption.label.toLowerCase()} theme`}
								</div>
							</div>
							{theme === themeOption.value && (
								<svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ThemeToggle;
