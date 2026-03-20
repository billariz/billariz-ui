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

// ----------------------------------------------------------------------

export default function getColorName(hex) {
  let color;

  switch (hex) {
    case '#3949ab':
      color = 'Green';
      break;
    case '#000000':
      color = 'Black';
      break;
    case '#FFFFFF':
      color = 'White';
      break;
    case '#FFC0CB':
      color = 'Pink';
      break;
    case '#FF4842':
      color = 'Red';
      break;
    case '#1890FF':
      color = 'Blue';
      break;
    case '#94D82D':
      color = 'Greenyellow';
      break;
    case '#FFC107':
      color = 'Orange';
      break;
    default:
      color = hex;
  }

  return color;
}
