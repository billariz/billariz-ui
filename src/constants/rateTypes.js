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

const RATE_TYPE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'ServiceElement.TableHeader.type',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'category',
      label: 'ServiceElement.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'category', type: 'text' }],
      },
    },
    {
      id: 'subCategory',
      label: 'ServiceElement.TableHeader.subCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'subCategory', type: 'text' }],
      },
    },
    {
      id: 'market',
      label: 'ServiceElement.TableHeader.market',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'market', type: 'text' }],
      },
    },
    {
      id: 'label',
      label: 'ServiceElement.TableHeader.label',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultLabel', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    DEFAULT: {
      index: 0,
      id: 'category',
      label: 'Service.FilterLabels.category',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.RATE_CATEGORY,
    },
    SUBCATEGORY: {
      index: 1,
      id: 'subCategory',
      label: 'Service.FilterLabels.subCategory',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.RATE_SUB_CATEGORY,
    },
    MARKET: {
      index: 2,
      id: 'market',
      label: 'ServiceElement.FilterLabels.market',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.MARKET,
    },
    ID: {
      index: 3,
      id: 'id',
      label: 'ServiceElement.TableHeader.type',
      type: 'autocomplete',
      category: 'rate',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.RATE_TYPES,
    },
  },
  FORMS: {
    RATE_TYPE: {
      FIELDS: [
        {
          show: true,
          disableEdit: true,
          name: 'id',
          label: 'Rate.rateType',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.id,
          size: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'category',
          label: 'Parameter.FilterLabels.category',
          parameterName: PARAMETERS_CONFIG.NAME.RATE_CATEGORY,
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.category,
          getDefaultValue: () => '*',
          size: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'subCategory',
          label: 'Parameter.FilterLabels.subCategory',
          parameterName: PARAMETERS_CONFIG.NAME.RATE_SUB_CATEGORY,
          type: 'RHFSelect',
          getCurrentValue: (parameter) => parameter.subCategory,
          getDefaultValue: () => '*',
          size: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'market',
          label: 'ServiceElement.TableHeader.market',
          parameterName: PARAMETERS_CONFIG.NAME.MARKET,
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.market,
          getDefaultValue: () => '*',
          size: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'defaultLabel',
          label: 'Parameter.FilterLabels.defaultLabel',
          type: 'RHFTextField',
          getCurrentValue: (parameter) => parameter.defaultLabel,
          size: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'standardLabel',
          label: 'Parameter.FilterLabels.standardLabel',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.standardLabel,
          size: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'description',
          label: 'Service.FilterLabels.description',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.description,
          size: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
      ],
    },
  },
};

export default RATE_TYPE_CONFIG;
