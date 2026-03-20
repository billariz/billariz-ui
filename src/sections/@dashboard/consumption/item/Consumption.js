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
// components;
import { CustomEditableTable } from '../../../../components/table';
import ConsumptionInfo from './ConsumptionInfo';

//Consts
import CONSUMPTION_CONFIG from 'src/constants/consumption';

//Redux
import {
  dispatchConsumptionAction,
  getConsumption,
  resetEvent,
} from 'src/redux/slices/consumption';

//Hooks
import { useMemo, useState } from 'react';
import useToggle from 'src/hooks/useToggle';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

Consumption.propTypes = {
  contractId: PropTypes.number,
  posId: PropTypes.string,
  posRef: PropTypes.string,
};
export default function Consumption({ contractId, posId, posRef }) {
  const { consumptions, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.consumptions);

  // Current Consumption state
  const [currentConsumptionId, setCurrentConsumptionId] = useState(null);
  const currentConsumption = useMemo(
    () => consumptions.find((e) => e.id === currentConsumptionId),
    [consumptions, currentConsumptionId]
  );

  // Modal control
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const handleViewRow = (currentConsumptionId) => {
    setCurrentConsumptionId(currentConsumptionId);
    onOpenFrom();
  };

  const initialFilterValues = [];
  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (posId) initialFilterValues.push(['posId', posId]);

  const columns = useMemo(
    () => CONSUMPTION_CONFIG.getConfig(posId, contractId).COLUMNS,
    [posId, contractId]
  );

  const config = useMemo(
    () => CONSUMPTION_CONFIG.getConfig(posId, contractId).FILTERS,
    [posId, contractId]
  );

  const form = useMemo(
    () =>
      CONSUMPTION_CONFIG.getConfig(posId, contractId).FORMS.CONSUMPTION_ABOUT,
    [posId, contractId]
  );

  const parentEntity = useMemo(() => ({ contractId }), [contractId]);

  return (
    <>
      <CustomEditableTable
        config={config}
        rows={consumptions}
        totalCount={totalCount}
        columns={columns}
        isLoading={isLoading}
        dispatchCallback={getConsumption}
        handleOnDoubleClick={handleViewRow}
        initialFilterValues={initialFilterValues}
        form={form}
        currentEvent={currentEvent}
        impliedValues={{ posRef }}
        parentEntity={parentEntity}
        dispatchEvent={dispatchConsumptionAction}
        displayDeleteAction={true}
        resetEvent={resetEvent}
        subject="METER_READ"
        error={error}
      />
      <ConsumptionInfo
        open={openFrom}
        onClose={onCloseFrom}
        consumption={currentConsumption}
      />
    </>
  );
}
