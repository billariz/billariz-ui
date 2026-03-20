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
import SERVICE_TYPE_CONFIG from 'src/constants/serviceTypes';
import { CustomEditableTable } from '../../../../components/table';
// sections
import { useSelector } from 'react-redux';

import {
  getServiceType,
  dispatchServiceType,
} from 'src/redux/slices/serviceType';

// ----------------------------------------------------------------------

const columns = SERVICE_TYPE_CONFIG.COLUMNS;
const config = SERVICE_TYPE_CONFIG.FILTERS;
const forms = SERVICE_TYPE_CONFIG.FORMS;

// ----------------------------------------------------------------------

export default function ServiceTypeList() {
  // states
  const { serviceTypes, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.serviceTypes);

  return (
    <CustomEditableTable
      config={config}
      rows={serviceTypes}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={[]}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getServiceType}
      displayDeleteAction={true}
      dispatchEvent={dispatchServiceType}
      subject="SERVICE_TYPE"
      error={error}
    />
  );
}
