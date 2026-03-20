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

import { createSlice } from '@reduxjs/toolkit';
import {
  findActivityTypeApi,
  deleteActivityTypeApi,
  addActivityTypeApi,
  updateActivityTypeApi,
} from 'src/api/activityType';
import { dispatch } from '../store';
import { ActivityTypeModel } from 'src/models/ActivityType.model';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  activityTypes: [],
  totalCount: 0,
  latestQuery: {},
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'activityType',
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET Activity Types SUCCESS
    getActivityTypesSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.activityTypes = apiResponse._embedded.activityTypes.map(
        (activityType) => new ActivityTypeModel(activityType)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },

    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    refreshData(state) {
      dispatch(getActivityTypes(...state.latestQuery));
    },

    updateEvent(state, action) {
      state.currentEvent = {
        name: action.payload,
      };
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getActivityTypes(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().activityType.latestQuery;
      }

      let params = {
        page,
        size,
      };

      if (arrayFilters && arrayFilters.length > 0) {
        const filters = Object.fromEntries(arrayFilters);
        params = { ...params, ...filters };
      }

      dispatch(slice.actions.saveLatestQuery([page, size, arrayFilters]));

      const apiResponse = await findActivityTypeApi(params);
      dispatch(slice.actions.getActivityTypesSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

function refreshData() {
  return getActivityTypes();
}

export function dispatchActivityType(action, args, id) {
  return async (dispatch) => {
    // Start loading before the API call
    dispatch(slice.actions.startLoading());
    try {
      let result = null;
      switch (action) {
        case 'create': {
          if (Array.isArray(args)) {
            // If args is an array, create multiple items using Promise.all
            result = await Promise.all(
              args.map((item) => addActivityTypeApi(item))
            );
          } else {
            // If args is a single item, create it directly
            result = [await addActivityTypeApi(args)];
          }

          // Check for any failures in the creation process
          if (result.some((res) => !res)) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_ADD_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_ADDED));
            dispatch(refreshData());
          }
          break;
        }
        case 'edit': {
          const updatePayload = args[0];
          // Call the API to update the item
          const resultUpdate = await updateActivityTypeApi(id, updatePayload);

          if (!resultUpdate) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
            dispatch(refreshData());
          }
          break;
        }
        case 'delete': {
          if (Array.isArray(args)) {
            // If args is an array, delete multiple items using Promise.all
            result = await Promise.all(
              args.map((item) => deleteActivityTypeApi(item))
            );
          } else {
            result = [await deleteActivityTypeApi(id)];
          }

          // Check for any failures in the deletion process
          const errors = result.filter((res) => !res).length;

          if (errors > 0) {
            // If any deletions failed, dispatch an error event
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_DELETE_ERROR)
            );
          } else {
            // If all deletions succeeded, dispatch the success event and refresh the data
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_DELETED));
            dispatch(refreshData());
          }
          break;
        }
        default:
          throw new Error('Invalid action');
      }
    } catch (e) {
      dispatch(slice.actions.hasError(e.message));
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}
