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
  addActorApi,
  deleteActorApi,
  findActorsApi,
  updateActorApi,
} from 'src/api/actors';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import { ActorModel } from 'src/models/Actor.model';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  actors: [],
  latestQuery: {},
  totalCount: 0,
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'actor',
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.actors = [];
    },

    // SAVE LATEST QUERY
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    // GET actors SSUCCESS
    getActorsSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.actors = apiResponse._embedded.actors.map(
        (actor) => new ActorModel(actor)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
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

export function getActors(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      // Use latest query if parameters are missing
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().actors.latestQuery;
      }
      let params = {
        page,
        size,
      };

      if (arrayFilters?.length > 0) {
        params = { ...params, ...Object.fromEntries(arrayFilters) };
        dispatch(slice.actions.saveLatestQuery([page, size, arrayFilters]));
      }

      const apiResponse = await findActorsApi(params);
      dispatch(slice.actions.getActorsSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}
export function refreshData() {
  return getActors();
}
export function resetEvent() {
  return slice.actions.resetEvent();
}

export function dispatchActorAction(action, args, id, impliedValues = {}) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(
                args.map((item) =>
                  addActorApi({
                    ...impliedValues,
                    ...item,
                  })
                )
              )
            : [
                await addActorApi({
                  ...impliedValues,
                  ...args,
                }),
              ];

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
          const payload = args[0];

          const resultUpdate = await updateActorApi(id, payload);
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
          const deleteResponse = await deleteActorApi(id);
          if (!deleteResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_DELETE_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_DELETED));
            dispatch(refreshData());
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
