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
// utils
//
import { getActivityByTypeApi } from 'src/api/activities';
import {
  findParametersApi,
  getParametersByNameAndCategoryApi,
  getParametersByNameApi,
  getParametersAutocompleteApi,
  addParameterApi,
  updateParameterApi,
  deleteParameterApi,
} from 'src/api/parameters';
import { ParameterModel } from 'src/models/Parameter.model';
import { dispatch } from '../store';
import API_SERVICE from 'src/utils/apiService';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  parameters: [],
  parametersByName: {},
  latestQuery: {},
  totalCount: 0,
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'parameter',
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

    // GET parametre SSUCCESS
    getParametersSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.parameters = apiResponse._embedded.parameters.map(
        (parameter) => new ParameterModel(parameter)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    refreshData(state) {
      dispatch(getParameters(...state.latestQuery));
    },

    updateEvent(state, action) {
      state.currentEvent = {
        name: action.payload,
      };
    },

    getParameterByNameSuccess(state, action) {
      const { name, data } = action.payload;
      state.parametersByName[name] = [...data._embedded.parameters];
    },

    getParameterByActivityTypeSuccess(state, action) {
      const { name, data } = action.payload;
      state.parametersByName[name] = [...data._embedded.parameters];
    },

    getParameterAutocompleteSuccess(state, action) {
      const { name, data } = action.payload;
      state.parametersByName[name] = [...data._embedded[name]];
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getParameters(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().parameters.latestQuery;
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

      const apiResponse = await findParametersApi(params);
      dispatch(slice.actions.getParametersSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

export function getParametersByName(name) {
  return async () => {
    try {
      const response = await getParametersByNameApi(name);
      dispatch(
        slice.actions.getParameterByNameSuccess({ name, data: response })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getParametersByNameAndCategory(name, category) {
  return async () => {
    try {
      const response = await getParametersByNameAndCategoryApi(name, category);
      dispatch(
        slice.actions.getParameterByNameSuccess({ name, data: response })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getActivityType(name, category, subCategory) {
  return async () => {
    try {
      const response = await getActivityByTypeApi(name, category, subCategory);
      dispatch(
        slice.actions.getParameterByActivityTypeSuccess({
          name,
          data: response,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

function getKey(response, name, value) {
  try {
    return Object.keys(response._embedded[name][0]).find((key) =>
      key.toLowerCase().includes(value.toLowerCase())
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting key:', error);
    return value;
  }
}

export function getParametersAutocomplete(
  name,
  categoryName,
  endpoint,
  additionelParams,
  fetchNext = true
) {
  return async () => {
    try {
      let response;
      if (endpoint) {
        response = await getParametersAutocompleteApi(
          name,
          '',
          additionelParams
        );
      } else {
        try {
          response = await getParametersAutocompleteApi(
            name,
            name?.slice(0, -1),
            additionelParams
          );
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error getting parameter:', e);
          response = await getParametersAutocompleteApi(
            name,
            name?.slice(0, -1),
            additionelParams
          );
        }
      }
      let newResponse = response;
      if (fetchNext) {
        while (newResponse._links.next) {
          newResponse = await API_SERVICE.get(newResponse._links.next.href);
          response._embedded[name].push(...newResponse._embedded[name]);
        }
      }
      if (categoryName) {
        const category = await getParametersByNameApi(
          categoryName + 'Category'
        );
        const subCategory = await getParametersByNameApi(
          categoryName + 'SubCategory'
        );
        const categoryKey = getKey(response, name, 'category');
        const subCategoryKey = getKey(response, name, 'subCategory');
        response._embedded[name].forEach((element) => {
          element.category = category._embedded.parameters.find(
            (cat) => cat.value === element[categoryKey]
          );
          element.subCategory = subCategory._embedded.parameters.find(
            (subCat) => subCat.value === element[subCategoryKey]
          );
        });
      }
      dispatch(
        slice.actions.getParameterAutocompleteSuccess({ name, data: response })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
function refreshData() {
  return getParameters();
}

export function dispatchParameterAction(action, args, id) {
  return async () => {
    try {
      switch (action) {
        case 'create': {
          const result = [];
          if (Array.isArray(args)) {
            for (const item of args) {
              const apiResponse = await addParameterApi(item);
              result.push(apiResponse);
            }
          } else {
            const apiResponse = await addParameterApi(item);
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
          const payload = args[0];

          const resultUpdate = await updateParameterApi(id, payload);
          if (!resultUpdate) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
            dispatch(refreshData());
          }
          break;
        }
        case 'delete': {
          const resultDelete = await deleteParameterApi(id);
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
