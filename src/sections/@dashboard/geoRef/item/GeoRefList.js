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
import GEO_REF_CONFIG from 'src/constants/geoRef';
import { dispatchGeoRefAction, getGeoRefs } from 'src/redux/slices/geoRef';

// ----------------------------------------------------------------------

const columns = GEO_REF_CONFIG.COLUMNS;
const config = GEO_REF_CONFIG.FILTERS;
const form = GEO_REF_CONFIG.FORMS;
// ----------------------------------------------------------------------

export default function GeoRefList() {
  // states
  const { geoRefs, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.geoRefs
  );

  return (
    <CustomEditableTable
      config={config}
      rows={geoRefs}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      dispatchCallback={getGeoRefs}
      displayDeleteAction={true}
      dispatchEvent={dispatchGeoRefAction}
      subject="GEO_FACTOR"
      error={error}
    />
  );
}
