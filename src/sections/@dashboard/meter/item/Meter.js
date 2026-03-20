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
import { useSelector } from 'react-redux';
import METER_CONFIG from 'src/constants/meter';
import { CustomEditableTable } from '../../../../components/table';
// sections
import PropTypes from 'prop-types';
import { dispatchMeter, getMeter, resetEvent } from 'src/redux/slices/meter';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

const columns = METER_CONFIG.COLUMNS;
const config = METER_CONFIG.FILTERS;
// ----------------------------------------------------------------------

Meter.propTypes = {
  contractId: PropTypes.number,
  posId: PropTypes.string,
};
export default function Meter({ contractId, posId }) {
  // states
  const { meters, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.meters
  );

  const initialFilterValues = [];

  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (posId) initialFilterValues.push(['posId', posId]);

  const form = {
    FIELDS: posId
      ? METER_CONFIG.FORMS.METER_ABOUT.FIELDS.filter((e) => e.name != 'posId')
      : METER_CONFIG.FORMS.METER_ABOUT.FIELDS,
  };

  const parentEntity = useMemo(() => ({ contractId }), [contractId]);

  return (
    <CustomEditableTable
      config={config}
      rows={meters}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={form}
      currentEvent={currentEvent}
      dispatchCallback={getMeter}
      dispatchEvent={dispatchMeter}
      displayDeleteAction={true}
      impliedValues={{ posId }}
      parentEntity={parentEntity}
      resetEvent={resetEvent}
      subject="METER"
      error={error}
    />
  );
}
