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
  addGroupApi,
  deleteGroupApi,
  findGroupsApi,
  updateGroupApi,
} from 'src/api/groups';
import { GroupModel } from 'src/models/Group.model';
import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  groups: [],
  totalCount: 0,
  latestQuery: {},
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'group',
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

    // GET GROUPS SUCCESS
    getGroupsSuccess(state, action) {
      state.isLoading = false;
      const { _embedded, page } = action.payload;
      state.groups = _embedded.groups.map((group) => new GroupModel(group));
      state.totalCount = page ? page.totalElements : 2000;
    },
    // SAVE LATEST QUERY
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    // REFRESH DATA
    refreshData(state) {
      dispatch(getGroups(...state.latestQuery));
    },

    // UPDATE EVENT
    updateEvent(state, action) {
      state.currentEvent = { name: action.payload };
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// Fetch groups with filters
export function getGroups(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      // Use latest query if parameters are missing
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().groups.latestQuery;
      }

      let params = {
        page,
        size,
      };

      if (arrayFilters?.length > 0) {
        params = { ...params, ...Object.fromEntries(arrayFilters) };
      }
      dispatch(slice.actions.saveLatestQuery([page, size, arrayFilters]));

      // Fetch API call
      const apiResponse = await findGroupsApi(params);
      dispatch(slice.actions.getGroupsSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

// Refresh groups data
function refreshData() {
  return getGroups();
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

// Dispatch group-related actions (create, edit, delete)
export function dispatchGroupAction(action, args, id) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(
                args.map((item) => addGroupApi(transformEmptyToNull(item)))
              )
            : [await addGroupApi(args)];

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
          const updateResponse = await updateGroupApi(
            id,
            transformEmptyToNull(args[0])
          );
          if (!updateResponse) {
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
          const deleteResponse = await deleteGroupApi(id);
          if (!deleteResponse) {
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
