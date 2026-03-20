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
  dispatchPosContractAction,
  getContracts,
} from 'src/redux/slices/contract';

//Hooks
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

//Consts
import { PATH_DASHBOARD } from 'src/routes/paths';
import POS_CONTRACT_CONFIG from 'src/constants/pointOfServiceContract';

// ----------------------------------------------------------------------

const columns = POS_CONTRACT_CONFIG.COLUMNS;
const config = POS_CONTRACT_CONFIG.FILTERS;
const forms = POS_CONTRACT_CONFIG.FORMS.CONTRACT_ABOUT;

// ----------------------------------------------------------------------

PointOfServiceContracts.propTypes = {
  posId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default function PointOfServiceContracts({ posId }) {
  const navigate = useNavigate();
  // states
  const { contracts, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.contracts
  );

  const handleViewRow = (contractId) => {
    navigate(PATH_DASHBOARD.contract.view(contractId));
  };

  const initialFilterValues = [];

  if (posId) initialFilterValues.push(['posId', posId]);

  return (
    <CustomEditableTable
      config={config}
      rows={contracts}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      handleOnDoubleClick={handleViewRow}
      dispatchCallback={getContracts}
      displayDeleteAction={true}
      impliedValues={{ posId }}
      dispatchEvent={dispatchPosContractAction}
      maxWidth="xl"
      subject="CONTRACT_POS"
      error={error}
    />
  );
}
