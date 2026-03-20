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

const POS_CONFIGURATION_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'PosConfig.TableHeader.id',
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
      label: 'PosConfig.TableHeader.startDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'startDate', type: 'date' }],
      },
    },
    {
      id: 'endDate',
      label: 'PosConfig.TableHeader.endDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'endDate', type: 'date' }],
      },
    },
    {
      id: 'category',
      label: 'PosConfig.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'posCategory', value: 'posCategory', type: 'text' },
        ],
      },
    },
    {
      id: 'gridRate-profile',
      label: 'PosConfig.TableHeader.gridRate-profile',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'gridRate', value: 'gridRate', type: 'text' },
          { translParam: 'profile', value: 'profile', type: 'text' },
        ],
      },
    },
    {
      id: 'meterReading',
      label: 'PosConfig.TableHeader.meterReading',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'billingFrequency',
            value: 'readingFrequency',
            type: 'text',
          },
          { value: 'readingPeriode', type: 'text' },
        ],
      },
    },
    {
      id: 'touGroup',
      label: 'PosConfig.TableHeader.touGroup',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'touGroup', value: 'touGroup', type: 'text' }],
      },
    },
    {
      id: 'source',
      label: 'PosConfig.TableHeader.source',
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
      label: 'PosConfig.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            translParam: 'posDataStatus',
            type: 'pointOfServiceConfiguration',
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
      label: 'PosConfig.FilterLabels.source',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.POS_DATA_SOURCE,
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'PosConfig.FilterLabels.id',
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
      label: 'PosConfig.FilterLabels.startDate',
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
      label: 'PosConfig.FilterLabels.endDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    POS_CATEGORY: {
      index: 4,
      id: 'posCategory',
      label: 'PosConfig.FilterLabels.posCategory',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.POS_CATEGORY,
    },
    FTA: {
      index: 5,
      id: 'gridRate',
      label: 'PosConfig.FilterLabels.gridRate',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.GRID_RATE,
    },
    PROFILE: {
      index: 6,
      id: 'profile',
      label: 'PosConfig.FilterLabels.profile',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.PROFILS,
    },
    OPTION: {
      index: 7,
      id: 'touGroup',
      label: 'PosConfig.FilterLabels.touGroup',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOU_GROUP,
    },

    STATUS: {
      index: 8,
      id: 'status',
      label: 'PosConfig.FilterLabels.status',
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
    FIELDS: [
      {
        name: 'posId',
        label: 'PosConfig.TableHeader.pos',
        type: 'RHFAutocomplete',
        validation: Yup.string().required('Error.isRequired'),
        disabledOnCondition: (posConfiguration) =>
          posConfiguration.source == 'MARKET',
        getCurrentValue: (posConfiguration) => posConfiguration.posId,
        getOptionDisplay: (option) => `${option.reference}`,
        additionelParams: (parameter) =>
          parameter.contractId ? '&contractId=' + parameter.contractId : '',
        autoSelectSingleOption: true,
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
        label: 'PosConfig.TableHeader.startDate',
        type: 'RHFDatePicker',
        validation: Yup.string().required('Error.isRequired'),
        disabledOnCondition: (posConfiguration) =>
          posConfiguration.source == 'MARKET',
        getCurrentValue: (posConfiguration) => posConfiguration.startDate,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'endDate',
        label: 'PosConfig.TableHeader.endDate',
        type: 'RHFDatePicker',
        getCurrentValue: (posConfiguration) => posConfiguration.endDate,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'posCategory',
        label: 'PosConfig.TableHeader.category',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        disabledOnCondition: (posConfiguration) =>
          posConfiguration.source == 'MARKET',
        getCurrentValue: (posConfiguration) => posConfiguration.posCategory,
        parameterName: PARAMETERS_CONFIG.NAME.POS_CATEGORY,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'gridRate',
        label: 'PosConfig.TableHeader.gridRate',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        parameterName: PARAMETERS_CONFIG.NAME.GRID_RATE,
        disabledOnCondition: (posConfiguration) =>
          posConfiguration.source == 'MARKET',
        getCurrentValue: (posConfiguration) => posConfiguration.gridRate,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'profile',
        label: 'PosConfig.TableHeader.profile',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        parameterName: PARAMETERS_CONFIG.NAME.PROFILS,
        disabledOnCondition: (posConfiguration) =>
          posConfiguration.source == 'MARKET',
        getCurrentValue: (posConfiguration) => posConfiguration.profile,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'readingFrequency',
        label: 'PosConfig.TableHeader.readingFrequency',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        parameterName: PARAMETERS_CONFIG.NAME.BILLING_FREQUENCY,
        disabledOnCondition: (posConfiguration) =>
          posConfiguration.source == 'MARKET',
        getCurrentValue: (posConfiguration) =>
          posConfiguration.readingFrequency,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'readingPeriode',
        label: 'PosConfig.TableHeader.readingPeriode',
        type: 'RHFDayMonthPicker',
        validation: Yup.string().required('Error.isRequired'),
        disabledOnCondition: (posConfiguration) =>
          posConfiguration.source == 'MARKET',
        getCurrentValue: (posConfiguration) => posConfiguration.readingPeriode,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'touGroup',
        label: 'PosConfig.TableHeader.touGroup',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        disabledOnCondition: (posConfiguration) =>
          posConfiguration.source == 'MARKET',
        getCurrentValue: (posConfiguration) => posConfiguration.touGroup,
        parameterName: PARAMETERS_CONFIG.NAME.TOU_GROUP,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'source',
        label: 'PosConfig.TableHeader.source',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (posConfiguration) => posConfiguration.source,
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
        label: 'PosConfig.TableHeader.status',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        disabledOnCondition: (posConfiguration) =>
          posConfiguration.source == 'MARKET',
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
};

export default POS_CONFIGURATION_CONFIG;
