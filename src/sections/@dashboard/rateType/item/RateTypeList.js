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
import RATE_TYPE_CONFIG from 'src/constants/rateTypes';
import { CustomEditableTable } from 'src/components/table';
// hooks
import { useSelector } from 'react-redux';
import {
  dispatchRateTypeAction,
  getRateTypes,
} from 'src/redux/slices/rateType';

// ----------------------------------------------------------------------

const columns = RATE_TYPE_CONFIG.COLUMNS;
const config = RATE_TYPE_CONFIG.FILTERS;
const form = RATE_TYPE_CONFIG.FORMS.RATE_TYPE;
// ----------------------------------------------------------------------

export default function RateTypeList() {
  // states
  const { rateTypes, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.rateTypes
  );

  return (
    <CustomEditableTable
      config={config}
      rows={rateTypes}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      dispatchCallback={getRateTypes}
      displayDeleteAction={true}
      dispatchEvent={dispatchRateTypeAction}
      subject="RATE_TYPE"
      error={error}
    />
  );
}
