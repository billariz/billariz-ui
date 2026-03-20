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
  findTosStartOptionsApi,
  addTosStartOptionApi,
  deleteTosStartOptionApi,
  updateTosStartOptionApi,
} from 'src/api/tosStartOptions';
import { TosStartOptionModel } from 'src/models/TosStartOption.model';
import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  tosStartOptions: [],
  totalCount: 0,
  latestQuery: {},
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'tosStartOption',
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

    // GET contract SSUCCESS
    getTosStartOptionSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.tosStartOptions =
        apiResponse._embedded.termOfServiceStartOptions.map(
          (tosStartOption) => new TosStartOptionModel(tosStartOption)
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

    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    refreshData(state) {
      dispatch(getTosStartOptions(...state.latestQuery));
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTosStartOptions(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().tosStartOptions.latestQuery;
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

      const apiResponse = await findTosStartOptionsApi(params);
      dispatch(slice.actions.getTosStartOptionSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

function refreshData() {
  return getTosStartOptions();
}

const transformEmptyToNull = (data) => {
  const transformedData = { ...data };
  Object.keys(transformedData).forEach((key) => {
    if (transformedData[key] === '') {
      transformedData[key] = null;
    }
  });
  return transformedData;
};

export function dispatchTosStartOption(action, args, id) {
  return async () => {
    try {
      switch (action) {
        case 'create': {
          const result = [];
          if (Array.isArray(args)) {
            for (const item of args) {
              const apiResponse = await addTosStartOptionApi(
                transformEmptyToNull(item)
              );
              result.push(apiResponse);
            }
          } else {
            const apiResponse = await addTosStartOptionApi(
              transformEmptyToNull(item)
            );
            result.push(apiResponse);
          }

          const errors = result.filter((_) => !_).length;
          if (errors > 0) {
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

          const resultUpdate = await updateTosStartOptionApi(
            id,
            transformEmptyToNull(payload)
          );
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
          const resultDelete = await deleteTosStartOptionApi(id);
          if (!resultDelete) {
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
          break;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}
