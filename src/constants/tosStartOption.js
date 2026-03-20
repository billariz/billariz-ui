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

import * as Yup from 'yup';
import PARAMETERS_CONFIG from './parameters';

const TOS_START_OPTION_CONFIG = {
  COLUMNS: [
    {
      id: 'TermOfService',
      label: 'TermOfService.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'type', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'period',
      label: 'TermOfService.TableHeader.period',
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
      id: 'market',
      label: 'TermOfService.TableHeader.market',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'market', type: 'text' }],
      },
    },
    {
      id: 'priceMode',
      label: 'TermOfService.TableHeader.priceMode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'priceMode', type: 'text' }],
      },
    },
    {
      id: 'priceType',
      label: 'TermOfService.TableHeader.priceType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'priceType', type: 'text' }],
      },
    },
    {
      id: 'refDateTypeForFixedPrice',
      label: 'TermOfService.TableHeader.refDateTypeForFixedPrice',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'refDateTypeForFixedPrice',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'initialDuration',
      label: 'TermOfService.TableHeader.initialDuration',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'initialDuration', type: 'text' }],
      },
    },
    {
      id: 'minimumDuration',
      label: 'TermOfService.TableHeader.minimumDuration',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'minimumDuration', type: 'text' }],
      },
    },
    {
      id: 'renewalTosType',
      label: 'TermOfService.TableHeader.renewalTosType',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'renewalTosType', type: 'text' }],
      },
    },
    {
      id: 'renewalDuration',
      label: 'TermOfService.TableHeader.renewalDuration',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'renewalDuration', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    PRICE_TYPE: {
      index: 0,
      id: 'priceType',
      label: 'TermOfService.TableHeader.priceType',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.PRICE_TYPE,
    },
    PRICE_MODE: {
      index: 1,
      id: 'priceMode',
      label: 'TermOfService.TableHeader.priceMode',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.PRICE_MODE,
    },
    MARKET: {
      index: 2,
      id: 'market',
      label: 'TermOfService.TableHeader.market',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.MARKET,
    },
    TOS_TYPE: {
      index: 3,
      id: 'tosType',
      label: 'TermOfService.TableHeader.tosType',
      type: 'autocomplete',
      category: 'termOfService',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOS_TYPES,
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'type',
        label: 'TermOfService.TableHeader.tosType',
        type: 'RHFAutocomplete',
        category: 'termOfService',
        size: {
          xs: 12,
          sm: 6,
          md: 6,
          lg: 6,
        },
        addAllValue: true,
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.type,
        parameterName: PARAMETERS_CONFIG.NAME.TOS_TYPES,
      },
      {
        name: 'market',
        label: 'TermOfService.TableHeader.market',
        type: 'RHFSelect',
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.market,
        parameterName: PARAMETERS_CONFIG.NAME.MARKET,
      },
      {
        name: 'priceType',
        label: 'TermOfService.TableHeader.priceType',
        parameterName: PARAMETERS_CONFIG.NAME.PRICE_TYPE,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.priceType,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'priceMode',
        label: 'TermOfService.TableHeader.priceMode',
        parameterName: PARAMETERS_CONFIG.NAME.PRICE_MODE,
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.priceMode,
        size: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'refDateTypeForFixedPrice',
        label: 'TermOfService.TableHeader.refDateTypeForFixedPrice',
        type: 'RHFSelect',
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
        validation: Yup.string().when('priceMode', {
          is: 'FIXED',
          then: (schema) => schema.required('Error.isRequired'),
          otherwise: (schema) => schema.notRequired(),
        }),
        getCurrentValue: (parameter) => parameter.refDateTypeForFixedPrice,
        parameterName: PARAMETERS_CONFIG.NAME.REF_DATE_FIXED_PRICE,
      },
      {
        name: 'initialDuration',
        label: 'TermOfService.TableHeader.initialDuration',
        type: 'RHFTextField',
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
        getCurrentValue: (parameter) => parameter.initialDuration,
      },
      {
        name: 'minimumDuration',
        label: 'TermOfService.TableHeader.minimumDuration',
        type: 'RHFTextField',
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
        getCurrentValue: (parameter) => parameter.minimumDuration,
      },
      {
        name: 'renewalDuration',
        label: 'TermOfService.TableHeader.renewalDuration',
        type: 'RHFTextField',
        size: {
          xs: 12,
          sm: 6,
          md: 6,
          lg: 6,
        },
        getCurrentValue: (parameter) => parameter.renewalDuration,
      },
      {
        name: 'renewalTosType',
        label: 'TermOfService.TableHeader.renewalTosType',
        type: 'RHFAutocomplete',
        category: 'termOfService',
        addAllValue: true,

        // validation: Yup.string().required('is required'),
        getCurrentValue: (parameter) => parameter.renewalTosType,
        parameterName: PARAMETERS_CONFIG.NAME.TOS_TYPES,
        size: {
          xs: 12,
          sm: 6,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'startDate',
        label: 'Parameter.FilterLabels.startDate',
        type: 'RHFDatePicker',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.startDate,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'endDate',
        label: 'Parameter.FilterLabels.endDate',
        type: 'RHFDatePicker',
        getCurrentValue: (parameter) => parameter.endDate,
        size: {
          xs: 12,
          sm: 3,
          md: 3,
          lg: 3,
        },
      },
    ],
  },
};

export default TOS_START_OPTION_CONFIG;
