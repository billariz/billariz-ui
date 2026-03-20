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

import PropTypes from 'prop-types';

// Consts

import EVENTS_CONFIG from 'src/constants/events';

// sections
import { getEvents } from 'src/redux/slices/event';
import { CustomEditableTable } from '../../../../components/table';

//Components
import EventInfo from './EventInfo';

//Hooks
import { useMemo, useState } from 'react';
import useToggle from 'src/hooks/useToggle';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const columns = EVENTS_CONFIG.COLUMNS;
const config = EVENTS_CONFIG.FILTERS;
const form = EVENTS_CONFIG.FORMS;

// ----------------------------------------------------------------------
EventList.propTypes = {
  activity: PropTypes.object,
};

export default function EventList({ activity }) {
  // states
  const { events, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.events
  );

  // Current Events state
  const [currentEventId, setCurrentEventId] = useState(null);
  const currentEventObj = useMemo(
    () => events.find((e) => e.id === currentEventId),
    [events, currentEventId]
  );

  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const initialFilterValues = [];
  if (activity?.id) initialFilterValues.push(['activityId', activity?.id]);

  const handleViewRow = (currentEventId) => {
    setCurrentEventId(currentEventId);
    onOpenFrom();
  };

  return (
    <>
      <CustomEditableTable
        config={config}
        rows={events}
        totalCount={totalCount}
        columns={columns}
        isLoading={isLoading}
        dispatchCallback={getEvents}
        handleOnDoubleClick={handleViewRow}
        initialFilterValues={initialFilterValues}
        form={form}
        currentEvent={currentEvent}
        displayAddButton={false}
        subject="EVENT"
        error={error}
      />

      <EventInfo
        open={openFrom}
        onClose={onCloseFrom}
        event={currentEventObj}
        activity={activity}
      />
    </>
  );
}
