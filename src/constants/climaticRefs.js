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
import { FILTER_TYPE } from './enums';
import PARAMETERS_CONFIG from './parameters';

const CLIMATIC_REFS_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'ClimaticRef.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'weatherChannelCode',
      label: 'ClimaticRef.TableHeader.weatherChannelCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'weatherChannelCode', type: 'text' }],
      },
    },
    {
      id: 'market',
      label: 'ClimaticRef.TableHeader.market',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'market', type: 'text' }],
      },
    },
    {
      id: 'profil',
      label: 'ClimaticRef.TableHeader.profil',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'profil', type: 'text' }],
      },
    },
    {
      id: 'zi',
      label: 'ClimaticRef.TableHeader.zi',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'zi', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    MARKET: {
      index: 0,
      id: 'market',
      label: 'ClimaticRef.FilterLabels.market',
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
    ID: {
      index: 1,
      id: 'id',
      label: 'ClimaticRef.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    WEATHERCHANNELCODE: {
      index: 2,
      id: 'weatherChannelCode',
      label: 'ClimaticRef.FilterLabels.weatherChannelCode',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 16,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.WEATHERCHANNELCODE,
    },
    PROFIL: {
      index: 3,
      id: 'profil',
      label: 'ClimaticRef.FilterLabels.profil',
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
    FIELDS: [
      {
        name: 'market',
        label: 'ClimaticRef.TableHeader.market',
        type: 'RHFSelect',
        parameterName: PARAMETERS_CONFIG.NAME.MARKET,
        validation: Yup.string(),
        getCurrentValue: (climaticRef) => climaticRef.market,
        getDefaultValue: () => '*',
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'profil',
        label: 'ClimaticRef.TableHeader.profil',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (cimaticRef) => cimaticRef.profil,
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'weatherChannelCode',
        label: 'ClimaticRef.TableHeader.weatherChannelCode',
        type: 'RHFSelect',
        parameterName: PARAMETERS_CONFIG.NAME.WEATHERCHANNELCODE,
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (climaticRef) => climaticRef.weatherChannelCode,
        getDefaultValue: () => '*',
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'zi',
        label: 'ClimaticRef.TableHeader.zi',
        type: 'RHFTextField',
        getCurrentValue: (cimaticRef) => cimaticRef.zi,
        size: {
          xs: 6,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
    ],
  },
};

export default CLIMATIC_REFS_CONFIG;
