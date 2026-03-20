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
import PARAMETERS_CONFIG from './parameters';
import { FILTER_TYPE } from './enums';
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';
import * as Yup from 'yup';

//ICONS
import ReceiptIcon from '@mui/icons-material/Receipt';

const PERIMETERS_CONFIG = {
  COLUMNS: [
    {
      id: 'reference',
      label: 'Perimeter.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'reference', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'startDate',
      label: 'Perimeter.TableHeader.startDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'startDate',
            type: 'date',
          },
        ],
      },
    },
    {
      id: 'endDate',
      label: 'Perimeter.TableHeader.endDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'endDate',
            type: 'date',
          },
        ],
      },
    },
    {
      id: 'perimeterType',
      label: 'Perimeter.TableHeader.perimeterType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'perimeterType', value: 'type.id', type: 'text' },
        ],
      },
    },
    {
      id: 'billable',
      label: 'Perimeter.TableHeader.billable',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'type.billable', type: 'switch' }],
      },
    },
    {
      id: 'billingFrequency',
      label: 'Perimeter.TableHeader.billingFrequency',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'billingFrequency',
            value: 'billingFrequency',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'billingCycle',
      label: 'Perimeter.TableHeader.cycle',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { beTransl: true, value: 'billingCycle', type: 'text' },
          { value: 'billAfterDate', type: 'text' },
        ],
      },
    },
    {
      id: 'market',
      label: 'Perimeter.TableHeader.market',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'market', value: 'market', type: 'text' }],
      },
    },
    {
      id: 'analyticCode',
      label: 'Perimeter.TableHeader.analyticCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'analyticCode', type: 'text' }],
      },
    },
    {
      id: 'customer',
      label: 'Perimeter.TableHeader.customer',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'customerId', type: 'customer' }],
      },
    },
    {
      id: 'status',
      label: 'Perimeter.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'perimeter',
          },
        ],
      },
    },
  ],
  FILTERS: {
    MARKET: {
      index: 0,
      id: 'market',
      label: 'Perimeter.FilterLabels.market',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.MARKET,
    },
    REFERENCE_PERIMETER: {
      index: 1,
      id: 'reference',
      label: 'Perimeter.FilterLabels.Reference',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ID_PERIMETER: {
      index: 2,
      id: 'perimeterId',
      label: 'Perimeter.FilterLabels.PerimeterNumber',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    TYPE: {
      index: 3,
      id: 'perimeterType',
      label: 'Perimeter.FilterLabels.perimeterType',
      type: FILTER_TYPE.AUTOCOMPLETE,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.PERIMETER_TYPES,
    },
    BILLING_FREQUENCY: {
      index: 4,
      id: 'billingFrequency',
      label: 'Perimeter.FilterLabels.billingFrequency',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.BILLING_FREQUENCY,
    },
    BILLING_CYCLE: {
      index: 5,
      id: 'billingCycle',
      label: 'Perimeter.FilterLabels.billingCycle',
      type: FILTER_TYPE.AUTOCOMPLETE,
      dependOn: 'billingFrequency',
      dynamicFetching: { isDynamic: true, key: 'label' },
      additionelParams: (object) =>
        object.billingFrequency
          ? '&periodicity=' + object.billingFrequency
          : null,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_BILLING_CYCLE,
    },

    ANALYTIC_CODE: {
      index: 6,
      id: 'analyticCode',
      label: 'Perimeter.FilterLabels.AnalyticCode',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ID_CUSTOMER: {
      index: 7,
      id: 'customerRef',
      label: 'Perimeter.FilterLabels.CustomerNumber',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ID_CONTRACT: {
      index: 8,
      id: 'contractRef',
      label: 'Perimeter.FilterLabels.ContractNumber',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },

    STATUS: {
      index: 9,
      id: 'status',
      label: 'Perimeter.FilterLabels.PerimeterStatus',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.PERIMETER_STATUS,
    },
  },
  FORMS: {
    PERIMETER_ABOUT: {
      tabLabel: 'TableTabs.perimeter.perimeter',
      FIELDS: [
        {
          name: 'reference',
          label: 'Perimeter.TableHeader.reference',
          type: 'RHFTextField',
          path: 'perimeter.reference',
          tab: 'perimeter',
          disableEdit: true,
          getCurrentValue: (perimeter) => perimeter.reference,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'customerId',
          label: 'Perimeter.TableHeader.customer',
          type: 'RHFAutocomplete',
          path: 'perimeter.customerId',
          tab: 'perimeter',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (perimeter) => perimeter.customerId,
          getOptionDisplay: (option) =>
            `${option.individual.firstName} ${option.individual.lastName}`,
          parameterName: PARAMETERS_CONFIG.NAME.CUSTOMERS,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'startDate',
          label: 'Perimeter.TableHeader.startDate',
          type: 'RHFDatePicker',
          path: 'perimeter.startDate',
          tab: 'perimeter',
          getCurrentValue: (perimeter) => perimeter.startDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'endDate',
          label: 'Perimeter.TableHeader.endDate',
          type: 'RHFDatePicker',
          path: 'perimeter.endDate',
          tab: 'perimeter',
          getCurrentValue: (perimeter) => perimeter.endDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'perimeterType',
          label: 'Perimeter.TableHeader.perimeterType',
          type: 'RHFAutocomplete',
          path: 'perimeter.perimeterType',
          tab: 'perimeter',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (perimeter) => perimeter.perimeterType,
          getTranslatedValue: (perimeter) => perimeter?.type,
          parameterName: PARAMETERS_CONFIG.NAME.PERIMETER_TYPES,
          linkedField: { name: 'billable', key: 'billable' },
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'status',
          label: 'Perimeter.TableHeader.status',
          type: 'RHFSelect',
          path: 'perimeter.status',
          tab: 'perimeter',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (perimeter) => perimeter.status,
          parameterName: PARAMETERS_CONFIG.NAME.PERIMETER_STATUS,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'analyticCode',
          label: 'Perimeter.TableHeader.analyticCode',
          type: 'RHFTextField',
          path: 'perimeter.analyticCode',
          tab: 'perimeter',
          getCurrentValue: (perimeter) => perimeter.analyticCode,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'market',
          label: 'Perimeter.TableHeader.market',
          type: 'RHFSelect',
          path: 'perimeter.market',
          tab: 'perimeter',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (perimeter) => perimeter.market,
          parameterName: PARAMETERS_CONFIG.NAME.MARKET,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    PERIMETER_BILLING: {
      icon: <ReceiptIcon alt="invoice" color="primary" sx={{ fontSize: 20 }} />,
      title: 'Contract.Invoicing',
      tabLabel: 'TableTabs.perimeter.billing',
      displayOnTab: (object) => object.type.billable == true,
      FIELDS: [
        {
          name: 'billable',
          displayOn: (object) => !!object.billable,
          disabled: true,
          label: 'Perimeter.TableHeader.billable',
          type: 'RHFSwitch',
          path: 'perimeter.billable',
          tab: 'perimeter.billing',
          getCurrentValue: (perimeter) => {
            if (!perimeter.type) return false;
            return perimeter.type.billable ? true : false;
          },
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'billingFrequency',
          displayOn: (object) => !!object.billable,
          label: 'Perimeter.FilterLabels.billingFrequency',
          type: 'RHFSelect',
          path: 'perimeter.billingFrequency',
          tab: 'perimeter.billing',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('billable', (value) => {
            if (value[0] == true) {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (perimeter) => perimeter.billingFrequency,
          parameterName: PARAMETERS_CONFIG.NAME.BILLING_FREQUENCY,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'billingCycleId',
          displayOn: (object) => !!object.billable,
          label: 'Perimeter.TableHeader.cycle',
          type: 'RHFAutocomplete',
          path: 'perimeter.billingCycleId',
          tab: 'perimeter.billing',
          dependOn: 'billingFrequency',
          dynamicFetching: { isDynamic: true, key: 'label' },
          getTranslatedValue: (contract) => contract?.billingCycle,
          getCurrentValue: (perimeter) => perimeter?.billingCycle?.id,
          additionelParams: (parameter) =>
            `${parameter.billingFrequency && parameter.billingFrequency !== '*' ? `&periodicity=${parameter.billingFrequency}` : ``}`,
          parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_BILLING_CYCLE,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'billAfterDate',
          displayOn: (object) => !!object.billable,
          label: 'Perimeter.billAfterDate',
          type: 'RHFDatePicker',
          path: 'perimeter.billAfterDate',
          tab: 'perimeter.billing',
          getCurrentValue: (perimeter) => perimeter.billAfterDate,
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

export default PERIMETERS_CONFIG;
