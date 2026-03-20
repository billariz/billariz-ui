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
import { FILTER_TYPE } from './enums';
import PARAMETERS_CONFIG from './parameters';

const EVENT_TEMPLATE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'ActivityTemplate.eventTemplate.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'defaultExecutionMode',
      label: 'ActivityTemplate.eventTemplate.defaultExecutionMode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultExecutionMode', type: 'text' }],
      },
    },
    {
      id: 'category',
      label: 'ActivityTemplate.eventTemplate.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'category', type: 'text' },
          { value: 'subCategory', type: 'text' },
        ],
      },
    },
    {
      id: 'launcherTagType',
      label: 'ActivityTemplate.eventTemplate.launcherTagType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'launcherTagType',
            type: 'label',
            color: (status) => getColors(status),
          },
        ],
      },
    },
    {
      id: 'defaultStatus',
      label: 'ActivityTemplate.eventTemplate.defaultStatus',
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
    {
      id: 'action',
      label: 'ActivityTemplate.eventTemplate.action',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'action', type: 'text' }],
      },
    },
    {
      id: 'defaultHolder',
      label: 'ActivityTemplate.eventTemplate.defaultHolder',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultHolder', type: 'text' }],
      },
    },
    {
      id: 'group',
      label: 'ActivityTemplate.eventTemplate.group',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'group', type: 'text' },
          { value: 'subGroup', type: 'text' },
        ],
      },
    },
    {
      id: 'triggerDateMode',
      label: 'ActivityTemplate.eventTemplate.triggerDateMode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'triggerDateMode', type: 'text' },
          { value: 'periodSystem', type: 'text' },
        ],
      },
    },
    {
      id: 'recurrencePeriod',
      label: 'ActivityTemplate.eventTemplate.recurrencePeriod',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'recurrencePeriod', type: 'text' },
          { value: 'recurrencePeriodType', type: 'text' },
        ],
      },
    },
  ],
  FILTER: {
    CATEGORY: {
      index: 0,
      id: 'category',
      label: 'ActivityTemplate.eventTemplate.category',
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
      label: 'ActivityTemplate.eventTemplate.subCategory',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: 'eventSubCategory',
    },
    EVENTEXECUTIONMODE: {
      index: 2,
      id: 'defaultExecutionMode',
      label: 'ActivityTemplate.eventTemplate.defaultExecutionMode',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: 'eventExecutionMode',
    },
    HOLDER: {
      index: 3,
      id: 'defaultHolder',
      label: 'ActivityTemplate.eventTemplate.defaultHolder',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: 'holder',
    },
    TRIGGERDATEMODE: {
      index: 4,
      id: 'triggerDateMode',
      label: 'ActivityTemplate.eventTemplate.triggerDateMode',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: 'eventTriggerDateMode',
    },
    PERIODSYSTEM: {
      index: 5,
      id: 'periodSystem',
      label: 'ActivityTemplate.eventTemplate.periodSystem',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: 'eventPeriodSystem',
    },
    LAUNCHERTAGTYPE: {
      index: 6,
      id: 'launcherTagType',
      label: 'ActivityTemplate.eventTemplate.launcherTagType',
      type: 'autocomplete',
      category: 'launcherTagType',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.LAUNCHER_TAG_TYPE,
    },
    ID: {
      index: 7,
      id: 'id',
      label: 'ActivityTemplate.eventTemplate.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
      parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_ID,
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'id',
        label: 'ActivityTemplate.eventTemplate.id',
        type: 'RHFTextField',
        getCurrentValue: (eventTemplate) => eventTemplate.id,
        show: true,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'category',
        label: 'ActivityTemplate.eventTemplate.category',
        type: 'RHFSelect',
        parameterName: PARAMETERS_CONFIG.NAME.EVENT_CATEGORY,
        getCurrentValue: (eventTemplate) => eventTemplate.category,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
        getDefaultValue: () => '*',
      },
      {
        name: 'subCategory',
        label: 'ActivityTemplate.eventTemplate.subCategory',
        type: 'RHFSelect',
        parameterName: PARAMETERS_CONFIG.NAME.EVENT_SUBCATEGORY,
        getCurrentValue: (eventTemplate) => eventTemplate.subCategory,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
        getDefaultValue: () => '*',
      },
      {
        name: 'defaultExecutionMode',
        label: 'ActivityTemplate.eventTemplate.defaultExecutionMode',
        type: 'RHFSelect',
        parameterName: 'eventExecutionMode',
        getCurrentValue: (eventTemplate) => eventTemplate.defaultExecutionMode,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
        getDefaultValue: () => '*',
      },
      {
        name: 'defaultStatus',
        label: 'ActivityTemplate.eventTemplate.defaultStatus',
        type: 'RHFSelect',
        parameterName: 'eventStatus',
        getCurrentValue: (activityType) => activityType.defaultStatus,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
        getDefaultValue: () => '*',
      },
      {
        name: 'action',
        label: 'ActivityTemplate.eventTemplate.action',
        type: 'RHFTextField',
        getCurrentValue: (eventTemplate) => eventTemplate.action,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'defaultHolder',
        label: 'ActivityTemplate.eventTemplate.defaultHolder',
        type: 'RHFSelect',
        getCurrentValue: (activityType) => activityType.defaultHolder,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
        parameterName: 'eventDefaultHolder',
        getDefaultValue: () => '*',
      },
      {
        name: 'organismId',
        label: 'ActivityTemplate.eventTemplate.entity',
        type: 'RHFAutocomplete',
        getCurrentValue: (eventTemplate) => eventTemplate.organismId,
        parameterName: PARAMETERS_CONFIG.NAME.ORGANISMS,
        category: 'entity',
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'groupId',
        label: 'ActivityTemplate.eventTemplate.group',
        type: 'RHFAutocomplete',
        getCurrentValue: (eventTemplate) => eventTemplate.groupId,
        parameterName: PARAMETERS_CONFIG.NAME.GROUPS,
        category: 'group',
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'triggerDateMode',
        label: 'ActivityTemplate.eventTemplate.triggerDateMode',
        type: 'RHFSelect',
        getCurrentValue: (eventTemplate) => eventTemplate.triggerDateMode,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
        parameterName: 'eventTriggerDateMode',
        getDefaultValue: () => '*',
      },
      {
        name: 'periodSystem',
        label: 'ActivityTemplate.eventTemplate.periodSystem',
        type: 'RHFSelect',
        getCurrentValue: (eventTemplate) => eventTemplate.periodSystem,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
        parameterName: 'eventPeriodSystem',
        getDefaultValue: () => '*',
      },
      {
        name: 'recurrencePeriod',
        label: 'ActivityTemplate.eventTemplate.recurrencePeriod',
        type: 'RHFTextField',
        getCurrentValue: (eventTemplate) => eventTemplate.recurrencePeriod,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'recurrencePeriodType',
        label: 'ActivityTemplate.eventTemplate.recurrencePeriodType',
        type: 'RHFSelect',
        getCurrentValue: (eventTemplate) => eventTemplate.recurrencePeriodType,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
        parameterName: 'eventRecurrencePeriodType',
        getDefaultValue: () => '*',
      },
      {
        name: 'defaultLabel',
        label: 'ActivityTemplate.eventTemplate.defaultLabel',
        type: 'RHFTextField',
        getCurrentValue: (eventTemplate) => eventTemplate.defaultLabel,
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'standardLabel',
        label: 'ActivityTemplate.eventTemplate.standardLabel',
        type: 'RHFTextField',
        getCurrentValue: (eventTemplate) => eventTemplate.standardLabel,
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'launcherTagType',
        label: 'ActivityTemplate.eventTemplate.launcherTagType',
        type: 'RHFAutocomplete',
        getCurrentValue: (eventTemplate) => eventTemplate.launcherTagType,
        parameterName: PARAMETERS_CONFIG.NAME.LAUNCHER_TAG_TYPE,
        category: 'launcherTagType',
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
    ],
  },
};

export default EVENT_TEMPLATE_CONFIG;
