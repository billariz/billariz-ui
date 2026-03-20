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
import {
  dispatchContractAction,
  getContracts,
  resetEvent,
} from 'src/redux/slices/contract';
// sections
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CustomEditableTable } from 'src/components/table';
import CONTRACTS_CONFIG from 'src/constants/contracts';
// ----------------------------------------------------------------------

const columns = CONTRACTS_CONFIG.COLUMNS;
const config = CONTRACTS_CONFIG.FILTERS;
const form = CONTRACTS_CONFIG.FORMS;

// ----------------------------------------------------------------------

ContractList.propTypes = {
  perimeterId: PropTypes.number,
  customerId: PropTypes.number,
  billingCycle: PropTypes.string,
  status: PropTypes.string,
  posId: PropTypes.string,
};

export default function ContractList({
  perimeterId,
  customerId,
  billingCycle,
  status,
  posId,
}) {
  const navigate = useNavigate();

  const initialFilterValues = [];

  if (perimeterId) initialFilterValues.push(['perimeterId', perimeterId]);
  if (customerId) initialFilterValues.push(['customerId', customerId]);
  if (posId) initialFilterValues.push(['posId', posId]);
  if (billingCycle) initialFilterValues.push(['billingCycle', billingCycle]);
  if (status) initialFilterValues.push(['status', status]);

  // states
  const { contracts, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.contracts
  );

  const handleViewRow = (contractId) => {
    navigate(PATH_DASHBOARD.contract.view(contractId));
  };

  return (
    <CustomEditableTable
      config={config}
      rows={contracts}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getContracts}
      handleOnDoubleClick={handleViewRow}
      form={form}
      dispatchEvent={dispatchContractAction}
      displayDeleteAction={true}
      currentEvent={currentEvent}
      initialFilterValues={initialFilterValues}
      resetEvent={resetEvent}
      subject="CONTRACT"
      error={error}
    />
  );
}
