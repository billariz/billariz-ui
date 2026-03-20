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
import RelationsCellRenderer from 'src/components/table/cell/renderer/RelationsCellRender';
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';

const BILLS_CONFIG = {
  COLUMNS: [
    {
      id: 'reference',
      label: 'Bill.TableHeader.Bill',
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
      id: 'groupBillId',
      label: 'Bill.TableHeader.Group',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'groupBillId', type: 'text' }],
      },
    },
    {
      id: 'billingRun',
      label: 'Bill.TableHeader.BillRunId',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'billingRun.id', type: 'billRun' },
          { value: 'billingRun.runDate', type: 'date' },
        ],
      },
    },
    {
      id: 'type',
      label: 'Bill.TableHeader.Type',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'billType', value: 'type', type: 'text' }],
      },
    },
    {
      id: 'billNature',
      label: 'Bill.TableHeader.Nature',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'billNature', value: 'nature', type: 'text' },
          { value: 'cancelledByBillId', type: 'text' },
        ],
      },
    },
    {
      id: 'startDate',
      label: 'Bill.TableHeader.dates',
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
      id: 'billDate',
      label: 'Bill.TableHeader.billDates',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'billDate', type: 'date' },
          { value: 'accountingDate', type: 'date' },
        ],
      },
    },
    {
      id: 'relations',
      label: 'Bill.TableHeader.relations',
      align: 'left',
      cell: {
        renderer: RelationsCellRenderer,
        value: [{ value: (bill) => bill.relations(), type: 'bill' }],
      },
    },
    {
      id: 'totalVat',
      label: 'Bill.TableHeader.Vat',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'totalVat', type: 'text' }],
      },
    },
    {
      id: 'totalAmount',
      label: 'Bill.TableHeader.Total',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'totalAmount', type: 'text' }],
      },
    },
    {
      id: 'status',
      label: 'Bill.TableHeader.Status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'bill',
          },
        ],
      },
    },
  ],
  FILTERS: {
    TYPE: {
      index: 0,
      id: 'billType',
      label: 'Bill.FilterLabels.billType',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.BILL_TYPE,
    },
    REFERENCE: {
      index: 1,
      id: 'billRef',
      label: 'Bill.FilterLabels.billRef',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ID: {
      index: 2,
      id: 'id',
      label: 'Bill.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    GROUP_BILL_ID: {
      index: 3,
      id: 'groupBillId',
      label: 'Bill.FilterLabels.groupBillId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    RUN_ID: {
      index: 4,
      id: 'billingRunId',
      label: 'Bill.FilterLabels.billingRunId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    EXECUTION_DATE: {
      index: 5,
      id: 'runDate',
      label: 'Bill.FilterLabels.runDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    NATURE: {
      index: 6,
      id: 'billNature',
      label: 'Bill.FilterLabels.billNature',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.BILL_NATURE,
    },
    CANCELLED_BILL_ID: {
      index: 7,
      id: 'cancelledBillId',
      label: 'Bill.FilterLabels.cancelledBillId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    START_DATE: {
      index: 8,
      id: 'startDate',
      label: 'Bill.FilterLabels.startDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    END_DATE: {
      index: 9,
      id: 'endDate',
      label: 'Bill.FilterLabels.endDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    STATUS: {
      index: 10,
      id: 'billStatus',
      label: 'Bill.FilterLabels.billStatus',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.BILL_STATUS,
    },
    REF_CONTRACT: {
      index: 11,
      id: 'contractRef',
      label: 'Bill.FilterLabels.contractRef',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    REF_CUSTOMER: {
      index: 12,
      id: 'customerRef',
      label: 'Bill.FilterLabels.customerRef',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    REF_PERIMETER: {
      index: 13,
      id: 'perimeterRef',
      label: 'Bill.FilterLabels.perimeterRef',
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
    BILL_ABOUT: {
      tabLabel: 'TableTabs.bill.bill',
      FIELDS: [
        {
          label: 'Bill.TableHeader.id',
          getCurrentValue: (bill) => bill.id,
          type: 'RHFTextField',
        },
        {
          label: 'Bill.TableHeader.groupBillId',
          getCurrentValue: (bill) => bill.groupBillId,
          type: 'RHFTextField',
        },
        {
          name: 'cancelledBill',
          label: 'Bill.TableHeader.cancelledBill',
          getCurrentValue: (bill) => bill.cancelledBill?.id,
          type: 'RHFTextField',
        },
        {
          name: 'cancelledByBillId',
          label: 'Bill.TableHeader.cancelledByBillId',
          getCurrentValue: (bill) => bill.cancelledByBillId,
          type: 'RHFTextField',
        },
        {
          label: 'Bill.TableHeader.accountingDate',
          getCurrentValue: (bill) => bill.accountingDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.billDate',
          getCurrentValue: (bill) => bill.billDate,
          type: 'RHFDatePicker',
        },
      ],
    },
    BILLING_RUN: {
      tabLabel: 'TableTabs.bill.billingRun',
      FIELDS: [
        {
          name: 'billingRunId',
          label: 'Bill.TableHeader.billingRunId',
          getCurrentValue: (bill) => bill?.billingRun?.id,
          type: 'RHFTextField',
        },
        {
          label: 'Bill.TableHeader.billType',
          getCurrentValue: (bill) => bill?.billingRun?.billType,
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.BILL_TYPE,
        },
        {
          label: 'Bill.TableHeader.startDate',
          getCurrentValue: (bill) => bill?.billingRun?.startDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.endDate',
          getCurrentValue: (bill) => bill?.billingRun?.endDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.runDate',
          getCurrentValue: (bill) => bill?.billingRun?.runDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.contractCount',
          getCurrentValue: (bill) => bill?.billingRun?.contractCount,
          type: 'RHFTextField',
        },
        {
          label: 'Bill.TableHeader.status',
          getCurrentValue: (bill) => bill?.billingRun?.status,
          type: 'RHFTextField',
        },
      ],
    },
    PERIMETER: {
      tabLabel: 'TableTabs.bill.perimeter',
      FIELDS: [
        {
          name: 'perimeterId',
          label: 'Bill.TableHeader.perimeterId',
          getCurrentValue: (bill) => bill?.perimeter?.id,
          type: 'RHFTextField',
        },
        {
          label: 'Bill.TableHeader.status',
          getCurrentValue: (bill) => bill?.perimeter?.status,
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.PERIMETER_STATUS,
        },
        {
          label: 'Bill.TableHeader.startDate',
          getCurrentValue: (bill) => bill?.perimeter?.startDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.endDate',
          getCurrentValue: (bill) => bill?.perimeter?.endDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.billAfterDate',
          getCurrentValue: (bill) => bill?.perimeter?.billAfterDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.billingCycleId',
          getCurrentValue: (bill) => bill?.perimeter?.billingCycleId,
          type: 'RHFTextField',
        },
        {
          label: 'Bill.TableHeader.billingFrequency',
          getCurrentValue: (bill) => bill?.perimeter?.billingFrequency,
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.BILLING_FREQUENCY,
        },
      ],
    },
    CONTRACT: {
      tabLabel: 'TableTabs.bill.contract',
      FIELDS: [
        {
          name: 'contractId',
          label: 'Bill.TableHeader.contractId',
          getCurrentValue: (bill) => bill?.contract?.id,
          type: 'RHFTextField',
        },
        {
          label: 'Bill.TableHeader.status',
          getCurrentValue: (bill) => bill?.contract?.status,
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_STATUS,
        },
        {
          label: 'Bill.TableHeader.startDate',
          getCurrentValue: (bill) => bill?.contract?.contractualStartDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.endDate',
          getCurrentValue: (bill) => bill?.contract?.contractualEndDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.billAfterDate',
          getCurrentValue: (bill) => bill?.contract?.billAfterDate,
          type: 'RHFDatePicker',
        },
        {
          label: 'Bill.TableHeader.billingCycleId',
          getCurrentValue: (bill) => bill?.contract?.billingCycleId,
          type: 'RHFTextField',
        },
        {
          label: 'Bill.TableHeader.billingFrequency',
          getCurrentValue: (bill) => bill?.contract?.billingFrequency,
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.BILLING_FREQUENCY,
        },
        {
          label: 'Bill.TableHeader.billingMode',
          getCurrentValue: (bill) => bill?.contract?.billingMode,
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.BILLING_MODE,
        },
      ],
    },
    CUSTOMER: {
      tabLabel: 'TableTabs.bill.customer',
      FIELDS: [
        {
          name: 'customerId',
          label: 'Bill.TableHeader.customerId',
          getCurrentValue: (bill) => bill?.customer?.id,
          type: 'RHFTextField',
        },
        {
          label: 'Bill.TableHeader.status',
          getCurrentValue: (bill) => bill?.customer?.status,
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_STATUS,
        },
        {
          label: 'Bill.TableHeader.category',
          getCurrentValue: (bill) => bill?.customer?.category,
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_CATEGORY,
        },
        {
          label: 'Bill.TableHeader.type',
          getCurrentValue: (bill) => bill?.customer?.type,
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_TYPE,
        },
      ],
    },
  },
  FORM: {
    FIELDS: [
      {
        name: 'contractId',
        label: 'Bill.Forms.contractId',
        type: 'RHFAutocomplete',
        disabled: true,
        autoSelectSingleOption: true,
        additionelParams: (parameter) =>
          parameter.contractId ? '&id=' + parameter.contractId : '',
        getCurrentValue: (bill) => bill?.contract?.id,
        getOptionDisplay: (option) => `${option.reference}`,
        parameterName: PARAMETERS_CONFIG.NAME.CONTRACT,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'billDate',
        label: 'Bill.Forms.billDate',
        type: 'RHFDatePicker',
        getCurrentValue: (bill) => bill.billDate,
        disableEdit: true,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'action',
        label: 'Bill.Forms.action',
        type: 'RHFSelect',
        getCurrentValue: () => null,
        parameterName: PARAMETERS_CONFIG.NAME.EVENT_ACTION,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'status',
        label: 'Bill.Forms.status',
        type: 'RHFSelect',
        getCurrentValue: (bill) => bill.status,
        disabled: true,
        parameterName: PARAMETERS_CONFIG.NAME.BILL_STATUS,
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

export default BILLS_CONFIG;
