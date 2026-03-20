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
import { getParametersByNameApi } from 'src/api/parameters';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  defaultCountryCode: null,
};

const slice = createSlice({
  initialState,
  name: 'defaultCountryCode',
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
    getDefaultCounryCode(state, action) {
      state.isLoading = false;
      const { defaultCountryCode } = action.payload;
      state.defaultCountryCode = defaultCountryCode;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// Fetch defaultCountryCode

export function getDefaultCountryCode() {
  return async () => {
    try {
      const response = await getParametersByNameApi('defaultCountryCode');
      const defaultCountryCode = response._embedded.parameters[0].value;
      dispatch(slice.actions.getDefaultCounryCode({ defaultCountryCode }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
