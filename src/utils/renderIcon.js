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

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MoneyIcon from '@mui/icons-material/Money';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RowingIcon from '@mui/icons-material/Rowing';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import TopicIcon from '@mui/icons-material/Topic';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

export function renderIcon(item) {
  const object = item.secondObjectType;

  switch (object) {
    case 'PERIMETER':
      return (
        <Tooltip
          title={
            item.reference ||
            item.secondObject?.reference ||
            item.secondObjectId
          }
        >
          <IconButton
            onClick={() =>
              window.open('/dashboard/perimeter/' + item.secondObjectId)
            }
          >
            <InsertDriveFileIcon
              alt="Perimeter"
              color="primary"
              sx={{ fontSize: 20 }}
            />
          </IconButton>
        </Tooltip>
      );
    case 'BILL':
      return (
        <Tooltip
          title={
            item.reference ||
            item.secondObject?.reference ||
            item.secondObjectId
          }
        >
          <IconButton
            onClick={() =>
              window.open('/dashboard/bill/' + item.secondObjectId)
            }
          >
            <ReceiptIcon alt="Bill" color="primary" sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      );
    case 'CONTRACT':
      return (
        <Tooltip
          title={
            item.reference ||
            item.secondObject?.reference ||
            item.secondObjectId
          }
        >
          <IconButton
            onClick={() =>
              window.open('/dashboard/contract/' + item.secondObjectId)
            }
          >
            <ArticleIcon
              alt="Contract"
              color="primary"
              sx={{ fontSize: 20, pb: 0 }}
            />
          </IconButton>
        </Tooltip>
      );
    case 'CUSTOMER':
      return (
        <Tooltip
          title={
            item.reference ||
            item.secondObject?.reference ||
            item.secondObjectId
          }
        >
          <IconButton
            onClick={() =>
              window.open('/dashboard/customer/' + item.secondObjectId)
            }
          >
            <PersonIcon alt="Customer" color="primary" sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      );
    case 'ACTIVITY':
      return (
        <RowingIcon alt="activity" color="primary" sx={{ fontSize: 20 }} />
      );
    case 'EVENT':
      return <EventIcon alt="event" color="primary" sx={{ fontSize: 20 }} />;
    case 'POS':
      return (
        <Tooltip
          title={
            item.reference ||
            item.secondObject?.reference ||
            item.secondObjectId
          }
        >
          <IconButton
            onClick={() => window.open('/dashboard/pos/' + item.secondObjectId)}
          >
            <HomeWorkIcon alt="pos" color="primary" sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      );
    case 'BILLING_RUN':
      return (
        <Tooltip
          title={
            item.reference ||
            item.secondObject?.reference ||
            item.secondObjectId
          }
        >
          <IconButton
            onClick={() =>
              window.open('/dashboard/billingRun/' + item.secondObjectId)
            }
          >
            <ReceiptLongIcon
              alt="billingRun"
              color="primary"
              sx={{ fontSize: 20 }}
            />
          </IconButton>
        </Tooltip>
      );
    case 'INSTALLEMENT':
      return (
        <TopicIcon alt="installement" color="primary" sx={{ fontSize: 20 }} />
      );
    case 'PARAMETER':
      return (
        <SettingsApplicationsIcon
          alt="parameter"
          color="primary"
          sx={{ fontSize: 20 }}
        />
      );
    case 'SERVICE':
      return (
        <MiscellaneousServicesIcon
          alt="parameter"
          color="primary"
          sx={{ fontSize: 20 }}
        />
      );
    case 'TERM_OF_SERVICE':
      return (
        <SettingsSuggestIcon
          alt="parameter"
          color="primary"
          sx={{ fontSize: 20 }}
        />
      );
    case 'SERVICE_ELEMENT':
      return (
        <SettingsApplicationsIcon
          alt="service element"
          color="primary"
          sx={{ fontSize: 20 }}
        />
      );
    case 'RATE':
      return (
        <MoneyIcon alt="parameter" color="primary" sx={{ fontSize: 20 }} />
      );
    case 'METER_READ':
      return (
        <Tooltip title={item.reference || item.secondObjectId}>
          <IconButton
            onClick={() =>
              window.open('/dashboard/consumption/' + item.secondObjectId)
            }
          >
            <ProductionQuantityLimitsIcon
              alt="consumption"
              color="primary"
              sx={{ fontSize: 20 }}
            />
          </IconButton>
        </Tooltip>
      );
    case 'BILLABLE_CHARGE':
      return (
        <Tooltip title={item.reference || item.secondObjectId}>
          <IconButton
            onClick={() =>
              window.open('/dashboard/billableCharge/' + item.secondObjectId)
            }
          >
            <DynamicFeedIcon
              alt="Billable Charge"
              color="primary"
              sx={{ fontSize: 20 }}
            />
          </IconButton>
        </Tooltip>
      );
    default:
      return <div>{''}</div>;
  }
}
