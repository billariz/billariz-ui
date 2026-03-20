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

const CONSUMPTION_CONFIG = {
  getConfig: (posId, contractId) => ({
    COLUMNS: [
      {
        id: 'id',
        label: 'Consumption.TableHeader.id',
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
        label: 'Consumption.TableHeader.period',
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
        id: 'readingDate',
        label: 'Consumption.TableHeader.readingDate',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [{ value: 'readingDate', type: 'date' }],
        },
      },
      {
        id: 'receptionDate',
        label: 'Consumption.TableHeader.receptionDate',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [{ value: 'receptionDate', type: 'date' }],
        },
      },
      {
        id: 'type',
        label: 'Consumption.TableHeader.type',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            { translParam: 'meterReadType', value: 'type', type: 'text' },
            { value: 'context', type: 'text' },
          ],
        },
      },
      {
        id: 'quality',
        label: 'Consumption.TableHeader.quality',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            { translParam: 'meterReadQuality', value: 'quality', type: 'text' },
          ],
        },
      },
      {
        id: 'totalQuantity',
        label: 'Consumption.TableHeader.totalQuantity',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            { value: 'totalQuantity', type: 'text' },
            { translParam: 'sqType', value: 'unit', type: 'text' },
          ],
        },
      },
      {
        id: 'touGroup',
        label: 'Consumption.TableHeader.touGroup',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [{ translParam: 'touGroup', value: 'touGroup', type: 'text' }],
        },
      },
      {
        id: 'source',
        label: 'Consumption.TableHeader.source',
        align: 'left',
        cell: {
          renderer: MultilineCellRenderer,
          value: [
            { translParam: 'meterReadSource', value: 'source', type: 'text' },
          ],
        },
      },
      {
        id: 'status',
        label: 'Consumption.TableHeader.status',
        align: 'left',
        cell: {
          renderer: StatusLabel,
          value: [
            {
              type: 'meterRead',
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
        label: 'Consumption.FilterLabels.direction',
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
        label: 'Consumption.FilterLabels.id',
        type: FILTER_TYPE.TEXT_FIELD,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '',
      },
      START_DATE: {
        index: 2,
        id: 'startDate',
        label: 'Consumption.FilterLabels.startDate',
        type: FILTER_TYPE.DATE_FIELD,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '',
      },
      END_DATE: {
        index: 3,
        id: 'endDate',
        label: 'Consumption.FilterLabels.endDate',
        type: FILTER_TYPE.DATE_FIELD,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '',
      },
      TYPE: {
        index: 4,
        id: 'type',
        label: 'Consumption.FilterLabels.type',
        type: FILTER_TYPE.SELECT_BOX,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '*',
        parameterName: PARAMETERS_CONFIG.NAME.METER_READ_TYPE,
      },
      CONTEXT: {
        index: 5,
        id: 'context',
        label: 'Consumption.FilterLabels.context',
        type: FILTER_TYPE.SELECT_BOX,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '*',
        parameterName: PARAMETERS_CONFIG.NAME.METER_READ_CONTEXT,
      },
      QUALITY: {
        index: 6,
        id: 'quality',
        label: 'Consumption.FilterLabels.quality',
        parameterName: PARAMETERS_CONFIG.NAME.METER_READ_QUALITY,
        type: FILTER_TYPE.SELECT_BOX,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '*',
      },
      SOURCE: {
        index: 7,
        id: 'source',
        label: 'Consumption.FilterLabels.source',
        type: FILTER_TYPE.SELECT_BOX,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '*',
        parameterName: PARAMETERS_CONFIG.NAME.METER_READ_SOURCE,
      },
      STATUS: {
        index: 8,
        id: 'status',
        label: 'Consumption.FilterLabels.status',
        type: FILTER_TYPE.SELECT_BOX,
        size: { xs: 12, sm: 6, md: 3, lg: 3 },
        defaultValue: '*',
        parameterName: PARAMETERS_CONFIG.NAME.METER_READ_STATUS,
      },
      ...(!posId && {
        POS_REF: {
          index: 9,
          id: 'posRef',
          label: 'Consumption.FilterLabels.pos',
          type: FILTER_TYPE.TEXT_FIELD,
          size: { xs: 12, sm: 6, md: 3, lg: 3 },
          defaultValue: '',
        },
      }),
      ...(!contractId && {
        CONTRACT_REF: {
          index: 10,
          id: 'contractRef',
          label: 'Consumption.FilterLabels.contract',
          type: FILTER_TYPE.TEXT_FIELD,
          size: { xs: 12, sm: 6, md: 3, lg: 3 },
          defaultValue: '',
        },
      }),
    },
    FORMS: {
      CONSUMPTION_ABOUT: {
        tabLabel: 'TableTabs.consumption.consumption',
        FIELDS: [
          !posId && {
            name: 'posRef',
            label: 'Consumption.TableHeader.pos',
            type: 'RHFAutocomplete',
            enumId: 'reference',
            validation: Yup.string().required('Error.isRequired'),
            dynamicFetching: {
              isDynamic: true,
              key: 'reference',
              minCharacter: 3,
            },
            disableEdit: true,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            autoSelectSingleOption: true,
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
            name: 'market',
            label: 'Consumption.TableHeader.market',
            type: 'RHFSelect',
            getCurrentValue: (consumption) => consumption.market,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            validation: Yup.string().required('Error.isRequired'),
            parameterName: PARAMETERS_CONFIG.NAME.MARKET,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'startDate',
            label: 'Consumption.TableHeader.startDate',
            type: 'RHFDatePicker',
            hideOnBoxInfo: true,
            getCurrentValue: (consumption) => consumption.startDate,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'endDate',
            label: 'Consumption.TableHeader.endDate',
            type: 'RHFDatePicker',
            hideOnBoxInfo: true,
            validation: Yup.string().required('Error.isRequired'),
            getCurrentValue: (consumption) => consumption.endDate,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'readingDate',
            label: 'Consumption.TableHeader.readingDate',
            type: 'RHFDatePicker',
            getCurrentValue: (consumption) => consumption.readingDate,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'receptionDate',
            label: 'Consumption.TableHeader.receptionDate',
            type: 'RHFDatePicker',
            getCurrentValue: (consumption) => consumption.receptionDate,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'quality',
            label: 'Consumption.TableHeader.quality',
            type: 'RHFSelect',
            parameterName: PARAMETERS_CONFIG.NAME.METER_READ_QUALITY,
            getCurrentValue: (consumption) => consumption.quality,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'touGroup',
            label: 'Consumption.TableHeader.touGroup',
            type: 'RHFSelect',
            parameterName: PARAMETERS_CONFIG.NAME.TOU_GROUP,
            getCurrentValue: (consumption) => consumption.touGroup,
            validation: Yup.string().required('Error.isRequired'),
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'totalQuantity',
            label: 'Consumption.TableHeader.totalQuantity',
            type: 'RHFTextField',
            getCurrentValue: (consumption) => consumption.totalQuantity,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'unit',
            label: 'Consumption.TableHeader.unit',
            type: 'RHFSelect',
            parameterName: PARAMETERS_CONFIG.NAME.SQ_TYPE,
            getCurrentValue: (consumption) => consumption.unit,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            validation: Yup.string().required('Error.isRequired'),
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'source',
            label: 'Consumption.TableHeader.source',
            type: 'RHFSelect',
            parameterName: PARAMETERS_CONFIG.NAME.METER_READ_SOURCE,
            getCurrentValue: (consumption) => consumption.source,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'direction',
            label: 'Consumption.TableHeader.direction',
            type: 'RHFSelect',
            getCurrentValue: (consumption) => consumption.direction,
            validation: Yup.string().required('Error.isRequired'),
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'context',
            label: 'Consumption.TableHeader.context',
            type: 'RHFSelect',
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            getCurrentValue: (consumption) => consumption.context,
            parameterName: PARAMETERS_CONFIG.NAME.METER_READ_CONTEXT,
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'climaticCoef',
            label: 'Consumption.TableHeader.climaticCoef',
            type: 'RHFTextField',
            getCurrentValue: (consumption) => consumption.climaticCoef,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'calorificCoef',
            label: 'Consumption.TableHeader.calorificCoef',
            type: 'RHFTextField',
            getCurrentValue: (consumption) => consumption.calorificCoef,
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            size: {
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6,
            },
          },
          {
            name: 'type',
            label: 'Consumption.TableHeader.type',
            type: 'RHFSelect',
            validation: Yup.string().required('Error.isRequired'),
            disabledOnCondition: (consumption) =>
              consumption.source == 'MARKET',
            hideOnBoxInfo: true,
            getCurrentValue: (consumption) => consumption.type,
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
            label: 'Consumption.TableHeader.status',
            type: 'RHFSelect',
            hideOnBoxInfo: true,
            validation: Yup.string().required('Error.isRequired'),
            parameterName: PARAMETERS_CONFIG.NAME.METER_READ_STATUS,
            getCurrentValue: (consumption) => consumption.status,
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

export default CONSUMPTION_CONFIG;
