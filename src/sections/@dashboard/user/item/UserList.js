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

// components
import { CustomEditableTable } from 'src/components/table';
import UserInfo from './UserInfo';

// Hooks
import { useSelector } from 'react-redux';
import useToggle from 'src/hooks/useToggle';
import { useMemo, useState } from 'react';

//Consts
import USER_CONFIG from 'src/constants/users';

//Actions
import {
  dispatchUserAction,
  getUsers,
  resetEvent,
} from 'src/redux/slices/user';

// ----------------------------------------------------------------------

const columns = USER_CONFIG.COLUMNS;
const config = USER_CONFIG.FILTERS;
const form = USER_CONFIG.FORMS;
// ----------------------------------------------------------------------

export default function UserList() {
  // states
  const { users, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.users
  );

  // Current Activity state
  const [currentUserId, setCurrentUserId] = useState(null);
  const currentUser = useMemo(
    () => users.find((e) => e.id === currentUserId),
    [users, currentUserId]
  );

  // Modal control
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const handleViewRow = (currentUserId) => {
    setCurrentUserId(currentUserId);
    onOpenFrom();
  };

  return (
    <>
      <CustomEditableTable
        config={config}
        rows={users}
        totalCount={totalCount}
        columns={columns}
        isLoading={isLoading}
        // initialFilterValues={initialFilterValues}
        form={form}
        handleOnDoubleClick={handleViewRow}
        currentEvent={currentEvent}
        dispatchCallback={getUsers}
        displayDeleteAction={true}
        dispatchEvent={dispatchUserAction}
        resetEvent={resetEvent}
        subject="USER"
        error={error}
      />
      <UserInfo open={openFrom} onClose={onCloseFrom} user={currentUser} />
    </>
  );
}
