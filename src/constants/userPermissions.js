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
import { addPermissionApi, findPermissionsApi } from 'src/api/permissions';
import { PermissionModel } from 'src/models/Permission.model';
import PERMISSION_CONFIG from './permissions';
import * as Yup from 'yup';

const USER_PERMISSION_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Permission.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'permission.id', type: 'text' }],
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
            value: 'permission.category',
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
        value: [
          {
            translParam: 'objectType',
            value: 'permission.entity',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'action',
      label: 'Permission.TableHeader.action',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'permissionAction',
            value: 'permission.action',
            type: 'text',
          },
        ],
      },
    },

    {
      id: 'restriction',
      label: 'Permission.TableHeader.restriction',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'permissionCondition',
            value: 'restriction',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'expirationDate',
      label: 'Permission.TableHeader.expirationDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'expirationDate',
            type: 'date',
          },
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
    ACTION: {
      index: 1,
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
      index: 2,
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
    FIELDS: [
      {
        name: 'restriction',
        label: 'Role.Forms.restriction',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        parameterName: PARAMETERS_CONFIG.NAME.PERMISSION_CONDITION,
        getCurrentValue: (params) => params.restriction,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'expirationDate',
        label: 'Role.Forms.expirationDate',
        type: 'RHFDatePicker',
        getCurrentValue: (params) => params.expirationDate,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'permissionId',
        label: 'Role.Forms.permission',
        type: 'RHFEntity',
        hideOnEdit: true,
        getApi: findPermissionsApi,
        entityKey: 'permissions',
        enityModel: PermissionModel,
        columns: PERMISSION_CONFIG.COLUMNS,
        getCurrentValue: () => null,
        addApi: addPermissionApi,
        filters: PERMISSION_CONFIG.FILTERS,
        form: PERMISSION_CONFIG,
        subject: 'PERMISSION',
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
    ],
  },
};

export default USER_PERMISSION_CONFIG;
