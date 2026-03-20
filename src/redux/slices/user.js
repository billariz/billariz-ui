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
  addUserApi,
  deleteUserApi,
  findUsersApi,
  updateUserApi,
} from 'src/api/users';
import { UserModel } from 'src/models/User.model';
import { dispatch } from '../store';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  latestQuery: {},
  totalCount: 0,
  currentEvent: null,
};

const slice = createSlice({
  initialState,
  name: 'user',
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
    //Save latest query
    saveLatestQuery(state, action) {
      state.latestQuery = action.payload;
    },

    // GET user SSUCCESS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      state.users = apiResponse._embedded.users.map(
        (user) => new UserModel(user)
      );
      state.totalCount = apiResponse.page
        ? apiResponse.page.totalElements
        : 2000;
    },

    refreshListByItem(state, action) {
      state.isLoading = false;
      const apiResponse = action.payload;
      const updatedUser = new UserModel(apiResponse._embedded.users[0]);

      // Find element index
      const index = state.users.findIndex((user) => user.id === updatedUser.id);

      if (index !== -1) {
        // Replace with updated element
        state.users[index] = updatedUser;
      } else {
        state.users[0] = updatedUser;
      }
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

export function getUsers(page, size, arrayFilters) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
      if (!Number.isFinite(page) && !arrayFilters) {
        [page, size, arrayFilters] = getState().users.latestQuery;
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

      const apiResponse = await findUsersApi(params);
      dispatch(slice.actions.getUsersSuccess(apiResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.msg);
      dispatch(slice.actions.hasError(error.errorCode));
    }
  };
}

// Action to update a user and refresh the user list
export function toggleUserMasterStatus(id) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());

      // Fetch the current user's data by ID
      const {
        _embedded: { users },
      } = await findUsersApi({ id });
      const currentUser = users[0];

      // Toggle the 'master' status for the user
      await updateUserApi(currentUser.id, { master: !currentUser.master });

      // Dispatch the updated user list to the store
      dispatch(getUserById(id));
      return true; // Indicate success
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update user master status:', error);
      dispatch(slice.actions.hasError(error));
      return false; // Indicate failure
    }
  };
}

export function dispatchUserAction(action, args, id) {
  return async () => {
    try {
      let result;
      switch (action) {
        case 'create': {
          result = Array.isArray(args)
            ? await Promise.all(
                args.map((item) =>
                  addUserApi({
                    ...item,
                    status: item.status ? 'ACTIVE' : 'INACTIVE',
                  })
                )
              )
            : [
                await addUserApi({
                  ...args,
                  status: args.status ? 'ACTIVE' : 'INACTIVE',
                }),
              ];

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
          const updateResponse = await updateUserApi(id, {
            ...args,
            status: args.status ? 'ACTIVE' : 'INACTIVE',
          });
          if (!updateResponse) {
            dispatch(
              slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR)
            );
          } else {
            dispatch(slice.actions.updateEvent(TABLE_EVENTS_ENUMS.ROW_UPDATED));
            dispatch(getUserById(id));
          }
          break;
        }
        case 'delete': {
          const deleteResponse = await deleteUserApi(id);
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

export function getUserById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const apiResponse = await findUsersApi({ id });
      dispatch(slice.actions.refreshListByItem(apiResponse));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
}

export function refreshData() {
  return getUsers();
}

export function resetEvent() {
  return slice.actions.resetEvent();
}
