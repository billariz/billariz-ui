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
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';

//ICONS
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventNoteIcon from '@mui/icons-material/EventNote';

const CONTRACTS_CONFIG = {
  COLUMNS: [
    {
      id: 'contractId',
      label: 'Contract.TableHeader.reference',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'reference', type: 'text' },
          { value: 'subscriptionDate', type: 'date' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'startDate',
      label: 'Contract.TableHeader.startDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'contractualStartDate',
            type: 'date',
          },
        ],
      },
    },
    {
      id: 'endDate',
      label: 'Contract.TableHeader.endDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'contractualEndDate',
            type: 'date',
          },
        ],
      },
    },

    {
      id: 'billingMode',
      label: 'Contract.TableHeader.billingMode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'billingMode', value: 'billingMode', type: 'text' },
          { beTransl: true, value: 'billingCycle', type: 'text' },
          {
            value: 'billAfterDate',
            type: 'date',
          },
        ],
      },
    },
    {
      id: 'installementPeriodicity',
      label: 'Contract.TableHeader.installementPeriodicity',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'installPeriodicity',
            value: 'installPeriodicity',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'direction',
      label: 'Contract.TableHeader.direction',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'direction', value: 'direction', type: 'text' }],
      },
    },
    {
      id: 'channel',
      label: 'Contract.TableHeader.channel',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'channel',
            value: 'channel',
            type: 'text',
          },
          {
            translParam: 'seller',
            value: 'seller',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'serviceCategory',
      label: 'Contract.TableHeader.serviceCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'serviceCategory',
            value: 'serviceCategory',
            type: 'text',
          },
          {
            translParam: 'serviceSubCategory',
            value: 'serviceSubCategory',
            type: 'text',
          },
        ],
      },
    },

    {
      id: 'status',
      label: 'Contract.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'contract',
          },
        ],
      },
    },
  ],
  FILTERS: {
    MARKET: {
      index: 0,
      id: 'market',
      label: 'Contract.FilterLabels.market',
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
    ID_CONTRACT: {
      index: 1,
      id: 'contractRef',
      label: 'Contract.FilterLabels.ContractRef',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    BILLING_MODE: {
      index: 2,
      id: 'billingMode',
      label: 'Contract.FilterLabels.billingMode',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_BILLING_MODE,
    },
    BILLING_FREQUENCY: {
      index: 3,
      id: 'billingFrequency',
      label: 'Contract.FilterLabels.billingFrequency',
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
      index: 4,
      id: 'billingCycle',
      label: 'Contract.FilterLabels.billingCycle',
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
    DIRECTION: {
      index: 5,
      id: 'direction',
      label: 'Contract.FilterLabels.direction',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
    },
    CHANNEL: {
      index: 6,
      id: 'channel',
      label: 'Contract.FilterLabels.channel',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CHANNEL,
    },
    SELLER: {
      index: 7,
      id: 'seller',
      label: 'Contract.FilterLabels.seller',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.SELLER,
    },
    CATEGORY: {
      index: 8,
      id: 'serviceCategory',
      label: 'Contract.FilterLabels.serviceCategory',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_CATEGORY,
    },
    SUB_CATEGORY: {
      index: 9,
      id: 'serviceSubCategory',
      label: 'Contract.FilterLabels.serviceSubCategory',
      type: FILTER_TYPE.SELECT_BOX,
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
      index: 10,
      id: 'status',
      label: 'Contract.FilterLabels.ContractStatus',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_STATUS,
    },

    ID_CUSTOMER: {
      index: 11,
      id: 'customerRef',
      label: 'Contract.FilterLabels.CustomerRef',
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
      index: 12,
      id: 'perimeterRef',
      label: 'Contract.FilterLabels.PerimeterRef',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
  },
  FORMS: {
    CONTRACTS_ABOUT: {
      tabLabel: 'TableTabs.contract.contract',
      FIELDS: [
        {
          name: 'reference',
          label: 'Contract.Reference',
          type: 'RHFTextField',
          path: 'contract.reference',
          tab: 'contract',
          disableEdit: true,
          getCurrentValue: (contract) => contract.reference,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'subscriptionDate',
          label: 'Contract.SubscriptionDate',
          type: 'RHFDatePicker',
          path: 'contract.subscriptionDate',
          tab: 'contract',
          disableEdit: true,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (contract) => contract.subscriptionDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'market',
          label: 'Contract.Market',
          type: 'RHFSelect',
          path: 'contract.market',
          tab: 'contract',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (contract) => contract.market,
          parameterName: PARAMETERS_CONFIG.NAME.MARKET,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'status',
          label: 'Contract.Status',
          type: 'RHFSelect',
          path: 'contract.status',
          tab: 'contract',
          hideOnBoxInfo: true,
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (contract) => contract.status,
          parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_STATUS,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'serviceCategory',
          label: 'Contract.FilterLabels.ContractCategory',
          type: 'RHFSelect',
          path: 'contract.serviceCategory',
          tab: 'contract',
          hideOnBoxInfo: true,
          getCurrentValue: (contract) => contract.serviceCategory,
          parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_CATEGORY,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'serviceSubCategory',
          label: 'Contract.ServiceSubCategory',
          type: 'RHFSelect',
          path: 'contract.serviceSubCategory',
          tab: 'contract',
          hideOnBoxInfo: true,
          getCurrentValue: (contract) => contract.serviceSubCategory,
          parameterName: PARAMETERS_CONFIG.NAME.SERVICE_SUBCATEGORY,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'direction',
          label: 'Contract.Direction',
          type: 'RHFSelect',
          path: 'contract.direction',
          tab: 'contract',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (contract) => contract.direction,
          parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'contractualStartDate',
          label: 'Contract.ContractualStartDate',
          type: 'RHFDatePicker',
          path: 'contract.contractualStartDate',
          tab: 'contract',
          hideOnBoxInfo: true,
          getCurrentValue: (contract) => contract.contractualStartDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'contractualEndDate',
          label: 'Contract.ContractualEndDate',
          type: 'RHFDatePicker',
          path: 'contract.contractualEndDate',
          tab: 'contract',
          hideOnBoxInfo: true,
          getCurrentValue: (contract) => contract.contractualEndDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'channel',
          label: 'Contract.Channel',
          type: 'RHFSelect',
          path: 'contract.channel',
          tab: 'contract',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (contract) => contract.channel,
          parameterName: PARAMETERS_CONFIG.NAME.CHANNEL,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'seller',
          label: 'Contract.Seller',
          type: 'RHFSelect',
          path: 'contract.seller',
          tab: 'contract',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (contract) => contract.seller,
          parameterName: PARAMETERS_CONFIG.NAME.SELLER,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    CONTRACTS_BILLING: {
      icon: <ReceiptIcon alt="invoice" color="primary" sx={{ fontSize: 20 }} />,
      title: 'Contract.Invoicing',
      tabLabel: 'TableTabs.contract.billing',
      FIELDS: [
        {
          name: 'billingMode',
          label: 'Contract.BillingMode',
          type: 'RHFSelect',
          path: 'contract.billingMode',
          tab: 'contract.billing',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (contract) => contract.billingMode,
          parameterName: PARAMETERS_CONFIG.NAME.BILLING_MODE,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'billingFrequency',
          label: 'Contract.BillingFrequency',
          type: 'RHFSelect',
          path: 'contract.billingFrequency',
          tab: 'contract.billing',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (contract) => contract.billingFrequency,
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
          label: 'Contract.BillingCycle',
          type: 'RHFAutocomplete',
          path: 'contract.billingCycleId',
          tab: 'contract.billing',
          dependOn: 'billingFrequency',
          dynamicFetching: { isDynamic: true, key: 'label' },
          getTranslatedValue: (contract) => contract?.billingCycle,
          getCurrentValue: (contract) => contract?.billingCycle?.id,
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
          label: 'Contract.BillAfterDate',
          type: 'RHFDatePicker',
          path: 'contract.billAfterDate',
          tab: 'contract.billing',
          getCurrentValue: (contract) => contract.billAfterDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    CONTRACTS_PREPAYMENT: {
      title: 'Contract.InstallPeriodicity',
      icon: (
        <EventNoteIcon
          alt="Install Periodicity"
          color="primary"
          sx={{ fontSize: 20 }}
        />
      ),
      displayOnTab: (object) => object.billingMode == 'PAYMENT_SCHEDULE',
      tabLabel: 'TableTabs.contract.installementPeriodicity',

      FIELDS: [
        {
          name: 'installPeriodicity',
          displayOn: (object) => object.billingMode == 'PAYMENT_SCHEDULE',
          label: 'Contract.InstallPeriodicity',
          type: 'RHFSelect',
          path: 'contract.installPeriodicity',
          tab: 'contract.installementPeriodicity',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('billingMode', (value) => {
            if (value[0] == 'PAYMENT_SCHEDULE') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (contract) => contract.installPeriodicity,
          parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_INSTALL_PERIODICITY,
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

export default CONTRACTS_CONFIG;
