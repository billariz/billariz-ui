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

import { Suspense, lazy } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import DashboardLayout from '../layouts/dashboard';
// guards
import GuestGuard from '../guards/GuestGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import { BillingRunItem, BillingRunList } from 'src/pages/billingRun';
import { EntityList } from 'src/pages/entity';
import { GroupList } from 'src/pages/group';
import { RateItem } from 'src/pages/rate';
import { ServiceItem } from 'src/pages/service';
import { ServiceElementItem } from 'src/pages/serviceElement';
import { TermOfServiceItem } from 'src/pages/termeOfService';
import { UserList } from 'src/pages/user';
import { ThirdList } from 'src/pages/third';
import LoadingScreen from '../components/LoadingScreen';
import AuthGuard from 'src/guards/AuthGuard';
import { BillableChargeList } from 'src/pages/billableCharge';
import { ConsumptionList } from 'src/pages/consumption';
import ForgotPassword from 'src/pages/auth/ForgotPassword';
import Callback from 'src/pages/auth/Callback';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'forgot-password',
          element: (
            <GuestGuard>
              <ForgotPassword />
            </GuestGuard>
          ),
        },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        {
          path: 'customer',
          children: [
            {
              element: <Navigate to="/dashboard/customer/list" replace />,
              index: true,
            },
            { path: 'list', element: <CustomerList /> },
            { path: ':id', element: <CustomerItem /> },
          ],
        },
        {
          path: 'contract',
          children: [
            {
              element: <Navigate to="/dashboard/contract/list" replace />,
              index: true,
            },
            { path: 'list', element: <ContractList /> },
            { path: ':id', element: <ContractItem /> },
          ],
        },
        {
          path: 'perimeter',
          children: [
            {
              element: <Navigate to="/dashboard/perimeter/list" replace />,
              index: true,
            },
            { path: 'list', element: <PerimeterList /> },
            { path: ':id', element: <PerimeterItem /> },
          ],
        },
        {
          path: 'pos',
          children: [
            {
              element: <Navigate to="/dashboard/pos/list" replace />,
              index: true,
            },
            { path: 'list', element: <PosList /> },
            { path: ':id', element: <PosItem /> },
          ],
        },
        {
          path: 'consumption',
          children: [
            {
              element: <Navigate to="/dashboard/consumption/list" replace />,
              index: true,
            },
            { path: 'list', element: <ConsumptionList /> },
            { path: ':id', element: <ConsumptionList /> },
          ],
        },
        {
          path: 'billableCharge',
          children: [
            {
              element: <Navigate to="/dashboard/billableCharge/list" replace />,
              index: true,
            },
            { path: 'list', element: <BillableChargeList /> },
            { path: ':id', element: <BillableChargeList /> },
          ],
        },
        {
          path: 'activity',
          children: [
            {
              element: <Navigate to="/dashboard/activity/list" replace />,
              index: true,
            },
            { path: 'list', element: <ActivityList /> },
            { path: ':id', element: <ActivityItem /> },
          ],
        },
        {
          path: 'event',
          children: [
            {
              element: <Navigate to="/dashboard/event/list" replace />,
              index: true,
            },
            { path: 'list', element: <EventList /> },
          ],
        },
        {
          path: 'bill',
          children: [
            {
              element: <Navigate to="/dashboard/bill/list" replace />,
              index: true,
            },
            { path: 'list', element: <BillList /> },
            { path: ':id', element: <BillItem /> },
          ],
        },
        {
          path: 'billingRun',
          children: [
            {
              element: <Navigate to="/dashboard/billingRun/list" replace />,
              index: true,
            },
            { path: 'list', element: <BillingRunList /> },
            { path: ':id', element: <BillingRunItem /> },
          ],
        },
        {
          path: 'service',
          children: [
            {
              element: <Navigate to="/dashboard/service/list" replace />,
              index: true,
            },
            { path: 'list', element: <ServiceItem /> },
          ],
        },
        {
          path: 'termOfService',
          children: [
            {
              element: <Navigate to="/dashboard/termOfService/list" replace />,
              index: true,
            },
            { path: 'list', element: <TermOfServiceItem /> },
          ],
        },
        {
          path: 'serviceElement',
          children: [
            {
              element: <Navigate to="/dashboard/serviceElement/list" replace />,
              index: true,
            },
            { path: 'list', element: <ServiceElementItem /> },
          ],
        },
        {
          path: 'Rate',
          children: [
            {
              element: <Navigate to="/dashboard/rate/list" replace />,
              index: true,
            },
            { path: 'list', element: <RateItem /> },
          ],
        },
        {
          path: 'parameter',
          children: [
            {
              element: <Navigate to="/dashboard/parameter/list" replace />,
              index: true,
            },
            { path: 'list', element: <ParameterList /> },
          ],
        },
        {
          path: 'activityTemplate',
          children: [
            {
              element: (
                <Navigate to="/dashboard/activityTemplate/list" replace />
              ),
              index: true,
            },
            { path: 'list', element: <ActivityTemplateList /> },
          ],
        },
        {
          path: 'objectProcessRules',
          children: [
            {
              element: (
                <Navigate to="/dashboard/objectProcessRules/list" replace />
              ),
              index: true,
            },
            { path: 'list', element: <ObjectProcessRuleListPage /> },
          ],
        },
        {
          path: 'entity',
          children: [
            {
              element: <Navigate to="/dashboard/entity/list" replace />,
              index: true,
            },
            { path: 'list', element: <EntityList /> },
          ],
        },
        {
          path: 'group',
          children: [
            {
              element: <Navigate to="/dashboard/group/list" replace />,
              index: true,
            },
            { path: 'list', element: <GroupList /> },
          ],
        },
        {
          path: 'user',
          children: [
            {
              element: <Navigate to="/dashboard/user/list" replace />,
              index: true,
            },
            { path: 'list', element: <UserList /> },
          ],
        },
        {
          path: 'third',
          children: [
            {
              element: <Navigate to="/dashboard/third/list" replace />,
              index: true,
            },
            { path: 'list', element: <ThirdList /> },
          ],
        },
        {
          path: 'journal',
          children: [
            {
              element: <Navigate to="/dashboard/journal/list" replace />,
              index: true,
            },
            { path: 'list', element: <JournalPage /> },
          ],
        },
        {
          path: 'role',
          children: [
            {
              element: <Navigate to="/dashboard/role/list" replace />,
              index: true,
            },
            { path: 'list', element: <RoleListPage /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/callback',
      element: <Callback />,
    },
    {
      path: '/',
      element: <Navigate to="/auth/login" replace />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// DASHBOARD

// GENERAL
const CustomerList = Loadable(
  lazy(() => import('../pages/customer/CustomerList'))
);

const CustomerItem = Loadable(
  lazy(() => import('../pages/customer/CustomerItem'))
);

const ContractList = Loadable(
  lazy(() => import('../pages/contract/ContractList'))
);

const ContractItem = Loadable(
  lazy(() => import('../pages/contract/ContractItem'))
);

const PerimeterList = Loadable(
  lazy(() => import('../pages/perimeter/PerimeterList'))
);

const PerimeterItem = Loadable(
  lazy(() => import('../pages/perimeter/PerimeterItem'))
);

const PosList = Loadable(lazy(() => import('../pages/pointOfService/PosList')));

const PosItem = Loadable(lazy(() => import('../pages/pointOfService/PosItem')));

const ActivityList = Loadable(
  lazy(() => import('../pages/activity/ActivityList'))
);

const ActivityItem = Loadable(
  lazy(() => import('../pages/activity/ActivityList'))
);

const EventList = Loadable(lazy(() => import('../pages/event/EventList')));

const BillList = Loadable(lazy(() => import('../pages/bill/BillList')));

const ParameterList = Loadable(
  lazy(() => import('../pages/parameter/parameterList'))
);

const ActivityTemplateList = Loadable(
  lazy(() => import('../pages/activityTemplate/activityTemplateList'))
);

const BillItem = Loadable(lazy(() => import('../pages/bill/BillItem')));

const ObjectProcessRuleListPage = Loadable(
  lazy(() => import('../pages/ObjectProcessRule/ObjectProcessRuleListPage'))
);

const JournalPage = Loadable(
  lazy(() => import('src/pages/journal/JournalList'))
);
const RoleListPage = Loadable(lazy(() => import('src/pages/roles/roleList')));
const GeneralApp = Loadable(
  lazy(() => import('../pages/dashboard/GeneralApp'))
);
// MAIN
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
