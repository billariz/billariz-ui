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

// component
import { CustomEditableTable } from 'src/components/table';
// utils
import EVENT_TEMPLATE_CONFIG from 'src/constants/eventTemplate';

// redux
import {
  getEventTemplate,
  dispatchEventTemplate,
} from 'src/redux/slices/eventTemplate';
import { useSelector } from 'react-redux';

const columns = EVENT_TEMPLATE_CONFIG.COLUMNS;
const config = EVENT_TEMPLATE_CONFIG.FILTER;
const forms = EVENT_TEMPLATE_CONFIG.FORMS;

export default function EventTemplateList() {
  const { eventTemplate, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.eventTemplate);

  return (
    <CustomEditableTable
      config={config}
      rows={eventTemplate}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      initialFilterValues={[]}
      form={forms}
      currentEvent={currentEvent}
      dispatchCallback={getEventTemplate}
      dispatchEvent={dispatchEventTemplate}
      displayDeleteAction={true}
      subject="EVENT_TEMPLATE"
      error={error}
    />
  );
}
