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

import PARAMETERS_CONFIG from './parameters';

const RELATIONS_CONFIG = {
  FILTERS: {
    FIRST_OBJECT: {
      index: 1,
      id: 'firstObjectId',
      label: 'Service.FilterLabels.category',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
    },
    SECOND_OBJECT: {
      index: 2,
      id: 'secondObjectId',
      label: 'Service.FilterLabels.category',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
    },
    RELATION_TYPE: {
      index: 0,
      id: 'releationType',
      label: 'Service.FilterLabels.subCategory',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.RELATION_TYPE,
    },
  },
};

export default RELATIONS_CONFIG;
