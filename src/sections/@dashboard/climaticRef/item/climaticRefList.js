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
import { useSelector } from 'react-redux';
import { CustomEditableTable } from 'src/components/table';

import CLIMATIC_REFS_CONFIG from 'src/constants/climaticRefs';
import {
  dispatchClimaticRefsAction,
  getClimaticRefs,
} from 'src/redux/slices/climaticRef';

// ----------------------------------------------------------------------

const columns = CLIMATIC_REFS_CONFIG.COLUMNS;
const config = CLIMATIC_REFS_CONFIG.FILTERS;
const form = CLIMATIC_REFS_CONFIG.FORMS;
// ----------------------------------------------------------------------

export default function ClimaticRefList() {
  // states
  const { climaticRefs, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.climaticRefs);

  return (
    <CustomEditableTable
      config={config}
      rows={climaticRefs}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      dispatchCallback={getClimaticRefs}
      displayAddButton={true}
      displayDeleteAction={true}
      dispatchEvent={dispatchClimaticRefsAction}
      subject="CLIMATC_REF"
      error={error}
    />
  );
}
