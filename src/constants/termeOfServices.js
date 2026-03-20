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

const TERME_OF_SERVICES_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'TermOfService.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'tosType.id',
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
      id: 'label',
      label: 'TermOfService.TableHeader.label',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            beTransl: true,
            value: 'tosType',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'category',
      label: 'TermOfService.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'termOfServiceCategory',
            value: 'tosType.category',
            type: 'text',
          },
          {
            translParam: 'termOfServiceSubCategory',
            value: 'tosType.subCategory',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'period',
      label: 'TermOfService.TableHeader.period',
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
      label: 'TermOfService.TableHeader.tou',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'touGroup',
            value: 'touGroup',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'priceType',
      label: 'TermOfService.TableHeader.priceType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'priceType',
            value: 'priceType',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'direction',
      label: 'TermOfService.TableHeader.direction',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'direction',
            value: 'direction',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'duration',
      label: 'TermOfService.TableHeader.duration',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'initialDuration',
            type: 'text',
          },
          {
            value: 'minimumDuration',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'master',
      label: 'TermOfService.TableHeader.master',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'master',
            type: 'switch',
            color: 'default',
          },
        ],
      },
    },
    {
      id: 'exclusive',
      label: 'TermOfService.TableHeader.exclusive',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'exclusive',
            type: 'switch',
            color: 'default',
          },
        ],
      },
    },
    {
      id: 'status',
      label: 'TermOfService.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'termOfService',
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
      parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_STATUS,
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
      index: 5,
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
      index: 6,
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
    TOS_TYPE: {
      index: 7,
      id: 'tosTypeId',
      label: 'TermOfService.FilterLabels.tosType',
      type: FILTER_TYPE.AUTOCOMPLETE,
      dynamicFetching: { isDynamic: true, key: 'label' },
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      parameterName: PARAMETERS_CONFIG.NAME.TOS_TYPES,
    },
    DIRECTION: {
      index: 8,
      id: 'direction',
      label: 'TermOfService.FilterLabels.direction',
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
    PRICE_TYPE: {
      index: 9,
      id: 'priceType',
      label: 'TermOfService.FilterLabels.priceType',
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
    TOU_GROUP: {
      index: 10,
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
  },
  FORMS: {
    TOS_ABOUT: {
      tabLabel: 'termOfService.termOfService',
      FIELDS: [
        {
          name: 'id',
          label: 'TermOfService.TableHeader.id',
          type: 'RHFTextField',
          path: 'termOfService.id',
          tab: 'termOfService',
          disabled: true,
          getCurrentValue: (termOfService) => termOfService.id,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'serviceId',
          label: 'TermOfService.TableHeader.service',
          type: 'RHFTextField',
          path: 'termOfService.serviceId',
          tab: 'termOfService',
          disabled: true,
          getCurrentValue: (termOfService) => termOfService.serviceId,
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
          path: 'termOfService.contractId',
          tab: 'termOfService',
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
          name: 'tosTypeId',
          label: 'TermOfService.TableHeader.tosType',
          type: 'RHFAutocomplete',
          path: 'termOfService.tosTypeId',
          tab: 'termOfService',
          dynamicFetching: { isDynamic: true, key: 'label' },
          getTranslatedValue: (termOfService) => termOfService?.tosType,
          getCurrentValue: (termOfService) => termOfService?.tosType?.id,
          parameterName: PARAMETERS_CONFIG.NAME.TOS_TYPES,
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
          label: 'Service.TableHeader.direction',
          type: 'RHFSelect',
          path: 'service.direction',
          tab: 'termOfService',
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
          tab: 'termOfService',
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
          name: 'startDate',
          label: 'Service.TableHeader.startDate',
          type: 'RHFDatePicker',
          path: 'service.startDate',
          tab: 'termOfService',
          hideOnBoxInfo: true,
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
          tab: 'termOfService',
          hideOnBoxInfo: true,
          getCurrentValue: (service) => service.endDate,
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
          tab: 'termOfService',
          hideOnBoxInfo: true,
          getCurrentValue: (service) => service.status,
          parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_STATUS,
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
    CUSTOM_FILDS: {
      tabLabel: 'TermOfService.customFilds',
      FIELDS: [
        {
          name: 'market',
          label: 'TermOfService.TableHeader.market',
          type: 'RHFSelect',
          path: 'service.market',
          tab: 'TermOfService.customFilds',
          disableEdit: true,
          getCurrentValue: (termOfService) => termOfService.market,
          parameterName: PARAMETERS_CONFIG.NAME.MARKET,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'priceType',
          label: 'TermOfService.TableHeader.priceType',
          type: 'RHFSelect',
          path: 'service.priceType',
          tab: 'TermOfService.customFilds',
          disableEdit: true,
          getCurrentValue: (termOfService) => termOfService.priceType,
          parameterName: PARAMETERS_CONFIG.NAME.PRICE_TYPE,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'initialDuration',
          label: 'TermOfService.TableHeader.initialDuration',
          type: 'RHFTextField',
          path: 'termOfService.initialDuration',
          tab: 'TermOfService.customFilds',
          disableEdit: true,
          getCurrentValue: (termOfService) => termOfService.initialDuration,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'minimumDuration',
          label: 'TermOfService.TableHeader.minimumDuration',
          type: 'RHFTextField',
          path: 'termOfService.minimumDuration',
          tab: 'TermOfService.customFilds',
          disableEdit: true,
          getCurrentValue: (termOfService) => termOfService.minimumDuration,
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
          path: 'termOfService.estimateAuthorized',
          tab: 'TermOfService.behavior',
          getCurrentValue: (termOfService) => termOfService.estimateAuthorized,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'master',
          label: 'TermOfService.TableHeader.master',
          type: 'RHFSwitch',
          path: 'termOfService.master',
          tab: 'TermOfService.behavior',
          getCurrentValue: (termOfService) => termOfService.master,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'exclusive',
          label: 'TermOfService.TableHeader.exclusive',
          type: 'RHFSwitch',
          path: 'termOfService.exclusive',
          tab: 'TermOfService.behavior',
          getCurrentValue: (termOfService) => termOfService.exclusive,
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

export default TERME_OF_SERVICES_CONFIG;
