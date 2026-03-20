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
  addContractApi,
  deleteContractApi,
  findContractsApi,
  updateContractById,
} from 'src/api/contracts';
import { ContractModel } from 'src/models/Contract.model';
import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import CustomerModel from 'src/models/Customer.model';
import { findCustomersApi } from 'src/api/customers';
import { PosModel } from 'src/models/Pos.model';
import {
  addContractPosApi,
  deleteContractPointOfServiceApi,
} from 'src/api/contractPointOfService';
import { findChartByNameApi } from 'src/api/charts';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  contracts: [],
  totalCount: 0,
  currentContract: {
    isFound: false,
    isLoading: false,
    contract: null,
    customer: null,
    chart: null,
  },
  latestQuery: {},
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'contract',
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
    getContractsSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.contracts = apiResponse._embedded.contracts.map(
        (contract) => new ContractModel(contract)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },

    getCurrentContractSuccess(state, action) {
      const { contract, customer, pos, chart } = action.payload;
      state.currentContract.contract = new ContractModel(contract);
      state.currentContract.customer = new CustomerModel(customer);
      state.currentContract.pos = new PosModel(pos);
      state.currentContract.chart = chart;
      state.currentContract.isFound = true;
      state.currentContract.isLoading = false;
    },
    getCurrentContractChartSuccess(state, action) {
      const { chart } = action.payload;
      state.currentContract.chart = chart;
      state.currentContract.isFound = true;
      state.currentContract.isLoading = false;
    },

    widgetResponseSuccess(state, action) {
      const { name, value } = action.payload;
      state.widgets[name].value = value;
    },
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    refreshData(state) {
      dispatch(getContracts(...state.latestQuery));
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

export function getContracts(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().contracts.latestQuery;
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

      const apiResponse = await findContractsApi(params);
      dispatch(slice.actions.getContractsSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

export function getContractById(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const contracts = await findContractsApi({ id });
      const currentContract = contracts._embedded.contracts[0];
      const customers = await findCustomersApi({ contractId: id });
      const currentCustomer = customers._embedded.customers[0];
      const chartResponse = await findChartByNameApi(
        'meterReadQuantityByContractOrPos',
        {
          contractId: id,
        }
      );
      dispatch(
        slice.actions.getCurrentContractSuccess({
          contract: currentContract,
          customer: currentCustomer,
          chart: chartResponse,
        })
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

export function getContractChart(name, arrayFilters, contractId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      let params = { contractId };
      if (arrayFilters?.length > 0) {
        params = { ...params, ...Object.fromEntries(arrayFilters) };
      }

      const chartResponse = await findChartByNameApi(name, params);
      dispatch(
        slice.actions.getCurrentContractChartSuccess({
          chart: chartResponse,
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
  installPeriodicity:
    args.billingMode === 'PAYMENT_SCHEDULE' ? args.installPeriodicity : null,
});

export function dispatchContractAction(action, args, id) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(
                args.map((item) => addContractApi(formatArgs(item)))
              )
            : [await addContractApi(formatArgs(args))];

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
          const updateResponse = await updateContractById(id, formatArgs(args));
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(getContractById(id));
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
          }
          break;
        }
        case 'delete': {
          const resultDelete = await deleteContractApi(id);
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
  return getContracts();
}
export function resetEvent() {
  return slice.actions.resetEvent();
}

export function dispatchPosContractAction(
  action,
  args,
  id,
  impliedValues = {}
) {
  return async () => {
    try {
      switch (action) {
        case 'create': {
          const result = [];
          if (Array.isArray(args)) {
            for (const item of args) {
              const apiResponse = await addContractPosApi({
                ...impliedValues,
                ...item,
              });
              result.push(apiResponse);
            }
          } else {
            const apiResponse = await addContractPosApi({
              ...impliedValues,
              ...item,
            });
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
        case 'delete': {
          const resultDelete = await deleteContractPointOfServiceApi(id);
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
