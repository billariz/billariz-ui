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
import { ServiceElement } from 'src/models/ServiceElement.model';
import { dispatch } from '../store';
import {
  findServiceElementsApi,
  addServiceElementsApi,
  deleteServiceElementsApi,
  updateServiceElementsApi,
} from 'src/api/serviceElements';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  serviceElements: [],
  totalCount: 0,
  latestQuery: {},
};

const slice = createSlice({
  initialState,
  name: 'ServiceElement',
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
    getServiceElementsSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.serviceElements = apiResponse._embedded.serviceElements.map(
        (serviceElement) => new ServiceElement(serviceElement)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },
    refreshListByItem(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      const updatedServiceElement = new ServiceElement(
        apiResponse._embedded.serviceElements[0]
      );

      // Find element index
      const index = state.serviceElements.findIndex(
        (serviceElement) => serviceElement.id === updatedServiceElement.id
      );

      if (index !== -1) {
        // Replace with updated element
        state.serviceElements[index] = updatedServiceElement;
      } else {
        state.serviceElements[0] = updatedServiceElement;
      }
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

    widgetResponseSuccess(state, action) {
      const { name, value } = action.payload;
      state.widgets[name].value = value;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function resetEvent() {
  return slice.actions.resetEvent();
}

export function getServiceElements(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().serviceElements.latestQuery;
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

      const apiResponse = await findServiceElementsApi(params);
      dispatch(slice.actions.getServiceElementsSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

function refreshData() {
  return getServiceElements();
}

export function dispatchServiceElementAction(
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
              const apiResponse = await addServiceApi({
                ...impliedValues,
                ...item,
              });
              result.push(apiResponse);
            }
          } else {
            const apiResponse = await addServiceElementsApi({
              ...impliedValues,
              ...args,
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
        case 'edit': {
          const payload = args;
          delete args.seType;

          const resultUpdate = await updateServiceElementsApi(id, payload);
          if (!resultUpdate) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(getServiceElementById(id));
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
          }
          break;
        }
        case 'delete': {
          const resultDelete = await deleteServiceElementsApi(id);
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

export function getServiceElementById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const apiResponse = await findServiceElementsApi({ id });
      dispatch(slice.actions.refreshListByItem(apiResponse));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}
