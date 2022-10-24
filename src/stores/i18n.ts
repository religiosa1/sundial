import i18next from "i18next";
import { createI18nStore } from "svelte-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    debug: true,
    load: 'languageOnly',
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "locale",
    },
    fallbackLng: "en",
    ns: [ "clock" ],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false, // not needed for svelte as it escapes by default
    }
  });

i18next.on('languageChanged', (lngRegExt) => {
  const [lng] = lngRegExt.split(',');
  document.documentElement.setAttribute("lang", lng);
});

export const i18n = createI18nStore(i18next);