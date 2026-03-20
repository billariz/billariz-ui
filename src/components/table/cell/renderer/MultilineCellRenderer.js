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
import {
  IconButton,
  Stack,
  Switch,
  TableCell,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import Avatar from '../../../Avatar';
import Label from '../../../Label';
import { FormatDateOrDefault } from 'src/utils/formatTime';

//Hooks
import useLocales from 'src/hooks/useLocales';
import { useDispatch } from 'react-redux';

//Icons
import PersonIcon from '@mui/icons-material/Person';
import BoltIcon from '@mui/icons-material/Bolt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArticleIcon from '@mui/icons-material/Article';
import RowingIcon from '@mui/icons-material/Rowing';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  Receipt,
  ProductionQuantityLimits,
  DynamicFeed,
} from '@mui/icons-material';
import { serializeFilters } from 'src/utils/urlFilterSerializer';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

const ICON_MAP = {
  triggerDate: DateRangeIcon,
  executionDate: BoltIcon,
  contract: ArticleIcon,
  customer: PersonIcon,
  activity: RowingIcon,
  billRun: ReceiptLongIcon,
  bill: Receipt,
  meterRead: ProductionQuantityLimits,
  article: DynamicFeed,
};

const getRowCellValue = (row, item) => {
  if (typeof item.value === 'function') return item.value(row);
  if (typeof item.value === 'string' && item.value.includes('.')) {
    return item.value.split('.').reduce((acc, key) => acc?.[key], row);
  }
  return row[item.value];
};

const renderDate = (value, translate, dateType, format) => (
  <span>{FormatDateOrDefault(value, translate, dateType, format) || '-'}</span>
);

const renderLabel = (value, item, theme, translate, translateBackend) => {
  const color =
    typeof item.color === 'function' ? item.color(value) : item.color;
  const displayValue = value
    ? item.beTransl
      ? translateBackend(value)
      : item.translParam
        ? translate(`param_${item.translParam}.${value}`)
        : value
    : '-';

  return (
    <Label
      variant={theme.palette.mode === 'light' ? 'filled' : 'outlined'}
      color={color}
      sx={{ textTransform: 'uppercase', mb: 1 }}
    >
      {displayValue}
    </Label>
  );
};

const renderIconButton = (value, iconType, path, isList) => (
  <Tooltip title={value}>
    <IconButton
      onClick={() =>
        window.open(`/dashboard/${path}${isList ? '' : '/' + value}`)
      }
    >
      {React.createElement(ICON_MAP[iconType], {
        color: 'primary',
        sx: { fontSize: 20 },
      })}
    </IconButton>
  </Tooltip>
);
const MultilineCellRenderer = ({
  row,
  cellConfig,
  className = '',
  handleDuplicateRow,
  subject,
}) => {
  const theme = useTheme();
  const { translate, translateBackend } = useLocales();
  const dispatch = useDispatch();
  const cellClassName = `multiline-cell-renderer multiline-cell-renderer-${cellConfig.length} ${className}`;
  const ability = abilityManager.getAbility();

  return (
    <TableCell className={cellClassName}>
      {cellConfig.map((item, index) => {
        const value = getRowCellValue(row, item);
        if (value == null && item.type != 'duplicate')
          return <span key={index}>-</span>;

        const renderContent = () => {
          switch (item.type) {
            case 'label':
              return renderLabel(
                value,
                item,
                theme,
                translate,
                translateBackend
              );

            case 'text':
              return (
                <span>
                  {item.icon &&
                    React.createElement(ICON_MAP[item.icon], {
                      color: 'inherit',
                      sx: { fontSize: 16, flexShrink: 0 },
                    })}
                  {item.beTransl
                    ? translateBackend(value)
                    : item.translParam
                      ? translate(`param_${item.translParam}.${value}`)
                      : value}
                </span>
              );

            case 'date':
            case 'time':
            case 'datetime':
              return (
                <span>
                  {item.icon &&
                    React.createElement(ICON_MAP[item.icon], {
                      color: 'primary',
                      sx: { fontSize: 20 },
                    })}
                  {renderDate(value, translate, item.type, item.format)}
                </span>
              );

            case 'typography':
              return (
                <Typography variant={item.variant} noWrap>
                  {value}
                </Typography>
              );

            case 'stack':
              return (
                <Stack
                  sx={{
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {value}
                </Stack>
              );

            case 'avatar':
              return (
                <Avatar color={item.color} sx={{ mr: 2 }}>
                  {value}
                </Avatar>
              );

            case 'switch':
              return (
                <Switch
                  onChange={() => dispatch(item.handleChange(row.id))}
                  checked={value}
                />
              );

            case 'logo':
              return (
                <Tooltip title={value[item.tooltip]}>
                  <Avatar
                    src={value.picture || value}
                    color={item.color}
                    sx={{ mr: 2 }}
                  />
                </Tooltip>
              );

            case 'duplicate':
              return (
                <Can I="CREATE" a={subject} ability={ability}>
                  <IconButton onClick={() => handleDuplicateRow(row)}>
                    {React.createElement(FileCopyIcon, {
                      color: 'primary',
                      sx: { fontSize: 20 },
                    })}
                  </IconButton>
                </Can>
              );

            case 'customer':
              return renderIconButton(value, 'customer', 'customer', false);

            case 'billRun':
              return renderIconButton(value, 'billRun', 'billingRun', false);

            case 'contract':
              return renderIconButton(value, 'contract', 'contract', false);

            case 'bill':
              return renderIconButton(value, 'bill', 'bill', false);

            case 'meterRead':
              return renderIconButton(
                value,
                'meterRead',
                `consumption/list?${serializeFilters([['id', value]], 'METER_READ')}`,
                true
              );

            case 'article':
              return renderIconButton(
                value,
                'article',
                `billableCharge/list?${serializeFilters([['articleId', value]], 'BILLABLE_CHARGE')}}`,
                true
              );

            case 'activity':
              return renderIconButton(
                value,
                'activity',
                `activity/list?${serializeFilters([['id', value]], 'ACTIVITY')}`,
                true
              );

            default:
              return <span>{value}</span>;
          }
        };

        return (
          <Stack
            key={index}
            sx={{
              fontWeight: !index && cellConfig.length > 1 ? 700 : 400,

              color: index
                ? 'rgb(129 129 129)'
                : theme.palette.mode === 'light'
                  ? 'black'
                  : 'white',
            }}
            direction="row"
          >
            {renderContent()}
          </Stack>
        );
      })}
    </TableCell>
  );
};

MultilineCellRenderer.propTypes = {
  row: PropTypes.object.isRequired,
  className: PropTypes.string,
  subject: PropTypes.string,
  handleDuplicateRow: PropTypes.func,
  cellConfig: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf([
        'label',
        'text',
        'date',
        'time',
        'datetime',
        'typography',
        'stack',
        'avatar',
        'switch',
        'logo',
        'customer',
        'contract',
        'billingRun',
        'meterRead',
        'bill',
        'article',
        'billRun',
        'activity',
        'duplicate',
      ]).isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      icon: PropTypes.string,
      format: PropTypes.string,
      color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      beTransl: PropTypes.bool,
      translParam: PropTypes.string,
      tooltip: PropTypes.string,
      handleChange: PropTypes.func,
    })
  ).isRequired,
};

export default MultilineCellRenderer;
