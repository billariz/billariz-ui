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

import PERIMETERS_CONFIG from 'src/constants/perimeters';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { CustomEditableTable } from 'src/components/table';
// sections
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  dispatchPerimeterAction,
  getPerimeters,
  resetEvent,
} from 'src/redux/slices/perimeter';

// ----------------------------------------------------------------------

const columns = PERIMETERS_CONFIG.COLUMNS;
const config = PERIMETERS_CONFIG.FILTERS;
const form = PERIMETERS_CONFIG.FORMS;

// ----------------------------------------------------------------------

PerimeterList.propTypes = {
  contractId: PropTypes.number,
  customerId: PropTypes.number,
  billingCycle: PropTypes.string,
  status: PropTypes.string,
  posId: PropTypes.string,
};

export default function PerimeterList({
  contractId,
  customerId,
  billingCycle,
  status,
  posId,
}) {
  const navigate = useNavigate();

  const initialFilterValues = [];
  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (customerId) initialFilterValues.push(['customerId', customerId]);
  if (posId) initialFilterValues.push(['posId', posId]);
  if (billingCycle) initialFilterValues.push(['billingCycle', billingCycle]);
  if (status) initialFilterValues.push(['status', status]);

  // states
  const { perimeters, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.perimeters);

  const handleViewRow = (perimeterId) => {
    navigate(PATH_DASHBOARD.perimeter.view(perimeterId));
  };

  return (
    <CustomEditableTable
      config={config}
      rows={perimeters}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getPerimeters}
      handleOnDoubleClick={handleViewRow}
      form={form}
      dispatchEvent={dispatchPerimeterAction}
      displayDeleteAction={true}
      currentEvent={currentEvent}
      initialFilterValues={initialFilterValues}
      resetEvent={resetEvent}
      subject="PERIMETER"
      error={error}
    />
  );
}
