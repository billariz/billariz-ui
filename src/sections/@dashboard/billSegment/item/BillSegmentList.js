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

import BILL_SEGMENT_CONFIG from 'src/constants/billSegment';
// components
// sections
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  dispatchBillSegmentActions,
  getBillSegments,
} from 'src/redux/slices/billSegment';
import { CustomEditableTable } from '../../../../components/table';

// ----------------------------------------------------------------------

const columns = BILL_SEGMENT_CONFIG.COLUMNS;
const config = BILL_SEGMENT_CONFIG.FILTERS;

// ----------------------------------------------------------------------

BillSegmentList.propTypes = {
  billId: PropTypes.number,
  contractId: PropTypes.number,
  seId: PropTypes.number,
};

export default function BillSegmentList({ billId, contractId, seId }) {
  // states
  const { billSegments, totalCount, isLoading, error, currentEvent } =
    useSelector((state) => state.billSegments);

  const initialFilterValues = [];
  if (billId) initialFilterValues.push(['billId', billId]);
  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (seId) initialFilterValues.push(['seId', seId]);

  return (
    <CustomEditableTable
      config={config}
      rows={billSegments}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getBillSegments}
      dispatchEvent={dispatchBillSegmentActions}
      initialFilterValues={initialFilterValues}
      handleOnDoubleClick={() => {}}
      form={{ FIELDS: [] }}
      subject="BILL_SEGMENT"
      displayAddButton={false}
      displayDeleteAction={true}
      error={error}
      currentEvent={currentEvent}
    />
  );
}
