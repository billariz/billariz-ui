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

const POS_CAPACITY_CONFIG = {
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
          { translParam: 'capacityType', value: 'capacityType', type: 'text' },
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
            type: 'pointOfServiceCapacity',
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
      label: 'PosCapacity.FilterLabels.source',
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
      label: 'PosCapacity.FilterLabels.id',
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
      label: 'PosCapacity.FilterLabels.startDate',
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
      label: 'PosCapacity.FilterLabels.endDate',
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
      label: 'PosCapacity.FilterLabels.tou',
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
      label: 'PosCapacity.FilterLabels.status',
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
    CAPACITY_ABOUT: {
      FIELDS: [
        {
          name: 'posId',
          label: 'PosCapacity.TableHeader.pos',
          type: 'RHFAutocomplete',
          validation: Yup.string().required('Error.isRequired'),
          autoSelectSingleOption: true,
          disabledOnCondition: (posCapacity) => posCapacity.source == 'MARKET',
          getCurrentValue: (posCapacity) => posCapacity.posId,
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
          label: 'PosCapacity.TableHeader.startDate',
          type: 'RHFDatePicker',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posCapacity) => posCapacity.source == 'MARKET',
          getCurrentValue: (capacity) => capacity.startDate,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'endDate',
          label: 'PosCapacity.TableHeader.endDate',
          type: 'RHFDatePicker',
          getCurrentValue: (capacity) => capacity.endDate,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'tou',
          label: 'PosCapacity.TableHeader.tou',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posCapacity) => posCapacity.source == 'MARKET',
          getCurrentValue: (capacity) => capacity.tou,
          parameterName: PARAMETERS_CONFIG.NAME.TOU,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'value',
          label: 'PosCapacity.TableHeader.capacity',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posCapacity) => posCapacity.source == 'MARKET',
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
          label: 'PosCapacity.TableHeader.unit',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posCapacity) => posCapacity.source == 'MARKET',
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
          name: 'capacityType',
          label: 'PosCapacity.TableHeader.capacityType',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posCapacity) => posCapacity.source == 'MARKET',
          getCurrentValue: (capacity) => capacity.capacityType,
          parameterName: PARAMETERS_CONFIG.NAME.CAPACITY_TYPE,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'source',
          label: 'PosCapacity.TableHeader.source',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (capacity) => capacity.source,
          parameterName: PARAMETERS_CONFIG.NAME.POS_DATA_SOURCE,
          size: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'status',
          label: 'PosCapacity.FilterLabels.status',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (posCapacity) => posCapacity.source == 'MARKET',
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

export default POS_CAPACITY_CONFIG;
