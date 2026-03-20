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
import * as Yup from 'yup';

const METER_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Meter.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'pointOfService.reference', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'startDate',
      label: 'Meter.TableHeader.startDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'startDate', type: 'date' }],
      },
    },
    {
      id: 'endDate',
      label: 'Meter.TableHeader.endDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'endDate', type: 'date' }],
      },
    },
    {
      id: 'meterNumber',
      label: 'Meter.TableHeader.meterNumber',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'meterNumber', type: 'text' }],
      },
    },
    {
      id: 'meterType',
      label: 'Meter.TableHeader.meterType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'meterType', value: 'meterType', type: 'text' }],
      },
    },
    {
      id: 'smartMeterStatus',
      label: 'Meter.TableHeader.smartMeterStatus',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'smartMeterStatus',
            value: 'smartMeterStatus',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'convertCoef',
      label: 'Meter.TableHeader.convertCoef',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'convertCoef', type: 'text' }],
      },
    },
    {
      id: 'digitNumber',
      label: 'Meter.TableHeader.digitNumber',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'digitNumber', type: 'text' }],
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
    ID: {
      index: 0,
      id: 'id',
      label: 'Meter.FilterLabels.id',
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
      index: 1,
      id: 'startDate',
      label: 'Meter.FilterLabels.startDate',
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
      index: 2,
      id: 'endDate',
      label: 'Meter.FilterLabels.endDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    METER_NUMBER: {
      index: 3,
      id: 'meterNumber',
      label: 'Meter.FilterLabels.meterNumber',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    METER_TYPE: {
      index: 4,
      id: 'meterType',
      label: 'Meter.FilterLabels.meterType',
      type: FILTER_TYPE.SELECT_BOX,
      parameterName: PARAMETERS_CONFIG.NAME.METER_TYPE,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
    },
    STATUS: {
      index: 5,
      id: 'smartMeterStatus',
      label: 'Meter.FilterLabels.smartMeterStatus',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.POS_DATA_STATUS,
    },
  },
  FORMS: {
    METER_ABOUT: {
      FIELDS: [
        {
          name: 'posId',
          label: 'Meter.TableHeader.pos',
          type: 'RHFAutocomplete',
          validation: Yup.string().required('Error.isRequired'),
          autoSelectSingleOption: true,
          getCurrentValue: (meter) => meter.posId,
          getOptionDisplay: (option) => `${option.reference}`,
          additionelParams: (parameter) =>
            parameter.contractId ? '&contractId=' + parameter.contractId : '',
          parameterName: PARAMETERS_CONFIG.NAME.POS,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'startDate',
          label: 'Meter.TableHeader.startDate',
          type: 'RHFDatePicker',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (meter) => meter.startDate,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'endDate',
          label: 'Meter.TableHeader.endDate',
          type: 'RHFDatePicker',
          getCurrentValue: (meter) => meter.endDate,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'meterType',
          label: 'Meter.TableHeader.meterType',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.METER_TYPE,
          getCurrentValue: (meter) => meter.meterType,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'smartMeterStatus',
          label: 'Meter.TableHeader.smartMeterStatus',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.SMART_METER_STATUS,
          getCurrentValue: (meter) => meter.smartMeterStatus,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'meterNumber',
          label: 'Meter.TableHeader.meterNumber',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (meter) => meter.meterNumber,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'digitNumber',
          label: 'Meter.TableHeader.digitNumber',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (meter) => meter.digitNumber,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'convertCoef',
          label: 'Meter.TableHeader.convertCoef',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (meter) => meter.convertCoef,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
      ],
    },
  },
};

export default METER_CONFIG;
