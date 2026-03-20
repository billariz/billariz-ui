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
  addPosApi,
  deletePOSApi,
  findPosApi,
  updatePosById,
} from 'src/api/pos';
import { PosModel } from 'src/models/Pos.model';
import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import {
  addContractPosApi,
  deleteContractPointOfServiceApi,
} from 'src/api/contractPointOfService';
import { findChartByNameApi } from 'src/api/charts';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  pointOfServices: [],
  currentPOS: {
    isFound: false,
    isLoading: false,
    pos: null,
    chart: null,
  },
  latestQuery: {},
  totalCount: 0,
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'pos',
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

    // GET POS SSUCCESS
    getPosSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.pointOfServices = apiResponse._embedded.pointOfServices.map(
        (pointOfService) => new PosModel(pointOfService)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },
    getCurrentPosSuccess(state, action) {
      const { pos, chart } = action.payload;
      state.currentPOS.pos = new PosModel(pos);
      state.currentPOS.chart = chart;
      state.currentPOS.isFound = true;
      state.currentPOS.isLoading = false;
    },

    getCurrentPosChartSuccess(state, action) {
      const { chart } = action.payload;
      state.currentPOS.chart = chart;
      state.currentPOS.isFound = true;
      state.currentPOS.isLoading = false;
    },
    // SAVE LATEST QUERY
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
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

export function getPos(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().pointOfServices.latestQuery;
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

      const apiResponse = await findPosApi(params);
      dispatch(slice.actions.getPosSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

export function getPosById(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const pointOfServices = await findPosApi({ id });
      const currentPOS = pointOfServices._embedded.pointOfServices[0];
      const chartResponse = await findChartByNameApi(
        'meterReadQuantityByContractOrPos',
        {
          posId: id,
        }
      );

      dispatch(
        slice.actions.getCurrentPosSuccess({
          pos: currentPOS,
          chart: chartResponse,
        })
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

export function getPosChart(name, arrayFilters, posId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      let params = { posId };
      if (arrayFilters?.length > 0) {
        params = { ...params, ...Object.fromEntries(arrayFilters) };
      }

      const chartResponse = await findChartByNameApi(name, params);
      dispatch(
        slice.actions.getCurrentPosChartSuccess({
          chart: chartResponse,
        })
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

function refreshData() {
  return getPos();
}
export function resetEvent() {
  return slice.actions.resetEvent();
}
export function dispatchPosAction(action, args, id, noRefresh = false) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(args.map((item) => addPosApi(item)))
            : [await addPosApi(args)];

          if (result.some((res) => !res)) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_ADD_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_ADDED));
            !noRefresh && dispatch(refreshData());
          }
          break;
        }
        case 'edit': {
          const updateResponse = await updatePosById(id, args);
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(getPosById(id));
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
          }
          break;
        }
        case 'delete': {
          const resultDelete = await deletePOSApi(id);
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
export function dispatchContractPosAction(
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
