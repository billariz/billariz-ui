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

import SERVICE_ELEMENT_START_OTION_CONFIG from 'src/constants/seStartOptions';

// redux
import {
  dispatchSeStartOption,
  getSeStartOptions,
  resetEvent,
} from 'src/redux/slices/seStartOption';

// ----------------------------------------------------------------------

const columns = SERVICE_ELEMENT_START_OTION_CONFIG.COLUMNS;
const config = SERVICE_ELEMENT_START_OTION_CONFIG.FILTERS;
const forms = SERVICE_ELEMENT_START_OTION_CONFIG.FORMS;

// ----------------------------------------------------------------------

export default function SeStartOption() {
  // states
  const { seStartOptions, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.seStartOptions);

  const initialFilterValues = [];

  return (
    <CustomEditableTable
      config={config}
      rows={seStartOptions}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getSeStartOptions}
      dispatchEvent={dispatchSeStartOption}
      displayDeleteAction={true}
      subject="SERVICE_ELEMENT_START_OPTION"
      error={error}
      resetEvent={resetEvent}
    />
  );
}
