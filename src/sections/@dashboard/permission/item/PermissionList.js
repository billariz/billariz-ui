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
import PERMISSION_CONFIG from 'src/constants/permissions';

// components
import { CustomEditableTable } from 'src/components/table';

//Actions
import {
  dispatchPermissionAction,
  getPermissions,
  resetEvent,
} from 'src/redux/slices/permission';

// ----------------------------------------------------------------------

const columns = PERMISSION_CONFIG.COLUMNS;
const config = PERMISSION_CONFIG.FILTERS;
const form = PERMISSION_CONFIG.FORMS.PERMISSION_ABOUT;
// ----------------------------------------------------------------------

export default function PermissionList() {
  // states
  const { permissions, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.permissions);

  return (
    <CustomEditableTable
      config={config}
      rows={permissions}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      dispatchCallback={getPermissions}
      displayDeleteAction={true}
      dispatchEvent={dispatchPermissionAction}
      resetEvent={resetEvent}
      subject="PERMISSION"
      error={error}
    />
  );
}
