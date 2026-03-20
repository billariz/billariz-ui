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
import POS_CAPACITY_CONFIG from 'src/constants/posCapacity';
import { CustomEditableTable } from '../../../../components/table';
// sections
import PropTypes from 'prop-types';
// redux
import {
  dispatchPosCapacity,
  getPosCapacity,
  resetEvent,
} from 'src/redux/slices/posCapacity';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

const columns = POS_CAPACITY_CONFIG.COLUMNS;
const config = POS_CAPACITY_CONFIG.FILTERS;

// ----------------------------------------------------------------------

PosCapacity.propTypes = {
  contractId: PropTypes.number,
  posId: PropTypes.string,
};
export default function PosCapacity({ contractId, posId }) {
  // states
  const { posCapacities, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.posCapacities);

  const initialFilterValues = [];

  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (posId) initialFilterValues.push(['posId', posId]);

  const forms = {
    FIELDS: posId
      ? POS_CAPACITY_CONFIG.FORMS.CAPACITY_ABOUT.FIELDS.filter(
          (e) => e.name != 'posId'
        )
      : POS_CAPACITY_CONFIG.FORMS.CAPACITY_ABOUT.FIELDS,
  };

  const parentEntity = useMemo(() => ({ contractId }), [contractId]);

  return (
    <CustomEditableTable
      config={config}
      rows={posCapacities}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getPosCapacity}
      dispatchEvent={dispatchPosCapacity}
      displayDeleteAction={true}
      impliedValues={{ posId }}
      parentEntity={parentEntity}
      resetEvent={resetEvent}
      subject="POINT_OF_SERVICE_CAPACITY"
      error={error}
    />
  );
}
