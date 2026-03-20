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

export const serializeFilters = (filters, subject) => {
  const params = new URLSearchParams(window.location.search);
  const subjectKey = `${subject}_filter`;

  if (filters.length === 0) {
    // If filters array is empty, remove the subject filter
    params.delete(subjectKey);
  } else {
    // Convert filters into a query string
    const filterString = filters
      .map(([key, value]) => `${key}:${encodeURIComponent(value)}`)
      .join(',');

    params.set(subjectKey, filterString);
  }

  return params.toString();
};

export const deserializeFilters = (subject) => {
  const params = new URLSearchParams(window.location.search);
  const subjectKey = `${subject}_filter`;
  const filterString = params.get(subjectKey);

  if (!filterString) return [];

  return filterString.split(',').map((pair) => {
    const [key, value] = pair.split(':');
    return [key, decodeURIComponent(value)];
  });
};
