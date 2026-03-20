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
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { Card, CardContent, Typography } from '@mui/material';
// utils
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Label from '../../../../components/Label';
import { FormatDateOrDefault } from '../../../../utils/formatTime';
import { getColors } from 'src/utils/getColors';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

EventJournal.propTypes = {
  objectId: PropTypes.number,
  objectType: PropTypes.string,
};

export default function EventJournal({ objectId, objectType }) {
  // states
  const { journals } = useSelector((state) => state.journals);

  const [filters] = useState([]);

  filters.push(['objectId', objectId]);
  filters.push(['objectType', objectType]);

  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none',
          py: 0,
        },
        height: '100%',
      }}
      scrollbuttons="auto"
    >
      <CardContent>
        <Timeline>
          {journals.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              isLast={index === journals.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    newStatus: PropTypes.string,
    creationDate: PropTypes.string,
    userName: PropTypes.string,
  }),
};

function OrderItem({ item, isLast }) {
  const { newStatus, creationDate, userName } = item;
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={getColors(newStatus, 'error')} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={'info'}
            sx={{ textTransform: 'capitalize' }}
          >
            {userName}
          </Label>
          {'        -----------            '}
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={'info'}
            sx={{ textTransform: 'capitalize' }}
          >
            {newStatus}
          </Label>
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {FormatDateOrDefault(creationDate, translate, 'datetime')}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
