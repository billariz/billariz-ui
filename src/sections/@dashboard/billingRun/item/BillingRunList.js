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

// consts
import { PATH_DASHBOARD } from '../../../../routes/paths';
import BILLINGRUN_CONFIG from 'src/constants/billingRun';

// components
import { CustomEditableTable } from '../../../../components/table';

//Redux
import {
  dispatchBillingRun,
  getBillingRuns,
} from 'src/redux/slices/billingRun';

//Hooks
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

const columns = BILLINGRUN_CONFIG.COLUMNS;
const config = BILLINGRUN_CONFIG.FILTERS;

// ----------------------------------------------------------------------

BillingRunList.propTypes = {
  perimeterId: PropTypes.number,
  contractId: PropTypes.number,
  customerId: PropTypes.number,
};

export default function BillingRunList({
  perimeterId,
  contractId,
  customerId,
}) {
  const navigate = useNavigate();

  // states
  const { billingRuns, totalCount, isLoading, error, currentEvent } =
    useSelector((state) => state.billingRuns);

  const initialFilterValues = [];

  if (perimeterId) initialFilterValues.push(['perimeterId', perimeterId]);
  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (customerId) initialFilterValues.push(['customerId', customerId]);

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.billingRun.view(id));
  };

  return (
    <CustomEditableTable
      config={config}
      rows={billingRuns}
      initialFilterValues={initialFilterValues}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getBillingRuns}
      handleOnDoubleClick={handleViewRow}
      dispatchEvent={dispatchBillingRun}
      form={{ FIELDS: [] }}
      displayAddButton={false}
      displayDeleteAction={true}
      subject="BILLING_RUN"
      error={error}
      currentEvent={currentEvent}
    />
  );
}
