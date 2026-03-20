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
import { FILTER_TYPE } from './enums';

import * as Yup from 'yup';
import PARAMETERS_CONFIG from './parameters';
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';

const EVENTS_CONFIG = {
  FORMS: {
    EVENT_ABOUT: {
      tabLabel: 'TableTabs.event.event',
      FIELDS: [
        {
          name: 'action',
          label: 'Event.TableHeader.action',
          type: 'RHFTextField',
          disableEdit: true,
          tab: 'event',
          path: 'event.action',
          getCurrentValue: (event) => event.action,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'activityId',
          label: 'Event.TableHeader.activityId',
          type: 'RHFTextField',
          disableEdit: true,
          tab: 'event',
          path: 'event.activityId',
          getCurrentValue: (event) => event.activityId,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'externalEventRef',
          label: 'Event.TableHeader.externalEventRef',
          type: 'RHFTextField',
          disableEdit: true,
          tab: 'event',
          path: 'event.externalEventRef',
          getCurrentValue: (event) => event.externalEventRef,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'organismId',
          label: 'Event.TableHeader.organismId',
          type: 'RHFAutocomplete',
          disableEdit: true,
          tab: 'event',
          path: 'event.organismId',
          getCurrentValue: (event) => event.organismId,
          parameterName: PARAMETERS_CONFIG.NAME.ORGANISMS,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'groupId',
          label: 'Event.TableHeader.groupId',
          type: 'RHFAutocomplete',
          tab: 'event',
          path: 'event.groupId',
          disableEdit: true,
          getCurrentValue: (event) => event.groupId,
          parameterName: PARAMETERS_CONFIG.NAME.GROUPS,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'periodSystem',
          label: 'Event.TableHeader.periodSystem',
          type: 'RHFSelect',
          tab: 'event',
          path: 'event.type.periodSystem',
          parameterName: PARAMETERS_CONFIG.NAME.EVENT_PERIOD_SYSTEM,
          disableEdit: true,
          getCurrentValue: (event) => event?.type?.periodSystem || null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'recurrencePeriod',
          label: 'Event.TableHeader.recurrencePeriod',
          type: 'RHFTextField',
          tab: 'event',
          path: 'event.type.recurrencePeriod',
          disableEdit: true,
          getCurrentValue: (event) => event?.type?.recurrencePeriod || null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'recurrencePeriodType',
          label: 'Event.TableHeader.recurrencePeriodType',
          type: 'RHFSelect',
          tab: 'event',
          path: 'event.type.recurrencePeriodType',
          parameterName: PARAMETERS_CONFIG.NAME.EVENT_RECURRENT_PERIOD_TYPE,
          disableEdit: true,
          getCurrentValue: (event) => event?.type?.recurrencePeriodType || null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'triggerDateMode',
          label: 'Event.TableHeader.triggerDateMode',
          type: 'RHFSelect',
          tab: 'event',
          disableEdit: true,
          path: 'event.type.triggerDateMode',
          parameterName: PARAMETERS_CONFIG.NAME.EVENT_TRIGGER_DATE_MODE,
          getCurrentValue: (event) => event?.type?.triggerDateMode || null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'executionMode',
          label: 'Event.TableHeader.ExecutionMode',
          parameterName: PARAMETERS_CONFIG.NAME.EVENT_EXECUTION_MODE,
          type: 'RHFSelect',
          tab: 'event',
          path: 'event.executionMode',
          hideOnBoxInfo: true,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (event) => event.executionMode,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'status',
          label: 'Event.TableHeader.Status',
          parameterName: PARAMETERS_CONFIG.NAME.EVENT_STATUS,
          type: 'RHFSelect',
          tab: 'event',
          path: 'event.status',
          hideOnBoxInfo: true,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (event) => event.status,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'triggerDate',
          label: 'Event.TableHeader.triggerDate',
          type: 'RHFDatePicker',
          tab: 'event',
          disableEdit: true,
          path: 'event.triggerDate',
          getCurrentValue: (event) => event.triggerDate,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'executionDate',
          label: 'Event.TableHeader.executionDate',
          type: 'RHFDatePicker',
          tab: 'event',
          path: 'event.executionDate',
          disableEdit: true,
          getCurrentValue: (event) => event.executionDate,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    EVENT_TAG: {
      tabLabel: 'TableTabs.event.tag',
      FIELDS: [
        {
          name: 'id',
          label: 'Event.TableHeader.tagId',
          type: 'RHFAutocomplete',
          tab: 'event.tag',
          path: 'event.tagType.id',
          disableEdit: true,
          dynamicFetching: { isDynamic: true, key: 'label' },
          getTranslatedValue: (event) => event?.tagType,
          getCurrentValue: (event) => event?.tagType?.id || null,
          parameterName: PARAMETERS_CONFIG.NAME.LAUNCHER_TAG_TYPE,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
  },
  COLUMNS: [
    {
      id: 'id',
      label: 'Event.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { beTransl: true, value: 'type', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'category',
      label: 'Event.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'eventCategory',
            value: 'type.category',
            type: 'text',
          },
          {
            translParam: 'eventSubCategory',
            value: 'type.subCategory',
            type: 'text',
          },
        ],
      },
    },

    {
      id: 'rank',
      label: 'Event.TableHeader.rank',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'rank', type: 'avatar' }],
      },
    },
    {
      id: 'executionMode',
      label: 'Event.TableHeader.executionMode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'eventExecutionMode',
            value: 'executionMode',
            type: 'text',
          },
          { value: 'triggerDate', type: 'date', icon: 'triggerDate' },
          { value: 'executionDate', type: 'datetime', icon: 'executionDate' },
        ],
      },
    },
    {
      id: 'action',
      label: 'Event.TableHeader.action',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'action', type: 'text' }],
      },
    },
    {
      id: 'holder',
      label: 'Event.TableHeader.holder',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'userHolder', tooltip: 'userName', type: 'logo' }],
      },
    },
    {
      id: 'activityId',
      label: 'Event.TableHeader.activityId',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'activityId', type: 'activity' }],
      },
    },
    {
      id: 'status',
      label: 'Event.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'event',
          },
        ],
      },
    },
  ],
  FILTERS: {
    STATUS: {
      index: 0,
      id: 'status',
      label: 'Event.FilterLabels.status',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.EVENT_STATUS,
    },
    ID_EVENT: {
      index: 1,
      id: 'id',
      label: 'Event.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    TYPE: {
      index: 2,
      id: 'eventType',
      label: 'Event.FilterLabels.EventType',
      type: FILTER_TYPE.AUTOCOMPLETE,
      category: 'eventType',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.EVENT_TEMPLATE,
    },
    CATEGORY: {
      index: 3,
      id: 'category',
      label: 'Event.FilterLabels.category',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.EVENT_CATEGORY,
    },
    SUB_CATEGORY: {
      index: 4,
      id: 'subCategory',
      label: 'Event.FilterLabels.subCategory',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.EVENT_SUBCATEGORY,
    },
    ID_ACTIVITY: {
      index: 5,
      id: 'activityId',
      label: 'Event.FilterLabels.activityId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    EXECUTION_MODE: {
      index: 6,
      id: 'executionMode',
      label: 'Event.FilterLabels.executionMode',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.EVENT_EXECUTION_MODE,
    },
    TRIGGER_DATE: {
      index: 7,
      id: 'triggerDate',
      label: 'Event.FilterLabels.triggerDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    EXECUTION_DATE: {
      index: 8,
      id: 'executionDate',
      label: 'Event.FilterLabels.executionDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    HOLDER: {
      index: 9,
      id: 'userHolder',
      label: 'Event.FilterLabels.holder',
      type: FILTER_TYPE.AUTOCOMPLETE,
      dynamicFetching: { isDynamic: true, key: 'userName' },
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      getOptionDisplay: (option) => `${option.userName}`,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.USERS,
    },
    GROUP: {
      index: 10,
      id: 'groupId',
      label: 'Event.FilterLabels.group',
      type: FILTER_TYPE.AUTOCOMPLETE,
      dynamicFetching: { isDynamic: true, key: 'groupName' },
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      getOptionDisplay: (option) => `${option.groupName}`,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.GROUPS,
    },
    ORGANISM: {
      index: 11,
      id: 'organismId',
      label: 'Event.FilterLabels.organism',
      type: FILTER_TYPE.AUTOCOMPLETE,
      dynamicFetching: { isDynamic: true, key: 'companyName' },
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      getOptionDisplay: (option) => `${option?.company?.companyName}`,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ORGANISMS,
    },
    EXTERNEL_EVENT_REF: {
      index: 12,
      id: 'externalEventRef',
      label: 'Event.FilterLabels.ExternalEventRef',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    RELATION_TYPE: {
      index: 13,
      id: 'relationType',
      label: 'Event.FilterLabels.relationType',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.RELATION_TYPE,

      child: {
        ID_OBJECT: {
          index: 14,
          id: 'objectId',
          label: 'Event.FilterLabels.objectId',
          type: FILTER_TYPE.TEXT_FIELD,
          size: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
          defaultValue: '',
        },
        REF_OBJECT: {
          index: 15,
          id: 'objectRef',
          label: 'Event.FilterLabels.objectRef',
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
    },
  },
};

export default EVENTS_CONFIG;
