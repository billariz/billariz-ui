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
//
import {
  addCustomerApi,
  customersApplicationChart,
  customersConvertedChart,
  customersLeadChart,
  deleteCustomerApi,
  findCustomersApi,
  getContractsByCustomerIdApi,
  updateCustomerById,
} from 'src/api/customers';
import WIDGETS_CONFIG from 'src/constants/widgets';
import { ContractModel } from 'src/models/Contract.model';
import CustomerModel from 'src/models/Customer.model';
import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  customers: [],
  totalCount: 0,
  latestQuery: {},
  currentEvent: null,
  currentCustomer: {
    isFound: false,
    isLoading: false,
    customer: null,
    contracts: [],
    contractTotalCount: 0,
  },
  widgets: {
    [WIDGETS_CONFIG.NAME.CUSTOMER_APPLICATION]: {
      isLoading: false,
      value: [],
    },
    [WIDGETS_CONFIG.NAME.CUSTOMER_CONVERSION]: {
      isLoading: false,
      value: [],
    },
    [WIDGETS_CONFIG.NAME.CUSTOMER_LEAD]: {
      isLoading: false,
      value: [],
    },
  },
};

const slice = createSlice({
  initialState,
  name: 'customer',
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

    // GET customer SSUCCESS
    getCustomersSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.customers = apiResponse._embedded.customers.map(
        (customer) => new CustomerModel(customer)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },

    getCurrentCustomersSuccess(state, action) {
      const customer = action.payload;
      state.currentCustomer.customer = new CustomerModel(customer);
      state.currentCustomer.isFound = true;
      state.currentCustomer.isLoading = false;
    },

    // GET contract SSUCCESS
    getContractsSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.currentCustomer.contracts = apiResponse._embedded.contracts.map(
        (contract) => new ContractModel(contract)
      );
      state.currentCustomer.contractTotalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },

    widgetResponseSuccess(state, action) {
      const { name, value } = action.payload;
      state.widgets[name].value = value;
    },

    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    refreshData(state) {
      dispatch(getCustomers(...state.latestQuery));
    },
    resetEvent(state) {
      state.currentEvent = null;
    },

    updateEvent(state, action) {
      state.currentEvent = {
        name: action.payload,
      };
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCustomers(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().customers.latestQuery;
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

      const apiResponse = await findCustomersApi(params);
      dispatch(slice.actions.getCustomersSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

export function getCustomerById(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const customers = await findCustomersApi({ id });
      const currentCustomer = customers._embedded.customers[0];
      dispatch(slice.actions.getCurrentCustomersSuccess(currentCustomer));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

export function loadWidgets() {
  return async () => {
    const apiResponse = await customersApplicationChart();
    dispatch(
      slice.actions.widgetResponseSuccess({
        name: WIDGETS_CONFIG.NAME.CUSTOMER_APPLICATION,
        value: apiResponse,
      })
    );

    const apiConvertedResponse = await customersConvertedChart();
    dispatch(
      slice.actions.widgetResponseSuccess({
        name: WIDGETS_CONFIG.NAME.CUSTOMER_CONVERSION,
        value: apiConvertedResponse,
      })
    );

    const apiLeadResponse = await customersLeadChart();
    dispatch(
      slice.actions.widgetResponseSuccess({
        name: WIDGETS_CONFIG.NAME.CUSTOMER_LEAD,
        value: apiLeadResponse,
      })
    );
  };
}

export function getContractsByCustomerId(customerId, page, size, arrayFilters) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      let params = {
        customerId,
        page,
        size,
      };

      if (arrayFilters && arrayFilters.length > 0) {
        const filters = Object.fromEntries(arrayFilters);
        params = { ...params, ...filters };
      }

      const apiResponse = await getContractsByCustomerIdApi(params);
      dispatch(slice.actions.getContractsSuccess(apiResponse));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}
function refreshData() {
  return getCustomers();
}

export function resetEvent() {
  return slice.actions.resetEvent();
}

const formatArgs = (args) => ({
  ...args,
  company: args.type == 'PROFESSIONAL' ? args.company : null,
});

export function dispatchCustomerEvent(action, args, id) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(
                args.map((item) => addCustomerApi(formatArgs(item)))
              )
            : [await addCustomerApi(formatArgs(args))];

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
          const updateResponse = await updateCustomerById(id, formatArgs(args));
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(getCustomerById(id));
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
          }
          break;
        }
        case 'delete': {
          const resultDelete = await deleteCustomerApi(id);
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
