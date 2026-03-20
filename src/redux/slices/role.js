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
  addRoleApi,
  deleteRoleApi,
  findRolesApi,
  updateRoleApi,
} from 'src/api/roles';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

import { RoleModel } from 'src/models/Role.model';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  roles: [],
  totalCount: 0,
  latestQuery: {},
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'role',
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

    // GET ROLES SUCCESS
    getRolesSuccess(state, action) {
      state.isLoading = false;
      const { _embedded, page } = action.payload;
      state.roles = _embedded.roles.map((role) => new RoleModel(role));
      state.totalCount = page ? page.totalElements : 2000;
    },
    refreshListByItem(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      const updatedRole = new RoleModel(apiResponse._embedded.roles[0]);

      // Find element index
      const index = state.roles.findIndex((role) => role.id === updatedRole.id);

      if (index !== -1) {
        // Replace with updated element
        state.roles[index] = updatedRole;
      } else {
        state.roles[0] = updatedRole;
      }
    },
    // SAVE LATEST QUERY
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    // UPDATE EVENT
    updateEvent(state, action) {
      state.currentEvent = { name: action.payload };
    },
    resetEvent(state) {
      state.currentEvent = null;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// Fetch roles with filters
export function getRoles(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      // Use latest query if parameters are missing
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().roles.latestQuery;
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
      const apiResponse = await findRolesApi(params);
      dispatch(slice.actions.getRolesSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}
export function getRoleyById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const apiResponse = await findRolesApi({ id });
      dispatch(slice.actions.refreshListByItem(apiResponse));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

export function dispatchRoleAction(action, args, id) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(args.map((item) => addRoleApi(item)))
            : [await addRoleApi(args)];

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
          const updateResponse = await updateRoleApi(id, args[0]);
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
            dispatch(getRoleyById(id));
          }
          break;
        }
        case 'delete': {
          const deleteResponse = await deleteRoleApi(id);
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

function refreshData() {
  return getRoles();
}
export function resetEvent() {
  return slice.actions.resetEvent();
}
