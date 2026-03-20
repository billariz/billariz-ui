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

//Hooks
import { useSelector } from 'react-redux';

import SERVICE_ELEMENT_TYPE_CONFIG from 'src/constants/serviceElementTypes';

// redux
import {
  dispatchServiceElementType,
  getServiceElementTypes,
} from 'src/redux/slices/serviceElementType';

// ----------------------------------------------------------------------

const columns = SERVICE_ELEMENT_TYPE_CONFIG.COLUMNS;
const config = SERVICE_ELEMENT_TYPE_CONFIG.FILTERS;
const forms = SERVICE_ELEMENT_TYPE_CONFIG.FORMS;

// ----------------------------------------------------------------------

export default function ServiceElementType() {
  // states
  const { serviceElementTypes, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.serviceElementTypes);

  const initialFilterValues = [];

  return (
    <CustomEditableTable
      config={config}
      rows={serviceElementTypes}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getServiceElementTypes}
      dispatchEvent={dispatchServiceElementType}
      displayDeleteAction={true}
      subject="SERVICE_ELEMENT_TYPE"
      error={error}
    />
  );
}
