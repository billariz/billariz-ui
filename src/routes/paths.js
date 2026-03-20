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

// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
  callback: path(ROOTS_AUTH, '/callback'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
  },

  customer: {
    root: path(ROOTS_DASHBOARD, '/customer/list'),
    list: path(ROOTS_DASHBOARD, '/customer/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/customer/${id}`),
  },
  customerItem: {
    root: path(ROOTS_DASHBOARD, '/customer/list'),
    list: path(ROOTS_DASHBOARD, '/customer/list'),
  },
  contractItem: {
    root: path(ROOTS_DASHBOARD, '/contract/list'),
    list: path(ROOTS_DASHBOARD, '/contract/list'),
  },
  contract: {
    root: path(ROOTS_DASHBOARD, '/contract/list'),
    list: path(ROOTS_DASHBOARD, '/contract/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/contract/${id}`),
  },
  perimeter: {
    root: path(ROOTS_DASHBOARD, '/perimeter/list'),
    list: path(ROOTS_DASHBOARD, '/perimeter/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/perimeter/${id}`),
  },
  perimeterItem: {
    root: path(ROOTS_DASHBOARD, '/perimeter/list'),
    list: path(ROOTS_DASHBOARD, '/perimeter/list'),
  },
  pointOfService: {
    root: path(ROOTS_DASHBOARD, '/pos/list'),
    list: path(ROOTS_DASHBOARD, '/pos/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/pos/${id}`),
  },
  consumption: {
    root: path(ROOTS_DASHBOARD, '/consumption/list'),
    list: path(ROOTS_DASHBOARD, '/consumption/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/consumption/${id}`),
  },
  billableCharge: {
    root: path(ROOTS_DASHBOARD, '/billableCharge/list'),
    list: path(ROOTS_DASHBOARD, '/billableCharge/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/billableCharge/${id}`),
  },
  activity: {
    root: path(ROOTS_DASHBOARD, '/activity/list'),
    list: path(ROOTS_DASHBOARD, '/activity/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/activity/${id}`),
  },
  event: {
    root: path(ROOTS_DASHBOARD, '/event/list'),
    list: path(ROOTS_DASHBOARD, '/event/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/event/${id}`),
  },
  bill: {
    root: path(ROOTS_DASHBOARD, '/bill/list'),
    list: path(ROOTS_DASHBOARD, '/bill/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/bill/${id}`),
  },
  billingRun: {
    root: path(ROOTS_DASHBOARD, '/billingRun/list'),
    list: path(ROOTS_DASHBOARD, '/billingRun/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/billingRun/${id}`),
  },
  posConfiguration: {
    root: path(ROOTS_DASHBOARD, '/bill/list'),
    list: path(ROOTS_DASHBOARD, '/bill/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/bill/${id}`),
  },
  service: {
    root: path(ROOTS_DASHBOARD, '/service/list'),
    list: path(ROOTS_DASHBOARD, '/service/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/service/${id}`),
  },
  parameter: {
    root: path(ROOTS_DASHBOARD, '/parameter/list'),
    list: path(ROOTS_DASHBOARD, '/parameter/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/parameter/${id}`),
  },
  termOfService: {
    root: path(ROOTS_DASHBOARD, '/termOfService/list'),
    list: path(ROOTS_DASHBOARD, '/termOfService/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/termOfService/${id}`),
  },
  serviceElement: {
    root: path(ROOTS_DASHBOARD, '/serviceElement/list'),
    list: path(ROOTS_DASHBOARD, '/serviceElement/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/serviceElement/${id}`),
  },
  rate: {
    root: path(ROOTS_DASHBOARD, '/rate/list'),
    list: path(ROOTS_DASHBOARD, '/rate/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/rate/${id}`),
  },
  entity: {
    root: path(ROOTS_DASHBOARD, '/entity/list'),
    list: path(ROOTS_DASHBOARD, '/entity/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/entity/${id}`),
  },
  group: {
    root: path(ROOTS_DASHBOARD, '/group/list'),
    list: path(ROOTS_DASHBOARD, '/group/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/group/${id}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user/list'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/user/${id}`),
  },
  activityTemplate: {
    root: path(ROOTS_DASHBOARD, '/activityTemplate/list'),
    list: path(ROOTS_DASHBOARD, '/activityTemplate/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/activityTemplate/${id}`),
  },
  objectProcessRule: {
    root: path(ROOTS_DASHBOARD, '/objectProcessRules/list'),
    list: path(ROOTS_DASHBOARD, '/objectProcessRules/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/objectProcessRules/${id}`),
  },
  third: {
    root: path(ROOTS_DASHBOARD, '/third/list'),
    list: path(ROOTS_DASHBOARD, '/third/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/third/${id}`),
  },
  journal: {
    root: path(ROOTS_DASHBOARD, '/journal/list'),
    list: path(ROOTS_DASHBOARD, '/journal/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/journal/${id}`),
  },
  role: {
    root: path(ROOTS_DASHBOARD, '/role/list'),
    list: path(ROOTS_DASHBOARD, '/role/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/role/${id}`),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
