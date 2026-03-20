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

import { format, formatDistanceToNow, getTime, parseISO } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}
export function formatDate(date, newFormat) {
  return format(new Date(date), newFormat);
}
export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function formatAndUpdate(date, formatDate, callback) {
  let formattedDate;
  try {
    formattedDate = format(date, formatDate);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error formating & updating date:', e);
    formattedDate = date;
  }

  if (typeof callback === 'function') {
    callback(formattedDate);
    return formattedDate;
  }
}

export function FormatDateOrDefault(date, translate, dateType, formatDate) {
  const formatter = formatDate || translate(`common.dateFormats.${dateType}`);
  if (!date) return '-';
  try {
    return format(parseISO(date), formatter);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error formating date:', e);
    return '-';
  }
}
