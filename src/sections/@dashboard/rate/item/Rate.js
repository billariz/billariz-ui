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

import RATES_CONFIG from 'src/constants/rates';

// redux
import { dispatchRate, getRates } from 'src/redux/slices/rate';

// ----------------------------------------------------------------------

const columns = RATES_CONFIG.COLUMNS;
const config = RATES_CONFIG.FILTERS;
const forms = RATES_CONFIG.FORMS;

// ----------------------------------------------------------------------

export default function Rate() {
  // states
  const { rates, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.rates
  );

  const initialFilterValues = [];

  return (
    <CustomEditableTable
      config={config}
      rows={rates}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getRates}
      dispatchEvent={dispatchRate}
      displayDeleteAction={true}
      subject="RATE"
      error={error}
      enableImport={true}
    />
  );
}
