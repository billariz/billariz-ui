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
import * as Yup from 'yup';
import PARAMETERS_CONFIG from './parameters';
import { FILTER_TYPE, SERVICE_ELEMENT_STATUS } from './enums';

const SERVICE_ELEMENT_START_OPTION_CONFIG = {
  COLUMNS: [
    {
      id: 'tosType',
      label: 'ServiceElement.TableHeader.tosType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'tosType', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'id',
      label: 'ServiceElement.TableHeader.ServiceElement',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'serviceElementType', type: 'text' }],
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
      id: 'category',
      label: 'ServiceElement.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'category',
            translParam: 'serviceElementCategory',
            type: 'text',
          },
          {
            value: 'subCategory',
            translParam: 'serviceElementSubCategory',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'vatRate',
      label: 'ServiceElement.TableHeader.vatRate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'vatRate', translParam: 'vatRate', type: 'text' }],
      },
    },
    {
      id: 'rate',
      label: 'ServiceElement.TableHeader.rate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: (rate) =>
              `${rate.operand} + ${rate.factor} * ${rate.rateType}`,
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'Scheme',
      label: 'ServiceElement.TableHeader.Scheme',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'billingScheme',
            translParam: 'billingScheme',
            type: 'text',
          },
          {
            value: 'accountingScheme',
            translParam: 'accountingScheme',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'estimate',
      label: 'ServiceElement.TableHeader.estimate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'estimateAuthorized', type: 'switch', color: 'info' }],
      },
    },
    {
      id: 'minDayForEstimate',
      label: 'ServiceElement.TableHeader.minDayForEstimate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'minDayForEstimate', type: 'text' }],
      },
    },
    {
      id: 'sqType',
      label: 'ServiceElement.TableHeader.sqType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'sqType', translParam: 'sqType', type: 'text' }],
      },
    },
    {
      id: 'tou',
      label: 'ServiceElement.TableHeader.tou',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'touGroup', translParam: 'touGroup', type: 'text' },
          { value: 'tou', translParam: 'tou', type: 'text' },
        ],
      },
    },

    {
      id: 'analytic',
      label: 'ServiceElement.TableHeader.analytic',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'analyticCode', type: 'text' },
          { value: 'additionalCode', type: 'text' },
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
          {
            value: 'thresholdType',
            translParam: 'thresholdType',
            type: 'text',
          },
          {
            value: 'thresholdBase',
            translParam: 'thresholdBase',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'seListBaseForSq',
      label: 'ServiceElement.TableHeader.seListBaseForSq',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'seListBaseForSq', type: 'text' }],
      },
    },
    {
      id: 'defaultSeStatus',
      label: 'ServiceElement.TableHeader.defaultSeStatus',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'serviceElementStatus',
            value: 'defaultSeStatus',
            type: 'label',
            color: (status) =>
              (status === SERVICE_ELEMENT_STATUS.PENDING_START && 'success') ||
              'default',
          },
        ],
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
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_CATEGORY,
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
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_SUB_CATEGORY,
    },
    VAT_RATE: {
      index: 2,
      id: 'vatRate',
      label: 'ServiceElement.FilterLabels.vatRate',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.VAT_RATE,
    },
    TOS_TYPE: {
      index: 3,
      id: 'tosType',
      label: 'ServiceElement.FilterLabels.tosType',
      type: 'autocomplete',
      category: 'termOfService',
      size: {
        xs: 3,
        sm: 3,
        md: 3,
        lg: 3,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOS_TYPES,
    },
    SE_TYPE: {
      index: 4,
      id: 'seType',
      label: 'ServiceElement.FilterLabels.serviceElementType',
      type: 'autocomplete',
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
    },
    TOU_GROUP: {
      index: 5,
      id: 'touGroup',
      label: 'ServiceElement.FilterLabels.touGroup',
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
    TOU: {
      index: 6,
      id: 'tou',
      label: 'ServiceElement.FilterLabels.tou',
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
  },
  FORMS: {
    SERVICE_ELEMENT_ABOUT: {
      FIELDS: [
        {
          name: 'tosType',
          label: 'ServiceElement.tosType',
          type: 'RHFAutocomplete',
          category: 'termOfService',
          path: 'serviceElement.tosType',
          tab: 'serviceElement',
          addAllValue: true,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.tosType,
          parameterName: PARAMETERS_CONFIG.NAME.TOS_TYPES,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'serviceElementType',
          label: 'ServiceElement.serviceElementType',
          type: 'RHFAutocomplete',
          category: 'serviceElement',
          path: 'serviceElement.serviceElementType',
          tab: 'serviceElement',
          addAllValue: true,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.serviceElementType,
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_TYPES,
          endpoint: 'SERVICE_ELEMENT_TYPES_FIND',
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'category',
          label: 'ServiceElement.FilterLabels.category',
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_CATEGORY,
          type: 'RHFSelect',
          path: 'serviceElement.category',
          tab: 'serviceElement',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.category,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'subCategory',
          label: 'ServiceElement.FilterLabels.subCategory',
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_SUB_CATEGORY,
          type: 'RHFSelect',
          path: 'serviceElement.subCategory',
          tab: 'serviceElement',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.subCategory,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'startDate',
          label: 'Parameter.FilterLabels.startDate',
          type: 'RHFDatePicker',
          path: 'serviceElement.startDate',
          tab: 'serviceElement',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.startDate,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'endDate',
          label: 'Parameter.FilterLabels.endDate',
          type: 'RHFDatePicker',
          path: 'serviceElement.endDate',
          tab: 'serviceElement',
          getCurrentValue: (parameter) => parameter.endDate,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'defaultSeStatus',
          label: 'ServiceElement.FilterLabels.defaultSeStatus',
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_STATUS,
          type: 'RHFSelect',
          path: 'serviceElement.defaultSeStatus',
          tab: 'serviceElement',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.defaultSeStatus,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    SERVICE_ELEMENT_TARIFICATION: {
      FIELDS: [
        {
          name: 'touGroup',
          label: 'ServiceElement.FilterLabels.touGroup',
          parameterName: PARAMETERS_CONFIG.NAME.TOU_GROUP,
          type: 'RHFSelect',
          path: 'serviceElement.touGroup',
          tab: 'serviceElement.tarification',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.touGroup,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'tou',
          label: 'ServiceElement.FilterLabels.tou',
          parameterName: PARAMETERS_CONFIG.NAME.TOU,
          type: 'RHFSelect',
          path: 'serviceElement.tou',
          tab: 'serviceElement.tarification',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.tou,
          size: {
            xs: 12,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'sqType',
          label: 'ServiceElement.FilterLabels.sqType',
          parameterName: PARAMETERS_CONFIG.NAME.SQ_TYPE,
          type: 'RHFSelect',
          path: 'serviceElement.sqType',
          tab: 'serviceElement.tarification',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.sqType,
          size: {
            xs: 12,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'operandType',
          label: 'ServiceElement.operandType',
          parameterName: PARAMETERS_CONFIG.NAME.OPERAND_TYPE,
          type: 'RHFSelect',
          path: 'serviceElement.operandType',
          tab: 'serviceElement.tarification',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.operandType,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'operand',
          label: 'ServiceElement.operand',
          type: 'RHFTextField',
          path: 'serviceElement.operand',
          tab: 'serviceElement.tarification',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.operand,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'factorType',
          label: 'ServiceElement.factorType',
          parameterName: PARAMETERS_CONFIG.NAME.FACTOR_TYPE,
          type: 'RHFSelect',
          path: 'serviceElement.factorType',
          tab: 'serviceElement.tarification',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.factorType,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'factor',
          label: 'ServiceElement.factor',
          type: 'RHFTextField',
          path: 'serviceElement.factor',
          tab: 'serviceElement.tarification',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.factor,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          displayOn: (object) => object.sqType == 'SUM_EUR_FIX_BASED_ON_SA',
          name: 'seListBaseForSq',
          label: 'ServiceElement.seListBaseForSq',
          type: 'RHFMultiselect',
          path: 'serviceElement.seListBaseForSq',
          tab: 'serviceElement.tarification',
          getCurrentValue: (parameter) =>
            parameter.sqType == 'SUM_EUR_FIX_BASED_ON_SA'
              ? parameter.seListBaseForSq
              : null,
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_SUB_CATEGORY,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'rateType',
          label: 'ServiceElement.rateType',
          type: 'RHFAutocomplete',
          category: 'rateType',
          path: 'serviceElement.rateType',
          tab: 'serviceElement.tarification',
          addAllValue: true,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.rateType,
          parameterName: PARAMETERS_CONFIG.NAME.RATE_TYPES,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'vatRate',
          label: 'ServiceElement.FilterLabels.vatRate',
          parameterName: PARAMETERS_CONFIG.NAME.VAT_RATE,
          type: 'RHFSelect',
          path: 'serviceElement.vatRate',
          tab: 'serviceElement.tarification',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.vatRate,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    SERVICE_ELEMENT_ESTIMATION: {
      FIELDS: [
        {
          name: 'estimateAuthorized',
          label: 'ServiceElement.estimateAuthorized',
          type: 'RHFSwitch',
          path: 'serviceElement.estimateAuthorized',
          tab: 'serviceElement.estimation',
          getCurrentValue: (parameter) =>
            parameter.estimateAuthorized ? parameter.estimateAuthorized : false,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'minDayForEstimate',
          label: 'ServiceElement.minDayForEstimate',
          type: 'RHFTextField',
          path: 'serviceElement.minDayForEstimate',
          tab: 'serviceElement.estimation',
          getCurrentValue: (parameter) => parameter.minDayForEstimate,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    SERVICE_ELEMENT_THREHOLD: {
      FIELDS: [
        {
          name: 'thresholdType',
          label: 'ServiceElement.thresholdType',
          parameterName: PARAMETERS_CONFIG.NAME.THRESHOLD_TYPE,
          type: 'RHFSelect',
          path: 'serviceElement.thresholdType',
          tab: 'serviceElement.threshold',
          getCurrentValue: (parameter) => parameter.thresholdType,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'thresholdBase',
          label: 'ServiceElement.thresholdBase',
          parameterName: PARAMETERS_CONFIG.NAME.THRESHOLD_BASE,
          type: 'RHFSelect',
          path: 'serviceElement.thresholdBase',
          tab: 'serviceElement.threshold',
          getCurrentValue: (parameter) => parameter.thresholdBase,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'threshold',
          label: 'ServiceElement.threshold',
          type: 'RHFTextField',
          path: 'serviceElement.threshold',
          tab: 'serviceElement.threshold',
          getCurrentValue: (parameter) => parameter.threshold,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    SERVICE_ELEMENT_BILLING: {
      FIELDS: [
        {
          name: 'accountingScheme',
          label: 'ServiceElement.accountingScheme',
          parameterName: PARAMETERS_CONFIG.NAME.ACCOUNTING_SHEME,
          type: 'RHFSelect',
          path: 'serviceElement.accountingScheme',
          tab: 'serviceElement.billing',
          validation: Yup.string().required('accountingScheme is required'),
          getCurrentValue: (parameter) => parameter.accountingScheme,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'billingScheme',
          label: 'ServiceElement.billingScheme',
          parameterName: PARAMETERS_CONFIG.NAME.BILLING_SHEME,
          type: 'RHFSelect',
          path: 'serviceElement.billingScheme',
          tab: 'serviceElement.billing',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.billingScheme,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'analyticCode',
          label: 'ServiceElement.analyticCode',
          type: 'RHFTextField',
          path: 'serviceElement.analyticCode',
          tab: 'serviceElement.billing',
          getCurrentValue: (parameter) => parameter.analyticCode,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'additionalCode',
          label: 'ServiceElement.additionalCode',
          type: 'RHFTextField',
          path: 'serviceElement.additionalCode',
          tab: 'serviceElement.billing',
          getCurrentValue: (parameter) => parameter.additionalCode,
          size: {
            xs: 6,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
  },
};

export default SERVICE_ELEMENT_START_OPTION_CONFIG;
