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

import PropTypes from 'prop-types';
// components
import JOURNAL_CONFIG from 'src/constants/journal';
// sections
import { useSelector } from 'react-redux';
import { dispatchJournalActions, getJournals } from 'src/redux/slices/journal';
import { CustomEditableTable } from '../../../../components/table';

// ----------------------------------------------------------------------

const columns = JOURNAL_CONFIG.COLUMNS;
const config = JOURNAL_CONFIG.FILTERS;

// ----------------------------------------------------------------------

JournalList.propTypes = {
  objectId: PropTypes.number,
  objectType: PropTypes.string,
  user: PropTypes.string,
  posId: PropTypes.string,
};

export default function JournalList({ objectId, objectType, user, posId }) {
  const { journals, totalCount, isLoading, error, currentEvent } = useSelector(
    (state) => state.journals
  );

  const initialFilterValues = [];
  if (objectId) initialFilterValues.push(['objectId', objectId]);
  if (objectType) initialFilterValues.push(['objectType', objectType]);
  if (posId) initialFilterValues.push(['posId', posId]);
  if (user) initialFilterValues.push(['user', user]);

  return (
    <CustomEditableTable
      config={config}
      rows={journals}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getJournals}
      dispatchEvent={dispatchJournalActions}
      displayDeleteAction={true}
      initialFilterValues={initialFilterValues}
      form={{ FIELDS: [] }}
      displayAddButton={false}
      subject="JOURNAL"
      handleOnDoubleClick={() => {}}
      error={error}
      currentEvent={currentEvent}
    />
  );
}
