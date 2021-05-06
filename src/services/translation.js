import i18n from "i18next";
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    supportedLngs: ['pl', 'en', 'de', 'fr', 'ru'],
    fallbackLng: 'en',
    detection:{
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend:{
      loadPath: '/translations/{{lng}}.json',
    },
    react: { useSuspense: false}
  });
  