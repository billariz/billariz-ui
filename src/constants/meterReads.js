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

const METER_READS_CONFIG = {
  COLUMNS: [
    {
      id: 'meterReadId',
      label: 'MeterRead.TableHeader.meterReadId',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'meterReadId', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },

    {
      id: 'period',
      label: 'MeterRead.TableHeader.period',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'startDate', type: 'datetime' },
          { value: 'endDate', type: 'datetime' },
        ],
      },
    },
    {
      id: 'quantity',
      label: 'MeterRead.TableHeader.quantity',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'quantity', type: 'text' },
          { translParam: 'sqType', value: 'unit', type: 'text' },
        ],
      },
    },
    {
      id: 'tou',
      label: 'MeterRead.TableHeader.tou',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'tou', value: 'tou', type: 'text' }],
      },
    },
    {
      id: 'measureType',
      label: 'MeterRead.TableHeader.measureType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'measureType', value: 'measureType', type: 'text' },
        ],
      },
    },

    {
      id: 'gridCode',
      label: 'MeterRead.TableHeader.gridCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'gridCode', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    SOURCE: {
      index: 0,
      id: 'source',
      label: 'MeterRead.FilterLabels.source',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.SOURCE,
    },
    ID: {
      index: 1,
      id: 'meterReadId',
      label: 'MeterRead.FilterLabels.meterReadId',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 4,
        md: 4,
        lg: 4,
      },
      defaultValue: '',
    },

    TOU: {
      index: 2,
      id: 'tou',
      label: 'MeterRead.FilterLabels.tou',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 4,
        md: 4,
        lg: 4,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOU,
    },
    MEASURE_TYPE: {
      index: 3,
      id: 'measureType',
      label: 'MeterRead.FilterLabels.measureType',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 4,
        md: 4,
        lg: 4,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.MEASURE_TYPE,
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'startDate',
        label: 'MeterRead.TableHeader.startDate',
        type: 'RHFDatePicker',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (meterRead) => meterRead.startDate,
        size: {
          xs: 12,
          sm: 12,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'endDate',
        label: 'MeterRead.TableHeader.endDate',
        type: 'RHFDatePicker',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (meterRead) => meterRead.endDate,
        size: {
          xs: 12,
          sm: 12,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'measureType',
        label: 'MeterRead.TableHeader.measureType',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (meterRead) => meterRead.measureType,
        parameterName: PARAMETERS_CONFIG.NAME.MEASURE_TYPE,
        size: {
          xs: 12,
          sm: 12,
          md: 3,
          lg: 3,
        },
      },

      {
        name: 'quantity',
        label: 'MeterRead.TableHeader.quantity',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (meterRead) => meterRead.quantity,
        size: {
          xs: 12,
          sm: 12,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'unit',
        label: 'MeterRead.TableHeader.unit',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (capacity) => capacity.unit,
        parameterName: PARAMETERS_CONFIG.NAME.SQ_TYPE,
        size: {
          xs: 12,
          sm: 12,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'tou',
        label: 'MeterRead.TableHeader.tou',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        parameterName: PARAMETERS_CONFIG.NAME.TOU,
        getCurrentValue: (meterRead) => meterRead.tou,
        size: {
          xs: 12,
          sm: 12,
          md: 3,
          lg: 3,
        },
      },

      {
        name: 'gridCode',
        label: 'MeterRead.TableHeader.gridCode',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (meterRead) => meterRead.gridCode,
        size: {
          xs: 12,
          sm: 12,
          md: 3,
          lg: 3,
        },
      },
    ],
  },
};

export default METER_READS_CONFIG;
