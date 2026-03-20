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
  addEntityApi,
  deleteEntityApi,
  findEntitiesApi,
  updateEntityApi,
} from 'src/api/entities';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import { EntityModel } from 'src/models/Entity.model';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  latestQuery: {},
  organisms: [],
  totalCount: 0,
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'entity',
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
    //Save latest query
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    // GET contract SSUCCESS
    getEntitiesSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.organisms = apiResponse._embedded.organisms.map(
        (organism) => new EntityModel(organism)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },
    // UPDATE EVENT
    updateEvent(state, action) {
      state.currentEvent = { name: action.payload };
    },
    resetEvent(state) {
      state.currentEvent = null;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getEntities(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().organisms.latestQuery;
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

      const apiResponse = await findEntitiesApi(params);
      dispatch(slice.actions.getEntitiesSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

export function dispatchEntityAction(action, args, id) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(args.map((item) => addEntityApi(item)))
            : [await addEntityApi(args)];

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
          const updateResponse = await updateEntityApi(id, args);
          if (!updateResponse) {
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
          const deleteResponse = await deleteEntityApi(id);
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
export function refreshData() {
  return getEntities();
}
export function resetEvent() {
  return slice.actions.resetEvent();
}
