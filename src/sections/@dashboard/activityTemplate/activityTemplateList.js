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

import { CustomEditableTable } from 'src/components/table';
import ACTIVITY_TEMPLATE_CONFIG from 'src/constants/activityTemplate';
import { useSelector } from 'react-redux';

import {
  getActivityTemplate,
  dispatchActivityTemplate,
} from 'src/redux/slices/activityTemplate';

const columns = ACTIVITY_TEMPLATE_CONFIG.COLUMNS;
const config = ACTIVITY_TEMPLATE_CONFIG.FILTER;
const forms = ACTIVITY_TEMPLATE_CONFIG.FORMS;

export default function ActivityTemplateList() {
  const { activityTemplate, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.activityTemplate);

  return (
    <CustomEditableTable
      config={config}
      rows={activityTemplate}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={[]}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getActivityTemplate}
      dispatchEvent={dispatchActivityTemplate}
      subject="ACTIVITY_TEMPLATE"
      displayDeleteAction={true}
      error={error}
    />
  );
}
