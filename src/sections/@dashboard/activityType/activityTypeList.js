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

import ACTIVITY_TYPE_CONFIG from 'src/constants/activityType';
// components
import { CustomEditableTable } from 'src/components/table';

// redux
import { useSelector } from 'react-redux';
import {
  getActivityTypes,
  dispatchActivityType,
} from 'src/redux/slices/activityType';

const columns = ACTIVITY_TYPE_CONFIG.COLUMNS;
const config = ACTIVITY_TYPE_CONFIG.FILTER;
const forms = ACTIVITY_TYPE_CONFIG.FORMS;

export default function ActivityTypeList() {
  const { activityTypes, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.activityType);

  return (
    <CustomEditableTable
      config={config}
      rows={activityTypes}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={[]}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getActivityTypes}
      displayDeleteAction={true}
      dispatchEvent={dispatchActivityType}
      subject="ACTIVITY_TYPE"
      error={error}
    />
  );
}
