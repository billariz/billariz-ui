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

import TOS_START_OPTION_CONFIG from 'src/constants/tosStartOption';
// sections
// redux
import {
  dispatchTosStartOption,
  getTosStartOptions,
} from 'src/redux/slices/tosStartOption';

// ----------------------------------------------------------------------

const columns = TOS_START_OPTION_CONFIG.COLUMNS;
const config = TOS_START_OPTION_CONFIG.FILTERS;
const forms = TOS_START_OPTION_CONFIG.FORMS;

// ----------------------------------------------------------------------

export default function TosStartOption() {
  // states
  const { tosStartOptions, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.tosStartOptions);

  const initialFilterValues = [];

  return (
    <CustomEditableTable
      config={config}
      rows={tosStartOptions}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={initialFilterValues}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getTosStartOptions}
      dispatchEvent={dispatchTosStartOption}
      displayDeleteAction={true}
      subject="TERM_OF_SERVICE_START_OPTION"
      error={error}
    />
  );
}
