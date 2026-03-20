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
  addConsumptionApi,
  deleteConsumptionApi,
  findConsumptionApi,
  updateConsumptionById,
} from 'src/api/consumptions';
import { ConsumptionModel } from 'src/models/Consumption.model';
import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  consumptions: [],
  totalCount: 0,
  currentEvent: null,
  latestQuery: {},
};

const slice = createSlice({
  initialState,
  name: 'consumption',
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

    // GET Consumptions SSUCCESS
    getConsumptionSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.consumptions = apiResponse._embedded.meterReads.map(
        (consumption) => new ConsumptionModel(consumption)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },
    refreshListByItem(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      const updatedConsumption = new ConsumptionModel(
        apiResponse._embedded.meterReads[0]
      );

      // Find element index
      const index = state.consumptions.findIndex(
        (consumption) => consumption.id === updatedConsumption.id
      );

      if (index !== -1) {
        // Replace with updated element
        state.consumptions[index] = updatedConsumption;
      } else {
        state.consumptions[0] = updatedConsumption;
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

export function getConsumption(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().consumptions.latestQuery;
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

      const apiResponse = await findConsumptionApi(params);
      dispatch(slice.actions.getConsumptionSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

export function getConsumptionById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const apiResponse = await findConsumptionApi({ id });
      dispatch(slice.actions.refreshListByItem(apiResponse));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}
export function dispatchConsumptionAction(
  action,
  args,
  id,
  impliedValues = {}
) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'duplicate':
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(
                args.map((item) =>
                  addConsumptionApi({ ...impliedValues, ...item })
                )
              )
            : [await addConsumptionApi({ ...impliedValues, ...item })];

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
          const updateResponse = await updateConsumptionById(id, payload);
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(getConsumptionById(id));
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
          }
          break;
        }
        case 'delete': {
          const resultDelete = await deleteConsumptionApi(id);
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
          throw new Error(`Unknown action: ${action}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
}

function refreshData() {
  return getConsumption();
}
export function resetEvent() {
  return slice.actions.resetEvent();
}
