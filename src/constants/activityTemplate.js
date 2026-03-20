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
import { getColors } from 'src/utils/getColors';
import PARAMETERS_CONFIG from './parameters';
import { FILTER_TYPE } from './enums';

const ACTIVITY_TEMPLATE_CONFIG = {
  COLUMNS: [
    {
      id: 'activityType',
      label: 'ActivityTemplate.activityTemplateConfig.activityType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'type.defaultLabel', type: 'text' },
          { value: 'type.id', type: 'text' },
        ],
      },
    },
    {
      id: 'eventType',
      label: 'ActivityTemplate.activityTemplateConfig.eventType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'eventTemplate.defaultLabel', type: 'text' },
          { value: 'eventTemplate.id', type: 'text' },
        ],
      },
    },
    {
      id: 'rank',
      label: 'ActivityTemplate.activityTemplateConfig.rank',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'rank', type: 'avatar' }],
      },
    },
    {
      id: 'startDatePeriod',
      label: 'ActivityTemplate.activityTemplateConfig.startDatePeriod',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'startDatePeriod', type: 'text' }],
      },
    },
    {
      id: 'defaultStatus',
      label: 'ActivityTemplate.activityTemplateConfig.defaultStatus',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'defaultStatus',
            type: 'label',
            color: (status) => getColors(status),
          },
        ],
      },
    },
  ],
  FILTER: {
    DEFAULT_STATUS: {
      index: 0,
      id: 'defaultStatus',
      label: 'ActivityTemplate.activityTemplateConfig.defaultStatus',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: 'activityStatus',
    },
    RANK: {
      index: 1,
      id: 'rank',
      label: 'ActivityTemplate.activityTemplateConfig.rank',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
      parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_TEMPLATE_RANK,
    },
    ACTIVITY_TYPE: {
      index: 2,
      id: 'activityType',
      label: 'ActivityTemplate.activityTemplateConfig.activityType',
      type: 'autocomplete',
      category: 'activity',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_TYPE,
    },
    EVENT_TEMPLATE: {
      index: 3,
      id: 'eventType',
      label: 'ActivityTemplate.activityTemplateConfig.eventType',
      type: 'autocomplete',
      category: 'event',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: 'eventTemplates',
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'activityType',
        label: 'ActivityTemplate.activityTemplateConfig.activityType',
        type: 'RHFAutocomplete',
        category: 'activity',
        parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_TYPE,
        getCurrentValue: (parameter) => parameter.type,
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'eventType',
        label: 'ActivityTemplate.activityTemplateConfig.eventType',
        type: 'RHFAutocomplete',
        getCurrentValue: (activityTemplate) => activityTemplate.eventTemplate,
        parameterName: 'eventTemplates',
        category: 'event',
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'rank',
        label: 'ActivityTemplate.activityTemplateConfig.rank',
        type: 'RHFTextField',
        getCurrentValue: (activityType) => activityType.rank,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'startDatePeriod',
        label: 'ActivityTemplate.activityTemplateConfig.startDatePeriod',
        type: 'RHFTextField',
        getCurrentValue: (activityType) => activityType.startDatePeriod,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'defaultStatus',
        label: 'ActivityTemplate.activityTemplateConfig.defaultStatus',
        type: 'RHFSelect',
        parameterName: 'activityStatus',
        getCurrentValue: (activityType) => activityType.defaultStatus,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
        getDefaultValue: () => '*',
      },
    ],
  },
};

export default ACTIVITY_TEMPLATE_CONFIG;
