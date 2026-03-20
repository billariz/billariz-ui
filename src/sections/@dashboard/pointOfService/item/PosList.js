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
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import POS_CONFIG from 'src/constants/pos';
import { CustomEditableTable } from '../../../../components/table';
// sections
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  dispatchPosAction,
  getPos,
  resetEvent,
} from 'src/redux/slices/pointOfService';
import { useEffect } from 'react';
import { getDefaultCountryCode } from 'src/redux/slices/defaultCountryCode';

// ----------------------------------------------------------------------

const columns = POS_CONFIG.COLUMNS;
const config = POS_CONFIG.FILTERS;
const form = POS_CONFIG.FORMS;

// ----------------------------------------------------------------------

PosList.propTypes = {
  contractId: PropTypes.number,
};
export default function PosList({ contractId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // states
  const { pointOfServices, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.pointOfServices);
  const { defaultCountryCode } = useSelector(
    (state) => state.defaultCountryCode
  );

  const initialFilterValues = [];
  if (contractId) initialFilterValues.push(['contractId', contractId]);

  const handleViewRow = (pointOfServiceId) => {
    navigate(PATH_DASHBOARD.pointOfService.view(pointOfServiceId));
  };

  useEffect(() => {
    dispatch(getDefaultCountryCode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomEditableTable
      config={config}
      rows={pointOfServices}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getPos}
      handleOnDoubleClick={handleViewRow}
      form={form}
      dispatchEvent={dispatchPosAction}
      displayDeleteAction={true}
      currentEvent={currentEvent}
      initialFilterValues={initialFilterValues}
      defaultFormValue={{ address: { countryCode: defaultCountryCode } }}
      resetEvent={resetEvent}
      subject="POINT_OF_SERVICE"
      error={error}
    />
  );
}
