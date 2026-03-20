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

// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------
export const HOST_API = process.env.REACT_APP_HOST_API;
console.log("REACT_APP_HOST_API:", process.env.REACT_APP_HOST_API);
console.log("REACT_APP_COGNITO_USER_POOL_ID:", process.env.REACT_APP_COGNITO_USER_POOL_ID);
console.log("REACT_APP_COGNITO_CLIENT_ID:", process.env.REACT_APP_COGNITO_CLIENT_ID);
console.log("REACT_APP_COGNITO_DOMAIN:", process.env.REACT_APP_COGNITO_DOMAIN);
console.log("REACT_APP_AWS_REGION:", process.env.REACT_APP_AWS_REGION);

export const COGNITO_API = {
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
  domain: process.env.REACT_APP_COGNITO_DOMAIN,
  region: process.env.REACT_APP_AWS_REGION,
  endpoint: process.env.REACT_APP_COGNITO_ENDPOINT || undefined,
  redirectUri: `${window.location.origin}/callback`,
};

export const AUTH0_API = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

export const GOOGLE_CXID = process.env.REACT_APP_GOOGLE_CX_ID;

export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 200,
  DASHBOARD_WIDTH: 200,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you set settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'default',
  themeLayout: 'horizontal',
  themeStretch: false,
};
