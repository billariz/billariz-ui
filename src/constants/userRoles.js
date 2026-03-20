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
import { addRoleApi, findRolesApi } from 'src/api/roles';
import { RoleModel } from 'src/models/Role.model';
import ROLE_CONFIG from './roles';

const USER_ROLES_CONFIG = {
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
        value: [{ value: 'role.name', type: 'text' }],
      },
    },
    {
      id: 'standardLabel',
      label: 'Role.TableHeader.standardLabel',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'role.standardLabel', type: 'text' }],
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
            value: 'role.defaultLabel',
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
            value: 'role.otherLabel',
            type: 'text',
          },
        ],
      },
    },
  ],
  FILTERS: {
    ID: {
      index: 0,
      id: 'roleId',
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
      id: 'roleName',
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
      id: 'roleLabel',
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
    FIELDS: [
      {
        name: 'roleId',
        label: 'Role.Forms.role',
        type: 'RHFEntity',
        getApi: findRolesApi,
        entityKey: 'roles',
        enityModel: RoleModel,
        columns: ROLE_CONFIG.COLUMNS,
        getCurrentValue: () => null,
        addApi: addRoleApi,
        filters: ROLE_CONFIG.FILTERS,
        form: ROLE_CONFIG,
        subject: 'ROLE',
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

export default USER_ROLES_CONFIG;
