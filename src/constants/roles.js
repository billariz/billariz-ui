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

const ROLE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Role.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'name',
      label: 'Role.TableHeader.name',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'name', type: 'text' }],
      },
    },
    {
      id: 'standardLabel',
      label: 'Role.TableHeader.standardLabel',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'standardLabel', type: 'text' }],
      },
    },
    {
      id: 'defaultLabel',
      label: 'Role.TableHeader.defaultLabel',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'defaultLabel',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'otherLabel',
      label: 'Role.TableHeader.otherLabel',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'otherLabel',
            type: 'text',
          },
        ],
      },
    },
  ],
  FILTERS: {
    ID: {
      index: 0,
      id: 'id',
      label: 'Role.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    NAME: {
      index: 1,
      id: 'name',
      label: 'Role.FilterLabels.name',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    LABEL: {
      index: 2,
      id: 'label',
      label: 'Role.FilterLabels.label',
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
    ROLE_ABOUT: {
      tabLabel: 'TableTabs.role.role',
      FIELDS: [
        {
          name: 'name',
          label: 'Role.Forms.name',
          type: 'RHFTextField',
          path: 'role.name',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.name,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'standardLabel',
          label: 'Role.Forms.standardLabel',
          type: 'RHFTextField',
          path: 'role.standardLabel',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.standardLabel,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'defaultLabel',
          label: 'Role.Forms.defaultLabel',
          type: 'RHFTextField',
          path: 'role.defaultLabel',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.defaultLabel,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'otherLabel',
          label: 'Role.Forms.otherLabel',
          type: 'RHFTextField',
          path: 'role.otherLabel',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.otherLabel,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
      ],
    },
  },
};

export default ROLE_CONFIG;
