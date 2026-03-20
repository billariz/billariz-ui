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

//Consts
import THIRD_CONFIG from 'src/constants/thirds';

//Actions
import {
  dispatchThirdAction,
  getThirds,
  resetEvent,
} from 'src/redux/slices/third';
import { getDefaultCountryCode } from 'src/redux/slices/defaultCountryCode';

//Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const columns = THIRD_CONFIG.COLUMNS;
const config = THIRD_CONFIG.FILTERS;
const form = THIRD_CONFIG.FORMS;
// ----------------------------------------------------------------------

export default function ThirdList() {
  const dispatch = useDispatch();

  // states
  const { thirds, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.thirds
  );
  const { defaultCountryCode } = useSelector(
    (state) => state.defaultCountryCode
  );

  const initialFilterValues = [];

  useEffect(() => {
    dispatch(getDefaultCountryCode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomEditableTable
      config={config}
      rows={thirds}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getThirds}
      form={form}
      dispatchEvent={dispatchThirdAction}
      displayDeleteAction={true}
      currentEvent={currentEvent}
      initialFilterValues={initialFilterValues}
      defaultFormValue={{ address: { countryCode: defaultCountryCode } }}
      resetEvent={resetEvent}
      subject="THIRD"
      error={error}
    />
  );
}
