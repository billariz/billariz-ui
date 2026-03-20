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

export const TRANSITION = {
  duration: 2,
  ease: [0.43, 0.13, 0.23, 0.96]
};

export const varPath = {
  animate: {
    fillOpacity: [0, 0, 1],
    pathLength: [1, 0.4, 0],
    transition: TRANSITION
  }
};
