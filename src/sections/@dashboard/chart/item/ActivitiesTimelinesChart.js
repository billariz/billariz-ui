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
import { Container, Box } from '@mui/material';
// utils
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from 'src/redux/slices/activity';
import { ActionSummaryChart, ActivityRelationsChart } from '.';

// ----------------------------------------------------------------------

ActivitiesTimeLines.propTypes = {
  objectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  relationType: PropTypes.string,
  relationMode: PropTypes.bool,
};

export default function ActivitiesTimeLines({
  objectId,
  relationType,
  relationMode,
}) {
  // states
  const { activities } = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  const [filters] = useState([]);
  const [eventsByActivity, setEventsByActivity] = useState({});

  const updateEventsForActivity = (activityId, events) => {
    setEventsByActivity((prev) => ({
      ...prev,
      [activityId]: events,
    }));
  };

  useEffect(() => {
    const updatedFilters = [
      ...filters,
      ['objectId', objectId],
      ['relationType', relationType],
      ['sort', 'id,DESC'],
    ];
    dispatch(getActivities(0, 5, updatedFilters));
  }, [dispatch, objectId, relationType]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Container sx={{ height: '50%', mt: 1 }}>
          {activities.map((activity, index) => (
            <ActionSummaryChart
              key={activity.id}
              activity={activity}
              summaryEvents={eventsByActivity[activity.id] || []}
              updateEvents={(events) =>
                updateEventsForActivity(activity.id, events)
              }
            />
          ))}
        </Container>
      </Box>
      {relationMode && (
        <Box>
          <Container sx={{ height: '50%', mt: 1 }}>
            {activities.map((activity, index) => (
              <ActivityRelationsChart key={activity.id} activity={activity} />
            ))}
          </Container>
        </Box>
      )}
    </Box>
  );
}
