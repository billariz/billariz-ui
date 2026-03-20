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

// Hooks
import { useSelector } from 'react-redux';

//Config
import ROLE_PERMISSION_CONFIG from 'src/constants/rolePermissions';

// components
import { CustomEditableTable } from 'src/components/table';

import {
  dispatchRolePermissionAction,
  getRolePermissions,
  resetEvent,
} from 'src/redux/slices/rolePermission';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const columns = ROLE_PERMISSION_CONFIG.COLUMNS;
const config = ROLE_PERMISSION_CONFIG.FILTERS;
const form = ROLE_PERMISSION_CONFIG.FORMS;
// ----------------------------------------------------------------------

RolePermissionList.propTypes = {
  roleId: PropTypes.number,
};
export default function RolePermissionList({ roleId }) {
  // states
  const { permissions, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.rolePermissions);

  const initialFilterValues = [];

  if (roleId) initialFilterValues.push(['roleId', roleId]);

  return (
    <CustomEditableTable
      config={config}
      rows={permissions}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      initialFilterValues={initialFilterValues}
      dispatchCallback={getRolePermissions}
      displayDeleteAction={true}
      dispatchEvent={dispatchRolePermissionAction}
      impliedValues={{ roleId }}
      resetEvent={resetEvent}
      subject="ROLE_PERMISSION"
      error={error}
    />
  );
}
