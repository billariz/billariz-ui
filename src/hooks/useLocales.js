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

import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    locale: 'en',
  },
];

export default function useLocales() {
  const storedLanguages = JSON.parse(window.localStorage.getItem('languages'));
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang =
    storedLanguages?.find((_lang) => _lang.locale === langStorage) ||
    navigator.language.split('-')[0] ||
    LANGS[0].locale;

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  const translateBackend = (object) => {
    if (!object) return 'No translation available';
    return object[currentLang.labelColumn] || 'Translation missing';
  };

  return {
    translate,
    translateBackend,
    currentLang,
    onChangeLang: handleChangeLanguage,
    allLang: storedLanguages || LANGS,
  };
}
