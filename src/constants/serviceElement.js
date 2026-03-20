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
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';
import * as Yup from 'yup';

import PARAMETERS_CONFIG from './parameters';

const SERVICE_ELEMENT_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'ServiceElement.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            beTransl: true,
            value: 'seType',
            type: 'text',
          },
          {
            value: 'id',
            type: 'text',
          },
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
            translParam: 'serviceElementCategory',
            value: 'category',
            type: 'text',
          },
          {
            translParam: 'serviceElementSubCategory',
            value: 'subCategory',
            type: 'text',
          },
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
          {
            value: 'startDate',
            type: 'date',
          },
          {
            value: 'endDate',
            type: 'date',
          },
        ],
      },
    },
    {
      id: 'tou',
      label: 'ServiceElement.TableHeader.tou',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'touGroup',
            value: 'touGroup',
            type: 'text',
          },

          {
            translParam: 'tou',
            value: 'tou',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'price',
      label: 'ServiceElement.TableHeader.price',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: (serviceElement) => serviceElement.getPrice(),
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'master',
      label: 'ServiceElement.TableHeader.master',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'master',
            type: 'switch',
          },
        ],
      },
    },
    {
      id: 'estimateAuthorized',
      label: 'ServiceElement.TableHeader.estimateAuthorized',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'estimateAuthorized',
            type: 'switch',
          },
        ],
      },
    },
    {
      id: 'metered',
      label: 'ServiceElement.TableHeader.metered',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'metered',
            type: 'switch',
          },
        ],
      },
    },
    {
      id: 'status',
      label: 'ServiceElement.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'serviceElement',
          },
        ],
      },
    },
  ],
  FILTERS: {
    STATUS: {
      index: 0,
      id: 'status',
      label: 'ServiceElement.FilterLabels.status',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_STATUS,
    },
    CATEGORY: {
      index: 1,
      id: 'category',
      label: 'ServiceElement.FilterLabels.category',
      type: 'selectBox',
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
      index: 2,
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
      parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_SUBCATEGORY,
    },
    ID: {
      index: 3,
      id: 'id',
      label: 'ServiceElement.FilterLabels.id',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '',
    },
    TOS_ID: {
      index: 4,
      id: 'tosId',
      label: 'ServiceElement.FilterLabels.tosId',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '',
    },
    CONTRACT_ID: {
      index: 5,
      id: 'contractId',
      label: 'ServiceElement.FilterLabels.contractId',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '',
    },
    TOU_GROUP: {
      index: 7,
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
      index: 8,
      id: 'touGroup',
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
    START_DATE: {
      index: 9,
      id: 'startDate',
      label: 'Service.FilterLabels.startDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
    },
    END_DATE: {
      index: 10,
      id: 'endDate',
      label: 'Service.FilterLabels.endDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
    },
    SE_TYPE: {
      index: 6,
      id: 'serviceElementTypeId',
      label: 'ServiceElement.FilterLabels.serviceElementType',
      type: FILTER_TYPE.AUTOCOMPLETE,
      dynamicFetching: { isDynamic: true, key: 'label' },
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_TYPES,
    },
  },
  FORMS: {
    SE_ABOUT: {
      tabLabel: 'ServiceElement.serviceElement',
      FIELDS: [
        {
          name: 'id',
          label: 'ServiceElement.TableHeader.ServiceElement',
          type: 'RHFTextField',
          path: 'serviceElement.id',
          tab: 'serviceElement',
          disabled: true,
          getCurrentValue: (serviceElement) => serviceElement.id,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'tosId',
          label: 'ServiceElement.TableHeader.tosType',
          type: 'RHFTextField',
          path: 'serviceElement.tosId',
          tab: 'serviceElement',
          disabled: true,
          getCurrentValue: (serviceElement) => serviceElement.tosId,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'seTypeId',
          label: 'ServiceElement.TableHeader.type',
          type: 'RHFAutocomplete',
          path: 'serviceElement.seTypeId',
          tab: 'serviceElement',
          dynamicFetching: { isDynamic: true, key: 'label' },
          disableEdit: true,
          getTranslatedValue: (serviceElement) => serviceElement?.seType,
          getCurrentValue: (serviceElement) => serviceElement?.seType?.id,
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_TYPES,
          validation: Yup.string().required('Error.isRequired'),
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'direction',
          label: 'ServiceElement.direction',
          type: 'RHFSelect',
          path: 'serviceElement.seType.direction',
          tab: 'serviceElement',
          disabled: true,
          getCurrentValue: (serviceElement) => serviceElement.seType.direction,
          parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
          validation: Yup.string().required('Error.isRequired'),
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'accountingScheme',
          label: 'ServiceElement.accountingScheme',
          type: 'RHFSelect',
          path: 'serviceElement.accountingScheme',
          tab: 'serviceElement',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (serviceElement) => serviceElement.accountingScheme,
          parameterName: PARAMETERS_CONFIG.NAME.ACCOUNTING_SHEME,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'billingScheme',
          label: 'ServiceElement.billingScheme',
          type: 'RHFSelect',
          path: 'serviceElement.billingScheme',
          tab: 'serviceElement',
          getCurrentValue: (serviceElement) => serviceElement.billingScheme,
          parameterName: PARAMETERS_CONFIG.NAME.BILLING_SHEME,
          validation: Yup.string().required('Error.isRequired'),
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'startDate',
          label: 'Service.TableHeader.startDate',
          type: 'RHFDatePicker',
          path: 'serviceElement.startDate',
          tab: 'serviceElement',
          hideOnBoxInfo: true,
          getCurrentValue: (serviceElement) => serviceElement.startDate,
          validation: Yup.string().required('Error.isRequired'),
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'endDate',
          label: 'Service.TableHeader.endDate',
          type: 'RHFDatePicker',
          path: 'serviceElement.endDate',
          tab: 'serviceElement',
          hideOnBoxInfo: true,
          getCurrentValue: (serviceElement) => serviceElement.endDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'touGroup',
          label: 'ServiceElement.touGroup',
          type: 'RHFSelect',
          path: 'serviceElement.touGroup',
          tab: 'serviceElement',
          getCurrentValue: (serviceElement) => serviceElement.touGroup,
          parameterName: PARAMETERS_CONFIG.NAME.TOU_GROUP,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'tou',
          label: 'ServiceElement.TableHeader.tou',
          type: 'RHFSelect',
          path: 'serviceElement.tou',
          tab: 'serviceElement',
          getCurrentValue: (serviceElement) => serviceElement.tou,
          parameterName: PARAMETERS_CONFIG.NAME.TOU,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'status',
          label: 'ServiceElement.TableHeader.status',
          type: 'RHFSelect',
          path: 'serviceElement.status',
          tab: 'serviceElement',
          hideOnBoxInfo: true,
          getCurrentValue: (serviceElement) => serviceElement.status,
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_STATUS,
          validation: Yup.string().required('Error.isRequired'),
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    RATING_FILDS: {
      tabLabel: 'ServiceElement.ratingFilds',
      FIELDS: [
        {
          name: 'operand',
          label: 'ServiceElement.operand',
          type: 'RHFTextField',
          path: 'serviceElement.operand',
          tab: 'ratingFilds',
          getCurrentValue: (serviceElement) => serviceElement.operand,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'operandType',
          label: 'ServiceElement.operandType',
          type: 'RHFSelect',
          path: 'serviceElement.operandType',
          tab: 'ratingFilds',
          getCurrentValue: (serviceElement) => serviceElement.operandType,
          parameterName: PARAMETERS_CONFIG.NAME.OPERAND_TYPE,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'factor',
          label: 'ServiceElement.factor',
          type: 'RHFTextField',
          path: 'serviceElement.factor',
          tab: 'ratingFilds',
          getCurrentValue: (serviceElement) => serviceElement.factor,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'factorType',
          label: 'ServiceElement.factorType',
          type: 'RHFSelect',
          path: 'serviceElement.factorType',
          tab: 'ratingFilds',
          getCurrentValue: (serviceElement) => serviceElement.factorType,
          parameterName: PARAMETERS_CONFIG.NAME.FACTOR_TYPE,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'rateType',
          label: 'ServiceElement.rateType',
          type: 'RHFAutocomplete',
          path: 'serviceElement.rateType',
          tab: 'ratingFilds',
          dynamicFetching: { isDynamic: true, key: 'label' },
          // getTranslatedValue: (serviceElement) =>
          //   serviceElement.rateType && serviceElement.rateType,
          getCurrentValue: (serviceElement) => serviceElement?.rateType,
          parameterName: PARAMETERS_CONFIG.NAME.RATE_TYPES,
          validation: Yup.string().required('Error.isRequired'),
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'sqType',
          label: 'ServiceElement.TableHeader.sqType',
          type: 'RHFSelect',
          path: 'serviceElement.sqType',
          tab: 'ratingFilds',
          disableEdit: true,
          getCurrentValue: (serviceElement) => serviceElement.sqType,
          parameterName: PARAMETERS_CONFIG.NAME.SQ_TYPE,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    BEHAVIOR_FILDS: {
      tabLabel: 'TermOfService.behavior',
      FIELDS: [
        {
          name: 'estimateAuthorized',
          label: 'TermOfService.TableHeader.estimateAuthorized',
          type: 'RHFSwitch',
          path: 'serviceElement.estimateAuthorized',
          tab: 'TermOfService.behavior',
          getCurrentValue: (serviceElement) =>
            serviceElement.estimateAuthorized,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'minDayForEstimate',
          label: 'ServiceElement.TableHeader.minDayForEstimate',
          type: 'RHFTextField',
          path: 'serviceElement.minDayForEstimate',
          tab: 'TermOfService.behavior',
          disableEdit: false,
          getCurrentValue: (serviceElement) => serviceElement.minDayForEstimate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'master',
          label: 'ServiceElement.TableHeader.master',
          type: 'RHFSwitch',
          path: 'serviceElement.master',
          tab: 'TermOfService.behavior',
          disableEdit: true,
          getCurrentValue: (serviceElement) => serviceElement.master,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'metered',
          label: 'ServiceElement.metered',
          type: 'RHFSwitch',
          path: 'serviceElement.metered',
          tab: 'TermOfService.behavior',
          disableEdit: true,
          getCurrentValue: (serviceElement) => serviceElement.metered,
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

export default SERVICE_ELEMENT_CONFIG;
