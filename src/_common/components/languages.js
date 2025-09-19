import React from "react";
import { useTranslation } from "react-i18next";

const Languages = () => {
	const { i18n } = useTranslation();

	return (
		<div className="flex rounded-t-lg lg:rounded-none  gap-1 sm:gap-2 align-center justify-end">
			<button onClick={() => i18n.changeLanguage("en")} className={"px-3 py-1 font-bold text-[.75em] rounded-xl " + (i18n.language === "en" ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-300")}>
				EN
			</button>
			<button onClick={() => i18n.changeLanguage("pt")} className={"px-3 py-1 font-bold text-[.75em] rounded-xl " + (i18n.language === "pt" ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-300")}>
				PT
			</button>
		</div>
	);
};

export default Languages;
