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
import {
  addObjectProcessRuleApi,
  deleteObjectProcessRuleApi,
  findObjectProcessRulesApi,
  updateObjectProcessRuleApi,
} from 'src/api/objectProcessRules';
import { ObjectProcessRuleModel } from 'src/models/ObjectProcessRule.model';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  objectProcessRules: [],
  totalCount: 0,
  latestQuery: {},
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'objectProcessRules',
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
    getObjectProcessRulesSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.objectProcessRules = apiResponse._embedded.objectProcessRules.map(
        (objectProcessRule) => new ObjectProcessRuleModel(objectProcessRule)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },

    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    refreshData(state) {
      dispatch(getObjectProcessRules(...state.latestQuery));
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

export function getObjectProcessRules(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().objectProcessRules.latestQuery;
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

      const apiResponse = await findObjectProcessRulesApi(params);
      dispatch(slice.actions.getObjectProcessRulesSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

function refreshData() {
  return getObjectProcessRules();
}

const transformEmptyToNull = (data) => {
  const transformedData = { ...data };
  Object.keys(transformedData).forEach((key) => {
    if (transformedData[key] === '') {
      transformedData[key] = null;
    }
  });
  return transformedData;
};

export function dispatchObjectProcessRule(action, args, id) {
  return async () => {
    try {
      switch (action) {
        case 'create': {
          const result = [];
          if (Array.isArray(args)) {
            for (const item of args) {
              const apiResponse = await addObjectProcessRuleApi(
                transformEmptyToNull(item)
              );
              result.push(apiResponse);
            }
          } else {
            const apiResponse = await addObjectProcessRuleApi(
              transformEmptyToNull(item)
            );
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

          const resultUpdate = await updateObjectProcessRuleApi(id, payload);
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
          const resultDelete = await deleteObjectProcessRuleApi(id);
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
