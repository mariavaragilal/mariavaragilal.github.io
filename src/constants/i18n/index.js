import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LOCALES from "./locales";

const resources = {
	en: { translation: LOCALES.en },
	pt: { translation: LOCALES.pt },
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en", // default language
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
