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
  addBillApi,
  deleteBillApi,
  findBillsApi,
  updateBillsApi,
} from 'src/api/bills';
import { BillModel } from 'src/models/Bill.model';
import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  bills: [],
  currentBill: {
    isFound: false,
    isLoading: false,
    bill: null,
  },
  totalCount: 0,
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'Bill',
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
    getBillsSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.bills = apiResponse._embedded.bills.map(
        (bill) => new BillModel(bill)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },

    getCurrentBillSuccess(state, action) {
      const bill = action.payload;
      state.currentBill.bill = new BillModel(bill);
      state.currentBill.isFound = true;
      state.currentBill.isLoading = false;
    },

    widgetResponseSuccess(state, action) {
      const { name, value } = action.payload;
      state.widgets[name].value = value;
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

export function getBills(page, size, arrayFilters) {
  return async () => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      let params = {
        page,
        size,
      };

      if (arrayFilters && arrayFilters.length > 0) {
        const filters = Object.fromEntries(arrayFilters);
        params = { ...params, ...filters };
      }

      const apiResponse = await findBillsApi(params);
      dispatch(slice.actions.getBillsSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}
export function getBillById(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const bills = await findBillsApi({ id });
      const bill = bills._embedded.bills[0];
      dispatch(slice.actions.getCurrentBillSuccess(bill));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

export function dispatchBillAction(action, args, id) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(args.map((item) => addBillApi(item)))
            : [await addBillApi(item)];

          if (result.some((res) => !res)) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_ADD_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_ADDED));
          }
          break;
        }
        case 'PRINTED':
        case 'VALIDATED':
        case 'CANCELED': {
          const updateResponse = await updateBillsApi(id, { status: action });
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(getBillById(id));
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
          }
          break;
        }
        case 'delete':
        case 'DELETE': {
          const deleteResponse = await deleteBillApi(id);
          if (!deleteResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_DELETE_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_DELETED));
            dispatch(refreshData());
            window.location.replace(PATH_DASHBOARD.bill.list);
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
export function resetEvent() {
  return slice.actions.resetEvent();
}

function refreshData() {
  return getBills();
}
