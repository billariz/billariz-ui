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
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
// sections
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { CustomEditableTable } from 'src/components/table';

import CUSTOMERS_CONFIG from 'src/constants/customers';
import {
  dispatchCustomerEvent,
  getCustomers,
  resetEvent,
} from 'src/redux/slices/customer';
import { useEffect } from 'react';
import { getDefaultCountryCode } from 'src/redux/slices/defaultCountryCode';
// ----------------------------------------------------------------------

const columns = CUSTOMERS_CONFIG.COLUMNS;
const config = CUSTOMERS_CONFIG.FILTERS;
const form = CUSTOMERS_CONFIG.FORMS;

// ----------------------------------------------------------------------

CustomerList.propTypes = {
  contractId: PropTypes.number,
};

export default function CustomerList({ contractId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFilterValues = [];

  if (contractId) initialFilterValues.push(['contractId', contractId]);
  // states
  const { customers, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.customers
  );
  const { defaultCountryCode } = useSelector(
    (state) => state.defaultCountryCode
  );

  const handleViewRow = (customerId) => {
    navigate(PATH_DASHBOARD.customer.view(customerId));
  };
  useEffect(() => {
    dispatch(getDefaultCountryCode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomEditableTable
      config={config}
      rows={customers}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getCustomers}
      handleOnDoubleClick={handleViewRow}
      form={form}
      dispatchEvent={dispatchCustomerEvent}
      displayDeleteAction={true}
      currentEvent={currentEvent}
      initialFilterValues={initialFilterValues}
      defaultFormValue={{ address: { countryCode: defaultCountryCode } }}
      resetEvent={resetEvent}
      subject="CUSTOMER"
      error={error}
    />
  );
}
