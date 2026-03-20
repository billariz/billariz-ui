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
import ChartsCellRenderer from 'src/components/table/cell/renderer/ChartsCellRender';
import PARAMETERS_CONFIG from './parameters';

const BILLINGRUN_CONFIG = {
  COLUMNS: [
    {
      id: 'billingRunId',
      label: 'BillingRun.TableHeader.billingRunId',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'id', type: 'text' },
          { translParam: 'billType', value: 'billType', type: 'text' },
        ],
      },
    },
    {
      id: 'billingCycle',
      label: 'BillingRun.TableHeader.billingCycle',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ beTransl: true, value: 'billingCycle', type: 'text' }],
      },
    },
    {
      id: 'runDate',
      label: 'BillingRun.TableHeader.runDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'runDate', type: 'date' }],
      },
    },
    {
      id: 'billingWindow',
      label: 'BillingRun.TableHeader.billingWindow',
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
      id: 'totalEligibleContract',
      label: 'BillingRun.TableHeader.totalEligibleContract',
      align: 'left',
      cell: {
        renderer: ChartsCellRenderer,
        value: { value: 'contracts', type: 'contract' },
      },
    },
    {
      id: 'totalComputed',
      label: 'BillingRun.TableHeader.totalComputed',
      align: 'left',
      cell: {
        renderer: ChartsCellRenderer,
        value: { value: 'billingRunOverview', type: 'validated' },
      },
    },
    {
      id: 'totalInFailure',
      label: 'BillingRun.TableHeader.totalInFailure',
      align: 'left',
      cell: {
        renderer: ChartsCellRenderer,
        value: { value: 'billingRunOverview', type: 'error' },
      },
    },
    {
      id: 'status',
      label: 'BillingRun.TableHeader.Status',
      align: 'left',
       cell: {
              renderer: StatusLabel,
              value: [
                {
                  type: 'billingRun',
                },
              ],
            },
    },
  ],
  FILTERS: {
    STATUS: {
      index: 0,
      id: 'status',
      label: 'BillingRun.FilterLabels.status',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.BILLINGRUN_STATUS,
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'BillingRun.FilterLabels.billingRunId',
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
      index: 2,
      id: 'type',
      label: 'BillingRun.FilterLabels.type',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.BILL_TYPE,
    },
    BILLING_CYCLE: {
      index: 3,
      id: 'billingCycle',
      label: 'BillingRun.FilterLabels.billingCycle',
      dynamicFetching: { isDynamic: true, key: 'label' },
      type: FILTER_TYPE.AUTOCOMPLETE,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CONTRACT_BILLING_CYCLE,
    },
    RUN_DATE: {
      index: 4,
      id: 'runDate',
      label: 'BillingRun.FilterLabels.runDate',
      type: FILTER_TYPE.DATE_FIELD,
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
      label: 'BillingRun.FilterLabels.startDate',
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
      index: 6,
      id: 'endDate',
      label: 'BillingRun.FilterLabels.endDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    BILL_ID: {
      index: 7,
      id: 'billId',
      label: 'BillingRun.FilterLabels.billId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    REF_CONTRACT: {
      index: 8,
      id: 'contractRef',
      label: 'BillingRun.FilterLabels.contractRef',
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
      index: 9,
      id: 'perimeterRef',
      label: 'BillingRun.FilterLabels.perimeterRef',
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
    BILLING_RUN_ABOUT: {
      tabLabel: 'TableTabs.bill.billingRun',
      FIELDS: [
        {
          label: 'BillingRun.TableHeader.billingCycle',
          type: 'RHFTextField',
          getTranslatedValue: (billingRun) => billingRun?.billingCycle,
        },
        {
          label: 'Bill.TableHeader.runDate',
          getCurrentValue: (billingRun) => billingRun.runDate,
          type: 'RHFDatePicker',
        },
      ],
    },
  },
};

export default BILLINGRUN_CONFIG;
