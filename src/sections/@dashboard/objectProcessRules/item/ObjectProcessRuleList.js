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
import { useSelector } from 'react-redux';

import {
  dispatchObjectProcessRule,
  getObjectProcessRules,
} from 'src/redux/slices/objectProcessRule';
import OBJECT_PROCESS_RULE_CONFIG from 'src/constants/objectProcessRules';

// ----------------------------------------------------------------------

const columns = OBJECT_PROCESS_RULE_CONFIG.COLUMNS;
const config = OBJECT_PROCESS_RULE_CONFIG.FILTERS;
const form = OBJECT_PROCESS_RULE_CONFIG.FORMS.OBJECT_PROCESS_RULE;

// ----------------------------------------------------------------------

export default function ObjectProcessRuleList() {
  // states
  const { objectProcessRules, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.objectProcessRules);

  return (
    <CustomEditableTable
      config={config}
      rows={objectProcessRules}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      form={form}
      currentEvent={currentEvent}
      dispatchCallback={getObjectProcessRules}
      displayDeleteAction={true}
      dispatchEvent={dispatchObjectProcessRule}
      subject="OBJECT_PROCESS_RULE"
      error={error}
    />
  );
}
