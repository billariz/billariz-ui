/**
 * Copyright (C) 2025 Uppli SAS — Billariz
 *
 * This file is part of Billariz, licensed under the GNU Affero General
 * Public License v3.0 (AGPL-3.0). You may use, modify and distribute
 * this software under the terms of the AGPL-3.0.
 *
 * For commercial use without AGPL obligations, contact:
 * contact@billariz.com | contact@uppli.fr
 * https://billariz.com
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import static translations
import enStatic from './landingEn.json';
import frStatic from './landingFr.json';
import esStatic from './landingEs.json';

// ----------------------------------------------------------------------

// Retrieve stored languages or fallback to English
const storedLanguages = window.localStorage.getItem('languages');
const languages = storedLanguages
  ? JSON.parse(storedLanguages)
  : [{ locale: 'en' }];

// Base resources with static translations
let resources = {
  en: { translations: enStatic },
  fr: { translations: frStatic },
  es: { translations: esStatic },
};

// Function to dynamically load JSON translations and merge them
const loadTranslations = async () => {
  await Promise.all(
    languages.map(async (langObj) => {
      const lang = langObj.locale;
      if (!resources[lang]) {
        resources[lang] = { translations: {} }; // Ensure key exists
      }

      try {
        const translations = await import(`./${lang}.json`);
        resources[lang] = {
          translations: {
            ...resources[lang].translations, // Keep existing translations
            ...translations.default, // Merge new translations
          },
        };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`The translation file for '${lang}' is missing.`, error);
      }
    })
  );
};

// Initialize i18n after merging translations
loadTranslations().then(() => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng:
        localStorage.getItem('i18nextLng') ||
        navigator.language.split('-')[0] ||
        'en',
      fallbackLng:
        localStorage.getItem('i18nextLng') ||
        navigator.language.split('-')[0] ||
        'en',
      debug: false,
      ns: ['translations'],
      defaultNS: 'translations',
      interpolation: {
        escapeValue: false,
      },
    });
});

export default i18n;
