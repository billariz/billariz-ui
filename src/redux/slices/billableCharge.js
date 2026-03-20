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
import { BillableChargeModel } from 'src/models/BillableCharge.model';
import { dispatch } from '../store';
import findBillableChargeApi from 'src/api/billableCharge/findBillableCharge';
import {
  addBillableChargeApi,
  deleteBillableChargeApi,
  updateBillableChargeById,
} from 'src/api/billableCharge';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  billableCharges: [],
  totalCount: 0,
  latestQuery: {},
  currentEvent: null,
  currentBillableCharge: {
    isFound: false,
    isLoading: false,
    billableCharge: null,
  },
};

const slice = createSlice({
  initialState,
  name: 'billableCharges',
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

    // GET Billable charge SSUCCESS
    getBillableChargeSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.billableCharges = apiResponse._embedded.billableCharges.map(
        (billableCharge) => new BillableChargeModel(billableCharge)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },

    refreshListByItem(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      const updatedBillableCharge = new BillableChargeModel(
        apiResponse._embedded.billableCharges[0]
      );

      // Find element index
      const index = state.billableCharges.findIndex(
        (billableCharge) => billableCharge.id === updatedBillableCharge.id
      );

      if (index !== -1) {
        // Replace with updated element
        state.billableCharges[index] = updatedBillableCharge;
      } else {
        state.billableCharges[0] = updatedBillableCharge;
      }
    },
    updateEvent(state, action) {
      state.currentEvent = {
        name: action.payload,
      };
    },
    resetEvent(state) {
      state.currentEvent = null;
    },
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getBillableCharge(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().billableCharges.latestQuery;
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

      const apiResponse = await findBillableChargeApi(params);
      dispatch(slice.actions.getBillableChargeSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

function refreshData() {
  return getBillableCharge();
}
export function resetEvent() {
  return slice.actions.resetEvent();
}

export function dispatchBillableChargeAction(
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
                  addBillableChargeApi({
                    ...impliedValues,
                    ...item,
                  })
                )
              )
            : [await addBillableChargeApi(args)];

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
          const updateResponse = await updateBillableChargeById(id, args[0]);
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
            dispatch(getBillableChargeById(id));
          }
          break;
        }
        case 'delete': {
          const resultDelete = await deleteBillableChargeApi(id);
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

export function getBillableChargeById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const apiResponse = await findBillableChargeApi({ id });
      dispatch(slice.actions.refreshListByItem(apiResponse));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}
