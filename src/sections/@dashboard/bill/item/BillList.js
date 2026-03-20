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

// Consts
import BILLS_CONFIG from 'src/constants/bills';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// components
import { CustomEditableTable } from 'src/components/table';

// Redux

import {
  getBills,
  resetEvent,
  dispatchBillAction,
} from 'src/redux/slices/bill';

// Hooks
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useMemo } from 'react';
// ----------------------------------------------------------------------

const columns = BILLS_CONFIG.COLUMNS;
const config = BILLS_CONFIG.FILTERS;
const form = BILLS_CONFIG.FORM;

// ----------------------------------------------------------------------

BillList.propTypes = {
  perimeterId: PropTypes.number,
  contractId: PropTypes.number,
  customerId: PropTypes.number,
  runId: PropTypes.number,
  posId: PropTypes.string,
};

export default function BillList({
  perimeterId,
  contractId,
  customerId,
  runId,
  posId,
}) {
  const navigate = useNavigate();

  // states
  const { bills, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.bills
  );

  const initialFilterValues = [];

  if (perimeterId) initialFilterValues.push(['perimeterId', perimeterId]);
  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (customerId) initialFilterValues.push(['customerId', customerId]);
  if (posId) initialFilterValues.push(['posId', posId]);
  if (runId) initialFilterValues.push(['billingRunId', runId]);

  const handleViewRow = (billId) => {
    navigate(PATH_DASHBOARD.bill.view(billId));
  };

  const parentEntity = useMemo(() => ({ contractId }), [contractId]);

  return (
    <CustomEditableTable
      config={config}
      rows={bills}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getBills}
      handleOnDoubleClick={handleViewRow}
      form={form}
      dispatchEvent={dispatchBillAction}
      currentEvent={currentEvent}
      initialFilterValues={initialFilterValues}
      resetEvent={resetEvent}
      displayAddButton={contractId || false}
      displayDeleteAction={true}
      parentEntity={parentEntity}
      defaultFormValue={{ status: 'CALCULATED' }}
      subject="BILL"
      error={error}
    />
  );
}
