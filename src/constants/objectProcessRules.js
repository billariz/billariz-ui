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
import { FILTER_TYPE } from './enums';
import * as Yup from 'yup';
import { MultilineCellRenderer } from 'src/components/table/cell/renderer';

const OBJECT_PROCESS_RULE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Rule.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'objectType',
      label: 'Rule.TableHeader.objectType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'objectType',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'initialStatus',
      label: 'Rule.TableHeader.initialStatus',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'initialStatus', type: 'text' }],
      },
    },
    {
      id: 'newStatus',
      label: 'Rule.TableHeader.newStatus',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'newStatus',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'seller',
      label: 'Rule.TableHeader.seller',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'seller', type: 'text' }],
      },
    },
    {
      id: 'channel',
      label: 'Rule.TableHeader.channel',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'channel', type: 'text' }],
      },
    },
    {
      id: 'direction',
      label: 'Rule.TableHeader.direction',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'direction', type: 'text' }],
      },
    },
    {
      id: 'serviceCategory',
      label: 'Rule.TableHeader.serviceCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'serviceCategory', type: 'text' }],
      },
    },
    {
      id: 'serviceSubCategory',
      label: 'Rule.TableHeader.serviceSubCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'serviceSubCategory',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'customerCategory',
      label: 'Rule.TableHeader.customerCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'customerCategory', type: 'text' }],
      },
    },
    {
      id: 'market',
      label: 'Rule.TableHeader.market',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'market', type: 'text' }],
      },
    },
    {
      id: 'finalStatus',
      label: 'Rule.TableHeader.finalStatus',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'finalStatus', type: 'text' }],
      },
    },
    {
      id: 'activityType',
      label: 'Rule.TableHeader.activityType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'activityType', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    OBJECT_TYPE: {
      index: 0,
      id: 'objectType',
      label: 'Rule.FilterLabels.objectType',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.OBJECT_TYPE,
    },
    ACTIVITY_TYPE: {
      index: 1,
      id: 'activityType',
      label: 'Rule.FilterLabels.activityType',
      type: 'autocomplete',
      category: 'activity',
      //enumId: 'activityType',
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
    ID_RULE: {
      index: 2,
      id: 'Id',
      label: 'Rule.FilterLabels.id',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      defaultValue: '',
    },
  },
  FORMS: {
    OBJECT_PROCESS_RULE: {
      FIELDS: [
        {
          name: 'objectType',
          label: 'Rule.TableHeader.objectType',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.OBJECT_TYPE,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (objectProcessRule) => objectProcessRule.objectType,
          getDefaultValue: () => '',
          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'serviceCategory',
          label: 'Rule.TableHeader.serviceCategory',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_CATEGORY,
          validation: Yup.string(),
          getCurrentValue: (objectProcessRule) =>
            objectProcessRule.serviceCategory,
          getDefaultValue: () => '*',

          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'serviceSubCategory',
          label: 'Rule.TableHeader.serviceSubCategory',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_SUBCATEGORY,
          validation: Yup.string(),
          getCurrentValue: (objectProcessRule) =>
            objectProcessRule.serviceSubCategory,
          getDefaultValue: () => '*',

          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'customerCategory',
          label: 'Rule.TableHeader.customerCategory',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_CATEGORY,
          validation: Yup.string(),
          getCurrentValue: (objectProcessRule) =>
            objectProcessRule.customerCategory,
          getDefaultValue: () => '*',

          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'initialStatus',
          label: 'Rule.TableHeader.initialStatus',
          type: 'RHFTextField',
          getCurrentValue: (objectProcessRule) =>
            objectProcessRule.initialStatus || null,
          getDefaultValue: () => null,
          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'newStatus',
          label: 'Rule.TableHeader.newStatus',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (objectProcessRule) =>
            objectProcessRule.newStatus || null,
          getDefaultValue: () => null,
          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'seller',
          label: 'Rule.TableHeader.seller',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.SELLER,
          validation: Yup.string(),
          getCurrentValue: (objectProcessRule) => objectProcessRule.seller,
          getDefaultValue: () => '*',

          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'channel',
          label: 'Rule.TableHeader.channel',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.CHANNEL,
          validation: Yup.string(),
          getCurrentValue: (objectProcessRule) => objectProcessRule.channel,
          getDefaultValue: () => '*',

          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'direction',
          label: 'Rule.TableHeader.direction',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
          validation: Yup.string(),
          getCurrentValue: (objectProcessRule) => objectProcessRule.direction,
          getDefaultValue: () => '*',

          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },

        {
          name: 'market',
          label: 'Rule.TableHeader.market',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.MARKET,
          validation: Yup.string(),
          getCurrentValue: (objectProcessRule) => objectProcessRule.market,
          getDefaultValue: () => '*',

          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'finalStatus',
          label: 'Rule.TableHeader.finalStatus',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (objectProcessRule) =>
            objectProcessRule.finalStatus || null,
          getDefaultValue: () => null,
          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'activityType',
          label: 'Rule.TableHeader.activityType',
          type: 'RHFAutocomplete',
          category: 'activity',
          getCurrentValue: (objectProcessRule) =>
            objectProcessRule.activityType || null,
          getDefaultValue: () => null,
          parameterName: PARAMETERS_CONFIG.NAME.ACTIVITY_TYPE,
          size: {
            xs: 6,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
      ],
    },
  },
};

export default OBJECT_PROCESS_RULE_CONFIG;
