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
import { PATH_DASHBOARD } from '../../../routes/paths';
// components

import ArticleIcon from '@mui/icons-material/Article';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MoneyIcon from '@mui/icons-material/Money';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RowingIcon from '@mui/icons-material/Rowing';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HistoryIcon from '@mui/icons-material/History';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// ----------------------------------------------------------------------

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Customer.GENERAL',
    items: [
      {
        title: 'Customer.Clients',
        path: PATH_DASHBOARD.customer.list,
        icon: <PersonIcon />,
        subjects: ['CUSTOMER'],
      },
      {
        title: 'Contract.Contracts',
        path: PATH_DASHBOARD.contract.list,
        icon: <ArticleIcon />,
        subjects: ['CONTRACT'],
      },
      {
        title: 'Perimeter.Perimeters',
        path: PATH_DASHBOARD.perimeter.list,
        icon: <InsertDriveFileIcon />,
        subjects: ['PERIMETER'],
      },
      {
        title: 'Pos.Pos',
        path: PATH_DASHBOARD.pointOfService.list,
        icon: <HomeWorkIcon />,
        subjects: ['POINT_OF_SERVICE'],
      },
      {
        title: 'Third.Third',
        path: PATH_DASHBOARD.third.list,
        icon: <PeopleAltIcon />,
        subjects: ['THIRD'],
      },
    ],
  },
  {
    subheader: 'Inputs',
    items: [
      {
        title: 'Consumption.Consumptions',
        path: PATH_DASHBOARD.consumption.list,
        icon: <ProductionQuantityLimitsIcon />,
        subjects: ['METER_READ'],
      },
      {
        title: 'BillableCharge.BillableCharges',
        path: PATH_DASHBOARD.billableCharge.list,
        icon: <DynamicFeedIcon />,
        subjects: ['BILLABLE_CHARGE'],
      },
    ],
  },
  {
    subheader: 'Processus',
    items: [
      {
        title: 'Activity.Activities',
        path: PATH_DASHBOARD.activity.list,
        icon: <RowingIcon />,
        subjects: ['ACTIVITY'],
      },
      {
        title: 'Event.Events',
        path: PATH_DASHBOARD.event.list,
        icon: <EventIcon />,
        subjects: ['EVENT'],
      },
    ],
  },
  {
    subheader: 'Bill.Billing',
    items: [
      {
        title: 'Bill.BillingRun',
        path: PATH_DASHBOARD.billingRun.list,
        icon: <ReceiptLongIcon />,
        subjects: ['BILLING_RUN'],
      },
      {
        title: 'Bill.Bills',
        path: PATH_DASHBOARD.bill.list,
        icon: <ReceiptIcon />,
        subjects: ['BILL'],
      },
      {
        title: 'Bill.Installement',
        path: PATH_DASHBOARD.contract.list,
        icon: <EventNoteIcon />,
        notAvailable: true,
        subjects: ['BILL'],
      },
    ],
  },
  {
    subheader: 'Rate.products&Services',
    items: [
      {
        title: 'Services',
        path: PATH_DASHBOARD.service.list,
        icon: <MiscellaneousServicesIcon />,
        subjects: ['SERVICE_TYPE', 'SERVICE_START_OPTION'],
      },
      {
        title: 'TermOfService.TermOfServices',
        path: PATH_DASHBOARD.termOfService.list,
        icon: <SettingsSuggestIcon />,
        subjects: ['TOS_TYPE', 'TERM_OF_SERVICE_START_OPTION'],
      },
    ],
  },
  {
    subheader: 'Rate.rating',
    items: [
      {
        title: 'Rate.rates',
        path: PATH_DASHBOARD.rate.list,
        icon: <MoneyIcon />,
        subjects: ['RATE', 'RATE_TYPE'],
      },
      {
        title: 'ServiceElement.ServiceElements',
        path: PATH_DASHBOARD.serviceElement.list,
        icon: <SettingsApplicationsIcon />,
        subjects: ['SE_TYPE', 'SERVICE_ELEMENT_START_OPTION'],
      },
    ],
  },
  {
    subheader: 'Entity.Users',
    items: [
      {
        title: 'Entity.entities',
        path: PATH_DASHBOARD.entity.list,
        icon: <DomainDisabledIcon />,
        subjects: ['ORGANISM'],
      },
      {
        title: 'Group.groups',
        path: PATH_DASHBOARD.group.list,
        icon: <GroupsIcon />,
        subjects: ['GROUP'],
      },
      {
        title: 'User.users',
        path: PATH_DASHBOARD.user.list,
        icon: <ManageAccountsIcon />,
        subjects: ['USER'],
      },
      {
        title: 'Role.roles',
        path: PATH_DASHBOARD.role.list,
        icon: <WorkspacePremiumIcon />,
        subjects: ['ROLE', 'PERMISSION'],
      },
    ],
  },
  {
    subheader: 'Administration',
    items: [
      {
        title: 'Parameter.parameters',
        path: PATH_DASHBOARD.parameter.list,
        icon: <SettingsApplicationsIcon />,
        subjects: ['PARAMETER', 'POSTAL_CODE', 'GEO_FACTOR', 'CLIMATC_REF'],
      },
      {
        title: 'ActivityTemplate.activityTemplate',
        path: PATH_DASHBOARD.activityTemplate.list,
        icon: <SettingsApplicationsIcon />,
        subjects: ['ACTIVITY_TYPE', 'ACTIVITY_TEMPLATE', 'EVENT_TEMPLATE'],
      },
      {
        title: 'Rule.objectProcessRules',
        path: PATH_DASHBOARD.objectProcessRule.list,
        icon: <SettingsApplicationsIcon />,
        subjects: ['OBJECT_PROCESS_RULE'],
      },
      {
        title: 'Journal.journals',
        path: PATH_DASHBOARD.journal.list,
        icon: <HistoryIcon />,
        subjects: ['JOURNAL'],
      },
    ],
  },
];

export default navConfig;
