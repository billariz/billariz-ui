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
import PARAMETERS_CONFIG from 'src/constants/parameters';
import { CustomEditableTable } from '../../../../components/table';
// sections
import { useSelector } from 'react-redux';
import {
  dispatchParameterAction,
  getParameters,
} from 'src/redux/slices/parameter';

// ----------------------------------------------------------------------

const columns = PARAMETERS_CONFIG.COLUMNS;
const config = PARAMETERS_CONFIG.FILTERS;
const form = PARAMETERS_CONFIG.FORMS.PARAMETER;

// ----------------------------------------------------------------------

export default function ParameterList() {
  // states
  const { parameters, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.parameters);

  return (
    <CustomEditableTable
      config={config}
      rows={parameters}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      dispatchCallback={getParameters}
      displayDeleteAction={true}
      dispatchEvent={dispatchParameterAction}
      subject="PARAMETER"
      error={error}
    />
  );
}
