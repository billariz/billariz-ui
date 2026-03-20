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
import * as Yup from 'yup';
import PARAMETERS_CONFIG from './parameters';
import { FILTER_TYPE } from './enums';

const GEO_REF_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'GeoRef.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'areaCode',
      label: 'GeoRef.TableHeader.areaCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'areaCode', type: 'text' }],
      },
    },
    {
      id: 'market',
      label: 'GeoRef.TableHeader.market',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'market', type: 'text' }],
      },
    },
    {
      id: 'startDate',
      label: 'GeoRef.TableHeader.startDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'startDate', type: 'date' }],
      },
    },
    {
      id: 'endDate',
      label: 'GeoRef.TableHeader.endDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'endDate', type: 'date' }],
      },
    },
    {
      id: 'dgoRank',
      label: 'GeoRef.TableHeader.dgoRank',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'dgoRank', type: 'text' }],
      },
    },
    {
      id: 'dispatchRate',
      label: 'GeoRef.TableHeader.dispatchRate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'dispatchRate', type: 'text' }],
      },
    },
    {
      id: 'dgoRank1',
      label: 'GeoRef.TableHeader.dgoRank1',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'dgoRank1', type: 'text' }],
      },
    },
    {
      id: 'dgoRank2',
      label: 'GeoRef.TableHeader.dgoRank2',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'dgoRank2', type: 'text' }],
      },
    },
    {
      id: 'netAreaCode',
      label: 'GeoRef.TableHeader.netAreaCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'netAreaCode', type: 'text' }],
      },
    },
    {
      id: 'netAreaLabel',
      label: 'GeoRef.TableHeader.netAreaLabel',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'netAreaLabel', type: 'text' }],
      },
    },
    {
      id: 'weatherChannelCode',
      label: 'GeoRef.TableHeader.weatherChannelCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'weatherChannelCode', type: 'text' }],
      },
    },
    {
      id: 'climaticZone',
      label: 'GeoRef.TableHeader.climaticZone',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'climaticZone', type: 'text' }],
      },
    },
    {
      id: 'proximityRateCoef',
      label: 'GeoRef.TableHeader.proximityRateCoef',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'proximityRateCoef', type: 'text' }],
      },
    },
    {
      id: 'tgoCode',
      label: 'GeoRef.TableHeader.tgoCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'tgoCode', type: 'text' }],
      },
    },
    {
      id: 'nbrOfPos',
      label: 'GeoRef.TableHeader.nbrOfPos',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'nbrOfPos', type: 'text' }],
      },
    },
    {
      id: 'energyNature',
      label: 'GeoRef.TableHeader.energyNature',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'energyNature', type: 'text' }],
      },
    },
    {
      id: 'regionalRateLevel',
      label: 'GeoRef.TableHeader.regionalRateLevel',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'regionalRateLevel', type: 'text' }],
      },
    },
    {
      id: 'balanceZone',
      label: 'GeoRef.TableHeader.balanceZone',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'balanceZone', type: 'text' }],
      },
    },
    {
      id: 'coefA',
      label: 'GeoRef.TableHeader.coefA',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'coefA', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    ID: {
      index: 0,
      id: 'id',
      label: 'GeoRef.FilterLabels.id',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    AREACODE: {
      index: 1,
      id: 'areaCode',
      label: 'GeoRef.FilterLabels.areaCode',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    MARKET: {
      index: 2,
      id: 'market',
      label: 'GeoRef.FilterLabels.market',
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
    DISPATCH_RATE: {
      index: 3,
      id: 'dispatchRate',
      label: 'GeoRef.FilterLabels.dispatchRate',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    NET_AREA_CODE: {
      index: 4,
      id: 'netAreaCode',
      label: 'GeoRef.FilterLabels.netAreaCode',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    WEATHER_CHANNEL_CODE: {
      index: 5,
      id: 'weatherChannelCode',
      label: 'GeoRef.FilterLabels.weatherChannelCode',
      type: FILTER_TYPE.SELECT_BOX,

      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.WEATHER_CHANNEL_CODE,
    },

    CLIMARIC_ZONE: {
      index: 6,
      id: 'climaticZone',
      label: 'GeoRef.FilterLabels.climaticZone',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ENERGY_NATURE: {
      index: 7,
      id: 'energyNature',
      label: 'GeoRef.FilterLabels.energyNature',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    TGO_CODE: {
      index: 8,
      id: 'tgoCode',
      label: 'GeoRef.FilterLabels.tgoCode',
      type: FILTER_TYPE.SELECT_BOX,

      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TGO,
    },
    BALANCE_ZONE: {
      index: 9,
      id: 'balanceZone',
      label: 'GeoRef.FilterLabels.balanceZone',
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
    FIELDS: [
      {
        name: 'proximityRateCoef',
        label: 'GeoRef.TableHeader.proximityRateCoef',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.proximityRateCoef,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'balanceZone',
        label: 'GeoRef.TableHeader.balanceZone',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.balanceZone,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'regionalRateLevel',
        label: 'GeoRef.TableHeader.regionalRateLevel',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.regionalRateLevel,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'startDate',
        label: 'GeoRef.TableHeader.startDate',
        type: 'RHFDatePicker',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.startDate,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'endDate',
        label: 'GeoRef.TableHeader.endDate',
        type: 'RHFDatePicker',
        getCurrentValue: (parameter) => parameter.endDate,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'climaticZone',
        label: 'GeoRef.TableHeader.climaticZone',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.climaticZone,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'dgoRank1',
        label: 'GeoRef.TableHeader.dgoRank1',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.dgoRank1,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'dgoRank2',
        label: 'GeoRef.TableHeader.dgoRank2',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.dgoRank2,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'nbrOfPos',
        label: 'GeoRef.TableHeader.nbrOfPos',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.nbrOfPos,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'dgoRank',
        label: 'GeoRef.TableHeader.dgoRank',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.dgoRank,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'dispatchRate',
        label: 'GeoRef.TableHeader.dispatchRate',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.dispatchRate,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'energyNature',
        label: 'GeoRef.TableHeader.energyNature',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.energyNature,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'areaCode',
        label: 'GeoRef.TableHeader.areaCode',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.areaCode,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'market',
        label: 'GeoRef.TableHeader.Market',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.market,
        parameterName: PARAMETERS_CONFIG.NAME.MARKET,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'netAreaCode',
        label: 'GeoRef.TableHeader.netAreaCode',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.netAreaCode,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'netAreaLabel',
        label: 'GeoRef.TableHeader.netAreaLabel',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.netAreaLabel,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'coefA',
        label: 'GeoRef.TableHeader.coefA',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.coefA,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'tgoCode',
        label: 'GeoRef.FilterLabels.tgoCode',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.tgoCode,
        parameterName: PARAMETERS_CONFIG.NAME.TGO,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'weatherChannelCode',
        label: 'GeoRef.FilterLabels.weatherChannelCode',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.weatherChannelCode,
        parameterName: PARAMETERS_CONFIG.NAME.WEATHERCHANNELCODE,
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

export default GEO_REF_CONFIG;
