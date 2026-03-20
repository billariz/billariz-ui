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

const SERVICE_ELEMENT_TYPE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'ServiceElement.TableHeader.type',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'id', type: 'text' },
          { value: 'seTypeCategory', type: 'text' },
        ],
      },
    },
    {
      id: 'category',
      label: 'ServiceElement.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'seTypeCategory', type: 'text' }],
      },
    },
    {
      id: 'isMaster',
      label: 'ServiceElement.TableHeader.master',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'seMaster', type: 'switch', color: 'info' }],
      },
    },
    {
      id: 'masterSeTypeId',
      label: 'ServiceElement.TableHeader.masterSeType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'masterSeTypeId', type: 'text' }],
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
      id: 'direction',
      label: 'ServiceElement.TableHeader.direction',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'direction', type: 'text' }],
      },
    },
    {
      id: 'isMetered',
      label: 'ServiceElement.TableHeader.metered',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'metered', type: 'switch', color: 'info' }],
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
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_TYPE_CATEGORY,
    },
    MARKET: {
      index: 1,
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
    DIRECTION: {
      index: 2,
      id: 'direction',
      label: 'ServiceElement.FilterLabels.direction',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
    },
    ID: {
      index: 3,
      id: 'id',
      label: 'ServiceElement.FilterLabels.serviceElementType',
      type: 'RHFAutocomplete',
      category: 'serviceElement',
      size: {
        xs: 3,
        sm: 3,
        md: 3,
        lg: 3,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_TYPES,
      endpoint: 'SERVICE_ELEMENT_TYPES_FIND',
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'id',
        label: 'ServiceElement.ServiceElementType',
        type: 'RHFTextField',
        defaultValue: '',
        validation: Yup.string().required('Error.isRequired'),
        show: true,
        getCurrentValue: (parameter) => parameter.id,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'category',
        label: 'ServiceElement.FilterLabels.category',
        parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_TYPE_CATEGORY,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.seTypeCategory,
        size: {
          xs: 6,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'market',
        label: 'ServiceElement.FilterLabels.market',
        parameterName: PARAMETERS_CONFIG.NAME.MARKET,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.market,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'direction',
        label: 'ServiceElement.FilterLabels.direction',
        parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.direction,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'masterSeTypeId',
        label: 'ServiceElement.masterSeType',
        type: 'RHFAutocomplete',
        category: 'serviceElement',
        addAllValue: true,
        validation: Yup.string().when('seMaster', {
          is: false,
          then: (schema) => schema.required('Error.isRequired'),
          otherwise: (schema) => schema.notRequired(),
        }),
        getCurrentValue: (parameter) => parameter.masterSeType,
        parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_TYPES,
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'seMaster',
        label: 'ServiceElement.master',
        type: 'RHFSwitch',
        getCurrentValue: (parameter) => parameter.seMaster == true,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'metered',
        label: 'ServiceElement.metered',
        type: 'RHFSwitch',
        getCurrentValue: (parameter) => parameter.metered == true,
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

export default SERVICE_ELEMENT_TYPE_CONFIG;
