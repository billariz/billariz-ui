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

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import axios from '../utils/axios';
import { jwtDecode } from 'jwt-decode';
// routes
import { COGNITO_API } from '../config';
import { PATH_AUTH } from '../routes/paths';

//Utils
import { loadDynamicParameters } from 'src/utils/loadDynamicTranslate';
import abilityManager from 'src/permissions/ability';
//

// ----------------------------------------------------------------------

// CAUTION: User Cognito is slily difference from firebase, so be sure to read the doc carefully.

const isLocal = process.env.REACT_APP_ENV === 'local';

export const UserPool = new CognitoUserPool({
  UserPoolId: COGNITO_API.userPoolId,
  ClientId: COGNITO_API.clientId,
  domain: COGNITO_API.domain,
  redirectUri: COGNITO_API.redirectUri,
  ...(isLocal && { endpoint: 'http://localhost:9229' }),
});

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  AUTHENTICATE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: 'cognito',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  confirmNewPassword: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tokenExpiringTime, setTokenExpiringTime] = useState();
  const [currentGroup, setCurrentGroup] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const value = {
    loginError,
    setLoginError,
    // éventuellement d'autres propriétés comme login, logout...
  };
  const getUserAttributes = useCallback(
    (currentUser) =>
      new Promise((resolve, reject) => {
        currentUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
          } else {
            const results = {};

            attributes.forEach((attribute) => {
              results[attribute.Name] = attribute.Value;
            });
            resolve(results);
          }
        });
      }),
    []
  );

  const getSession = useCallback(
    () =>
      new Promise(async (resolve, reject) => {
        const setLanguageHeader = (locale) => {
          const lang = locale || 'en';
          localStorage.setItem('i18nextLng', lang);
          axios.defaults.headers.common['accept-language'] = lang;
        };

        const setGroupAndHeaders = async (token, userIdentifier, groups) => {
          const initialGroup = groups.length > 0 ? groups[0] : null;
          if (!localStorage.getItem('currentGroup')) {
            localStorage.setItem('currentGroup', initialGroup);
          }

          axios.defaults.headers.common.Authorization = token;
          await loadDynamicParameters(token);
          await abilityManager.loadPermissions(token, userIdentifier);
        };

        const user = UserPool.getCurrentUser();

        if (user) {
            user.getSession(async (err, session) => {
            if (err) return reject(err);

            const attributes = await getUserAttributes(user);
            const token = session.getIdToken().getJwtToken();
            const decoded = jwtDecode(token);
            const groups = decoded['cognito:groups'] || [];

            setTokenExpiringTime(session.getIdToken().getExpiration());
            setLanguageHeader(attributes.locale);
            await setGroupAndHeaders(token, decoded.email, groups);

            dispatch({
              type: 'AUTHENTICATE',
              payload: {
                isAuthenticated: true,
                user: {
                  email: decoded.email,
                  given_name: decoded.given_name,
                  family_name: decoded.family_name,
                  picture: decoded.picture,
                  locale: decoded.locale,
                  groups,
                },
              },
            });

            resolve({  user: {
                username: decoded.email,
                given_name: decoded.given_name,
                family_name: decoded.family_name,
                picture: decoded.picture,
                locale: decoded.locale,
                groups,
              }, session, headers: { Authorization: token } });
          });
        } else {
          const token = localStorage.getItem('id_token');
          if (!token) return reject(new Error('User not authenticated'));

          try {
            const decoded = jwtDecode(token);
            const groups = decoded['cognito:groups'] || [];

            setLanguageHeader(decoded.locale);
            await setGroupAndHeaders(token, decoded.email || decoded.sub, groups);

            dispatch({
              type: 'AUTHENTICATE',
              payload: {
                isAuthenticated: true,
                user: {
                  email: decoded.email,
                  given_name: decoded.given_name,
                  family_name: decoded.family_name,
                  picture: decoded.picture,
                  locale: decoded.locale,
                  groups,
                },
              },
            });

            resolve({
              user: {
                username: decoded.email,
                given_name: decoded.given_name,
                family_name: decoded.family_name,
                picture: decoded.picture,
                locale: decoded.locale,
                groups,
              },
              session: null,
              headers: { Authorization: token },
            });
          } catch (error) {
            console.error('Erreur parsing id_token', error);
            reject(new Error('User not authenticated'));
          }
        }
      }),
    [getUserAttributes]
  );

  const initial = useCallback(async () => {
    try {
      await getSession();
    } catch {
      dispatch({
        type: 'AUTHENTICATE',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [getSession]);

  useEffect(() => {
    initial();
  }, [initial]);

  // We make sure to handle the user update here, but return the resolve value in order for our components to be
  // able to chain additional `.then()` logic. Additionally, we `.catch` the error and "enhance it" by providing
  // a message that our React components can use.
  const login = useCallback(
    (email, password) =>
      new Promise((resolve) => {
        const user = new CognitoUser({
          Username: email,
          Pool: UserPool,
        });

        if (isLocal) {
          user.setAuthenticationFlowType('USER_PASSWORD_AUTH');
        }

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        user.authenticateUser(authDetails, {
          onSuccess: (data) => {
            getSession().then(async (e) => {
              await abilityManager.loadPermissions(
                e?.headers?.Authorization,
                email
              );
              await loadDynamicParameters(e?.headers?.Authorization);
            });
            resolve(data);
          },
          onFailure: () => {
            resolve({ message: 'userNotFound' });
          },
          newPasswordRequired: () => {
            // Handle this on login page for update password.
            resolve({ message: 'newPasswordRequired', user: user });
          },
        });
      }),
    [getSession]
  );

  // same thing here
  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      window.localStorage.clear();
      abilityManager.clearCache();
      dispatch({ type: 'LOGOUT' });
    }
    else {
      window.localStorage.clear();
      abilityManager.clearCache();
      dispatch({ type: 'LOGOUT' });
    }

  };

  const resetPassword = useCallback(
    (currentUser, password) =>
      new Promise((resolve) => {
        currentUser.completeNewPasswordChallenge(password, null, {
          onSuccess: () => {
            getSession();
            resolve({ message: 'success' });
          },
          onFailure: () => {
            resolve({ message: 'error' });
          },
        });
      }),
    [getSession]
  );

  const forgotPassword = (email) =>
    new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.forgotPassword({
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });

  const confirmNewPassword = (email, code, newPassword) =>
    new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.confirmPassword(code, newPassword, {
        onSuccess: () => {
          resolve({ message: 'passwordResetSuccess' });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });

  const register = (email, password, firstName, lastName) =>
    new Promise((resolve) =>
      UserPool.signUp(
        email,
        password,
        [
          { Name: 'email', Value: email },
          { Name: 'name', Value: `${firstName} ${lastName}` },
        ],
        null,
        async (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
          window.location.href = PATH_AUTH.login;
        }
      )
    );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'cognito',
        tokenExpiringTime,
        currentGroup,
        setCurrentGroup,
        user: {
          displayName: state?.user?.name || 'Minimals',
          role: 'admin',
          ...state.user,
        },
        login,
        register,
        logout,
        resetPassword,
        forgotPassword,
        confirmNewPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
