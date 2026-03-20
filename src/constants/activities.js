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
import RelationsCellRenderer from 'src/components/table/cell/renderer/RelationsCellRender';
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';
import { FILTER_TYPE } from './enums';
import PARAMETERS_CONFIG from './parameters';

import * as Yup from 'yup';

const ACTIVITIES_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Activity.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { beTransl: true, value: 'activityType', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'category',
      label: 'Activity.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'activityCategory', value: 'category', type: 'text' },
          {
            translParam: 'activitySubCategory',
            value: 'subCategory',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'startDate',
      label: 'Activity.TableHeader.period',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'startDate', type: 'datetime' },
          { value: 'endDate', type: 'datetime' },
        ],
      },
    },
    {
      id: 'label',
      label: 'Activity.TableHeader.relations',
      align: 'left',
      cell: {
        renderer: RelationsCellRenderer,
        value: [{ value: 'relations', type: 'activity' }],
      },
    },
    {
      id: 'creatdBy',
      label: 'Activity.TableHeader.creatdBy',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'createdByUser', tooltip: 'userName', type: 'logo' }],
      },
    },
    {
      id: 'status',
      label: 'Activity.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'activity',
          },
        ],
      },
    },
  ],
  FILTERS: {
    STATUS: {
      index: 0,
      id: 'status',
      label: 'Activity.FilterLabels.status',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_STATUS,
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'Activity.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ACTIVITY_TYPE: {
      index: 2,
      id: 'type',
      label: 'Activity.FilterLabels.activityType',
      type: FILTER_TYPE.AUTOCOMPLETE,
      category: 'activity',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_TYPE,
    },
    CATEGORY: {
      index: 3,
      id: 'category',
      label: 'Activity.FilterLabels.category',
      type: FILTER_TYPE.SELECT_BOX,
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
      index: 4,
      id: 'subCategory',
      label: 'Activity.FilterLabels.subCategory',
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
    START_DATE: {
      index: 5,
      id: 'startDate',
      label: 'Activity.FilterLabels.startDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    END_DATE: {
      index: 6,
      id: 'endDate',
      label: 'Activity.FilterLabels.endDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },

    RELATION_TYPE: {
      index: 7,
      id: 'relationType',
      label: 'Activity.FilterLabels.relationType',
      type: FILTER_TYPE.SELECT_BOX,
      defaultValue: '*',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      parameterName: PARAMETERS_CONFIG.NAME.RELATION_TYPE,
      child: {
        ID_OBJECT: {
          index: 8,
          id: 'objectId',
          label: 'Activity.FilterLabels.objectId',
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
  FORMS: {
    ACTIVITY_ABOUT: {
      tabLabel: 'TableTabs.Activity',
      FIELDS: [
        {
          name: 'category',
          label: 'Activity.TableHeader.category',
          type: 'RHFSelect',
          hideOnBoxInfo: true,
          disableEdit: true,
          parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_CATEGORY,
          getCurrentValue: (activity) => activity.category,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'subCategory',
          label: 'Activity.TableHeader.subCategory',
          type: 'RHFSelect',
          hideOnBoxInfo: true,
          disableEdit: true,
          parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_SUBCATEGORY,
          getCurrentValue: (activity) => activity.subCategory,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'startDate',
          label: 'Activity.TableHeader.startDate',
          type: 'RHFDatePicker',
          hideOnBoxInfo: true,
          disableEdit: true,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (activity) => activity.startDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'endDate',
          label: 'Activity.TableHeader.endDate',
          type: 'RHFDatePicker',
          hideOnBoxInfo: true,
          disableEdit: true,
          getCurrentValue: (activity) => activity.endDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'type',
          label: 'Activity.TableHeader.type',
          type: 'RHFAutocomplete',
          getTranslatedValue: (activity) => activity?.activityType,
          getCurrentValue: (activity) => activity.type,
          parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_TYPE,
          disableEdit: true,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'status',
          label: 'Activity.TableHeader.status',
          type: 'RHFSelect',
          hideOnBoxInfo: true,
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_STATUS,
          getCurrentValue: (activity) => activity.status,
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
};

export default ACTIVITIES_CONFIG;
