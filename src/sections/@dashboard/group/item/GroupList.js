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

// sections
import { CustomEditableTable } from 'src/components/table';
import GROUP_CONFIG from 'src/constants/groups';
import { dispatchGroupAction, getGroups } from 'src/redux/slices/group';

//Hooks
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const columns = GROUP_CONFIG.COLUMNS;
const config = GROUP_CONFIG.FILTERS;
const form = GROUP_CONFIG.FORMS.GROUP;
// ----------------------------------------------------------------------

export default function GroupList() {
  // states
  const { groups, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.groups
  );

  const initialFilterValues = [];

  return (
    <CustomEditableTable
      config={config}
      rows={groups}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      initialFilterValues={initialFilterValues}
      displayDeleteAction={true}
      dispatchCallback={getGroups}
      dispatchEvent={dispatchGroupAction}
      subject="GROUP"
      error={error}
    />
  );
}
