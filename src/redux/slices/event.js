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
import { findEventsApi, updateEventApi } from 'src/api/events';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import { EventModel } from 'src/models/Event.model';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  events: [],
  totalCount: 0,
  currentEvent: null,
  latestQuery: {},
};

const slice = createSlice({
  initialState,
  name: 'event',
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

    // GET event SSUCCESS
    getEventsSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.events = apiResponse._embedded.events.map(
        (event) => new EventModel(event)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },
    refreshListByItem(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      const updatedEvent = new EventModel(apiResponse._embedded.events[0]);

      // Find element index
      const index = state.events.findIndex(
        (event) => event.id === updatedEvent.id
      );

      if (index !== -1) {
        // Replace with updated element
        state.events[index] = updatedEvent;
      } else {
        state.events[0] = updatedEvent;
      }
    },
    // SAVE LATEST QUERY
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },
    updateEvent(state, action) {
      state.currentEvent = {
        name: action.payload,
      };
    },
    resetEvent(state) {
      state.currentEvent = null;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getEvents(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().events.latestQuery;
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

      const apiResponse = await findEventsApi(params);
      dispatch(slice.actions.getEventsSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

export function resetEvent() {
  return slice.actions.resetEvent();
}

export function dispatchEventAction(action, args, id) {
  return async () => {
    try {
      switch (action) {
        case 'edit': {
          const payload = args;
          delete payload.type;
          delete payload.tagType;
          const updateResponse = await updateEventApi(id, payload);
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(getEventById(id));
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
          }
          break;
        }
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
}
export function getEventById(eventId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const apiResponse = await findEventsApi({ eventId });
      dispatch(slice.actions.refreshListByItem(apiResponse));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}
