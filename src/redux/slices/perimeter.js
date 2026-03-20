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
  addPerimeterApi,
  deletePerimeterApi,
  findPerimetersApi,
} from 'src/api/perimeters';
import { PerimeterModel } from 'src/models/Perimeter.model';
import { dispatch } from '../store';
import updatePerimeterById from 'src/api/perimeters/updatePerimeterById';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import CustomerModel from 'src/models/Customer.model';
import { findCustomersApi } from 'src/api/customers';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  perimeters: [],
  totalCount: 0,
  latestQuery: {},
  currentEvent: null,
  currentPerimeter: {
    isFound: false,
    isLoading: false,
    perimeter: null,
    customer: null,
  },
};

const slice = createSlice({
  initialState,
  name: 'perimeter',
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
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    // GET contract SSUCCESS
    getPerimetersSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.perimeters = apiResponse._embedded.perimeters.map(
        (perimeter) => new PerimeterModel(perimeter)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },
    getCurrentPerimeterSuccess(state, action) {
      const { perimeter, customer } = action.payload;
      state.currentPerimeter.perimeter = new PerimeterModel(perimeter);
      state.currentPerimeter.customer = new CustomerModel(customer);
      state.currentPerimeter.isFound = true;
      state.currentPerimeter.isLoading = false;
    },
    updateEvent(state, action) {
      state.currentEvent = {
        name: action.payload,
      };
    },
    resetEvent(state) {
      state.currentEvent = null;
    },

    widgetResponseSuccess(state, action) {
      const { name, value } = action.payload;
      state.widgets[name].value = value;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getPerimeters(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().perimeters.latestQuery;
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

      const apiResponse = await findPerimetersApi(params);
      dispatch(slice.actions.getPerimetersSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

export function refreshData() {
  return getPerimeters();
}
export function resetEvent() {
  return slice.actions.resetEvent();
}

export function getPerimeterById(perimeterId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const perimeters = await findPerimetersApi({ perimeterId });
      const currentPerimeter = perimeters._embedded.perimeters[0];
      const customers = await findCustomersApi({ perimeterId });
      const currentCustomer = customers._embedded.customers[0];
      dispatch(
        slice.actions.getCurrentPerimeterSuccess({
          perimeter: currentPerimeter,
          customer: currentCustomer,
        })
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

const formatArgs = (args) => ({
  ...args,
  ...(args.billable && {
    billingFrequency: args.billingFrequency,
    billingCycleId: args.billingCycleId,
    billAfterDate: args.billAfterDate,
  }),
});

export function dispatchPerimeterAction(action, args, id) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(
                args.map((item) => addPerimeterApi(formatArgs(item)))
              )
            : [await addPerimeterApi(formatArgs(args))];

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
          const updateResponse = await updatePerimeterById(
            id,
            formatArgs(args)
          );
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(getPerimeterById(id));
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
          }
          break;
        }
        case 'delete': {
          const resultDelete = await deletePerimeterApi(id);
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
