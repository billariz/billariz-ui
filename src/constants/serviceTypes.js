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

import * as Yup from 'yup';
import PARAMETERS_CONFIG from './parameters';
import { MultilineCellRenderer } from 'src/components/table/cell/renderer';
import { FILTER_TYPE } from './enums';

const SERVICE_TYPE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Service.TableHeader.type',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'type', type: 'text' }],
      },
    },
    {
      id: 'category',
      label: 'Service.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'category', type: 'text' }],
      },
    },
    {
      id: 'subCategory',
      label: 'Service.TableHeader.subCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'subCategory', type: 'text' }],
      },
    },
    {
      id: 'period',
      label: 'Service.TableHeader.period',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'startDate', type: 'date' },
          { value: 'endDate', type: 'date' },
        ],
      },
    },
    {
      id: 'default',
      label: 'Service.TableHeader.default',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultService', type: 'switch' }],
      },
    },
    {
      id: 'label',
      label: 'Service.TableHeader.label',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'standardLabel', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    CATEGORY: {
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
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_TYPE_CATEGORY,
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
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_TYPE_SUBCATEGORY,
    },
    // ID: {
    //   index: 3,
    //   id: 'serviceType',
    //   label: 'Service.FilterLabels.type',
    //   type: 'autocomplete',
    //   category: 'service',
    //   enumId: 'serviceType',
    //   size: {
    //     xs: 12,
    //     sm: 6,
    //     md: 4,
    //     lg: 4,
    //   },
    //   addAllValue: true,
    //   defaultValue: 'all',
    //   parameterName: PARAMETERS_CONFIG.NAME.SERVICE_TYPES,
    //   displayOn: (isOpen) => isOpen,
    // },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'type',
        label: 'Parameter.FilterLabels.type',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.type,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'category',
        label: 'Parameter.FilterLabels.category',
        parameterName: PARAMETERS_CONFIG.NAME.SERVICE_TYPE_CATEGORY,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.category,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'subCategory',
        label: 'Parameter.FilterLabels.subCategory',
        parameterName: PARAMETERS_CONFIG.NAME.SERVICE_TYPE_SUBCATEGORY,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.subCategory,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'defaultService',
        label: 'Service.FilterLabels.default',
        type: 'RHFSwitch',
        getCurrentValue: (parameter) => parameter.defaultService,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'startDate',
        label: 'Parameter.FilterLabels.startDate',
        type: 'RHFDatePicker',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.startDate,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'endDate',
        label: 'Parameter.FilterLabels.endDate',
        type: 'RHFDatePicker',
        getCurrentValue: (parameter) => parameter.endDate,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'defaultLabel',
        label: 'Parameter.FilterLabels.defaultLabel',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.defaultLabel,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'standardLabel',
        label: 'Parameter.FilterLabels.standardLabel',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.standardLabel,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'description',
        label: 'Service.FilterLabels.description',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.description,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
    ],
  },
};

export default SERVICE_TYPE_CONFIG;
