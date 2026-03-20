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

// Hooks
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import useToggle from 'src/hooks/useToggle';

// sections
import { CustomEditableTable } from '../../../../components/table';
import BillableChargeInfo from './BillableChargeInfo';

//Consts
import BILLABLE_CHARGE_CONFIG from 'src/constants/billableCharge';

//Actions
import {
  dispatchBillableChargeAction,
  getBillableCharge,
  resetEvent,
} from 'src/redux/slices/billableCharge';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

BillableCharge.propTypes = {
  contractId: PropTypes.number,
  posId: PropTypes.string,
  posRef: PropTypes.string,
};
export default function BillableCharge({ contractId, posId, posRef }) {
  const { billableCharges, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.billableCharges);

  // Current Billable Charge state
  const [currentBillableChargeId, setCurrentBillableChargeId] = useState(null);
  const currentBillableCharge = useMemo(
    () => billableCharges.find((e) => e.id === currentBillableChargeId),
    [billableCharges, currentBillableChargeId]
  );

  // Modal control
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const initialFilterValues = [];
  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (posId) initialFilterValues.push(['posId', posId]);

  const columns = useMemo(
    () => BILLABLE_CHARGE_CONFIG.getConfig(posId, contractId).COLUMNS,
    [posId, contractId]
  );

  const config = useMemo(
    () => BILLABLE_CHARGE_CONFIG.getConfig(posId, contractId).FILTERS,
    [posId, contractId]
  );

  const form = useMemo(
    () =>
      BILLABLE_CHARGE_CONFIG.getConfig(posId, contractId).FORMS
        .BILLABLE_CHARGE_ABOUT,
    [posId, contractId]
  );

  const handleViewRow = (currentBillableChargeId) => {
    setCurrentBillableChargeId(currentBillableChargeId);
    onOpenFrom();
  };

  const parentEntity = useMemo(() => ({ contractId }), [contractId]);

  return (
    <>
      <CustomEditableTable
        config={config}
        rows={billableCharges}
        totalCount={totalCount}
        columns={columns}
        isLoading={isLoading}
        dispatchCallback={getBillableCharge}
        initialFilterValues={initialFilterValues}
        form={form}
        currentEvent={currentEvent}
        dispatchEvent={dispatchBillableChargeAction}
        displayDeleteAction={true}
        resetEvent={resetEvent}
        impliedValues={{ posRef }}
        parentEntity={parentEntity}
        handleOnDoubleClick={handleViewRow}
        subject="BILLABLE_CHARGE"
        error={error}
      />
      <BillableChargeInfo
        open={openFrom}
        onClose={onCloseFrom}
        billableCharge={currentBillableCharge}
      />
    </>
  );
}
