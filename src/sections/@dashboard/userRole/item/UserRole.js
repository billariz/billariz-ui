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
import USER_ROLES_CONFIG from 'src/constants/userRoles';

// components
import { CustomEditableTable } from 'src/components/table';

import {
  dispatchUserRolesAction,
  getUserRoles,
  resetEvent,
} from 'src/redux/slices/userRole';

import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const columns = USER_ROLES_CONFIG.COLUMNS;
const config = USER_ROLES_CONFIG.FILTERS;
const form = USER_ROLES_CONFIG.FORMS;
// ----------------------------------------------------------------------

UserRoleList.propTypes = {
  userId: PropTypes.number,
};
export default function UserRoleList({ userId }) {
  // states
  const { roles, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.userRoles
  );

  const initialFilterValues = [];

  if (userId) initialFilterValues.push(['userId', userId]);

  return (
    <CustomEditableTable
      config={config}
      rows={roles}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      initialFilterValues={initialFilterValues}
      dispatchCallback={getUserRoles}
      displayDeleteAction={true}
      handleOnDoubleClick={() => {}}
      dispatchEvent={dispatchUserRolesAction}
      impliedValues={{ userId }}
      resetEvent={resetEvent}
      subject="USER_ROLE"
      error={error}
    />
  );
}
