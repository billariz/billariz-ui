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

// routes

// components
import { useSelector } from 'react-redux';
import POS_CONFIGURATION_CONFIG from 'src/constants/posConfiguration';
import { CustomEditableTable } from '../../../../components/table';
// sections
import PropTypes from 'prop-types';
import {
  dispatchPosConfiguration,
  getPosConfiguration,
  resetEvent,
} from 'src/redux/slices/posConfiguration';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

const columns = POS_CONFIGURATION_CONFIG.COLUMNS;
const config = POS_CONFIGURATION_CONFIG.FILTERS;
// ----------------------------------------------------------------------

PosConfiguration.propTypes = {
  contractId: PropTypes.number,
  posId: PropTypes.string,
};
export default function PosConfiguration({ contractId, posId }) {
  // states
  const { posConfigurations, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.posConfigurations);

  const initialFilterValues = [];

  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (posId) initialFilterValues.push(['posId', posId]);

  const form = {
    FIELDS: posId
      ? POS_CONFIGURATION_CONFIG.FORMS.FIELDS.filter((e) => e.name != 'posId')
      : POS_CONFIGURATION_CONFIG.FORMS.FIELDS,
  };

  const parentEntity = useMemo(() => ({ contractId }), [contractId]);

  return (
    <CustomEditableTable
      config={config}
      rows={posConfigurations}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={form}
      currentEvent={currentEvent}
      dispatchCallback={getPosConfiguration}
      dispatchEvent={dispatchPosConfiguration}
      displayDeleteAction={true}
      impliedValues={{ posId }}
      parentEntity={parentEntity}
      resetEvent={resetEvent}
      subject="POINT_OF_SERVICE_CONFIGURATION"
      error={error}
    />
  );
}
