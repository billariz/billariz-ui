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

import { CustomEditableTable } from 'src/components/table';

//Config
import ENTITY_CONFIG from 'src/constants/entities';

//Hooks
import { useSelector } from 'react-redux';

//Actions
import {
  dispatchEntityAction,
  getEntities,
  resetEvent,
} from 'src/redux/slices/entity';

// ----------------------------------------------------------------------

const columns = ENTITY_CONFIG.COLUMNS;
const config = ENTITY_CONFIG.FILTERS;
const form = ENTITY_CONFIG.FORMS;
// ----------------------------------------------------------------------

export default function EntityList() {
  // states
  const { organisms, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.organisms
  );
  const initialFilterValues = [];

  return (
    <CustomEditableTable
      config={config}
      rows={organisms}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      dispatchEvent={dispatchEntityAction}
      displayDeleteAction={true}
      dispatchCallback={getEntities}
      maxWidth="xl"
      resetEvent={resetEvent}
      initialFilterValues={initialFilterValues}
      subject="ORGANISM"
      error={error}
    />
  );
}
