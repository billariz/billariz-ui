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

import SERVICE_START_OPTION_CONFIG from 'src/constants/serviceStartOption';

// redux
import {
  dispatchServiceStartOption,
  getServiceStartOptions,
} from 'src/redux/slices/serviceStartOption';

// ----------------------------------------------------------------------

const columns = SERVICE_START_OPTION_CONFIG.COLUMNS;
const config = SERVICE_START_OPTION_CONFIG.FILTERS;
const forms = SERVICE_START_OPTION_CONFIG.FORMS;

// ----------------------------------------------------------------------

export default function ServiceStartOption() {
  // states
  const { serviceStartOptions, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.serviceStartOptions);

  const initialFilterValues = [];

  return (
    <CustomEditableTable
      config={config}
      rows={serviceStartOptions}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getServiceStartOptions}
      dispatchEvent={dispatchServiceStartOption}
      displayDeleteAction={true}
      subject="SERVICE_START_OPTION"
      error={error}
    />
  );
}
