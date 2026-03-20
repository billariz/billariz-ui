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
import { CustomEditableTable } from '../../../../components/table';

//Hooks
import { useSelector } from 'react-redux';
import TOS_TYPE_CONFIG from 'src/constants/tosTypes';
// redux
import { dispatchTosType, getTosTypes } from 'src/redux/slices/tosType';

// ----------------------------------------------------------------------

const columns = TOS_TYPE_CONFIG.COLUMNS;
const config = TOS_TYPE_CONFIG.FILTERS;
const forms = TOS_TYPE_CONFIG.FORMS;

// ----------------------------------------------------------------------

export default function TosType() {
  // states
  const { tosTypes, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.tosTypes
  );

  const initialFilterValues = [];

  return (
    <CustomEditableTable
      config={config}
      rows={tosTypes}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getTosTypes}
      dispatchEvent={dispatchTosType}
      displayDeleteAction={true}
      subject="TERM_OF_SERVICE_TYPE"
      error={error}
    />
  );
}
