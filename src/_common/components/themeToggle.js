import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/themeContext";

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
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

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, []);

	return (
		<div className="relative ml-auto justify-end" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="group flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
				aria-label="Theme selector"
				aria-expanded={isOpen}
				aria-haspopup="true">
				<span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "💻"}</span>
			</button>

			{isOpen && (
				<div className="absolute right-0 p-1 mt-2 w-48 border-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
					{themes.map((themeOption, index) => (
						<button
							key={themeOption.value}
							onClick={() => handleThemeChange(themeOption.value)}
							className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors duration-150 ${
								theme === themeOption.value ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
							} ${index === 0 ? "rounded-t-lg" : ""} ${index === themes.length - 1 ? "rounded-b-lg" : ""}`}>
							<span className="text-lg">{themeOption.icon}</span>
							<div className="flex-1">
								<div className="font-medium">{themeOption.label}</div>
							</div>
							{theme === themeOption.value && (
								<svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
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
