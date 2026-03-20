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

import isString from 'lodash/isString';
import PropTypes from 'prop-types';
// @mui
import { Box, Link, Stack, Typography } from '@mui/material';
import Label from 'src/components/Label';

//Hooks
import { useTheme } from '@mui/material/styles';
import useLocales from 'src/hooks/useLocales';

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
import Breadcrumbs from './Breadcrumbs';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HistoryIcon from '@mui/icons-material/History';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// ----------------------------------------------------------------------

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node,
  heading: PropTypes.string.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object,
};

export default function HeaderBreadcrumbs({
  links,
  icon,
  name,
  action,
  heading,
  moreLink = '',
  sx,
  ...other
}) {
  const { translate } = useLocales();
  const theme = useTheme();

  const renderIcon = () => {
    switch (icon) {
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
      case 'pos':
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
      case 'serviceElement':
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
      case 'consumption':
        return (
          <ProductionQuantityLimitsIcon
            alt="postal Code"
            color="primary"
            sx={{ fontSize: 40 }}
          />
        );
      case 'BillableCharge':
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
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row">
            <div style={{ marginRight: '5px', marginLeft: '-5px' }}>
              {renderIcon()}
            </div>
            <div style={{ marginRight: '6px' }}>
              <Typography variant="h4">
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={'info'}
                  sx={{ textTransform: 'uppercase', mb: 1 }}
                >
                  {name && translate(name)} {name && '>>'} {translate(heading)}
                </Label>
              </Typography>
            </div>
          </Stack>
          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
