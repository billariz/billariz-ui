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
import {
  Typography,
  Switch,
  Paper,
  Stack,
  Box,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';

//Hooks
import useLocales from 'src/hooks/useLocales';
import React, { useState } from 'react';

//Utils
import { FormatDateOrDefault } from 'src/utils/formatTime';

//ICONS
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import RowingIcon from '@mui/icons-material/Rowing';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArticleIcon from '@mui/icons-material/Article';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GroupsIcon from '@mui/icons-material/Groups';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import { serializeFilters } from 'src/utils/urlFilterSerializer';

BoxInfos.propTypes = {
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default function BoxInfos({ config, values }) {
  const { translate } = useLocales();
  const [currentTab, setCurrentTab] = useState(() =>
    Object.keys(config).find((key) => !config[key]?.hideOnBox)
  );

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          variant="standard"
          scrollButtons="auto"
        >
          {Object.keys(config).map(
            (tabKey) =>
              !config[tabKey].hideOnBox &&
              (!config[tabKey].displayOnTab ||
                config[tabKey].displayOnTab(values)) && (
                <Tab
                  key={tabKey}
                  label={translate(config[tabKey].tabLabel)}
                  value={tabKey}
                />
              )
          )}
        </Tabs>
      </Box>
      <Box>
        {Object.keys(config).map(
          (tabKey) =>
            !config[tabKey].hideOnBox &&
            (!config[tabKey].displayOnTab ||
              config[tabKey].displayOnTab(values)) &&
            tabKey == currentTab && (
              <TabContent
                key={tabKey}
                tabKey={tabKey}
                config={config}
                values={values}
              />
            )
        )}
      </Box>
    </>
  );
}

const ValueRenderer = ({ type, value, parameterName, name, translate }) => {
  if (name === 'customerId') {
    return (
      <IconLinkButton
        icon={<PersonIcon />}
        href={`/dashboard/customer/${value}`}
        value={value}
      />
    );
  }
  if (name === 'perimeterId') {
    return (
      <IconLinkButton
        icon={<InsertDriveFileIcon />}
        href={`/dashboard/perimeter/${value}`}
        value={value}
      />
    );
  }
  if (name === 'contractId') {
    return (
      <IconLinkButton
        icon={<ArticleIcon />}
        href={`/dashboard/contract/${value}`}
        value={value}
      />
    );
  }
  if (name === 'billingRunId') {
    return (
      <IconLinkButton
        icon={<ReceiptLongIcon />}
        href={`/dashboard/billingRun/${value}`}
        value={value}
      />
    );
  }

  if (name === 'activityId') {
    return (
      <IconLinkButton
        icon={<RowingIcon />}
        href={`/dashboard/activity/list?id=${value}`}
        value={value}
      />
    );
  }
  if (name === 'organismId') {
    return (
      <IconLinkButton
        icon={<DomainDisabledIcon />}
        href={`/dashboard/entity/list?${serializeFilters([['id', value]], 'ORGANISM')}`}
        value={value}
      />
    );
  }
  if (name === 'groupId') {
    return (
      <IconLinkButton
        icon={<GroupsIcon />}
        href={`/dashboard/group/list?${serializeFilters([['id', value]], 'GROUP')}`}
        value={value}
      />
    );
  }
  if (name === 'cancelledByBillId') {
    return (
      value && (
        <IconLinkButton
          icon={<ReceiptIcon />}
          href={`/dashboard/bill/${value}`}
          value={value}
        />
      )
    );
  }

  if (name === 'cancelledBill') {
    return (
      value && (
        <IconLinkButton
          icon={<ReceiptIcon />}
          href={`/dashboard/bill/${value}`}
          value={value}
        />
      )
    );
  }

  if (type === 'RHFDatePicker') {
    return (
      <Typography
        variant="subtitle2"
        sx={{ textTransform: 'uppercase', mb: 0 }}
      >
        {FormatDateOrDefault(value, translate, 'date')}
      </Typography>
    );
  }

  if (type === 'RHFSwitch') {
    return <Switch checked={value} disabled sx={{ ml: -3 }} />;
  }

  return (
    <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', mb: 0 }}>
      {value
        ? type === 'RHFSelect'
          ? translate(`param_${parameterName}.${value}`)
          : value
        : '-'}
    </Typography>
  );
};
ValueRenderer.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  parameterName: PropTypes.string,
  name: PropTypes.string,
  translate: PropTypes.func.isRequired,
};

const IconLinkButton = ({ icon, href, value }) => (
  <Tooltip title={value}>
    <IconButton onClick={() => window.open(href)} sx={{ p: 0, ml: -0.5 }}>
      {React.cloneElement(icon, { color: 'primary', sx: { fontSize: 20 } })}
    </IconButton>
  </Tooltip>
);
IconLinkButton.propTypes = {
  icon: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
  value: PropTypes.any,
};

const TabContent = ({ tabKey, config, values }) => {
  const { translate, translateBackend } = useLocales();

  const renderLine = (label, value, type, name, parameterName) => (
    <Stack
      direction="row"
      sx={{
        width: '50%',
        alignItems: 'center',
        gap: '10px',
        mr: 1,
      }}
    >
      <Box sx={{ width: '50%' }}>
        <Typography
          variant="body2"
          component="span"
          sx={{ color: 'text.secondary' }}
        >
          {translate(label)}
        </Typography>
      </Box>
      <Box sx={{ width: '50%' }}>
        <ValueRenderer
          type={type}
          value={value}
          parameterName={parameterName}
          name={name}
          translate={translate}
        />
      </Box>
    </Stack>
  );

  return (
    <Paper
      key={tabKey}
      sx={{
        p: 2,
        width: 1,
        bgcolor: 'background.neutral',
        spacing: 0,
        mt: 2,
      }}
    >
      <Stack direction="row" pb={1} sx={{ mb: 1 }}>
        <div style={{ marginRight: '5px' }}>{config[tabKey].icon}</div>
        <div style={{ marginRight: '5px', p: 2 }}>
          <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
            {translate(config[tabKey].title)}
          </Typography>
        </div>
      </Stack>
      {config[tabKey]?.FIELDS?.filter((item) => !item.hideOnBoxInfo).map(
        (item, index, arr) => {
          if (index % 2 === 0) {
            return (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  mb: 1,
                  wordBreak: 'break-word',
                }}
                key={index}
              >
                <>
                  {renderLine(
                    item.label,
                    item.getTranslatedValue
                      ? translateBackend(item.getTranslatedValue(values))
                      : item.getCurrentValue(values),
                    item.type,
                    item.name,
                    item.parameterName
                  )}
                </>
                {arr[index + 1] !== undefined && (
                  <>
                    {renderLine(
                      arr[index + 1].label,
                      arr[index + 1].getTranslatedValue
                        ? translateBackend(
                            arr[index + 1].getTranslatedValue(values)
                          )
                        : arr[index + 1].getCurrentValue(values),
                      arr[index + 1].type,
                      arr[index + 1].name,
                      arr[index + 1].parameterName
                    )}
                  </>
                )}
              </Box>
            );
          }
          return null;
        }
      )}
    </Paper>
  );
};

TabContent.propTypes = {
  tabKey: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};
