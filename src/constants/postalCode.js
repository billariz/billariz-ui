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

const POSTAL_CODE_CONFIG = {
  COLUMNS: [
    {
      id: 'postalCode',
      label: 'PostalCode.TableHeader.postalCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'postalCode', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'cityName',
      label: 'PostalCode.TableHeader.cityName',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'cityName', type: 'text' }],
      },
    },
    {
      id: 'otherName',
      label: 'PostalCode.TableHeader.otherName',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'otherName', type: 'text' }],
      },
    },
    {
      id: 'gpsLocation',
      label: 'PostalCode.TableHeader.gpsLocation',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'gpsLocation', type: 'text' }],
      },
    },
    {
      id: 'areaCode',
      label: 'PostalCode.TableHeader.areaCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'areaCode', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    postalCode: {
      index: 0,
      id: 'postalCode',
      label: 'PostalCode.FilterLabels.postalCode',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    cityName: {
      index: 1,
      id: 'cityName',
      label: 'PostalCode.FilterLabels.cityName',
      type: 'TextField',
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
        name: 'postalCode',
        label: 'PostalCode.TableHeader.postalCode',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.postalCode,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'cityName',
        label: 'PostalCode.TableHeader.cityName',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.cityName,
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'otherName',
        label: 'PostalCode.TableHeader.otherName',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.otherName,
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'gpsLocation',
        label: 'PostalCode.TableHeader.gpsLocation',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.gpsLocation,
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'areaCode',
        label: 'PostalCode.TableHeader.areaCode',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.areaCode,
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'dispatchCityName',
        label: 'PostalCode.TableHeader.dispatchCityName',
        type: 'RHFTextField',
        getCurrentValue: (parameter) => parameter.dispatchCityName,
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
    ],
  },
};

export default POSTAL_CODE_CONFIG;
