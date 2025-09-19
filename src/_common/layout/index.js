import React, { useRef } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "../../constants/i18n";
import "../../assets/stylesheets/index.scss";

import Seo from "./seo";
import Copyright from "../components/copyright";
import Languages from "../components/languages";
import ThemeToggle from "../components/themeToggle";
import { ThemeProvider } from "../context/themeContext";

const Layout = ({ children, ...others }) => {
	const cvRef = useRef(null);
	return (
		<React.Fragment>
			<Seo />
			<ThemeProvider>
				<I18nextProvider i18n={i18n}>
					<div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-900 p-2 font-[Rubik]" {...others}>
						<div className="flex flex-wrap justify-between align-center gap-2">
							<Copyright />
							<ThemeToggle />
							<span className="hidden sm:block text-gray-200 dark:text-gray-700 sm:mx-2">|</span>
							<Languages />
						</div>
						<div ref={cvRef} className="w-full max-w-5xl lg:max-w-full m-auto shadow-lg rounded-lg bg-white dark:bg-gray-800" id="main" role="main">
							{children}
						</div>
					</div>
				</I18nextProvider>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default Layout;
