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

import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import { GeoRefModel } from 'src/models/GeoRef.model';
import {
  addGeoRefApi,
  deleteGeoRefApi,
  findGeoRefsApi,
  updateGeoRefApi,
} from 'src/api/geoRefs';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  geoRefs: [],
  totalCount: 0,
  latestQuery: {},
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'geoRef',
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

    // GET GEO REFS SUCCESS
    getGeoRefsSuccess(state, action) {
      state.isLoading = false;
      const { _embedded, page } = action.payload;
      state.geoRefs = _embedded.marketGeoRefs.map(
        (geoRef) => new GeoRefModel(geoRef)
      );
      state.totalCount = page ? page.totalElements : 2000;
    },
    // SAVE LATEST QUERY
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    // REFRESH DATA
    refreshData(state) {
      dispatch(getGeoRefs(...state.latestQuery));
    },

    // UPDATE EVENT
    updateEvent(state, action) {
      state.currentEvent = { name: action.payload };
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// Fetch geo refs with filters
export function getGeoRefs(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      // Use latest query if parameters are missing
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().geoRefs.latestQuery;
      }

      let params = {
        page,
        size,
      };

      if (arrayFilters?.length > 0) {
        params = { ...params, ...Object.fromEntries(arrayFilters) };
      }
      dispatch(slice.actions.saveLatestQuery([page, size, arrayFilters]));

      // Fetch API call
      const apiResponse = await findGeoRefsApi(params);
      dispatch(slice.actions.getGeoRefsSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}
function refreshData() {
  return getGeoRefs();
}

// Dispatch geo ref-related actions (create, edit, delete)
export function dispatchGeoRefAction(action, args, id) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(args.map((item) => addGeoRefApi(item)))
            : [await addGeoRefApi(args)];

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
          const updateResponse = await updateGeoRefApi(id, args[0]);
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
          const deleteResponse = await deleteGeoRefApi(id);
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
