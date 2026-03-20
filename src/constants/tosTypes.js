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

const TOS_TYPE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'TermOfService.TableHeader.tosType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'category',
      label: 'TermOfService.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'category', type: 'text' }],
      },
    },
    {
      id: 'subCategory',
      label: 'TermOfService.TableHeader.subCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'subCategory', type: 'text' }],
      },
    },
    {
      id: 'period',
      label: 'TermOfService.TableHeader.period',
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
      label: 'TermOfService.TableHeader.default',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultTos', type: 'switch' }],
      },
    },
    {
      id: 'master',
      label: 'TermOfService.TableHeader.master',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'master', type: 'switch' }],
      },
    },
    {
      id: 'exclusive',
      label: 'TermOfService.TableHeader.exclusive',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'exclusive', type: 'switch' }],
      },
    },
    {
      id: 'touGroup',
      label: 'TermOfService.TableHeader.touGroup',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'touGroup', type: 'text' }],
      },
    },
    {
      id: 'label',
      label: 'TermOfService.TableHeader.label',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultLabel', type: 'text' }],
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
      parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_CATEGORY,
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
      parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_SUBCATEGORY,
    },
    TOU_GROUP: {
      index: 2,
      id: 'touGroup',
      label: 'TermOfService.FilterLabels.touGroup',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOU_GROUP,
    },
    ID: {
      index: 3,
      id: 'tosType',
      label: 'TermOfService.FilterLabels.tosType',
      type: 'autocomplete',
      category: 'termOfService',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOS_TYPES,
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'id',
        label: 'TermOfService.FilterLabels.tosType',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        show: true,
        getCurrentValue: (parameter) => parameter.id,
        size: {
          xs: 12,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'category',
        label: 'TermOfService.FilterLabels.category',
        parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_CATEGORY,
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
        label: 'TermOfService.FilterLabels.subCategory',
        parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_SUBCATEGORY,
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
        name: 'touGroup',
        label: 'TermOfService.FilterLabels.touGroup',
        parameterName: PARAMETERS_CONFIG.NAME.TOU_GROUP,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.touGroup,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'market',
        label: 'TermOfService.FilterLabels.market',
        parameterName: PARAMETERS_CONFIG.NAME.MARKET,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.market,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'tosDefault',
        label: 'TermOfService.tosDefault',
        type: 'RHFSwitch',
        getCurrentValue: (parameter) => parameter.tosDefault,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'master',
        label: 'TermOfService.master',
        type: 'RHFSwitch',
        getCurrentValue: (parameter) => parameter.master,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'exclusive',
        label: 'TermOfService.exclusive',
        type: 'RHFSwitch',
        getCurrentValue: (parameter) => parameter.exclusive,
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
export default TOS_TYPE_CONFIG;
