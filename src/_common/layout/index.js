import React, { useRef, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { useLocation } from "@reach/router";

import i18n from "../../constants/i18n";
import { initWebVitals } from "../../constants/utils/webVitals";

import Seo from "./seo";

import ErrorBoundary from "../utils/errorBoundary";
import { ThemeProvider } from "../context/themeContext";

import Copyright from "../components/copyright";
import Languages from "../components/languages";
import ThemeToggle from "../components/themeToggle";

const Layout = ({ children, title, description, showWork, ...others }) => {
	const cvRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	const location = useLocation();

	// Only apply transitions to work pages
	const isWorkPage = location.pathname.startsWith("/work/");

	useEffect(() => {
		// Initialize Web Vitals tracking with error handling
		try {
			initWebVitals();
		} catch (error) {
			console.warn("Web Vitals initialization failed:", error);
		}

		// Simple slide-up animation for work pages
		if (isWorkPage) {
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 800); // Increased delay to show loading spinner

			return () => clearTimeout(timer);
		} else {
			// Normal page load for non-work pages
			setIsVisible(true);
		}
	}, [isWorkPage]);

	return (
		<React.Fragment>
			<Seo title={title} description={description} />
			<ThemeProvider>
				<I18nextProvider i18n={i18n}>
					<ErrorBoundary>
						<div className="flex flex-col gap-2 bg-slate-100 dark:bg-slate-900 p-2 font-google-sans-code" {...others}>
							<header className="flex flex-wrap justify-between align-center gap-2" role="banner">
								<Copyright />
								<nav className="flex items-center gap-2" role="navigation" aria-label="Site navigation">
									<ThemeToggle />
									<span className="hidden sm:block text-slate-500 dark:text-slate-500 sm:mx-2" aria-hidden="true">
										|
									</span>
									<Languages />
								</nav>
							</header>
							<div ref={cvRef} className={"max-w-5xl lg:max-w-full m-auto shadow-lg rounded-lg relative " + (showWork ? "mx-[2rem] w-[calc(100%-4rem)] mt-1 bg-white/90 dark:bg-slate-900" : "w-full bg-white dark:bg-slate-900")} id="main" role="main" aria-label="Main content">
								{isWorkPage && !isVisible && (
									<div className="flex flex-col justify-center items-center relative h-[100vh]" role="status" aria-live="polite">
										<div className="relative" aria-hidden="true">
											<div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 dark:border-slate-700"></div>
											<div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 absolute top-0 left-0"></div>
										</div>
										<p className="mt-4 text-sm text-slate-700 dark:text-slate-200 font-medium" aria-label="Loading page content">
											Loading...
										</p>
									</div>
								)}
								<div className={!isWorkPage ? "" : isVisible ? "page-transition-enter-active" : "page-transition-enter"}>{children}</div>
							</div>
						</div>
					</ErrorBoundary>
				</I18nextProvider>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default Layout;
