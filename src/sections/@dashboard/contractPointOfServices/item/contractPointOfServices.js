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
import { CustomEditableTable } from '../../../../components/table';
// sections
import PropTypes from 'prop-types';
// redux
import {
  getPos,
  dispatchContractPosAction,
} from 'src/redux/slices/pointOfService';

//Hooks
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

//Consts
import { PATH_DASHBOARD } from 'src/routes/paths';
import CONTRACTPOS_CONFIG from 'src/constants/contractPointOfService';

// ----------------------------------------------------------------------

const columns = CONTRACTPOS_CONFIG.COLUMNS;
const config = CONTRACTPOS_CONFIG.FILTERS;
const forms = CONTRACTPOS_CONFIG.FORMS.POS_ABOUT;

// ----------------------------------------------------------------------

ContractPointOfServices.propTypes = {
  contractId: PropTypes.number,
};
export default function ContractPointOfServices({ contractId }) {
  const navigate = useNavigate();
  // states
  const { pointOfServices, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.pointOfServices);

  const handleViewRow = (pointOfServiceId) => {
    navigate(PATH_DASHBOARD.pointOfService.view(pointOfServiceId));
  };

  const initialFilterValues = [];

  if (contractId) initialFilterValues.push(['contractId', contractId]);

  return (
    <CustomEditableTable
      config={config}
      rows={pointOfServices}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      handleOnDoubleClick={handleViewRow}
      dispatchCallback={getPos}
      impliedValues={{ contractId }}
      dispatchEvent={dispatchContractPosAction}
      displayDeleteAction={true}
      maxWidth="xl"
      subject="CONTRACT_POS"
      error={error}
    />
  );
}
