import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../_common/layout";

const NotFoundPage = () => {
	const { t } = useTranslation();

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.25em)] p-8 text-center">
				<h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
				<h2 className="text-2xl text-gray-800 mb-1">{t("404.title", "Page Not Found")}</h2>
				<p className="text-lg font-regular text-gray-400 mb-8 max-w-md">{t("404.description", "Sorry, the page you are looking for does not exist.")}</p>
				<a href="/" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
					{t("404.backHome", "Back to Home")}
				</a>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
