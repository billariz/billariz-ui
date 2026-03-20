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

import {
  getPostalCodes,
  dispatchPostalCodeAction,
} from 'src/redux/slices/postalCode';
import POSTAL_CODE_CONFIG from 'src/constants/postalCode';

// ----------------------------------------------------------------------

const columns = POSTAL_CODE_CONFIG.COLUMNS;
const config = POSTAL_CODE_CONFIG.FILTERS;
const form = POSTAL_CODE_CONFIG.FORMS;
// ----------------------------------------------------------------------

export default function PostalCodeList() {
  // states
  const { postalCodes, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.postalCodes);

  return (
    <CustomEditableTable
      config={config}
      rows={postalCodes}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      dispatchCallback={getPostalCodes}
      displayDeleteAction={true}
      dispatchEvent={dispatchPostalCodeAction}
      subject="POSTAL_CODE"
      error={error}
    />
  );
}
