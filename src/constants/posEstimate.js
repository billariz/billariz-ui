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

import * as Yup from 'yup';
import { MultilineCellRenderer } from 'src/components/table/cell/renderer';
import { FILTER_TYPE } from './enums';
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';
import PARAMETERS_CONFIG from './parameters';

const ESTIMATE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'PosCapacity.TableHeader.id',
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
      label: 'PosCapacity.TableHeader.startDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'startDate', type: 'date' }],
      },
    },
    {
      id: 'endDate',
      label: 'PosCapacity.TableHeader.endDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'endDate', type: 'date' }],
      },
    },
    {
      id: 'tou',
      label: 'PosCapacity.TableHeader.tou',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'tou', value: 'tou', type: 'text' }],
      },
    },
    {
      id: 'value',
      label: 'PosCapacity.TableHeader.value',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'value', type: 'text' },
          { translParam: 'sqType', value: 'unit', type: 'text' },
        ],
      },
    },
    {
      id: 'type',
      label: 'PosCapacity.TableHeader.type',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'estimateType', value: 'estimateType', type: 'text' },
        ],
      },
    },
    {
      id: 'source',
      label: 'PosCapacity.TableHeader.source',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'posDataSource', value: 'source', type: 'text' },
        ],
      },
    },
    {
      id: 'status',
      label: 'PosCapacity.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            translParam: 'posDataStatus',
            type: 'pointOfServiceEstimate',
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
    SOURCE: {
      index: 0,
      id: 'source',
      label: 'PosEstimate.FilterLabels.source',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.POS_DATA_SOURCE,
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'PosEstimate.FilterLabels.id',
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
      index: 2,
      id: 'startDate',
      label: 'PosEstimate.FilterLabels.startDate',
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
      index: 3,
      id: 'endDate',
      label: 'PosEstimate.FilterLabels.endDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    POSTE: {
      index: 4,
      id: 'tou',
      label: 'PosEstimate.FilterLabels.tou',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOU,
    },
    STATUS: {
      index: 5,
      id: 'status',
      label: 'PosEstimate.FilterLabels.status',
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
    ESTIMATE_ABOUT: {
      FIELDS: [
        {
          name: 'posId',
          label: 'PosEstimate.TableHeader.pos',
          type: 'RHFAutocomplete',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posEstimate) => posEstimate.source == 'MARKET',
          getCurrentValue: (posEstimate) => posEstimate.posId,
          getOptionDisplay: (option) => `${option.reference}`,
          autoSelectSingleOption: true,
          additionelParams: (parameter) =>
            parameter.contractId ? `&contractId=${parameter.contractId}` : '',
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
          label: 'PosEstimate.TableHeader.startDate',
          type: 'RHFDatePicker',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (estimate) => estimate.startDate,
          disabledOnCondition: (posEstimate) => posEstimate.source == 'MARKET',
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'endDate',
          label: 'PosEstimate.TableHeader.endDate',
          type: 'RHFDatePicker',
          getCurrentValue: (estimate) => estimate.endDate,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'value',
          label: 'PosEstimate.TableHeader.estimate',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posEstimate) => posEstimate.source == 'MARKET',
          getCurrentValue: (capacity) => capacity.value,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'unit',
          label: 'PosEstimate.TableHeader.unit',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posEstimate) => posEstimate.source == 'MARKET',
          getCurrentValue: (capacity) => capacity.unit,
          parameterName: PARAMETERS_CONFIG.NAME.SQ_TYPE,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'estimateType',
          label: 'PosEstimate.TableHeader.estimateType',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.ESTMATION_TYPE,
          getCurrentValue: (estimate) => estimate.estimateType,
          disabledOnCondition: (posEstimate) => posEstimate.source == 'MARKET',
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'tou',
          label: 'PosEstimate.TableHeader.tou',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.TOU,
          getCurrentValue: (estimate) => estimate.tou,
          disabledOnCondition: (posEstimate) => posEstimate.source == 'MARKET',
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'source',
          label: 'PosEstimate.TableHeader.source',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.POS_DATA_SOURCE,
          getCurrentValue: (estimate) => estimate.source,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'status',
          label: 'PosEstimate.FilterLabels.status',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posEstimate) => posEstimate.source == 'MARKET',
          getCurrentValue: (posConfiguration) => posConfiguration.status,
          parameterName: PARAMETERS_CONFIG.NAME.POS_DATA_STATUS,
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

export default ESTIMATE_CONFIG;
