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

export default function transformEmptyString(obj) {
  if (typeof obj === 'object' && obj !== null) {
    const newObj = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        // If value is an empty string => set it to null
        if (value === '') {
          newObj[key] = null;
        }
        // If value is an object or array => parse it recursively
        else if (typeof value === 'object' && value !== null) {
          const nestedValue = transformEmptyString(value);

          if (
            (typeof nestedValue === 'object' &&
              Object.keys(nestedValue).length > 0) ||
            Array.isArray(value)
          ) {
            newObj[key] = nestedValue;
          }
        } else {
          newObj[key] = value;
        }
      }
    }

    return newObj;
  }

  return obj;
}
