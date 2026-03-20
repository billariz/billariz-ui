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

const PERMISSION_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Permission.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'category',
      label: 'Permission.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'permissionCategory',
            value: 'category',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'entity',
      label: 'Permission.TableHeader.entity',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'objectType', value: 'entity', type: 'text' }],
      },
    },
    {
      id: 'action',
      label: 'Permission.TableHeader.action',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'permissionAction', value: 'action', type: 'text' },
        ],
      },
    },
  ],
  FILTERS: {
    CATEGORY: {
      index: 0,
      id: 'category',
      label: 'Permission.FilterLabels.category',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.PERMISSION_CATEGORY,
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'Permission.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },

    ACTION: {
      index: 2,
      id: 'action',
      label: 'Permission.FilterLabels.action',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.PERMISSION_ACTION,
    },
    ENTITY: {
      index: 3,
      id: 'entity',
      label: 'Permission.FilterLabels.entity',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.OBJECT_TYPE,
    },
  },
  FORMS: {
    PERMISSION_ABOUT: {
      tabLabel: 'TableTabs.RolePermissions',
      FIELDS: [
        {
          name: 'action',
          label: 'Permission.Forms.action',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (permission) => permission.action,
          parameterName: PARAMETERS_CONFIG.NAME.PERMISSION_ACTION,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'entity',
          label: 'Permission.Forms.entity',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (permission) => permission.entity,
          parameterName: PARAMETERS_CONFIG.NAME.OBJECT_TYPE,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'category',
          label: 'Permission.Forms.category',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (permission) => permission.category,
          parameterName: PARAMETERS_CONFIG.NAME.PERMISSION_CATEGORY,
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

export default PERMISSION_CONFIG;
