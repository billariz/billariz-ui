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
import useToggle from 'src/hooks/useToggle';
import { useState, useMemo } from 'react';

//Config
import ROLE_CONFIG from 'src/constants/roles';

// components
import { CustomEditableTable } from 'src/components/table';
import RoleInfo from './RoleInfo';

//Actions

import { dispatchRoleAction, getRoles } from 'src/redux/slices/role';

// ----------------------------------------------------------------------

const columns = ROLE_CONFIG.COLUMNS;
const config = ROLE_CONFIG.FILTERS;
const form = ROLE_CONFIG.FORMS.ROLE_ABOUT;
// ----------------------------------------------------------------------

export default function RoleList() {
  // states
  const { roles, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.roles
  );

  // Current Role state
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const currentRole = useMemo(
    () => roles.find((e) => e.id === currentRoleId),
    [roles, currentRoleId]
  );

  // Modal control
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const handleViewRow = (currentRoleId) => {
    setCurrentRoleId(currentRoleId);
    onOpenFrom();
  };

  return (
    <>
      <CustomEditableTable
        config={config}
        rows={roles}
        totalCount={totalCount}
        columns={columns}
        isLoading={isLoading}
        form={form}
        currentEvent={currentEvent}
        dispatchCallback={getRoles}
        displayDeleteAction={true}
        dispatchEvent={dispatchRoleAction}
        handleOnDoubleClick={handleViewRow}
        subject="ROLE"
        error={error}
      />
      <RoleInfo open={openFrom} onClose={onCloseFrom} role={currentRole} />
    </>
  );
}
