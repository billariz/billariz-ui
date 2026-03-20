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

const RATES_CONFIG = {
  COLUMNS: [
    {
      id: 'rateType',
      label: 'Rate.TableHeader.rateType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'type', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'period',
      label: 'ServiceElement.TableHeader.period',
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
      id: 'channel',
      label: 'Rate.TableHeader.channel',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'channel', type: 'text' }],
      },
    },
    {
      id: 'serviceCategory',
      label: 'Rate.TableHeader.serviceCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'contractServiceSubCategory',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'customerCategory',
      label: 'Rate.TableHeader.customerCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'customerCategory', type: 'text' },
          { value: 'customerType', type: 'text' },
        ],
      },
    },
    {
      id: 'dgoCode',
      label: 'Rate.TableHeader.dgoCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'dgoCode', type: 'text' },
          { value: 'tgoCode', type: 'text' },
        ],
      },
    },
    {
      id: 'gridRate',
      label: 'Rate.TableHeader.gridRate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'gridRate', type: 'text' },
          { value: 'posCategory', type: 'text' },
        ],
      },
    },
    {
      id: 'installmentFrequency',
      label: 'Rate.TableHeader.installmentFrequency',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'installmentFrequency', type: 'text' }],
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
      id: 'priceType',
      label: 'Rate.TableHeader.priceType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'priceType', type: 'text' }],
      },
    },
    {
      id: 'tou',
      label: 'ServiceElement.TableHeader.tou',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'touGroup', type: 'text' },
          { value: 'tou', type: 'text' },
        ],
      },
    },
    {
      id: 'threshold',
      label: 'ServiceElement.TableHeader.threshold',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'threshold', type: 'text' },
          { value: 'thresholdType', type: 'text' },
          { value: 'thresholdBase', type: 'text' },
        ],
      },
    },
    {
      id: 'price',
      label: 'Rate.TableHeader.price',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'price', type: 'text' }],
      },
    },
    {
      id: 'unit',
      label: 'Rate.TableHeader.unit',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'unit', type: 'text' }],
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
    SUB_CATEGOTY: {
      index: 1,
      id: 'subCategory',
      label: 'ServiceElement.FilterLabels.subCategory',
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
    CHANNEL: {
      index: 2,
      id: 'channel',
      label: 'Rate.channel',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CHANNEL,
    },
    SERVICE_CATEGORY: {
      index: 3,
      id: 'serviceCategory',
      label: 'Rate.serviceCategory',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_CATEGORY,
    },
    CUSTOMER_CATEGORY: {
      index: 4,
      id: 'customerCategory',
      label: 'Rate.customerCategory',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_CATEGORY,
    },
    CUSTOMER_TYPE: {
      index: 5,
      id: 'customerType',
      label: 'Rate.customerType',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_TYPE,
    },
    DGO: {
      index: 6,
      id: 'dgoCode',
      label: 'Rate.dgoCode',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.DGO,
    },
    TGO: {
      index: 7,
      id: 'tgoCode',
      label: 'Rate.tgoCode',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TGO,
    },
    gridRate: {
      index: 8,
      id: 'gridRate',
      label: 'Rate.gridRate',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.GRID_RATE,
    },
    POS_CATEGORY: {
      index: 9,
      id: 'posCategory',
      label: 'Rate.posCategory',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.POS_CATEGORY,
    },
    INSTALLMENT_FREQUENCY: {
      index: 10,
      id: 'installmentFrequency',
      label: 'Rate.installmentFrequency',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.INSTALLMENT_FREQUENCY,
    },
    MARKET: {
      index: 11,
      id: 'market',
      label: 'Rate.market',
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
    PRICE_TYPE: {
      index: 12,
      id: 'priceType',
      label: 'Rate.priceType',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.PRICE_TYPE,
    },
    TOU: {
      index: 13,
      id: 'tou',
      label: 'Rate.tou',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOU,
    },
    TOU_GROUP: {
      index: 14,
      id: 'touGroup',
      label: 'Rate.touGroup',
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
    RATE_TYPE: {
      index: 15,
      id: 'rateType',
      label: 'Rate.rateType',
      type: 'autocomplete',
      category: 'rate',
      size: {
        xs: 3,
        sm: 3,
        md: 3,
        lg: 3,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.RATE_TYPES,
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'type',
        label: 'Rate.rateType',
        type: 'RHFAutocomplete',
        category: 'type',
        validation: Yup.string().required('Error.isRequired'),
        parameterName: PARAMETERS_CONFIG.NAME.RATE_TYPES,
        getCurrentValue: (rate) => rate.type,
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'serviceCategory',
        label: 'Rate.serviceCategory',
        parameterName: PARAMETERS_CONFIG.NAME.SERVICE_CATEGORY,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.serviceCategory,
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'channel',
        label: 'Rate.channel',
        parameterName: PARAMETERS_CONFIG.NAME.CHANNEL,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.channel,
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'contractServiceSubCategory',
        label: 'Rate.contractServiceSubCategory',
        parameterName: PARAMETERS_CONFIG.NAME.SERVICE_CATEGORY,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.contractServiceSubCategory,
        size: {
          xs: 6,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'customerCategory',
        label: 'Rate.customerCategory',
        parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_CATEGORY,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.customerCategory,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'customerType',
        label: 'Rate.customerType',
        parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_TYPE,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.customerType,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'market',
        label: 'Rate.market',
        parameterName: PARAMETERS_CONFIG.NAME.MARKET,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.market,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'touGroup',
        label: 'ServiceElement.FilterLabels.touGroup',
        parameterName: PARAMETERS_CONFIG.NAME.TOU_GROUP,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.touGroup,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'tou',
        label: 'ServiceElement.FilterLabels.tou',
        parameterName: PARAMETERS_CONFIG.NAME.TOU,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.tou,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'dgoCode',
        label: 'Rate.dgoCode',
        parameterName: PARAMETERS_CONFIG.NAME.DGO,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.dgoCode,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'tgoCode',
        label: 'Rate.tgoCode',
        parameterName: PARAMETERS_CONFIG.NAME.TGO,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.tgoCode,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'gridRate',
        label: 'Rate.gridRate',
        parameterName: PARAMETERS_CONFIG.NAME.GRID_RATE,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.gridRate,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'installmentFrequency',
        label: 'Rate.installmentFrequency',
        parameterName: PARAMETERS_CONFIG.NAME.INSTALLMENT_FREQUENCY,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.installmentFrequency,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'posCategory',
        label: 'Rate.posCategory',
        parameterName: PARAMETERS_CONFIG.NAME.POS_CATEGORY,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.posCategory,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'priceType',
        label: 'Rate.priceType',
        parameterName: PARAMETERS_CONFIG.NAME.PRICE_TYPE,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.priceType,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'thresholdType',
        label: 'ServiceElement.thresholdType',
        parameterName: PARAMETERS_CONFIG.NAME.THRESHOLD_TYPE,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.thresholdType,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'thresholdBase',
        label: 'ServiceElement.thresholdBase',
        parameterName: PARAMETERS_CONFIG.NAME.THRESHOLD_BASE,
        type: 'RHFSelect',
        getCurrentValue: (parameter) => parameter.thresholdBase,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'threshold',
        label: 'ServiceElement.threshold',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.threshold,
        size: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 4,
        },
      },
      {
        name: 'price',
        label: 'Rate.price',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.price,
        validation: Yup.string().required('Error.isRequired'),
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'unit',
        label: 'Rate.unit',
        parameterName: PARAMETERS_CONFIG.NAME.UNIT_PRICE,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.unit,
        size: {
          xs: 12,
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
    ],
  },
};

export default RATES_CONFIG;
