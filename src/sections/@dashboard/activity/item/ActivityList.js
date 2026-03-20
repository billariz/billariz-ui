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

//Hooks
import { useSelector } from 'react-redux';

//Consts
import ACTIVITY_CONFIG from 'src/constants/activities';

// components
import { CustomEditableTable } from '../../../../components/table';
import ActivityInfo from './ActivityInfo';

//Redux
import {
  dispatchActivityAction,
  getActivities,
} from 'src/redux/slices/activity';

//Hooks
import useToggle from 'src/hooks/useToggle';
import { useMemo, useState } from 'react';

// ----------------------------------------------------------------------

const columns = ACTIVITY_CONFIG.COLUMNS;
const config = ACTIVITY_CONFIG.FILTERS;
const form = ACTIVITY_CONFIG;

// ----------------------------------------------------------------------

ActivityList.propTypes = {
  objectId: PropTypes.number,
  relationType: PropTypes.string,
};

export default function ActivityList({ objectId, relationType }) {
  // states
  const { activities, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.activities);

  // Current Activity state
  const [currentActivityId, setCurrentActivityId] = useState(null);
  const currentActivity = useMemo(
    () => activities.find((e) => e.id === currentActivityId),
    [activities, currentActivityId]
  );

  // Modal control
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const handleViewRow = (currentActivityId) => {
    setCurrentActivityId(currentActivityId);
    onOpenFrom();
  };

  const initialFilterValues = [];
  if (objectId) initialFilterValues.push(['objectId', objectId]);
  if (relationType) initialFilterValues.push(['relationType', relationType]);

  return (
    <>
      <CustomEditableTable
        config={config}
        rows={activities}
        totalCount={totalCount}
        columns={columns}
        isLoading={isLoading}
        dispatchCallback={getActivities}
        handleOnDoubleClick={handleViewRow}
        initialFilterValues={initialFilterValues}
        form={form}
        currentEvent={currentEvent}
        displayAddButton={false}
        displayDeleteAction={true}
        dispatchEvent={dispatchActivityAction}
        subject="ACTIVITY"
        error={error}
      />
      <ActivityInfo
        open={openFrom}
        onClose={onCloseFrom}
        activity={currentActivity}
      />
    </>
  );
}
