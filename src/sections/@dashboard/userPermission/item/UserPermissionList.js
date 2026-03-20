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
import USER_PERMISSION_CONFIG from 'src/constants/userPermissions';

// components
import { CustomEditableTable } from 'src/components/table';

import {
  dispatchUserPermissionAction,
  getUserPermissions,
  resetEvent,
} from 'src/redux/slices/userPermission';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const columns = USER_PERMISSION_CONFIG.COLUMNS;
const config = USER_PERMISSION_CONFIG.FILTERS;
const form = USER_PERMISSION_CONFIG.FORMS;
// ----------------------------------------------------------------------

UserPermissionList.propTypes = {
  userId: PropTypes.number,
};
export default function UserPermissionList({ userId }) {
  // states
  const { permissions, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.userPermissions);

  const initialFilterValues = [];

  if (userId) initialFilterValues.push(['userId', userId]);

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
      dispatchCallback={getUserPermissions}
      displayDeleteAction={true}
      dispatchEvent={dispatchUserPermissionAction}
      impliedValues={{ userId }}
      resetEvent={resetEvent}
      subject="USER_PERMISSION"
      error={error}
    />
  );
}
