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

import PARAMETERS_CONFIG from './parameters';
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';
import * as Yup from 'yup';

const SERVICES_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Service.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'serviceTypeId', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'serviceType',
      label: 'Service.TableHeader.label',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ beTransl: true, value: 'serviceType', type: 'text' }],
      },
    },
    {
      id: 'category',
      label: 'Service.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'serviceCategory',
            value: 'serviceType.category',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'subCategory',
      label: 'Service.TableHeader.subCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'serviceSubCategory',
            value: 'serviceType.subCategory',
            type: 'text',
          },
        ],
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
        value: [
          {
            value: 'serviceType.defaultService',
            type: 'switch',
          },
        ],
      },
    },
    {
      id: 'status',
      label: 'Service.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'service',
          },
        ],
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
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_CATEGORY,
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
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_SUBCATEGORY,
    },
    STATUS: {
      index: 2,
      id: 'status',
      label: 'Service.FilterLabels.status',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_STATUS,
    },
    ID: {
      index: 3,
      id: 'id',
      label: 'Service.FilterLabels.id',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ID_CONTRACT: {
      index: 4,
      id: 'contractId',
      label: 'Service.FilterLabels.ContractNumber',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    START_DATE: {
      index: 6,
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
      index: 7,
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
    SERVICE_TYPE: {
      index: 5,
      id: 'serviceTypeId',
      label: 'Service.FilterLabels.serviceType',
      type: FILTER_TYPE.AUTOCOMPLETE,
      dynamicFetching: { isDynamic: true, key: 'label' },
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_TYPES,
    },
  },
  FORMS: {
    SERVICE_ABOUT: {
      tabLabel: 'Service.service',
      FIELDS: [
        {
          name: 'id',
          label: 'Service.TableHeader.id',
          type: 'RHFTextField',
          path: 'service.id',
          tab: 'service',
          disabled: true,
          getCurrentValue: (service) => service.id,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'contractId',
          label: 'Service.TableHeader.contractId',
          type: 'RHFTextField',
          path: 'service.contractId',
          tab: 'service',
          disabled: true,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (service) => service.contractId,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'serviceType',
          label: 'Service.TableHeader.type',
          type: 'RHFAutocomplete',
          path: 'service.serviceTypeId',
          tab: 'service',
          dependOn: 'defaultService',
          dynamicFetching: { isDynamic: true, key: 'label' },
          getTranslatedValue: (service) => service?.serviceType,
          getCurrentValue: (service) => service?.serviceType?.id,
          additionelParams: () => `&defaultService=true`,
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_TYPES,
          validation: Yup.string().required('Error.isRequired'),
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'status',
          label: 'Service.TableHeader.status',
          type: 'RHFSelect',
          path: 'service.status',
          tab: 'service',
          getCurrentValue: (service) => service.status,
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_STATUS,
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
          path: 'service.startDate',
          tab: 'service',
          getCurrentValue: (service) => service.startDate,
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
          path: 'service.endDate',
          tab: 'service',
          getCurrentValue: (service) => service.endDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    CUSTOM_FILDS: {
      tabLabel: 'Service.customFilds',
      FIELDS: [
        {
          name: 'direction',
          label: 'Service.TableHeader.direction',
          type: 'RHFSelect',
          path: 'service.direction',
          tab: 'service.customFilds',
          disableEdit: false,
          getCurrentValue: (service) => service.direction,
          parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'touGroup',
          label: 'Service.TableHeader.touGroup',
          type: 'RHFSelect',
          path: 'service.touGroup',
          tab: 'service.customFilds',
          disableEdit: true,
          getCurrentValue: (service) => service.touGroup,
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
          label: 'Service.TableHeader.tou',
          type: 'RHFSelect',
          path: 'service.tou',
          tab: 'service.customFilds',
          disableEdit: true,
          getCurrentValue: (service) => service.tou,
          parameterName: PARAMETERS_CONFIG.NAME.TOU,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'amount',
          label: 'Service.TableHeader.amount',
          type: 'RHFTextField',
          path: 'service.amount',
          tab: 'service.customFilds',
          disableEdit: true,
          getCurrentValue: (service) => service.amount,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    THRESHOLD_FILDS: {
      tabLabel: 'Service.thresholdFilds',
      FIELDS: [
        {
          name: 'threshold',
          label: 'Service.TableHeader.threshold',
          type: 'RHFTextField',
          path: 'service.threshold',
          tab: 'service.thresholdFilds',
          disableEdit: true,
          getCurrentValue: (service) => service.threshold,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'thresholdType',
          label: 'Service.TableHeader.thresholdType',
          type: 'RHFSelect',
          path: 'service.thresholdType',
          tab: 'service.thresholdFilds',
          disableEdit: true,
          getCurrentValue: (service) => service.thresholdType,
          parameterName: PARAMETERS_CONFIG.NAME.THRESHOLD_TYPE,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'thresholdBase',
          label: 'Service.TableHeader.thresholdBase',
          type: 'RHFSelect',
          path: 'service.thresholdBase',
          tab: 'service.thresholdFilds',
          disableEdit: true,
          getCurrentValue: (service) => service.thresholdBase,
          parameterName: PARAMETERS_CONFIG.NAME.THRESHOLD_BASE,
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
      tabLabel: 'Service.ratingFilds',
      FIELDS: [
        {
          name: 'operand',
          label: 'Service.TableHeader.operand',
          type: 'RHFTextField',
          path: 'service.operand',
          tab: 'service.ratingFilds',
          disableEdit: true,
          getCurrentValue: (service) => service.operand,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'operandType',
          label: 'Service.TableHeader.operandType',
          type: 'RHFSelect',
          path: 'service.operandType',
          tab: 'service.ratingFilds',
          disableEdit: true,
          getCurrentValue: (service) => service.operandType,
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
          label: 'Service.TableHeader.factor',
          type: 'RHFTextField',
          path: 'service.factor',
          tab: 'service.ratingFilds',
          disableEdit: true,
          getCurrentValue: (service) => service.factor,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'factorType',
          label: 'Service.TableHeader.factorType',
          type: 'RHFSelect',
          path: 'service.factorType',
          tab: 'service.ratingFilds',
          getCurrentValue: (service) => service.factorType,
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
          label: 'Service.TableHeader.rateType',
          type: 'RHFAutocomplete',
          path: 'service.rateType',
          tab: 'service.ratingFilds',
          dynamicFetching: { isDynamic: true, key: 'label' },
          getCurrentValue: (service) => service?.rateType,
          parameterName: PARAMETERS_CONFIG.NAME.RATE_TYPES,
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

export default SERVICES_CONFIG;
