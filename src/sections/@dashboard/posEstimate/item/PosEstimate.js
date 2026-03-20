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
import POS_ESTIMATE_CONFIG from 'src/constants/posEstimate';
import { CustomEditableTable } from 'src/components/table';
// sections
import PropTypes from 'prop-types';
import {
  getPosEstimate,
  dispatchPosEstimate,
  resetEvent,
} from 'src/redux/slices/posEstimate';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

const columns = POS_ESTIMATE_CONFIG.COLUMNS;
const config = POS_ESTIMATE_CONFIG.FILTERS;

// ----------------------------------------------------------------------

PosEstimate.propTypes = {
  contractId: PropTypes.number,
  posId: PropTypes.string,
};
export default function PosEstimate({ contractId, posId }) {
  // states
  const { posEstimates, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.posEstimates);

  const initialFilterValues = [];

  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (posId) initialFilterValues.push(['posId', posId]);

  const forms = {
    FIELDS: posId
      ? POS_ESTIMATE_CONFIG.FORMS.ESTIMATE_ABOUT.FIELDS.filter(
          (e) => e.name != 'posId'
        )
      : POS_ESTIMATE_CONFIG.FORMS.ESTIMATE_ABOUT.FIELDS,
  };

  const parentEntity = useMemo(() => ({ contractId }), [contractId]);

  return (
    <CustomEditableTable
      config={config}
      rows={posEstimates}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getPosEstimate}
      dispatchEvent={dispatchPosEstimate}
      displayDeleteAction={true}
      impliedValues={{ posId }}
      parentEntity={parentEntity}
      resetEvent={resetEvent}
      subject="POINT_OF_SERVICE_ESTIMATE"
      error={error}
    />
  );
}
