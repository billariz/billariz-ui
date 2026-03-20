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
import { deleteBillingRunApi, findBillingRunsApi } from 'src/api/billingRuns';
import { BillingRunModel } from 'src/models/BillingRun.model';
import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  billingRuns: [],
  latestQuery: {},
  currentBillingRun: {
    isFound: false,
    isLoading: false,
    billingRun: null,
  },
  totalCount: 0,
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'BillingRun',
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
    getBillingRunsSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.billingRuns = apiResponse._embedded.billingRuns.map(
        (billingRun) => new BillingRunModel(billingRun)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },

    getCurrentBillingRunSuccess(state, action) {
      const billingRun = action.payload;
      state.currentBillingRun.billingRun = new BillingRunModel(billingRun);
      state.currentBillingRun.isFound = true;
      state.currentBillingRun.isLoading = false;
    },

    widgetResponseSuccess(state, action) {
      const { name, value } = action.payload;
      state.widgets[name].value = value;
    },
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

export function getBillingRuns(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().billingRuns.latestQuery;
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

      const apiResponse = await findBillingRunsApi(params);
      dispatch(slice.actions.getBillingRunsSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}
export function getBillingRunById(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const billingRuns = await findBillingRunsApi({ id });
      const currentBillingRun = billingRuns._embedded.billingRuns[0];
      dispatch(slice.actions.getCurrentBillingRunSuccess(currentBillingRun));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}
export function dispatchBillingRun(action, args, id) {
  return async () => {
    try {
      switch (action) {
        case 'delete': {
          const resultDelete = await deleteBillingRunApi(id);
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

function refreshData() {
  return getBillingRuns();
}
