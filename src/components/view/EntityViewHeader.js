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

import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Stack, Typography } from '@mui/material';
import Label from 'src/components/Label';

//Hooks
import { useTheme } from '@mui/material/styles';

//Icons
import ArticleIcon from '@mui/icons-material/Article';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import EventIcon from '@mui/icons-material/Event';
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
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import TopicIcon from '@mui/icons-material/Topic';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HistoryIcon from '@mui/icons-material/History';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import StatusLabel from '../entityStatusListner/EntityStatusRender';
// ----------------------------------------------------------------------

EntityViewHeader.propTypes = {
  type: PropTypes.string,
  entity: PropTypes.object.isRequired,
  horizontalItems: PropTypes.array,
  verticalItems: PropTypes.array,
  toolbar: PropTypes.element,
};

export default function EntityViewHeader({
  type,
  entity,
  horizontalItems,
  verticalItems,
  toolbar,
}) {
  const theme = useTheme();

  const renderIcon = () => {
    switch (type) {
      case 'perimeter':
        return (
          <InsertDriveFileIcon
            alt="Perimeter"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'bill':
        return <ReceiptIcon alt="Bill" color="primary" sx={{ fontSize: 40 }} />;
      case 'contract':
        return (
          <ArticleIcon alt="Contract" color="primary" sx={{ fontSize: 40 }} />
        );
      case 'customer':
        return (
          <PersonIcon alt="Customer" color="primary" sx={{ fontSize: 40 }} />
        );
      case 'activity':
        return (
          <RowingIcon alt="activity" color="primary" sx={{ fontSize: 40 }} />
        );
      case 'event':
        return <EventIcon alt="event" color="primary" sx={{ fontSize: 40 }} />;
      case 'pointOfService':
        return <HomeWorkIcon alt="pos" color="primary" sx={{ fontSize: 40 }} />;
      case 'billingRun':
        return (
          <ReceiptLongIcon
            alt="billingRun"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'installement':
        return (
          <TopicIcon alt="installement" color="primary" sx={{ fontSize: 40 }} />
        );
      case 'parameter':
        return (
          <SettingsApplicationsIcon
            alt="parameter"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'service':
        return (
          <MiscellaneousServicesIcon
            alt="parameter"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'termOfService':
        return (
          <SettingsSuggestIcon
            alt="parameter"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'serviceElement':
        return (
          <SettingsApplicationsIcon
            alt="parameter"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'rate':
        return (
          <MoneyIcon alt="parameter" color="primary" sx={{ fontSize: 40 }} />
        );
      case 'entity':
        return (
          <DomainDisabledIcon
            alt="parameter"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'user':
        return (
          <ManageAccountsIcon
            alt="parameter"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'group':
        return (
          <GroupsIcon alt="parameter" color="primary" sx={{ fontSize: 40 }} />
        );
      case 'postalCode':
        return (
          <MarkunreadMailboxIcon
            alt="postal Code"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'meterRead':
        return (
          <ProductionQuantityLimitsIcon
            alt="meterRead"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'billableCharge':
        return (
          <DynamicFeedIcon
            alt="postal Code"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'journal':
        return (
          <HistoryIcon alt="journal" color="primary" sx={{ fontSize: 40 }} />
        );
      case 'role':
        return (
          <WorkspacePremiumIcon
            alt="role"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      default:
        return <div>{''}</div>;
    }
  };

  return (
    <>
      <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
        <Box sx={{ textAlign: { sm: 'left' } }}>
          <Stack direction="row">
            <div style={{ marginRight: '5px' }}>{renderIcon()}</div>
            {(entity.reference || entity.id) && (
              <div style={{ marginRight: '5px' }}>
                <Typography sx={{ mt: 1 }}>
                  <Label
                    variant={
                      theme.palette.mode === 'light' ? 'ghost' : 'filled'
                    }
                    color={'info'}
                    sx={{ textTransform: 'uppercase', mb: 1 }}
                  >
                    {entity.reference || entity.id}
                  </Label>
                </Typography>
              </div>
            )}
            {toolbar || ''}
          </Stack>
          <Typography>
            {horizontalItems.map((item, index) => (
              <Label
                key={index}
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={'warning'}
                sx={{ textTransform: 'uppercase', mb: 1, ml: 1 }}
              >
                {item}
              </Label>
            ))}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={1} sm={6} sx={{ mb: 1 }}>
        <Box sx={{ textAlign: { sm: 'right' } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
            }}
          >
            <StatusLabel entity={entity} entityType={type} />
          </Box>

          {verticalItems.map((item, index) => {
            if (item.text == '-') return '';
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: '10px',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {item.icon}

                  <Label
                    variant={
                      theme.palette.mode === 'light' ? 'ghost' : 'filled'
                    }
                    color={item.color || 'default'}
                  >
                    {item.text}
                  </Label>
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Grid>
    </>
  );
}
