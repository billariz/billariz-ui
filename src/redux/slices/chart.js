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
import { findChartByNameApi, findChartsApi } from 'src/api/charts';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  charts: [],
  latestQuery: {},
};

const slice = createSlice({
  initialState,
  name: 'chart',
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

    // GET GROUPS SUCCESS
    getChartsSuccess(state, action) {
      state.isLoading = false;
      const charts = action.payload;
      state.charts = charts;
    },
    refreshListByItem(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;

      // Find element index
      const index = state.charts.findIndex(
        (chart) => chart.title === apiResponse.title
      );

      // Replace with updated element
      state.charts[index] = apiResponse;
    },
    // SAVE LATEST QUERY
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// Fetch charts with filters
export function getCharts(arrayFilters) {
  return async (dispatch) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      let params = {};
      if (arrayFilters?.length > 0) {
        params = Object.fromEntries(arrayFilters);
      }
      dispatch(slice.actions.saveLatestQuery([arrayFilters]));

      // Fetch API call
      const apiResponse = await findChartsApi(params);
      dispatch(slice.actions.getChartsSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

// Fetch charts with filters
export function getChartByName(name, arrayFilters) {
  return async (dispatch) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      let params = {};
      if (arrayFilters?.length > 0) {
        params = Object.fromEntries(arrayFilters);
      }

      // Fetch API call
      const apiResponse = await findChartByNameApi(name, params);
      dispatch(slice.actions.refreshListByItem(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}
