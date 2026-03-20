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
import PARAMETERS_CONFIG from './parameters';
import * as Yup from 'yup';

const BILLABLE_CHARGE_CONFIG = {
  getConfig: (posId, contractId) => ({
    COLUMNS: [
      {
        id: 'id',
        label: 'BillableCharge.TableHeader.id',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            { value: 'id', type: 'text' },

            { value: 'posRef', type: 'text' },
          ],
        },
      },
      {
        id: 'period',
        label: 'BillableCharge.TableHeader.period',
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
        id: 'externalInvoice',
        label: 'BillableCharge.TableHeader.externalInvoice',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            { value: 'externalInvoiceRef', type: 'text' },
            { value: 'externalInvoiceDate', type: 'date' },
          ],
        },
      },
      {
        id: 'receptionDate',
        label: 'BillableCharge.TableHeader.receptionDate',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [{ value: 'receptionDate', type: 'date' }],
        },
      },
      {
        id: 'billableChargeType',
        label: 'BillableCharge.TableHeader.billableChargeType',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            { beTransl: true, value: 'billableChargeType', type: 'text' },
          ],
        },
      },
      {
        id: 'type',
        label: 'BillableCharge.TableHeader.type',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            { translParam: 'meterReadType', value: 'type', type: 'text' },
            {
              translParam: 'billableChargeContext',
              value: 'context',
              type: 'text',
            },
          ],
        },
      },

      {
        id: 'source',
        label: 'BillableCharge.TableHeader.source',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            {
              translParam: 'billableChargeSource',
              value: 'source',
              type: 'text',
            },
          ],
        },
      },
      {
        id: 'status',
        label: 'BillableCharge.TableHeader.status',
        align: 'left',
        cell: {
          renderer: StatusLabel,
          value: [
            {
              type: 'billableCharge',
            },
          ],
        },
      },
      {
        id: '',
        label: '',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            {
              type: 'duplicate',
            },
          ],
        },
      },
    ],
    FILTERS: {
      DIRECTION: {
        index: 0,
        id: 'direction',
        label: 'BillableCharge.FilterLabels.direction',
        type: FILTER_TYPE.TAB,
        size: {
          xs: 12,
          sm: 6,
          md: 4,
          lg: 4,
        },
        defaultValue: '*',
        parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
      },
      ID: {
        index: 1,
        id: 'id',
        label: 'BillableCharge.FilterLabels.id',
        type: FILTER_TYPE.TEXT_FIELD,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '',
      },
      START_DATE: {
        index: 2,
        id: 'startDate',
        label: 'BillableCharge.FilterLabels.startDate',
        type: FILTER_TYPE.DATE_FIELD,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '',
      },
      END_DATE: {
        index: 3,
        id: 'endDate',
        label: 'BillableCharge.FilterLabels.endDate',
        type: FILTER_TYPE.DATE_FIELD,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '',
      },
      RECEPTION_DATE: {
        index: 4,
        id: 'receptionDate',
        label: 'BillableCharge.FilterLabels.receptionDate',
        type: FILTER_TYPE.DATE_FIELD,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '',
      },
      BILLABLE_CHARGE_TYPE: {
        index: 5,
        id: 'billableChargeType',
        label: 'BillableCharge.FilterLabels.billableChargeType',
        type: FILTER_TYPE.AUTOCOMPLETE,
        parameterName: PARAMETERS_CONFIG.NAME.BILLABLE_CHARGE_TYPE,
        dynamicFetching: { isDynamic: true, key: 'label' },
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      TYPE: {
        index: 6,
        id: 'type',
        label: 'BillableCharge.FilterLabels.type',
        type: FILTER_TYPE.SELECT_BOX,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '*',
        parameterName: PARAMETERS_CONFIG.NAME.METER_READ_TYPE,
      },
      CONTEXT: {
        index: 7,
        id: 'context',
        label: 'BillableCharge.FilterLabels.context',
        type: FILTER_TYPE.SELECT_BOX,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '*',
        parameterName: PARAMETERS_CONFIG.NAME.BILLABLE_CHARGE_CONTEXT,
      },

      SOURCE: {
        index: 8,
        id: 'source',
        label: 'BillableCharge.FilterLabels.source',
        type: FILTER_TYPE.SELECT_BOX,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '*',
        parameterName: PARAMETERS_CONFIG.NAME.BILLABLE_CHARGE_SOURCE,
      },
      STATUS: {
        index: 9,
        id: 'status',
        label: 'BillableCharge.FilterLabels.status',
        type: FILTER_TYPE.SELECT_BOX,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '*',
        parameterName: PARAMETERS_CONFIG.NAME.BILLABLE_CHARGE_STATUS,
      },

      ...(!posId && {
        POS_REF: {
          index: 10,
          id: 'posRef',
          label: 'BillableCharge.FilterLabels.pos',
          type: FILTER_TYPE.TEXT_FIELD,
          size: { xs: 12, sm: 6, md: 3, lg: 3 },
          defaultValue: '',
        },
      }),
      ...(!contractId && {
        CONTRACT_REF: {
          index: 11,
          id: 'contractRef',
          label: 'BillableCharge.FilterLabels.contract',
          type: FILTER_TYPE.TEXT_FIELD,
          size: { xs: 12, sm: 6, md: 3, lg: 3 },
          defaultValue: '',
        },
      }),
    },
    FORMS: {
      BILLABLE_CHARGE_ABOUT: {
        tabLabel: 'TableTabs.billableCharge.billableCharge',
        FIELDS: [
          !posId && {
            name: 'posRef',
            label: 'BillableCharge.Forms.pos',
            type: 'RHFAutocomplete',
            enumId: 'reference',
            validation: Yup.string().required('Error.isRequired'),
            autoSelectSingleOption: true,
            dynamicFetching: {
              isDynamic: true,
              key: 'reference',
              minCharacter: 3,
            },
            disableEdit: true,
            getCurrentValue: (consumption) => consumption.posRef,
            getOptionDisplay: (option) => `${option.reference}`,
            additionelParams: (parameter) =>
              parameter.contractId ? '&contractId=' + parameter.contractId : '',
            parameterName: PARAMETERS_CONFIG.NAME.POS,
            size: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 12,
            },
          },
          {
            name: 'billableChargeTypeId',
            label: 'BillableCharge.Forms.billableChargeType',
            type: 'RHFAutocomplete',
            dynamicFetching: { isDynamic: true, key: 'label' },
            getTranslatedValue: (billableCharge) =>
              billableCharge?.billableChargeType,
            getCurrentValue: (billableCharge) =>
              billableCharge.billableChargeTypeId,
            parameterName: PARAMETERS_CONFIG.NAME.BILLABLE_CHARGE_TYPE,
            size: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 12,
            },
          },
          {
            name: 'context',
            label: 'BillableCharge.Forms.context',
            type: 'RHFSelect',
            hideOnBoxInfo: true,
            getCurrentValue: (billableCharge) => billableCharge.context,
            parameterName: PARAMETERS_CONFIG.NAME.BILLABLE_CHARGE_CONTEXT,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'market',
            label: 'BillableCharge.Forms.market',
            type: 'RHFSelect',
            validation: Yup.string().required('Error.isRequired'),
            getCurrentValue: (billableCharge) => billableCharge.market,
            parameterName: PARAMETERS_CONFIG.NAME.MARKET,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'direction',
            label: 'BillableCharge.Forms.direction',
            type: 'RHFSelect',
            validation: Yup.string().required('Error.isRequired'),
            getCurrentValue: (billableCharge) => billableCharge.direction,
            parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },

          {
            name: 'source',
            label: 'BillableCharge.Forms.source',
            type: 'RHFSelect',
            validation: Yup.string().required('Error.isRequired'),
            getCurrentValue: (billableCharge) => billableCharge.source,
            parameterName: PARAMETERS_CONFIG.NAME.BILLABLE_CHARGE_SOURCE,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'startDate',
            label: 'BillableCharge.Forms.startDate',
            type: 'RHFDatePicker',
            hideOnBoxInfo: true,
            getCurrentValue: (billableCharge) => billableCharge.startDate,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'endDate',
            label: 'BillableCharge.Forms.endDate',
            type: 'RHFDatePicker',
            hideOnBoxInfo: true,
            getCurrentValue: (billableCharge) => billableCharge.endDate,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'receptionDate',
            type: 'RHFDatePicker',
            label: 'BillableCharge.Forms.receptionDate',
            getCurrentValue: (billableCharge) => billableCharge.receptionDate,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'externalInvoiceDate',
            type: 'RHFDatePicker',
            label: 'BillableCharge.Forms.externalInvoiceDate',
            getCurrentValue: (billableCharge) =>
              billableCharge.externalInvoiceDate,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },

          {
            name: 'type',
            label: 'BillableCharge.Forms.type',
            type: 'RHFSelect',
            hideOnBoxInfo: true,
            validation: Yup.string().required('Error.isRequired'),
            getCurrentValue: (billableCharge) => billableCharge.type,
            parameterName: PARAMETERS_CONFIG.NAME.METER_READ_TYPE,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'status',
            label: 'BillableCharge.Forms.status',
            type: 'RHFSelect',
            hideOnBoxInfo: true,
            validation: Yup.string().required('Error.isRequired'),
            getCurrentValue: (billableCharge) => billableCharge.status,
            parameterName: PARAMETERS_CONFIG.NAME.BILLABLE_CHARGE_STATUS,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'externalInvoiceRef',
            label: 'BillableCharge.Forms.externalInvoiceRef',
            type: 'RHFTextField',
            getCurrentValue: (billableCharge) =>
              billableCharge.externalInvoiceRef,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'amount',
            label: 'BillableCharge.Forms.amount',
            type: 'RHFTextField',
            getCurrentValue: (billableCharge) => billableCharge.amount,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
        ].filter(Boolean),
      },
    },
  }),
};

export default BILLABLE_CHARGE_CONFIG;
