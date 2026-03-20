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
import METER_READS_CONFIG from 'src/constants/meterReads';
import { CustomEditableTable } from '../../../components/table';
// sections
import PropTypes from 'prop-types';
// redux
import {
  dispatchMeterRead,
  getMeterReads,
  resetEvent,
} from 'src/redux/slices/meterRead';

// ----------------------------------------------------------------------

const columns = METER_READS_CONFIG.COLUMNS;
const config = METER_READS_CONFIG.FILTERS;
const forms = METER_READS_CONFIG.FORMS;

// ----------------------------------------------------------------------

MeterReadList.propTypes = {
  meterReadId: PropTypes.number,
  meterRead: PropTypes.object,
};

export default function MeterReadList({ meterReadId, meterRead }) {
  const { meterReads, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.meterReads);
  const canAddOrEdit = meterRead.source != 'MARKET';

  const initialFilterValues = [];
  if (!Number.isNaN(meterReadId))
    initialFilterValues.push(['meterReadId', meterReadId]);

  return (
    <CustomEditableTable
      config={config}
      rows={meterReads}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getMeterReads}
      dispatchEvent={dispatchMeterRead}
      impliedValues={{ meterReadId }}
      displayDeleteAction={canAddOrEdit}
      displayAddButton={canAddOrEdit}
      handleOnDoubleClick={!canAddOrEdit ? () => {} : undefined} // if !canAddOrEdit  => do nothing / else : default behaivor
      resetEvent={resetEvent}
      subject="METER_READ_DETAIL"
      error={error}
    />
  );
}
