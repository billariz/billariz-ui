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

/* eslint-disable no-console */
import i18n from 'i18next';
import axios from 'axios';
import ENDPOINTS from 'src/constants/enums/endpoints';
import { HOST_API } from '../config';

async function fetchDynamicParameters(token) {
  try {
    const currentGroup = localStorage.getItem('currentGroup');
    const baseURL = HOST_API.replace('__GROUP__', currentGroup);
    const url = `${baseURL}${ENDPOINTS.PARAMETERS_ALL}`;
    const response = await axios.get(url, {
      headers: { Authorization: token },
    });

    const { parameters } = response.data._embedded;

    if (!parameters || parameters.length === 0) {
      console.warn('No parameters found');
      return;
    }

    const storedLanguages = window.localStorage.getItem('languages');
    const languages = storedLanguages ? JSON.parse(storedLanguages) : [];

    if (!languages || languages.length === 0) {
      console.warn('No languages found in localStorage');
      return;
    }

    // Initialisation des traductions pour chaque langue
    const translations = {};
    languages.forEach((lng) => {
      translations[lng.locale] = { translations: {} };
    });

    // Ajout des traductions aux bundles
    parameters.forEach((param) => {
      languages.forEach((lng) => {
        const { locale, labelColumn } = lng;
        if (param[labelColumn]) {
          translations[locale].translations[
            `param_${param.name}.${param.value}`
          ] = param[labelColumn];
        }
      });
    });

    // Ajout des traductions dans i18n
    languages.forEach((lng) => {
      const { locale } = lng;
      i18n.addResourceBundle(
        locale,
        'translations',
        translations[locale].translations,
        true
      );
    });

    // Sauvegarde dans localStorage
    window.localStorage.setItem('translations', JSON.stringify(translations));
  } catch (error) {
    console.error('Failed to load dynamic parameters:', error);
  }
}

async function fetchDynamicLanguages(token) {
  try {
    const currentGroup = localStorage.getItem('currentGroup');
    const baseURL = HOST_API.replace('__GROUP__', currentGroup);
    const url = `${baseURL}${ENDPOINTS.LANGUAGE_MAPPING_FIND}`;
    const response = await axios.get(url, {
      headers: { Authorization: token },
    });
    const languages = response.data._embedded.languageMappings.filter(
      (lang) => lang.active
    );

    languages.forEach((lang) => {
      const translations = require(`src/locales/${lang.locale}.json`);
      i18n.addResourceBundle(lang.locale, 'translations', translations);
    });

    // Save languages to localStorage
    window.localStorage.setItem('languages', JSON.stringify(languages));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load dynamic languages:', error);
  }
}

export async function loadDynamicParameters(token) {
  const storedTranslations = window.localStorage.getItem('translations');
  const storedLanguages = window.localStorage.getItem('languages');

  if (!storedTranslations) {
    await fetchDynamicParameters(token);
    if (!storedLanguages) {
      await fetchDynamicLanguages(token);
    }
  } else {
    // If translations are already in localStorage, skip fetching them
    const translations = JSON.parse(storedTranslations);
    const languages = JSON.parse(storedLanguages); // Ajout pour parser les langues correctement

    // Ajouter les traductions pour chaque langue active
    languages.forEach((lg) => {
      const { locale } = lg;
      if (translations[locale]) {
        i18n.addResourceBundle(
          locale,
          'translations',
          translations[locale].translations,
          true
        );
      }
    });
  }
  // else {
  //   // If translations are not in localStorage, fetch and store them from the API
  //   await fetchDynamicParameters(token);
  // }
  // if (!storedLanguages) {
  //   await fetchDynamicLanguages(token);
  // }
}
