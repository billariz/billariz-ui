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

import { MultilineCellRenderer } from 'src/components/table/cell/renderer';
import PARAMETERS_CONFIG from './parameters';
import { FILTER_TYPE } from './enums';

const ACTIVITY_TYPE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'ActivityTemplate.activityType.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'category',
      label: 'ActivityTemplate.activityType.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'category', type: 'text' }],
      },
    },
    {
      id: 'subCategory',
      label: 'ActivityTemplate.activityType.subCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'subCategory', type: 'text' }],
      },
    },
    {
      id: 'defautLabel',
      label: 'ActivityTemplate.activityType.label',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultLabel', type: 'text' }],
      },
    },
  ],
  FILTER: {
    CATEGORY: {
      index: 0,
      id: 'category',
      label: 'ActivityTemplate.activityType.category',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_CATEGORY,
    },
    SUBCATEGORY: {
      index: 1,
      id: 'subCategory',
      label: 'ActivityTemplate.activityType.subCategory',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_SUBCATEGORY,
    },
    ID: {
      index: 2,
      id: 'id',
      label: 'ActivityTemplate.activityType.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'id',
        label: 'ActivityTemplate.activityType.id',
        type: 'RHFTextField',
        getCurrentValue: (activityType) => activityType.id,
        size: {
          xs: 6,
          sm: 6,
          md: 12,
          lg: 12,
        },
        show: true,
      },
      {
        name: 'category',
        label: 'ActivityTemplate.activityType.category',
        type: 'RHFSelect',
        parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_CATEGORY,
        getCurrentValue: (activityType) => activityType.category,
        getDefaultValue: () => '*',
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'subCategory',
        label: 'ActivityTemplate.activityType.subCategory',
        type: 'RHFSelect',
        parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_SUBCATEGORY,
        getCurrentValue: (activityType) => activityType.subCategory,
        getDefaultValue: () => '*',
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'defaultLabel',
        label: 'ActivityTemplate.activityType.defaultLabel',
        type: 'RHFTextField',
        getCurrentValue: (activityType) => activityType.defaultLabel,
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'standardLabel',
        label: 'ActivityTemplate.activityType.standardLabel',
        type: 'RHFTextField',
        getCurrentValue: (activityType) => activityType.standardLabel,
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
    ],
  },
};

export default ACTIVITY_TYPE_CONFIG;
